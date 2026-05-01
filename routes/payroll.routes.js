/**
 * PAYROLL ROUTES
 * Handles payroll generation, salary slips, runs, and recalculation
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr, finance } = require("../middleware/auth");
const payrollCtrl = require('../controllers/payroll.controller');
const payrollService = require('../services/payroll.service');
const payrollAdmin = require('../controllers/payroll.admin.controller');
const { resolvePayrollEmployeeContext } = require('../middleware/payroll-security');

/* ============ PAYROLL SETTINGS ============ */

// Create payroll defaults
router.post("/defaults", auth, finance, async (req, res) => {
    let c = null;
    try {
        const { pf_percent, esi_percent, professional_tax, variable_pay_percent } = req.body;
        c = await db();
        const [result] = await c.query("INSERT INTO payroll_defaults SET ?", {
            pf_percent, esi_percent, professional_tax, variable_pay_percent
        });
        res.json({ id: result.insertId, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Get payroll defaults
router.get("/defaults", auth, finance, async (req, res) => {
    let c = null;
    try {
        c = await db();
        const [r] = await c.query("SELECT * FROM payroll_defaults LIMIT 1");
        res.json(r[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

/* ============ NEW MODERN API ENDPOINTS (Phase-1) ============ */

// Modern v2 API endpoints to avoid clashing with legacy routes
router.post('/v2/run', auth, finance, payrollCtrl.runPayroll);
router.get('/v2/runs/:runId/export', auth, finance, payrollCtrl.exportPayrollRun);

// GET /api/payroll/v2/payslips/:employeeId
router.get('/v2/payslips/:employeeId', auth, resolvePayrollEmployeeContext, payrollCtrl.listPayslips);

// GET /api/payroll/v2/payslips/:employeeId/:year/:month
router.get('/v2/payslips/:employeeId/:year/:month', auth, resolvePayrollEmployeeContext, payrollCtrl.payslipDetail);

// GET /api/payroll/v2/structure/:employeeId
router.get('/v2/structure/:employeeId', auth, resolvePayrollEmployeeContext, payrollCtrl.getSalaryStructure);

// GET /api/payroll/v2/attendance-impact/:employeeId?year=2026&month=2
router.get('/v2/attendance-impact/:employeeId', auth, resolvePayrollEmployeeContext, payrollCtrl.getAttendanceImpact);

// GET /api/payroll/v2/run?month=YYYY-MM  -> summary for a month (admin/hr)
router.get('/v2/run', auth, finance, async (req, res) => {
    const { month } = req.query; // expect YYYY-MM
    if (!month) return res.status(400).json({ error: 'month query required (YYYY-MM)' });
    const parts = month.split('-');
    if (parts.length !== 2) return res.status(400).json({ error: 'month format must be YYYY-MM' });
    const year = Number(parts[0]);
    const mon = Number(parts[1]);
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query(
            `SELECT r.id as run_id, r.status, r.started_at, r.completed_at, COUNT(s.id) as employee_count, SUM(s.gross_earnings) as total_gross, SUM(s.net_pay) as total_net
             FROM payroll_runs r
             JOIN payroll_cycles cy ON cy.id = r.cycle_id
             LEFT JOIN payroll_employee_salaries s ON s.run_id = r.id
             WHERE cy.year = ? AND cy.month = ?
             GROUP BY r.id`,
            [year, mon]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// GET /api/payroll/v2/run/:employeeId?month=YYYY-MM -> employee-level payroll breakup
router.get('/v2/run/:employeeId', auth, finance, async (req, res) => {
    const { month } = req.query;
    const employeeId = Number(req.params.employeeId);
    if (!month) return res.status(400).json({ error: 'month query required (YYYY-MM)' });
    const parts = month.split('-');
    const year = Number(parts[0]);
    const mon = Number(parts[1]);
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query(
            `SELECT s.* FROM payroll_employee_salaries s JOIN payroll_runs r ON r.id = s.run_id JOIN payroll_cycles cy ON cy.id = r.cycle_id WHERE s.employee_id = ? AND cy.year = ? AND cy.month = ? LIMIT 1`,
            [employeeId, year, mon]
        );
        res.json(rows[0] || null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// GET /api/payroll/v2/earnings/:employeeId?month=YYYY-MM
router.get('/v2/earnings/:employeeId', auth, resolvePayrollEmployeeContext, async (req, res) => {
    const { month } = req.query;
    const employeeId = Number(req.params.employeeId);
    if (!month) return res.status(400).json({ error: 'month query required (YYYY-MM)' });
    const parts = month.split('-');
    const year = Number(parts[0]);
    const mon = Number(parts[1]);
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query(
            `SELECT b.component_code, b.component_name, b.amount FROM payroll_salary_breakups b
             JOIN payroll_employee_salaries s ON s.id = b.employee_salary_id
             JOIN payroll_runs r ON r.id = s.run_id
             JOIN payroll_cycles cy ON cy.id = r.cycle_id
             WHERE s.employee_id = ? AND cy.year = ? AND cy.month = ? AND b.component_type = 'EARNING'`,
            [employeeId, year, mon]
        );
        
        if (rows.length > 0) {
            return res.json(rows);
        }

        // Fallback: Compute live monthly breakdown from current structure
        const live = await payrollService.getSalaryStructureForEmployee(employeeId, { 
            monthly: true, 
            date: `${year}-${String(mon).padStart(2, '0')}-01` 
        });

        if (!live) return res.json([]);

        const earnings = live.components
            .filter(c => c.component_type === 'EARNING')
            .map(c => ({
                component_code: c.code,
                component_name: c.name,
                amount: c.value
            }));

        res.json(earnings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// GET /api/payroll/v2/deductions/:employeeId?month=YYYY-MM
router.get('/v2/deductions/:employeeId', auth, resolvePayrollEmployeeContext, async (req, res) => {
    const { month } = req.query;
    const employeeId = Number(req.params.employeeId);
    if (!month) return res.status(400).json({ error: 'month query required (YYYY-MM)' });
    const parts = month.split('-');
    const year = Number(parts[0]);
    const mon = Number(parts[1]);
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query(
            `SELECT b.component_code, b.component_name, b.amount FROM payroll_salary_breakups b
             JOIN payroll_employee_salaries s ON s.id = b.employee_salary_id
             JOIN payroll_runs r ON r.id = s.run_id
             JOIN payroll_cycles cy ON cy.id = r.cycle_id
             WHERE s.employee_id = ? AND cy.year = ? AND cy.month = ? AND b.component_type = 'DEDUCTION'`,
            [employeeId, year, mon]
        );

        if (rows.length > 0) {
            return res.json(rows);
        }

        // Fallback: Compute live monthly breakdown from current structure
        const live = await payrollService.getSalaryStructureForEmployee(employeeId, { 
            monthly: true, 
            date: `${year}-${String(mon).padStart(2, '0')}-01` 
        });

        if (!live) return res.json([]);

        const deductions = live.components
            .filter(c => c.component_type === 'DEDUCTION')
            .map(c => ({
                component_code: c.code,
                component_name: c.name,
                amount: c.value
            }));

        res.json(deductions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// GET /api/payroll/v2/tax-summary/:employeeId?year=YYYY
router.get('/v2/tax-summary/:employeeId', auth, resolvePayrollEmployeeContext, async (req, res) => {
    const year = Number(req.query.year);
    const employeeId = Number(req.params.employeeId);
    if (!year) return res.status(400).json({ error: 'year query required' });
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query(
            `SELECT cy.year, td.deduction_code, SUM(td.amount) as total FROM payroll_tax_deductions td
             JOIN payroll_employee_salaries s ON s.id = td.employee_salary_id
             JOIN payroll_runs r ON r.id = s.run_id
             JOIN payroll_cycles cy ON cy.id = r.cycle_id
             WHERE s.employee_id = ? AND cy.year = ? GROUP BY td.deduction_code`,
            [employeeId, year]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// GET /api/payroll/v2/tax-summary/:employeeId/detailed?financial_year=YYYY-YYYY
router.get('/v2/tax-summary/:employeeId/detailed', auth, resolvePayrollEmployeeContext, async (req, res) => {
    const employeeId = Number(req.params.employeeId);
    const financialYear = String(req.query.financial_year || '').trim();
    if (!employeeId) return res.status(400).json({ error: 'employeeId required' });
    if (!/^\d{4}-\d{4}$/.test(financialYear)) {
        return res.status(400).json({ error: 'financial_year query required in YYYY-YYYY format' });
    }

    const [fyStartYear, fyEndYear] = financialYear.split('-').map(Number);
    if (!fyStartYear || !fyEndYear || fyEndYear !== fyStartYear + 1) {
        return res.status(400).json({ error: 'invalid financial_year range' });
    }

    const fyStart = `${fyStartYear}-04-01`;
    const fyEnd = `${fyEndYear}-03-31`;

    const parseJson = (value, fallback = null) => {
        if (value == null) return fallback;
        if (typeof value === 'object') return value;
        try {
            return JSON.parse(value);
        } catch (_) {
            return fallback;
        }
    };

    let c = null;
    try {
        c = await db();

        const [profileRows] = await c.query(
            `SELECT employee_id, financial_year, tax_regime, pan, is_tds_exempt, declared_investments, updated_at
             FROM employee_tax_profiles
             WHERE employee_id = ? AND financial_year = ?
             LIMIT 1`,
            [employeeId, financialYear]
        );

        const [taxRows] = await c.query(
            `SELECT td.deduction_code, td.deduction_name, COALESCE(SUM(td.amount), 0) as total_amount
             FROM payroll_tax_deductions td
             JOIN payroll_employee_salaries s ON s.id = td.employee_salary_id
             JOIN payroll_cycles cy ON cy.id = s.cycle_id
             WHERE s.employee_id = ? AND cy.start_date >= ? AND cy.end_date <= ?
             GROUP BY td.deduction_code, td.deduction_name
             ORDER BY td.deduction_code ASC`,
            [employeeId, fyStart, fyEnd]
        );

        const [annualRows] = await c.query(
            `SELECT COALESCE(SUM(s.gross_earnings),0) as annual_gross,
                    COALESCE(SUM(s.total_deductions),0) as annual_deductions,
                    COALESCE(SUM(s.net_pay),0) as annual_net
             FROM payroll_employee_salaries s
             JOIN payroll_cycles cy ON cy.id = s.cycle_id
             WHERE s.employee_id = ? AND cy.start_date >= ? AND cy.end_date <= ?`,
            [employeeId, fyStart, fyEnd]
        );

        const profile = profileRows[0] || null;
        const totalStatutory = taxRows.reduce((sum, row) => sum + Number(row.total_amount || 0), 0);
        const tdsOnly = taxRows
            .filter((r) => ['TDS', 'INCOME_TAX'].includes(String(r.deduction_code || '').toUpperCase()))
            .reduce((sum, row) => sum + Number(row.total_amount || 0), 0);

        return res.json({
            success: true,
            data: {
                employee_id: employeeId,
                financial_year: financialYear,
                profile: profile
                    ? {
                        tax_regime: profile.tax_regime,
                        pan: profile.pan,
                        is_tds_exempt: Boolean(profile.is_tds_exempt),
                        declared_investments: parseJson(profile.declared_investments, {}),
                        updated_at: profile.updated_at
                    }
                    : null,
                annual_summary: {
                    annual_gross: Number(annualRows[0]?.annual_gross || 0),
                    annual_deductions: Number(annualRows[0]?.annual_deductions || 0),
                    annual_net: Number(annualRows[0]?.annual_net || 0)
                },
                statutory_deductions: taxRows.map((r) => ({
                    deduction_code: r.deduction_code,
                    deduction_name: r.deduction_name,
                    total_amount: Number(r.total_amount || 0)
                })),
                totals: {
                    total_statutory_deductions: Number(totalStatutory.toFixed(2)),
                    tds_paid_ytd: Number(tdsOnly.toFixed(2))
                }
            },
            error: null
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    } finally {
        if (c) await c.end();
    }
});

// GET /api/payroll/v2/form16/:employeeId?year=YYYY  (placeholder metadata)
router.get('/v2/form16/:employeeId', auth, resolvePayrollEmployeeContext, async (req, res) => {
    const year = Number(req.query.year);
    const employeeId = Number(req.params.employeeId);
    if (!year) return res.status(400).json({ error: 'year query required' });
    // For now return basic metadata; actual PDF generation not implemented
    res.json({ employee_id: employeeId, year, form16_available: false, note: 'PDF generation not implemented' });
});

// GET /api/payroll/v2/form16/:employeeId/:year/download (placeholder)
router.get('/v2/form16/:employeeId/:year/download', auth, resolvePayrollEmployeeContext, async (req, res) => {
    res.status(501).json({ error: 'Form16 PDF download not implemented' });
});

// GET /api/payroll/v2/payslips/:employeeId/:month (month=YYYY-MM)
router.get('/v2/payslips/:employeeId/:month', auth, resolvePayrollEmployeeContext, async (req, res) => {
    const employeeId = Number(req.params.employeeId);
    const month = req.params.month; // YYYY-MM
    if (!month) return res.status(400).json({ error: 'month required (YYYY-MM)' });
    const parts = month.split('-');
    const year = Number(parts[0]);
    const mon = Number(parts[1]);
    try {
        const detail = await payrollService.getPayslipDetail(employeeId, year, mon);
        if (!detail) return res.status(404).json({ error: 'Payslip not found' });
        res.json({ success: true, payslip: JSON.parse(detail) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------- Admin/HR stubs (scaffolded) --------
// POST /api/payroll/v2/runs/preview
router.post('/v2/runs/preview', auth, finance, payrollAdmin.previewRun);

// GET /api/payroll/v2/runs/validate?month=YYYY-MM
router.get('/v2/runs/validate', auth, finance, payrollAdmin.validateRun);

// GET /api/payroll/v2/dashboard?month=YYYY-MM
router.get('/v2/dashboard', auth, finance, payrollAdmin.getPayrollDashboard);

// GET /api/payroll/v2/employees/:employeeId/run-status?month=YYYY-MM
router.get('/v2/employees/:employeeId/run-status', auth, resolvePayrollEmployeeContext, payrollAdmin.getEmployeeRunStatus);

// GET /api/payroll/v2/reports?month=YYYY-MM
router.get('/v2/reports', auth, finance, payrollAdmin.getPayrollReports);

// POST /api/payroll/v2/runs/:runId/notify
router.post('/v2/runs/:runId/notify', auth, finance, (req, res, next) => {
    req.body.runId = Number(req.params.runId);
    return payrollAdmin.sendPayrollNotifications(req, res, next);
});

// POST /api/payroll/v2/runs/:runId/lock
router.post('/v2/runs/:runId/lock', auth, finance, payrollAdmin.lockRun);

// POST /api/payroll/v2/runs/:runId/review
router.post('/v2/runs/:runId/review', auth, finance, payrollAdmin.reviewRun);

// POST /api/payroll/v2/runs/:runId/paid
router.post('/v2/runs/:runId/paid', auth, finance, payrollAdmin.markRunPaid);

// PUT /api/payroll/v2/cycles/:cycleId/lock
router.put('/v2/cycles/:cycleId/lock', auth, finance, payrollAdmin.lockCycle);

// Tax profile (employee-level)
router.get('/v2/employees/:employeeId/tax-profile', auth, finance, payrollAdmin.getTaxProfile);
router.put('/v2/employees/:employeeId/tax-profile', auth, finance, payrollAdmin.putTaxProfile);

// Bank account (employee-level)
router.get('/v2/employees/:employeeId/bank-account', auth, finance, payrollAdmin.getBankAccount);
router.put('/v2/employees/:employeeId/bank-account', auth, finance, payrollAdmin.putBankAccount);

// Payouts
router.post('/v2/payouts/initiate', auth, finance, payrollAdmin.initiatePayout);
router.get('/v2/payouts/:runId', auth, finance, payrollAdmin.getPayout);
router.put('/v2/payouts/:payoutId/status', auth, finance, payrollAdmin.updatePayoutStatus);


// Update payroll defaults
router.put("/defaults/:id", auth, finance, async (req, res) => {
    let c = null;
    try {
        c = await db();
        await c.query("UPDATE payroll_defaults SET ? WHERE id = ?", [req.body, req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

/* ============ SALARY STRUCTURE ============ */

function markLegacySalaryStructureRoute(res) {
    res.set('Deprecation', 'true');
    res.set('Sunset', '2026-12-31');
    res.set('Link', '</api/payroll/master/templates>; rel="successor-version"');
    res.set('Warning', '299 - "Legacy salary/structure route is deprecated. Use template contracts and v2 structure APIs."');
}

// Create/Update salary structure
router.post("/salary/structure/:empId", auth, finance, async (req, res) => {
    markLegacySalaryStructureRoute(res);
    const { empId } = req.params;
    const components = [
        { name: "basic", value: req.body.basic },
        { name: "hra", value: req.body.hra },
        { name: "conveyance", value: req.body.conveyance },
        { name: "special_allowance", value: req.body.special_allowance },
        { name: "pf", value: req.body.pf },
        { name: "esi", value: req.body.esi },
        { name: "professional_tax", value: req.body.professional_tax },
        { name: "other_deductions", value: req.body.other_deductions }
    ];

    let c = null;
    try {
        c = await db();
        // Remove existing structure for this employee
        await c.query("DELETE FROM salary_structures WHERE employee_id = ?", [empId]);

        // Insert each component as a row
        for (const comp of components) {
            if (comp.value !== undefined && comp.value !== null) {
                await c.query(
                    "INSERT INTO salary_structures (employee_id, component_name, component_value) VALUES (?, ?, ?)",
                    [empId, comp.name, parseFloat(comp.value) || 0]
                );
            }
        }
        res.json({
            success: true,
            deprecated: true,
            message: 'Legacy path updated. Migrate to template contracts for source-of-truth payroll.'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Get salary structure
router.get("/salary/structure/:empId", auth, async (req, res) => {
    markLegacySalaryStructureRoute(res);
    const empId = parseInt(req.params.empId);
    const userRole = (req.user.role || '').toLowerCase();
    
    // Check authorization: only self, HR, or Admin
    if (userRole !== 'admin' && userRole !== 'hr') {
        const viewerEmployee = await findEmployeeByUserId(req.user.id);
        if (!viewerEmployee || viewerEmployee.id !== empId) {
            return res.status(403).json({ error: "Unauthorized to view this employee's salary structure" });
        }
    }
    
    let c = null;
    try {
        c = await db();
        const [rows] = await c.query("SELECT * FROM salary_structures WHERE employee_id = ?", [empId]);
        res.json({
            success: true,
            deprecated: true,
            salaryStructure: rows,
            message: 'Legacy path. Prefer /api/payroll/v2/structure/:employeeId for template-driven structure view.'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

/* ============ PAYROLL GENERATION ============ */

// Generate payroll for a month
router.post("/generate", auth, finance, async (req, res) => {
    const { month, year } = req.body;
    let c = null;
    
    try {
        c = await db();
        // Create payroll run
        const [runResult] = await c.query(
            "INSERT INTO payroll_runs (month, year, status, created_by) VALUES (?, ?, 'processing', ?)",
            [month, year, req.user.id]
        );
        const runId = runResult.insertId;
        
        // Get all active employees
        const [employees] = await c.query("SELECT id FROM employees WHERE status = 'active'");
        
        let processedCount = 0;
        
        for (const emp of employees) {
            // Get salary structure as rows
            const [structureRows] = await c.query("SELECT component_name, component_value FROM salary_structures WHERE employee_id = ?", [emp.id]);
            if (structureRows.length === 0) continue;
            // Map to object: { basic: value, hra: value, ... }
            const s = {};
            for (const row of structureRows) {
                s[row.component_name] = parseFloat(row.component_value) || 0;
            }
            // Calculate attendance
            const [attendance] = await c.query(
                "SELECT COUNT(*) as present_days FROM attendance WHERE employee_id = ? AND MONTH(attendance_date) = ? AND YEAR(attendance_date) = ? AND status = 'present'",
                [emp.id, month, year]
            );
            const presentDays = attendance[0]?.present_days || 0;
            const workingDays = 30; // You can make this dynamic
            // Pro-rata calculation
            const basicEarned = (s.basic / workingDays) * presentDays;
            const hraEarned = (s.hra / workingDays) * presentDays;
            const conveyanceEarned = (s.conveyance / workingDays) * presentDays;
            const specialAllowanceEarned = (s.special_allowance / workingDays) * presentDays;
            const grossEarned = basicEarned + hraEarned + conveyanceEarned + specialAllowanceEarned;
            const netEarned = grossEarned - (s.pf + s.esi + s.professional_tax + s.other_deductions);
            // Create payslip
            await c.query(
                `INSERT INTO payroll_slips (run_id, employee_id, month, year, 
                 basic, hra, conveyance, special_allowance, gross_salary, 
                 pf, esi, professional_tax, other_deductions, total_deductions, 
                 net_salary, days_worked, days_in_month, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'generated')`,
                [runId, emp.id, month, year, 
                 basicEarned, hraEarned, conveyanceEarned, specialAllowanceEarned, grossEarned,
                 s.pf, s.esi, s.professional_tax, s.other_deductions, 
                 (s.pf + s.esi + s.professional_tax + s.other_deductions),
                 netEarned, presentDays, workingDays]
            );
            
            processedCount++;
        }
        
        // Update run status
        await c.query(
            "UPDATE payroll_runs SET status = 'completed', completed_at = NOW() WHERE id = ?",
            [runId]
        );
        
        res.json({ success: true, run_id: runId, processed: processedCount });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// List payroll runs
router.get("/runs", auth, finance, async (req, res) => {
    let c = null;
    try {
        c = await db();
        const [runs] = await c.query(
            `SELECT pr.*, COUNT(ps.id) as slip_count, SUM(ps.net_pay) as total_payout
             FROM payroll_runs pr
             LEFT JOIN payroll_slips ps ON pr.id = ps.payroll_run_id
             GROUP BY pr.id
             ORDER BY pr.created_at DESC`
        );
        res.json(runs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Get payroll by run (legacy endpoint)
router.get("/:run", auth, finance, async (req, res) => {
    let c = null;
    try {
        c = await db();
        const [r] = await c.query(
            "SELECT ps.*, e.FirstName, e.LastName FROM payroll_slips ps LEFT JOIN employees e ON ps.employee_id = e.id WHERE ps.payroll_run_id = ?",
            [req.params.run]
        );
        res.json(r);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Recalculate payroll for employee
router.post("/recalculate/:empId", auth, finance, async (req, res) => {
    const { empId } = req.params;
    const { month, year } = req.body;
    
    let c = null;
    
    try {
        c = await db();
        // Get salary structure
        const [structure] = await c.query("SELECT * FROM salary_structures WHERE employee_id = ?", [empId]);
        
        if (structure.length === 0) {
            return res.status(404).json({ error: "Salary structure not found" });
        }
        
        const s = structure[0];
        
        // Calculate attendance
        const [attendance] = await c.query(
            "SELECT COUNT(*) as present_days FROM attendance WHERE employee_id = ? AND MONTH(attendance_date) = ? AND YEAR(attendance_date) = ? AND status = 'present'",
            [empId, month, year]
        );
        
        const presentDays = attendance[0]?.present_days || 0;
        const workingDays = 30;
        
        const basicEarned = (s.basic / workingDays) * presentDays;
        const hraEarned = (s.hra / workingDays) * presentDays;
        const grossEarned = basicEarned + hraEarned + (s.conveyance || 0) + (s.special_allowance || 0);
        const netEarned = grossEarned - (s.pf + s.esi + s.professional_tax + s.other_deductions);
        
        // Update existing slip or create new one
        await c.query(
            `INSERT INTO payroll_slips (employee_id, month, year, basic, hra, gross_salary, pf, esi, professional_tax, net_salary, days_worked, days_in_month)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE basic=VALUES(basic), hra=VALUES(hra), gross_salary=VALUES(gross_salary), net_salary=VALUES(net_salary), days_worked=VALUES(days_worked)`,
            [empId, month, year, basicEarned, hraEarned, grossEarned, s.pf, s.esi, s.professional_tax, netEarned, presentDays, workingDays]
        );
        
        res.json({ success: true, net_salary: netEarned });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

/* ============ PAYSLIPS ============ */

// Get all payslips (HR)
router.get("/slips/all", auth, finance, async (req, res) => {
    let c = null;
    try {
        c = await db();
        const [r] = await c.query(
            "SELECT ps.*, e.FirstName, e.LastName FROM payroll_slips ps LEFT JOIN employees e ON ps.employee_id = e.id ORDER BY ps.created_at DESC"
        );
        res.json(r);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Get employee payslips
router.get("/slips/employee/:employee_id", auth, async (req, res) => {
    const employeeId = parseInt(req.params.employee_id);
    const userRole = (req.user.role || '').toLowerCase();
    
    // Check authorization: only self, HR, or Admin
    if (userRole !== 'admin' && userRole !== 'hr') {
        const viewerEmployee = await findEmployeeByUserId(req.user.id);
        if (!viewerEmployee || viewerEmployee.id !== employeeId) {
            return res.status(403).json({ error: "Unauthorized to view this employee's payslips" });
        }
    }
    
    let c = null;
    try {
        c = await db();
        const [r] = await c.query("SELECT * FROM payroll_slips WHERE employee_id = ? ORDER BY year DESC, month DESC", 
            [employeeId]);
        res.json(r);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Get single payslip
router.get("/slips/:employee_id/:slip_id", auth, async (req, res) => {
    const employeeId = parseInt(req.params.employee_id);
    const userRole = (req.user.role || '').toLowerCase();
    
    // Check authorization: only self, HR, or Admin
    if (userRole !== 'admin' && userRole !== 'hr') {
        const viewerEmployee = await findEmployeeByUserId(req.user.id);
        if (!viewerEmployee || viewerEmployee.id !== employeeId) {
            return res.status(403).json({ error: "Unauthorized to view this payslip" });
        }
    }
    
    let c = null;
    try {
        c = await db();
        const [r] = await c.query("SELECT * FROM payroll_slips WHERE employee_id = ? AND id = ?", 
            [employeeId, req.params.slip_id]);
        res.json(r[0] || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Get payslip by ID
router.get("/slip/:id", auth, async (req, res) => {
    let c = null;
    try {
        c = await db();
        const [r] = await c.query("SELECT * FROM payroll_slips WHERE id = ?", [req.params.id]);
        
        if (r.length === 0) {
            return res.status(404).json({ error: "Payslip not found" });
        }
        
        const payslip = r[0];
        const userRole = (req.user.role || '').toLowerCase();
        
        // Check authorization: only self, HR, or Admin
        if (userRole !== 'admin' && userRole !== 'hr') {
            const viewerEmployee = await findEmployeeByUserId(req.user.id);
            if (!viewerEmployee || viewerEmployee.id !== payslip.employee_id) {
                return res.status(403).json({ error: "Unauthorized to view this payslip" });
            }
        }
        
        res.json(payslip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (c) await c.end();
    }
});

// Generate PDF (placeholder)
router.get("/slip/:id/pdf", auth, async (req, res) => {
    res.json({ message: "PDF generation not implemented yet" });
});

module.exports = router;