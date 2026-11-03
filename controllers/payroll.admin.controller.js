const { db } = require('../config/database');
const lifecycleService = require('../services/payroll.lifecycle.service');
const notificationService = require('../services/notification.service.enhanced');

function ok(res, data) {
  return res.json({ success: true, data, error: null });
}

function fail(res, status, error) {
  return res.status(status).json({ success: false, data: null, error });
}

function parseMonthInput(value) {
  if (!value || typeof value !== 'string') return null;
  const parts = value.split('-');
  if (parts.length !== 2) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!year || !month || month < 1 || month > 12) return null;
  return { year, month };
}

function isValidFinancialYear(value) {
  return typeof value === 'string' && /^\d{4}-\d{4}$/.test(value);
}

function parseFormulaOverride(formulaOrValue) {
  if (formulaOrValue === undefined || formulaOrValue === null) return null;
  const text = String(formulaOrValue).trim();
  if (!text) return null;

  if (/^-?\d+(\.\d+)?$/.test(text)) {
    return {
      value: Number(text),
      percentage_of_code: null
    };
  }

  const percentOfCode = text.match(/^(\d+(?:\.\d+)?)\s*%\s*(?:of\s*)?([A-Za-z0-9_]+)$/i);
  if (percentOfCode) {
    return {
      calculation_type: 'PERCENTAGE',
      value: Number(percentOfCode[1]),
      percentage_of_code: String(percentOfCode[2]).toUpperCase()
    };
  }

  const percentOnly = text.match(/^(\d+(?:\.\d+)?)\s*%$/);
  if (percentOnly) {
    return {
      calculation_type: 'PERCENTAGE',
      value: Number(percentOnly[1]),
      percentage_of_code: null
    };
  }

  return null;
}

function normalizeTaxProfilePayload(payload) {
  const normalized = Object.assign({}, payload || {});

  if (normalized.tax_regime != null) {
    const regime = String(normalized.tax_regime).toUpperCase();
    if (!['OLD', 'NEW'].includes(regime)) {
      const err = new Error('tax_regime must be OLD or NEW');
      err.statusCode = 400;
      throw err;
    }
    normalized.tax_regime = regime;
  }

  if (normalized.pan != null) {
    normalized.pan = String(normalized.pan).trim() || null;
  }

  if (normalized.is_tds_exempt != null) {
    if (typeof normalized.is_tds_exempt === 'boolean') {
      normalized.is_tds_exempt = normalized.is_tds_exempt ? 1 : 0;
    } else {
      normalized.is_tds_exempt = Number(normalized.is_tds_exempt) ? 1 : 0;
    }
  }

  if (Object.prototype.hasOwnProperty.call(normalized, 'declared_investments')) {
    const value = normalized.declared_investments;

    if (value === null) {
      normalized.declared_investments = null;
    } else if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        normalized.declared_investments = null;
      } else {
        try {
          const parsed = JSON.parse(trimmed);
          normalized.declared_investments = JSON.stringify(parsed);
        } catch (_) {
          const err = new Error('declared_investments must be valid JSON');
          err.statusCode = 400;
          throw err;
        }
      }
    } else if (typeof value === 'object') {
      normalized.declared_investments = JSON.stringify(value);
    } else {
      const err = new Error('declared_investments must be object, JSON string, or null');
      err.statusCode = 400;
      throw err;
    }
  }

  return normalized;
}

async function getAttendanceSummaryMap(c, year, month, employees) {
  const sd = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const ed = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

  if (!employees || employees.length === 0) return {};

  const attendanceRoutes = require('../routes/attendance-enhanced.routes');
  const result = {};

  for (const emp of employees) {
    try {
      const rep = await attendanceRoutes.getUnifiedAttendanceListAndSummary(c, emp.id, sd, ed, month, year);
      const summ = rep?.summary || {};
      const lopDays = Number(summ.lop_days || 0);
      const presentDays = Number(summ.present_days || 0);
      const totalDays = Number(summ.total_days || lastDay);

      result[emp.id] = {
        calendar_days: lastDay,
        lop_days: lopDays,
        paid_days: Math.max(0, lastDay - lopDays),
        present_days: presentDays,
        total_days: totalDays
      };
    } catch (e) {
      result[emp.id] = {
        calendar_days: lastDay,
        lop_days: 0,
        paid_days: lastDay,
        present_days: 0,
        total_days: lastDay
      };
    }
  }

  return result;
}

function normalizeTaxProfileRead(row) {
  if (!row) return null;
  const normalized = Object.assign({}, row);
  if (typeof normalized.declared_investments === 'string') {
    const raw = normalized.declared_investments.trim();
    if (!raw) {
      normalized.declared_investments = null;
    } else {
      try {
        normalized.declared_investments = JSON.parse(raw);
      } catch (_) {
        normalized.declared_investments = null;
      }
    }
  }
  return normalized;
}

async function buildRunValidation(year, month) {
  const c = await db();
  try {
    const sd = `${year}-${String(month).padStart(2, '0')}-01`;
    const ed = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;

    const [existingRun] = await c.query(
      `SELECT r.id FROM payroll_runs r 
       JOIN payroll_cycles cy ON cy.id = r.cycle_id 
       WHERE cy.year = ? AND cy.month = ? AND r.status != 'FAILED'
       ORDER BY r.id DESC LIMIT 1`,
      [year, month]
    );
    const runId = existingRun.length > 0 ? existingRun[0].id : null;

    const [employees] = await c.query(
      `SELECT e.id, e.EmployeeNumber, e.FullName
       FROM employees e
       INNER JOIN (
         SELECT DISTINCT employee_id 
         FROM attendance 
         WHERE attendance_date BETWEEN ? AND ?
       ) a ON e.id = a.employee_id
       INNER JOIN (
         SELECT DISTINCT employee_id
         FROM employee_salary_contracts
         WHERE status = 'Active'
           AND effective_from <= LAST_DAY(?)
           AND (effective_to IS NULL OR effective_to >= DATE_FORMAT(?, '%Y-%m-01'))
       ) esc ON e.id = esc.employee_id
       WHERE e.EmploymentStatus = 'Working'`,
      [sd, ed, sd, sd]
    );

    const [withStructure] = await c.query(
      `SELECT DISTINCT employee_id
       FROM employee_salary_contracts
       WHERE status = 'Active'
         AND effective_from <= LAST_DAY(?)
         AND (effective_to IS NULL OR effective_to >= DATE_FORMAT(?, '%Y-%m-01'))`,
      [`${year}-${String(month).padStart(2, '0')}-01`, `${year}-${String(month).padStart(2, '0')}-01`]
    );

    const [attendance] = await c.query(
      `SELECT DISTINCT employee_id
       FROM attendance
       WHERE YEAR(attendance_date) = ? AND MONTH(attendance_date) = ?`,
      [year, month]
    );

    const allEmployees = employees.map(e => ({ id: Number(e.id), name: e.FullName, number: e.EmployeeNumber }));
    const structureEmployees = new Set(withStructure.map((r) => Number(r.employee_id)));
    const attendanceEmployees = new Set(attendance.map((r) => Number(r.employee_id)));

    const missingAttendance = [];

    for (const emp of allEmployees) {
      if (!attendanceEmployees.has(emp.id)) {
        missingAttendance.push({ employeeId: emp.id, employeeName: emp.name });
      }
    }

    return {
      month: `${year}-${String(month).padStart(2, '0')}`,
      runId: runId,
      totalEmployees: allEmployees.length,
      withSalaryStructure: structureEmployees.size,
      withAttendance: attendanceEmployees.size,
      // No longer reporting missing salary structure errors per user request
      missingSalaryStructureCount: 0,
      missingAttendanceCount: missingAttendance.length,
      missingSalaryStructure: [],
      missingAttendance: missingAttendance.slice(0, 50),
      // Valid if we have any employees to process
      valid: allEmployees.length > 0
    };
  } finally {
    c.end();
  }
}

async function calculateDryRunFinancials(c, year, month) {
  const sd = `${year}-${String(month).padStart(2, '0')}-01`;
  const ed = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;

  const [allEmployees] = await c.query(`
    SELECT e.id, e.EmployeeNumber, e.FullName, d.name as Designation, dept.name as Department,
           esc.template_id, t.template_name, esc.annual_ctc,
           wop.sunday_off, wop.monday_off, wop.tuesday_off, wop.wednesday_off, 
           wop.thursday_off, wop.friday_off, wop.saturday_off
    FROM employees e
    INNER JOIN (
      SELECT DISTINCT employee_id 
      FROM attendance 
      WHERE attendance_date BETWEEN ? AND ?
    ) att ON e.id = att.employee_id
    INNER JOIN employee_salary_contracts esc ON esc.employee_id = e.id AND esc.status = 'Active'
      AND esc.effective_from <= LAST_DAY(?)
      AND (esc.effective_to IS NULL OR esc.effective_to >= DATE_FORMAT(?, '%Y-%m-01'))
    LEFT JOIN designations d ON d.id = e.DesignationId
    LEFT JOIN departments dept ON dept.id = e.DepartmentId
    LEFT JOIN salary_structure_templates t ON t.template_id = esc.template_id
    LEFT JOIN weekly_off_policies wop ON e.weekly_off_policy_id = wop.id
    WHERE e.EmploymentStatus = 'Working'
  `, [sd, ed, sd, sd]);

  if (!allEmployees.length) {
    return {
      deposit: 0,
      deductions: 0,
      contributions: 0,
      totalCost: 0,
      gross: 0,
      payingCount: 0,
      pf: { employeesPaying: 0, employeeShare: 0, employerShare: 0, totalPf: 0, employees: [] },
      esi: { employeesPaying: 0, employeeShare: 0, employerShare: 0, totalEsi: 0, employees: [] },
      professionalTax: { employeesPaying: 0, totalTax: 0, employees: [] },
      allCalculated: []
    };
  }

  const attSummaryMap = await getAttendanceSummaryMap(c, year, month, allEmployees);

  const templateIds = [...new Set(allEmployees.map(e => e.template_id).filter(Boolean))];
  let compMap = {};
  if (templateIds.length > 0) {
    const [compositions] = await c.query(`
      SELECT sc.*, 
             COALESCE(mc.code, lc.code) AS component_code,
             COALESCE(mc.name, lc.name) AS component_name,
             COALESCE(mc.component_type, lc.component_type) AS component_type,
             COALESCE(mc.calculation_type, lc.calculation_type) AS calculation_type,
             COALESCE(mc.value, lc.value) AS default_value,
             COALESCE(mc.percentage_of_code, lc.percentage_of_code) AS percentage_of_code,
             COALESCE(mc.sequence, lc.sequence) AS sequence
      FROM structure_composition sc
      LEFT JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
      LEFT JOIN salary_components lc ON lc.id = sc.component_id
      WHERE sc.template_id IN (?)
    `, [templateIds]);
    
    compMap = compositions.reduce((acc, comp) => {
      if (!acc[comp.template_id]) acc[comp.template_id] = [];
      acc[comp.template_id].push(comp);
      return acc;
    }, {});
  }

  let aggGross = 0;
  let aggNet = 0;
  let aggDeductions = 0;
  let aggContributions = 0;
  let aggPfEmployees = 0;
  let aggPfEmployeeShare = 0;
  let aggPfEmployerShare = 0;
  const pfBreakdown = [];
  let aggEsiEmployees = 0;
  let aggEsiEmployeeShare = 0;
  let aggEsiEmployerShare = 0;
  const esiBreakdown = [];
  let aggPtEmployees = 0;
  let aggPtAmount = 0;
  const ptBreakdown = [];

  const allCalculated = allEmployees.map(emp => {
    const annualCTC = Number(emp.annual_ctc || 0);
    const monthlyGross = Math.round(annualCTC / 12);
    const comps = compMap[emp.template_id] || [];
    
    const attSummary = attSummaryMap[emp.id] || { calendar_days: 30, lop_days: 0, paid_days: 30 };
    const lopDays = attSummary.lop_days;
    const calendarDays = attSummary.calendar_days;
    const paidDays = attSummary.paid_days;
    const proRataFactor = calendarDays > 0 ? (paidDays / calendarDays) : 1;

    const basicComp = comps.find(c => c.component_code === 'BASIC' || c.component_name === 'Basic Salary');
    let fullMonthlyBasic = 0;
    if (basicComp) {
        const override = parseFormulaOverride(basicComp.formula_or_value);
        let inputVal = Number(basicComp.default_value || 0);
        let calculation_type = basicComp.calculation_type;
        if (override) {
            if (override.calculation_type) calculation_type = override.calculation_type;
            inputVal = override.value;
        }
        if (calculation_type === 'PERCENTAGE') {
            fullMonthlyBasic = (monthlyGross * inputVal) / 100.0;
        } else {
            fullMonthlyBasic = inputVal / 12.0;
        }
    }

    const computed = {};
    let totalEarnings = 0;
    let totalDeductions = 0;
    let specialIdx = -1;

    const sortedComps = [...comps].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

    const calculatedComponents = sortedComps.map((r, idx) => {
      if (r.component_code === 'SPECIAL' || r.component_name === 'Special Allowance') {
        specialIdx = idx;
        return { ...r, calculated_amount: 0 };
      }

      const override = parseFormulaOverride(r.formula_or_value);
      let calculation_type = r.calculation_type;
      let inputVal = Number(r.default_value || 0);
      let percentage_of_code = r.percentage_of_code;

      if (override) {
        if (override.calculation_type) calculation_type = override.calculation_type;
        inputVal = override.value;
        if (override.percentage_of_code) percentage_of_code = override.percentage_of_code;
      }

      const isPT = r.component_code === 'PROF_TAX' || r.component_code === 'PT' || /prof.*tax/i.test(r.component_name || '');

      let amt = 0;
      if (calculation_type === 'PERCENTAGE') {
        if (percentage_of_code && computed[percentage_of_code] !== undefined) {
          // If percentage of another component (e.g. PF = 12% of BASIC):
          // computed[percentage_of_code] is ALREADY pro-rated by LOP.
          amt = (computed[percentage_of_code] * inputVal) / 100.0;
        } else {
          // If percentage of Gross (e.g. ESI = 0.75% / 3.25% of Gross):
          // Calculated on the pro-rated gross as per LOP days
          amt = (monthlyGross * proRataFactor * inputVal) / 100.0;
        }
      } else {
        if (isPT) {
          // Professional Tax will remain same, no minus for LOP's
          amt = inputVal > 1000 ? (inputVal / 12.0) : inputVal;
        } else {
          // Fixed component pro-rated by attendance / LOP
          amt = (inputVal / 12.0) * proRataFactor;
        }
      }

      const rounded = Math.round(amt);
      computed[r.component_code] = rounded;
      
      if (r.component_type === 'EARNING') {
        totalEarnings += rounded;
      } else {
        totalDeductions += rounded;
      }

      return { ...r, calculated_amount: rounded };
    });

    if (specialIdx !== -1) {
      const targetGross = Math.round(monthlyGross * proRataFactor);
      const specialAmt = Math.max(0, targetGross - totalEarnings);
      calculatedComponents[specialIdx].calculated_amount = specialAmt;
      computed['SPECIAL'] = specialAmt;
      totalEarnings += specialAmt;
    }

    let erBundle = 0;
    let employeePf = 0;
    let hasExplicitPfEr = false;
    let employeeEsi = 0;
    let employerPf = 0;
    let employerEsi = 0;
    let employeePt = 0;
    let empTaxesAndOther = 0;

    calculatedComponents.forEach(c => {
      const isEr = /employer|employeer/i.test(c.component_name) || /_ER$/i.test(c.component_code);
      const code = (c.component_code || '').toUpperCase();
      const name = (c.component_name || '').toUpperCase();

      if (isEr) {
        erBundle += c.calculated_amount;
        if (code.includes('ESI') || name.includes('ESI')) {
          employerEsi += c.calculated_amount;
        } else if (code.includes('PF') || name.includes('PROVIDENT') || name.includes('PF')) {
          employerPf += c.calculated_amount;
          hasExplicitPfEr = true;
        }
      } else if (c.component_type === 'DEDUCTION') {
        if (code.includes('PF') || name.includes('PF') || name.includes('PROVIDENT')) {
          employeePf += c.calculated_amount;
        } else if (code.includes('ESI') || name.includes('ESI')) {
          employeeEsi += c.calculated_amount;
        } else {
          empTaxesAndOther += c.calculated_amount;
          if (code.includes('PROF') || code === 'PT' || name.includes('PROFESSIONAL')) {
            employeePt += c.calculated_amount;
          }
        }
      }
    });

    if (employerPf === 0 && employeePf > 0) {
      employerPf = employeePf;
    }
    if (employerEsi === 0 && employeeEsi > 0) {
      employerEsi = Math.round(employeeEsi * (3.25 / 0.75));
    }

    if (specialIdx !== -1) {
      calculatedComponents[specialIdx].calculated_amount -= erBundle;
    }

    const finalComponents = calculatedComponents.filter(c => {
      const isEr = /employer|employeer/i.test(c.component_name) || /_ER$/i.test(c.component_code);
      const isESI_ER = /ESI_ER/i.test(c.component_code || '');
      return !isEr || isESI_ER;
    });

    const finalGross = totalEarnings - erBundle;
    const finalDeductions = totalDeductions - erBundle;
    const net = finalGross - finalDeductions;
    const empContributions = erBundle + (hasExplicitPfEr ? 0 : employeePf);

    if (employeePf > 0 || employerPf > 0) {
      aggPfEmployees++;
      aggPfEmployeeShare += employeePf;
      aggPfEmployerShare += employerPf;
      pfBreakdown.push({
        employeeId: emp.id,
        employeeNumber: emp.EmployeeNumber,
        fullName: emp.FullName,
        designation: emp.Designation,
        employeeShare: employeePf,
        employerShare: employerPf,
        totalPf: employeePf + employerPf
      });
    }

    if (employeeEsi > 0 || employerEsi > 0) {
      aggEsiEmployees++;
      aggEsiEmployeeShare += employeeEsi;
      aggEsiEmployerShare += employerEsi;
      esiBreakdown.push({
        employeeId: emp.id,
        employeeNumber: emp.EmployeeNumber,
        fullName: emp.FullName,
        designation: emp.Designation,
        employeeShare: employeeEsi,
        employerShare: employerEsi,
        totalEsi: employeeEsi + employerEsi
      });
    }

    if (employeePt > 0) {
      aggPtEmployees++;
      aggPtAmount += employeePt;
      ptBreakdown.push({
        employeeId: emp.id,
        employeeNumber: emp.EmployeeNumber,
        fullName: emp.FullName,
        designation: emp.Designation,
        amount: employeePt
      });
    }

    aggGross += finalGross;
    aggNet += net;
    aggDeductions += finalDeductions;
    aggContributions += empContributions;

    return {
      employee_id: emp.id,
      employee_number: emp.EmployeeNumber,
      full_name: emp.FullName,
      designation: emp.Designation,
      department: emp.Department,
      template_name: emp.template_name,
      annual_ctc: annualCTC,
      monthly_gross: monthlyGross,
      total_earnings: finalGross,
      total_deductions: finalDeductions,
      total_net: net,
      total_net_payout: net,
      lop_days: lopDays,
      calendar_days: calendarDays,
      paid_days: paidDays,
      present_days: attSummary.present_days !== undefined ? attSummary.present_days : 0,
      total_days: attSummary.total_days !== undefined ? attSummary.total_days : calendarDays,
      components: finalComponents.map(c => ({
        code: c.component_code,
        name: c.component_name,
        type: c.component_type,
        amount: c.calculated_amount
      }))
    };
  });

  const deposit = Math.round(aggNet * 100) / 100;
  const deductions = Math.round(aggDeductions * 100) / 100;
  const contributions = Math.round(aggContributions * 100) / 100;
  const deductionsContributions = Math.round((deductions + contributions) * 100) / 100;
  const totalCost = Math.round((deposit + deductions + contributions) * 100) / 100;

  return {
    deposit,
    deductions,
    contributions,
    deductionsContributions,
    totalCost,
    gross: Math.round(aggGross * 100) / 100,
    payingCount: allEmployees.length,
    pf: {
      employeesPaying: aggPfEmployees,
      employeeShare: Math.round(aggPfEmployeeShare * 100) / 100,
      employerShare: Math.round(aggPfEmployerShare * 100) / 100,
      totalPf: Math.round((aggPfEmployeeShare + aggPfEmployerShare) * 100) / 100,
      employees: pfBreakdown
    },
    esi: {
      employeesPaying: aggEsiEmployees,
      employeeShare: Math.round(aggEsiEmployeeShare * 100) / 100,
      employerShare: Math.round(aggEsiEmployerShare * 100) / 100,
      totalEsi: Math.round((aggEsiEmployeeShare + aggEsiEmployerShare) * 100) / 100,
      employees: esiBreakdown
    },
    professionalTax: {
      employeesPaying: aggPtEmployees,
      totalTax: Math.round(aggPtAmount * 100) / 100,
      employees: ptBreakdown
    },
    allCalculated
  };
}

async function previewRun(req, res) {
  try {
    const year = Number(req.body.year);
    const month = Number(req.body.month);
    if (!year || !month) return fail(res, 400, 'year and month required');

    const validation = await buildRunValidation(year, month);

    const c = await db();
    const page = Number(req.body.page) || 1;
    const limit = Number(req.body.limit) || 20;
    const offset = (page - 1) * limit;

    const dryRun = await calculateDryRunFinancials(c, year, month);
    c.end();

    const detailedList = dryRun.allCalculated.slice(offset, offset + limit);

    return ok(res, {
      mode: 'DRY_RUN',
      validation,
      estimate: {
        employeeCount: dryRun.payingCount,
        totalGross: dryRun.gross,
        totalDeductions: dryRun.deductions,
        totalContributions: dryRun.contributions,
        totalDeductionsContributions: dryRun.deductionsContributions !== undefined ? dryRun.deductionsContributions : Math.round((dryRun.deductions + dryRun.contributions) * 100) / 100,
        totalPayrollCost: dryRun.totalCost,
        pf: dryRun.pf,
        esi: dryRun.esi,
        professionalTax: dryRun.professionalTax,
        totalNet: dryRun.deposit,
        totalPayout: dryRun.deposit
      },
      detailedPreview: detailedList,
      pagination: {
        total: dryRun.payingCount,
        pages: Math.ceil(dryRun.payingCount / limit) || 1,
        currentPage: page,
        limit: limit
      }
    });
  } catch (err) {
    return fail(res, 500, err.message);
  }
}

async function validateRun(req, res) {
  try {
    const monthInput = req.query.month || req.body.month;
    const parsed = parseMonthInput(monthInput);
    if (!parsed) return fail(res, 400, 'month required in YYYY-MM format');

    const validation = await buildRunValidation(parsed.year, parsed.month);
    return ok(res, validation);
  } catch (err) {
    return fail(res, 500, err.message);
  }
}

async function calculateRunFinancials(c, run) {
  if (!run || !run.id) {
    return {
      deposit: 0,
      deductions: 0,
      contributions: 0,
      totalCost: 0,
      payingCount: 0,
      pf: { employeesPaying: 0, employeeShare: 0, employerShare: 0, totalPf: 0, employees: [] },
      esi: { employeesPaying: 0, employeeShare: 0, employerShare: 0, totalEsi: 0, employees: [] },
      professionalTax: { employeesPaying: 0, totalTax: 0, employees: [] }
    };
  }

  // 1. Fetch salaries summary
  const [salRows] = await c.query(
    `SELECT 
       COUNT(*) as count,
       COALESCE(SUM(gross_earnings), 0) as totalGross,
       COALESCE(SUM(total_deductions), 0) as totalDeductions,
       COALESCE(SUM(net_pay), 0) as totalNet
     FROM payroll_employee_salaries
     WHERE run_id = ?`,
    [run.id]
  );
  const salStats = salRows[0] || { count: 0, totalGross: 0, totalDeductions: 0, totalNet: 0 };
  const salCount = Number(salStats.count) || Number(run.total_employees) || 0;
  let totalGross = Number(salStats.totalGross) || Number(run.total_gross) || 0;
  let totalDeductions = Number(salStats.totalDeductions) || Number(run.total_deductions) || 0;
  let totalNet = Number(salStats.totalNet) || Number(run.total_net) || 0;

  // 2. Fetch detailed tax deductions (PF, ESI, PT, TDS)
  const [taxRows] = await c.query(
    `SELECT 
       COALESCE(SUM(t.amount), 0) as sumTax,
       COALESCE(SUM(CASE WHEN t.deduction_code IN ('PF_EMP', 'PF_DEDUCT') OR t.deduction_name LIKE '%PF%' OR t.deduction_name LIKE '%Provident%' THEN t.amount ELSE 0 END), 0) as sumPfEmp,
       COALESCE(SUM(CASE WHEN t.deduction_code IN ('ESI_EE') OR t.deduction_name LIKE '%ESI%' THEN t.amount ELSE 0 END), 0) as sumEsiEmp,
       COALESCE(SUM(CASE WHEN t.deduction_code NOT IN ('PF_EMP', 'PF_DEDUCT', 'ESI_EE') AND t.deduction_name NOT LIKE '%PF%' AND t.deduction_name NOT LIKE '%Provident%' AND t.deduction_name NOT LIKE '%ESI%' THEN t.amount ELSE 0 END), 0) as sumOtherDeductions
     FROM payroll_tax_deductions t
     JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
     WHERE s.run_id = ?`,
    [run.id]
  );
  const sumTax = Number(taxRows[0]?.sumTax) || 0;
  const sumPfEmp = Number(taxRows[0]?.sumPfEmp) || 0;
  const sumEsiEmp = Number(taxRows[0]?.sumEsiEmp) || 0;
  const sumOtherDeductions = Number(taxRows[0]?.sumOtherDeductions) || 0;

  // 3. Employer Contributions
  // Fetch employer ESI or PF breakups if present
  const [breakupRows] = await c.query(
    `SELECT 
       COALESCE(SUM(CASE WHEN b.component_code = 'ESI_ER' OR b.component_name LIKE '%Employer%ESI%' THEN b.amount ELSE 0 END), 0) as sumEsiEr,
       COALESCE(SUM(CASE WHEN b.component_name LIKE '%Employer%PF%' THEN b.amount ELSE 0 END), 0) as sumPfErBreakup
     FROM payroll_salary_breakups b
     JOIN payroll_employee_salaries s ON s.id = b.employee_salary_id
     WHERE s.run_id = ?`,
    [run.id]
  );
  const sumEsiEr = Number(breakupRows[0]?.sumEsiEr) || 0;
  const sumPfErBreakup = Number(breakupRows[0]?.sumPfErBreakup) || 0;

  // Under statutory rules, Employer PF matches Employee PF (12%)
  const employerPf = sumPfErBreakup > 0 ? sumPfErBreakup : sumPfEmp;
  const employerEsi = sumEsiEr > 0 ? sumEsiEr : (sumEsiEmp > 0 ? Math.ceil(sumEsiEmp * (3.25 / 0.75)) : 0);

  // Total Contributions = All EPF (Employee + Employer) + All ESI (Employee + Employer)
  const totalContributions = (sumPfEmp + employerPf) + (sumEsiEmp + employerEsi);

  // Total Deductions = Professional Tax and other taxes (excluding EPF and ESI)
  totalDeductions = sumOtherDeductions;
  if (sumTax === 0 && Number(salStats.totalDeductions) > 0) {
    totalDeductions = Math.max(0, Number(salStats.totalDeductions) - sumPfEmp - sumEsiEmp);
  }

  // 4. Employee Deposit (Net Pay)
  let employeeDeposit = totalNet;
  if (totalGross > 0 && (employeeDeposit === 0 || Math.abs(employeeDeposit - totalGross) < 0.01)) {
    employeeDeposit = Math.max(0, totalGross - (sumPfEmp + sumEsiEmp + totalDeductions));
  }

  // 5. Total Payroll Cost = Employee Deposit + Total Deductions + Total contributions
  const depositRounded = Math.round(employeeDeposit * 100) / 100;
  const deductionsRounded = Math.round(totalDeductions * 100) / 100;
  const contributionsRounded = Math.round(totalContributions * 100) / 100;
  const totalPayrollCost = Math.round((depositRounded + deductionsRounded + contributionsRounded) * 100) / 100;

  const [pfEmpCountRows] = await c.query(
    `SELECT COUNT(DISTINCT s.id) as pfCount
     FROM payroll_tax_deductions t
     JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
     WHERE s.run_id = ? AND (t.deduction_code IN ('PF_EMP', 'PF_DEDUCT') OR t.deduction_name LIKE '%PF%' OR t.deduction_name LIKE '%Provident%')`,
    [run.id]
  );
  const pfCount = Number(pfEmpCountRows[0]?.pfCount) || (sumPfEmp > 0 ? salCount : 0);

  let runPfBreakdown = [];
  try {
    const [pfRows] = await c.query(
      `SELECT s.employee_id as employeeId, e.FullName as fullName, e.EmployeeNumber as employeeNumber, d.name as designation,
              COALESCE(SUM(t.amount), 0) as employeeShare
       FROM payroll_tax_deductions t
       JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
       LEFT JOIN employees e ON e.id = s.employee_id
       LEFT JOIN designations d ON d.id = e.DesignationId
       WHERE s.run_id = ? AND (t.deduction_code IN ('PF_EMP', 'PF_DEDUCT') OR t.deduction_name LIKE '%PF%' OR t.deduction_name LIKE '%Provident%')
       GROUP BY s.employee_id, e.FullName, e.EmployeeNumber, d.name`,
      [run.id]
    );
    runPfBreakdown = pfRows.map(r => {
      const ee = Number(r.employeeShare) || 0;
      return {
        employeeId: r.employeeId,
        employeeNumber: r.employeeNumber,
        fullName: r.fullName,
        designation: r.designation,
        employeeShare: ee,
        employerShare: ee,
        totalPf: ee * 2
      };
    });
  } catch (err) {}

  const [esiEmpCountRows] = await c.query(
    `SELECT COUNT(DISTINCT s.id) as esiCount
     FROM payroll_tax_deductions t
     JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
     WHERE s.run_id = ? AND (t.deduction_code IN ('ESI_EE') OR t.deduction_name LIKE '%ESI%')`,
    [run.id]
  );
  const esiCount = Number(esiEmpCountRows[0]?.esiCount) || (sumEsiEmp > 0 ? salCount : 0);

  let runEsiBreakdown = [];
  try {
    const [esiRows] = await c.query(
      `SELECT s.employee_id as employeeId, e.FullName as fullName, e.EmployeeNumber as employeeNumber, d.name as designation,
              COALESCE(SUM(t.amount), 0) as employeeShare
       FROM payroll_tax_deductions t
       JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
       LEFT JOIN employees e ON e.id = s.employee_id
       LEFT JOIN designations d ON d.id = e.DesignationId
       WHERE s.run_id = ? AND (t.deduction_code IN ('ESI_EE') OR t.deduction_name LIKE '%ESI%')
       GROUP BY s.employee_id, e.FullName, e.EmployeeNumber, d.name`,
      [run.id]
    );
    runEsiBreakdown = esiRows.map(r => {
      const ee = Number(r.employeeShare) || 0;
      const er = Math.round(ee * (3.25 / 0.75));
      return {
        employeeId: r.employeeId,
        employeeNumber: r.employeeNumber,
        fullName: r.fullName,
        designation: r.designation,
        employeeShare: ee,
        employerShare: er,
        totalEsi: ee + er
      };
    });
  } catch (err) {}

  const [ptEmpCountRows] = await c.query(
    `SELECT COUNT(DISTINCT s.id) as ptCount, COALESCE(SUM(t.amount), 0) as sumPt
     FROM payroll_tax_deductions t
     JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
     WHERE s.run_id = ? AND (t.deduction_code IN ('PT', 'PROF_TAX') OR t.deduction_name LIKE '%Professional%')`,
    [run.id]
  );
  const ptCount = Number(ptEmpCountRows[0]?.ptCount) || 0;
  const sumPt = Number(ptEmpCountRows[0]?.sumPt) || 0;

  let runPtBreakdown = [];
  try {
    const [ptRows] = await c.query(
      `SELECT s.employee_id as employeeId, e.FullName as fullName, e.EmployeeNumber as employeeNumber, d.name as designation,
              COALESCE(SUM(t.amount), 0) as amount
       FROM payroll_tax_deductions t
       JOIN payroll_employee_salaries s ON s.id = t.employee_salary_id
       LEFT JOIN employees e ON e.id = s.employee_id
       LEFT JOIN designations d ON d.id = e.DesignationId
       WHERE s.run_id = ? AND (t.deduction_code IN ('PT', 'PROF_TAX') OR t.deduction_name LIKE '%Professional%')
       GROUP BY s.employee_id, e.FullName, e.EmployeeNumber, d.name`,
      [run.id]
    );
    runPtBreakdown = ptRows.map(r => ({
      employeeId: r.employeeId,
      employeeNumber: r.employeeNumber,
      fullName: r.fullName,
      designation: r.designation,
      amount: Number(r.amount) || 0
    }));
  } catch (err) {}

  return {
    deposit: depositRounded,
    deductions: deductionsRounded,
    contributions: contributionsRounded,
    totalCost: totalPayrollCost,
    gross: totalGross,
    payingCount: salCount,
    pf: {
      employeesPaying: pfCount,
      employeeShare: Math.round(sumPfEmp * 100) / 100,
      employerShare: Math.round(employerPf * 100) / 100,
      totalPf: Math.round((sumPfEmp + employerPf) * 100) / 100,
      employees: runPfBreakdown
    },
    esi: {
      employeesPaying: esiCount,
      employeeShare: Math.round(sumEsiEmp * 100) / 100,
      employerShare: Math.round(employerEsi * 100) / 100,
      totalEsi: Math.round((sumEsiEmp + employerEsi) * 100) / 100,
      employees: runEsiBreakdown
    },
    professionalTax: {
      employeesPaying: ptCount,
      totalTax: Math.round(sumPt * 100) / 100,
      employees: runPtBreakdown
    }
  };
}

async function getPayrollDashboard(req, res) {
  try {
    const monthInput = req.query.month;
    const parsed = parseMonthInput(monthInput);
    if (!parsed) return fail(res, 400, 'month required in YYYY-MM format');

    const c = await db();

    // 1. Total Active Working Employees
    const [activeEmpRows] = await c.query("SELECT COUNT(*) as cnt FROM employees WHERE EmploymentStatus = 'Working'");
    const totalEmployees = activeEmpRows[0]?.cnt || 0;

    const daysInMonth = new Date(parsed.year, parsed.month, 0).getDate();
    const monthStartStr = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-01`;
    const monthEndStr = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

    let joiners = 0;
    let leavers = 0;
    try {
      const [jRows] = await c.query("SELECT COUNT(*) as cnt FROM employees WHERE DateJoined >= ? AND DateJoined <= ?", [monthStartStr, monthEndStr]);
      joiners = jRows[0]?.cnt || 0;
      const [lRows] = await c.query("SELECT COUNT(*) as cnt FROM employees WHERE exit_date >= ? AND exit_date <= ?", [monthStartStr, monthEndStr]);
      leavers = lRows[0]?.cnt || 0;
    } catch (e) {}

    // 2. Financial Year Timeline (12 months from Apr of fyStart to Mar of fyStart+1)
    const fyStart = parsed.month >= 4 ? parsed.year : parsed.year - 1;
    const fyMonths = [];
    for (let m = 4; m <= 12; m++) fyMonths.push({ year: fyStart, month: m });
    for (let m = 1; m <= 3; m++) fyMonths.push({ year: fyStart + 1, month: m });

    const [fyRuns] = await c.query(
      `SELECT r.id, r.status, r.total_employees, r.total_gross, r.total_deductions, r.total_net, cy.year, cy.month
       FROM payroll_runs r
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE (cy.year = ? AND cy.month >= 4) OR (cy.year = ? AND cy.month <= 3)
       ORDER BY r.id DESC`,
      [fyStart, fyStart + 1]
    );

    const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const MONTH_NAMES_UPPER = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

    const timeline = fyMonths.map(item => {
      const run = fyRuns.find(r => r.year === item.year && r.month === item.month);
      const mStr = `${item.year}-${String(item.month).padStart(2, '0')}`;
      const mDays = new Date(item.year, item.month, 0).getDate();
      const mNameUpper = MONTH_NAMES_UPPER[item.month - 1];
      const mNameShort = MONTH_NAMES_SHORT[item.month - 1];
      const dateRange = `01 ${mNameUpper}-${mDays} ${mNameUpper}`;
      const label = `${mNameShort} ${item.year}`;
      const isCurrent = (item.year === parsed.year && item.month === parsed.month);

      let status = 'UPCOMING';
      if (run && (run.status === 'COMPLETED' || run.status === 'PAID')) {
        status = 'COMPLETED';
      } else if (run) {
        status = 'IN_PROGRESS';
      } else if (isCurrent) {
        status = 'CURRENT';
      }

      return {
        monthStr: mStr,
        year: item.year,
        month: item.month,
        label,
        dateRange,
        totalDays: mDays,
        status,
        isCurrent,
        runId: run ? run.id : null,
        totalEmployees: run ? run.total_employees : 0,
        totalGross: run ? Number(run.total_gross) : 0,
        totalDeductions: run ? Number(run.total_deductions) : 0,
        totalNet: run ? Number(run.total_net) : 0
      };
    });

    // 3. Selected Month Latest Run
    const [selectedRuns] = await c.query(
      `SELECT r.id, r.status, r.total_employees, r.total_gross, r.total_deductions, r.total_net, cy.year, cy.month
       FROM payroll_runs r
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE cy.year = ? AND cy.month = ?
       ORDER BY r.id DESC LIMIT 1`,
      [parsed.year, parsed.month]
    );
    const currentRun = selectedRuns[0] || null;

    // 4. Previous Month
    const prevYear = parsed.month === 1 ? parsed.year - 1 : parsed.year;
    const prevMonth = parsed.month === 1 ? 12 : parsed.month - 1;
    const [prevRuns] = await c.query(
      `SELECT r.id, r.status, r.total_employees, r.total_gross, r.total_deductions, r.total_net
       FROM payroll_runs r
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE cy.year = ? AND cy.month = ?
       ORDER BY r.id DESC LIMIT 1`,
      [prevYear, prevMonth]
    );
    const prevRun = prevRuns[0] || null;
    const prevMonthNameUpper = MONTH_NAMES_UPPER[prevMonth - 1];

    let payslipsCount = 0;
    if (currentRun) {
      try {
        const [psRows] = await c.query(
          `SELECT COUNT(*) as cnt FROM payroll_payslips p
           JOIN payroll_employee_salaries s ON s.id = p.employee_salary_id
           WHERE s.run_id = ?`,
          [currentRun.id]
        );
        payslipsCount = psRows[0]?.cnt || 0;
      } catch (e) {}
      if (payslipsCount === 0 && (currentRun.status === 'COMPLETED' || currentRun.status === 'PAID')) {
        payslipsCount = currentRun.total_employees || 0;
      }
    }

    let currentFinancials = await calculateDryRunFinancials(c, parsed.year, parsed.month);
    if (!currentFinancials || currentFinancials.payingCount === 0) {
      if (currentRun) {
        currentFinancials = await calculateRunFinancials(c, currentRun);
      }
    }

    let prevFinancials = await calculateDryRunFinancials(c, prevYear, prevMonth);
    if (!prevFinancials || prevFinancials.payingCount === 0) {
      if (prevRun) {
        prevFinancials = await calculateRunFinancials(c, prevRun);
      }
    }

    const [summary] = await c.query(
      `SELECT
         COUNT(DISTINCT r.id) AS runCount,
         COALESCE(SUM(r.total_employees), 0) AS totalEmployeesProcessed,
         COALESCE(SUM(r.total_gross), 0) AS totalGross,
         COALESCE(SUM(r.total_deductions), 0) AS totalDeductions,
         COALESCE(SUM(r.total_net), 0) AS totalNet
       FROM payroll_runs r
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE cy.year = ? AND cy.month = ?`,
      [parsed.year, parsed.month]
    );

    const [statusBreakdown] = await c.query(
      `SELECT r.status, COUNT(*) AS count
       FROM payroll_runs r
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE cy.year = ? AND cy.month = ?
       GROUP BY r.status`,
      [parsed.year, parsed.month]
    );

    const [lifecycleBreakdown] = await c.query(
      `SELECT prl.state, COUNT(DISTINCT prl.run_id) AS count
       FROM payroll_run_lifecycle prl
       JOIN payroll_runs r ON r.id = prl.run_id
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE cy.year = ? AND cy.month = ?
       GROUP BY prl.state`,
      [parsed.year, parsed.month]
    );

    c.end();

    const monthNameUpper = MONTH_NAMES_UPPER[parsed.month - 1];

    return ok(res, {
      month: monthInput,
      year: parsed.year,
      monthNum: parsed.month,
      calendarDays: daysInMonth,
      monthLabel: `${MONTH_NAMES_SHORT[parsed.month - 1]} ${parsed.year}`,
      monthHeading: `${monthNameUpper}-${parsed.year} (${monthNameUpper} 1 - ${monthNameUpper} ${daysInMonth}, ${daysInMonth} days)`,
      totalEmployees,
      payingEmployees: currentFinancials.payingCount,
      employeeChanges: {
        joiners,
        leavers
      },
      payrollProcessedCount: currentFinancials.payingCount,
      payrollProcessedRatio: `${totalEmployees}/${currentFinancials.payingCount} EMPLOYEES`,
      run: currentRun,
      equation: {
        totalGross: currentFinancials.gross,
        totalPayrollCost: currentFinancials.totalCost,
        employeeDeposit: currentFinancials.deposit,
        totalDeductions: currentFinancials.deductions,
        totalContributions: currentFinancials.contributions,
        totalDeductionsContributions: Math.round((currentFinancials.deductions + currentFinancials.contributions) * 100) / 100,
        prevMonthLabel: prevMonthNameUpper,
        prevMonthCost: prevFinancials.totalCost,
        prevMonthGross: prevFinancials.gross,
        prevMonthDeposit: prevFinancials.deposit,
        prevMonthDeductions: prevFinancials.deductions,
        prevMonthContributions: prevFinancials.contributions,
        costDelta: Math.round((currentFinancials.totalCost - prevFinancials.totalCost) * 100) / 100,
        grossDelta: Math.round((currentFinancials.gross - prevFinancials.gross) * 100) / 100,
        depositDelta: Math.round((currentFinancials.deposit - prevFinancials.deposit) * 100) / 100,
        deductionsDelta: Math.round((currentFinancials.deductions - prevFinancials.deductions) * 100) / 100,
        contributionsDelta: Math.round((currentFinancials.contributions - prevFinancials.contributions) * 100) / 100
      },
      outcome: {
        runId: currentRun?.id || null,
        status: currentRun?.status || null,
        noOfEmployees: currentFinancials.payingCount || currentRun?.total_employees || 0,
        payslipsReleased: payslipsCount,
        payslipsOnHold: 0,
        isCompleted: currentRun ? (currentRun.status === 'COMPLETED' || currentRun.status === 'PAID') : false,
        statutoryCards: {
          incomeTax: {
            title: 'Income Tax (ITR)',
            employeesCount: 5,
            initiationDate: `07-${MONTH_NAMES_SHORT[parsed.month - 1]}-${parsed.year}`,
            endDate: `${daysInMonth}-${MONTH_NAMES_SHORT[parsed.month - 1]}-${parsed.year}`,
            status: currentRun ? 'UPLOADED' : 'PENDING'
          },
          providentFund: {
            title: 'Provident Fund (PF)',
            employeesCount: currentFinancials.pf?.employeesPaying ?? currentFinancials.payingCount ?? 3,
            employeeShare: currentFinancials.pf?.employeeShare ?? 0,
            employerShare: currentFinancials.pf?.employerShare ?? 0,
            totalPf: currentFinancials.pf?.totalPf ?? 0,
            linkedRecordsCount: currentFinancials.pf?.employeesPaying ?? currentFinancials.payingCount ?? 3,
            employees: currentFinancials.pf?.employees || []
          },
          esi: {
            title: 'Employee State Insurance (ESI)',
            employeesCount: currentFinancials.esi?.employeesPaying ?? currentFinancials.payingCount ?? 3,
            employeeShare: currentFinancials.esi?.employeeShare ?? 0,
            employerShare: currentFinancials.esi?.employerShare ?? 0,
            totalEsi: currentFinancials.esi?.totalEsi ?? 0,
            registeredRecordsCount: currentFinancials.esi?.employeesPaying ?? currentFinancials.payingCount ?? 3,
            employees: currentFinancials.esi?.employees || []
          },
          professionalTax: {
            title: 'Professional Tax',
            employeesCount: currentFinancials.professionalTax?.employeesPaying ?? currentFinancials.payingCount ?? 3,
            totalTax: currentFinancials.professionalTax?.totalTax ?? 0,
            amount: currentFinancials.professionalTax?.totalTax ?? 0,
            relatedRecordsCount: currentFinancials.professionalTax?.employeesPaying ?? currentFinancials.payingCount ?? 3,
            employees: currentFinancials.professionalTax?.employees || []
          },
          deductionComponents: {
            title: 'Deduction Components',
            componentName: 'PF - Data Change',
            lastExecutionDate: `08-${MONTH_NAMES_SHORT[parsed.month - 1]}-${parsed.year}`,
            lastUmbrellaPlanDate: `08-${MONTH_NAMES_SHORT[parsed.month - 1]}-${parsed.year}`,
            totalEmployees: Math.round(totalEmployees * 0.91) || 233
          }
        }
      },
      timeline,
      summary: summary[0] || {},
      statusBreakdown,
      lifecycleBreakdown
    });
  } catch (err) {
    return fail(res, 500, err.message);
  }
}

async function getEmployeeRunStatus(req, res) {
  try {
    const employeeId = Number(req.params.employeeId);
    const monthInput = req.query.month;
    const parsed = parseMonthInput(monthInput);
    if (!employeeId) return fail(res, 400, 'employeeId required');
    if (!parsed) return fail(res, 400, 'month required in YYYY-MM format');

    const c = await db();
    
    // 1. Get Payroll Run Status (if any)
    const [rows] = await c.query(
      `SELECT
         r.id AS runId,
         r.status AS runStatus,
         cy.year,
         cy.month,
         (
           SELECT prl.state
           FROM payroll_run_lifecycle prl
           WHERE prl.run_id = r.id
           ORDER BY prl.changed_at DESC, prl.id DESC
           LIMIT 1
         ) AS lifecycleState
       FROM payroll_employee_salaries s
       JOIN payroll_runs r ON r.id = s.run_id
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE s.employee_id = ? AND cy.year = ? AND cy.month = ?
       ORDER BY r.started_at DESC
       LIMIT 1`,
      [employeeId, parsed.year, parsed.month]
    );

    // Calculate attendance metrics directly via unified attendance (matches /api/attendance/my-report)
    const totalCalendarDays = new Date(parsed.year, parsed.month, 0).getDate();
    const startDate = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-01`;
    const endDate = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${totalCalendarDays}`;

    const attendanceRoutes = require('../routes/attendance-enhanced.routes');
    const attReport = await attendanceRoutes.getUnifiedAttendanceListAndSummary(c, employeeId, startDate, endDate, parsed.month, parsed.year);
    const attSummary = attReport?.summary || {};
    const lop_days = Number(attSummary.lop_days || 0);
    const present_days = Number(attSummary.present_days || 0);
    const days_payable = Math.max(0, totalCalendarDays - lop_days);

    // 2. Get Active Contract for the employee
    const [contractRows] = await c.query(
      `SELECT esc.*, t.template_name
       FROM employee_salary_contracts esc
       LEFT JOIN salary_structure_templates t ON t.template_id = esc.template_id
       WHERE esc.employee_id = ? AND esc.status = 'Active'
       LIMIT 1`,
      [employeeId]
    );
    const contract = contractRows[0] || null;

    // 3. Components & Contributions calculated as per payroll process
    const dryRun = await calculateDryRunFinancials(c, parsed.year, parsed.month);
    const empCalc = dryRun.allCalculated.find(e => e.employee_id === employeeId);

    let templateComponents = [];
    let monthlyGross = contract ? Math.round(Number(contract.annual_ctc || 0) / 12) : 0;
    let totalEarnings = 0;

    if (empCalc && empCalc.components) {
        monthlyGross = empCalc.monthly_gross || monthlyGross;
        totalEarnings = empCalc.total_earnings || 0;

        const fullMonthlyCTC = Number(empCalc.annual_ctc || 0) / 12.0;
        let compRows = [];
        if (contract) {
            const [rows] = await c.query(
                `SELECT sc.*, 
                        COALESCE(mc.code, lc.code) AS component_code,
                        COALESCE(mc.name, lc.name) AS component_name,
                        COALESCE(mc.component_type, lc.component_type) AS component_type,
                        COALESCE(mc.calculation_type, lc.calculation_type) AS calculation_type,
                        COALESCE(mc.value, lc.value) AS value,
                        COALESCE(mc.percentage_of_code, lc.percentage_of_code) AS percentage_of_code,
                        COALESCE(mc.sequence, lc.sequence) AS sequence
                 FROM structure_composition sc
                 LEFT JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
                 LEFT JOIN salary_components lc ON lc.id = sc.component_id
                 WHERE sc.template_id = ?
                 ORDER BY COALESCE(mc.sequence, lc.sequence, 999)`,
                [contract.template_id]
            );
            compRows = rows;
        }

        const basicComp = compRows.find(c => c.component_code === 'BASIC' || c.component_name === 'Basic Salary');
        let fullMonthlyBasic = 0;
        if (basicComp) {
            const override = parseFormulaOverride(basicComp.formula_or_value);
            let inputVal = Number(basicComp.default_value || basicComp.value || 0);
            let calcType = basicComp.calculation_type;
            if (override) {
                if (override.calculation_type) calcType = override.calculation_type;
                inputVal = override.value;
            }
            if (calcType === 'PERCENTAGE') {
                fullMonthlyBasic = (fullMonthlyCTC * inputVal) / 100.0;
            } else {
                fullMonthlyBasic = inputVal / 12.0;
            }
        }

        const fullComputed = {};
        let fullOtherEarnings = 0;
        let specialIdx = -1;

        templateComponents = empCalc.components.map((cmp, idx) => {
            const r = compRows.find(x => x.component_code === cmp.code || x.component_name === cmp.name) || cmp;
            const override = parseFormulaOverride(r.formula_or_value);
            let calculation_type = r.calculation_type || 'FIXED';
            let inputVal = Number(r.default_value || r.value || 0);
            let percentage_of_code = r.percentage_of_code;

            if (override) {
                if (override.calculation_type) calculation_type = override.calculation_type;
                inputVal = override.value;
                if (override.percentage_of_code) percentage_of_code = override.percentage_of_code;
            }

            let fullVal = 0;
            if (cmp.code === 'SPECIAL' || cmp.name === 'Special Allowance') {
                specialIdx = idx;
            } else if (calculation_type === 'PERCENTAGE') {
                if (percentage_of_code && fullComputed[percentage_of_code] !== undefined) {
                    fullVal = (fullComputed[percentage_of_code] * inputVal) / 100.0;
                } else {
                    fullVal = (fullMonthlyCTC * inputVal) / 100.0;
                }
            } else {
                fullVal = inputVal > 1000 ? (inputVal / 12.0) : inputVal;
            }

            const roundedFull = Math.round(fullVal);
            fullComputed[cmp.code] = roundedFull;
            if (cmp.type === 'EARNING' && cmp.code !== 'SPECIAL') {
                fullOtherEarnings += roundedFull;
            }

            return {
                component_code: cmp.code,
                component_name: cmp.name,
                component_type: cmp.type,
                value: Math.round(cmp.amount).toString(),
                full_value: roundedFull.toString()
            };
        });

        if (specialIdx !== -1) {
            const fullSpecial = Math.max(0, Math.round(fullMonthlyCTC) - fullOtherEarnings);
            templateComponents[specialIdx].full_value = fullSpecial.toString();
        }
    }

    const monthlyCTCValue = contract ? Math.round(Number(contract.annual_ctc || 0) / 12) : 0;
    c.end();

    if (!rows.length) {
      return ok(res, {
        employeeId,
        month: monthInput,
        exists: false,
        status: 'NOT_PROCESSED',
        contract,
        monthlyCTC: monthlyCTCValue,
        monthlyGross,
        totalEarnings,
        total_days: totalCalendarDays,
        days_payable,
        lop_days,
        attendanceSummary: {
            total_days: attSummary.total_days || totalCalendarDays,
            present_days,
            absent_days: Number(attSummary.absent_days || 0),
            leave_days: Number(attSummary.leave_days || 0),
            weekend_days: Number(attSummary.weekend_days || 0),
            holiday_days: Number(attSummary.holiday_days || 0),
            lop_days
        },
        templateComponents
      });
    }

    return ok(res, {
      employeeId,
      month: monthInput,
      exists: true,
      run: rows[0],
      contract,
      monthlyCTC: monthlyCTCValue,
      monthlyGross,
      totalEarnings,
      total_days: totalCalendarDays,
      days_payable,
      lop_days,
      attendanceSummary: {
          total_days: attSummary.total_days || totalCalendarDays,
          present_days,
          absent_days: Number(attSummary.absent_days || 0),
          leave_days: Number(attSummary.leave_days || 0),
          weekend_days: Number(attSummary.weekend_days || 0),
          holiday_days: Number(attSummary.holiday_days || 0),
          lop_days
      },
      templateComponents
    });
  } catch (err) {
    return fail(res, 500, err.message);
  }
}

async function getPayrollReports(req, res) {
  try {
    const monthInput = req.query.month;
    const parsed = parseMonthInput(monthInput);
    if (!parsed) return fail(res, 400, 'month required in YYYY-MM format');

    const c = await db();
    const [departmentWise] = await c.query(
      `SELECT
         e.DepartmentId AS departmentId,
         COUNT(*) AS employeeCount,
         COALESCE(SUM(s.gross_earnings), 0) AS gross,
         COALESCE(SUM(s.total_deductions), 0) AS deductions,
         COALESCE(SUM(s.net_pay), 0) AS net
       FROM payroll_employee_salaries s
       JOIN payroll_runs r ON r.id = s.run_id
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       JOIN employees e ON e.id = s.employee_id
       WHERE cy.year = ? AND cy.month = ?
       GROUP BY e.DepartmentId
       ORDER BY net DESC`,
      [parsed.year, parsed.month]
    );

    const [topDeductions] = await c.query(
      `SELECT
         td.deduction_code AS code,
         COALESCE(SUM(td.amount), 0) AS amount
       FROM payroll_tax_deductions td
       JOIN payroll_employee_salaries s ON s.id = td.employee_salary_id
       JOIN payroll_runs r ON r.id = s.run_id
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE cy.year = ? AND cy.month = ?
       GROUP BY td.deduction_code
       ORDER BY amount DESC`,
      [parsed.year, parsed.month]
    );

    c.end();
    return ok(res, {
      month: monthInput,
      departmentWise,
      topDeductions
    });
  } catch (err) {
    return fail(res, 500, err.message);
  }
}

async function sendPayrollNotifications(req, res) {
  try {
    const runId = Number(req.body.runId);
    if (!runId) return fail(res, 400, 'runId required');

    const c = await db();
    const [runRows] = await c.query(
      `SELECT r.id, cy.year, cy.month
       FROM payroll_runs r
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE r.id = ?
       LIMIT 1`,
      [runId]
    );
    if (!runRows.length) {
      c.end();
      return fail(res, 404, 'Payroll run not found');
    }

    const [employees] = await c.query(
      `SELECT s.employee_id AS employeeId, s.net_pay AS netPay
       FROM payroll_employee_salaries s
       WHERE s.run_id = ?`,
      [runId]
    );
    c.end();

    if (!employees.length) {
      return ok(res, { notified: 0, message: 'No employees found in run' });
    }

    const monthText = `${runRows[0].year}-${String(runRows[0].month).padStart(2, '0')}`;
    const ids = employees.map((r) => Number(r.employeeId));

    const result = await notificationService.createBulkNotifications(
      ids,
      'payslip_generated',
      {
        month: monthText,
        year: String(runRows[0].year),
        net_pay: 'Available in payslip'
      },
      { category: 'payroll' }
    );

    await lifecycleService.logChange({
      entityType: 'payroll_run',
      entityId: runId,
      action: 'SEND_NOTIFICATIONS',
      afterData: { notified: result.count || 0 },
      performedBy: (req.user && req.user.id) || null
    });

    return ok(res, {
      runId,
      month: monthText,
      notified: result.count || 0
    });
  } catch (err) {
    return fail(res, 500, err.message);
  }
}

async function lockRun(req, res) {
  try {
    const runId = Number(req.params.runId);
    if (!runId) return res.status(400).json({ error: 'runId required' });
    const by = (req.user && req.user.id) || null;
    const lifecycle = await lifecycleService.appendLifecycleState(runId, lifecycleService.PAYROLL_LIFECYCLE.LOCKED, by, 'Run locked by finance/admin');
    await lifecycleService.logChange({
      entityType: 'payroll_run',
      entityId: runId,
      action: 'LOCK',
      beforeData: { status: lifecycle.fromState },
      afterData: { status: lifecycle.toState },
      performedBy: by
    });
    res.json({ success: true, data: { runId, status: lifecycle.toState }, error: null });
  } catch (err) {
    res.status(400).json({ success: false, data: null, error: err.message });
  }
}

async function reviewRun(req, res) {
  try {
    const runId = Number(req.params.runId);
    if (!runId) return res.status(400).json({ error: 'runId required' });
    const by = (req.user && req.user.id) || null;
    const lifecycle = await lifecycleService.appendLifecycleState(runId, lifecycleService.PAYROLL_LIFECYCLE.REVIEWED, by, 'Run reviewed');
    await lifecycleService.logChange({
      entityType: 'payroll_run',
      entityId: runId,
      action: 'REVIEW',
      beforeData: { status: lifecycle.fromState },
      afterData: { status: lifecycle.toState },
      performedBy: by
    });
    res.json({ success: true, data: { runId, status: lifecycle.toState }, error: null });
  } catch (err) {
    res.status(400).json({ success: false, data: null, error: err.message });
  }
}

async function markRunPaid(req, res) {
  try {
    const runId = Number(req.params.runId);
    if (!runId) return res.status(400).json({ error: 'runId required' });
    const by = (req.user && req.user.id) || null;
    const lifecycle = await lifecycleService.appendLifecycleState(runId, lifecycleService.PAYROLL_LIFECYCLE.PAID, by, 'Run marked as paid');
    await lifecycleService.logChange({
      entityType: 'payroll_run',
      entityId: runId,
      action: 'MARK_PAID',
      beforeData: { status: lifecycle.fromState },
      afterData: { status: lifecycle.toState },
      performedBy: by
    });
    res.json({ success: true, data: { runId, status: lifecycle.toState }, error: null });
  } catch (err) {
    res.status(400).json({ success: false, data: null, error: err.message });
  }
}

async function lockCycle(req, res) {
  try {
    const cycleId = Number(req.params.cycleId);
    if (!cycleId) return res.status(400).json({ error: 'cycleId required' });
    const c = await db();
    await c.query('UPDATE payroll_cycles SET status = ? WHERE id = ?', ['LOCKED', cycleId]);
    c.end();
    res.json({ success: true, cycleId, status: 'LOCKED' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTaxProfile(req, res) {
  try {
    const employeeId = Number(req.params.employeeId);
    const financialYear = String(req.query.financial_year || '').trim();
    if (!employeeId) return res.status(400).json({ error: 'employeeId required' });
    if (!isValidFinancialYear(financialYear)) {
      return res.status(400).json({ error: 'financial_year query required in YYYY-YYYY format' });
    }
    const c = await db();
    const [rows] = await c.query(
      'SELECT * FROM employee_tax_profiles WHERE employee_id = ? AND financial_year = ? LIMIT 1',
      [employeeId, financialYear]
    );
    c.end();
    res.json(normalizeTaxProfileRead(rows[0] || null));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function putTaxProfile(req, res) {
  try {
    const employeeId = Number(req.params.employeeId);
    const payload = req.body || {};
    const financialYear = String(req.query.financial_year || payload.financial_year || '').trim();
    if (!employeeId) return res.status(400).json({ error: 'employeeId required' });
    if (!isValidFinancialYear(financialYear)) {
      return res.status(400).json({ error: 'financial_year required in query or body, format YYYY-YYYY' });
    }

    const writePayload = normalizeTaxProfilePayload(Object.assign({}, payload, { financial_year: financialYear }));
    delete writePayload.employee_id;

    const by = (req.user && req.user.id) || null;
    const c = await db();
    const [existing] = await c.query(
      'SELECT * FROM employee_tax_profiles WHERE employee_id = ? AND financial_year = ? LIMIT 1',
      [employeeId, financialYear]
    );
    if (existing.length) {
      await c.query('UPDATE employee_tax_profiles SET ? WHERE employee_id = ? AND financial_year = ?', [writePayload, employeeId, financialYear]);
    } else {
      await c.query('INSERT INTO employee_tax_profiles SET ?', Object.assign({ employee_id: employeeId }, writePayload));
    }
    c.end();
    await lifecycleService.logChange({
      entityType: 'employee_tax_profile',
      entityId: employeeId,
      action: existing.length ? 'UPDATE' : 'CREATE',
      beforeData: existing.length ? existing[0] : null,
      afterData: writePayload,
      performedBy: by
    });
    res.json({ success: true });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function getBankAccount(req, res) {
  try {
    const employeeId = Number(req.params.employeeId);
    const c = await db();
    const [rows] = await c.query('SELECT * FROM employee_bank_accounts WHERE employee_id = ?', [employeeId]);
    c.end();
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function putBankAccount(req, res) {
  try {
    const employeeId = Number(req.params.employeeId);
    const payload = req.body || {};
    const c = await db();
    const [existing] = await c.query('SELECT id FROM employee_bank_accounts WHERE employee_id = ? LIMIT 1', [employeeId]);
    if (existing.length) {
      await c.query('UPDATE employee_bank_accounts SET ? WHERE employee_id = ?', [payload, employeeId]);
    } else {
      await c.query('INSERT INTO employee_bank_accounts SET ?', Object.assign({ employee_id: employeeId }, payload));
    }
    c.end();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Payout stubs
async function initiatePayout(req, res) {
  try {
    // Minimal: accept runId and return created payout id (stub)
    const { runId } = req.body;
    const c = await db();
    const [ins] = await c.query('INSERT INTO payroll_payouts (run_id, status, created_at) VALUES (?, ?, NOW())', [runId || null, 'INITIATED']);
    c.end();
    res.json({ success: true, payoutId: ins.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPayout(req, res) {
  try {
    const runId = Number(req.params.runId);
    const c = await db();
    const [rows] = await c.query('SELECT * FROM payroll_payouts WHERE run_id = ?', [runId]);
    c.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updatePayoutStatus(req, res) {
  try {
    const payoutId = Number(req.params.payoutId);
    const { status } = req.body;
    const by = (req.user && req.user.id) || null;
    const c = await db();
    const [beforeRows] = await c.query('SELECT status FROM payroll_payouts WHERE id = ? LIMIT 1', [payoutId]);
    await c.query('UPDATE payroll_payouts SET status = ? WHERE id = ?', [status, payoutId]);
    c.end();
    await lifecycleService.logChange({
      entityType: 'payroll_payout',
      entityId: payoutId,
      action: 'STATUS_UPDATE',
      beforeData: beforeRows.length ? { status: beforeRows[0].status } : null,
      afterData: { status },
      performedBy: by
    });
    res.json({ success: true, payoutId, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  previewRun,
  validateRun,
  getPayrollDashboard,
  getEmployeeRunStatus,
  getPayrollReports,
  sendPayrollNotifications,
  lockRun,
  reviewRun,
  markRunPaid,
  lockCycle,
  getTaxProfile,
  putTaxProfile,
  getBankAccount,
  putBankAccount,
  initiatePayout,
  getPayout,
  updatePayoutStatus
};
