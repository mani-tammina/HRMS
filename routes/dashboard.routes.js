/**
 * DASHBOARD & ANALYTICS ROUTES
 * Provides role-based dashboard statistics and analytics
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr, manager } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

/* ============================================
   ADMIN DASHBOARD
   ============================================ */

router.get("/admin", auth, admin, async (req, res) => {
    try {
        const c = await db();

        // Total employees by status
        const [employeeCounts] = await c.query(`
            SELECT 
                EmploymentStatus,
                COUNT(*) as count
            FROM employees
            GROUP BY EmploymentStatus
        `);

        // Department-wise headcount
        const [departmentCounts] = await c.query(`
            SELECT 
                d.name as department_name,
                COUNT(e.id) as employee_count
            FROM departments d
            LEFT JOIN employees e ON d.id = e.DepartmentId AND e.EmploymentStatus = 'Working'
            GROUP BY d.id, d.name
            ORDER BY employee_count DESC
        `);

        // Location-wise headcount
        const [locationCounts] = await c.query(`
            SELECT 
                l.name as location_name,
                COUNT(e.id) as employee_count
            FROM locations l
            LEFT JOIN employees e ON l.id = e.LocationId AND e.EmploymentStatus = 'Working'
            GROUP BY l.id, l.name
            ORDER BY employee_count DESC
        `);

        // Attendance summary (today)
        const today = new Date().toISOString().split('T')[0];
        const [attendanceSummary] = await c.query(`
            SELECT 
                COUNT(DISTINCT CASE WHEN status = 'present' THEN employee_id END) as present_count,
                COUNT(DISTINCT CASE WHEN status = 'absent' THEN employee_id END) as absent_count,
                COUNT(DISTINCT CASE WHEN status = 'half-day' THEN employee_id END) as half_day_count,
                COUNT(DISTINCT CASE WHEN status = 'late' THEN employee_id END) as late_count,
                COUNT(DISTINCT CASE WHEN status = 'on-leave' THEN employee_id END) as on_leave_count
            FROM attendance
            WHERE attendance_date = ?
        `, [today]);

        // Leave summary
        const [leaveSummary] = await c.query(`
            SELECT 
                COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_leaves,
                COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_leaves,
                COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_leaves,
                COUNT(CASE WHEN start_date <= CURDATE() AND end_date >= CURDATE() AND status = 'approved' THEN 1 END) as employees_on_leave_today
            FROM leaves
            WHERE YEAR(applied_at) = YEAR(CURDATE())
        `);

        // Timesheet compliance (current month)
        const [timesheetCompliance] = await c.query(`
            SELECT 
                COUNT(DISTINCT employee_id) as total_employees,
                COUNT(DISTINCT CASE WHEN status = 'submitted' THEN employee_id END) as submitted_count,
                COUNT(DISTINCT CASE WHEN status = 'verified' THEN employee_id END) as verified_count,
                COUNT(DISTINCT CASE WHEN status = 'draft' THEN employee_id END) as draft_count
            FROM timesheets
            WHERE MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
        `);

        // Upcoming birthdays (next 7 days)
        const [upcomingBirthdays] = await c.query(`
            SELECT 
                id,
                EmployeeNumber,
                FirstName,
                LastName,
                DateOfBirth,
                CONCAT(
                    YEAR(CURDATE()), '-',
                    LPAD(MONTH(DateOfBirth), 2, '0'), '-',
                    LPAD(DAY(DateOfBirth), 2, '0')
                ) as birthday_this_year
            FROM employees
            WHERE EmploymentStatus = 'Working'
            AND DateOfBirth IS NOT NULL
            AND DAYOFYEAR(CONCAT(YEAR(CURDATE()), '-', LPAD(MONTH(DateOfBirth), 2, '0'), '-', LPAD(DAY(DateOfBirth), 2, '0'))) 
                BETWEEN DAYOFYEAR(CURDATE()) AND DAYOFYEAR(CURDATE() + INTERVAL 7 DAY)
            ORDER BY DAYOFYEAR(CONCAT(YEAR(CURDATE()), '-', LPAD(MONTH(DateOfBirth), 2, '0'), '-', LPAD(DAY(DateOfBirth), 2, '0')))
        `);

        // Active projects
        const [projectStats] = await c.query(`
            SELECT 
                COUNT(*) as total_projects,
                COUNT(CASE WHEN status = 'active' THEN 1 END) as active_projects,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_projects
            FROM projects
        `);

        // Support tickets
        const [supportStats] = await c.query(`
            SELECT 
                COUNT(CASE WHEN status = 'Open' THEN 1 END) as open_tickets,
                COUNT(CASE WHEN status = 'In Progress' THEN 1 END) as in_progress_tickets,
                COUNT(CASE WHEN status = 'Closed' THEN 1 END) as closed_tickets
            FROM support_tickets
        `);

        c.end();

        res.json({
            employee_stats: {
                by_status: employeeCounts,
                by_department: departmentCounts,
                by_location: locationCounts
            },
            attendance_today: attendanceSummary[0],
            leave_summary: leaveSummary[0],
            timesheet_compliance: timesheetCompliance[0],
            upcoming_birthdays: upcomingBirthdays,
            project_stats: projectStats[0],
            support_stats: supportStats[0]
        });
    } catch (error) {
        console.error("Error fetching admin dashboard:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   HR DASHBOARD
   ============================================ */

router.get("/hr", auth, hr, async (req, res) => {
    try {
        const c = await db();

        // Total active employees
        const [totalEmployees] = await c.query(`
            SELECT COUNT(*) as count FROM employees WHERE EmploymentStatus = 'Working'
        `);

        // Pending approvals
        const [pendingLeaves] = await c.query(`
            SELECT COUNT(*) as count FROM leaves WHERE status = 'pending'
        `);

        const [pendingTimesheets] = await c.query(`
            SELECT COUNT(*) as count FROM timesheets 
            WHERE status = 'submitted' AND MONTH(date) = MONTH(CURDATE())
        `);

        // Onboarding candidates
        const [onboardingCandidates] = await c.query(`
            SELECT 
                COUNT(CASE WHEN status = 'offer_accepted' THEN 1 END) as offer_accepted,
                COUNT(CASE WHEN status = 'documents_pending' THEN 1 END) as documents_pending,
                COUNT(CASE WHEN status = 'bgv_initiated' THEN 1 END) as bgv_in_progress,
                COUNT(CASE WHEN status = 'ready_to_join' THEN 1 END) as ready_to_join
            FROM candidates
        `);

        // Attendance today
        const today = new Date().toISOString().split('T')[0];
        const [attendanceToday] = await c.query(`
            SELECT 
                COUNT(*) as total_marked,
                COUNT(CASE WHEN status = 'present' THEN 1 END) as present,
                COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent
            FROM attendance
            WHERE attendance_date = ?
        `, [today]);

        // Recent employees (joined in last 30 days)
        const [recentJoiners] = await c.query(`
            SELECT 
                COUNT(*) as count,
                GROUP_CONCAT(CONCAT(FirstName, ' ', LastName) SEPARATOR ', ') as names
            FROM employees
            WHERE DateJoined >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            AND EmploymentStatus = 'Working'
        `);

        c.end();

        res.json({
            total_employees: totalEmployees[0].count,
            pending_approvals: {
                leaves: pendingLeaves[0].count,
                timesheets: pendingTimesheets[0].count
            },
            onboarding_pipeline: onboardingCandidates[0],
            attendance_today: attendanceToday[0],
            recent_joiners: recentJoiners[0]
        });
    } catch (error) {
        console.error("Error fetching HR dashboard:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   MANAGER DASHBOARD
   ============================================ */

router.get("/manager", auth, manager, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) {
            return res.status(404).json({ error: "Employee profile not found" });
        }

        const c = await db();

        // Team members count
        const [teamCount] = await c.query(`
            SELECT COUNT(*) as count 
            FROM employees 
            WHERE reporting_manager_id = ? AND EmploymentStatus = 'Working'
        `, [emp.id]);

        // Team attendance today
        const today = new Date().toISOString().split('T')[0];
        const [teamAttendance] = await c.query(`
            SELECT 
                COUNT(DISTINCT a.employee_id) as marked_count,
                COUNT(DISTINCT CASE WHEN a.status = 'present' THEN a.employee_id END) as present_count
            FROM attendance a
            INNER JOIN employees e ON a.employee_id = e.id
            WHERE e.reporting_manager_id = ? 
            AND a.attendance_date = ?
        `, [emp.id, today]);

        // Pending leave approvals
        const [pendingLeaves] = await c.query(`
            SELECT 
                l.*,
                e.EmployeeNumber,
                e.FirstName,
                e.LastName,
                lt.type_name
            FROM leaves l
            INNER JOIN employees e ON l.employee_id = e.id
            LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
            WHERE e.reporting_manager_id = ? 
            AND l.status = 'pending'
            ORDER BY l.applied_at DESC
            LIMIT 10
        `, [emp.id]);

        // Team on leave today
        const [teamOnLeave] = await c.query(`
            SELECT 
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as employee_name,
                l.leave_type,
                l.start_date,
                l.end_date
            FROM leaves l
            INNER JOIN employees e ON l.employee_id = e.id
            WHERE e.reporting_manager_id = ?
            AND l.status = 'approved'
            AND l.start_date <= CURDATE()
            AND l.end_date >= CURDATE()
        `, [emp.id]);

        // Pending timesheets
        const [pendingTimesheets] = await c.query(`
            SELECT COUNT(*) as count
            FROM timesheets t
            INNER JOIN employees e ON t.employee_id = e.id
            WHERE e.reporting_manager_id = ?
            AND t.status = 'submitted'
            AND MONTH(t.date) = MONTH(CURDATE())
        `, [emp.id]);

        c.end();

        res.json({
            team_size: teamCount[0].count,
            team_attendance_today: teamAttendance[0],
            pending_leave_approvals: pendingLeaves,
            team_on_leave_today: teamOnLeave,
            pending_timesheet_approvals: pendingTimesheets[0].count
        });
    } catch (error) {
        console.error("Error fetching manager dashboard:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   EMPLOYEE DASHBOARD
   ============================================ */

router.get("/employee", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) {
            return res.status(404).json({ error: "Employee profile not found" });
        }

        const c = await db();

        // My attendance this month
        const [myAttendance] = await c.query(`
            SELECT 
                COUNT(*) as days_present,
                SUM(total_work_hours) as total_hours_worked
            FROM attendance
            WHERE employee_id = ?
            AND MONTH(attendance_date) = MONTH(CURDATE())
            AND YEAR(attendance_date) = YEAR(CURDATE())
            AND status = 'present'
        `, [emp.id]);

        // My leave balance
        const currentYear = new Date().getFullYear();
        const [leaveBalance] = await c.query(`
            SELECT 
                lt.type_name,
                elb.allocated_days,
                elb.used_days,
                elb.available_days,
                elb.carry_forward_days
            FROM employee_leave_balances elb
            INNER JOIN leave_types lt ON elb.leave_type_id = lt.id
            WHERE elb.employee_id = ?
            AND elb.leave_year = ?
            ORDER BY lt.type_name
        `, [emp.id, currentYear]);

        // My pending leaves
        const [pendingLeaves] = await c.query(`
            SELECT COUNT(*) as count
            FROM leaves
            WHERE employee_id = ? AND status = 'pending'
        `, [emp.id]);

        // My timesheet status (current month)
        const [timesheetStatus] = await c.query(`
            SELECT 
                COUNT(*) as total_days,
                COUNT(CASE WHEN status = 'submitted' THEN 1 END) as submitted_days,
                COUNT(CASE WHEN status = 'verified' THEN 1 END) as verified_days,
                COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_days
            FROM timesheets
            WHERE employee_id = ?
            AND MONTH(date) = MONTH(CURDATE())
            AND YEAR(date) = YEAR(CURDATE())
        `, [emp.id]);

        // My projects
        const [myProjects] = await c.query(`
            SELECT 
                p.project_name,
                p.client_name,
                pa.role_in_project,
                pa.allocation_percentage,
                pa.assignment_start_date
            FROM project_assignments pa
            INNER JOIN projects p ON pa.project_id = p.id
            WHERE pa.employee_id = ?
            AND pa.status = 'active'
        `, [emp.id]);

        // My assets
        const [myAssets] = await c.query(`
            SELECT 
                asset_type,
                asset_name,
                asset_id,
                allocated_date
            FROM asset_allocations
            WHERE employee_id = ?
            AND status = 'allocated'
        `, [emp.id]);

        // Upcoming holidays (next 30 days)
        const [upcomingHolidays] = await c.query(`
            SELECT 
                holiday_date,
                holiday_name,
                day_name
            FROM holidays
            WHERE holiday_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
            ORDER BY holiday_date
        `);

        c.end();

        res.json({
            attendance_this_month: myAttendance[0],
            leave_balance: leaveBalance,
            pending_leave_requests: pendingLeaves[0].count,
            timesheet_status: timesheetStatus[0],
            my_projects: myProjects,
            my_assets: myAssets,
            upcoming_holidays: upcomingHolidays
        });
    } catch (error) {
        console.error("Error fetching employee dashboard:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   ANALYTICS ENDPOINTS
   ============================================ */

// Attendance Analytics
router.get("/analytics/attendance", auth, manager, async (req, res) => {
    try {
        const { start_date, end_date, department_id, location_id } = req.query;
        const c = await db();

        let query = `
            SELECT 
                DATE(a.attendance_date) as date,
                COUNT(DISTINCT a.employee_id) as total_employees,
                COUNT(DISTINCT CASE WHEN a.status = 'present' THEN a.employee_id END) as present_count,
                COUNT(DISTINCT CASE WHEN a.status = 'absent' THEN a.employee_id END) as absent_count,
                COUNT(DISTINCT CASE WHEN a.status = 'late' THEN a.employee_id END) as late_count,
                AVG(a.total_work_hours) as avg_work_hours
            FROM attendance a
            INNER JOIN employees e ON a.employee_id = e.id
            WHERE 1=1
        `;

        const params = [];

        if (start_date) {
            query += " AND a.attendance_date >= ?";
            params.push(start_date);
        }

        if (end_date) {
            query += " AND a.attendance_date <= ?";
            params.push(end_date);
        }

        if (department_id) {
            query += " AND e.DepartmentId = ?";
            params.push(department_id);
        }

        if (location_id) {
            query += " AND e.LocationId = ?";
            params.push(location_id);
        }

        query += " GROUP BY DATE(a.attendance_date) ORDER BY date DESC";

        const [analytics] = await c.query(query, params);
        c.end();

        res.json(analytics);
    } catch (error) {
        console.error("Error fetching attendance analytics:", error);
        res.status(500).json({ error: error.message });
    }
});

// Leave Analytics
router.get("/analytics/leaves", auth, hr, async (req, res) => {
    try {
        const { year, department_id } = req.query;
        const targetYear = year || new Date().getFullYear();
        const c = await db();

        let query = `
            SELECT 
                lt.type_name,
                COUNT(l.id) as total_applications,
                COUNT(CASE WHEN l.status = 'approved' THEN 1 END) as approved_count,
                COUNT(CASE WHEN l.status = 'rejected' THEN 1 END) as rejected_count,
                COUNT(CASE WHEN l.status = 'pending' THEN 1 END) as pending_count,
                SUM(CASE WHEN l.status = 'approved' THEN l.total_days ELSE 0 END) as total_days_taken
            FROM leaves l
            LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
            INNER JOIN employees e ON l.employee_id = e.id
            WHERE YEAR(l.applied_at) = ?
        `;

        const params = [targetYear];

        if (department_id) {
            query += " AND e.DepartmentId = ?";
            params.push(department_id);
        }

        query += " GROUP BY lt.id, lt.type_name ORDER BY total_applications DESC";

        const [analytics] = await c.query(query, params);
        c.end();

        res.json(analytics);
    } catch (error) {
        console.error("Error fetching leave analytics:", error);
        res.status(500).json({ error: error.message });
    }
});

// Timesheet Analytics
router.get("/analytics/timesheets", auth, manager, async (req, res) => {
    try {
        const { month, year, project_id } = req.query;
        const targetMonth = month || new Date().getMonth() + 1;
        const targetYear = year || new Date().getFullYear();
        const c = await db();

        let query = `
            SELECT 
                DATE(t.date) as date,
                COUNT(DISTINCT t.employee_id) as employees_submitted,
                SUM(t.total_hours) as total_hours,
                AVG(t.total_hours) as avg_hours_per_employee,
                COUNT(CASE WHEN t.status = 'verified' THEN 1 END) as verified_count,
                COUNT(CASE WHEN t.status = 'submitted' THEN 1 END) as pending_verification
            FROM timesheets t
            WHERE MONTH(t.date) = ? AND YEAR(t.date) = ?
        `;

        const params = [targetMonth, targetYear];

        if (project_id) {
            query += " AND t.project_id = ?";
            params.push(project_id);
        }

        query += " GROUP BY DATE(t.date) ORDER BY date DESC";

        const [analytics] = await c.query(query, params);
        c.end();

        res.json(analytics);
    } catch (error) {
        console.error("Error fetching timesheet analytics:", error);
        res.status(500).json({ error: error.message });
    }
});

// Payroll Analytics
router.get("/analytics/payroll", auth, admin, async (req, res) => {
    try {
        const { year } = req.query;
        const targetYear = year || new Date().getFullYear();
        const c = await db();

        // Monthly payroll summary
        const [monthlySummary] = await c.query(`
            SELECT 
                pr.month,
                pr.year,
                COUNT(DISTINCT ps.employee_id) as employees_paid,
                SUM(ps.gross_amount) as total_gross,
                SUM(ps.total_deductions) as total_deductions,
                SUM(ps.net_pay) as total_net_pay
            FROM payroll_runs pr
            INNER JOIN payroll_slips ps ON pr.id = ps.payroll_run_id
            WHERE pr.year = ?
            GROUP BY pr.month, pr.year
            ORDER BY pr.month
        `, [targetYear]);

        // Department-wise payroll
        const [departmentPayroll] = await c.query(`
            SELECT 
                d.name as department_name,
                COUNT(DISTINCT ps.employee_id) as employee_count,
                AVG(ps.net_pay) as avg_net_pay,
                SUM(ps.net_pay) as total_net_pay
            FROM payroll_slips ps
            INNER JOIN employees e ON ps.employee_id = e.id
            LEFT JOIN departments d ON e.DepartmentId = d.id
            INNER JOIN payroll_runs pr ON ps.payroll_run_id = pr.id
            WHERE pr.year = ?
            GROUP BY d.id, d.name
            ORDER BY total_net_pay DESC
        `, [targetYear]);

        c.end();

        res.json({
            monthly_summary: monthlySummary,
            department_wise: departmentPayroll
        });
    } catch (error) {
        console.error("Error fetching payroll analytics:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
