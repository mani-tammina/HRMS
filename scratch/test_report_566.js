const { db } = require('../config/database');
const routes = require('../routes/attendance-enhanced.routes');

async function run() {
  let conn;
  try {
    conn = await db();
    const rep = await routes.getUnifiedAttendanceListAndSummary(conn, 566, '2026-11-01', '2026-11-30', 11, 2026);
    const day16 = rep.attendance.find(a => (a.attendance_date || '').includes('2026-11-16'));
    console.log('Day 16 attendance from API:');
    console.log(day16);
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

