const { db } = require('../config/database');

(async () => {
  try {
    const c = await db();
    const [devices] = await c.query('SELECT id, device_id, name, location, ip_address, status FROM biometric_devices ORDER BY id');
    console.log('=== DEVICES ===');
    console.table(devices);

    const [stats] = await c.query(`
      SELECT 
        device_id, 
        COUNT(*) as total_punches, 
        MIN(punch_time) as first_punch, 
        MAX(punch_time) as last_punch,
        COUNT(DISTINCT biometric_user_id) as unique_users
      FROM biometric_attendance_raw
      GROUP BY device_id
      ORDER BY device_id
    `);
    console.log('=== RAW STATS BY DEVICE IN biometric_attendance_raw ===');
    console.table(stats);

    // Also check what punches exist for today (2026-11-24)
    const [todayPunches] = await c.query(`
      SELECT device_id, COUNT(*) as cnt, MAX(punch_time) as latest
      FROM biometric_attendance_raw
      WHERE punch_time >= '2026-11-24 00:00:00'
      GROUP BY device_id
    `);
    console.log('=== TODAY PUNCHES IN biometric_attendance_raw ===');
    console.table(todayPunches);

    // Also check biometric_punches table
    const [bioPunches] = await c.query(`
      SELECT device_id, COUNT(*) as cnt, MAX(punch_time) as latest
      FROM biometric_punches
      WHERE punch_date = '2026-11-24'
      GROUP BY device_id
    `);
    console.log('=== TODAY PUNCHES IN biometric_punches ===');
    console.table(bioPunches);

    c.end();
  } catch(e) {
    console.error(e);
  }
})();
