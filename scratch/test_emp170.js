const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    // Fetch details for employee 170 on 2026-11-18 exactly as getUnifiedAttendanceDetails does!
    const empId = 170;
    const date = '2026-11-18';
    
    // Web punches:
    // Notice in the screenshot: Web Clock In 9:28:40
    // Let's check where the web clock in 9:28:40 came from:
    const [attRows] = await conn.query("SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?", [empId, date]);
    console.log('Attendance row:', attRows);

    const [webPunches] = await conn.query("SELECT * FROM attendance_punches WHERE employee_id = ? AND punch_time >= '2026-11-18 00:00:00'", [empId]);
    console.log('Web punches:', webPunches);

    // Let's check all punches for 170 across all tables on 18 Nov:
    const [bioPunches] = await conn.query("SELECT * FROM biometric_punches WHERE employee_id = ? AND (punch_date = '2026-11-18' OR DATE(punch_time) = '2026-11-18') ORDER BY punch_time ASC", [empId]);
    console.log('Bio punches count:', bioPunches.length);

  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

