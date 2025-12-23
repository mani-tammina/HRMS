/**
 * Leave Balance Management Utilities
 * Auto-initialize and update employee leave balances
 */

const { db } = require('../config/database');

/**
 * Initialize leave balances for a new employee based on their leave plan
 * @param {number} employeeId - Employee ID
 * @param {number} leavePlanId - Leave Plan ID
 * @param {Date} joiningDate - Employee joining date
 * @param {number} leaveYear - Leave year (default: current year)
 */
async function initializeEmployeeLeaveBalances(employeeId, leavePlanId, joiningDate, leaveYear = null) {
    try {
        const c = await db();
        await c.beginTransaction();
        
        const currentYear = leaveYear || new Date().getFullYear();
        
        // Get leave plan allocations
        const [allocations] = await c.query(`
            SELECT lpa.*, lt.can_carry_forward, lt.max_carry_forward_days
            FROM leave_plan_allocations lpa
            INNER JOIN leave_types lt ON lpa.leave_type_id = lt.id
            WHERE lpa.leave_plan_id = ?
        `, [leavePlanId]);
        
        if (allocations.length === 0) {
            console.log(`No allocations found for leave plan ${leavePlanId}`);
            await c.commit();
            c.end();
            return { success: true, message: "No allocations to initialize" };
        }
        
        // Calculate proration if joining mid-year
        const joinDate = new Date(joiningDate);
        const yearStartDate = new Date(currentYear, 0, 1);
        const yearEndDate = new Date(currentYear, 11, 31);
        
        let initializedCount = 0;
        
        for (const allocation of allocations) {
            let allocatedDays = allocation.days_allocated;
            
            // Prorate if joining mid-year and proration is enabled
            if (allocation.prorate_on_joining && joinDate > yearStartDate) {
                const daysInYear = Math.ceil((yearEndDate - yearStartDate) / (1000 * 60 * 60 * 24));
                const remainingDays = Math.ceil((yearEndDate - joinDate) / (1000 * 60 * 60 * 24));
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
                initializedCount++;
            } else {
                console.log(`Balance already exists for employee ${employeeId}, leave type ${allocation.leave_type_id}, year ${currentYear}`);
            }
        }
        
        await c.commit();
        c.end();
        
        console.log(`✅ Initialized ${initializedCount} leave balances for employee ${employeeId}`);
        return { 
            success: true, 
            message: `Initialized ${initializedCount} leave balances`,
            count: initializedCount
        };
    } catch (error) {
        console.error("Error initializing employee leave balances:", error);
        throw error;
    }
}

/**
 * Update employee leave balance after leave approval
 * @param {number} leaveId - Leave application ID
 */
async function updateLeaveBalanceOnApproval(leaveId) {
    try {
        const c = await db();
        await c.beginTransaction();
        
        // Get leave details
        const [leaves] = await c.query(
            `SELECT employee_id, leave_type_id, start_date, total_days, status 
             FROM leaves WHERE id = ?`,
            [leaveId]
        );
        
        if (leaves.length === 0) {
            c.end();
            throw new Error("Leave not found");
        }
        
        const leave = leaves[0];
        
        if (leave.status !== 'approved') {
            c.end();
            return { success: false, message: "Leave not approved" };
        }
        
        const leaveYear = new Date(leave.start_date).getFullYear();
        
        // Update employee leave balance
        await c.query(
            `UPDATE employee_leave_balances 
             SET used_days = used_days + ?, 
                 available_days = allocated_days + carry_forward_days - (used_days + ?)
             WHERE employee_id = ? AND leave_type_id = ? AND leave_year = ?`,
            [leave.total_days, leave.total_days, leave.employee_id, leave.leave_type_id, leaveYear]
        );
        
        await c.commit();
        c.end();
        
        return { success: true, message: "Leave balance updated" };
    } catch (error) {
        console.error("Error updating leave balance:", error);
        throw error;
    }
}

/**
 * Revert leave balance when leave is cancelled
 * @param {number} leaveId - Leave application ID
 */
async function revertLeaveBalanceOnCancellation(leaveId) {
    try {
        const c = await db();
        await c.beginTransaction();
        
        // Get leave details
        const [leaves] = await c.query(
            `SELECT employee_id, leave_type_id, start_date, total_days, status 
             FROM leaves WHERE id = ?`,
            [leaveId]
        );
        
        if (leaves.length === 0) {
            c.end();
            throw new Error("Leave not found");
        }
        
        const leave = leaves[0];
        
        if (leave.status !== 'cancelled') {
            c.end();
            return { success: false, message: "Leave not cancelled" };
        }
        
        const leaveYear = new Date(leave.start_date).getFullYear();
        
        // Revert employee leave balance
        await c.query(
            `UPDATE employee_leave_balances 
             SET used_days = GREATEST(0, used_days - ?), 
                 available_days = available_days + ?
             WHERE employee_id = ? AND leave_type_id = ? AND leave_year = ?`,
            [leave.total_days, leave.total_days, leave.employee_id, leave.leave_type_id, leaveYear]
        );
        
        await c.commit();
        c.end();
        
        return { success: true, message: "Leave balance reverted" };
    } catch (error) {
        console.error("Error reverting leave balance:", error);
        throw error;
    }
}

/**
 * Carry forward leaves to next year
 * @param {number} employeeId - Employee ID
 * @param {number} fromYear - Previous year
 * @param {number} toYear - Next year
 */
async function carryForwardLeaves(employeeId, fromYear, toYear) {
    try {
        const c = await db();
        await c.beginTransaction();
        
        // Get previous year balances
        const [balances] = await c.query(`
            SELECT 
                elb.*,
                lt.can_carry_forward,
                lt.max_carry_forward_days
            FROM employee_leave_balances elb
            INNER JOIN leave_types lt ON elb.leave_type_id = lt.id
            WHERE elb.employee_id = ? AND elb.leave_year = ? AND lt.can_carry_forward = 1
        `, [employeeId, fromYear]);
        
        for (const balance of balances) {
            const availableDays = balance.available_days;
            const carryForwardDays = Math.min(availableDays, balance.max_carry_forward_days);
            
            if (carryForwardDays > 0) {
                // Update next year balance with carry forward
                await c.query(
                    `UPDATE employee_leave_balances 
                     SET carry_forward_days = ?, available_days = allocated_days + ?
                     WHERE employee_id = ? AND leave_type_id = ? AND leave_year = ?`,
                    [carryForwardDays, carryForwardDays, employeeId, balance.leave_type_id, toYear]
                );
            }
        }
        
        await c.commit();
        c.end();
        
        return { success: true, message: "Leaves carried forward successfully" };
    } catch (error) {
        console.error("Error carrying forward leaves:", error);
        throw error;
    }
}

/**
 * Bulk initialize leave balances for all employees with leave plans
 * @param {number} leaveYear - Year to initialize (default: current year)
 */
async function bulkInitializeLeaveBalances(leaveYear = null) {
    try {
        const currentYear = leaveYear || new Date().getFullYear();
        const c = await db();
        
        // Get all employees with leave plans
        const [employees] = await c.query(`
            SELECT id, leave_plan_id, DateJoined 
            FROM employees 
            WHERE leave_plan_id IS NOT NULL 
              AND EmploymentStatus = 'Active'
        `);
        
        c.end();
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const emp of employees) {
            try {
                await initializeEmployeeLeaveBalances(
                    emp.id, 
                    emp.leave_plan_id, 
                    emp.DateJoined, 
                    currentYear
                );
                successCount++;
            } catch (error) {
                console.error(`Failed to initialize for employee ${emp.id}:`, error.message);
                errorCount++;
            }
        }
        
        return { 
            success: true, 
            message: `Initialized leave balances for ${successCount} employees (${errorCount} errors)`,
            successCount,
            errorCount
        };
    } catch (error) {
        console.error("Error in bulk initialization:", error);
        throw error;
    }
}

module.exports = {
    initializeEmployeeLeaveBalances,
    updateLeaveBalanceOnApproval,
    revertLeaveBalanceOnCancellation,
    carryForwardLeaves,
    bulkInitializeLeaveBalances
};
