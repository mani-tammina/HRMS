/**
 * WORK ANNIVERSARY ROUTES
 * Handles work anniversary lists
 */

const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { auth } = require("../middleware/auth");

// Format a Date object or ISO string to plain YYYY-MM-DD.
function formatDateToIST(val) {
  if (!val) return null;
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
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

// Get anniversaries (today, this week, this month, upcoming)
router.get("/", auth, async (req, res) => {
  const period = req.query.period || "today";
  const c = await db();

  let query =
    "SELECT id, FirstName, LastName, DateJoined, WorkEmail, profile_image FROM employees WHERE EmploymentStatus = 'Working'";

  if (period === "today") {
    query +=
      " AND DAY(DateJoined) = DAY(CURDATE()) AND MONTH(DateJoined) = MONTH(CURDATE())";
  } else if (period === "week") {
    query += " AND WEEK(DateJoined) = WEEK(CURDATE())";
  } else if (period === "month") {
    query += " AND MONTH(DateJoined) = MONTH(CURDATE())";
  } else if (period === "upcoming") {
    // Next 30 days
    query += ` AND (
            (MONTH(DateJoined) = MONTH(CURDATE()) AND DAY(DateJoined) >= DAY(CURDATE())) 
            OR 
            (MONTH(DateJoined) = MONTH(DATE_ADD(CURDATE(), INTERVAL 30 DAY)))
        )`;
  }

  query += " ORDER BY MONTH(DateJoined), DAY(DateJoined)";

  try {
    const [r] = await c.query(query);
    c.end();

    const formattedResults = r.map(emp => {
      if (emp.DateJoined) {
        emp.DateJoined = formatDateToIST(emp.DateJoined);
      }
      return emp;
    });

    res.json(formattedResults);
  } catch (error) {
    c.end();
    console.error("Error fetching anniversaries:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
