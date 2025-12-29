/**
 * PRE-ONBOARDING TASKS ROUTES
 * Manages pre-onboarding task templates and assignments
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr } = require("../middleware/auth");

/* ============ TASK TEMPLATES ============ */

// Create pre-onboarding task template
router.post("/tasks", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const taskData = {
            task_name: req.body.task_name,
            description: req.body.description,
            task_category: req.body.task_category,
            is_mandatory: req.body.is_mandatory !== undefined ? req.body.is_mandatory : 1,
            task_order: req.body.task_order,
            auto_assign: req.body.auto_assign !== undefined ? req.body.auto_assign : 1,
            assigned_to_role: req.body.assigned_to_role || 'candidate'
        };
        
        const [result] = await c.query("INSERT INTO preonboarding_tasks SET ?", taskData);
        c.end();
        
        res.json({ 
            success: true, 
            task_id: result.insertId,
            message: "Pre-onboarding task created" 
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get all task templates
router.get("/tasks", auth, async (req, res) => {
    const c = await db();
    try {
        const [tasks] = await c.query(`
            SELECT * FROM preonboarding_tasks 
            ORDER BY task_order ASC, id ASC
        `);
        c.end();
        
        res.json(tasks);
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Update task template
router.put("/tasks/:id", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const updates = { ...req.body };
        delete updates.id;
        delete updates.created_at;
        
        await c.query("UPDATE preonboarding_tasks SET ? WHERE id = ?", [updates, req.params.id]);
        c.end();
        
        res.json({ success: true, message: "Task template updated" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Delete task template
router.delete("/tasks/:id", auth, hr, async (req, res) => {
    const c = await db();
    try {
        await c.query("DELETE FROM preonboarding_tasks WHERE id = ?", [req.params.id]);
        c.end();
        
        res.json({ success: true, message: "Task template deleted" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ TASK ASSIGNMENT ============ */

// Assign tasks to candidate
router.post("/assign/:candidateId", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const taskIds = req.body.task_ids; // Array of task IDs
        
        if (!taskIds || taskIds.length === 0) {
            // Assign all auto-assign tasks
            const [tasks] = await c.query(
                "SELECT id FROM preonboarding_tasks WHERE auto_assign = 1"
            );
            
            for (const task of tasks) {
                await c.query(`
                    INSERT INTO candidate_task_progress (candidate_id, task_id, status, assigned_date)
                    VALUES (?, ?, 'not_started', CURDATE())
                    ON DUPLICATE KEY UPDATE assigned_date = CURDATE()
                `, [req.params.candidateId, task.id]);
            }
        } else {
            // Assign specific tasks
            for (const taskId of taskIds) {
                await c.query(`
                    INSERT INTO candidate_task_progress (candidate_id, task_id, status, assigned_date)
                    VALUES (?, ?, 'not_started', CURDATE())
                    ON DUPLICATE KEY UPDATE assigned_date = CURDATE()
                `, [req.params.candidateId, taskId]);
            }
        }
        
        c.end();
        res.json({ success: true, message: "Tasks assigned to candidate" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Get candidate task progress
router.get("/progress/:candidateId", async (req, res) => {
    const c = await db();
    try {
        const [progress] = await c.query(`
            SELECT 
                ctp.*,
                pt.task_name,
                pt.description,
                pt.task_category,
                pt.is_mandatory,
                pt.assigned_to_role
            FROM candidate_task_progress ctp
            JOIN preonboarding_tasks pt ON ctp.task_id = pt.id
            WHERE ctp.candidate_id = ?
            ORDER BY pt.task_order ASC
        `, [req.params.candidateId]);
        
        const total = progress.length;
        const completed = progress.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        const completionPercentage = total > 0 ? ((completed / total) * 100).toFixed(2) : 0;
        
        c.end();
        
        res.json({
            tasks: progress,
            stats: {
                total,
                completed,
                pending,
                completion_percentage: completionPercentage
            }
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

// Update task progress (used by candidate)
router.put("/progress/:progressId", async (req, res) => {
    const c = await db();
    try {
        const updates = {
            status: req.body.status,
            remarks: req.body.remarks
        };
        
        if (req.body.status === 'in_progress' && !req.body.started_date) {
            updates.started_date = new Date();
        }
        
        if (req.body.status === 'completed') {
            updates.completed_date = new Date();
            if (req.user) {
                updates.completed_by = req.user.id;
            }
        }
        
        await c.query("UPDATE candidate_task_progress SET ? WHERE id = ?", 
            [updates, req.params.progressId]);
        
        c.end();
        res.json({ success: true, message: "Task progress updated" });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

/* ============ BULK TASK SETUP ============ */

// Create default pre-onboarding tasks (one-time setup)
router.post("/tasks/setup-defaults", auth, hr, async (req, res) => {
    const c = await db();
    try {
        const defaultTasks = [
            {
                task_name: "Accept Offer Letter",
                description: "Review and accept the offer letter",
                task_category: "form_filling",
                is_mandatory: 1,
                task_order: 1,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Photo",
                description: "Upload passport size photograph",
                task_category: "document_submission",
                is_mandatory: 1,
                task_order: 2,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Resume",
                description: "Upload updated resume",
                task_category: "document_submission",
                is_mandatory: 1,
                task_order: 3,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload ID Proof (PAN Card)",
                description: "Upload PAN Card copy",
                task_category: "document_submission",
                is_mandatory: 1,
                task_order: 4,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Address Proof (Aadhar Card)",
                description: "Upload Aadhar Card copy",
                task_category: "document_submission",
                is_mandatory: 1,
                task_order: 5,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Education Certificates",
                description: "Upload highest education degree certificate",
                task_category: "document_submission",
                is_mandatory: 1,
                task_order: 6,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Experience Certificates",
                description: "Upload all previous employment experience certificates",
                task_category: "document_submission",
                is_mandatory: 0,
                task_order: 7,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Relieving Letter",
                description: "Upload relieving letter from last employer",
                task_category: "document_submission",
                is_mandatory: 0,
                task_order: 8,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Last 3 Months Salary Slips",
                description: "Upload salary slips from previous employer",
                task_category: "document_submission",
                is_mandatory: 0,
                task_order: 9,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Upload Bank Passbook/Cancelled Cheque",
                description: "Upload bank details for salary credit",
                task_category: "document_submission",
                is_mandatory: 1,
                task_order: 10,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Fill Personal Information Form",
                description: "Complete personal and family details form",
                task_category: "form_filling",
                is_mandatory: 1,
                task_order: 11,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Emergency Contact Details",
                description: "Provide emergency contact information",
                task_category: "form_filling",
                is_mandatory: 1,
                task_order: 12,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Background Verification Consent",
                description: "Provide consent for background verification",
                task_category: "verification",
                is_mandatory: 1,
                task_order: 13,
                auto_assign: 1,
                assigned_to_role: "candidate"
            },
            {
                task_name: "Verify Documents",
                description: "HR to verify all submitted documents",
                task_category: "verification",
                is_mandatory: 1,
                task_order: 14,
                auto_assign: 1,
                assigned_to_role: "hr"
            },
            {
                task_name: "Initiate Background Verification",
                description: "Initiate BGV process",
                task_category: "verification",
                is_mandatory: 1,
                task_order: 15,
                auto_assign: 1,
                assigned_to_role: "hr"
            },
            {
                task_name: "Create System Accounts",
                description: "Create email and system access accounts",
                task_category: "system_setup",
                is_mandatory: 1,
                task_order: 16,
                auto_assign: 0,
                assigned_to_role: "admin"
            },
            {
                task_name: "Send Welcome Email",
                description: "Send welcome email with joining details",
                task_category: "other",
                is_mandatory: 1,
                task_order: 17,
                auto_assign: 0,
                assigned_to_role: "hr"
            }
        ];
        
        for (const task of defaultTasks) {
            await c.query("INSERT INTO preonboarding_tasks SET ?", task);
        }
        
        c.end();
        res.json({ 
            success: true, 
            message: `${defaultTasks.length} default pre-onboarding tasks created` 
        });
    } catch (error) {
        c.end();
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
