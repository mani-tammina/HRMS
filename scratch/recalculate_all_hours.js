const { db } = require('../config/database');

function calculateDayHours(punches) {
  let totalWorkMinutes = 0;
  let totalBreakMinutes = 0;
  let lastPunchIn = null;
  let prevValidOut = null;
  let lastValidCheckOut = null;

  for (let i = 0; i < punches.length; i++) {
    const punch = punches[i];
    const punchTime = new Date(punch.punch_time);
    const isAutoOut = (punch.notes || '').includes('OUT Missing') || (punch.notes || '').includes('Auto Clock-Out');

    if (punch.punch_type === 'in') {
      if (lastPunchIn === null) {
        lastPunchIn = punchTime;
        if (prevValidOut !== null) {
          const breakMinutes = (punchTime - prevValidOut) / (1000 * 60);
          if (breakMinutes > 0) {
            totalBreakMinutes += breakMinutes;
          }
        }
      } else {
        const gap = (punchTime - lastPunchIn) / (1000 * 60);
        if (gap > 15) {
          lastPunchIn = punchTime;
        }
      }
    } else if (punch.punch_type === 'out') {
      if (lastPunchIn !== null) {
        if (!isAutoOut) {
          const workMinutes = (punchTime - lastPunchIn) / (1000 * 60);
          if (workMinutes > 0) {
            totalWorkMinutes += workMinutes;
            prevValidOut = punchTime;
            lastValidCheckOut = punch.punch_time;
          }
        }
        lastPunchIn = null;
      }
    }
  }

  const totalWorkHours = (totalWorkMinutes / 60).toFixed(2);
  const totalBreakHours = (totalBreakMinutes / 60).toFixed(2);
  const grossHours = (parseFloat(totalWorkHours) + parseFloat(totalBreakHours)).toFixed(2);

  return { totalWorkHours, totalBreakHours, grossHours, lastValidCheckOut };
}

async function main() {
  const c = await db();
  const [rows] = await c.query('SELECT DISTINCT attendance_id FROM attendance_punches');
  console.log(`Recalculating hours for ${rows.length} attendance rows...`);

  for (const row of rows) {
    const [punches] = await c.query(
      'SELECT id, punch_type, punch_time, notes FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC, id ASC',
      [row.attendance_id]
    );

    const { totalWorkHours, totalBreakHours, grossHours, lastValidCheckOut } = calculateDayHours(punches);

    await c.query(
      `UPDATE attendance 
       SET last_check_out = ?, 
           total_work_hours = ?, 
           total_break_hours = ?, 
           gross_hours = ?
       WHERE id = ?`,
      [lastValidCheckOut, totalWorkHours, totalBreakHours, grossHours, row.attendance_id]
    );
  }

  console.log('Recalculation complete for all attendance records!');
  await c.end();
}

main().catch(console.error);
