require('dotenv').config();
const { db } = require('../config/database');
const jwt = require('jsonwebtoken');
const http = require('http');

function postJson(path, payload, token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: 'localhost',
      port: 4201,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': 'Bearer ' + token
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (_) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function putJson(path, payload, token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: 'localhost',
      port: 4201,
      path: path,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': 'Bearer ' + token
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (_) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  const token = jwt.sign({ id: 1, email: 'admin@example.com', role: 'admin' }, process.env.JWT_SECRET || 'secret');
  const c = await db();

  try {
    console.log('--- 1. Testing Preview for 2026-10 before hold ---');
    const prev1 = await postJson('/api/payroll/v2/runs/preview', { year: 2026, month: 10 }, token);
    const est1 = prev1.data?.data?.estimate || {};
    console.log('Before Hold: totalGross =', est1.totalGross, 'totalNet =', est1.totalNet, 'totalPayout =', est1.totalPayout, 'totalHeld =', est1.totalHeld);

    // Let's create a custom hold for employee 53 in 2026-10 (hold 20000)
    console.log('\n--- 2. Putting Employee 53 on CUSTOM Hold (INR 20,000) ---');
    await c.query("DELETE FROM payroll_salary_holds WHERE employee_id = 53 AND payroll_month = '2026-10'");
    const holdRes = await postJson('/api/payroll/v2/salaries-on-hold-arrears/hold', {
      employee_id: 53,
      month: '2026-10',
      hold_type: 'CUSTOM',
      hold_reason: 'Asset Return Pending',
      remarks: 'Holding 20k for laptop',
      held_gross_amount: 20000,
      held_net_amount: 20000
    }, token);
    console.log('Hold created:', holdRes.data);
    const holdId = holdRes.data?.id;

    console.log('\n--- 3. Testing Preview for 2026-10 WITH CUSTOM HOLD ---');
    const prev2 = await postJson('/api/payroll/v2/runs/preview', { year: 2026, month: 10 }, token);
    const est2 = prev2.data?.data?.estimate || {};
    console.log('With Custom Hold: totalNet =', est2.totalNet, 'totalPayout =', est2.totalPayout, 'totalHeld =', est2.totalHeld);
    const emp53 = prev2.data?.data?.detailedPreview?.find(e => e.employee_id === 53);
    console.log('Employee 53 preview:', {
      name: emp53?.full_name,
      total_net: emp53?.total_net,
      held_amount: emp53?.held_amount,
      total_net_payout: emp53?.total_net_payout,
      hold_status: emp53?.hold_status,
      is_on_hold: emp53?.is_on_hold
    });

    console.log('\n--- 4. Testing Releasing Hold in November 2026 (release_month: 2026-11) ---');
    const relRes = await putJson(`/api/payroll/v2/salaries-on-hold-arrears/hold/${holdId}/release`, {
      release_month: '2026-11',
      release_reason: 'Laptop returned and verified',
      pay_as_arrear: true,
      arrear_amount: 20000
    }, token);
    console.log('Release response:', relRes.data);

    console.log('\n--- 5. Checking payroll_adjustments for 2026-11 ---');
    const [adjs] = await c.query("SELECT * FROM payroll_adjustments WHERE employee_id = 53 AND payroll_month = '2026-11' AND adjustment_type = 'ARREAR'");
    console.log('Created Arrear in November:', adjs);

    console.log('\n--- 6. Testing Preview for 2026-11 (Should include 20k Arrear) ---');
    const prevNov = await postJson('/api/payroll/v2/runs/preview', { year: 2026, month: 11 }, token);
    const emp53Nov = prevNov.data?.data?.detailedPreview?.find(e => e.employee_id === 53);
    console.log('Employee 53 in November preview:', {
      name: emp53Nov?.full_name,
      monthly_gross: emp53Nov?.monthly_gross,
      arrears: emp53Nov?.arrears,
      total_net: emp53Nov?.total_net,
      total_net_payout: emp53Nov?.total_net_payout
    });

    // Clean up test adjustment and hold
    await c.query("DELETE FROM payroll_adjustments WHERE employee_id = 53 AND payroll_month = '2026-11' AND reason LIKE '%Laptop returned%'");
    await c.query("DELETE FROM payroll_salary_holds WHERE id = ?", [holdId]);
    console.log('\nCleaned up test data.');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await c.end();
  }
})();
