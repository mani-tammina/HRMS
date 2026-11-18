const { db } = require('../config/database');

async function main() {
  try {
    const [r] = await db.query("SELECT count(*) as c FROM biometric_daily_attendance");
    console.log("biometric_daily_attendance count:", r[0].c);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

main();
