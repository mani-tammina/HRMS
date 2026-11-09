const http = require('http');

function testReq(path, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 4201,
      path: path,
      method: method,
      headers: headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('Testing /api/master/shift-penalties without auth:');
  const res1 = await testReq('/api/master/shift-penalties');
  console.log('Status:', res1.statusCode, 'Body:', res1.data);

  console.log('Testing /api/shift-penalties without auth:');
  const res2 = await testReq('/api/shift-penalties');
  console.log('Status:', res2.statusCode, 'Body:', res2.data);

  console.log('Testing /api/master/leave-plan-penalties without auth:');
  const res3 = await testReq('/api/master/leave-plan-penalties');
  console.log('Status:', res3.statusCode, 'Body:', res3.data);
}

run().catch(console.error);

