const { db } = require('../config/database');

async function main() {
  const [cols] = await db.query("DESCRIBE biometric_daily_attendance");
  console.table(cols);
  process.exit(0);
}

main();
