/**
 * Migration Script: Correct Overnight Shift Punch Dates & Recalculate Aggregates
 */
const { db } = require('../config/database');
const { isOvernightShift, getOvernightCutoffHour } = require('../utils/shift-helper');

(async () => {
  const c = await db();
  console.log('🔄 Starting migration for overnight shift punch dates...');

  try {
    // 1. Find all employees with overnight shifts
    const [empRows] = await c.query(`
      SELECT 
        e.id AS employee_id,
        sp.start_time,
        sp.end_time,
        ps.start_time AS project_start_time,
        ps.end_time AS project_end_time
      FROM employees e
      LEFT JOIN shift_policies sp ON e.shift_policy_id = sp.id
      LEFT JOIN project_assignments pa ON e.id = pa.employee_id AND pa.status = 'active'
      LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
    `);

    const overnightEmps = [];
    for (const r of empRows) {
      const start = r.project_start_time || r.start_time || '09:00:00';
      const end = r.project_end_time || r.end_time || '18:00:00';
      if (isOvernightShift(start, end)) {
        const cutoff = getOvernightCutoffHour(start, end);
        overnightEmps.push({ id: r.employee_id, cutoff });
      }
    }

    console.log(`Found ${overnightEmps.length} employees on overnight shifts.`);

    const touchedDates = new Set();

    // 2. Fix biometric_punches
    let totalBioFixed = 0;
    for (const emp of overnightEmps) {
      const [punchesToFix] = await c.query(`
        SELECT id, employee_id, punch_time, punch_date
        FROM biometric_punches
        WHERE employee_id = ?
          AND HOUR(punch_time) < ?
          AND punch_date = DATE(punch_time)
      `, [emp.id, emp.cutoff]);

      for (const p of punchesToFix) {
        const oldDate = String(p.punch_date).substring(0, 10);
        await c.query(`
          UPDATE biometric_punches
          SET punch_date = DATE_SUB(DATE(punch_time), INTERVAL 1 DAY)
          WHERE id = ?
        `, [p.id]);

        const [newDateRows] = await c.query(`
          SELECT DATE_FORMAT(punch_date, '%Y-%m-%d') as nd FROM biometric_punches WHERE id = ?
        `, [p.id]);
        const newDate = newDateRows[0]?.nd;

        touchedDates.add(`${emp.id}:${oldDate}`);
        if (newDate) touchedDates.add(`${emp.id}:${newDate}`);
        totalBioFixed++;
      }
    }
    console.log(`✅ Fixed ${totalBioFixed} biometric punches.`);

    // 3. Fix attendance_punches (web punches)
    let totalWebFixed = 0;
    for (const emp of overnightEmps) {
      const [webToFix] = await c.query(`
        SELECT ap.id, ap.attendance_id, ap.employee_id, ap.punch_time, ap.punch_date
        FROM attendance_punches ap
        WHERE ap.employee_id = ?
          AND HOUR(ap.punch_time) < ?
          AND ap.punch_date = DATE(ap.punch_time)
      `, [emp.id, emp.cutoff]);

      for (const wp of webToFix) {
        const oldDate = String(wp.punch_date).substring(0, 10);
        // Find or check target attendance on previous date
        const [prevAtt] = await c.query(`
          SELECT id FROM attendance 
          WHERE employee_id = ? AND attendance_date = DATE_SUB(?, INTERVAL 1 DAY)
        `, [emp.id, oldDate]);

        if (prevAtt.length > 0) {
          await c.query(`
            UPDATE attendance_punches
            SET punch_date = DATE_SUB(DATE(punch_time), INTERVAL 1 DAY),
                attendance_id = ?
            WHERE id = ?
          `, [prevAtt[0].id, wp.id]);
        } else {
          await c.query(`
            UPDATE attendance_punches
            SET punch_date = DATE_SUB(DATE(punch_time), INTERVAL 1 DAY)
            WHERE id = ?
          `, [wp.id]);
        }
        totalWebFixed++;
      }
    }
    console.log(`✅ Fixed ${totalWebFixed} web attendance punches.`);

    // 4. Recalculate daily biometric records for touched dates
    console.log(`⚙️ Recalculating biometric daily attendance for ${touchedDates.size} dates...`);
    for (const item of touchedDates) {
      const [empIdStr, dStr] = item.split(':');
      const empId = Number(empIdStr);

      const [punches] = await c.query(`
        SELECT id, 
               DATE_FORMAT(punch_time, '%Y-%m-%d %H:%i:%s') AS punch_time_str,
               DATE_FORMAT(punch_time, '%H:%i:%s') AS punch_time_clock,
               direction, device_id, raw_log_id 
        FROM biometric_punches 
        WHERE employee_id = ? AND punch_date = ? 
        ORDER BY punch_time ASC
      `, [empId, dStr]);

      if (punches.length === 0) {
        await c.query(`
          DELETE FROM biometric_daily_attendance WHERE employee_id = ? AND attendance_date = ?
        `, [empId, dStr]);
        continue;
      }

      const firstPunch = punches[0];
      const lastPunch = punches[punches.length - 1];
      const firstPunchInTime = firstPunch.punch_time_clock;
      const lastPunchOutTime = punches.length > 1 ? lastPunch.punch_time_clock : null;

      let grossHours = 0;
      if (punches.length > 1) {
        const startMs = new Date(firstPunch.punch_time_str.replace(' ', 'T')).getTime();
        const endMs = new Date(lastPunch.punch_time_str.replace(' ', 'T')).getTime();
        const diffHours = (endMs - startMs) / (1000 * 60 * 60);
        grossHours = Math.max(0, Math.round(diffHours * 100) / 100);
      }

      let status = 'present';
      if (grossHours > 0 && grossHours < 4.0) {
        status = 'half_day';
      }

      const detailJson = JSON.stringify(punches.map(p => ({
        id: p.id,
        time: p.punch_time_clock,
        direction: p.direction,
        device: p.device_id
      })));

      await c.query(`
        INSERT INTO biometric_daily_attendance 
          (employee_id, attendance_date, first_punch_in, last_punch_out, total_punches, gross_hours, status, punches_detail)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          first_punch_in = VALUES(first_punch_in),
          last_punch_out = VALUES(last_punch_out),
          total_punches = VALUES(total_punches),
          gross_hours = VALUES(gross_hours),
          status = VALUES(status),
          punches_detail = VALUES(punches_detail)
      `, [empId, dStr, firstPunchInTime, lastPunchOutTime, punches.length, grossHours, status, detailJson]);
    }

    console.log('🎉 Overnight shift punch date migration completed successfully!');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await c.end();
  }
})();
