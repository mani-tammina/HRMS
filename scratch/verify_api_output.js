const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const [p] = await conn.query("SELECT punch_time, direction FROM biometric_punches WHERE employee_id = 170 AND punch_date = '2026-11-18' ORDER BY punch_time ASC");
    console.log('18 Nov punches for 170:');
    p.forEach((x, i) => console.log(`${i+1}. ${x.punch_time} -> ${x.direction}`));
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();
