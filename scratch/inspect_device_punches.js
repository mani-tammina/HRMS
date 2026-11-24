const { db } = require('../config/database');

(async () => {
  const c = await db();
  try {
    const [punches] = await c.query(`
      SELECT r.id, r.biometric_user_id, r.punch_time, r.device_id, r.direction, r.status, r.employee_id,
             CONCAT(e.FirstName, ' ', e.LastName) as emp_name
      FROM biometric_attendance_raw r
      LEFT JOIN employees e ON r.employee_id = e.id
      WHERE r.device_id = '3' AND r.punch_time >= '2026-11-24 15:00:00'
      ORDER BY r.punch_time DESC
      LIMIT 10
    `);
    console.log('Recent punches on Device #3 (SVS 4th Floor):');
    console.table(punches);

    // Let's also check Device #1 (SVS 3rd Floor)
    const [p1] = await c.query(`
      SELECT r.id, r.biometric_user_id, r.punch_time, r.device_id, r.direction, r.status, r.employee_id,
             CONCAT(e.FirstName, ' ', e.LastName) as emp_name
      FROM biometric_attendance_raw r
      LEFT JOIN employees e ON r.employee_id = e.id
      WHERE r.device_id = '1'
      ORDER BY r.punch_time DESC
      LIMIT 5
    `);
    console.log('\nLatest punches on Device #1 (SVS 3rd Floor):');
    console.table(p1);

    // Let's also check Device #2 (SVS 1st Floor)
    const [p2] = await c.query(`
      SELECT r.id, r.biometric_user_id, r.punch_time, r.device_id, r.direction, r.status, r.employee_id,
             CONCAT(e.FirstName, ' ', e.LastName) as emp_name
      FROM biometric_attendance_raw r
      LEFT JOIN employees e ON r.employee_id = e.id
      WHERE r.device_id = '2'
      ORDER BY r.punch_time DESC
      LIMIT 5
    `);
    console.log('\nLatest punches on Device #2 (SVS 1st Floor):');
    console.table(p2);

    // Let's also check Device #4 (TSN 3RD SIDE A)
    const [p4] = await c.query(`
      SELECT r.id, r.biometric_user_id, r.punch_time, r.device_id, r.direction, r.status, r.employee_id,
             CONCAT(e.FirstName, ' ', e.LastName) as emp_name
      FROM biometric_attendance_raw r
      LEFT JOIN employees e ON r.employee_id = e.id
      WHERE r.device_id = '4'
      ORDER BY r.punch_time DESC
      LIMIT 5
    `);
    console.log('\nLatest punches on Device #4 (TSN 3RD SIDE A):');
    console.table(p4);

  } catch(e) {
    console.error(e);
  } finally {
    c.end();
  }
})();
