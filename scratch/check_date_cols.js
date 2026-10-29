const { db } = require('../config/database');

async function checkDateColumns() {
  const c = await db();
  try {
    const [cols] = await c.query(`
      SELECT COLUMN_NAME, DATA_TYPE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'hrms_db_new' AND TABLE_NAME = 'employees' AND DATA_TYPE IN ('date', 'datetime', 'timestamp')
    `);
    console.log("Date/DateTime Columns in employees:", cols);

    for (const col of cols) {
      const [cnt] = await c.query(`SELECT COUNT(*) as non_null FROM employees WHERE \`${col.COLUMN_NAME}\` IS NOT NULL`);
      console.log(`Column ${col.COLUMN_NAME}: ${cnt[0].non_null} non-null rows`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await c.end();
  }
}

checkDateColumns();
