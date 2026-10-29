const { db } = require('../config/database');

async function runMigrate() {
  const c = await db();
  try {
    const [cols] = await c.query('DESCRIBE holidays');
    const colNames = cols.map(col => col.Field.toLowerCase());
    
    if (!colNames.includes('holiday_type')) {
      await c.query("ALTER TABLE holidays ADD COLUMN holiday_type VARCHAR(50) DEFAULT 'public'");
      console.log('Added holiday_type');
    }
    if (!colNames.includes('holiday_list_id')) {
      await c.query('ALTER TABLE holidays ADD COLUMN holiday_list_id INT NULL');
      console.log('Added holiday_list_id');
    }
    if (!colNames.includes('location_id')) {
      await c.query('ALTER TABLE holidays ADD COLUMN location_id INT NULL');
      console.log('Added location_id');
    }
    if (!colNames.includes('shift_policy_id')) {
      await c.query('ALTER TABLE holidays ADD COLUMN shift_policy_id INT NULL');
      console.log('Added shift_policy_id');
    }
    if (!colNames.includes('applicable_locations')) {
      await c.query('ALTER TABLE holidays ADD COLUMN applicable_locations TEXT NULL');
      console.log('Added applicable_locations');
    }
    if (!colNames.includes('applicable_shifts')) {
      await c.query('ALTER TABLE holidays ADD COLUMN applicable_shifts TEXT NULL');
      console.log('Added applicable_shifts');
    }
    if (!colNames.includes('is_active')) {
      await c.query('ALTER TABLE holidays ADD COLUMN is_active TINYINT(1) DEFAULT 1');
      console.log('Added is_active');
    }
    if (!colNames.includes('updated_at')) {
      await c.query('ALTER TABLE holidays ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
      console.log('Added updated_at');
    }
    
    // Check holiday_lists table
    await c.query(`
      CREATE TABLE IF NOT EXISTS holiday_lists (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT NULL,
        location_id INT NULL,
        shift_policy_id INT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Drop unique constraint on holiday_date if exists
    try {
      const [indexes] = await c.query("SHOW INDEX FROM holidays WHERE Key_name = 'holiday_date' AND Non_unique = 0");
      if (indexes && indexes.length > 0) {
        await c.query("ALTER TABLE holidays DROP INDEX holiday_date");
        console.log('Dropped unique constraint on holiday_date to allow shift/location specific entries');
      }
    } catch(e) {
      console.log('Index note:', e.message);
    }
    
    const [finalCols] = await c.query('DESCRIBE holidays');
    console.log('Final holidays columns:', finalCols.map(x => x.Field));
  } catch(err) {
    console.error('Migration error:', err);
  } finally {
    await c.end();
    process.exit(0);
  }
}

runMigrate();
