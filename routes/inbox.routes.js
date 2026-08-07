const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");
const { updateNotificationStatus } = require("../utils/inbox-helper");

// Helper function to convert HH:MM to MySQL DATETIME
function parseTime(dateStr, timeStr) {
    if (!timeStr) return null;
    return `${dateStr} ${timeStr}:00`;
}

/* ============ TEAMMATES ON LEAVE ============ */

// GET /api/inbox/teammates-on-leave - Check if any teammates are on leave for dates
router.get("/teammates-on-leave", auth, async (req, res) => {
    let c = null;
    try {
        const { employee_id, start_date, end_date } = req.query;
        if (!employee_id || !start_date) {
            return res.json({ count: 0, teammates: [] });
        }

        const startDate = start_date;
        const endDate = end_date || start_date;

        c = await db();
        
        // 1. Get the employee's reporting manager and department
        const [empRows] = await c.query(
            "SELECT reporting_manager_id, DepartmentId FROM employees WHERE id = ?",
            [employee_id]
        );

        if (empRows.length === 0) {
            c.end();
            return res.json({ count: 0, teammates: [] });
        }

        const managerId = empRows[0].reporting_manager_id;
        const deptId = empRows[0].DepartmentId;

        // 2. Query teammates on leave during start_date..end_date
        let query = `
            SELECT 
                l.id, l.employee_id, l.leave_type, l.start_date, l.end_date, l.status,
                e.FullName as employee_name,
                COALESCE(lt.type_name, l.leave_type) as type_name
            FROM leaves l
            JOIN employees e ON l.employee_id = e.id
            LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
            WHERE l.employee_id != ?
              AND l.status IN ('approved', 'pending')
              AND DATE(l.start_date) <= DATE(?)
              AND DATE(l.end_date) >= DATE(?)
        `;
        const params = [employee_id, endDate, startDate];

        if (managerId) {
            query += " AND (e.reporting_manager_id = ? OR e.DepartmentId = ?)";
            params.push(managerId, deptId);
        } else if (deptId) {
            query += " AND e.DepartmentId = ?";
            params.push(deptId);
        }

        query += " ORDER BY e.FirstName LIMIT 10";

        const [rows] = await c.query(query, params);
        c.end();

        res.json({
            count: rows.length,
            teammates: rows.map(r => ({
                id: r.id,
                employee_id: r.employee_id,
                employee_name: r.employee_name,
                leave_type: r.type_name,
                status: r.status,
                start_date: r.start_date,
                end_date: r.end_date
            }))
        });

    } catch (err) {
        console.error("Error fetching teammates on leave:", err);
        if (c) c.end();
        res.json({ count: 0, teammates: [] });
    }
});

/* ============ NOTIFICATION LIST & DETAILS ============ */

// GET /api/inbox - Get list of notifications for logged-in manager
router.get("/", auth, async (req, res) => {
    let c = null;
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) {
            return res.status(404).json({ error: "Employee profile not found" });
        }

        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const offset = (page - 1) * limit;

        const search = req.query.search || "";
        const tab = req.query.tab || "All";
        const sortField = req.query.sortField || "created_at";
        const sortOrder = req.query.sortOrder === "ASC" ? "ASC" : "DESC";

        c = await db();
        const [allLeaveTypes] = await c.query("SELECT * FROM leave_types");
        console.log("=== DB LEAVE TYPES ===", allLeaveTypes.map(t => ({ id: t.id, name: t.type_name, code: t.type_code })));

        let query = `
            SELECT 
                n.*, 
                e.FullName as employee_name, 
                e.EmployeeNumber as employee_number, 
                d.name as department_name,
                m.FullName as manager_name,
                ts.hours_breakdown as ts_hours_breakdown,
                ts.notes as ts_notes,
                ts.total_hours as ts_total_hours,
                ts.date as ts_date,
                COALESCE(lt.type_name, l.leave_type, CASE WHEN n.request_type = 'Comp Off Request' THEN 'Compensatory Off' ELSE NULL END) as leave_type_name
            FROM inbox_notifications n
            LEFT JOIN employees e ON n.employee_id = e.id
            LEFT JOIN departments d ON e.DepartmentId = d.id
            LEFT JOIN employees m ON n.manager_id = m.id
            LEFT JOIN leaves l ON n.request_id = l.id
            LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
            LEFT JOIN timesheets ts ON n.request_type = 'Timesheet Request' AND n.request_id = ts.id
            WHERE 1=1
        `;
        const params = [];

        // Role check: Admin, HR, Manager
        const userRole = req.user.role?.toLowerCase() || "";
        const isManager = ["manager", "hr", "admin"].includes(userRole);
        if (!isManager) {
            return res.status(403).json({ error: "Access denied. Managers/HR/Admin only." });
        }

        // Scope filter
        if (userRole === "admin" || userRole === "hr") {
            if (req.query.viewAll === "true") {
                // Admin/HR viewing all notifications
            } else {
                query += " AND n.manager_id = ?";
                params.push(emp.id);
            }
        } else {
            // Managers only see their own direct reports' notifications
            query += " AND n.manager_id = ?";
            params.push(emp.id);
        }

        // Tab filters
        if (tab === "Unread") {
            query += " AND n.is_read = 0 AND n.is_archived = 0";
        } else if (tab === "Archived") {
            query += " AND n.is_archived = 1";
        } else if (tab === "Approved") {
            query += " AND n.status = 'Approved' AND n.is_archived = 0";
        } else if (tab === "Rejected") {
            query += " AND n.status = 'Rejected' AND n.is_archived = 0";
        } else {
            // General tabs (All, Leave, Attendance, Timesheet, Resignation) should not show archived
            query += " AND n.is_archived = 0";

            if (tab === "Leave") {
                query += " AND n.request_type IN ('Leave Request', 'Comp Off Request')";
            } else if (tab === "Attendance") {
                query += " AND n.request_type = 'Attendance Regularization'";
            } else if (tab === "Timesheet") {
                query += " AND n.request_type = 'Timesheet Request'";
            } else if (tab === "Resignation") {
                query += " AND n.request_type = 'Resignation Request'";
            } else if (tab === "Comp Off" || tab === "CompOff" || tab === "Comp Off Request") {
                query += " AND n.request_type = 'Comp Off Request'";
            }
        }

        // Search filter
        if (search) {
            query += " AND (n.title LIKE ? OR n.description LIKE ? OR e.FullName LIKE ? OR e.EmployeeNumber LIKE ?)";
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern, searchPattern);
        }

        // Sorting
        const allowedSortFields = ["created_at", "priority", "status", "is_read"];
        const actualSortField = allowedSortFields.includes(sortField) ? `n.${sortField}` : "n.created_at";
        query += ` ORDER BY ${actualSortField} ${sortOrder}`;

        // Get total count
        const countQuery = `SELECT COUNT(*) as total FROM (${query}) as temp`;
        const [countRows] = await c.query(countQuery, params);
        const total = countRows[0]?.total || 0;

        // Apply pagination
        query += " LIMIT ? OFFSET ?";
        params.push(limit, offset);

        const [rows] = await c.query(query, params);

        // Get stats count for manager
        let statsQuery = `
            SELECT 
                COUNT(*) as totalRequests,
                SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status IN ('Approved', 'Verified') THEN 1 ELSE 0 END) as approved,
                SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected,
                SUM(CASE WHEN request_type = 'Leave Request' THEN 1 ELSE 0 END) as leaveCount,
                SUM(CASE WHEN request_type = 'Attendance Regularization' THEN 1 ELSE 0 END) as attendanceCount,
                SUM(CASE WHEN request_type = 'Timesheet Request' THEN 1 ELSE 0 END) as timesheetCount,
                SUM(CASE WHEN request_type = 'Resignation Request' THEN 1 ELSE 0 END) as resignationCount
            FROM inbox_notifications
            WHERE is_archived = 0
        `;
        const statsParams = [];
        if (!(userRole === "admin" || userRole === "hr") || req.query.viewAll !== "true") {
            statsQuery += " AND manager_id = ?";
            statsParams.push(emp.id);
        }
        const [statsRows] = await c.query(statsQuery, statsParams);
        const stats = statsRows[0] || { 
            totalRequests: 0, unread: 0, pending: 0, approved: 0, rejected: 0,
            leaveCount: 0, attendanceCount: 0, timesheetCount: 0, resignationCount: 0 
        };
        
        // Coerce null sum values to 0
        stats.totalRequests = stats.totalRequests || 0;
        stats.unread = stats.unread || 0;
        stats.pending = stats.pending || 0;
        stats.approved = stats.approved || 0;
        stats.rejected = stats.rejected || 0;
        stats.leaveCount = stats.leaveCount || 0;
        stats.attendanceCount = stats.attendanceCount || 0;
        stats.timesheetCount = stats.timesheetCount || 0;
        stats.resignationCount = stats.resignationCount || 0;

        console.log("[Inbox API] Returned leave_type_names:", rows.map(r => ({ id: r.notification_id, type: r.request_type, req_id: r.request_id, leave_type_name: r.leave_type_name })));

        res.json({
            success: true,
            data: rows,
            total,
            unreadCount: stats.unread,
            stats
        });
    } catch (err) {
        console.error("[Inbox API] Error in GET /:", err);
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// Diagnostics endpoint
router.get("/diagnose-leaves-join", async (req, res) => {
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query(`
            SELECT 
                n.notification_id,
                n.request_type,
                n.request_id,
                n.title,
                l.id as leaf_id,
                l.leave_type_id,
                l.leave_type,
                lt.type_name
            FROM inbox_notifications n
            LEFT JOIN leaves l ON n.request_id = l.id
            LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
        `);
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// GET /api/inbox/:id - Get a single notification details
router.get("/:id", auth, async (req, res) => {
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query(
            `SELECT n.*, e.FullName as employee_name, e.EmployeeNumber as employee_number, d.name as department_name, m.FullName as manager_name, COALESCE(lt.type_name, l.leave_type, CASE WHEN n.request_type = 'Comp Off Request' THEN 'Compensatory Off' ELSE NULL END) as leave_type_name
             FROM inbox_notifications n
             LEFT JOIN employees e ON n.employee_id = e.id
             LEFT JOIN departments d ON e.DepartmentId = d.id
             LEFT JOIN employees m ON n.manager_id = m.id
             LEFT JOIN leaves l ON n.request_id = l.id
             LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
             WHERE n.notification_id = ?`,
            [req.params.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.json({ success: true, data: rows[0] });
    } catch (err) {
        console.error("[Inbox API] Error in GET /:id:", err);
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// PUT /api/inbox/read-all - Mark all notifications as read for current manager
router.put("/read-all", auth, async (req, res) => {
    let c = null;
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) {
            return res.status(404).json({ error: "Employee profile not found" });
        }
        const userRole = req.user.role?.toLowerCase() || "";
        c = await db();
        let query = "UPDATE inbox_notifications SET is_read = 1, updated_at = NOW() WHERE is_read = 0 AND is_archived = 0";
        const params = [];
        if (!(userRole === "admin" || userRole === "hr")) {
            query += " AND manager_id = ?";
            params.push(emp.id);
        }
        await c.query(query, params);
        res.json({ success: true, message: "All notifications marked as read" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// PUT /api/inbox/read/:id - Mark notification as read
router.put("/read/:id", auth, async (req, res) => {
    let c = null;
    try {
        c = await db();
        await c.query(
            "UPDATE inbox_notifications SET is_read = 1, updated_at = NOW() WHERE notification_id = ?",
            [req.params.id]
        );
        res.json({ success: true, message: "Notification marked as read" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// PUT /api/inbox/archive/:id - Archive notification
router.put("/archive/:id", auth, async (req, res) => {
    let c = null;
    try {
        c = await db();
        await c.query(
            "UPDATE inbox_notifications SET is_archived = 1, updated_at = NOW() WHERE notification_id = ?",
            [req.params.id]
        );
        res.json({ success: true, message: "Notification archived" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// DELETE /api/inbox/:id - Delete notification
router.delete("/:id", auth, async (req, res) => {
    let c = null;
    try {
        c = await db();
        await c.query(
            "DELETE FROM inbox_notifications WHERE notification_id = ?",
            [req.params.id]
        );
        res.json({ success: true, message: "Notification deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// POST /api/inbox/create - Manual creation of notifications (e.g. for testing)
router.post("/create", auth, async (req, res) => {
    let c = null;
    try {
        const { employee_id, manager_id, request_type, request_id, title, description, priority, metadata } = req.body;
        c = await db();
        const [result] = await c.query(
            `INSERT INTO inbox_notifications 
             (employee_id, manager_id, request_type, request_id, title, description, priority, metadata, status, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())`,
            [employee_id, manager_id, request_type, request_id, title, description, priority || "Medium", metadata ? JSON.stringify(metadata) : null]
        );
        res.json({ success: true, notification_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

/* ============ SPECIAL WORKFLOWS ============ */

// POST /api/inbox/attendance/action - Regularization approval/rejection from Inbox
router.post("/attendance/action", auth, async (req, res) => {
    let c = null;
    try {
        const { notification_id, action, remarks } = req.body;
        if (!notification_id || !action) {
            return res.status(400).json({ error: "notification_id and action are required" });
        }

        const managerEmp = await findEmployeeByUserId(req.user.id);
        if (!managerEmp) return res.status(404).json({ error: "Manager not found" });

        c = await db();

        // 1. Fetch notification
        const [notifications] = await c.query(
            "SELECT * FROM inbox_notifications WHERE notification_id = ?",
            [notification_id]
        );
        if (notifications.length === 0) {
            return res.status(404).json({ error: "Notification not found" });
        }

        const notification = notifications[0];

        // Authorization check: Admin, HR, or direct manager
        const isHR = ["admin", "hr"].includes(req.user.role?.toLowerCase());
        const isReportingManager = notification.manager_id === managerEmp.id;
        if (!isHR && !isReportingManager) {
            return res.status(403).json({ error: "Access denied. You are not authorized to perform actions on this request." });
        }

        const resolvedStatus = action === "Approve" ? "Approved" : "Rejected";

        if (notification.status === resolvedStatus) {
            return res.json({ success: true, message: `Attendance regularization request is ${resolvedStatus.toLowerCase()}` });
        }

        await c.beginTransaction();

        if (action === "Approve") {
            // Get regularization metadata
            let metadata = {};
            try {
                metadata = JSON.parse(notification.metadata);
            } catch (jsonErr) {
                console.warn("[Inbox API] Failed to parse regularization metadata:", notification.metadata);
            }

            const empId = notification.employee_id;
            const dateStr = metadata.attendance_date;
            const status = metadata.status || "present";
            const workMode = metadata.work_mode || "Office";
            const location = metadata.location || "Office";
            const reason = metadata.reason || "Regularized";
            
            const firstCheckIn = parseTime(dateStr, metadata.first_check_in);
            const lastCheckOut = parseTime(dateStr, metadata.last_check_out);

            const role = String(req.user.role || "").toUpperCase();
            const regularizedNote = remarks
                ? `[REGULARIZED ${role} user:${req.user.id}] ${remarks}`
                : `[REGULARIZED ${role} user:${req.user.id}] ${reason}`;

            // Check if attendance row exists
            const [existingAttendance] = await c.query(
                "SELECT id, notes FROM attendance WHERE employee_id = ? AND attendance_date = ? LIMIT 1",
                [empId, dateStr]
            );

            let attendanceId;
            if (!existingAttendance.length) {
                const [ins] = await c.query(
                    `INSERT INTO attendance
                      (employee_id, attendance_date, punch_date, first_check_in, last_check_out, work_mode, location, status, notes)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [empId, dateStr, dateStr, firstCheckIn, lastCheckOut, workMode, location, status, regularizedNote]
                );
                attendanceId = ins.insertId;
            } else {
                attendanceId = existingAttendance[0].id;
                const mergedNotes = existingAttendance[0].notes
                    ? `${existingAttendance[0].notes}\n${regularizedNote}`
                    : regularizedNote;

                await c.query(
                    `UPDATE attendance
                     SET punch_date = ?, first_check_in = ?, last_check_out = ?, work_mode = ?, location = ?, status = ?, notes = ?
                     WHERE id = ?`,
                    [dateStr, firstCheckIn, lastCheckOut, workMode, location, status, mergedNotes, attendanceId]
                );
            }

            // Clear old punches and insert new
            await c.query("DELETE FROM attendance_punches WHERE attendance_id = ?", [attendanceId]);

            if (firstCheckIn) {
                await c.query(
                    `INSERT INTO attendance_punches
                      (attendance_id, employee_id, punch_type, punch_time, punch_date, notes)
                     VALUES (?, ?, 'in', ?, ?, ?)`,
                    [attendanceId, empId, firstCheckIn, dateStr, regularizedNote]
                );
            }

            if (lastCheckOut) {
                await c.query(
                    `INSERT INTO attendance_punches
                      (attendance_id, employee_id, punch_type, punch_time, punch_date, notes)
                     VALUES (?, ?, 'out', ?, ?, ?)`,
                    [attendanceId, empId, lastCheckOut, dateStr, regularizedNote]
                );
            }
        }

        // Update Notification status
        await c.query(
            `UPDATE inbox_notifications 
             SET status = ?, is_read = 1, action_taken_by = ?, action_taken_on = NOW(), updated_at = NOW() 
             WHERE notification_id = ?`,
            [resolvedStatus, managerEmp.id, notification_id]
        );

        await c.commit();
        res.json({ success: true, message: `Attendance regularization request ${resolvedStatus.toLowerCase()} successfully` });

    } catch (err) {
        if (c) await c.rollback();
        console.error("[Inbox API] Error in attendance regularization action:", err);
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

module.exports = router;
