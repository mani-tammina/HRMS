/**
 * DIRECT BIOMETRIC DEVICE SYNCHRONIZATION SERVICE
 * ===============================================
 * Connects directly to physical biometric hardware terminals (ZKTeco, eSSL, Realtime, Mantra)
 * over TCP/IP (port 4370) or ingests direct push/ADMS payloads.
 *
 * Saves raw punches, matches employees, and recalculates daily attendance directly in MySQL (hrms_db_new).
 * NO MS SQL or external database server required.
 */

const ZKLib = require('node-zklib');

// Defensive runtime monkey-patch on node-zklib TCP & UDP to eliminate ERR_STREAM_WRITE_AFTER_END crashes
try {
  const ZKLibTCP = require('node-zklib/zklibtcp');
  if (ZKLibTCP && ZKLibTCP.prototype) {
    const origWriteMessage = ZKLibTCP.prototype.writeMessage;
    ZKLibTCP.prototype.writeMessage = function (msg, connect) {
      if (!this.socket || this.socket.destroyed || this.socket.writableEnded || !this.socket.writable) {
        return Promise.reject(new Error('SOCKET_NOT_WRITABLE_OR_ENDED'));
      }
      return origWriteMessage.call(this, msg, connect);
    };

    ZKLibTCP.prototype.freeData = async function () {
      if (!this.socket || this.socket.destroyed || this.socket.writableEnded || !this.socket.writable) {
        return null;
      }
      try {
        return await this.executeCmd(1008 /* CMD_FREE_DATA */, '');
      } catch (_) {
        return null;
      }
    };
  }

  const ZKLibUDP = require('node-zklib/zklibudp');
  if (ZKLibUDP && ZKLibUDP.prototype) {
    ZKLibUDP.prototype.freeData = async function () {
      if (!this.socket) return null;
      try {
        return await this.executeCmd(1008 /* CMD_FREE_DATA */, '');
      } catch (_) {
        return null;
      }
    };
  }
} catch (_) {}

const { db } = require('../config/database');
const { getShiftDateForPunch, isOvernightShift, getOvernightCutoffHour, getMorningCutoffHour } = require('../utils/shift-helper');
const { recalculateDailyBiometric, getEmployeeLookupMap } = require('./biometric-sync.service');

const SOURCE_SYSTEM = 'DIRECT_DEVICE';
let isDirectSyncRunning = false;
const activeDeviceSyncs = new Set();

function formatDateTime(dateObj) {
  if (!dateObj) return null;
  const d = new Date(dateObj);
  if (isNaN(d.getTime())) return null;
  const dStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(d);
  const tStr = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(d);
  return `${dStr} ${tStr}`;
}

async function getEmployeeShiftMap() {
  const map = new Map();
  try {
    const [rows] = await db.query(`
      SELECT 
        e.id AS employee_id,
        sp.name AS shift_policy_name,
        sp.start_time,
        sp.end_time,
        ps.shift_name AS project_shift_name,
        ps.start_time AS project_start_time,
        ps.end_time AS project_end_time
      FROM employees e
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LEFT JOIN project_assignments pa ON e.id = pa.employee_id AND pa.status = 'active'
      LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
    `);
    for (const r of rows) {
      const shiftName = r.project_shift_name || r.shift_policy_name || '';
      const s = r.project_start_time || r.start_time || '09:00:00';
      const e = r.project_end_time || r.end_time || '18:00:00';
      const isOvernight = isOvernightShift(s, e, shiftName);
      const cutoff = isOvernight ? getOvernightCutoffHour(s, e, shiftName) : 12;
      const morningCutoff = getMorningCutoffHour(s);
      map.set(r.employee_id, {
        shift_name: shiftName,
        start_time: s,
        end_time: e,
        is_overnight: isOvernight,
        cutoff_hour: cutoff,
        morning_cutoff_hour: morningCutoff
      });
    }
  } catch (_) {}
  return map;
}

/**
 * Ingest an array of punch objects directly into hrms_db_new
 * @param {Array<{ deviceId: string, biometricUserId: string, punchTime: string|Date, direction?: string, rawPayload?: any }>} punches
 */
async function ingestDirectPunches(punches) {
  if (!Array.isArray(punches) || punches.length === 0) {
    return { success: true, count: 0, insertedCount: 0, recalculatedDays: 0 };
  }

  const employeeMap = await getEmployeeLookupMap();
  const employeeShiftMap = await getEmployeeShiftMap();
  const affectedEmpDates = new Set();
  const rawInsertRows = [];
  const punchInsertRows = [];

  const now = new Date();
  const maxAllowedDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // at most tomorrow

  for (const p of punches) {
    const userId = String(p.biometricUserId || p.userId || '').trim();
    if (!userId) continue;

    const formattedTime = p.punchTime instanceof Date
      ? formatDateTime(p.punchTime)
      : String(p.punchTime).replace('T', ' ').substring(0, 19);

    if (!formattedTime || formattedTime.length < 10) continue;

    const punchDateObj = new Date(formattedTime.replace(' ', 'T'));
    if (isNaN(punchDateObj.getTime())) continue;

    const punchYear = punchDateObj.getFullYear();
    // Skip corrupt hardware timestamps: must be >= 2024 and <= tomorrow
    if (punchYear < 2024 || punchDateObj > maxAllowedDate) {
      continue;
    }

    const deviceId = p.deviceId ? String(p.deviceId).trim() : 'DEFAULT';
    const sourceLogId = `${deviceId}_${userId}_${formattedTime.replace(/[- :]/g, '')}`;

    const empKey = userId.toUpperCase();
    const employeeId = employeeMap.get(empKey) || null;
    const empShift = employeeId ? employeeShiftMap.get(employeeId) : null;
    const punchDate = getShiftDateForPunch(empShift, formattedTime);

    let dir = 'auto';
    const punchState = p.rawPayload ? p.rawPayload.punchState : undefined;
    if (punchState === 1 || punchState === 2 || punchState === 5) {
      dir = 'out';
    } else if (punchState === 0 || punchState === 3 || punchState === 4) {
      dir = 'in';
    } else {
      const d = String(p.direction || '').toLowerCase();
      if (d.includes('out') || d === '1') dir = 'out';
      else if (d.includes('in') || d === '0') dir = 'in';
      else dir = 'in';
    }

    rawInsertRows.push({
      source_system: SOURCE_SYSTEM,
      source_log_id: sourceLogId,
      biometric_user_id: userId,
      punch_time: formattedTime,
      device_id: deviceId,
      direction: dir,
      raw_payload: JSON.stringify(p.rawPayload || p),
      status: employeeId ? 'processed' : 'pending',
      employee_id: employeeId
    });

    if (employeeId) {
      punchInsertRows.push({
        employee_id: employeeId,
        user_id: userId,
        punch_time: formattedTime,
        punch_date: punchDate,
        direction: dir,
        device_id: deviceId,
        raw_log_id: null
      });

      affectedEmpDates.add(`${employeeId}:${punchDate}`);
    }
  }

  let totalInserted = 0;

  // Insert raw logs (chunks of 200)
  for (let i = 0; i < rawInsertRows.length; i += 200) {
    const chunk = rawInsertRows.slice(i, i + 200);
    const placeholders = chunk.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
    const params = [];
    for (const r of chunk) {
      params.push(r.source_system, r.source_log_id, r.biometric_user_id, r.punch_time, r.device_id, r.direction, r.raw_payload, r.status, r.employee_id);
    }
    try {
      const [res] = await db.query(
        `INSERT INTO biometric_attendance_raw 
           (source_system, source_log_id, biometric_user_id, punch_time, device_id, direction, raw_payload, status, employee_id)
         VALUES ${placeholders}
         ON DUPLICATE KEY UPDATE 
           punch_time = VALUES(punch_time),
           direction = VALUES(direction),
           raw_payload = VALUES(raw_payload),
           status = VALUES(status),
           employee_id = VALUES(employee_id)`,
        params
      );
      totalInserted += res.affectedRows > 0 ? chunk.length : 0;
    } catch (err) {
      console.warn('[DirectBiometric] Warning inserting raw chunk:', err.message);
    }
  }

  // Insert mapped punches (chunks of 200)
  for (let i = 0; i < punchInsertRows.length; i += 200) {
    const chunk = punchInsertRows.slice(i, i + 200);
    const placeholders = chunk.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ');
    const params = [];
    for (const r of chunk) {
      params.push(r.employee_id, r.user_id, r.punch_time, r.punch_date, r.direction, r.device_id, r.raw_log_id);
    }
    try {
      await db.query(
        `INSERT INTO biometric_punches 
           (employee_id, user_id, punch_time, punch_date, direction, device_id, raw_log_id)
         VALUES ${placeholders}
         ON DUPLICATE KEY UPDATE 
           punch_time = VALUES(punch_time),
           direction = VALUES(direction),
           device_id = VALUES(device_id)`,
        params
      );
    } catch (err) {
      console.warn('[DirectBiometric] Warning inserting punches chunk:', err.message);
    }
  }

  // Recalculate daily attendance for affected employees and dates
  let recalculatedCount = 0;
  for (const item of affectedEmpDates) {
    const [empIdStr, dateStr] = item.split(':');
    const empId = Number(empIdStr);
    try {
      await recalculateDailyBiometric(empId, dateStr);
      recalculatedCount++;
    } catch (calcErr) {
      console.error(`[DirectBiometric] Recalculate error for emp ${empId} on ${dateStr}:`, calcErr.message);
    }
  }

  return {
    success: true,
    totalPunchesProcessed: punches.length,
    rawInserted: totalInserted,
    mappedPunches: punchInsertRows.length,
    recalculatedDays: recalculatedCount
  };
}

/**
 * Connect directly to a single biometric machine via TCP socket, fetch logs, and ingest into MySQL
 * @param {object} device Row from biometric_devices table
 * @param {boolean} forceFullSync If true, re-evaluates all historical logs; otherwise syncs only recent/new punches
 */
async function syncSingleDevice(device, forceFullSync = false) {
  if (!device || !device.ip_address) {
    return { success: false, message: 'Device IP address is missing or invalid.' };
  }

  let host = String(device.ip_address).trim();
  let port = 4370;

  if (host.includes(':')) {
    const parts = host.split(':');
    host = parts[0].trim();
    port = parseInt(parts[1], 10) || 4370;
  }

  const devLockKey = String(device.id || device.device_id || host);
  if (activeDeviceSyncs.has(devLockKey)) {
    return { success: false, message: `Sync already in progress for device #${device.device_id} (${device.name}).` };
  }
  activeDeviceSyncs.add(devLockKey);

  console.log(`📡 [DirectBiometric] Connecting to Device #${device.device_id} (${device.name}) at ${host}:${port}...`);

  // Silent error callback to intercept unhandled socket events from node-zklib
  const safeSocketError = (err) => {
    // Suppress uncaught socket errors (ERR_STREAM_WRITE_AFTER_END, ECONNRESET, ETIMEDOUT, EPIPE)
  };

  const zk = new ZKLib(host, port, 10000, 4000);

  try {
    // 1. Establish socket connection with safe error listeners
    await zk.createSocket(safeSocketError, safeSocketError);

    // Attach persistent error listeners on underlying TCP/UDP sockets
    if (zk.zklibTcp && zk.zklibTcp.socket) {
      zk.zklibTcp.socket.on('error', safeSocketError);
    }
    if (zk.zklibUdp && zk.zklibUdp.socket) {
      zk.zklibUdp.socket.on('error', safeSocketError);
    }

    // 2. Fetch logs from device with 90-second timeout to allow large log dumps (70k+ logs)
    const res = await Promise.race([
      zk.getAttendances(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout of 90s exceeded reading logs from ${host}:${port}`)), 90000)
      )
    ]);
    const records = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);

    console.log(`📥 [DirectBiometric] Fetched ${records.length} logs from Device #${device.device_id} (${device.name})`);

    // 3. Incremental Sync: determine latest punch time already in MySQL for this device
    let cutoffDate = null;
    if (!forceFullSync) {
      try {
        const [latestRows] = await db.query(
          `SELECT MAX(punch_time) as maxPunchTime 
           FROM biometric_attendance_raw 
           WHERE (device_id = ? OR device_id = ?) 
             AND punch_time >= '2024-01-01' 
             AND punch_time <= NOW()`,
          [device.id, String(device.device_id)]
        );
        if (latestRows && latestRows[0] && latestRows[0].maxPunchTime) {
          const maxTime = new Date(latestRows[0].maxPunchTime);
          if (!isNaN(maxTime.getTime())) {
            // 2-hour safety overlap window to ensure no in-flight punches are missed
            cutoffDate = new Date(maxTime.getTime() - 2 * 60 * 60 * 1000);
          }
        }
      } catch (err) {
        console.warn(`[DirectBiometric] Note: checking max punch time for device #${device.device_id}:`, err.message);
      }
    }

    const now = new Date();
    const maxAllowedDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // 4. Filter only valid, recent/new records
    const validRecords = records.filter(r => {
      if (!r.recordTime) return false;
      const d = r.recordTime instanceof Date ? r.recordTime : new Date(r.recordTime);
      if (isNaN(d.getTime())) return false;
      const yr = d.getFullYear();
      if (yr < 2024 || d > maxAllowedDate) return false;
      if (cutoffDate && d < cutoffDate) return false;
      return true;
    });

    console.log(`⚡ [DirectBiometric] Device #${device.device_id}: ${validRecords.length} new/recent punch(es) to process (incremental cutoff: ${cutoffDate ? cutoffDate.toISOString() : 'full'}).`);

    let ingestResult = { count: 0, rawInserted: 0, mappedPunches: 0, recalculatedDays: 0 };
    if (validRecords.length > 0) {
      const formattedPunches = validRecords.map(r => {
        let dir = 'in';
        if (r.punchState === 1 || r.punchState === 2 || r.punchState === 5 || r.direction === 'out' || r.direction === '1') {
          dir = 'out';
        } else if (r.punchState === 0 || r.punchState === 3 || r.punchState === 4 || r.direction === 'in' || r.direction === '0') {
          dir = 'in';
        } else if (r.direction && r.direction !== 'auto') {
          dir = r.direction;
        }
        return {
          deviceId: String(device.device_id),
          biometricUserId: String(r.deviceUserId || r.userId || ''),
          punchTime: r.recordTime,
          direction: dir,
          rawPayload: r
        };
      });

      ingestResult = await ingestDirectPunches(formattedPunches);
    }

    // 5. Update device status and punch count
    await db.query(`
      UPDATE biometric_devices 
      SET status = 'active', updated_at = NOW() 
      WHERE id = ?
    `, [device.id]);

    // 6. Graceful cleanup and disconnect (safe listeners remain attached during teardown)
    try {
      await zk.disconnect();
    } catch (_) {}

    return {
      success: true,
      deviceId: device.device_id,
      name: device.name,
      logsRead: records.length,
      recentLogsProcessed: validRecords.length,
      ...ingestResult
    };
  } catch (err) {
    console.warn(`⚠️ [DirectBiometric] Connection error to ${device.name} (${host}:${port}):`, err.message);
    try {
      await zk.disconnect();
    } catch (_) {}
    return {
      success: false,
      deviceId: device.device_id,
      name: device.name,
      error: err.message
    };
  } finally {
    activeDeviceSyncs.delete(devLockKey);
  }
}

/**
 * Scan all active devices in biometric_devices table and sync their logs directly
 */
async function syncDirectBiometricDevices(targetDeviceId = null, forceFullSync = false) {
  if (isDirectSyncRunning) {
    return { success: false, message: 'Direct biometric device sync is already running.' };
  }

  isDirectSyncRunning = true;
  try {
    let query = "SELECT * FROM biometric_devices WHERE status != 'inactive'";
    const params = [];
    if (targetDeviceId) {
      query += " AND (id = ? OR device_id = ?)";
      params.push(targetDeviceId, String(targetDeviceId));
    }

    const [devices] = await db.query(query, params);

    if (!devices || devices.length === 0) {
      isDirectSyncRunning = false;
      return {
        success: true,
        message: 'No active terminal devices found in biometric_devices table.',
        devicesSynced: 0,
        results: []
      };
    }

    console.log(`🚀 [DirectBiometric] Starting direct sync across ${devices.length} registered terminal device(s)...`);

    const results = [];
    for (const dev of devices) {
      if (dev.ip_address) {
        const devRes = await syncSingleDevice(dev, forceFullSync);
        results.push(devRes);
      } else {
        results.push({
          success: false,
          deviceId: dev.device_id,
          name: dev.name,
          message: 'Device has no IP address configured.'
        });
      }
    }

    isDirectSyncRunning = false;
    return {
      success: true,
      devicesCount: devices.length,
      results
    };
  } catch (err) {
    isDirectSyncRunning = false;
    console.error('❌ [DirectBiometric] Sync loop error:', err);
    return { success: false, error: err.message };
  }
}

module.exports = {
  ingestDirectPunches,
  syncSingleDevice,
  syncDirectBiometricDevices
};

