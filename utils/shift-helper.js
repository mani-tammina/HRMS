/**
 * SHIFT HELPER UTILITY
 * ====================
 * Provides centralized shift policy detection, overnight shift determination,
 * and shift date attribution for punches (Web and Biometric).
 */

/**
 * Check if a shift is an overnight shift (crosses midnight)
 * E.g., start_time: "19:30:00", end_time: "04:30:00" -> start_time > end_time
 *
 * @param {string} startTime - 'HH:mm:ss'
 * @param {string} endTime - 'HH:mm:ss'
 * @returns {boolean}
 */
function isOvernightShift(startTime, endTime) {
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
 * @returns {number} cutoff hour (e.g. 12.0)
 */
function getOvernightCutoffHour(startTime, endTime) {
  if (!startTime || !endTime) return 12;
  const [sH, sM] = String(startTime).split(':').map(Number);
  const [eH, eM] = String(endTime).split(':').map(Number);
  const startMins = (sH || 0) * 60 + (sM || 0);
  const endMins = (eH || 0) * 60 + (eM || 0);
  if (startMins <= endMins) return 12; // Not overnight
  // Daytime gap between end_time and start_time
  const gap = startMins - endMins;
  const midMins = endMins + gap / 2;
  return midMins / 60;
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
  const startTime = emp.project_start_time || emp.start_time || '09:00:00';
  const endTime = emp.project_end_time || emp.end_time || '18:00:00';
  const isOvernight = isOvernightShift(startTime, endTime);
  const cutoffHour = isOvernight ? getOvernightCutoffHour(startTime, endTime) : 12;

  return {
    shift_name: emp.project_shift_name || emp.shift_policy_name || 'Standard Day Shift',
    start_time: startTime,
    end_time: endTime,
    is_overnight: isOvernight,
    cutoff_hour: cutoffHour,
    break_duration_minutes: emp.break_duration_minutes || 60
  };
}

/**
 * Determine the shift date ('YYYY-MM-DD') for a given punch timestamp and shift policy.
 *
 * If shift is overnight (e.g. 19:30 to 04:30):
 * - If punch time is before the morning cutoff (e.g. < 12:00:00), it belongs to previous calendar day!
 * - If punch time is after cutoff (>= 12:00:00), it belongs to current calendar day!
 *
 * @param {Object|null} shift - Shift policy object with is_overnight and cutoff_hour
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
  if (!shift || !shift.is_overnight) {
    return calDateStr;
  }

  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(d);

  const [h, m] = timeStr.split(':').map(Number);
  const hourVal = h + (m || 0) / 60;
  const cutoff = shift.cutoff_hour || 12;

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
  getEmployeeEffectiveShift,
  getShiftDateForPunch,
  addDaysToDate
};
