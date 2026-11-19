/**
 * BIOMETRIC LIVE PING SERVICE
 * ===========================
 * Continuously tests TCP reachability (port 4370) of physical biometric machines
 * every 1 second and maintains an in-memory live status cache.
 *
 * Provides real-time Online / Offline state and latency without touching the
 * database on every ping, and prevents device network socket exhaustion.
 */

const net = require('net');
const { db } = require('../config/database');

// In-memory status map: { [deviceId]: { deviceId, online, latency, ip, port, lastChecked } }
const deviceStatusMap = new Map();

// Cached device configurations: Array of { id, device_id, name, host, port }
let cachedDevices = [];
let lastDeviceListFetch = 0;
let isPinging = false;
let pingIntervalId = null;

/**
 * Fast TCP probe to device host and port (default 4370 for ZKTeco/eSSL/Realtime)
 * Aborts quickly (timeoutMs) so offline terminals do not stall the loop.
 */
function probeDevice(host, port = 4370, timeoutMs = 700) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    const socket = new net.Socket();
    socket.setTimeout(timeoutMs);

    let finished = false;
    const cleanup = () => {
      if (finished) return;
      finished = true;
      socket.removeAllListeners();
      socket.destroy();
    };

    socket.once('connect', () => {
      const latency = Date.now() - t0;
      cleanup();
      resolve({ online: true, latency });
    });

    socket.once('timeout', () => {
      cleanup();
      resolve({ online: false, latency: null, reason: 'timeout' });
    });

    socket.once('error', (err) => {
      cleanup();
      resolve({ online: false, latency: null, reason: err.code || err.message });
    });

    try {
      socket.connect(port, host);
    } catch (err) {
      cleanup();
      resolve({ online: false, latency: null, reason: err.message });
    }
  });
}

/**
 * Reloads the registered active devices from database into memory
 */
async function refreshDeviceList() {
  try {
    const [rows] = await db.query(
      `SELECT id, device_id, name, ip_address, status FROM biometric_devices WHERE status != 'inactive'`
    );

    cachedDevices = rows.map((r) => {
      let host = (r.ip_address || '').trim();
      let port = 4370;
      if (host.includes(':')) {
        const parts = host.split(':');
        host = parts[0].trim();
        port = parseInt(parts[1], 10) || 4370;
      }
      return {
        id: r.id,
        deviceId: String(r.device_id),
        name: r.name,
        host,
        port
      };
    });

    lastDeviceListFetch = Date.now();
  } catch (err) {
    console.warn('[BiometricPing] Failed to fetch device list:', err.message);
  }
}

/**
 * Performs concurrent reachability checks on all cached devices
 */
async function pingAllDevices() {
  if (isPinging) return;
  isPinging = true;

  try {
    // Refresh device list from DB every 30 seconds
    if (Date.now() - lastDeviceListFetch > 30000 || cachedDevices.length === 0) {
      await refreshDeviceList();
    }

    if (cachedDevices.length === 0) {
      return;
    }

    const checks = cachedDevices.map(async (dev) => {
      if (!dev.host) {
        deviceStatusMap.set(dev.deviceId, {
          deviceId: dev.deviceId,
          name: dev.name,
          online: false,
          latency: null,
          ip: null,
          lastChecked: new Date()
        });
        return;
      }

      const res = await probeDevice(dev.host, dev.port, 700);
      deviceStatusMap.set(dev.deviceId, {
        deviceId: dev.deviceId,
        name: dev.name,
        online: res.online,
        latency: res.latency,
        ip: dev.host,
        port: dev.port,
        lastChecked: new Date()
      });
    });

    await Promise.allSettled(checks);
  } catch (err) {
    console.warn('[BiometricPing] Ping sweep error:', err.message);
  } finally {
    isPinging = false;
  }
}

/**
 * Start the 1-second ping loop
 */
function startPingService(intervalMs = 1000) {
  if (pingIntervalId) return;
  // Trigger immediate initial run
  pingAllDevices().catch(() => {});
  pingIntervalId = setInterval(pingAllDevices, intervalMs);
  console.log(`📡 [BiometricPingService] Started live ping loop (${intervalMs}ms interval).`);
}

/**
 * Stop the ping loop
 */
function stopPingService() {
  if (pingIntervalId) {
    clearInterval(pingIntervalId);
    pingIntervalId = null;
  }
}

/**
 * Returns plain object of live statuses: { [deviceId]: { deviceId, online, latency, ip, port, lastChecked } }
 */
function getDeviceStatusMap() {
  const result = {};
  for (const [id, stat] of deviceStatusMap.entries()) {
    result[id] = stat;
  }
  return result;
}

// Automatically start background ping loop
startPingService(1000);

module.exports = {
  probeDevice,
  pingAllDevices,
  refreshDeviceList,
  startPingService,
  stopPingService,
  getDeviceStatusMap
};

