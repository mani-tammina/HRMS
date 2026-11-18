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

  // Monkey-patch node-zklib utils to parse punchState (byte 31) and full deviceUserId
  const ZKUtils = require('node-zklib/utils');
  if (ZKUtils && ZKUtils.decodeRecordData40) {
    const origDecodeRecordData40 = ZKUtils.decodeRecordData40;
    ZKUtils.decodeRecordData40 = function (recordData) {
      const record = origDecodeRecordData40(recordData);
      if (recordData && recordData.length >= 32) {
        const fullUserId = recordData.slice(2, 26).toString('ascii').replace(/\0.*$/, '').trim();
        if (fullUserId && fullUserId.length > (record.deviceUserId || '').length) {
          record.deviceUserId = fullUserId;
        }
        record.verifyType = recordData[26];
        record.punchState = recordData[31];
      }
      return record;
    };
  }
} catch (_) {}

const net = require('net');
const { db } = require('../config/database');
const { getShiftDateForPunch, isOvernightShift, getOvernightCutoffHour, getMorningCutoffHour } = require('../utils/shift-helper');
const { recalculateDailyBiometric, getEmployeeLookupMap } = require('./biometric-sync.service');

const SOURCE_SYSTEM = 'DIRECT_DEVICE';
const activeDevicePromises = new Map();
let activeFullSyncPromise = null;
let tablesInitialized = false;

/**
 * Fast TCP probe to test device reachability before establishing full ZKLib protocol handshake
 */
function checkDeviceReachability(host, port = 4370, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const s = new net.Socket();
    s.setTimeout(timeoutMs);
    s.once('connect', () => {
      s.destroy();
      resolve(true);
    });
    s.once('timeout', () => {
      s.destroy();
      resolve(false);
    });
    s.once('error', () => {
      s.destroy();
      resolve(false);
    });
    try {
      s.connect(port, host);
    } catch (_) {
      resolve(false);
    }
  });
}

/**
 * Ensure core biometric tables (specifically biometric_devices) exist before running queries
 */
async function ensureBiometricTablesExist() {
  if (tablesInitialized) return;
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS biometric_devices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        device_id VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) DEFAULT NULL,
        device_type VARCHAR(100) DEFAULT 'Biometric / Fingerprint & Face',
        ip_address VARCHAR(100) DEFAULT NULL,
        port INT DEFAULT 4370,
        serial_number VARCHAR(100) DEFAULT NULL,
        status ENUM('active','inactive') DEFAULT 'active',
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_device_id (device_id),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS biometric_attendance_raw (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        source_system VARCHAR(50) DEFAULT 'DIRECT_DEVICE',
        source_log_id VARCHAR(100) NOT NULL,
        biometric_user_id VARCHAR(100) NOT NULL,
        punch_time DATETIME NOT NULL,
        device_id VARCHAR(100) NULL,
        direction VARCHAR(50) NULL,
        raw_payload JSON NULL,
        status ENUM('processed', 'ignored', 'pending') DEFAULT 'pending',
        employee_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_source_log (source_system, source_log_id),
        INDEX idx_raw_user_log (biometric_user_id, punch_time),
        INDEX idx_raw_punch_time (punch_time),
        INDEX idx_raw_device_time (device_id, punch_time),
        INDEX idx_raw_emp (employee_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS biometric_punches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employee_id INT NOT NULL,
        user_id VARCHAR(100) NOT NULL,
        punch_time DATETIME NOT NULL,
        punch_date DATE NOT NULL,
        direction ENUM('in', 'out', 'auto') DEFAULT 'auto',
        device_id VARCHAR(100) NULL,
        raw_log_id BIGINT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_emp_punch_time (employee_id, punch_time),
        INDEX idx_emp_punch_date (employee_id, punch_date),
        INDEX idx_punch_time (punch_time),
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    tablesInitialized = true;
  } catch (err) {
    console.warn('[DirectBiometric] Table auto-creation notice:', err.message);
  }
}

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

  // Sort chronologically ascending so punch pairing and debounce can be accurately applied
  const sortedPunches = punches.slice().sort((a, b) => {
    const tA = a.punchTime instanceof Date ? a.punchTime.getTime() : new Date(String(a.punchTime).replace(' ', 'T')).getTime();
    const tB = b.punchTime instanceof Date ? b.punchTime.getTime() : new Date(String(b.punchTime).replace(' ', 'T')).getTime();
    return (tA || 0) - (tB || 0);
  });

  // Track the most recent punch time (ms) and direction for each employee / user per punchDate
  // Key: 'EMP:<empId>:<punchDate>' or 'RAW:<userId>:<punchDate>'
  const trackingState = new Map();

  for (const p of sortedPunches) {
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
    const punchTimeMs = punchDateObj.getTime();

    const trackKey = employeeId ? `EMP:${employeeId}:${deviceId}:${punchDate}` : `RAW:${userId}:${deviceId}:${punchDate}`;

    // Load initial state from DB if not already loaded in this batch
    if (!trackingState.has(trackKey)) {
      let lastTimeMs = 0;
      let lastDir = 'out'; // so first punch of the day defaults to 'in'
      try {
        if (employeeId) {
          const [lastPunches] = await db.query(
            `SELECT punch_time, direction FROM biometric_punches 
             WHERE employee_id = ? AND device_id = ? AND punch_date = ? 
             ORDER BY punch_time DESC LIMIT 1`,
            [employeeId, deviceId, punchDate]
          );
          if (lastPunches && lastPunches.length > 0) {
            lastTimeMs = new Date(lastPunches[0].punch_time).getTime();
            lastDir = lastPunches[0].direction || 'in';
          }
        } else {
          const [lastRaw] = await db.query(
            `SELECT punch_time, direction FROM biometric_attendance_raw 
             WHERE biometric_user_id = ? AND device_id = ? AND DATE(punch_time) = ? 
             ORDER BY punch_time DESC LIMIT 1`,
            [userId, deviceId, punchDate]
          );
          if (lastRaw && lastRaw.length > 0) {
            lastTimeMs = new Date(lastRaw[0].punch_time).getTime();
            lastDir = lastRaw[0].direction || 'in';
          }
        }
      } catch (_) {}
      trackingState.set(trackKey, { lastTimeMs, lastDir });
    }

    const state = trackingState.get(trackKey);

    // The biometric devices are configured for alternate IN and OUT.
    // Without an IN punch there will be no OUT punch.
    // Every punch strictly alternates: (not IN -> IN, IN -> OUT).
    // Do not skip any logs even if they are within a few seconds time interval.
    let dir = (state.lastDir === 'in') ? 'out' : 'in';

    // Check if this exact punch is already recorded in biometric_punches from a previous sync
    const isExactExisting = state.lastTimeMs === punchTimeMs && state.lastDir === dir;
    if (isExactExisting) {
      rawInsertRows.push({
        source_system: SOURCE_SYSTEM,
        source_log_id: sourceLogId,
        biometric_user_id: userId,
        punch_time: formattedTime,
        device_id: deviceId,
        direction: dir,
        raw_payload: JSON.stringify(p.rawPayload || p),
        status: 'processed',
        employee_id: employeeId
      });
      continue; // Already processed into biometric_punches
    }

    // Update tracking state for next punch in batch
    state.lastTimeMs = punchTimeMs;
    state.lastDir = dir;

    rawInsertRows.push({
      source_system: SOURCE_SYSTEM,
      source_log_id: sourceLogId,
      biometric_user_id: userId,
      punch_time: formattedTime,
      device_id: deviceId,
      direction: dir,
      raw_payload: JSON.stringify(p.rawPayload || p),
      status: 'processed',
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
  // If this device is already actively syncing, join the active promise seamlessly
  if (activeDevicePromises.has(devLockKey)) {
    return await activeDevicePromises.get(devLockKey);
  }

  const doSync = async () => {
    // 1. Fast TCP pre-flight reachability check (1.5s timeout)
    const isOnline = await checkDeviceReachability(host, port, 1500);
    if (!isOnline) {
      console.log(`⚠️ [DirectBiometric] Device #${device.device_id} (${device.name}) at ${host}:${port} is unreachable/offline.`);
      return {
        success: false,
        deviceId: device.device_id,
        name: device.name,
        error: `Device "${device.name}" (${host}:${port}) is unreachable or offline.`
      };
    }

    console.log(`📡 [DirectBiometric] Connecting to Device #${device.device_id} (${device.name}) at ${host}:${port}...`);

    // Silent error callback to intercept unhandled socket events from node-zklib
    const safeSocketError = (err) => {
      // Suppress uncaught socket errors (ERR_STREAM_WRITE_AFTER_END, ECONNRESET, ETIMEDOUT, EPIPE)
    };

    const zk = new ZKLib(host, port, 10000, 4000);

    try {
      // 2. Establish socket connection with safe error listeners
      await zk.createSocket(safeSocketError, safeSocketError);

      // Attach persistent error listeners on underlying TCP/UDP sockets
      if (zk.zklibTcp && zk.zklibTcp.socket) {
        zk.zklibTcp.socket.on('error', safeSocketError);
      }
      if (zk.zklibUdp && zk.zklibUdp.socket) {
        zk.zklibUdp.socket.on('error', safeSocketError);
      }

      // 3. Fetch logs from device with timeout to allow large log dumps (70k+ logs)
      const res = await Promise.race([
        zk.getAttendances(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout of 90s exceeded reading logs from ${host}:${port}`)), 90000)
        )
      ]);
      const records = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);

      console.log(`📥 [DirectBiometric] Fetched ${records.length} logs from Device #${device.device_id} (${device.name})`);

      // 4. Incremental Sync: determine latest punch time already in MySQL for this device
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

      // 5. Filter only valid, recent/new records
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
          let dir = 'auto';
          if (r.punchState === 1 || r.punchState === 2 || r.punchState === 5 || r.direction === 'out' || r.direction === '1') {
            dir = 'out';
          } else if (r.punchState === 0 || r.punchState === 3 || r.punchState === 4 || (r.direction && (r.direction === 'in' || r.direction === '0'))) {
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

      // 6. Update device status and punch count
      await db.query(`
        UPDATE biometric_devices 
        SET status = 'active', updated_at = NOW() 
        WHERE id = ?
      `, [device.id]);

      // 7. Graceful cleanup and disconnect (safe listeners remain attached during teardown; guaranteed 1.5s max)
      try {
        await Promise.race([
          zk.disconnect(),
          new Promise(resolve => setTimeout(resolve, 1500))
        ]);
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
        await Promise.race([
          zk.disconnect(),
          new Promise(resolve => setTimeout(resolve, 1500))
        ]);
      } catch (_) {}
      return {
        success: false,
        deviceId: device.device_id,
        name: device.name,
        error: err.message
      };
    }
  };

  const syncPromise = doSync();
  activeDevicePromises.set(devLockKey, syncPromise);
  try {
    return await syncPromise;
  } finally {
    activeDevicePromises.delete(devLockKey);
  }
}

/**
 * Scan all active devices in biometric_devices table and sync their logs directly in parallel
 */
async function syncDirectBiometricDevices(targetDeviceId = null, forceFullSync = false) {
  // If targeted at a single device, run that device's sync directly
  if (targetDeviceId) {
    await ensureBiometricTablesExist();
    const [devices] = await db.query(
      "SELECT * FROM biometric_devices WHERE (id = ? OR device_id = ?)",
      [targetDeviceId, String(targetDeviceId)]
    );
    if (!devices || devices.length === 0) {
      return { success: false, message: 'Device not found.' };
    }
    return await syncSingleDevice(devices[0], forceFullSync);
  }

  // If a full sync is already running, join it rather than rejecting with an error
  if (activeFullSyncPromise) {
    return await activeFullSyncPromise;
  }

  const doFullSync = async () => {
    // Ensure table exists before executing query
    await ensureBiometricTablesExist();

    const [devices] = await db.query("SELECT * FROM biometric_devices WHERE status != 'inactive'");

    if (!devices || devices.length === 0) {
      return {
        success: true,
        message: 'No active terminal devices found in biometric_devices table.',
        devicesSynced: 0,
        results: []
      };
    }

    console.log(`🚀 [DirectBiometric] Starting direct parallel sync across ${devices.length} registered terminal device(s)...`);

    // Run all device syncs concurrently in parallel
    const syncPromises = devices.map(async (dev) => {
      if (dev.ip_address) {
        return await syncSingleDevice(dev, forceFullSync);
      } else {
        return {
          success: false,
          deviceId: dev.device_id,
          name: dev.name,
          message: 'Device has no IP address configured.'
        };
      }
    });

    const settled = await Promise.allSettled(syncPromises);
    const results = settled.map((s, idx) => {
      if (s.status === 'fulfilled') return s.value;
      return {
        success: false,
        deviceId: devices[idx].device_id,
        name: devices[idx].name,
        error: s.reason?.message || 'Sync failed unexpectedly.'
      };
    });

    const successfulCount = results.filter(r => r.success).length;
    console.log(`✅ [DirectBiometric] Direct sync finished: ${successfulCount}/${devices.length} device(s) online & synced.`);

    return {
      success: true,
      devicesCount: devices.length,
      onlineCount: successfulCount,
      results
    };
  };

  activeFullSyncPromise = doFullSync();
  try {
    return await activeFullSyncPromise;
  } catch (err) {
    console.error('❌ [DirectBiometric] Sync loop error:', err);
    return { success: false, error: err.message };
  } finally {
    activeFullSyncPromise = null;
  }
}

module.exports = {
  ensureBiometricTablesExist,
  ingestDirectPunches,
  syncSingleDevice,
  syncDirectBiometricDevices
};

