const { db } = require('../config/database');
const routes = require('../routes/attendance-enhanced.routes');

async function run() {
  let conn;
  try {
    conn = await db();
    // Let's see what punches exist for 566 on 16 Nov across web and bio
    const [webRange] = await conn.query("SELECT * FROM attendance_punches WHERE employee_id = 566 AND punch_time >= '2026-11-16 00:00:00' AND punch_time <= '2026-11-16 23:59:59'");
    console.log('Web punches for 566 on 16 Nov:', webRange);

    const [bioRange] = await conn.query("SELECT * FROM biometric_punches WHERE employee_id = 566 AND punch_time >= '2026-11-16 00:00:00' AND punch_time <= '2026-11-16 23:59:59'");
    console.log('Bio punches for 566 on 16 Nov count:', bioRange.length);

  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

