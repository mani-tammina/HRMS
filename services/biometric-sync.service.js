/**
 * BIOMETRIC SYNCHRONIZATION SERVICE
 * =================================
 * Reads attendance punch logs from MS SQL (BiometricSyncDB.dbo.DeviceLogs),
 * inserts raw records with exact machine local timestamps, matches employees,
 * populates biometric_punches & biometric_daily_attendance, and maintains sync state.
 * Supports high-throughput multi-batch streaming and complete historical backfill.
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

async function autoRegisterMappings(mappingList) {
  if (!mappingList || mappingList.length === 0) return;
  const chunkSize = 200;
  for (let i = 0; i < mappingList.length; i += chunkSize) {
    const chunk = mappingList.slice(i, i + chunkSize);
    const valuePlaceholders = chunk.map(() => '(?, ?, ?, 1)').join(', ');
    const params = [];
    for (const m of chunk) {
      params.push(m.employeeId, String(m.userId).trim(), m.deviceId ? String(m.deviceId) : null);
    }
    try {
      await db.query(
        `INSERT INTO biometric_employee_map (employee_id, biometric_user_id, device_id, active)
         VALUES ${valuePlaceholders}
         ON DUPLICATE KEY UPDATE employee_id = VALUES(employee_id), active = 1`,
        params
      );
    } catch (_) {}
  }
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
 * Options:
 *  - syncAll: boolean (default true) -> loops until all pending logs in MS SQL are ingested
 *  - batchSize: number (default 2000) -> number of rows per query
 *  - forceFromLogId: number -> override watermark (e.g. 0 for full backfill)
 *  - maxBatches: number -> optional limit on loop iterations
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

    const startDateStr = options.startDate || process.env.BIOMETRIC_START_DATE || '2026-09-01 00:00:00';
    const batchSize = Math.max(100, Math.min(10000, Number(options.batchSize || 2000)));
    const syncAll = options.syncAll !== false;
    const maxBatches = Number(options.maxBatches || (syncAll ? 1000 : 1));

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

    const mssqlPool = await getBiometricPool();
    let currentWatermark = watermarkBefore;
    let totalRowsRead = 0;
    let totalRowsInserted = 0;
    let totalRowsSkipped = 0;
    let batchCount = 0;
    const affectedEmpDates = new Set();
    let employeeMap = await getEmployeeLookupMap();

    console.log(`🚀 [BiometricSync] Starting sync: StartDate=${startDateStr}, Watermark=${watermarkBefore}, BatchSize=${batchSize}, SyncAll=${syncAll}`);

    while (batchCount < maxBatches) {
      batchCount++;
      const request = mssqlPool.request();
      request.input('watermark', currentWatermark);
      request.input('batchSize', batchSize);
      request.input('startDate', startDateStr);

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
          AND LogDate >= @startDate
          AND LogDate <= DATEADD(day, 1, GETDATE())
        ORDER BY DeviceLogId ASC
      `;

      const result = await request.query(query);
      const sourceLogs = result.recordset || [];

      if (sourceLogs.length === 0) {
        break;
      }

      totalRowsRead += sourceLogs.length;
      let batchMaxLogId = currentWatermark;

      const rawInsertRows = [];
      const punchInsertRows = [];
      const newMappings = [];

      for (const log of sourceLogs) {
        const deviceLogId = Number(log.DeviceLogId);
        const userId = String(log.UserId || '').trim();
        const logDateStr = log.LogDateStr ? String(log.LogDateStr).trim() : null;

        if (deviceLogId > batchMaxLogId) {
          batchMaxLogId = deviceLogId;
        }

        if (!logDateStr || !userId) {
          totalRowsSkipped++;
          continue;
        }

        const punchDate = logDateStr.substring(0, 10);
        const formattedLogDate = logDateStr;
        const empKey = userId.toUpperCase();
        const employeeId = employeeMap.get(empKey) || null;

        rawInsertRows.push({
          source_system: SOURCE_SYSTEM,
          source_log_id: String(deviceLogId),
          biometric_user_id: userId,
          punch_time: formattedLogDate,
          device_id: log.DeviceId ? String(log.DeviceId) : null,
          direction: log.Direction ? String(log.Direction) : null,
          raw_payload: JSON.stringify(log),
          status: employeeId ? 'processed' : 'ignored',
          employee_id: employeeId
        });

        if (employeeId) {
          newMappings.push({ userId, employeeId, deviceId: log.DeviceId });

          let direction = 'auto';
          const dirStr = String(log.Direction || log.AttDirection || '').toLowerCase();
          if (dirStr.includes('in')) direction = 'in';
          else if (dirStr.includes('out')) direction = 'out';

          punchInsertRows.push({
            employee_id: employeeId,
            user_id: userId,
            punch_time: formattedLogDate,
            punch_date: punchDate,
            direction,
            device_id: log.DeviceId ? String(log.DeviceId) : null,
            raw_log_id: deviceLogId
          });

          affectedEmpDates.add(`${employeeId}:${punchDate}`);
        } else {
          totalRowsSkipped++;
        }
      }

      // Bulk insert raw logs in chunks of 500
      const RAW_CHUNK_SIZE = 500;
      for (let i = 0; i < rawInsertRows.length; i += RAW_CHUNK_SIZE) {
        const chunk = rawInsertRows.slice(i, i + RAW_CHUNK_SIZE);
        const valuePlaceholders = chunk.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
        const params = [];
        for (const row of chunk) {
          params.push(
            row.source_system,
            row.source_log_id,
            row.biometric_user_id,
            row.punch_time,
            row.device_id,
            row.direction,
            row.raw_payload,
            row.status,
            row.employee_id
          );
        }

        try {
          const [res] = await db.query(
            `INSERT INTO biometric_attendance_raw 
               (source_system, source_log_id, biometric_user_id, punch_time, device_id, direction, raw_payload, status, employee_id)
             VALUES ${valuePlaceholders}
             ON DUPLICATE KEY UPDATE 
               punch_time = VALUES(punch_time),
               status = VALUES(status),
               employee_id = VALUES(employee_id)`,
            params
          );
          totalRowsInserted += res.affectedRows > 0 ? chunk.length : 0;
        } catch (insertErr) {
          console.warn(`[BiometricSync] Warning in raw bulk insert chunk:`, insertErr.message);
        }
      }

      // Bulk insert punches in chunks of 500
      const PUNCH_CHUNK_SIZE = 500;
      for (let i = 0; i < punchInsertRows.length; i += PUNCH_CHUNK_SIZE) {
        const chunk = punchInsertRows.slice(i, i + PUNCH_CHUNK_SIZE);
        const valuePlaceholders = chunk.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ');
        const params = [];
        for (const row of chunk) {
          params.push(
            row.employee_id,
            row.user_id,
            row.punch_time,
            row.punch_date,
            row.direction,
            row.device_id,
            row.raw_log_id
          );
        }

        try {
          await db.query(
            `INSERT INTO biometric_punches 
               (employee_id, user_id, punch_time, punch_date, direction, device_id, raw_log_id)
             VALUES ${valuePlaceholders}
             ON DUPLICATE KEY UPDATE 
               punch_time = VALUES(punch_time),
               direction = VALUES(direction),
               device_id = VALUES(device_id)`,
            params
          );
        } catch (punchErr) {
          console.warn(`[BiometricSync] Warning in punches bulk insert chunk:`, punchErr.message);
        }
      }

      if (newMappings.length > 0) {
        await autoRegisterMappings(newMappings);
      }

      currentWatermark = batchMaxLogId;
      await updateSyncState(currentWatermark, 'RUNNING', sourceLogs.length);

      console.log(`📦 [BiometricSync] Batch #${batchCount} complete: Read ${sourceLogs.length}, Current Watermark: ${currentWatermark}`);

      if (sourceLogs.length < batchSize) {
        // Less than requested batch size means we reached the latest available record
        break;
      }
    }

    // Recalculate daily attendance for all touched employee dates
    console.log(`⚙️ [BiometricSync] Recalculating daily attendance for ${affectedEmpDates.size} employee-dates...`);
    let recalcCount = 0;
    for (const item of affectedEmpDates) {
      const [empIdStr, dateStr] = item.split(':');
      const empId = Number(empIdStr);
      try {
        await recalculateDailyBiometric(empId, dateStr);
        recalcCount++;
      } catch (calcErr) {
        console.error(`[BiometricSync] Recalculate error for emp ${empId} on ${dateStr}:`, calcErr.message);
      }
    }

    // Finalize sync state
    await updateSyncState(currentWatermark, 'SUCCESS', totalRowsInserted);

    // Complete sync audit log
    if (logRecordId) {
      await db.query(
        `UPDATE biometric_sync_log 
         SET end_time = NOW(), watermark_after = ?, rows_read = ?, rows_inserted = ?, rows_skipped = ?, rows_processed = ?, status = 'success'
         WHERE id = ?`,
        [String(currentWatermark), totalRowsRead, totalRowsInserted, totalRowsSkipped, totalRowsInserted, logRecordId]
      );
    }

    isSyncRunning = false;
    console.log(`✅ [BiometricSync] Sync completed successfully! Total read: ${totalRowsRead}, Inserted: ${totalRowsInserted}, Watermark: ${currentWatermark}`);

    return {
      success: true,
      rowsRead: totalRowsRead,
      rowsInserted: totalRowsInserted,
      rowsSkipped: totalRowsSkipped,
      recalculatedDays: recalcCount,
      watermarkBefore,
      watermarkAfter: currentWatermark
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
