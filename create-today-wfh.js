const mysql = require("mysql2/promise");

async function createTodayWFH() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "hrms_db_new",
    });

    const today = new Date().toISOString().split("T")[0];
    console.log("Creating WFH request for today:", today);

    // Check if request already exists
    const [existing] = await conn.query(
      `
            SELECT id FROM leaves 
            WHERE employee_id = 932 
            AND DATE(start_date) = DATE(?)
            AND leave_type = 'WFH'
        `,
      [today]
    );

    if (existing.length > 0) {
      console.log(
        "WFH request already exists for today, updating to approved..."
      );
      await conn.query(
        `
                UPDATE leaves 
                SET status = 'approved'
                WHERE id = ?
            `,
        [existing[0].id]
      );
      console.log("Updated existing request to approved");
    } else {
      console.log("Creating new WFH request for today...");
      const [result] = await conn.query(
        `
                INSERT INTO leaves 
                (employee_id, leave_type, start_date, end_date, total_days, reason, status, applied_at)
                VALUES (932, 'WFH', ?, ?, 1, 'Work from home', 'approved', NOW())
            `,
        [today, today]
      );
      console.log("Created new WFH request with ID:", result.insertId);
    }

    // Verify
    const [verify] = await conn.query(
      `
            SELECT id, leave_type, start_date, end_date, status
            FROM leaves 
            WHERE employee_id = 932
            AND DATE(start_date) <= DATE(?)
            AND DATE(end_date) >= DATE(?)
            AND leave_type = 'WFH'
            AND status = 'approved'
        `,
      [today, today]
    );

    console.log(
      "\nVerified - Approved WFH for today:",
      JSON.stringify(verify, null, 2)
    );

    await conn.end();
  } catch (error) {
    console.error("Error:", error);
  }
}

createTodayWFH();
