const { syncSingleDevice } = require('../services/biometric-direct.service');
const { db } = require('../config/database');

(async () => {
  const c = await db();
  try {
    const [devices] = await c.query('SELECT * FROM biometric_devices WHERE device_id = "1"');
    if (devices.length > 0) {
      console.log('Testing sync for Device #1 (SVS 3rd Floor, 30.0.1.38:4370)...');
      const res = await syncSingleDevice(devices[0]);
      console.log('Sync result for Device #1:', res);
    }
  } catch(e) {
    console.error('Error syncing Device #1:', e);
  } finally {
    c.end();
  }
})();
