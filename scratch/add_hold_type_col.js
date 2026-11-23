const { db } = require('../config/database');
(async () => {
  const c = await db();
  try {
    const [cols] = await c.query('DESCRIBE payroll_salary_holds');
    const hasCol = cols.some(x => x.Field === 'hold_type');
    if (!hasCol) {
      await c.query("ALTER TABLE payroll_salary_holds ADD COLUMN hold_type VARCHAR(20) DEFAULT 'FULL' AFTER hold_status");
      console.log('Added hold_type column successfully');
    } else {
      console.log('hold_type column already exists');
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await c.end();
  }
})();
