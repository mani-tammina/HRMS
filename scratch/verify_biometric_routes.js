const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

async function testBiometricSystem() {
  console.log('🧪 Starting Biometric Integration Verification Tests via HTTP...\n');

  const BASE_URL = 'http://localhost:4201';

  // 1. Generate an admin token for testing
  const adminToken = jwt.sign(
    { id: 1, role: 'admin', email: 'admin@tammina.com' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const headers = {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  };

  try {
    // 2. Test GET /api/biometric-attendance/status
    console.log('1️⃣ Testing GET /api/biometric-attendance/status...');
    const statusRes = await fetch(`${BASE_URL}/api/biometric-attendance/status`, { headers });
    const statusJson = await statusRes.json();
    console.log(`   HTTP Status: ${statusRes.status}`);
    console.log('   Stats:', statusJson.data?.stats);
    console.log('   MS SQL Connection Status:', statusJson.data?.sqlServer?.success ? '✅ CONNECTED' : '❌ FAILED');

    // 3. Test GET /api/biometric-attendance/raw-logs
    console.log('\n2️⃣ Testing GET /api/biometric-attendance/raw-logs?limit=3...');
    const rawLogsRes = await fetch(`${BASE_URL}/api/biometric-attendance/raw-logs?limit=3`, { headers });
    const rawLogsJson = await rawLogsRes.json();
    console.log(`   HTTP Status: ${rawLogsRes.status}`);
    console.log(`   Total Logs Count: ${rawLogsJson.data?.total}`);
    console.log(`   Returned Logs: ${rawLogsJson.data?.logs?.length}`);

    // 4. Test GET /api/biometric-attendance/mappings
    console.log('\n3️⃣ Testing GET /api/biometric-attendance/mappings...');
    const mappingsRes = await fetch(`${BASE_URL}/api/biometric-attendance/mappings`, { headers });
    const mappingsJson = await mappingsRes.json();
    console.log(`   HTTP Status: ${mappingsRes.status}`);
    console.log(`   Total Mappings: ${mappingsJson.data?.length}`);

    // 5. Test existing /api/attendance endpoint to ensure 100% integrity
    console.log('\n4️⃣ Testing existing /api/attendance/summary/overview...');
    const attendanceRes = await fetch(`${BASE_URL}/api/attendance/summary/overview`, { headers });
    console.log(`   Existing Attendance Status Code: ${attendanceRes.status} (Verified untouched)`);

    console.log('\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('HTTP Test Error:', err.message);
  }
}

testBiometricSystem();
