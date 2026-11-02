const { db } = require('../config/database');
const autoClockOutService = require('../services/auto-clockout.service');
const { getEmployeeEffectiveShift, getShiftDateForPunch } = require('../utils/shift-helper');
const { toMySQLDate } = require('../utils/helpers');

async function testToday() {
  const c = await db();
  const [employees] = await c.query("SELECT id, FirstName, LastName FROM employees WHERE EmploymentStatus = 'Working' LIMIT 1");
  const emp = employees[0];
  console.log('Testing with employee:', emp.id, emp.FirstName, emp.LastName);

  console.time('/today simulation');
  const effectiveShift = await getEmployeeEffectiveShift(c, emp.id);
  let shiftDate = getShiftDateForPunch(effectiveShift, new Date());

  console.time('processAutoClockOutForEmployee');
  await autoClockOutService.processAutoClockOutForEmployee(c, emp.id);
  console.timeEnd('processAutoClockOutForEmployee');

  console.time('getShiftTimingForEmployee');
  await autoClockOutService.getShiftTimingForEmployee(c, emp.id, shiftDate);
  console.timeEnd('getShiftTimingForEmployee');

  const [attendance] = await c.query(
    `SELECT * FROM attendance WHERE employee_id = ? AND attendance_date = ?`,
    [emp.id, shiftDate]
  );

  const [bioPunches] = await c.query(
    `SELECT bp.id, bp.punch_time, bp.punch_date, bp.direction, bp.device_id
     FROM biometric_punches bp
     WHERE bp.employee_id = ? AND bp.punch_date = ?
     ORDER BY bp.punch_time ASC`,
    [emp.id, shiftDate]
  );

  console.timeEnd('/today simulation');

  await c.end();
  process.exit(0);
}
testToday().catch(console.error);
