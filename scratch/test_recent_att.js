const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const [allAp] = await conn.query("SELECT * FROM attendance_punches ORDER BY id DESC LIMIT 20");
    console.log('Latest 20 attendance_punches:', allAp);
    const [allAtt] = await conn.query("SELECT * FROM attendance WHERE attendance_date >= '2026-11-17' ORDER BY id DESC LIMIT 20");
    console.log('Attendance >= 2026-11-17:', allAtt);
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

