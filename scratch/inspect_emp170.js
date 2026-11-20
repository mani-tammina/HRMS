const { db } = require('../config/database');
async function test() {
  const [emp] = await db.query('SELECT id, EmployeeNumber, attendance_number, FirstName, LastName FROM employees WHERE id = 170');
  console.log('Employee 170:', emp);
  const [bRaw] = await db.query("SELECT * FROM biometric_attendance_raw WHERE employee_id = 170 AND punch_time >= '2026-11-17 00:00:00' ORDER BY punch_time ASC");
  console.log('raw count:', bRaw.length);
  const [bP] = await db.query("SELECT * FROM biometric_punches WHERE employee_id = 170 AND punch_time >= '2026-11-17 00:00:00' ORDER BY punch_time ASC");
  console.log('biometric_punches count:', bP.length);
  console.log('biometric_punches:', bP.map(p => ({ time: p.punch_time, dir: p.direction, dev: p.device_id })));
  const [aP] = await db.query("SELECT * FROM attendance_punches WHERE employee_id = 170 AND punch_time >= '2026-11-17 00:00:00' ORDER BY punch_time ASC");
  console.log('attendance_punches count:', aP.length);
  console.log('attendance_punches:', aP);
  process.exit(0);
}
test();

