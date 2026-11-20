const { db } = require('../config/database');
const routes = require('../routes/attendance-enhanced.routes');

async function test() {
  const c = await db();
  const [rows] = await c.query("SELECT a.id, a.employee_id, DATE_FORMAT(a.attendance_date, '%Y-%m-%d') as att_date, a.total_work_hours, a.gross_hours FROM attendance a ORDER BY a.id ASC");
  console.log('Total attendance rows:', rows.length);
  for (const r of rows) {
    const details = await routes.getUnifiedAttendanceDetails(c, r.employee_id, r.att_date);
    const punches = details.punches || [];
    const attRec = details.attendance;
    if (attRec) {
      const diff = Math.abs(parseFloat(attRec.total_work_hours || 0) - parseFloat(r.total_work_hours || 0));
      if (diff > 0.05) {
        console.log(`Mismatch on ID ${r.id} (Emp ${r.employee_id}, Date ${r.att_date}): DB=${r.total_work_hours}, UnifiedDetails=${attRec.total_work_hours}`);
      }
    }
  }
  c.end();
  process.exit(0);
}
test();

