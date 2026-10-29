const mysql = require("mysql2/promise");

function formatDateFieldIST(val) {
  if (!val) return null;
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(d);
    }
    return val.includes('T') ? val.split('T')[0] : val;
  }
  if (val instanceof Date) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(val);
  }
  return null;
}

async function run() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
  });

  const [rows] = await conn.query(
    "SELECT id, FirstName, LastName, DateOfBirth, DateJoined FROM employees WHERE DateOfBirth LIKE '%1997-02%' OR id IN (566, 569, 1, 2, 3) LIMIT 10"
  );
  
  for (const r of rows) {
    console.log(`Emp ${r.id} (${r.FirstName}):`);
    console.log(`  Raw DOB in JS:`, r.DateOfBirth);
    console.log(`  IST DOB:`, formatDateFieldIST(r.DateOfBirth));
    console.log(`  Raw DJ in JS:`, r.DateJoined);
    console.log(`  IST DJ:`, formatDateFieldIST(r.DateJoined));
  }

  await conn.end();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
