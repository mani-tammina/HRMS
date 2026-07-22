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
  const now = new Date();
  const todayStr = now.toDateString();

  const employeeIds = employees.map(e => e.id);
  if (employeeIds.length === 0) return {};

  const [attendance] = await c.query(`
    SELECT employee_id, attendance_date, status FROM attendance 
    WHERE employee_id IN (?) AND attendance_date BETWEEN ? AND ?
  `, [employeeIds, sd, ed]);

  const attMap = {};
  attendance.forEach(a => {
    if (!attMap[a.employee_id]) attMap[a.employee_id] = {};
    attMap[a.employee_id][new Date(a.attendance_date).toDateString()] = a;
  });

  const [allLeaves] = await c.query(`
    SELECT l.employee_id, l.start_date, l.end_date, lt.type_code, l.is_half_day
    FROM leaves l
    INNER JOIN leave_types lt ON l.leave_type_id = lt.id
    WHERE l.employee_id IN (?) AND l.status = 'approved'
      AND (l.start_date <= ? AND l.end_date >= ?)
  `, [employeeIds, ed, sd]);

  const leavesMap = {};
  const lopLeavesByDay = {}; // employee_id -> { dateStr -> weight }

  allLeaves.forEach(l => {
    if (!leavesMap[l.employee_id]) leavesMap[l.employee_id] = [];
    leavesMap[l.employee_id].push(l);

    if (l.type_code === 'LOP' || l.type_code === 'UL') {
      if (!lopLeavesByDay[l.employee_id]) lopLeavesByDay[l.employee_id] = {};
      let currL = new Date(l.start_date);
      const endL = new Date(l.end_date);
      const weight = l.is_half_day ? 0.5 : 1.0;
      
      while (currL <= endL) {
        const dStr = currL.toDateString();
        lopLeavesByDay[l.employee_id][dStr] = (lopLeavesByDay[l.employee_id][dStr] || 0) + weight;
        currL.setDate(currL.getDate() + 1);
      }
    }
  });

  const result = {};

  for (const emp of employees) {
    const empAtt = attMap[emp.id] || {};
    const empLeaves = leavesMap[emp.id] || [];
    const empLopDaysMap = lopLeavesByDay[emp.id] || {};
    
    const weekOffDays = [];
    if (emp.sunday_off) weekOffDays.push('sunday');
    if (emp.monday_off) weekOffDays.push('monday');
    if (emp.tuesday_off) weekOffDays.push('tuesday');
    if (emp.wednesday_off) weekOffDays.push('wednesday');
    if (emp.thursday_off) weekOffDays.push('thursday');
    if (emp.friday_off) weekOffDays.push('friday');
    if (emp.saturday_off) weekOffDays.push('saturday');

    let penalty_absent_days = 0;
    let regular_absent_days = 0;
    let lop_leave_days = 0;

    let curr = new Date(sd);
    const end = new Date(ed);
    const daysInMonth = new Date(year, month, 0).getDate();

    while (curr <= end) {
      const dStr = curr.toDateString();
      const isFuture = curr > now && dStr !== todayStr;
      const weekday = curr.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
      // 1. Check for approved LOP leave first
      if (empLopDaysMap[dStr]) {
        lop_leave_days += empLopDaysMap[dStr];
      } 
      // 2. Otherwise check attendance for penalties or regular absences
      else if (empAtt[dStr]) {
        const record = empAtt[dStr];
        if (record.status === 'penalty') {
          penalty_absent_days++; // Penalty days from attendance
        } else if (record.status === 'absent') {
          regular_absent_days++; // Regular absent days from attendance
        }
      } 
      // 3. No log and not weekend/future? 
      else if (!isFuture && dStr !== todayStr && !weekOffDays.includes(weekday)) {
         // This matches the "No Attendance Logs" penalty logic from my-report
         // But only if it's past the threshold. For simplicity in preview, we treat it as penalty
         penalty_absent_days++;
      }
      
      curr.setDate(curr.getDate() + 1);
    }

    // Following my-report's lop_days logic
    const lopDays = (penalty_absent_days * 0.5) + (regular_absent_days * 1.0) + lop_leave_days;
    
    result[emp.id] = {
      calendar_days: daysInMonth,
      lop_days: lopDays,
      paid_days: daysInMonth - lopDays
    };
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

    // --- DETAILED PREVIEW LOGIC ---
    // Fetch ALL employees for aggregate calculation
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
    let aggPayout = 0;

    const allCalculated = allEmployees.map(emp => {
      const annualCTC = Number(emp.annual_ctc || 0);
      const monthlyGross = Math.round(annualCTC / 12);
      const comps = compMap[emp.template_id] || [];
      
      const attSummary = attSummaryMap[emp.id] || { calendar_days: 30, lop_days: 0, paid_days: 30 };
      const lopDays = attSummary.lop_days;
      const calendarDays = attSummary.calendar_days;
      const paidDays = attSummary.paid_days;
      const proRataFactor = calendarDays > 0 ? (paidDays / calendarDays) : 1;

      // Rule: If Full Month Basic >= 15000, Deductions are NOT pro-rated for LOP
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

      const skipDeductionProRata = lopDays > 0 && fullMonthlyBasic >= 15000;

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

        const isEarning = r.component_type === 'EARNING';
        const isESI = r.component_code === 'ESI_EE' || r.component_code === 'ESI_ER' || /esi/i.test(r.component_name || '');
        const skipProRata = skipDeductionProRata || (lopDays > 0 && isESI);
        const currentFactor = (isEarning || !skipProRata) ? proRataFactor : 1.0;

        let amt = 0;
        if (calculation_type === 'PERCENTAGE') {
          if (percentage_of_code && computed[percentage_of_code] !== undefined) {
            // If it's a Deduction and we skip pro-rata, use the FULL base value
            if (!isEarning && skipProRata) {
                 // We need full monthly values of the base component.
                 const baseVal = proRataFactor > 0 ? (computed[percentage_of_code] / proRataFactor) : computed[percentage_of_code];
                 amt = (baseVal * inputVal) / 100.0;
            } else {
                 amt = (computed[percentage_of_code] * inputVal) / 100.0;
            }
          } else {
            amt = (monthlyGross * currentFactor * inputVal) / 100.0;
          }
        } else {
          amt = (inputVal / 12.0) * currentFactor;
        }

        const rounded = Math.round(amt);
        computed[r.component_code] = rounded;
        
        if (isEarning) {
          totalEarnings += rounded;
        } else {
          totalDeductions += rounded;
        }

        return { ...r, calculated_amount: rounded };
      });

      if (specialIdx !== -1) {
        // Special Allowance balances the pro-rated monthly gross
        const targetGross = Math.round(monthlyGross * proRataFactor);
        const specialAmt = Math.max(0, targetGross - totalEarnings);
        calculatedComponents[specialIdx].calculated_amount = specialAmt;
        computed['SPECIAL'] = specialAmt;
        totalEarnings += specialAmt;
      }

      // Bundle Employer portions into Special Allowance (Subtracting them to hide them in the Gross Salary view)
      let erBundle = 0;
      calculatedComponents.forEach(c => {
        const isEr = /employer|employeer/i.test(c.component_name) || /_ER$/i.test(c.component_code);
        if (isEr) {
          erBundle += c.calculated_amount;
        }
      });

      if (specialIdx !== -1) {
        calculatedComponents[specialIdx].calculated_amount -= erBundle;
      }

      const finalComponents = calculatedComponents.filter(c => {
        const isEr = /employer|employeer/i.test(c.component_name) || /_ER$/i.test(c.component_code);
        // Explicitly allow ESI_ER to be visible per user request
        const isESI_ER = /ESI_ER/i.test(c.component_code || '');
        return !isEr || isESI_ER;
      });

      const finalGross = totalEarnings - erBundle;
      const finalDeductions = totalDeductions - erBundle;
      const net = finalGross - finalDeductions;

      aggGross += finalGross;
      aggNet += net;
      aggPayout += net;

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
        components: finalComponents.map(c => ({
          code: c.component_code,
          name: c.component_name,
          type: c.component_type,
          amount: c.calculated_amount
        }))
      };
    });

    const detailedList = allCalculated.slice(offset, offset + limit);

    return ok(res, {
      mode: 'DRY_RUN',
      validation,
      estimate: {
        employeeCount: allEmployees.length,
        totalGross: aggGross,
        totalNet: aggNet,
        totalPayout: aggPayout
      },
      detailedPreview: detailedList,
      pagination: {
        total: allEmployees.length,
        pages: Math.ceil(allEmployees.length / limit),
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

async function getPayrollDashboard(req, res) {
  try {
    const monthInput = req.query.month;
    const parsed = parseMonthInput(monthInput);
    if (!parsed) return fail(res, 400, 'month required in YYYY-MM format');

    const c = await db();
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
      `SELECT status, COUNT(*) AS count
       FROM payroll_runs r
       JOIN payroll_cycles cy ON cy.id = r.cycle_id
       WHERE cy.year = ? AND cy.month = ?
       GROUP BY status`,
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
    return ok(res, {
      month: monthInput,
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

    // Calculate attendance metrics for pro-rata scaling
    const totalCalendarDays = new Date(parsed.year, parsed.month, 0).getDate();
    const startDate = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-01`;
    const endDate = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${totalCalendarDays}`;
    
    let weekOffNames = [];
    const [employeeData] = await c.query("SELECT weekly_off_policy_id FROM employees WHERE id = ?", [employeeId]);
    if (employeeData.length && employeeData[0].weekly_off_policy_id) {
        const [wp] = await c.query("SELECT * FROM weekly_off_policies WHERE id = ?", [employeeData[0].weekly_off_policy_id]);
        if (wp.length) {
            const policy = wp[0];
            if (policy.sunday_off) weekOffNames.push('sunday');
            if (policy.monday_off) weekOffNames.push('monday');
            if (policy.tuesday_off) weekOffNames.push('tuesday');
            if (policy.wednesday_off) weekOffNames.push('wednesday');
            if (policy.thursday_off) weekOffNames.push('thursday');
            if (policy.friday_off) weekOffNames.push('friday');
            if (policy.saturday_off) weekOffNames.push('saturday');
        }
    }

    const [attendance] = await c.query(
        `SELECT a.* FROM attendance a WHERE a.employee_id = ? AND a.attendance_date BETWEEN ? AND ?`,
        [employeeId, startDate, endDate]
    );

    const [empDetails] = await c.query(`
        SELECT e.id, sp.start_time, mlt.threshold_hours as missing_log_threshold, wop.* 
        FROM employees e
        LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
        LEFT JOIN missing_log_times mlt ON e.leave_plan_id = mlt.leave_plan_id
        LEFT JOIN weekly_off_policies wop ON e.weekly_off_policy_id = wop.id
        WHERE e.id = ?
    `, [employeeId]);
    const employee = empDetails[0];

    const [allLeaves] = await c.query(`
        SELECT l.*, lt.type_code 
        FROM leaves l 
        INNER JOIN leave_types lt ON l.leave_type_id = lt.id
        WHERE l.employee_id = ? AND l.status = 'approved' 
          AND ((l.start_date BETWEEN ? AND ?) OR (l.end_date BETWEEN ? AND ?))
    `, [employeeId, startDate, endDate, startDate, endDate]);

    const weekOffDays = [];
    if (employee) {
        if (employee.sunday_off) weekOffDays.push('sunday');
        if (employee.monday_off) weekOffDays.push('monday');
        if (employee.tuesday_off) weekOffDays.push('tuesday');
        if (employee.wednesday_off) weekOffDays.push('wednesday');
        if (employee.thursday_off) weekOffDays.push('thursday');
        if (employee.friday_off) weekOffDays.push('friday');
        if (employee.saturday_off) weekOffDays.push('saturday');
    }

    const attMap = new Map();
    attendance.forEach(a => {
        const dStr = new Date(a.attendance_date).toDateString();
        attMap.set(dStr, a);
    });

    const now = new Date();
    const todayStr = now.toDateString();
    let present_days = 0;
    let absent_days = 0;
    let leave_days = 0;
    let weekend_days = 0;
    let half_day_count = 0;
    let lop_leave_days = 0;

    let curr = new Date(startDate);
    let end = new Date(endDate);
    while (curr <= end) {
        if (curr > now && curr.toDateString() !== todayStr) {
            curr.setDate(curr.getDate() + 1);
            continue;
        }

        const dStr = curr.toDateString();
        const isToday = dStr === todayStr;
        const weekday = curr.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        const todaysLeaves = allLeaves.filter(l => {
            const lStart = new Date(l.start_date);
            const lEnd = new Date(l.end_date);
            const check = new Date(curr);
            check.setHours(0,0,0,0);
            lStart.setHours(0,0,0,0);
            lEnd.setHours(0,0,0,0);
            return check >= lStart && check <= lEnd;
        });

        if (todaysLeaves.length > 0) {
            todaysLeaves.forEach(l => {
                const weight = l.is_half_day ? 0.5 : 1.0;
                leave_days += weight;
                if (l.type_code === 'LOP') {
                    lop_leave_days += weight;
                }
            });
        } else if (weekOffDays.includes(weekday)) {
            weekend_days++;
        } else if (attMap.has(dStr)) {
            const record = attMap.get(dStr);
            if (record.status === 'present') present_days++;
            else if (record.status === 'half-day') {
                present_days += 0.5;
                half_day_count++;
            } else if (record.status === 'penalty') {
                absent_days++;
            }
        } else if (!isToday) {
            const shiftStartStr = employee?.start_time || '09:00:00';
            const [sh, sm] = shiftStartStr.split(':').map(Number);
            const shiftStart = new Date(curr);
            shiftStart.setHours(sh || 9, sm || 0, 0, 0);

            const penaltyThreshold = new Date(shiftStart);
            const thresholdHours = employee?.missing_log_threshold || 48;
            penaltyThreshold.setHours(penaltyThreshold.getHours() + thresholdHours);

            if (now > penaltyThreshold) {
                absent_days++;
            }
        }
        curr.setDate(curr.getDate() + 1);
    }

    const lop_days = (absent_days * 0.5) + lop_leave_days;
    const days_payable = totalCalendarDays - lop_days;
    const proRataFactor = totalCalendarDays > 0 ? (days_payable / totalCalendarDays) : 1;

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

    // 3. Get Template Components (Composition) if contract exists
    let templateComponents = [];
    if (contract) {
        const [compRows] = await c.query(
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
        
        // Calculate pro-rated monthly Gross (Target CTC for balancing)
        const fullMonthlyCTC = contract ? Number(contract.annual_ctc || 0) / 12.0 : 0;
        const monthlyGrossCalculated = Math.round(fullMonthlyCTC * proRataFactor);
        const computed = {};
        const full_computed = {};
        let otherTotal = 0;
        let fullOtherTotal = 0;
        let specialCompIdx = -1;
        
        // Rule: If Full Month Basic >= 15000, Deductions are NOT pro-rated for LOP
        const basicComp = compRows.find(c => {
             const code = (c.component_code || "").toUpperCase();
             const name = (c.component_name || "").toUpperCase();
             return code === 'BASIC' || name === 'BASIC SALARY';
        });
        let fullMonthlyBasic = 0;
        if (basicComp) {
             const override = parseFormulaOverride(basicComp.formula_or_value);
             let inputVal = Number(basicComp.value || 0);
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
        const skipDeductionProRata = lop_days > 0 && fullMonthlyBasic >= 15000;

        // First pass: Calculate and round all components except Special Allowance
        let results = compRows.map((r, idx) => {
            if (r.component_code === 'SPECIAL' || r.component_name === 'Special Allowance') {
                specialCompIdx = idx;
                return null;
            }
            
            const override = parseFormulaOverride(r.formula_or_value);
            let calculation_type = r.calculation_type;
            let inputVal = Number(r.value || 0);
            let percentage_of_code = r.percentage_of_code;

            if (override) {
                if (override.calculation_type) calculation_type = override.calculation_type;
                inputVal = override.value;
                if (override.percentage_of_code) percentage_of_code = override.percentage_of_code;
            }

            const isEarning = r.component_type === 'EARNING';
            const isESI = r.component_code === 'ESI_EE' || r.component_code === 'ESI_ER' || /esi/i.test(r.component_name || '');
            const skipProRata = skipDeductionProRata || (lop_days > 0 && isESI);
            const currentFactor = (isEarning || !skipProRata) ? proRataFactor : 1.0;

            let actualValue = 0;
            let fullValueRaw = 0;

            if (calculation_type === 'PERCENTAGE') {
                if (percentage_of_code && computed[percentage_of_code] !== undefined) {
                    if (!isEarning && skipProRata) {
                        actualValue = (full_computed[percentage_of_code] * inputVal) / 100.0;
                    } else {
                        actualValue = (computed[percentage_of_code] * inputVal) / 100.0;
                    }
                    fullValueRaw = (full_computed[percentage_of_code] * inputVal) / 100.0;
                } else {
                    actualValue = (fullMonthlyCTC * currentFactor * inputVal) / 100.0;
                    fullValueRaw = (fullMonthlyCTC * inputVal) / 100.0;
                }
            } else {
                actualValue = (inputVal / 12.0) * currentFactor;
                fullValueRaw = (inputVal / 12.0);
            }

            const roundedValue = Math.round(actualValue);
            const roundedFullValue = Math.round(fullValueRaw);
            
            computed[r.component_code] = roundedValue;
            full_computed[r.component_code] = roundedFullValue;
            
            if (isEarning) {
                otherTotal += roundedValue;
                fullOtherTotal += roundedFullValue;
            }
            
            return {
                ...r,
                value: roundedValue.toString(),
                full_value: roundedFullValue.toString()
            };
        });

        if (specialCompIdx !== -1) {
            const specialComp = compRows[specialCompIdx];
            const specialValue = Math.max(0, monthlyGrossCalculated - otherTotal);
            const fullSpecialValue = Math.max(0, Math.round(fullMonthlyCTC) - fullOtherTotal);
            
            results[specialCompIdx] = {
                ...specialComp,
                value: specialValue.toString(),
                full_value: fullSpecialValue.toString()
            };
        }

        // Bundle Employer portions into Special Allowance (Subtracting them to hide them in the Gross Salary view)
        let erBundle = 0;
        let erFullBundle = 0;
        results.forEach(r => {
            if (!r) return;
            const isEr = /employer|employeer/i.test(r.component_name) || /_ER$/i.test(r.component_code);
            if (isEr) {
                erBundle += Number(r.value || 0);
                erFullBundle += Number(r.full_value || 0);
            }
        });

        if (specialCompIdx !== -1) {
            results[specialCompIdx].value = (Number(results[specialCompIdx].value) - erBundle).toString();
            results[specialCompIdx].full_value = (Number(results[specialCompIdx].full_value) - erFullBundle).toString();
        }

        templateComponents = results.filter(r => {
            if (!r) return false;
            const isEr = /employer|employeer/i.test(r.component_name) || /_ER$/i.test(r.component_code);
            const isESI_ER = /ESI_ER/i.test(r.component_code || '');
            return !isEr || isESI_ER;
        });
        monthlyGross = Math.round(fullMonthlyCTC);
    }

    const monthlyCTCValue = contract ? Math.round(Number(contract.annual_ctc || 0) / 12) : 0;
    const totalEarnings = templateComponents
        .filter(c => c.component_type === 'EARNING')
        .reduce((sum, c) => sum + Number(c.value || 0), 0);

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
            total_days: present_days + weekend_days + lop_days,
            present_days,
            absent_days,
            leave_days,
            weekend_days,
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
          total_days: present_days + weekend_days + lop_days,
          present_days,
          absent_days,
          leave_days,
          weekend_days,
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
