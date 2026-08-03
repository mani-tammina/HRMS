const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, roleAuth } = require("../middleware/auth");

// Helper: ensure attendance_capture_schemes has full policy columns
async function ensureColumnsExist() {
  const c = await db();
  try {
    const [allCols] = await c.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'attendance_capture_schemes'
    `);

    const existing = allCols.map(r => r.COLUMN_NAME);

    const colsToAdd = [
      { name: "description",             type: "TEXT NULL" },
      { name: "status",                  type: "ENUM('active', 'inactive') DEFAULT 'active'" },
      { name: "effective_date",          type: "DATE NULL" },
      { name: "biometric_settings",      type: "JSON NULL" },
      { name: "remote_punch_settings",   type: "JSON NULL" },
      { name: "wfh_settings",            type: "JSON NULL" },
      { name: "regularization_settings", type: "JSON NULL" },
      { name: "updated_at",              type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" }
    ];

    for (const col of colsToAdd) {
      if (!existing.includes(col.name)) {
        await c.query(`ALTER TABLE attendance_capture_schemes ADD COLUMN ${col.name} ${col.type}`);
        console.log(`[attendance_capture_schemes] Added column: ${col.name}`);
      }
    }

    // Ensure attendance_capture_scheme_sites junction table exists
    await c.query(`
      CREATE TABLE IF NOT EXISTS attendance_capture_scheme_sites (
        scheme_id INT NOT NULL,
        site_id   INT NOT NULL,
        PRIMARY KEY (scheme_id, site_id),
        FOREIGN KEY (scheme_id) REFERENCES attendance_capture_schemes(id) ON DELETE CASCADE,
        FOREIGN KEY (site_id)   REFERENCES locations(id)                  ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Also expand name column length if it's still VARCHAR(100)
    const nameCol = allCols.find(r => r.COLUMN_NAME === "name");
    // nameCol may be undefined in fresh runs — handled by schema.sql
  } catch (err) {
    console.error("[time-tracking-policy] ensureColumnsExist error:", err.message);
  } finally {
    c.end();
  }
}

// Run migration after server finishes schema initialization to avoid deadlocks
setTimeout(() => { ensureColumnsExist().catch(err => console.warn("[time-tracking-policy] migration warning:", err.message)); }, 3000);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseJsonField(val) {
  if (!val) return null;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch (e) { return val; }
  }
  return val;
}

function formatRow(row) {
  return {
    ...row,
    site_ids: row.site_ids ? row.site_ids.split(",").map(Number) : [],
    sites: row.site_names
      ? row.site_names.split(",").map((name, i) => ({
          id: row.site_ids.split(",").map(Number)[i],
          name
        }))
      : [],
    biometric_settings:      parseJsonField(row.biometric_settings),
    remote_punch_settings:   parseJsonField(row.remote_punch_settings),
    wfh_settings:            parseJsonField(row.wfh_settings),
    regularization_settings: parseJsonField(row.regularization_settings)
  };
}

// ─── GET all ──────────────────────────────────────────────────────────────────
/**
 * GET /api/time-tracking-policies
 */
router.get("/", auth, roleAuth(["admin", "hr", "manager", "employee"]), async (req, res) => {
  try {
    const c = await db();
    const [rows] = await c.query(`
      SELECT s.*,
             GROUP_CONCAT(DISTINCT ss.site_id)  AS site_ids,
             GROUP_CONCAT(DISTINCT l.name)      AS site_names,
             COUNT(DISTINCT e.id)               AS employee_count
      FROM attendance_capture_schemes s
      LEFT JOIN attendance_capture_scheme_sites ss ON s.id = ss.scheme_id
      LEFT JOIN locations l ON ss.site_id = l.id
      LEFT JOIN employees e ON s.id = e.attendance_capture_scheme_id
      GROUP BY s.id
      ORDER BY s.id DESC
    `);
    c.end();
    res.json(rows.map(formatRow));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET by ID ────────────────────────────────────────────────────────────────
/**
 * GET /api/time-tracking-policies/:id
 */
router.get("/:id", auth, roleAuth(["admin", "hr", "manager", "employee"]), async (req, res) => {
  try {
    const c = await db();
    const [rows] = await c.query(`
      SELECT s.*,
             GROUP_CONCAT(ss.site_id)  AS site_ids,
             GROUP_CONCAT(l.name)      AS site_names
      FROM attendance_capture_schemes s
      LEFT JOIN attendance_capture_scheme_sites ss ON s.id = ss.scheme_id
      LEFT JOIN locations l ON ss.site_id = l.id
      WHERE s.id = ?
      GROUP BY s.id
    `, [req.params.id]);
    c.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    res.json(formatRow(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET mapped employees ──────────────────────────────────────────────────
/**
 * GET /api/time-tracking-policies/:id/employees
 */
router.get("/:id/employees", auth, roleAuth(["admin", "hr", "manager"]), async (req, res) => {
  try {
    const c = await db();
    const [rows] = await c.query(`
      SELECT e.EmployeeNumber as id,
             CONCAT(e.FirstName, ' ', IFNULL(e.LastName, '')) as name,
             d.name as department,
             desig.name as designation
      FROM employees e
      LEFT JOIN departments d ON e.DepartmentId = d.id
      LEFT JOIN designations desig ON e.DesignationId = desig.id
      WHERE e.attendance_capture_scheme_id = ?
      ORDER BY e.FirstName, e.LastName
    `, [req.params.id]);
    c.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST (create) ────────────────────────────────────────────────────────────
/**
 * POST /api/time-tracking-policies
 */
router.post("/", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  try {
    const {
      name, description, status, effective_date, site_ids,
      biometric_settings, remote_punch_settings, wfh_settings, regularization_settings
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const c = await db();

    // Duplicate name check
    const [existing] = await c.query("SELECT id FROM attendance_capture_schemes WHERE name = ?", [name]);
    if (existing.length > 0) {
      c.end();
      return res.status(409).json({ error: "An attendance capture scheme with this name already exists" });
    }

    const formattedDate = effective_date
      ? (typeof effective_date === "string" && effective_date.includes("T")
          ? effective_date.split("T")[0]
          : effective_date)
      : null;

    // Insert into attendance_capture_schemes
    const [result] = await c.query(
      `INSERT INTO attendance_capture_schemes
       (name, description, status, effective_date, biometric_settings, remote_punch_settings, wfh_settings, regularization_settings)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        status || "active",
        formattedDate,
        biometric_settings      ? JSON.stringify(biometric_settings)      : null,
        remote_punch_settings   ? JSON.stringify(remote_punch_settings)   : null,
        wfh_settings            ? JSON.stringify(wfh_settings)            : null,
        regularization_settings ? JSON.stringify(regularization_settings) : null
      ]
    );

    const schemeId = result.insertId;

    // Insert site links
    if (site_ids && Array.isArray(site_ids) && site_ids.length > 0) {
      const values = site_ids.map(siteId => [schemeId, siteId]);
      await c.query("INSERT INTO attendance_capture_scheme_sites (scheme_id, site_id) VALUES ?", [values]);
    }

    c.end();
    res.status(201).json({ success: true, message: "Attendance capture scheme created successfully", id: schemeId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PUT (update) ────────────────────────────────────────────────────────────
/**
 * PUT /api/time-tracking-policies/:id
 */
router.put("/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  try {
    const {
      name, description, status, effective_date, site_ids,
      biometric_settings, remote_punch_settings, wfh_settings, regularization_settings
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const c = await db();

    // Duplicate name check (excluding self)
    const [existing] = await c.query(
      "SELECT id FROM attendance_capture_schemes WHERE name = ? AND id != ?",
      [name, req.params.id]
    );
    if (existing.length > 0) {
      c.end();
      return res.status(409).json({ error: "Another attendance capture scheme with this name already exists" });
    }

    const formattedDate = effective_date
      ? (typeof effective_date === "string" && effective_date.includes("T")
          ? effective_date.split("T")[0]
          : effective_date)
      : null;

    // Update row
    const [result] = await c.query(
      `UPDATE attendance_capture_schemes
       SET name = ?, description = ?, status = ?, effective_date = ?,
           biometric_settings = ?, remote_punch_settings = ?, wfh_settings = ?, regularization_settings = ?
       WHERE id = ?`,
      [
        name,
        description || null,
        status || "active",
        formattedDate,
        biometric_settings      ? JSON.stringify(biometric_settings)      : null,
        remote_punch_settings   ? JSON.stringify(remote_punch_settings)   : null,
        wfh_settings            ? JSON.stringify(wfh_settings)            : null,
        regularization_settings ? JSON.stringify(regularization_settings) : null,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      c.end();
      return res.status(404).json({ error: "Scheme not found" });
    }

    // Refresh site links
    await c.query("DELETE FROM attendance_capture_scheme_sites WHERE scheme_id = ?", [req.params.id]);
    if (site_ids && Array.isArray(site_ids) && site_ids.length > 0) {
      const values = site_ids.map(siteId => [req.params.id, siteId]);
      await c.query("INSERT INTO attendance_capture_scheme_sites (scheme_id, site_id) VALUES ?", [values]);
    }

    c.end();
    res.json({ success: true, message: "Attendance capture scheme updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
/**
 * DELETE /api/time-tracking-policies/:id
 */
router.delete("/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  try {
    const c = await db();
    const [result] = await c.query("DELETE FROM attendance_capture_schemes WHERE id = ?", [req.params.id]);
    c.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Scheme not found" });
    }

    res.json({ success: true, message: "Attendance capture scheme deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
