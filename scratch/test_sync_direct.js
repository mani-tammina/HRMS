const { syncDirectBiometricDevices } = require('../services/biometric-direct.service');

async function main() {
  console.log("=== Testing Optimized syncDirectBiometricDevices ===");
  const t0 = Date.now();
  const res = await syncDirectBiometricDevices();
  const tTotal = Date.now() - t0;
  console.log(`\nCompleted in ${tTotal}ms:`);
  console.log(`Devices: ${res.devicesCount}, Online: ${res.onlineCount}`);
  for (const r of (res.results || [])) {
    console.log(`- Device #${r.deviceId} (${r.name}): success=${r.success}, logsRead=${r.logsRead || 0}, recentProcessed=${r.recentLogsProcessed || 0}, rawInserted=${r.rawInserted || 0}, mapped=${r.mappedPunches || 0}, error=${r.error || 'none'}`);
  }
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

