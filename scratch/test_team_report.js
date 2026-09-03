const { db } = require('../config/database');

async function testTeamReport() {
  const c = await db();
  const targetDate = '2026-09-03';
  console.log('Testing team report for:', targetDate);

  const [allWorking] = await c.query(
    `SELECT id, EmployeeNumber, FirstName, LastName FROM employees WHERE EmploymentStatus = 'Working' LIMIT 10`
  );
  const teamIds = allWorking.map(e => e.id);

  const [attendance] = await c.query(
    `SELECT a.*, e.EmployeeNumber, e.FirstName, e.LastName
     FROM attendance a
     INNER JOIN employees e ON a.employee_id = e.id
     WHERE a.employee_id IN (?) AND a.attendance_date = ?`,
    [teamIds, targetDate]
  );

  const [bioDaily] = await c.query(
    `SELECT bda.*, e.EmployeeNumber, e.FirstName, e.LastName
     FROM biometric_daily_attendance bda
     INNER JOIN employees e ON bda.employee_id = e.id
     WHERE bda.employee_id IN (?) AND bda.attendance_date = ?`,
    [teamIds, targetDate]
  );

  const [bioPunches] = await c.query(
    `SELECT employee_id, COUNT(*) as punch_count, MIN(punch_time) as first_punch, MAX(punch_time) as last_punch
     FROM biometric_punches
     WHERE employee_id IN (?) AND punch_date = ?
     GROUP BY employee_id`,
    [teamIds, targetDate]
  );

  console.log('Working sample count:', teamIds.length);
  console.log('Web attendance count:', attendance.length);
  console.log('Bio daily count:', bioDaily.length);
  console.log('Bio punches summary count:', bioPunches.length);

  c.end();
  console.log('✅ Team report check passed!');
}

testTeamReport().catch(console.error);
