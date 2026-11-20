const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const [braw] = await conn.query("SELECT * FROM biometric_attendance_raw WHERE punch_time LIKE '%09:28:40%'");
    console.log('biometric_attendance_raw:', braw);
    const [bp] = await conn.query("SELECT * FROM biometric_punches WHERE punch_time LIKE '%09:28:40%'");
    console.log('biometric_punches:', bp);
    const [ap] = await conn.query("SELECT * FROM attendance_punches WHERE punch_time LIKE '%09:28:40%'");
    console.log('attendance_punches:', ap);
    const [att] = await conn.query("SELECT * FROM attendance WHERE first_check_in LIKE '%09:28:40%'");
    console.log('attendance first_check_in:', att);
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();
