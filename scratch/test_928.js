const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const [ap] = await conn.query("SELECT * FROM attendance_punches WHERE punch_time >= '2026-11-18 09:28:00' AND punch_time <= '2026-11-18 09:29:00'");
    console.log('attendance_punches 18th 9:28:', ap);
    const [att] = await conn.query("SELECT * FROM attendance WHERE attendance_date = '2026-11-18' AND (first_check_in LIKE '%09:28%' OR last_check_out LIKE '%09:28%')");
    console.log('attendance 18th 9:28:', att);
    const [bp] = await conn.query("SELECT * FROM biometric_punches WHERE punch_time >= '2026-11-18 09:28:00' AND punch_time <= '2026-11-18 09:29:00'");
    console.log('biometric_punches 18th 9:28:', bp);
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

