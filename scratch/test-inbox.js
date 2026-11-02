const { db } = require('../config/database');
const { findEmployeeByUserId } = require('../utils/helpers');

async function testInbox() {
  const c = await db();
  // Simulate req.user = { id: 1, role: 'admin' }
  const [users] = await c.query("SELECT id, role, username FROM users WHERE role IN ('admin', 'hr', 'manager') LIMIT 1");
  const user = users[0];
  console.log('Testing with user:', user);

  const emp = await findEmployeeByUserId(user.id);
  console.log('Employee:', emp?.FirstName, emp?.LastName, 'id:', emp?.id);

  console.time('Inbox Full API Simulation');
  
  // 1. count query
  let whereClause = " WHERE 1=1 AND n.is_archived = 0 AND n.status = 'Pending' AND n.request_type = 'Leave Request'";
  const countParams = [];
  const [countRows] = await c.query("SELECT COUNT(*) as total FROM inbox_notifications n LEFT JOIN employees e ON n.employee_id = e.id" + whereClause, countParams);

  // 2. data query
  const dataQuery = `
      SELECT 
          n.*, 
          e.FullName as employee_name, 
          e.EmployeeNumber as employee_number, 
          e.profile_image as employee_profile_image,
          d.name as department_name,
          m.FullName as manager_name,
          COALESCE(lt.type_name, l.leave_type, CASE WHEN n.request_type = 'Comp Off Request' THEN 'Compensatory Off' ELSE NULL END) as leave_type_name,
          ts.validation_remarks as validation_remarks,
          l.rejection_reason as leave_rejection_reason
      FROM inbox_notifications n
      LEFT JOIN employees e ON n.employee_id = e.id
      LEFT JOIN departments d ON e.DepartmentId = d.id
      LEFT JOIN employees m ON n.manager_id = m.id
      LEFT JOIN leaves l ON n.request_id = l.id
      LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
      LEFT JOIN timesheets ts ON n.request_id = ts.id AND n.request_type = 'Timesheet Request'
      ${whereClause}
      ORDER BY n.created_at DESC
      LIMIT 1 OFFSET 0
  `;
  const [rows] = await c.query(dataQuery, countParams);

  // 3. stats query
  const statsQuery = `
      SELECT 
          COUNT(*) as totalRequests,
          SUM(CASE WHEN n.status = 'Pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN n.status IN ('Approved', 'Verified') THEN 1 ELSE 0 END) as approved,
          SUM(CASE WHEN n.status = 'Rejected' THEN 1 ELSE 0 END) as rejected,
          SUM(CASE WHEN n.status = 'Pending' AND n.request_type = 'Leave Request' AND (n.title NOT LIKE '%WFH%' AND n.title NOT LIKE '%Work From Home%' AND n.description NOT LIKE '%WFH%' AND n.description NOT LIKE '%Work From Home%' AND n.title NOT LIKE '%Remote%' AND n.description NOT LIKE '%Remote%') THEN 1 ELSE 0 END) as leaveCount,
          SUM(CASE WHEN n.status = 'Pending' AND n.request_type = 'Comp Off Request' THEN 1 ELSE 0 END) as compOffCount,
          SUM(CASE WHEN n.status = 'Pending' AND n.request_type = 'Attendance Regularization' AND (n.title NOT LIKE '%WFH%' AND n.title NOT LIKE '%Work From Home%' AND n.description NOT LIKE '%WFH%' AND n.description NOT LIKE '%Work From Home%' AND n.title NOT LIKE '%Remote%' AND n.description NOT LIKE '%Remote%') THEN 1 ELSE 0 END) as attendanceCount,
          SUM(CASE WHEN n.status = 'Pending' AND n.request_type = 'Timesheet Request' THEN 1 ELSE 0 END) as timesheetCount,
          SUM(CASE WHEN n.status = 'Pending' AND n.request_type = 'Resignation Request' THEN 1 ELSE 0 END) as resignationCount,
          SUM(CASE WHEN n.status = 'Pending' AND (n.request_type = 'Work From Home' OR n.title LIKE '%WFH%' OR n.title LIKE '%Work From Home%' OR n.description LIKE '%WFH%' OR n.description LIKE '%Work From Home%') THEN 1 ELSE 0 END) as wfhCount,
          SUM(CASE WHEN n.status = 'Pending' AND (n.request_type = 'Remote Login' OR n.title LIKE '%Remote%' OR n.description LIKE '%Remote%') AND (n.title NOT LIKE '%WFH%' AND n.title NOT LIKE '%Work From Home%' AND n.description NOT LIKE '%WFH%' AND n.description NOT LIKE '%Work From Home%') THEN 1 ELSE 0 END) as remoteCount
      FROM inbox_notifications n
      LEFT JOIN employees e ON n.employee_id = e.id
      WHERE n.is_archived = 0
  `;
  const [statsRows] = await c.query(statsQuery, []);
  console.timeEnd('Inbox Full API Simulation');

  await c.end();
  process.exit(0);
}
testInbox().catch(console.error);

