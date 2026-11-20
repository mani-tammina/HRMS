const { db } = require('../config/database');

async function main() {
  try {
    const [rows] = await db.query(`
      SELECT device_id, 
             MIN(punch_time) as min_time, 
             MAX(punch_time) as max_time, 
             COUNT(*) as cnt,
             MIN(created_at) as first_inserted,
             MAX(created_at) as last_inserted
      FROM biometric_attendance_raw
      GROUP BY device_id
      ORDER BY CAST(device_id AS UNSIGNED)
    `);
    console.table(rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

main();

