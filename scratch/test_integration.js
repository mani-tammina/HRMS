/**
 * END-TO-END INTEGRATION TEST FOR AUTO CLOCK-OUT (OUT Missing & 0 Hours)
 */

const { db } = require('../config/database');
const autoClockOutService = require('../services/auto-clockout.service');

async function testAutoClockOutIntegration() {
  console.log('🚀 Running Auto Clock-Out (OUT Missing) Integration Test...\n');
  const c = await db();

  try {
    // 1. Get a test employee
    const [emps] = await c.query(`
      SELECT e.id, e.FirstName, e.LastName, e.shift_policy_id, sp.start_time, sp.end_time
      FROM employees e
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LIMIT 1
    `);

    if (!emps || emps.length === 0) {
      console.log('⚠️ No employees found in database to test.');
      return;
    }

    const testEmp = emps[0];
    console.log(`👤 Using Test Employee: ID ${testEmp.id} (${testEmp.FirstName} ${testEmp.LastName})`);
    console.log(`   Shift: ${testEmp.start_time || '09:00:00'} - ${testEmp.end_time || '18:00:00'}\n`);

    const testDate = '2026-08-20'; // A past test date
    const testPunchInTime = `${testDate} 09:00:00`;

    // 2. Clean up any existing test record for this test date
    const [existingAtt] = await c.query('SELECT id FROM attendance WHERE employee_id = ? AND attendance_date = ?', [testEmp.id, testDate]);
    if (existingAtt.length > 0) {
      await c.query('DELETE FROM attendance_punches WHERE attendance_id = ?', [existingAtt[0].id]);
      await c.query('DELETE FROM attendance WHERE id = ?', [existingAtt[0].id]);
    }

    // 3. Insert a simulated attendance and active punch-in for test date
    const [attResult] = await c.query(`
      INSERT INTO attendance (employee_id, attendance_date, punch_date, first_check_in, work_mode, location, status)
      VALUES (?, ?, ?, ?, 'Office', 'Office', 'present')
    `, [testEmp.id, testDate, testDate, testPunchInTime]);

    const attendanceId = attResult.insertId;

    await c.query(`
      INSERT INTO attendance_punches (attendance_id, employee_id, punch_type, punch_time, punch_date, ip_address, device_info, notes)
      VALUES (?, ?, 'in', ?, ?, '127.0.0.1', 'Test Device', 'Test Clock-In')
    `, [attendanceId, testEmp.id, testPunchInTime, testDate]);

    console.log(`✅ Created test active punch-in (ID: ${attendanceId}) on ${testDate}`);

    // 4. Verify that the punch is currently 'in'
    const [punchesBefore] = await c.query('SELECT * FROM attendance_punches WHERE attendance_id = ?', [attendanceId]);
    console.assert(punchesBefore.length === 1 && punchesBefore[0].punch_type === 'in', 'Punch should be active');
    console.log('   Current state: Clocked In (1 punch)');

    // 5. Run auto clock-out for this employee
    console.log('\n⚙️ Executing processAutoClockOutForEmployee...');
    const result = await autoClockOutService.processAutoClockOutForEmployee(c, testEmp.id, testDate);
    console.log('   Result:', result);
    console.assert(result && result.clockedOut === true, 'Should have been auto-clocked out');
    console.assert(result.notes === 'OUT Missing', 'Notes should be OUT Missing');

    // 6. Verify punch-out record was inserted and attendance hours set to 0, last_check_out NULL
    const [punchesAfter] = await c.query('SELECT * FROM attendance_punches WHERE attendance_id = ? ORDER BY id ASC', [attendanceId]);
    console.log(`\n📊 Punches after auto clock-out: ${punchesAfter.length}`);
    for (const p of punchesAfter) {
      console.log(`   - [${p.punch_type.toUpperCase()}] ${p.punch_time.toISOString().replace('T', ' ').substring(0, 19)} | Notes: "${p.notes}"`);
    }

    const [attAfter] = await c.query('SELECT * FROM attendance WHERE id = ?', [attendanceId]);
    console.log(`\n📋 Attendance Summary:`);
    console.log(`   Total Work Hours: ${attAfter[0].total_work_hours}h`);
    console.log(`   Gross Hours:      ${attAfter[0].gross_hours}h`);
    console.log(`   Last Check-Out:   ${attAfter[0].last_check_out}`);

    console.assert(punchesAfter.length === 2, 'Should have 2 punches (IN and OUT)');
    console.assert(punchesAfter[1].punch_type === 'out', 'Second punch should be out');
    console.assert(punchesAfter[1].notes === 'OUT Missing', 'Notes must be exactly "OUT Missing"');
    console.assert(parseFloat(attAfter[0].total_work_hours) === 0, 'Total work hours must be 0');
    console.assert(parseFloat(attAfter[0].gross_hours) === 0, 'Gross hours must be 0');
    console.assert(attAfter[0].last_check_out === null, 'last_check_out must be null');

    console.log('\n✅ Auto clock-out (OUT Missing with 0 hours and null last_check_out) test succeeded perfectly!');

    // 7. Cleanup test record
    await c.query('DELETE FROM attendance_punches WHERE attendance_id = ?', [attendanceId]);
    await c.query('DELETE FROM attendance WHERE id = ?', [attendanceId]);
    console.log('🧹 Cleaned up test records.');

  } catch (err) {
    console.error('❌ Integration test failed:', err);
    process.exit(1);
  } finally {
    await c.end();
  }
}

testAutoClockOutIntegration();
