const { db } = require('../config/database');

(async () => {
  const c = await db();
  try {
    await c.query("UPDATE leaves SET start_date = '2026-10-22', end_date = '2026-10-22' WHERE id = 2");
    console.log('✅ Updated leave 2 (Remote) to today 2026-10-22');
    const [rows] = await c.query("SELECT id, employee_id, leave_type, start_date, end_date, status FROM leaves WHERE employee_id = 182");
    console.table(rows);
  } finally {
    await c.end();
  }
})();
