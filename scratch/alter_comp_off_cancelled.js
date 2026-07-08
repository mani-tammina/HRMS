const { db } = require("../config/database");

async function run() {
  try {
    const conn = await db();
    console.log("Checking comp_off_requests table schema...");
    const [cols] = await conn.query("DESCRIBE comp_off_requests");
    const statusCol = cols.find(c => c.Field === 'status');
    if (statusCol) {
      console.log("Current status ENUM type:", statusCol.Type);
      if (!statusCol.Type.includes('cancelled')) {
        console.log("Updating status ENUM to include 'cancelled'...");
        await conn.query("ALTER TABLE comp_off_requests MODIFY COLUMN status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending'");
        console.log("SUCCESS: status column updated!");
      } else {
        console.log("status column already includes 'cancelled'. No action needed.");
      }
    } else {
      console.error("status column not found!");
    }
    conn.end();
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

run();
