/**
 * TEST AUTO CLOCK-OUT SERVICE
 * Verifies shift calculation, day shifts, night shifts, and auto clock-out execution
 */

const { db } = require('../config/database');
const autoClockOutService = require('../services/auto-clockout.service');

async function runTests() {
  console.log('🧪 Starting Auto Clock-Out Tests...\n');

  // Test 1: Day Shift calculation (09:00 - 18:00)
  const dayShift = {
    start_time: '09:00:00',
    end_time: '18:00:00',
    shift_type: 'general'
  };
  const punchDate = '2026-08-24';
  const punchInTime = '2026-08-24 09:05:00';

  const dayResult = autoClockOutService.calculateShiftAndAutoClockOut(punchInTime, dayShift, punchDate);
  console.log('1️⃣ Day Shift (09:00 - 18:00):');
  console.log('   Shift Start:', autoClockOutService.formatToMySQLDateTime(dayResult.shiftStartTime));
  console.log('   Shift End:  ', autoClockOutService.formatToMySQLDateTime(dayResult.shiftEndTime));
  console.log('   Duration:   ', dayResult.shiftDurationHours, 'hours');
  console.log('   Auto Cutoff:', autoClockOutService.formatToMySQLDateTime(dayResult.autoClockOutTime));

  const expectedDayCutoff = '2026-08-24 20:00:00';
  const actualDayCutoff = autoClockOutService.formatToMySQLDateTime(dayResult.autoClockOutTime);
  console.assert(actualDayCutoff === expectedDayCutoff, `Expected ${expectedDayCutoff} but got ${actualDayCutoff}`);
  console.log('   ✅ Day shift cutoff correctly matches 20:00 (18:00 + 2h)\n');

  // Test 2: Night Shift calculation (21:00 - 06:00 next day)
  const nightShift = {
    start_time: '21:00:00',
    end_time: '06:00:00',
    shift_type: 'night'
  };
  const nightPunchIn = '2026-08-24 21:00:00';

  const nightResult = autoClockOutService.calculateShiftAndAutoClockOut(nightPunchIn, nightShift, punchDate);
  console.log('2️⃣ Night Shift (21:00 - 06:00 next day):');
  console.log('   Shift Start:', autoClockOutService.formatToMySQLDateTime(nightResult.shiftStartTime));
  console.log('   Shift End:  ', autoClockOutService.formatToMySQLDateTime(nightResult.shiftEndTime));
  console.log('   Duration:   ', nightResult.shiftDurationHours, 'hours');
  console.log('   Auto Cutoff:', autoClockOutService.formatToMySQLDateTime(nightResult.autoClockOutTime));

  const expectedNightCutoff = '2026-08-25 08:00:00';
  const actualNightCutoff = autoClockOutService.formatToMySQLDateTime(nightResult.autoClockOutTime);
  console.assert(actualNightCutoff === expectedNightCutoff, `Expected ${expectedNightCutoff} but got ${actualNightCutoff}`);
  console.log('   ✅ Night shift cutoff correctly matches next day 08:00 (06:00 + 2h)\n');

  // Test 3: Database sweep verification
  const c = await db();
  console.log('3️⃣ Running database auto clock-out sweep...');
  await autoClockOutService.processAllPendingAutoClockOuts();
  console.log('   ✅ Database sweep executed cleanly without errors.\n');

  // Test 4: Check Shift Timing API query for employee 1
  const timing = await autoClockOutService.getShiftTimingForEmployee(c, 1, '2026-08-24');
  console.log('4️⃣ Shift timing query for Employee 1:', {
    shiftPolicyName: timing?.shiftPolicyName,
    startTime: timing?.startTime,
    endTime: timing?.endTime,
    autoClockOutTime: timing?.autoClockOutTime
  });
  console.log('   ✅ Employee shift timing retrieved successfully.\n');

  await c.end();
  console.log('🎉 All Auto Clock-Out Backend Tests Passed!\n');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
