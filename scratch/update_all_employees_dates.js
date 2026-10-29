const { db } = require('../config/database');

async function updateAndVerify() {
  const c = await db();
  try {
    console.log("=== CHECK BEFORE UPDATE ===");
    const [sampleBefore] = await c.query(`
      SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined, exit_date
      FROM employees
      WHERE id IN (182, 1, 2, 5, 566, 569)
      ORDER BY id
    `);
    console.log("Sample before:", sampleBefore);

    console.log("\n=== RUNNING UPDATE (ADDING 1 DAY FOR ALL EMPLOYEES EXCEPT 566) ===");
    const [dobRes] = await c.query(`
      UPDATE employees 
      SET DateOfBirth = DATE_ADD(DateOfBirth, INTERVAL 1 DAY) 
      WHERE DateOfBirth IS NOT NULL AND id != 566
    `);
    console.log("Updated DateOfBirth:", dobRes.affectedRows, "rows");

    const [dojRes] = await c.query(`
      UPDATE employees 
      SET DateJoined = DATE_ADD(DateJoined, INTERVAL 1 DAY) 
      WHERE DateJoined IS NOT NULL AND id != 566
    `);
    console.log("Updated DateJoined:", dojRes.affectedRows, "rows");

    const [exitRes] = await c.query(`
      UPDATE employees 
      SET exit_date = DATE_ADD(exit_date, INTERVAL 1 DAY) 
      WHERE exit_date IS NOT NULL AND id != 566
    `);
    console.log("Updated exit_date:", exitRes.affectedRows, "rows");

    console.log("\n=== CHECK AFTER UPDATE ===");
    const [sampleAfter] = await c.query(`
      SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined, exit_date
      FROM employees
      WHERE id IN (182, 1, 2, 5, 566, 569)
      ORDER BY id
    `);
    console.log("Sample after:", sampleAfter);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await c.end();
  }
}

updateAndVerify();
