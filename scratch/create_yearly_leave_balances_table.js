const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const { db } = require('../config/database');

async function setupAndSeedYearlyLeaveBalances() {
  console.log('🚀 Starting Yearly Leave Balances setup & seeding...');

  try {
    // 1. Create Table SQL
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS yearly_leave_balances (
        id INT PRIMARY KEY AUTO_INCREMENT,
        employee_id INT NULL,
        employee_number VARCHAR(50) NOT NULL,
        employee_name VARCHAR(150) NOT NULL,
        job_title VARCHAR(100) NULL,
        business_unit VARCHAR(150) NULL,
        department VARCHAR(100) NULL,
        sub_department VARCHAR(100) NULL,
        location VARCHAR(100) NULL,
        cost_center VARCHAR(100) NULL,
        reporting_manager VARCHAR(150) NULL,
        policy_name VARCHAR(100) DEFAULT 'Dayshift Leave Policy',
        year_period VARCHAR(100) DEFAULT '01-Apr-2026 - 31-Mar-2027',
        
        -- Sick Leave Metrics
        sick_leave_accrued DECIMAL(5,2) DEFAULT 0.00,
        sick_leave_consumed DECIMAL(5,2) DEFAULT 0.00,
        sick_leave_balance VARCHAR(20) DEFAULT '0',
        sick_leave_annual_quota VARCHAR(20) DEFAULT '6',
        sick_leave_unit VARCHAR(20) DEFAULT 'Days',
        
        -- Casual Leave Metrics
        casual_leave_accrued DECIMAL(5,2) DEFAULT 0.00,
        casual_leave_consumed DECIMAL(5,2) DEFAULT 0.00,
        casual_leave_balance VARCHAR(20) DEFAULT '0',
        casual_leave_annual_quota VARCHAR(20) DEFAULT '12',
        casual_leave_unit VARCHAR(20) DEFAULT 'Days',
        
        -- Comp Offs Metrics
        comp_offs_accrued DECIMAL(5,2) DEFAULT 0.00,
        comp_offs_consumed DECIMAL(5,2) DEFAULT 0.00,
        comp_offs_balance VARCHAR(20) DEFAULT '0',
        comp_offs_annual_quota VARCHAR(20) DEFAULT '0',
        comp_offs_unit VARCHAR(20) DEFAULT 'Days',
        
        -- Marriage Leaves Metrics
        marriage_leaves_accrued DECIMAL(5,2) DEFAULT 0.00,
        marriage_leaves_consumed DECIMAL(5,2) DEFAULT 0.00,
        marriage_leaves_balance VARCHAR(20) DEFAULT '2',
        marriage_leaves_annual_quota VARCHAR(20) DEFAULT '2',
        marriage_leaves_unit VARCHAR(20) DEFAULT 'Days',
        
        -- Unpaid Leave Metrics
        unpaid_leave_accrued DECIMAL(5,2) DEFAULT 0.00,
        unpaid_leave_consumed DECIMAL(5,2) DEFAULT 0.00,
        unpaid_leave_balance VARCHAR(20) DEFAULT 'No Limit',
        unpaid_leave_annual_quota VARCHAR(20) DEFAULT 'No Limit',
        unpaid_leave_unit VARCHAR(20) DEFAULT 'Days',
        
        -- Bereavement Leave Metrics
        bereavement_leave_accrued DECIMAL(5,2) DEFAULT 0.00,
        bereavement_leave_consumed DECIMAL(5,2) DEFAULT 0.00,
        bereavement_leave_balance VARCHAR(20) DEFAULT '2',
        bereavement_leave_annual_quota VARCHAR(20) DEFAULT '2',
        bereavement_leave_unit VARCHAR(20) DEFAULT 'Days',
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL,
        UNIQUE KEY unique_emp_year_policy (employee_number, year_period, policy_name),
        INDEX idx_emp_num (employee_number),
        INDEX idx_year_policy (year_period, policy_name)
      );
    `;

    await db.query(createTableSQL);
    console.log('✅ Table `yearly_leave_balances` created or verified.');

    // 2. Parse Excel File
    const excelFilePath = path.join(__dirname, '../uploads/e3a83d7b3be9af5718c577c4761be7ef');
    if (!fs.existsSync(excelFilePath)) {
      console.log('⚠️ Excel sample file not found at:', excelFilePath);
      process.exit(0);
    }

    const wb = xlsx.readFile(excelFilePath);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const titleRow = rows[1] ? String(rows[1][0] || '') : '';
    let policyName = 'Dayshift Leave Policy';
    let yearPeriod = '01-Apr-2026 - 31-Mar-2027';

    if (titleRow.includes('of') && titleRow.includes('(')) {
      const parts = titleRow.split('of');
      if (parts[1]) {
        const subParts = parts[1].split('(');
        policyName = subParts[0].trim();
        if (subParts[1]) {
          yearPeriod = subParts[1].replace(')', '').trim();
        }
      }
    }

    console.log(`📋 Policy Name: "${policyName}", Year Period: "${yearPeriod}"`);

    // Helper to format string values safely
    const val = (v, defaultVal = null) => {
      if (v === undefined || v === null || String(v).trim() === '') return defaultVal;
      return String(v).trim();
    };

    const num = (v, defaultVal = 0) => {
      const parsed = parseFloat(v);
      return isNaN(parsed) ? defaultVal : parsed;
    };

    // Get all existing employees mapping for employee_id linkage
    const [employees] = await db.query('SELECT id, EmployeeNumber FROM employees');
    const empMap = {};
    employees.forEach(e => {
      if (e.EmployeeNumber) empMap[e.EmployeeNumber.trim().toUpperCase()] = e.id;
    });

    let insertedCount = 0;
    let updatedCount = 0;

    // Start from row 3 (header is row 2)
    for (let i = 3; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[0]) continue;

      const empNum = val(r[0]);
      const empName = val(r[1]);

      // Skip non-employee rows like footers or summary rows
      if (!empNum || !empName || empNum.toLowerCase().includes('generated on') || empName.toLowerCase().includes('report is generated')) {
        continue;
      }

      const jobTitle = val(r[2]);

      const busUnit = val(r[3]);
      const dept = val(r[4]);
      const subDept = val(r[5]);
      const loc = val(r[6]);
      const costCenter = val(r[7]);
      const repMgr = val(r[8]);

      const matchedEmpId = empMap[empNum.toUpperCase()] || null;

      const recordData = {
        employee_id: matchedEmpId,
        employee_number: empNum,
        employee_name: empName,
        job_title: jobTitle,
        business_unit: busUnit,
        department: dept,
        sub_department: subDept,
        location: loc,
        cost_center: costCenter,
        reporting_manager: repMgr,
        policy_name: policyName,
        year_period: yearPeriod,

        // Sick
        sick_leave_accrued: num(r[9]),
        sick_leave_consumed: num(r[10]),
        sick_leave_balance: val(r[11], '0'),
        sick_leave_annual_quota: val(r[12], '6'),
        sick_leave_unit: val(r[13], 'Days'),

        // Casual
        casual_leave_accrued: num(r[14]),
        casual_leave_consumed: num(r[15]),
        casual_leave_balance: val(r[16], '0'),
        casual_leave_annual_quota: val(r[17], '12'),
        casual_leave_unit: val(r[18], 'Days'),

        // Comp Offs
        comp_offs_accrued: num(r[19]),
        comp_offs_consumed: num(r[20]),
        comp_offs_balance: val(r[21], '0'),
        comp_offs_annual_quota: val(r[22], '0'),
        comp_offs_unit: val(r[23], 'Days'),

        // Marriage
        marriage_leaves_accrued: num(r[24]),
        marriage_leaves_consumed: num(r[25]),
        marriage_leaves_balance: val(r[26], '2'),
        marriage_leaves_annual_quota: val(r[27], '2'),
        marriage_leaves_unit: val(r[28], 'Days'),

        // Unpaid
        unpaid_leave_accrued: num(r[29]),
        unpaid_leave_consumed: num(r[30]),
        unpaid_leave_balance: val(r[31], 'No Limit'),
        unpaid_leave_annual_quota: val(r[32], 'No Limit'),
        unpaid_leave_unit: val(r[33], 'Days'),

        // Bereavement
        bereavement_leave_accrued: num(r[34]),
        bereavement_leave_consumed: num(r[35]),
        bereavement_leave_balance: val(r[36], '2'),
        bereavement_leave_annual_quota: val(r[37], '2'),
        bereavement_leave_unit: val(r[38], 'Days'),
      };

      const upsertSQL = `
        INSERT INTO yearly_leave_balances (
          employee_id, employee_number, employee_name, job_title, business_unit, department,
          sub_department, location, cost_center, reporting_manager, policy_name, year_period,
          sick_leave_accrued, sick_leave_consumed, sick_leave_balance, sick_leave_annual_quota, sick_leave_unit,
          casual_leave_accrued, casual_leave_consumed, casual_leave_balance, casual_leave_annual_quota, casual_leave_unit,
          comp_offs_accrued, comp_offs_consumed, comp_offs_balance, comp_offs_annual_quota, comp_offs_unit,
          marriage_leaves_accrued, marriage_leaves_consumed, marriage_leaves_balance, marriage_leaves_annual_quota, marriage_leaves_unit,
          unpaid_leave_accrued, unpaid_leave_consumed, unpaid_leave_balance, unpaid_leave_annual_quota, unpaid_leave_unit,
          bereavement_leave_accrued, bereavement_leave_consumed, bereavement_leave_balance, bereavement_leave_annual_quota, bereavement_leave_unit
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          employee_id = VALUES(employee_id),
          employee_name = VALUES(employee_name),
          job_title = VALUES(job_title),
          business_unit = VALUES(business_unit),
          department = VALUES(department),
          sub_department = VALUES(sub_department),
          location = VALUES(location),
          cost_center = VALUES(cost_center),
          reporting_manager = VALUES(reporting_manager),
          sick_leave_accrued = VALUES(sick_leave_accrued),
          sick_leave_consumed = VALUES(sick_leave_consumed),
          sick_leave_balance = VALUES(sick_leave_balance),
          sick_leave_annual_quota = VALUES(sick_leave_annual_quota),
          casual_leave_accrued = VALUES(casual_leave_accrued),
          casual_leave_consumed = VALUES(casual_leave_consumed),
          casual_leave_balance = VALUES(casual_leave_balance),
          casual_leave_annual_quota = VALUES(casual_leave_annual_quota),
          comp_offs_accrued = VALUES(comp_offs_accrued),
          comp_offs_consumed = VALUES(comp_offs_consumed),
          comp_offs_balance = VALUES(comp_offs_balance),
          comp_offs_annual_quota = VALUES(comp_offs_annual_quota),
          marriage_leaves_accrued = VALUES(marriage_leaves_accrued),
          marriage_leaves_consumed = VALUES(marriage_leaves_consumed),
          marriage_leaves_balance = VALUES(marriage_leaves_balance),
          marriage_leaves_annual_quota = VALUES(marriage_leaves_annual_quota),
          unpaid_leave_accrued = VALUES(unpaid_leave_accrued),
          unpaid_leave_consumed = VALUES(unpaid_leave_consumed),
          unpaid_leave_balance = VALUES(unpaid_leave_balance),
          unpaid_leave_annual_quota = VALUES(unpaid_leave_annual_quota),
          bereavement_leave_accrued = VALUES(bereavement_leave_accrued),
          bereavement_leave_consumed = VALUES(bereavement_leave_consumed),
          bereavement_leave_balance = VALUES(bereavement_leave_balance),
          bereavement_leave_annual_quota = VALUES(bereavement_leave_annual_quota);
      `;

      const values = [
        recordData.employee_id, recordData.employee_number, recordData.employee_name, recordData.job_title, recordData.business_unit, recordData.department,
        recordData.sub_department, recordData.location, recordData.cost_center, recordData.reporting_manager, recordData.policy_name, recordData.year_period,
        recordData.sick_leave_accrued, recordData.sick_leave_consumed, recordData.sick_leave_balance, recordData.sick_leave_annual_quota, recordData.sick_leave_unit,
        recordData.casual_leave_accrued, recordData.casual_leave_consumed, recordData.casual_leave_balance, recordData.casual_leave_annual_quota, recordData.casual_leave_unit,
        recordData.comp_offs_accrued, recordData.comp_offs_consumed, recordData.comp_offs_balance, recordData.comp_offs_annual_quota, recordData.comp_offs_unit,
        recordData.marriage_leaves_accrued, recordData.marriage_leaves_consumed, recordData.marriage_leaves_balance, recordData.marriage_leaves_annual_quota, recordData.marriage_leaves_unit,
        recordData.unpaid_leave_accrued, recordData.unpaid_leave_consumed, recordData.unpaid_leave_balance, recordData.unpaid_leave_annual_quota, recordData.unpaid_leave_unit,
        recordData.bereavement_leave_accrued, recordData.bereavement_leave_consumed, recordData.bereavement_leave_balance, recordData.bereavement_leave_annual_quota, recordData.bereavement_leave_unit
      ];

      const [result] = await db.query(upsertSQL, values);
      if (result.affectedRows === 1) insertedCount++;
      else if (result.affectedRows === 2) updatedCount++;
    }

    console.log(`🎉 Seeding complete! Inserted: ${insertedCount}, Updated: ${updatedCount}`);
    process.exit(0);

  } catch (err) {
    console.error('❌ Error during setup/seeding:', err);
    process.exit(1);
  }
}

setupAndSeedYearlyLeaveBalances();
