/**
 * ENHANCED ATTENDANCE ROUTES
 * Supports multiple punch in/out throughout the day with gross hours calculation
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr, manager } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

/* ============================================
   PUNCH IN/OUT (Employee)
   ============================================ */

/**
 * Punch In - Can be done multiple times per day
 */
router.post("/punch-in", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const { work_mode, location, notes } = req.body;
        const ip_address = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const device_info = req.headers['user-agent'];
        
        const c = await db();
        await c.beginTransaction();
        
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        
        // Check if there's an active punch-in (no punch-out yet)
        const [activePunch] = await c.query(
            `SELECT ap.id 
             FROM attendance_punches ap
             WHERE ap.employee_id = ? AND ap.punch_date = ? 
             ORDER BY ap.punch_time DESC LIMIT 1`,
            [emp.id, today]
        );
        
        if (activePunch.length > 0) {
            const [lastPunch] = await c.query(
                `SELECT punch_type FROM attendance_punches WHERE id = ?`,
                [activePunch[0].id]
            );
            
            if (lastPunch[0].punch_type === 'in') {
                await c.rollback();
                c.end();
                return res.status(400).json({ 
                    error: "Already punched in. Please punch out first.",
                    message: "You have an active punch-in. Punch out before punching in again."
                });
            }
        }
        
        // Get or create attendance record for today
        let [attendance] = await c.query(
            `SELECT id FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
            [emp.id, today]
        );
        
        let attendanceId;
        
        if (attendance.length === 0) {
            // Create new attendance record
            const [result] = await c.query(
                `INSERT INTO attendance 
                 (employee_id, attendance_date, punch_date, first_check_in, work_mode, location, status)
                 VALUES (?, ?, ?, ?, ?, ?, 'present')`,
                [emp.id, today, today, now, work_mode || 'Office', location || 'Office']
            );
            attendanceId = result.insertId;
        } else {
            attendanceId = attendance[0].id;
            
            // Update first_check_in if this is the actual first punch
            const [punchCount] = await c.query(
                `SELECT COUNT(*) as count FROM attendance_punches WHERE attendance_id = ?`,
                [attendanceId]
            );
            
            if (punchCount[0].count === 0) {
                await c.query(
                    `UPDATE attendance SET first_check_in = ?, work_mode = ?, location = ? WHERE id = ?`,
                    [now, work_mode || 'Office', location || 'Office', attendanceId]
                );
            }
        }
        
        // Insert punch record
        await c.query(
            `INSERT INTO attendance_punches 
             (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, location, notes)
             VALUES (?, ?, 'in', ?, ?, ?, ?, ?, ?)`,
            [attendanceId, emp.id, now, today, ip_address, device_info, location, notes]
        );
        
        await c.commit();
        c.end();
        
        res.json({ 
            success: true, 
            message: "Punched in successfully",
            punch_time: now,
            work_mode: work_mode || 'Office',
            attendance_id: attendanceId
        });
    } catch (error) {
        console.error("Punch in error:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Punch Out - Can be done multiple times per day
 */
router.post("/punch-out", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const { notes } = req.body;
        const ip_address = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const device_info = req.headers['user-agent'];
        
        const c = await db();
        await c.beginTransaction();
        
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        
        // Check if there's an active attendance record
        const [attendance] = await c.query(
            `SELECT id FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
            [emp.id, today]
        );
        
        if (attendance.length === 0) {
            await c.rollback();
            c.end();
            return res.status(400).json({ 
                error: "No attendance record found. Please punch in first."
            });
        }
        
        const attendanceId = attendance[0].id;
        
        // Check last punch
        const [lastPunch] = await c.query(
            `SELECT punch_type, punch_time FROM attendance_punches 
             WHERE attendance_id = ? 
             ORDER BY punch_time DESC LIMIT 1`,
            [attendanceId]
        );
        
        if (lastPunch.length === 0) {
            await c.rollback();
            c.end();
            return res.status(400).json({ 
                error: "No punch-in found. Please punch in first."
            });
        }
        
        if (lastPunch[0].punch_type === 'out') {
            await c.rollback();
            c.end();
            return res.status(400).json({ 
                error: "Already punched out. Punch in first to punch out again."
            });
        }
        
        // Insert punch out record
        await c.query(
            `INSERT INTO attendance_punches 
             (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, notes)
             VALUES (?, ?, 'out', ?, ?, ?, ?, ?)`,
            [attendanceId, emp.id, now, today, ip_address, device_info, notes]
        );
        
        // Calculate and update hours
        await calculateAndUpdateHours(c, attendanceId);
        
        await c.commit();
        c.end();
        
        res.json({ 
            success: true, 
            message: "Punched out successfully",
            punch_time: now,
            attendance_id: attendanceId
        });
    } catch (error) {
        console.error("Punch out error:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Today's Attendance Status (Employee)
 */
router.get("/today", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const today = new Date().toISOString().split('T')[0];
        const c = await db();
        
        // Get attendance record
        const [attendance] = await c.query(
            `SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
            [emp.id, today]
        );
        
        if (attendance.length === 0) {
            c.end();
            return res.json({
                has_attendance: false,
                message: "No attendance record for today",
                punches: []
            });
        }
        
        // Get all punches
        const [punches] = await c.query(
            `SELECT * FROM attendance_punches 
             WHERE attendance_id = ? 
             ORDER BY punch_time ASC`,
            [attendance[0].id]
        );
        
        c.end();
        
        res.json({
            has_attendance: true,
            attendance: attendance[0],
            punches: punches,
            punch_count: punches.length,
            last_punch_type: punches.length > 0 ? punches[punches.length - 1].punch_type : null,
            can_punch_in: punches.length === 0 || punches[punches.length - 1].punch_type === 'out',
            can_punch_out: punches.length > 0 && punches[punches.length - 1].punch_type === 'in'
        });
    } catch (error) {
        console.error("Error fetching today's attendance:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get My Attendance Report (Employee)
 */
router.get("/my-report", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const { startDate, endDate, month, year } = req.query;
        const c = await db();
        
        let query = `
            SELECT 
                a.*,
                (SELECT COUNT(*) FROM attendance_punches WHERE attendance_id = a.id AND punch_type = 'in') as punch_in_count,
                (SELECT COUNT(*) FROM attendance_punches WHERE attendance_id = a.id AND punch_type = 'out') as punch_out_count
            FROM attendance a
            WHERE a.employee_id = ?
        `;
        
        const params = [emp.id];
        
        if (startDate && endDate) {
            query += ` AND a.attendance_date BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        } else if (month && year) {
            query += ` AND MONTH(a.attendance_date) = ? AND YEAR(a.attendance_date) = ?`;
            params.push(month, year);
        }
        
        query += ` ORDER BY a.attendance_date DESC`;
        
        const [attendance] = await c.query(query, params);
        
        // Calculate summary
        const summary = {
            total_days: attendance.length,
            present_days: attendance.filter(a => a.status === 'present').length,
            absent_days: attendance.filter(a => a.status === 'absent').length,
            half_days: attendance.filter(a => a.status === 'half-day').length,
            total_work_hours: attendance.reduce((sum, a) => sum + (parseFloat(a.gross_hours) || 0), 0).toFixed(2),
            avg_work_hours: attendance.length > 0 
                ? (attendance.reduce((sum, a) => sum + (parseFloat(a.gross_hours) || 0), 0) / attendance.length).toFixed(2)
                : 0
        };
        
        c.end();
        
        res.json({
            summary,
            attendance
        });
    } catch (error) {
        console.error("Error fetching my attendance report:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Attendance Details with Punches (Employee)
 */
router.get("/details/:date", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const { date } = req.params;
        const c = await db();
        
        const [attendance] = await c.query(
            `SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
            [emp.id, date]
        );
        
        if (attendance.length === 0) {
            c.end();
            return res.status(404).json({ error: "No attendance record found for this date" });
        }
        
        const [punches] = await c.query(
            `SELECT * FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC`,
            [attendance[0].id]
        );
        
        c.end();
        
        res.json({
            attendance: attendance[0],
            punches,
            punch_pairs: calculatePunchPairs(punches)
        });
    } catch (error) {
        console.error("Error fetching attendance details:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   ADMIN/MANAGER REPORTS
   ============================================ */

/**
 * Get Employee Attendance Report (Manager/Admin)
 */
router.get("/report/employee/:employeeId", auth, manager, async (req, res) => {
    try {
        const { startDate, endDate, month, year } = req.query;
        const c = await db();
        
        let query = `
            SELECT 
                a.*,
                e.EmployeeNumber,
                e.FirstName,
                e.LastName,
                e.WorkEmail,
                (SELECT COUNT(*) FROM attendance_punches WHERE attendance_id = a.id AND punch_type = 'in') as punch_in_count,
                (SELECT COUNT(*) FROM attendance_punches WHERE attendance_id = a.id AND punch_type = 'out') as punch_out_count
            FROM attendance a
            INNER JOIN employees e ON a.employee_id = e.id
            WHERE a.employee_id = ?
        `;
        
        const params = [req.params.employeeId];
        
        if (startDate && endDate) {
            query += ` AND a.attendance_date BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        } else if (month && year) {
            query += ` AND MONTH(a.attendance_date) = ? AND YEAR(a.attendance_date) = ?`;
            params.push(month, year);
        }
        
        query += ` ORDER BY a.attendance_date DESC`;
        
        const [attendance] = await c.query(query, params);
        
        const summary = {
            total_days: attendance.length,
            present_days: attendance.filter(a => a.status === 'present').length,
            absent_days: attendance.filter(a => a.status === 'absent').length,
            half_days: attendance.filter(a => a.status === 'half-day').length,
            total_work_hours: attendance.reduce((sum, a) => sum + (parseFloat(a.gross_hours) || 0), 0).toFixed(2),
            avg_work_hours: attendance.length > 0 
                ? (attendance.reduce((sum, a) => sum + (parseFloat(a.gross_hours) || 0), 0) / attendance.length).toFixed(2)
                : 0
        };
        
        c.end();
        
        res.json({
            employee: attendance[0] ? {
                id: attendance[0].employee_id,
                employee_number: attendance[0].EmployeeNumber,
                name: `${attendance[0].FirstName} ${attendance[0].LastName}`,
                email: attendance[0].WorkEmail
            } : null,
            summary,
            attendance
        });
    } catch (error) {
        console.error("Error fetching employee attendance report:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Attendance Details with Punches (Manager/Admin)
 */
router.get("/report/details/:employeeId/:date", auth, manager, async (req, res) => {
    try {
        const { employeeId, date } = req.params;
        const c = await db();
        
        const [attendance] = await c.query(
            `SELECT a.*, e.EmployeeNumber, e.FirstName, e.LastName 
             FROM attendance a
             INNER JOIN employees e ON a.employee_id = e.id
             WHERE a.employee_id = ? AND a.attendance_date = ?`,
            [employeeId, date]
        );
        
        if (attendance.length === 0) {
            c.end();
            return res.status(404).json({ error: "No attendance record found" });
        }
        
        const [punches] = await c.query(
            `SELECT * FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC`,
            [attendance[0].id]
        );
        
        c.end();
        
        res.json({
            employee: {
                id: attendance[0].employee_id,
                employee_number: attendance[0].EmployeeNumber,
                name: `${attendance[0].FirstName} ${attendance[0].LastName}`
            },
            attendance: attendance[0],
            punches,
            punch_pairs: calculatePunchPairs(punches)
        });
    } catch (error) {
        console.error("Error fetching attendance details:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Team Attendance Report (Manager)
 */
router.get("/report/team", auth, manager, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const { date } = req.query;
        const targetDate = date || new Date().toISOString().split('T')[0];
        
        const c = await db();
        
        // Get team members (reporting to this manager)
        const [team] = await c.query(
            `SELECT id, EmployeeNumber, FirstName, LastName, WorkEmail 
             FROM employees 
             WHERE reporting_manager_id = ? AND EmploymentStatus = 'Active'`,
            [emp.id]
        );
        
        const teamIds = team.map(t => t.id);
        
        if (teamIds.length === 0) {
            c.end();
            return res.json({ team_members: [], attendance: [] });
        }
        
        // Get attendance for team
        const [attendance] = await c.query(
            `SELECT 
                a.*,
                e.EmployeeNumber,
                e.FirstName,
                e.LastName,
                (SELECT COUNT(*) FROM attendance_punches WHERE attendance_id = a.id) as total_punches
             FROM attendance a
             INNER JOIN employees e ON a.employee_id = e.id
             WHERE a.employee_id IN (?) AND a.attendance_date = ?`,
            [teamIds, targetDate]
        );
        
        c.end();
        
        res.json({
            team_members: team,
            date: targetDate,
            attendance,
            summary: {
                total_team: team.length,
                present: attendance.filter(a => a.status === 'present').length,
                absent: team.length - attendance.length,
                on_leave: attendance.filter(a => a.status === 'on-leave').length
            }
        });
    } catch (error) {
        console.error("Error fetching team attendance:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get All Attendance Report (Admin/HR)
 */
router.get("/report/all", auth, hr, async (req, res) => {
    try {
        const { date, startDate, endDate } = req.query;
        const c = await db();
        
        let query = `
            SELECT 
                a.*,
                e.EmployeeNumber,
                e.FirstName,
                e.LastName,
                e.WorkEmail,
                d.name as department_name,
                des.name as designation_name
            FROM attendance a
            INNER JOIN employees e ON a.employee_id = e.id
            LEFT JOIN departments d ON e.DepartmentId = d.id
            LEFT JOIN designations des ON e.DesignationId = des.id
            WHERE 1=1
        `;
        
        const params = [];
        
        if (date) {
            query += ` AND a.attendance_date = ?`;
            params.push(date);
        } else if (startDate && endDate) {
            query += ` AND a.attendance_date BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        }
        
        query += ` ORDER BY a.attendance_date DESC, e.EmployeeNumber ASC`;
        
        const [attendance] = await c.query(query, params);
        
        c.end();
        
        res.json({
            attendance,
            summary: {
                total_records: attendance.length,
                present: attendance.filter(a => a.status === 'present').length,
                absent: attendance.filter(a => a.status === 'absent').length,
                half_day: attendance.filter(a => a.status === 'half-day').length,
                on_leave: attendance.filter(a => a.status === 'on-leave').length
            }
        });
    } catch (error) {
        console.error("Error fetching all attendance:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Calculate and update attendance hours based on punches
 */
async function calculateAndUpdateHours(connection, attendanceId) {
    // Get all punches for this attendance
    const [punches] = await connection.query(
        `SELECT punch_type, punch_time FROM attendance_punches 
         WHERE attendance_id = ? 
         ORDER BY punch_time ASC`,
        [attendanceId]
    );
    
    let totalWorkMinutes = 0;
    let totalBreakMinutes = 0;
    let lastPunchIn = null;
    let lastPunchOut = null;
    
    for (let i = 0; i < punches.length; i++) {
        const punch = punches[i];
        const punchTime = new Date(punch.punch_time);
        
        if (punch.punch_type === 'in') {
            lastPunchIn = punchTime;
            
            // If there was a previous punch out, calculate break time
            if (lastPunchOut && i > 0) {
                const breakMinutes = (punchTime - lastPunchOut) / (1000 * 60);
                totalBreakMinutes += breakMinutes;
            }
        } else if (punch.punch_type === 'out' && lastPunchIn) {
            lastPunchOut = punchTime;
            const workMinutes = (punchTime - lastPunchIn) / (1000 * 60);
            totalWorkMinutes += workMinutes;
            lastPunchIn = null;
        }
    }
    
    const totalWorkHours = (totalWorkMinutes / 60).toFixed(2);
    const totalBreakHours = (totalBreakMinutes / 60).toFixed(2);
    const grossHours = totalWorkHours;
    
    // Update attendance record
    await connection.query(
        `UPDATE attendance 
         SET last_check_out = ?, 
             total_work_hours = ?, 
             total_break_hours = ?, 
             gross_hours = ?
         WHERE id = ?`,
        [punches[punches.length - 1].punch_time, totalWorkHours, totalBreakHours, grossHours, attendanceId]
    );
    
    return { totalWorkHours, totalBreakHours, grossHours };
}

/**
 * Calculate punch pairs (in-out combinations)
 */
function calculatePunchPairs(punches) {
    const pairs = [];
    let currentPair = {};
    
    for (const punch of punches) {
        if (punch.punch_type === 'in') {
            currentPair = {
                punch_in: punch.punch_time,
                punch_in_location: punch.location
            };
        } else if (punch.punch_type === 'out' && currentPair.punch_in) {
            currentPair.punch_out = punch.punch_time;
            currentPair.punch_out_location = punch.location;
            
            const punchIn = new Date(currentPair.punch_in);
            const punchOut = new Date(currentPair.punch_out);
            const hours = ((punchOut - punchIn) / (1000 * 60 * 60)).toFixed(2);
            
            currentPair.hours_worked = hours;
            pairs.push({ ...currentPair });
            currentPair = {};
        }
    }
    
    // If there's an unpaired punch in
    if (currentPair.punch_in) {
        currentPair.punch_out = null;
        currentPair.hours_worked = null;
        currentPair.status = 'In Progress';
        pairs.push(currentPair);
    }
    
    return pairs;
}

module.exports = router;
