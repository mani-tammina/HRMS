const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    // Search for the employee with punches at 09:52:01 on 2026-11-16
    const [rows] = await conn.query("SELECT bp.employee_id, e.EmployeeNumber, e.FirstName, e.LastName, bp.punch_time, bp.device_id, bp.direction FROM biometric_punches bp JOIN employees e ON bp.employee_id = e.id WHERE (bp.punch_date = '2026-11-16' OR DATE(bp.punch_time) = '2026-11-16') AND bp.punch_time LIKE '%09:52:01%'");
    console.log('Employee on 16 Nov:', rows);

    if (rows.length) {
      const empId = rows[0].employee_id;
      const [allBio] = await conn.query("SELECT bp.id, bp.device_id, bd.name as device_name, bp.punch_time, bp.direction FROM biometric_punches bp LEFT JOIN biometric_devices bd ON bp.device_id = bd.device_id WHERE bp.employee_id = ? AND (bp.punch_date = '2026-11-16' OR DATE(bp.punch_time) = '2026-11-16') ORDER BY bp.punch_time ASC", [empId]);
      console.log(`All bio punches for 16 Nov (${allBio.length}):`);
      allBio.forEach((b, i) => console.log(`${i+1}. [${b.id}] dev:${b.device_id} (${b.device_name}) ${b.punch_time} -> ${b.direction}`));

      const [att] = await conn.query("SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = '2026-11-16'", [empId]);
      console.log('\nAttendance row in DB for 16 Nov:', att);
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

