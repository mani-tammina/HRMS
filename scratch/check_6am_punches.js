const { db } = require('../config/database');

async function check6AMPunches() {
  const c = await db();
  try {
    console.log("=== Columns of attendance_punches ===");
    const [cols] = await c.query(`DESCRIBE attendance_punches`);
    console.log(cols.map(c => c.Field).join(', '));

    console.log("\n=== Checking attendance records with 06:00 first_check_in or punch_time ===");
    const [punches] = await c.query(`
      SELECT ap.*, e.EmployeeNumber, e.FirstName, e.LastName
      FROM attendance_punches ap
      LEFT JOIN employees e ON ap.employee_id = e.id
      WHERE (TIME(ap.punch_time) BETWEEN '05:45:00' AND '06:15:00' OR TIME(ap.punch_time) = '06:00:00')
      ORDER BY ap.id DESC
      LIMIT 20
    `);
    console.log("Punches around 6 AM count:", punches.length);
    console.table(punches);

    const [att] = await c.query(`
      SELECT a.id, a.employee_id, a.attendance_date, a.first_check_in, a.last_check_out, a.work_mode, a.notes, a.status, e.EmployeeNumber, e.FirstName
      FROM attendance a
      LEFT JOIN employees e ON a.employee_id = e.id
      WHERE (TIME(a.first_check_in) BETWEEN '05:45:00' AND '06:15:00' OR TIME(a.first_check_in) = '06:00:00')
      ORDER BY a.id DESC
      LIMIT 20
    `);
    console.log("Attendance with first_check_in ~6 AM count:", att.length);
    console.table(att);

    console.log("\n=== Checking recent punches ===");
    const [recentPunches] = await c.query(`
      SELECT ap.*, e.EmployeeNumber
      FROM attendance_punches ap
      LEFT JOIN employees e ON ap.employee_id = e.id
      ORDER BY ap.id DESC
      LIMIT 15
    `);
    console.table(recentPunches);

    console.log("\n=== Checking biometric punches ===");
    try {
      const [bioPunches] = await c.query(`
        SELECT bp.*, e.EmployeeNumber
        FROM biometric_punches bp
        LEFT JOIN employees e ON bp.employee_id = e.id
        WHERE (TIME(bp.punch_time) BETWEEN '05:45:00' AND '06:15:00')
        ORDER BY bp.id DESC
        LIMIT 10
      `);
      console.table(bioPunches);
    } catch(e) {
      console.log("Biometric punches error:", e.message);
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    c.end();
  }
}

check6AMPunches();
