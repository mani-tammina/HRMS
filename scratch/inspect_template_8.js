const { db } = require('../config/database');

async function main() {
  const c = await db();

  const [t8] = await c.query(`
    SELECT sc.*, mc.code, mc.name, mc.component_type, mc.calculation_type, mc.percentage_of_code
    FROM structure_composition sc
    JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
    WHERE sc.template_id = 8
  `);
  console.log('Template 8:');
  console.table(t8);

  await c.end();
}

main().catch(console.error);
