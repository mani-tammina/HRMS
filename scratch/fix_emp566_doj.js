const { db } = require('../config/database');

async function fixDoj() {
  try {
    const [res] = await db.query("UPDATE employees SET DateJoined = '2025-01-20' WHERE id = 566");
    console.log("Updated employee 566 DateJoined to 2025-01-20:", res);

    const [rows] = await db.query("SELECT id, EmployeeNumber, FirstName, LastName, DateOfBirth, DateJoined FROM employees WHERE id = 566");
    console.log("Current Employee 566 Data:", rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("Error updating DOJ:", err);
    process.exit(1);
  }
}

fixDoj();
