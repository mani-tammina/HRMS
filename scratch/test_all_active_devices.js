const ZKLib = require('node-zklib');

async function testDevice(name, ip, port = 4370) {
  console.log(`\nTesting ${name} (${ip}:${port})...`);
  const zk = new ZKLib(ip, port, 10000, 4000);
  try {
    const t0 = Date.now();
    await zk.createSocket();
    const tConn = Date.now() - t0;
    console.log(`  Connected in ${tConn}ms`);
    
    const t1 = Date.now();
    const res = await Promise.race([
      zk.getAttendances(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('90s timeout')), 90000))
    ]);
    const tFetch = Date.now() - t1;
    const logs = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
    console.log(`  Fetched ${logs.length} logs in ${tFetch}ms`);
    
    if (logs.length > 0) {
      const latest = logs[logs.length - 1];
      console.log(`  Latest log:`, latest);
    }
    
    await zk.disconnect();
  } catch (err) {
    console.error(`  Error:`, (err.err && err.err.message) || err.message || err);
    try { await zk.disconnect(); } catch (_) {}
  }
}

async function run() {
  const devices = [
    { name: 'Device 1 (SVS 3rd)', ip: '30.0.1.38' },
    { name: 'Device 2 (SVS 1st)', ip: '30.0.1.36' },
    { name: 'Device 3 (SVS 4th)', ip: '30.0.1.39' },
    { name: 'Device 4 (TSN 3RD A)', ip: '192.168.2.10' },
    { name: 'Device 6 (TSN 1ST)', ip: '192.168.30.7' },
    { name: 'Device 9 (HYD SITE-B 1)', ip: '192.168.55.102' },
    { name: 'Device 10 (HYD SITE-B 2)', ip: '192.168.55.105' }
  ];

  for (const d of devices) {
    await testDevice(d.name, d.ip);
  }
  process.exit(0);
}

run();

