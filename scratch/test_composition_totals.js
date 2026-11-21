function isEmployerComponent(comp) {
  const code = (comp.component_code || comp.code || '').toUpperCase();
  const name = (comp.component_name || comp.name || '').toUpperCase();
  return code.includes('EMPLOYER') || name.includes('EMPLOYER') || 
         code.includes('_ER') || name.includes('_ER') ||
         code === 'PF_ER' || code === 'ESI_ER' ||
         (code.includes('PF') && code.includes('EMPLOYER'));
}

function getCalculatedAmount(comp, sampleCTC, compMap) {
  const rawInput = String(comp.formula_or_value || '0').trim();
  const calcType = (comp.calculation_type || '').toUpperCase();
  const isPct = calcType === 'PERCENTAGE' || rawInput.includes('%');
  if (isPct) {
    const pct = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
    if (isNaN(pct)) return 0;
    let pctOf = (comp.percentage_of_code || '').toUpperCase();
    if ((!pctOf || pctOf === '-') && rawInput.toUpperCase().includes('OF ')) {
      const parts = rawInput.toUpperCase().split('OF ');
      pctOf = parts[parts.length - 1].trim();
    }
    if (pctOf === 'GROSS' || pctOf === comp.component_code?.toUpperCase()) pctOf = 'CTC';
    if (pctOf && pctOf !== 'CTC' && pctOf !== '-') {
      const baseComp = compMap[pctOf];
      if (baseComp) return (pct / 100) * getCalculatedAmount(baseComp, sampleCTC, compMap);
    }
    return (pct / 100) * sampleCTC;
  }
  const fixed = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
  return isNaN(fixed) ? 0 : fixed;
}

const sampleCTC = 800000;
const components = [
  { component_code: 'BASIC', component_name: 'Basic Salary', component_type: 'EARNING', formula_or_value: '50%', calculation_type: 'PERCENTAGE', percentage_of_code: null },
  { component_code: 'HRA', component_name: 'House Rent Allowance', component_type: 'EARNING', formula_or_value: '40% of BASIC', calculation_type: 'PERCENTAGE', percentage_of_code: 'BASIC' },
  { component_code: 'TRANSPORT ALLOWANCE', component_name: 'Transport Allowance', component_type: 'EARNING', formula_or_value: '19200', calculation_type: 'FIXED' },
  { component_code: 'SPECIAL', component_name: 'Special Allowance', component_type: 'EARNING', formula_or_value: '0', calculation_type: 'FIXED' },
  { component_code: 'MEDICAL', component_name: 'Medical Allowance', component_type: 'EARNING', formula_or_value: '15000', calculation_type: 'FIXED' },
  { component_code: 'PF_DEDUCT', component_name: 'PF Employee Contribution', component_type: 'DEDUCTION', formula_or_value: '12% of BASIC', calculation_type: 'PERCENTAGE', percentage_of_code: 'BASIC' },
  { component_code: 'PF EMPLOYER', component_name: 'PF Employer', component_type: 'DEDUCTION', formula_or_value: '12', calculation_type: 'PERCENTAGE', percentage_of_code: 'BASIC' },
  { component_code: 'PROF_TAX', component_name: 'Professional Tax', component_type: 'DEDUCTION', formula_or_value: '2400', calculation_type: 'FIXED' }
];

const compMap = {};
components.forEach(c => compMap[c.component_code] = c);

// BEFORE
console.log('--- OLD LOGIC ---');
let sumOfEarnings = 0;
let sumOfEmployerPortions = 0;
const specialComp = components.find(c => c.component_code === 'SPECIAL');

components.forEach(c => {
  if (c !== specialComp) {
    const codeUpper = c.component_code.toUpperCase();
    const nameUpper = c.component_name.toUpperCase();
    const isER = codeUpper.includes('EMPLOYER') || nameUpper.includes('EMPLOYER') || codeUpper.includes('_ER') || nameUpper.includes('_ER');
    if (c.component_type === 'EARNING') {
      sumOfEarnings += getCalculatedAmount(c, sampleCTC, compMap);
    } else if (isER || codeUpper.includes('PF_') || nameUpper.includes('PF_')) {
      sumOfEmployerPortions += getCalculatedAmount(c, sampleCTC, compMap);
    }
  }
});
console.log('Old sumOfEarnings:', sumOfEarnings);
console.log('Old sumOfEmployerPortions:', sumOfEmployerPortions);
const oldBalance = Math.max(0, sampleCTC - sumOfEarnings - sumOfEmployerPortions);
console.log('Old Special Allowance balance:', oldBalance);
specialComp.formula_or_value = oldBalance.toString();

const oldTotalEarnings = components
  .filter(c => c.component_type === 'EARNING')
  .reduce((sum, c) => sum + getCalculatedAmount(c, sampleCTC, compMap), 0);
console.log('Old Total Earnings:', oldTotalEarnings);
console.log('Matches CTC? (800000):', oldTotalEarnings === sampleCTC);

// NEW
console.log('\n--- NEW FIXED LOGIC ---');
let newSumOfEarnings = 0;
let newSumOfEmployerPortions = 0;

components.forEach(c => {
  if (c !== specialComp) {
    if (c.component_type === 'EARNING') {
      newSumOfEarnings += getCalculatedAmount(c, sampleCTC, compMap);
    } else if (isEmployerComponent(c)) {
      newSumOfEmployerPortions += getCalculatedAmount(c, sampleCTC, compMap);
    }
  }
});
console.log('New sumOfEarnings:', newSumOfEarnings);
console.log('New sumOfEmployerPortions (PF Employer only):', newSumOfEmployerPortions);
const newBalance = Math.max(0, sampleCTC - newSumOfEarnings - newSumOfEmployerPortions);
console.log('New Special Allowance balance:', newBalance);
specialComp.formula_or_value = newBalance.toString();

const newEarningsOnly = components
  .filter(c => c.component_type === 'EARNING')
  .reduce((sum, c) => sum + getCalculatedAmount(c, sampleCTC, compMap), 0);

const pfEmployerVal = components
  .filter(c => isEmployerComponent(c) && c.component_type !== 'EARNING')
  .reduce((sum, c) => sum + getCalculatedAmount(c, sampleCTC, compMap), 0);

const newTotalEarnings = Math.round(newEarningsOnly + pfEmployerVal);
console.log('New Earnings Only:', newEarningsOnly);
console.log('PF Employer Value added:', pfEmployerVal);
console.log('New Total Earnings:', newTotalEarnings);
console.log('Matches CTC? (800000):', newTotalEarnings === sampleCTC);
