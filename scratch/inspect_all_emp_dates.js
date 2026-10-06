const { db } = require('../config/database');

async function inspectEmployees() {
  const c = await db();
  try {
    const [rows2001] = await c.query(
      "SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined FROM employees WHERE DateOfBirth LIKE '%2001-06%' OR DateOfBirth LIKE '%2001-02%' LIMIT 10"
    );
    console.log("Employees with DOB around 2001:", rows2001);

    const [emp566] = await c.query(
      "SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined FROM employees WHERE id = 566"
    );
    console.log("Employee 566:", emp566[0]);

    const [emp569] = await c.query(
      "SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined FROM employees WHERE id = 569"
    );
    console.log("Employee 569:", emp569[0]);

    const [sample] = await c.query(
      "SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined FROM employees ORDER BY id LIMIT 10"
    );
    console.log("Sample 10 employees:", sample);

    const [counts] = await c.query(`
      SELECT 
        COUNT(*) as total_employees,
        COUNT(DateOfBirth) as total_dob,
        COUNT(DateJoined) as total_doj
      FROM employees
    `);
    console.log("Counts:", counts[0]);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await c.end();
  }
}

inspectEmployees();
