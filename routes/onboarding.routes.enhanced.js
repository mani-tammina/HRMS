/**
 * ENHANCED ONBOARDING ROUTES
 * Complete onboarding management with events, buddies, and assets
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { db } = require("../config/database");
const { auth, admin, hr } = require("../middleware/auth");

/* ============ EXISTING ONBOARDING STEPS (ENHANCED) ============ */

// Set password for new employees
router.post("/set-password", async (req, res) => {
    const c = await db();
    try {
        const { username, password, confirm_password } = req.body;
        
        if (password !== confirm_password) {
            c.end();
            return res.status(400).json({ error: "Passwords do not match" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await c.query(
            "UPDATE users SET password = ?, password_set = 1 WHERE username = ?",
            [hashedPassword, username]
        );
        
        c.end();
        res.json({ success: true, message: "Password set successfully" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Create onboarding step
router.post("/step", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const stepData = {
            step_name: req.body.step_name,
            description: req.body.description,
            step_order: req.body.step_order,
            required: req.body.required !== undefined ? req.body.required : 1
        };
        
        const [result] = await c.query("INSERT INTO onboarding_steps SET ?", stepData);
        c.end();
        
        res.json({ 
            success: true, 
            step_id: result.insertId,
            message: "Onboarding step created" 
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get all onboarding steps
router.get("/steps", auth, async (req, res) => {
    const c = await db();
    try {
        const [steps] = await c.query(
            "SELECT * FROM onboarding_steps ORDER BY step_order"
        );
        c.end();
        
        res.json(steps);
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Update onboarding step
router.put("/step/:id", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const updates = { ...req.body };
        delete updates.id;
        
        await c.query("UPDATE onboarding_steps SET ? WHERE id = ?", [updates, req.params.id]);
        c.end();
        
        res.json({ success: true, message: "Step updated" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Delete onboarding step
router.delete("/step/:id", auth, admin, async (req, res) => {
    const c = await db();
    try {
        await c.query("DELETE FROM onboarding_steps WHERE id = ?", [req.params.id]);
        c.end();
        
        res.json({ success: true, message: "Step deleted" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Assign all steps to employee
router.post("/assign/:empId", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const [steps] = await c.query("SELECT id FROM onboarding_steps ORDER BY step_order");
        
        for (const step of steps) {
            await c.query(`
                INSERT INTO onboarding_progress (employee_id, step_id, status)
                VALUES (?, ?, 'not_started')
                ON DUPLICATE KEY UPDATE status = status
            `, [req.params.empId, step.id]);
        }
        
        c.end();
        res.json({ success: true, message: "Onboarding steps assigned" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Mark step as complete
router.put("/complete/:stepId", auth, async (req, res) => {
    const c = await db();
    try {
        const empId = req.user.employee_id || req.body.employee_id;
        
        await c.query(`
            UPDATE onboarding_progress SET 
                status = 'completed',
                completed_date = CURDATE(),
                remarks = ?
            WHERE employee_id = ? AND step_id = ?
        `, [req.body.remarks, empId, req.params.stepId]);
        
        c.end();
        res.json({ success: true, message: "Step marked as complete" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get employee onboarding status
router.get("/status/:empId", auth, async (req, res) => {
    const c = await db();
    try {
        const [progress] = await c.query(`
            SELECT 
                op.*,
                os.step_name,
                os.description,
                os.step_order,
                os.required
            FROM onboarding_progress op
            JOIN onboarding_steps os ON op.step_id = os.id
            WHERE op.employee_id = ?
            ORDER BY os.step_order
        `, [req.params.empId]);
        
        const total = progress.length;
        const completed = progress.filter(s => s.status === 'completed').length;
        const completionPercentage = total > 0 ? ((completed / total) * 100).toFixed(2) : 0;
        
        c.end();
        
        res.json({
            steps: progress,
            stats: {
                total,
                completed,
                pending: total - completed,
                completion_percentage: completionPercentage
            }
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ NEW: ONBOARDING EVENTS ============ */

// Create onboarding event
router.post("/events", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const eventData = {
            employee_id: req.body.employee_id,
            event_type: req.body.event_type,
            event_title: req.body.event_title,
            event_description: req.body.event_description,
            event_date: req.body.event_date,
            event_time: req.body.event_time,
            status: req.body.status || 'scheduled',
            assigned_to: req.body.assigned_to,
            location: req.body.location,
            meeting_link: req.body.meeting_link,
            created_by: req.user.id
        };
        
        const [result] = await c.query("INSERT INTO onboarding_events SET ?", eventData);
        c.end();
        
        res.json({ 
            success: true, 
            event_id: result.insertId,
            message: "Onboarding event created" 
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get employee events
router.get("/events/:empId", auth, async (req, res) => {
    const c = await db();
    try {
        const [events] = await c.query(`
            SELECT 
                oe.*,
                CONCAT(e.FirstName, ' ', e.LastName) as assigned_to_name
            FROM onboarding_events oe
            LEFT JOIN employees e ON oe.assigned_to = e.id
            WHERE oe.employee_id = ?
            ORDER BY oe.event_date ASC, oe.event_time ASC
        `, [req.params.empId]);
        
        c.end();
        res.json(events);
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Update event status
router.put("/events/:id", auth, async (req, res) => {
    const c = await db();
    try {
        const updates = { ...req.body };
        
        if (updates.status === 'completed') {
            updates.completed_date = new Date();
        }
        
        await c.query("UPDATE onboarding_events SET ? WHERE id = ?", [updates, req.params.id]);
        c.end();
        
        res.json({ success: true, message: "Event updated" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ NEW: BUDDY SYSTEM ============ */

// Assign buddy
router.post("/buddy/assign", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const buddyData = {
            new_employee_id: req.body.new_employee_id,
            buddy_employee_id: req.body.buddy_employee_id,
            assigned_date: req.body.assigned_date || new Date(),
            is_active: 1
        };
        
        const [result] = await c.query("INSERT INTO onboarding_buddies SET ?", buddyData);
        c.end();
        
        res.json({ 
            success: true, 
            buddy_assignment_id: result.insertId,
            message: "Buddy assigned successfully" 
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get employee buddy
router.get("/buddy/:empId", auth, async (req, res) => {
    const c = await db();
    try {
        const [buddies] = await c.query(`
            SELECT 
                ob.*,
                CONCAT(e.FirstName, ' ', e.LastName) as buddy_name,
                e.WorkEmail as buddy_email,
                d.name as buddy_department,
                des.name as buddy_designation
            FROM onboarding_buddies ob
            JOIN employees e ON ob.buddy_employee_id = e.id
            LEFT JOIN departments d ON e.DepartmentId = d.id
            LEFT JOIN designations des ON e.DesignationId = des.id
            WHERE ob.new_employee_id = ? AND ob.is_active = 1
        `, [req.params.empId]);
        
        c.end();
        
        if (buddies.length > 0) {
            res.json(buddies[0]);
        } else {
            res.json(null);
        }
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Submit buddy feedback
router.put("/buddy/:id/feedback", auth, async (req, res) => {
    const c = await db();
    try {
        const updates = {};
        
        if (req.body.buddy_feedback) {
            updates.buddy_feedback = req.body.buddy_feedback;
        }
        if (req.body.new_employee_feedback) {
            updates.new_employee_feedback = req.body.new_employee_feedback;
        }
        
        await c.query("UPDATE onboarding_buddies SET ? WHERE id = ?", [updates, req.params.id]);
        c.end();
        
        res.json({ success: true, message: "Feedback submitted" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ NEW: ASSET ALLOCATION ============ */

// Allocate asset to employee
router.post("/assets", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const assetData = {
            employee_id: req.body.employee_id,
            asset_type: req.body.asset_type,
            asset_name: req.body.asset_name,
            asset_id: req.body.asset_id,
            serial_number: req.body.serial_number,
            brand: req.body.brand,
            model: req.body.model,
            allocated_date: req.body.allocated_date || new Date(),
            condition_at_allocation: req.body.condition_at_allocation || 'good',
            allocation_remarks: req.body.allocation_remarks,
            status: 'allocated',
            allocated_by: req.user.id
        };
        
        const [result] = await c.query("INSERT INTO asset_allocations SET ?", assetData);
        c.end();
        
        res.json({ 
            success: true, 
            asset_allocation_id: result.insertId,
            message: "Asset allocated successfully" 
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get employee assets
router.get("/assets/:empId", auth, async (req, res) => {
    const c = await db();
    try {
        const [assets] = await c.query(`
            SELECT * FROM asset_allocations 
            WHERE employee_id = ?
            ORDER BY allocated_date DESC
        `, [req.params.empId]);
        
        c.end();
        res.json(assets);
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Return asset
router.put("/assets/:id/return", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const updates = {
            returned_date: req.body.returned_date || new Date(),
            condition_at_return: req.body.condition_at_return,
            return_remarks: req.body.return_remarks,
            status: 'returned',
            received_by: req.user.id
        };
        
        await c.query("UPDATE asset_allocations SET ? WHERE id = ?", [updates, req.params.id]);
        c.end();
        
        res.json({ success: true, message: "Asset returned successfully" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ ONBOARDING DASHBOARD ============ */

router.get("/dashboard/:empId", auth, async (req, res) => {
    const c = await db();
    try {
        // Get onboarding steps progress
        const [steps] = await c.query(`
            SELECT 
                op.*,
                os.step_name,
                os.step_order
            FROM onboarding_progress op
            JOIN onboarding_steps os ON op.step_id = os.id
            WHERE op.employee_id = ?
            ORDER BY os.step_order
        `, [req.params.empId]);
        
        // Get upcoming events
        const [events] = await c.query(`
            SELECT * FROM onboarding_events 
            WHERE employee_id = ? AND status != 'completed'
            AND event_date >= CURDATE()
            ORDER BY event_date ASC, event_time ASC
            LIMIT 5
        `, [req.params.empId]);
        
        // Get buddy
        const [buddies] = await c.query(`
            SELECT 
                ob.*,
                CONCAT(e.FirstName, ' ', e.LastName) as buddy_name,
                e.WorkEmail as buddy_email
            FROM onboarding_buddies ob
            JOIN employees e ON ob.buddy_employee_id = e.id
            WHERE ob.new_employee_id = ? AND ob.is_active = 1
        `, [req.params.empId]);
        
        // Get allocated assets
        const [assets] = await c.query(`
            SELECT * FROM asset_allocations 
            WHERE employee_id = ? AND status = 'allocated'
        `, [req.params.empId]);
        
        const totalSteps = steps.length;
        const completedSteps = steps.filter(s => s.status === 'completed').length;
        
        c.end();
        
        res.json({
            progress: {
                total_steps: totalSteps,
                completed_steps: completedSteps,
                pending_steps: totalSteps - completedSteps,
                completion_percentage: totalSteps > 0 ? ((completedSteps / totalSteps) * 100).toFixed(2) : 0
            },
            steps,
            upcoming_events: events,
            buddy: buddies.length > 0 ? buddies[0] : null,
            allocated_assets: assets
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
