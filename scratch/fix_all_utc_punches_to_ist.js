const { db } = require('../config/database');

async function fixAllUTCPunchesToIST() {
  const c = await db();
  console.log('🚀 Starting conversion of UTC punches to IST (+5h 30m)...');

  // 1. Find all punches in attendance_punches with UTC offset (~320 to 340 minutes behind created_at)
  const [utcPunches] = await c.query(`
    SELECT id, attendance_id, employee_id, punch_type, punch_time, punch_date, created_at, notes,
           DATE_ADD(punch_time, INTERVAL 330 MINUTE) as ist_punch_time
    FROM attendance_punches
    WHERE TIMESTAMPDIFF(MINUTE, punch_time, created_at) BETWEEN 320 AND 340
  `);

  console.log(`Found ${utcPunches.length} punches to convert to IST.`);

  for (const p of utcPunches) {
    const istTime = p.ist_punch_time;
    const istDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date(istTime));

    await c.query(`
      UPDATE attendance_punches
      SET punch_time = ?,
          punch_date = ?
      WHERE id = ?
    `, [istTime, istDate, p.id]);

    console.log(`✅ Converted Punch ID ${p.id}: ${p.punch_time} -> ${istTime}`);
  }

  // 2. Find and update attendance rows where first_check_in or last_check_out is in UTC
  const [utcAttendances] = await c.query(`
    SELECT id, employee_id, attendance_date, first_check_in, last_check_out, created_at,
           DATE_ADD(first_check_in, INTERVAL 330 MINUTE) as ist_first_in,
           DATE_ADD(last_check_out, INTERVAL 330 MINUTE) as ist_last_out,
           TIMESTAMPDIFF(MINUTE, first_check_in, created_at) as diff_first
    FROM attendance
    WHERE TIMESTAMPDIFF(MINUTE, first_check_in, created_at) BETWEEN 320 AND 340
  `);

  console.log(`\nFound ${utcAttendances.length} attendance rows to convert to IST.`);

  for (const a of utcAttendances) {
    const istFirstIn = a.ist_first_in;
    const istLastOut = a.last_check_out ? a.ist_last_out : null;

    await c.query(`
      UPDATE attendance
      SET first_check_in = ?,
          last_check_out = ?
      WHERE id = ?
    `, [istFirstIn, istLastOut, a.id]);

    console.log(`✅ Converted Attendance ID ${a.id}: first_in ${a.first_check_in} -> ${istFirstIn}, last_out ${a.last_check_out} -> ${istLastOut}`);
  }

  // 3. Recalculate hours for all affected attendance records
  const affectedAttIds = [...new Set([
    ...utcPunches.map(p => p.attendance_id),
    ...utcAttendances.map(a => a.id)
  ])].filter(Boolean);

  console.log(`\nRecalculating hours for ${affectedAttIds.length} attendance records...`);

  for (const attId of affectedAttIds) {
    const [punches] = await c.query(`
      SELECT id, punch_type, punch_time, notes
      FROM attendance_punches
      WHERE attendance_id = ?
      ORDER BY punch_time ASC, id ASC
    `, [attId]);

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
            if (breakMinutes > 0) totalBreakMinutes += breakMinutes;
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

    await c.query(`
      UPDATE attendance
      SET total_work_hours = ?,
          total_break_hours = ?,
          gross_hours = ?,
          last_check_out = COALESCE(?, last_check_out)
      WHERE id = ?
    `, [totalWorkHours, totalBreakHours, grossHours, lastValidCheckOut, attId]);

    console.log(`✅ Updated Attendance ID ${attId}: Work: ${totalWorkHours}h, Gross: ${grossHours}h, LastOut: ${lastValidCheckOut}`);
  }

  await c.end();
  console.log('\n🎉 All previous UTC web clock punches have been successfully converted to IST!');
}

fixAllUTCPunchesToIST().catch(console.error);
