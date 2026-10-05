const mysql = require("mysql2/promise");

async function run() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
    timezone: "+05:30",
    dateStrings: true
  });

  // 1. Update Employee 566 (Ganesh) to 1997-02-12
  const [res] = await conn.query(
    "UPDATE employees SET DateOfBirth = '1997-02-12' WHERE id = 566"
  );
  console.log("Updated employee 566 DateOfBirth to 1997-02-12. Result:", res);

  // 2. Verify Employee 566
  const [rows] = await conn.query(
    "SELECT id, FirstName, LastName, DateOfBirth, DateJoined FROM employees WHERE id = 566"
  );
  console.log("Verified employee 566:", JSON.stringify(rows[0], null, 2));

  await conn.end();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
