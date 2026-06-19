/**
 * Quick verification: Check that the fix worked for key employees
 */
const { db } = require("../config/database");

async function verify() {
  const c = await db();
  try {
    const [rows] = await c.query(
      `SELECT id, FirstName, LastName,
              DATE_FORMAT(DateOfBirth, '%Y-%m-%d') as dob_mysql,
              DATE_FORMAT(DateJoined, '%Y-%m-%d') as doj_mysql
       FROM employees WHERE id IN (1, 519, 569) ORDER BY id`
    );
    console.log('=== VERIFICATION AFTER FIX ===');
    rows.forEach(r => {
      console.log(`ID ${r.id}: ${r.FirstName} ${r.LastName}`);
      console.log(`  DOB (stored): ${r.dob_mysql}`);
      console.log(`  DOJ (stored): ${r.doj_mysql}`);
    });
    console.log('\nExpected: ID 569 unchanged (1997-02-12), ID 519 = 1994-07-15 ✅');
  } finally {
    await c.end();
  }
}
verify();
