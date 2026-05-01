const payrollEngine = require('../services/payroll-engine-v3.service');

async function runPayroll(req, res) {
  const { year, month, runBy } = req.body;
  if (!year || !month) {
    return res.status(400).json({ success: false, data: null, error: 'year and month required' });
  }
  const runByUser = runBy || (req.user && req.user.id) || null;
  const response = await payrollEngine.runPayrollUnified({ year: Number(year), month: Number(month), runBy: runByUser });
  res.json(response);
}

async function listPayslips(req, res) {
  const employeeId = req.payrollEmployeeId || req.params.employeeId || req.query.employeeId;
  if (!employeeId) {
    return res.status(400).json({ success: false, data: null, error: 'employeeId required' });
  }
  const response = await payrollEngine.getPayslipsUnified(Number(employeeId), req.query);
  res.json(response);
}

async function payslipDetail(req, res) {
  const employeeId = Number(req.payrollEmployeeId || req.params.employeeId);
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  if (!employeeId || !year || !month) {
    return res.status(400).json({ success: false, data: null, error: 'employeeId, year, month required' });
  }
  const response = await payrollEngine.getPayslipsUnified(employeeId, { year, month });
  if (response.success && (!response.data || response.data.length === 0)) {
    return res.status(404).json({ success: false, data: null, error: 'Payslip not found' });
  }
  if (response.success && response.data && response.data.length > 0) {
    response.data = JSON.parse(response.data[0]);
  }
  res.json(response);
}

async function getSalaryStructure(req, res) {
  const employeeId = Number(req.payrollEmployeeId || req.params.employeeId);
  if (!employeeId) {
    return res.status(400).json({ success: false, data: null, error: 'employeeId required' });
  }
  const response = await payrollEngine.getSalaryStructureUnified(employeeId, req.query);
  if (response.success && !response.data) {
    return res.status(404).json({ success: false, data: null, error: 'Salary structure not found' });
  }
  res.json(response);
}

async function getAttendanceImpact(req, res) {
  const { year, month } = req.query;
  const employeeId = Number(req.payrollEmployeeId || req.query.employeeId || req.params.employeeId);
  if (!year || !month || !employeeId) {
    return res.status(400).json({ success: false, data: null, error: 'year, month, employeeId required' });
  }
  const response = await payrollEngine.getAttendanceImpactUnified(employeeId, Number(year), Number(month));
  res.json(response);
}

async function exportPayrollRun(req, res) {
  const { runId } = req.params;
  if (!runId) {
    return res.status(400).json({ success: false, error: 'runId is required' });
  }
  try {
    const buffer = await payrollEngine.exportPayrollRunUnified(Number(runId));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=Payroll_Run_${runId}.xlsx`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  runPayroll,
  listPayslips,
  payslipDetail,
  getSalaryStructure,
  getAttendanceImpact,
  exportPayrollRun
};
