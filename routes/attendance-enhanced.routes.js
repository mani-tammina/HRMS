/**
 * ENHANCED ATTENDANCE ROUTES
 * Supports multiple punch in/out throughout the day with gross hours calculation
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr, manager, roleAuth } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");
const autoClockOutService = require("../services/auto-clockout.service");

const ATTENDANCE_LOCK_WAIT_SECONDS = 10;

// The daily attendance row may not exist yet, so row locks alone cannot
// serialize concurrent first punch requests. MySQL named locks cover that gap.
async function acquireAttendanceLock(connection, employeeId, attendanceDate) {
  const lockName = `attendance:${employeeId}:${attendanceDate}`;
  const [rows] = await connection.query(
    "SELECT GET_LOCK(?, ?) AS acquired",
    [lockName, ATTENDANCE_LOCK_WAIT_SECONDS]
  );

  if (Number(rows[0]?.acquired) !== 1) {
    const error = new Error(
      "An attendance request is already being processed. Please try again."
    );
    error.statusCode = 409;
    throw error;
  }

  return lockName;
}

async function releaseAttendanceLock(connection, lockName) {
  if (connection && lockName) {
    await connection.query("SELECT RELEASE_LOCK(?)", [lockName]);
  }
}

async function validateTimeTrackingPolicy(connection, employeeId, workMode, ipAddress, notes) {
  // 1. Get employee's attendance_capture_scheme_id
  const [empRows] = await connection.query(
    "SELECT attendance_capture_scheme_id FROM employees WHERE id = ?",
    [employeeId]
  );

  if (!empRows || empRows.length === 0) {
    return; // No employee found, normal flow handles error
  }

  const schemeId = empRows[0].attendance_capture_scheme_id;
  if (!schemeId) {
    return; // No policy assigned
  }

  // 2. Fetch the policy
  const [policyRows] = await connection.query(
    "SELECT biometric_settings, remote_punch_settings, wfh_settings FROM attendance_capture_schemes WHERE id = ? AND status = 'active'",
    [schemeId]
  );

  if (!policyRows || policyRows.length === 0) {
    return; // Policy not found or inactive
  }

  const policy = policyRows[0];

  const parseJSON = (str) => {
    if (!str) return {};
    if (typeof str === 'object') return str;
    try { return JSON.parse(str); } catch (e) { return {}; }
  };

  const biometric = parseJSON(policy.biometric_settings);
  const remote = parseJSON(policy.remote_punch_settings);
  const wfh = parseJSON(policy.wfh_settings);

  // Extract primary client IP (handles proxy headers like x-forwarded-for with multiple IPs)
  let rawIp = (ipAddress || '').split(',')[0].trim();
  if (rawIp === '::1' || rawIp === '::ffff:127.0.0.1' || rawIp === '127.0.0.1') {
    rawIp = '127.0.0.1';
  } else if (rawIp.startsWith('::ffff:')) {
    rawIp = rawIp.replace('::ffff:', '');
  }

  // Strip port number if attached to IP (e.g. "202.53.69.35:32340" -> "202.53.69.35")
  if (rawIp.includes(':') && !rawIp.includes('[')) {
    const colonIndex = rawIp.lastIndexOf(':');
    if (colonIndex > -1 && rawIp.indexOf(':') === colonIndex) {
      rawIp = rawIp.substring(0, colonIndex);
    }
  } else if (rawIp.includes(']')) {
    rawIp = rawIp.replace(/^\[/, '').replace(/\]:.*$/, '');
  }

  const incomingIp = rawIp;

  if (workMode === 'Office') {
    if (biometric.web_clockin_enabled === false) {
      const err = new Error("Web clock-in is disabled by your time tracking policy.");
      err.statusCode = 403;
      throw err;
    }

    if (biometric.web_clockin_comment_required === true) {
      if (!notes || notes.trim() === '' || notes === 'Office Clock-In' || notes === 'Going for lunch') {
        // Exclude default auto-generated notes to enforce genuine user comment
        const err = new Error("A comment is mandatory for web clock-in/out according to your policy.");
        err.statusCode = 400;
        throw err;
      }
    }

    const isIpRestrictionEnabled = biometric.ip_restriction_enabled === true || biometric.ip_restriction_enabled === 'true' || biometric.ip_restriction_enabled === 1 || biometric.ip_restriction_enabled === '1';
    
    if (isIpRestrictionEnabled) {
      if (!biometric.ip_networks || biometric.ip_networks.length === 0) {
        const err = new Error("Access denied. Please connect to an approved network or use Remote Clock In");
        err.statusCode = 403;
        throw err;
      }

      const ipToLong = (ip) => {
        if (!ip) return null;
        const parts = ip.trim().split('.');
        if (parts.length !== 4) return null;
        const nums = parts.map(p => parseInt(p, 10));
        if (nums.some(n => isNaN(n) || n < 0 || n > 255)) return null;
        return ((nums[0] << 24) | (nums[1] << 16) | (nums[2] << 8) | nums[3]) >>> 0;
      };

      let isAllowed = false;
      const currentLong = ipToLong(incomingIp);

      for (const net of biometric.ip_networks) {
        const rawAllowed = (net.ip_address || '').trim();
        if (!rawAllowed) continue;

        // Split by comma or semicolon in case multiple IPs/ranges are listed in a single string
        const allowedTokens = rawAllowed.split(/[,;]+/).map(s => s.trim()).filter(Boolean);

        for (const allowed of allowedTokens) {
          // 1. Exact match
          if (allowed === incomingIp) {
            isAllowed = true;
            break;
          }

          // 2. CIDR notation match (e.g. "30.0.0.1/23" or "30.0.0.0/23")
          if (allowed.includes('/')) {
            const [ipPart, cidrPart] = allowed.split('/');
            const baseLong = ipToLong(ipPart);
            const bits = parseInt(cidrPart, 10);
            if (baseLong !== null && !isNaN(bits) && bits >= 0 && bits <= 32 && currentLong !== null) {
              const mask = bits === 0 ? 0 : ((0xFFFFFFFF << (32 - bits)) >>> 0);
              if ((currentLong & mask) === (baseLong & mask)) {
                isAllowed = true;
                break;
              }
            }
          }

          // 3. Subnet mask match (e.g. "30.0.0.0 255.255.254.0")
          if (allowed.includes('255.')) {
            const parts = allowed.split(/[\s\/]+/);
            if (parts.length === 2) {
              const baseLong = ipToLong(parts[0]);
              const maskLong = ipToLong(parts[1]);
              if (baseLong !== null && maskLong !== null && currentLong !== null) {
                if ((currentLong & maskLong) === (baseLong & maskLong)) {
                  isAllowed = true;
                  break;
                }
              }
            }
          }

          // 4. IP Range match (e.g., "30.0.0.2 - 30.0.1.254" or "30.0.0.2-30.0.1.254")
          if (allowed.includes('-')) {
            const rangeParts = allowed.split('-');
            if (rangeParts.length === 2) {
              const startLong = ipToLong(rangeParts[0]);
              const endLong = ipToLong(rangeParts[1]);
              if (startLong !== null && endLong !== null && currentLong !== null) {
                if (currentLong >= startLong && currentLong <= endLong) {
                  isAllowed = true;
                  break;
                }
              }
            }
          }

          // 5. Subnet / prefix match (e.g. "30.0." or "30.0.0.")
          if (allowed.endsWith('.') && incomingIp.startsWith(allowed)) {
            isAllowed = true;
            break;
          }
        }

        if (isAllowed) break;
      }

      if (!isAllowed) {
        console.warn(`[IP Restriction] Incoming IP '${incomingIp}' denied. Configured authorized networks:`, biometric.ip_networks);
        const err = new Error("Access denied. Please connect to an approved network or use Remote Clock In");
        err.statusCode = 403;
        throw err;
      }
    }
  } else if (workMode === 'Remote') {
    if (remote.remote_clockin_web_enabled === false) {
      const err = new Error("Remote web clock-in is disabled by your time tracking policy.");
      err.statusCode = 403;
      throw err;
    }
  } else if (workMode === 'WFH') {
    if (wfh.wfh_enabled === false || wfh.wfh_clockin_allowed === false) {
      const err = new Error("WFH clock-in is disabled by your time tracking policy.");
      err.statusCode = 403;
      throw err;
    }
  }
}

/* ============================================
   PUNCH IN/OUT (Employee)
   ============================================ */

/**
 * Punch In - Can be done multiple times per day
 */
router.post("/punch-in", auth, async (req, res) => {
  let c = null;
  let lockName = null;
  let transactionStarted = false;

  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const { work_mode, location, notes } = req.body;
    const ip_address =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-client-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.body?.ip_address ||
      req.body?.public_ip ||
      req.ip ||
      req.socket?.remoteAddress;
    const device_info = req.headers["user-agent"];

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    c = await db();
    lockName = await acquireAttendanceLock(c, emp.id, today);

    // Auto clock-out check: resolve any overdue active punch for this employee
    await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);

    // Validate Time Tracking Policy before proceeding
    await validateTimeTrackingPolicy(c, emp.id, work_mode || "Office", ip_address, notes);

    await c.beginTransaction();
    transactionStarted = true;

    // The named lock serializes all punch requests for this employee and day.
    const [lastPunch] = await c.query(
      `SELECT punch_type, punch_time
             FROM attendance_punches
             WHERE employee_id = ? AND punch_date = ?
             ORDER BY punch_time DESC, id DESC
             LIMIT 1 FOR UPDATE`,
      [emp.id, today]
    );

    if (lastPunch[0]?.punch_type === "in") {
      const punchTime = lastPunch[0].punch_time ? new Date(lastPunch[0].punch_time).getTime() : 0;
      const secondsAgo = (Date.now() - punchTime) / 1000;
      if (secondsAgo >= 0 && secondsAgo <= 15) {
        return res.json({
          success: true,
          message: "Punched in successfully",
          punch_time: lastPunch[0].punch_time,
          work_mode: work_mode || "Office",
          alreadyProcessed: true
        });
      }
      return res.status(400).json({
        error: "Already punched in. Please punch out first.",
        message:
          "You have an active punch-in. Punch out before punching in again.",
      });
    }

    // Get or create attendance record for today
    let [attendance] = await c.query(
      `SELECT id FROM attendance
             WHERE employee_id = ? AND attendance_date = ?
             FOR UPDATE`,
      [emp.id, today]
    );

    let attendanceId;

    if (attendance.length === 0) {
      let approvalStatus = 'approved';
      if (work_mode === 'Remote') {
        // check if policy requires approval for remote punch
        const [empRows] = await c.query(
          "SELECT attendance_capture_scheme_id FROM employees WHERE id = ?",
          [emp.id]
        );
        if (empRows.length > 0 && empRows[0].attendance_capture_scheme_id) {
          const [policyRows] = await c.query(
            "SELECT remote_punch_settings FROM attendance_capture_schemes WHERE id = ?",
            [empRows[0].attendance_capture_scheme_id]
          );
          if (policyRows.length > 0) {
            let remote = {};
            try { remote = JSON.parse(policyRows[0].remote_punch_settings); } catch (e) { }
            if (remote.remote_clockin_approval_required === 'yes') {
              approvalStatus = 'pending';
            }
          }
        }
      }

      // Create new attendance record
      const [result] = await c.query(
        `INSERT INTO attendance 
                 (employee_id, attendance_date, punch_date, first_check_in, work_mode, location, status, approval_status)
                 VALUES (?, ?, ?, ?, ?, ?, 'present', ?)`,
        [emp.id, today, today, now, work_mode || "Office", location || "Office", approvalStatus]
      );
      attendanceId = result.insertId;

      if (approvalStatus === 'pending') {
        // Trigger inbox notification for approver (we'll notify RM for simplicity)
        const [rmRows] = await c.query("SELECT reporting_manager_id FROM employees WHERE id = ?", [emp.id]);
        if (rmRows.length > 0 && rmRows[0].reporting_manager_id) {
          const approverId = rmRows[0].reporting_manager_id;
          const [approverUser] = await c.query("SELECT user_id FROM employees WHERE id = ?", [approverId]);
          if (approverUser.length > 0 && approverUser[0].user_id) {
            await c.query(
              `INSERT INTO inbox_notifications (user_id, sender_id, type, title, message, action_url)
               VALUES (?, ?, 'approval', 'Remote Punch Approval Request', 'An employee requested remote punch approval.', '/inbox/approvals')`,
              [approverUser[0].user_id, req.user.id]
            );
          }
        }
      }
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
          [now, work_mode || "Office", location || "Office", attendanceId]
        );
      } else {
        await c.query(
          `UPDATE attendance SET work_mode = ?, location = ? WHERE id = ?`,
          [work_mode || "Office", location || "Office", attendanceId]
        );
      }
    }

    // Insert punch record
    await c.query(
      `INSERT INTO attendance_punches 
             (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, location, notes)
             VALUES (?, ?, 'in', ?, ?, ?, ?, ?, ?)`,
      [
        attendanceId,
        emp.id,
        now,
        today,
        ip_address,
        device_info,
        location,
        notes,
      ]
    );

    await c.commit();
    transactionStarted = false;

    return res.json({
      success: true,
      message: "Punched in successfully",
      punch_time: now,
      work_mode: work_mode || "Office",
      attendance_id: attendanceId,
    });
  } catch (error) {
    if (c && transactionStarted) {
      try {
        await c.rollback();
      } catch (rollbackError) {
        console.error("Punch in rollback error:", rollbackError);
      }
    }
    console.error("Punch in error:", error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  } finally {
    if (c) {
      if (transactionStarted) {
        try {
          await c.rollback();
        } catch (rollbackError) {
          console.error("Punch in rollback error in finally:", rollbackError);
        }
      }
      try {
        await releaseAttendanceLock(c, lockName);
      } catch (releaseError) {
        console.error("Punch in lock release error:", releaseError);
      }
      await c.end();
    }
  }
});

/**
 * Punch Out - Can be done multiple times per day
 */
router.post("/punch-out", auth, async (req, res) => {
  let c = null;
  let lockName = null;
  let transactionStarted = false;

  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const { notes } = req.body;
    const ip_address =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-client-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.body?.ip_address ||
      req.body?.public_ip ||
      req.ip ||
      req.socket?.remoteAddress;
    const device_info = req.headers["user-agent"];

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    c = await db();
    lockName = await acquireAttendanceLock(c, emp.id, today);

    // Auto clock-out check: resolve any overdue active punch for this employee
    await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);

    await c.beginTransaction();
    transactionStarted = true;

    // Lock the daily record while we validate and append the next punch.
    const [attendance] = await c.query(
      `SELECT id, work_mode FROM attendance
             WHERE employee_id = ? AND attendance_date = ?
             FOR UPDATE`,
      [emp.id, today]
    );

    if (attendance.length === 0) {
      return res.status(400).json({
        error: "No attendance record found. Please punch in first.",
      });
    }

    const attendanceId = attendance[0].id;
    const workMode = attendance[0].work_mode;

    // Validate Time Tracking Policy before proceeding
    // We use the workMode from the attendance record since punch-out doesn't send it.
    await validateTimeTrackingPolicy(c, emp.id, workMode || "Office", ip_address, notes);

    // Check last punch
    const [lastPunch] = await c.query(
      `SELECT punch_type, punch_time FROM attendance_punches 
             WHERE attendance_id = ? 
             ORDER BY punch_time DESC, id DESC
             LIMIT 1 FOR UPDATE`,
      [attendanceId]
    );

    if (lastPunch.length === 0) {
      return res.status(400).json({
        error: "No punch-in found. Please punch in first.",
      });
    }

    if (lastPunch[0].punch_type === "out") {
      const punchTime = lastPunch[0].punch_time ? new Date(lastPunch[0].punch_time).getTime() : 0;
      const secondsAgo = (Date.now() - punchTime) / 1000;
      if (secondsAgo >= 0 && secondsAgo <= 15) {
        return res.json({
          success: true,
          message: "Punched out successfully",
          punch_time: lastPunch[0].punch_time,
          attendance_id: attendanceId,
          alreadyProcessed: true
        });
      }
      return res.status(400).json({
        error: "Already punched out. Punch in first to punch out again.",
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
    transactionStarted = false;

    return res.json({
      success: true,
      message: "Punched out successfully",
      punch_time: now,
      attendance_id: attendanceId,
    });
  } catch (error) {
    if (c && transactionStarted) {
      try {
        await c.rollback();
      } catch (rollbackError) {
        console.error("Punch out rollback error:", rollbackError);
      }
    }
    console.error("Punch out error:", error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  } finally {
    if (c) {
      if (transactionStarted) {
        try {
          await c.rollback();
        } catch (rollbackError) {
          console.error("Punch out rollback error in finally:", rollbackError);
        }
      }
      try {
        await releaseAttendanceLock(c, lockName);
      } catch (releaseError) {
        console.error("Punch out lock release error:", releaseError);
      }
      await c.end();
    }
  }
});

/**
 * Get Today's Attendance Status (Employee)
 */
router.get("/today", auth, async (req, res) => {
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const today = new Date().toISOString().split("T")[0];
    const c = await db();

    // Auto clock-out check: resolve any overdue active punch for this employee
    try {
      await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);
    } catch (autoErr) {
      console.warn("[AutoClockOut] Check in /today error:", autoErr.message);
    }

    // Fetch shift timing & auto clock-out cutoff info
    let shiftTiming = null;
    try {
      shiftTiming = await autoClockOutService.getShiftTimingForEmployee(c, emp.id, today);
    } catch (shiftErr) {
      console.warn("[AutoClockOut] Shift timing fetch error:", shiftErr.message);
    }

    // Get attendance record
    const [attendance] = await c.query(
      `SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
      [emp.id, today]
    );

    // Fetch policy permissions
    let policyPermissions = {
      web_clockin_enabled: true,
      remote_clockin_enabled: true,
      wfh_clockin_enabled: true,
      web_clockin_comment_required: false,
      remote_clockin_comment_required: 'no',
      remote_clockin_approval_required: 'no'
    };

    if (emp.attendance_capture_scheme_id) {
      const [policyRows] = await c.query(
        "SELECT biometric_settings, remote_punch_settings, wfh_settings FROM attendance_capture_schemes WHERE id = ? AND status = 'active'",
        [emp.attendance_capture_scheme_id]
      );
      if (policyRows.length > 0) {
        const policy = policyRows[0];
        const parseJSON = (str) => {
          if (!str) return {};
          if (typeof str === 'object') return str;
          try { return JSON.parse(str); } catch (e) { return {}; }
        };
        const biometric = parseJSON(policy.biometric_settings);
        const remote = parseJSON(policy.remote_punch_settings);
        const wfh = parseJSON(policy.wfh_settings);

        if (biometric.web_clockin_enabled === false) policyPermissions.web_clockin_enabled = false;
        if (biometric.web_clockin_comment_required === true) policyPermissions.web_clockin_comment_required = true;

        if (remote.remote_clockin_web_enabled === false) policyPermissions.remote_clockin_enabled = false;
        if (remote.remote_clockin_comment_required) policyPermissions.remote_clockin_comment_required = remote.remote_clockin_comment_required;
        if (remote.remote_clockin_approval_required) policyPermissions.remote_clockin_approval_required = remote.remote_clockin_approval_required;

        if (wfh.wfh_enabled === false || wfh.wfh_clockin_allowed === false) policyPermissions.wfh_clockin_enabled = false;
        policyPermissions.wfh_settings = wfh;
      }
    }

    if (attendance.length === 0) {
      c.end();
      return res.json({
        has_attendance: false,
        message: "No attendance record for today",
        punches: [],
        policyPermissions,
        shiftTiming
      });
    }

    // Get all punches (include work_mode from attendance table)
    const [punches] = await c.query(
      `SELECT ap.*, a.work_mode 
             FROM attendance_punches ap
             JOIN attendance a ON ap.attendance_id = a.id
             WHERE ap.attendance_id = ? 
             ORDER BY ap.punch_time ASC`,
      [attendance[0].id]
    );

    c.end();

    res.json({
      has_attendance: true,
      attendance: attendance[0],
      punches: punches,
      punch_count: punches.length,
      last_punch_type:
        punches.length > 0 ? punches[punches.length - 1].punch_type : null,
      can_punch_in:
        punches.length === 0 ||
        punches[punches.length - 1].punch_type === "out",
      can_punch_out:
        punches.length > 0 && punches[punches.length - 1].punch_type === "in",
      policyPermissions,
      shiftTiming
    });
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Multiple Employees' Current Attendance Status (for team view)
 */
router.post("/bulk-status", auth, async (req, res) => {
  try {
    const { employee_ids } = req.body;

    if (
      !employee_ids ||
      !Array.isArray(employee_ids) ||
      employee_ids.length === 0
    ) {
      return res.status(400).json({ error: "employee_ids array is required" });
    }

    const today = new Date().toISOString().split("T")[0];
    console.log("\n🔍 ========== BULK STATUS DEBUG ==========");
    console.log("📅 Checking attendance for date:", today);
    console.log("👥 Employee IDs requested:", employee_ids);

    const c = await db();

    // Get attendance records for all employees today
    const placeholders = employee_ids.map(() => "?").join(",");
    const [attendance] = await c.query(
      `SELECT 
                a.employee_id,
                a.id as attendance_id,
                a.attendance_date,
                a.work_mode,
                a.status
             FROM attendance a
             WHERE a.employee_id IN (${placeholders}) 
               AND a.attendance_date = ?`,
      [...employee_ids, today]
    );

    console.log("\n📋 Attendance Records Found:", attendance.length);
    attendance.forEach((att) => {
      console.log(
        `  Employee ${att.employee_id}: attendance_id=${att.attendance_id}, work_mode=${att.work_mode}, status=${att.status}`
      );
    });

    // Get last punch for each attendance
    const attendanceIds = attendance.map((a) => a.attendance_id);
    let lastPunches = [];

    console.log("\n🎯 Attendance IDs to check for punches:", attendanceIds);

    if (attendanceIds.length > 0) {
      const punchPlaceholders = attendanceIds.map(() => "?").join(",");
      [lastPunches] = await c.query(
        `SELECT 
                    ap.attendance_id,
                    ap.employee_id,
                    ap.punch_type,
                    ap.punch_time
                 FROM attendance_punches ap
                 INNER JOIN (
                     SELECT attendance_id, MAX(punch_time) as max_time
                     FROM attendance_punches
                     WHERE attendance_id IN (${punchPlaceholders})
                     GROUP BY attendance_id
                 ) latest ON ap.attendance_id = latest.attendance_id 
                   AND ap.punch_time = latest.max_time`,
        attendanceIds
      );

      console.log("\n👊 Last Punches Found:", lastPunches.length);
      lastPunches.forEach((punch) => {
        console.log(
          `  Employee ${punch.employee_id}: attendance_id=${punch.attendance_id}, punch_type=${punch.punch_type}, punch_time=${punch.punch_time}`
        );
      });
    } else {
      console.log("\n⚠️ No attendance IDs found - skipping punch query");
    }

    c.end();

    console.log("\n🏗️ Building Status Map...");

    // Build status map
    const statusMap = {};
    employee_ids.forEach((id) => {
      statusMap[id] = {
        employee_id: id,
        status: "out",
        has_attendance: false,
        work_mode: null,
        last_punch_time: null,
      };
    });

    console.log(
      "📝 Initial Status Map (all out):",
      Object.keys(statusMap).length,
      "employees"
    );

    // Update with actual attendance data
    attendance.forEach((att) => {
      statusMap[att.employee_id].has_attendance = true;
      statusMap[att.employee_id].work_mode = att.work_mode;
      statusMap[att.employee_id].attendance_status = att.status;
      console.log(
        `✏️ Updated Employee ${att.employee_id}: has_attendance=true, work_mode=${att.work_mode}`
      );
    });

    // Update with last punch type
    lastPunches.forEach((punch) => {
      if (statusMap[punch.employee_id]) {
        const newStatus = punch.punch_type === "in" ? "in" : "out";
        statusMap[punch.employee_id].status = newStatus;
        statusMap[punch.employee_id].last_punch_time = punch.punch_time;
        console.log(
          `✅ Employee ${punch.employee_id}: Last punch type = ${punch.punch_type}, Status = ${newStatus}, Time = ${punch.punch_time}`
        );
      }
    });

    console.log("\n📊 Final Bulk Status Response:");
    Object.values(statusMap).forEach((emp) => {
      console.log(
        `  Employee ${emp.employee_id}: status=${emp.status}, has_attendance=${emp.has_attendance}, work_mode=${emp.work_mode}, last_punch_time=${emp.last_punch_time}`
      );
    });
    console.log("========================================\n");

    res.json({
      success: true,
      date: today,
      statuses: Object.values(statusMap),
    });
  } catch (error) {
    console.error("Error fetching bulk attendance status:", error);
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

    // Get LOP leaves count for the period
    let lopQuery = `
      SELECT SUM(l.total_days) as lop_days
      FROM leaves l
      INNER JOIN leave_types lt ON l.leave_type_id = lt.id
      WHERE l.employee_id = ? AND l.status = 'approved' AND lt.type_code = 'LOP'
    `;
    const lopParams = [emp.id];

    if (startDate && endDate) {
      lopQuery += ` AND (l.start_date BETWEEN ? AND ? OR l.end_date BETWEEN ? AND ?)`;
      lopParams.push(startDate, endDate, startDate, endDate);
    } else if (month && year) {
      lopQuery += ` AND ((MONTH(l.start_date) = ? AND YEAR(l.start_date) = ?) OR (MONTH(l.end_date) = ? AND YEAR(l.end_date) = ?))`;
      lopParams.push(month, year, month, year);
    }

    const [lopData] = await c.query(lopQuery, lopParams);
    const lopDays = Number(lopData[0].lop_days) || 0;

    // Get detailed shift and weekend policies
    const [empDetails] = await c.query(`
      SELECT e.id, sp.id as shift_policy_id, sp.start_time, sp.end_time, sp.name as shift_name, mlt.threshold_hours as missing_log_threshold, wop.* 
      FROM employees e
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LEFT JOIN missing_log_times mlt ON e.leave_plan_id = mlt.leave_plan_id
      LEFT JOIN weekly_off_policies wop ON e.weekly_off_policy_id = wop.id
      WHERE e.id = ?
    `, [emp.id]);
    const employee = empDetails[0];

    // Get all approved leaves for the period for summary calculation
    let allLeavesQuery = `
      SELECT l.*, lt.type_code 
      FROM leaves l 
      INNER JOIN leave_types lt ON l.leave_type_id = lt.id 
      WHERE l.employee_id = ? AND l.status = 'approved'
    `;
    const allLeavesParams = [emp.id];
    const [allLeaves] = await c.query(allLeavesQuery, allLeavesParams);

    // Map existing attendance for fast lookup
    const attMap = new Map();
    attendance.forEach(a => {
      const dStr = new Date(a.attendance_date).toDateString();
      attMap.set(dStr, a);
    });

    const now = new Date();
    const todayStr = now.toDateString();

    // Determine range
    let start, end;
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      const rMonth = parseInt(month) || (now.getMonth() + 1);
      const rYear = parseInt(year) || now.getFullYear();
      start = new Date(rYear, rMonth - 1, 1);
      end = new Date(rYear, rMonth, 0);
    }

    // Iterate through range
    let present_days = 0;
    let absent_days = 0;
    let leave_days = 0;
    let penalty_count = 0;
    let half_day_count = 0;
    let weekend_days = 0;

    const weekOffDays = [];
    if (employee) {
      if (employee.sunday_off) weekOffDays.push('sunday');
      if (employee.monday_off) weekOffDays.push('monday');
      if (employee.tuesday_off) weekOffDays.push('tuesday');
      if (employee.wednesday_off) weekOffDays.push('wednesday');
      if (employee.thursday_off) weekOffDays.push('thursday');
      if (employee.friday_off) weekOffDays.push('friday');
      if (employee.saturday_off) weekOffDays.push('saturday');
    }

    // Fetch all leave types dynamically from database
    const [dbLeaveTypesList] = await c.query("SELECT type_code, type_name FROM leave_types");
    const dynamicLeaveTokens = new Set(['half', 'hd', 'leave', 'loss of pay', 'lop', 'ul', 'sick', 'casual', 'maternity', 'marriage', 'privilege', 'earned', 'sl', 'cl', 'ml', 'mrl', 'pl', 'el']);
    dbLeaveTypesList.forEach(lt => {
      if (lt.type_code) dynamicLeaveTokens.add(String(lt.type_code).toLowerCase().trim());
      if (lt.type_name) dynamicLeaveTokens.add(String(lt.type_name).toLowerCase().trim());
    });
    const leaveTokenArray = Array.from(dynamicLeaveTokens);

    let curr = new Date(start);
    let lop_from_leaves = 0;
    let lop_from_attendance = 0;
    let penalty_absent_days = 0;
    let regular_absent_days = 0;

    while (curr <= end) {
      if (curr > now && curr.toDateString() !== todayStr) {
        curr.setDate(curr.getDate() + 1);
        continue;
      }

      const dStr = curr.toDateString();
      const isToday = dStr === todayStr;
      const weekday = curr.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      // Check if on leave (including partial days)
      const todaysLeaves = allLeaves.filter(l => {
        const lStart = new Date(l.start_date);
        const lEnd = new Date(l.end_date);
        const check = new Date(curr);
        check.setHours(0, 0, 0, 0);
        lStart.setHours(0, 0, 0, 0);
        lEnd.setHours(0, 0, 0, 0);
        return check >= lStart && check <= lEnd;
      });

      if (todaysLeaves.length > 0) {
        // Calculate leave days for today
        todaysLeaves.forEach(l => {
          const weight = l.is_half_day ? 0.5 : 1.0;
          leave_days += weight;
          if (l.type_code === 'LOP' || l.type_code === 'UL') {
            lop_from_leaves += weight;
          }
        });
      } else if (weekOffDays.includes(weekday)) {
        weekend_days++;
      } else if (attMap.has(dStr)) {
        const record = attMap.get(dStr);
        const nLower = String(record.notes || '').toLowerCase();
        if (record.status === 'present') present_days++;
        else if (record.status === 'absent') {
          absent_days++;
          if (nLower.includes('lop') || nLower.includes('ul') || nLower.includes('loss of pay') || nLower.includes('unpaid')) {
            lop_from_attendance++;
          } else {
            regular_absent_days++;
          }
        } else if (record.status === 'half-day') {
          present_days += 0.5;
          half_day_count++;
          if (leaveTokenArray.some(token => nLower.includes(token))) {
            leave_days += 0.5;
            if (nLower.includes('lop') || nLower.includes('ul') || nLower.includes('loss of pay') || nLower.includes('unpaid')) {
              lop_from_attendance += 0.5;
            }
          }
        } else if (record.status === 'on-leave') {
          leave_days++;
          if (nLower.includes('lop') || nLower.includes('ul') || nLower.includes('loss of pay') || nLower.includes('unpaid')) {
            lop_from_attendance++;
          }
        } else if (record.status === 'penalty') {
          penalty_count++;
          penalty_absent_days++;
          absent_days++;
        }
      } else if (!isToday) {
        // No log and not today - apply penalty rule
        const shiftStartStr = employee?.start_time || '09:00:00';
        const [sh, sm] = shiftStartStr.split(':').map(Number);
        const shiftStart = new Date(curr);
        shiftStart.setHours(sh || 9, sm || 0, 0, 0);

        const penaltyThreshold = new Date(shiftStart);
        const thresholdHours = employee?.missing_log_threshold || 48;
        penaltyThreshold.setHours(penaltyThreshold.getHours() + thresholdHours);

        if (now > penaltyThreshold) {
          penalty_count++;
          penalty_absent_days++;
          absent_days++;
        }
      }

      curr.setDate(curr.getDate() + 1);
    }

    const summary = {
      total_days: attendance.length + weekend_days,
      present_days: present_days,
      absent_days: absent_days,
      half_days: half_day_count,
      leave_days: leave_days,
      weekend_days: weekend_days,
      lop_days: (penalty_absent_days * 0.5) + (regular_absent_days * 1.0) + lop_from_leaves + lop_from_attendance,
      total_work_hours: attendance
        .reduce((sum, a) => sum + (parseFloat(a.gross_hours) || 0), 0)
        .toFixed(2),
      avg_work_hours:
        attendance.length > 0
          ? (
            attendance.reduce(
              (sum, a) => sum + (parseFloat(a.gross_hours) || 0),
              0
            ) / attendance.length
          ).toFixed(2)
          : 0,
    };

    c.end();

    res.json({
      summary,
      attendance,
      shift_policy: employee ? {
        id: employee.shift_policy_id,
        start_time: employee.start_time,
        end_time: employee.end_time,
        name: employee.shift_name
      } : null,
      weekly_off_policy: employee ? {
        id: employee.weekly_off_policy_id,
        sunday_off: employee.sunday_off,
        monday_off: employee.monday_off,
        tuesday_off: employee.tuesday_off,
        wednesday_off: employee.wednesday_off,
        thursday_off: employee.thursday_off,
        friday_off: employee.friday_off,
        saturday_off: employee.saturday_off,
        name: employee.name,
        policy_code: employee.policy_code
      } : null
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

    let { date } = req.params;
    if (date && date.endsWith("/")) date = date.slice(0, -1);
    const c = await db();

    const [attendance] = await c.query(
      `SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
      [emp.id, date]
    );

    const [leaves] = await c.query(
      `SELECT l.*, lt.type_name, lt.type_code 
       FROM leaves l 
       JOIN leave_types lt ON l.leave_type_id = lt.id 
       WHERE l.employee_id = ? AND l.status = 'approved' AND ? BETWEEN l.start_date AND l.end_date`,
      [emp.id, date]
    );

    if (attendance.length === 0) {
      c.end();
      return res.json({
        has_attendance: false,
        attendance: null,
        punches: [],
        punch_pairs: [],
        on_leave: leaves.length > 0,
        leave: leaves[0] || null
      });
    }

    const [punches] = await c.query(
      `SELECT * FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC`,
      [attendance[0].id]
    );

    c.end();

    res.json({
      has_attendance: true,
      attendance: attendance[0],
      punches,
      punch_pairs: calculatePunchPairs(punches),
      on_leave: leaves.length > 0,
      leave: leaves[0] || null
    });
  } catch (error) {
    console.error("Error fetching attendance details:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Attendance Details with Punches for Employee (Manager/Admin)
 */
router.get("/details/:date/:employeeId", auth, manager, async (req, res) => {
  try {
    let { employeeId, date } = req.params;
    if (date && date.endsWith("/")) date = date.slice(0, -1);
    const c = await db();

    const [attendance] = await c.query(
      `SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
      [employeeId, date]
    );

    const [leaves] = await c.query(
      `SELECT l.*, lt.type_name, lt.type_code 
       FROM leaves l 
       JOIN leave_types lt ON l.leave_type_id = lt.id 
       WHERE l.employee_id = ? AND l.status = 'approved' AND ? BETWEEN l.start_date AND l.end_date`,
      [employeeId, date]
    );

    if (attendance.length === 0) {
      c.end();
      return res.json({
        has_attendance: false,
        attendance: null,
        punches: [],
        punch_pairs: [],
        on_leave: leaves.length > 0,
        leave: leaves[0] || null
      });
    }

    const [punches] = await c.query(
      `SELECT * FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC`,
      [attendance[0].id]
    );

    c.end();

    res.json({
      has_attendance: true,
      attendance: attendance[0],
      punches,
      punch_pairs: calculatePunchPairs(punches),
      on_leave: leaves.length > 0,
      leave: leaves[0] || null
    });
  } catch (error) {
    console.error("Error fetching employee attendance details:", error);
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
    const targetEmpId = req.params.employeeId;
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

    const params = [targetEmpId];

    if (startDate && endDate) {
      query += ` AND a.attendance_date BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    } else if (month && year) {
      query += ` AND MONTH(a.attendance_date) = ? AND YEAR(a.attendance_date) = ?`;
      params.push(month, year);
    }

    query += ` ORDER BY a.attendance_date DESC`;

    const [attendance] = await c.query(query, params);

    // Get detailed shift and weekend policies for the employee
    const [empDetails] = await c.query(`
      SELECT e.id, e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail, sp.id as shift_policy_id, sp.start_time, sp.end_time, sp.name as shift_name, mlt.threshold_hours as missing_log_threshold, wop.* 
      FROM employees e
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LEFT JOIN missing_log_times mlt ON e.leave_plan_id = mlt.leave_plan_id
      LEFT JOIN weekly_off_policies wop ON e.weekly_off_policy_id = wop.id
      WHERE e.id = ?
    `, [targetEmpId]);
    const employee = empDetails[0];

    // Get all approved leaves for the period for summary calculation
    let allLeavesQuery = `
      SELECT l.*, lt.type_code, lt.is_paid 
      FROM leaves l 
      INNER JOIN leave_types lt ON l.leave_type_id = lt.id 
      WHERE l.employee_id = ? AND l.status = 'approved'
    `;
    const [allLeaves] = await c.query(allLeavesQuery, [targetEmpId]);

    // Map existing attendance for fast lookup
    const attMap = new Map();
    attendance.forEach(a => {
      const dStr = new Date(a.attendance_date).toDateString();
      attMap.set(dStr, a);
    });

    const now = new Date();
    const todayStr = now.toDateString();

    // Determine range
    let start, end;
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      const rMonth = parseInt(month) || (now.getMonth() + 1);
      const rYear = parseInt(year) || now.getFullYear();
      start = new Date(rYear, rMonth - 1, 1);
      end = new Date(rYear, rMonth, 0);
    }

    // Iterate through range for accurate summary
    let present_days = 0;
    let absent_days = 0;
    let leave_days = 0;
    let penalty_count = 0;
    let half_day_count = 0;
    let weekend_days = 0;

    const weekOffDays = [];
    if (employee) {
      if (employee.sunday_off) weekOffDays.push('sunday');
      if (employee.monday_off) weekOffDays.push('monday');
      if (employee.tuesday_off) weekOffDays.push('tuesday');
      if (employee.wednesday_off) weekOffDays.push('wednesday');
      if (employee.thursday_off) weekOffDays.push('thursday');
      if (employee.friday_off) weekOffDays.push('friday');
      if (employee.saturday_off) weekOffDays.push('saturday');
    }

    // Fetch all leave types dynamically from database
    const [empReportLeaveTypes] = await c.query("SELECT type_code, type_name FROM leave_types");
    const empLeaveTokens = new Set(['half', 'hd', 'leave', 'loss of pay', 'lop', 'ul', 'sick', 'casual', 'maternity', 'marriage', 'privilege', 'earned', 'sl', 'cl', 'ml', 'mrl', 'pl', 'el']);
    empReportLeaveTypes.forEach(lt => {
      if (lt.type_code) empLeaveTokens.add(String(lt.type_code).toLowerCase().trim());
      if (lt.type_name) empLeaveTokens.add(String(lt.type_name).toLowerCase().trim());
    });
    const empLeaveTokenArray = Array.from(empLeaveTokens);

    let curr = new Date(start);
    let lop_from_leaves = 0;
    let lop_from_attendance = 0;
    let penalty_absent_days = 0;
    let regular_absent_days = 0;

    while (curr <= end) {
      if (curr > now && curr.toDateString() !== todayStr) {
        curr.setDate(curr.getDate() + 1);
        continue;
      }

      const dStr = curr.toDateString();
      const isToday = dStr === todayStr;
      const weekday = curr.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      // Check if on leave
      const todaysLeaves = allLeaves.filter(l => {
        const lStart = new Date(l.start_date);
        const lEnd = new Date(l.end_date);
        const check = new Date(curr);
        check.setHours(0, 0, 0, 0);
        lStart.setHours(0, 0, 0, 0);
        lEnd.setHours(0, 0, 0, 0);
        return check >= lStart && check <= lEnd;
      });

      if (todaysLeaves.length > 0) {
        todaysLeaves.forEach(l => {
          const weight = l.is_half_day ? 0.5 : 1.0;
          leave_days += weight;
          if (l.type_code === 'LOP' || l.type_code === 'UL' || !l.is_paid) {
            lop_from_leaves += weight;
          }
        });
      } else if (weekOffDays.includes(weekday)) {
        weekend_days++;
      } else if (attMap.has(dStr)) {
        const record = attMap.get(dStr);
        const nLower = String(record.notes || '').toLowerCase();
        if (record.status === 'present') present_days++;
        else if (record.status === 'absent') {
          absent_days++;
          if (nLower.includes('lop') || nLower.includes('ul') || nLower.includes('loss of pay') || nLower.includes('unpaid')) {
            lop_from_attendance++;
          } else {
            regular_absent_days++;
          }
        } else if (record.status === 'half-day') {
          present_days += 0.5;
          half_day_count++;
          if (empLeaveTokenArray.some(token => nLower.includes(token))) {
            leave_days += 0.5;
            if (nLower.includes('lop') || nLower.includes('ul') || nLower.includes('loss of pay') || nLower.includes('unpaid')) {
              lop_from_attendance += 0.5;
            }
          }
        } else if (record.status === 'on-leave') {
          leave_days++;
          if (nLower.includes('lop') || nLower.includes('ul') || nLower.includes('loss of pay') || nLower.includes('unpaid')) {
            lop_from_attendance++;
          }
        } else if (record.status === 'penalty') {
          penalty_count++;
          penalty_absent_days++;
          absent_days++;
        }
      } else if (!isToday) {
        // No log and not today - apply penalty rule
        const shiftStartStr = employee?.start_time || '09:00:00';
        const [sh, sm] = shiftStartStr.split(':').map(Number);
        const shiftStart = new Date(curr);
        shiftStart.setHours(sh || 9, sm || 0, 0, 0);

        const penaltyThreshold = new Date(shiftStart);
        const thresholdHours = employee?.missing_log_threshold || 48;
        penaltyThreshold.setHours(penaltyThreshold.getHours() + thresholdHours);

        if (now > penaltyThreshold) {
          penalty_count++;
          penalty_absent_days++;
          absent_days++;
        }
      }

      curr.setDate(curr.getDate() + 1);
    }

    const totalLopDays = (penalty_absent_days * 0.5) + (regular_absent_days * 1.0) + lop_from_leaves + lop_from_attendance;

    const summary = {
      total_days: attendance.length,
      present_days,
      absent_days,
      half_days: half_day_count,
      leave_days,
      lop_days: totalLopDays,
      total_work_hours: attendance
        .reduce((sum, a) => sum + (parseFloat(a.gross_hours) || 0), 0)
        .toFixed(2),
      avg_work_hours:
        attendance.length > 0
          ? (
            attendance.reduce(
              (sum, a) => sum + (parseFloat(a.gross_hours) || 0),
              0
            ) / attendance.length
          ).toFixed(2)
          : 0,
    };

    c.end();

    res.json({
      employee: employee
        ? {
          id: employee.id,
          employee_number: employee.EmployeeNumber,
          name: `${employee.FirstName || ''} ${employee.LastName || ''}`.trim(),
          email: employee.WorkEmail,
        }
        : null,
      summary,
      attendance,
      shift_policy: employee ? {
        id: employee.shift_policy_id,
        start_time: employee.start_time,
        end_time: employee.end_time,
        name: employee.shift_name
      } : null,
      weekly_off_policy: employee ? {
        id: employee.weekly_off_policy_id,
        sunday_off: employee.sunday_off,
        monday_off: employee.monday_off,
        tuesday_off: employee.tuesday_off,
        wednesday_off: employee.wednesday_off,
        thursday_off: employee.thursday_off,
        friday_off: employee.friday_off,
        saturday_off: employee.saturday_off,
        name: employee.name,
        policy_code: employee.policy_code
      } : null
    });
  } catch (error) {
    console.error("Error fetching employee attendance report:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Attendance Details with Punches (Manager/Admin)
 */
router.get(
  "/report/details/:employeeId/:date",
  auth,
  manager,
  async (req, res) => {
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
          name: `${attendance[0].FirstName} ${attendance[0].LastName}`,
        },
        attendance: attendance[0],
        punches,
        punch_pairs: calculatePunchPairs(punches),
      });
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Get Team Attendance Report (Available for all authenticated users who manage team members)
 * Works for: admin, hr, manager, and employee roles (if they have reporting team)
 */
router.get("/report/team", auth, async (req, res) => {
  try {
    console.log(`=== GET /report/team called ===`);
    console.log(`User ID: ${req.user.id}, Role: ${req.user.role}`);

    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) {
      console.log(`Employee not found for user ID: ${req.user.id}`);
      return res.status(404).json({ error: "Employee not found" });
    }

    console.log(
      `Employee found: ${emp.FirstName} ${emp.LastName} (ID: ${emp.id})`
    );

    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split("T")[0];
    console.log(`Target date: ${targetDate}`);

    const c = await db();

    // Determine which team to show based on role
    // Current logged-in employee is always fetched separately and included first
    let team;

    if (req.user.role === "hr") {
      // HR sees ALL employees INCLUDING themselves
      const [allEmployees] = await c.query(
        `SELECT e.id, e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail, e.EmploymentStatus, e.LocationId, e.profile_image, loc.name AS LocationName,
                CASE WHEN e.id = ? THEN 1 ELSE 0 END AS is_current_user
         FROM employees e
         LEFT JOIN locations loc ON e.LocationId = loc.id
         WHERE e.EmploymentStatus = 'Working'
         ORDER BY is_current_user DESC, e.FirstName, e.LastName`,
        [emp.id]
      );
      team = allEmployees;
      console.log(`HR: All employees count (including self): ${team.length}`);
    } else if (["manager", "admin"].includes(req.user.role)) {
      // Manager/admin: show direct reports PLUS themselves
      const [reportingTeam] = await c.query(
        `SELECT e.id, e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail, e.EmploymentStatus, e.LocationId, e.profile_image, loc.name AS LocationName,
                CASE WHEN e.id = ? THEN 1 ELSE 0 END AS is_current_user
                 FROM employees e
                 LEFT JOIN locations loc ON e.LocationId = loc.id
                 WHERE (e.reporting_manager_id = ? OR e.id = ?) AND e.EmploymentStatus = 'Working'
                 ORDER BY is_current_user DESC, e.FirstName, e.LastName`,
        [emp.id, emp.id, emp.id]
      );
      team = reportingTeam;
      console.log(`Reporting team count (including self): ${team.length}`);
    } else {
      // For employee role, show co-team (people reporting to same manager) PLUS themselves
      if (emp.reporting_manager_id) {
        const [coTeam] = await c.query(
          `SELECT e.id, e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail, e.EmploymentStatus, e.LocationId, e.profile_image, loc.name AS LocationName,
                  CASE WHEN e.id = ? THEN 1 ELSE 0 END AS is_current_user
                     FROM employees e
                     LEFT JOIN locations loc ON e.LocationId = loc.id
                     WHERE e.reporting_manager_id = ? AND e.EmploymentStatus = 'Working'
                     ORDER BY is_current_user DESC, e.FirstName, e.LastName`,
          [emp.id, emp.reporting_manager_id]
        );
        team = coTeam;
        console.log(`Co-team count (including self): ${team.length}`);
      } else {
        // No manager — just show the employee themselves
        team = [{
          id: emp.id,
          EmployeeNumber: emp.EmployeeNumber,
          FirstName: emp.FirstName,
          LastName: emp.LastName,
          WorkEmail: emp.WorkEmail,
          EmploymentStatus: emp.EmploymentStatus,
          LocationId: emp.LocationId,
          LocationName: null,
          profile_image: emp.profile_image,
          is_current_user: 1
        }];
        console.log(`Employee has no reporting manager, showing only self`);
      }
    }

    if (team.length > 0) {
      console.log(
        `Sample team member EmploymentStatus: ${team[0].EmploymentStatus}`
      );
    }

    const teamIds = team.map((t) => t.id);

    if (teamIds.length === 0) {
      c.end();
      console.log(`No team members found for employee ID: ${emp.id}`);
      return res.json({
        team_members: [],
        attendance: [],
        date: targetDate,
        current_user_id: emp.id,
        summary: {
          total_team: 0,
          present: 0,
          absent: 0,
          on_leave: 0,
        },
      });
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

    // Get approved leaves for team members for today (covering full/partial day)
    const [onLeave] = await c.query(
      `SELECT 
          l.*, 
          e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail
        FROM leaves l
        INNER JOIN employees e ON l.employee_id = e.id
        WHERE l.employee_id IN (?)
          AND l.status = 'approved'
          AND ? BETWEEN l.start_date AND l.end_date`,
      [teamIds, targetDate]
    );

    // Merge attendance and leave info for summary
    // Employees with attendance record marked as 'on-leave' OR with approved leave for today
    const attendanceOnLeaveIds = attendance
      .filter((a) => a.status === "on-leave")
      .map((a) => a.employee_id);
    const leaveOnLeaveIds = onLeave.map((l) => l.employee_id);
    const uniqueOnLeaveIds = Array.from(
      new Set([...attendanceOnLeaveIds, ...leaveOnLeaveIds])
    );

    c.end();

    res.json({
      team_members: team,
      date: targetDate,
      current_user_id: emp.id, // Helps frontend highlight the logged-in user
      attendance,
      on_leave: onLeave, // List of leave records for today
      summary: {
        total_team: team.length,
        present: attendance.filter((a) => a.status === "present").length,
        absent: team.length - attendance.length - uniqueOnLeaveIds.length,
        on_leave: uniqueOnLeaveIds.length,
      },
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
        present: attendance.filter((a) => a.status === "present").length,
        absent: attendance.filter((a) => a.status === "absent").length,
        half_day: attendance.filter((a) => a.status === "half-day").length,
        on_leave: attendance.filter((a) => a.status === "on-leave").length,
      },
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
    `SELECT id, punch_type, punch_time, notes FROM attendance_punches
         WHERE attendance_id = ? 
         ORDER BY punch_time ASC, id ASC`,
    [attendanceId]
  );

  let totalWorkMinutes = 0;
  let totalBreakMinutes = 0;
  let lastPunchIn = null;
  let prevValidOut = null;
  let lastValidCheckOut = null;

  for (let i = 0; i < punches.length; i++) {
    const punch = punches[i];
    const punchTime = new Date(punch.punch_time);
    const isAutoOut = (punch.notes || '').includes('OUT Missing') || (punch.notes || '').includes('Auto Clock-Out');

    if (punch.punch_type === 'in') {
      if (lastPunchIn === null) {
        lastPunchIn = punchTime;
        if (prevValidOut !== null) {
          const breakMinutes = (punchTime - prevValidOut) / (1000 * 60);
          if (breakMinutes > 0) {
            totalBreakMinutes += breakMinutes;
          }
        }
      } else {
        const gap = (punchTime - lastPunchIn) / (1000 * 60);
        if (gap > 15) {
          lastPunchIn = punchTime;
        }
      }
    } else if (punch.punch_type === 'out') {
      if (lastPunchIn !== null) {
        if (!isAutoOut) {
          const workMinutes = (punchTime - lastPunchIn) / (1000 * 60);
          if (workMinutes > 0) {
            totalWorkMinutes += workMinutes;
            prevValidOut = punchTime;
            lastValidCheckOut = punch.punch_time;
          }
        }
        lastPunchIn = null;
      }
    }
  }

  const totalWorkHours = (totalWorkMinutes / 60).toFixed(2);
  const totalBreakHours = (totalBreakMinutes / 60).toFixed(2);
  const grossHours = (parseFloat(totalWorkHours) + parseFloat(totalBreakHours)).toFixed(2);

  // Update attendance record
  await connection.query(
    `UPDATE attendance 
         SET last_check_out = ?, 
             total_work_hours = ?, 
             total_break_hours = ?, 
             gross_hours = ?
         WHERE id = ?`,
    [
      lastValidCheckOut,
      totalWorkHours,
      totalBreakHours,
      grossHours,
      attendanceId,
    ]
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
    if (punch.punch_type === "in") {
      currentPair = {
        punch_in: punch.punch_time,
        punch_in_location: punch.location,
        punch_in_notes: punch.notes,
      };
    } else if (punch.punch_type === "out" && currentPair.punch_in) {
      const isMissingOut = (punch.notes || '').includes('OUT Missing') || (punch.notes || '').includes('Auto Clock-Out');
      currentPair.punch_out = isMissingOut ? null : punch.punch_time;
      currentPair.punch_out_raw = punch.punch_time;
      currentPair.punch_out_display = isMissingOut ? 'OUT Missing' : punch.punch_time;
      currentPair.punch_out_location = isMissingOut ? 'Missing Clock-Out' : punch.location;
      currentPair.punch_out_notes = punch.notes;
      currentPair.is_missing_out = isMissingOut;

      const punchIn = new Date(currentPair.punch_in);
      const punchOut = new Date(punch.punch_time);
      const hours = isMissingOut ? '0.00' : ((punchOut - punchIn) / (1000 * 60 * 60)).toFixed(2);

      currentPair.hours_worked = hours;
      currentPair.status = isMissingOut ? "OUT Missing" : "Completed";
      pairs.push({ ...currentPair });
      currentPair = {};
    }
  }

  // If there's an unpaired punch in
  if (currentPair.punch_in) {
    currentPair.punch_out = null;
    currentPair.punch_out_display = 'In Progress';
    currentPair.hours_worked = null;
    currentPair.status = "In Progress";
    pairs.push(currentPair);
  }

  return pairs;
}

/* ============================================
   SIMPLE CHECK-IN/CHECK-OUT ENDPOINTS
   Compatibility endpoints for frontend
   ============================================ */

// Simple Check-in (uses punch-in for multiple punch support)
router.post("/checkin", auth, async (req, res) => {
  console.log("Check-in request from user:", req.user.id, req.user.username);
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    console.log("Employee found:", emp ? emp.id : "NOT FOUND");
    if (!emp)
      return res.status(404).json({
        error:
          "Employee record not found. Please ensure your user account is linked to an employee profile.",
      });

    const { work_mode, location, notes } = req.body;
    const ip_address =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const device_info = req.headers["user-agent"];

    const c = await db();
    // Auto clock-out check: resolve any overdue active punch for this employee
    await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);

    await c.beginTransaction();

    const today = new Date().toISOString().split("T")[0];
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

      if (lastPunch[0].punch_type === "in") {
        await c.rollback();
        c.end();
        return res.status(400).json({
          error: "Already checked in. Please check out first.",
          message:
            "You have an active check-in. Check out before checking in again.",
        });
      }
    }

    // Validate work mode
    const validModes = ["Office", "WFH", "Remote", "Hybrid"];
    const selectedMode = work_mode || "Office";

    if (!validModes.includes(selectedMode)) {
      await c.rollback();
      c.end();
      return res.status(400).json({
        error: "Invalid work mode. Use: Office, WFH, Remote, or Hybrid",
      });
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
                 (employee_id, attendance_date, punch_date, first_check_in, work_mode, location, status, source)
                 VALUES (?, ?, ?, ?, ?, ?, 'present', 'web')`,
        [emp.id, today, today, now, selectedMode, location || selectedMode]
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
          [now, selectedMode, location || selectedMode, attendanceId]
        );
      }
    }

    // Insert punch record
    await c.query(
      `INSERT INTO attendance_punches 
             (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, location, notes)
             VALUES (?, ?, 'in', ?, ?, ?, ?, ?, ?)`,
      [
        attendanceId,
        emp.id,
        now,
        today,
        ip_address,
        device_info,
        location || selectedMode,
        notes,
      ]
    );

    await c.commit();
    c.end();

    res.json({
      success: true,
      message: `Checked in successfully as ${selectedMode}`,
      work_mode: selectedMode,
      check_in_time: now,
      location: location || selectedMode,
      attendance_id: attendanceId,
    });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Simple Check-out (uses punch-out for multiple punch support)
router.post("/checkout", auth, async (req, res) => {
  console.log("Check-out request from user:", req.user.id, req.user.username);
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    console.log("Employee found:", emp ? emp.id : "NOT FOUND");
    if (!emp)
      return res.status(404).json({
        error:
          "Employee record not found. Please ensure your user account is linked to an employee profile.",
      });

    const { notes } = req.body;
    const ip_address =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const device_info = req.headers["user-agent"];

    const c = await db();
    // Auto clock-out check: resolve any overdue active punch for this employee
    await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);

    await c.beginTransaction();

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    // Check if there's an active attendance record
    const [attendance] = await c.query(
      `SELECT id, work_mode FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
      [emp.id, today]
    );

    if (attendance.length === 0) {
      await c.rollback();
      c.end();
      return res.status(400).json({
        error: "No attendance record found. Please check in first.",
      });
    }

    const attendanceId = attendance[0].id;
    const workMode = attendance[0].work_mode;

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
        error: "No check-in found. Please check in first.",
      });
    }

    if (lastPunch[0].punch_type === "out") {
      await c.rollback();
      c.end();
      return res.status(400).json({
        error: "Already checked out. Check in first to check out again.",
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

    // Get total hours for response
    const [updatedAttendance] = await c.query(
      `SELECT gross_hours FROM attendance WHERE id = ?`,
      [attendanceId]
    );

    await c.commit();
    c.end();

    res.json({
      success: true,
      message: "Checked out successfully",
      check_out_time: now,
      total_hours: updatedAttendance[0]?.gross_hours || 0,
      work_mode: workMode,
      attendance_id: attendanceId,
    });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ error: error.message });
  }
});

// My attendance
router.get("/me", auth, async (req, res) => {
  console.log("Get my attendance - user:", req.user.id, req.user.username);
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    console.log("Employee found:", emp ? emp.id : "NOT FOUND");
    if (!emp)
      return res.status(404).json({
        error:
          "Employee record not found. Please ensure your user account is linked to an employee profile.",
      });

    const { startDate, endDate } = req.query;
    const c = await db();

    // Get attendance records
    const [attendance] = await c.query(
      `SELECT a.* FROM attendance a
             WHERE a.employee_id = ? AND a.attendance_date BETWEEN ? AND ? 
             ORDER BY a.attendance_date DESC`,
      [emp.id, startDate || "2020-01-01", endDate || "2099-12-31"]
    );

    // For each attendance, get first and last punch for check_in/check_out compatibility
    for (let att of attendance) {
      const [punches] = await c.query(
        `SELECT punch_type, punch_time FROM attendance_punches
                 WHERE attendance_id = ?
                 ORDER BY punch_time ASC`,
        [att.id]
      );

      if (punches.length > 0) {
        // First punch in as check_in
        const firstPunchIn = punches.find((p) => p.punch_type === "in");
        if (firstPunchIn) {
          att.check_in = firstPunchIn.punch_time;
        }

        // Last punch (any type) determines current state
        const lastPunch = punches[punches.length - 1];
        att.last_punch_type = lastPunch.punch_type;

        // Last punch out as check_out (only if last punch was out)
        if (lastPunch.punch_type === "out") {
          att.check_out = lastPunch.punch_time;
        } else {
          att.check_out = null; // Still checked in
        }
      }

      // Use gross_hours as total_hours for compatibility
      att.total_hours = att.gross_hours || att.total_work_hours;
    }

    c.end();
    res.json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ============================================
   BACKDATED ATTENDANCE REGULARIZATION (HR/MANAGER)
   ============================================ */

function toIsoDate(value) {
  if (!value) return null;
  const asString = String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asString)) return null;
  return asString;
}

function parseAttendanceDateTime(attendanceDate, value) {
  if (value == null || value === "") return null;
  const raw = String(value).trim();

  if (/^\d{2}:\d{2}(:\d{2})?$/.test(raw)) {
    const seconds = raw.length === 5 ? `${raw}:00` : raw;
    return `${attendanceDate} ${seconds}`;
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

async function getPayrollPeriodLockStatus(connection, attendanceDate) {
  const payrollPeriod = attendanceDate.slice(0, 7);
  const [rows] = await connection.query(
    `SELECT lock_status
     FROM payroll_period_locks
     WHERE payroll_period = ?
     LIMIT 1`,
    [payrollPeriod]
  );

  const status = rows.length ? String(rows[0].lock_status || "open").toLowerCase() : "open";
  return {
    payroll_period: payrollPeriod,
    lock_status: status,
    is_locked: ["locked", "processed"].includes(status),
  };
}

async function assertManagerOrHrScope(req, connection, employeeId) {
  const role = String(req.user.role || "").toLowerCase();
  if (role === "admin" || role === "hr") return;

  if (role !== "manager") {
    throw new Error("Manager/HR/Admin only");
  }

  const managerEmployee = await findEmployeeByUserId(req.user.id);
  if (!managerEmployee) {
    throw new Error("Manager employee profile not found");
  }

  if (Number(managerEmployee.id) === Number(employeeId)) return;

  const [rows] = await connection.query(
    `SELECT id FROM employees WHERE id = ? AND reporting_manager_id = ? LIMIT 1`,
    [employeeId, managerEmployee.id]
  );

  if (!rows.length) {
    throw new Error("You can regularize attendance only for your direct reports");
  }
}

// GET /api/attendance/regularization/lock-status?date=YYYY-MM-DD
router.get("/regularization/lock-status", auth, manager, async (req, res) => {
  let c = null;
  try {
    const attendanceDate = toIsoDate(req.query.date);
    if (!attendanceDate) {
      return res.status(400).json({ error: "date query required in YYYY-MM-DD format" });
    }

    c = await db();
    const lock = await getPayrollPeriodLockStatus(c, attendanceDate);
    return res.json({ success: true, date: attendanceDate, lock });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    if (c) c.end();
  }
});

// POST /api/attendance/regularization/backdate
router.post("/regularization/backdate", auth, manager, async (req, res) => {
  let c = null;
  try {
    const employeeId = Number(req.body.employee_id);
    const attendanceDate = toIsoDate(req.body.attendance_date);
    const status = String(req.body.status || "present").toLowerCase();
    const workMode = req.body.work_mode || "Office";
    const location = req.body.location || null;
    const reason = req.body.reason || null;

    if (!employeeId || !attendanceDate) {
      return res.status(400).json({ error: "employee_id and attendance_date are required" });
    }

    const today = new Date().toISOString().split("T")[0];
    if (attendanceDate >= today) {
      return res.status(400).json({ error: "Only previous days attendance can be regularized" });
    }

    const allowedStatus = ["present", "absent", "half-day", "late", "on-leave"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const firstCheckIn = parseAttendanceDateTime(attendanceDate, req.body.first_check_in);
    const lastCheckOut = parseAttendanceDateTime(attendanceDate, req.body.last_check_out);

    if (req.body.first_check_in && !firstCheckIn) {
      return res.status(400).json({ error: "Invalid first_check_in format" });
    }
    if (req.body.last_check_out && !lastCheckOut) {
      return res.status(400).json({ error: "Invalid last_check_out format" });
    }
    if (firstCheckIn && lastCheckOut && new Date(lastCheckOut) <= new Date(firstCheckIn)) {
      return res.status(400).json({ error: "last_check_out must be after first_check_in" });
    }

    c = await db();

    await assertManagerOrHrScope(req, c, employeeId);

    const lock = await getPayrollPeriodLockStatus(c, attendanceDate);
    if (lock.is_locked) {
      return res.status(400).json({
        error: `Payroll period ${lock.payroll_period} is ${lock.lock_status}; regularization not allowed`
      });
    }

    const role = String(req.user.role || "").toUpperCase();
    const regularizedNote = reason
      ? `[REGULARIZED ${role} user:${req.user.id}] ${reason}`
      : `[REGULARIZED ${role} user:${req.user.id}]`;

    await c.beginTransaction();

    const [existing] = await c.query(
      `SELECT id, notes
       FROM attendance
       WHERE employee_id = ? AND attendance_date = ?
       LIMIT 1`,
      [employeeId, attendanceDate]
    );

    let attendanceId;
    if (!existing.length) {
      const [ins] = await c.query(
        `INSERT INTO attendance
          (employee_id, attendance_date, punch_date, first_check_in, last_check_out, work_mode, location, status, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [employeeId, attendanceDate, attendanceDate, firstCheckIn, lastCheckOut, workMode, location, status, regularizedNote]
      );
      attendanceId = ins.insertId;
    } else {
      attendanceId = existing[0].id;
      const mergedNotes = existing[0].notes
        ? `${existing[0].notes}\n${regularizedNote}`
        : regularizedNote;

      await c.query(
        `UPDATE attendance
         SET punch_date = ?, first_check_in = ?, last_check_out = ?, work_mode = ?, location = ?, status = ?, notes = ?
         WHERE id = ?`,
        [attendanceDate, firstCheckIn, lastCheckOut, workMode, location, status, mergedNotes, attendanceId]
      );
    }

    await c.query(`DELETE FROM attendance_punches WHERE attendance_id = ?`, [attendanceId]);

    if (firstCheckIn) {
      await c.query(
        `INSERT INTO attendance_punches
          (attendance_id, employee_id, punch_type, punch_time, punch_date, notes)
         VALUES (?, ?, 'in', ?, ?, ?)`,
        [attendanceId, employeeId, firstCheckIn, attendanceDate, regularizedNote]
      );
    }

    if (lastCheckOut) {
      await c.query(
        `INSERT INTO attendance_punches
          (attendance_id, employee_id, punch_type, punch_time, punch_date, notes)
         VALUES (?, ?, 'out', ?, ?, ?)`,
        [attendanceId, employeeId, lastCheckOut, attendanceDate, regularizedNote]
      );
    }

    if (firstCheckIn && lastCheckOut) {
      await calculateAndUpdateHours(c, attendanceId);
    } else {
      await c.query(
        `UPDATE attendance
         SET total_work_hours = 0, total_break_hours = 0, gross_hours = 0
         WHERE id = ?`,
        [attendanceId]
      );
    }

    await c.commit();

    return res.json({
      success: true,
      message: "Attendance regularized successfully",
      data: {
        attendance_id: attendanceId,
        employee_id: employeeId,
        attendance_date: attendanceDate,
        status,
        lock
      }
    });
  } catch (error) {
    if (c) {
      try {
        await c.rollback();
      } catch (_) { }
    }

    const statusCode =
      error.message === "Manager/HR/Admin only" ||
        error.message === "Manager employee profile not found" ||
        error.message.includes("direct reports")
        ? 403
        : 500;

    return res.status(statusCode).json({ error: error.message });
  } finally {
    if (c) c.end();
  }
});

// GET /api/attendance/regularization/history/:employeeId?month=YYYY-MM
router.get("/regularization/history/:employeeId", auth, manager, async (req, res) => {
  let c = null;
  try {
    const employeeId = Number(req.params.employeeId);
    const month = String(req.query.month || "").trim();

    if (!employeeId || !/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ error: "employeeId and month (YYYY-MM) are required" });
    }

    c = await db();
    await assertManagerOrHrScope(req, c, employeeId);

    const [rows] = await c.query(
      `SELECT id, employee_id, attendance_date, first_check_in, last_check_out, total_work_hours, gross_hours, work_mode, location, status, notes, updated_at
       FROM attendance
       WHERE employee_id = ?
         AND DATE_FORMAT(attendance_date, '%Y-%m') = ?
       ORDER BY attendance_date DESC`,
      [employeeId, month]
    );

    return res.json({
      success: true,
      data: {
        employee_id: employeeId,
        month,
        count: rows.length,
        records: rows,
      }
    });
  } catch (error) {
    const statusCode =
      error.message === "Manager/HR/Admin only" ||
        error.message === "Manager employee profile not found" ||
        error.message.includes("direct reports")
        ? 403
        : 500;
    return res.status(statusCode).json({ error: error.message });
  } finally {
    if (c) c.end();
  }
});

// GET /api/attendance/shift-timing - Get employee's shift details and auto clock-out cutoff
router.get("/shift-timing", auth, async (req, res) => {
  let c = null;
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    c = await db();
    const timing = await autoClockOutService.getShiftTimingForEmployee(c, emp.id, req.query.date);
    return res.json(timing);
  } catch (error) {
    console.error("Error fetching shift timing:", error);
    return res.status(500).json({ error: error.message });
  } finally {
    if (c) c.end();
  }
});

// POST /api/attendance/auto-clockout/run - Manually trigger auto clock-out sweep (Admin/HR)
router.post("/auto-clockout/run", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  try {
    await autoClockOutService.processAllPendingAutoClockOuts();
    return res.json({ success: true, message: "Auto clock-out sweep completed successfully" });
  } catch (error) {
    console.error("Error running auto clock-out sweep:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
