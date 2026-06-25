const { db } = require('../config/database');

// Define your notice periods here. You can change 30 to 90 for specific departments.
const defaultNoticePeriod = 30; // Default notice period in days
const customNoticePeriods = {
    // Examples: Add specific department IDs here if they need 90 days
    // '1': 90, // Management
    // '3': 90, // IT Services Technology
};

async function seedNoticePeriods() {
    let conn;
    try {
        conn = await db();
        
        console.log("Fetching existing departments...");
        const [departments] = await conn.query('SELECT id, name FROM departments');
        
        let insertedCount = 0;
        let updatedCount = 0;

        for (const dept of departments) {
            const noticePeriod = customNoticePeriods[dept.id] || defaultNoticePeriod;
            const isActive = 1; // 1 for active, 0 for inactive

            // Check if it already exists
            const [existing] = await conn.query('SELECT id FROM department_notice_periods WHERE department_id = ?', [dept.id]);

            if (existing.length > 0) {
                // Update
                await conn.query(
                    'UPDATE department_notice_periods SET notice_period_days = ?, is_active = ? WHERE department_id = ?',
                    [noticePeriod, isActive, dept.id]
                );
                updatedCount++;
                console.log(`Updated ${dept.name} (ID: ${dept.id}) -> ${noticePeriod} days`);
            } else {
                // Insert
                await conn.query(
                    'INSERT INTO department_notice_periods (department_id, notice_period_days, is_active) VALUES (?, ?, ?)',
                    [dept.id, noticePeriod, isActive]
                );
                insertedCount++;
                console.log(`Inserted ${dept.name} (ID: ${dept.id}) -> ${noticePeriod} days`);
            }
        }
        
        console.log(`\n✅ Notice configurations saved! Inserted: ${insertedCount}, Updated: ${updatedCount}`);

    } catch (error) {
        console.error("Error saving notice periods:", error);
    } finally {
        if (conn) await conn.end();
        process.exit(0);
    }
}

seedNoticePeriods();
