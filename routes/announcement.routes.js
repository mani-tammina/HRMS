/**
 * ANNOUNCEMENT ROUTES
 * Handles company announcements and notifications
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { db } = require("../config/database");
const { auth, hr } = require("../middleware/auth");

// Configure multer for announcement image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "uploads/announcements/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "announcement-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadAnnouncementImage = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"));
        }
    }
});

// Middleware to conditionally handle uploads (supports both JSON and multipart form-data)
const handleUpload = (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
        uploadAnnouncementImage.single('image')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    } else {
        next();
    }
};

/* ============ ANNOUNCEMENT MANAGEMENT ============ */

// Get all announcements
router.get("/", auth, async (req, res) => {
    const c = await db();
    const [r] = await c.query("SELECT * FROM announcements ORDER BY created_at DESC");
    c.end();
    res.json(r);
});

// Create announcement (HR/Admin only)
router.post("/", auth, hr, handleUpload, async (req, res) => {
    const { title, body, priority, starts_at, ends_at } = req.body;
    if (!title || title.trim() === "" || !body || body.trim() === "") {
        return res.status(400).json({ error: "Title and Body are required" });
    }
    // Convert ISO 8601 to MySQL TIMESTAMP (YYYY-MM-DD HH:MM:SS)
    function toMySQLDatetime(val) {
        if (!val) return null;
        const d = new Date(val);
        if (isNaN(d.getTime())) return null;
        return d.toISOString().slice(0, 19).replace('T', ' ');
    }
    
    const image_url = req.file ? `/uploads/announcements/${req.file.filename}` : null;
    
    const c = await db();
    const [result] = await c.query(
        `INSERT INTO announcements (title, body, starts_at, ends_at, created_by, created_at, image_url) VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
        [title, body, toMySQLDatetime(starts_at), toMySQLDatetime(ends_at), req.user.id, image_url]
    );
    c.end();
    res.json({ id: result.insertId, success: true });
});

// Update announcement (HR/Admin only)
router.put("/:id", auth, hr, handleUpload, async (req, res) => {
    const { title, body, priority, starts_at, ends_at } = req.body;
    function toMySQLDatetime(val) {
        if (!val) return null;
        const d = new Date(val);
        if (isNaN(d.getTime())) return null;
        return d.toISOString().slice(0, 19).replace('T', ' ');
    }
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (body !== undefined) updateFields.body = body;
    if (priority !== undefined) updateFields.priority = priority;
    if (starts_at !== undefined) updateFields.starts_at = toMySQLDatetime(starts_at);
    if (ends_at !== undefined) updateFields.ends_at = toMySQLDatetime(ends_at);
    
    if (req.file) {
        updateFields.image_url = `/uploads/announcements/${req.file.filename}`;
    } else if (req.body.remove_image === 'true' || req.body.remove_image === true) {
        updateFields.image_url = null;
    }
    
    const c = await db();
    await c.query("UPDATE announcements SET ? WHERE id = ?", [updateFields, req.params.id]);
    c.end();
    res.json({ success: true });
});

// Delete announcement (HR/Admin only)
router.delete("/:id", auth, hr, async (req, res) => {
    const c = await db();
    await c.query("DELETE FROM announcements WHERE id = ?", [req.params.id]);
    c.end();
    res.json({ success: true });
});

module.exports = router;
