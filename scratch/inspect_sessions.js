const { db } = require('../config/database');

async function main() {
  const c = await db();
  const [attendances] = await c.query(`
    SELECT a.id, a.employee_id, a.attendance_date, a.total_work_hours, a.gross_hours, e.FirstName, e.LastName
    FROM attendance a
    JOIN employees e ON a.employee_id = e.id
    WHERE a.attendance_date >= '2026-08-20'
    ORDER BY a.attendance_date DESC, a.employee_id ASC
  `);

  console.log(`Found ${attendances.length} attendance records from 2026-08-20`);

  let countWithOutMissing = 0;
  let countWithValidPunches = 0;

  for (const att of attendances) {
    const [punches] = await c.query(
      'SELECT id, punch_type, punch_time, notes, ip_address, device_info FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC, id ASC',
      [att.id]
    );

    const hasOutMissing = punches.some(p => (p.notes || '').includes('OUT Missing'));
    const hasOut = punches.some(p => p.punch_type === 'out' && !(p.notes || '').includes('OUT Missing'));

    if (hasOutMissing) countWithOutMissing++;
    if (hasOut) countWithValidPunches++;

    if (hasOutMissing && (punches.length > 2 || hasOut)) {
      console.log(`\n==============================================`);
      console.log(`Attendance ID: ${att.id} | Date: ${att.attendance_date.toISOString().split('T')[0]} | Emp: ${att.employee_id} (${att.FirstName} ${att.LastName})`);
      console.log(`Current DB: work_hours=${att.total_work_hours}, gross_hours=${att.gross_hours}`);
      console.log('Punches:');
      punches.forEach(p => console.log(`  [${p.punch_type.toUpperCase()}] ${p.punch_time.toISOString()} - notes: "${p.notes || ''}"`));
    }
  }

  console.log(`\nTotal with OUT Missing: ${countWithOutMissing}, Total with valid OUT: ${countWithValidPunches}`);
  await c.end();
}

main().catch(console.error);
