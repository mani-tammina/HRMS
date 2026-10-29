const mysql = require("mysql2/promise");

async function run() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
  });

  const [users] = await conn.query("SELECT * FROM users LIMIT 10");
  console.log("Users:", JSON.stringify(users, null, 2));

  const [emp566] = await conn.query("SELECT id, EmployeeNumber, FirstName, LastName, WorkEmail, DateOfBirth, DateJoined FROM employees WHERE id = 566");
  console.log("Employee 566:", JSON.stringify(emp566, null, 2));

  const [emp569] = await conn.query("SELECT id, EmployeeNumber, FirstName, LastName, WorkEmail, DateOfBirth, DateJoined FROM employees WHERE id = 569");
  console.log("Employee 569:", JSON.stringify(emp569, null, 2));

  await conn.end();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
