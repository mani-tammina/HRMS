const { db } = require('../config/database');

function calculateDayHours(punches) {
  let totalWorkMinutes = 0;
  let totalBreakMinutes = 0;
  let lastPunchIn = null;
  let lastValidCheckOut = null;
  let prevValidOut = null;

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
      }
      // If lastPunchIn was already set, another 'in' without an 'out':
      // if gap is large (> 30 mins), treat as new session where prev was missing out
      else {
        const gap = (punchTime - lastPunchIn) / (1000 * 60);
        if (gap > 30) {
          // Previous session was missing out, start new session
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
  const [rows] = await c.query(`
    SELECT a.id, a.employee_id, a.attendance_date, a.total_work_hours, a.gross_hours, e.FirstName, e.LastName
    FROM attendance a
    JOIN employees e ON a.employee_id = e.id
    WHERE a.attendance_date >= '2026-08-20'
  `);

  let updatedCount = 0;
  for (const r of rows) {
    const [punches] = await c.query(
      'SELECT id, punch_type, punch_time, notes FROM attendance_punches WHERE attendance_id = ? ORDER BY punch_time ASC, id ASC',
      [r.id]
    );

    const calculated = calculateDayHours(punches);
    if (calculated.totalWorkHours !== r.total_work_hours || calculated.grossHours !== r.gross_hours) {
      if (parseFloat(calculated.totalWorkHours) > 0) {
        console.log(`Att ${r.id} (Emp ${r.employee_id} - ${r.FirstName} ${r.LastName}): was work=${r.total_work_hours}/gross=${r.gross_hours} -> NOW work=${calculated.totalWorkHours}/gross=${calculated.grossHours}`);
        updatedCount++;
      }
    }
  }
  console.log(`Total records that gained hours from completed sessions: ${updatedCount}`);
  await c.end();
}

main().catch(console.error);
