/**
 * BIOMETRIC SYNCHRONIZATION SERVICE
 * =================================
 * Reads attendance punch logs from MS SQL (BiometricSyncDB.dbo.DeviceLogs),
 * inserts raw records with exact machine local timestamps, matches employees,
 * populates biometric_punches & biometric_daily_attendance, and maintains sync state.
 */

const { db } = require('../config/database');
const { getBiometricPool } = require('./biometric-sql.service');

const SOURCE_SYSTEM = 'ETIMETRACK_MSSQL';
let isSyncRunning = false;

function formatDateTime(dateObj) {
  if (!dateObj) return null;
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function getSyncState() {
  const [rows] = await db.query(
    'SELECT * FROM biometric_sync_state WHERE source_system = ?',
    [SOURCE_SYSTEM]
  );
  if (rows.length === 0) {
    await db.query(
      `INSERT INTO biometric_sync_state 
         (source_system, last_source_log_id, last_status, last_synced_records_count, total_synced_records) 
       VALUES (?, '0', 'IDLE', 0, 0)`,
      [SOURCE_SYSTEM]
    );
    return {
      source_system: SOURCE_SYSTEM,
      last_source_log_id: '0',
      last_status: 'IDLE',
      total_synced_records: 0
    };
  }
  return rows[0];
}

async function updateSyncState(lastLogId, status, insertedCount = 0, errorMsg = null) {
  await db.query(
    `UPDATE biometric_sync_state 
     SET last_source_log_id = ?, 
         last_sync_at = NOW(), 
         last_status = ?, 
         last_error = ?,
         last_synced_records_count = ?,
         total_synced_records = COALESCE(total_synced_records, 0) + ?
     WHERE source_system = ?`,
    [String(lastLogId), status, errorMsg, insertedCount, insertedCount, SOURCE_SYSTEM]
  );
}

async function getEmployeeLookupMap() {
  const map = new Map();

  // 1. Explicit mapping table
  try {
    const [mappedRows] = await db.query(
      'SELECT biometric_user_id, employee_id FROM biometric_employee_map WHERE active = 1'
    );
    for (const r of mappedRows) {
      map.set(String(r.biometric_user_id).trim().toUpperCase(), r.employee_id);
    }
  } catch (_) {}

  // 2. Fallback to employees table EmployeeNumber
  try {
    const [empRows] = await db.query(
      'SELECT id, EmployeeNumber FROM employees WHERE EmployeeNumber IS NOT NULL'
    );
    for (const emp of empRows) {
      const key = String(emp.EmployeeNumber).trim().toUpperCase();
      if (!map.has(key)) {
        map.set(key, emp.id);
      }
    }
  } catch (_) {}

  return map;
}

async function autoRegisterMapping(biometricUserId, employeeId, deviceId) {
  try {
    await db.query(
      `INSERT INTO biometric_employee_map (employee_id, biometric_user_id, device_id, active)
       VALUES (?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE employee_id = VALUES(employee_id), active = 1`,
      [employeeId, String(biometricUserId).trim(), deviceId ? String(deviceId) : null]
    );
  } catch (_) {}
}

async function recalculateDailyBiometric(employeeId, punchDate) {
  const [punches] = await db.query(
    `SELECT id, 
            DATE_FORMAT(punch_time, '%Y-%m-%d %H:%i:%s') AS punch_time_str,
            DATE_FORMAT(punch_time, '%H:%i:%s') AS punch_time_clock,
            direction, device_id, raw_log_id 
     FROM biometric_punches 
     WHERE employee_id = ? AND punch_date = ? 
     ORDER BY punch_time ASC`,
    [employeeId, punchDate]
  );

  if (punches.length === 0) return;

  const firstPunch = punches[0];
  const lastPunch = punches[punches.length - 1];

  const firstPunchInTime = firstPunch.punch_time_clock;
  const lastPunchOutTime = punches.length > 1 ? lastPunch.punch_time_clock : null;

  let grossHours = 0;
  if (punches.length > 1) {
    const startMs = new Date(firstPunch.punch_time_str.replace(' ', 'T')).getTime();
    const endMs = new Date(lastPunch.punch_time_str.replace(' ', 'T')).getTime();
    const diffHours = (endMs - startMs) / (1000 * 60 * 60);
    grossHours = Math.max(0, Math.round(diffHours * 100) / 100);
  }

  let status = 'present';
  if (grossHours > 0 && grossHours < 4.0) {
    status = 'half_day';
  }

  const detailJson = JSON.stringify(punches.map(p => ({
    id: p.id,
    time: p.punch_time_clock,
    direction: p.direction,
    device: p.device_id
  })));

  await db.query(
    `INSERT INTO biometric_daily_attendance 
       (employee_id, attendance_date, first_punch_in, last_punch_out, total_punches, gross_hours, status, punches_detail)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       first_punch_in = VALUES(first_punch_in),
       last_punch_out = VALUES(last_punch_out),
       total_punches = VALUES(total_punches),
       gross_hours = VALUES(gross_hours),
       status = VALUES(status),
       punches_detail = VALUES(punches_detail)`,
    [
      employeeId,
      punchDate,
      firstPunchInTime,
      lastPunchOutTime,
      punches.length,
      grossHours,
      status,
      detailJson
    ]
  );
}

/**
 * Main Synchronization Function
 */
async function syncBiometricLogs(options = {}) {
  if (isSyncRunning) {
    return { success: false, message: 'Synchronization is already in progress.' };
  }

  isSyncRunning = true;
  const startTime = new Date();
  let logRecordId = null;
  let currentState = null;

  try {
    currentState = await getSyncState();
    const watermarkBefore = options.forceFromLogId !== undefined && options.forceFromLogId !== null
      ? Number(options.forceFromLogId)
      : Number(currentState.last_source_log_id || 0);

    const batchSize = Number(options.batchSize || 1000);

    // Create sync audit log
    try {
      const [logResult] = await db.query(
        `INSERT INTO biometric_sync_log 
           (source_system, start_time, watermark_before, status) 
         VALUES (?, ?, ?, 'running')`,
        [SOURCE_SYSTEM, formatDateTime(startTime), String(watermarkBefore)]
      );
      logRecordId = logResult.insertId;
    } catch (e) {
      console.warn('[BiometricSync] Warning logging sync start:', e.message);
    }

    // 1. Fetch records from MS SQL with exact string format for dates
    const mssqlPool = await getBiometricPool();
    const request = mssqlPool.request();
    request.input('watermark', watermarkBefore);
    request.input('batchSize', batchSize);

    const query = `
      SELECT TOP (@batchSize)
        DeviceLogId,
        CONVERT(varchar(19), DownloadDate, 120) AS DownloadDateStr,
        DeviceId,
        UserId,
        CONVERT(varchar(19), LogDate, 120) AS LogDateStr,
        Direction,
        AttDirection,
        C1, C2, C3, C4, C5, C6, C7,
        WorkCode
      FROM dbo.DeviceLogs
      WHERE DeviceLogId > @watermark
      ORDER BY DeviceLogId ASC
    `;

    const result = await request.query(query);
    const sourceLogs = result.recordset || [];

    if (sourceLogs.length === 0) {
      await updateSyncState(watermarkBefore, 'SUCCESS', 0);
      if (logRecordId) {
        await db.query(
          `UPDATE biometric_sync_log 
           SET end_time = NOW(), watermark_after = ?, rows_read = 0, rows_inserted = 0, rows_skipped = 0, rows_processed = 0, status = 'success'
           WHERE id = ?`,
          [String(watermarkBefore), logRecordId]
        );
      }
      isSyncRunning = false;
      return {
        success: true,
        rowsRead: 0,
        rowsInserted: 0,
        watermark: watermarkBefore
      };
    }

    // 2. Fetch employee lookup cache
    const employeeMap = await getEmployeeLookupMap();

    let maxLogIdProcessed = watermarkBefore;
    let insertedCount = 0;
    let skippedCount = 0;
    const affectedEmpDates = new Set();

    for (const log of sourceLogs) {
      const deviceLogId = Number(log.DeviceLogId);
      const userId = String(log.UserId || '').trim();
      const logDateStr = log.LogDateStr ? String(log.LogDateStr).trim() : null;

      if (!logDateStr || !userId) {
        skippedCount++;
        if (deviceLogId > maxLogIdProcessed) maxLogIdProcessed = deviceLogId;
        continue;
      }

      // Exact local date and time string from machine
      const punchDate = logDateStr.substring(0, 10);
      const formattedLogDate = logDateStr;
      const empKey = userId.toUpperCase();
      const employeeId = employeeMap.get(empKey) || null;

      // Insert into raw staging table
      try {
        const [insertRes] = await db.query(
          `INSERT INTO biometric_attendance_raw 
             (source_system, source_log_id, biometric_user_id, punch_time, device_id, direction, raw_payload, status, employee_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
             punch_time = VALUES(punch_time),
             employee_id = VALUES(employee_id)`,
          [
            SOURCE_SYSTEM,
            String(deviceLogId),
            userId,
            formattedLogDate,
            log.DeviceId ? String(log.DeviceId) : null,
            log.Direction ? String(log.Direction) : null,
            JSON.stringify(log),
            employeeId ? 'processed' : 'ignored',
            employeeId
          ]
        );

        if (insertRes.affectedRows > 0) {
          insertedCount++;
        }
      } catch (insertErr) {
        console.warn(`[BiometricSync] Warning inserting raw log ${deviceLogId}:`, insertErr.message);
      }

      if (employeeId) {
        autoRegisterMapping(userId, employeeId, log.DeviceId);

        let direction = 'auto';
        const dirStr = String(log.Direction || log.AttDirection || '').toLowerCase();
        if (dirStr.includes('in')) direction = 'in';
        else if (dirStr.includes('out')) direction = 'out';

        try {
          await db.query(
            `INSERT INTO biometric_punches 
               (employee_id, user_id, punch_time, punch_date, direction, device_id, raw_log_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
               punch_time = VALUES(punch_time),
               direction = VALUES(direction),
               device_id = VALUES(device_id)`,
            [
              employeeId,
              userId,
              formattedLogDate,
              punchDate,
              direction,
              log.DeviceId ? String(log.DeviceId) : null,
              deviceLogId
            ]
          );

          affectedEmpDates.add(`${employeeId}:${punchDate}`);
        } catch (_) {}
      } else {
        skippedCount++;
      }

      if (deviceLogId > maxLogIdProcessed) {
        maxLogIdProcessed = deviceLogId;
      }
    }

    // 3. Recalculate daily attendance for affected employee-dates
    for (const item of affectedEmpDates) {
      const [empIdStr, dateStr] = item.split(':');
      const empId = Number(empIdStr);
      try {
        await recalculateDailyBiometric(empId, dateStr);
      } catch (calcErr) {
        console.error(`[BiometricSync] Recalculate error for emp ${empId} on ${dateStr}:`, calcErr.message);
      }
    }

    // 4. Update sync state
    await updateSyncState(maxLogIdProcessed, 'SUCCESS', insertedCount);

    // 5. Complete sync log
    if (logRecordId) {
      await db.query(
        `UPDATE biometric_sync_log 
         SET end_time = NOW(), watermark_after = ?, rows_read = ?, rows_inserted = ?, rows_skipped = ?, rows_processed = ?, status = 'success'
         WHERE id = ?`,
        [String(maxLogIdProcessed), sourceLogs.length, insertedCount, skippedCount, insertedCount, logRecordId]
      );
    }

    isSyncRunning = false;
    return {
      success: true,
      rowsRead: sourceLogs.length,
      rowsInserted: insertedCount,
      rowsSkipped: skippedCount,
      watermarkBefore,
      watermarkAfter: maxLogIdProcessed
    };
  } catch (error) {
    isSyncRunning = false;
    console.error('❌ [BiometricSync] Error during sync:', error);
    await updateSyncState(currentState?.last_source_log_id || 0, 'ERROR', 0, error.message);

    if (logRecordId) {
      try {
        await db.query(
          `UPDATE biometric_sync_log 
           SET end_time = NOW(), status = 'failed', error_message = ?
           WHERE id = ?`,
          [error.message, logRecordId]
        );
      } catch (_) {}
    }

    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  syncBiometricLogs,
  getSyncState,
  recalculateDailyBiometric,
  getEmployeeLookupMap
};
