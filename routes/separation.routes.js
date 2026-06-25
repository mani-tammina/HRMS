/**
 * SEPARATION MANAGEMENT ROUTES
 * Handles resignation, approval workflow, exit clearance, F&F settlements, and notice configurations.
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr, manager } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

/* ============ HELPERS ============ */

function formatDate(val) {
  if (!val) return null;
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    if (val.includes('T')) return val.split('T')[0];
    return val;
  }
  if (val instanceof Date) {
    const yyyy = val.getUTCFullYear();
    const mm = String(val.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(val.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return null;
}

async function isWeekendOrHoliday(dateInput, connection) {
  const dateObj = new Date(dateInput);
  const day = dateObj.getDay(); // 0 is Sunday, 6 is Saturday
  if (day === 0 || day === 6) {
    return { isWeekend: true, isHoliday: false, message: "weekend" };
  }
  
  const formattedDate = formatDate(dateInput);
  const [rows] = await connection.query(
    "SELECT holiday_name FROM holidays WHERE holiday_date = DATE(?)",
    [formattedDate]
  );
  if (rows.length > 0) {
    return { isWeekend: false, isHoliday: true, message: `holiday (${rows[0].holiday_name})` };
  }
  
  return null;
}

async function getNextWorkingDay(startDate, connection) {
  let dateObj = new Date(startDate);
  while (true) {
    const check = await isWeekendOrHoliday(dateObj, connection);
    if (!check) {
      return dateObj;
    }
    dateObj.setDate(dateObj.getDate() + 1);
  }
}

/* ============ NOTICE PERIOD CONFIG ============ */

// Get all department notice period configurations
router.get("/notice-periods", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query(
      `SELECT dnp.*, d.name as department_name 
       FROM department_notice_periods dnp
       INNER JOIN departments d ON dnp.department_id = d.id
       ORDER BY d.name`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching notice periods:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Create or update notice period configuration
router.post("/notice-periods", auth, hr, async (req, res) => {
  let c = null;
  try {
    const { department_id, notice_period_days, is_active } = req.body;
    if (!department_id || notice_period_days === undefined) {
      return res.status(400).json({ error: "department_id and notice_period_days are required" });
    }

    c = await db();
    // Check if configuration already exists
    const [exists] = await c.query("SELECT id FROM department_notice_periods WHERE department_id = ?", [department_id]);
    
    if (exists.length > 0) {
      await c.query(
        "UPDATE department_notice_periods SET notice_period_days = ?, is_active = ? WHERE department_id = ?",
        [notice_period_days, is_active !== undefined ? is_active : 1, department_id]
      );
      res.json({ success: true, message: "Notice period configuration updated successfully" });
    } else {
      await c.query(
        "INSERT INTO department_notice_periods (department_id, notice_period_days, is_active) VALUES (?, ?, ?)",
        [department_id, notice_period_days, is_active !== undefined ? is_active : 1]
      );
      res.json({ success: true, message: "Notice period configuration created successfully" });
    }
  } catch (err) {
    console.error("Error saving notice period configuration:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Delete notice period configuration
router.delete("/notice-periods/:id", auth, hr, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [result] = await c.query("DELETE FROM department_notice_periods WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Notice period configuration not found" });
    }
    res.json({ success: true, message: "Notice period configuration deleted successfully" });
  } catch (err) {
    console.error("Error deleting notice period:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Get notice period configuration by ID
router.get("/notice-periods/:id", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query(
      `SELECT dnp.*, d.name as department_name 
       FROM department_notice_periods dnp
       INNER JOIN departments d ON dnp.department_id = d.id
       WHERE dnp.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Notice period configuration not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching notice period config by ID:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update notice period configuration by ID
router.put("/notice-periods/:id", auth, hr, async (req, res) => {
  let c = null;
  try {
    const { notice_period_days, is_active } = req.body;
    if (notice_period_days === undefined) {
      return res.status(400).json({ error: "notice_period_days is required" });
    }

    c = await db();
    const [result] = await c.query(
      "UPDATE department_notice_periods SET notice_period_days = ?, is_active = ? WHERE id = ?",
      [notice_period_days, is_active !== undefined ? is_active : 1, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Notice period configuration not found" });
    }

    res.json({ success: true, message: "Notice period configuration updated successfully" });
  } catch (err) {
    console.error("Error updating notice period config:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});


/* ============ RESIGNATION REASONS APIs ============ */

// Get all resignation reasons
router.get("/reasons", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query(
      `SELECT * FROM resignation_reasons 
       ORDER BY id ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching resignation reasons:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Get active resignation reasons (for dropdown)
router.get("/reasons/active", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query(
      `SELECT * FROM resignation_reasons 
       WHERE is_active = 1
       ORDER BY id ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching active resignation reasons:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Get resignation reason by ID
router.get("/reasons/:id", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query(
      "SELECT * FROM resignation_reasons WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Resignation reason not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching resignation reason by ID:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Create resignation reason
router.post("/reasons", auth, hr, async (req, res) => {
  let c = null;
  try {
    const { reason, description, is_active } = req.body;
    if (!reason || reason.trim() === '') {
      return res.status(400).json({ error: "reason is required" });
    }

    c = await db();
    
    // Check if reason already exists
    const [exists] = await c.query("SELECT id FROM resignation_reasons WHERE reason = ?", [reason.trim()]);
    if (exists.length > 0) {
      return res.status(400).json({ error: "Resignation reason already exists" });
    }

    const [result] = await c.query(
      "INSERT INTO resignation_reasons (reason, description, is_active) VALUES (?, ?, ?)",
      [reason.trim(), description || null, is_active !== undefined ? is_active : 1]
    );
    res.status(201).json({ success: true, id: result.insertId, message: "Resignation reason created successfully" });
  } catch (err) {
    console.error("Error creating resignation reason:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update resignation reason
router.put("/reasons/:id", auth, hr, async (req, res) => {
  let c = null;
  try {
    const { reason, description, is_active } = req.body;
    if (!reason || reason.trim() === '') {
      return res.status(400).json({ error: "reason is required" });
    }

    c = await db();
    
    // Check if reason already exists for a different ID
    const [exists] = await c.query("SELECT id FROM resignation_reasons WHERE reason = ? AND id != ?", [reason.trim(), req.params.id]);
    if (exists.length > 0) {
      return res.status(400).json({ error: "Resignation reason with this name already exists" });
    }

    const [result] = await c.query(
      "UPDATE resignation_reasons SET reason = ?, description = ?, is_active = ? WHERE id = ?",
      [reason.trim(), description !== undefined ? description : null, is_active !== undefined ? is_active : 1, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Resignation reason not found" });
    }

    res.json({ success: true, message: "Resignation reason updated successfully" });
  } catch (err) {
    console.error("Error updating resignation reason:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Delete resignation reason
router.delete("/reasons/:id", auth, hr, async (req, res) => {
  let c = null;
  try {
    c = await db();
    
    const [reasonRow] = await c.query("SELECT reason FROM resignation_reasons WHERE id = ?", [req.params.id]);
    if (reasonRow.length === 0) {
      return res.status(404).json({ error: "Resignation reason not found" });
    }
    
    const [inUse] = await c.query("SELECT id FROM resignations WHERE reason = ?", [reasonRow[0].reason]);
    if (inUse.length > 0) {
      await c.query("UPDATE resignation_reasons SET is_active = 0 WHERE id = ?", [req.params.id]);
      return res.json({ success: true, message: "Resignation reason is in use by existing request(s). It has been deactivated to preserve records." });
    }

    const [result] = await c.query("DELETE FROM resignation_reasons WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Resignation reason not found" });
    }
    res.json({ success: true, message: "Resignation reason deleted successfully" });
  } catch (err) {
    console.error("Error deleting resignation reason:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});


/* ============ RESIGNATION SETTINGS APIs ============ */

// Get all resignation settings
router.get("/settings", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query("SELECT setting_key, setting_value FROM resignation_settings");
    
    // Map array to a key-value object
    const settings = {};
    for (const row of rows) {
      settings[row.setting_key] = row.setting_value === 1;
    }
    
    res.json(settings);
  } catch (err) {
    console.error("Error fetching resignation settings:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update resignation settings
router.put("/settings", auth, hr, async (req, res) => {
  let c = null;
  try {
    const settings = req.body;
    if (typeof settings !== 'object' || settings === null) {
      return res.status(400).json({ error: "Invalid settings payload" });
    }

    c = await db();
    
    // Update each setting key-value pair
    for (const [key, value] of Object.entries(settings)) {
      const intValue = value === true || value === 1 || value === '1' ? 1 : 0;
      await c.query(
        "UPDATE resignation_settings SET setting_value = ? WHERE setting_key = ?",
        [intValue, key]
      );
    }

    res.json({ success: true, message: "Resignation settings updated successfully" });
  } catch (err) {
    console.error("Error updating resignation settings:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});


// Get Notice Period allowed leaves configurations (grouped by Leave Plan)
router.get("/notice-period-leaves", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    
    // Fetch all active leave plans
    const [plans] = await c.query(
      "SELECT id, name, description FROM leave_plans WHERE is_active = 1 ORDER BY name"
    );
    
    if (plans.length === 0) {
      return res.json([]);
    }
    
    // Fetch all allocations with leave type details and their notice period status
    const [allocations] = await c.query(`
      SELECT 
        lpa.leave_plan_id,
        lpa.leave_type_id,
        lt.type_name,
        lt.type_code,
        COALESCE(np.is_allowed, 1) as is_allowed
      FROM leave_plan_allocations lpa
      INNER JOIN leave_types lt ON lpa.leave_type_id = lt.id
      LEFT JOIN notice_period_allowed_leaves np ON np.leave_plan_id = lpa.leave_plan_id AND np.leave_type_id = lpa.leave_type_id
      WHERE lt.is_active = 1
      ORDER BY lpa.leave_plan_id, lt.type_name
    `);
    
    // Group allocations by leave plan
    const result = plans.map(plan => {
      const planAllocations = allocations
        .filter(alloc => alloc.leave_plan_id === plan.id)
        .map(alloc => ({
          leave_type_id: alloc.leave_type_id,
          type_name: alloc.type_name,
          type_code: alloc.type_code,
          is_allowed: alloc.is_allowed === 1
        }));
      
      return {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        leaves: planAllocations
      };
    });
    
    res.json(result);
  } catch (err) {
    console.error("Error fetching notice period allowed leaves:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update Notice Period allowed leaves configurations
router.put("/notice-period-leaves", auth, hr, async (req, res) => {
  let c = null;
  try {
    const payload = req.body; // Expect flat array: [{ leave_plan_id, leave_type_id, is_allowed }]
    if (!Array.isArray(payload)) {
      return res.status(400).json({ error: "Invalid payload, expected an array of settings" });
    }
    
    c = await db();
    await c.beginTransaction();
    
    for (const item of payload) {
      const { leave_plan_id, leave_type_id, is_allowed } = item;
      if (leave_plan_id === undefined || leave_type_id === undefined || is_allowed === undefined) {
        throw new Error("Each setting must have leave_plan_id, leave_type_id, and is_allowed");
      }
      
      const allowedValue = is_allowed === true || is_allowed === 1 || is_allowed === '1' ? 1 : 0;
      
      await c.query(`
        INSERT INTO notice_period_allowed_leaves (leave_plan_id, leave_type_id, is_allowed)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE is_allowed = ?
      `, [leave_plan_id, leave_type_id, allowedValue, allowedValue]);
    }
    
    await c.commit();
    res.json({ success: true, message: "Notice period leave settings updated successfully" });
  } catch (err) {
    if (c) await c.rollback();
    console.error("Error saving notice period allowed leaves:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});


/* ============ EMPLOYEE APIs ============ */

// Apply for Resignation
router.post("/apply", auth, async (req, res) => {
  let c = null;
  try {
    const {
      discussed_with_manager,
      discussion_summary,
      reason,
      early_relieving_request,
      preferred_last_working_date,
      additional_comments
    } = req.body;

    if (!discussed_with_manager || !reason) {
      return res.status(400).json({ error: "discussed_with_manager and reason are required" });
    }
    if (discussed_with_manager === 'Yes' && !discussion_summary) {
      return res.status(400).json({ error: "discussion_summary is required when discussed with manager is Yes" });
    }

    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee profile not found" });

    if (emp.EmploymentStatus !== 'Working') {
      return res.status(400).json({ error: "Only active working employees can apply for resignation" });
    }

    c = await db();
    
    // Check settings
    const [settings] = await c.query("SELECT setting_key, setting_value FROM resignation_settings");
    const settingsMap = {};
    for (const s of settings) {
      settingsMap[s.setting_key] = s.setting_value === 1;
    }

    if (!settingsMap.allow_employee_resign) {
      return res.status(400).json({ error: "Resignation submissions are currently disabled by administration." });
    }

    if (early_relieving_request === 'Yes' && !settingsMap.allow_early_lwd) {
      return res.status(400).json({ error: "Early relieving requests are currently disabled." });
    }
    
    // Check if there is already an active resignation request
    const [existing] = await c.query(
      "SELECT id FROM resignations WHERE employee_id = ? AND status NOT IN ('Rejected', 'Relieved')",
      [emp.id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "An active resignation request already exists for this employee" });
    }

    // Fetch notice period days
    const [noticeConfig] = await c.query(
      "SELECT notice_period_days FROM department_notice_periods WHERE department_id = ? AND is_active = 1",
      [emp.DepartmentId]
    );

    const notice_days = noticeConfig.length > 0 ? noticeConfig[0].notice_period_days : 30;
    
    // Calculate last working date (Applied date is today)
    const applied_date = new Date();
    let calculated_lwd = new Date();
    calculated_lwd.setDate(applied_date.getDate() + notice_days);

    // Apply notallowholiday_weekend setting
    if (settingsMap.notallowholiday_weekend) {
      if (early_relieving_request === 'Yes' && preferred_last_working_date) {
        const checkResult = await isWeekendOrHoliday(preferred_last_working_date, c);
        if (checkResult) {
          return res.status(400).json({ 
            error: `Your preferred last working date lands on a ${checkResult.message}. Resignation notice periods cannot end on a weekend or holiday.` 
          });
        }
      } else {
        calculated_lwd = await getNextWorkingDay(calculated_lwd, c);
      }
    }

    // Save resignation record
    const resignationData = {
      employee_id: emp.id,
      discussed_with_manager,
      discussion_summary: discussed_with_manager === 'Yes' ? discussion_summary : null,
      reason,
      early_relieving_request: early_relieving_request || 'No',
      preferred_last_working_date: early_relieving_request === 'Yes' ? preferred_last_working_date : null,
      additional_comments: additional_comments || null,
      notice_period_days: notice_days,
      calculated_last_working_date: calculated_lwd,
      status: 'Submitted',
      current_workflow_step: 'Manager Review',
      manager_action: 'Pending',
      hr_action: 'Pending'
    };

    const [result] = await c.query("INSERT INTO resignations SET ?", resignationData);
    const resignationId = result.insertId;

    // Update Employee Status
    await c.query("UPDATE employees SET EmploymentStatus = 'Resignation Initiated' WHERE id = ?", [emp.id]);

    // Create separation audit log
    await c.query(
      `INSERT INTO separation_audit_logs (resignation_id, employee_id, action, performed_by, new_status, remarks) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [resignationId, emp.id, 'Resignation Submitted', req.user.id, 'Submitted', 'Employee initiated resignation']
    );

    // Create notifications for Manager, HR, and Admin
    // For simplicity, we create database notifications
    const notifyRoles = ['admin', 'hr'];
    
    // Notify Reporting Manager
    if (emp.reporting_manager_id) {
      const [mgrUser] = await c.query(
        `SELECT u.id AS user_id 
         FROM users u 
         INNER JOIN employees e ON (u.username = e.WorkEmail OR u.username = e.EmployeeNumber) 
         WHERE e.id = ?`,
        [emp.reporting_manager_id]
      );
      if (mgrUser.length > 0 && mgrUser[0].user_id) {
        await c.query(
          "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
          [mgrUser[0].user_id, `Resignation Submitted: ${emp.FirstName} ${emp.LastName} has submitted resignation.`]
        );
      }
    }

    // Notify HR / Admins
    const [hrUsers] = await c.query("SELECT id FROM users WHERE role IN ('admin', 'hr')");
    for (const hrUser of hrUsers) {
      await c.query(
        "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
        [hrUser.id, `Resignation Submitted: ${emp.FirstName} ${emp.LastName} has submitted resignation.`]
      );
    }

    res.json({
      success: true,
      resignation_id: resignationId,
      notice_period_days: notice_days,
      calculated_last_working_date: formatDate(calculated_lwd)
    });

  } catch (err) {
    console.error("Error applying resignation:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Get Logged-In Employee Resignation & Timeline
router.get("/my", auth, async (req, res) => {
  let c = null;
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee profile not found" });

    c = await db();
    const [rows] = await c.query(
      `SELECT r.*, 
              mgr.FirstName as manager_first_name, mgr.LastName as manager_last_name
       FROM resignations r
       LEFT JOIN employees e ON r.employee_id = e.id
       LEFT JOIN employees mgr ON e.reporting_manager_id = mgr.id
       WHERE r.employee_id = ? 
       ORDER BY r.id DESC LIMIT 1`,
      [emp.id]
    );

    if (rows.length === 0) {
      return res.json(null);
    }

    const resignation = rows[0];
    
    // Normalize date fields
    resignation.preferred_last_working_date = formatDate(resignation.preferred_last_working_date);
    resignation.calculated_last_working_date = formatDate(resignation.calculated_last_working_date);
    resignation.hr_last_working_date = formatDate(resignation.hr_last_working_date);
    resignation.relieving_date = formatDate(resignation.relieving_date);
    resignation.final_working_date = formatDate(resignation.final_working_date);

    // Fetch exit clearance tasks status if approved
    let clearanceProgress = { total: 0, completed: 0 };
    if (resignation.status !== 'Submitted' && resignation.status !== 'Draft' && resignation.status !== 'Manager Review' && resignation.status !== 'HR Review') {
      const [tasks] = await c.query(
        "SELECT status FROM exit_clearance_tasks WHERE resignation_id = ?",
        [resignation.id]
      );
      clearanceProgress.total = tasks.length;
      clearanceProgress.completed = tasks.filter(t => t.status === 'Completed').length;
    }

    resignation.clearanceProgress = clearanceProgress;

    res.json(resignation);
  } catch (err) {
    console.error("Error fetching my resignation:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Cancel Resignation (by Employee)
router.post("/cancel", auth, async (req, res) => {
  let c = null;
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee profile not found" });

    c = await db();

    // Check settings
    const [settings] = await c.query("SELECT setting_key, setting_value FROM resignation_settings");
    const settingsMap = {};
    for (const s of settings) {
      settingsMap[s.setting_key] = s.setting_value === 1;
    }

    if (!settingsMap.allow_employee_withdraw) {
      return res.status(400).json({ error: "Resignation withdrawal is currently disabled by administration." });
    }

    // Get active resignation (cannot cancel if already relieved or HR approved)
    const [rows] = await c.query(
      "SELECT id, status FROM resignations WHERE employee_id = ? AND status IN ('Submitted', 'Manager Review', 'HR Review')",
      [emp.id]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "No active pending resignation request found that can be cancelled." });
    }

    const resignationId = rows[0].id;

    // Delete resignation or update to Rejected/Cancelled?
    // Let's delete or mark Rejected, let's update status to 'Rejected' (or we can delete it, but audit trail is better)
    // The requirement: "restore EmploymentStatus to Working".
    await c.query("UPDATE resignations SET status = 'Rejected' WHERE id = ?", [resignationId]);
    await c.query("UPDATE employees SET EmploymentStatus = 'Working' WHERE id = ?", [emp.id]);

    // Audit log
    await c.query(
      `INSERT INTO separation_audit_logs (resignation_id, employee_id, action, performed_by, new_status, remarks) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [resignationId, emp.id, 'Resignation Cancelled', req.user.id, 'Rejected', 'Employee cancelled resignation']
    );

    res.json({ success: true, message: "Resignation cancelled successfully." });
  } catch (err) {
    console.error("Error cancelling resignation:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});


/* ============ ADMIN & WORKFLOW APIs ============ */

// Get Resignation List (Admin/HR/Manager Dashboard)
router.get("/requests", auth, async (req, res) => {
  let c = null;
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    const userRole = req.user.role ? req.user.role.toLowerCase() : '';
    const isHrOrAdmin = userRole === 'admin' || userRole === 'hr';

    c = await db();

    let query = `
      SELECT r.*, 
             e.EmployeeNumber, e.FirstName, e.LastName, 
             d.name as department_name, 
             des.name as designation_name,
             mgr.FirstName as manager_first_name, mgr.LastName as manager_last_name
      FROM resignations r
      INNER JOIN employees e ON r.employee_id = e.id
      LEFT JOIN departments d ON e.DepartmentId = d.id
      LEFT JOIN designations des ON e.DesignationId = des.id
      LEFT JOIN employees mgr ON e.reporting_manager_id = mgr.id
      WHERE 1=1
    `;
    const params = [];

    // Filter by reporting manager if not HR/Admin
    if (!isHrOrAdmin) {
      if (!emp) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      query += " AND (e.reporting_manager_id = ? OR r.employee_id = ?)";
      params.push(emp.id, emp.id);
    }

    // Apply dashboard filters
    const { employee, department, status, startDate, endDate } = req.query;

    if (employee) {
      query += " AND (e.FirstName LIKE ? OR e.LastName LIKE ? OR e.EmployeeNumber LIKE ?)";
      const likeVal = `%${employee}%`;
      params.push(likeVal, likeVal, likeVal);
    }
    if (department) {
      query += " AND e.DepartmentId = ?";
      params.push(department);
    }
    if (status) {
      query += " AND r.status = ?";
      params.push(status);
    }
    if (startDate && endDate) {
      query += " AND DATE(r.created_at) BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }

    query += " ORDER BY r.created_at DESC";

    const [rows] = await c.query(query, params);
    
    // Normalize dates
    const formattedRows = rows.map(r => {
      r.preferred_last_working_date = formatDate(r.preferred_last_working_date);
      r.calculated_last_working_date = formatDate(r.calculated_last_working_date);
      r.hr_last_working_date = formatDate(r.hr_last_working_date);
      r.relieving_date = formatDate(r.relieving_date);
      r.final_working_date = formatDate(r.final_working_date);
      r.created_at = formatDate(r.created_at);
      return r;
    });

    res.json(formattedRows);
  } catch (err) {
    console.error("Error fetching resignation requests:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Get Resignation Details Page Data
router.get("/requests/:id", auth, async (req, res) => {
  let c = null;
  try {
    const resignationId = req.params.id;
    const emp = await findEmployeeByUserId(req.user.id);
    const userRole = req.user.role ? req.user.role.toLowerCase() : '';
    const isHrOrAdmin = userRole === 'admin' || userRole === 'hr';

    c = await db();
    const [rows] = await c.query(
      `SELECT r.*, 
              e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail, e.DateJoined,
              e.reporting_manager_id,
              d.name as department_name, 
              des.name as designation_name,
              mgr.FirstName as manager_first_name, mgr.LastName as manager_last_name
       FROM resignations r
       INNER JOIN employees e ON r.employee_id = e.id
       LEFT JOIN departments d ON e.DepartmentId = d.id
       LEFT JOIN designations des ON e.DesignationId = des.id
       LEFT JOIN employees mgr ON e.reporting_manager_id = mgr.id
       WHERE r.id = ?`,
      [resignationId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Resignation request not found" });
    }

    const requestDetails = rows[0];

    // Security Check: Make sure requester is HR, Admin, Reporting Manager, or the Employee
    const isEmployeeSelf = emp && emp.id === requestDetails.employee_id;
    const isManager = emp && emp.id === requestDetails.reporting_manager_id;

    if (!isHrOrAdmin && !isEmployeeSelf && !isManager) {
      return res.status(403).json({ error: "Unauthorized access to resignation details" });
    }

    // Format Date Fields
    requestDetails.DateJoined = formatDate(requestDetails.DateJoined);
    requestDetails.preferred_last_working_date = formatDate(requestDetails.preferred_last_working_date);
    requestDetails.calculated_last_working_date = formatDate(requestDetails.calculated_last_working_date);
    requestDetails.hr_last_working_date = formatDate(requestDetails.hr_last_working_date);
    requestDetails.relieving_date = formatDate(requestDetails.relieving_date);
    requestDetails.final_working_date = formatDate(requestDetails.final_working_date);
    requestDetails.created_at = formatDate(requestDetails.created_at);

    res.json(requestDetails);
  } catch (err) {
    console.error("Error fetching resignation details:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Resignation Action (Approve/Reject/Send Back for Discussion)
router.post("/requests/:id/action", auth, async (req, res) => {
  let c = null;
  try {
    const resignationId = req.params.id;
    const { action, remarks, hr_notice_period_days, hr_last_working_date } = req.body;

    if (!action) {
      return res.status(400).json({ error: "Action is required" });
    }

    const emp = await findEmployeeByUserId(req.user.id);
    const userRole = req.user.role ? req.user.role.toLowerCase() : '';
    const isHr = userRole === 'hr';
    const isAdmin = userRole === 'admin';
    const isHrOrAdmin = isHr || isAdmin;

    c = await db();

    // Get the resignation record
    const [resignations] = await c.query(
      `SELECT r.*, e.reporting_manager_id, e.id as emp_id, e.FirstName, e.LastName 
       FROM resignations r 
       INNER JOIN employees e ON r.employee_id = e.id 
       WHERE r.id = ?`,
      [resignationId]
    );

    if (resignations.length === 0) {
      return res.status(404).json({ error: "Resignation request not found" });
    }

    const resignation = resignations[0];
    const isManager = userRole === 'manager' || (emp && emp.id === resignation.reporting_manager_id);

    // Check authorization
    if (!isHrOrAdmin && !isManager) {
      return res.status(403).json({ error: "You are not authorized to perform actions on this resignation request" });
    }

    const oldStatus = resignation.status;
    let newStatus = oldStatus;
    let currentStep = resignation.current_workflow_step;
    let updateFields = {};

    if (isManager && resignation.current_workflow_step === 'Manager Review') {
      // Manager Actions
      if (action === 'Approve') {
        newStatus = 'HR Review';
        currentStep = 'HR Approval';
        updateFields = {
          status: newStatus,
          current_workflow_step: currentStep,
          manager_action: 'Approve',
          manager_remarks: remarks || null,
          manager_action_at: new Date()
        };

        // Notify HR
        const [hrUsers] = await c.query("SELECT id FROM users WHERE role IN ('admin', 'hr')");
        for (const hrUser of hrUsers) {
          await c.query(
            "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
            [hrUser.id, `Resignation - Manager Approved: Manager approved resignation for ${resignation.FirstName} ${resignation.LastName}. Pending HR Approval.`]
          );
        }
      } else if (action === 'Reject') {
        newStatus = 'Rejected';
        currentStep = 'Done';
        updateFields = {
          status: newStatus,
          current_workflow_step: currentStep,
          manager_action: 'Reject',
          manager_remarks: remarks || null,
          manager_action_at: new Date()
        };

        // Restore Employee Status to 'Working'
        await c.query("UPDATE employees SET EmploymentStatus = 'Working' WHERE id = ?", [resignation.emp_id]);
      } else if (action === 'Send Back' || action === 'Send Back for Discussion') {
        newStatus = 'HR Review';
        currentStep = 'HR Approval';
        updateFields = {
          status: newStatus,
          current_workflow_step: currentStep,
          manager_action: 'Send Back',
          manager_remarks: remarks || null,
          manager_action_at: new Date()
        };

        // Notify HR
        const [hrUsers] = await c.query("SELECT id FROM users WHERE role IN ('admin', 'hr')");
        for (const hrUser of hrUsers) {
          await c.query(
            "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
            [hrUser.id, `Resignation - Manager Sent Back: Manager sent back resignation for ${resignation.FirstName} ${resignation.LastName} for HR Review.`]
          );
        }
      } else {
        return res.status(400).json({ error: "Invalid action for manager" });
      }

    } else if (isHrOrAdmin && (resignation.current_workflow_step === 'HR Approval' || resignation.current_workflow_step === 'Manager Review')) {
      // HR / Admin Actions
      if (action === 'Approve') {
        newStatus = 'Approved';
        currentStep = 'Exit Clearance';
        
        const finalNoticeDays = hr_notice_period_days !== undefined ? hr_notice_period_days : resignation.notice_period_days;
        
        let finalLwd = resignation.calculated_last_working_date;
        if (hr_last_working_date) {
          finalLwd = new Date(hr_last_working_date);
        } else if (hr_notice_period_days !== undefined) {
          finalLwd = new Date(resignation.created_at);
          finalLwd.setDate(finalLwd.getDate() + finalNoticeDays);
        }

        updateFields = {
          status: 'Exit Clearance',
          current_workflow_step: currentStep,
          hr_action: 'Approve',
          hr_remarks: remarks || null,
          hr_notice_period_days: finalNoticeDays,
          hr_last_working_date: finalLwd,
          hr_action_at: new Date()
        };

        // Prepopulate Clearance Tasks Checklist
        const clearanceTasks = [
          // IT Tasks
          { dept: 'IT', task: 'Laptop Returned' },
          { dept: 'IT', task: 'Assets Returned' },
          { dept: 'IT', task: 'Access Revoked' },
          // Finance Tasks
          { dept: 'Finance', task: 'Loans Cleared' },
          { dept: 'Finance', task: 'Advance Cleared' },
          // HR Tasks
          { dept: 'HR', task: 'Exit Interview Completed' },
          // Admin Tasks
          { dept: 'Admin', task: 'Keycard Returned' },
          { dept: 'Admin', task: 'Drawer Keys Returned' },
          // Security Tasks
          { dept: 'Security', task: 'ID Card Returned' },
          { dept: 'Security', task: 'Gate Pass Issued' }
        ];

        for (const t of clearanceTasks) {
          await c.query(
            "INSERT INTO exit_clearance_tasks (resignation_id, department, task_name, status) VALUES (?, ?, ?, 'Pending')",
            [resignationId, t.dept, t.task]
          );
        }

        // Initialize empty settlement
        await c.query(
          "INSERT IGNORE INTO exit_settlements (resignation_id, employee_id, status) VALUES (?, ?, 'Pending')",
          [resignationId, resignation.emp_id]
        );

        // Notify Employee
        const [empUser] = await c.query(
          `SELECT u.id AS user_id 
           FROM users u 
           INNER JOIN employees e ON (u.username = e.WorkEmail OR u.username = e.EmployeeNumber) 
           WHERE e.id = ?`,
          [resignation.emp_id]
        );
        if (empUser.length > 0 && empUser[0].user_id) {
          await c.query(
            "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
            [empUser[0].user_id, `Resignation Approved: Your resignation is approved. Last working date: ${formatDate(finalLwd)}. Clearance checklist initialized.`]
          );
        }

      } else if (action === 'Reject') {
        newStatus = 'Rejected';
        currentStep = 'Done';
        updateFields = {
          status: newStatus,
          current_workflow_step: currentStep,
          hr_action: 'Reject',
          hr_remarks: remarks || null,
          hr_action_at: new Date()
        };

        // Restore Employee Status to 'Working'
        await c.query("UPDATE employees SET EmploymentStatus = 'Working' WHERE id = ?", [resignation.emp_id]);

        // Notify Employee
        const [empUser] = await c.query(
          `SELECT u.id AS user_id 
           FROM users u 
           INNER JOIN employees e ON (u.username = e.WorkEmail OR u.username = e.EmployeeNumber) 
           WHERE e.id = ?`,
          [resignation.emp_id]
        );
        if (empUser.length > 0 && empUser[0].user_id) {
          await c.query(
            "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
            [empUser[0].user_id, `Resignation Rejected: Your resignation request has been rejected.`]
          );
        }
      } else if (action === 'Return') {
        newStatus = 'Draft';
        currentStep = 'Manager Review';
        updateFields = {
          status: newStatus,
          current_workflow_step: currentStep,
          hr_action: 'Return',
          hr_remarks: remarks || null,
          hr_action_at: new Date(),
          manager_action: 'Pending'
        };

        // Restore Employee Status to 'Working'
        await c.query("UPDATE employees SET EmploymentStatus = 'Working' WHERE id = ?", [resignation.emp_id]);

        // Notify Employee
        const [empUser] = await c.query(
          `SELECT u.id AS user_id 
           FROM users u 
           INNER JOIN employees e ON (u.username = e.WorkEmail OR u.username = e.EmployeeNumber) 
           WHERE e.id = ?`,
          [resignation.emp_id]
        );
        if (empUser.length > 0 && empUser[0].user_id) {
          await c.query(
            "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
            [empUser[0].user_id, `Resignation Returned: Your resignation request has been returned to you by HR.`]
          );
        }
      } else {
        return res.status(400).json({ error: "Invalid action for HR/Admin" });
      }
    } else {
      return res.status(400).json({ error: "Cannot perform action on current workflow step" });
    }

    // Apply updates
    await c.query("UPDATE resignations SET ? WHERE id = ?", [updateFields, resignationId]);

    // Log separation audit
    await c.query(
      `INSERT INTO separation_audit_logs (resignation_id, employee_id, action, performed_by, old_status, new_status, remarks) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [resignationId, resignation.emp_id, `Action: ${action}`, req.user.id, oldStatus, newStatus, remarks || 'Workflow action taken']
    );

    res.json({ success: true, message: `Resignation request successfully updated with action: ${action}` });

  } catch (err) {
    console.error("Error actioning resignation request:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});


/* ============ EXIT CLEARANCE APIs ============ */

// Get Clearance Checklist
router.get("/clearance/:resignationId", auth, async (req, res) => {
  let c = null;
  try {
    const resignationId = req.params.resignationId;
    const emp = await findEmployeeByUserId(req.user.id);
    const userRole = req.user.role ? req.user.role.toLowerCase() : '';
    const isHrOrAdmin = userRole === 'admin' || userRole === 'hr';

    c = await db();

    // Verify resignation
    const [resignations] = await c.query("SELECT employee_id FROM resignations WHERE id = ?", [resignationId]);
    if (resignations.length === 0) {
      return res.status(404).json({ error: "Resignation request not found" });
    }

    const isSelf = emp && emp.id === resignations[0].employee_id;
    if (!isHrOrAdmin && !isSelf) {
      return res.status(403).json({ error: "Unauthorized access to clearance checklist" });
    }

    const [tasks] = await c.query(
      `SELECT t.*, u.full_name as cleared_by_name 
       FROM exit_clearance_tasks t
       LEFT JOIN users u ON t.cleared_by = u.id
       WHERE t.resignation_id = ? 
       ORDER BY t.department, t.id`,
      [resignationId]
    );

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching clearance checklist:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update Clearance Task Status
router.put("/clearance/:resignationId/task/:taskId", auth, async (req, res) => {
  let c = null;
  try {
    const { resignationId, taskId } = req.params;
    const { status, remarks } = req.body;

    if (!status || !['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ error: "Valid status ('Pending', 'In Progress', 'Completed') is required" });
    }

    const userRole = req.user.role ? req.user.role.toLowerCase() : '';
    const isHrOrAdmin = userRole === 'admin' || userRole === 'hr';

    c = await db();
    
    // Validate task exists
    const [tasks] = await c.query(
      "SELECT department, task_name FROM exit_clearance_tasks WHERE id = ? AND resignation_id = ?",
      [taskId, resignationId]
    );

    if (tasks.length === 0) {
      return res.status(404).json({ error: "Clearance task not found" });
    }

    // Role check: Only HR/Admin can clear tasks
    // Wait, let's keep security tight
    if (!isHrOrAdmin) {
      return res.status(403).json({ error: "Only HR or Admin can sign off exit clearance tasks" });
    }

    await c.query(
      `UPDATE exit_clearance_tasks 
       SET status = ?, remarks = ?, cleared_by = ?, cleared_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [status, remarks || null, req.user.id, taskId]
    );

    // Audit Log
    await c.query(
      `INSERT INTO separation_audit_logs (resignation_id, action, performed_by, remarks) 
       VALUES (?, ?, ?, ?)`,
      [resignationId, `Clearance Task Status: ${tasks[0].task_name} -> ${status}`, req.user.id, remarks || 'Clearance updated']
    );

    res.json({ success: true, message: "Clearance task status updated successfully" });
  } catch (err) {
    console.error("Error updating clearance task:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});


/* ============ FULL & FINAL SETTLEMENT APIs ============ */

// Get F&F Settlement details
router.get("/settlement/:resignationId", auth, async (req, res) => {
  let c = null;
  try {
    const resignationId = req.params.resignationId;
    const emp = await findEmployeeByUserId(req.user.id);
    const userRole = req.user.role ? req.user.role.toLowerCase() : '';
    const isHrOrAdmin = userRole === 'admin' || userRole === 'hr';

    c = await db();

    const [resignations] = await c.query("SELECT employee_id FROM resignations WHERE id = ?", [resignationId]);
    if (resignations.length === 0) {
      return res.status(404).json({ error: "Resignation not found" });
    }

    const isSelf = emp && emp.id === resignations[0].employee_id;
    if (!isHrOrAdmin && !isSelf) {
      return res.status(403).json({ error: "Unauthorized access to F&F settlement" });
    }

    const [rows] = await c.query(
      `SELECT es.*, u.full_name as processed_by_name 
       FROM exit_settlements es
       LEFT JOIN users u ON es.processed_by = u.id
       WHERE es.resignation_id = ?`,
      [resignationId]
    );

    if (rows.length === 0) {
      // Auto-initialize if HR/Admin
      if (isHrOrAdmin) {
        await c.query(
          "INSERT IGNORE INTO exit_settlements (resignation_id, employee_id, status) VALUES (?, ?, 'Pending')",
          [resignationId, resignations[0].employee_id]
        );
        const [newRows] = await c.query("SELECT * FROM exit_settlements WHERE resignation_id = ?", [resignationId]);
        return res.json(newRows[0]);
      }
      return res.json(null);
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching settlement:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Process/Save F&F Settlement
router.post("/settlement/:resignationId", auth, hr, async (req, res) => {
  let c = null;
  try {
    const resignationId = req.params.resignationId;
    const {
      pending_salary,
      leave_encashment,
      bonus,
      recoveries,
      deductions,
      remarks
    } = req.body;

    const pSal = parseFloat(pending_salary) || 0.00;
    const lEnc = parseFloat(leave_encashment) || 0.00;
    const bon = parseFloat(bonus) || 0.00;
    const rec = parseFloat(recoveries) || 0.00;
    const ded = parseFloat(deductions) || 0.00;

    const netPayable = (pSal + lEnc + bon) - (rec + ded);

    c = await db();

    // Verify resignation
    const [resignations] = await c.query("SELECT employee_id FROM resignations WHERE id = ?", [resignationId]);
    if (resignations.length === 0) {
      return res.status(404).json({ error: "Resignation not found" });
    }

    const employeeId = resignations[0].employee_id;

    // Check if clearance is fully completed
    const [pendingTasks] = await c.query(
      "SELECT id FROM exit_clearance_tasks WHERE resignation_id = ? AND status != 'Completed'",
      [resignationId]
    );

    if (pendingTasks.length > 0) {
      return res.status(400).json({ error: "Cannot process F&F settlement while clearance tasks are pending sign-off." });
    }

    await c.query(
      `INSERT INTO exit_settlements 
       (resignation_id, employee_id, pending_salary, leave_encashment, bonus, recoveries, deductions, net_payable_amount, status, processed_by, processed_at, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Processed', ?, CURRENT_TIMESTAMP, ?)
       ON DUPLICATE KEY UPDATE 
         pending_salary = VALUES(pending_salary),
         leave_encashment = VALUES(leave_encashment),
         bonus = VALUES(bonus),
         recoveries = VALUES(recoveries),
         deductions = VALUES(deductions),
         net_payable_amount = VALUES(net_payable_amount),
         status = 'Processed',
         processed_by = VALUES(processed_by),
         processed_at = CURRENT_TIMESTAMP,
         remarks = VALUES(remarks)`,
      [resignationId, employeeId, pSal, lEnc, bon, rec, ded, netPayable, req.user.id, remarks || null]
    );

    // Update Resignation Workflow step
    await c.query(
      "UPDATE resignations SET current_workflow_step = 'Settlement Processed' WHERE id = ?",
      [resignationId]
    );

    // Audit log
    await c.query(
      `INSERT INTO separation_audit_logs (resignation_id, action, performed_by, remarks) 
       VALUES (?, ?, ?, ?)`,
      [resignationId, 'Settlement Processed', req.user.id, `Net Payable calculated: ₹${netPayable.toFixed(2)}`]
    );

    res.json({ success: true, message: "F&F Settlement processed successfully", netPayable });
  } catch (err) {
    console.error("Error processing settlement:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update F&F Settlement status to Paid
router.put("/settlement/:resignationId/status", auth, hr, async (req, res) => {
  let c = null;
  try {
    const resignationId = req.params.resignationId;
    const { status, payment_reference } = req.body;

    if (!status || !['Pending', 'Processed', 'Paid'].includes(status)) {
      return res.status(400).json({ error: "Valid status is required" });
    }

    c = await db();

    // Verify resignation
    const [resignations] = await c.query("SELECT employee_id, hr_last_working_date, calculated_last_working_date FROM resignations WHERE id = ?", [resignationId]);
    if (resignations.length === 0) {
      return res.status(404).json({ error: "Resignation not found" });
    }

    const resignation = resignations[0];
    const employeeId = resignation.employee_id;

    const [settlements] = await c.query("SELECT id FROM exit_settlements WHERE resignation_id = ?", [resignationId]);
    if (settlements.length === 0) {
      return res.status(400).json({ error: "Please process settlement values first." });
    }

    const paidAt = status === 'Paid' ? new Date() : null;
    const finalLwd = resignation.hr_last_working_date || resignation.calculated_last_working_date;

    await c.query(
      `UPDATE exit_settlements 
       SET status = ?, payment_reference = ?, paid_at = ?, processed_by = ?, processed_at = CURRENT_TIMESTAMP 
       WHERE resignation_id = ?`,
      [status, payment_reference || null, paidAt, req.user.id, resignationId]
    );

    if (status === 'Paid') {
      // Resignation status set to Relieved
      await c.query(
        "UPDATE resignations SET status = 'Relieved', current_workflow_step = 'Done', relieving_date = ?, final_working_date = ? WHERE id = ?",
        [finalLwd, finalLwd, resignationId]
      );

      // Employee status updated to Relieved, and set exit date
      await c.query(
        "UPDATE employees SET EmploymentStatus = 'Relieved', exit_date = ?, exit_status = 'Resigned' WHERE id = ?",
        [finalLwd, employeeId]
      );

      // Audit Log
      await c.query(
        `INSERT INTO separation_audit_logs (resignation_id, employee_id, action, performed_by, new_status, remarks) 
         VALUES (?, ?, ?, ?, 'Relieved', ?)`,
        [resignationId, employeeId, 'F&F Settlement Paid', req.user.id, `Exit completed. Reference: ${payment_reference || 'N/A'}`]
      );

      // Notify Employee
      const [empUser] = await c.query(
        `SELECT u.id AS user_id 
         FROM users u 
         INNER JOIN employees e ON (u.username = e.WorkEmail OR u.username = e.EmployeeNumber) 
         WHERE e.id = ?`,
        [employeeId]
      );
      if (empUser.length > 0 && empUser[0].user_id) {
        await c.query(
          "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
          [empUser[0].user_id, `Full & Final Settled: Your Full & Final Settlement has been paid. Relieving formalities completed.`]
        );
      }
    }

    res.json({ success: true, message: `Settlement status successfully updated to ${status}` });
  } catch (err) {
    console.error("Error updating settlement status:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

/* ============ RESIGNATION SETTINGS ============ */

// Get resignation settings
router.get("/settings", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query("SELECT setting_key, setting_value FROM resignation_settings");
    
    const settingsObj = {};
    rows.forEach(row => {
      settingsObj[row.setting_key] = row.setting_value === 1;
    });

    res.json(settingsObj);
  } catch (err) {
    console.error("Error fetching resignation settings:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update resignation settings
router.put("/settings", auth, hr, async (req, res) => {
  let c = null;
  try {
    const settings = req.body;
    c = await db();

    for (const [key, val] of Object.entries(settings)) {
      const dbVal = val ? 1 : 0;
      await c.query(
        "INSERT INTO resignation_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
        [key, dbVal, dbVal]
      );
    }
    
    res.json({ success: true, message: "Settings saved successfully" });
  } catch (err) {
    console.error("Error updating resignation settings:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

/* ============ RESIGNATION REASONS ============ */

// Get all resignation reasons
router.get("/reasons", auth, async (req, res) => {
  let c = null;
  try {
    c = await db();
    const [rows] = await c.query("SELECT * FROM resignation_reasons ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching resignation reasons:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Add a resignation reason
router.post("/reasons", auth, hr, async (req, res) => {
  let c = null;
  try {
    const { reason, description, is_active } = req.body;
    if (!reason) return res.status(400).json({ error: "Reason is required" });

    c = await db();
    const [result] = await c.query(
      "INSERT INTO resignation_reasons (reason, description, is_active) VALUES (?, ?, ?)",
      [reason, description || null, is_active !== undefined ? is_active : 1]
    );
    res.json({ success: true, id: result.insertId, message: "Reason added successfully" });
  } catch (err) {
    console.error("Error adding resignation reason:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Update a resignation reason
router.put("/reasons/:id", auth, hr, async (req, res) => {
  let c = null;
  try {
    const { reason, description, is_active } = req.body;
    if (!reason) return res.status(400).json({ error: "Reason is required" });

    c = await db();
    await c.query(
      "UPDATE resignation_reasons SET reason = ?, description = ?, is_active = ? WHERE id = ?",
      [reason, description || null, is_active !== undefined ? is_active : 1, req.params.id]
    );
    res.json({ success: true, message: "Reason updated successfully" });
  } catch (err) {
    console.error("Error updating resignation reason:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

// Delete a resignation reason
router.delete("/reasons/:id", auth, hr, async (req, res) => {
  let c = null;
  try {
    c = await db();
    await c.query("DELETE FROM resignation_reasons WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Reason deleted successfully" });
  } catch (err) {
    console.error("Error deleting resignation reason:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (c) await c.end();
  }
});

module.exports = router;
