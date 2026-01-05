// ============================================
// Project Work Updates Routes
// ============================================
// Handles employee work updates and client timesheet uploads

const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for client timesheet uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/client_timesheets');
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `timesheet-${req.user.userId}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept PDF, Excel, and common image formats
  const allowedTypes = /pdf|xlsx?|csv|png|jpg|jpeg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, Excel, CSV, or image files are allowed for timesheets'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// ============================================
// Employee Routes
// ============================================

/**
 * GET /api/work-updates/my-projects
 * Get active projects assigned to the logged-in employee
 */
router.get('/my-projects', authMiddleware, async (req, res) => {
  try {
    const employeeId = req.user.employeeId;

    const query = `
      SELECT 
        pa.id AS assignment_id,
        pa.employee_id,
        p.id AS project_id,
        p.project_code,
        p.project_name,
        p.client_name,
        pa.role_in_project,
        pa.allocation_percentage,
        pa.assignment_start_date,
        pa.assignment_end_date,
        ps.id AS shift_id,
        ps.shift_type,
        ps.shift_name,
        ps.start_time,
        ps.end_time,
        ps.timezone,
        pa.status AS assignment_status
      FROM project_assignments pa
      INNER JOIN projects p ON pa.project_id = p.id
      LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
      WHERE pa.employee_id = ?
        AND pa.status = 'active'
        AND p.status = 'active'
      ORDER BY pa.assignment_start_date DESC
    `;

    const [projects] = await db.query(query, [employeeId]);

    res.json({
      success: true,
      projects,
      message: projects.length === 0 ? 'No active project assignments found' : null
    });
  } catch (error) {
    console.error('Error fetching employee projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
});

/**
 * GET /api/work-updates/my-updates
 * Get work updates for the logged-in employee
 */
router.get('/my-updates', authMiddleware, async (req, res) => {
  try {
    const employeeId = req.user.employeeId;
    const { startDate, endDate, projectId, status } = req.query;

    let query = `
      SELECT 
        wu.id,
        wu.employee_id,
        wu.project_id,
        p.project_name,
        p.client_name,
        wu.update_date,
        wu.shift_start_time,
        wu.shift_end_time,
        wu.hours_worked,
        wu.work_description,
        wu.tasks_completed,
        wu.challenges_faced,
        wu.status,
        wu.submission_timestamp,
        ps.shift_name,
        ps.shift_type,
        ct.id AS timesheet_id,
        ct.file_name,
        ct.is_verified,
        tv.verification_status,
        tv.verification_notes
      FROM work_updates wu
      INNER JOIN projects p ON wu.project_id = p.id
      LEFT JOIN project_shifts ps ON wu.shift_id = ps.id
      LEFT JOIN client_timesheets ct ON wu.id = ct.work_update_id
      LEFT JOIN timesheet_verifications tv ON wu.id = tv.work_update_id
      WHERE wu.employee_id = ?
    `;

    const params = [employeeId];

    if (startDate) {
      query += ' AND wu.update_date >= ?';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND wu.update_date <= ?';
      params.push(endDate);
    }

    if (projectId) {
      query += ' AND wu.project_id = ?';
      params.push(projectId);
    }

    if (status) {
      query += ' AND wu.status = ?';
      params.push(status);
    }

    query += ' ORDER BY wu.update_date DESC, wu.submission_timestamp DESC';

    const [updates] = await db.query(query, params);

    res.json({
      success: true,
      updates
    });
  } catch (error) {
    console.error('Error fetching work updates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work updates',
      error: error.message
    });
  }
});

/**
 * POST /api/work-updates/submit
 * Submit a daily work update with optional client timesheet
 */
router.post('/submit', authMiddleware, upload.single('clientTimesheet'), async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const employeeId = req.user.employeeId;
    const userId = req.user.userId;
    const {
      projectId,
      shiftId,
      updateDate,
      shiftStartTime,
      shiftEndTime,
      hoursWorked,
      workDescription,
      tasksCompleted,
      challengesFaced,
      submitNow
    } = req.body;

    // Validate required fields
    if (!projectId || !updateDate || !hoursWorked || !workDescription) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Verify employee is assigned to the project
    const [assignment] = await connection.query(
      `SELECT id, shift_id FROM project_assignments 
       WHERE employee_id = ? AND project_id = ? AND status = 'active'`,
      [employeeId, projectId]
    );

    if (assignment.length === 0) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(403).json({
        success: false,
        message: 'You are not assigned to this project'
      });
    }

    // Check if update already exists for this date
    const [existing] = await connection.query(
      `SELECT id FROM work_updates 
       WHERE employee_id = ? AND project_id = ? AND update_date = ?`,
      [employeeId, projectId, updateDate]
    );

    let workUpdateId;
    const status = submitNow === 'true' ? 'submitted' : 'draft';

    if (existing.length > 0) {
      // Update existing record
      workUpdateId = existing[0].id;
      await connection.query(
        `UPDATE work_updates 
         SET shift_id = ?, shift_start_time = ?, shift_end_time = ?,
             hours_worked = ?, work_description = ?, tasks_completed = ?,
             challenges_faced = ?, status = ?,
             submission_timestamp = ${status === 'submitted' ? 'CURRENT_TIMESTAMP' : 'submission_timestamp'},
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [shiftId, shiftStartTime, shiftEndTime, hoursWorked, workDescription, 
         tasksCompleted, challengesFaced, status, workUpdateId]
      );
    } else {
      // Insert new record
      const [result] = await connection.query(
        `INSERT INTO work_updates (
          employee_id, project_id, shift_id, update_date,
          shift_start_time, shift_end_time, hours_worked,
          work_description, tasks_completed, challenges_faced,
          status, submission_timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${status === 'submitted' ? 'CURRENT_TIMESTAMP' : 'NULL'})`,
        [employeeId, projectId, shiftId, updateDate, shiftStartTime,
         shiftEndTime, hoursWorked, workDescription, tasksCompleted,
         challengesFaced, status]
      );
      workUpdateId = result.insertId;
    }

    // Handle client timesheet upload
    let timesheetId = null;
    if (req.file) {
      const [timesheetResult] = await connection.query(
        `INSERT INTO client_timesheets (
          work_update_id, employee_id, project_id, timesheet_date,
          file_name, file_path, file_type, file_size
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [workUpdateId, employeeId, projectId, updateDate,
         req.file.originalname, req.file.path, req.file.mimetype, req.file.size]
      );
      timesheetId = timesheetResult.insertId;
    }

    // Update compliance status
    await connection.query(
      'CALL sp_update_compliance_status(?, ?, ?)',
      [employeeId, projectId, updateDate]
    );

    // Audit log
    await connection.query(
      `INSERT INTO timesheet_audit_log (
        entity_type, entity_id, action_type, action_by, new_value, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      ['work_update', workUpdateId, status === 'submitted' ? 'submit' : 'save_draft',
       userId, JSON.stringify(req.body), req.ip]
    );

    await connection.commit();

    res.json({
      success: true,
      message: status === 'submitted' ? 'Work update submitted successfully' : 'Work update saved as draft',
      workUpdateId,
      timesheetId,
      status
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error submitting work update:', error);
    
    // Clean up uploaded file if there was an error
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit work update',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/work-updates/compliance-status
 * Get compliance status for the logged-in employee
 */
router.get('/compliance-status', authMiddleware, async (req, res) => {
  try {
    const employeeId = req.user.employeeId;
    const { startDate, endDate } = req.query;

    let query = `
      SELECT 
        tc.compliance_date,
        tc.project_id,
        p.project_name,
        p.client_name,
        tc.has_work_update,
        tc.has_client_timesheet,
        tc.compliance_status,
        tc.reminder_count,
        ps.shift_name,
        ps.shift_type
      FROM timesheet_compliance tc
      INNER JOIN projects p ON tc.project_id = p.id
      LEFT JOIN project_shifts ps ON tc.shift_id = ps.id
      WHERE tc.employee_id = ?
    `;

    const params = [employeeId];

    if (startDate) {
      query += ' AND tc.compliance_date >= ?';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND tc.compliance_date <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY tc.compliance_date DESC';

    const [compliance] = await db.query(query, params);

    res.json({
      success: true,
      compliance
    });
  } catch (error) {
    console.error('Error fetching compliance status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch compliance status',
      error: error.message
    });
  }
});

/**
 * DELETE /api/work-updates/:id
 * Delete a draft work update
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const updateId = req.params.id;
    const employeeId = req.user.employeeId;
    const userId = req.user.userId;

    // Check if update exists and belongs to the employee
    const [update] = await connection.query(
      `SELECT id, status FROM work_updates 
       WHERE id = ? AND employee_id = ?`,
      [updateId, employeeId]
    );

    if (update.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work update not found'
      });
    }

    if (update[0].status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only draft updates can be deleted'
      });
    }

    // Delete associated timesheet files
    const [timesheets] = await connection.query(
      'SELECT file_path FROM client_timesheets WHERE work_update_id = ?',
      [updateId]
    );

    for (const timesheet of timesheets) {
      await fs.unlink(timesheet.file_path).catch(console.error);
    }

    // Delete work update (cascade will delete timesheets)
    await connection.query('DELETE FROM work_updates WHERE id = ?', [updateId]);

    // Audit log
    await connection.query(
      `INSERT INTO timesheet_audit_log (
        entity_type, entity_id, action_type, action_by, ip_address
      ) VALUES (?, ?, ?, ?, ?)`,
      ['work_update', updateId, 'delete', userId, req.ip]
    );

    await connection.commit();

    res.json({
      success: true,
      message: 'Work update deleted successfully'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error deleting work update:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete work update',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/work-updates/download-timesheet/:timesheetId
 * Download a client timesheet file
 */
router.get('/download-timesheet/:timesheetId', authMiddleware, async (req, res) => {
  try {
    const timesheetId = req.params.timesheetId;
    const employeeId = req.user.employeeId;

    const [timesheet] = await db.query(
      `SELECT ct.file_path, ct.file_name, ct.file_type
       FROM client_timesheets ct
       INNER JOIN work_updates wu ON ct.work_update_id = wu.id
       WHERE ct.id = ? AND wu.employee_id = ?`,
      [timesheetId, employeeId]
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
