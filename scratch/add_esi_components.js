const { db } = require('../config/database');

async function addEsiComponents() {
  const c = await db();
  try {
    console.log('Adding ESI components to master catalog...');
    
    const components = [
      {
        code: 'ESI_ER',
        name: 'ESI Employer Contribution',
        component_type: 'DEDUCTION',
        calculation_type: 'PERCENTAGE',
        value: 3.25,
        sequence: 120,
        notes: 'Statutory ESI Employer contribution'
      },
      {
        code: 'ESI_EE',
        name: 'ESI Employee Contribution',
        component_type: 'DEDUCTION',
        calculation_type: 'PERCENTAGE',
        value: 0.75,
        sequence: 130,
        notes: 'Statutory ESI Employee contribution'
      }
    ];

    for (const comp of components) {
      await c.query(
        `INSERT INTO salary_master_components 
          (code, name, component_type, calculation_type, value, sequence, notes, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE 
           name = VALUES(name),
           component_type = VALUES(component_type),
           calculation_type = VALUES(calculation_type),
           is_active = 1`,
        [comp.code, comp.name, comp.component_type, comp.calculation_type, comp.value, comp.sequence, comp.notes]
      );
      console.log(`✅ Component ${comp.code} added/updated.`);
    }

    console.log('Done.');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    c.end();
    process.exit(0);
  }
}

addEsiComponents();
