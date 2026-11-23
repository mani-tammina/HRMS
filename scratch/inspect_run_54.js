const { db } = require('../config/database');

async function main() {
  const c = await db();
  const [salaries] = await c.query('SELECT * FROM payroll_employee_salaries WHERE run_id = 54');
  console.log('Salaries for Run 54:');
  console.log(salaries);

  const [components] = await c.query('SELECT * FROM payroll_salary_components WHERE salary_id IN (SELECT id FROM payroll_employee_salaries WHERE run_id = 54)');
  console.log('Components for Run 54:');
  console.table(components);

  await c.end();
}

main().catch(console.error);
