const { db } = require('../config/database');

// Simplified payroll engine - Phase-1
// Assumptions (documented in code):
// - Attendance table exists with columns: employee_id, attendance_date, status ('present','absent','leave'), working_hours, work_mode
// - Primary source of truth is employee_salary_contracts + salary_structure_templates + structure_composition
// - salary_structures/salary_components are retained as runtime snapshots and migration fallback
// - Basic statutory rules (PF, TDS) are simplified placeholders and should be replaced with real rules later

function parseFormulaOverride(formulaOrValue) {
  if (formulaOrValue === undefined || formulaOrValue === null) return null;
  const text = String(formulaOrValue).trim();
  if (!text) return null;

  if (/^-?\d+(\.\d+)?$/.test(text)) {
    return {
      // Do not force 'FIXED' here; let it fall back to the base component's calculation_type
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

async function ensureRuntimeStructureSnapshot(conn, employeeId, contract, templateName, components, runBy) {
  const snapshotKey = `AUTO_TEMPLATE_CONTRACT:${contract.contract_id}`;
  const [existing] = await conn.query(
    'SELECT * FROM salary_structures WHERE employee_id = ? AND notes = ? ORDER BY version DESC LIMIT 1',
    [employeeId, snapshotKey]
  );

  if (existing.length > 0) {
    const [existingComponents] = await conn.query(
      'SELECT * FROM salary_components WHERE structure_id = ? ORDER BY sequence ASC',
      [existing[0].id]
    );
    return { structure: existing[0], components: existingComponents };
  }

  const [versionRows] = await conn.query(
    'SELECT COALESCE(MAX(version), 0) + 1 AS next_version FROM salary_structures WHERE employee_id = ?',
    [employeeId]
  );
  const nextVersion = Number(versionRows[0].next_version || 1);

  const [ins] = await conn.query(
    `INSERT INTO salary_structures
      (employee_id, structure_name, ctc_amount, effective_from, effective_to, is_active, version, created_by, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      employeeId,
      `${templateName || 'Template'} Runtime Snapshot`,
      Number(contract.annual_ctc || 0),
      contract.effective_from,
      null,
      1,
      nextVersion,
      runBy || null,
      snapshotKey
    ]
  );
  const structureId = ins.insertId;

  for (const comp of components) {
    await conn.query(
      `INSERT INTO salary_components
        (structure_id, code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        structureId,
        comp.code,
        comp.name,
        comp.component_type,
        comp.calculation_type,
        Number(comp.value || 0),
        comp.percentage_of_code || null,
        comp.taxable ? 1 : 0,
        comp.prorated ? 1 : 0,
        comp.sequence || 10,
        `Snapshot from template_id=${contract.template_id}, contract_id=${contract.contract_id}`
      ]
    );
  }

  const [snapshotRows] = await conn.query('SELECT * FROM salary_structures WHERE id = ?', [structureId]);
  const [snapshotComponents] = await conn.query(
    'SELECT * FROM salary_components WHERE structure_id = ? ORDER BY sequence ASC',
    [structureId]
  );

  return { structure: snapshotRows[0], components: snapshotComponents };
}

async function hasMasterCompositionColumn(conn) {
  const [rows] = await conn.query(
    `SELECT COUNT(*) AS count
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'structure_composition'
       AND COLUMN_NAME = 'master_component_id'`
  );
  return Number(rows[0].count || 0) > 0;
}

async function loadTemplateComponents(conn, templateId) {
  const supportsMasterComponents = await hasMasterCompositionColumn(conn);

  if (supportsMasterComponents) {
    const [rows] = await conn.query(
      `SELECT sc.composition_id, sc.formula_or_value,
              COALESCE(mc.component_id, c.id) AS component_ref_id,
              COALESCE(mc.code, c.code) AS code,
              COALESCE(mc.name, c.name) AS name,
              COALESCE(mc.component_type, c.component_type) AS component_type,
              COALESCE(mc.calculation_type, c.calculation_type) AS calculation_type,
              COALESCE(mc.value, c.value) AS value,
              COALESCE(mc.percentage_of_code, c.percentage_of_code) AS percentage_of_code,
              COALESCE(mc.taxable, c.taxable) AS taxable,
              COALESCE(mc.prorated, c.prorated) AS prorated,
              COALESCE(mc.sequence, c.sequence) AS sequence
       FROM structure_composition sc
       LEFT JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
       LEFT JOIN salary_components c ON c.id = sc.component_id
       WHERE sc.template_id = ?
       ORDER BY COALESCE(mc.sequence, c.sequence, 999) ASC, sc.composition_id ASC`,
      [templateId]
    );
    return rows;
  }

  const [legacyRows] = await conn.query(
    `SELECT sc.composition_id, sc.formula_or_value,
            c.id AS component_ref_id, c.code, c.name, c.component_type, c.calculation_type, c.value, c.percentage_of_code, c.taxable, c.prorated, c.sequence
     FROM structure_composition sc
     JOIN salary_components c ON c.id = sc.component_id
     WHERE sc.template_id = ?
     ORDER BY c.sequence ASC, sc.composition_id ASC`,
    [templateId]
  );
  return legacyRows;
}

async function resolvePayrollStructure(conn, employeeId, sd, ed, runBy, options = {}) {
  const shouldCreateSnapshot = options.createSnapshot !== false;

  const [contracts] = await conn.query(
    `SELECT esc.*, t.template_name
     FROM employee_salary_contracts esc
     JOIN salary_structure_templates t ON t.template_id = esc.template_id
     WHERE esc.employee_id = ?
       AND esc.effective_from <= ?
       AND (esc.effective_to IS NULL OR esc.effective_to >= ?)
       AND esc.status = 'Active'
     ORDER BY esc.effective_from DESC, esc.contract_id DESC
     LIMIT 1`,
    [employeeId, ed, sd]
  );

  if (contracts.length > 0) {
    const contract = contracts[0];
    const compRows = await loadTemplateComponents(conn, contract.template_id);

    if (compRows.length > 0) {
      const templateComponents = compRows.map((row) => {
        const override = parseFormulaOverride(row.formula_or_value);
        return {
          id: row.component_ref_id,
          code: row.code,
          name: row.name,
          component_type: row.component_type,
          calculation_type: (override && override.calculation_type) ? override.calculation_type : row.calculation_type,
          value: override ? override.value : Number(row.value || 0),
          percentage_of_code: (override && override.percentage_of_code) ? override.percentage_of_code : row.percentage_of_code,
          taxable: Number(row.taxable || 0) === 1,
          prorated: Number(row.prorated || 0) === 1,
          sequence: row.sequence,
          formula_or_value: row.formula_or_value
        };
      });

      if (shouldCreateSnapshot) {
        return ensureRuntimeStructureSnapshot(
          conn,
          employeeId,
          contract,
          contract.template_name,
          templateComponents,
          runBy
        );
      }

      return {
        structure: {
          id: null,
          employee_id: employeeId,
          structure_name: `${contract.template_name} (Contract View)`,
          ctc_amount: Number(contract.annual_ctc || 0),
          effective_from: contract.effective_from,
          effective_to: null,
          template_id: contract.template_id,
          contract_id: contract.contract_id,
          source: 'template_contract'
        },
        components: templateComponents
      };
    }
  }

  return null;
}

async function runPayroll(year, month, runBy = null) {
  const conn = await db.getConnection();
  await conn.beginTransaction();
  try {
    const sd = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const ed = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

    // Create or get payroll cycle
    const [existing] = await conn.query(
      'SELECT * FROM payroll_cycles WHERE year = ? AND month = ? LIMIT 1',
      [year, month]
    );
    let cycleId;
    if (existing.length === 0) {
      const [ins] = await conn.query(
        'INSERT INTO payroll_cycles (year, month, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)',
        [year, month, sd, ed, 'OPEN']
      );
      cycleId = ins.insertId;
    } else {
      cycleId = existing[0].id;
      if (existing[0].status === 'LOCKED' || existing[0].status === 'PROCESSED') {
        throw new Error('Payroll cycle is locked or already processed');
      }
    }

    // Create payroll run (processing)
    const [runRes] = await conn.query(
      'INSERT INTO payroll_runs (cycle_id, run_by, status, started_at) VALUES (?, ?, ?, NOW())',
      [cycleId, runBy, 'PROCESSING']
    );
    const runId = runRes.insertId;

    // 1. Fetch only employees who have clocked in during the period
    const [employees] = await conn.query(`
      SELECT e.id, e.FirstName, e.LastName,
             wop.sunday_off, wop.monday_off, wop.tuesday_off, wop.wednesday_off, 
             wop.thursday_off, wop.friday_off, wop.saturday_off,
             sp.start_time, mlt.threshold_hours as missing_log_threshold
      FROM employees e
      INNER JOIN (
          SELECT DISTINCT employee_id 
          FROM attendance 
          WHERE attendance_date BETWEEN ? AND ?
      ) a ON e.id = a.employee_id
      LEFT JOIN weekly_off_policies wop ON e.weekly_off_policy_id = wop.id
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LEFT JOIN missing_log_times mlt ON e.leave_plan_id = mlt.leave_plan_id
      WHERE e.EmploymentStatus = 'Working'
    `, [sd, ed]);

    // 2. Fetch all attendance for the period
    const [attendance] = await conn.query(`
      SELECT employee_id, attendance_date, status FROM attendance 
      WHERE attendance_date BETWEEN ? AND ?
    `, [sd, ed]);

    const attMap = {};
    attendance.forEach(a => {
      if (!attMap[a.employee_id]) attMap[a.employee_id] = {};
      attMap[a.employee_id][new Date(a.attendance_date).toDateString()] = a;
    });

    // 3. Fetch all approved leaves for the period
    const [allLeaves] = await conn.query(`
      SELECT l.employee_id, l.start_date, l.end_date, lt.type_code, lt.is_paid, l.is_half_day
      FROM leaves l
      INNER JOIN leave_types lt ON l.leave_type_id = lt.id
      WHERE l.status = 'approved' AND (l.start_date <= ? AND l.end_date >= ?)
    `, [ed, sd]);

    const leavesByEmp = {};
    allLeaves.forEach(l => {
      if (!leavesByEmp[l.employee_id]) leavesByEmp[l.employee_id] = [];
      leavesByEmp[l.employee_id].push(l);
    });

    const now = new Date();
    const todayStr = now.toDateString();
    const snapshots = [];

    for (const emp of employees) {
      let present_days = 0;
      let penalty_absent_days = 0;
      let regular_absent_days = 0;
      let leave_days = 0;
      let weekend_days = 0;
      let lop_from_leaves = 0;

      const weekOffDays = [];
      if (emp.sunday_off) weekOffDays.push('sunday');
      if (emp.monday_off) weekOffDays.push('monday');
      if (emp.tuesday_off) weekOffDays.push('tuesday');
      if (emp.wednesday_off) weekOffDays.push('wednesday');
      if (emp.thursday_off) weekOffDays.push('thursday');
      if (emp.friday_off) weekOffDays.push('friday');
      if (emp.saturday_off) weekOffDays.push('saturday');

      const empAtt = attMap[emp.id] || {};
      const empLeaves = leavesByEmp[emp.id] || [];

      let curr = new Date(sd);
      const end = new Date(ed);

      while (curr <= end) {
        const dStr = curr.toDateString();
        const isFuture = curr > now && dStr !== todayStr;
        const weekday = curr.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

        // Leave Check
        const todaysLeaves = empLeaves.filter(l => {
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
            // Treat as LOP if: explicit LOP/UL type code OR the leave type is marked as unpaid (is_paid = 0)
            const isUnpaid = l.type_code === 'LOP' || l.type_code === 'UL' || !l.is_paid;
            if (isUnpaid) lop_from_leaves += weight;
          });
        } else if (weekOffDays.includes(weekday)) {
          weekend_days++;
        } else if (empAtt[dStr]) {
          const record = empAtt[dStr];
          if (record.status === 'present') present_days++;
          else if (record.status === 'half-day') present_days += 0.5;
          else if (record.status === 'penalty') penalty_absent_days++;
          else if (record.status === 'absent') regular_absent_days++;
        } else if (!isFuture && dStr !== todayStr) {
          // No log penalty rule
          penalty_absent_days++;
        }
        curr.setDate(curr.getDate() + 1);
      }

      const lop_days = (penalty_absent_days * 0.5) + (regular_absent_days * 1.0) + lop_from_leaves;
      const total_absent = penalty_absent_days + regular_absent_days;
      const total_working = present_days + total_absent + leave_days; // Days where work was expected or leave taken
      const paid_days = (new Date(year, month, 0).getDate()) - lop_days;

      snapshots.push({
        employee_id: emp.id,
        working_days: new Date(year, month, 0).getDate(),
        paid_days: paid_days,
        lop_days: lop_days,
        total_present: present_days,
        total_absent: total_absent,
        total_leave: leave_days
      });
    }

    // Clean up existing snapshots for this cycle to ensure a fresh run
    await conn.query('DELETE FROM payroll_attendance_snapshots WHERE cycle_id = ?', [cycleId]);

    // Insert snapshots
    for (const s of snapshots) {
      await conn.query(
        `INSERT INTO payroll_attendance_snapshots (cycle_id, employee_id, working_days, paid_days, lop_days, total_present, total_absent, total_leave, snapshot_ts)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [cycleId, s.employee_id, s.working_days, s.paid_days, s.lop_days, s.total_present, s.total_absent, s.total_leave]
      );
    }

    // Fetch snapshots to process employees
    const [snapshotRows] = await conn.query(
      'SELECT * FROM payroll_attendance_snapshots WHERE cycle_id = ?',
      [cycleId]
    );

    let totalEmployeesCount = 0;
    let totalGross = 0.0;
    let totalDeductions = 0.0;
    let totalNet = 0.0;

    for (const s of snapshotRows) {
      const employeeId = s.employee_id;

      // Resolve pay structure from template contracts first; fallback to legacy structures during migration.
      const resolved = await resolvePayrollStructure(conn, employeeId, sd, ed, runBy, { createSnapshot: true });
      if (!resolved) {
        // No structure - skip payroll for this employee (auditable by logging)
        continue;
      }
      const structure = resolved.structure;
      const components = resolved.components;

      // Helper to find component amount by code (already computed)
      const computed = {};

      // Rule: If Full Month Basic >= 15000, Deductions are NOT pro-rated for LOP
      const basicComp = resolved.components.find(c => c.code === 'BASIC');
      const monthlyCtc = Number(structure.ctc_amount || 0) / 12.0;
      let fullMonthlyBasic = 0;
      if (basicComp) {
         if (basicComp.calculation_type === 'FIXED') fullMonthlyBasic = Number(basicComp.value) / 12.0;
         else fullMonthlyBasic = (monthlyCtc * Number(basicComp.value)) / 100.0;
      }
      const skipDeductionProRata = (Number(s.lop_days) > 0) && fullMonthlyBasic >= 15000;

      // First pass: compute FIXED components and PERCENTAGE-of-CTC placeholders
      let gross = 0.0;
      for (const comp of components) {
        let amount = 0.0;

        if (comp.calculation_type === 'FIXED') {
          // If it's a monthly run, we assume FIXED values in the structure are annual and need to be divided by 12
          // unless they are very small (like PT which is usually monthly). 
          // However, standard HRMS practice for template structures is annual values.
          amount = Number(comp.value) / 12.0;
        } else {
          // PERCENTAGE: if percentage_of_code available and already computed, use that, else percentage of monthly CTC
          const pct = Number(comp.value);
          const isEarning = comp.component_type === 'EARNING';
          if (comp.percentage_of_code) {
            let baseAmt = Number(computed[comp.percentage_of_code] || 0);
            // If it's a Deduction and we skip pro-rata, we need the FULL base value
            if (!isEarning && skipDeductionProRata) {
               // Back-calculate or use a full_computed map if available.
               // For now, if basic exists in the structure, we can calculate its full value.
               // But simpler is to use the pro-rata factor if we know the base was pro-rated.
               const working = Number(s.working_days || 0);
               const paid = Number(s.paid_days || 0);
               if (paid > 0) baseAmt = (baseAmt * working) / paid;
            }
            amount = (baseAmt * pct) / 100.0;
          } else {
            // Apply current factor if no percentage_of_code
            const currentFactor = (isEarning || !skipDeductionProRata) ? (Number(s.paid_days || 0) / Number(s.working_days || 1)) : 1.0;
            amount = (monthlyCtc * currentFactor * pct) / 100.0;
          }
        }

        // Prorate if flagged
        if (comp.prorated) {
          const isEarning = comp.component_type === 'EARNING';
          if (isEarning || !skipDeductionProRata) {
            const working = Number(s.working_days || 0);
            const paid = Number(s.paid_days || 0);
            if (working > 0) amount = (amount * paid) / working;
          }
        }

        computed[comp.code] = amount;
        if (comp.component_type === 'EARNING') gross += amount;
      }

      // Statutory Deductions (Rules provided by USER)
      // 1. PF Calculation
      let pfAmountEmp = 0.0;
      if (computed['BASIC']) {
        // Rule: If skipDeductionProRata, calculate on FULL basic
        const pfBase = skipDeductionProRata ? fullMonthlyBasic : Number(computed['BASIC']);
        pfAmountEmp = Math.round(pfBase * 0.12);
      }
      let pfAmountEr = pfAmountEmp; // Employer matches

      // 2. ESI Calculation (Back-calculated from CTC-basis Gross)
      let esiAmountEmp = 0.0;
      let esiAmountEr = 0.0;
      const ESI_THRESHOLD = 21000;

      // Use full monthly CTC for ESI calculation if there is ANY LOP, ensuring the amount stays "same"
      const esiGrossBase = (Number(s.lop_days) > 0) ? (monthlyCtc) : gross;

      if (esiGrossBase <= ESI_THRESHOLD) {
        esiAmountEr = Math.ceil((esiGrossBase - pfAmountEr) * 3.25 / 103.25);
        esiAmountEmp = Math.ceil((esiGrossBase - pfAmountEr - esiAmountEr) * 0.0075);
      }

      // Update computed results to ensure they are picked up in breakups and correctly subtracted
      // We explicitly override these codes to ensure the statutory rules take precedence over template defaults
      computed['PF_DEDUCT'] = pfAmountEmp;
      computed['ESI_EE'] = esiAmountEmp;
      computed['ESI_ER'] = esiAmountEr;

      // Sum deductions (ensuring we don't double count if they are already in components)
      let deductions = 0.0;
      for (const comp of components) {
        if (comp.component_type === 'DEDUCTION') {
          // If the component code is one we specifically calculated above, use that value
          if (computed[comp.code] !== undefined) {
            deductions += Number(computed[comp.code]);
          } else {
            deductions += Number(computed[comp.code] || 0);
          }
        }
      }

      // Professional Tax - slab logic
      let ptAmount = 0;
      if (esiGrossBase > 15000) ptAmount = 200;
      computed['PT'] = ptAmount;
      if (!components.find(c => c.code === 'PT')) deductions += ptAmount;

      // TDS (Simplified placeholder)
      const tds = (esiGrossBase > 30000) ? (esiGrossBase * 0.10) : 0;
      computed['TDS'] = tds;
      if (!components.find(c => c.code === 'TDS')) deductions += tds;

      const net = gross - deductions;

      // Insert payroll_employee_salaries
      const monthlyGross = Number(structure.ctc_amount || 0) / 12;
      const [salaryRes] = await conn.query(
        `INSERT INTO payroll_employee_salaries (run_id, cycle_id, employee_id, structure_id, gross_earnings, total_deductions, net_pay, created_at)
         VALUES (?, ?, ?, ?, ?, 0, ?, NOW())`,
        [runId, cycleId, employeeId, structure.id, monthlyGross.toFixed(2), monthlyGross.toFixed(2)]
      );
      const employeeSalaryId = salaryRes.insertId;

      // Insert component breakups (includes ESI_ER, ESI_EE, PF_DEDUCT if in template)
      for (const comp of components) {
        const amt = Number(computed[comp.code] || 0).toFixed(2);
        await conn.query(
          `INSERT INTO payroll_salary_breakups (employee_salary_id, component_code, component_name, component_type, amount, taxable, prorated, metadata)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [employeeSalaryId, comp.code, comp.name, comp.component_type, amt, comp.taxable, comp.prorated, null]
        );
      }

      // Insert PF, ESI, TDS, and PT as payroll_tax_deductions lines for payslip summary
      if (pfAmountEmp > 0) {
        await conn.query(
          `INSERT INTO payroll_tax_deductions (employee_salary_id, deduction_code, deduction_name, amount, metadata)
           VALUES (?, ?, ?, ?, ?)`,
          [employeeSalaryId, 'PF_EMP', 'Employee PF', pfAmountEmp.toFixed(2), null]
        );
      }
      if (esiAmountEmp > 0) {
        await conn.query(
          `INSERT INTO payroll_tax_deductions (employee_salary_id, deduction_code, deduction_name, amount, metadata)
           VALUES (?, ?, ?, ?, ?)`,
          [employeeSalaryId, 'ESI_EE', 'Employee ESI', esiAmountEmp.toFixed(2), null]
        );
      }
      if (ptAmount > 0) {
        await conn.query(
          `INSERT INTO payroll_tax_deductions (employee_salary_id, deduction_code, deduction_name, amount, metadata)
           VALUES (?, ?, ?, ?, ?)`,
          [employeeSalaryId, 'PT', 'Professional Tax', ptAmount.toFixed(2), null]
        );
      }
      if (tds > 0) {
        await conn.query(
          `INSERT INTO payroll_tax_deductions (employee_salary_id, deduction_code, deduction_name, amount, metadata)
           VALUES (?, ?, ?, ?, ?)`,
          [employeeSalaryId, 'TDS', 'Income Tax (TDS)', tds.toFixed(2), null]
        );
      }

      // Create payslip JSON snapshot
      // Create payslip JSON snapshot
      const [breakupsRows] = await conn.query(
        `SELECT component_code, component_name, component_type, amount, taxable, prorated FROM payroll_salary_breakups WHERE employee_salary_id = ?`,
        [employeeSalaryId]
      );
      const [taxLinesRows] = await conn.query(
        `SELECT deduction_code, deduction_name, amount FROM payroll_tax_deductions WHERE employee_salary_id = ?`,
        [employeeSalaryId]
      );

      // User requested to hide Employer components and bundle them into Special Allowance
      let erBundle = 0;
      const finalEarnings = [];
      const finalDeductions = [];
      const finalStatutory = [];

      for (const b of breakupsRows) {
        const isEr = /employer|employeer/i.test(b.component_name) || /_ER$/i.test(b.component_code);
        const isESI_ER = /ESI_ER/i.test(b.component_code || '');
        
        if (isEr) {
          erBundle += Number(b.amount || 0);
          // If it's ESI_ER, we still want to show it as a line item per user request
          if (isESI_ER) {
            if (b.component_type === 'EARNING') finalEarnings.push(b);
            else finalDeductions.push(b);
          }
        } else if (b.component_type === 'EARNING') {
          finalEarnings.push(b);
        } else {
          finalDeductions.push(b);
        }
      }

      for (const t of taxLinesRows) {
        const isEr = /employer|employeer/i.test(t.deduction_name) || /_ER$/i.test(t.deduction_code);
        const isESI_ER = /ESI_ER/i.test(t.deduction_code || '');
        
        if (isEr) {
          erBundle += Number(t.amount || 0);
          if (isESI_ER) finalStatutory.push(t);
        } else {
          finalStatutory.push(t);
        }
      }

      // Add bundle to Special Allowance (subtracting because it's a hidden deduction in this setup)
      let saFound = false;
      for (const e of finalEarnings) {
        if (e.component_code === 'SPECIAL' || /special/i.test(e.component_name)) {
          e.amount = (Number(e.amount) - erBundle).toFixed(2);
          saFound = true;
          break;
        }
      }
      if (!saFound && erBundle > 0) {
        // This case is unlikely if SPECIAL exists, but for safety:
        finalEarnings.push({ component_code: 'SPECIAL', component_name: 'Special Allowance', component_type: 'EARNING', amount: (-erBundle).toFixed(2), taxable: 1, prorated: 1 });
      }

      const payslip = {
        employee_id: employeeId,
        cycle: { year, month, start: sd, end: ed },
        structure: { id: structure.id, name: structure.structure_name, ctc: Number(structure.ctc_amount) },
        attendance_snapshot: s,
        earnings: finalEarnings,
        component_deductions: finalDeductions,
        statutory_deductions: finalStatutory,
        totals: {
          gross: (Number(gross) - erBundle).toFixed(2),
          deductions: (Number(deductions) - erBundle).toFixed(2),
          net: Number(net.toFixed(2))
        }
      };

      await conn.query(
        `INSERT INTO payroll_payslips (employee_salary_id, payslip_json, generated_at) VALUES (?, ?, NOW())`,
        [employeeSalaryId, JSON.stringify(payslip)]
      );

      totalEmployeesCount += 1;
      totalGross += Number(resolved.structure.ctc_amount || 0) / 12;
      totalDeductions = 0;
      totalNet += Number(resolved.structure.ctc_amount || 0) / 12;
    }

    // Update run totals and mark completed
    await conn.query(
      `UPDATE payroll_runs SET status = ?, total_employees = ?, total_gross = ?, total_deductions = 0, total_net = ?, completed_at = NOW() WHERE id = ?`,
      ['COMPLETED', totalEmployeesCount, totalGross.toFixed(2), totalNet.toFixed(2), runId]
    );

    await conn.commit();
    await conn.end();

    return { runId, cycleId, totalEmployees: totalEmployeesCount, totalGross };
  } catch (err) {
    try {
      await conn.rollback();
      await conn.end();
    } catch (e) { }
    throw err;
  }
}

async function getPayslipsForEmployee(employeeId, limit = 20) {
  const c = await db();
  const [rows] = await c.query(
    `SELECT p.id as payslip_id, p.employee_salary_id, p.generated_at, r.cycle_id, r.started_at, r.completed_at
     FROM payroll_payslips p
     JOIN payroll_employee_salaries s ON s.id = p.employee_salary_id
     JOIN payroll_runs r ON r.id = s.run_id
     WHERE s.employee_id = ?
     ORDER BY p.generated_at DESC
     LIMIT ?`,
    [employeeId, limit]
  );
  c.end();
  return rows;
}

async function getPayslipDetail(employeeId, year, month) {
  const c = await db();
  const [rows] = await c.query(
    `SELECT p.payslip_json
     FROM payroll_payslips p
     JOIN payroll_employee_salaries s ON s.id = p.employee_salary_id
     JOIN payroll_runs r ON r.id = s.run_id
     JOIN payroll_cycles c ON c.id = r.cycle_id
     WHERE s.employee_id = ? AND c.year = ? AND c.month = ?
     ORDER BY p.generated_at DESC
     LIMIT 1`,
    [employeeId, year, month]
  );
  c.end();
  if (rows.length === 0) return null;
  return rows[0].payslip_json;
}

async function getSalaryStructureForEmployee(employeeId, options = {}) {
  const c = await db();
  const refDate = options.date || new Date().toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD
  const resolved = await resolvePayrollStructure(c, employeeId, refDate, refDate, null, { createSnapshot: false });
  if (!resolved) {
    c.end();
    return null;
  }
  c.end();

  const { structure, components } = resolved;
  const isMonthly = options.monthly === true;
  const divisor = isMonthly ? 12.0 : 1.0;
  const ctc = Number(structure.ctc_amount || 0) / divisor;
  const computed = {};

  // Sort by sequence to handle percentages of other components correctly
  const sorted = [...components].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

  const processedComponents = sorted.map(comp => {
    let amount = Number(comp.value || 0) / divisor;
    if (comp.calculation_type === 'PERCENTAGE') {
      const pct = Number(comp.value || 0);
      if (comp.percentage_of_code) {
        const baseAmt = Number(computed[comp.percentage_of_code] || 0);
        amount = (baseAmt * pct) / 100.0;
      } else {
        amount = (ctc * pct) / 100.0;
      }
    }
    // Round to 2 decimal places for clean response
    amount = Math.round(amount * 100) / 100;
    computed[comp.code] = amount;
    return { ...comp, value: amount };
  });

  return { structure, components: processedComponents };
}

async function getPayrollAttendanceImpact(year, month, employeeId) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
  const c = await db();
  const [rows] = await c.query(
    `SELECT employee_id, COUNT(*) as working_days,
            SUM(CASE WHEN status='present' OR status='late' THEN 1 WHEN status='half-day' THEN 0.5 ELSE 0 END) as present_days,
            SUM(CASE WHEN status='absent' THEN 1 ELSE 0 END) as absent_days,
            SUM(CASE WHEN status='on-leave' OR status='leave' THEN 1 ELSE 0 END) as leave_days
     FROM attendance
     WHERE attendance_date BETWEEN ? AND ? AND employee_id = ?
     GROUP BY employee_id`,
    [startDate, endDate, employeeId]
  );
  c.end();
  return rows[0] || { employee_id: employeeId, working_days: 0, present_days: 0, absent_days: 0, leave_days: 0 };
}

async function exportPayrollRun(runId) {
  const XLSX = require('xlsx');
  const c = await db();
  try {
    const [rows] = await c.query(
      `SELECT e.EmployeeNumber, e.FullName, d.name as Designation, dept.name as Department,
              p.payslip_json
       FROM payroll_employee_salaries s
       JOIN employees e ON e.id = s.employee_id
       LEFT JOIN designations d ON d.id = e.DesignationId
       LEFT JOIN departments dept ON dept.id = e.DepartmentId
       JOIN payroll_payslips p ON p.employee_salary_id = s.id
       WHERE s.run_id = ?`,
      [runId]
    );

    const data = rows.map(r => {
      const ps = typeof r.payslip_json === 'string' ? JSON.parse(r.payslip_json) : r.payslip_json;
      const annualCtc = ps.structure?.ctc || 0;
      return {
        'Employee Number': r.EmployeeNumber,
        'Full Name': r.FullName,
        'Designation': r.Designation,
        'Department': r.Department,
        'Salary Template': ps.structure?.name || 'N/A',
        'Annual CTC': annualCtc,
        'Monthly Gross': (annualCtc / 12).toFixed(2)
      };
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payroll Export');
    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return buf;
  } finally {
    c.end();
  }
}

module.exports = {
  runPayroll,
  getPayslipsForEmployee,
  getPayslipDetail,
  getSalaryStructureForEmployee,
  getPayrollAttendanceImpact,
  exportPayrollRun
};
