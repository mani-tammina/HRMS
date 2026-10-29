/**
 * ENHANCED ATTENDANCE ROUTES
 * Supports multiple punch in/out throughout the day with gross hours calculation
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr, manager, roleAuth } = require("../middleware/auth");
const { findEmployeeByUserId, toMySQLDate, toMySQLDateTime } = require("../utils/helpers");
const autoClockOutService = require("../services/auto-clockout.service");
const {
  getEmployeeEffectiveShift,
  getShiftDateForPunch,
  addDaysToDate,
  isOvernightShift,
  getOvernightCutoffHour
} = require("../utils/shift-helper");

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

    const now = toMySQLDateTime(new Date());

    c = await db();
    const effectiveShift = await getEmployeeEffectiveShift(c, emp.id);
    let shiftDate = getShiftDateForPunch(effectiveShift, new Date());

    // If employee is punched in on an active session from yesterday, stick to that shiftDate so they can punch out
    try {
      const [openPunch] = await c.query(
        `SELECT ap.attendance_id, a.attendance_date, ap.punch_type
         FROM attendance_punches ap
         JOIN attendance a ON ap.attendance_id = a.id
         WHERE ap.employee_id = ?
         ORDER BY ap.punch_time DESC, ap.id DESC
         LIMIT 1`,
        [emp.id]
      );
      if (openPunch.length > 0 && openPunch[0].punch_type === 'in' && openPunch[0].attendance_date) {
        const openDate = toMySQLDate(openPunch[0].attendance_date);
        // Only bind to previous date if employee is on an actual overnight shift
        if (effectiveShift?.is_overnight) {
          const cutoffH = effectiveShift?.cutoff_hour || 12;
          const curH = new Date().getHours() + new Date().getMinutes() / 60;
          if (openDate < shiftDate && curH < cutoffH) {
            shiftDate = openDate;
          }
        }
      }
    } catch (_) { }
    lockName = await acquireAttendanceLock(c, emp.id, shiftDate);

    // Auto clock-out check: resolve any overdue active punch for this employee
    await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);

    // Validate Time Tracking Policy before proceeding
    await validateTimeTrackingPolicy(c, emp.id, work_mode || "Office", ip_address, notes);

    await c.beginTransaction();
    transactionStarted = true;

    // The named lock serializes all punch requests for this employee.
    const [lastPunch] = await c.query(
      `SELECT id, attendance_id, punch_type, punch_time, punch_date
             FROM attendance_punches
             WHERE employee_id = ?
             ORDER BY punch_time DESC, id DESC
             LIMIT 1 FOR UPDATE`,
      [emp.id]
    );

    let isEffectivelyIn = lastPunch.length > 0 && lastPunch[0].punch_type === "in";

    // 1. Biometric check: Check if employee has a newer punch in biometric_punches
    if (isEffectivelyIn) {
      try {
        const [latestBio] = await c.query(
          `SELECT punch_time, direction FROM biometric_punches
           WHERE employee_id = ?
           ORDER BY punch_time DESC, id DESC
           LIMIT 1`,
          [emp.id]
        );
        if (latestBio.length > 0) {
          const lastWebTime = new Date(lastPunch[0].punch_time).getTime();
          const lastBioTime = new Date(latestBio[0].punch_time).getTime();
          if (lastBioTime >= lastWebTime && latestBio[0].direction === "out") {
            isEffectivelyIn = false;
          }
        }
      } catch (bioErr) {
        console.warn("[PunchIn] Biometric check warning:", bioErr.message);
      }
    }

    // 2. Cross-day check: Check if the active punch belongs to a previous shift date
    if (isEffectivelyIn && lastPunch[0].attendance_id) {
      const [attRows] = await c.query(
        `SELECT a.id, a.attendance_date, a.work_mode FROM attendance a WHERE a.id = ?`,
        [lastPunch[0].attendance_id]
      );
      const prevAttDate = attRows.length > 0 && attRows[0].attendance_date
        ? toMySQLDate(attRows[0].attendance_date)
        : null;

      if (prevAttDate && prevAttDate < shiftDate) {
        // Auto-close past day's open session so employee can clock into their new day
        try {
          await autoClockOutService.processAutoClockOutForEmployee(c, emp.id, prevAttDate, true);
        } catch (pastErr) {
          console.warn("[PunchIn] Auto-close past attendance warning:", pastErr.message);
        }
        // Refresh last punch
        const [refreshedLastPunch] = await c.query(
          `SELECT id, attendance_id, punch_type, punch_time, punch_date
           FROM attendance_punches
           WHERE employee_id = ?
           ORDER BY punch_time DESC, id DESC
           LIMIT 1 FOR UPDATE`,
          [emp.id]
        );
        isEffectivelyIn = refreshedLastPunch.length > 0 && refreshedLastPunch[0].punch_type === "in";
        if (!isEffectivelyIn && refreshedLastPunch.length > 0) {
          lastPunch[0] = refreshedLastPunch[0];
        }
      }
    }

    // 3. If STILL effectively clocked in today
    if (isEffectivelyIn) {
      const punchTime = lastPunch[0].punch_time ? new Date(lastPunch[0].punch_time).getTime() : 0;
      const secondsAgo = (Date.now() - punchTime) / 1000;

      // Accidental rapid double-click (within 60 seconds)
      if (secondsAgo >= 0 && secondsAgo <= 60) {
        return res.json({
          success: true,
          message: "Clocked in successfully",
          punch_time: lastPunch[0].punch_time,
          work_mode: work_mode || "Office",
          alreadyProcessed: true
        });
      }

      // Check current mode vs requested mode
      let currentMode = "Office";
      if (lastPunch[0].attendance_id) {
        const [currAtt] = await c.query(
          `SELECT a.id, a.work_mode FROM attendance a WHERE a.id = ?`,
          [lastPunch[0].attendance_id]
        );
        if (currAtt.length > 0 && currAtt[0].work_mode) {
          currentMode = currAtt[0].work_mode;
        }
      }
      const requestedMode = work_mode || "Office";

      if (currentMode !== requestedMode) {
        // Mode switch (e.g. Office -> Remote, or Remote -> Office, or WFH):
        // Automatically close the previous mode session and proceed with the new mode punch in
        await c.query(
          `INSERT INTO attendance_punches 
           (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, location, notes)
           VALUES (?, ?, 'out', ?, ?, ?, ?, ?, ?)`,
          [
            lastPunch[0].attendance_id,
            emp.id,
            now,
            shiftDate,
            ip_address,
            device_info,
            location || 'System',
            `Switching work mode from ${currentMode} to ${requestedMode}`
          ]
        );
        await c.query(`UPDATE attendance SET work_mode = ? WHERE id = ?`, [requestedMode, lastPunch[0].attendance_id]);
        // Closed previous mode; allow new punch in below to proceed!
      } else {
        // Same mode already active today: smoothly return success instead of error!
        return res.json({
          success: true,
          message: `You are already clocked in (${requestedMode})`,
          punch_time: lastPunch[0].punch_time,
          work_mode: requestedMode,
          alreadyActive: true
        });
      }
    }

    // Get or create attendance record for shiftDate
    let [attendance] = await c.query(
      `SELECT id FROM attendance
             WHERE employee_id = ? AND attendance_date = ?
             FOR UPDATE`,
      [emp.id, shiftDate]
    );

    let attendanceId;

    if (attendance.length === 0) {
      let approvalStatus = 'approved';
      if (['Remote', 'WFH'].includes(work_mode)) {
        const [leaveRows] = await c.query(
          `SELECT status FROM leaves 
           WHERE employee_id = ? 
             AND leave_type = ? 
             AND DATE(start_date) <= ? 
             AND DATE(end_date) >= ? 
           ORDER BY id DESC LIMIT 1`,
          [emp.id, work_mode, shiftDate, shiftDate]
        );
        if (leaveRows.length > 0) {
          approvalStatus = leaveRows[0].status === 'approved' ? 'approved' : 'pending';
        } else {
          // If no leave request found, check policy or set pending
          const [empRows] = await c.query(
            "SELECT attendance_capture_scheme_id FROM employees WHERE id = ?",
            [emp.id]
          );
          if (empRows.length > 0 && empRows[0].attendance_capture_scheme_id) {
            const [policyRows] = await c.query(
              "SELECT remote_punch_settings, wfh_settings FROM attendance_capture_schemes WHERE id = ?",
              [empRows[0].attendance_capture_scheme_id]
            );
            if (policyRows.length > 0) {
              let remote = {};
              try { remote = JSON.parse(policyRows[0].remote_punch_settings); } catch (e) { }
              if (work_mode === 'Remote' && remote.remote_clockin_approval_required === 'yes') {
                approvalStatus = 'pending';
              }
            }
          }
        }
      }

      // Create new attendance record
      const [result] = await c.query(
        `INSERT INTO attendance 
                 (employee_id, attendance_date, punch_date, first_check_in, work_mode, location, status, approval_status)
                 VALUES (?, ?, ?, ?, ?, ?, 'present', ?)`,
        [emp.id, shiftDate, shiftDate, now, work_mode || "Office", location || "Office", approvalStatus]
      );
      attendanceId = result.insertId;

      if (approvalStatus === 'pending') {
        // Trigger inbox notification for approver
        const [rmRows] = await c.query("SELECT reporting_manager_id FROM employees WHERE id = ?", [emp.id]);
        if (rmRows.length > 0 && rmRows[0].reporting_manager_id) {
          const approverId = rmRows[0].reporting_manager_id;
          const [approverUser] = await c.query("SELECT user_id FROM employees WHERE id = ?", [approverId]);
          if (approverUser.length > 0 && approverUser[0].user_id) {
            await c.query(
              `INSERT INTO inbox_notifications (user_id, sender_id, type, title, message, action_url)
               VALUES (?, ?, 'approval', '${work_mode} Punch Approval Request', 'An employee punched in under ${work_mode} pending approval.', '/inbox/approvals')`,
              [approverUser[0].user_id, req.user.id]
            );
          }
        }
      }
    } else {
      attendanceId = attendance[0].id;

      let updateApproval = null;
      if (['Remote', 'WFH'].includes(work_mode)) {
        const [leaveRows] = await c.query(
          `SELECT status FROM leaves 
           WHERE employee_id = ? 
             AND leave_type = ? 
             AND DATE(start_date) <= ? 
             AND DATE(end_date) >= ? 
           ORDER BY id DESC LIMIT 1`,
          [emp.id, work_mode, shiftDate, shiftDate]
        );
        if (leaveRows.length > 0) {
          updateApproval = leaveRows[0].status === 'approved' ? 'approved' : 'pending';
        }
      }

      // Update first_check_in if this is the actual first punch
      const [punchCount] = await c.query(
        `SELECT COUNT(*) as count FROM attendance_punches WHERE attendance_id = ?`,
        [attendanceId]
      );

      if (punchCount[0].count === 0) {
        await c.query(
          `UPDATE attendance SET first_check_in = ?, work_mode = ?, location = ?, approval_status = COALESCE(?, approval_status) WHERE id = ?`,
          [now, work_mode || "Office", location || "Office", updateApproval, attendanceId]
        );
      } else {
        await c.query(
          `UPDATE attendance SET work_mode = ?, location = ?, approval_status = COALESCE(?, approval_status) WHERE id = ?`,
          [work_mode || "Office", location || "Office", updateApproval, attendanceId]
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
        shiftDate,
        ip_address,
        device_info,
        location || 'Office',
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

    const { notes, location } = req.body;
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

    const now = toMySQLDateTime(new Date());

    c = await db();
    const effectiveShift = await getEmployeeEffectiveShift(c, emp.id);
    let shiftDate = getShiftDateForPunch(effectiveShift, new Date());

    // Auto clock-out check: resolve any overdue active punch for this employee
    await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);

    // 1. First check if employee has an active open punch-in across recent sessions
    const [latestWebPunch] = await c.query(
      `SELECT ap.id, ap.attendance_id, ap.punch_type, ap.punch_time, ap.punch_date, a.attendance_date, a.work_mode, a.location
       FROM attendance_punches ap
       JOIN attendance a ON ap.attendance_id = a.id
       WHERE ap.employee_id = ?
       ORDER BY ap.punch_time DESC, ap.id DESC
       LIMIT 1`,
      [emp.id]
    );

    let attendanceId = null;
    let workMode = "Office";
    let attendanceLocation = "Office";

    if (latestWebPunch.length > 0 && latestWebPunch[0].punch_type === 'in') {
      attendanceId = latestWebPunch[0].attendance_id;
      shiftDate = latestWebPunch[0].attendance_date ? toMySQLDate(latestWebPunch[0].attendance_date) : shiftDate;
      workMode = latestWebPunch[0].work_mode || "Office";
      attendanceLocation = latestWebPunch[0].location || "Office";
    }

    lockName = await acquireAttendanceLock(c, emp.id, shiftDate);

    await c.beginTransaction();
    transactionStarted = true;

    if (!attendanceId) {
      const [attendance] = await c.query(
        `SELECT id, work_mode, location FROM attendance
               WHERE employee_id = ? AND attendance_date = ?
               FOR UPDATE`,
        [emp.id, shiftDate]
      );

      if (attendance.length === 0) {
        // Check if employee has biometric punches for shiftDate to bridge
        const [bioPunches] = await c.query(
          `SELECT punch_time FROM biometric_punches 
           WHERE employee_id = ? AND punch_date = ? 
           ORDER BY punch_time ASC`,
          [emp.id, shiftDate]
        );
        if (bioPunches.length === 0) {
          return res.status(400).json({
            error: "No attendance record found. Please punch in first.",
          });
        }
        const firstBioIn = bioPunches[0].punch_time;
        const [result] = await c.query(
          `INSERT INTO attendance 
                   (employee_id, attendance_date, punch_date, first_check_in, work_mode, location, status, approval_status)
                   VALUES (?, ?, ?, ?, 'Office', 'Office', 'present', 'approved')`,
          [emp.id, shiftDate, shiftDate, firstBioIn]
        );
        attendanceId = result.insertId;
        attendanceLocation = "Office";
      } else {
        attendanceId = attendance[0].id;
        workMode = attendance[0].work_mode;
        attendanceLocation = attendance[0].location || "Office";
      }
    }

    // Validate Time Tracking Policy before proceeding
    // We use the workMode from the attendance record since punch-out doesn't send it.
    await validateTimeTrackingPolicy(c, emp.id, workMode || "Office", ip_address, notes);

    // Check last punch from attendance_punches or biometric_punches
    const [lastWebPunch] = await c.query(
      `SELECT punch_type, punch_time FROM attendance_punches 
             WHERE attendance_id = ? AND (notes IS NULL OR notes != 'Biometric Check-In')
             ORDER BY punch_time DESC, id DESC
             LIMIT 1 FOR UPDATE`,
      [attendanceId]
    );

    let lastPunch = lastWebPunch;
    if (lastPunch.length === 0) {
      const [bioPunches] = await c.query(
        `SELECT punch_time, direction FROM biometric_punches 
         WHERE employee_id = ? AND punch_date = ? 
         ORDER BY punch_time DESC, id DESC
         LIMIT 1`,
        [emp.id, shiftDate]
      );
      if (bioPunches.length > 0) {
        lastPunch = [{
          punch_type: bioPunches[0].direction === 'out' ? 'out' : 'in',
          punch_time: bioPunches[0].punch_time
        }];
      } else {
        return res.status(400).json({
          error: "No punch-in found. Please punch in first.",
        });
      }
    }

    if (lastPunch[0].punch_type === "out") {
      const punchTime = lastPunch[0].punch_time ? new Date(lastPunch[0].punch_time).getTime() : 0;
      const secondsAgo = (Date.now() - punchTime) / 1000;
      if (secondsAgo >= 0 && secondsAgo <= 60) {
        return res.json({
          success: true,
          message: "Punched out successfully",
          punch_time: lastPunch[0].punch_time,
          attendance_id: attendanceId,
          alreadyProcessed: true
        });
      }
      return res.json({
        success: true,
        message: "You are already clocked out",
        punch_time: lastPunch[0].punch_time,
        attendance_id: attendanceId,
        alreadyActive: true
      });
    }

    const punchOutLocation = location ||
      (notes && notes.toLowerCase().includes('remote') ? 'Remote' : null) ||
      attendanceLocation ||
      'Office';

    // Remove any previous auto-clockout ('OUT Missing') on this attendance so real punch-out takes precedence
    await c.query(
      `DELETE FROM attendance_punches WHERE attendance_id = ? AND punch_type = 'out' AND notes = 'OUT Missing'`,
      [attendanceId]
    );

    // Insert punch out record
    await c.query(
      `INSERT INTO attendance_punches 
             (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, location, notes)
             VALUES (?, ?, 'out', ?, ?, ?, ?, ?, ?)`,
      [attendanceId, emp.id, now, shiftDate, ip_address, device_info, punchOutLocation, notes]
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

    const c = await db();
    const effectiveShift = await getEmployeeEffectiveShift(c, emp.id);
    let shiftDate = getShiftDateForPunch(effectiveShift, new Date());

    // If employee is punched in on an active session from yesterday, stick to that shiftDate so they can punch out
    try {
      const [openPunch] = await c.query(
        "SELECT ap.attendance_id, a.attendance_date, ap.punch_type FROM attendance_punches ap JOIN attendance a ON ap.attendance_id = a.id WHERE ap.employee_id = ? ORDER BY ap.punch_time DESC, ap.id DESC LIMIT 1",
        [emp.id]
      );
      if (openPunch.length > 0 && openPunch[0].punch_type === 'in' && openPunch[0].attendance_date) {
        const openDate = toMySQLDate(openPunch[0].attendance_date);
        // Only bind to previous date if employee is on an actual overnight shift
        if (effectiveShift?.is_overnight) {
          const cutoffH = effectiveShift?.cutoff_hour || 12;
          const curH = new Date().getHours() + new Date().getMinutes() / 60;
          if (openDate < shiftDate && curH < cutoffH) {
            shiftDate = openDate;
          }
        }
      }
    } catch (_) { }

    // Auto clock-out check: resolve any overdue active punch for this employee
    try {
      await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);
    } catch (autoErr) {
      console.warn("[AutoClockOut] Check in /today error:", autoErr.message);
    }

    // Fetch shift timing & auto clock-out cutoff info
    let shiftTiming = null;
    try {
      shiftTiming = await autoClockOutService.getShiftTimingForEmployee(c, emp.id, shiftDate);
    } catch (shiftErr) {
      console.warn("[AutoClockOut] Shift timing fetch error:", shiftErr.message);
    }

    // Get attendance record
    const [attendance] = await c.query(
      `SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
      [emp.id, shiftDate]
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

    const today = shiftDate;

    // Fetch both web punches and biometric punches for today
    let punches = [];
    if (attendance.length > 0) {
      const [webPunches] = await c.query(
        `SELECT ap.id, ap.attendance_id, ap.employee_id, ap.punch_type,
                DATE_FORMAT(ap.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time,
                DATE_FORMAT(ap.punch_time, '%Y-%m-%d') as punch_date,
                ap.ip_address, ap.device_info, ap.location, ap.notes,
                a.work_mode, 'web' as source 
         FROM attendance_punches ap
         JOIN attendance a ON ap.attendance_id = a.id
         WHERE ap.attendance_id = ? AND (ap.notes IS NULL OR ap.notes != 'Biometric Check-In')
         ORDER BY ap.punch_time ASC`,
        [attendance[0].id]
      );
      punches = webPunches || [];
    } else {
      punches = [];
    }

    // Biometric punches for today
    try {
      const [bioPunches] = await c.query(
        `SELECT bp.id, 0 as attendance_id, bp.employee_id, bp.direction,
                DATE_FORMAT(bp.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
                DATE_FORMAT(bp.punch_date, '%Y-%m-%d') as punch_date,
                null as ip_address, bp.device_id as device_info,
                CASE 
                  WHEN bp.device_id = '3' THEN '4th Floor SVS Towers'
                  WHEN bp.device_id = '2' THEN 'Main Door - 1st floor'
                  WHEN bp.device_id = '1' THEN '3rd Floor SVS Towers'
                  ELSE CONCAT(COALESCE(bp.device_id, 'Reader'), ' SVS Towers')
                END as location,
                'Biometric Punch' as notes,
                'biometric' as source,
                'Biometric' as work_mode,
                bp.created_at
         FROM biometric_punches bp
         WHERE bp.employee_id = ? AND bp.punch_date = ?
         ORDER BY bp.punch_time ASC`,
        [emp.id, shiftDate]
      );
      if (bioPunches && bioPunches.length > 0) {
        let bioOpen = false;
        const mappedBio = bioPunches.map(p => {
          let pt = p.direction === 'out' ? 'out' : (p.direction === 'in' ? 'in' : (bioOpen ? 'out' : 'in'));
          if (pt === 'in') bioOpen = true;
          else if (pt === 'out') bioOpen = false;
          return {
            ...p,
            punch_type: pt
          };
        });
        const bioTimes = new Set(mappedBio.map(b => b.punch_time));
        punches = punches.filter(p => !bioTimes.has(p.punch_time));
        punches.push(...mappedBio);
      }
    } catch (_) { }

    punches.sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());

    const todayMetrics = calculateAttendanceMetrics(punches, true);

    const webPunchesList = punches.filter(p => p.source !== 'biometric' && p.work_mode !== 'Biometric');
    const lastWebPunch = webPunchesList.length > 0 ? webPunchesList[webPunchesList.length - 1] : null;
    const isWebClockedIn = lastWebPunch ? lastWebPunch.punch_type === 'in' : false;
    const lastWebPunchType = lastWebPunch ? lastWebPunch.punch_type : null;
    const lastOverallPunchType = punches.length > 0 ? punches[punches.length - 1].punch_type : null;
    const lastPunchObj = punches.length > 0 ? punches[punches.length - 1] : null;
    const isAutoOut = lastPunchObj ? ((lastPunchObj.notes || '').includes('OUT Missing') || (lastPunchObj.notes || '').includes('Auto Clock-Out')) : false;

    let attendanceRecord = attendance.length > 0 ? attendance[0] : null;
    if (!attendanceRecord && punches.length > 0) {
      attendanceRecord = {
        id: 0,
        employee_id: emp.id,
        attendance_date: shiftDate,
        punch_date: shiftDate,
        first_check_in: punches[0].punch_time,
        last_check_out: punches.length > 1 && lastOverallPunchType === 'out' ? punches[punches.length - 1].punch_time : null,
        work_mode: punches[0]?.work_mode || 'Biometric',
        location: punches[0]?.location || 'Biometric Device',
        status: isAutoOut ? 'Not In Yet' : 'present',
        gross_hours: todayMetrics.grossHours,
        total_work_hours: todayMetrics.totalWorkHours,
        total_break_hours: todayMetrics.totalBreakHours,
        effective_hours: todayMetrics.totalWorkHours
      };
    } else if (attendanceRecord && punches.length > 0) {
      attendanceRecord.first_check_in = punches[0]?.punch_time || attendanceRecord.first_check_in;
      if (lastOverallPunchType === 'out') {
        attendanceRecord.last_check_out = punches[punches.length - 1]?.punch_time;
      } else {
        attendanceRecord.last_check_out = null;
      }
      attendanceRecord.gross_hours = todayMetrics.grossHours;
      attendanceRecord.total_work_hours = todayMetrics.totalWorkHours;
      attendanceRecord.total_break_hours = todayMetrics.totalBreakHours;
      attendanceRecord.effective_hours = todayMetrics.totalWorkHours;
      if (isAutoOut) {
        attendanceRecord.status = 'Not In Yet';
      }
    }

    c.end();

    if (!attendanceRecord && punches.length === 0) {
      return res.json({
        has_attendance: false,
        message: "No attendance record for today",
        punches: [],
        policyPermissions,
        shiftTiming
      });
    }

    const isOverallClockedIn = lastOverallPunchType === 'in';

    res.json({
      has_attendance: true,
      attendance: attendanceRecord,
      metrics: todayMetrics,
      gross_hours: todayMetrics.grossHours,
      total_work_hours: todayMetrics.totalWorkHours,
      effective_hours: todayMetrics.totalWorkHours,
      total_break_hours: todayMetrics.totalBreakHours,
      punches: punches,
      punch_count: punches.length,
      last_punch_type: lastOverallPunchType || lastWebPunchType,
      last_web_punch_type: lastWebPunchType,
      last_overall_punch_type: lastOverallPunchType,
      can_punch_in: !isWebClockedIn,
      can_punch_out: isWebClockedIn,
      is_web_clocked_in: isWebClockedIn,
      is_clocked_in: isOverallClockedIn,
      is_auto_clocked_out: isAutoOut,
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

    const today = toMySQLDate(new Date());
    const c = await db();

    const placeholders = employee_ids.map(() => "?").join(",");
    const [attendance] = await c.query(
      `SELECT 
                a.*,
                (SELECT COUNT(*) FROM attendance_punches WHERE attendance_id = a.id AND punch_type = 'in') as punch_in_count,
                (SELECT COUNT(*) FROM attendance_punches WHERE attendance_id = a.id AND punch_type = 'out') as punch_out_count
             FROM attendance a
             WHERE a.employee_id IN (${placeholders}) AND a.attendance_date = ?`,
      [...employee_ids, today]
    );

    let bioDaily = [];
    try {
      const [bdRows] = await c.query(
        `SELECT * FROM biometric_daily_attendance
         WHERE employee_id IN (${placeholders}) AND attendance_date = ?`,
        [...employee_ids, today]
      );
      bioDaily = bdRows || [];
    } catch (_) { }

    const [latestPunches] = await c.query(
      `SELECT p.employee_id, p.punch_type, p.punch_time, p.work_mode, p.location, p.notes
       FROM (
           SELECT employee_id, punch_type, punch_time, 'Office' as work_mode, location, notes
           FROM attendance_punches
           WHERE employee_id IN (${placeholders}) AND punch_date = ?
           UNION ALL
           SELECT employee_id, 
                  CASE WHEN direction = 'out' THEN 'out' ELSE 'in' END as punch_type, 
                  punch_time, 
                  'Biometric' as work_mode, 
                  CASE 
                    WHEN device_id = '3' THEN '4th Floor SVS Towers'
                    WHEN device_id = '2' THEN 'Main Door - 1st floor'
                    WHEN device_id = '1' THEN '3rd Floor SVS Towers'
                    ELSE CONCAT(COALESCE(device_id, 'Reader'), ' SVS Towers')
                  END as location, 
                  'Biometric Punch' as notes
           FROM biometric_punches
           WHERE employee_id IN (${placeholders}) AND punch_date = ?
       ) p
       INNER JOIN (
           SELECT employee_id, MAX(ptime) as max_time
           FROM (
               SELECT employee_id, punch_time as ptime FROM attendance_punches WHERE employee_id IN (${placeholders}) AND punch_date = ?
               UNION ALL
               SELECT employee_id, punch_time as ptime FROM biometric_punches WHERE employee_id IN (${placeholders}) AND punch_date = ?
           ) combined
           GROUP BY employee_id
       ) latest ON p.employee_id = latest.employee_id AND p.punch_time = latest.max_time`,
      [...employee_ids, today, ...employee_ids, today, ...employee_ids, today, ...employee_ids, today]
    );

    c.end();

    const punchMap = new Map();
    latestPunches.forEach((p) => {
      punchMap.set(p.employee_id, p);
    });

    const bioDailyMap = new Map();
    if (bioDaily && bioDaily.length > 0) {
      bioDaily.forEach((bd) => {
        bioDailyMap.set(bd.employee_id, bd);
      });
    }

    const attendanceMap = new Map();
    attendance.forEach((a) => {
      const punch = punchMap.get(a.employee_id);
      const isAutoOut = punch ? ((punch.notes || '').includes('OUT Missing') || (punch.notes || '').includes('Auto Clock-Out')) : false;
      attendanceMap.set(a.employee_id, {
        ...a,
        status: isAutoOut ? 'Not In Yet' : a.status,
        is_clocked_in: punch ? punch.punch_type === "in" : false,
        last_punch: punch || null,
        is_auto_out: isAutoOut
      });
    });

    // Merge biometric attendance for employees who only punched via biometric
    employee_ids.forEach((id) => {
      if (!attendanceMap.has(id)) {
        const bd = bioDailyMap.get(id);
        const punch = punchMap.get(id);
        if (bd || punch) {
          attendanceMap.set(id, {
            id: bd?.id ? `bio_${bd.id}` : 0,
            employee_id: id,
            attendance_date: today,
            status: bd ? (bd.status === 'half_day' ? 'half-day' : (bd.status || 'present')) : 'present',
            first_check_in: bd?.first_punch_in || punch?.punch_time || null,
            last_check_out: bd?.last_punch_out || null,
            gross_hours: bd?.gross_hours || 0,
            total_work_hours: bd?.gross_hours || 0,
            work_mode: 'Biometric',
            location: punch?.location || 'Biometric Device',
            is_clocked_in: punch ? punch.punch_type === "in" : false,
            last_punch: punch || null,
          });
        }
      }
    });

    const result = employee_ids.map((id) => {
      const att = attendanceMap.get(id);
      if (att) {
        return {
          employee_id: id,
          has_attendance: true,
          ...att,
        };
      }
      return {
        employee_id: id,
        has_attendance: false,
        status: "absent",
        is_clocked_in: false,
        gross_hours: 0,
        total_work_hours: 0,
      };
    });

    res.json({
      date: today,
      count: result.length,
      employees: result,
    });
  } catch (error) {
    console.error("Bulk status check error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ============================================
   SHARED ATTENDANCE DETAILS & REPORT HELPERS
   ============================================ */

function toISTFormat(val) {
  if (!val) return null;
  if (typeof val === 'string') {
    const clean = val.replace('Z', '').replace('T', ' ').trim();
    const parts = clean.split(' ');
    if (parts.length >= 2) {
      const datePart = parts[0];
      const timePart = parts[1].split('.')[0];
      return `${datePart}T${timePart}+05:30`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
      return clean;
    }
  }
  const d = new Date(val);
  if (isNaN(d.getTime())) return null;
  const dStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(d);
  const tStr = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(d);
  return `${dStr}T${tStr}+05:30`;
}

function calculateAttendanceMetrics(rawPunches, isToday) {
  if (!rawPunches || !rawPunches.length) {
    return { totalWorkHours: '0.00', grossHours: '0.00', totalBreakHours: '0.00' };
  }
  const punches = rawPunches.slice().sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());
  const workIntervals = [];
  let earliestInMs = null;
  let latestOutMs = null;
  let currentIn = null;

  for (let i = 0; i < punches.length; i++) {
    const p = punches[i];
    const pTimeMs = new Date(p.punch_time).getTime();
    const isAutoOut = (p.notes || '').includes('OUT Missing') || (p.notes || '').includes('Auto Clock-Out');
    const punchType = (p.punch_type || '').toLowerCase();

    if (punchType === 'in') {
      if (earliestInMs === null || (pTimeMs > 0 && pTimeMs < earliestInMs)) {
        earliestInMs = pTimeMs;
      }
      if (currentIn) {
        const prevInTimeMs = new Date(currentIn.punch_time).getTime();
        const gapMinutes = (pTimeMs - prevInTimeMs) / (1000 * 60);
        if (gapMinutes >= 5) {
          // Meaningful gap: previous work session was ongoing. Save it so hours are not lost!
          workIntervals.push({ start: prevInTimeMs, end: pTimeMs });
          if (latestOutMs === null || pTimeMs > latestOutMs) {
            latestOutMs = pTimeMs;
          }
          currentIn = p;
        }
        // Rapid duplicate (< 5 mins): retain the earlier in-punch
      } else {
        currentIn = p;
      }
    } else if (punchType === 'out') {
      if (pTimeMs > 0 && (latestOutMs === null || pTimeMs > latestOutMs)) {
        latestOutMs = pTimeMs;
      }
      if (currentIn && !isAutoOut) {
        const inTimeMs = new Date(currentIn.punch_time).getTime();
        if (pTimeMs > inTimeMs) {
          workIntervals.push({ start: inTimeMs, end: pTimeMs });
        }
      }
      currentIn = null;
    }
  }

  if (currentIn && isToday) {
    const inTimeMs = new Date(currentIn.punch_time).getTime();
    const nowMs = Date.now();
    if (nowMs > inTimeMs) {
      workIntervals.push({ start: inTimeMs, end: nowMs });
      if (latestOutMs === null || nowMs > latestOutMs) {
        latestOutMs = nowMs;
      }
    }
  }

  workIntervals.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const interval of workIntervals) {
    if (!merged.length || merged[merged.length - 1].end < interval.start) {
      merged.push({ ...interval });
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, interval.end);
    }
  }

  const totalWorkMs = merged.reduce((acc, curr) => acc + (curr.end - curr.start), 0);
  const totalWorkHours = (totalWorkMs / (1000 * 60 * 60)).toFixed(2);

  let grossHours = '0.00';
  if (earliestInMs !== null) {
    const endMs = latestOutMs !== null ? latestOutMs : (isToday ? Date.now() : earliestInMs);
    if (endMs > earliestInMs) {
      grossHours = ((endMs - earliestInMs) / (1000 * 60 * 60)).toFixed(2);
    }
  }
  const totalBreakHours = Math.max(0, parseFloat(grossHours) - parseFloat(totalWorkHours)).toFixed(2);
  return { totalWorkHours, grossHours, totalBreakHours };
}

function calculatePunchPairs(punches) {
  if (!punches || !punches.length) return [];

  // Partition punches by source stream (Biometric vs Web/Mobile) so cross-source punches don't interrupt each other
  const streamMap = new Map();
  for (const punch of punches) {
    const key = (punch.source === 'biometric' || punch.work_mode === 'Biometric') ? 'biometric' : 'web';
    if (!streamMap.has(key)) streamMap.set(key, []);
    streamMap.get(key).push(punch);
  }

  const allPairs = [];

  streamMap.forEach((streamPunches) => {
    let currentPair = {};
    for (let i = 0; i < streamPunches.length; i++) {
      const punch = streamPunches[i];
      const formattedTime = toISTFormat(punch.punch_time);
      let punchType = (punch.punch_type || '').toLowerCase();
      if (punchType === 'auto' || !punchType) {
        punchType = currentPair.punch_in ? 'out' : 'in';
      }

      if (punchType === "in") {
        if (currentPair.punch_in) {
          currentPair.punch_out = null;
          currentPair.punch_out_display = 'In Progress';
          currentPair.hours_worked = null;
          currentPair.status = "In Progress";
          allPairs.push({ ...currentPair });
          currentPair = {};
        }
        currentPair = {
          punch_in: formattedTime,
          punch_in_location: punch.location,
          punch_in_notes: punch.notes,
          work_mode: punch.work_mode || 'Office',
          source: punch.source || 'web'
        };
      } else if (punchType === "out" && currentPair.punch_in) {
        const isMissingOut = (punch.notes || '').includes('OUT Missing') || (punch.notes || '').includes('Auto Clock-Out');
        currentPair.punch_out = isMissingOut ? null : formattedTime;
        currentPair.punch_out_raw = formattedTime;
        currentPair.punch_out_display = isMissingOut ? 'OUT Missing' : formattedTime;
        currentPair.punch_out_location = isMissingOut ? 'Missing Clock-Out' : punch.location;
        currentPair.punch_out_notes = punch.notes;
        currentPair.is_missing_out = isMissingOut;

        const punchIn = new Date(currentPair.punch_in);
        const punchOut = new Date(formattedTime);
        const hours = isMissingOut ? '0.00' : Math.max(0, ((punchOut - punchIn) / (1000 * 60 * 60))).toFixed(2);

        currentPair.hours_worked = hours;
        currentPair.status = isMissingOut ? "OUT Missing" : "Completed";
        allPairs.push({ ...currentPair });
        currentPair = {};
      }
    }

    if (currentPair.punch_in) {
      currentPair.punch_out = null;
      currentPair.punch_out_display = 'In Progress';
      currentPair.hours_worked = null;
      currentPair.status = "In Progress";
      allPairs.push(currentPair);
    }
  });

  // Sort pairs chronologically by punch_in
  return allPairs.sort((a, b) => new Date(a.punch_in).getTime() - new Date(b.punch_in).getTime());
}

async function getUnifiedAttendanceDetails(c, employeeId, date) {
  const effectiveShift = await getEmployeeEffectiveShift(c, employeeId);
  const isOvernight = effectiveShift && effectiveShift.is_overnight;
  const cutoffHour = (effectiveShift && effectiveShift.cutoff_hour) || 12;
  const morningCutoff = (effectiveShift && effectiveShift.morning_cutoff_hour) || 7;
  const effectiveCutoff = isOvernight ? cutoffHour : morningCutoff;
  const nextDate = addDaysToDate(date, 1);

  let [attendance] = await c.query(
    `SELECT a.*,
            DATE_FORMAT(a.first_check_in, '%Y-%m-%d %H:%i:%s') as first_check_in_ist,
            DATE_FORMAT(a.last_check_out, '%Y-%m-%d %H:%i:%s') as last_check_out_ist
     FROM attendance a WHERE a.employee_id = ? AND a.attendance_date = ?`,
    [employeeId, date]
  );

  const [leaves] = await c.query(
    `SELECT l.*, lt.type_name, lt.type_code 
     FROM leaves l 
     JOIN leave_types lt ON l.leave_type_id = lt.id 
     WHERE l.employee_id = ? AND l.status IN ('approved', 'pending') AND ? BETWEEN l.start_date AND l.end_date`,
    [employeeId, date]
  );

  let punches = [];

  // 1. Fetch Web/Mobile/Remote Punches (Stored in IST +05:30)
  // Fetches Day 1 punches AND any next-day morning punches (< effectiveCutoff) completing Day 1's work;
  // Excludes early morning punches on 'date' that belong to the previous day's shift.
  let webQuery = `
    SELECT ap.id, ap.attendance_id, ap.employee_id, ap.punch_type, 
           DATE_FORMAT(ap.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
           DATE_FORMAT(ap.punch_time, '%Y-%m-%d') as punch_date, 
           ap.ip_address, ap.device_info, ap.location, ap.notes, 'web' as source,
           COALESCE(a.work_mode, 'Office') as work_mode,
           DATE_FORMAT(ap.created_at, '%Y-%m-%d %H:%i:%s') as created_at
    FROM attendance_punches ap
    LEFT JOIN attendance a ON ap.attendance_id = a.id
    WHERE ap.employee_id = ? AND (ap.notes IS NULL OR ap.notes != 'Biometric Check-In')
      AND (
        (ap.punch_date = ? OR a.attendance_date = ? OR (DATE(ap.punch_time) = ? AND HOUR(ap.punch_time) < ?))
        AND NOT (DATE(ap.punch_time) = ? AND HOUR(ap.punch_time) < ? AND (ap.punch_date < ? OR (a.attendance_date IS NOT NULL AND a.attendance_date < ?)))
      )
    ORDER BY ap.punch_time ASC
  `;
  let webParams = [employeeId, date, date, nextDate, effectiveCutoff, date, effectiveCutoff, date, date];
  const [webPunches] = await c.query(webQuery, webParams);

  if (webPunches && webPunches.length > 0) {
    punches.push(...webPunches);
  }

  // 2. Fetch Biometric Punches
  // Fetches Day 1 punches AND any next-day morning punches (< effectiveCutoff) completing Day 1's work;
  // Excludes early morning punches on 'date' that belong to the previous day's shift.
  try {
    let bioQuery = `
      SELECT bp.id, 0 as attendance_id, bp.employee_id, bp.direction,
             DATE_FORMAT(bp.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
             DATE_FORMAT(bp.punch_date, '%Y-%m-%d') as punch_date,
             null as ip_address, bp.device_id as device_info,
             CASE 
               WHEN bp.device_id = '3' THEN '4th Floor SVS Towers'
               WHEN bp.device_id = '2' THEN 'Main Door - 1st floor'
               WHEN bp.device_id = '1' THEN '3rd Floor SVS Towers'
               ELSE CONCAT(COALESCE(bp.device_id, 'Reader'), ' SVS Towers')
             END as location,
             'Biometric Punch' as notes,
             'biometric' as source,
             'Biometric' as work_mode,
             bp.created_at
      FROM biometric_punches bp
      WHERE bp.employee_id = ?
        AND (
          (bp.punch_date = ? OR (DATE(bp.punch_time) = ? AND HOUR(bp.punch_time) < ?))
          AND NOT (DATE(bp.punch_time) = ? AND HOUR(bp.punch_time) < ? AND bp.punch_date < ?)
        )
      ORDER BY bp.punch_time ASC
    `;
    let bioParams = [employeeId, date, nextDate, effectiveCutoff, date, effectiveCutoff, date];
    const [bioPunches] = await c.query(bioQuery, bioParams);

    if (bioPunches && bioPunches.length > 0) {
      let bioOpen = false;
      const mappedBioPunches = bioPunches.map(p => {
        let pt = p.direction === 'out' ? 'out' : (p.direction === 'in' ? 'in' : (bioOpen ? 'out' : 'in'));
        if (pt === 'in') bioOpen = true;
        else if (pt === 'out') bioOpen = false;
        return {
          ...p,
          punch_type: pt
        };
      });
      const bioTimes = new Set(mappedBioPunches.map(b => b.punch_time));
      punches = punches.filter(p => !bioTimes.has(p.punch_time));
      punches.push(...mappedBioPunches);
    }
  } catch (err) {
    console.warn("Error fetching biometric punches for details:", err.message);
  }

  punches.sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());

  // Filter out any obsolete auto-out punches if the employee continued working with later punches
  punches = punches.filter((p, idx) => {
    const isAutoOut = (p.notes || '').includes('OUT Missing') || (p.notes || '').includes('Auto Clock-Out');
    if (isAutoOut) {
      const hasLater = punches.slice(idx + 1).some(lp => !(lp.notes || '').includes('OUT Missing'));
      if (hasLater) return false;
    }
    return true;
  });

  // Deduplicate rapid consecutive duplicate punches of the same type (e.g. double tap within 5 seconds)
  const uniquePunches = [];
  punches.forEach(p => {
    const pTime = new Date(p.punch_time).getTime();
    const lastPunch = uniquePunches.length > 0 ? uniquePunches[uniquePunches.length - 1] : null;
    const isDupe = lastPunch &&
      lastPunch.punch_type === p.punch_type &&
      lastPunch.source === p.source &&
      Math.abs(pTime - new Date(lastPunch.punch_time).getTime()) < 5000;
    if (!isDupe) {
      uniquePunches.push(p);
    }
  });
  punches = uniquePunches;

  let attendanceRecord = attendance.length > 0 ? { ...attendance[0] } : null;
  if (!attendanceRecord) {
    try {
      const [bioDaily] = await c.query(
        `SELECT * FROM biometric_daily_attendance WHERE employee_id = ? AND attendance_date = ?`,
        [employeeId, date]
      );
      if (bioDaily && bioDaily.length > 0) {
        const bd = bioDaily[0];
        const isOrphanMorning = isOvernight && bd.first_punch_in && String(bd.first_punch_in) < '12:00:00' && punches.length === 0;
        if (!isOrphanMorning) {
          attendanceRecord = {
            id: bd.id,
            employee_id: bd.employee_id,
            attendance_date: bd.attendance_date ? String(bd.attendance_date).substring(0, 10) : date,
            status: bd.status === 'half_day' ? 'half-day' : (bd.status || 'present'),
            total_work_hours: bd.gross_hours || '0.00',
            gross_hours: bd.gross_hours || '0.00',
            first_check_in: bd.first_punch_in ? `${date} ${String(bd.first_punch_in).substring(0, 8)}` : null,
            last_check_out: bd.last_punch_out ? `${date} ${String(bd.last_punch_out).substring(0, 8)}` : null,
            work_mode: 'Biometric',
            location: 'Biometric Device'
          };
        }
      } else if (punches.length > 0) {
        const firstP = punches[0];
        const lastP = punches[punches.length - 1];
        let calculatedGross = '0.00';
        if (punches.length > 1) {
          const startMs = new Date(firstP.punch_time).getTime();
          const endMs = new Date(lastP.punch_time).getTime();
          calculatedGross = Math.max(0, (endMs - startMs) / (1000 * 60 * 60)).toFixed(2);
        }
        attendanceRecord = {
          id: 0,
          employee_id: employeeId,
          attendance_date: date,
          status: 'present',
          total_work_hours: calculatedGross,
          gross_hours: calculatedGross,
          first_check_in: firstP.punch_time,
          last_check_out: punches.length > 1 ? lastP.punch_time : null,
          work_mode: firstP?.work_mode || 'Biometric',
          location: firstP?.location || 'Office'
        };
      }
    } catch (_) { }
  } else {
    if (attendanceRecord.first_check_in_ist) {
      attendanceRecord.first_check_in = attendanceRecord.first_check_in_ist;
    }
    if (attendanceRecord.last_check_out_ist) {
      attendanceRecord.last_check_out = attendanceRecord.last_check_out_ist;
    }
    if (punches.length > 0) {
      if (!attendanceRecord.first_check_in) {
        attendanceRecord.first_check_in = punches[0].punch_time;
      }
      if (!attendanceRecord.last_check_out && punches.length > 1) {
        attendanceRecord.last_check_out = punches[punches.length - 1].punch_time;
      }
    }
  }

  if (attendanceRecord) {
    attendanceRecord.attendance_date = date;
    const isToday = toISTFormat(new Date()).substring(0, 10) === date;
    const hasStoredPositiveHours = attendanceRecord.id !== 0 &&
      !isToday &&
      attendanceRecord.total_work_hours !== null &&
      attendanceRecord.total_work_hours !== undefined &&
      parseFloat(attendanceRecord.total_work_hours) > 0;

    if (hasStoredPositiveHours && (!punches || punches.length === 0)) {
      attendanceRecord.effective_hours = attendanceRecord.total_work_hours;
    } else if (punches && punches.length > 0) {
      const metrics = calculateAttendanceMetrics(punches, isToday);
      if (parseFloat(metrics.grossHours) > 0 || parseFloat(metrics.totalWorkHours) > 0) {
        attendanceRecord.total_work_hours = metrics.totalWorkHours;
        attendanceRecord.gross_hours = metrics.grossHours;
        attendanceRecord.total_break_hours = metrics.totalBreakHours;
        attendanceRecord.effective_hours = metrics.totalWorkHours;
      } else if (hasStoredPositiveHours) {
        attendanceRecord.effective_hours = attendanceRecord.total_work_hours;
      } else {
        attendanceRecord.effective_hours = attendanceRecord.total_work_hours || '0.00';
      }
    } else {
      attendanceRecord.effective_hours = attendanceRecord.total_work_hours || '0.00';
    }
  }

  const formattedPunches = punches.map(p => ({
    ...p,
    punch_time: toISTFormat(p.punch_time),
    punch_date: p.punch_date ? `${String(p.punch_date).substring(0, 10)}T00:00:00+05:30` : `${date}T00:00:00+05:30`,
    created_at: p.created_at ? toISTFormat(p.created_at) : undefined
  }));

  return {
    has_attendance: !!attendanceRecord || formattedPunches.length > 0,
    attendance: attendanceRecord,
    punches: formattedPunches,
    punch_pairs: calculatePunchPairs(punches),
    on_leave: leaves.length > 0,
    leave: leaves[0] || null
  };
}

async function getUnifiedAttendanceListAndSummary(c, targetEmpId, startDate, endDate, month, year) {
  const now = new Date();
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
  const startStr = toMySQLDate(start);
  const endStr = toMySQLDate(end);

  const [attendanceRows] = await c.query(`
    SELECT 
      a.*,
      DATE_FORMAT(a.attendance_date, '%Y-%m-%d') as formatted_date,
      DATE_FORMAT(a.first_check_in, '%Y-%m-%d %H:%i:%s') as first_check_in_ist,
      DATE_FORMAT(a.last_check_out, '%Y-%m-%d %H:%i:%s') as last_check_out_ist
    FROM attendance a
    WHERE a.employee_id = ? AND a.attendance_date BETWEEN ? AND ?
    ORDER BY a.attendance_date DESC
  `, [targetEmpId, startStr, endStr]);

  let bioDailyRows = [];
  try {
    const [bda] = await c.query(`
      SELECT 
        bda.*,
        DATE_FORMAT(bda.attendance_date, '%Y-%m-%d') as formatted_date
      FROM biometric_daily_attendance bda
      WHERE bda.employee_id = ? AND bda.attendance_date BETWEEN ? AND ?
    `, [targetEmpId, startStr, endStr]);
    bioDailyRows = bda || [];
  } catch (_) { }

  let bioPunchSummary = [];
  try {
    const [bps] = await c.query(`
      SELECT 
        DATE_FORMAT(punch_date, '%Y-%m-%d') as formatted_date,
        MIN(punch_time) as first_punch_in,
        MAX(punch_time) as last_punch_out,
        COUNT(*) as total_punches,
        SUM(CASE WHEN direction = 'in' OR direction = 'auto' THEN 1 ELSE 0 END) as bio_punch_in_count,
        SUM(CASE WHEN direction = 'out' THEN 1 ELSE 0 END) as bio_punch_out_count
      FROM biometric_punches
      WHERE employee_id = ? AND punch_date BETWEEN ? AND ?
      GROUP BY punch_date
    `, [targetEmpId, startStr, endStr]);
    bioPunchSummary = bps || [];
  } catch (_) { }

  const effectiveShift = await getEmployeeEffectiveShift(c, targetEmpId);
  const isOvernight = effectiveShift && effectiveShift.is_overnight;
  const cutoffHour = (effectiveShift && effectiveShift.cutoff_hour) || 12;

  // Fetch all individual punches for range to accurately calculate effective work hours & gross hours
  let allPunchesMap = new Map();
  let webRange = [];
  try {
    const [wRange] = await c.query(`
      SELECT ap.employee_id, 
             DATE_FORMAT(ap.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
             DATE_FORMAT(ap.punch_time, '%Y-%m-%d') as punch_date,
             ap.punch_type, ap.location, ap.notes, 'web' as source
      FROM attendance_punches ap
      WHERE ap.employee_id = ? AND ap.punch_date BETWEEN ? AND ?
      ORDER BY ap.punch_time ASC
    `, [targetEmpId, startStr, endStr]);
    webRange = wRange || [];

    const [bioRange] = await c.query(`
      SELECT bp.employee_id, 
             DATE_FORMAT(bp.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
             DATE_FORMAT(bp.punch_date, '%Y-%m-%d') as punch_date,
             bp.direction, bp.device_id,
             CASE 
               WHEN bp.device_id = '3' THEN '4th Floor SVS Towers'
               WHEN bp.device_id = '2' THEN 'Main Door - 1st floor'
               WHEN bp.device_id = '1' THEN '3rd Floor SVS Towers'
               ELSE CONCAT(COALESCE(bp.device_id, 'Reader'), ' SVS Towers')
             END as location,
             'biometric' as source
      FROM biometric_punches bp
      WHERE bp.employee_id = ? AND bp.punch_date BETWEEN ? AND ?
      ORDER BY bp.punch_time ASC
    `, [targetEmpId, startStr, endStr]);

    // Group bioRange by punch_date so alternation resets per day
    const bioByDate = new Map();
    for (const bp of (bioRange || [])) {
      const d = bp.punch_date;
      if (!bioByDate.has(d)) bioByDate.set(d, []);
      bioByDate.get(d).push(bp);
    }
    const mappedBioRange = [];
    bioByDate.forEach((dayBioPunches) => {
      let bioOpen = false;
      for (const p of dayBioPunches) {
        let pt = p.direction === 'out' ? 'out' : (p.direction === 'in' ? 'in' : (bioOpen ? 'out' : 'in'));
        if (pt === 'in') bioOpen = true;
        else if (pt === 'out') bioOpen = false;
        mappedBioRange.push({ ...p, punch_type: pt });
      }
    });

    const allPunches = [...(webRange || []), ...mappedBioRange];
    for (const p of allPunches) {
      const dStr = getShiftDateForPunch(effectiveShift, p.punch_time);
      if (!allPunchesMap.has(dStr)) {
        allPunchesMap.set(dStr, []);
      }
      allPunchesMap.get(dStr).push(p);
    }
  } catch (err) {
    console.warn("Error fetching range punches:", err.message);
  }

  // Pre-calculate web punch counts per date in memory for fast lookup
  const webPunchesByDate = new Map();
  for (const wp of webRange) {
    const d = getShiftDateForPunch(effectiveShift, wp.punch_time);
    if (!webPunchesByDate.has(d)) {
      webPunchesByDate.set(d, { in: 0, out: 0 });
    }
    const counts = webPunchesByDate.get(d);
    if (wp.punch_type === 'in') counts.in++;
    else if (wp.punch_type === 'out') counts.out++;
  }

  // Pre-calculate bio punch counts per date in memory for fast lookup
  const bioCountsByDate = new Map();
  for (const bp of bioPunchSummary) {
    bioCountsByDate.set(bp.formatted_date, {
      in: Number(bp.bio_punch_in_count) || 0,
      out: Number(bp.bio_punch_out_count) || 0
    });
  }

  const combinedAttendanceMap = new Map();

  for (const a of attendanceRows) {
    const dStr = a.formatted_date || String(a.attendance_date).substring(0, 10);
    const webCounts = webPunchesByDate.get(dStr) || { in: 0, out: 0 };
    combinedAttendanceMap.set(dStr, {
      ...a,
      attendance_date: dStr,
      punch_date: a.punch_date ? String(a.punch_date).substring(0, 10) : dStr,
      first_check_in: a.first_check_in_ist || a.first_check_in,
      last_check_out: a.last_check_out_ist || a.last_check_out,
      punch_in_count: webCounts.in,
      punch_out_count: webCounts.out,
      work_mode: a.work_mode || 'Office'
    });
  }

  for (const bd of bioDailyRows) {
    const dStr = bd.formatted_date || String(bd.attendance_date).substring(0, 10);
    // If overnight shift, check if bd was just an orphan morning punch (< cutoffHour) with no shift start on this date
    if (isOvernight && bd.first_punch_in && String(bd.first_punch_in) < `${cutoffHour}:00:00`) {
      const dayPunches = allPunchesMap.get(dStr) || [];
      const hasEveningPunch = dayPunches.some(p => {
        const timePart = String(p.punch_time).split(' ')[1] || '';
        return timePart >= `${cutoffHour}:00:00`;
      });
      if (!hasEveningPunch && !combinedAttendanceMap.has(dStr)) {
        continue;
      }
    }
    const bCounts = bioCountsByDate.get(dStr) || { in: 0, out: 0 };
    if (combinedAttendanceMap.has(dStr)) {
      const existing = combinedAttendanceMap.get(dStr);
      existing.punch_in_count += bCounts.in;
      existing.punch_out_count += bCounts.out;
      if (bd.first_punch_in) {
        const bioFirstIn = `${dStr} ${bd.first_punch_in}`;
        if (!existing.first_check_in || new Date(bioFirstIn).getTime() < new Date(existing.first_check_in).getTime()) {
          existing.first_check_in = bioFirstIn;
        }
      }
      if (bd.last_punch_out) {
        const bioLastOut = `${dStr} ${bd.last_punch_out}`;
        if (!existing.last_check_out || new Date(bioLastOut).getTime() > new Date(existing.last_check_out).getTime()) {
          existing.last_check_out = bioLastOut;
        }
      }
      if ((!existing.gross_hours || parseFloat(existing.gross_hours) === 0) && parseFloat(bd.gross_hours) > 0) {
        existing.gross_hours = bd.gross_hours;
        existing.total_work_hours = bd.gross_hours;
      }
    } else {
      combinedAttendanceMap.set(dStr, {
        id: `bio_${bd.id || dStr}`,
        employee_id: targetEmpId,
        attendance_date: dStr,
        punch_date: dStr,
        first_check_in: bd.first_punch_in ? `${dStr} ${bd.first_punch_in}` : null,
        last_check_out: bd.last_punch_out ? `${dStr} ${bd.last_punch_out}` : null,
        total_work_hours: parseFloat(bd.gross_hours) || 0,
        total_break_hours: 0,
        gross_hours: parseFloat(bd.gross_hours) || 0,
        work_mode: 'Biometric',
        location: 'Biometric Device',
        status: bd.status === 'half_day' ? 'half-day' : (bd.status || 'present'),
        approval_status: 'approved',
        punch_in_count: bCounts.in || Number(bd.total_punches) || 1,
        punch_out_count: bCounts.out || (bd.total_punches > 1 ? 1 : 0),
        notes: 'Biometric Attendance'
      });
    }
  }

  for (const bp of bioPunchSummary) {
    const dStr = bp.formatted_date;
    if (combinedAttendanceMap.has(dStr)) {
      const existing = combinedAttendanceMap.get(dStr);
      if (existing.punch_in_count === 0 && Number(bp.bio_punch_in_count) > 0) {
        existing.punch_in_count += Number(bp.bio_punch_in_count);
      }
      if (existing.punch_out_count === 0 && Number(bp.bio_punch_out_count) > 0) {
        existing.punch_out_count += Number(bp.bio_punch_out_count);
      }
      if (bp.first_punch_in) {
        if (!existing.first_check_in || new Date(bp.first_punch_in).getTime() < new Date(existing.first_check_in).getTime()) {
          existing.first_check_in = bp.first_punch_in;
        }
      }
      if (bp.last_punch_out) {
        if (!existing.last_check_out || new Date(bp.last_punch_out).getTime() > new Date(existing.last_check_out).getTime()) {
          existing.last_check_out = bp.last_punch_out;
        }
      }
    } else {
      const startMs = new Date(bp.first_punch_in).getTime();
      const endMs = new Date(bp.last_punch_out).getTime();
      const gross = (bp.total_punches > 1 && endMs > startMs) ? ((endMs - startMs) / (1000 * 60 * 60)).toFixed(2) : '0.00';
      combinedAttendanceMap.set(dStr, {
        id: `bio_p_${dStr}`,
        employee_id: targetEmpId,
        attendance_date: dStr,
        punch_date: dStr,
        first_check_in: bp.first_punch_in,
        last_check_out: bp.total_punches > 1 ? bp.last_punch_out : null,
        total_work_hours: parseFloat(gross) || 0,
        total_break_hours: 0,
        gross_hours: parseFloat(gross) || 0,
        work_mode: 'Biometric',
        location: 'Biometric Device',
        status: 'present',
        approval_status: 'approved',
        punch_in_count: Number(bp.bio_punch_in_count) || 1,
        punch_out_count: Number(bp.bio_punch_out_count) || (bp.total_punches > 1 ? 1 : 0),
        notes: 'Biometric Punch Log'
      });
    }
  }

  // Compute accurate effective hours, gross hours, and break hours
  const todayDateStr = toISTFormat(now).substring(0, 10);
  combinedAttendanceMap.forEach((val, dStr) => {
    const isToday = dStr === todayDateStr;
    const dayPunches = allPunchesMap.get(dStr);

    const hasStoredPositiveHours = typeof val.id === 'number' &&
      !isToday &&
      val.total_work_hours !== null &&
      val.total_work_hours !== undefined &&
      parseFloat(val.total_work_hours) > 0;

    if (hasStoredPositiveHours && (!dayPunches || dayPunches.length === 0)) {
      val.effective_hours = val.total_work_hours;
    } else if (dayPunches && dayPunches.length > 0) {
      const metrics = calculateAttendanceMetrics(dayPunches, isToday);
      if (parseFloat(metrics.grossHours) > 0 || parseFloat(metrics.totalWorkHours) > 0) {
        val.total_work_hours = metrics.totalWorkHours;
        val.effective_hours = metrics.totalWorkHours;
        val.gross_hours = metrics.grossHours;
        val.total_break_hours = metrics.totalBreakHours;
      } else if (hasStoredPositiveHours) {
        val.effective_hours = val.total_work_hours;
      } else {
        val.effective_hours = val.total_work_hours || '0.00';
      }
    } else {
      val.effective_hours = val.total_work_hours || '0.00';
    }

    if (dayPunches && dayPunches.length > 0) {
      const lastP = dayPunches[dayPunches.length - 1];
      const isAutoOut = lastP && ((lastP.notes || '').includes('OUT Missing') || (lastP.notes || '').includes('Auto Clock-Out'));
      if (isAutoOut) {
        val.is_auto_out = true;
        if (dStr === todayDateStr) {
          val.status = 'Not In Yet';
        }
      }
    }
  });

  const attendance = Array.from(combinedAttendanceMap.values()).sort((a, b) => new Date(b.attendance_date).getTime() - new Date(a.attendance_date).getTime());

  const [lopData] = await c.query(`
    SELECT SUM(l.total_days) as lop_days
    FROM leaves l
    INNER JOIN leave_types lt ON l.leave_type_id = lt.id
    WHERE l.employee_id = ? AND l.status = 'approved' AND lt.type_code = 'LOP'
      AND (l.start_date BETWEEN ? AND ? OR l.end_date BETWEEN ? AND ?)
  `, [targetEmpId, startStr, endStr, startStr, endStr]);
  const lopDays = Number(lopData[0]?.lop_days) || 0;

  const [empDetails] = await c.query(`
    SELECT e.id, e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail, e.LocationId, sp.id as shift_policy_id, sp.start_time, sp.end_time, sp.name as shift_name, mlt.threshold_hours as missing_log_threshold, wop.* 
    FROM employees e
    LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
    LEFT JOIN missing_log_times mlt ON e.leave_plan_id = mlt.leave_plan_id
    LEFT JOIN weekly_off_policies wop ON e.weekly_off_policy_id = wop.id
    WHERE e.id = ?
  `, [targetEmpId]);
  const employee = empDetails[0];

  const [holidaysList] = await c.query(`
    SELECT holiday_date, holiday_name, location_id, applicable_locations 
    FROM holidays 
    WHERE is_active = 1 
      AND holiday_date >= ? AND holiday_date <= ?
  `, [startStr, endStr]);

  const [allLeaves] = await c.query(`
    SELECT l.*, lt.type_code, lt.is_paid 
    FROM leaves l 
    INNER JOIN leave_types lt ON l.leave_type_id = lt.id 
    WHERE l.employee_id = ? AND l.status IN ('approved', 'pending')
  `, [targetEmpId]);

  const attMap = new Map();
  attendance.forEach(a => {
    const dStr = new Date(a.attendance_date).toDateString();
    attMap.set(dStr, a);
  });

  const todayStr = now.toDateString();
  let present_days = 0;
  let absent_days = 0;
  let leave_days = 0;
  let holiday_days = 0;
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

    const matchingHoliday = (holidaysList || []).find(h => {
      const hDateStr = new Date(h.holiday_date).toDateString();
      if (hDateStr !== dStr) return false;
      const empLoc = employee?.LocationId || employee?.location_id;
      if (!h.location_id && (!h.applicable_locations || h.applicable_locations === '' || h.applicable_locations === 'null' || h.applicable_locations === '[]')) return true;
      if (empLoc && Number(h.location_id) === Number(empLoc)) return true;
      if (empLoc && h.applicable_locations) {
        try {
          const locs = typeof h.applicable_locations === 'string' ? JSON.parse(h.applicable_locations) : h.applicable_locations;
          if (Array.isArray(locs) && locs.map(Number).includes(Number(empLoc))) return true;
        } catch (e) { }
      }
      return false;
    });

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
      const activeLeave = todaysLeaves.find(l => (l.status || '').toLowerCase() === 'approved') || todaysLeaves[0];
      const weight = activeLeave.is_half_day ? 0.5 : 1.0;
      leave_days += weight;
      if (activeLeave.type_code === 'LOP' || activeLeave.type_code === 'UL') {
        lop_from_leaves += weight;
      }
    } else if (matchingHoliday) {
      holiday_days++;
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
    total_days: attendance.length + weekend_days + holiday_days,
    present_days: present_days,
    absent_days: absent_days,
    half_days: half_day_count,
    leave_days: leave_days,
    weekend_days: weekend_days,
    holiday_days: holiday_days,
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

  return {
    attendance,
    summary,
    employee,
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
  };
}

/**
 * Get Monthly Attendance Report (Employee)
 */
router.get("/my-report", auth, async (req, res) => {
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const { startDate, endDate, month, year } = req.query;
    const c = await db();

    const reportData = await getUnifiedAttendanceListAndSummary(c, emp.id, startDate, endDate, month, year);
    c.end();

    res.json(reportData);
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

    const details = await getUnifiedAttendanceDetails(c, emp.id, date);
    c.end();

    res.json(details);
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

    const details = await getUnifiedAttendanceDetails(c, employeeId, date);
    c.end();

    res.json(details);
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

    const reportData = await getUnifiedAttendanceListAndSummary(c, targetEmpId, startDate, endDate, month, year);
    c.end();

    res.json({
      employee: reportData.employee
        ? {
          id: reportData.employee.id,
          employee_number: reportData.employee.EmployeeNumber,
          name: `${reportData.employee.FirstName || ''} ${reportData.employee.LastName || ''}`.trim(),
          email: reportData.employee.WorkEmail,
        }
        : null,
      summary: reportData.summary,
      attendance: reportData.attendance,
      shift_policy: reportData.shift_policy,
      weekly_off_policy: reportData.weekly_off_policy
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

      const [empRows] = await c.query("SELECT id, EmployeeNumber, FirstName, LastName FROM employees WHERE id = ?", [employeeId]);
      const details = await getUnifiedAttendanceDetails(c, employeeId, date);
      c.end();

      res.json({
        employee: empRows.length > 0 ? {
          id: empRows[0].id,
          employee_number: empRows[0].EmployeeNumber,
          name: `${empRows[0].FirstName} ${empRows[0].LastName}`.trim(),
        } : null,
        ...details
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
    const targetDate = date || toMySQLDate(new Date());
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

    // Get biometric daily attendance & punches for team members on targetDate
    let bioDailyList = [];
    let bioPunchesSummary = [];
    try {
      const [bDaily] = await c.query(
        `SELECT bda.*, e.EmployeeNumber, e.FirstName, e.LastName
         FROM biometric_daily_attendance bda
         INNER JOIN employees e ON bda.employee_id = e.id
         WHERE bda.employee_id IN (?) AND bda.attendance_date = ?`,
        [teamIds, targetDate]
      );
      bioDailyList = bDaily || [];

      const [bPunches] = await c.query(
        `SELECT employee_id, 
                COUNT(*) as punch_count,
                MIN(punch_time) as first_punch,
                MAX(punch_time) as last_punch
         FROM biometric_punches
         WHERE employee_id IN (?) AND punch_date = ?
         GROUP BY employee_id`,
        [teamIds, targetDate]
      );
      bioPunchesSummary = bPunches || [];
    } catch (_) { }

    // Get approved leaves for team members for today (covering full/partial day)
    // NOTE: WFH and Remote are working arrangements / work modes, NOT leaves! Exclude them from on_leave!
    const [onLeave] = await c.query(
      `SELECT 
          l.*, 
          e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail
        FROM leaves l
        INNER JOIN employees e ON l.employee_id = e.id
        WHERE l.employee_id IN (?)
          AND l.status IN ('approved', 'pending')
          AND ? BETWEEN l.start_date AND l.end_date
          AND (l.leave_type IS NULL OR (
            l.leave_type NOT IN ('WFH', 'Remote', 'Work From Home', 'Remote Login')
            AND l.leave_type NOT LIKE '%WFH%'
            AND l.leave_type NOT LIKE '%Remote%'
            AND l.leave_type NOT LIKE '%Work From Home%'
          ))`,
      [teamIds, targetDate]
    );

    // Get WFH / Remote requests for team members for today
    let wfhRemoteRecords = [];
    try {
      const [wfhRemote] = await c.query(
        `SELECT 
            l.*, 
            e.EmployeeNumber, e.FirstName, e.LastName, e.WorkEmail
          FROM leaves l
          INNER JOIN employees e ON l.employee_id = e.id
          WHERE l.employee_id IN (?)
            AND l.status IN ('approved', 'pending')
            AND ? BETWEEN l.start_date AND l.end_date
            AND (
              l.leave_type IN ('WFH', 'Remote', 'Work From Home', 'Remote Login')
              OR l.leave_type LIKE '%WFH%'
              OR l.leave_type LIKE '%Remote%'
              OR l.leave_type LIKE '%Work From Home%'
            )`,
        [teamIds, targetDate]
      );
      wfhRemoteRecords = wfhRemote || [];
    } catch (_) { }

    c.end();

    const attendanceMap = new Map();
    attendance.forEach((a) => {
      attendanceMap.set(a.employee_id, { ...a });
    });

    // If an employee punched in and has an approved/pending WFH/Remote record for today, ensure their work_mode reflects it
    if (wfhRemoteRecords && wfhRemoteRecords.length > 0) {
      wfhRemoteRecords.forEach((wr) => {
        const att = attendanceMap.get(wr.employee_id);
        if (att && (!att.work_mode || att.work_mode === 'Office')) {
          att.work_mode = wr.leave_type;
        }
      });
    }

    const bioPunchMap = new Map();
    bioPunchesSummary.forEach((bp) => {
      bioPunchMap.set(bp.employee_id, bp);
    });

    const teamMap = new Map();
    team.forEach((tm) => {
      teamMap.set(tm.id, tm);
    });

    // Merge biometric daily records
    bioDailyList.forEach((bd) => {
      const existing = attendanceMap.get(bd.employee_id);
      const bp = bioPunchMap.get(bd.employee_id);
      if (existing) {
        if (bp) {
          existing.total_punches = (existing.total_punches || 0) + (bp.punch_count || 0);
        }
      } else {
        const empInfo = teamMap.get(bd.employee_id) || bd;
        attendanceMap.set(bd.employee_id, {
          id: `bio_${bd.id}`,
          employee_id: bd.employee_id,
          attendance_date: targetDate,
          first_in: bd.first_punch_in ? `${targetDate} ${String(bd.first_punch_in).substring(0, 8)}` : (bp?.first_punch || null),
          last_out: bd.last_punch_out ? `${targetDate} ${String(bd.last_punch_out).substring(0, 8)}` : (bp?.last_punch || null),
          first_check_in: bd.first_punch_in ? `${targetDate} ${String(bd.first_punch_in).substring(0, 8)}` : (bp?.first_punch || null),
          last_check_out: bd.last_punch_out ? `${targetDate} ${String(bd.last_punch_out).substring(0, 8)}` : (bp?.last_punch || null),
          total_hours: bd.gross_hours || '0.00',
          gross_hours: bd.gross_hours || '0.00',
          total_work_hours: bd.gross_hours || '0.00',
          status: bd.status === 'half_day' ? 'half-day' : (bd.status || 'present'),
          work_mode: 'Biometric',
          location: 'Biometric Device',
          total_punches: bd.total_punches || bp?.punch_count || 1,
          EmployeeNumber: empInfo.EmployeeNumber,
          FirstName: empInfo.FirstName,
          LastName: empInfo.LastName
        });
      }
    });

    // Also merge any employee who has punches in biometric_punches but not yet daily aggregate
    bioPunchesSummary.forEach((bp) => {
      if (!attendanceMap.has(bp.employee_id)) {
        const empInfo = teamMap.get(bp.employee_id);
        if (empInfo) {
          attendanceMap.set(bp.employee_id, {
            id: `bio_p_${bp.employee_id}`,
            employee_id: bp.employee_id,
            attendance_date: targetDate,
            first_in: bp.first_punch,
            last_out: bp.last_punch !== bp.first_punch ? bp.last_punch : null,
            first_check_in: bp.first_punch,
            last_check_out: bp.last_punch !== bp.first_punch ? bp.last_punch : null,
            total_hours: '0.00',
            gross_hours: '0.00',
            total_work_hours: '0.00',
            status: 'present',
            work_mode: 'Biometric',
            location: 'Biometric Device',
            total_punches: bp.punch_count,
            EmployeeNumber: empInfo.EmployeeNumber,
            FirstName: empInfo.FirstName,
            LastName: empInfo.LastName
          });
        }
      }
    });

    const combinedAttendance = Array.from(attendanceMap.values());

    // Merge attendance and leave info for summary
    // Employees with attendance record marked as 'on-leave' OR with approved leave for today
    const attendanceOnLeaveIds = combinedAttendance
      .filter((a) => a.status === "on-leave")
      .map((a) => a.employee_id);
    const leaveOnLeaveIds = onLeave.map((l) => l.employee_id);
    const uniqueOnLeaveIds = Array.from(
      new Set([...attendanceOnLeaveIds, ...leaveOnLeaveIds])
    );
    const presentCount = combinedAttendance.filter((a) => a.status === "present" || a.status === "in" || a.status === "half-day").length;

    res.json({
      team_members: team,
      date: targetDate,
      current_user_id: emp.id, // Helps frontend highlight the logged-in user
      attendance: combinedAttendance,
      on_leave: onLeave, // List of actual leave records for today (excluding WFH/Remote)
      wfh_remote: wfhRemoteRecords, // List of WFH/Remote records for today
      summary: {
        total_team: team.length,
        present: presentCount,
        absent: Math.max(0, team.length - presentCount - uniqueOnLeaveIds.length),
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
  // Get all web punches for this attendance
  const [punches] = await connection.query(
    `SELECT id, punch_type, punch_time, notes, 'web' as source FROM attendance_punches
         WHERE attendance_id = ? 
         ORDER BY punch_time ASC, id ASC`,
    [attendanceId]
  );

  const [attRows] = await connection.query(
    `SELECT employee_id, DATE_FORMAT(attendance_date, '%Y-%m-%d') as att_date FROM attendance WHERE id = ?`,
    [attendanceId]
  );

  let allPunches = punches.map(p => ({ ...p, punch_time: toMySQLDateTime(new Date(p.punch_time)) }));
  if (attRows.length > 0) {
    const empId = attRows[0].employee_id;
    const attDate = attRows[0].att_date;
    try {
      const [bioPunches] = await connection.query(
        `SELECT id, direction, DATE_FORMAT(punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 'Biometric' as notes, 'biometric' as source 
         FROM biometric_punches
         WHERE employee_id = ? AND (
           punch_date = ? 
           OR (DATE(punch_time) = DATE_ADD(?, INTERVAL 1 DAY) AND HOUR(punch_time) < 7)
         )
         AND NOT (DATE(punch_time) = ? AND HOUR(punch_time) < 7 AND punch_date < ?)
         ORDER BY punch_time ASC`,
        [empId, attDate, attDate, attDate, attDate]
      );
      if (bioPunches && bioPunches.length > 0) {
        let bioOpen = false;
        const mappedBio = bioPunches.map(p => {
          let pt = p.direction === 'out' ? 'out' : (p.direction === 'in' ? 'in' : (bioOpen ? 'out' : 'in'));
          if (pt === 'in') bioOpen = true;
          else if (pt === 'out') bioOpen = false;
          return { ...p, punch_type: pt };
        });
        allPunches = [...allPunches, ...mappedBio];
      }
    } catch (_) { }
  }

  allPunches.sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());

  const todayStr = toMySQLDate(new Date());
  const isToday = attRows.length > 0 && attRows[0].att_date === todayStr;
  const metrics = calculateAttendanceMetrics(allPunches, isToday);

  const earliestPunch = allPunches.length > 0 ? allPunches[0].punch_time : null;
  const lastPunch = allPunches.length > 0 ? allPunches[allPunches.length - 1] : null;
  const lastValidOut = lastPunch && lastPunch.punch_type === 'out' ? lastPunch.punch_time : null;

  // Update attendance record with unified metrics
  await connection.query(
    `UPDATE attendance 
         SET first_check_in = COALESCE(?, first_check_in),
             last_check_out = ?, 
             total_work_hours = ?, 
             total_break_hours = ?, 
             gross_hours = ?
         WHERE id = ?`,
    [
      earliestPunch,
      lastValidOut,
      metrics.totalWorkHours,
      metrics.totalBreakHours,
      metrics.grossHours,
      attendanceId,
    ]
  );

  return { totalWorkHours: metrics.totalWorkHours, totalBreakHours: metrics.totalBreakHours, grossHours: metrics.grossHours };
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

    const today = toMySQLDate(new Date());
    const now = toMySQLDateTime(new Date());

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
        return res.json({
          success: true,
          message: "You are already checked in",
          alreadyActive: true
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

    const today = toMySQLDate(new Date());
    const now = toMySQLDateTime(new Date());

    // Check if employee has an active open punch-in across recent sessions (including yesterday)
    const [latestWebPunch] = await c.query(
      `SELECT ap.id, ap.attendance_id, ap.punch_type, ap.punch_time, ap.punch_date, a.attendance_date, a.work_mode
       FROM attendance_punches ap
       JOIN attendance a ON ap.attendance_id = a.id
       WHERE ap.employee_id = ?
       ORDER BY ap.punch_time DESC, ap.id DESC
       LIMIT 1`,
      [emp.id]
    );

    let attendanceId = null;
    let workMode = "Office";
    let shiftDate = today;

    if (latestWebPunch.length > 0 && latestWebPunch[0].punch_type === 'in') {
      attendanceId = latestWebPunch[0].attendance_id;
      shiftDate = latestWebPunch[0].attendance_date ? toMySQLDate(latestWebPunch[0].attendance_date) : today;
      workMode = latestWebPunch[0].work_mode || "Office";
    } else {
      const [attendance] = await c.query(
        `SELECT id, work_mode FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
        [emp.id, today]
      );
      if (attendance.length > 0) {
        attendanceId = attendance[0].id;
        workMode = attendance[0].work_mode;
      }
    }

    if (!attendanceId) {
      await c.rollback();
      c.end();
      return res.status(400).json({
        error: "No attendance record found. Please check in first.",
      });
    }

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
      return res.json({
        success: true,
        message: "You are already checked out",
        alreadyActive: true
      });
    }

    // Remove any previous auto-clockout ('OUT Missing') on this attendance so real punch-out takes precedence
    await c.query(
      `DELETE FROM attendance_punches WHERE attendance_id = ? AND punch_type = 'out' AND notes = 'OUT Missing'`,
      [attendanceId]
    );

    // Insert punch out record
    await c.query(
      `INSERT INTO attendance_punches 
             (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, notes)
             VALUES (?, ?, 'out', ?, ?, ?, ?, ?)`,
      [attendanceId, emp.id, now, shiftDate, ip_address, device_info, notes]
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

    const today = toMySQLDate(new Date());
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

router.getUnifiedAttendanceDetails = getUnifiedAttendanceDetails;
router.getUnifiedAttendanceListAndSummary = getUnifiedAttendanceListAndSummary;

/* ============================================
   REMOTE CLOCK-IN REQUEST ENDPOINTS
   ============================================ */

// GET /api/attendance/remote-clockin/my-requests
router.get("/remote-clockin/my-requests", auth, async (req, res) => {
  let c = null;
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    c = await db();
    const [rows] = await c.query(
      `SELECT l.*, e.FirstName, e.LastName, e.EmployeeNumber
       FROM leaves l
       LEFT JOIN employees e ON l.employee_id = e.id
       WHERE l.employee_id = ? AND l.leave_type = 'Remote'
       ORDER BY l.applied_at DESC`,
      [emp.id]
    );
    return res.json(rows);
  } catch (error) {
    console.error("Error fetching remote clockin requests:", error);
    return res.status(500).json({ error: error.message });
  } finally {
    if (c) c.end();
  }
});

// GET /api/attendance/remote-clockin/pending (Manager/HR/Admin)
router.get("/remote-clockin/pending", auth, async (req, res) => {
  let c = null;
  try {
    if (!["admin", "hr", "manager"].includes(req.user.role)) {
      return res.json([]);
    }
    c = await db();
    let query = `
      SELECT l.*, e.FirstName, e.LastName, e.EmployeeNumber
      FROM leaves l
      LEFT JOIN employees e ON l.employee_id = e.id
      WHERE l.leave_type = 'Remote' AND l.status = 'pending'
    `;
    const params = [];
    if (req.user.role === 'manager') {
      const managerEmp = await findEmployeeByUserId(req.user.id);
      if (managerEmp) {
        query += ` AND e.reporting_manager_id = ?`;
        params.push(managerEmp.id);
      }
    }
    query += ` ORDER BY l.applied_at ASC`;
    const [rows] = await c.query(query, params);
    return res.json(rows);
  } catch (error) {
    console.error("Error fetching pending remote clockin requests:", error);
    return res.status(500).json({ error: error.message });
  } finally {
    if (c) c.end();
  }
});

// PUT /api/attendance/remote-clockin/:id/decide (Manager/HR/Admin)
router.put("/remote-clockin/:id/decide", auth, async (req, res) => {
  let c = null;
  try {
    if (!["admin", "hr", "manager"].includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    const { decision, rejected_reason } = req.body;
    const requestId = req.params.id;
    if (!["approved", "rejected"].includes(decision)) {
      return res.status(400).json({ error: "Invalid decision" });
    }

    c = await db();
    const [requestRows] = await c.query("SELECT * FROM leaves WHERE id = ? AND leave_type = 'Remote'", [requestId]);
    if (!requestRows.length) {
      return res.status(404).json({ error: "Remote clock-in request not found" });
    }
    const currentReq = requestRows[0];

    await c.query(
      `UPDATE leaves SET status = ?, remarks = ?, approved_by = ?, updated_at = NOW() WHERE id = ?`,
      [decision, rejected_reason || (decision === 'approved' ? 'Approved' : 'Rejected'), req.user.id, requestId]
    );

    // If approved, update attendance record approval_status to 'approved' for those dates
    if (decision === 'approved') {
      await c.query(
        `UPDATE attendance SET approval_status = 'approved'
         WHERE employee_id = ? AND work_mode = 'Remote' AND attendance_date BETWEEN DATE(?) AND DATE(?)`,
        [currentReq.employee_id, currentReq.start_date, currentReq.end_date]
      );
    }

    return res.json({ success: true, message: `Remote clock-in request ${decision} successfully` });
  } catch (error) {
    console.error("Error deciding remote clockin request:", error);
    return res.status(500).json({ error: error.message });
  } finally {
    if (c) c.end();
  }
});

module.exports = router;
