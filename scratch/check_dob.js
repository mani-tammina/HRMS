const { db } = require("../config/database");

async function checkDOB() {
  const c = await db();
  try {
    const [rows] = await c.query("SELECT id, FirstName, DateOfBirth FROM employees WHERE id = 569");
    console.log("Database Row:", JSON.stringify(rows[0]));
    console.log("Raw DateOfBirth type:", typeof rows[0].DateOfBirth);
    console.log("Raw DateOfBirth value:", rows[0].DateOfBirth);
    if (rows[0].DateOfBirth) {
      console.log("ISO String:", rows[0].DateOfBirth.toISOString());
    }
  } catch (err) {
    console.error(err);
  } finally {
    await c.end();
  }
}

checkDOB();
