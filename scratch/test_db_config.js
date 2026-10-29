const mysql = require("mysql2/promise");

async function testConnection(config, label) {
  console.log(`\n=== Testing ${label} ===`);
  const conn = await mysql.createConnection(config);
  
  const [rows] = await conn.query(
    "SELECT id, FirstName, DateOfBirth, DateJoined FROM employees WHERE id IN (1, 2, 566, 569, 79, 89) ORDER BY id"
  );
  
  for (const r of rows) {
    console.log(`Emp ${r.id} (${r.FirstName}): DOB =`, r.DateOfBirth, `(type: ${typeof r.DateOfBirth}) | DJ =`, r.DateJoined, `(type: ${typeof r.DateJoined})`);
  }
  
  await conn.end();
}

async function run() {
  await testConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
    timezone: "+00:00",
    dateStrings: false
  }, "Current Config (UTC, dateStrings=false)");

  await testConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
    timezone: "+05:30",
    dateStrings: true
  }, "New Config (IST +05:30, dateStrings=true)");

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
