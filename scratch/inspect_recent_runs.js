const { db } = require('../config/database');

async function main() {
  const c = await db();
  const [runs] = await c.query(`
    SELECT r.id, r.cycle_id, cy.year, cy.month, r.status, r.total_employees, r.total_gross, r.total_deductions, r.total_net
    FROM payroll_runs r
    JOIN payroll_cycles cy ON cy.id = r.cycle_id
    WHERE cy.year = 2026
    ORDER BY r.id DESC LIMIT 10
  `);
  console.table(runs);

  // Check the run that has total_net ~ 58,670 or 1 employee
  const [singleRuns] = await c.query(`
    SELECT r.id, r.cycle_id, cy.year, cy.month, r.status, r.total_employees, r.total_gross, r.total_deductions, r.total_net
    FROM payroll_runs r
    JOIN payroll_cycles cy ON cy.id = r.cycle_id
    WHERE r.total_employees = 1 OR r.total_net BETWEEN 50000 AND 70000
  `);
  console.log('Single/small runs:');
  console.table(singleRuns);

  await c.end();
}

main().catch(console.error);
