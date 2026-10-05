const mysql = require("mysql2/promise");

async function run() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
  });

  const [rows] = await conn.query(
    "SELECT id, FirstName, LastName, WorkEmail, DateOfBirth, DateJoined FROM employees WHERE DateOfBirth LIKE '%1997%' ORDER BY id"
  );
  
  console.log(`Total 1997 employees: ${rows.length}`);
  for (const r of rows) {
    console.log(`Emp ${r.id}: ${r.FirstName} ${r.LastName} (${r.WorkEmail}) -> DOB: ${r.DateOfBirth} | DJ: ${r.DateJoined}`);
  }

  await conn.end();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
