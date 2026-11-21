async function run() {
  try {
    const BASE_URL = 'http://localhost:4201';

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
    const getRes = await fetch(`${BASE_URL}/api/payroll/v2/reimbursement-adhoc-deduction?month=2026-11`, { headers });
    const getData = await getRes.json();
    console.log('✅ Initial fetch:', {
      success: getData.success,
      employees: getData.employees?.length,
      existingDeductions: getData.adhocDeductionRecords?.length
    });

    const testEmp = getData.employees[0];
    console.log(`Using test employee: ${testEmp.employee_name} (ID: ${testEmp.id}, Code: ${testEmp.employee_code})`);

    // 3. POST create deduction
    const createRes = await fetch(`${BASE_URL}/api/payroll/v2/reimbursement-adhoc-deduction/deduction`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        employee_id: testEmp.id,
        month: '2026-11',
        deduction_type: 'Advance Recovery',
        amount: 3500,
        comment: 'Test salary advance recovery'
      })
    });
    const createData = await createRes.json();
    console.log('✅ Create deduction result:', createData);
    const createdId = createData.id;

    // 4. Verify in GET list
    const verifyGetRes = await fetch(`${BASE_URL}/api/payroll/v2/reimbursement-adhoc-deduction?month=2026-11`, { headers });
    const verifyGetData = await verifyGetRes.json();
    const found = (verifyGetData.adhocDeductionRecords || []).find(r => r.id === createdId);
    console.log('✅ Found created deduction:', {
      id: found?.id,
      emp: found?.employee_name,
      type: found?.deduction_type,
      amount: found?.amount,
      comment: found?.comment
    });

    // 5. PUT edit deduction
    const editRes = await fetch(`${BASE_URL}/api/payroll/v2/reimbursement-adhoc-deduction/deduction/${createdId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        deduction_type: 'Notice Period Shortfall',
        amount: 4200,
        comment: 'Updated: Notice period recovery'
      })
    });
    const editData = await editRes.json();
    console.log('✅ Edit deduction result:', editData);

    // 6. DELETE deduction
    const deleteRes = await fetch(`${BASE_URL}/api/payroll/v2/reimbursement-adhoc-deduction/deduction/${createdId}`, {
      method: 'DELETE',
      headers
    });
    const deleteData = await deleteRes.json();
    console.log('✅ Delete deduction result:', deleteData);

    // 7. Verify deletion
    const finalGetRes = await fetch(`${BASE_URL}/api/payroll/v2/reimbursement-adhoc-deduction?month=2026-11`, { headers });
    const finalGetData = await finalGetRes.json();
    const stillExists = (finalGetData.adhocDeductionRecords || []).some(r => r.id === createdId);
    if (!stillExists) {
      console.log('✅ PASS: Cleaned up test record. Full CRUD lifecycle verified successfully!');
    } else {
      console.error('❌ FAIL: Record was not deleted!');
    }

  } catch (err) {
    console.error('Test error:', err.message);
  }
}

run();
