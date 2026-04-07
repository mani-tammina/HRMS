const { db } = require('../config/database');

const PAYROLL_LIFECYCLE = {
  DRAFT: 'DRAFT',
  CALCULATED: 'CALCULATED',
  REVIEWED: 'REVIEWED',
  LOCKED: 'LOCKED',
  PAID: 'PAID'
};

const ALLOWED_TRANSITIONS = {
  [PAYROLL_LIFECYCLE.DRAFT]: [PAYROLL_LIFECYCLE.CALCULATED],
  [PAYROLL_LIFECYCLE.CALCULATED]: [PAYROLL_LIFECYCLE.REVIEWED, PAYROLL_LIFECYCLE.LOCKED],
  [PAYROLL_LIFECYCLE.REVIEWED]: [PAYROLL_LIFECYCLE.LOCKED],
  [PAYROLL_LIFECYCLE.LOCKED]: [PAYROLL_LIFECYCLE.PAID],
  [PAYROLL_LIFECYCLE.PAID]: []
};

async function ensurePhase2Tables(connection) {
  await connection.query(
    `CREATE TABLE IF NOT EXISTS payroll_run_lifecycle (
      id INT AUTO_INCREMENT PRIMARY KEY,
      run_id INT NOT NULL,
      state ENUM('DRAFT','CALCULATED','REVIEWED','LOCKED','PAID') NOT NULL,
      changed_by INT DEFAULT NULL,
      changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      KEY idx_run_state_changed (run_id, state, changed_at),
      CONSTRAINT fk_lifecycle_run FOREIGN KEY (run_id) REFERENCES payroll_runs(id) ON DELETE CASCADE
    )`
  );

  await connection.query(
    `CREATE TABLE IF NOT EXISTS payroll_change_audit_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      entity_type VARCHAR(64) NOT NULL,
      entity_id INT DEFAULT NULL,
      action VARCHAR(64) NOT NULL,
      before_data JSON DEFAULT NULL,
      after_data JSON DEFAULT NULL,
      performed_by INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      KEY idx_entity_action_time (entity_type, entity_id, action, created_at)
    )`
  );
}

async function getCurrentLifecycleState(connection, runId) {
  const [rows] = await connection.query(
    `SELECT state
     FROM payroll_run_lifecycle
     WHERE run_id = ?
     ORDER BY changed_at DESC, id DESC
     LIMIT 1`,
    [runId]
  );

  if (rows.length > 0) {
    return rows[0].state;
  }

  const [runRows] = await connection.query(
    `SELECT status FROM payroll_runs WHERE id = ? LIMIT 1`,
    [runId]
  );

  if (runRows.length === 0) {
    throw new Error('Payroll run not found');
  }

  // Existing completed runs map to CALCULATED baseline in lifecycle model.
  return PAYROLL_LIFECYCLE.CALCULATED;
}

function validateTransition(fromState, toState) {
  if (fromState === toState) {
    return;
  }
  const allowed = ALLOWED_TRANSITIONS[fromState] || [];
  if (!allowed.includes(toState)) {
    throw new Error(`Invalid lifecycle transition: ${fromState} -> ${toState}`);
  }
}

async function appendLifecycleState(runId, toState, performedBy, notes = null) {
  const c = await db();
  await c.beginTransaction();
  try {
    await ensurePhase2Tables(c);
    const current = await getCurrentLifecycleState(c, runId);
    validateTransition(current, toState);

    await c.query(
      `INSERT INTO payroll_run_lifecycle (run_id, state, changed_by, notes)
       VALUES (?, ?, ?, ?)`,
      [runId, toState, performedBy || null, notes]
    );

    if (toState === PAYROLL_LIFECYCLE.LOCKED) {
      await c.query(`UPDATE payroll_runs SET status = 'LOCKED' WHERE id = ?`, [runId]);
    }

    if (toState === PAYROLL_LIFECYCLE.PAID) {
      await c.query(`UPDATE payroll_runs SET status = 'COMPLETED', completed_at = NOW() WHERE id = ?`, [runId]);
    }

    await c.commit();
    c.end();

    return { runId, fromState: current, toState };
  } catch (err) {
    await c.rollback();
    c.end();
    throw err;
  }
}

async function initializeRunLifecycle(runId, performedBy, notes = null) {
  const c = await db();
  await c.beginTransaction();
  try {
    await ensurePhase2Tables(c);
    const [existing] = await c.query('SELECT id FROM payroll_run_lifecycle WHERE run_id = ? LIMIT 1', [runId]);
    if (existing.length === 0) {
      await c.query(
        `INSERT INTO payroll_run_lifecycle (run_id, state, changed_by, notes)
         VALUES (?, ?, ?, ?), (?, ?, ?, ?)`,
        [
          runId,
          PAYROLL_LIFECYCLE.DRAFT,
          performedBy || null,
          notes || 'Run created',
          runId,
          PAYROLL_LIFECYCLE.CALCULATED,
          performedBy || null,
          'Run calculation completed'
        ]
      );
    }

    await c.commit();
    c.end();
  } catch (err) {
    await c.rollback();
    c.end();
    throw err;
  }
}

async function logChange({ entityType, entityId = null, action, beforeData = null, afterData = null, performedBy = null, notes = null }) {
  const c = await db();
  try {
    await ensurePhase2Tables(c);
    await c.query(
      `INSERT INTO payroll_change_audit_logs (entity_type, entity_id, action, before_data, after_data, performed_by, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        entityType,
        entityId,
        action,
        beforeData ? JSON.stringify(beforeData) : null,
        afterData ? JSON.stringify(afterData) : null,
        performedBy,
        notes
      ]
    );
    c.end();
  } catch (err) {
    c.end();
    throw err;
  }
}

module.exports = {
  PAYROLL_LIFECYCLE,
  appendLifecycleState,
  initializeRunLifecycle,
  logChange,
  ensurePhase2Tables
};