const { db } = require('../config/database');

async function syncAllLeaveBalances() {
    console.log('🔄 Starting Leave Balances Quota Sync Fix...');

    const parseVal = (v, d = null) => {
        if (v === null || v === undefined) return d;
        const s = String(v).trim();
        if (s.toLowerCase() === 'no limit' || s.toLowerCase() === 'unlimited') return 999;
        const n = parseFloat(s);
        return isNaN(n) ? d : n;
    };

    const getAllocatedQuota = (quota, accrued, defaultVal = 0) => {
        const q = parseVal(quota, null);
        if (q !== null && q > 0) return q;
        const a = parseVal(accrued, null);
        if (a !== null && a > 0) return a;
        return defaultVal;
    };

    const defaultTypes = [
        { type_name: 'Sick Leave', type_code: 'SL', is_paid: 1, description: 'Sick Leave' },
        { type_name: 'Casual Leave', type_code: 'CL', is_paid: 1, description: 'Casual Leave' },
        { type_name: 'Compensatory Off', type_code: 'COMP_OFF', is_paid: 1, description: 'Compensatory Off' },
        { type_name: 'Marriage Leave', type_code: 'ML', is_paid: 1, description: 'Marriage Leave' },
        { type_name: 'Loss of Pay', type_code: 'LOP', is_paid: 0, description: 'Loss of Pay / Unpaid Leave' },
        { type_name: 'Bereavement Leave', type_code: 'BL', is_paid: 1, description: 'Bereavement Leave' }
    ];

    const typeMap = {};
    for (const t of defaultTypes) {
        const [existing] = await db.query('SELECT id FROM leave_types WHERE type_code = ? OR type_name = ?', [t.type_code, t.type_name]);
        if (existing.length > 0) {
            typeMap[t.type_code] = existing[0].id;
        } else {
            const [res] = await db.query('INSERT INTO leave_types (type_name, type_code, description, is_paid) VALUES (?, ?, ?, ?)', [t.type_name, t.type_code, t.description, t.is_paid]);
            typeMap[t.type_code] = res.insertId;
        }
    }

    const [rows] = await db.query('SELECT * FROM yearly_leave_balances');
    console.log('Found', rows.length, 'records in yearly_leave_balances.');

    const upsertSQL = `
        INSERT INTO employee_leave_balances (
            employee_id, leave_type_id, leave_year, allocated_days, used_days, available_days
        ) VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            allocated_days = VALUES(allocated_days),
            used_days = VALUES(used_days),
            available_days = VALUES(available_days),
            last_updated = CURRENT_TIMESTAMP
    `;

    let syncedCount = 0;
    for (const r of rows) {
        let empId = r.employee_id;
        if (!empId && r.employee_number) {
            const [emps] = await db.query('SELECT id FROM employees WHERE EmployeeNumber = ?', [r.employee_number.trim()]);
            if (emps.length > 0) empId = emps[0].id;
        }

        if (!empId) continue;

        const matchYear = String(r.year_period || '2026').match(/\d{4}/);
        const leaveYear = matchYear ? parseInt(matchYear[0], 10) : 2026;

        const mappings = [
            ['SL', getAllocatedQuota(r.sick_leave_annual_quota, r.sick_leave_accrued, 6), r.sick_leave_consumed, r.sick_leave_balance],
            ['CL', getAllocatedQuota(r.casual_leave_annual_quota, r.casual_leave_accrued, 12), r.casual_leave_consumed, r.casual_leave_balance],
            ['COMP_OFF', getAllocatedQuota(r.comp_offs_annual_quota, r.comp_offs_accrued, 0), r.comp_offs_consumed, r.comp_offs_balance],
            ['ML', getAllocatedQuota(r.marriage_leaves_annual_quota, r.marriage_leaves_accrued, 2), r.marriage_leaves_consumed, r.marriage_leaves_balance],
            ['LOP', getAllocatedQuota(r.unpaid_leave_annual_quota, r.unpaid_leave_accrued, 999), r.unpaid_leave_consumed, r.unpaid_leave_balance],
            ['BL', getAllocatedQuota(r.bereavement_leave_annual_quota, r.bereavement_leave_accrued, 2), r.bereavement_leave_consumed, r.bereavement_leave_balance]
        ];

        for (const [code, alloc, con, bal] of mappings) {
            const typeId = typeMap[code];
            if (!typeId) continue;
            await db.query(upsertSQL, [
                empId, typeId, leaveYear, alloc, parseVal(con, 0), parseVal(bal, 0)
            ]);
        }
        syncedCount++;
    }

    console.log('🎉 Successfully resynced annual quotas for', syncedCount, 'employees!');
    
    const [sample] = await db.query('SELECT elb.*, lt.type_name, lt.type_code FROM employee_leave_balances elb JOIN leave_types lt ON elb.leave_type_id = lt.id WHERE elb.employee_id = 25 AND elb.leave_year = 2026');
    console.log('\nSample fixed balances in employee_leave_balances:\n', sample);

    process.exit(0);
}

syncAllLeaveBalances().catch(err => {
    console.error('❌ Sync failed:', err);
    process.exit(1);
});
