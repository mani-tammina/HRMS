const mysql = require("mysql2/promise");

async function run() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
  });

  const [rows] = await conn.query(
    "SELECT id, FirstName, LastName, DateOfBirth, DATE_FORMAT(DateOfBirth, '%Y-%m-%d') as dob_formatted, DateJoined, DATE_FORMAT(DateJoined, '%Y-%m-%d') as dj_formatted FROM employees WHERE DateOfBirth LIKE '%1997-02%' OR DateOfBirth LIKE '%1997-11%' LIMIT 10"
  );
  console.log("Employees found:", JSON.stringify(rows, null, 2));

  // Also check some other sample employees with DateJoined and DateOfBirth
  const [samples] = await conn.query(
    "SELECT id, FirstName, LastName, DateOfBirth, DATE_FORMAT(DateOfBirth, '%Y-%m-%d') as dob_formatted, DateJoined, DATE_FORMAT(DateJoined, '%Y-%m-%d') as dj_formatted FROM employees WHERE DateOfBirth IS NOT NULL LIMIT 5"
  );
  console.log("Sample employees:", JSON.stringify(samples, null, 2));

  await conn.end();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
