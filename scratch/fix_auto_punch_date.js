const { db } = require('../config/database');

async function fixPunchDate() {
  const c = await db();
  try {
    const [punches] = await c.query(`
      SELECT ap.id, ap.attendance_id, a.attendance_date, ap.punch_date, ap.punch_time, ap.notes
      FROM attendance_punches ap
      JOIN attendance a ON ap.attendance_id = a.id
      WHERE ap.notes = 'OUT Missing' AND ap.punch_date != a.attendance_date
    `);
    console.log("Mismatched auto-out punches:", punches);

    if (punches.length > 0) {
      const [res] = await c.query(`
        UPDATE attendance_punches ap
        JOIN attendance a ON ap.attendance_id = a.id
        SET ap.punch_date = a.attendance_date
        WHERE ap.notes = 'OUT Missing' AND ap.punch_date != a.attendance_date
      `);
      console.log("Updated rows:", res.affectedRows);
    }
  } catch (e) {
    console.error(e);
  } finally {
    c.end();
  }
}

fixPunchDate();
