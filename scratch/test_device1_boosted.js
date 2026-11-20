const ZKLib = require('node-zklib');

// Boosted monkey patch
const ZKLibTCP = require('node-zklib/zklibtcp');
if (ZKLibTCP && ZKLibTCP.prototype) {
  const origWriteMessage = ZKLibTCP.prototype.writeMessage;
  ZKLibTCP.prototype.writeMessage = function (msg, connect) {
    if (!this.socket || this.socket.destroyed || this.socket.writableEnded || !this.socket.writable) {
      return Promise.reject(new Error('SOCKET_NOT_WRITABLE_OR_ENDED'));
    }
    // Give 6 seconds for CMD_CONNECT response on busy devices
    if (connect && (!this.timeout || this.timeout < 6000)) {
      this.timeout = 6000;
    }
    return origWriteMessage.call(this, msg, connect);
  };
}

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
    
    await zk.disconnect();
  } catch (err) {
    console.error(`  Error:`, (err.err && err.err.message) || err.message || err);
    try { await zk.disconnect(); } catch (_) {}
  }
}

async function run() {
  await testDevice('Device 1 (SVS 3rd)', '30.0.1.38');
  process.exit(0);
}

run();

