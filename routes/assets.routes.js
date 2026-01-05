/**
 * ASSET MANAGEMENT ROUTES
 * Handles asset allocation, return, and tracking
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr } = require("../middleware/auth");

/* ============================================
   ASSET ALLOCATION
   ============================================ */

// Allocate asset to employee
router.post("/allocate", auth, hr, async (req, res) => {
    try {
        const {
            employee_id,
            asset_type,
            asset_name,
            asset_id,
            serial_number,
            brand,
            model,
            allocated_date,
            expected_return_date,
            condition_at_allocation,
            allocation_remarks
        } = req.body;

        if (!employee_id || !asset_type || !asset_name || !allocated_date) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const c = await db();

        // Verify employee exists
        const [employee] = await c.query("SELECT id FROM employees WHERE id = ?", [employee_id]);
        
        if (employee.length === 0) {
            c.end();
            return res.status(404).json({ error: "Employee not found" });
        }

        // Check if asset_id already allocated to another employee
        if (asset_id) {
            const [existingAsset] = await c.query(
                `SELECT id, employee_id FROM asset_allocations 
                WHERE asset_id = ? AND status = 'allocated'`,
                [asset_id]
            );

            if (existingAsset.length > 0) {
                c.end();
                return res.status(400).json({ 
                    error: "Asset already allocated to another employee",
                    allocated_to: existingAsset[0].employee_id
                });
            }
        }

        const [result] = await c.query(
            `INSERT INTO asset_allocations 
            (employee_id, asset_type, asset_name, asset_id, serial_number, brand, model,
             allocated_date, expected_return_date, condition_at_allocation, allocation_remarks, 
             status, allocated_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'allocated', ?)`,
            [employee_id, asset_type, asset_name, asset_id, serial_number, brand, model,
             allocated_date, expected_return_date, condition_at_allocation || 'good', 
             allocation_remarks, req.user.id]
        );

        c.end();

        res.json({
            success: true,
            message: "Asset allocated successfully",
            allocation_id: result.insertId
        });
    } catch (error) {
        console.error("Error allocating asset:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get employee's assets
router.get("/employee/:id", auth, async (req, res) => {
    try {
        const { status } = req.query;
        const c = await db();

        let query = `
            SELECT 
                aa.*,
                CONCAT(allocated_by_user.username) as allocated_by_name,
                CONCAT(received_by_user.username) as received_by_name
            FROM asset_allocations aa
            LEFT JOIN users allocated_by_user ON aa.allocated_by = allocated_by_user.id
            LEFT JOIN users received_by_user ON aa.received_by = received_by_user.id
            WHERE aa.employee_id = ?
        `;

        const params = [req.params.id];

        if (status) {
            query += " AND aa.status = ?";
            params.push(status);
        }

        query += " ORDER BY aa.allocated_date DESC";

        const [assets] = await c.query(query, params);
        c.end();

        res.json(assets);
    } catch (error) {
        console.error("Error fetching employee assets:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get all assets
router.get("/", auth, hr, async (req, res) => {
    try {
        const { status, asset_type, employee_id } = req.query;
        const c = await db();

        let query = `
            SELECT 
                aa.*,
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as employee_name,
                e.WorkEmail,
                d.name as department_name,
                des.name as designation_name
            FROM asset_allocations aa
            INNER JOIN employees e ON aa.employee_id = e.id
            LEFT JOIN departments d ON e.DepartmentId = d.id
            LEFT JOIN designations des ON e.DesignationId = des.id
            WHERE 1=1
        `;

        const params = [];

        if (status) {
            query += " AND aa.status = ?";
            params.push(status);
        }

        if (asset_type) {
            query += " AND aa.asset_type = ?";
            params.push(asset_type);
        }

        if (employee_id) {
            query += " AND aa.employee_id = ?";
            params.push(employee_id);
        }

        query += " ORDER BY aa.allocated_date DESC";

        const [assets] = await c.query(query, params);
        c.end();

        res.json(assets);
    } catch (error) {
        console.error("Error fetching assets:", error);
        res.status(500).json({ error: error.message });
    }
});

// Return asset
router.put("/:id/return", auth, hr, async (req, res) => {
    try {
        const { 
            returned_date, 
            condition_at_return, 
            return_remarks 
        } = req.body;

        if (!returned_date || !condition_at_return) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const c = await db();

        // Verify asset exists and is allocated
        const [asset] = await c.query(
            "SELECT id, status FROM asset_allocations WHERE id = ?",
            [req.params.id]
        );

        if (asset.length === 0) {
            c.end();
            return res.status(404).json({ error: "Asset allocation not found" });
        }

        if (asset[0].status === 'returned') {
            c.end();
            return res.status(400).json({ error: "Asset already returned" });
        }

        await c.query(
            `UPDATE asset_allocations 
            SET returned_date = ?, condition_at_return = ?, return_remarks = ?, 
                status = 'returned', received_by = ?, updated_at = NOW()
            WHERE id = ?`,
            [returned_date, condition_at_return, return_remarks, req.user.id, req.params.id]
        );

        c.end();

        res.json({
            success: true,
            message: "Asset returned successfully"
        });
    } catch (error) {
        console.error("Error returning asset:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update asset status
router.put("/:id/status", auth, hr, async (req, res) => {
    try {
        const { status, remarks } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        const validStatuses = ['allocated', 'returned', 'damaged', 'lost', 'under_repair'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const c = await db();

        const [asset] = await c.query(
            "SELECT id FROM asset_allocations WHERE id = ?",
            [req.params.id]
        );

        if (asset.length === 0) {
            c.end();
            return res.status(404).json({ error: "Asset allocation not found" });
        }

        await c.query(
            `UPDATE asset_allocations 
            SET status = ?, return_remarks = ?, updated_at = NOW()
            WHERE id = ?`,
            [status, remarks, req.params.id]
        );

        c.end();

        res.json({
            success: true,
            message: "Asset status updated successfully"
        });
    } catch (error) {
        console.error("Error updating asset status:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get asset allocation reports
router.get("/reports", auth, hr, async (req, res) => {
    try {
        const c = await db();

        // Summary statistics
        const [summary] = await c.query(`
            SELECT 
                COUNT(*) as total_allocations,
                COUNT(CASE WHEN status = 'allocated' THEN 1 END) as currently_allocated,
                COUNT(CASE WHEN status = 'returned' THEN 1 END) as returned,
                COUNT(CASE WHEN status = 'damaged' THEN 1 END) as damaged,
                COUNT(CASE WHEN status = 'lost' THEN 1 END) as lost,
                COUNT(CASE WHEN status = 'under_repair' THEN 1 END) as under_repair
            FROM asset_allocations
        `);

        // By asset type
        const [byType] = await c.query(`
            SELECT 
                asset_type,
                COUNT(*) as total_count,
                COUNT(CASE WHEN status = 'allocated' THEN 1 END) as allocated_count,
                COUNT(CASE WHEN status = 'returned' THEN 1 END) as returned_count
            FROM asset_allocations
            GROUP BY asset_type
            ORDER BY total_count DESC
        `);

        // By department
        const [byDepartment] = await c.query(`
            SELECT 
                d.name as department_name,
                COUNT(aa.id) as total_assets,
                COUNT(CASE WHEN aa.status = 'allocated' THEN 1 END) as allocated_count
            FROM asset_allocations aa
            INNER JOIN employees e ON aa.employee_id = e.id
            LEFT JOIN departments d ON e.DepartmentId = d.id
            WHERE aa.status = 'allocated'
            GROUP BY d.id, d.name
            ORDER BY total_assets DESC
        `);

        // Overdue returns
        const [overdue] = await c.query(`
            SELECT 
                aa.*,
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as employee_name,
                e.WorkEmail,
                DATEDIFF(CURDATE(), aa.expected_return_date) as days_overdue
            FROM asset_allocations aa
            INNER JOIN employees e ON aa.employee_id = e.id
            WHERE aa.status = 'allocated' 
            AND aa.expected_return_date IS NOT NULL
            AND aa.expected_return_date < CURDATE()
            ORDER BY days_overdue DESC
        `);

        c.end();

        res.json({
            summary: summary[0],
            by_asset_type: byType,
            by_department: byDepartment,
            overdue_returns: overdue
        });
    } catch (error) {
        console.error("Error fetching asset reports:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get asset details
router.get("/:id", auth, async (req, res) => {
    try {
        const c = await db();

        const [assets] = await c.query(
            `SELECT 
                aa.*,
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as employee_name,
                e.WorkEmail,
                d.name as department_name,
                des.name as designation_name,
                CONCAT(allocated_by_user.username) as allocated_by_name,
                CONCAT(received_by_user.username) as received_by_name
            FROM asset_allocations aa
            INNER JOIN employees e ON aa.employee_id = e.id
            LEFT JOIN departments d ON e.DepartmentId = d.id
            LEFT JOIN designations des ON e.DesignationId = des.id
            LEFT JOIN users allocated_by_user ON aa.allocated_by = allocated_by_user.id
            LEFT JOIN users received_by_user ON aa.received_by = received_by_user.id
            WHERE aa.id = ?`,
            [req.params.id]
        );

        if (assets.length === 0) {
            c.end();
            return res.status(404).json({ error: "Asset allocation not found" });
        }

        c.end();

        res.json(assets[0]);
    } catch (error) {
        console.error("Error fetching asset details:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
