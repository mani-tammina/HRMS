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
const { getSyncState, recalculateDailyBiometric } = require('../services/biometric-sync.service');
const { syncDirectBiometricDevices, syncSingleDevice, ingestDirectPunches } = require('../services/biometric-direct.service');

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
    const [rawCount] = await db.query('SELECT COUNT(*) as count FROM biometric_attendance_raw');
    const [mappedCount] = await db.query('SELECT COUNT(*) as count FROM biometric_punches');
    const [dailyCount] = await db.query('SELECT COUNT(*) as count FROM biometric_daily_attendance');

    res.json({
      success: true,
      data: {
        stats: {
          rawPunchesTotal: rawCount[0].count,
          mappedPunchesTotal: mappedCount[0].count,
          dailySummariesTotal: dailyCount[0].count
        }
      }
    });
  } catch (err) {
    console.error('[BiometricRoute] Status error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/sync-now
 * @desc    Trigger direct sync across registered physical terminal devices
 * @access  Private (Admin / HR)
 */
router.post('/sync-now', auth, hr, async (req, res) => {
  try {
    const force = req.query.force === 'true';
    const result = await syncDirectBiometricDevices(null, force);

    res.json({
      success: result.success,
      data: result,
      message: result.success 
        ? `Biometric devices sync completed (${result.devicesCount || 0} device(s) queried).`
        : result.error || 'Failed to sync devices.'
    });
  } catch (err) {
    console.error('[BiometricRoute] Direct devices sync error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/devices/:id/sync
 * @desc    Trigger on-demand sync for a specific physical terminal device
 * @access  Private (Admin / HR)
 */
router.post('/devices/:id/sync', auth, hr, async (req, res) => {
  try {
    const id = req.params.id;
    const force = req.query.force === 'true';
    const [devices] = await db.query('SELECT * FROM biometric_devices WHERE id = ? OR device_id = ?', [id, String(id)]);
    if (!devices || devices.length === 0) {
      return res.status(404).json({ success: false, message: 'Device not found.' });
    }
    const result = await syncSingleDevice(devices[0], force);
    res.json({
      success: result.success,
      data: result,
      message: result.success 
        ? `Device "${devices[0].name}" synced successfully. (${result.logsRead || 0} logs read, ${result.rawInserted || 0} new punches)`
        : (result.error || 'Failed to sync with device.')
    });
  } catch (err) {
    console.error('[BiometricRoute] Single device sync error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/punch
 * @desc    Direct ingestion of a single punch event from physical machine or gateway
 * @access  Public / Device Key
 */
router.post('/punch', async (req, res) => {
  try {
    const { deviceId, biometricUserId, punchTime, direction, rawPayload } = req.body;
    if (!biometricUserId) {
      return res.status(400).json({ success: false, message: 'biometricUserId is required.' });
    }
    const result = await ingestDirectPunches([{
      deviceId: deviceId || 'DIRECT_DEVICE',
      biometricUserId: String(biometricUserId).trim(),
      punchTime: punchTime || new Date(),
      direction: direction || 'auto',
      rawPayload
    }]);

    res.json({ success: true, message: 'Punch recorded successfully.', data: result });
  } catch (err) {
    console.error('[BiometricRoute] Direct punch error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/punches/bulk
 * @desc    Direct batch punch logs ingestion
 * @access  Private (Admin / HR)
 */
router.post('/punches/bulk', auth, hr, async (req, res) => {
  try {
    const { deviceId, punches } = req.body;
    if (!Array.isArray(punches) || punches.length === 0) {
      return res.status(400).json({ success: false, message: 'Array of punches is required.' });
    }
    const formatted = punches.map(p => ({
      deviceId: p.deviceId || deviceId || 'BULK_IMPORT',
      biometricUserId: String(p.biometricUserId || p.userId || '').trim(),
      punchTime: p.punchTime || p.time || new Date(),
      direction: p.direction || 'auto',
      rawPayload: p
    }));

    const result = await ingestDirectPunches(formatted);
    res.json({ success: true, message: `${result.totalPunchesProcessed} punches processed successfully.`, data: result });
  } catch (err) {
    console.error('[BiometricRoute] Bulk punches error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   ALL /api/biometric-attendance/adms
 * @route   ALL /api/biometric-attendance/iclock/cdata
 * @desc    ZKTeco / eSSL ADMS Cloud Server protocol receiver
 * @access  Public (Machine Push)
 */
router.all(['/adms', '/iclock/cdata', '/cdata'], async (req, res) => {
  try {
    if (req.method === 'GET') {
      // ADMS Device handshake
      return res.send('OK');
    }

    // POST: parse tab-separated or query string punches
    const bodyText = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const sn = req.query.SN || req.query.sn || 'ADMS_DEVICE';
    const lines = bodyText.split('\n');
    const punches = [];

    for (const line of lines) {
      const parts = line.trim().split('\t');
      if (parts.length >= 2) {
        punches.push({
          deviceId: sn,
          biometricUserId: parts[0],
          punchTime: parts[1],
          direction: parts[2] === '1' ? 'out' : 'in',
          rawPayload: line
        });
      }
    }

    if (punches.length > 0) {
      await ingestDirectPunches(punches);
    }

    res.send(`OK: ${punches.length}`);
  } catch (err) {
    console.warn('[BiometricRoute] ADMS error:', err.message);
    res.status(500).send('ERROR');
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

    const { userId, date, deviceId } = req.query;
    let whereClause = 'WHERE 1=1';
    const params = [];

    if (userId) {
      whereClause += ' AND biometric_user_id LIKE ?';
      params.push(`%${userId}%`);
    }
    if (deviceId) {
      whereClause += ' AND device_id = ?';
      params.push(String(deviceId));
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

/**
 * @route   DELETE /api/biometric-attendance/mappings/:id
 * @desc    Delete employee biometric mapping
 * @access  Private (Admin / HR)
 */
router.delete('/mappings/:id', auth, hr, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await db.query('DELETE FROM biometric_employee_map WHERE id = ?', [id]);
    res.json({ success: true, message: 'Mapping removed successfully.' });
  } catch (err) {
    console.error('[BiometricRoute] Delete mapping error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/devices
 * @desc    Get biometric machines/devices list dynamically from database with punch metrics and status
 * @access  Private (Admin / HR)
 */
router.get('/devices', auth, hr, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        d.id,
        d.device_id,
        d.name,
        d.location,
        d.device_type,
        d.ip_address,
        d.serial_number,
        d.status as config_status,
        d.created_at,
        d.updated_at,
        COALESCE(r.total_punches, 0) as total_punches,
        r.last_punch_time,
        r.first_punch_time,
        COALESCE(r.unique_users, 0) as unique_users
      FROM biometric_devices d
      LEFT JOIN (
        SELECT 
          device_id,
          COUNT(*) as total_punches,
          MAX(punch_time) as last_punch_time,
          MIN(punch_time) as first_punch_time,
          COUNT(DISTINCT biometric_user_id) as unique_users
        FROM biometric_attendance_raw
        WHERE device_id IS NOT NULL 
          AND device_id != ''
          AND punch_time >= '2024-01-01'
          AND punch_time <= NOW()
        GROUP BY device_id
      ) r ON d.device_id = r.device_id
      ORDER BY d.id ASC
    `);

    const now = new Date();
    const devices = rows.map(r => {
      const lastPunch = r.last_punch_time ? new Date(r.last_punch_time) : null;
      const hoursAgo = lastPunch ? (now - lastPunch) / (1000 * 60 * 60) : 999;
      const status = r.config_status === 'inactive' 
        ? 'offline' 
        : (hoursAgo < 24 ? 'online' : (hoursAgo < 72 ? 'idle' : 'offline'));

      return {
        id: r.id,
        deviceId: String(r.device_id),
        name: r.name || `Device #${r.device_id}`,
        location: r.location || '',
        type: r.device_type || 'Biometric Scanner',
        ipAddress: r.ip_address || '',
        serialNumber: r.serial_number || null,
        configStatus: r.config_status || 'active',
        totalPunches: Number(r.total_punches || 0),
        uniqueUsers: Number(r.unique_users || 0),
        lastPunchTime: r.last_punch_time,
        firstPunchTime: r.first_punch_time,
        status: status,
        isOnline: status === 'online',
        createdAt: r.created_at,
        updatedAt: r.updated_at
      };
    });

    res.json({ success: true, data: devices });
  } catch (err) {
    console.error('[BiometricRoute] Devices error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/devices
 * @desc    Add a new biometric device or update existing device configuration
 * @access  Private (Admin / HR)
 */
router.post('/devices', auth, hr, async (req, res) => {
  try {
    const { deviceId, name, location, deviceType, ipAddress, serialNumber, status = 'active' } = req.body;
    
    if (!deviceId || !String(deviceId).trim()) {
      return res.status(400).json({ success: false, message: 'Device ID is required.' });
    }
    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: 'Device Name is required.' });
    }

    const cleanDeviceId = String(deviceId).trim();
    const cleanName = String(name).trim();
    const cleanLocation = location ? String(location).trim() : null;
    const cleanType = deviceType ? String(deviceType).trim() : 'Biometric / Fingerprint & Face';
    const cleanIp = ipAddress ? String(ipAddress).trim() : null;
    const cleanSerial = serialNumber ? String(serialNumber).trim() : null;
    const cleanStatus = status === 'inactive' ? 'inactive' : 'active';

    await db.query(`
      INSERT INTO biometric_devices (device_id, name, location, device_type, ip_address, serial_number, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        location = VALUES(location),
        device_type = VALUES(device_type),
        ip_address = VALUES(ip_address),
        serial_number = VALUES(serial_number),
        status = VALUES(status)
    `, [cleanDeviceId, cleanName, cleanLocation, cleanType, cleanIp, cleanSerial, cleanStatus]);

    const [savedRows] = await db.query('SELECT * FROM biometric_devices WHERE device_id = ?', [cleanDeviceId]);

    res.json({
      success: true,
      message: 'Biometric device saved successfully.',
      data: savedRows[0]
    });
  } catch (err) {
    console.error('[BiometricRoute] Save device error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   PUT /api/biometric-attendance/devices/:id
 * @desc    Update biometric device details by ID
 * @access  Private (Admin / HR)
 */
router.put('/devices/:id', auth, hr, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { deviceId, name, location, deviceType, ipAddress, serialNumber, status = 'active' } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: 'Device Name is required.' });
    }

    await db.query(`
      UPDATE biometric_devices 
      SET 
        name = ?,
        location = ?,
        device_type = ?,
        ip_address = ?,
        serial_number = ?,
        status = ?,
        device_id = COALESCE(?, device_id)
      WHERE id = ?
    `, [
      String(name).trim(),
      location ? String(location).trim() : null,
      deviceType ? String(deviceType).trim() : 'Biometric Scanner',
      ipAddress ? String(ipAddress).trim() : null,
      serialNumber ? String(serialNumber).trim() : null,
      status === 'inactive' ? 'inactive' : 'active',
      deviceId ? String(deviceId).trim() : null,
      id
    ]);

    const [updatedRows] = await db.query('SELECT * FROM biometric_devices WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Biometric device updated successfully.',
      data: updatedRows[0]
    });
  } catch (err) {
    console.error('[BiometricRoute] Update device error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   DELETE /api/biometric-attendance/devices/:id
 * @desc    Delete or deactivate a biometric device
 * @access  Private (Admin / HR)
 */
router.delete('/devices/:id', auth, hr, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await db.query('DELETE FROM biometric_devices WHERE id = ?', [id]);
    res.json({ success: true, message: 'Biometric device deleted successfully.' });
  } catch (err) {
    console.error('[BiometricRoute] Delete device error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/sync-logs
 * @desc    Get biometric sync audit logs with pagination
 * @access  Private (Admin / HR)
 */
router.get('/sync-logs', auth, hr, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
    const offset = (page - 1) * limit;

    const [countRows] = await db.query('SELECT COUNT(*) as total FROM biometric_sync_log');
    const [logs] = await db.query(
      'SELECT * FROM biometric_sync_log ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    res.json({
      success: true,
      data: {
        page,
        limit,
        total: countRows[0].total,
        logs
      }
    });
  } catch (err) {
    console.error('[BiometricRoute] Sync logs error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/unmapped-users
 * @desc    Find biometric user IDs from punches that are not yet mapped to an employee
 * @access  Private (Admin / HR)
 */
router.get('/unmapped-users', auth, hr, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        r.biometric_user_id,
        GROUP_CONCAT(DISTINCT r.device_id) as device_ids,
        MAX(r.punch_time) as last_seen,
        COUNT(*) as punch_count
      FROM biometric_attendance_raw r
      LEFT JOIN biometric_employee_map m ON r.biometric_user_id = m.biometric_user_id AND m.active = 1
      LEFT JOIN employees e ON r.biometric_user_id = e.EmployeeNumber
      WHERE m.id IS NULL AND e.id IS NULL
      GROUP BY r.biometric_user_id
      ORDER BY punch_count DESC
      LIMIT 100
    `);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[BiometricRoute] Unmapped users error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/biometric-attendance/mappings/auto-map
 * @desc    Automatically match unmapped biometric user IDs to employees by EmployeeNumber or ID
 * @access  Private (Admin / HR)
 */
router.post('/mappings/auto-map', auth, hr, async (req, res) => {
  try {
    const [matches] = await db.query(`
      SELECT DISTINCT r.biometric_user_id, e.id as employee_id, r.device_id
      FROM biometric_attendance_raw r
      JOIN employees e ON (
        UPPER(TRIM(r.biometric_user_id)) = UPPER(TRIM(e.EmployeeNumber))
        OR r.biometric_user_id = CAST(e.id AS CHAR)
        OR UPPER(TRIM(REPLACE(r.biometric_user_id, 'STSS-', ''))) = UPPER(TRIM(REPLACE(e.EmployeeNumber, 'STSS-', '')))
      )
      LEFT JOIN biometric_employee_map m ON r.biometric_user_id = m.biometric_user_id
      WHERE m.id IS NULL
    `);

    let inserted = 0;
    for (const m of matches) {
      await db.query(
        `INSERT INTO biometric_employee_map (employee_id, biometric_user_id, device_id, active)
         VALUES (?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE employee_id = VALUES(employee_id), active = 1`,
        [m.employee_id, m.biometric_user_id, m.device_id || null]
      );
      inserted++;
    }

    res.json({
      success: true,
      message: `Auto-mapping completed. ${inserted} employee mapping(s) created.`,
      matchedCount: inserted
    });
  } catch (err) {
    console.error('[BiometricRoute] Auto-map error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/biometric-attendance/daily-records
 * @desc    Get biometric daily attendance records with employee details and filter support
 * @access  Private (Admin / HR / Manager)
 */
router.get('/daily-records', auth, hr, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
    const offset = (page - 1) * limit;

    const { date, employeeId, search, status } = req.query;
    let whereClause = 'WHERE 1=1';
    const params = [];

    if (date) {
      whereClause += ' AND d.attendance_date = ?';
      params.push(date);
    }
    if (employeeId) {
      whereClause += ' AND d.employee_id = ?';
      params.push(employeeId);
    }
    if (status) {
      whereClause += ' AND d.status = ?';
      params.push(status);
    }
    if (search) {
      whereClause += ' AND (e.FirstName LIKE ? OR e.LastName LIKE ? OR e.EmployeeNumber LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [countRows] = await db.query(
      `SELECT COUNT(*) as total 
       FROM biometric_daily_attendance d
       JOIN employees e ON d.employee_id = e.id
       ${whereClause}`,
      params
    );

    const [records] = await db.query(
      `SELECT d.*, e.FirstName, e.LastName, e.EmployeeNumber, e.WorkEmail, e.Department
       FROM biometric_daily_attendance d
       JOIN employees e ON d.employee_id = e.id
       ${whereClause}
       ORDER BY d.attendance_date DESC, d.first_punch_in DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: {
        page,
        limit,
        total: countRows[0].total,
        records
      }
    });
  } catch (err) {
    console.error('[BiometricRoute] Daily records error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
