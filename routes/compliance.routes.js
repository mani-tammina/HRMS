/**
 * TIMESHEET COMPLIANCE & ENFORCEMENT ROUTES
 * Handles daily submission tracking, compliance monitoring, reminders, and dashboards
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, hr, admin } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

/* ============ EMPLOYEE COMPLIANCE STATUS ============ */

/**
 * GET /api/compliance/my-status
 * Get current user's compliance status for today
 */
router.get("/my-status", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });

        const c = await db();
        const today = new Date().toISOString().split('T')[0];

        // Check if employee has active projects
        const [assignments] = await c.query(`
            SELECT COUNT(*) as count
            FROM project_assignments
            WHERE employee_id = ? AND status = 'active'
            AND assignment_start_date <= ? 
            AND (assignment_end_date IS NULL OR assignment_end_date >= ?)
        `, [emp.id, today, today]);

        const hasActiveProjects = assignments[0].count > 0;

        // Check today's submission status
        const [submissions] = await c.query(`
            SELECT id, timesheet_type, status, submission_date, total_hours
            FROM timesheets
            WHERE employee_id = ? AND date = ?
            ORDER BY created_at DESC
        `, [emp.id, today]);

        const submitted = submissions.length > 0 && submissions[0].status !== 'draft';

        // Get pending months for client timesheet upload (if project employee)
        let pendingUploads = [];
        if (hasActiveProjects) {
            const [pending] = await c.query(`
                SELECT DISTINCT 
                    YEAR(t.date) as year,
                    MONTH(t.date) as month,
                    COUNT(*) as days_count,
                    SUM(t.total_hours) as total_hours
                FROM timesheets t
                WHERE t.employee_id = ? 
                AND t.timesheet_type = 'project'
                AND t.status IN ('submitted', 'verified')
                AND NOT EXISTS (
                    SELECT 1 FROM timesheets t2
                    WHERE t2.employee_id = t.employee_id
                    AND t2.project_id = t.project_id
                    AND YEAR(t2.date) = YEAR(t.date)
                    AND MONTH(t2.date) = MONTH(t.date)
                    AND t2.client_timesheet_file IS NOT NULL
                )
                AND t.date < DATE_FORMAT(NOW(), '%Y-%m-01')
                GROUP BY YEAR(t.date), MONTH(t.date)
                ORDER BY year DESC, month DESC
                LIMIT 3
            `, [emp.id]);
            pendingUploads = pending;
        }

        // Get this month's stats
        const [monthStats] = await c.query(`
            SELECT 
                COUNT(*) as submitted_days,
                SUM(total_hours) as total_hours,
                AVG(total_hours) as avg_hours_per_day
            FROM timesheets
            WHERE employee_id = ?
            AND YEAR(date) = YEAR(NOW())
            AND MONTH(date) = MONTH(NOW())
            AND status IN ('submitted', 'verified')
        `, [emp.id]);

        c.end();

        res.json({
            success: true,
            compliance: {
                date: today,
                has_active_projects: hasActiveProjects,
                is_submitted: submitted,
                timesheet_type: hasActiveProjects ? 'project' : 'regular',
                submission_details: submissions[0] || null,
                status: submitted ? 'compliant' : 'pending',
                pending_client_uploads: pendingUploads,
                this_month: {
                    submitted_days: monthStats[0].submitted_days || 0,
                    total_hours: monthStats[0].total_hours || 0,
                    avg_hours: Math.round((monthStats[0].avg_hours_per_day || 0) * 100) / 100
                }
            }
        });
    } catch (error) {
        console.error("Error fetching compliance status:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/compliance/my-history
 * Get compliance history for date range
 */
router.get("/my-history", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });

        const { start_date, end_date } = req.query;
        const startDate = start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const endDate = end_date || new Date().toISOString().split('T')[0];

        const c = await db();

        const [history] = await c.query(`
            SELECT 
                t.date,
                t.timesheet_type,
                t.status,
                t.total_hours,
                t.submission_date,
                t.verified_by,
                t.verified_at,
                p.project_name,
                CASE 
                    WHEN t.status IN ('submitted', 'verified') THEN 'compliant'
                    WHEN t.status = 'draft' THEN 'pending'
                    ELSE 'missing'
                END as compliance_status
            FROM timesheets t
            LEFT JOIN projects p ON t.project_id = p.id
            WHERE t.employee_id = ?
            AND t.date BETWEEN ? AND ?
            ORDER BY t.date DESC
        `, [emp.id, startDate, endDate]);

        c.end();

        res.json({
            success: true,
            start_date: startDate,
            end_date: endDate,
            history
        });
    } catch (error) {
        console.error("Error fetching compliance history:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============ ADMIN COMPLIANCE TRACKING ============ */

/**
 * GET /api/compliance/admin/dashboard
 * Admin dashboard with real-time compliance metrics
 */
router.get("/admin/dashboard", auth, admin, async (req, res) => {
    try {
        const c = await db();
        const today = new Date().toISOString().split('T')[0];

        // Today's submission stats
        const [todayStats] = await c.query(`
            SELECT 
                COUNT(DISTINCT e.id) as total_employees,
                COUNT(DISTINCT t.employee_id) as submitted_count,
                COUNT(DISTINCT e.id) - COUNT(DISTINCT t.employee_id) as pending_count,
                ROUND(COUNT(DISTINCT t.employee_id) * 100.0 / COUNT(DISTINCT e.id), 2) as compliance_rate
            FROM employees e
            LEFT JOIN timesheets t ON e.id = t.employee_id 
                AND t.date = ? 
                AND t.status IN ('submitted', 'verified')
            WHERE e.EmploymentStatus = 'Working'
        `, [today]);

        // This week's trends
        const [weekTrends] = await c.query(`
            SELECT 
                DATE(t.date) as date,
                COUNT(DISTINCT t.employee_id) as submitted,
                (SELECT COUNT(*) FROM employees WHERE EmploymentStatus = 'Working') as total,
                ROUND(COUNT(DISTINCT t.employee_id) * 100.0 / 
                    (SELECT COUNT(*) FROM employees WHERE EmploymentStatus = 'Working'), 2) as rate
            FROM timesheets t
            WHERE t.date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            AND t.status IN ('submitted', 'verified')
            GROUP BY DATE(t.date)
            ORDER BY date DESC
        `);

        // Pending validations
        const [pendingValidations] = await c.query(`
            SELECT COUNT(*) as count
            FROM timesheets
            WHERE status = 'submitted'
            AND verified_by IS NULL
        `);

        // Client timesheet validation stats
        const [clientTimesheetStats] = await c.query(`
            SELECT 
                COUNT(*) as total_uploaded,
                SUM(CASE WHEN client_timesheet_status = 'pending_validation' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN client_timesheet_status = 'validated' THEN 1 ELSE 0 END) as validated,
                SUM(CASE WHEN client_timesheet_status = 'mismatch' THEN 1 ELSE 0 END) as mismatched,
                SUM(CASE WHEN client_timesheet_status = 'rejected' THEN 1 ELSE 0 END) as rejected
            FROM timesheets
            WHERE client_timesheet_file IS NOT NULL
            AND date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
        `);

        // Non-compliant employees (today)
        const [nonCompliant] = await c.query(`
            SELECT 
                e.id,
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as name,
                e.WorkEmail,
                d.DepartmentName as department,
                COUNT(pa.id) as active_projects
            FROM employees e
            LEFT JOIN departments d ON e.DepartmentID = d.id
            LEFT JOIN project_assignments pa ON e.id = pa.employee_id 
                AND pa.status = 'active'
                AND pa.assignment_start_date <= ?
                AND (pa.assignment_end_date IS NULL OR pa.assignment_end_date >= ?)
            WHERE e.EmploymentStatus = 'Working'
            AND NOT EXISTS (
                SELECT 1 FROM timesheets t
                WHERE t.employee_id = e.id
                AND t.date = ?
                AND t.status IN ('submitted', 'verified')
            )
            GROUP BY e.id, e.EmployeeNumber, name, e.WorkEmail, d.DepartmentName
            ORDER BY active_projects DESC, name
        `, [today, today, today]);

        // Monthly closure status
        const [periodStatus] = await c.query(`
            SELECT * FROM payroll_period_locks
            ORDER BY created_at DESC LIMIT 3
        `);

        c.end();

        res.json({
            success: true,
            dashboard: {
                today: {
                    date: today,
                    ...todayStats[0],
                    non_compliant_employees: nonCompliant
                },
                week_trends: weekTrends,
                pending_validations: pendingValidations[0].count,
                client_timesheets: clientTimesheetStats[0],
                period_status: periodStatus
            }
        });
    } catch (error) {
        console.error("Error fetching admin dashboard:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/compliance/admin/non-compliant
 * Get list of non-compliant employees for a date
 */
router.get("/admin/non-compliant", auth, admin, async (req, res) => {
    try {
        const { date } = req.query;
        const checkDate = date || new Date().toISOString().split('T')[0];

        const c = await db();

        const [employees] = await c.query(`
            SELECT 
                e.id,
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as employee_name,
                e.WorkEmail,
                e.ContactNumber,
                d.DepartmentName as department,
                des.DesignationName as designation,
                m.FirstName as manager_first_name,
                m.LastName as manager_last_name,
                COUNT(pa.id) as active_projects,
                GROUP_CONCAT(p.project_name SEPARATOR ', ') as projects,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 FROM timesheets t2
                        WHERE t2.employee_id = e.id AND t2.date = ? AND t2.status = 'draft'
                    ) THEN 'draft_saved'
                    ELSE 'not_started'
                END as draft_status
            FROM employees e
            LEFT JOIN departments d ON e.DepartmentID = d.id
            LEFT JOIN designations des ON e.DesignationID = des.id
            LEFT JOIN employees m ON e.ReportingManagerID = m.id
            LEFT JOIN project_assignments pa ON e.id = pa.employee_id 
                AND pa.status = 'active'
                AND pa.assignment_start_date <= ?
                AND (pa.assignment_end_date IS NULL OR pa.assignment_end_date >= ?)
            LEFT JOIN projects p ON pa.project_id = p.id
            WHERE e.EmploymentStatus = 'Working'
            AND NOT EXISTS (
                SELECT 1 FROM timesheets t
                WHERE t.employee_id = e.id
                AND t.date = ?
                AND t.status IN ('submitted', 'verified')
            )
            GROUP BY e.id, e.EmployeeNumber, employee_name, e.WorkEmail, e.ContactNumber,
                     d.DepartmentName, des.DesignationName, m.FirstName, m.LastName
            ORDER BY active_projects DESC, employee_name
        `, [checkDate, checkDate, checkDate, checkDate]);

        c.end();

        res.json({
            success: true,
            date: checkDate,
            non_compliant_count: employees.length,
            employees
        });
    } catch (error) {
        console.error("Error fetching non-compliant employees:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/compliance/admin/send-reminders
 * Send reminders to non-compliant employees
 */
router.post("/admin/send-reminders", auth, admin, async (req, res) => {
    try {
        const { date, employee_ids } = req.body;
        const reminderDate = date || new Date().toISOString().split('T')[0];

        const c = await db();

        // Get non-compliant employees
        let query = `
            SELECT 
                e.id, e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as name,
                e.WorkEmail,
                COUNT(pa.id) as project_count
            FROM employees e
            LEFT JOIN project_assignments pa ON e.id = pa.employee_id AND pa.status = 'active'
            WHERE e.EmploymentStatus = 'Working'
            AND NOT EXISTS (
                SELECT 1 FROM timesheets t
                WHERE t.employee_id = e.id AND t.date = ? AND t.status IN ('submitted', 'verified')
            )
        `;

        const params = [reminderDate];

        if (employee_ids && employee_ids.length > 0) {
            query += ` AND e.id IN (?)`;
            params.push(employee_ids);
        }

        query += ` GROUP BY e.id, e.EmployeeNumber, name, e.WorkEmail`;

        const [employees] = await c.query(query, params);

        // Insert notification records
        const notifications = [];
        for (const emp of employees) {
            await c.query(`
                INSERT INTO timesheet_notifications 
                (employee_id, project_id, notification_type, notification_channel, subject, message, scheduled_at, status)
                VALUES (?, 0, 'reminder', 'in_app', ?, ?, NOW(), 'pending')
            `, [
                emp.id,
                'Timesheet Submission Reminder',
                `Please submit your timesheet for ${reminderDate}. This is a mandatory requirement.`
            ]);

            notifications.push({
                employee_id: emp.id,
                employee_name: emp.name,
                email: emp.WorkEmail
            });
        }

        c.end();

        res.json({
            success: true,
            message: `Reminders sent to ${employees.length} employees`,
            date: reminderDate,
            notifications
        });
    } catch (error) {
        console.error("Error sending reminders:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============ BULK OPERATIONS ============ */

/**
 * POST /api/compliance/admin/bulk-approve
 * Bulk approve timesheets
 */
router.post("/admin/bulk-approve", auth, admin, async (req, res) => {
    try {
        const { timesheet_ids, notes } = req.body;

        if (!timesheet_ids || timesheet_ids.length === 0) {
            return res.status(400).json({ error: "No timesheets selected" });
        }

        const c = await db();

        // Update timesheets
        await c.query(`
            UPDATE timesheets
            SET status = 'verified',
                verified_by = ?,
                verified_at = NOW(),
                validation_remarks = ?
            WHERE id IN (?)
            AND status = 'submitted'
        `, [req.user.id, notes || 'Bulk approved', timesheet_ids]);

        // Get updated count
        const [result] = await c.query(`
            SELECT COUNT(*) as count FROM timesheets WHERE id IN (?)
        `, [timesheet_ids]);

        c.end();

        res.json({
            success: true,
            message: `${result[0].count} timesheets approved successfully`,
            approved_count: result[0].count
        });
    } catch (error) {
        console.error("Error in bulk approve:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/compliance/admin/bulk-validate-client-timesheets
 * Bulk validate client timesheets
 */
router.post("/admin/bulk-validate-client-timesheets", auth, admin, async (req, res) => {
    try {
        const { validations } = req.body;
        // validations: [{ employee_id, project_id, month, year, status, remarks, client_hours }]

        if (!validations || validations.length === 0) {
            return res.status(400).json({ error: "No validations provided" });
        }

        const c = await db();
        const results = [];

        for (const val of validations) {
            const { employee_id, project_id, month, year, status, remarks, client_hours } = val;

            // Update all timesheets for that employee/project/month
            const [result] = await c.query(`
                UPDATE timesheets
                SET client_timesheet_status = ?,
                    validation_remarks = ?,
                    client_reported_hours = ?,
                    validated_by = ?,
                    validated_at = NOW()
                WHERE employee_id = ?
                AND project_id = ?
                AND YEAR(date) = ?
                AND MONTH(date) = ?
                AND client_timesheet_file IS NOT NULL
            `, [status, remarks, client_hours, req.user.id, employee_id, project_id, year, month]);

            results.push({
                employee_id,
                project_id,
                month,
                year,
                affected_rows: result.affectedRows
            });
        }

        c.end();

        res.json({
            success: true,
            message: `Processed ${validations.length} validation records`,
            results
        });
    } catch (error) {
        console.error("Error in bulk validation:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============ MONTH-END CLOSURE ============ */

/**
 * POST /api/compliance/admin/close-month
 * Close timesheet submissions for a month
 */
router.post("/admin/close-month", auth, admin, async (req, res) => {
    try {
        const { month, year } = req.body;

        if (!month || !year) {
            return res.status(400).json({ error: "Month and year are required" });
        }

        const c = await db();

        // Check for pending submissions and validations
        const [pending] = await c.query(`
            SELECT COUNT(*) as pending_count
            FROM timesheets
            WHERE YEAR(date) = ? AND MONTH(date) = ?
            AND status IN ('draft', 'submitted')
        `, [year, month]);

        const [clientPending] = await c.query(`
            SELECT COUNT(*) as pending_count
            FROM timesheets
            WHERE YEAR(date) = ? AND MONTH(date) = ?
            AND timesheet_type = 'project'
            AND client_timesheet_file IS NOT NULL
            AND client_timesheet_status = 'pending_validation'
        `, [year, month]);

        const period = `${year}-${String(month).padStart(2, '0')}`;

        // Insert or update period lock
        await c.query(`
            INSERT INTO payroll_period_locks 
            (payroll_period, lock_status, pending_verifications, flagged_submissions, locked_by, locked_at)
            VALUES (?, 'locked', ?, 0, ?, NOW())
            ON DUPLICATE KEY UPDATE
            lock_status = 'locked',
            pending_verifications = ?,
            locked_by = ?,
            locked_at = NOW()
        `, [period, pending[0].pending_count + clientPending[0].pending_count, req.user.id, 
            pending[0].pending_count + clientPending[0].pending_count, req.user.id]);

        c.end();

        res.json({
            success: true,
            message: `Period ${period} has been locked`,
            period,
            warnings: {
                pending_timesheets: pending[0].pending_count,
                pending_client_validations: clientPending[0].pending_count
            }
        });
    } catch (error) {
        console.error("Error closing month:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/compliance/admin/reopen-month
 * Reopen a closed period for corrections
 */
router.post("/admin/reopen-month", auth, admin, async (req, res) => {
    try {
        const { month, year, reason } = req.body;

        if (!month || !year || !reason) {
            return res.status(400).json({ error: "Month, year, and reason are required" });
        }

        const period = `${year}-${String(month).padStart(2, '0')}`;

        const c = await db();

        await c.query(`
            UPDATE payroll_period_locks
            SET lock_status = 'open',
                locked_by = NULL,
                locked_at = NULL
            WHERE payroll_period = ?
        `, [period]);

        // Log the reopening action
        await c.query(`
            INSERT INTO timesheet_audit_log
            (entity_type, entity_id, action_type, action_by, old_value, new_value)
            VALUES ('compliance', 0, 'period_reopened', ?, ?, ?)
        `, [req.user.id, period, reason]);

        c.end();

        res.json({
            success: true,
            message: `Period ${period} has been reopened`,
            period,
            reason
        });
    } catch (error) {
        console.error("Error reopening month:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/compliance/period-status/:month/:year
 * Check if period is open or closed
 */
router.get("/period-status/:month/:year", auth, async (req, res) => {
    try {
        const { month, year } = req.params;
        const period = `${year}-${String(month).padStart(2, '0')}`;

        const c = await db();

        const [status] = await c.query(`
            SELECT * FROM payroll_period_locks
            WHERE payroll_period = ?
        `, [period]);

        c.end();

        res.json({
            success: true,
            period,
            is_locked: status.length > 0 && status[0].lock_status === 'locked',
            status: status[0] || { lock_status: 'open' }
        });
    } catch (error) {
        console.error("Error checking period status:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============ REPORTS ============ */

/**
 * GET /api/compliance/admin/monthly-report
 * Generate monthly compliance report
 */
router.get("/admin/monthly-report", auth, admin, async (req, res) => {
    try {
        const { month, year } = req.query;
        const reportMonth = month || new Date().getMonth() + 1;
        const reportYear = year || new Date().getFullYear();

        const c = await db();

        // Overall compliance by day
        const [dailyCompliance] = await c.query(`
            SELECT 
                DATE(t.date) as date,
                COUNT(DISTINCT e.id) as total_employees,
                COUNT(DISTINCT t.employee_id) as submitted_employees,
                ROUND(COUNT(DISTINCT t.employee_id) * 100.0 / COUNT(DISTINCT e.id), 2) as compliance_rate
            FROM employees e
            CROSS JOIN (
                SELECT DISTINCT date FROM timesheets 
                WHERE YEAR(date) = ? AND MONTH(date) = ?
            ) dates
            LEFT JOIN timesheets t ON e.id = t.employee_id 
                AND t.date = dates.date 
                AND t.status IN ('submitted', 'verified')
            WHERE e.EmploymentStatus = 'Working'
            GROUP BY DATE(dates.date)
            ORDER BY date
        `, [reportYear, reportMonth]);

        // Department-wise compliance
        const [deptCompliance] = await c.query(`
            SELECT 
                d.DepartmentName as department,
                COUNT(DISTINCT e.id) as total_employees,
                COUNT(DISTINCT t.employee_id) as compliant_employees,
                ROUND(COUNT(DISTINCT t.employee_id) * 100.0 / COUNT(DISTINCT e.id), 2) as compliance_rate
            FROM departments d
            JOIN employees e ON d.id = e.DepartmentID
            LEFT JOIN timesheets t ON e.id = t.employee_id 
                AND YEAR(t.date) = ? AND MONTH(t.date) = ?
                AND t.status IN ('submitted', 'verified')
            WHERE e.EmploymentStatus = 'Working'
            GROUP BY d.id, d.DepartmentName
            ORDER BY compliance_rate DESC
        `, [reportYear, reportMonth]);

        // Top non-compliant employees
        const [topNonCompliant] = await c.query(`
            SELECT 
                e.id,
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as employee_name,
                d.DepartmentName as department,
                COUNT(DISTINCT dates.date) as working_days,
                COUNT(DISTINCT t.id) as submitted_days,
                COUNT(DISTINCT dates.date) - COUNT(DISTINCT t.id) as missing_days,
                ROUND(COUNT(DISTINCT t.id) * 100.0 / COUNT(DISTINCT dates.date), 2) as compliance_rate
            FROM employees e
            JOIN departments d ON e.DepartmentID = d.id
            CROSS JOIN (
                SELECT DISTINCT date FROM timesheets 
                WHERE YEAR(date) = ? AND MONTH(date) = ?
            ) dates
            LEFT JOIN timesheets t ON e.id = t.employee_id 
                AND t.date = dates.date 
                AND t.status IN ('submitted', 'verified')
            WHERE e.EmploymentStatus = 'Working'
            GROUP BY e.id, e.EmployeeNumber, employee_name, d.DepartmentName
            HAVING compliance_rate < 100
            ORDER BY missing_days DESC
            LIMIT 20
        `, [reportYear, reportMonth, reportYear, reportMonth]);

        c.end();

        res.json({
            success: true,
            period: `${reportYear}-${String(reportMonth).padStart(2, '0')}`,
            daily_compliance: dailyCompliance,
            department_compliance: deptCompliance,
            top_non_compliant: topNonCompliant
        });
    } catch (error) {
        console.error("Error generating monthly report:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
