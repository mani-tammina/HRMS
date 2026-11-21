const { db } = require('../config/database');

async function main() {
  const c = await db();
  const [rows] = await c.query(`
    SELECT sc.template_id, t.template_name, mc.code, mc.name, mc.component_type, sc.formula_or_value
    FROM structure_composition sc
    JOIN salary_structure_templates t ON t.template_id = sc.template_id
    JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
    WHERE mc.code LIKE '%PF%' OR mc.name LIKE '%PF%'
    ORDER BY sc.template_id
  `);
  console.log('PF Components in templates:');
  console.log(rows);

  const [t1] = await c.query(`
    SELECT sc.template_id, t.template_name, mc.code, mc.name, mc.component_type, mc.calculation_type, mc.percentage_of_code, sc.formula_or_value
    FROM structure_composition sc
    JOIN salary_structure_templates t ON t.template_id = sc.template_id
    JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
    WHERE sc.template_id = 1
  `);
  console.log('Template 1 full composition:');
  console.log(t1);

  await c.end();
}

main().catch(console.error);
