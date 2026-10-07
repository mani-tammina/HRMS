const { db } = require('../config/database');

async function testAttendanceScenarios() {
  const c = await db();
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🧪 TESTING ATTENDANCE SCENARIOS');
  console.log('═══════════════════════════════════════════════════════════\n');

  try {
    // -------------------------------------------------------------
    // TEST 1: Check Auto-Out Punches do not have mismatched punch_date
    // -------------------------------------------------------------
    console.log('Test 1: Auto Clock-Out "OUT Missing" punch_date verification...');
    const [mismatched] = await c.query(`
      SELECT ap.id, ap.attendance_id, a.attendance_date, ap.punch_date, ap.punch_time, ap.notes
      FROM attendance_punches ap
      JOIN attendance a ON ap.attendance_id = a.id
      WHERE ap.notes = 'OUT Missing' AND ap.punch_date != a.attendance_date
    `);

    if (mismatched.length === 0) {
      console.log('  ✅ PASSED: All auto-out punches have punch_date matching their shift attendance_date.');
    } else {
      console.log(`  ❌ FAILED: Found ${mismatched.length} mismatched auto-out punches!`);
    }

    // -------------------------------------------------------------
    // TEST 2: Check Holiday Date Configuration
    // -------------------------------------------------------------
    console.log('\nTest 2: Checking Upcoming / Current Holidays in Database...');
    const [holidays] = await c.query(`
      SELECT id, holiday_name, DATE_FORMAT(holiday_date, '%Y-%m-%d') as holiday_date, holiday_type, is_active
      FROM holidays
      WHERE is_active = 1
      ORDER BY holiday_date DESC
      LIMIT 5
    `);
    console.log('  Active Holidays in DB:');
    console.table(holidays);

    // -------------------------------------------------------------
    // TEST 3: Verify Employee 182 / 566 Current Status
    // -------------------------------------------------------------
    console.log('\nTest 3: Checking Employee 182 & 566 Attendance Today...');
    const today = new Date().toISOString().split('T')[0];
    const [todayAtt] = await c.query(`
      SELECT a.id, a.employee_id, e.EmployeeNumber, e.FirstName, a.attendance_date, a.first_check_in, a.last_check_out, a.status
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      WHERE a.attendance_date = ?
    `, [today]);
    console.log(`  Attendance rows for today (${today}):`);
    console.table(todayAtt);

    const [todayPunches] = await c.query(`
      SELECT ap.id, ap.attendance_id, ap.employee_id, e.EmployeeNumber, ap.punch_type, ap.punch_time, ap.punch_date, ap.notes
      FROM attendance_punches ap
      JOIN employees e ON ap.employee_id = e.id
      WHERE ap.punch_date = ?
    `, [today]);
    console.log(`  Punches on punch_date (${today}):`);
    console.table(todayPunches);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎉 Automated Verification Complete!');
    console.log('═══════════════════════════════════════════════════════════\n');

  } catch (err) {
    console.error('Error during test execution:', err);
  } finally {
    c.end();
  }
}

testAttendanceScenarios();
