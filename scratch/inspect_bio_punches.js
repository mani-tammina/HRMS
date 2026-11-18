const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const empId = 286;

    console.log('\n================ 17 NOV 2026 biometric_punches ================');
    const [bio17] = await conn.query("SELECT id, employee_id, device_id, punch_time, punch_date, direction FROM biometric_punches WHERE employee_id = ? AND (punch_date = '2026-11-17' OR DATE(punch_time) = '2026-11-17') ORDER BY punch_time ASC", [empId]);
    bio17.forEach((b, i) => console.log(`${i+1}. [${b.id}] dev:${b.device_id} ${b.punch_time} -> dir: ${b.direction}`));

    console.log('\n================ 18 NOV 2026 biometric_punches ================');
    const [bio18] = await conn.query("SELECT id, employee_id, device_id, punch_time, punch_date, direction FROM biometric_punches WHERE employee_id = ? AND (punch_date = '2026-11-18' OR DATE(punch_time) = '2026-11-18') ORDER BY punch_time ASC", [empId]);
    bio18.forEach((b, i) => console.log(`${i+1}. [${b.id}] dev:${b.device_id} ${b.punch_time} -> dir: ${b.direction}`));

  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

