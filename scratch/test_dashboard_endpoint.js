const { db } = require('../config/database');
const payrollAdmin = require('../controllers/payroll.admin.controller');

async function main() {
  const c = await db();

  // Test calculateRunFinancials directly on run 54
  const [runs] = await c.query('SELECT * FROM payroll_runs WHERE id = 54');
  console.log('Run 54 in DB:', runs[0]);

  // We can simulate req, res for getPayrollDashboard
  const req = {
    query: { month: '2026-10' },
    user: { id: 1 }
  };
  const res = {
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      console.log('=== DASHBOARD RESPONSE FOR 2026-10 ===');
      console.log('payingEmployees:', payload.data?.payingEmployees);
      console.log('totalEmployees:', payload.data?.totalEmployees);
      console.log('equation:', payload.data?.equation);
    }
  };

  await payrollAdmin.getPayrollDashboard(req, res);

  await c.end();
}

main().catch(console.error);
