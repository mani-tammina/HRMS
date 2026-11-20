// Test simulation of punches from user image media_1795002965039_e88d3a12.png
const punches = [
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

console.log('--- OLD LOGIC SIMULATION ---');
let currentIn = null;
const oldIntervals = [];
for (const p of punches) {
  let pt = (p.punch_type || p.direction || '').toLowerCase();
  if (pt === 'auto' || !pt || p.source === 'biometric' || p.work_mode === 'Biometric') {
    pt = currentIn ? 'out' : 'in';
  }
  const timeStr = p.punch_time.split(' ')[1];
  console.log(`Punch ${timeStr} (${p.source}): evaluated punchType = ${pt.toUpperCase()}`);
  if (pt === 'in') {
    currentIn = p;
  } else if (pt === 'out') {
    if (currentIn) {
      const inTime = currentIn.punch_time.split(' ')[1];
      const diffMins = (new Date(p.punch_time).getTime() - new Date(currentIn.punch_time).getTime()) / 60000;
      oldIntervals.push({ inTime, outTime: timeStr, diffMins });
      currentIn = null;
    }
  }
}
console.log('\nOld intervals (sessions counted as work):');
let totalOldMins = 0;
oldIntervals.forEach(iv => {
  totalOldMins += iv.diffMins;
  console.log(`  ${iv.inTime} -> ${iv.outTime} = ${iv.diffMins.toFixed(1)} mins`);
});
const h = Math.floor(totalOldMins / 60);
const m = Math.round(totalOldMins % 60);
console.log(`TOTAL OLD WORK: ${h}h ${m}m (${(totalOldMins/60).toFixed(2)}h)`);

