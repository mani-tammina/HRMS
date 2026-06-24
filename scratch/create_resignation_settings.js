const { db } = require('../config/database');

async function main() {
    let conn;
    try {
        conn = await db();
        
        // 1. Create table if not exists
        await conn.query(`
            CREATE TABLE IF NOT EXISTS resignation_settings (
                id INT PRIMARY KEY AUTO_INCREMENT,
                setting_key VARCHAR(100) UNIQUE NOT NULL,
                setting_value TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('Table resignation_settings checked/created.');

        // 2. Default settings list
        const defaultSettings = [
            { key: 'allow_employee_resign', value: 1 },
            { key: 'allow_employee_withdraw', value: 1 },
            { key: 'allow_early_lwd', value: 1 },
            { key: 'show_reviewer_status', value: 1 },
            { key: 'notallowholiday_weekend', value: 1 },

        ];

        // 3. Seed table if empty
        for (const setting of defaultSettings) {
            await conn.query(
                'INSERT INTO resignation_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_key=setting_key',
                [setting.key, setting.value]
            );
        }
        console.log('Seeded resignation settings successfully.');

    } catch (err) {
        console.error('Error running script:', err);
    } finally {
        if (conn) {
            await conn.end();
        }
        process.exit(0);
    }
}

main();
