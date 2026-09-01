/**
 * AUTO CLOCK-OUT SERVICE
 * ============================================
 * Automatically clocks out employees 2 hours after their shift ending time
 * if they have not manually clocked out.
 */

const { db } = require('../config/database');
const cron = require('node-cron');

class AutoClockOutService {
  constructor() {
    this.cronTask = null;
    this.isRunning = false;
    this.isProcessing = false;
  }

  /**
   * Start the recurring background cron job and run an initial sweep on startup.
   */
  start() {
    if (this.isRunning) {
      console.log('⚠️  [AutoClockOut] Service is already running');
      return;
    }

    // Run immediately on startup to resolve any past overdue punches
    this.processAllPendingAutoClockOuts().catch(err => {
      console.error('❌ [AutoClockOut] Initial sweep error:', err.message);
    });

    // Schedule to run every 1 minute
    this.cronTask = cron.schedule('* * * * *', () => {
      this.processAllPendingAutoClockOuts().catch(err => {
        console.error('❌ [AutoClockOut] Scheduled sweep error:', err.message);
      });
    });

    this.isRunning = true;
    console.log('✅ [AutoClockOut] Background service started (running every 1 minute)');
  }

  /**
   * Stop the background service.
   */
  stop() {
    if (this.cronTask) {
      this.cronTask.stop();
      this.cronTask = null;
    }
    this.isRunning = false;
    console.log('🛑 [AutoClockOut] Background service stopped');
  }

  /**
   * Helper to format a Date into 'YYYY-MM-DD HH:mm:ss' (MySQL DATETIME format) in local time
   */
  formatToMySQLDateTime(dateObj) {
    const d = new Date(dateObj);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * Helper to format a Date into 'YYYY-MM-DD'
   */
  formatToDateOnly(dateObj) {
    const d = new Date(dateObj);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Calculate shift start, shift end, duration, and auto clock-out cutoff (shift end + 2 hours).
   * 
   * @param {Date|string} punchInTime - Time when employee clocked in
   * @param {Object|null} shiftPolicy - Shift policy object with start_time and end_time
   * @param {string|Date} attendanceDate - 'YYYY-MM-DD' string or Date
   * @returns {Object} { shiftStartTime, shiftEndTime, shiftDurationHours, autoClockOutTime, isOverdue }
   */
  calculateShiftAndAutoClockOut(punchInTime, shiftPolicy, attendanceDate) {
    const pIn = new Date(punchInTime);
    let dateStr = '';
    if (typeof attendanceDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(attendanceDate)) {
      dateStr = attendanceDate;
    } else if (attendanceDate instanceof Date && !isNaN(attendanceDate.getTime())) {
      dateStr = this.formatToDateOnly(attendanceDate);
    } else {
      dateStr = this.formatToDateOnly(pIn);
    }

    let shiftStart = null;
    let shiftEnd = null;
    let shiftDurationHours = 9;

    if (shiftPolicy && shiftPolicy.start_time && shiftPolicy.end_time) {
      const [sH, sM, sS] = String(shiftPolicy.start_time).split(':').map(Number);
      const [eH, eM, eS] = String(shiftPolicy.end_time).split(':').map(Number);

      const [year, month, day] = dateStr.split('-').map(Number);
      shiftStart = new Date(year, month - 1, day, sH || 0, sM || 0, sS || 0);
      shiftEnd = new Date(year, month - 1, day, eH || 0, eM || 0, eS || 0);

      // Handle night/overnight shift where end_time <= start_time (e.g. 21:00 to 06:00 next day)
      if (shiftEnd <= shiftStart) {
        shiftEnd.setDate(shiftEnd.getDate() + 1);
      }

      // Calculate shift duration in hours
      const diffMs = shiftEnd.getTime() - shiftStart.getTime();
      shiftDurationHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
    } else {
      // Default to 9-hour shift starting at 09:00 or from punch-in
      const [year, month, day] = dateStr.split('-').map(Number);
      shiftStart = new Date(year, month - 1, day, 9, 0, 0);
      shiftEnd = new Date(year, month - 1, day, 18, 0, 0);
      shiftDurationHours = 9;
    }

    // Auto clock-out cutoff is Shift Ending Time + 2 hours
    const autoClockOutTime = new Date(shiftEnd.getTime() + 2 * 60 * 60 * 1000);
    const now = new Date();
    const isOverdue = now >= autoClockOutTime;

    return {
      shiftStartTime: shiftStart,
      shiftEndTime: shiftEnd,
      shiftDurationHours,
      autoClockOutTime,
      isOverdue
    };
  }

  /**
   * Recalculates and updates attendance totals (work hours, break hours, gross hours, last_check_out)
   */
  async calculateAndUpdateHours(connection, attendanceId) {
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
          // Another IN without an OUT: if gap > 15 mins, start new session
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

    await connection.query(
      `UPDATE attendance 
       SET last_check_out = ?, 
           total_work_hours = ?, 
           total_break_hours = ?, 
           gross_hours = ?
       WHERE id = ?`,
      [lastValidCheckOut, totalWorkHours, totalBreakHours, grossHours, attendanceId]
    );

    return { totalWorkHours, totalBreakHours, grossHours };
  }

  /**
   * Execute auto clock-out for a specific employee and attendance record if overdue.
   * 
   * @param {Object} connection - MySQL connection
   * @param {number} employeeId - Employee ID
   * @param {string|Date} [targetDate] - Optional specific date (YYYY-MM-DD)
   * @returns {Promise<Object|null>} Auto clock-out result or null
   */
  async processAutoClockOutForEmployee(connection, employeeId, targetDate = null) {
    // 1. Fetch employee shift policy and project shift if any
    const [empRows] = await connection.query(`
      SELECT 
        e.id AS employee_id,
        e.FirstName,
        e.LastName,
        e.WorkEmail,
        e.EmployeeNumber,
        e.shift_policy_id,
        sp.name AS shift_policy_name,
        sp.shift_type,
        sp.start_time,
        sp.end_time,
        sp.break_duration_minutes,
        ps.shift_name AS project_shift_name,
        ps.start_time AS project_start_time,
        ps.end_time AS project_end_time,
        u.id AS user_id
      FROM employees e
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LEFT JOIN project_assignments pa ON e.id = pa.employee_id AND pa.status = 'active'
      LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
      LEFT JOIN users u ON (u.username = e.WorkEmail OR u.username = e.EmployeeNumber)
      WHERE e.id = ?
      LIMIT 1
    `, [employeeId]);

    if (!empRows || empRows.length === 0) return null;
    const emp = empRows[0];

    // Priority to project shift timings if assigned, otherwise shift policy, otherwise standard
    const effectiveShift = {
      start_time: emp.project_start_time || emp.start_time || '09:00:00',
      end_time: emp.project_end_time || emp.end_time || '18:00:00',
      shift_type: emp.shift_type || 'general',
      break_duration_minutes: emp.break_duration_minutes || 60
    };

    // 2. Find open attendance records where last punch is 'in'
    let dateCondition = '';
    const params = [employeeId];
    if (targetDate) {
      dateCondition = 'AND a.attendance_date = ?';
      params.push(targetDate);
    }

    const [openAttendances] = await connection.query(`
      SELECT 
        a.id AS attendance_id,
        a.employee_id,
        a.attendance_date,
        a.first_check_in,
        a.work_mode,
        a.location
      FROM attendance a
      WHERE a.employee_id = ? ${dateCondition}
      ORDER BY a.attendance_date DESC
    `, params);

    for (const att of openAttendances) {
      // Check last punch for this attendance
      const [lastPunchRows] = await connection.query(`
        SELECT id, punch_type, punch_time, punch_date, notes
        FROM attendance_punches
        WHERE attendance_id = ?
        ORDER BY id DESC
        LIMIT 1
      `, [att.attendance_id]);

      if (lastPunchRows.length === 0 || lastPunchRows[0].punch_type !== 'in') {
        continue; // Not currently punched in
      }

      const activePunch = lastPunchRows[0];
      const punchInTime = new Date(activePunch.punch_time);
      const attDateStr = this.formatToDateOnly(att.attendance_date);

      const timing = this.calculateShiftAndAutoClockOut(punchInTime, effectiveShift, attDateStr);

      if (timing.isOverdue) {
        // Automatically clock out!
        let autoOutDateObj = timing.autoClockOutTime;
        if (autoOutDateObj <= punchInTime) {
          autoOutDateObj = new Date(punchInTime.getTime() + 1000);
        }
        const autoOutTimeMySQL = this.formatToMySQLDateTime(autoOutDateObj);
        const autoOutDate = this.formatToDateOnly(autoOutDateObj);

        const autoNotes = 'OUT Missing';

        // Check if there is already an auto out punch to prevent duplicate insertion
        const [existingAutoOut] = await connection.query(`
          SELECT id FROM attendance_punches
          WHERE attendance_id = ? AND punch_type = 'out' AND notes = 'OUT Missing'
          LIMIT 1
        `, [att.attendance_id]);

        if (existingAutoOut.length > 0) {
          continue;
        }

        // Insert punch out record marked as 'OUT Missing'
        await connection.query(`
          INSERT INTO attendance_punches
            (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, notes)
          VALUES (?, ?, 'out', ?, ?, '127.0.0.1', 'System Auto-Scheduler', ?)
        `, [
          att.attendance_id,
          employeeId,
          autoOutTimeMySQL,
          autoOutDate,
          autoNotes
        ]);

        // Calculate hours up until completed in and out sessions
        await this.calculateAndUpdateHours(connection, att.attendance_id);

        console.log(`🕒 [AutoClockOut] Auto clocked out (OUT Missing) Employee ID ${employeeId} (${emp.FirstName} ${emp.LastName}) for attendance ID ${att.attendance_id} at ${autoOutTimeMySQL}`);

        return {
          clockedOut: true,
          attendanceId: att.attendance_id,
          employeeId,
          autoClockOutTime: timing.autoClockOutTime,
          shiftEndTime: timing.shiftEndTime,
          notes: autoNotes
        };
      }
    }

    return null;
  }

  /**
   * Main sweeper: Scans all active/unclosed punch-ins across the entire database
   * and auto-clocks out any that have exceeded (shift end + 2 hours).
   */
  async processAllPendingAutoClockOuts() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    let connection = null;
    try {
      connection = await db();

      // Find all distinct employees who currently have an active 'in' punch
      const [activePunches] = await connection.query(`
        SELECT 
          ap.id AS punch_id,
          ap.attendance_id,
          ap.employee_id,
          ap.punch_time,
          ap.punch_date,
          a.attendance_date
        FROM attendance_punches ap
        INNER JOIN attendance a ON ap.attendance_id = a.id
        WHERE ap.id IN (
          SELECT MAX(id) 
          FROM attendance_punches 
          GROUP BY attendance_id
        )
        AND ap.punch_type = 'in'
      `);

      if (!activePunches || activePunches.length === 0) {
        return;
      }

      for (const punch of activePunches) {
        try {
          await this.processAutoClockOutForEmployee(
            connection, 
            punch.employee_id, 
            this.formatToDateOnly(punch.attendance_date)
          );
        } catch (empErr) {
          console.error(`❌ [AutoClockOut] Error processing employee ID ${punch.employee_id}:`, empErr.message);
        }
      }
    } catch (err) {
      console.error('❌ [AutoClockOut] Error during sweeping pending punches:', err.message);
    } finally {
      if (connection) {
        try { await connection.end(); } catch (e) { }
      }
      this.isProcessing = false;
    }
  }

  /**
   * Get shift timing and auto clock-out cutoff info for an employee for a specific date
   */
  async getShiftTimingForEmployee(connection, employeeId, targetDate = null) {
    const dateStr = targetDate || this.formatToDateOnly(new Date());

    const [empRows] = await connection.query(`
      SELECT 
        e.id AS employee_id,
        e.FirstName,
        e.LastName,
        e.shift_policy_id,
        sp.name AS shift_policy_name,
        sp.shift_type,
        sp.start_time,
        sp.end_time,
        sp.break_duration_minutes,
        ps.shift_name AS project_shift_name,
        ps.start_time AS project_start_time,
        ps.end_time AS project_end_time
      FROM employees e
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LEFT JOIN project_assignments pa ON e.id = pa.employee_id AND pa.status = 'active'
      LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
      WHERE e.id = ?
      LIMIT 1
    `, [employeeId]);

    if (!empRows || empRows.length === 0) return null;
    const emp = empRows[0];

    const effectiveShift = {
      shift_name: emp.project_shift_name || emp.shift_policy_name || 'Standard Day Shift',
      start_time: emp.project_start_time || emp.start_time || '09:00:00',
      end_time: emp.project_end_time || emp.end_time || '18:00:00',
      shift_type: emp.shift_type || 'general',
      break_duration_minutes: emp.break_duration_minutes || 60
    };

    const timing = this.calculateShiftAndAutoClockOut(new Date(), effectiveShift, dateStr);

    return {
      employeeId,
      shiftPolicyName: effectiveShift.shift_name,
      shiftType: effectiveShift.shift_type,
      startTime: effectiveShift.start_time,
      endTime: effectiveShift.end_time,
      breakDurationMinutes: effectiveShift.break_duration_minutes,
      shiftDurationHours: timing.shiftDurationHours,
      shiftStartTime: timing.shiftStartTime,
      shiftEndTime: timing.shiftEndTime,
      autoClockOutTime: timing.autoClockOutTime,
      autoClockOutGraceHours: 2,
      targetDate: dateStr
    };
  }
}

const autoClockOutService = new AutoClockOutService();
module.exports = autoClockOutService;
