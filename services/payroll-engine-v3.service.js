// Payroll Engine V3 - Unified Facade Layer
// Routes all payroll operations through a single service for consistency
// Handles input normalization, response standardization, and unified logic

const { db } = require('../config/database');
const payrollService = require('./payroll.service');
const payrollMasterService = require('./payroll.master.service');
const lifecycleService = require('./payroll.lifecycle.service');

// Helper: Normalize date inputs to YYYY-MM format
function normalizeMonthYear(input) {
  if (typeof input === 'string' && input.includes('-')) {
    // Already YYYY-MM
    return input;
  }
  if (typeof input === 'object' && input.year && input.month) {
    // {year: 2025, month: 3} -> "2025-03"
    return `${input.year}-${String(input.month).padStart(2, '0')}`;
  }
  if (typeof input === 'string' && input.includes('/')) {
    // mm/yyyy -> YYYY-MM
    const [month, year] = input.split('/');
    return `${year}-${month.padStart(2, '0')}`;
  }
  // Assume it's already YYYY-MM or handle other cases
  return input;
}

// Helper: Standardize response format
function standardizeResponse(success, data = null, error = null) {
  return {
    success,
    data,
    error: error ? (typeof error === 'string' ? error : error.message) : null
  };
}

// Unified Payroll Run - Routes to appropriate engine
async function runPayrollUnified(params) {
  try {
    const { year, month, runBy, engine = 'v2' } = params;

    // Normalize input
    const normalizedMonth = normalizeMonthYear({ year, month });

    let result;
    if (engine === 'v2') {
      // Use the modern v2 service
      result = await payrollService.runPayroll(year, month, runBy);
    } else if (engine === 'legacy') {
      // Could route to legacy logic if needed
      // For now, default to v2
      result = await payrollService.runPayroll(year, month, runBy);
    }

    if (result && result.runId) {
      await lifecycleService.initializeRunLifecycle(result.runId, runBy, `Payroll run initialized for ${normalizedMonth}`);
      await lifecycleService.logChange({
        entityType: 'payroll_run',
        entityId: result.runId,
        action: 'CALCULATE',
        afterData: {
          cycleId: result.cycleId,
          totalEmployees: result.totalEmployees,
          totalGross: result.totalGross,
          totalDeductions: result.totalDeductions,
          totalNet: result.totalNet
        },
        performedBy: runBy
      });
    }

    return standardizeResponse(true, result);
  } catch (error) {
    return standardizeResponse(false, null, error);
  }
}

// Unified Payslip Retrieval
async function getPayslipsUnified(employeeId, filters = {}) {
  try {
    const { year, month, limit = 20 } = filters;

    let result;
    if (year && month) {
      // Specific month
      const payslip = await payrollService.getPayslipDetail(employeeId, year, month);
      result = payslip ? [payslip] : [];
    } else {
      // List of payslips
      result = await payrollService.getPayslipsForEmployee(employeeId, limit);
    }

    return standardizeResponse(true, result);
  } catch (error) {
    return standardizeResponse(false, null, error);
  }
}

// Unified Salary Structure
async function getSalaryStructureUnified(employeeId, options = {}) {
  try {
    const serviceOptions = {
      monthly: options.monthly === 'true' || options.monthly === true,
      date: options.date
    };
    const result = await payrollService.getSalaryStructureForEmployee(employeeId, serviceOptions);
    return standardizeResponse(true, result);
  } catch (error) {
    return standardizeResponse(false, null, error);
  }
}

// Unified Attendance Impact
async function getAttendanceImpactUnified(employeeId, year, month) {
  try {
    const result = await payrollService.getPayrollAttendanceImpact(year, month, employeeId);
    return standardizeResponse(true, result);
  } catch (error) {
    return standardizeResponse(false, null, error);
  }
}

// Placeholder for future dry-run functionality
async function previewPayroll(params) {
  // TODO: Implement dry-run logic
  return standardizeResponse(false, null, 'Dry-run not yet implemented');
}

module.exports = {
  runPayrollUnified,
  getPayslipsUnified,
  getSalaryStructureUnified,
  getAttendanceImpactUnified,
  previewPayroll,
  normalizeMonthYear,
  standardizeResponse
};