const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'hrms_db_new'
    });

    try {
        console.log('Adding is_half_day and half_day_session to leaves table...');
        await connection.query(`
            ALTER TABLE leaves 
            ADD COLUMN is_half_day TINYINT(1) DEFAULT 0,
            ADD COLUMN half_day_session ENUM('first_half', 'second_half') DEFAULT NULL
        `);
        console.log('Migration successful!');
    } catch (error) {
        if (error.code === 'ER_DUP_COLUMN_NAME') {
            console.log('Columns already exist.');
        } else {
            console.error('Migration failed:', error);
        }
    } finally {
        await connection.end();
    }
}

migrate();
