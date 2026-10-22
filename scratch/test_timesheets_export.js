const { db } = require('../config/database');
const xlsx = require('xlsx');

(async () => {
  const c = await db();
  try {
    const startDate = '2026-10-01';
    const endDate = '2026-10-31';
    const managerEmpId = 585;

    // Test query for manager 585
    const query = `
      SELECT 
          t.id as timesheet_id,
          t.employee_id,
          e.FullName as employee_name,
          e.EmployeeNumber as employee_number,
          e.WorkEmail as employee_email,
          d.name as department_name,
          m.FullName as manager_name,
          t.date as timesheet_date,
          t.week_start_date,
          t.week_end_date,
          t.timesheet_type,
          t.total_hours,
          t.notes,
          t.status,
          t.submission_date,
          t.verified_at,
          v_user.full_name as verified_by_name,
          t.validation_remarks,
          t.rejection_reason
      FROM timesheets t
      JOIN employees e ON t.employee_id = e.id
      LEFT JOIN departments d ON e.DepartmentId = d.id
      LEFT JOIN employees m ON e.reporting_manager_id = m.id
      LEFT JOIN users v_user ON t.verified_by = v_user.id
      WHERE t.date >= ? AND t.date <= ?
      AND (e.reporting_manager_id = ? OR e.id = ?)
      ORDER BY t.date DESC, e.FullName ASC
    `;
    const [rows] = await c.query(query, [startDate, endDate, managerEmpId, managerEmpId]);
    console.log('Manager 585 timesheets count:', rows.length);
    console.log('Sample row:', rows[0]);

    const exportData = rows.map(r => ({
        'Employee ID': r.employee_number || `EMP-${r.employee_id}`,
        'Employee Name': r.employee_name || 'N/A',
        'Department': r.department_name || 'N/A',
        'Reporting Manager': r.manager_name || 'N/A',
        'Timesheet Date': r.timesheet_date ? String(r.timesheet_date).substring(0, 10) : 'N/A',
        'Week Range': (r.week_start_date && r.week_end_date)
            ? `${String(r.week_start_date).substring(0, 10)} to ${String(r.week_end_date).substring(0, 10)}`
            : (r.timesheet_date ? String(r.timesheet_date).substring(0, 10) : 'N/A'),
        'Total Hours': parseFloat(r.total_hours || 0).toFixed(2),
        'Timesheet Type': r.timesheet_type || 'regular',
        'Status': (r.status || 'submitted').toUpperCase(),
        'Tasks / Notes': r.notes || 'N/A',
        'Submitted On': r.submission_date ? String(r.submission_date).substring(0, 19).replace('T', ' ') : 'N/A',
        'Verified / Approved By': r.verified_by_name || 'N/A',
        'Validation / Rejection Remarks': r.validation_remarks || r.rejection_reason || ''
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(exportData);
    xlsx.utils.book_append_sheet(wb, ws, 'Employee Timesheets');
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    console.log('✅ Generated Excel buffer successfully, byte length:', buf.length);
  } finally {
    await c.end();
  }
})();
