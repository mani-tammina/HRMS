const { db } = require('../config/database');
const routes = require('../routes/attendance-enhanced.routes');

async function run() {
  let conn;
  try {
    conn = await db();
    // Simulate what getUnifiedAttendanceListAndSummary does for dayPunches on 16 Nov
    const [wRange] = await conn.query(`
      SELECT ap.employee_id, 
             DATE_FORMAT(ap.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
             DATE_FORMAT(ap.punch_time, '%Y-%m-%d') as punch_date,
             ap.punch_type, ap.location, ap.notes, 'web' as source
      FROM attendance_punches ap
      WHERE ap.employee_id = 566 AND ap.punch_date = '2026-11-16'
      ORDER BY ap.punch_time ASC
    `);

    const [bioRange] = await conn.query(`
      SELECT bp.employee_id, 
             DATE_FORMAT(bp.punch_time, '%Y-%m-%d %H:%i:%s') as punch_time, 
             DATE_FORMAT(bp.punch_date, '%Y-%m-%d') as punch_date,
             bp.direction, bp.device_id, bp.device_id as device_info,
             COALESCE(bd.name, CONCAT('Device #', bp.device_id)) as location,
             bd.name as device_name,
             'biometric' as source
      FROM biometric_punches bp
      LEFT JOIN biometric_devices bd ON bp.device_id = bd.device_id
      WHERE bp.employee_id = 566 AND bp.punch_date = '2026-11-16'
      ORDER BY bp.punch_time ASC
    `);

    const bioOpenByDevice = new Map();
    const mappedBio = bioRange.map(p => {
      const devKey = String(p.device_id || p.location || 'default');
      const devOpen = bioOpenByDevice.get(devKey) || false;
      const pt = devOpen ? 'out' : 'in';
      bioOpenByDevice.set(devKey, !devOpen);
      return { ...p, punch_type: pt };
    });

    const dayPunches = [...wRange, ...mappedBio];
    dayPunches.sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());

    console.log(`Total dayPunches for 16 Nov: ${dayPunches.length}`);
    dayPunches.forEach((p, i) => console.log(`${i+1}. ${p.punch_time} [${p.source}] pt:${p.punch_type} dev:${p.device_id} notes:${p.notes}`));

  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

