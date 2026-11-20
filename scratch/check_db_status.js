const { db } = require('../config/database');

async function main() {
  try {
    const [devs] = await db.query("SELECT id, device_id, name, ip_address, status FROM biometric_devices");
    console.log("Devices in DB:");
    console.table(devs);

    const [counts] = await db.query("SELECT device_id, source_system, count(*) as cnt FROM biometric_attendance_raw GROUP BY device_id, source_system");
    console.log("Raw logs by device:");
    console.table(counts);

    const [totalRaw] = await db.query("SELECT count(*) as total FROM biometric_attendance_raw");
    console.log("Total raw logs:", totalRaw[0].total);

    const [totalPunches] = await db.query("SELECT count(*) as total FROM biometric_punches");
    console.log("Total biometric punches:", totalPunches[0].total);

    const [totalAttendance] = await db.query("SELECT count(*) as total FROM attendance");
    console.log("Total attendance rows:", totalAttendance[0].total);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit(0);
  }
}

main();
