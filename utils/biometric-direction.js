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
 */
function mapBiometricPunchesWithDirection(punches) {
  const bioOpenByDevice = new Map();
  const mapped = [];
  for (const p of punches) {
    const devKey = String(p.device_id || p.location || 'default').trim();
    const devOpen = bioOpenByDevice.get(devKey) || false;
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
