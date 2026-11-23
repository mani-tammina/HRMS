const { db } = require('../config/database');

async function main() {
  const c = await db();
  const runId = 54;

  const [sal] = await c.query('SELECT * FROM payroll_employee_salaries WHERE run_id = ?', [runId]);
  console.log('Salaries:', sal);

  const [taxes] = await c.query(`
    SELECT t.* FROM payroll_tax_deductions t
    JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
    WHERE s.run_id = ?
  `, [runId]);
  console.log('Taxes:', taxes);

  const [breakups] = await c.query(`
    SELECT b.* FROM payroll_salary_breakups b
    JOIN payroll_employee_salaries s ON s.id = b.employee_salary_id
    WHERE s.run_id = ?
  `, [runId]);
  console.log('Breakups:', breakups);

  await c.end();
}

main().catch(console.error);
