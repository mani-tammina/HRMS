const jwt = require('jsonwebtoken');
const http = require('http');
const { JWT_SECRET } = require('../config/constants');

const token = jwt.sign(
  { id: 1, username: 'admin', role: 'admin', name: 'Admin User', type: 'access' },
  JWT_SECRET,
  { expiresIn: '1d' }
);

const req = http.request({
  hostname: 'localhost',
  port: 4201,
  path: '/api/payroll/v2/leave-attendance-payable?month=2026-10',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
}, res => {
  let raw = '';
  res.on('data', c => raw += c);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    try {
      const data = JSON.parse(raw);
      console.log('Success:', data.success);
      console.log('Policy:', data.noAttendancePolicy);
      console.log('Mapped employees count:', data.noAttendancePolicyEmployees?.length);
      console.log('Mapped employees:', data.noAttendancePolicyEmployees);
      console.log('No attendance records count:', data.noAttendance?.length);
      console.log('Top 6 records:', data.noAttendance?.slice(0, 6));
      console.log('Unique employees:', [...new Set(data.noAttendance?.map(r => r.employee_name))]);
    } catch (e) {
      console.log('Output:', raw);
    }
    process.exit(0);
  });
});
req.end();
