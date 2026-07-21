const express = require("express");
// Create the router with mergeParams: true to inherit route parameters (like :employeeId) from parent routers/mount points
const router = express.Router({ mergeParams: true });
const { db } = require("../config/database");

/**
 * Common handler to retrieve the full name of an employee.
 * It dynamically extracts the employee ID from:
 *   1. req.params.employeeId (if passed as a route parameter in the mount path)
 *   2. req.query.employee_id (if passed as a query parameter)
 *   3. req.query.employeeId (alternative query parameter)
 *   4. req.path (if the router is mounted statically and the ID is in the sub-path, e.g., /267)
 */
const getEmployeeFullName = async (req, res) => {
  // Add logging to help diagnose routing and parameters
  console.log(`\n[Update-Me] 📥 Incoming Request: ${req.method} ${req.originalUrl || req.url}`);
  console.log(`[Update-Me]   - Params: ${JSON.stringify(req.params)}`);
  console.log(`[Update-Me]   - Query: ${JSON.stringify(req.query)}`);
  console.log(`[Update-Me]   - Path: "${req.path}"`);

  try {
    let rawId = req.params.employeeId || req.query.employee_id || req.query.employeeId;

    // Fallback: If rawId is not found in params/query, extract it from the remaining path (e.g., "/267" -> "267")
    if (!rawId && req.path) {
      const pathParts = req.path.split("/").filter(Boolean);
      if (pathParts.length > 0) {
        rawId = pathParts[0];
        console.log(`[Update-Me]   - Extracted ID from path: "${rawId}"`);
      }
    }

    if (!rawId) {
      console.log(`[Update-Me] ❌ Rejecting: Missing employee ID`);
      return res.status(400).json({
        error: "Missing employee_id",
        message: "The employee ID must be provided either as a route parameter (e.g., /employee-name/123) or as a query parameter (e.g., ?employee_id=123)."
      });
    }

    const empId = parseInt(rawId, 10);
    if (isNaN(empId)) {
      console.log(`[Update-Me] ❌ Rejecting: Invalid employee ID "${rawId}" (not an integer)`);
      return res.status(400).json({
        error: "Invalid employee_id",
        message: "The employee ID must be a valid integer."
      });
    }

    // Querying the employees table using the database pool.
    const [rows] = await db.query(
      "SELECT FullName FROM employees WHERE id = ?",
      [empId]
    );

    if (!rows || rows.length === 0) {
      console.log(`[Update-Me] ❌ Not Found: No employee found with ID ${empId}`);
      return res.status(404).json({
        error: "Employee not found",
        message: `No employee found with ID: ${empId}.`
      });
    }

    const employee = rows[0];
    const fullname = employee.FullName !== undefined ? employee.FullName : employee.fullname;

    console.log(`[Update-Me] ✅ Success: Resolved ID ${empId} to "${fullname}"`);
    return res.json({
      fullname: fullname || ""
    });
  } catch (error) {
    console.error("[Update-Me] 💥 Error fetching employee full name:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request."
    });
  }
};

// Map the handler to standard Express paths.
// This guarantees compatibility across all versions of path-to-regexp,
// while supporting all possible mounting configurations.
router.get("/", getEmployeeFullName);
router.get("/:employeeId", getEmployeeFullName);

module.exports = router;
