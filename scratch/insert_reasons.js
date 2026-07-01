const http = require('http');

const reasons = [
  "Career Growth",
  "Better Opportunity",
  "Higher Studies",
  "Relocation",
  "Personal Reasons",
  "Health Reasons",
  "Work Environment",
  "Compensation",
  "Family Commitments",
  "Other"
];

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzgyODg0NTcyLCJleHAiOjE3ODI5MTMzNzJ9.nACA2VWSzmIRnFlVvRU2gd1uSwzXBZFqifgzI05rhF8';

const options = {
  hostname: 'hrms.tamminahub.com',
  port: 80,
  path: '/api/separation/reasons',
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

async function insertAll() {
  for (let reason of reasons) {
    await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`Response for ${reason}: ${res.statusCode} ${data}`);
          resolve();
        });
      });

      req.on('error', e => {
        console.error(`Error for ${reason}:`, e.message);
        resolve(); // Continue even on error
      });

      req.write(JSON.stringify({
        reason: reason,
        description: reason,
        is_active: 1
      }));
      req.end();
    });
  }
}

insertAll();
