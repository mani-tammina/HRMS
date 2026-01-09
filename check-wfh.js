const mysql = require("mysql2/promise");

async function checkWFH() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "hrms_db_new",
    });

    console.log("\n=== Checking WFH requests for employee 932 ===\n");

    // Check all WFH requests
    const [wfhRequests] = await conn.query(`
            SELECT id, employee_id, leave_type, start_date, end_date, status, 
                   DATE(start_date) as start_only, DATE(end_date) as end_only,
                   applied_at
            FROM leaves 
            WHERE employee_id = 932 AND leave_type IN ('WFH', 'Remote')
            ORDER BY start_date DESC 
            LIMIT 10
        `);

    console.log(
      "All WFH/Remote requests:",
      JSON.stringify(wfhRequests, null, 2)
    );

    // Check today's date
    const today = new Date().toISOString().split("T")[0];
    console.log("\nToday's date:", today);

    // Check for approved WFH for today
    const [todayWFH] = await conn.query(
      `
            SELECT id, leave_type, start_date, end_date, status
            FROM leaves 
            WHERE employee_id = 932
            AND DATE(start_date) <= DATE(?)
            AND DATE(end_date) >= DATE(?)
            AND leave_type IN ('WFH', 'Remote')
            AND status = 'approved'
        `,
      [today, today]
    );

    console.log("\nApproved WFH for today:", JSON.stringify(todayWFH, null, 2));

    await conn.end();
  } catch (error) {
    console.error("Error:", error);
  }
}

checkWFH();
