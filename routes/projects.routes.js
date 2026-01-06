/**
 * PROJECT MANAGEMENT ROUTES
 * Handles project CRUD, shifts, and employee assignments
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr, manager } = require("../middleware/auth");

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

// Convert ISO datetime string to MySQL DATE format (YYYY-MM-DD)
function formatDateForMySQL(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split('T')[0];
}

/* ============================================
   PROJECT MANAGEMENT
   ============================================ */

// Create new project
router.post("/", auth, hr, async (req, res) => {
    try {
        const { 
            project_code, 
            project_name, 
            client_name, 
            start_date, 
            end_date, 
            status, 
            description,
            project_manager_id
        } = req.body;

        if (!project_code || !project_name || !client_name || !start_date) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const c = await db();

        // Check if project code already exists
        const [existing] = await c.query(
            "SELECT id FROM projects WHERE project_code = ?",
            [project_code]
        );

        if (existing.length > 0) {
            c.end();
            return res.status(400).json({ error: "Project code already exists" });
        }

        const [result] = await c.query(
            `INSERT INTO projects 
            (project_code, project_name, client_name, start_date, end_date, status, description, project_manager_id, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [project_code, project_name, client_name, formatDateForMySQL(start_date), formatDateForMySQL(end_date), status || 'active', description, project_manager_id, req.user.id]
        );

        c.end();

        res.json({
            success: true,
            message: "Project created successfully",
            project: {
                id: result.insertId,
                project_code,
                project_name,
                client_name,
                start_date,
                end_date,
                status: status || 'active',
                description,
                project_manager_id
            }
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get all projects
router.get("/", auth, async (req, res) => {
    try {
        const { status, client_name } = req.query;
        const c = await db();

        let query = `
            SELECT 
                p.*,
                CONCAT(pm.FirstName, ' ', pm.LastName) as manager_name,
                pm.EmployeeNumber as manager_code,
                COUNT(DISTINCT pa.id) as total_employees
            FROM projects p
            LEFT JOIN employees pm ON p.project_manager_id = pm.id
            LEFT JOIN project_assignments pa ON p.id = pa.project_id AND pa.status = 'active'
            WHERE 1=1
        `;

        const params = [];

        if (status) {
            query += " AND p.status = ?";
            params.push(status);
        }

        if (client_name) {
            query += " AND p.client_name LIKE ?";
            params.push(`%${client_name}%`);
        }

        query += " GROUP BY p.id ORDER BY p.created_at DESC";

        const [projects] = await c.query(query, params);
        c.end();

        res.json({
            success: true,
            projects: projects
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get project details
router.get("/:id", auth, async (req, res) => {
    try {
        const c = await db();

        const [projects] = await c.query(
            `SELECT 
                p.*,
                CONCAT(pm.FirstName, ' ', pm.LastName) as project_manager_name,
                pm.WorkEmail as project_manager_email,
                COUNT(DISTINCT pa.id) as total_assigned,
                COUNT(DISTINCT CASE WHEN pa.status = 'active' THEN pa.id END) as active_assignments
            FROM projects p
            LEFT JOIN employees pm ON p.project_manager_id = pm.id
            LEFT JOIN project_assignments pa ON p.id = pa.project_id
            WHERE p.id = ?
            GROUP BY p.id`,
            [req.params.id]
        );

        if (projects.length === 0) {
            c.end();
            return res.status(404).json({ error: "Project not found" });
        }

        // Get shifts
        const [shifts] = await c.query(
            "SELECT * FROM project_shifts WHERE project_id = ? ORDER BY shift_name",
            [req.params.id]
        );

        // Get team assignments
        const [assignments] = await c.query(
            `SELECT 
                pa.*,
                e.EmployeeNumber,
                e.FirstName,
                e.LastName,
                e.WorkEmail,
                d.name as designation_name,
                ps.shift_name
            FROM project_assignments pa
            INNER JOIN employees e ON pa.employee_id = e.id
            LEFT JOIN designations d ON e.DesignationId = d.id
            LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
            WHERE pa.project_id = ?
            ORDER BY pa.status, e.FirstName`,
            [req.params.id]
        );

        c.end();

        res.json({
            success: true,
            project: {
                ...projects[0],
                shifts,
                assignments
            }
        });
    } catch (error) {
        console.error("Error fetching project details:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update project
router.put("/:id", auth, hr, async (req, res) => {
    try {
        const { 
            project_name, 
            client_name, 
            start_date, 
            end_date, 
            status, 
            description,
            project_manager_id
        } = req.body;

        const c = await db();

        const [existing] = await c.query("SELECT id FROM projects WHERE id = ?", [req.params.id]);
        
        if (existing.length === 0) {
            c.end();
            return res.status(404).json({ error: "Project not found" });
        }

        // Build dynamic UPDATE query based on provided fields
        const updates = [];
        const values = [];

        if (project_name !== undefined) {
            updates.push("project_name = ?");
            values.push(project_name);
        }
        if (client_name !== undefined) {
            updates.push("client_name = ?");
            values.push(client_name);
        }
        if (start_date !== undefined) {
            updates.push("start_date = ?");
            values.push(formatDateForMySQL(start_date));
        }
        if (end_date !== undefined) {
            updates.push("end_date = ?");
            values.push(formatDateForMySQL(end_date));
        }
        if (status !== undefined) {
            updates.push("status = ?");
            values.push(status);
        }
        if (description !== undefined) {
            updates.push("description = ?");
            values.push(description);
        }
        if (project_manager_id !== undefined) {
            updates.push("project_manager_id = ?");
            values.push(project_manager_id);
        }

        if (updates.length === 0) {
            c.end();
            return res.status(400).json({ error: "No fields to update" });
        }

        updates.push("updated_at = NOW()");
        values.push(req.params.id);

        const query = `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`;

        await c.query(query, values);

        c.end();

        res.json({
            success: true,
            message: "Project updated successfully"
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: error.message });
    }
});

// Delete/Close project
router.delete("/:id", auth, admin, async (req, res) => {
    try {
        const c = await db();

        // Check if project exists
        const [existing] = await c.query("SELECT id, status FROM projects WHERE id = ?", [req.params.id]);
        
        if (existing.length === 0) {
            c.end();
            return res.status(404).json({ error: "Project not found" });
        }

        // Mark as completed instead of deleting (soft delete)
        await c.query(
            "UPDATE projects SET status = 'completed', updated_at = NOW() WHERE id = ?",
            [req.params.id]
        );

        c.end();

        res.json({
            success: true,
            message: "Project marked as completed"
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   PROJECT SHIFTS
   ============================================ */

// Add shift to project
router.post("/:id/shifts", auth, hr, async (req, res) => {
    try {
        const { shift_type, shift_name, start_time, end_time, timezone, is_active } = req.body;

        if (!shift_name || !start_time || !end_time) {
            return res.status(400).json({ error: "Missing required shift fields" });
        }

        const c = await db();

        // Verify project exists
        const [project] = await c.query("SELECT id FROM projects WHERE id = ?", [req.params.id]);
        
        if (project.length === 0) {
            c.end();
            return res.status(404).json({ error: "Project not found" });
        }

        const [result] = await c.query(
            `INSERT INTO project_shifts 
            (project_id, shift_type, shift_name, start_time, end_time, timezone, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [req.params.id, shift_type || 'general', shift_name, start_time, end_time, timezone || 'UTC', is_active !== false ? 1 : 0]
        );

        c.end();

        res.json({
            success: true,
            message: "Shift added successfully",
            shift_id: result.insertId
        });
    } catch (error) {
        console.error("Error adding shift:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get project shifts
router.get("/:id/shifts", auth, async (req, res) => {
    try {
        const c = await db();

        const [shifts] = await c.query(
            "SELECT * FROM project_shifts WHERE project_id = ? ORDER BY shift_name",
            [req.params.id]
        );

        c.end();

        res.json(shifts);
    } catch (error) {
        console.error("Error fetching shifts:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update shift
router.put("/shifts/:shiftId", auth, hr, async (req, res) => {
    try {
        const { shift_name, start_time, end_time, timezone, is_active } = req.body;

        const c = await db();

        await c.query(
            `UPDATE project_shifts 
            SET shift_name = ?, start_time = ?, end_time = ?, timezone = ?, is_active = ?, updated_at = NOW()
            WHERE id = ?`,
            [shift_name, start_time, end_time, timezone, is_active ? 1 : 0, req.params.shiftId]
        );

        c.end();

        res.json({
            success: true,
            message: "Shift updated successfully"
        });
    } catch (error) {
        console.error("Error updating shift:", error);
        res.status(500).json({ error: error.message });
    }
});

/* ============================================
   PROJECT ASSIGNMENTS
   ============================================ */

// Assign employee to project
router.post("/:id/assignments", auth, hr, async (req, res) => {
    try {
        const { 
            employee_id, 
            shift_id, 
            assignment_start_date, 
            assignment_end_date,
            role_in_project,
            allocation_percentage
        } = req.body;

        if (!employee_id || !assignment_start_date) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const c = await db();

        // Check if employee exists
        const [employee] = await c.query("SELECT id FROM employees WHERE id = ?", [employee_id]);
        
        if (employee.length === 0) {
            c.end();
            return res.status(404).json({ error: "Employee not found" });
        }

        // Check for overlapping assignments
        const [overlapping] = await c.query(
            `SELECT id FROM project_assignments 
            WHERE employee_id = ? AND project_id = ? AND status = 'active'
            AND (
                (assignment_start_date <= ? AND (assignment_end_date IS NULL OR assignment_end_date >= ?))
                OR (assignment_start_date <= ? AND (assignment_end_date IS NULL OR assignment_end_date >= ?))
            )`,
            [employee_id, req.params.id, assignment_start_date, assignment_start_date, assignment_end_date || '9999-12-31', assignment_end_date || '9999-12-31']
        );

        if (overlapping.length > 0) {
            c.end();
            return res.status(400).json({ error: "Employee already assigned to this project in the given date range" });
        }

        const [result] = await c.query(
            `INSERT INTO project_assignments 
            (employee_id, project_id, shift_id, assignment_start_date, assignment_end_date, 
             role_in_project, allocation_percentage, status, assigned_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?)`,
            [employee_id, req.params.id, shift_id || null, assignment_start_date, assignment_end_date || null, 
             role_in_project, allocation_percentage || 100, req.user.id]
        );

        c.end();

        res.json({
            success: true,
            message: "Employee assigned to project successfully",
            assignment_id: result.insertId
        });
    } catch (error) {
        console.error("Error assigning employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get project assignments
router.get("/:id/assignments", auth, async (req, res) => {
    try {
        const { status } = req.query;
        const c = await db();

        let query = `
            SELECT 
                pa.*,
                e.EmployeeNumber,
                CONCAT(e.FirstName, ' ', e.LastName) as employee_name,
                e.WorkEmail,
                d.name as designation_name,
                dept.name as department_name,
                ps.shift_name,
                ps.start_time,
                ps.end_time
            FROM project_assignments pa
            INNER JOIN employees e ON pa.employee_id = e.id
            LEFT JOIN designations d ON e.DesignationId = d.id
            LEFT JOIN departments dept ON e.DepartmentId = dept.id
            LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
            WHERE pa.project_id = ?
        `;

        const params = [req.params.id];

        if (status) {
            query += " AND pa.status = ?";
            params.push(status);
        }

        query += " ORDER BY e.FirstName, e.LastName";

        const [assignments] = await c.query(query, params);
        c.end();

        res.json(assignments);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update assignment
router.put("/assignments/:assignmentId", auth, hr, async (req, res) => {
    try {
        const { 
            shift_id, 
            assignment_end_date,
            role_in_project,
            allocation_percentage,
            status
        } = req.body;

        const c = await db();

        await c.query(
            `UPDATE project_assignments 
            SET shift_id = ?, assignment_end_date = ?, role_in_project = ?, 
                allocation_percentage = ?, status = ?, updated_at = NOW()
            WHERE id = ?`,
            [shift_id, assignment_end_date, role_in_project, allocation_percentage, status, req.params.assignmentId]
        );

        c.end();

        res.json({
            success: true,
            message: "Assignment updated successfully"
        });
    } catch (error) {
        console.error("Error updating assignment:", error);
        res.status(500).json({ error: error.message });
    }
});

// Remove employee from project
router.delete("/assignments/:assignmentId", auth, hr, async (req, res) => {
    try {
        const c = await db();

        // Mark as completed instead of deleting
        await c.query(
            `UPDATE project_assignments 
            SET status = 'completed', assignment_end_date = CURDATE(), updated_at = NOW()
            WHERE id = ?`,
            [req.params.assignmentId]
        );

        c.end();

        res.json({
            success: true,
            message: "Employee removed from project"
        });
    } catch (error) {
        console.error("Error removing employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get employee's current projects
router.get("/employee/:employeeId/projects", auth, async (req, res) => {
    try {
        const c = await db();

        const [projects] = await c.query(
            `SELECT 
                p.*,
                pa.assignment_start_date,
                pa.assignment_end_date,
                pa.role_in_project,
                pa.allocation_percentage,
                pa.status as assignment_status,
                ps.shift_name,
                ps.start_time,
                ps.end_time
            FROM project_assignments pa
            INNER JOIN projects p ON pa.project_id = p.id
            LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
            WHERE pa.employee_id = ? AND pa.status = 'active'
            ORDER BY pa.assignment_start_date DESC`,
            [req.params.employeeId]
        );

        c.end();

        res.json(projects);
    } catch (error) {
        console.error("Error fetching employee projects:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
