/**
 * HOLIDAY ROUTES (Refactored & Enhanced)
 * Handles holiday calendars, shift policy & location assignments,
 * bulk Excel/CSV uploads, templates, export, and complete CRUD.
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const { db } = require("../config/database");
const { auth, roleAuth } = require("../middleware/auth");
const { excel } = require("../utils/excelReader");
const { findEmployeeByUserId } = require("../utils/helpers");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({ dest: "uploads/" });

/**
 * Auto-migration helper to ensure required columns and schema exist in holidays & holiday_lists tables.
 */
let schemaChecked = false;
async function ensureHolidaySchema(conn) {
    if (schemaChecked) return;
    try {
        // Ensure holiday_lists table exists
        await conn.query(`
            CREATE TABLE IF NOT EXISTS holiday_lists (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) UNIQUE NOT NULL,
                description TEXT NULL,
                location_id INT NULL,
                shift_policy_id INT NULL,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Check columns in holidays table
        const [cols] = await conn.query("DESCRIBE holidays");
        const colNames = cols.map(c => c.Field.toLowerCase());

        if (!colNames.includes("holiday_type")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN holiday_type VARCHAR(50) DEFAULT 'public'");
        }
        if (!colNames.includes("holiday_list_id")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN holiday_list_id INT NULL");
        }
        if (!colNames.includes("location_id")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN location_id INT NULL");
        }
        if (!colNames.includes("shift_policy_id")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN shift_policy_id INT NULL");
        }
        if (!colNames.includes("applicable_locations")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN applicable_locations TEXT NULL");
        }
        if (!colNames.includes("applicable_shifts")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN applicable_shifts TEXT NULL");
        }
        if (!colNames.includes("is_active")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN is_active TINYINT(1) DEFAULT 1");
        }
        if (!colNames.includes("updated_at")) {
            await conn.query("ALTER TABLE holidays ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        }

        // Drop strict UNIQUE constraint on holiday_date if present, to allow holidays per list/location
        try {
            const [indexes] = await conn.query("SHOW INDEX FROM holidays WHERE Key_name = 'holiday_date' AND Non_unique = 0");
            if (indexes && indexes.length > 0) {
                await conn.query("ALTER TABLE holidays DROP INDEX holiday_date");
            }
        } catch (e) {
            // Index might not exist or be named differently, safe to ignore
        }

        schemaChecked = true;
    } catch (err) {
        console.warn("[Holiday Routes] Schema check warning:", err.message);
    }
}

/* ============ META DATA ENDPOINT ============ */

// Get all metadata needed for filters and dropdowns (Locations, Shift Schemes, Holiday Lists)
router.get("/meta", auth, async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);

        const [locations] = await c.query("SELECT id, name, country FROM locations ORDER BY name ASC");
        
        let shiftPolicies = [];
        try {
            const [schemes] = await c.query("SELECT id, name, description, status FROM attendance_capture_schemes ORDER BY name ASC");
            shiftPolicies = schemes;
        } catch (e) {
            shiftPolicies = [];
        }

        let projectShifts = [];
        try {
            const [pShifts] = await c.query("SELECT id, shift_name, shift_type, start_time, end_time FROM project_shifts ORDER BY shift_name ASC");
            projectShifts = pShifts;
        } catch (e) {
            projectShifts = [];
        }

        const [holidayLists] = await c.query("SELECT * FROM holiday_lists ORDER BY name ASC");

        res.json({
            locations,
            shiftPolicies,
            projectShifts,
            holidayLists
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ HOLIDAY LISTS MASTER CRUD ============ */

// Get all holiday list master groups
router.get("/holiday-lists", auth, async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        const [lists] = await c.query(`
            SELECT hl.*,
                   loc.name AS location_name,
                   COUNT(h.id) AS holiday_count
            FROM holiday_lists hl
            LEFT JOIN locations loc ON hl.location_id = loc.id
            LEFT JOIN holidays h ON hl.id = h.holiday_list_id
            GROUP BY hl.id
            ORDER BY hl.name ASC
        `);
        res.json(lists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

// Create holiday list master group
router.post("/holiday-lists", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const { name, description, location_id, shift_policy_id, is_active } = req.body;
    if (!name) return res.status(400).json({ error: "Holiday list name is required" });

    const c = await db();
    try {
        await ensureHolidaySchema(c);
        const [result] = await c.query(
            "INSERT INTO holiday_lists (name, description, location_id, shift_policy_id, is_active) VALUES (?, ?, ?, ?, ?)",
            [name, description || null, location_id || null, shift_policy_id || null, is_active !== undefined ? (is_active ? 1 : 0) : 1]
        );
        res.status(201).json({ id: result.insertId, message: "Holiday list created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

// Update holiday list master group
router.put("/holiday-lists/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const { name, description, location_id, shift_policy_id, is_active } = req.body;
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        await c.query(
            "UPDATE holiday_lists SET name = ?, description = ?, location_id = ?, shift_policy_id = ?, is_active = ? WHERE id = ?",
            [name, description || null, location_id || null, shift_policy_id || null, is_active !== undefined ? (is_active ? 1 : 0) : 1, req.params.id]
        );
        res.json({ message: "Holiday list updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

// Delete holiday list master group
router.delete("/holiday-lists/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        // Unlink holidays from this list
        await c.query("UPDATE holidays SET holiday_list_id = NULL WHERE holiday_list_id = ?", [req.params.id]);
        await c.query("DELETE FROM holiday_lists WHERE id = ?", [req.params.id]);
        res.json({ message: "Holiday list deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ HOLIDAYS SUMMARY & KPIS ============ */

router.get("/summary", auth, async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        const year = req.query.year || new Date().getFullYear();

        const [totalHolidays] = await c.query(
            "SELECT COUNT(*) AS total, " +
            "SUM(CASE WHEN holiday_type = 'public' OR holiday_type = 'mandatory' OR holiday_type IS NULL THEN 1 ELSE 0 END) AS public_count, " +
            "SUM(CASE WHEN holiday_type = 'optional' OR holiday_type = 'restricted' THEN 1 ELSE 0 END) AS optional_count " +
            "FROM holidays WHERE YEAR(holiday_date) = ?",
            [year]
        );

        const [upcoming] = await c.query(
            "SELECT COUNT(*) AS count FROM holidays WHERE holiday_date >= CURDATE() AND YEAR(holiday_date) = ?",
            [year]
        );

        const [locationsCovered] = await c.query(
            "SELECT COUNT(DISTINCT location_id) AS count FROM holidays WHERE YEAR(holiday_date) = ? AND location_id IS NOT NULL",
            [year]
        );

        const [shiftsCovered] = await c.query(
            "SELECT COUNT(DISTINCT shift_policy_id) AS count FROM holidays WHERE YEAR(holiday_date) = ? AND shift_policy_id IS NOT NULL",
            [year]
        );

        res.json({
            year: Number(year),
            total: totalHolidays[0]?.total || 0,
            public_count: totalHolidays[0]?.public_count || 0,
            optional_count: totalHolidays[0]?.optional_count || 0,
            upcoming_count: upcoming[0]?.count || 0,
            locations_count: locationsCovered[0]?.count || 0,
            shifts_count: shiftsCovered[0]?.count || 0
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ UPCOMING HOLIDAYS ============ */

router.get("/upcoming", auth, async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        let emp = null;
        try {
            emp = await findEmployeeByUserId(req.user.id);
        } catch (e) {}

        let locationId = emp?.LocationId || null;
        let locationName = null;

        if (locationId) {
            const [locRows] = await c.query("SELECT name FROM locations WHERE id = ?", [locationId]);
            if (locRows && locRows.length > 0) {
                locationName = locRows[0].name;
            }
        }

        let query = `
            SELECT h.*,
                   hl.name AS holiday_list_name,
                   loc.name AS location_name
            FROM holidays h
            LEFT JOIN holiday_lists hl ON h.holiday_list_id = hl.id
            LEFT JOIN locations loc ON h.location_id = loc.id
            WHERE h.is_active = 1
        `;
        const params = [];

        if (locationId) {
            query += ` AND (
                h.location_id = ?
                OR (h.location_id IS NULL AND (h.applicable_locations IS NULL OR h.applicable_locations = '' OR h.applicable_locations = 'null'))
                OR h.applicable_locations LIKE ?
                OR (h.holiday_list_id IS NOT NULL AND h.holiday_list_id = ?)
            )`;
            params.push(locationId, `%"${locationId}"%`, emp.holiday_list_id || 0);
        }

        // Retrieve all mapped holidays for carousel navigation (previous and next holidays)
        const [rows] = await c.query(query + " ORDER BY h.holiday_date ASC", params);

        res.json({
            location_id: locationId,
            location_name: locationName || (locationId ? `Location ${locationId}` : "All Locations"),
            holidays: rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ HOLIDAYS BY YEAR ============ */

router.get("/year/:year", auth, async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        const [rows] = await c.query(`
            SELECT h.*,
                   hl.name AS holiday_list_name,
                   loc.name AS location_name
            FROM holidays h
            LEFT JOIN holiday_lists hl ON h.holiday_list_id = hl.id
            LEFT JOIN locations loc ON h.location_id = loc.id
            WHERE YEAR(h.holiday_date) = ?
            ORDER BY h.holiday_date ASC
        `, [req.params.year]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ GET ALL HOLIDAYS (WITH FULL FILTERING) ============ */

router.get("/", auth, async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);

        const { year, location_id, location_ids, shift_policy_id, shift_policy_ids, holiday_list_id, holiday_list_ids, holiday_type, is_active, search } = req.query;

        let query = `
            SELECT h.*,
                   hl.name AS holiday_list_name,
                   loc.name AS location_name,
                   acs.name AS shift_policy_name
            FROM holidays h
            LEFT JOIN holiday_lists hl ON h.holiday_list_id = hl.id
            LEFT JOIN locations loc ON h.location_id = loc.id
            LEFT JOIN attendance_capture_schemes acs ON h.shift_policy_id = acs.id
            WHERE 1=1
        `;
        const params = [];

        if (year) {
            query += " AND YEAR(h.holiday_date) = ?";
            params.push(year);
        }

        // Multi / Single Holiday List filter
        const rawHlist = holiday_list_ids || holiday_list_id;
        if (rawHlist) {
            const hListArray = Array.isArray(rawHlist) ? rawHlist : String(rawHlist).split(',').map(s => s.trim()).filter(Boolean);
            if (hListArray.length > 0) {
                query += ` AND h.holiday_list_id IN (?)`;
                params.push(hListArray);
            }
        }

        // Multi / Single Location filter
        const rawLoc = location_ids || location_id;
        if (rawLoc) {
            const locArray = Array.isArray(rawLoc) ? rawLoc : String(rawLoc).split(',').map(s => s.trim()).filter(Boolean);
            if (locArray.length > 0) {
                const locClauses = locArray.map(() => "h.applicable_locations LIKE ?").join(" OR ");
                query += ` AND (h.location_id IN (?) OR h.location_id IS NULL OR ${locClauses})`;
                params.push(locArray);
                locArray.forEach(lid => params.push(`%"${lid}"%`));
            }
        }

        // Multi / Single Shift Policy filter
        const rawShift = shift_policy_ids || shift_policy_id;
        if (rawShift) {
            const shiftArray = Array.isArray(rawShift) ? rawShift : String(rawShift).split(',').map(s => s.trim()).filter(Boolean);
            if (shiftArray.length > 0) {
                const shiftClauses = shiftArray.map(() => "h.applicable_shifts LIKE ?").join(" OR ");
                query += ` AND (h.shift_policy_id IN (?) OR h.shift_policy_id IS NULL OR ${shiftClauses})`;
                params.push(shiftArray);
                shiftArray.forEach(sid => params.push(`%"${sid}"%`));
            }
        }

        if (holiday_type) {
            query += " AND h.holiday_type = ?";
            params.push(holiday_type);
        }

        if (is_active !== undefined && is_active !== '') {
            query += " AND h.is_active = ?";
            params.push(is_active === 'true' || is_active === '1' ? 1 : 0);
        }

        if (search) {
            query += " AND (h.holiday_name LIKE ? OR h.description LIKE ? OR h.day_name LIKE ?)";
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += " ORDER BY h.holiday_date ASC";

        const [rows] = await c.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ CREATE SINGLE HOLIDAY ============ */

router.post("/", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const {
        holiday_date,
        holiday_name,
        day_name,
        holiday_type = 'public',
        description,
        holiday_list_id,
        location_id,
        shift_policy_id,
        applicable_locations,
        applicable_shifts,
        is_active = 1
    } = req.body;

    if (!holiday_date || !holiday_name) {
        return res.status(400).json({ error: "Holiday date and name are required." });
    }

    const c = await db();
    try {
        await ensureHolidaySchema(c);

        // Calculate day name if missing
        let calculatedDay = day_name;
        if (!calculatedDay) {
            const d = new Date(holiday_date);
            if (!isNaN(d.getTime())) {
                calculatedDay = d.toLocaleDateString('en-US', { weekday: 'long' });
            }
        }

        const appLocationsStr = typeof applicable_locations === 'object' ? JSON.stringify(applicable_locations) : applicable_locations;
        const appShiftsStr = typeof applicable_shifts === 'object' ? JSON.stringify(applicable_shifts) : applicable_shifts;

        const [result] = await c.query(`
            INSERT INTO holidays (
                holiday_date, holiday_name, day_name, holiday_type, description,
                holiday_list_id, location_id, shift_policy_id,
                applicable_locations, applicable_shifts, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            holiday_date,
            holiday_name,
            calculatedDay || null,
            holiday_type,
            description || null,
            holiday_list_id || null,
            location_id || null,
            shift_policy_id || null,
            appLocationsStr || null,
            appShiftsStr || null,
            is_active ? 1 : 0
        ]);

        res.status(201).json({
            id: result.insertId,
            message: "Holiday created successfully"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ UPDATE SINGLE HOLIDAY ============ */

router.put("/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const {
        holiday_date,
        holiday_name,
        day_name,
        holiday_type,
        description,
        holiday_list_id,
        location_id,
        shift_policy_id,
        applicable_locations,
        applicable_shifts,
        is_active
    } = req.body;

    const c = await db();
    try {
        await ensureHolidaySchema(c);

        let calculatedDay = day_name;
        if (!calculatedDay && holiday_date) {
            const d = new Date(holiday_date);
            if (!isNaN(d.getTime())) {
                calculatedDay = d.toLocaleDateString('en-US', { weekday: 'long' });
            }
        }

        const appLocationsStr = typeof applicable_locations === 'object' ? JSON.stringify(applicable_locations) : applicable_locations;
        const appShiftsStr = typeof applicable_shifts === 'object' ? JSON.stringify(applicable_shifts) : applicable_shifts;

        await c.query(`
            UPDATE holidays SET
                holiday_date = ?,
                holiday_name = ?,
                day_name = ?,
                holiday_type = ?,
                description = ?,
                holiday_list_id = ?,
                location_id = ?,
                shift_policy_id = ?,
                applicable_locations = ?,
                applicable_shifts = ?,
                is_active = ?
            WHERE id = ?
        `, [
            holiday_date,
            holiday_name,
            calculatedDay || null,
            holiday_type || 'public',
            description || null,
            holiday_list_id || null,
            location_id || null,
            shift_policy_id || null,
            appLocationsStr || null,
            appShiftsStr || null,
            is_active !== undefined ? (is_active ? 1 : 0) : 1,
            req.params.id
        ]);

        res.json({ message: "Holiday updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ DELETE SINGLE HOLIDAY ============ */

router.delete("/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        await c.query("DELETE FROM holidays WHERE id = ?", [req.params.id]);
        res.json({ message: "Holiday deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ BULK DELETE HOLIDAYS ============ */

router.post("/bulk-delete", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "No holiday IDs provided for deletion" });
    }

    const c = await db();
    try {
        await ensureHolidaySchema(c);
        await c.query("DELETE FROM holidays WHERE id IN (?)", [ids]);
        res.json({ message: `Successfully deleted ${ids.length} holidays` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ BULK ASSIGN HOLIDAYS (TO LOCATIONS & SHIFTS) ============ */

router.post("/bulk-assign", auth, roleAuth(["admin", "hr"]), async (req, res) => {
    const { holiday_ids, location_ids, shift_policy_ids, holiday_list_id } = req.body;
    if (!holiday_ids || !Array.isArray(holiday_ids) || holiday_ids.length === 0) {
        return res.status(400).json({ error: "No holiday IDs provided for assignment" });
    }

    const c = await db();
    try {
        await ensureHolidaySchema(c);

        const appLocationsStr = (location_ids && Array.isArray(location_ids) && location_ids.length > 0) ? JSON.stringify(location_ids) : null;
        const appShiftsStr = (shift_policy_ids && Array.isArray(shift_policy_ids) && shift_policy_ids.length > 0) ? JSON.stringify(shift_policy_ids) : null;
        const primaryLocId = (location_ids && location_ids.length === 1) ? location_ids[0] : null;
        const primaryShiftId = (shift_policy_ids && shift_policy_ids.length === 1) ? shift_policy_ids[0] : null;

        await c.query(`
            UPDATE holidays SET
                applicable_locations = ?,
                location_id = ?,
                applicable_shifts = ?,
                shift_policy_id = ?,
                holiday_list_id = COALESCE(?, holiday_list_id)
            WHERE id IN (?)
        `, [
            appLocationsStr,
            primaryLocId,
            appShiftsStr,
            primaryShiftId,
            holiday_list_id || null,
            holiday_ids
        ]);

        res.json({
            success: true,
            message: `Successfully assigned ${holiday_ids.length} holiday(s) to selected location(s) and shift scheme(s)`
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ DOWNLOAD TEMPLATE ============ */

router.get("/template", auth, (req, res) => {
    try {
        const headers = [
            "Holiday Date (YYYY-MM-DD)",
            "Holiday Name",
            "Holiday Type (public/optional/restricted)",
            "Holiday List Name",
            "Location",
            "Shift Policy",
            "Description"
        ];

        const sampleData = [
            [
                "2026-01-01",
                "New Year's Day",
                "public",
                "All Locations Day Shift",
                "Site 1 - TSN",
                "Site 1 & Site 4 capture scheme",
                "New Year celebration"
            ],
            [
                "2026-01-26",
                "Republic Day",
                "public",
                "All Locations Day Shift",
                "Site 2 - SVS",
                "Site 2 & Site 3 Capture Scheme",
                "National Holiday"
            ],
            [
                "2026-03-25",
                "Holi Festival",
                "public",
                "Night Shift Holiday List",
                "Site 4- Hyderabad - Day Shift Team",
                "Site 1 & Site 4 capture scheme",
                "Festival of Colours"
            ],
            [
                "2026-08-15",
                "Independence Day",
                "public",
                "Hyderabad Holiday List",
                "All Locations",
                "All Shifts",
                "National Independence Day"
            ],
            [
                "2026-10-02",
                "Gandhi Jayanti",
                "public",
                "Visakhapatnam Day Shift Holiday List",
                "All Locations",
                "All Shifts",
                "Mahatma Gandhi Birthday"
            ],
            [
                "2026-12-25",
                "Christmas Day",
                "public",
                "All Locations Day Shift",
                "All Locations",
                "All Shifts",
                "Christmas Celebration"
            ]
        ];

        // Structure sheet data with title header on row 1, column headers on row 2, and sample rows
        const sheetData = [
            ["Teach Tammina Holidays list"],
            headers,
            ...sampleData
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(sheetData);

        // Merge row 1 across all 7 columns for the main title header
        ws['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }
        ];

        // Enable column auto-filter dropdown for each column starting on header row 2
        ws['!autofilter'] = { ref: `A2:G${sheetData.length}` };

        // Set column widths for clean readability
        ws['!cols'] = [
            { wch: 28 }, // Holiday Date
            { wch: 30 }, // Holiday Name
            { wch: 42 }, // Holiday Type
            { wch: 36 }, // Holiday List Name
            { wch: 36 }, // Location
            { wch: 38 }, // Shift Policy
            { wch: 40 }  // Description
        ];

        // Format all date column cells as Date format yyyy-mm-dd (e.g. 2026-08-15)
        for (let r = 2; r <= 200; r++) {
            const dateCell = XLSX.utils.encode_cell({ r, c: 0 });
            if (ws[dateCell]) {
                ws[dateCell].z = 'yyyy-mm-dd';
            } else {
                ws[dateCell] = { t: 's', v: '', z: 'yyyy-mm-dd' };
            }
        }

        XLSX.utils.book_append_sheet(wb, ws, "Teach Tammina Holidays list");
        const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Disposition", 'attachment; filename="Teach_Tammina_Holidays_Template.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ error: "Failed to generate template: " + err.message });
    }
});

/* ============ EXPORT HOLIDAYS TO EXCEL ============ */

router.get("/export", auth, async (req, res) => {
    const c = await db();
    try {
        await ensureHolidaySchema(c);
        const { year, location_id, shift_policy_id, holiday_list_id, holiday_type } = req.query;

        let query = `
            SELECT h.holiday_date,
                   h.holiday_name,
                   h.day_name,
                   h.holiday_type,
                   hl.name AS holiday_list_name,
                   loc.name AS location_name,
                   acs.name AS shift_policy_name,
                   h.description,
                   h.is_active
            FROM holidays h
            LEFT JOIN holiday_lists hl ON h.holiday_list_id = hl.id
            LEFT JOIN locations loc ON h.location_id = loc.id
            LEFT JOIN attendance_capture_schemes acs ON h.shift_policy_id = acs.id
            WHERE 1=1
        `;
        const params = [];

        if (year) {
            query += " AND YEAR(h.holiday_date) = ?";
            params.push(year);
        }
        if (holiday_list_id) {
            query += " AND h.holiday_list_id = ?";
            params.push(holiday_list_id);
        }
        if (location_id) {
            query += " AND (h.location_id = ? OR h.location_id IS NULL)";
            params.push(location_id);
        }
        if (shift_policy_id) {
            query += " AND (h.shift_policy_id = ? OR h.shift_policy_id IS NULL)";
            params.push(shift_policy_id);
        }
        if (holiday_type) {
            query += " AND h.holiday_type = ?";
            params.push(holiday_type);
        }

        query += " ORDER BY h.holiday_date ASC";

        const [rows] = await c.query(query, params);

        const exportData = rows.map(r => ({
            "Date": r.holiday_date ? new Date(r.holiday_date).toISOString().split('T')[0] : '',
            "Holiday Name": r.holiday_name || '',
            "Day": r.day_name || '',
            "Type": r.holiday_type || 'public',
            "Holiday List": r.holiday_list_name || 'General / All',
            "Location": r.location_name || 'All Locations',
            "Shift Policy": r.shift_policy_name || 'All Shifts',
            "Description": r.description || '',
            "Status": r.is_active ? 'Active' : 'Inactive'
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);

        ws['!cols'] = [
            { wch: 15 },
            { wch: 25 },
            { wch: 15 },
            { wch: 15 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 30 },
            { wch: 12 }
        ];

        XLSX.utils.book_append_sheet(wb, ws, "Holidays");
        const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

        const filename = `Holidays_Export_${year || 'All'}.xlsx`;
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

/* ============ BULK UPLOAD HOLIDAYS (AS PER SHIFT POLICY & LOCATIONS) ============ */

router.post("/upload", auth, roleAuth(["admin", "hr"]), upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No Excel or CSV file uploaded." });
    }

    const c = await db();
    try {
        await ensureHolidaySchema(c);

        const rows = excel(req.file.path);
        if (!rows || rows.length === 0) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "Uploaded file is empty or formatted incorrectly." });
        }

        // Target default values from form-data (if admin selected defaults in the modal)
        const defaultHolidayListId = req.body.target_holiday_list_id ? Number(req.body.target_holiday_list_id) : null;
        const defaultLocationId = req.body.target_location_id ? Number(req.body.target_location_id) : null;
        const defaultShiftPolicyId = req.body.target_shift_policy_id ? Number(req.body.target_shift_policy_id) : null;
        const overwriteExisting = req.body.overwrite === 'true' || req.body.overwrite === true;

        // Fetch location and shift lookup maps
        const [locations] = await c.query("SELECT id, name FROM locations");
        const locMap = {};
        locations.forEach(l => { locMap[l.name.toLowerCase().trim()] = l.id; });

        const [shifts] = await c.query("SELECT id, name FROM attendance_capture_schemes");
        const shiftMap = {};
        shifts.forEach(s => { shiftMap[s.name.toLowerCase().trim()] = s.id; });

        const [hlists] = await c.query("SELECT id, name FROM holiday_lists");
        const hlistMap = {};
        hlists.forEach(h => { hlistMap[h.name.toLowerCase().trim()] = h.id; });

        let inserted = 0;
        let updated = 0;
        let skipped = 0;
        const errors = [];

function normalizeHolidayDate(val) {
    if (!val) return null;
    if (val instanceof Date) {
        if (isNaN(val.getTime())) return null;
        const yyyy = val.getFullYear();
        const mm = String(val.getMonth() +
         1).padStart(2, '0');
        const dd = String(val.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    if (typeof val === 'number') {
        if (val > 1000 && val < 100000) {
            const d = new Date(Math.round((val - 25569) * 86400 * 1000));
            if (!isNaN(d.getTime())) {
                const yyyy = d.getUTCFullYear();
                const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
                const dd = String(d.getUTCDate()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd}`;
            }
        }
    }

    const str = String(val).trim();
    if (!str) return null;

    // 1. YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD
    const matchYMD = str.match(/^(\d{4})[-/. ](\d{1,2})[-/. ](\d{1,2})/);
    if (matchYMD) {
        const [, y, m, d] = matchYMD;
        return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }

    // 2. DD-MM-YYYY, DD/MM/YYYY, or DD.MM.YYYY
    const matchDMY = str.match(/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{4})/);
    if (matchDMY) {
        let [, p1, p2, y] = matchDMY;
        let d = parseInt(p1, 10);
        let m = parseInt(p2, 10);
        if (m > 12 && d <= 12) {
            const tmp = d;
            d = m;
            m = tmp;
        }
        return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }

    // 3. Named month formats (e.g. 26-Jan-2026, 26 Jan 2026, January 26 2026)
    const monthMap = {
        jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
        jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
    };

    const matchNamed1 = str.match(/^(\d{1,2})[-/. ]([A-Za-z]+)[-/. ](\d{4})/);
    if (matchNamed1) {
        const [, d, mStr, y] = matchNamed1;
        const m = monthMap[mStr.toLowerCase().substring(0, 3)];
        if (m) {
            return `${y}-${m}-${d.padStart(2, '0')}`;
        }
    }

    const matchNamed2 = str.match(/^([A-Za-z]+)[-/. ](\d{1,2})[-,. ]+(\d{4})/);
    if (matchNamed2) {
        const [, mStr, d, y] = matchNamed2;
        const m = monthMap[mStr.toLowerCase().substring(0, 3)];
        if (m) {
            return `${y}-${m}-${d.padStart(2, '0')}`;
        }
    }

    const d = new Date(str);
    if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    return null;
}

        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            const rowNumber = i + 2;

            try {
                const rawDate = r['HolidayDate(YYYY-MM-DD)'] || r.HolidayDate || r.holiday_date || r.Date || r.date || null;
                const holidayDate = normalizeHolidayDate(rawDate);
                const holidayName = r.HolidayName || r['HolidayName'] || r.holiday_name || r.Name || r.name || null;
                const holidayType = (r['HolidayType(public/optional/restricted)'] || r.HolidayType || r.holiday_type || r.Type || r.type || 'public').toLowerCase().trim();
                const description = r.Description || r.description || null;

                const locRaw = r.Location || r.location || r.ApplicableLocation || r.applicable_location || null;
                const shiftRaw = r.ShiftPolicy || r.shift_policy || r.Shift || r.shift || null;
                const hlistRaw = r.HolidayListName || r.holiday_list_name || r.HolidayList || r.holiday_list || null;

                if (!holidayDate || !holidayName) {
                    skipped++;
                    errors.push(`Row ${rowNumber}: Missing Holiday Date or Name`);
                    continue;
                }

                // Resolve Location ID
                let resolvedLocId = defaultLocationId;
                if (locRaw && String(locRaw).toLowerCase() !== 'all') {
                    const matchedLocId = locMap[String(locRaw).toLowerCase().trim()];
                    if (matchedLocId) resolvedLocId = matchedLocId;
                }

                // Resolve Shift Policy ID
                let resolvedShiftId = defaultShiftPolicyId;
                if (shiftRaw && String(shiftRaw).toLowerCase() !== 'all') {
                    const matchedShiftId = shiftMap[String(shiftRaw).toLowerCase().trim()];
                    if (matchedShiftId) resolvedShiftId = matchedShiftId;
                }

                // Resolve Holiday List ID
                let resolvedHlistId = defaultHolidayListId;
                if (hlistRaw && String(hlistRaw).toLowerCase() !== 'all') {
                    const key = String(hlistRaw).toLowerCase().trim();
                    if (hlistMap[key]) {
                        resolvedHlistId = hlistMap[key];
                    } else {
                        // Create holiday list on the fly if not exists
                        const [newHl] = await c.query("INSERT INTO holiday_lists (name) VALUES (?)", [String(hlistRaw).trim()]);
                        resolvedHlistId = newHl.insertId;
                        hlistMap[key] = resolvedHlistId;
                    }
                }

                // Calculate Day Name
                let dayName = null;
                const d = new Date(holidayDate);
                if (!isNaN(d.getTime())) {
                    dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
                }

                // Check existing record by date and name (or list)
                let checkQuery = "SELECT id FROM holidays WHERE holiday_date = ? AND holiday_name = ?";
                const checkParams = [holidayDate, holidayName];
                if (resolvedHlistId) {
                    checkQuery += " AND (holiday_list_id = ? OR holiday_list_id IS NULL)";
                    checkParams.push(resolvedHlistId);
                }
                const [existing] = await c.query(checkQuery, checkParams);

                if (existing.length > 0) {
                    if (overwriteExisting) {
                        await c.query(`
                            UPDATE holidays SET
                                day_name = ?,
                                holiday_type = ?,
                                description = ?,
                                holiday_list_id = ?,
                                location_id = ?,
                                shift_policy_id = ?,
                                is_active = 1
                            WHERE id = ?
                        `, [
                            dayName,
                            holidayType,
                            description,
                            resolvedHlistId,
                            resolvedLocId,
                            resolvedShiftId,
                            existing[0].id
                        ]);
                        updated++;
                    } else {
                        skipped++;
                    }
                } else {
                    await c.query(`
                        INSERT INTO holidays (
                            holiday_date, holiday_name, day_name, holiday_type, description,
                            holiday_list_id, location_id, shift_policy_id, is_active
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
                    `, [
                        holidayDate,
                        holidayName,
                        dayName,
                        holidayType,
                        description,
                        resolvedHlistId,
                        resolvedLocId,
                        resolvedShiftId
                    ]);
                    inserted++;
                }
            } catch (rowErr) {
                skipped++;
                errors.push(`Row ${rowNumber}: ${rowErr.message}`);
            }
        }

        // Cleanup temporary uploaded file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.json({
            success: true,
            totalRows: rows.length,
            inserted,
            updated,
            skipped,
            errors: errors.slice(0, 10),
            message: `Processed ${rows.length} rows: ${inserted} inserted, ${updated} updated, ${skipped} skipped.`
        });
    } catch (err) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: err.message });
    } finally {
        c.end();
    }
});

module.exports = router;
