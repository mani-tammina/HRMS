// ============================================
// Admin Timesheet Verification Routes
// ============================================
// Handles admin verification, approval, and compliance tracking

const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const { authMiddleware, adminAuthMiddleware } = require('../middleware/auth');

// ============================================
// Admin Dashboard Routes
// ============================================

/**
 * GET /api/admin/timesheet/dashboard
 * Get compliance dashboard with traffic light status
 */
router.get('/dashboard', authMiddleware, adminAuthMiddleware, async (req, res) => {
  try {
    const { startDate, endDate, projectId, complianceStatus } = req.query;

    let query = `
      SELECT 
        project_id,
        project_name,
        client_name,
        compliance_date,
        total_employees,
        compliant_count,
        update_only_count,
        missing_count,
        traffic_light_status
      FROM v_admin_compliance_dashboard
      WHERE 1=1
    `;

    const params = [];

    if (startDate) {
      query += ' AND compliance_date >= ?';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND compliance_date <= ?';
      params.push(endDate);
    }

    if (projectId) {
      query += ' AND project_id = ?';
      params.push(projectId);
    }

    if (complianceStatus) {
      query += ' AND traffic_light_status = ?';
      params.push(complianceStatus);
    }

    query += ' ORDER BY compliance_date DESC, project_name ASC';

    const [dashboard] = await db.query(query, params);

    // Get summary statistics
    const [stats] = await db.query(`
      SELECT 
        COUNT(DISTINCT project_id) AS total_projects,
        SUM(total_employees) AS total_employees_tracked,
        SUM(compliant_count) AS total_compliant,
        SUM(update_only_count) AS total_update_only,
        SUM(missing_count) AS total_missing
      FROM v_admin_compliance_dashboard
      WHERE compliance_date >= CURDATE() - INTERVAL 30 DAY
    `);

    res.json({
      success: true,
      dashboard,
      statistics: stats[0]
    });
  } catch (error) {
    console.error('Error fetching compliance dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch compliance dashboard',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/timesheet/non-compliant-employees
 * Get list of non-compliant employees
 */
router.get('/non-compliant-employees', authMiddleware, adminAuthMiddleware, async (req, res) => {
  try {
    const { date, projectId, complianceType } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];

    let query = `
      SELECT 
        e.id AS employee_id,
        e.EmployeeNumber AS employee_code,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.WorkEmail AS email,
        p.id AS project_id,
        p.project_name,
        p.client_name,
        tc.compliance_date,
        tc.compliance_status,
        tc.has_work_update,
        tc.has_client_timesheet,
        tc.reminder_count,
        tc.last_reminder_at,
        ps.shift_name,
        ps.shift_type,
        ps.start_time,
        ps.end_time
      FROM timesheet_compliance tc
      INNER JOIN employees e ON tc.employee_id = e.id
      INNER JOIN projects p ON tc.project_id = p.id
      LEFT JOIN project_shifts ps ON tc.shift_id = ps.id
      WHERE tc.compliance_date = ?
        AND tc.compliance_status != 'compliant'
    `;

    const params = [targetDate];

    if (projectId) {
      query += ' AND tc.project_id = ?';
      params.push(projectId);
    }

    if (complianceType) {
      if (complianceType === 'missing') {
        query += ' AND tc.compliance_status = "missing"';
      } else if (complianceType === 'update_only') {
        query += ' AND tc.compliance_status = "update_only"';
      }
    }

    query += ' ORDER BY p.project_name, e.EmployeeNumber';

    const [employees] = await db.query(query, params);

    res.json({
      success: true,
      nonCompliantEmployees: employees,
      date: targetDate
    });
  } catch (error) {
    console.error('Error fetching non-compliant employees:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch non-compliant employees',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/timesheet/verification-queue
 * Get pending verification queue
 */
router.get('/verification-queue', authMiddleware, adminAuthMiddleware, async (req, res) => {
  try {
    const { status, projectId, startDate, endDate } = req.query;

    let query = `
      SELECT 
        wu.id AS work_update_id,
        wu.employee_id,
        e.EmployeeNumber AS employee_code,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        wu.project_id,
        p.project_name,
        p.client_name,
        wu.update_date,
        wu.shift_start_time,
        wu.shift_end_time,
        wu.hours_worked,
        wu.work_description,
        wu.tasks_completed,
        wu.status AS work_update_status,
        wu.submission_timestamp,
        ct.id AS timesheet_id,
        ct.file_name,
        ct.file_path,
        ct.file_type,
        ct.uploaded_at,
        ct.is_verified,
        tv.id AS verification_id,
        tv.verification_status,
        tv.verification_notes,
        tv.hours_discrepancy,
        tv.verification_timestamp,
        tv.verified_by,
        u.full_name AS verified_by_name
      FROM work_updates wu
      INNER JOIN employees e ON wu.employee_id = e.id
      INNER JOIN projects p ON wu.project_id = p.id
      LEFT JOIN client_timesheets ct ON wu.id = ct.work_update_id
      LEFT JOIN timesheet_verifications tv ON wu.id = tv.work_update_id
      LEFT JOIN users u ON tv.verified_by = u.id
      WHERE wu.status IN ('submitted', 'approved', 'flagged', 'rejected')
    `;

    const params = [];

    if (status) {
      query += ' AND wu.status = ?';
      params.push(status);
    }

    if (projectId) {
      query += ' AND wu.project_id = ?';
      params.push(projectId);
    }

    if (startDate) {
      query += ' AND wu.update_date >= ?';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND wu.update_date <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY wu.submission_timestamp DESC';

    const [queue] = await db.query(query, params);

    res.json({
      success: true,
      verificationQueue: queue
    });
  } catch (error) {
    console.error('Error fetching verification queue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch verification queue',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/timesheet/comparison/:workUpdateId
 * Get work update and timesheet for side-by-side comparison
 */
router.get('/comparison/:workUpdateId', authMiddleware, adminAuthMiddleware, async (req, res) => {
  try {
    const workUpdateId = req.params.workUpdateId;

    // Get work update details
    const [workUpdate] = await db.query(`
      SELECT 
        wu.*,
        e.EmployeeNumber AS employee_code,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.WorkEmail AS email,
        p.project_name,
        p.client_name,
        ps.shift_name,
        ps.shift_type,
        ps.start_time AS shift_start,
        ps.end_time AS shift_end
      FROM work_updates wu
      INNER JOIN employees e ON wu.employee_id = e.id
      INNER JOIN projects p ON wu.project_id = p.id
      LEFT JOIN project_shifts ps ON wu.shift_id = ps.id
      WHERE wu.id = ?
    `, [workUpdateId]);

    if (workUpdate.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work update not found'
      });
    }

    // Get client timesheet
    const [timesheet] = await db.query(`
      SELECT * FROM client_timesheets
      WHERE work_update_id = ?
    `, [workUpdateId]);

    // Get verification history
    const [verifications] = await db.query(`
      SELECT 
        tv.*,
        u.full_name AS verified_by_name,
        u.role AS verified_by_role
      FROM timesheet_verifications tv
      INNER JOIN users u ON tv.verified_by = u.id
      WHERE tv.work_update_id = ?
      ORDER BY tv.verification_timestamp DESC
    `, [workUpdateId]);

    // Get audit log
    const [auditLog] = await db.query(`
      SELECT 
        tal.*,
        u.full_name AS action_by_name
      FROM timesheet_audit_log tal
      INNER JOIN users u ON tal.action_by = u.id
      WHERE tal.entity_type = 'work_update' AND tal.entity_id = ?
      ORDER BY tal.action_timestamp DESC
    `, [workUpdateId]);

    res.json({
      success: true,
      workUpdate: workUpdate[0],
      clientTimesheet: timesheet[0] || null,
      verificationHistory: verifications,
      auditLog
    });
  } catch (error) {
    console.error('Error fetching comparison data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch comparison data',
      error: error.message
    });
  }
});

/**
 * POST /api/admin/timesheet/verify
 * Verify and approve/flag/reject a work update
 */
router.post('/verify', authMiddleware, adminAuthMiddleware, async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      workUpdateId,
      verificationStatus,
      verificationNotes,
      hoursDiscrepancy,
      clientTimesheetId
    } = req.body;

    const userId = req.user.userId;

    // Validate required fields
    if (!workUpdateId || !verificationStatus) {
      return res.status(400).json({
        success: false,
        message: 'Work update ID and verification status are required'
      });
    }

    if (!['approved', 'flagged', 'rejected'].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification status'
      });
    }

    // Check if work update exists
    const [workUpdate] = await connection.query(
      'SELECT id, status FROM work_updates WHERE id = ?',
      [workUpdateId]
    );

    if (workUpdate.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work update not found'
      });
    }

    // Insert verification record
    await connection.query(`
      INSERT INTO timesheet_verifications (
        work_update_id, client_timesheet_id, verified_by,
        verification_status, verification_notes, hours_discrepancy
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [workUpdateId, clientTimesheetId, userId, verificationStatus,
        verificationNotes, hoursDiscrepancy || 0]);

    // Update work update status
    await connection.query(
      'UPDATE work_updates SET status = ? WHERE id = ?',
      [verificationStatus, workUpdateId]
    );

    // Mark client timesheet as verified if approved
    if (verificationStatus === 'approved' && clientTimesheetId) {
      await connection.query(
        'UPDATE client_timesheets SET is_verified = 1 WHERE id = ?',
        [clientTimesheetId]
      );
    }

    // Audit log
    await connection.query(`
      INSERT INTO timesheet_audit_log (
        entity_type, entity_id, action_type, action_by, 
        new_value, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, ['verification', workUpdateId, verificationStatus, userId,
        JSON.stringify({ verificationStatus, verificationNotes, hoursDiscrepancy }),
        req.ip]);

    await connection.commit();

    res.json({
      success: true,
      message: `Work update ${verificationStatus} successfully`
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error verifying work update:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify work update',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/admin/timesheet/bulk-verify
 * Bulk verify multiple work updates
 */
router.post('/bulk-verify', authMiddleware, adminAuthMiddleware, async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { workUpdateIds, verificationStatus, verificationNotes } = req.body;
    const userId = req.user.userId;

    if (!workUpdateIds || !Array.isArray(workUpdateIds) || workUpdateIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Work update IDs array is required'
      });
    }

    if (!['approved', 'flagged', 'rejected'].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification status'
      });
    }

    let successCount = 0;
    let failCount = 0;

    for (const workUpdateId of workUpdateIds) {
      try {
        // Get client timesheet ID if exists
        const [timesheet] = await connection.query(
          'SELECT id FROM client_timesheets WHERE work_update_id = ?',
          [workUpdateId]
        );

        const clientTimesheetId = timesheet.length > 0 ? timesheet[0].id : null;

        // Insert verification
        await connection.query(`
          INSERT INTO timesheet_verifications (
            work_update_id, client_timesheet_id, verified_by,
            verification_status, verification_notes
          ) VALUES (?, ?, ?, ?, ?)
        `, [workUpdateId, clientTimesheetId, userId, verificationStatus, verificationNotes]);

        // Update work update status
        await connection.query(
          'UPDATE work_updates SET status = ? WHERE id = ?',
          [verificationStatus, workUpdateId]
        );

        // Mark timesheet as verified if approved
        if (verificationStatus === 'approved' && clientTimesheetId) {
          await connection.query(
            'UPDATE client_timesheets SET is_verified = 1 WHERE id = ?',
            [clientTimesheetId]
          );
        }

        successCount++;
      } catch (err) {
        console.error(`Error verifying work update ${workUpdateId}:`, err);
        failCount++;
      }
    }

    // Audit log
    await connection.query(`
      INSERT INTO timesheet_audit_log (
        entity_type, entity_id, action_type, action_by, 
        new_value, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, ['verification', 0, 'bulk_verify', userId,
        JSON.stringify({ count: successCount, status: verificationStatus }),
        req.ip]);

    await connection.commit();

    res.json({
      success: true,
      message: `Bulk verification completed`,
      successCount,
      failCount
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error in bulk verification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform bulk verification',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/admin/timesheet/payroll-status
 * Get payroll period lock status
 */
router.get('/payroll-status', authMiddleware, adminAuthMiddleware, async (req, res) => {
  try {
    const { payrollPeriod } = req.query;

    let query = 'SELECT * FROM payroll_period_locks';
    const params = [];

    if (payrollPeriod) {
      query += ' WHERE payroll_period = ?';
      params.push(payrollPeriod);
    } else {
      query += ' ORDER BY created_at DESC LIMIT 1';
    }

    const [periodLocks] = await db.query(query, params);

    // Get pending verifications count
    const [pendingCounts] = await db.query(`
      SELECT 
        COUNT(*) AS total_pending,
        SUM(CASE WHEN wu.status = 'flagged' THEN 1 ELSE 0 END) AS flagged_count
      FROM work_updates wu
      WHERE wu.status IN ('submitted', 'flagged')
    `);

    res.json({
      success: true,
      payrollPeriodLock: periodLocks[0] || null,
      pendingVerifications: pendingCounts[0]
    });
  } catch (error) {
    console.error('Error fetching payroll status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payroll status',
      error: error.message
    });
  }
});

/**
 * POST /api/admin/timesheet/lock-payroll-period
 * Lock a payroll period
 */
router.post('/lock-payroll-period', authMiddleware, adminAuthMiddleware, async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { payrollPeriod } = req.body;
    const userId = req.user.userId;

    if (!payrollPeriod) {
      return res.status(400).json({
        success: false,
        message: 'Payroll period is required'
      });
    }

    // Check for pending verifications
    const [pending] = await connection.query(`
      SELECT COUNT(*) AS pending_count
      FROM work_updates
      WHERE status IN ('submitted', 'flagged')
    `);

    const [flagged] = await connection.query(`
      SELECT COUNT(*) AS flagged_count
      FROM work_updates
      WHERE status = 'flagged'
    `);

    if (pending[0].pending_count > 0 || flagged[0].flagged_count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot lock payroll period with pending or flagged submissions',
        pendingCount: pending[0].pending_count,
        flaggedCount: flagged[0].flagged_count
      });
    }

    // Create or update payroll period lock
    await connection.query(`
      INSERT INTO payroll_period_locks (
        payroll_period, lock_status, locked_by, locked_at
      ) VALUES (?, 'locked', ?, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE
        lock_status = 'locked',
        locked_by = ?,
        locked_at = CURRENT_TIMESTAMP
    `, [payrollPeriod, userId, userId]);

    // Audit log
    await connection.query(`
      INSERT INTO timesheet_audit_log (
        entity_type, entity_id, action_type, action_by, 
        new_value, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, ['payroll_lock', 0, 'lock_period', userId,
        JSON.stringify({ payrollPeriod }),
        req.ip]);

    await connection.commit();

    res.json({
      success: true,
      message: `Payroll period ${payrollPeriod} locked successfully`
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error locking payroll period:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to lock payroll period',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/admin/timesheet/download/:timesheetId
 * Admin download client timesheet
 */
router.get('/download/:timesheetId', authMiddleware, adminAuthMiddleware, async (req, res) => {
  try {
    const timesheetId = req.params.timesheetId;

    const [timesheet] = await db.query(
      'SELECT file_path, file_name FROM client_timesheets WHERE id = ?',
      [timesheetId]
    );

    if (timesheet.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Timesheet not found'
      });
    }

    const file = timesheet[0];
    res.download(file.file_path, file.file_name);

  } catch (error) {
    console.error('Error downloading timesheet:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download timesheet',
      error: error.message
    });
  }
});

module.exports = router;
