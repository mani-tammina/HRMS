const { db } = require('../config/database');

async function main() {
  const c = await db();
  const sd = '2026-11-01', ed = '2026-11-30';
  const [allWorking] = await c.query("SELECT id, FullName, EmployeeNumber, DateJoined FROM employees WHERE EmploymentStatus = 'Working'");
  
  const [contracts] = await c.query(
    "SELECT DISTINCT employee_id FROM employee_salary_contracts WHERE status = 'Active' AND effective_from <= LAST_DAY(?) AND (effective_to IS NULL OR effective_to >= DATE_FORMAT(?, '%Y-%m-01'))",
    [sd, sd]
  );
  const contractSet = new Set(contracts.map(r => r.employee_id));

  const [att] = await c.query(
    "SELECT DISTINCT employee_id FROM attendance WHERE attendance_date BETWEEN ? AND ? UNION SELECT DISTINCT employee_id FROM biometric_daily_attendance WHERE attendance_date BETWEEN ? AND ?",
    [sd, ed, sd, ed]
  );
  const attSet = new Set(att.map(r => r.employee_id));

  const [policies] = await c.query("SELECT e.id, ap.name as policy FROM employees e LEFT JOIN attendance_policies ap ON e.attendance_policy_id = ap.id");
  const policyMap = new Map(policies.map(r => [r.id, r.policy]));

  let noContract = [];
  let noAtt = [];
  let valid = [];

  for (const emp of allWorking) {
    const hasContract = contractSet.has(emp.id);
    const hasPunch = attSet.has(emp.id) || policyMap.get(emp.id) === 'No Attendance';
    if (!hasContract) {
      noContract.push(emp);
    } else if (!hasPunch) {
      noAtt.push(emp);
    } else {
      valid.push(emp);
    }
  }

  console.log('Total Working:', allWorking.length);
  console.log('Valid (Total Employees in Nov Validation):', valid.length);
  console.log('No Active Contract count:', noContract.length);
  console.log('No Attendance Punches yet in Nov count:', noAtt.length);
  console.log('No Contract emps:', noContract.map(e => `${e.id} (${e.FullName})`));
  console.log('No Punches yet in Nov emps (all):', noAtt.map(e => `${e.id} (${e.FullName}, Joined: ${e.DateJoined ? e.DateJoined.toISOString().split('T')[0] : 'N/A'})`));
  await c.end();
}

main().catch(console.error);
