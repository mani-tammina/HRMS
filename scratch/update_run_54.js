const { db } = require('../config/database');

async function main() {
  const c = await db();
  const runId = 54;

  // 1. Update payroll_runs
  await c.query(`
    UPDATE payroll_runs
    SET total_gross = 64890.00, total_deductions = 2000.00, total_net = 62890.00
    WHERE id = ?
  `, [runId]);

  // 2. Update payroll_employee_salaries
  await c.query(`
    UPDATE payroll_employee_salaries
    SET gross_earnings = 64890.00, total_deductions = 2000.00, net_pay = 62890.00
    WHERE run_id = ?
  `, [runId]);

  const [salRows] = await c.query('SELECT id FROM payroll_employee_salaries WHERE run_id = ?', [runId]);
  const salId = salRows[0]?.id;

  if (salId) {
    // 3. Delete the dummy TDS
    await c.query(`
      DELETE FROM payroll_tax_deductions
      WHERE employee_salary_id = ? AND deduction_code = 'TDS'
    `, [salId]);

    // 4. Update PF_EMP to 1800.00
    await c.query(`
      UPDATE payroll_tax_deductions
      SET amount = 1800.00
      WHERE employee_salary_id = ? AND deduction_code = 'PF_EMP'
    `, [salId]);

    // 5. Update PT to 200.00
    await c.query(`
      UPDATE payroll_tax_deductions
      SET amount = 200.00
      WHERE employee_salary_id = ? AND deduction_code = 'PT'
    `, [salId]);

    // 6. Ensure Employer PF in breakups is 1800.00
    await c.query(`
      UPDATE payroll_salary_breakups
      SET amount = 1800.00
      WHERE employee_salary_id = ? AND (component_code LIKE '%PF%ER%' OR component_code LIKE '%PF%EMPLOYER%' OR component_name LIKE '%Employer%PF%')
    `, [salId]);
  }

  console.log('Run 54 updated successfully to template-aligned values');

  await c.end();
}

main().catch(console.error);
