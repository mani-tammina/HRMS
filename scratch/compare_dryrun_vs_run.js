const { db } = require('../config/database');

async function main() {
  const c = await db();

  // 1. Dry run financials
  const [sal54] = await c.query('SELECT * FROM payroll_employee_salaries WHERE run_id = 54');
  console.log('sal54:', sal54);

  const [tax54] = await c.query('SELECT * FROM payroll_tax_deductions WHERE employee_salary_id = ?', [sal54[0].id]);
  console.log('tax54:', tax54);

  const [breakup54] = await c.query('SELECT * FROM payroll_salary_breakups WHERE employee_salary_id = ?', [sal54[0].id]);
  console.log('breakup54:', breakup54);

  // Check what calculateDryRunFinancials in payroll.admin.controller does for emp 53
  const [emp] = await c.query('SELECT * FROM employees WHERE id = 53');
  console.log('Emp 53:', emp[0].FullName);

  const [contracts] = await c.query('SELECT * FROM employee_salary_contracts WHERE employee_id = 53');
  console.log('Emp 53 contracts:', contracts);

  await c.end();
}

main().catch(console.error);
