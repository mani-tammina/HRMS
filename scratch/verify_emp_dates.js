const { db } = require('../config/database');

async function testEmployeeApiOutputs() {
  const c = await db();
  try {
    const testIds = [182, 566, 569, 1, 2, 5];
    const [rows] = await c.query(
      `SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined, exit_date FROM employees WHERE id IN (${testIds.join(',')}) ORDER BY id`
    );

    console.log("=== VERIFYING EMPLOYEE DATES ===");
    for (const r of rows) {
      console.log(`ID ${r.id} (${r.FirstName} ${r.LastName}): DOB = ${r.DateOfBirth} | DOJ = ${r.DateJoined}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await c.end();
  }
}

testEmployeeApiOutputs();
