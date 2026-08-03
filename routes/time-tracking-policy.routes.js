const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, roleAuth } = require("../middleware/auth");

// Helper to initialize tables
async function ensureTablesExist() {
  const c = await db();
  try {
    // Check if biometric_settings column exists in time_tracking_policies
    const [allCols] = await c.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'time_tracking_policies'
    `);

    if (allCols.length > 0) {
      const hasBiometric = allCols.some(ac => ac.COLUMN_NAME === 'biometric_settings');
      if (!hasBiometric) {
        // If it only has 2, 3 or 4 columns, it's a dummy table. We can drop and re-create safely.
        if (allCols.length <= 4) {
          console.log("Dummy time_tracking_policies table detected. Dropping and re-creating...");
          await c.query("DROP TABLE IF EXISTS time_tracking_policy_sites");
          await c.query("DROP TABLE IF EXISTS time_tracking_policies");
        } else {
          // Alter table to add missing columns
          console.log("Altering time_tracking_policies table...");
          const colsToAdd = [
            { name: "description", type: "TEXT NULL" },
            { name: "status", type: "ENUM('active', 'inactive') DEFAULT 'active'" },
            { name: "effective_date", type: "DATE NOT NULL" },
            { name: "biometric_settings", type: "JSON NULL" },
            { name: "remote_punch_settings", type: "JSON NULL" },
            { name: "wfh_settings", type: "JSON NULL" },
            { name: "regularization_settings", type: "JSON NULL" }
          ];
          
          for (const col of colsToAdd) {
            const hasCol = allCols.some(ac => ac.COLUMN_NAME === col.name);
            if (!hasCol) {
              await c.query(`ALTER TABLE time_tracking_policies ADD COLUMN ${col.name} ${col.type}`);
            }
          }
        }
      }
    }

    // 1. time_tracking_policies
    await c.query(`
      CREATE TABLE IF NOT EXISTS time_tracking_policies (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        effective_date DATE NOT NULL,
        biometric_settings JSON NULL,
        remote_punch_settings JSON NULL,
        wfh_settings JSON NULL,
        regularization_settings JSON NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. time_tracking_policy_sites (junction table)
    await c.query(`
      CREATE TABLE IF NOT EXISTS time_tracking_policy_sites (
        policy_id INT NOT NULL,
        site_id INT NOT NULL,
        PRIMARY KEY (policy_id, site_id),
        FOREIGN KEY (policy_id) REFERENCES time_tracking_policies(id) ON DELETE CASCADE,
        FOREIGN KEY (site_id) REFERENCES locations(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } catch (err) {
    console.error("Failed to initialize time tracking policy tables:", err.message);
  } finally {
    c.end();
  }
}

// Initialize tables on load
ensureTablesExist();

// Helper to parse JSON values safely
function parseJsonField(val) {
  if (!val) return null;
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  return val;
}

// Helper to format a policy row
function formatPolicyRow(row) {
  return {
    ...row,
    site_ids: row.site_ids ? row.site_ids.split(",").map(Number) : [],
    sites: row.site_names ? row.site_names.split(",").map((name, i) => ({
      id: row.site_ids.split(",").map(Number)[i],
      name
    })) : [],
    biometric_settings: parseJsonField(row.biometric_settings),
    remote_punch_settings: parseJsonField(row.remote_punch_settings),
    wfh_settings: parseJsonField(row.wfh_settings),
    regularization_settings: parseJsonField(row.regularization_settings)
  };
}

/**
 * GET /api/time-tracking-policies
 * Get all policies
 */
router.get("/", auth, roleAuth(["admin", "hr", "manager", "employee"]), async (req, res) => {
  try {
    const c = await db();
    const [rows] = await c.query(`
      SELECT p.*, 
             GROUP_CONCAT(s.site_id) AS site_ids,
             GROUP_CONCAT(l.name) AS site_names
      FROM time_tracking_policies p
      LEFT JOIN time_tracking_policy_sites s ON p.id = s.policy_id
      LEFT JOIN locations l ON s.site_id = l.id
      GROUP BY p.id
      ORDER BY p.id DESC
    `);
    c.end();

    const formatted = rows.map(formatPolicyRow);
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/time-tracking-policies/:id
 * Get policy by ID
 */
router.get("/:id", auth, roleAuth(["admin", "hr", "manager", "employee"]), async (req, res) => {
  try {
    const c = await db();
    const [rows] = await c.query(`
      SELECT p.*, 
             GROUP_CONCAT(s.site_id) AS site_ids,
             GROUP_CONCAT(l.name) AS site_names
      FROM time_tracking_policies p
      LEFT JOIN time_tracking_policy_sites s ON p.id = s.policy_id
      LEFT JOIN locations l ON s.site_id = l.id
      WHERE p.id = ?
      GROUP BY p.id
    `, [req.params.id]);
    c.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Policy not found" });
    }

    res.json(formatPolicyRow(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/time-tracking-policies
 * Create a new policy
 */
router.post("/", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      effective_date,
      site_ids,
      biometric_settings,
      remote_punch_settings,
      wfh_settings,
      regularization_settings
    } = req.body;

    if (!name || !effective_date) {
      return res.status(400).json({ error: "name and effective_date are required" });
    }

    const c = await db();

    // Check for duplicate name
    const [existing] = await c.query("SELECT id FROM time_tracking_policies WHERE name = ?", [name]);
    if (existing.length > 0) {
      c.end();
      return res.status(409).json({ error: "A policy with this name already exists" });
    }

    const formattedDate = typeof effective_date === "string" && effective_date.includes("T")
      ? effective_date.split("T")[0]
      : effective_date;

    // Insert policy row
    const [result] = await c.query(
      `INSERT INTO time_tracking_policies 
       (name, description, status, effective_date, biometric_settings, remote_punch_settings, wfh_settings, regularization_settings) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        status || "active",
        formattedDate,
        biometric_settings ? JSON.stringify(biometric_settings) : null,
        remote_punch_settings ? JSON.stringify(remote_punch_settings) : null,
        wfh_settings ? JSON.stringify(wfh_settings) : null,
        regularization_settings ? JSON.stringify(regularization_settings) : null
      ]
    );

    const policyId = result.insertId;

    // Insert site links if provided
    if (site_ids && Array.isArray(site_ids) && site_ids.length > 0) {
      const values = site_ids.map(siteId => [policyId, siteId]);
      await c.query("INSERT INTO time_tracking_policy_sites (policy_id, site_id) VALUES ?", [values]);
    }

    c.end();
    res.status(201).json({ success: true, message: "Policy created successfully", id: policyId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/time-tracking-policies/:id
 * Update policy by ID
 */
router.put("/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      effective_date,
      site_ids,
      biometric_settings,
      remote_punch_settings,
      wfh_settings,
      regularization_settings
    } = req.body;

    if (!name || !effective_date) {
      return res.status(400).json({ error: "name and effective_date are required" });
    }

    const c = await db();

    // Check duplicate name excluding current policy
    const [existing] = await c.query("SELECT id FROM time_tracking_policies WHERE name = ? AND id != ?", [name, req.params.id]);
    if (existing.length > 0) {
      c.end();
      return res.status(409).json({ error: "Another policy with this name already exists" });
    }

    const formattedDate = typeof effective_date === "string" && effective_date.includes("T")
      ? effective_date.split("T")[0]
      : effective_date;

    // Update main row
    const [result] = await c.query(
      `UPDATE time_tracking_policies 
       SET name = ?, description = ?, status = ?, effective_date = ?, 
           biometric_settings = ?, remote_punch_settings = ?, wfh_settings = ?, regularization_settings = ? 
       WHERE id = ?`,
      [
        name,
        description || null,
        status || "active",
        formattedDate,
        biometric_settings ? JSON.stringify(biometric_settings) : null,
        remote_punch_settings ? JSON.stringify(remote_punch_settings) : null,
        wfh_settings ? JSON.stringify(wfh_settings) : null,
        regularization_settings ? JSON.stringify(regularization_settings) : null,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      c.end();
      return res.status(404).json({ error: "Policy not found" });
    }

    // Update site links: delete old ones, insert new ones
    await c.query("DELETE FROM time_tracking_policy_sites WHERE policy_id = ?", [req.params.id]);
    if (site_ids && Array.isArray(site_ids) && site_ids.length > 0) {
      const values = site_ids.map(siteId => [req.params.id, siteId]);
      await c.query("INSERT INTO time_tracking_policy_sites (policy_id, site_id) VALUES ?", [values]);
    }

    c.end();
    res.json({ success: true, message: "Policy updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/time-tracking-policies/:id
 * Delete policy
 */
router.delete("/:id", auth, roleAuth(["admin", "hr"]), async (req, res) => {
  try {
    const c = await db();
    const [result] = await c.query("DELETE FROM time_tracking_policies WHERE id = ?", [req.params.id]);
    c.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Policy not found" });
    }

    res.json({ success: true, message: "Policy deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
