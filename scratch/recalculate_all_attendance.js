const { db } = require('../config/database');
const routes = require('../routes/attendance-enhanced.routes');

async function run() {
  const c = await db();
  try {
    const [rows] = await c.query("SELECT a.id, a.employee_id, DATE_FORMAT(a.attendance_date, '%Y-%m-%d') as att_date, a.total_work_hours, a.gross_hours, a.total_break_hours FROM attendance a ORDER BY a.id ASC");
    console.log(`Found ${rows.length} attendance rows to process.`);

    let updatedCount = 0;
    for (const r of rows) {
      const details = await routes.getUnifiedAttendanceDetails(c, r.employee_id, r.att_date);
      const att = details.attendance;
      if (!att) continue;

      const newWork = att.total_work_hours || '0.00';
      const newGross = att.gross_hours || '0.00';
      const newBreak = att.total_break_hours || '0.00';

      const workDiff = Math.abs(parseFloat(newWork) - parseFloat(r.total_work_hours || 0));
      const grossDiff = Math.abs(parseFloat(newGross) - parseFloat(r.gross_hours || 0));

      if (workDiff > 0.01 || grossDiff > 0.01) {
        console.log(`Updating ID ${r.id} (Emp ${r.employee_id}, Date ${r.att_date}): Work ${r.total_work_hours} -> ${newWork}, Gross ${r.gross_hours} -> ${newGross}, Break ${r.total_break_hours} -> ${newBreak}`);
        await c.query(
          `UPDATE attendance 
           SET total_work_hours = ?, 
               gross_hours = ?, 
               total_break_hours = ?,
               first_check_in = COALESCE(?, first_check_in),
               last_check_out = ?
           WHERE id = ?`,
          [newWork, newGross, newBreak, att.first_check_in || null, att.last_check_out || null, r.id]
        );
        updatedCount++;
      }
    }
    console.log(`Recalculation complete. Updated ${updatedCount} / ${rows.length} attendance records.`);
  } catch (err) {
    console.error('Error in recalculation:', err);
  } finally {
    c.end();
    process.exit(0);
  }
}

run();

