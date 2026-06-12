require('dotenv').config();
const { db } = require("../config/database");

async function run() {
    let connection;
    try {
        connection = await db();
        console.log("Checking leave_types table columns...");
        const [columns] = await connection.query("SHOW COLUMNS FROM leave_types");
        
        const hasBgColor = columns.some(col => col.Field === 'bg_color');
        if (!hasBgColor) {
            console.log("Adding bg_color column to leave_types table...");
            await connection.query("ALTER TABLE leave_types ADD COLUMN bg_color VARCHAR(50) DEFAULT NULL");
            console.log("Column bg_color added successfully.");
        } else {
            console.log("Column bg_color already exists.");
        }

        const hasIconPath = columns.some(col => col.Field === 'icon_path');
        if (!hasIconPath) {
            console.log("Adding icon_path column to leave_types table...");
            await connection.query("ALTER TABLE leave_types ADD COLUMN icon_path VARCHAR(255) DEFAULT NULL");
            console.log("Column icon_path added successfully.");
        } else {
            console.log("Column icon_path already exists.");
        }
    } catch (err) {
        console.error("Error executing alter script:", err);
    } finally {
        if (connection) {
            await connection.end();
        }
        process.exit(0);
    }
}

run();
