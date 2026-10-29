const { db } = require('../config/database');

async function inspectAndFix() {
  const c = await db();
  
  // 1. Inspect all punches in attendance_punches
  const [punches] = await c.query(`
    SELECT id, attendance_id, employee_id, punch_type, punch_time, punch_date, created_at, notes,
           TIMESTAMPDIFF(MINUTE, punch_time, created_at) as diff_min
    FROM attendance_punches
    WHERE TIMESTAMPDIFF(MINUTE, punch_time, created_at) BETWEEN 320 AND 340
    ORDER BY id ASC
  `);

  console.log(`Found ${punches.length} punch records with ~5h 30m difference (UTC):`);
  punches.forEach(p => {
    console.log(`ID: ${p.id} | AttID: ${p.attendance_id} | Old Punch: ${p.punch_time} | Created: ${p.created_at} | Notes: ${p.notes}`);
  });

  // 2. Also check attendance table first_check_in / last_check_out
  const [attendances] = await c.query(`
    SELECT id, employee_id, attendance_date, first_check_in, last_check_out, created_at,
           TIMESTAMPDIFF(MINUTE, first_check_in, created_at) as diff_first
    FROM attendance
    WHERE TIMESTAMPDIFF(MINUTE, first_check_in, created_at) BETWEEN 320 AND 340
    ORDER BY id ASC
  `);

  console.log(`\nFound ${attendances.length} attendance rows with ~5h 30m difference in first_check_in:`);
  attendances.forEach(a => {
    console.log(`ID: ${a.id} | Date: ${a.attendance_date} | FirstCheckIn: ${a.first_check_in} | Created: ${a.created_at}`);
  });

  await c.end();
}

inspectAndFix().catch(console.error);
