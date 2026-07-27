/**
 * YEARLY LEAVE BALANCE ROUTES
 * Provides complete CRUD operations, user self-service balance lookup,
 * and bulk Excel import/export for Yearly Leave Balances (YTD report format).
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const { db } = require("../config/database");
const { auth, admin, hr, manager } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

// Multer storage configuration for Excel imports
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "uploads/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "leave-balance-import-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.xlsx' || ext === '.xls' || ext === '.csv') {
            cb(null, true);
        } else {
            cb(new Error("Only Excel (.xlsx, .xls) and CSV files are allowed!"));
        }
    }
});

/**
 * Helper to get dynamic current financial year period string (01-Apr-YYYY - 31-Mar-YYYY)
 */
function getDefaultFinancialYearPeriod() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = Jan, 3 = Apr
    let startYear, endYear;
    if (currentMonth >= 3) {
        startYear = currentYear;
        endYear = currentYear + 1;
    } else {
        startYear = currentYear - 1;
        endYear = currentYear;
    }
    return `01-Apr-${startYear} - 31-Mar-${endYear}`;
}

/**
 * Helper to dynamically extract policy name & year period from uploaded Excel header rows or body
 */
function parseYearPeriodAndPolicy(rows, reqBody = {}) {
    let policyName = reqBody.policy_name || reqBody.policyName || 'Dayshift Leave Policy';
    let yearPeriod = reqBody.year_period || reqBody.yearPeriod || '';

    for (let r = 0; r < Math.min(rows.length, 5); r++) {
        const row = rows[r];
        if (!row) continue;
        const rowStr = Array.isArray(row) ? row.join(' ') : String(row);

        // 1. Try matching full date range pattern like 01-Apr-2025 - 31-Mar-2026
        if (!yearPeriod) {
            const dateRangeMatch = rowStr.match(/\d{1,2}-[A-Za-z]{3}-\d{4}\s*-\s*\d{1,2}-[A-Za-z]{3}-\d{4}/);
            if (dateRangeMatch) {
                yearPeriod = dateRangeMatch[0].trim();
            }
        }

        // 2. Try matching parenthesized period like (01-Apr-2025 - 31-Mar-2026) or (2025 - 2026)
        if (!yearPeriod) {
            const parenMatch = rowStr.match(/\(([^)]*\d{4}[^)]*)\)/);
            if (parenMatch && parenMatch[1]) {
                yearPeriod = parenMatch[1].trim();
            }
        }

        // 3. Try parsing "Report of <Policy Name> (<Year Period>)" pattern
        if (rowStr.includes('of') && rowStr.includes('(')) {
            const parts = rowStr.split('of');
            if (parts[1]) {
                const subParts = parts[1].split('(');
                if (subParts[0] && subParts[0].trim()) {
                    policyName = subParts[0].trim();
                }
                if (!yearPeriod && subParts[1]) {
                    yearPeriod = subParts[1].replace(')', '').trim();
                }
            }
        }
    }

    if (!yearPeriod) {
        yearPeriod = getDefaultFinancialYearPeriod();
    }

    return { policyName, yearPeriod };
}

/**
 * Helper to ensure default leave types exist in leave_types table
 */
async function ensureDefaultLeaveTypes() {
    const defaultTypes = [
        { type_name: 'Sick Leave', type_code: 'SL', is_paid: 1, description: 'Sick Leave' },
        { type_name: 'Casual Leave', type_code: 'CL', is_paid: 1, description: 'Casual Leave' },
        { type_name: 'Compensatory Off', type_code: 'COMP_OFF', is_paid: 1, description: 'Compensatory Off' },
        { type_name: 'Marriage Leave', type_code: 'ML', is_paid: 1, description: 'Marriage Leave' },
        { type_name: 'Loss of Pay', type_code: 'LOP', is_paid: 0, description: 'Loss of Pay / Unpaid Leave' },
        { type_name: 'Bereavement Leave', type_code: 'BL', is_paid: 1, description: 'Bereavement Leave' }
    ];

    const typeMap = {};
    for (const t of defaultTypes) {
        const [existing] = await db.query('SELECT id FROM leave_types WHERE type_code = ? OR type_name = ?', [t.type_code, t.type_name]);
        if (existing.length > 0) {
            typeMap[t.type_code] = existing[0].id;
        } else {
            const [res] = await db.query('INSERT INTO leave_types (type_name, type_code, description, is_paid) VALUES (?, ?, ?, ?)', [t.type_name, t.type_code, t.description, t.is_paid]);
            typeMap[t.type_code] = res.insertId;
        }
    }
    return typeMap;
}

/**
 * Helper to sync yearly_leave_balances record into employee_leave_balances table
 * so that GET /api/leaves/balance?leave_year=YYYY returns sick_leave_consumed, sick_leave_balance, etc. per leave type.
 */
async function syncEmployeeLeaveBalanceRecord(empId, yearPeriod, data, typeMap) {
    if (!empId) return;

    const matchYear = String(yearPeriod || '2026').match(/\d{4}/);
    const leaveYear = matchYear ? parseInt(matchYear[0], 10) : new Date().getFullYear();

    const parseVal = (v, d = null) => {
        if (v === null || v === undefined) return d;
        const s = String(v).trim();
        if (s.toLowerCase() === 'no limit' || s.toLowerCase() === 'unlimited') return 999;
        const n = parseFloat(s);
        return isNaN(n) ? d : n;
    };

    const getAllocatedQuota = (quota, accrued, defaultVal = 0) => {
        const q = parseVal(quota, null);
        if (q !== null && q > 0) return q;
        const a = parseVal(accrued, null);
        if (a !== null && a > 0) return a;
        return defaultVal;
    };

    const mappings = [
        ['SL', getAllocatedQuota(data.sick_leave_annual_quota, data.sick_leave_accrued, 6), data.sick_leave_consumed, data.sick_leave_balance],
        ['CL', getAllocatedQuota(data.casual_leave_annual_quota, data.casual_leave_accrued, 12), data.casual_leave_consumed, data.casual_leave_balance],
        ['COMP_OFF', getAllocatedQuota(data.comp_offs_annual_quota, data.comp_offs_accrued, 0), data.comp_offs_consumed, data.comp_offs_balance],
        ['ML', getAllocatedQuota(data.marriage_leaves_annual_quota, data.marriage_leaves_accrued, 2), data.marriage_leaves_consumed, data.marriage_leaves_balance],
        ['LOP', getAllocatedQuota(data.unpaid_leave_annual_quota, data.unpaid_leave_accrued, 999), data.unpaid_leave_consumed, data.unpaid_leave_balance],
        ['BL', getAllocatedQuota(data.bereavement_leave_annual_quota, data.bereavement_leave_accrued, 2), data.bereavement_leave_consumed, data.bereavement_leave_balance]
    ];

    const upsertSQL = `
        INSERT INTO employee_leave_balances (
            employee_id, leave_type_id, leave_year, allocated_days, used_days, available_days
        ) VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            allocated_days = VALUES(allocated_days),
            used_days = VALUES(used_days),
            available_days = VALUES(available_days),
            last_updated = CURRENT_TIMESTAMP
    `;

    for (const [code, alloc, con, bal] of mappings) {
        const typeId = typeMap[code];
        if (!typeId) continue;
        await db.query(upsertSQL, [
            empId, typeId, leaveYear, alloc, parseVal(con, 0), parseVal(bal, 0)
        ]);
    }
}

/**
 * @route   GET /api/yearly-leave-balances/my-balance
 * @desc    Get yearly leave balance for the currently authenticated employee
 * @access  Private (Employee, Manager, HR, Admin)
 */
router.get("/my-balance", auth, async (req, res) => {
    try {
        const employee = await findEmployeeByUserId(req.user.id);
        if (!employee || !employee.EmployeeNumber) {
            return res.status(404).json({
                success: false,
                message: "Employee profile or employee number not found for current user"
            });
        }

        const { year_period, policy_name } = req.query;
        let query = "SELECT * FROM yearly_leave_balances WHERE employee_number = ?";
        const params = [employee.EmployeeNumber];

        if (year_period) {
            query += " AND year_period = ?";
            params.push(year_period);
        }
        if (policy_name) {
            query += " AND policy_name = ?";
            params.push(policy_name);
        }

        query += " ORDER BY id DESC";

        const [rows] = await db.query(query, params);

        return res.json({
            success: true,
            employee_number: employee.EmployeeNumber,
            data: rows.length > 0 ? rows : null,
            all_records: rows
        });
    } catch (err) {
        console.error("Error fetching my yearly leave balance:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @route   GET /api/yearly-leave-balances/export/excel
 * @desc    Export yearly leave balances to Excel (.xlsx) file
 * @access  Private (Admin, HR, Manager)
 */
router.get("/export/excel", auth, async (req, res) => {
    try {
        const { search, employee_number, department, location, policy_name, year_period } = req.query;

        let whereClauses = ["1=1"];
        const params = [];

        if (search) {
            whereClauses.push("(employee_number LIKE ? OR employee_name LIKE ? OR department LIKE ? OR location LIKE ? OR reporting_manager LIKE ?)");
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
        }
        if (employee_number) {
            whereClauses.push("employee_number = ?");
            params.push(employee_number);
        }
        if (department) {
            whereClauses.push("department = ?");
            params.push(department);
        }
        if (location) {
            whereClauses.push("location = ?");
            params.push(location);
        }
        if (policy_name) {
            whereClauses.push("policy_name = ?");
            params.push(policy_name);
        }
        if (year_period) {
            whereClauses.push("year_period = ?");
            params.push(year_period);
        }

        const whereSql = whereClauses.join(" AND ");
        const dataQuery = `SELECT * FROM yearly_leave_balances WHERE ${whereSql} ORDER BY id ASC`;
        const [rows] = await db.query(dataQuery, params);

        const exportData = rows.map(r => ({
            "Employee Number": r.employee_number,
            "Employee Name": r.employee_name,
            "Job Title": r.job_title || "",
            "Business Unit": r.business_unit || "",
            "Department": r.department || "",
            "Sub Department": r.sub_department || "",
            "Location": r.location || "",
            "Cost Center": r.cost_center || "",
            "Reporting Manager": r.reporting_manager || "",
            "Policy Name": r.policy_name || "",
            "Year Period": r.year_period || "",
            "Sick Leave Accrued": r.sick_leave_accrued || 0,
            "Sick Leave Consumed": r.sick_leave_consumed || 0,
            "Sick Leave Balance": r.sick_leave_balance || '0',
            "Sick Leave Quota": r.sick_leave_annual_quota || '6',
            "Casual Leave Accrued": r.casual_leave_accrued || 0,
            "Casual Leave Consumed": r.casual_leave_consumed || 0,
            "Casual Leave Balance": r.casual_leave_balance || '0',
            "Casual Leave Quota": r.casual_leave_annual_quota || '12',
            "Comp Offs Accrued": r.comp_offs_accrued || 0,
            "Comp Offs Consumed": r.comp_offs_consumed || 0,
            "Comp Offs Balance": r.comp_offs_balance || '0',
            "Marriage Leave Accrued": r.marriage_leaves_accrued || 0,
            "Marriage Leave Consumed": r.marriage_leaves_consumed || 0,
            "Marriage Leave Balance": r.marriage_leaves_balance || '2',
            "Unpaid Leave Accrued": r.unpaid_leave_accrued || 0,
            "Unpaid Leave Consumed": r.unpaid_leave_consumed || 0,
            "Unpaid Leave Balance": r.unpaid_leave_balance || 'No Limit',
            "Bereavement Leave Accrued": r.bereavement_leave_accrued || 0,
            "Bereavement Leave Consumed": r.bereavement_leave_consumed || 0,
            "Bereavement Leave Balance": r.bereavement_leave_balance || '2'
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(exportData);
        xlsx.utils.book_append_sheet(wb, ws, "Yearly Leave Balances");

        const buf = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=Yearly_Leave_Balances_${Date.now()}.xlsx`);
        return res.send(buf);
    } catch (err) {
        console.error("Error exporting yearly leave balances:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @route   GET /api/yearly-leave-balances
 * @desc    Get all yearly leave balances with filtering, search, and pagination
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
    try {
        const {
            search,
            employee_number,
            department,
            location,
            policy_name,
            year_period,
            page = 1,
            limit = 50
        } = req.query;

        let whereClauses = ["1=1"];
        const params = [];

        if (search) {
            whereClauses.push("(employee_number LIKE ? OR employee_name LIKE ? OR department LIKE ? OR location LIKE ? OR reporting_manager LIKE ?)");
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
        }

        if (employee_number) {
            whereClauses.push("employee_number = ?");
            params.push(employee_number);
        }

        if (department) {
            whereClauses.push("department = ?");
            params.push(department);
        }

        if (location) {
            whereClauses.push("location = ?");
            params.push(location);
        }

        if (policy_name) {
            whereClauses.push("policy_name = ?");
            params.push(policy_name);
        }

        if (year_period) {
            whereClauses.push("year_period = ?");
            params.push(year_period);
        }

        const whereSql = whereClauses.join(" AND ");

        // Count total records
        const countQuery = `SELECT COUNT(*) AS total FROM yearly_leave_balances WHERE ${whereSql}`;
        const [countResult] = await db.query(countQuery, params);
        const total = countResult[0].total;

        // Pagination
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 50;
        const offset = (pageNum - 1) * limitNum;

        const dataQuery = `
            SELECT * FROM yearly_leave_balances 
            WHERE ${whereSql} 
            ORDER BY id ASC 
            LIMIT ? OFFSET ?
        `;
        const queryParams = [...params, limitNum, offset];
        const [rows] = await db.query(dataQuery, queryParams);

        return res.json({
            success: true,
            data: rows,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (err) {
        console.error("Error fetching yearly leave balances:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @route   GET /api/yearly-leave-balances/:id
 * @desc    Get a single yearly leave balance record by ID
 * @access  Private
 */
router.get("/:id", auth, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM yearly_leave_balances WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Yearly leave balance record not found" });
        }
        return res.json({ success: true, data: rows[0] });
    } catch (err) {
        console.error("Error fetching yearly leave balance by ID:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @route   POST /api/yearly-leave-balances
 * @desc    Create a new yearly leave balance record manually
 * @access  Private (Admin, HR)
 */
router.post("/", auth, hr, async (req, res) => {
    try {
        const body = req.body;
        if (!body.employee_number || !body.employee_name) {
            return res.status(400).json({ success: false, message: "employee_number and employee_name are required" });
        }

        // Try matching employee_id
        let empId = body.employee_id || null;
        if (!empId) {
            const [emps] = await db.query("SELECT id FROM employees WHERE EmployeeNumber = ?", [body.employee_number]);
            if (emps.length > 0) empId = emps[0].id;
        }

        const insertSQL = `
            INSERT INTO yearly_leave_balances (
                employee_id, employee_number, employee_name, job_title, business_unit, department,
                sub_department, location, cost_center, reporting_manager, policy_name, year_period,
                sick_leave_accrued, sick_leave_consumed, sick_leave_balance, sick_leave_annual_quota, sick_leave_unit,
                casual_leave_accrued, casual_leave_consumed, casual_leave_balance, casual_leave_annual_quota, casual_leave_unit,
                comp_offs_accrued, comp_offs_consumed, comp_offs_balance, comp_offs_annual_quota, comp_offs_unit,
                marriage_leaves_accrued, marriage_leaves_consumed, marriage_leaves_balance, marriage_leaves_annual_quota, marriage_leaves_unit,
                unpaid_leave_accrued, unpaid_leave_consumed, unpaid_leave_balance, unpaid_leave_annual_quota, unpaid_leave_unit,
                bereavement_leave_accrued, bereavement_leave_consumed, bereavement_leave_balance, bereavement_leave_annual_quota, bereavement_leave_unit
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            empId, body.employee_number, body.employee_name, body.job_title || null, body.business_unit || null, body.department || null,
            body.sub_department || null, body.location || null, body.cost_center || null, body.reporting_manager || null,
            body.policy_name || 'Dayshift Leave Policy', body.year_period || getDefaultFinancialYearPeriod(),
            body.sick_leave_accrued || 0, body.sick_leave_consumed || 0, body.sick_leave_balance || '0', body.sick_leave_annual_quota || '6', body.sick_leave_unit || 'Days',
            body.casual_leave_accrued || 0, body.casual_leave_consumed || 0, body.casual_leave_balance || '0', body.casual_leave_annual_quota || '12', body.casual_leave_unit || 'Days',
            body.comp_offs_accrued || 0, body.comp_offs_consumed || 0, body.comp_offs_balance || '0', body.comp_offs_annual_quota || '0', body.comp_offs_unit || 'Days',
            body.marriage_leaves_accrued || 0, body.marriage_leaves_consumed || 0, body.marriage_leaves_balance || '2', body.marriage_leaves_annual_quota || '2', body.marriage_leaves_unit || 'Days',
            body.unpaid_leave_accrued || 0, body.unpaid_leave_consumed || 0, body.unpaid_leave_balance || 'No Limit', body.unpaid_leave_annual_quota || 'No Limit', body.unpaid_leave_unit || 'Days',
            body.bereavement_leave_accrued || 0, body.bereavement_leave_consumed || 0, body.bereavement_leave_balance || '2', body.bereavement_leave_annual_quota || '2', body.bereavement_leave_unit || 'Days'
        ];

        const [result] = await db.query(insertSQL, values);

        if (empId) {
            const typeMap = await ensureDefaultLeaveTypes();
            await syncEmployeeLeaveBalanceRecord(empId, body.year_period || getDefaultFinancialYearPeriod(), body, typeMap);
        }

        return res.status(201).json({
            success: true,
            message: "Yearly leave balance record created successfully",
            id: result.insertId
        });
    } catch (err) {
        console.error("Error creating yearly leave balance:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @route   PUT /api/yearly-leave-balances/:id
 * @desc    Update an existing yearly leave balance record
 * @access  Private (Admin, HR)
 */
router.put("/:id", auth, hr, async (req, res) => {
    try {
        const id = req.params.id;
        const [existing] = await db.query("SELECT * FROM yearly_leave_balances WHERE id = ?", [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        const body = req.body;
        const updateSQL = `
            UPDATE yearly_leave_balances SET
                employee_name = COALESCE(?, employee_name),
                job_title = COALESCE(?, job_title),
                business_unit = COALESCE(?, business_unit),
                department = COALESCE(?, department),
                sub_department = COALESCE(?, sub_department),
                location = COALESCE(?, location),
                cost_center = COALESCE(?, cost_center),
                reporting_manager = COALESCE(?, reporting_manager),
                policy_name = COALESCE(?, policy_name),
                year_period = COALESCE(?, year_period),
                sick_leave_accrued = COALESCE(?, sick_leave_accrued),
                sick_leave_consumed = COALESCE(?, sick_leave_consumed),
                sick_leave_balance = COALESCE(?, sick_leave_balance),
                sick_leave_annual_quota = COALESCE(?, sick_leave_annual_quota),
                casual_leave_accrued = COALESCE(?, casual_leave_accrued),
                casual_leave_consumed = COALESCE(?, casual_leave_consumed),
                casual_leave_balance = COALESCE(?, casual_leave_balance),
                casual_leave_annual_quota = COALESCE(?, casual_leave_annual_quota),
                comp_offs_accrued = COALESCE(?, comp_offs_accrued),
                comp_offs_consumed = COALESCE(?, comp_offs_consumed),
                comp_offs_balance = COALESCE(?, comp_offs_balance),
                comp_offs_annual_quota = COALESCE(?, comp_offs_annual_quota),
                marriage_leaves_accrued = COALESCE(?, marriage_leaves_accrued),
                marriage_leaves_consumed = COALESCE(?, marriage_leaves_consumed),
                marriage_leaves_balance = COALESCE(?, marriage_leaves_balance),
                marriage_leaves_annual_quota = COALESCE(?, marriage_leaves_annual_quota),
                unpaid_leave_accrued = COALESCE(?, unpaid_leave_accrued),
                unpaid_leave_consumed = COALESCE(?, unpaid_leave_consumed),
                unpaid_leave_balance = COALESCE(?, unpaid_leave_balance),
                unpaid_leave_annual_quota = COALESCE(?, unpaid_leave_annual_quota),
                bereavement_leave_accrued = COALESCE(?, bereavement_leave_accrued),
                bereavement_leave_consumed = COALESCE(?, bereavement_leave_consumed),
                bereavement_leave_balance = COALESCE(?, bereavement_leave_balance),
                bereavement_leave_annual_quota = COALESCE(?, bereavement_leave_annual_quota)
            WHERE id = ?
        `;

        const values = [
            body.employee_name, body.job_title, body.business_unit, body.department, body.sub_department,
            body.location, body.cost_center, body.reporting_manager, body.policy_name, body.year_period,
            body.sick_leave_accrued, body.sick_leave_consumed, body.sick_leave_balance, body.sick_leave_annual_quota,
            body.casual_leave_accrued, body.casual_leave_consumed, body.casual_leave_balance, body.casual_leave_annual_quota,
            body.comp_offs_accrued, body.comp_offs_consumed, body.comp_offs_balance, body.comp_offs_annual_quota,
            body.marriage_leaves_accrued, body.marriage_leaves_consumed, body.marriage_leaves_balance, body.marriage_leaves_annual_quota,
            body.unpaid_leave_accrued, body.unpaid_leave_consumed, body.unpaid_leave_balance, body.unpaid_leave_annual_quota,
            body.bereavement_leave_accrued, body.bereavement_leave_consumed, body.bereavement_leave_balance, body.bereavement_leave_annual_quota,
            id
        ];

        await db.query(updateSQL, values);

        const [updated] = await db.query("SELECT * FROM yearly_leave_balances WHERE id = ?", [id]);
        if (updated.length > 0 && updated[0].employee_id) {
            const typeMap = await ensureDefaultLeaveTypes();
            await syncEmployeeLeaveBalanceRecord(updated[0].employee_id, updated[0].year_period, updated[0], typeMap);
        }

        return res.json({ success: true, message: "Record updated successfully" });
    } catch (err) {
        console.error("Error updating yearly leave balance:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @route   DELETE /api/yearly-leave-balances/:id
 * @desc    Delete a yearly leave balance record
 * @access  Private (Admin, HR)
 */
router.delete("/:id", auth, hr, async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM yearly_leave_balances WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.json({ success: true, message: "Record deleted successfully" });
    } catch (err) {
        console.error("Error deleting yearly leave balance:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @route   POST /api/yearly-leave-balances/import
 * @desc    Upload Excel report to import/upsert yearly leave balances
 * @access  Private (Admin, HR)
 */
router.post("/import", auth, hr, manager, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const filePath = req.file.path;
        const wb = xlsx.readFile(filePath);
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        if (rows.length < 3) {
            return res.status(400).json({ success: false, message: "Excel file has insufficient data rows" });
        }

        const { policyName, yearPeriod } = parseYearPeriodAndPolicy(rows, req.body);

        const val = (v, defaultVal = null) => (v === undefined || v === null || String(v).trim() === '') ? defaultVal : String(v).trim();
        const num = (v, defaultVal = 0) => {
            const parsed = parseFloat(v);
            return isNaN(parsed) ? defaultVal : parsed;
        };

        const [employees] = await db.query('SELECT id, EmployeeNumber FROM employees');
        const empMap = {};
        employees.forEach(e => {
            if (e.EmployeeNumber) empMap[e.EmployeeNumber.trim().toUpperCase()] = e.id;
        });

        const typeMap = await ensureDefaultLeaveTypes();

        let insertedCount = 0;
        let updatedCount = 0;

        for (let i = 3; i < rows.length; i++) {
            const r = rows[i];
            if (!r || !r[0]) continue;

            const empNum = val(r[0]);
            const empName = val(r[1]);

            if (!empNum || !empName || empNum.toLowerCase().includes('generated on') || empName.toLowerCase().includes('report is generated')) {
                continue;
            }

            const matchedEmpId = empMap[empNum.toUpperCase()] || null;

            const rowData = {
                sick_leave_accrued: num(r[9]), sick_leave_consumed: num(r[10]), sick_leave_balance: val(r[11], '0'), sick_leave_annual_quota: val(r[12], '6'),
                casual_leave_accrued: num(r[14]), casual_leave_consumed: num(r[15]), casual_leave_balance: val(r[16], '0'), casual_leave_annual_quota: val(r[17], '12'),
                comp_offs_accrued: num(r[19]), comp_offs_consumed: num(r[20]), comp_offs_balance: val(r[21], '0'), comp_offs_annual_quota: val(r[22], '0'),
                marriage_leaves_accrued: num(r[24]), marriage_leaves_consumed: num(r[25]), marriage_leaves_balance: val(r[26], '2'), marriage_leaves_annual_quota: val(r[27], '2'),
                unpaid_leave_accrued: num(r[29]), unpaid_leave_consumed: num(r[30]), unpaid_leave_balance: val(r[31], 'No Limit'), unpaid_leave_annual_quota: val(r[32], 'No Limit'),
                bereavement_leave_accrued: num(r[34]), bereavement_leave_consumed: num(r[35]), bereavement_leave_balance: val(r[36], '2'), bereavement_leave_annual_quota: val(r[37], '2')
            };

            const upsertSQL = `
                INSERT INTO yearly_leave_balances (
                    employee_id, employee_number, employee_name, job_title, business_unit, department,
                    sub_department, location, cost_center, reporting_manager, policy_name, year_period,
                    sick_leave_accrued, sick_leave_consumed, sick_leave_balance, sick_leave_annual_quota, sick_leave_unit,
                    casual_leave_accrued, casual_leave_consumed, casual_leave_balance, casual_leave_annual_quota, casual_leave_unit,
                    comp_offs_accrued, comp_offs_consumed, comp_offs_balance, comp_offs_annual_quota, comp_offs_unit,
                    marriage_leaves_accrued, marriage_leaves_consumed, marriage_leaves_balance, marriage_leaves_annual_quota, marriage_leaves_unit,
                    unpaid_leave_accrued, unpaid_leave_consumed, unpaid_leave_balance, unpaid_leave_annual_quota, unpaid_leave_unit,
                    bereavement_leave_accrued, bereavement_leave_consumed, bereavement_leave_balance, bereavement_leave_annual_quota, bereavement_leave_unit
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    employee_id = VALUES(employee_id),
                    employee_name = VALUES(employee_name),
                    job_title = VALUES(job_title),
                    business_unit = VALUES(business_unit),
                    department = VALUES(department),
                    sub_department = VALUES(sub_department),
                    location = VALUES(location),
                    cost_center = VALUES(cost_center),
                    reporting_manager = VALUES(reporting_manager),
                    sick_leave_accrued = VALUES(sick_leave_accrued),
                    sick_leave_consumed = VALUES(sick_leave_consumed),
                    sick_leave_balance = VALUES(sick_leave_balance),
                    sick_leave_annual_quota = VALUES(sick_leave_annual_quota),
                    casual_leave_accrued = VALUES(casual_leave_accrued),
                    casual_leave_consumed = VALUES(casual_leave_consumed),
                    casual_leave_balance = VALUES(casual_leave_balance),
                    casual_leave_annual_quota = VALUES(casual_leave_annual_quota),
                    comp_offs_accrued = VALUES(comp_offs_accrued),
                    comp_offs_consumed = VALUES(comp_offs_consumed),
                    comp_offs_balance = VALUES(comp_offs_balance),
                    comp_offs_annual_quota = VALUES(comp_offs_annual_quota),
                    marriage_leaves_accrued = VALUES(marriage_leaves_accrued),
                    marriage_leaves_consumed = VALUES(marriage_leaves_consumed),
                    marriage_leaves_balance = VALUES(marriage_leaves_balance),
                    marriage_leaves_annual_quota = VALUES(marriage_leaves_annual_quota),
                    unpaid_leave_accrued = VALUES(unpaid_leave_accrued),
                    unpaid_leave_consumed = VALUES(unpaid_leave_consumed),
                    unpaid_leave_balance = VALUES(unpaid_leave_balance),
                    unpaid_leave_annual_quota = VALUES(unpaid_leave_annual_quota),
                    bereavement_leave_accrued = VALUES(bereavement_leave_accrued),
                    bereavement_leave_consumed = VALUES(bereavement_leave_consumed),
                    bereavement_leave_balance = VALUES(bereavement_leave_balance),
                    bereavement_leave_annual_quota = VALUES(bereavement_leave_annual_quota);
            `;

            const values = [
                matchedEmpId, empNum, empName, val(r[2]), val(r[3]), val(r[4]),
                val(r[5]), val(r[6]), val(r[7]), val(r[8]), policyName, yearPeriod,
                rowData.sick_leave_accrued, rowData.sick_leave_consumed, rowData.sick_leave_balance, rowData.sick_leave_annual_quota, val(r[13], 'Days'),
                rowData.casual_leave_accrued, rowData.casual_leave_consumed, rowData.casual_leave_balance, rowData.casual_leave_annual_quota, val(r[18], 'Days'),
                rowData.comp_offs_accrued, rowData.comp_offs_consumed, rowData.comp_offs_balance, rowData.comp_offs_annual_quota, val(r[23], 'Days'),
                rowData.marriage_leaves_accrued, rowData.marriage_leaves_consumed, rowData.marriage_leaves_balance, rowData.marriage_leaves_annual_quota, val(r[28], 'Days'),
                rowData.unpaid_leave_accrued, rowData.unpaid_leave_consumed, rowData.unpaid_leave_balance, rowData.unpaid_leave_annual_quota, val(r[33], 'Days'),
                rowData.bereavement_leave_accrued, rowData.bereavement_leave_consumed, rowData.bereavement_leave_balance, rowData.bereavement_leave_annual_quota, val(r[38], 'Days')
            ];

            const [result] = await db.query(upsertSQL, values);
            if (result.affectedRows === 1) insertedCount++;
            else if (result.affectedRows === 2) updatedCount++;

            // Sync to employee_leave_balances for GET /api/leaves/balance API
            if (matchedEmpId) {
                await syncEmployeeLeaveBalanceRecord(matchedEmpId, yearPeriod, rowData, typeMap);
            }
        }

        // Clean up uploaded temp file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return res.json({
            success: true,
            message: `Excel import processed successfully. Inserted: ${insertedCount}, Updated: ${updatedCount}`,
            policy_name: policyName,
            year_period: yearPeriod
        });

    } catch (err) {
        console.error("Error importing yearly leave balances:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
