/**
 * LEAVE ROUTES
 * Handles leave applications, approvals, types, and balance
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth, admin, hr } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

/* ============ LEAVE MANAGEMENT ============ */

// Get all leaves
router.get("/", auth, async (req, res) => {
    const c = await db();
    const [r] = await c.query("SELECT * FROM leaves ORDER BY id DESC");
    c.end();
    res.json(r);
});

// Apply leave
router.post("/", auth, async (req, res) => {
    const c = await db();
    const data = { ...req.body, applied_at: new Date() };
    const [result] = await c.query("INSERT INTO leaves SET ?", data);
    c.end();
    res.json({ id: result.insertId });
});

// Apply leave (alternate endpoint)
router.post("/apply", auth, async (req, res) => {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    
    const { leave_type, start_date, end_date, reason } = req.body;
    const c = await db();
    const [result] = await c.query("INSERT INTO leaves SET ?", {
        employee_id: emp.id,
        leave_type,
        start_date,
        end_date,
        reason,
        status: 'pending',
        applied_at: new Date()
    });
    c.end();
    res.json({ id: result.insertId, success: true });
});

// Update leave status
router.put("/:id", auth, admin, async (req, res) => {
    const { status } = req.body;
    const c = await db();
    await c.query("UPDATE leaves SET status = ? WHERE id = ?", [status, req.params.id]);
    c.end();
    res.json({ success: true });
});

// My leaves
router.get("/my", auth, async (req, res) => {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    
    const c = await db();
    const [r] = await c.query("SELECT * FROM leaves WHERE employee_id = ? ORDER BY applied_at DESC", [emp.id]);
    c.end();
    res.json(r);
});

// Cancel leave
router.put("/cancel/:leaveId", auth, async (req, res) => {
    const c = await db();
    await c.query("UPDATE leaves SET status = 'cancelled' WHERE id = ?", [req.params.leaveId]);
    c.end();
    res.json({ success: true });
});

// Pending leaves (HR)
router.get("/pending", auth, hr, async (req, res) => {
    const c = await db();
    const [r] = await c.query("SELECT * FROM leaves WHERE status = 'pending' ORDER BY applied_at ASC");
    c.end();
    res.json(r);
});

// Approve leave
router.put("/approve/:leaveId", auth, hr, async (req, res) => {
    const c = await db();
    await c.query("UPDATE leaves SET status = 'approved', approved_by = ?, approved_at = NOW() WHERE id = ?", 
        [req.user.id, req.params.leaveId]);
    c.end();
    res.json({ success: true });
});

// Reject leave
router.put("/reject/:leaveId", auth, hr, async (req, res) => {
    const c = await db();
    await c.query("UPDATE leaves SET status = 'rejected', approved_by = ?, approved_at = NOW() WHERE id = ?",
        [req.user.id, req.params.leaveId]);
    c.end();
    res.json({ success: true });
});

/* ============ WFH / REMOTE WORK REQUESTS ============ */

// Apply for WFH/Remote work
router.post("/wfh-request", auth, async (req, res) => {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    
    const { date, work_mode, reason } = req.body;
    
    // Validate work mode
    const validModes = ['WFH', 'Remote'];
    if (!validModes.includes(work_mode)) {
        return res.status(400).json({ error: "Invalid work mode. Use: WFH or Remote" });
    }
    
    const c = await db();
    
    // Check if already requested for this date
    const [existing] = await c.query(
        "SELECT id FROM leaves WHERE employee_id = ? AND start_date = ? AND leave_type IN ('WFH', 'Remote')",
        [emp.id, date]
    );
    
    if (existing.length > 0) {
        c.end();
        return res.status(400).json({ error: "WFH/Remote request already exists for this date" });
    }
    
    const [result] = await c.query("INSERT INTO leaves SET ?", {
        employee_id: emp.id,
        leave_type: work_mode,
        start_date: date,
        end_date: date,
        reason: reason || `${work_mode} request`,
        status: 'pending',
        applied_at: new Date()
    });
    
    c.end();
    res.json({ 
        id: result.insertId, 
        success: true,
        message: `${work_mode} request submitted successfully`,
        status: 'pending'
    });
});

// Get my WFH/Remote requests
router.get("/wfh-requests", auth, async (req, res) => {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    
    const c = await db();
    const [r] = await c.query(
        "SELECT * FROM leaves WHERE employee_id = ? AND leave_type IN ('WFH', 'Remote') ORDER BY applied_at DESC",
        [emp.id]
    );
    c.end();
    res.json(r);
});

// Get all pending WFH/Remote requests (HR/Manager)
router.get("/wfh-requests/pending", auth, hr, async (req, res) => {
    const c = await db();
    const [r] = await c.query(
        `SELECT l.*, e.FirstName, e.LastName, e.EmployeeNumber 
         FROM leaves l 
         LEFT JOIN employees e ON l.employee_id = e.id 
         WHERE l.leave_type IN ('WFH', 'Remote') AND l.status = 'pending' 
         ORDER BY l.applied_at ASC`
    );
    c.end();
    res.json(r);
});

/* ============ LEAVE TYPES ============ */

// Create leave type
router.post("/types", auth, admin, async (req, res) => {
    const { name, days_allowed, description } = req.body;
    const c = await db();
    const [result] = await c.query("INSERT INTO leave_types SET ?", { name, days_allowed, description });
    c.end();
    res.json({ id: result.insertId, success: true });
});

// Get all leave types
router.get("/types", auth, async (req, res) => {
    const c = await db();
    const [r] = await c.query("SELECT * FROM leave_types");
    c.end();
    res.json(r);
});

// Update leave type
router.put("/types/:id", auth, admin, async (req, res) => {
    const c = await db();
    await c.query("UPDATE leave_types SET ? WHERE id = ?", [req.body, req.params.id]);
    c.end();
    res.json({ success: true });
});

// Delete leave type
router.delete("/types/:id", auth, admin, async (req, res) => {
    const c = await db();
    await c.query("DELETE FROM leave_types WHERE id = ?", [req.params.id]);
    c.end();
    res.json({ success: true });
});

/* ============ LEAVE BALANCE ============ */

// Get leave balance
router.get("/balance/:employee_id", auth, async (req, res) => {
    const c = await db();
    const [leaves] = await c.query(
        "SELECT leave_type, COUNT(*) as used FROM leaves WHERE employee_id = ? AND status = 'approved' GROUP BY leave_type",
        [req.params.employee_id]
    );
    
    const [types] = await c.query("SELECT name, days_allowed FROM leave_types");
    c.end();
    
    const balance = types.map(t => {
        const used = leaves.find(l => l.leave_type === t.name);
        return {
            leave_type: t.name,
            total: t.days_allowed,
            used: used ? used.used : 0,
            remaining: t.days_allowed - (used ? used.used : 0)
        };
    });
    
    res.json(balance);
});

module.exports = router;
