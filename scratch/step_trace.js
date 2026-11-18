const { db } = require('../config/database');

async function run() {
  let conn;
  try {
    conn = await db();
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

    // Step through the bio loop inside calculateAttendanceMetrics:
    const parseTime = (val) => new Date(val).getTime();
    const isUserAgent = (dev) => {
      const lower = (dev || '').toLowerCase();
      return lower.includes('mozilla') || lower.includes('applewebkit') || lower.includes('chrome') || lower.includes('safari') || lower.includes('windows nt') || dev.length > 20;
    };
    const isBio = (p) => {
      if (!p) return false;
      const src = (p.source || '').toLowerCase();
      const wm = (p.work_mode || '').toLowerCase();
      const notes = (p.notes || '').toLowerCase();
      const dev = String(p.device_info != null ? p.device_info : (p.device_id != null ? p.device_id : '')).trim();
      if (src === 'biometric' || wm === 'biometric' || notes.includes('biometric')) return true;
      if (!isUserAgent(dev) && (dev && (/^\d+$/.test(dev) || dev.toLowerCase().includes('device') || dev.toLowerCase().includes('floor') || dev.toLowerCase().includes('svs')))) return true;
      return false;
    };

    const bioPunches = dayPunches.filter(p => isBio(p));
    const webPunches = dayPunches.filter(p => !isBio(p));
    console.log('bioPunches count:', bioPunches.length);
    console.log('webPunches count:', webPunches.length);

    console.log('\n--- Trace bioPunches ---');
    let bioCurrentIn = null;
    const workIntervals = [];
    for (let i = 0; i < bioPunches.length; i++) {
      const p = bioPunches[i];
      const pMs = parseTime(p.punch_time);
      const pt = bioCurrentIn ? 'out' : 'in';
      console.log(`Punch ${i+1}: ${p.punch_time} [${p.source}] pt=${pt}`);
      if (pt === 'in') {
        bioCurrentIn = p;
      } else {
        const inMs = parseTime(bioCurrentIn.punch_time);
        const mins = (pMs - inMs) / 60000;
        console.log(`   --> WORK INTERVAL: ${bioCurrentIn.punch_time} to ${p.punch_time} (${mins.toFixed(1)}m)`);
        workIntervals.push({ start: inMs, end: pMs, mins });
        bioCurrentIn = null;
      }
    }
    const totalBioMins = workIntervals.reduce((a, b) => a + b.mins, 0);
    console.log(`Total Bio Work Mins: ${totalBioMins} (${(totalBioMins/60).toFixed(2)}h)`);

    console.log('\n--- Trace webPunches ---');
    console.log(webPunches);

  } catch (e) {
    console.error(e);
  } finally {
    if (conn) await conn.end();
    process.exit(0);
  }
}
run();

