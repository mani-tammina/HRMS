const { db } = require('../config/database');

async function main() {
  try {
    const [res] = await db.query(`
      SELECT table_name, 
             round(((data_length + index_length) / 1024 / 1024), 2) AS MB,
             table_rows
      FROM information_schema.TABLES 
      WHERE table_schema = 'hrms_db_new' 
        AND table_name IN ('biometric_attendance_raw', 'biometric_punches', 'attendance', 'biometric_devices')
    `);
    console.table(res);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

main();

