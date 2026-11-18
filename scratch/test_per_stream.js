function calculateMetricsPerStream(rawPunches, isToday, nowMs = Date.now()) {
  if (!rawPunches || !rawPunches.length) {
    return { totalWorkHours: '0.00', grossHours: '0.00', totalBreakHours: '0.00', totalWorkMinutes: 0, grossMinutes: 0 };
  }

  const parseTime = (val) => {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    if (val instanceof Date) return val.getTime();
    if (typeof val === 'string') {
      const clean = val.trim();
      if (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2})?(\.\d+)?$/.test(clean)) {
        return new Date(`${clean.replace(' ', 'T')}+05:30`).getTime();
      }
      return new Date(clean).getTime();
    }
    return 0;
  };

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

  // 1. Filter out synthetic 'Biometric Check-In' entries from attendance_punches
  const cleanPunches = rawPunches.filter(p => !(p.notes || '').includes('Biometric Check-In'));

  // 2. Earliest and latest punch time across all valid sources
  let earliestInMs = null;
  let latestOutMs = null;
  for (const p of cleanPunches) {
    const t = parseTime(p.punch_time);
    if (t > 0) {
      if (earliestInMs === null || t < earliestInMs) earliestInMs = t;
      if (latestOutMs === null || t > latestOutMs) latestOutMs = t;
    }
  }

  // 3. Deduplicate exact same-second punches on the same device/stream
  const sortedPunches = cleanPunches.slice().sort((a, b) => parseTime(a.punch_time) - parseTime(b.punch_time));
  const uniquePunches = [];
  for (const p of sortedPunches) {
    const pMs = parseTime(p.punch_time);
    const lastP = uniquePunches.length ? uniquePunches[uniquePunches.length - 1] : null;
    if (lastP) {
      const lastMs = parseTime(lastP.punch_time);
      const sameSource = (p.source || 'web') === (lastP.source || 'web');
      const pDev = String(p.device_id || p.device_info || p.location || '').trim();
      const lastDev = String(lastP.device_id || lastP.device_info || lastP.location || '').trim();
      if (pMs === lastMs && sameSource && pDev === lastDev) {
        continue;
      }
    }
    uniquePunches.push(p);
  }

  const bioPunches = uniquePunches.filter(p => isBio(p));
  const webPunches = uniquePunches.filter(p => !isBio(p));
  const workIntervals = [];

  if (bioPunches.length > 0) {
    // Group bio punches by device/location stream so multi-floor/device punches alternate cleanly
    const bioStreamMap = new Map();
    for (const bp of bioPunches) {
      const streamKey = String(bp.device_id || bp.location || 'default').trim();
      if (!bioStreamMap.has(streamKey)) bioStreamMap.set(streamKey, []);
      bioStreamMap.get(streamKey).push(bp);
    }

    let firstBioInMs = null;
    let lastBioOutMs = null;

    bioStreamMap.forEach((streamPunches) => {
      streamPunches.sort((a, b) => parseTime(a.punch_time) - parseTime(b.punch_time));
      let currentIn = null;
      for (const p of streamPunches) {
        const pMs = parseTime(p.punch_time);
        const pt = currentIn ? 'out' : 'in';
        if (pt === 'in') {
          if (firstBioInMs === null || pMs < firstBioInMs) firstBioInMs = pMs;
          currentIn = p;
        } else {
          const inMs = parseTime(currentIn.punch_time);
          if (pMs > inMs) {
            workIntervals.push({ start: inMs, end: pMs });
            if (lastBioOutMs === null || pMs > lastBioOutMs) lastBioOutMs = pMs;
          }
          currentIn = null;
        }
      }
      if (currentIn && isToday) {
        const inMs = parseTime(currentIn.punch_time);
        if (nowMs > inMs) {
          workIntervals.push({ start: inMs, end: nowMs });
          if (latestOutMs === null || nowMs > latestOutMs) latestOutMs = nowMs;
        }
      }
    });

    // Check for completed non-overlapping web sessions outside biometric hours
    if (webPunches.length > 0) {
      let webCurrentIn = null;
      for (const wp of webPunches) {
        const wpMs = parseTime(wp.punch_time);
        const wpt = (wp.punch_type || wp.direction || '').toLowerCase();
        const isAuto = (wp.notes || '').includes('OUT Missing') || (wp.notes || '').includes('Auto Clock-Out');

        if (wpt === 'in') {
          webCurrentIn = wp;
        } else if (wpt === 'out') {
          if (webCurrentIn && !isAuto) {
            const winMs = parseTime(webCurrentIn.punch_time);
            if (wpMs > winMs) {
              if (firstBioInMs !== null && wpMs <= firstBioInMs) {
                workIntervals.push({ start: winMs, end: wpMs });
              } else if (lastBioOutMs !== null && winMs >= lastBioOutMs) {
                workIntervals.push({ start: winMs, end: wpMs });
              }
            }
          }
          webCurrentIn = null;
        }
      }
    }
  } else {
    // Web / Remote only
    let webCurrentIn = null;
    for (const p of webPunches) {
      const pMs = parseTime(p.punch_time);
      const pt = (p.punch_type || p.direction || '').toLowerCase();
      const isAuto = (p.notes || '').includes('OUT Missing') || (p.notes || '').includes('Auto Clock-Out');

      if (pt === 'in') {
        if (webCurrentIn) {
          const prevMs = parseTime(webCurrentIn.punch_time);
          if (pMs > prevMs) workIntervals.push({ start: prevMs, end: pMs });
        }
        webCurrentIn = p;
      } else if (pt === 'out') {
        if (webCurrentIn && !isAuto) {
          const inMs = parseTime(webCurrentIn.punch_time);
          if (pMs > inMs) workIntervals.push({ start: inMs, end: pMs });
        }
        webCurrentIn = null;
      }
    }

    if (webCurrentIn && isToday) {
      const inMs = parseTime(webCurrentIn.punch_time);
      if (nowMs > inMs) {
        workIntervals.push({ start: inMs, end: nowMs });
        if (latestOutMs === null || nowMs > latestOutMs) latestOutMs = nowMs;
      }
    }
  }

  // Merge overlapping intervals (e.g. employee clocked in on 4th floor and 3rd floor simultaneously)
  workIntervals.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const interval of workIntervals) {
    if (!merged.length || merged[merged.length - 1].end < interval.start) {
      merged.push({ ...interval });
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, interval.end);
    }
  }

  const totalWorkMs = merged.reduce((acc, curr) => acc + (curr.end - curr.start), 0);
  const totalWorkMinutes = totalWorkMs / (1000 * 60);

  let grossMinutes = 0;
  if (earliestInMs !== null) {
    const endMs = isToday && nowMs > (latestOutMs || 0) ? nowMs : (latestOutMs !== null ? latestOutMs : earliestInMs);
    if (endMs > earliestInMs) {
      grossMinutes = (endMs - earliestInMs) / (1000 * 60);
    }
  }
  const totalBreakMinutes = Math.max(0, grossMinutes - totalWorkMinutes);

  return {
    totalWorkHours: (totalWorkMinutes / 60).toFixed(2),
    grossHours: (grossMinutes / 60).toFixed(2),
    totalBreakHours: (totalBreakMinutes / 60).toFixed(2),
    totalWorkMinutes,
    grossMinutes,
    intervalsCount: merged.length
  };
}

const db = require('../config/database');
async function test() {
  const conn = await db.db();
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

  const allPunches = [...wRange, ...bioRange];
  const res = calculateMetricsPerStream(allPunches, false);
  console.log('Result of calculateMetricsPerStream for 16 Nov:');
  console.log('Work hours:', res.totalWorkHours, `(${Math.floor(res.totalWorkMinutes/60)}h ${Math.round(res.totalWorkMinutes%60)}m)`);
  console.log('Gross hours:', res.grossHours, `(${Math.floor(res.grossMinutes/60)}h ${Math.round(res.grossMinutes%60)}m)`);
  console.log('Break hours:', res.totalBreakHours);

  await conn.end();
  process.exit(0);
}
test();

