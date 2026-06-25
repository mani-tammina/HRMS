const { db } = require('../config/database');

async function main() {
    let conn;
    try {
        conn = await db();
        console.log("Connected to database. Altering resignations table...");
        
        // Alter manager_action
        console.log("Altering manager_action ENUM to include 'Send Back'...");
        await conn.query("ALTER TABLE resignations MODIFY COLUMN manager_action ENUM('Approve','Retain','Reject','Pending','Send Back') DEFAULT 'Pending'");
        console.log("✅ manager_action updated successfully.");
        
        // Alter hr_action
        console.log("Altering hr_action ENUM to include 'Return'...");
        await conn.query("ALTER TABLE resignations MODIFY COLUMN hr_action ENUM('Approve','Reject','Pending','Return') DEFAULT 'Pending'");
        console.log("✅ hr_action updated successfully.");
        
    } catch (err) {
        console.error("Error altering table:", err);
    } finally {
        if (conn) await conn.end();
        process.exit(0);
    }
}

main();
