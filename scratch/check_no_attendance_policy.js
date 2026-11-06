const { db } = require('../config/database');

async function checkNoAttPolicyQuery() {
  const c = await db();
  try {
    const [policy] = await c.query("SELECT * FROM attendance_policies WHERE name LIKE '%No Attendance%'");
    console.log('Policy found:', policy);

    const [emps] = await c.query(`
      SELECT e.id, e.EmployeeNumber, e.FirstName, e.LastName, e.FullName, e.WorkEmail,
             d.name as department_name, des.name as designation_name,
             ap.name as policy_name, ap.id as policy_id
      FROM employees e
      JOIN attendance_policies ap ON e.attendance_policy_id = ap.id
      LEFT JOIN departments d ON e.DepartmentId = d.id
      LEFT JOIN designations des ON e.DesignationId = des.id
      WHERE (ap.name LIKE '%No Attendance%' OR ap.id = ?)
        AND e.EmploymentStatus = 'Working'
      ORDER BY e.id ASC
    `, [policy[0]?.id || 6]);
    console.log('Mapped working employees count:', emps.length);
    console.log('Mapped working employees:', emps);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await c.end();
    process.exit(0);
  }
}

checkNoAttPolicyQuery();
