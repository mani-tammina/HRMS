const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const [cols] = await conn.query('DESCRIBE attendance_punches');
    console.log('attendance_punches columns:', cols.map(c => c.Field));
    const [punches] = await conn.query("SELECT * FROM attendance_punches WHERE employee_id = 170 AND punch_time >= '2026-11-18 00:00:00'");
    console.log('punches:', punches);
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();
