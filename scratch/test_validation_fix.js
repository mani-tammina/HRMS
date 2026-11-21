const { db } = require('../config/database');

async function testFix() {
  const c = await db();
  const year = 2026, month = 11;
  const sd = '2026-11-01';
  const ed = '2026-11-30';

  const [employees] = await c.query(
    `SELECT e.id, e.EmployeeNumber, e.FullName, ap.name as attendance_policy_name
     FROM employees e
     LEFT JOIN (
       SELECT DISTINCT employee_id 
       FROM attendance 
       WHERE attendance_date BETWEEN ? AND ?
       UNION
       SELECT DISTINCT employee_id 
       FROM biometric_daily_attendance 
       WHERE attendance_date BETWEEN ? AND ?
     ) a ON e.id = a.employee_id
     LEFT JOIN attendance_policies ap ON e.attendance_policy_id = ap.id
     INNER JOIN (
       SELECT DISTINCT employee_id
       FROM employee_salary_contracts
       WHERE status = 'Active'
         AND effective_from <= LAST_DAY(?)
         AND (effective_to IS NULL OR effective_to >= DATE_FORMAT(?, '%Y-%m-01'))
     ) esc ON e.id = esc.employee_id
     WHERE e.EmploymentStatus = 'Working'
       AND (a.employee_id IS NOT NULL OR ap.name = 'No Attendance')`,
    [sd, ed, sd, ed, sd, sd]
  );

  const [attendance] = await c.query(
    `SELECT DISTINCT employee_id
     FROM attendance
     WHERE attendance_date BETWEEN ? AND ?
     UNION
     SELECT DISTINCT employee_id
     FROM biometric_daily_attendance
     WHERE attendance_date BETWEEN ? AND ?`,
    [sd, ed, sd, ed]
  );

  const allEmployees = employees.map(e => ({
    id: Number(e.id),
    name: e.FullName,
    number: e.EmployeeNumber,
    isNoAttendance: e.attendance_policy_name === 'No Attendance'
  }));
  const attendanceEmployees = new Set(attendance.map((r) => Number(r.employee_id)));

  const missingAttendance = [];
  for (const emp of allEmployees) {
    if (!emp.isNoAttendance && !attendanceEmployees.has(emp.id)) {
      missingAttendance.push({ employeeId: emp.id, employeeName: emp.name });
    }
  }

  console.log('Fixed missing attendance count:', missingAttendance.length);
  await c.end();
}

testFix().catch(console.error);
