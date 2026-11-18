const fs = require('fs');
const path = require('path');
const { db } = require('../config/database');

function writeStreamPromise(stream, content) {
  return new Promise((resolve, reject) => {
    stream.write(content, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function endStreamPromise(stream) {
  return new Promise((resolve) => {
    stream.end(() => resolve());
  });
}

async function exportProductionData() {
  console.log("🚀 Exporting missing biometric data for production...");
  const outDir = path.join(__dirname, '../exports');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const rawOut = path.join(outDir, 'production_missing_devices_raw.sql');
  const punchOut = path.join(outDir, 'production_missing_devices_punches.sql');

  const rawStream = fs.createWriteStream(rawOut, { encoding: 'utf8' });
  const punchStream = fs.createWriteStream(punchOut, { encoding: 'utf8' });

  const missingDevices = ['2', '4', '5', '6', '7', '9', '10'];

  console.log(`Querying raw logs for devices: ${missingDevices.join(', ')}...`);
  const [rawRows] = await db.query(
    `SELECT source_system, source_log_id, biometric_user_id, 
            DATE_FORMAT(punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
            device_id, direction, raw_payload, status, employee_id 
     FROM biometric_attendance_raw 
     WHERE device_id IN (?)`,
    [missingDevices]
  );
  console.log(`Fetched ${rawRows.length} raw log records.`);

  await writeStreamPromise(rawStream, "-- Missing biometric_attendance_raw for production\nSET FOREIGN_KEY_CHECKS=0;\n");
  
  const CHUNK = 500;
  for (let i = 0; i < rawRows.length; i += CHUNK) {
    const chunk = rawRows.slice(i, i + CHUNK);
    const values = chunk.map(r => {
      const payload = r.raw_payload ? `'${String(r.raw_payload).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : 'NULL';
      const empId = r.employee_id ? r.employee_id : 'NULL';
      return `('DIRECT_DEVICE', '${r.source_log_id}', '${r.biometric_user_id}', '${r.punch_time}', '${r.device_id}', '${r.direction}', ${payload}, 'processed', ${empId})`;
    }).join(',\n');

    await writeStreamPromise(rawStream, `INSERT IGNORE INTO biometric_attendance_raw (source_system, source_log_id, biometric_user_id, punch_time, device_id, direction, raw_payload, status, employee_id) VALUES\n${values};\n\n`);
  }
  await writeStreamPromise(rawStream, "SET FOREIGN_KEY_CHECKS=1;\n");
  await endStreamPromise(rawStream);
  console.log(`✅ Saved ${rawOut} (${(fs.statSync(rawOut).size / 1024 / 1024).toFixed(2)} MB)`);

  console.log(`Querying punches for devices: ${missingDevices.join(', ')}...`);
  const [punchRows] = await db.query(
    `SELECT employee_id, user_id, 
            DATE_FORMAT(punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
            DATE_FORMAT(punch_date, '%Y-%m-%d') as punch_date, 
            direction, device_id, raw_log_id 
     FROM biometric_punches 
     WHERE device_id IN (?)`,
    [missingDevices]
  );
  console.log(`Fetched ${punchRows.length} biometric punch records.`);

  await writeStreamPromise(punchStream, "-- Missing biometric_punches for production\nSET FOREIGN_KEY_CHECKS=0;\n");
  for (let i = 0; i < punchRows.length; i += CHUNK) {
    const chunk = punchRows.slice(i, i + CHUNK);
    const values = chunk.map(r => {
      const rawLog = r.raw_log_id ? r.raw_log_id : 'NULL';
      return `(${r.employee_id}, '${r.user_id}', '${r.punch_time}', '${r.punch_date}', '${r.direction}', '${r.device_id}', ${rawLog})`;
    }).join(',\n');

    await writeStreamPromise(punchStream, `INSERT IGNORE INTO biometric_punches (employee_id, user_id, punch_time, punch_date, direction, device_id, raw_log_id) VALUES\n${values};\n\n`);
  }
  await writeStreamPromise(punchStream, "SET FOREIGN_KEY_CHECKS=1;\n");
  await endStreamPromise(punchStream);
  console.log(`✅ Saved ${punchOut} (${(fs.statSync(punchOut).size / 1024 / 1024).toFixed(2)} MB)`);

  console.log("\n🎉 Export completed successfully!");
  process.exit(0);
}

exportProductionData().catch(err => {
  console.error("Export error:", err);
  process.exit(1);
});
