function computeMetrics(rawPunches, isToday, nowMs = Date.now()) {
  if (!rawPunches || !rawPunches.length) {
    return { totalWorkHours: '0.00', grossHours: '0.00', totalWorkMinutes: 0, grossMinutes: 0, totalBreakHours: '0.00' };
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

  const punches = rawPunches.slice().sort((a, b) => parseTime(a.punch_time) - parseTime(b.punch_time));
  
  // Earliest and latest across all sources
  let earliestInMs = null;
  let latestOutMs = null;

  for (const p of punches) {
    const t = parseTime(p.punch_time);
    if (t > 0) {
      if (earliestInMs === null || t < earliestInMs) earliestInMs = t;
      if (latestOutMs === null || t > latestOutMs) latestOutMs = t;
    }
  }

  const bioPunches = punches.filter(p => isBio(p));
  const webPunches = punches.filter(p => !isBio(p));

  const workIntervals = [];

  if (bioPunches.length > 0) {
    let bioCurrentIn = null;
    let firstBioInMs = null;
    let lastBioOutMs = null;

    for (let i = 0; i < bioPunches.length; i++) {
      const p = bioPunches[i];
      const pMs = parseTime(p.punch_time);
      // Biometric devices strictly alternate IN and OUT
      const pt = bioCurrentIn ? 'out' : 'in';

      if (pt === 'in') {
        if (firstBioInMs === null) firstBioInMs = pMs;
        bioCurrentIn = p;
      } else {
        const inMs = parseTime(bioCurrentIn.punch_time);
        if (pMs > inMs) {
          workIntervals.push({ start: inMs, end: pMs });
          lastBioOutMs = pMs;
        }
        bioCurrentIn = null;
      }
    }

    if (bioCurrentIn) {
      const inMs = parseTime(bioCurrentIn.punch_time);
      if (isToday && nowMs > inMs) {
        workIntervals.push({ start: inMs, end: nowMs });
        if (latestOutMs === null || nowMs > latestOutMs) latestOutMs = nowMs;
      }
    }

    // Check if there are completed non-overlapping web sessions before the first bio punch or after the last bio punch
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
              // Only include if entirely before first biometric punch or entirely after last biometric punch
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
    // Web only (no biometric punches)
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

  // Merge any overlapping work intervals
  workIntervals.sort((a, b) => a.start - b.start);
  const mergedIntervals = [];
  for (const interval of workIntervals) {
    if (!mergedIntervals.length || mergedIntervals[mergedIntervals.length - 1].end < interval.start) {
      mergedIntervals.push({ ...interval });
    } else {
      mergedIntervals[mergedIntervals.length - 1].end = Math.max(
        mergedIntervals[mergedIntervals.length - 1].end,
        interval.end
      );
    }
  }

  const totalWorkMs = mergedIntervals.reduce((acc, curr) => acc + (curr.end - curr.start), 0);
  const totalWorkMinutes = totalWorkMs / (1000 * 60);

  let grossMinutes = 0;
  if (earliestInMs !== null) {
    const endMs = isToday && nowMs > latestOutMs ? nowMs : (latestOutMs !== null ? latestOutMs : earliestInMs);
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
    intervals: mergedIntervals
  };
}

// Test with 18 Nov punches
const punches18 = [
  { punch_time: '2026-11-18 09:28:40', source: 'web', work_mode: 'Office', punch_type: 'in' },
  { punch_time: '2026-11-18 10:20:36', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-18 11:22:24', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-18 11:27:32', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-18 13:01:16', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-18 14:11:30', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-18 15:01:03', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-18 15:19:00', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-18 16:29:19', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-18 16:48:04', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
];

// Say current time when screenshot was taken was 17:26:00
const fakeNow = new Date('2026-11-18T17:26:00+05:30').getTime();
const res18 = computeMetrics(punches18, true, fakeNow);
console.log('--- 18 NOV TEST RESULT ---');
console.log('Work hours:', res18.totalWorkHours, `(${Math.floor(res18.totalWorkMinutes/60)}h ${Math.round(res18.totalWorkMinutes%60)}m)`);
console.log('Gross hours:', res18.grossHours, `(${Math.floor(res18.grossMinutes/60)}h ${Math.round(res18.grossMinutes%60)}m)`);
console.log('Break hours:', res18.totalBreakHours);

// Test with 17 Nov punches
const punches17 = [
  { punch_time: '2026-11-17 09:01:06', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 09:02:12', source: 'web', work_mode: 'Office', punch_type: 'in' },
  { punch_time: '2026-11-17 09:56:36', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 09:56:46', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 10:01:30', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 10:16:18', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 11:43:31', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 11:43:51', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 12:38:47', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 12:45:30', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 13:05:32', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 13:06:09', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 13:21:55', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 13:22:30', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 13:22:49', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 13:43:29', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 13:49:58', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 13:52:45', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 16:32:02', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 16:33:10', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 17:14:50', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 17:24:02', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 18:13:47', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
  { punch_time: '2026-11-17 18:23:19', source: 'biometric', work_mode: 'Biometric', direction: 'in' },
  { punch_time: '2026-11-17 18:35:47', source: 'web', work_mode: 'Office', punch_type: 'out' },
  { punch_time: '2026-11-17 18:39:52', source: 'biometric', work_mode: 'Biometric', direction: 'out' },
];

const res17 = computeMetrics(punches17, false);
console.log('\n--- 17 NOV TEST RESULT ---');
console.log('Work hours:', res17.totalWorkHours, `(${Math.floor(res17.totalWorkMinutes/60)}h ${Math.round(res17.totalWorkMinutes%60)}m)`);
console.log('Gross hours:', res17.grossHours, `(${Math.floor(res17.grossMinutes/60)}h ${Math.round(res17.grossMinutes%60)}m)`);
console.log('Break hours:', res17.totalBreakHours);

