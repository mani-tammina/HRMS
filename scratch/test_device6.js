const ZKLib = require('node-zklib');

const ZKLibTCP = require('node-zklib/zklibtcp');
if (ZKLibTCP && ZKLibTCP.prototype) {
  const origWriteMessage = ZKLibTCP.prototype.writeMessage;
  ZKLibTCP.prototype.writeMessage = function (msg, connect) {
    if (!this.socket || this.socket.destroyed || this.socket.writableEnded || !this.socket.writable) {
      return Promise.reject(new Error('SOCKET_NOT_WRITABLE_OR_ENDED'));
    }
    // By passing false, it uses this.timeout (at least 6000ms) instead of the hardcoded 2000ms
    if (!this.timeout || this.timeout < 6000) {
      this.timeout = 6000;
    }
    return origWriteMessage.call(this, msg, false);
  };
}

async function testDevice6() {
  console.log("Testing Device 6 (192.168.30.7:4370)...");
  const zk = new ZKLib('192.168.30.7', 4370, 10000, 4000);
  try {
    const t0 = Date.now();
    await zk.createSocket();
    console.log(`Connected in ${Date.now() - t0}ms`);
    const res = await zk.getAttendances();
    const logs = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
    console.log(`Fetched ${logs.length} logs!`);
    await zk.disconnect();
  } catch (err) {
    console.error("Error:", (err.err && err.err.message) || err.message || err);
    try { await zk.disconnect(); } catch (_) {}
  }
  process.exit(0);
}

testDevice6();

