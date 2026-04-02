const express = require("express");
const path = require("path");
const multer = require("multer");

const { db } = require("../config/database");
const { auth, finance } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");
const payrollService = require("../services/payroll.service");

const router = express.Router();
const proofUpload = multer({ dest: path.join("uploads", "candidate_docs") });

function currentFinancialYear() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  return m >= 4 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}

function normalizeMonth(monthInput) {
  if (!monthInput) return null;
  const parts = String(monthInput).split("-");
  if (parts.length !== 2) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!year || !month || month < 1 || month > 12) return null;
  return { year, month };
}

function safeJson(jsonValue, fallback = {}) {
  if (!jsonValue) return fallback;
  if (typeof jsonValue === "object") return jsonValue;
  try {
    return JSON.parse(jsonValue);
  } catch (_) {
    return fallback;
  }
}

function buildBasicPdf(lines) {
  const safeLines = lines.map((l) => String(l).replace(/[()\\]/g, ""));
  const content = [
    "BT",
    "/F1 11 Tf",
    "72 770 Td",
    ...safeLines.map((line, idx) => (idx === 0 ? `(${line}) Tj` : `0 -16 Td (${line}) Tj`)),
    "ET",
  ].join("\n");

  const objects = [];
  const pushObj = (body) => {
    objects.push(body);
    return objects.length;
  };

  const fontObj = pushObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const contentObj = pushObj(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  const pageObj = pushObj(
    `<< /Type /Page /Parent 4 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontObj} 0 R >> >> /Contents ${contentObj} 0 R >>`,
  );
  const pagesObj = pushObj(`<< /Type /Pages /Count 1 /Kids [${pageObj} 0 R] >>`);
  const catalogObj = pushObj(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((off) => {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  });

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
  return Buffer.from(pdf, "binary");
}

async function ensureTaxationTables(conn) {
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
    CREATE TABLE IF NOT EXISTS payroll_config_windows (
      id INT AUTO_INCREMENT PRIMARY KEY,
      window_type VARCHAR(64) NOT NULL,
      financial_year VARCHAR(9) NOT NULL,
      start_at DATETIME NOT NULL,
      end_at DATETIME NOT NULL,
      status ENUM('OPEN','CLOSED') DEFAULT 'OPEN',
      notes TEXT,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY ux_config_window (window_type, financial_year)
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
      ai_confidence DECIMAL(5,2) DEFAULT NULL,
      verification_status ENUM('PENDING','AI_VERIFIED','FLAGGED','MANUAL_VERIFIED','REJECTED') DEFAULT 'PENDING',
      verification_notes TEXT,
      verified_by INT NULL,
      verified_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      KEY idx_tax_proofs_employee_fy (employee_id, financial_year, verification_status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  try {
    await conn.query("ALTER TABLE payroll_tax_proofs ADD COLUMN ai_confidence DECIMAL(5,2) DEFAULT NULL");
  } catch (_) {}
  try {
    await conn.query(
      "ALTER TABLE payroll_tax_proofs MODIFY COLUMN verification_status ENUM('PENDING','AI_VERIFIED','FLAGGED','MANUAL_VERIFIED','REJECTED') DEFAULT 'PENDING'",
    );
  } catch (_) {}
}

async function writeAudit(conn, action, performedBy, runId, details) {
  await conn.query(
    `INSERT INTO payroll_audit_trail (action, performed_by, payroll_run_id, details)
     VALUES (?, ?, ?, ?)`,
    [action, performedBy, runId || null, details || null],
  );
}

router.get("/admin/tax-regimes", auth, finance, async (req, res) => {
  let c = null;
  try {
    const financialYear = req.query.financial_year || currentFinancialYear();
    c = await db();
    await ensureTaxationTables(c);

    const [slabs] = await c.query(
      `SELECT id, regime_type, min_income, max_income, rate, cess_rate, surcharge_rate, financial_year, is_active
       FROM payroll_tax_slabs
       WHERE financial_year = ?
       ORDER BY regime_type ASC, min_income ASC`,
      [financialYear],
    );

    res.json({ success: true, financial_year: financialYear, slabs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.put("/admin/tax-sections", auth, finance, async (req, res) => {
  let c = null;
  try {
    const financialYear = req.body.financial_year || currentFinancialYear();
    const sections = Array.isArray(req.body.sections) ? req.body.sections : [];
    if (!sections.length) return res.status(400).json({ error: "sections array is required" });

    c = await db();
    await c.beginTransaction();
    await ensureTaxationTables(c);

    for (const s of sections) {
      if (!s.section_code || s.max_limit == null) {
        await c.rollback();
        return res.status(400).json({ error: "section_code and max_limit are required" });
      }

      await c.query(
        `INSERT INTO payroll_tax_section_limits (section_code, max_limit, financial_year, is_active, updated_by)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           max_limit = VALUES(max_limit),
           is_active = VALUES(is_active),
           updated_by = VALUES(updated_by),
           updated_at = CURRENT_TIMESTAMP`,
        [
          String(s.section_code).toUpperCase(),
          Number(s.max_limit),
          financialYear,
          s.is_active === false ? 0 : 1,
          req.user.id,
        ],
      );
    }

    await writeAudit(c, "TAX_SECTIONS_UPDATE", req.user.id, null, JSON.stringify({ financialYear, count: sections.length }));
    await c.commit();
    res.json({ success: true, financial_year: financialYear, updated: sections.length });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/admin/config/window", auth, finance, async (req, res) => {
  let c = null;
  try {
    const {
      window_type = "proof_submission",
      financial_year = currentFinancialYear(),
      start_at,
      end_at,
      status = "OPEN",
      notes,
    } = req.body;

    if (!start_at || !end_at) {
      return res.status(400).json({ error: "start_at and end_at are required" });
    }

    c = await db();
    await c.beginTransaction();
    await ensureTaxationTables(c);

    await c.query(
      `INSERT INTO payroll_config_windows
       (window_type, financial_year, start_at, end_at, status, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         start_at = VALUES(start_at),
         end_at = VALUES(end_at),
         status = VALUES(status),
         notes = VALUES(notes),
         updated_at = CURRENT_TIMESTAMP`,
      [window_type, financial_year, start_at, end_at, status, notes || null, req.user.id],
    );

    await writeAudit(c, "CONFIG_WINDOW", req.user.id, null, JSON.stringify({ window_type, financial_year, status }));
    await c.commit();
    res.json({ success: true, window_type, financial_year, status });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/admin/pt-slabs", auth, finance, async (req, res) => {
  let c = null;
  try {
    c = await db();
    await ensureTaxationTables(c);
    const [rows] = await c.query(
      `SELECT id, provider_type, state_code, percentage, ceiling_limit, fixed_amount, effective_from, effective_to, is_active
       FROM payroll_statutory_rules
       WHERE provider_type = 'PT'
       ORDER BY state_code ASC, effective_from DESC`,
    );
    res.json({ success: true, slabs: rows });
  } catch (error) {
    if (error.message && error.message.includes("payroll_statutory_rules")) {
      return res.json({ success: true, slabs: [] });
    }
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/tax/summary", auth, async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) return res.status(404).json({ error: "Employee profile not found" });

    const financialYear = req.query.financial_year || currentFinancialYear();
    c = await db();
    await ensureTaxationTables(c);

    const [profileRows] = await c.query(
      `SELECT financial_year, tax_regime, declared_investments, pan, is_tds_exempt
       FROM employee_tax_profiles
       WHERE employee_id = ? AND financial_year = ?
       LIMIT 1`,
      [employee.id, financialYear],
    );

    const [tdsRows] = await c.query(
      `SELECT COALESCE(SUM(td.amount), 0) as total_tds
       FROM payroll_tax_deductions td
       JOIN payroll_employee_salaries s ON s.id = td.employee_salary_id
       JOIN payroll_cycles cy ON cy.id = s.cycle_id
       WHERE s.employee_id = ?
         AND CONCAT(cy.year - IF(cy.month < 4, 1, 0), '-', cy.year + IF(cy.month >= 4, 1, 0)) = ?
         AND td.deduction_code IN ('TDS','INCOME_TAX')`,
      [employee.id, financialYear],
    );

    const [proofRows] = await c.query(
      `SELECT id, section_code, declared_amount, extracted_amount, ai_confidence, verification_status, created_at
       FROM payroll_tax_proofs
       WHERE employee_id = ? AND financial_year = ?
       ORDER BY created_at DESC`,
      [employee.id, financialYear],
    );

    const profile = profileRows[0] || null;
    res.json({
      success: true,
      employee_id: employee.id,
      financial_year: financialYear,
      tax_regime: profile?.tax_regime || "OLD",
      pan: profile?.pan || null,
      is_tds_exempt: Boolean(profile?.is_tds_exempt),
      declared_investments: safeJson(profile?.declared_investments, {}),
      tds_paid_ytd: Number(tdsRows[0]?.total_tds || 0),
      proofs: proofRows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/tax/regime-selection", auth, async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) return res.status(404).json({ error: "Employee profile not found" });

    const financialYear = req.body.financial_year || currentFinancialYear();
    const taxRegime = String(req.body.tax_regime || "").toUpperCase();
    if (!["OLD", "NEW"].includes(taxRegime)) {
      return res.status(400).json({ error: "tax_regime must be OLD or NEW" });
    }

    c = await db();
    await c.beginTransaction();

    await c.query(
      `INSERT INTO employee_tax_profiles (employee_id, financial_year, tax_regime, updated_at)
       VALUES (?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE tax_regime = VALUES(tax_regime), updated_at = NOW()`,
      [employee.id, financialYear, taxRegime],
    );

    await writeAudit(c, "TAX_REGIME_SELECTION", req.user.id, null, JSON.stringify({ employee_id: employee.id, financialYear, taxRegime }));
    await c.commit();

    res.json({ success: true, employee_id: employee.id, financial_year: financialYear, tax_regime: taxRegime });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/tax/declarations", auth, async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) return res.status(404).json({ error: "Employee profile not found" });

    const financialYear = req.query.financial_year || currentFinancialYear();
    c = await db();

    const [rows] = await c.query(
      `SELECT financial_year, tax_regime, declared_investments, updated_at
       FROM employee_tax_profiles
       WHERE employee_id = ? AND financial_year = ?
       LIMIT 1`,
      [employee.id, financialYear],
    );

    const row = rows[0] || null;
    res.json({
      success: true,
      employee_id: employee.id,
      financial_year: financialYear,
      tax_regime: row?.tax_regime || "OLD",
      declarations: safeJson(row?.declared_investments, {}),
      updated_at: row?.updated_at || null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/tax/declarations", auth, async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) return res.status(404).json({ error: "Employee profile not found" });

    const financialYear = req.body.financial_year || currentFinancialYear();
    const declarations = req.body.declarations || {};
    const taxRegime = String(req.body.tax_regime || "OLD").toUpperCase();

    c = await db();
    await c.beginTransaction();

    await c.query(
      `INSERT INTO employee_tax_profiles
       (employee_id, financial_year, tax_regime, declared_investments, updated_at)
       VALUES (?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE
         tax_regime = VALUES(tax_regime),
         declared_investments = VALUES(declared_investments),
         updated_at = NOW()`,
      [employee.id, financialYear, taxRegime, JSON.stringify(declarations)],
    );

    await writeAudit(c, "TAX_DECLARATION", req.user.id, null, JSON.stringify({ employee_id: employee.id, financialYear }));
    await c.commit();
    res.json({ success: true, employee_id: employee.id, financial_year: financialYear });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/tax/upload-proof", auth, proofUpload.single("document"), async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) return res.status(404).json({ error: "Employee profile not found" });
    if (!req.file) return res.status(400).json({ error: "document file is required" });

    const financialYear = req.body.financial_year || currentFinancialYear();
    const sectionCode = req.body.section_code || null;
    const declaredAmount = req.body.declared_amount != null ? Number(req.body.declared_amount) : 0;

    c = await db();
    await c.beginTransaction();
    await ensureTaxationTables(c);

    const [ins] = await c.query(
      `INSERT INTO payroll_tax_proofs
       (employee_id, financial_year, section_code, original_filename, stored_filename, mime_type, file_path, declared_amount, verification_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        employee.id,
        financialYear,
        sectionCode,
        req.file.originalname,
        req.file.filename,
        req.file.mimetype || null,
        req.file.path,
        declaredAmount,
      ],
    );

    await writeAudit(c, "PROOF_UPLOAD", req.user.id, null, JSON.stringify({ proof_id: ins.insertId, financialYear }));
    await c.commit();
    res.json({ success: true, proof_id: ins.insertId, status: "PENDING" });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/ai/pending-proofs", auth, finance, async (req, res) => {
  let c = null;
  try {
    const limit = Number(req.query.limit || 100);
    c = await db();
    await ensureTaxationTables(c);

    const [rows] = await c.query(
      `SELECT id, employee_id, financial_year, section_code, original_filename, declared_amount, created_at
       FROM payroll_tax_proofs
       WHERE verification_status = 'PENDING'
       ORDER BY created_at ASC
       LIMIT ?`,
      [limit],
    );

    res.json({ success: true, pending: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/ai/verification-result", auth, finance, async (req, res) => {
  let c = null;
  try {
    const { proof_id, extracted_amount, confidence_score, notes } = req.body;
    if (!proof_id) return res.status(400).json({ error: "proof_id is required" });

    const confidence = Number(confidence_score || 0);
    const status = confidence >= 85 ? "AI_VERIFIED" : confidence > 0 ? "FLAGGED" : "REJECTED";

    c = await db();
    await c.beginTransaction();
    await ensureTaxationTables(c);

    await c.query(
      `UPDATE payroll_tax_proofs
       SET extracted_amount = ?, ai_confidence = ?, verification_status = ?, verification_notes = ?, verified_by = ?, verified_at = NOW()
       WHERE id = ?`,
      [
        extracted_amount != null ? Number(extracted_amount) : null,
        confidence_score != null ? confidence : null,
        status,
        notes || null,
        req.user.id,
        Number(proof_id),
      ],
    );

    await writeAudit(c, "AI_VERIFICATION_RESULT", req.user.id, null, JSON.stringify({ proof_id, status, confidence }));
    await c.commit();

    res.json({ success: true, proof_id: Number(proof_id), status, confidence_score: confidence });
  } catch (error) {
    if (c) await c.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.get("/admin/verification-queue", auth, finance, async (req, res) => {
  let c = null;
  try {
    const statuses = ["FLAGGED", "REJECTED"];
    c = await db();
    await ensureTaxationTables(c);

    const [rows] = await c.query(
      `SELECT p.id, p.employee_id, e.EmployeeNumber, e.FullName, p.financial_year, p.section_code,
              p.original_filename, p.declared_amount, p.extracted_amount, p.ai_confidence,
              p.verification_status, p.verification_notes, p.verified_at
       FROM payroll_tax_proofs p
       LEFT JOIN employees e ON e.id = p.employee_id
       WHERE p.verification_status IN (?, ?)
       ORDER BY p.verified_at DESC, p.created_at DESC`,
      statuses,
    );

    res.json({ success: true, queue: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/payroll/run/calculate", auth, finance, async (req, res) => {
  try {
    const monthInfo = normalizeMonth(req.body.payroll_month);
    if (!monthInfo) {
      return res.status(400).json({ error: "payroll_month is required in YYYY-MM format" });
    }

    const result = await payrollService.runPayroll(monthInfo.year, monthInfo.month, req.user.id);

    const c = await db();
    try {
      await writeAudit(c, "RUN", req.user.id, result.runId, JSON.stringify({ payroll_month: req.body.payroll_month }));
    } finally {
      await c.end();
    }

    res.json({ success: true, payroll_month: req.body.payroll_month, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/payroll/payslip/download", auth, async (req, res) => {
  let c = null;
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) return res.status(404).json({ error: "Employee profile not found" });

    const payslipId = Number(req.query.payslip_id);
    if (!payslipId) return res.status(400).json({ error: "payslip_id query parameter is required" });

    c = await db();
    const [rows] = await c.query(
      `SELECT p.id, p.generated_at, p.payslip_json
       FROM payroll_payslips p
       JOIN payroll_employee_salaries s ON s.id = p.employee_salary_id
       WHERE p.id = ? AND s.employee_id = ?
       LIMIT 1`,
      [payslipId, employee.id],
    );

    if (!rows.length) return res.status(404).json({ error: "Payslip not found" });

    const payslip = safeJson(rows[0].payslip_json, {});
    const totals = payslip.totals || {};
    const lines = [
      `HRMS Payslip #${rows[0].id}`,
      `Employee: ${employee.FullName || employee.FirstName || employee.id}`,
      `Generated: ${rows[0].generated_at}`,
      `Gross: ${totals.gross || 0}`,
      `Deductions: ${totals.deductions || 0}`,
      `Net Pay: ${totals.net || 0}`,
    ];
    const pdf = buildBasicPdf(lines);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=payslip-${rows[0].id}.pdf`);
    res.send(pdf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (c) await c.end();
  }
});

router.post("/payroll/adjustments", auth, finance, async (req, res) => {
  let c = null;
  try {
    const { employee_id, payroll_month, adjustment_type, amount, reason } = req.body;
    if (!employee_id || !payroll_month || !adjustment_type || amount == null) {
      return res.status(400).json({
        error: "employee_id, payroll_month, adjustment_type and amount are required",
      });
    }

    c = await db();
    await c.beginTransaction();

    const [result] = await c.query(
      `INSERT INTO payroll_adjustments
       (employee_id, payroll_month, adjustment_type, amount, reason, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [employee_id, payroll_month, adjustment_type, Number(amount), reason || null, req.user.id],
    );

    await writeAudit(
      c,
      "ADJUSTMENT",
      req.user.id,
      null,
      JSON.stringify({ adjustment_id: result.insertId, employee_id, payroll_month, adjustment_type, amount }),
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

module.exports = router;