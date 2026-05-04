const mysql = require('mysql2/promise');

async function testCalc() {
    const c = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'hrms_db_new'
    });

    const year = 2026;
    const month = 4;
    const employeeId = 932;

    const [allEmployees] = await c.query(
        "SELECT e.*, esc.annual_ctc, esc.template_id FROM employees e JOIN employee_salary_contracts esc ON esc.employee_id = e.id AND esc.status = 'Active' WHERE e.id = ?",
        [employeeId]
    );

    const emp = allEmployees[0];
    if (!emp) {
        console.log("Employee not found");
        process.exit(1);
    }

    const [compositions] = await c.query(`
        SELECT sc.*, 
               COALESCE(mc.code, lc.code) AS component_code,
               COALESCE(mc.name, lc.name) AS component_name,
               COALESCE(mc.component_type, lc.component_type) AS component_type,
               COALESCE(mc.calculation_type, lc.calculation_type) AS calculation_type,
               COALESCE(mc.value, lc.value) AS default_value,
               COALESCE(mc.percentage_of_code, lc.percentage_of_code) AS percentage_of_code,
               COALESCE(mc.sequence, lc.sequence) AS sequence
        FROM structure_composition sc
        LEFT JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
        LEFT JOIN salary_components lc ON lc.id = sc.component_id
        WHERE sc.template_id = ?
    `, [emp.template_id]);

    const annualCTC = Number(emp.annual_ctc || 0);
    const monthlyGross = Math.round(annualCTC / 12);
    const computed = {};
    const sortedComps = [...compositions].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

    console.log('Monthly Gross (CTC/12):', monthlyGross);

    const results = sortedComps.map(r => {
        let calculation_type = r.calculation_type;
        let inputVal = Number(r.default_value || 0);
        let percentage_of_code = r.percentage_of_code;

        const text = String(r.formula_or_value || "").trim();
        let override = null;
        if (text) {
            if (/^-?\d+(\.\d+)?$/.test(text)) {
                override = { value: Number(text), percentage_of_code: null };
            } else {
                const m = text.match(/^(\d+(?:\.\d+)?)\s*%\s*(?:of\s*)?([A-Za-z0-9_]+)$/i);
                if (m) {
                    override = {
                        calculation_type: 'PERCENTAGE',
                        value: Number(m[1]),
                        percentage_of_code: String(m[2]).toUpperCase()
                    };
                }
            }
        }

        if (override) {
            if (override.calculation_type) calculation_type = override.calculation_type;
            inputVal = override.value;
            if (override.percentage_of_code) percentage_of_code = override.percentage_of_code;
        }

        let amt = 0;
        let base = 'Gross';
        if (calculation_type === 'PERCENTAGE') {
            if (percentage_of_code && computed[percentage_of_code] !== undefined) {
                amt = (computed[percentage_of_code] * inputVal) / 100.0;
                base = percentage_of_code;
            } else {
                amt = (monthlyGross * inputVal) / 100.0;
                base = 'Gross (fallback)';
            }
        } else {
            amt = inputVal / 12.0;
            base = 'Fixed';
        }

        const rounded = Math.round(amt);
        computed[r.component_code] = rounded;

        return {
            code: r.component_code,
            inputVal: inputVal,
            calcType: calculation_type,
            base: base,
            amt: rounded
        };
    });

    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
}

testCalc().catch(err => {
    console.error(err);
    process.exit(1);
});
