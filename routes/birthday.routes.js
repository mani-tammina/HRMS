/**
 * BIRTHDAY & WISHES ROUTES
 * Handles birthday lists and birthday wishes
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");

/* ============ BIRTHDAY MANAGEMENT ============ */

// Format a Date object or ISO string to plain YYYY-MM-DD.
// Database dates are now stored correctly, so no timezone offset is needed.
function formatDateToIST(val) {
  if (!val) return null;
  if (typeof val === 'string') {
    // Already a plain date string "YYYY-MM-DD"
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    // ISO timestamp string — extract the date part only
    if (val.includes('T')) return val.split('T')[0];
    return val;
  }
  if (val instanceof Date) {
    const yyyy = val.getUTCFullYear();
    const mm = String(val.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(val.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return null;
}

// Get birthdays (today, this week, this month)
router.get("/", auth, async (req, res) => {
  const period = req.query.period || "today";
  const c = await db();

  let query =
    "SELECT id, FirstName, LastName, DateOfBirth, WorkEmail, profile_image FROM employees WHERE EmploymentStatus = 'Working'";

  if (period === "today") {
    query +=
      " AND DAY(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)) = DAY(CURDATE()) AND MONTH(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)) = MONTH(CURDATE())";
  } else if (period === "week") {
    query += " AND WEEK(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)) = WEEK(CURDATE())";
  } else if (period === "month") {
    query += " AND MONTH(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)) = MONTH(CURDATE())";
  } else if (period === "upcoming") {
    // Next 30 days
    query += ` AND (
            (MONTH(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)) = MONTH(CURDATE()) AND DAY(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)) >= DAY(CURDATE())) 
            OR 
            (MONTH(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)) = MONTH(DATE_ADD(CURDATE(), INTERVAL 30 DAY)))
        )`;
  }

  query += " ORDER BY MONTH(DATE_ADD(DateOfBirth, INTERVAL 1 DAY)), DAY(DATE_ADD(DateOfBirth, INTERVAL 1 DAY))";

  const [r] = await c.query(query);
  c.end();

  const formattedResults = r.map(emp => {
    if (emp.DateOfBirth) {
      let d = new Date(emp.DateOfBirth);
      if (!isNaN(d.getTime())) {
        d.setUTCDate(d.getUTCDate() + 1);
        emp.DateOfBirth = d;
      }
      emp.DateOfBirth = formatDateToIST(emp.DateOfBirth);
    }
    return emp;
  });

  res.json(formattedResults);
});

/* ============ BIRTHDAY WISHES ============ */

// Post birthday wish
router.post("/wishes", auth, async (req, res) => {
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const { birthday_employee_id, message } = req.body;
    const c = await db();
    const [result] = await c.query(
      "INSERT INTO birthday_wishes (sender_id, employee_id, message, created_at) VALUES (?, ?, ?, NOW())",
      [req.user.id, birthday_employee_id, message],
    );
    c.end();
    res.json({ id: result.insertId, success: true });
  } catch (error) {
    console.error("Error posting wish:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get wishes for an employee
router.get("/wishes/:employee_id", auth, async (req, res) => {
  try {
    const c = await db();
    const [r] = await c.query(
      `SELECT bw.*, u.full_name as sender_name, e.FirstName, e.LastName 
             FROM birthday_wishes bw 
             LEFT JOIN users u ON bw.sender_id = u.id
             LEFT JOIN employees e ON bw.employee_id = e.id 
             WHERE bw.employee_id = ? 
             ORDER BY bw.created_at DESC`,
      [req.params.employee_id],
    );
    c.end();
    res.json(r);
  } catch (error) {
    console.error("Error fetching wishes:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get my wishes received
router.get("/wishes/my/received", auth, async (req, res) => {
  try {
    const emp = await findEmployeeByUserId(req.user.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const c = await db();
    const [r] = await c.query(
      `SELECT bw.*, u.full_name as sender_name, e.FirstName, e.LastName 
             FROM birthday_wishes bw 
             LEFT JOIN users u ON bw.sender_id = u.id
             LEFT JOIN employees e ON bw.employee_id = e.id 
             WHERE bw.employee_id = ? 
             ORDER BY bw.created_at DESC`,
      [emp.id],
    );
    c.end();
    res.json(r);
  } catch (error) {
    console.error("Error fetching my wishes:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
