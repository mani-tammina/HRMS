const { db } = require('../config/database');

async function main() {
  const c = await db();
  const [rows] = await c.query('SELECT a.id, a.employee_id, a.attendance_date, a.total_work_hours, a.gross_hours, e.FirstName, e.LastName FROM attendance a LEFT JOIN employees e ON a.employee_id = e.id WHERE a.attendance_date = "2026-08-25"');
  console.log('Aug 25 attendance count:', rows.length);
  for (const r of rows) {
    const [punches] = await c.query('SELECT id, punch_type, punch_time, notes, ip_address, device_info FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC, id ASC', [r.id]);
    if (punches.length > 1) {
      console.log(`\nAtt ${r.id} (emp ${r.employee_id} - ${r.FirstName} ${r.LastName}): work=${r.total_work_hours}, gross=${r.gross_hours}`);
      console.log(punches);
    }
  }
  await c.end();
}

main().catch(console.error);
