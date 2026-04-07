const { findEmployeeByUserId } = require('../utils/helpers');

async function resolvePayrollEmployeeContext(req, res, next) {
  try {
    const role = String((req.user && req.user.role) || '').toLowerCase();
    const requestedEmployeeId = req.params.employeeId ? Number(req.params.employeeId) : null;

    if (role === 'admin' || role === 'hr' || role === 'finance') {
      req.payrollEmployeeId = requestedEmployeeId;
      return next();
    }

    const viewerEmployee = await findEmployeeByUserId(req.user.id);
    if (!viewerEmployee) {
      return res.status(403).json({ success: false, data: null, error: 'Unauthorized: Employee record not found' });
    }

    if (requestedEmployeeId && Number(viewerEmployee.id) !== requestedEmployeeId) {
      return res.status(403).json({ success: false, data: null, error: 'Unauthorized: You can only view your own payroll data' });
    }

    req.params.employeeId = String(viewerEmployee.id);
    req.payrollEmployeeId = Number(viewerEmployee.id);
    return next();
  } catch (error) {
    return res.status(500).json({ success: false, data: null, error: 'Authorization check failed' });
  }
}

module.exports = {
  resolvePayrollEmployeeContext
};