/**
 * ENHANCED LEAVE ROUTES
 * Complete leave management with plans, allocations, and balances
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

/* ============================================
   LEAVE PLANS MANAGEMENT (HR/Admin Only)
   ============================================ */

// Create Leave Plan
router.post("/plans", auth, hr, async (req, res) => {
    try {
        const { name, description, leave_year_start_month, leave_year_start_day, allocations } = req.body;
        
        const c = await db();
        await c.beginTransaction();
        
        // Create leave plan
        const [planResult] = await c.query(
            `INSERT INTO leave_plans (name, description, leave_year_start_month, leave_year_start_day, is_active)
             VALUES (?, ?, ?, ?, 1)`,
            [name, description, leave_year_start_month || 1, leave_year_start_day || 1]
        );
        
        const planId = planResult.insertId;
        
        // Add allocations if provided
        if (allocations && allocations.length > 0) {
            for (const allocation of allocations) {
                await c.query(
                    `INSERT INTO leave_plan_allocations (leave_plan_id, leave_type_id, days_allocated, prorate_on_joining)
                     VALUES (?, ?, ?, ?)`,
                    [planId, allocation.leave_type_id, allocation.days_allocated, allocation.prorate_on_joining !== false ? 1 : 0]
                );
            }
        }
        
        await c.commit();
        c.end();
        
        res.json({ 
            success: true, 
            planId,
            message: "Leave plan created successfully"
        });
    } catch (error) {
        console.error("Error creating leave plan:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get All Leave Plans
router.get("/plans", auth, async (req, res) => {
    try {
        const c = await db();
        
        const [plans] = await c.query(`
            SELECT 
                lp.*,
                COUNT(DISTINCT lpa.id) as leave_types_count,
                COUNT(DISTINCT e.id) as employees_count
            FROM leave_plans lp
            LEFT JOIN leave_plan_allocations lpa ON lp.id = lpa.leave_plan_id
            LEFT JOIN employees e ON e.leave_plan_id = lp.id
            GROUP BY lp.id
            ORDER BY lp.is_active DESC, lp.name ASC
        `);
        
        c.end();
        res.json(plans);
    } catch (error) {
        console.error("Error fetching leave plans:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Leave Plan Details with Allocations
router.get("/plans/:id", auth, async (req, res) => {
    try {
        const c = await db();
        
        const [plans] = await c.query(`SELECT * FROM leave_plans WHERE id = ?`, [req.params.id]);
        
        if (plans.length === 0) {
            c.end();
            return res.status(404).json({ error: "Leave plan not found" });
        }
        
        const [allocations] = await c.query(`
            SELECT 
                lpa.*,
                lt.type_name,
                lt.type_code,
                lt.is_paid,
                lt.can_carry_forward,
                lt.max_carry_forward_days
            FROM leave_plan_allocations lpa
            INNER JOIN leave_types lt ON lpa.leave_type_id = lt.id
            WHERE lpa.leave_plan_id = ?
            ORDER BY lt.type_name
        `, [req.params.id]);
        
        c.end();
        
        res.json({
            ...plans[0],
            allocations
        });
    } catch (error) {
        console.error("Error fetching leave plan details:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update Leave Plan
router.put("/plans/:id", auth, hr, async (req, res) => {
    try {
        const { name, description, leave_year_start_month, leave_year_start_day, is_active, allocations } = req.body;
        
        const c = await db();
        await c.beginTransaction();
        
        // Update plan
        await c.query(
            `UPDATE leave_plans 
             SET name = ?, description = ?, leave_year_start_month = ?, 
                 leave_year_start_day = ?, is_active = ?
             WHERE id = ?`,
            [name, description, leave_year_start_month, leave_year_start_day, is_active, req.params.id]
        );
        
        // Update allocations if provided
        if (allocations) {
            // Delete existing allocations
            await c.query(`DELETE FROM leave_plan_allocations WHERE leave_plan_id = ?`, [req.params.id]);
            
            // Insert new allocations
            for (const allocation of allocations) {
                await c.query(
                    `INSERT INTO leave_plan_allocations (leave_plan_id, leave_type_id, days_allocated, prorate_on_joining)
                     VALUES (?, ?, ?, ?)`,
                    [req.params.id, allocation.leave_type_id, allocation.days_allocated, allocation.prorate_on_joining !== false ? 1 : 0]
                );
            }
        }
        
        await c.commit();
        c.end();
        
        res.json({ success: true, message: "Leave plan updated successfully" });
    } catch (error) {
        console.error("Error updating leave plan:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   LEAVE TYPES MANAGEMENT (HR/Admin Only)
   ============================================ */

// Create Leave Type
router.post("/types", auth, hr, async (req, res) => {
    try {
        const { 
            type_name, type_code, description, is_paid, requires_approval, 
            can_carry_forward, max_carry_forward_days 
        } = req.body;
        
        const c = await db();
        const [result] = await c.query(
            `INSERT INTO leave_types 
             (type_name, type_code, description, is_paid, requires_approval, can_carry_forward, max_carry_forward_days)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [type_name, type_code, description, is_paid !== false ? 1 : 0, 
             requires_approval !== false ? 1 : 0, can_carry_forward || 0, max_carry_forward_days || 0]
        );
        c.end();
        
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error("Error creating leave type:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get All Leave Types
router.get("/types", auth, async (req, res) => {
    try {
        const c = await db();
        const [types] = await c.query(`
            SELECT * FROM leave_types 
            WHERE is_active = 1 
            ORDER BY type_name
        `);
        c.end();
        res.json(types);
    } catch (error) {
        console.error("Error fetching leave types:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update Leave Type
router.put("/types/:id", auth, hr, async (req, res) => {
    try {
        const c = await db();
        await c.query(`UPDATE leave_types SET ? WHERE id = ?`, [req.body, req.params.id]);
        c.end();
        res.json({ success: true });
    } catch (error) {
        console.error("Error updating leave type:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   EMPLOYEE LEAVE BALANCE MANAGEMENT
   ============================================ */

// Initialize Leave Balances for Employee
router.post("/initialize-balance/:employeeId", auth, hr, async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { leave_year } = req.body;
        
        const c = await db();
        await c.beginTransaction();
        
        // Get employee's leave plan
        const [employees] = await c.query(
            `SELECT leave_plan_id, DateJoined FROM employees WHERE id = ?`,
            [employeeId]
        );
        
        if (employees.length === 0) {
            c.end();
            return res.status(404).json({ error: "Employee not found" });
        }
        
        const employee = employees[0];
        
        if (!employee.leave_plan_id) {
            c.end();
            return res.status(400).json({ error: "Employee has no leave plan assigned" });
        }
        
        // Get leave plan allocations
        const [allocations] = await c.query(`
            SELECT lpa.*, lt.can_carry_forward, lt.max_carry_forward_days
            FROM leave_plan_allocations lpa
            INNER JOIN leave_types lt ON lpa.leave_type_id = lt.id
            WHERE lpa.leave_plan_id = ?
        `, [employee.leave_plan_id]);
        
        const currentYear = leave_year || new Date().getFullYear();
        
        // Calculate proration if joining mid-year
        const joiningDate = new Date(employee.DateJoined);
        const yearStartDate = new Date(currentYear, 0, 1);
        const yearEndDate = new Date(currentYear, 11, 31);
        
        for (const allocation of allocations) {
            let allocatedDays = allocation.days_allocated;
            
            // Prorate if joining mid-year and proration is enabled
            if (allocation.prorate_on_joining && joiningDate > yearStartDate) {
                const daysInYear = (yearEndDate - yearStartDate) / (1000 * 60 * 60 * 24);
                const remainingDays = (yearEndDate - joiningDate) / (1000 * 60 * 60 * 24);
                allocatedDays = Math.round((allocation.days_allocated * remainingDays) / daysInYear);
            }
            
            // Check if balance already exists
            const [existing] = await c.query(
                `SELECT id FROM employee_leave_balances 
                 WHERE employee_id = ? AND leave_type_id = ? AND leave_year = ?`,
                [employeeId, allocation.leave_type_id, currentYear]
            );
            
            if (existing.length === 0) {
                // Insert new balance
                await c.query(
                    `INSERT INTO employee_leave_balances 
                     (employee_id, leave_type_id, leave_year, allocated_days, used_days, carry_forward_days, available_days)
                     VALUES (?, ?, ?, ?, 0, 0, ?)`,
                    [employeeId, allocation.leave_type_id, currentYear, allocatedDays, allocatedDays]
                );
            }
        }
        
        await c.commit();
        c.end();
        
        res.json({ 
            success: true, 
            message: "Leave balances initialized successfully",
            year: currentYear
        });
    } catch (error) {
        console.error("Error initializing leave balances:", error);
        res.status(500).json({ error: error.message });
    }
});

// Self-service: Initialize Leave Balances for Current Employee
router.post("/initialize-my-balance", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const { leave_year } = req.body;
        
        const c = await db();
        await c.beginTransaction();
        
        // Get employee's leave plan
        const [employees] = await c.query(
            `SELECT leave_plan_id, DateJoined FROM employees WHERE id = ?`,
            [emp.id]
        );
        
        if (employees.length === 0) {
            c.end();
            return res.status(404).json({ error: "Employee not found" });
        }
        
        const employee = employees[0];
        
        if (!employee.leave_plan_id) {
            c.end();
            return res.status(400).json({ error: "You have no leave plan assigned. Please contact HR." });
        }
        
        // Get leave plan allocations
        const [allocations] = await c.query(`
            SELECT lpa.*, lt.can_carry_forward, lt.max_carry_forward_days
            FROM leave_plan_allocations lpa
            INNER JOIN leave_types lt ON lpa.leave_type_id = lt.id
            WHERE lpa.leave_plan_id = ?
        `, [employee.leave_plan_id]);
        
        const currentYear = leave_year || new Date().getFullYear();
        
        // Calculate proration if joining mid-year
        const joiningDate = new Date(employee.DateJoined);
        const yearStartDate = new Date(currentYear, 0, 1);
        const yearEndDate = new Date(currentYear, 11, 31);
        
        for (const allocation of allocations) {
            let allocatedDays = allocation.days_allocated;
            
            // Prorate if joining mid-year and proration is enabled
            if (allocation.prorate_on_joining && joiningDate > yearStartDate) {
                const daysInYear = (yearEndDate - yearStartDate) / (1000 * 60 * 60 * 24);
                const remainingDays = (yearEndDate - joiningDate) / (1000 * 60 * 60 * 24);
                allocatedDays = Math.round((allocation.days_allocated * remainingDays) / daysInYear);
            }
            
            // Check if balance already exists
            const [existing] = await c.query(
                `SELECT id FROM employee_leave_balances 
                 WHERE employee_id = ? AND leave_type_id = ? AND leave_year = ?`,
                [emp.id, allocation.leave_type_id, currentYear]
            );
            
            if (existing.length === 0) {
                // Insert new balance
                await c.query(
                    `INSERT INTO employee_leave_balances 
                     (employee_id, leave_type_id, leave_year, allocated_days, used_days, carry_forward_days, available_days)
                     VALUES (?, ?, ?, ?, 0, 0, ?)`,
                    [emp.id, allocation.leave_type_id, currentYear, allocatedDays, allocatedDays]
                );
            }
        }
        
        await c.commit();
        c.end();
        
        res.json({ 
            success: true, 
            message: "Your leave balances have been initialized successfully",
            year: currentYear
        });
    } catch (error) {
        console.error("Error initializing leave balances:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Employee Leave Balance
router.get("/balance", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const { year } = req.query;
        const leaveYear = year || new Date().getFullYear();
        
        const c = await db();
        const [balances] = await c.query(`
            SELECT 
                elb.*,
                lt.type_name,
                lt.type_code,
                lt.is_paid,
                lt.can_carry_forward,
                lt.max_carry_forward_days
            FROM employee_leave_balances elb
            INNER JOIN leave_types lt ON elb.leave_type_id = lt.id
            WHERE elb.employee_id = ? AND elb.leave_year = ?
            ORDER BY lt.type_name
        `, [emp.id, leaveYear]);
        
        c.end();
        res.json(balances);
    } catch (error) {
        console.error("Error fetching leave balance:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Employee Leave Balance by ID (HR/Manager)
router.get("/balance/:employeeId", auth, async (req, res) => {
    try {
        const { year } = req.query;
        const leaveYear = year || new Date().getFullYear();
        
        const c = await db();
        const [balances] = await c.query(`
            SELECT 
                elb.*,
                lt.type_name,
                lt.type_code,
                lt.is_paid,
                lt.can_carry_forward,
                lt.max_carry_forward_days
            FROM employee_leave_balances elb
            INNER JOIN leave_types lt ON elb.leave_type_id = lt.id
            WHERE elb.employee_id = ? AND elb.leave_year = ?
            ORDER BY lt.type_name
        `, [req.params.employeeId, leaveYear]);
        
        c.end();
        res.json(balances);
    } catch (error) {
        console.error("Error fetching employee leave balance:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   LEAVE APPLICATION
   ============================================ */

// Apply for Leave
router.post("/apply", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        let { leave_type_id, start_date, end_date, total_days, reason } = req.body;
        
        // Calculate total_days if not provided
        if (!total_days || total_days === null) {
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);
            const timeDiff = endDate.getTime() - startDate.getTime();
            total_days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
        }
        
        const c = await db();
        await c.beginTransaction();
        
        // Check leave balance
        const leaveYear = new Date(start_date).getFullYear();
        const [balances] = await c.query(
            `SELECT available_days FROM employee_leave_balances 
             WHERE employee_id = ? AND leave_type_id = ? AND leave_year = ?`,
            [emp.id, leave_type_id, leaveYear]
        );
        
        if (balances.length === 0) {
            c.end();
            return res.status(400).json({ error: "No leave balance found for this leave type" });
        }
        
        if (balances[0].available_days < total_days) {
            c.end();
            return res.status(400).json({ 
                error: "Insufficient leave balance",
                available: balances[0].available_days,
                requested: total_days
            });
        }
        
        // Create leave application
        const [result] = await c.query(
            `INSERT INTO leaves 
             (employee_id, leave_type_id, start_date, end_date, total_days, reason, status, applied_at)
             VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
            [emp.id, leave_type_id, start_date, end_date, total_days, reason]
        );
        
        await c.commit();
        c.end();
        
        res.json({ 
            success: true, 
            leaveId: result.insertId,
            message: "Leave application submitted successfully"
        });
    } catch (error) {
        console.error("Error applying for leave:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get My Leaves
router.get("/my-leaves", auth, async (req, res) => {
    try {
        const emp = await findEmployeeByUserId(req.user.id);
        if (!emp) return res.status(404).json({ error: "Employee not found" });
        
        const c = await db();
        const [leaves] = await c.query(`
            SELECT 
                l.*,
                lt.type_name,
                lt.type_code,
                u.full_name as approver_name
            FROM leaves l
            INNER JOIN leave_types lt ON l.leave_type_id = lt.id
            LEFT JOIN users u ON l.approver_id = u.id
            WHERE l.employee_id = ?
            ORDER BY l.applied_at DESC
        `, [emp.id]);
        
        c.end();
        res.json(leaves);
    } catch (error) {
        console.error("Error fetching my leaves:", error);
        res.status(500).json({ error: error.message });
    }
});

// Approve Leave (HR/Manager)
router.put("/approve/:leaveId", auth, async (req, res) => {
    try {
        const currentEmp = await findEmployeeByUserId(req.user.id);
        if (!currentEmp) return res.status(404).json({ error: "Employee not found" });

        const c = await db();
        await c.beginTransaction();
        
        // Get leave details with employee info
        const [leaves] = await c.query(
            `SELECT l.*, e.reporting_manager_id 
             FROM leaves l
             JOIN employees e ON l.employee_id = e.id
             WHERE l.id = ?`,
            [req.params.leaveId]
        );
        
        if (leaves.length === 0) {
            await c.rollback();
            c.end();
            return res.status(404).json({ error: "Leave not found" });
        }
        
        const leave = leaves[0];
        
        // Check authorization: HR/Admin can approve any, Manager can only approve their team's leaves
        const isHR = ['admin', 'hr'].includes(req.user.role);
        const isReportingManager = leave.reporting_manager_id === currentEmp.id;
        
        if (!isHR && !isReportingManager) {
            await c.rollback();
            c.end();
            return res.status(403).json({ error: "You can only approve leaves for your direct reports" });
        }
        
        const leaveYear = new Date(leave.start_date).getFullYear();
        
        // Update leave status
        await c.query(
            `UPDATE leaves SET status = 'approved', approver_id = ?, approval_date = NOW() WHERE id = ?`,
            [req.user.id, req.params.leaveId]
        );
        
        // Update employee leave balance
        await c.query(
            `UPDATE employee_leave_balances 
             SET used_days = used_days + ?, available_days = available_days - ?
             WHERE employee_id = ? AND leave_type_id = ? AND leave_year = ?`,
            [leave.total_days, leave.total_days, leave.employee_id, leave.leave_type_id, leaveYear]
        );
        
        await c.commit();
        c.end();
        
        res.json({ success: true, message: "Leave approved successfully" });
    } catch (error) {
        console.error("Error approving leave:", error);
        res.status(500).json({ error: error.message });
    }
});

// Reject Leave (HR/Manager)
router.put("/reject/:leaveId", auth, async (req, res) => {
    try {
        const currentEmp = await findEmployeeByUserId(req.user.id);
        if (!currentEmp) return res.status(404).json({ error: "Employee not found" });

        const { rejection_reason } = req.body;
        
        const c = await db();
        
        // Get leave details with employee info
        const [leaves] = await c.query(
            `SELECT l.*, e.reporting_manager_id 
             FROM leaves l
             JOIN employees e ON l.employee_id = e.id
             WHERE l.id = ?`,
            [req.params.leaveId]
        );
        
        if (leaves.length === 0) {
            c.end();
            return res.status(404).json({ error: "Leave not found" });
        }
        
        const leave = leaves[0];
        
        // Check authorization: HR/Admin can reject any, Manager can only reject their team's leaves
        const isHR = ['admin', 'hr'].includes(req.user.role);
        const isReportingManager = leave.reporting_manager_id === currentEmp.id;
        
        if (!isHR && !isReportingManager) {
            c.end();
            return res.status(403).json({ error: "You can only reject leaves for your direct reports" });
        }
        
        await c.query(
            `UPDATE leaves 
             SET status = 'rejected', approver_id = ?, approval_date = NOW(), rejection_reason = ?
             WHERE id = ?`,
            [req.user.id, rejection_reason, req.params.leaveId]
        );
        c.end();
        
        res.json({ success: true, message: "Leave rejected successfully" });
    } catch (error) {
        console.error("Error rejecting leave:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Pending Leaves (HR/Manager)
router.get("/pending", auth, async (req, res) => {
    try {
        const currentEmp = await findEmployeeByUserId(req.user.id);
        if (!currentEmp) return res.status(404).json({ error: "Employee not found" });

        const c = await db();
        
        // HR/Admin see all pending leaves, Managers see only their team's pending leaves
        const isHR = ['admin', 'hr'].includes(req.user.role);
        let query = `
            SELECT 
                l.*,
                lt.type_name,
                lt.type_code,
                e.EmployeeNumber,
                e.FirstName,
                e.LastName,
                e.WorkEmail
            FROM leaves l
            INNER JOIN leave_types lt ON l.leave_type_id = lt.id
            INNER JOIN employees e ON l.employee_id = e.id
            WHERE l.status = 'pending'`;
        
        const params = [];
        if (!isHR) {
            query += ` AND e.reporting_manager_id = ?`;
            params.push(currentEmp.id);
        }
        
        query += ` ORDER BY l.applied_at ASC`;
        
        const [leaves] = await c.query(query, params);
        c.end();
        res.json(leaves);
    } catch (error) {
        console.error("Error fetching pending leaves:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
