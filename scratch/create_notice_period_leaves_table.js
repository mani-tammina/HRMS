const { db } = require('../config/database');

async function main() {
    let conn;
    try {
        conn = await db();
        
        // Create table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS notice_period_allowed_leaves (
                id INT AUTO_INCREMENT PRIMARY KEY,
                leave_plan_id INT NOT NULL,
                leave_type_id INT NOT NULL,
                is_allowed TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uk_plan_type (leave_plan_id, leave_type_id),
                FOREIGN KEY (leave_plan_id) REFERENCES leave_plans(id) ON DELETE CASCADE,
                FOREIGN KEY (leave_type_id) REFERENCES leave_types(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('Table notice_period_allowed_leaves checked/created successfully.');
        
    } catch (err) {
        console.error('Error running migration:', err);
    } finally {
        if (conn) {
            await conn.end();
        }
        process.exit(0);
    }
}

main();
