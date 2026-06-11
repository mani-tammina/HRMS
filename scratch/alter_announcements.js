require('dotenv').config();
const { db } = require("../config/database");

async function run() {
    let connection;
    try {
        connection = await db();
        console.log("Checking announcements table columns...");
        const [columns] = await connection.query("SHOW COLUMNS FROM announcements");
        const hasImageUrl = columns.some(col => col.Field === 'image_url');
        if (!hasImageUrl) {
            console.log("Adding image_url column to announcements table...");
            await connection.query("ALTER TABLE announcements ADD COLUMN image_url VARCHAR(255) DEFAULT NULL");
            console.log("Column image_url added successfully.");
        } else {
            console.log("Column image_url already exists.");
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
