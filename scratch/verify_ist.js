const { db } = require('../config/database');

async function check() {
  const c = await db();
  const [punches] = await c.query('SELECT id, attendance_id, employee_id, punch_type, punch_time, punch_date, notes FROM attendance_punches WHERE punch_date = ?', ['2026-10-05']);
  console.log('05 Oct Punches in IST:');
  console.log(JSON.stringify(punches, null, 2));
  await c.end();
}

check().catch(console.error);
