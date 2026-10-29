const { db } = require('../config/database');

async function migrate() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS biometric_attendance_raw (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      device_log_id BIGINT UNIQUE NOT NULL,
      download_date DATETIME NULL,
      device_id VARCHAR(100) NULL,
      user_id VARCHAR(100) NOT NULL,
      log_date DATETIME NOT NULL,
      direction VARCHAR(50) NULL,
      att_direction VARCHAR(50) NULL,
      c1 VARCHAR(100) NULL,
      c2 VARCHAR(100) NULL,
      c3 VARCHAR(100) NULL,
      c4 VARCHAR(100) NULL,
      c5 VARCHAR(100) NULL,
      c6 VARCHAR(100) NULL,
      c7 VARCHAR(100) NULL,
      work_code VARCHAR(50) NULL,
      imported_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_raw_user_log (user_id, log_date),
      INDEX idx_raw_log_date (log_date)
    )`,
    `CREATE TABLE IF NOT EXISTS biometric_employee_map (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      employee_id INT NOT NULL,
      biometric_user_id VARCHAR(100) NOT NULL,
      device_id VARCHAR(100) NULL,
      active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_biometric_user_device (biometric_user_id, device_id),
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS biometric_punches (
      id INT PRIMARY KEY AUTO_INCREMENT,
      employee_id INT NOT NULL,
      user_id VARCHAR(100) NOT NULL,
      punch_time DATETIME NOT NULL,
      punch_date DATE NOT NULL,
      direction ENUM('in', 'out', 'auto') DEFAULT 'auto',
      device_id VARCHAR(100) NULL,
      raw_log_id BIGINT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      INDEX idx_emp_punch_date (employee_id, punch_date),
      INDEX idx_punch_time (punch_time)
    )`,
    `CREATE TABLE IF NOT EXISTS biometric_daily_attendance (
      id INT PRIMARY KEY AUTO_INCREMENT,
      employee_id INT NOT NULL,
      attendance_date DATE NOT NULL,
      first_punch_in TIME NULL,
      last_punch_out TIME NULL,
      total_punches INT DEFAULT 0,
      gross_hours DECIMAL(5,2) DEFAULT 0.00,
      status ENUM('present', 'half_day', 'absent') DEFAULT 'present',
      punches_detail JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_biometric_emp_date (employee_id, attendance_date),
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      INDEX idx_bio_date (attendance_date)
    )`,
    `CREATE TABLE IF NOT EXISTS biometric_sync_state (
      source_system VARCHAR(50) PRIMARY KEY,
      last_source_log_id BIGINT DEFAULT 0,
      last_sync_at DATETIME NULL,
      last_status VARCHAR(20) NULL,
      last_error TEXT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS biometric_sync_log (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      run_start DATETIME NOT NULL,
      run_end DATETIME NULL,
      source_database VARCHAR(100) NULL,
      watermark_before BIGINT NULL,
      watermark_after BIGINT NULL,
      rows_read INT DEFAULT 0,
      rows_inserted INT DEFAULT 0,
      rows_skipped INT DEFAULT 0,
      status VARCHAR(20) DEFAULT 'RUNNING',
      error_message TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  for (const sql of tables) {
    await db.query(sql);
  }
  console.log('✅ Biometric tables verified/created successfully.');
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
