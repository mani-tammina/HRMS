const { db } = require('../config/database');

async function checkAttendanceTable() {
  const c = await db();
  try {
    const [attSample] = await c.query("SELECT * FROM attendance ORDER BY attendance_date DESC LIMIT 5");
    console.log('Attendance sample:', attSample);

    const [policy6Emps] = await c.query(`
      SELECT e.id, e.EmployeeNumber, e.FirstName, e.LastName, e.FullName, e.EmploymentStatus, e.attendance_policy_id, ap.name as policy_name
      FROM employees e
      JOIN attendance_policies ap ON ap.id = e.attendance_policy_id
      WHERE ap.name LIKE '%No Attendance%'
    `);
    console.log('Policy 6 employees:', policy6Emps);

    const empIds = policy6Emps.map(e => e.id);
    if (empIds.length > 0) {
      const [attForPolicy6] = await c.query(`
        SELECT employee_id, COUNT(*) as cnt, MIN(attendance_date) as min_date, MAX(attendance_date) as max_date
        FROM attendance
        WHERE employee_id IN (?)
        GROUP BY employee_id
      `, [empIds]);
      console.log('Attendance records for policy 6 emps:', attForPolicy6);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await c.end();
    process.exit(0);
  }
}

checkAttendanceTable();
