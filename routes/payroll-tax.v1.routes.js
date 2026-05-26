const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const { db } = require("../config/database");
const { auth, finance } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");
const payrollService = require("../services/payroll.service");

const proofUpload = multer({ dest: path.join("uploads", "candidate_docs") });

function normalizeMonth(monthInput) {
  if (!monthInput) return null;
  const parts = String(monthInput).split("-");
  if (parts.length !== 2) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!year || !month || month < 1 || month > 12) return null;
  return { year, month };
}

function getFinancialYearFromYearMonth(year, month) {
  if (month >= 4) return `${year}-${year + 1}`;
  return `${year - 1}-${year}`;
}

function getFinancialYearWindow(financialYear) {
  if (!financialYear || !/^\d{4}-\d{4}$/.test(financialYear)) return null;
  const [startYear] = financialYear.split("-").map(Number);
  const start = `${startYear}-04-01`;
  const end = `${startYear + 1}-03-31`;
  return { start, end };
}

async function ensureV1Tables(conn) {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS payroll_tax_slabs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      regime_type ENUM('OLD','NEW') NOT NULL,
      min_income DECIMAL(15,2) NOT NULL,
      max_income DECIMAL(15,2) NULL,
      rate DECIMAL(6,3) NOT NULL,
      cess_rate DECIMAL(6,3) DEFAULT 4.000,
      surcharge_rate DECIMAL(6,3) DEFAULT 0.000,
      financial_year VARCHAR(9) NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_tax_slabs_regime_fy (regime_type, financial_year, is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS payroll_tax_section_limits (
      id INT AUTO_INCREMENT PRIMARY KEY,
      section_code VARCHAR(32) NOT NULL,
      max_limit DECIMAL(15,2) NOT NULL,
      financial_year VARCHAR(9) NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY ux_tax_section_fy (section_code, financial_year)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS payroll_component_registry (
      id INT AUTO_INCREMENT PRIMARY KEY,
      component_name VARCHAR(128) NOT NULL,
      component_code VARCHAR(64) NULL,
      component_type ENUM('EARNING','DEDUCTION','REIMBURSEMENT') DEFAULT 'EARNING',
      is_taxable TINYINT(1) NOT NULL DEFAULT 1,
      is_fixed TINYINT(1) NOT NULL DEFAULT 1,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY ux_component_name (component_name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS payroll_statutory_rules (
      id INT AUTO_INCREMENT PRIMARY KEY,
      provider_type ENUM('PF','ESI','PT') NOT NULL,
      state_code VARCHAR(16) DEFAULT 'DEFAULT',
      percentage DECIMAL(8,4) NULL,
      ceiling_limit DECIMAL(15,2) NULL,
      fixed_amount DECIMAL(15,2) NULL,
      effective_from DATE NOT NULL,
      effective_to DATE NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_statutory_provider (provider_type, state_code, is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS payroll_tax_proofs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id INT NOT NULL,
      financial_year VARCHAR(9) NOT NULL,
      section_code VARCHAR(32) NULL,
      original_filename VARCHAR(255) NOT NULL,
      stored_filename VARCHAR(255) NOT NULL,
      mime_type VARCHAR(128) NULL,
      file_path VARCHAR(512) NOT NULL,
      declared_amount DECIMAL(15,2) DEFAULT 0.00,
      extracted_amount DECIMAL(15,2) DEFAULT NULL,
      verification_status ENUM('PENDING','AI_VERIFIED','MANUAL_VERIFIED','REJECTED') DEFAULT 'PENDING',
      verification_notes TEXT,
      verified_by INT NULL,
      verified_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      KEY idx_tax_proofs_employee_fy (employee_id, financial_year, verification_status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS payroll_standard_deductions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      regime_type ENUM('OLD','NEW') NOT NULL,
      amount DECIMAL(15,2) NOT NULL,
      financial_year VARCHAR(9) NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY ux_std_deduction_regime_fy (regime_type, financial_year)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

async function writeAudit(conn, action, performedBy, payrollRunId, details) {
  await conn.query(
    `INSERT INTO payroll_audit_trail (action, performed_by, payroll_run_id, details)
     VALUES (?, ?, ?, ?)`,
    [action, performedBy, payrollRunId || null, details || null],
  );
}

async function calculateTaxBySlabs(
  conn,
  annualIncome,
  deductions,
  regimeType,
  financialYear,
) {
  const regimeStr = String(regimeType || "OLD").toUpperCase();

  // Fetch applicable standard deduction
  const [stdDedRows] = await conn.query(
    `SELECT amount FROM payroll_standard_deductions 
     WHERE regime_type = ? AND financial_year = ? AND is_active = 1 LIMIT 1`,
    [regimeStr, financialYear],
  );
  const standardDeduction =
    stdDedRows.length > 0 ? Number(stdDedRows[0].amount) : 0;

  const totalDeductions = Number(deductions || 0) + standardDeduction;
  const taxableIncome = Math.max(
    0,
    Number(annualIncome || 0) - totalDeductions,
  );

  const [slabs] = await conn.query(
    `SELECT min_income, max_income, rate, cess_rate, surcharge_rate
     FROM payroll_tax_slabs
     WHERE regime_type = ? AND financial_year = ? AND is_active = 1
     ORDER BY min_income ASC`,
    [regimeStr, financialYear],
  );

  if (!slabs.length) {
    return {
      taxable_income: taxableIncome,
      base_tax: 0,
      cess: 0,
      surcharge: 0,
      total_tax: 0,
      monthly_tds: 0,
      slabs_used: [],
    };
  }

  let baseTax = 0;
  const slabsUsed = [];

  for (const slab of slabs) {
    const min = Number(slab.min_income || 0);
    const max = slab.max_income == null ? Infinity : Number(slab.max_income);
    if (taxableIncome <= min) continue;
    const taxablePart = Math.max(0, Math.min(taxableIncome, max) - min);
    const amount = (taxablePart * Number(slab.rate || 0)) / 100;
    baseTax += amount;
    slabsUsed.push({
      min_income: min,
      max_income: Number.isFinite(max) ? max : null,
      rate: Number(slab.rate || 0),
      taxable_amount: taxablePart,
      tax_amount: Number(amount.toFixed(2)),
    });
  }

  const cessRate = Number(slabs[0].cess_rate || 0);
  const surchargeRate = Number(slabs[0].surcharge_rate || 0);
  const surcharge = (baseTax * surchargeRate) / 100;
  const cess = ((baseTax + surcharge) * cessRate) / 100;
  const totalTax = baseTax + surcharge + cess;

  return {
    taxable_income: Number(taxableIncome.toFixed(2)),
    base_tax: Number(baseTax.toFixed(2)),
    surcharge: Number(surcharge.toFixed(2)),
    cess: Number(cess.toFixed(2)),
    total_tax: Number(totalTax.toFixed(2)),
    monthly_tds: Number((totalTax / 12).toFixed(2)),
    slabs_used: slabsUsed,
    standard_deduction: standardDeduction,
    investment_deductions: Number(Number(deductions || 0).toFixed(2)),
    total_deductions: Number(totalDeductions.toFixed(2)),
  };
}

router.use(auth);

router.get("/admin/payroll/statutory-rules", finance, async (req, res) => {
  let c = null;
  try {
    c = await db();
    await ensureV1Tables(c);
    const [rows] = await c.query(
      `SELECT * FROM payroll_statutory_rules
       WHERE is_active = 1
       ORDER BY provider_type ASC, state_code ASC, effective_from DESC`,
    );
    res.json({ success: true, rules: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.put("/admin/payroll/statutory-rules", finance, async (req, res) => {
  let c = null;
  try {
    const rules = Array.isArray(req.body.rules) ? req.body.rules : [req.body];
    if (!rules.length)
      return res.status(400).json({ error: "rules payload required" });

    c = await db();
    await c.beginTransaction();
    await ensureV1Tables(c);

    for (const r of rules) {
      if (!r.provider_type) {
        await c.rollback();
        return res.status(400).json({ error: "provider_type is required" });
      }

      await c.query(
        `INSERT INTO payroll_statutory_rules
         (provider_type, state_code, percentage, ceiling_limit, fixed_amount, effective_from, effective_to, is_active, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          String(r.provider_type).toUpperCase(),
          (r.state_code || "DEFAULT").toUpperCase(),
          r.percentage ?? null,
          r.ceiling_limit ?? null,
          r.fixed_amount ?? null,
          r.effective_from || new Date().toLocaleDateString("en-CA"),
          r.effective_to || null,
          r.is_active === false ? 0 : 1,
          req.user.id,
        ],
      );
    }

    await writeAudit(
      c,
      "STATUTORY_RULES_UPDATE",
      req.user.id,
      null,
      JSON.stringify({ count: rules.length }),
    );

    await c.commit();
    res.json({
      success: true,
      message: "Statutory rules updated",
      count: rules.length,
    });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/admin/tax/slabs", async (req, res) => {
  let c = null;
  try {
    const financialYear = req.query.financial_year;
    c = await db();
    await ensureV1Tables(c);
    const args = [];
    let where = "WHERE is_active = 1";
    if (financialYear) {
      where += " AND financial_year = ?";
      args.push(financialYear);
    }
    const [rows] = await c.query(
      `SELECT * FROM payroll_tax_slabs ${where}
       ORDER BY financial_year DESC, regime_type ASC, min_income ASC`,
      args,
    );
    res.json({ success: true, slabs: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/admin/tax/slabs", finance, async (req, res) => {
  let c = null;
  try {
    const rows = Array.isArray(req.body.slabs) ? req.body.slabs : [req.body];
    if (!rows.length)
      return res.status(400).json({ error: "slabs payload required" });

    c = await db();
    await c.beginTransaction();
    await ensureV1Tables(c);

    // If slabs are provided, they all usually belong to the same regime/FY in the current UI flow
    // but to be safe, we can deactivate based on what's in the payload or clear the targeted regime/FY.
    // Optimal: Clear the specific regime and financial year before re-inserting the fresh set.
    if (rows.length > 0) {
      const regime = String(rows[0].regime_type).toUpperCase();
      const fy = rows[0].financial_year;
      // We only clear if the payload is consistent or we can do it per-row.
      // Current frontend sends all rows for ONE regime at a time.
      await c.query(
        "UPDATE payroll_tax_slabs SET is_active = 0 WHERE regime_type = ? AND financial_year = ?",
        [regime, fy],
      );
    }

    for (const slab of rows) {
      if (
        !slab.regime_type ||
        slab.min_income == null ||
        slab.rate == null ||
        !slab.financial_year
      ) {
        await c.rollback();
        return res.status(400).json({
          error:
            "regime_type, min_income, rate and financial_year are required",
        });
      }

      await c.query(
        `INSERT INTO payroll_tax_slabs
         (regime_type, min_income, max_income, rate, cess_rate, surcharge_rate, financial_year, is_active, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          String(slab.regime_type).toUpperCase(),
          slab.min_income,
          slab.max_income ?? null,
          slab.rate,
          slab.cess_rate ?? 4,
          slab.surcharge_rate ?? 0,
          slab.financial_year,
          slab.is_active === false ? 0 : 1,
          req.user.id,
        ],
      );
    }

    await writeAudit(
      c,
      "TAX_SLABS_UPDATE",
      req.user.id,
      null,
      JSON.stringify({ count: rows.length }),
    );
    await c.commit();
    res.json({ success: true, inserted: rows.length });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.patch("/admin/tax/section-limits", finance, async (req, res) => {
  let c = null;
  try {
    const rows = Array.isArray(req.body.sections)
      ? req.body.sections
      : [req.body];
    if (!rows.length)
      return res.status(400).json({ error: "sections payload required" });

    c = await db();
    await c.beginTransaction();
    await ensureV1Tables(c);

    for (const section of rows) {
      if (
        !section.section_code ||
        section.max_limit == null ||
        !section.financial_year
      ) {
        await c.rollback();
        return res.status(400).json({
          error: "section_code, max_limit, financial_year are required",
        });
      }

      await c.query(
        `INSERT INTO payroll_tax_section_limits (section_code, max_limit, financial_year, is_active, updated_by)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE max_limit = VALUES(max_limit), is_active = VALUES(is_active), updated_by = VALUES(updated_by), updated_at = CURRENT_TIMESTAMP`,
        [
          String(section.section_code).toUpperCase(),
          Number(section.max_limit),
          section.financial_year,
          section.is_active === false ? 0 : 1,
          req.user.id,
        ],
      );
    }

    await writeAudit(
      c,
      "TAX_SECTION_LIMITS_UPDATE",
      req.user.id,
      null,
      JSON.stringify({ count: rows.length }),
    );
    await c.commit();
    res.json({ success: true, updated: rows.length });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/admin/tax/standard-deductions", auth, async (req, res) => {
  let c = null;
  try {
    const financialYear = req.query.financial_year;
    c = await db();
    await ensureV1Tables(c);
    const args = [];
    let where = "WHERE is_active = 1";
    if (financialYear) {
      where += " AND financial_year = ?";
      args.push(financialYear);
    }
    const [rows] = await c.query(
      `SELECT * FROM payroll_standard_deductions ${where}
       ORDER BY financial_year DESC, regime_type ASC`,
      args,
    );
    res.json({ success: true, deductions: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post(
  "/admin/tax/standard-deductions",
  auth,
  finance,
  async (req, res) => {
    let c = null;
    try {
      const rows = Array.isArray(req.body.deductions)
        ? req.body.deductions
        : [req.body];
      if (!rows.length)
        return res.status(400).json({ error: "deductions payload required" });

      c = await db();
      await c.beginTransaction();
      await ensureV1Tables(c);

      for (const d of rows) {
        if (!d.regime_type || d.amount == null || !d.financial_year) {
          await c.rollback();
          return res.status(400).json({
            error: "regime_type, amount and financial_year are required",
          });
        }

        await c.query(
          `INSERT INTO payroll_standard_deductions (regime_type, amount, financial_year, is_active, created_by)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE amount = VALUES(amount), is_active = VALUES(is_active), created_by = VALUES(created_by), updated_at = CURRENT_TIMESTAMP`,
          [
            String(d.regime_type).toUpperCase(),
            d.amount,
            d.financial_year,
            d.is_active === false ? 0 : 1,
            req.user.id,
          ],
        );
      }

      await writeAudit(
        c,
        "STANDARD_DEDUCTION_UPDATE",
        req.user.id,
        null,
        JSON.stringify({ count: rows.length }),
      );
      await c.commit();
      res.json({ success: true, updated: rows.length });
    } catch (error) {
      if (c) await c.rollback();
      res.status(500).json({ error: error.message });
    } finally {
      if (c) await c.end();
    }
  },
);

router.delete(
  "/admin/tax/standard-deductions/:id",
  finance,
  async (req, res) => {
    let c = null;
    try {
      c = await db();
      await c.query(
        `UPDATE payroll_standard_deductions SET is_active = 0 WHERE id = ?`,
        [req.params.id],
      );
      res.json({ success: true, message: "Standard deduction disabled" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      if (c) await c.end();
    }
  },
);

router.post("/admin/payroll/components", finance, async (req, res) => {
  let c = null;
  try {
    const {
      component_name,
      component_code,
      component_type,
      is_taxable,
      is_fixed,
      is_active,
    } = req.body;
    if (!component_name)
      return res.status(400).json({ error: "component_name is required" });

    c = await db();
    await c.beginTransaction();
    await ensureV1Tables(c);

    await c.query(
      `INSERT INTO payroll_component_registry
       (component_name, component_code, component_type, is_taxable, is_fixed, is_active, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         component_code = VALUES(component_code),
         component_type = VALUES(component_type),
         is_taxable = VALUES(is_taxable),
         is_fixed = VALUES(is_fixed),
         is_active = VALUES(is_active),
         updated_at = CURRENT_TIMESTAMP`,
      [
        component_name,
        component_code || null,
        component_type || "EARNING",
        is_taxable === false ? 0 : 1,
        is_fixed === false ? 0 : 1,
        is_active === false ? 0 : 1,
        req.user.id,
      ],
    );

    await writeAudit(
      c,
      "PAYROLL_COMPONENT_UPSERT",
      req.user.id,
      null,
      JSON.stringify({
        component_name,
        component_code: component_code || null,
      }),
    );

    await c.commit();
    res.json({ success: true, message: "Payroll component saved" });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/admin/ai/verification-queue", finance, async (req, res) => {
  let c = null;
  try {
    const limit = Number(req.query.limit || 100);
    c = await db();
    await ensureV1Tables(c);

    const [rows] = await c.query(
      `SELECT p.id, p.employee_id, e.EmployeeNumber, e.FullName, p.financial_year, p.section_code,
              p.original_filename, p.declared_amount, p.extracted_amount, p.verification_status, p.created_at
       FROM payroll_tax_proofs p
       LEFT JOIN employees e ON e.id = p.employee_id
       WHERE p.verification_status IN ('PENDING')
       ORDER BY p.created_at ASC
       LIMIT ?`,
      [limit],
    );

    res.json({ success: true, queue: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/admin/ai/verify-proof", finance, async (req, res) => {
  let c = null;
  try {
    const {
      proof_id,
      extracted_amount,
      verification_status,
      verification_notes,
    } = req.body;
    if (!proof_id)
      return res.status(400).json({ error: "proof_id is required" });

    c = await db();
    await c.beginTransaction();
    await ensureV1Tables(c);

    const status = verification_status || "AI_VERIFIED";
    await c.query(
      `UPDATE payroll_tax_proofs
       SET extracted_amount = ?, verification_status = ?, verification_notes = ?, verified_by = ?, verified_at = NOW()
       WHERE id = ?`,
      [
        extracted_amount ?? null,
        status,
        verification_notes || null,
        req.user.id,
        proof_id,
      ],
    );

    await writeAudit(
      c,
      "AI_PROOF_VERIFY",
      req.user.id,
      null,
      JSON.stringify({
        proof_id,
        extracted_amount: extracted_amount ?? null,
        status,
      }),
    );

    await c.commit();
    res.json({ success: true, proof_id, verification_status: status });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/admin/payroll/lop-summary", finance, async (req, res) => {
  let c = null;
  try {
    const monthInfo = normalizeMonth(req.query.payroll_month);
    if (!monthInfo)
      return res
        .status(400)
        .json({ error: "payroll_month query required in YYYY-MM" });

    const startDate = `${monthInfo.year}-${String(monthInfo.month).padStart(2, "0")}-01`;
    const lastDay = new Date(monthInfo.year, monthInfo.month, 0).getDate();
    const endDate = `${monthInfo.year}-${String(monthInfo.month).padStart(2, "0")}-${lastDay}`;

    c = await db();
    const [rows] = await c.query(
      `SELECT a.employee_id,
              e.EmployeeNumber,
              e.FullName,
              COUNT(*) AS total_marked_days,
              SUM(CASE WHEN a.status IN ('present', 'late') THEN 1 WHEN a.status = 'half-day' THEN 0.5 ELSE 0 END) AS present_days,
              SUM(CASE WHEN a.status IN ('on-leave', 'leave') THEN 1 ELSE 0 END) AS leave_days,
              SUM(CASE WHEN a.status IN ('absent') THEN 1 WHEN a.status = 'half-day' THEN 0.5 ELSE 0 END) AS lop_days
       FROM attendance a
       INNER JOIN employees e ON e.id = a.employee_id
       WHERE a.attendance_date BETWEEN ? AND ?
       GROUP BY a.employee_id, e.EmployeeNumber, e.FullName
       ORDER BY lop_days DESC, e.FullName ASC`,
      [startDate, endDate],
    );

    res.json({
      success: true,
      payroll_month: req.query.payroll_month,
      period: { start_date: startDate, end_date: endDate },
      employees: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/admin/payroll/process-run", finance, async (req, res) => {
  try {
    const monthInfo = normalizeMonth(req.body.payroll_month);
    if (!monthInfo)
      return res
        .status(400)
        .json({ error: "payroll_month is required in YYYY-MM" });

    const result = await payrollService.runPayroll(
      monthInfo.year,
      monthInfo.month,
      req.user.id,
    );
    const c = await db();
    try {
      await writeAudit(
        c,
        "RUN",
        req.user.id,
        result.runId,
        JSON.stringify({
          payroll_month: req.body.payroll_month,
          cycle_id: result.cycleId,
        }),
      );
    } finally {
      await c.end();
    }

    res.json({ success: true, payroll_month: req.body.payroll_month, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/admin/payroll/lock-period", finance, async (req, res) => {
  let c = null;
  try {
    const monthInfo = normalizeMonth(req.body.payroll_month);
    if (!monthInfo)
      return res
        .status(400)
        .json({ error: "payroll_month is required in YYYY-MM" });

    const startDate = `${monthInfo.year}-${String(monthInfo.month).padStart(2, "0")}-01`;
    const lastDay = new Date(monthInfo.year, monthInfo.month, 0).getDate();
    const endDate = `${monthInfo.year}-${String(monthInfo.month).padStart(2, "0")}-${lastDay}`;

    c = await db();
    await c.beginTransaction();

    const [existing] = await c.query(
      `SELECT id FROM payroll_cycles WHERE year = ? AND month = ? LIMIT 1`,
      [monthInfo.year, monthInfo.month],
    );

    let cycleId = null;
    if (!existing.length) {
      const [ins] = await c.query(
        `INSERT INTO payroll_cycles (year, month, start_date, end_date, status)
         VALUES (?, ?, ?, ?, 'LOCKED')`,
        [monthInfo.year, monthInfo.month, startDate, endDate],
      );
      cycleId = ins.insertId;
    } else {
      cycleId = existing[0].id;
      await c.query(
        `UPDATE payroll_cycles SET status = 'LOCKED' WHERE id = ?`,
        [cycleId],
      );
    }

    await writeAudit(
      c,
      "LOCK",
      req.user.id,
      null,
      JSON.stringify({
        payroll_month: req.body.payroll_month,
        cycle_id: cycleId,
      }),
    );

    await c.commit();
    res.json({
      success: true,
      payroll_month: req.body.payroll_month,
      cycle_id: cycleId,
      status: "LOCKED",
    });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/admin/payroll/adjustments", finance, async (req, res) => {
  let c = null;
  try {
    const { employee_id, payroll_month, adjustment_type, amount, reason } =
      req.body;
    if (!employee_id || !payroll_month || !adjustment_type || amount == null) {
      return res.status(400).json({
        error:
          "employee_id, payroll_month, adjustment_type and amount are required",
      });
    }

    c = await db();
    await c.beginTransaction();

    const [result] = await c.query(
      `INSERT INTO payroll_adjustments
       (employee_id, payroll_month, adjustment_type, amount, reason, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        employee_id,
        payroll_month,
        adjustment_type,
        Number(amount),
        reason || null,
        req.user.id,
      ],
    );

    await writeAudit(
      c,
      "ADJUSTMENT",
      req.user.id,
      null,
      JSON.stringify({
        adjustment_id: result.insertId,
        employee_id,
        payroll_month,
        adjustment_type,
        amount,
      }),
    );

    await c.commit();
    res.json({ success: true, adjustment_id: result.insertId });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/admin/payroll/reconciliation", finance, async (req, res) => {
  let c = null;
  try {
    const monthInfo = normalizeMonth(req.query.payroll_month);
    if (!monthInfo)
      return res
        .status(400)
        .json({ error: "payroll_month query required in YYYY-MM" });

    const prevYear =
      monthInfo.month === 1 ? monthInfo.year - 1 : monthInfo.year;
    const prevMonth = monthInfo.month === 1 ? 12 : monthInfo.month - 1;

    c = await db();

    const [currentSummary] = await c.query(
      `SELECT COUNT(*) as employees, COALESCE(SUM(s.gross_earnings),0) as gross, COALESCE(SUM(s.total_deductions),0) as deductions, COALESCE(SUM(s.net_pay),0) as net
       FROM payroll_employee_salaries s
       JOIN payroll_cycles cy ON cy.id = s.cycle_id
       WHERE cy.year = ? AND cy.month = ?`,
      [monthInfo.year, monthInfo.month],
    );

    const [previousSummary] = await c.query(
      `SELECT COUNT(*) as employees, COALESCE(SUM(s.gross_earnings),0) as gross, COALESCE(SUM(s.total_deductions),0) as deductions, COALESCE(SUM(s.net_pay),0) as net
       FROM payroll_employee_salaries s
       JOIN payroll_cycles cy ON cy.id = s.cycle_id
       WHERE cy.year = ? AND cy.month = ?`,
      [prevYear, prevMonth],
    );

    const [newHires] = await c.query(
      `SELECT COUNT(*) as count
       FROM employees
       WHERE DateJoined >= ? AND DateJoined <= ?`,
      [
        `${monthInfo.year}-${String(monthInfo.month).padStart(2, "0")}-01`,
        `${monthInfo.year}-${String(monthInfo.month).padStart(2, "0")}-${new Date(monthInfo.year, monthInfo.month, 0).getDate()}`,
      ],
    );

    const [lopImpact] = await c.query(
      `SELECT COALESCE(SUM(amount),0) as lop_deductions
       FROM payroll_salary_breakups b
       JOIN payroll_employee_salaries s ON s.id = b.employee_salary_id
       JOIN payroll_cycles cy ON cy.id = s.cycle_id
       WHERE cy.year = ? AND cy.month = ?
         AND UPPER(b.component_code) IN ('LOP','LOSS_OF_PAY')`,
      [monthInfo.year, monthInfo.month],
    );

    const cur = currentSummary[0] || {
      employees: 0,
      gross: 0,
      deductions: 0,
      net: 0,
    };
    const prev = previousSummary[0] || {
      employees: 0,
      gross: 0,
      deductions: 0,
      net: 0,
    };

    res.json({
      success: true,
      payroll_month: req.query.payroll_month,
      current_month: cur,
      previous_month: prev,
      deltas: {
        employees: Number(cur.employees) - Number(prev.employees),
        gross: Number(cur.gross) - Number(prev.gross),
        deductions: Number(cur.deductions) - Number(prev.deductions),
        net: Number(cur.net) - Number(prev.net),
      },
      drivers: {
        new_hires: Number(newHires[0]?.count || 0),
        lop_deductions: Number(lopImpact[0]?.lop_deductions || 0),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/employee/tax/computation", async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee)
      return res.status(404).json({ error: "Employee profile not found" });

    const financialYear = req.query.financial_year;
    if (!financialYear)
      return res
        .status(400)
        .json({ error: "financial_year query is required (YYYY-YYYY)" });

    const fyWindow = getFinancialYearWindow(financialYear);
    if (!fyWindow)
      return res
        .status(400)
        .json({ error: "financial_year format must be YYYY-YYYY" });

    c = await db();
    await ensureV1Tables(c);

    const [profileRows] = await c.query(
      `SELECT * FROM employee_tax_profiles WHERE employee_id = ? AND financial_year = ? LIMIT 1`,
      [employee.id, financialYear],
    );
    const profile = profileRows[0] || null;

    const [taxLines] = await c.query(
      `SELECT td.deduction_code, td.deduction_name, COALESCE(SUM(td.amount),0) as total_amount
       FROM payroll_tax_deductions td
       JOIN payroll_employee_salaries s ON s.id = td.employee_salary_id
       JOIN payroll_cycles cy ON cy.id = s.cycle_id
       WHERE s.employee_id = ? AND cy.start_date >= ? AND cy.end_date <= ?
       GROUP BY td.deduction_code, td.deduction_name
       ORDER BY td.deduction_code ASC`,
      [employee.id, fyWindow.start, fyWindow.end],
    );

    const [activeContractRows] = await c.query(
      `SELECT annual_ctc FROM employee_salary_contracts
       WHERE employee_id = ?
         AND status = 'Active'
         AND effective_from <= ?
         AND (effective_to IS NULL OR effective_to >= ?)
       ORDER BY effective_from DESC, contract_id DESC LIMIT 1`,
      [employee.id, fyWindow.end, fyWindow.start],
    );

    const [fallbackContractRows] = await c.query(
      `SELECT annual_ctc FROM employee_salary_contracts 
       WHERE employee_id = ? 
       ORDER BY effective_from DESC, contract_id DESC LIMIT 1`,
      [employee.id],
    );

    const contractCTC =
      activeContractRows.length > 0
        ? Number(activeContractRows[0].annual_ctc)
        : fallbackContractRows.length > 0
          ? Number(fallbackContractRows[0].annual_ctc)
          : 0;

    const [earningRows] = await c.query(
      `SELECT COALESCE(SUM(s.gross_earnings),0) as annual_gross,
              COALESCE(SUM(s.total_deductions),0) as annual_deductions,
              COALESCE(SUM(s.net_pay),0) as annual_net
       FROM payroll_employee_salaries s
       JOIN payroll_cycles cy ON cy.id = s.cycle_id
       WHERE s.employee_id = ? AND cy.start_date >= ? AND cy.end_date <= ?`,
      [employee.id, fyWindow.start, fyWindow.end],
    );

    let totalDeclared = 0;
    const declared =
      profile && profile.declared_investments
        ? profile.declared_investments
        : {};
    if (declared && typeof declared === "object") {
      Object.values(declared).forEach((v) => {
        const n = Number(v);
        if (!Number.isNaN(n)) totalDeclared += n;
      });
    }

    const regime = profile?.tax_regime || "OLD";
    const annualGross = Number(earningRows[0]?.annual_gross || 0);

    // Use contract CTC for display if available, but keep tax projection on the higher of actual income and contract CTC.
    const displayGrossCtc = contractCTC > 0 ? contractCTC : annualGross;
    const grossForTax = Math.max(annualGross, contractCTC);

    const taxCalc = await calculateTaxBySlabs(
      c,
      grossForTax,
      totalDeclared,
      regime,
      financialYear,
    );

    res.json({
      success: true,
      employee_id: employee.id,
      financial_year: financialYear,
      regime_type: regime, // Changed from tax_regime to match frontend interface
      gross_annual_income: displayGrossCtc, // Use contract CTC for gross CTC display
      annual_summary: {
        annual_gross: annualGross,
        contract_ctc: contractCTC,
        annual_deductions: Number(earningRows[0]?.annual_deductions || 0),
        annual_net: Number(earningRows[0]?.annual_net || 0),
        declared_investments_total: Number(totalDeclared.toFixed(2)),
        standard_deduction: taxCalc.standard_deduction,
      },
      computed_tax: taxCalc,
      total_deductions: taxCalc.total_deductions, // Use the total including standard deduction
      taxable_income: taxCalc.taxable_income,
      income_tax: taxCalc.base_tax,
      cess: taxCalc.cess,
      surcharge: taxCalc.surcharge,
      total_tax_liability: taxCalc.total_tax,
      monthly_tds: taxCalc.monthly_tds,
      statutory_deductions: taxLines,
      declaration: declared,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/employee/tax/declaration", async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee)
      return res.status(404).json({ error: "Employee profile not found" });

    const {
      financial_year,
      tax_regime,
      declared_investments,
      pan,
      is_tds_exempt,
    } = req.body;
    if (!financial_year) {
      return res
        .status(400)
        .json({ error: "financial_year is required (YYYY-YYYY)" });
    }

    c = await db();
    await c.beginTransaction();
    await ensureV1Tables(c);

    await c.query(
      `INSERT INTO employee_tax_profiles
       (employee_id, financial_year, tax_regime, pan, is_tds_exempt, declared_investments, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE
         tax_regime = VALUES(tax_regime),
         pan = VALUES(pan),
         is_tds_exempt = VALUES(is_tds_exempt),
         declared_investments = VALUES(declared_investments),
         updated_at = NOW()`,
      [
        employee.id,
        financial_year,
        (tax_regime || "OLD").toUpperCase(),
        pan || null,
        is_tds_exempt ? 1 : 0,
        declared_investments ? JSON.stringify(declared_investments) : null,
      ],
    );

    await writeAudit(
      c,
      "TAX_DECLARATION",
      req.user.id,
      null,
      JSON.stringify({ employee_id: employee.id, financial_year }),
    );

    await c.commit();
    res.json({ success: true, message: "Tax declaration saved" });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post(
  "/employee/tax/upload-proof",
  proofUpload.single("document"),
  async (req, res) => {
    let c = null;
    try {
      const employee = await findEmployeeByUserId(req.user.id);
      if (!employee)
        return res.status(404).json({ error: "Employee profile not found" });
      if (!req.file)
        return res.status(400).json({ error: "document file is required" });

      const { financial_year, section_code, declared_amount } = req.body;
      if (!financial_year)
        return res.status(400).json({ error: "financial_year is required" });

      c = await db();
      await c.beginTransaction();
      await ensureV1Tables(c);

      const [result] = await c.query(
        `INSERT INTO payroll_tax_proofs
       (employee_id, financial_year, section_code, original_filename, stored_filename, mime_type, file_path, declared_amount, verification_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
        [
          employee.id,
          financial_year,
          section_code || null,
          req.file.originalname,
          req.file.filename,
          req.file.mimetype || null,
          req.file.path,
          declared_amount != null ? Number(declared_amount) : 0,
        ],
      );

      await writeAudit(
        c,
        "PROOF_UPLOAD",
        req.user.id,
        null,
        JSON.stringify({
          proof_id: result.insertId,
          employee_id: employee.id,
          financial_year,
        }),
      );

      await c.commit();
      res.json({
        success: true,
        proof_id: result.insertId,
        verification_status: "PENDING",
      });
    } catch (error) {
      if (c) await c.rollback();
      res.status(500).json({ error: error.message });
    } finally {
      if (c) await c.end();
    }
  },
);

router.get("/employee/payroll/history", async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee)
      return res.status(404).json({ error: "Employee profile not found" });

    c = await db();
    const [rows] = await c.query(
      `SELECT s.id as employee_salary_id,
              cy.year,
              cy.month,
              s.gross_earnings,
              s.total_deductions,
              s.net_pay,
              p.id as payslip_id,
              p.generated_at
       FROM payroll_employee_salaries s
       JOIN payroll_cycles cy ON cy.id = s.cycle_id
       LEFT JOIN payroll_payslips p ON p.employee_salary_id = s.id
       WHERE s.employee_id = ?
       ORDER BY cy.year DESC, cy.month DESC`,
      [employee.id],
    );

    res.json({ success: true, history: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/employee/payslip/:id", async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee)
      return res.status(404).json({ error: "Employee profile not found" });

    c = await db();
    const [rows] = await c.query(
      `SELECT p.id, p.payslip_json, p.generated_at
       FROM payroll_payslips p
       JOIN payroll_employee_salaries s ON s.id = p.employee_salary_id
       WHERE p.id = ? AND s.employee_id = ?
       LIMIT 1`,
      [Number(req.params.id), employee.id],
    );

    if (!rows.length)
      return res.status(404).json({ error: "Payslip not found" });
    const payload = rows[0];

    res.json({
      success: true,
      payslip_id: payload.id,
      generated_at: payload.generated_at,
      format: "json",
      note: "PDF rendering is not yet enabled; this endpoint currently returns the payslip snapshot JSON.",
      payslip: JSON.parse(payload.payslip_json),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

module.exports = router;
