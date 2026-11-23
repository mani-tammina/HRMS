const { db } = require('../config/database');

async function main() {
  const c = await db();
  // Check dry run for 2026-10 and 2026-11
  const [runs10] = await c.query(`
    SELECT r.id, r.status, r.total_employees, r.total_gross, r.total_deductions, r.total_net 
    FROM payroll_runs r 
    JOIN payroll_cycles cy ON cy.id = r.cycle_id 
    WHERE cy.year = 2026 AND cy.month = 10
  `);
  console.log('2026-10 Runs in DB:', runs10);

  const [runs11] = await c.query(`
    SELECT r.id, r.status, r.total_employees, r.total_gross, r.total_deductions, r.total_net 
    FROM payroll_runs r 
    JOIN payroll_cycles cy ON cy.id = r.cycle_id 
    WHERE cy.year = 2026 AND cy.month = 11
  `);
  console.log('2026-11 Runs in DB:', runs11);

  await c.end();
}

main().catch(console.error);
