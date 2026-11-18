const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
    const [users] = await conn.query("SELECT id, email, role, employee_id FROM users");
    console.log('Users:', users);
    const [emps] = await conn.query("SELECT id, EmployeeNumber, FirstName, LastName, PersonalEmail, WorkEmail FROM employees WHERE id IN (?)", [users.map(u => u.employee_id).filter(Boolean)]);
    console.log('Employees linked to users:', emps);
  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

