const { db } = require("../config/database");

async function updateDOB() {
  const c = await db();
  try {
    const [result] = await c.query(
      "UPDATE employees SET DateOfBirth = '1997-02-12' WHERE id = 569"
    );
    console.log("Update result:", result);
    
    const [rows] = await c.query("SELECT id, FirstName, DateOfBirth FROM employees WHERE id = 569");
    console.log("Updated Database Row:", JSON.stringify(rows[0]));
  } catch (err) {
    console.error(err);
  } finally {
    await c.end();
  }
}

updateDOB();
