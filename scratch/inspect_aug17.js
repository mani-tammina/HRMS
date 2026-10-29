const { db } = require('../config/database');

async function main() {
  const c = await db();
  const [rows] = await c.query('SELECT a.id, a.employee_id, a.attendance_date, a.total_work_hours, a.gross_hours FROM attendance a WHERE a.attendance_date = "2026-08-17"');
  console.log('Aug 17 rows:', rows.length);
  for (const r of rows.slice(0, 10)) {
    const [punches] = await c.query('SELECT id, punch_type, punch_time, notes FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC, id ASC', [r.id]);
    console.log(`\nAttendance ${r.id} (emp ${r.employee_id}):`, punches);
  }
  await c.end();
}

main().catch(console.error);
