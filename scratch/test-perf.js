const { db } = require('../config/database');
async function test() {
  const c = await db();
  const [team] = await c.query("SELECT e.id FROM employees e WHERE e.EmploymentStatus = 'Working'");
  const teamIds = team.map(t => t.id);
  const targetDate = '2026-10-29';
  console.log('Team count:', teamIds.length);

  console.time('bPunches query');
  const [bPunches] = await c.query(
    `SELECT employee_id, 
            COUNT(*) as punch_count,
            MIN(punch_time) as first_punch,
            MAX(punch_time) as last_punch
     FROM biometric_punches
     WHERE employee_id IN (?) AND punch_date = ?
     GROUP BY employee_id`,
    [teamIds, targetDate]
  );
  console.timeEnd('bPunches query');
  console.log('bPunches rows:', bPunches.length);

  console.time('bDaily query');
  const [bDaily] = await c.query(
    `SELECT bda.*, e.EmployeeNumber, e.FirstName, e.LastName
     FROM biometric_daily_attendance bda
     INNER JOIN employees e ON bda.employee_id = e.id
     WHERE bda.employee_id IN (?) AND bda.attendance_date = ?`,
    [teamIds, targetDate]
  );
  console.timeEnd('bDaily query');
  console.log('bDaily rows:', bDaily.length);

  await c.end();
  process.exit(0);
}
test().catch(console.error);
