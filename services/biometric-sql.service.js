/**
 * BIOMETRIC MSSQL SERVICE
 * =======================
 * Manages read-only connection to external Microsoft SQL Server (BiometricSyncDB).
 */

const sql = require('mssql');
require('dotenv').config();

const serverHost = (process.env.BIOMETRIC_SQL_SERVER || '30.0.1.88').split('\\')[0];
const instance = process.env.BIOMETRIC_SQL_INSTANCE || 'SQLEXPRESS';

const config = {
  server: serverHost,
  database: process.env.BIOMETRIC_SQL_DATABASE || 'BiometricSyncDB',
  user: process.env.BIOMETRIC_SQL_USER || 'root',
  password: process.env.BIOMETRIC_SQL_PASSWORD || 'root',
  options: {
    instanceName: instance,
    encrypt: process.env.BIOMETRIC_SQL_ENCRYPT === 'true',
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 10000,
    requestTimeout: 30000
  },
  pool: {
    max: 5,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool = null;

async function getBiometricPool() {
  if (pool && pool.connected) {
    return pool;
  }

  try {
    if (pool) {
      try { await pool.close(); } catch (_) {}
    }
    pool = await new sql.ConnectionPool(config).connect();
    console.log(`✅ [Biometric MSSQL] Connected to database '${config.database}' on '${config.server}\\${instance}'`);
    return pool;
  } catch (err) {
    console.error(`❌ [Biometric MSSQL] Connection error to '${config.server}\\${instance}':`, err.message);
    throw err;
  }
}

async function testConnection() {
  try {
    const connPool = await getBiometricPool();
    const result = await connPool.request().query('SELECT @@SERVERNAME AS ServerName, DB_NAME() AS CurrentDB, GETDATE() AS CurrentTime');
    return {
      success: true,
      data: result.recordset[0]
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

module.exports = {
  sql,
  getBiometricPool,
  testConnection,
  config
};
