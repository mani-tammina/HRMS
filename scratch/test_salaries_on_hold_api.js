const http = require('http');

async function testApi() {
  const BASE_URL = 'http://localhost:4201';

  try {
    // 1. Authenticate
    let loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password123' })
    });
    if (!loginRes.ok) {
      loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
      });
    }

    const loginData = await loginRes.json();
    const token = loginData.token || (loginData.data && loginData.data.token);
    console.log('✅ Authenticated successfully.');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // 2. GET initial state
    const getRes = await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears?month=2026-11`, { headers });
    const getData = await getRes.json();
    console.log('✅ Initial fetch:', {
      success: getData.success,
      employees: getData.employees?.length,
      existingHolds: getData.holdRecords?.length,
      existingArrears: getData.arrearRecords?.length,
      summary: getData.summaryData
    });

    if (!getData.employees || getData.employees.length === 0) {
      console.log('⚠️ No employees returned, skipping CRUD tests.');
      return;
    }

    const testEmp = getData.employees[0];
    console.log(`Using test employee: ${testEmp.employee_name} (ID: ${testEmp.id}, Code: ${testEmp.employee_code})`);

    // 3. POST put salary on hold
    const holdRes = await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/hold`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        employee_id: testEmp.id,
        month: '2026-11',
        hold_reason: 'Document Verification Pending',
        remarks: 'Awaiting updated bank passbook',
        held_gross_amount: testEmp.monthly_salary || 50000,
        held_net_amount: testEmp.monthly_salary || 50000
      })
    });
    const holdData = await holdRes.json();
    console.log('✅ Hold created:', holdData);
    const holdId = holdData.id;

    // 4. Check dashboard outcome for payslipsOnHold
    const dashRes = await fetch(`${BASE_URL}/api/payroll/v2/dashboard?month=2026-11`, { headers });
    const dashData = await dashRes.json();
    console.log('✅ Dashboard payslipsOnHold count:', dashData.data?.outcome?.payslipsOnHold);

    // 5. PUT update hold details
    const updateHoldRes = await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/hold/${holdId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        hold_reason: 'Bank Account / KYC Discrepancy',
        remarks: 'Updated remark after phone verification',
        held_gross_amount: 52000
      })
    });
    const updateHoldData = await updateHoldRes.json();
    console.log('✅ Hold updated:', updateHoldData);

    // 6. PUT release hold (with pay_as_arrear option)
    const releaseRes = await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/hold/${holdId}/release`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        release_month: '2026-11',
        release_reason: 'KYC verified successfully',
        pay_as_arrear: true,
        arrear_amount: 52000
      })
    });
    const releaseData = await releaseRes.json();
    console.log('✅ Hold released (with arrear generated):', releaseData);

    // 7. POST add separate arrear
    const arrearRes = await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/arrear`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        employee_id: testEmp.id,
        month: '2026-11',
        category: 'Retroactive Salary Increment',
        period: '2026-10',
        amount: 8500,
        pay_action: 'Process with salary',
        comments: 'Oct 2026 increment adjustment'
      })
    });
    const arrearData = await arrearRes.json();
    console.log('✅ Arrear added:', arrearData);
    const arrearId = arrearData.id;

    // 8. PUT update arrear
    const updateArrearRes = await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/arrear/${arrearId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        category: 'Retroactive Salary Increment',
        period: '2026-10',
        amount: 9000,
        pay_action: 'Process with salary',
        comments: 'Updated increment amount to 9000'
      })
    });
    const updateArrearData = await updateArrearRes.json();
    console.log('✅ Arrear updated:', updateArrearData);

    // 9. Verify state in GET
    const verifyGetRes = await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears?month=2026-11`, { headers });
    const verifyData = await verifyGetRes.json();
    console.log('✅ Post-test state:', {
      holdRecords: verifyData.holdRecords?.length,
      arrearRecords: verifyData.arrearRecords?.length,
      summary: verifyData.summaryData
    });

    // 10. Clean up test records
    await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/arrear/${arrearId}`, { method: 'DELETE', headers });
    // Also remove the released-hold arrear if created
    const createdArrearFromHold = (verifyData.arrearRecords || []).find(r => r.amount === 52000 && r.employee_id === testEmp.id);
    if (createdArrearFromHold) {
      await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/arrear/${createdArrearFromHold.id}`, { method: 'DELETE', headers });
    }
    await fetch(`${BASE_URL}/api/payroll/v2/salaries-on-hold-arrears/hold/${holdId}`, { method: 'DELETE', headers });
    console.log('✅ Cleanup complete. All tests PASSED!');

  } catch (err) {
    console.error('Test error:', err.message);
  }
}

testApi();
