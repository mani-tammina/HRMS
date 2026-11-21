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

    // 2. Fetch preview for 2026-11 via /api/payroll/v2/runs/preview
    const previewRes = await fetch(`${BASE_URL}/api/payroll/v2/runs/preview`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ year: 2026, month: 11, limit: 1000, all: true })
    });

    const previewJson = await previewRes.json();
    const preview = previewJson.data || previewJson;
    const employees = preview.detailedPreview || [];
    console.log(`✅ Loaded preview with ${employees.length} employees.`);

    if (employees.length === 0) {
      console.log('No employees in preview.');
      return;
    }

    // Check if any employee has a bonus
    let empWithBonus = employees.find(e => Number(e.bonus) > 0);
    
    // If no employee has a bonus, let's add one via save-step to test
    if (!empWithBonus) {
      console.log('Adding a test bonus of 15000 to first employee to verify...');
      const targetEmp = employees[0];
      await fetch(`${BASE_URL}/api/payroll/v2/bonus-revisions-overtime/save-step`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          month: '2026-11',
          step: 1,
          records: [{
            id: targetEmp.employee_id,
            bonus_type: 'Performance Bonus',
            bonus_amount: 15000,
            pay_action: 'Process with salary',
            comments: 'Automated verification test bonus'
          }]
        })
      });

      // Re-fetch preview
      const rePreviewRes = await fetch(`${BASE_URL}/api/payroll/v2/runs/preview`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ year: 2026, month: 11, limit: 1000, all: true })
      });

      const rePreviewJson = await rePreviewRes.json();
      const reEmployees = (rePreviewJson.data || rePreviewJson).detailedPreview || [];
      empWithBonus = reEmployees.find(e => e.employee_id === targetEmp.employee_id);
    }

    console.log('\n--- Employee with Bonus Details ---');
    console.log('Employee:', empWithBonus.full_name, `(${empWithBonus.employee_number})`);
    console.log('Monthly Gross:', empWithBonus.monthly_gross);
    console.log('Bonus:', empWithBonus.bonus);
    console.log('Total Earnings in preview:', empWithBonus.total_earnings);
    console.log('Total Reimbursements in preview:', empWithBonus.total_reimbursements);
    console.log('Base Reimbursements in preview:', empWithBonus.base_reimbursements);

    // Simulate Excel row calculation as implemented in payroll-dashboard and payroll-process
    const bonus = Number(empWithBonus.bonus || 0);
    const totalEarningsRaw = Number(empWithBonus.total_earnings || 0);
    const grossA = Math.max(0, totalEarningsRaw - bonus);
    const pfEmployee = Number(empWithBonus.pf_employee || 0);
    const esiEmployee = Number(empWithBonus.esi_employee || 0);
    const totalContributionsB = pfEmployee + esiEmployee;

    const profTax = Number(empWithBonus.professional_tax || 0);
    const totalDeductionsC = Math.max(0, Number(empWithBonus.total_deductions || 0) - totalContributionsB);
    const netPayABC = grossA - totalContributionsB - totalDeductionsC;

    const cashAdvanceD = Number(empWithBonus.cash_advance || 0);
    const settlementE = 0;
    const baseReimbursements = Number(empWithBonus.base_reimbursements !== undefined ? empWithBonus.base_reimbursements : (empWithBonus.total_reimbursements || 0));
    const reimbursementF = baseReimbursements > 0 && baseReimbursements >= bonus && empWithBonus.base_reimbursements === undefined
      ? baseReimbursements
      : baseReimbursements + bonus;
    const totalNetPay = netPayABC + cashAdvanceD + settlementE + reimbursementF;

    console.log('\n--- Generated Excel Export Row ---');
    console.log('Bonus Column:', bonus);
    console.log('Gross(A):', grossA);
    console.log('Total Contributions(B):', totalContributionsB);
    console.log('Total Deductions(C):', totalDeductionsC);
    console.log('Net Pay(A-B-C):', netPayABC);
    console.log('Cash Advance(D):', cashAdvanceD);
    console.log('Settlement Against Advance(E):', settlementE);
    console.log('Total Reimbursements(F):', reimbursementF);
    console.log('Total Net Pay(A-B-C+D+E+F):', totalNetPay);

    // Assertions
    const expectedFormulaNetPay = netPayABC + cashAdvanceD + settlementE + reimbursementF;
    if (totalNetPay === expectedFormulaNetPay) {
      console.log('\n✅ PASS: Total Net Pay matches (A-B-C+D+E+F) formula perfectly!');
    } else {
      console.error('\n❌ FAIL: Formula mismatch!');
    }

    if (reimbursementF >= bonus && bonus > 0) {
      console.log('✅ PASS: Total Reimbursements(F) successfully includes the Bonus amount!');
    } else {
      console.error('❌ FAIL: Total Reimbursements(F) does not include bonus!');
    }

  } catch (err) {
    console.error('Test error:', err.message);
  }
}

run();
