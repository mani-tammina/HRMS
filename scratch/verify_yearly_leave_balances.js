const http = require('http');
const { db } = require('../config/database');
const swaggerSpec = require('../swagger/swagger.spec');

async function verify() {
  console.log('🔍 Verifying Yearly Leave Balances Implementation...\n');

  // 1. Check DB Table
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS total FROM yearly_leave_balances');
    console.log('✅ DB Check: `yearly_leave_balances` contains', rows[0].total, 'records.');

    const [sample] = await db.query('SELECT * FROM yearly_leave_balances LIMIT 1');
    if (sample.length > 0) {
      console.log('   Sample Record: Employee:', sample[0].employee_number, '-', sample[0].employee_name);
      console.log('   Sick Leave Balance:', sample[0].sick_leave_balance, ', Casual Leave Balance:', sample[0].casual_leave_balance);
    }
  } catch (e) {
    console.error('❌ DB Check Error:', e.message);
  }

  // 2. Check Swagger OpenAPI Merger
  try {
    const paths = swaggerSpec.paths;
    const hasYearlyRoute = !!paths['/api/yearly-leave-balances'];
    const hasMyBalanceRoute = !!paths['/api/yearly-leave-balances/my-balance'];
    const hasImportRoute = !!paths['/api/yearly-leave-balances/import'];
    const hasSchema = !!(swaggerSpec.components && swaggerSpec.components.schemas && swaggerSpec.components.schemas.YearlyLeaveBalance);

    console.log('\n✅ Swagger Check:');
    console.log('   /api/yearly-leave-balances:', hasYearlyRoute ? 'PRESENT' : 'MISSING');
    console.log('   /api/yearly-leave-balances/my-balance:', hasMyBalanceRoute ? 'PRESENT' : 'MISSING');
    console.log('   /api/yearly-leave-balances/import:', hasImportRoute ? 'PRESENT' : 'MISSING');
    console.log('   YearlyLeaveBalance Schema:', hasSchema ? 'PRESENT' : 'MISSING');
  } catch (e) {
    console.error('❌ Swagger Check Error:', e.message);
  }

  console.log('\n🎉 Verification completed!');
  process.exit(0);
}

verify();
