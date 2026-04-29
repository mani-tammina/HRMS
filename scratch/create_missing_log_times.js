const { db } = require("../config/database");

async function createTable() {
  const c = await db();
  try {
    await c.query(`
      CREATE TABLE IF NOT EXISTS missing_log_times (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shift_id INT NOT NULL,
        threshold_hours INT NOT NULL DEFAULT 48,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (shift_id) REFERENCES shift_policies(id) ON DELETE CASCADE
      )
    `);
    console.log("Table missing_log_times created");
  } catch (err) {
    console.error(err);
  } finally {
    c.end();
    process.exit();
  }
}

createTable();
