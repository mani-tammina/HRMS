const { db } = require('../config/database');

async function main() {
    let conn;
    try {
        conn = await db();
        
        // 1. Create table if not exists
        await conn.query(`
            CREATE TABLE IF NOT EXISTS resignation_reasons (
                id INT PRIMARY KEY AUTO_INCREMENT,
                reason VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,
                is_active TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('Table resignation_reasons checked/created.');

        // 2. Default reasons list
        const defaultReasons = [
            'Career Growth',
            'Better Opportunity',
            'Higher Studies',
            'Relocation',
            'Personal Reasons',
            'Health Reasons',
            'Work Environment',
            'Compensation',
            'Family Commitments',
            'Other'
        ];

        // 3. Seed table if empty
        const [rows] = await conn.query('SELECT COUNT(*) as count FROM resignation_reasons');
        if (rows[0].count === 0) {
            for (const reason of defaultReasons) {
                await conn.query(
                    'INSERT INTO resignation_reasons (reason, is_active) VALUES (?, 1) ON DUPLICATE KEY UPDATE reason=reason',
                    [reason]
                );
            }
            console.log('Seeded resignation reasons successfully.');
        } else {
            console.log('Resignation reasons already contains records, skipping seeding.');
        }

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
