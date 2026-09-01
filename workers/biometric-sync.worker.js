/**
 * STANDALONE BIOMETRIC SYNC WORKER
 * =================================
 * Runs as a dedicated background process.
 * Periodically triggers sync from MS SQL Server into MySQL biometric tables.
 *
 * Usage:
 *   node workers/biometric-sync.worker.js
 * Or via PM2:
 *   pm2 start workers/biometric-sync.worker.js --name "hrms-biometric-worker"
 */

require('dotenv').config();
const { syncBiometricLogs, getSyncState } = require('../services/biometric-sync.service');

const intervalSeconds = parseInt(process.env.BIOMETRIC_SYNC_INTERVAL_SECONDS || '60', 10);
const intervalMs = intervalSeconds * 1000;
let isRunning = false;

console.log('🚀 [Biometric Worker] Starting dedicated Biometric Sync Worker process...');
console.log(`⏱️  [Biometric Worker] Sync interval: ${intervalSeconds}s`);

async function runSyncCycle() {
  if (isRunning) {
    console.log('⏳ [Biometric Worker] Previous sync cycle still active, skipping tick.');
    return;
  }

  isRunning = true;
  try {
    const result = await syncBiometricLogs({ batchSize: 1000 });
    if (result.success) {
      if (result.rowsRead > 0) {
        console.log(`✅ [Biometric Worker] Synced ${result.rowsRead} rows (${result.rowsInserted} inserted, ${result.rowsSkipped} skipped). Watermark: ${result.watermarkAfter}`);
      }
    } else {
      console.warn('⚠️ [Biometric Worker] Sync cycle warning/error:', result.message || result.error);
    }
  } catch (err) {
    console.error('❌ [Biometric Worker] Unhandled sync error:', err.message);
  } finally {
    isRunning = false;
  }
}

// Initial sync on launch
runSyncCycle();

// Set interval loop
const timer = setInterval(runSyncCycle, intervalMs);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[Biometric Worker] Received SIGINT, shutting down gracefully...');
  clearInterval(timer);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n[Biometric Worker] Received SIGTERM, shutting down gracefully...');
  clearInterval(timer);
  process.exit(0);
});
