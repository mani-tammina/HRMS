/**
 * FIX SCRIPT: Correct DateOfBirth (and DateJoined) for all employees
 * that were imported from Excel with a 1-day UTC timezone shift.
 *
 * ROOT CAUSE: excelReader.js used getUTCDate() on XLSX Date objects which are
 * created at LOCAL midnight (IST). IST midnight = UTC 18:30 previous day, so
 * getUTCDate() always returned the PREVIOUS day's date.
 *
 * SAFE: Employee 569 (manually entered) has DateJoined = 2025-01-19, which is
 * a recently-added record. We identify manually-entered records vs imported ones
 * by checking if the date is exactly at UTC midnight (T00:00:00.000Z), which is
 * what the XLSX cellDates:true driver produces when you then run getUTCDate().
 * ALL employees in the DB have T00:00:00.000Z - so the safest fix is:
 * ADD 1 DAY to DateOfBirth for all employees EXCEPT id=569.
 *
 * NOTE: After running this script, future Excel imports will be correct because
 * excelReader.js has been fixed to use getFullYear()/getMonth()/getDate() (local).
 */

const { db } = require("../config/database");

async function fixDates() {
  const c = await db();
  try {
    // 1. Preview how many will be updated
    const [preview] = await c.query(
      `SELECT COUNT(*) as total FROM employees WHERE DateOfBirth IS NOT NULL AND id != 569`
    );
    console.log(`Employees to update (DateOfBirth +1 day): ${preview[0].total}`);

    const [preview2] = await c.query(
      `SELECT COUNT(*) as total FROM employees WHERE DateJoined IS NOT NULL AND id != 569`
    );
    console.log(`Employees to update (DateJoined +1 day): ${preview2[0].total}`);

    // 2. Sample before
    const [before] = await c.query(
      `SELECT id, FirstName, LastName, 
              DATE_FORMAT(DateOfBirth, '%Y-%m-%d') as dob,
              DATE_FORMAT(DateJoined, '%Y-%m-%d') as doj
       FROM employees WHERE id IN (1,2,3,519,569) ORDER BY id`
    );
    console.log('\nBEFORE (sample):');
    before.forEach(r => console.log(`  ID ${r.id}: ${r.FirstName} ${r.LastName} | DOB=${r.dob} | DOJ=${r.doj}`));

    // 3. Fix DateOfBirth for all except 569
    const [r1] = await c.query(
      `UPDATE employees SET DateOfBirth = DATE_ADD(DateOfBirth, INTERVAL 1 DAY)
       WHERE DateOfBirth IS NOT NULL AND id != 569`
    );
    console.log(`\nUpdated DateOfBirth: ${r1.affectedRows} rows`);

    // 4. Fix DateJoined for all except 569
    const [r2] = await c.query(
      `UPDATE employees SET DateJoined = DATE_ADD(DateJoined, INTERVAL 1 DAY)
       WHERE DateJoined IS NOT NULL AND id != 569`
    );
    console.log(`Updated DateJoined: ${r2.affectedRows} rows`);

    // 5. Sample after
    const [after] = await c.query(
      `SELECT id, FirstName, LastName,
              DATE_FORMAT(DateOfBirth, '%Y-%m-%d') as dob,
              DATE_FORMAT(DateJoined, '%Y-%m-%d') as doj
       FROM employees WHERE id IN (1,2,3,519,569) ORDER BY id`
    );
    console.log('\nAFTER (sample):');
    after.forEach(r => console.log(`  ID ${r.id}: ${r.FirstName} ${r.LastName} | DOB=${r.dob} | DOJ=${r.doj}`));

    console.log('\n✅ Done! All employee dates corrected by +1 day (except ID 569 which was already correct).');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await c.end();
  }
}

fixDates();
