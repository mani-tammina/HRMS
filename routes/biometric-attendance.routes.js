/**
 * DEDICATED BIOMETRIC ATTENDANCE ROUTES
 * =====================================
 * Completely isolated routes for biometric punches, daily summaries,
 * employee mappings, sync status, and manual sync triggers.
 *
 * NOTE: The existing `/api/attendance` routes remain completely untouched.
 */

const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const { auth, admin, hr, manager } = require('../middleware/auth');
const { findEmployeeByUserId } = require('../utils/helpers');
const { syncBiometricLogs, getSyncState, recalculateDailyBiometric } = require('../services/biometric-sync.service');
const { testConnection } = require('../services/biometric-sql.service');

// Helper to format date to YYYY-MM-DD
function getTodayDateStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * @route   GET /api/biometric-attendance/status
 * @desc    Get biometric sync state, database connectivity, and record counts
 * @access  Private (Authenticated)
 */
router.get('/status', auth, async (req, res) => {
  try {
    const syncState = await getSyncState();
    const sqlHealth = await testConnection();

    const [rawCount] = await db.query('SELECT COUNT(*) as count FROM biometric_attendance_raw');
    const [mappedCount] = await db.query('SELECT COUNT(*) as count FROM biometric_punches');
    const [dailyCount] = await db.query('SELECT COUNT(*) as count FROM biometric_daily_attendance');
    const [recentLogs] = await db.query(
      'SELECT * FROM biometric_sync_log ORDER BY id DESC LIMIT 5'
    );

    res.json({
      success: true,
      data: {
        syncState,
        sqlServer: sqlHealth,
        stats: {
          rawPunchesTotal: rawCount[0].count,
          mappedPunchesTotal: mappedCount[0].count,
          dailySummariesTotal: dailyCount[0].count
        },
        recentSyncLogs: recentLogs
      }
    });
  } catch (err) {
    console.error('[BiometricRoute] Status error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/sync-now
 * @desc    Trigger manual sync or backfill from specific log ID
 * @access  Private (Admin / HR)
 */
router.post('/sync-now', auth, hr, async (req, res) => {
  try {
    const { batchSize = 500, forceFromLogId = null } = req.body;
    const result = await syncBiometricLogs({ batchSize, forceFromLogId });

    res.json({
      success: result.success,
      data: result,
      message: result.success ? 'Biometric synchronization executed successfully.' : result.message || result.error
    });
  } catch (err) {
    console.error('[BiometricRoute] Manual sync error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/me/today
 * @desc    Get today's biometric punches and summary for the logged-in user
 * @access  Private
 */
router.get('/me/today', auth, async (req, res) => {
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee profile not found.' });
    }

    const todayStr = getTodayDateStr();

    const [dailySummary] = await db.query(
      'SELECT * FROM biometric_daily_attendance WHERE employee_id = ? AND attendance_date = ?',
      [employee.id, todayStr]
    );

    const [punches] = await db.query(
      'SELECT * FROM biometric_punches WHERE employee_id = ? AND punch_date = ? ORDER BY punch_time ASC',
      [employee.id, todayStr]
    );

    res.json({
      success: true,
      data: {
        date: todayStr,
        employeeId: employee.id,
        summary: dailySummary[0] || null,
        punches: punches || []
      }
    });
  } catch (err) {
    console.error('[BiometricRoute] Me today error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/me/monthly
 * @desc    Get monthly biometric attendance summary for logged-in user
 * @access  Private
 */
router.get('/me/monthly', auth, async (req, res) => {
  try {
    const employee = await findEmployeeByUserId(req.user.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee profile not found.' });
    }

    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    const month = parseInt(req.query.month, 10) || (new Date().getMonth() + 1);

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    const [rows] = await db.query(
      `SELECT * FROM biometric_daily_attendance 
       WHERE employee_id = ? AND attendance_date BETWEEN ? AND ? 
       ORDER BY attendance_date ASC`,
      [employee.id, startDate, endDate]
    );

    res.json({
      success: true,
      data: {
        year,
        month,
        employeeId: employee.id,
        records: rows
      }
    });
  } catch (err) {
    console.error('[BiometricRoute] Me monthly error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/employee/:id
 * @desc    Get biometric records for a specific employee
 * @access  Private (Manager / HR / Admin)
 */
router.get('/employee/:id', auth, async (req, res) => {
  try {
    const empId = Number(req.params.id);
    const { startDate, endDate } = req.query;

    let query = 'SELECT * FROM biometric_daily_attendance WHERE employee_id = ?';
    const params = [empId];

    if (startDate && endDate) {
      query += ' AND attendance_date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }
    query += ' ORDER BY attendance_date DESC LIMIT 100';

    const [rows] = await db.query(query, params);

    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('[BiometricRoute] Employee attendance error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/raw-logs
 * @desc    View raw imported logs from biometric machines
 * @access  Private (Admin / HR)
 */
router.get('/raw-logs', auth, hr, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
    const offset = (page - 1) * limit;

    const { userId, date } = req.query;
    let whereClause = 'WHERE 1=1';
    const params = [];

    if (userId) {
      whereClause += ' AND biometric_user_id LIKE ?';
      params.push(`%${userId}%`);
    }
    if (date) {
      whereClause += ' AND DATE(punch_time) = ?';
      params.push(date);
    }

    const [totalRows] = await db.query(
      `SELECT COUNT(*) as total FROM biometric_attendance_raw ${whereClause}`,
      params
    );

    const [logs] = await db.query(
      `SELECT * FROM biometric_attendance_raw ${whereClause} ORDER BY punch_time DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: {
        page,
        limit,
        total: totalRows[0].total,
        logs
      }
    });
  } catch (err) {
    console.error('[BiometricRoute] Raw logs error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/mappings
 * @desc    Get all employee-to-biometric user mappings
 * @access  Private (Admin / HR)
 */
router.get('/mappings', auth, hr, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT m.*, e.FirstName, e.LastName, e.EmployeeNumber, e.WorkEmail 
       FROM biometric_employee_map m
       JOIN employees e ON m.employee_id = e.id
       ORDER BY m.id DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[BiometricRoute] Mappings error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/mappings
 * @desc    Create or update employee-to-biometric user mapping
 * @access  Private (Admin / HR)
 */
router.post('/mappings', auth, hr, async (req, res) => {
  try {
    const { employeeId, biometricUserId, deviceId, active = 1 } = req.body;
    if (!employeeId || !biometricUserId) {
      return res.status(400).json({ success: false, message: 'employeeId and biometricUserId are required.' });
    }

    await db.query(
      `INSERT INTO biometric_employee_map (employee_id, biometric_user_id, device_id, active)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         employee_id = VALUES(employee_id),
         active = VALUES(active)`,
      [employeeId, String(biometricUserId).trim(), deviceId || null, active]
    );

    res.json({ success: true, message: 'Employee biometric mapping saved successfully.' });
  } catch (err) {
    console.error('[BiometricRoute] Save mapping error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
