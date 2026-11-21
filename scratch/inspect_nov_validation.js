const { db } = require('../config/database');

async function main() {
  const c = await db();
  const year = 2026, month = 11;
  const sd = '2026-11-01';
  const ed = '2026-11-30';

  console.log('=== INVESTIGATING NOVEMBER 2026 VALIDATION ===');

  // 1. Check existing payroll run for 2026-11
  const [runs] = await c.query(`
    SELECT r.id, r.status, COUNT(s.id) as emp_count, SUM(s.gross_earnings) as total_gross
    FROM payroll_runs r
    JOIN payroll_cycles cy ON cy.id = r.cycle_id
    LEFT JOIN payroll_employee_salaries s ON s.run_id = r.id
    WHERE cy.year = ? AND cy.month = ?
    GROUP BY r.id
  `, [year, month]);
  console.log('Payroll Runs for 2026-11:', runs);

  // 2. Total working employees
  const [allWorking] = await c.query("SELECT COUNT(*) as cnt FROM employees WHERE EmploymentStatus = 'Working'");
  console.log('Total working employees:', allWorking[0].cnt);

  // 3. What does buildRunValidation query return for 2026-11?
  const [employees] = await c.query(
    `SELECT e.id, e.EmployeeNumber, e.FullName, ap.name as attendance_policy_name
     FROM employees e
     LEFT JOIN (
       SELECT DISTINCT employee_id 
       FROM attendance 
       WHERE attendance_date BETWEEN ? AND ?
       UNION
       SELECT DISTINCT employee_id 
       FROM biometric_daily_attendance 
       WHERE attendance_date BETWEEN ? AND ?
     ) a ON e.id = a.employee_id
     LEFT JOIN attendance_policies ap ON e.attendance_policy_id = ap.id
     INNER JOIN (
       SELECT DISTINCT employee_id
       FROM employee_salary_contracts
       WHERE status = 'Active'
         AND effective_from <= LAST_DAY(?)
         AND (effective_to IS NULL OR effective_to >= DATE_FORMAT(?, '%Y-%m-01'))
     ) esc ON e.id = esc.employee_id
     WHERE e.EmploymentStatus = 'Working'
       AND (a.employee_id IS NOT NULL OR ap.name = 'No Attendance')`,
    [sd, ed, sd, ed, sd, sd]
  );
  console.log('Employees in validation query count:', employees.length);

  // 4. Check web attendance vs biometric attendance in 2026-11
  const [webAtt] = await c.query('SELECT COUNT(DISTINCT employee_id) as cnt FROM attendance WHERE attendance_date BETWEEN ? AND ?', [sd, ed]);
  const [bioAtt] = await c.query('SELECT COUNT(DISTINCT employee_id) as cnt FROM biometric_daily_attendance WHERE attendance_date BETWEEN ? AND ?', [sd, ed]);
  console.log('Web attendance unique employees in Nov 2026:', webAtt[0].cnt);
  console.log('Biometric attendance unique employees in Nov 2026:', bioAtt[0].cnt);

  // 5. Why did line 256 of buildRunValidation only query web attendance?
  const [webAttInValidation] = await c.query(`
    SELECT DISTINCT employee_id
    FROM attendance
    WHERE YEAR(attendance_date) = 2026 AND MONTH(attendance_date) = 11
  `);
  console.log('Web attendance in buildRunValidation:', webAttInValidation.length);

  const webAttSet = new Set(webAttInValidation.map(r => Number(r.employee_id)));
  const missingInValidation = [];
  for (const emp of employees) {
    if (!webAttSet.has(emp.id)) {
      missingInValidation.push({
        id: emp.id,
        name: emp.FullName,
        policy: emp.attendance_policy_name
      });
    }
  }
  console.log('Missing attendance count in buildRunValidation:', missingInValidation.length);
  console.log('First 10 missing in validation:', missingInValidation.slice(0, 10));

  // Check how many of the 49 have biometric attendance or No Attendance policy
  const [bioAttEmployees] = await c.query(`
    SELECT DISTINCT employee_id FROM biometric_daily_attendance WHERE attendance_date BETWEEN ? AND ?
  `, [sd, ed]);
  const bioSet = new Set(bioAttEmployees.map(r => Number(r.employee_id)));

  let hasBio = 0;
  let isNoAtt = 0;
  missingInValidation.forEach(m => {
    if (bioSet.has(m.id)) hasBio++;
    if (m.policy === 'No Attendance') isNoAtt++;
  });
  console.log('Of the 49 reported missing attendance:');
  console.log('- Have biometric punches:', hasBio);
  console.log('- Have No Attendance policy:', isNoAtt);
  console.log('- Total explained:', hasBio + isNoAtt);

  await c.end();
}

main().catch(console.error);
