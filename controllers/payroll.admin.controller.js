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
    SELECT l.employee_id, l.start_date, l.end_date, lt.type_code 
    FROM leaves l
    JOIN leave_types lt ON lt.id = l.leave_type_id
    WHERE l.employee_id IN (?) AND l.status = 'approved'
      AND (l.start_date <= ? AND l.end_date >= ?)
  `, [employeeIds, ed, sd]);

  const leavesMap = {};
  allLeaves.forEach(l => {
    if (!leavesMap[l.employee_id]) leavesMap[l.employee_id] = [];
    leavesMap[l.employee_id].push(l);
  });

  const result = {};

  for (const emp of employees) {
    const empAtt = attMap[emp.id] || {};
    const empLeaves = leavesMap[emp.id] || [];
    
    const weekOffDays = [];
    // ... (rest of the weekend logic)
    if (emp.sunday_off) weekOffDays.push('sunday');
    if (emp.monday_off) weekOffDays.push('monday');
    if (emp.tuesday_off) weekOffDays.push('tuesday');
    if (emp.wednesday_off) weekOffDays.push('wednesday');
    if (emp.thursday_off) weekOffDays.push('thursday');
    if (emp.friday_off) weekOffDays.push('friday');
    if (emp.saturday_off) weekOffDays.push('saturday');

    let present_days = 0;
    let absent_days = 0;
    let leave_days = 0;
    let lop_leave_days = 0;
    let weekend_days = 0;
    let total_days_in_period = 0;

    let curr = new Date(sd);
    const end = new Date(ed);

    while (curr <= end) {
      const dStr = curr.toDateString();
      const isFuture = curr > now && dStr !== todayStr;
      
      if (!isFuture) {
        total_days_in_period++;
        const weekday = curr.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        const activeLeave = empLeaves.find(l => {
          const lStart = new Date(l.start_date);
          const lEnd = new Date(l.end_date);
          const check = new Date(curr);
          check.setHours(0,0,0,0);
          lStart.setHours(0,0,0,0);
          lEnd.setHours(0,0,0,0);
          return check >= lStart && check <= lEnd;
        });

        if (activeLeave) {
          leave_days++;
          if (activeLeave.type_code === 'LOP') {
            lop_leave_days++;
          }
        } else if (weekOffDays.includes(weekday)) {
          weekend_days++;
        } else if (empAtt[dStr]) {
          const record = empAtt[dStr];
          if (record.status === 'present') present_days++;
          else if (record.status === 'half-day') present_days += 0.5;
          else if (record.status === 'penalty') absent_days++; // Only penalty counts toward LOP multiplier in my-report logic
        } else if (dStr !== todayStr) {
          // Assume unexcused absence is penalty after threshold in my-report
          // For preview, we count it as absent if no log
          absent_days++;
        }
      }
      curr.setDate(curr.getDate() + 1);
    }

    result[emp.id] = {
      total_days: total_days_in_period,
      lop_days: (absent_days * 0.5) + lop_leave_days
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
    const [employees] = await c.query(
      `SELECT id
       FROM employees
       WHERE EmploymentStatus IS NULL OR LOWER(EmploymentStatus) IN ('active', 'probation', 'confirmed')`
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

    const allEmployees = new Set(employees.map((r) => Number(r.id)));
    const structureEmployees = new Set(withStructure.map((r) => Number(r.employee_id)));
    const attendanceEmployees = new Set(attendance.map((r) => Number(r.employee_id)));

    const missingStructure = [];
    const missingAttendance = [];

    for (const empId of allEmployees) {
      if (!structureEmployees.has(empId)) missingStructure.push(empId);
      if (!attendanceEmployees.has(empId)) missingAttendance.push(empId);
    }

    return {
      month: `${year}-${String(month).padStart(2, '0')}`,
      totalEmployees: attendanceEmployees.size,
      withSalaryStructure: structureEmployees.size,
      withAttendance: attendanceEmployees.size,
      missingSalaryStructureCount: missingStructure.length,
      missingAttendanceCount: missingAttendance.length,
      missingSalaryStructure: missingStructure.slice(0, 50),
      missingAttendance: missingAttendance.slice(0, 50),
      valid: missingStructure.length === 0 && missingAttendance.length === 0
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
    const [estimateRows] = await c.query(
      `SELECT
         COUNT(*) AS employeeCount,
         COALESCE(SUM(ctc_amount / 12), 0) AS estimatedGross
       FROM (
         SELECT ss.employee_id, ss.ctc_amount
         FROM salary_structures ss
         JOIN (
           SELECT employee_id, MAX(version) AS max_version
           FROM salary_structures
           WHERE effective_from <= LAST_DAY(?)
             AND (effective_to IS NULL OR effective_to >= DATE_FORMAT(?, '%Y-%m-01'))
           GROUP BY employee_id
         ) latest ON latest.employee_id = ss.employee_id AND latest.max_version = ss.version
       ) current_structures`,
      [`${year}-${String(month).padStart(2, '0')}-01`, `${year}-${String(month).padStart(2, '0')}-01`]
    );

    // --- DETAILED PREVIEW LOGIC ---
    const [employees] = await c.query(`
      SELECT e.id, e.EmployeeNumber, e.FullName, d.name as Designation, dept.name as Department,
             esc.template_id, t.template_name, esc.annual_ctc,
             wop.sunday_off, wop.monday_off, wop.tuesday_off, wop.wednesday_off, 
             wop.thursday_off, wop.friday_off, wop.saturday_off
      FROM employees e
      LEFT JOIN designations d ON d.id = e.DesignationId
      LEFT JOIN departments dept ON dept.id = e.DepartmentId
      JOIN employee_salary_contracts esc ON esc.employee_id = e.id AND esc.status = 'Active'
      LEFT JOIN salary_structure_templates t ON t.template_id = esc.template_id
      LEFT JOIN weekly_off_policies wop ON e.weekly_off_policy_id = wop.id
      WHERE esc.effective_from <= LAST_DAY(?)
        AND (esc.effective_to IS NULL OR esc.effective_to >= DATE_FORMAT(?, '%Y-%m-01'))
    `, [`${year}-${String(month).padStart(2, '0')}-01`, [`${year}-${String(month).padStart(2, '0')}-01`]]);

    const attSummaryMap = await getAttendanceSummaryMap(c, year, month, employees);

    const templateIds = [...new Set(employees.map(e => e.template_id).filter(Boolean))];
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

    const detailedList = employees.map(emp => {
      const annualCTC = Number(emp.annual_ctc || 0);
      const monthlyGross = Math.round(annualCTC / 12);
      const comps = compMap[emp.template_id] || [];
      
      const attSummary = attSummaryMap[emp.id] || { total_days: 30, lop_days: 0 };
      const lopDays = attSummary.lop_days;
      const totalDays = attSummary.total_days;
      const proRataFactor = totalDays > 0 ? (totalDays - lopDays) / totalDays : 1;

      const computed = {};
      let totalEarnings = 0;
      let totalDeductions = 0;
      let specialIdx = -1;

      // Sort by sequence for calculation
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

        let amt = 0;
        if (calculation_type === 'PERCENTAGE') {
          if (percentage_of_code && computed[percentage_of_code] !== undefined) {
            amt = (computed[percentage_of_code] * inputVal) / 100.0;
          } else {
            amt = (monthlyGross * inputVal) / 100.0;
          }
        } else {
          amt = inputVal / 12.0;
        }

        // Apply pro-rata if the component is flagged as prorated
        const isProrated = r.prorated === 1 || r.prorated === true;
        if (isProrated) {
          amt = amt * proRataFactor;
        }

        const rounded = Math.round(amt);
        computed[r.component_code] = rounded;
        
        if (r.component_type === 'EARNING') {
          totalEarnings += rounded;
        } else if (r.component_type === 'DEDUCTION') {
          totalDeductions += rounded;
        }

        return { ...r, calculated_amount: rounded };
      });

      // Handle Special Allowance (balancing component)
      if (specialIdx !== -1) {
        const specialAmt = Math.max(0, (monthlyGross * proRataFactor) - totalEarnings);
        calculatedComponents[specialIdx].calculated_amount = specialAmt;
        computed['SPECIAL'] = specialAmt;
        totalEarnings += specialAmt;
      }

      return {
        employee_id: emp.id,
        employee_number: emp.EmployeeNumber,
        full_name: emp.FullName,
        designation: emp.Designation,
        department: emp.Department,
        template_name: emp.template_name,
        annual_ctc: annualCTC,
        monthly_gross: monthlyGross,
        total_earnings: totalEarnings,
        total_deductions: totalDeductions,
        total_net: totalEarnings - totalDeductions,
        lop_days: lopDays,
        total_days: totalDays,
        components: calculatedComponents.map(c => ({
          code: c.component_code,
          name: c.component_name,
          type: c.component_type,
          amount: c.calculated_amount
        }))
      };
    });

    c.end();

    return ok(res, {
      mode: 'DRY_RUN',
      validation,
      estimate: {
        employeeCount: Number(estimateRows[0]?.employeeCount || 0),
        estimatedGross: Number(estimateRows[0]?.estimatedGross || 0)
      },
      detailedPreview: detailedList
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

    const [allLeaves] = await c.query(
        "SELECT * FROM leaves WHERE employee_id = ? AND status = 'approved' AND ((start_date BETWEEN ? AND ?) OR (end_date BETWEEN ? AND ?))",
        [employeeId, startDate, endDate, startDate, endDate]
    );

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
        
        const isOnLeave = allLeaves.some(l => {
            const lStart = new Date(l.start_date);
            const lEnd = new Date(l.end_date);
            const check = new Date(curr);
            check.setHours(0,0,0,0);
            lStart.setHours(0,0,0,0);
            lEnd.setHours(0,0,0,0);
            return check >= lStart && check <= lEnd;
        });

        if (isOnLeave) {
            leave_days++;
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

    const lop_days = absent_days * 0.5;
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

        // First pass: Calculate and round all components except Special Allowance
        let results = compRows.map((r, idx) => {
            if (r.component_code === 'SPECIAL' || r.component_name === 'Special Allowance') {
                specialCompIdx = idx;
                return null;
            }
            
            let inputVal = Number(r.value || 0);
            const override = String(r.formula_or_value || "");
            if (/^\d+(\.\d+)?%?$/.test(override)) {
                inputVal = Number(override.replace('%', ''));
            }

            let actualValue = 0;
            let fullValueRaw = 0;

            if (r.calculation_type === 'PERCENTAGE') {
                if (r.percentage_of_code && computed[r.percentage_of_code] !== undefined) {
                    actualValue = (computed[r.percentage_of_code] * inputVal) / 100.0;
                    fullValueRaw = (full_computed[r.percentage_of_code] * inputVal) / 100.0;
                } else {
                    actualValue = (fullMonthlyCTC * proRataFactor * inputVal) / 100.0;
                    fullValueRaw = (fullMonthlyCTC * inputVal) / 100.0;
                }
            } else {
                actualValue = (inputVal / 12.0) * proRataFactor;
                fullValueRaw = inputVal / 12.0;
            }

            const roundedValue = Math.round(actualValue);
            const roundedFullValue = Math.round(fullValueRaw);
            
            computed[r.component_code] = roundedValue;
            full_computed[r.component_code] = roundedFullValue;
            
            const isEarning = r.component_type === 'EARNING';
            const isEmployer = r.component_code?.includes('EMPLOYER') || r.component_code?.includes('EMPLOYEER') || r.component_name?.includes('Employer') || r.component_name?.includes('Employeer');
            
            if (isEarning || isEmployer) {
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

        templateComponents = results.filter(r => r !== null);
        monthlyGross = monthlyGrossCalculated;
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
