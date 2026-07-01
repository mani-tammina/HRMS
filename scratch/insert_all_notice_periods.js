const http = require('http');
const https = require('https');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzgyODg0NTcyLCJleHAiOjE3ODI5MTMzNzJ9.nACA2VWSzmIRnFlVvRU2gd1uSwzXBZFqifgzI05rhF8';

function request(urlStr, options, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const mod = parsed.protocol === 'https:' ? https : http;
    const reqOpts = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = mod.request(reqOpts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on('error', e => reject(e));

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

async function run() {
  // Fetch all departments
  const deptsUrl = 'http://hrms.tamminahub.com/api/departments';
  let deptsResponse = await request(deptsUrl, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
  });

  const depts = JSON.parse(deptsResponse.body);
  console.log(`Fetched ${depts.length} departments from remote.`);

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  for (let dept of depts) {
    // We will POST to the API. If it exists it will update, if not it will insert.
    // For IT Services Technology, we keep 900 days as per the previous image, others default to 30.
    const days = (dept.name === 'IT Services Technology') ? 900 : 30;
    
    const payload = JSON.stringify({
      department_id: dept.id,
      notice_period_days: days,
      is_active: 1
    });

    const postUrl = 'http://hrms.tamminahub.com/api/separation/notice-periods';
    const postRes = await request(postUrl, { method: 'POST', headers }, payload);
    console.log(`Response for ${dept.name} (${days} days): ${postRes.statusCode} ${postRes.body}`);
  }
}

run().catch(e => console.error(e));
