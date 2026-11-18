const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const empId = 286;

    console.log('\n================ 17 NOV 2026 biometric_attendance_raw ================');
    const [raw17] = await conn.query("SELECT * FROM biometric_attendance_raw WHERE (biometric_user_id LIKE '%1281%') AND punch_time >= '2026-11-17 00:00:00' AND punch_time <= '2026-11-17 23:59:59' ORDER BY punch_time ASC");
    raw17.forEach((b, i) => console.log(`${i+1}. [${b.id}] ${b.punch_time} -> dir: ${b.punch_direction}, type: ${b.punch_type}, status: ${b.raw_status}`));

    console.log('\n================ 17 NOV 2026 attendance_punches ================');
    const [att17] = await conn.query("SELECT * FROM attendance_punches WHERE employee_id = ? AND punch_time >= '2026-11-17 00:00:00' AND punch_time <= '2026-11-17 23:59:59' ORDER BY punch_time ASC", [empId]);
    att17.forEach((p, i) => console.log(`${i+1}. [${p.id}] ${p.punch_time} -> type: ${p.punch_type}, mode: ${p.work_mode}, notes: ${p.notes}`));

    console.log('\n================ 18 NOV 2026 attendance_punches ================');
    const [att18] = await conn.query("SELECT * FROM attendance_punches WHERE employee_id = ? AND punch_time >= '2026-11-18 00:00:00' AND punch_time <= '2026-11-18 23:59:59' ORDER BY punch_time ASC", [empId]);
    att18.forEach((p, i) => console.log(`${i+1}. [${p.id}] ${p.punch_time} -> type: ${p.punch_type}, mode: ${p.work_mode}, notes: ${p.notes}`));

    console.log('\n================ 17 & 18 NOV ATTENDANCE RECORD ================');
    const [attRecord] = await conn.query("SELECT id, employee_id, attendance_date, first_check_in, last_check_out, total_work_hours, gross_hours, total_break_hours, effective_hours, status FROM attendance WHERE employee_id = ? AND attendance_date IN ('2026-11-17', '2026-11-18')", [empId]);
    console.log(attRecord);

  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();
