/**
 * Shared biometric punch direction resolver.
 * Preserves explicit hardware OUT punches (e.g. ZKTeco punchState 1/5 or direction='out')
 * even when no prior IN punch exists (anti-passback / IN Missing), while keeping
 * alternating IN/OUT behavior for toggle-only devices.
 */

function getExplicitPunchState(punch) {
  if (!punch) return null;
  let payload = punch.rawPayload ?? punch.raw_payload;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (_) {
      payload = null;
    }
  }
  if (payload && payload.punchState !== undefined && payload.punchState !== null) {
    const ps = Number(payload.punchState);
    if (!Number.isNaN(ps)) return ps;
  }
  return null;
}

function isExplicitOutPunch(punch) {
  if (!punch) return false;
  const ps = getExplicitPunchState(punch);
  if (ps === 1 || ps === 5) return true;
  const dir = String(punch.direction || punch.punch_type || '').toLowerCase().trim();
  return dir === 'out';
}

/**
 * Resolve the effective direction ('in' | 'out') for a single biometric punch
 * given whether the device stream currently has an open IN session.
 */
function resolveBiometricPunchDirection(punch, isOpen) {
  const ps = getExplicitPunchState(punch);
  if (ps === 1 || ps === 5) {
    return { direction: 'out', nextIsOpen: false };
  }
  const rawDir = String(punch?.direction || punch?.punch_type || '').toLowerCase().trim();
  if (!isOpen && rawDir === 'out') {
    return { direction: 'out', nextIsOpen: false };
  }
  const direction = isOpen ? 'out' : 'in';
  return { direction, nextIsOpen: !isOpen };
}

/**
 * Map a chronologically sorted list of biometric punches to include `punch_type`
 * per device stream, skipping any leading orphan OUT punch (e.g. anti-passback reset)
 * so the day starts at the first IN punch.
 *
 * Also supports a fallback when hardware `punchState` is absent from `raw_payload`:
 * if `options.prevDayHadMissingOut` is true and the first two punches on a device
 * are within 120 seconds of each other, the 1st punch is treated as the anti-passback
 * OUT reset and skipped.
 */
function mapBiometricPunchesWithDirection(punches, options = {}) {
  const prevDayHadMissingOut = Boolean(options.prevDayHadMissingOut);
  const bioOpenByDevice = new Map();
  const mapped = [];

  for (let i = 0; i < punches.length; i++) {
    const p = punches[i];
    const devKey = String(p.device_id || p.location || 'default').trim();
    const devOpen = bioOpenByDevice.get(devKey) || false;

    // Fallback for devices/records missing punchState:
    // Yesterday had an unclosed IN (OUT Missing) and today's first two punches are <= 120s apart
    if (!devOpen && mapped.length === 0 && prevDayHadMissingOut && getExplicitPunchState(p) === null) {
      const nextSameDev = punches.slice(i + 1).find(
        (np) => String(np.device_id || np.location || 'default').trim() === devKey
      );
      if (nextSameDev) {
        const t1 = new Date(String(p.punch_time).replace(' ', 'T')).getTime();
        const t2 = new Date(String(nextSameDev.punch_time).replace(' ', 'T')).getTime();
        if (!Number.isNaN(t1) && !Number.isNaN(t2) && (t2 - t1) >= 0 && (t2 - t1) <= 120 * 1000) {
          continue; // Skip anti-passback OUT reset punch and start at the IN punch
        }
      }
    }

    const { direction, nextIsOpen } = resolveBiometricPunchDirection(p, devOpen);
    bioOpenByDevice.set(devKey, nextIsOpen);
    if (!devOpen && direction === 'out') {
      continue; // Skip leading OUT punch and take the first IN punch
    }
    mapped.push({
      ...p,
      punch_type: direction
    });
  }
  return mapped;
}

module.exports = {
  getExplicitPunchState,
  isExplicitOutPunch,
  resolveBiometricPunchDirection,
  mapBiometricPunchesWithDirection
};
