const { db } = require('../config/database');

async function main() {
    let conn;
    try {
        conn = await db();
        const targetTables = ['department_notice_periods', 'resignations', 'exit_clearance_tasks', 'exit_interviews', 'separation_audit_logs', 'notifications'];
        for (const table of targetTables) {
            try {
                const [columns] = await conn.query(`DESCRIBE ${table}`);
                console.log(`\nTable Schema: ${table}`);
                console.log(JSON.stringify(columns, null, 2));
            } catch (err) {
                console.log(`\nTable ${table} does not exist: ${err.message}`);
            }
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
