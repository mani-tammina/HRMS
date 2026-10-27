/**
 * SHIFT HELPER UTILITY
 * ====================
 * Provides centralized shift policy detection, overnight shift determination,
 * and shift date attribution for punches (Web and Biometric).
 */

/**
 * Check if a shift is an overnight shift (crosses midnight)
 * E.g., start_time: "19:30:00", end_time: "04:30:00" -> start_time > end_time
 * Also checks shiftName/shiftType for night/graveyard/overnight keywords.
 *
 * @param {string} startTime - 'HH:mm:ss'
 * @param {string} endTime - 'HH:mm:ss'
 * @param {string} [shiftName] - Optional shift name
 * @returns {boolean}
 */
function isOvernightShift(startTime, endTime, shiftName = '') {
  if (shiftName && /night|graveyard|overnight|\bns\b/i.test(shiftName)) {
    return true;
  }
  if (!startTime || !endTime) return false;
  const s = String(startTime).slice(0, 5);
  const e = String(endTime).slice(0, 5);
  return s > e;
}

/**
 * Calculate the daytime cutoff hour between end_time and start_time for an overnight shift.
 * Default is 12:00 (midday).
 *
 * @param {string} startTime
 * @param {string} endTime
 * @param {string} [shiftName]
 * @returns {number} cutoff hour (e.g. 12.0)
 */
function getOvernightCutoffHour(startTime, endTime, shiftName = '') {
  if (!startTime || !endTime) return 12;
  const [sH, sM] = String(startTime).split(':').map(Number);
  const [eH, eM] = String(endTime).split(':').map(Number);
  const startMins = (sH || 0) * 60 + (sM || 0);
  const endMins = (eH || 0) * 60 + (eM || 0);
  if (startMins > endMins) {
    const gap = startMins - endMins;
    const midMins = endMins + gap / 2;
    return midMins / 60;
  }
  if (isOvernightShift(startTime, endTime, shiftName)) {
    return 12;
  }
  return 12;
}

/**
 * Calculate morning cutoff hour for day shifts.
 * Punches before this cutoff (e.g. 05:00 AM) belong to the previous day's shift.
 *
 * @param {string} startTime
 * @returns {number} morning cutoff hour (e.g. 7.0 for 07:00 AM)
 */
function getMorningCutoffHour(startTime) {
  if (!startTime) return 7.0;
  const [sH, sM] = String(startTime).split(':').map(Number);
  const startHourVal = (sH || 9) + (sM || 0) / 60;
  if (startHourVal < 7.0) {
    return Math.max(0, startHourVal - 1.5);
  }
  return 7.0;
}

/**
 * Get employee's effective shift policy from database
 *
 * @param {Object} connection - MySQL database connection or pool
 * @param {number} employeeId - Employee ID
 * @returns {Promise<Object|null>}
 */
async function getEmployeeEffectiveShift(connection, employeeId) {
  if (!employeeId) return null;
  const [rows] = await connection.query(`
    SELECT 
      e.id AS employee_id,
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

  if (!rows || rows.length === 0) return null;
  const emp = rows[0];
  const shiftName = emp.project_shift_name || emp.shift_policy_name || 'Standard Day Shift';
  const startTime = emp.project_start_time || emp.start_time || '09:00:00';
  const endTime = emp.project_end_time || emp.end_time || '18:00:00';
  const isOvernight = isOvernightShift(startTime, endTime, shiftName);
  const cutoffHour = isOvernight ? getOvernightCutoffHour(startTime, endTime, shiftName) : 12;
  const morningCutoffHour = getMorningCutoffHour(startTime);

  return {
    shift_name: shiftName,
    start_time: startTime,
    end_time: endTime,
    is_overnight: isOvernight,
    cutoff_hour: cutoffHour,
    morning_cutoff_hour: morningCutoffHour,
    break_duration_minutes: emp.break_duration_minutes || 60
  };
}

/**
 * Determine the shift date ('YYYY-MM-DD') for a given punch timestamp and shift policy.
 *
 * For overnight shifts:
 * - If punch time is before midday cutoff (e.g. < 12:00:00), it belongs to previous calendar day!
 * - If punch time is after cutoff (>= 12:00:00), it belongs to current calendar day!
 *
 * For day shifts (e.g. 10:00 AM to 7:00 PM):
 * - If employee worked late into next day morning (e.g. punch at 04:42 AM or 05:00 AM < 07:00:00),
 *   it belongs to previous calendar day!
 *
 * @param {Object|null} shift - Shift policy object with is_overnight, cutoff_hour, morning_cutoff_hour
 * @param {Date|string} punchDateOrTime - Timestamp or Date object
 * @returns {string} 'YYYY-MM-DD'
 */
function getShiftDateForPunch(shift, punchDateOrTime) {
  let d;
  if (!punchDateOrTime) {
    d = new Date();
  } else if (punchDateOrTime instanceof Date) {
    d = punchDateOrTime;
  } else if (typeof punchDateOrTime === 'string') {
    const clean = punchDateOrTime.trim();
    if (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}/.test(clean)) {
      d = new Date(clean.replace(' ', 'T') + '+05:30');
    } else {
      d = new Date(clean);
    }
  } else {
    d = new Date(punchDateOrTime);
  }

  if (isNaN(d.getTime())) {
    d = new Date();
  }

  const calDateStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(d);

  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(d);

  const [h, m] = timeStr.split(':').map(Number);
  const hourVal = h + (m || 0) / 60;

  // Determine cutoff hour: for overnight shifts, cutoff is midday (~12:00); for day shifts, morning cutoff (~07:00)
  let cutoff = 7.0;
  if (shift && shift.is_overnight) {
    cutoff = shift.cutoff_hour || 12.0;
  } else if (shift && shift.morning_cutoff_hour) {
    cutoff = shift.morning_cutoff_hour;
  } else if (shift && shift.start_time) {
    cutoff = getMorningCutoffHour(shift.start_time);
  }

  if (hourVal < cutoff) {
    // Early morning punch belonging to shift that started on previous day
    const prev = new Date(d.getTime() - 24 * 60 * 60 * 1000);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(prev);
  }

  return calDateStr;
}

/**
 * Add N days to 'YYYY-MM-DD' string
 */
function addDaysToDate(dateStr, days) {
  const [y, m, d] = String(dateStr).split('-').map(Number);
  const dateObj = new Date(y, m - 1, d + days);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(dateObj);
}

module.exports = {
  isOvernightShift,
  getOvernightCutoffHour,
  getMorningCutoffHour,
  getEmployeeEffectiveShift,
  getShiftDateForPunch,
  addDaysToDate
};
