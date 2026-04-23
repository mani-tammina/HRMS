// Payroll Master Service
// Handles business logic for salary components, templates, and structures

const { db } = require('../config/database');

async function ensureTemplateModelTables(c) {
  await c.query(
    `CREATE TABLE IF NOT EXISTS salary_master_components (
      component_id INT PRIMARY KEY AUTO_INCREMENT,
      code VARCHAR(64) NOT NULL UNIQUE,
      name VARCHAR(128) NOT NULL,
      component_type ENUM('EARNING','DEDUCTION') NOT NULL DEFAULT 'EARNING',
      calculation_type ENUM('FIXED','PERCENTAGE') NOT NULL DEFAULT 'FIXED',
      value DECIMAL(15,2) NOT NULL DEFAULT 0.00,
      percentage_of_code VARCHAR(64) DEFAULT NULL,
      taxable TINYINT(1) NOT NULL DEFAULT 1,
      prorated TINYINT(1) NOT NULL DEFAULT 0,
      sequence INT NOT NULL DEFAULT 10,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      notes TEXT,
      created_by INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
  );

  const [masterColumn] = await c.query(
    `SELECT COUNT(*) AS count
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'structure_composition'
       AND COLUMN_NAME = 'master_component_id'`
  );

  if (Number(masterColumn[0].count || 0) === 0) {
    await c.query('ALTER TABLE structure_composition ADD COLUMN master_component_id INT NULL AFTER template_id');
  }

  const [legacyNullable] = await c.query(
    `SELECT IS_NULLABLE AS nullable_flag
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'structure_composition'
       AND COLUMN_NAME = 'component_id'`
  );

  if (legacyNullable.length > 0 && legacyNullable[0].nullable_flag === 'NO') {
    await c.query('ALTER TABLE structure_composition MODIFY COLUMN component_id INT NULL');
  }

  const [masterIndex] = await c.query(
    `SELECT COUNT(*) AS count
     FROM INFORMATION_SCHEMA.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'structure_composition'
       AND INDEX_NAME = 'idx_structure_composition_master_component'`
  );

  if (Number(masterIndex[0].count || 0) === 0) {
    await c.query('CREATE INDEX idx_structure_composition_master_component ON structure_composition(master_component_id)');
  }

  const [masterFk] = await c.query(
    `SELECT COUNT(*) AS count
     FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'structure_composition'
       AND COLUMN_NAME = 'master_component_id'
       AND REFERENCED_TABLE_NAME = 'salary_master_components'`
  );

  if (Number(masterFk[0].count || 0) === 0) {
    await c.query(
      `ALTER TABLE structure_composition
       ADD CONSTRAINT fk_structure_comp_master_component
       FOREIGN KEY (master_component_id) REFERENCES salary_master_components(component_id)`
    );
  }

  const [effectiveToColumn] = await c.query(
    `SELECT COUNT(*) AS count
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'employee_salary_contracts'
       AND COLUMN_NAME = 'effective_to'`
  );

  if (Number(effectiveToColumn[0].count || 0) === 0) {
    await c.query('ALTER TABLE employee_salary_contracts ADD COLUMN effective_to DATE NULL AFTER effective_from');
  }
}

async function upsertMasterComponentFromLegacy(c, legacyComponentId, createdBy) {
  const [legacyRows] = await c.query('SELECT * FROM salary_components WHERE id = ?', [legacyComponentId]);
  if (legacyRows.length === 0) return null;

  const comp = legacyRows[0];

  await c.query(
    `INSERT INTO salary_master_components
      (code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       component_type = VALUES(component_type),
       calculation_type = VALUES(calculation_type),
       value = VALUES(value),
       percentage_of_code = VALUES(percentage_of_code),
       taxable = VALUES(taxable),
       prorated = VALUES(prorated),
       sequence = VALUES(sequence),
       notes = VALUES(notes),
       is_active = 1`,
    [
      comp.code,
      comp.name,
      comp.component_type,
      comp.calculation_type,
      comp.value,
      comp.percentage_of_code,
      comp.taxable,
      comp.prorated,
      comp.sequence,
      'Migrated from legacy salary_components mapping',
      createdBy || null
    ]
  );

  const [masterRows] = await c.query('SELECT component_id FROM salary_master_components WHERE code = ? LIMIT 1', [comp.code]);
  return masterRows.length > 0 ? masterRows[0].component_id : null;
}

// --- Master Salary Components ---
exports.listComponents = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);

    const componentType = req.query.component_type;
    const activeOnly = String(req.query.active_only || 'true').toLowerCase() !== 'false';
    let query = 'SELECT * FROM salary_master_components';
    let params = [];

    const where = [];
    if (componentType) {
      where.push('component_type = ?');
      params.push(componentType);
    }
    if (activeOnly) {
      where.push('is_active = 1');
    }
    if (where.length > 0) {
      query += ` WHERE ${where.join(' AND ')}`;
    }
    query += ' ORDER BY sequence ASC';

    const [rows] = await c.query(query, params);
    c.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComponent = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);

    const { code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes, created_by } = req.body;

    // Validate required fields
    if (!code || !name || !component_type || !calculation_type || value === undefined) {
      c.end();
      return res.status(400).json({ error: 'code, name, component_type, calculation_type, and value are required' });
    }

    const [result] = await c.query(
      `INSERT INTO salary_master_components
        (code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(code).toUpperCase(),
        name,
        component_type || 'EARNING',
        calculation_type || 'FIXED',
        value,
        percentage_of_code || null,
        taxable !== false ? 1 : 0,
        prorated ? 1 : 0,
        sequence || 10,
        notes || null,
        created_by || null
      ]
    );
    c.end();
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComponent = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const [rows] = await c.query('SELECT * FROM salary_master_components WHERE component_id = ?', [req.params.component_id]);
    c.end();
    if (rows.length === 0) return res.status(404).json({ error: 'Component not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComponent = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const { code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes } = req.body;
    const [result] = await c.query(
      `UPDATE salary_master_components
       SET code=?, name=?, component_type=?, calculation_type=?, value=?, percentage_of_code=?, taxable=?, prorated=?, sequence=?, notes=?, updated_at=NOW()
       WHERE component_id=?`,
      [String(code).toUpperCase(), name, component_type, calculation_type, value, percentage_of_code, taxable ? 1 : 0, prorated ? 1 : 0, sequence, notes, req.params.component_id]
    );
    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComponent = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const [result] = await c.query(
      'UPDATE salary_master_components SET is_active = 0, updated_at = NOW() WHERE component_id = ?',
      [req.params.component_id]
    );
    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Salary Templates ---
exports.listTemplates = async (req, res) => {
  try {
    const c = await db();
    const [rows] = await c.query('SELECT * FROM salary_structure_templates');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createTemplate = async (req, res) => {
  try {
    const c = await db();
    const { template_name, description, created_by } = req.body;
    const [result] = await c.query(
      'INSERT INTO salary_structure_templates (template_name, description, created_by) VALUES (?, ?, ?)',
      [template_name, description, created_by]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTemplate = async (req, res) => {
  try {
    const c = await db();
    const [rows] = await c.query('SELECT * FROM salary_structure_templates WHERE template_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateTemplate = async (req, res) => {
  try {
    const c = await db();
    const { template_name, description } = req.body;
    const [result] = await c.query(
      'UPDATE salary_structure_templates SET template_name=?, description=? WHERE template_id=?',
      [template_name, description, req.params.id]
    );
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteTemplate = async (req, res) => {
  try {
    const c = await db();
    const [result] = await c.query('DELETE FROM salary_structure_templates WHERE template_id = ?', [req.params.id]);
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Salary Structures ---
exports.listStructures = async (req, res) => {
  try {
    const c = await db();
    const employeeId = req.query.employee_id;
    let query = 'SELECT s.*, e.EmployeeNumber, e.FullName FROM salary_structures s LEFT JOIN employees e ON e.id = s.employee_id';
    let params = [];
    if (employeeId) {
      query += ' WHERE s.employee_id = ?';
      params.push(employeeId);
    }
    query += ' ORDER BY s.effective_from DESC, s.version DESC';
    const [rows] = await c.query(query, params);
    c.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStructure = async (req, res) => {
  try {
    const c = await db();
    const { employee_id, structure_name, ctc_amount, effective_from, effective_to, is_active, notes, created_by, components } = req.body;

    // Validate required fields
    if (!employee_id || !structure_name || !ctc_amount || !effective_from) {
      c.end();
      return res.status(400).json({ error: 'employee_id, structure_name, ctc_amount, and effective_from are required' });
    }

    await c.beginTransaction();

    try {
      // Get next version number for this employee
      const [versionRows] = await c.query(
        'SELECT COALESCE(MAX(version), 0) + 1 as next_version FROM salary_structures WHERE employee_id = ?',
        [employee_id]
      );
      const version = versionRows[0].next_version;

      // Insert structure
      const [result] = await c.query(
        `INSERT INTO salary_structures (employee_id, structure_name, ctc_amount, effective_from, effective_to, is_active, version, created_by, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [employee_id, structure_name, ctc_amount, effective_from, effective_to || null, is_active !== false ? 1 : 0, version, created_by || null, notes || null]
      );

      const structureId = result.insertId;

      // Insert components if provided
      if (components && Array.isArray(components)) {
        for (const comp of components) {
          await c.query(
            `INSERT INTO salary_components (structure_id, code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              structureId,
              comp.code,
              comp.name,
              comp.component_type || 'EARNING',
              comp.calculation_type || 'FIXED',
              comp.value,
              comp.percentage_of_code || null,
              comp.taxable !== false ? 1 : 0,
              comp.prorated ? 1 : 0,
              comp.sequence || 10,
              comp.notes || null
            ]
          );
        }
      }

      await c.commit();
      c.end();
      res.json({ success: true, id: structureId, version });
    } catch (err) {
      await c.rollback();
      c.end();
      throw err;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStructure = async (req, res) => {
  try {
    const c = await db();
    const [structRows] = await c.query(
      'SELECT s.*, e.EmployeeNumber, e.FullName FROM salary_structures s LEFT JOIN employees e ON e.id = s.employee_id WHERE s.id = ?',
      [req.params.id]
    );
    if (structRows.length === 0) {
      c.end();
      return res.status(404).json({ error: 'Structure not found' });
    }

    const structure = structRows[0];
    const [components] = await c.query('SELECT * FROM salary_components WHERE structure_id = ? ORDER BY sequence ASC', [structure.id]);
    c.end();

    res.json({ structure, components });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStructure = async (req, res) => {
  try {
    const c = await db();
    const { structure_name, ctc_amount, effective_from, effective_to, is_active, notes } = req.body;
    const [result] = await c.query(
      `UPDATE salary_structures SET structure_name=?, ctc_amount=?, effective_from=?, effective_to=?, is_active=?, notes=?, updated_at=NOW() WHERE id=?`,
      [structure_name, ctc_amount, effective_from, effective_to, is_active ? 1 : 0, notes, req.params.id]
    );
    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStructure = async (req, res) => {
  try {
    const c = await db();
    // This will cascade delete components due to FK constraint
    const [result] = await c.query('DELETE FROM salary_structures WHERE id = ?', [req.params.id]);
    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Employee Salary Contracts (template assignment source of truth) ---
exports.listContracts = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const employeeId = req.query.employee_id;
    const status = req.query.status;

    let query = `SELECT esc.*, t.template_name, e.EmployeeNumber, e.FullName
                 FROM employee_salary_contracts esc
                 LEFT JOIN salary_structure_templates t ON t.template_id = esc.template_id
                 LEFT JOIN employees e ON e.id = esc.employee_id`;
    const params = [];
    const where = [];

    if (employeeId) {
      where.push('esc.employee_id = ?');
      params.push(employeeId);
    }
    if (status) {
      where.push('esc.status = ?');
      params.push(status);
    }

    if (where.length > 0) {
      query += ` WHERE ${where.join(' AND ')}`;
    }

    query += ' ORDER BY esc.effective_from DESC, esc.contract_id DESC';

    const [rows] = await c.query(query, params);
    c.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createContract = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const { employee_id, template_id, annual_ctc, effective_from, effective_to, created_by } = req.body;

    if (!employee_id || !template_id || !annual_ctc || !effective_from) {
      c.end();
      return res.status(400).json({ error: 'employee_id, template_id, annual_ctc, effective_from are required' });
    }

    await c.beginTransaction();
    try {
      await c.query(
        `UPDATE employee_salary_contracts
         SET status = 'Superseded', effective_to = DATE_SUB(?, INTERVAL 1 DAY), updated_at = NOW()
         WHERE employee_id = ? AND status = 'Active' AND effective_from <= ?`,
        [effective_from, employee_id, effective_from]
      );

      const [result] = await c.query(
        `INSERT INTO employee_salary_contracts (employee_id, template_id, annual_ctc, effective_from, effective_to, status, created_by)
         VALUES (?, ?, ?, ?, ?, 'Active', ?)`,
        [employee_id, template_id, annual_ctc, effective_from, effective_to || null, created_by || null]
      );

      // Sync with employees table lpa column (fetch the latest from DB to be safe)
      await c.query(
        `UPDATE employees e
         SET e.lpa = (
            SELECT annual_ctc 
            FROM employee_salary_contracts 
            WHERE employee_id = e.id 
            ORDER BY effective_from DESC, contract_id DESC 
            LIMIT 1
         )
         WHERE e.id = ?`,
        [employee_id]
      );

      await c.commit();
      c.end();
      res.json({ success: true, id: result.insertId });
    } catch (err) {
      await c.rollback();
      c.end();
      throw err;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContract = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const [rows] = await c.query(
      `SELECT esc.*, t.template_name, e.EmployeeNumber, e.FullName
       FROM employee_salary_contracts esc
       LEFT JOIN salary_structure_templates t ON t.template_id = esc.template_id
       LEFT JOIN employees e ON e.id = esc.employee_id
       WHERE esc.contract_id = ?`,
      [req.params.contract_id]
    );
    c.end();
    if (rows.length === 0) return res.status(404).json({ error: 'Contract not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateContract = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const { template_id, annual_ctc, effective_from, effective_to, status } = req.body;
    const [result] = await c.query(
      `UPDATE employee_salary_contracts
       SET template_id = ?, annual_ctc = ?, effective_from = ?, effective_to = ?, status = ?, updated_at = NOW()
       WHERE contract_id = ?`,
      [template_id, annual_ctc, effective_from, effective_to || null, status || 'Active', req.params.contract_id]
    );

    if (result.affectedRows > 0) {
      // Get the employee_id for this contract to update the employees table
      const [contractRows] = await c.query("SELECT employee_id FROM employee_salary_contracts WHERE contract_id = ?", [req.params.contract_id]);
      if (contractRows.length > 0) {
        const employee_id = contractRows[0].employee_id;
        // Sync with the LATEST contract's CTC, regardless of which one was just updated
        await c.query(
          `UPDATE employees e
           SET e.lpa = (
              SELECT annual_ctc 
              FROM employee_salary_contracts 
              WHERE employee_id = e.id 
              ORDER BY effective_from DESC, contract_id DESC 
              LIMIT 1
           )
           WHERE e.id = ?`,
          [employee_id]
        );
      }
    }

    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.terminateContract = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const effectiveTo = req.body && req.body.effective_to ? req.body.effective_to : new Date().toISOString().slice(0, 10);
    const [result] = await c.query(
      `UPDATE employee_salary_contracts
       SET status = 'Superseded', effective_to = ?, updated_at = NOW()
       WHERE contract_id = ?`,
      [effectiveTo, req.params.contract_id]
    );
    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// --- Structure Composition (template-component mapping) ---
exports.listComposition = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    const [rows] = await c.query(
      `SELECT sc.*,
              COALESCE(mc.code, lc.code) AS component_code,
              COALESCE(mc.name, lc.name) AS component_name,
              COALESCE(mc.component_type, lc.component_type) AS component_type,
              COALESCE(mc.calculation_type, lc.calculation_type) AS calculation_type,
              COALESCE(mc.value, lc.value) AS value,
              COALESCE(mc.percentage_of_code, lc.percentage_of_code) AS percentage_of_code,
              COALESCE(mc.sequence, lc.sequence) AS sequence
       FROM structure_composition sc
       LEFT JOIN salary_master_components mc ON mc.component_id = sc.master_component_id
       LEFT JOIN salary_components lc ON lc.id = sc.component_id
       WHERE sc.template_id = ?
       ORDER BY COALESCE(mc.sequence, lc.sequence, 999), sc.composition_id`,
      [req.params.template_id]
    );
    c.end();

    const processed = rows.map(r => ({
      ...r,
      // If it's a fixed value, divide by 12 for monthly view as requested
      value: r.calculation_type === 'FIXED' ? (Number(r.value || 0) / 12.0).toFixed(2) : r.value,
      // Also handle formula_or_value if it's a simple numeric override
      formula_or_value: (r.calculation_type === 'FIXED' && /^\d+(\.\d+)?$/.test(r.formula_or_value)) 
        ? (Number(r.formula_or_value) / 12.0).toFixed(2) 
        : r.formula_or_value
    }));

    res.json(processed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addComposition = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);

    const { master_component_id, component_id, formula_or_value, created_by } = req.body;
    let resolvedMasterId = master_component_id || null;

    if (!resolvedMasterId && component_id) {
      resolvedMasterId = await upsertMasterComponentFromLegacy(c, component_id, created_by);
    }

    if (!resolvedMasterId && !component_id) {
      c.end();
      return res.status(400).json({ error: 'master_component_id or component_id is required' });
    }

    const [result] = await c.query(
      'INSERT INTO structure_composition (template_id, master_component_id, component_id, formula_or_value, created_by) VALUES (?, ?, ?, ?, ?)',
      [req.params.template_id, resolvedMasterId, component_id || null, formula_or_value, created_by]
    );
    c.end();
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateComposition = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);

    const { formula_or_value, master_component_id, component_id } = req.body;
    let resolvedMasterId = master_component_id || null;

    if (!resolvedMasterId && component_id) {
      resolvedMasterId = await upsertMasterComponentFromLegacy(c, component_id, req.body.updated_by || null);
    }

    const [result] = await c.query(
      `UPDATE structure_composition
       SET formula_or_value=?, master_component_id=COALESCE(?, master_component_id), component_id=COALESCE(?, component_id), updated_at=NOW()
       WHERE composition_id=? AND template_id=?`,
      [formula_or_value, resolvedMasterId, component_id || null, req.params.composition_id, req.params.template_id]
    );
    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteComposition = async (req, res) => {
  try {
    const c = await db();
    const [result] = await c.query('DELETE FROM structure_composition WHERE composition_id = ? AND template_id = ?', [req.params.composition_id, req.params.template_id]);
    c.end();
    res.json({ success: result.affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Populate Default Master Data ---
exports.populateDefaults = async (req, res) => {
  try {
    const c = await db();
    await ensureTemplateModelTables(c);
    await c.beginTransaction();

    try {
      const createdBy = (req.user && req.user.id) || 1;
      const results = {
        templates: [],
        master_structures: [],
        employee_contracts: [],
        components_created: 0,
        compositions_created: 0,
        message: ''
      };

      // Define default salary structure templates
      const defaultTemplates = [
        {
          name: 'Standard Employee Package',
          description: 'Standard salary structure for regular employees with basic components',
          ctc: 500000,
          components: [
            { code: 'BASIC', name: 'Basic Salary', type: 'EARNING', calc: 'PERCENTAGE', value: 40.00, seq: 10 },
            { code: 'HRA', name: 'House Rent Allowance', type: 'EARNING', calc: 'PERCENTAGE', value: 20.00, pct_of: 'BASIC', seq: 20 },
            { code: 'CONVEYANCE', name: 'Conveyance Allowance', type: 'EARNING', calc: 'FIXED', value: 1600.00, seq: 30 },
            { code: 'SPECIAL', name: 'Special Allowance', type: 'EARNING', calc: 'PERCENTAGE', value: 30.00, seq: 40 },
            { code: 'MEDICAL', name: 'Medical Allowance', type: 'EARNING', calc: 'FIXED', value: 1250.00, seq: 50 },
            { code: 'PF_DEDUCT', name: 'PF Employee Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 12.00, pct_of: 'BASIC', seq: 100 },
            { code: 'ESI_ER', name: 'ESI Employer Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 3.25, seq: 110, notes: '(Gross - PF_ER) * 3.25 / 103.25' },
            { code: 'ESI_EE', name: 'ESI Employee Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 0.75, seq: 120, notes: '(Gross - PF_ER - ESI_ER) * 0.75/100' }
          ]
        },
        {
          name: 'Senior Employee Package',
          description: 'Enhanced salary structure for senior employees with performance components',
          ctc: 800000,
          components: [
            { code: 'BASIC', name: 'Basic Salary', type: 'EARNING', calc: 'PERCENTAGE', value: 45.00, seq: 10 },
            { code: 'HRA', name: 'House Rent Allowance', type: 'EARNING', calc: 'PERCENTAGE', value: 25.00, pct_of: 'BASIC', seq: 20 },
            { code: 'CONVEYANCE', name: 'Conveyance Allowance', type: 'EARNING', calc: 'FIXED', value: 2400.00, seq: 30 },
            { code: 'SPECIAL', name: 'Special Allowance', type: 'EARNING', calc: 'PERCENTAGE', value: 25.00, seq: 40 },
            { code: 'MEDICAL', name: 'Medical Allowance', type: 'EARNING', calc: 'FIXED', value: 1500.00, seq: 50 },
            { code: 'PERFORMANCE', name: 'Performance Bonus', type: 'EARNING', calc: 'PERCENTAGE', value: 5.00, seq: 60 },
            { code: 'PF_DEDUCT', name: 'PF Employee Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 12.00, pct_of: 'BASIC', seq: 100 },
            { code: 'ESI_ER', name: 'ESI Employer Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 3.25, seq: 110, notes: '(Gross - PF_ER) * 3.25 / 103.25' },
            { code: 'ESI_EE', name: 'ESI Employee Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 0.75, seq: 120, notes: '(Gross - PF_ER - ESI_ER) * 0.75/100' }
          ]
        },
        {
          name: 'Manager Package',
          description: 'Comprehensive salary structure for managers with leadership bonuses',
          ctc: 1200000,
          components: [
            { code: 'BASIC', name: 'Basic Salary', type: 'EARNING', calc: 'PERCENTAGE', value: 50.00, seq: 10 },
            { code: 'HRA', name: 'House Rent Allowance', type: 'EARNING', calc: 'PERCENTAGE', value: 30.00, pct_of: 'BASIC', seq: 20 },
            { code: 'CONVEYANCE', name: 'Conveyance Allowance', type: 'EARNING', calc: 'FIXED', value: 3000.00, seq: 30 },
            { code: 'SPECIAL', name: 'Special Allowance', type: 'EARNING', calc: 'PERCENTAGE', value: 15.00, seq: 40 },
            { code: 'MEDICAL', name: 'Medical Allowance', type: 'EARNING', calc: 'FIXED', value: 2000.00, seq: 50 },
            { code: 'PERFORMANCE', name: 'Performance Bonus', type: 'EARNING', calc: 'PERCENTAGE', value: 5.00, seq: 60 },
            { code: 'PF_DEDUCT', name: 'PF Employee Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 12.00, pct_of: 'BASIC', seq: 100 },
            { code: 'PROF_TAX', name: 'Professional Tax', type: 'DEDUCTION', calc: 'FIXED', value: 200.00, seq: 110 },
            { code: 'ESI_ER', name: 'ESI Employer Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 3.25, seq: 120, notes: '(Gross - PF_ER) * 3.25 / 103.25' },
            { code: 'ESI_EE', name: 'ESI Employee Contribution', type: 'DEDUCTION', calc: 'PERCENTAGE', value: 0.75, seq: 130, notes: '(Gross - PF_ER - ESI_ER) * 0.75/100' }
          ]
        }
      ];

      // Check if templates already exist
      const [existing] = await c.query('SELECT COUNT(*) as count FROM salary_structure_templates');

      if (existing[0].count > 0) {
        await c.rollback();
        c.end();
        return res.status(400).json({
          error: 'Default templates already exist. Clear existing templates first.',
          existing_count: existing[0].count
        });
      }

      // Get admin user ID for master structures (use first admin user, or create a system user concept)
      const [adminUser] = await c.query('SELECT id FROM users WHERE role = "admin" LIMIT 1');
      const masterUserId = adminUser.length > 0 ? adminUser[0].id : 1; // Fallback to 1

      // STEP 1: Create master structures (template structures to hold component definitions)
      // These act as master component repositories that can be referenced
      for (const template of defaultTemplates) {
        // Get next version number for master user
        const [versionRows] = await c.query(
          'SELECT COALESCE(MAX(version), 0) + 1 as next_version FROM salary_structures WHERE employee_id = ?',
          [masterUserId]
        );
        const masterVersion = versionRows[0].next_version;

        // Create a master structure for this template (using admin/system user)
        const [masterStructResult] = await c.query(
          `INSERT INTO salary_structures (employee_id, structure_name, ctc_amount, effective_from, is_active, version, notes, created_by) 
           VALUES (?, ?, ?, CURDATE(), 0, ?, 'MASTER TEMPLATE - Do not modify. Used as component repository for template.', ?)`,
          [masterUserId, `MASTER_${template.name}`, template.ctc, masterVersion, createdBy]
        );

        const masterStructId = masterStructResult.insertId;
        results.master_structures.push({
          id: masterStructId,
          name: template.name
        });

        // Create master components for this structure
        const componentIds = [];
        for (const comp of template.components) {
          const [compResult] = await c.query(
            `INSERT INTO salary_components (structure_id, code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              masterStructId,
              comp.code,
              comp.name,
              comp.type,
              comp.calc,
              comp.value,
              comp.pct_of || null,
              comp.type === 'EARNING' ? 1 : 0,
              0,
              comp.seq,
              'Master component definition'
            ]
          );

          await c.query(
            `INSERT INTO salary_master_components
              (code, name, component_type, calculation_type, value, percentage_of_code, taxable, prorated, sequence, notes, created_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               component_type = VALUES(component_type),
               calculation_type = VALUES(calculation_type),
               value = VALUES(value),
               percentage_of_code = VALUES(percentage_of_code),
               taxable = VALUES(taxable),
               prorated = VALUES(prorated),
               sequence = VALUES(sequence),
               notes = VALUES(notes),
               is_active = 1`,
            [
              comp.code,
              comp.name,
              comp.type,
              comp.calc,
              comp.value,
              comp.pct_of || null,
              comp.type === 'EARNING' ? 1 : 0,
              0,
              comp.seq,
              'Master component catalog seed',
              createdBy
            ]
          );

          const [masterCompRows] = await c.query(
            'SELECT component_id FROM salary_master_components WHERE code = ? LIMIT 1',
            [comp.code]
          );

          componentIds.push({
            id: compResult.insertId,
            master_component_id: masterCompRows.length > 0 ? masterCompRows[0].component_id : null,
            ...comp
          });
          results.components_created++;
        }

        // STEP 2: Create template
        const [templateResult] = await c.query(
          'INSERT INTO salary_structure_templates (template_name, description, created_by) VALUES (?, ?, ?)',
          [template.name, template.description, createdBy]
        );

        const templateId = templateResult.insertId;
        results.templates.push({
          id: templateId,
          name: template.name,
          components: template.components.length,
          master_structure_id: masterStructId
        });

        // STEP 3: Create template composition (link components to template)
        for (const comp of componentIds) {
          const formula = comp.pct_of ? `${comp.value}% of ${comp.pct_of}` : `${comp.value}`;
          await c.query(
            'INSERT INTO structure_composition (template_id, master_component_id, component_id, formula_or_value, created_by) VALUES (?, ?, ?, ?, ?)',
            [templateId, comp.master_component_id, comp.id, formula, createdBy]
          );
          results.compositions_created++;
        }
      }

      // STEP 4: Assign first 3-5 employees to template contracts (source of truth)
      const [employees] = await c.query('SELECT id, FullName FROM employees WHERE EmploymentStatus = "Active" LIMIT 5');

      if (employees.length > 0) {
        for (let i = 0; i < Math.min(employees.length, 3); i++) {
          const emp = employees[i];
          const template = defaultTemplates[i % defaultTemplates.length]; // Rotate through templates
          const templateData = results.templates.find(t => t.name === template.name);

          const [contractResult] = await c.query(
            `INSERT INTO employee_salary_contracts (employee_id, template_id, annual_ctc, effective_from, effective_to, status, created_by)
             VALUES (?, ?, ?, CURDATE(), NULL, 'Active', ?)`,
            [emp.id, templateData.id, template.ctc, createdBy]
          );

          results.employee_contracts.push({
            employee_id: emp.id,
            employee_name: emp.FullName,
            contract_id: contractResult.insertId,
            template_id: templateData.id,
            template: template.name,
            ctc: template.ctc
          });
        }
      }

      await c.commit();
      c.end();

      results.message = `Successfully created complete payroll master data`;

      res.json({
        success: true,
        summary: {
          templates: results.templates.length,
          components: results.components_created,
          compositions: results.compositions_created,
          employee_contracts: results.employee_contracts.length
        },
        templates: results.templates,
        employee_contracts: results.employee_contracts,
        message: results.message,
        note: 'Complete payroll setup ready. Templates, master components, compositions, and sample employee contracts created.',
        next_steps: [
          '1. Run payroll: POST /api/payroll/v2/run with year and month',
          '2. View payslips: GET /api/payroll/v2/payslips/{employeeId}',
          '3. Assign more employees: POST /api/payroll-master/contracts'
        ]
      });

    } catch (err) {
      await c.rollback();
      c.end();
      throw err;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Clear All Master Data (for testing/reset) ---
exports.clearMasterData = async (req, res) => {
  try {
    const c = await db();
    await c.beginTransaction();

    try {
      // Delete in correct order to avoid FK constraints
      // 1. Delete structure composition first
      const [compResult] = await c.query('DELETE FROM structure_composition');

      // 1.1 Delete employee salary contracts
      const [contractsResult] = await c.query('DELETE FROM employee_salary_contracts');

      // 2. Delete salary components (this includes both master and employee components)
      // Delete all components linked to any salary structures (will cascade from structure deletion)
      const [componentsResult] = await c.query('DELETE FROM salary_components');

      // 3. Delete salary structures (both master structures and employee structures created by auto-populate)
      // Delete all structures that were created by the populate defaults
      const [structuresResult] = await c.query(`DELETE FROM salary_structures WHERE 
        structure_name LIKE 'MASTER_%' OR 
        notes LIKE '%template%' OR 
        notes LIKE '%MASTER TEMPLATE%'`);

      // 4. Delete templates
      const [templateResult] = await c.query('DELETE FROM salary_structure_templates');

      // 5. Delete master component catalog
      await ensureTemplateModelTables(c);
      const [masterComponentsResult] = await c.query('DELETE FROM salary_master_components');

      await c.commit();
      c.end();

      res.json({
        success: true,
        message: 'All payroll master data cleared successfully',
        deleted: {
          templates: templateResult.affectedRows,
          structures: structuresResult.affectedRows,
          components: componentsResult.affectedRows,
          compositions: compResult.affectedRows,
          contracts: contractsResult.affectedRows,
          master_components: masterComponentsResult.affectedRows
        }
      });
    } catch (err) {
      await c.rollback();
      c.end();
      throw err;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
