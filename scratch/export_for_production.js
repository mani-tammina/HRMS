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

async function exportFullMissingData() {
  console.log("🚀 Exporting all missing biometric data for production...");
  const outDir = path.join(__dirname, '../exports');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const rawOut = path.join(outDir, 'production_missing_raw.sql');
  const punchOut = path.join(outDir, 'production_missing_punches.sql');
  const dailyOut = path.join(outDir, 'production_missing_daily.sql');

  const rawStream = fs.createWriteStream(rawOut, { encoding: 'utf8' });
  const punchStream = fs.createWriteStream(punchOut, { encoding: 'utf8' });
  const dailyStream = fs.createWriteStream(dailyOut, { encoding: 'utf8' });

  // 1. Export Raw logs missing in production: devices 2, 4, 5, 6, 7, 9, 10 PLUS any MSSQL logs
  console.log("Querying missing raw logs...");
  const [rawRows] = await db.query(
    `SELECT source_system, source_log_id, biometric_user_id, 
            DATE_FORMAT(punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
            device_id, direction, raw_payload, status, employee_id 
     FROM biometric_attendance_raw 
     WHERE device_id IN ('2', '4', '5', '6', '7', '9', '10') 
        OR source_system = 'ETIMETRACK_MSSQL'`
  );
  console.log(`Fetched ${rawRows.length} raw log records.`);

  await writeStreamPromise(rawStream, "-- Missing biometric_attendance_raw for production\nSET FOREIGN_KEY_CHECKS=0;\n");
  const CHUNK = 500;
  for (let i = 0; i < rawRows.length; i += CHUNK) {
    const chunk = rawRows.slice(i, i + CHUNK);
    const values = chunk.map(r => {
      const payload = r.raw_payload ? `'${String(r.raw_payload).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : 'NULL';
      const empId = r.employee_id ? r.employee_id : 'NULL';
      const sys = r.source_system ? `'${r.source_system}'` : "'DIRECT_DEVICE'";
      return `(${sys}, '${r.source_log_id}', '${r.biometric_user_id}', '${r.punch_time}', '${r.device_id}', '${r.direction}', ${payload}, 'processed', ${empId})`;
    }).join(',\n');

    await writeStreamPromise(rawStream, `INSERT IGNORE INTO biometric_attendance_raw (source_system, source_log_id, biometric_user_id, punch_time, device_id, direction, raw_payload, status, employee_id) VALUES\n${values};\n\n`);
  }
  await writeStreamPromise(rawStream, "SET FOREIGN_KEY_CHECKS=1;\n");
  await endStreamPromise(rawStream);
  console.log(`✅ Saved ${rawOut} (${(fs.statSync(rawOut).size / 1024 / 1024).toFixed(2)} MB)`);

  // 2. Export Biometric Punches
  console.log("Querying missing punches...");
  const [punchRows] = await db.query(
    `SELECT employee_id, user_id, 
            DATE_FORMAT(punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
            DATE_FORMAT(punch_date, '%Y-%m-%d') as punch_date, 
            direction, device_id, raw_log_id 
     FROM biometric_punches 
     WHERE device_id IN ('2', '4', '5', '6', '7', '9', '10')`
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

  // 3. Export Biometric Daily Attendance
  console.log("Querying biometric daily attendance...");
  const [dailyRows] = await db.query(
    `SELECT employee_id, 
            DATE_FORMAT(attendance_date, '%Y-%m-%d') as attendance_date,
            first_punch_in,
            last_punch_out,
            total_punches, gross_hours, status, punches_detail 
     FROM biometric_daily_attendance`
  );
  console.log(`Fetched ${dailyRows.length} daily attendance rows.`);

  await writeStreamPromise(dailyStream, "-- Full biometric_daily_attendance for production\nSET FOREIGN_KEY_CHECKS=0;\n");
  for (let i = 0; i < dailyRows.length; i += CHUNK) {
    const chunk = dailyRows.slice(i, i + CHUNK);
    const values = chunk.map(r => {
      const fIn = r.first_punch_in ? `'${r.first_punch_in}'` : 'NULL';
      const lOut = r.last_punch_out ? `'${r.last_punch_out}'` : 'NULL';
      const pDetail = r.punches_detail ? `'${String(JSON.stringify(r.punches_detail)).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : 'NULL';
      return `(${r.employee_id}, '${r.attendance_date}', ${fIn}, ${lOut}, ${r.total_punches || 0}, ${r.gross_hours || 0}, '${r.status || 'present'}', ${pDetail})`;
    }).join(',\n');

    await writeStreamPromise(dailyStream, `INSERT INTO biometric_daily_attendance (employee_id, attendance_date, first_punch_in, last_punch_out, total_punches, gross_hours, status, punches_detail) VALUES\n${values}\nON DUPLICATE KEY UPDATE first_punch_in=VALUES(first_punch_in), last_punch_out=VALUES(last_punch_out), total_punches=VALUES(total_punches), gross_hours=VALUES(gross_hours), status=VALUES(status), punches_detail=VALUES(punches_detail);\n\n`);
  }
  await writeStreamPromise(dailyStream, "SET FOREIGN_KEY_CHECKS=1;\n");
  await endStreamPromise(dailyStream);
  console.log(`✅ Saved ${dailyOut} (${(fs.statSync(dailyOut).size / 1024 / 1024).toFixed(2)} MB)`);

  console.log("\n🎉 All 3 export files created successfully!");
  process.exit(0);
}

exportFullMissingData().catch(err => {
  console.error("Export error:", err);
  process.exit(1);
});
