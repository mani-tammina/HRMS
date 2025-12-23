// ============================================
// Timesheet Notification Service
// ============================================
// Handles automated reminders for missing timesheets

const db = require('../config/database');
const cron = require('node-cron');

class TimesheetNotificationService {
  constructor() {
    this.isRunning = false;
  }

  /**
   * Start the notification service with cron jobs
   */
  start() {
    if (this.isRunning) {
      console.log('⚠️ Timesheet notification service is already running');
      return;
    }

    // Run every hour to check for pending timesheets
    cron.schedule('0 * * * *', () => {
      this.checkPendingTimesheets();
    });

    // Run at 6 PM every day to send end-of-day reminders
    cron.schedule('0 18 * * *', () => {
      this.sendEndOfDayReminders();
    });

    this.isRunning = true;
    console.log('✅ Timesheet notification service started');
  }

  /**
   * Check for pending timesheets and send reminders
   */
  async checkPendingTimesheets() {
    try {
      console.log('🔍 Checking for pending timesheets...');

      const today = new Date().toISOString().split('T')[0];

      // Get employees with active project assignments who haven't submitted timesheets
      const [pendingEmployees] = await db.query(`
        SELECT DISTINCT
          e.id AS employee_id,
          e.employee_code,
          e.first_name,
          e.last_name,
          e.email,
          pa.project_id,
          p.project_name,
          p.client_name,
          ps.shift_name,
          ps.end_time,
          tc.compliance_status,
          tc.reminder_count,
          tc.last_reminder_at
        FROM project_assignments pa
        INNER JOIN employees e ON pa.employee_id = e.id
        INNER JOIN projects p ON pa.project_id = p.id
        LEFT JOIN project_shifts ps ON pa.shift_id = ps.id
        LEFT JOIN timesheet_compliance tc ON e.id = tc.employee_id 
          AND pa.project_id = tc.project_id 
          AND tc.compliance_date = ?
        WHERE pa.status = 'active'
          AND p.status = 'active'
          AND (tc.compliance_status IN ('missing', 'update_only') OR tc.id IS NULL)
      `, [today]);

      console.log(`📊 Found ${pendingEmployees.length} pending submissions`);

      for (const employee of pendingEmployees) {
        await this.sendReminder(employee);
      }

    } catch (error) {
      console.error('❌ Error checking pending timesheets:', error);
    }
  }

  /**
   * Send end of day reminders
   */
  async sendEndOfDayReminders() {
    try {
      console.log('📧 Sending end-of-day reminders...');

      const today = new Date().toISOString().split('T')[0];

      const [pendingEmployees] = await db.query(`
        SELECT DISTINCT
          e.id AS employee_id,
          e.employee_code,
          e.first_name,
          e.last_name,
          e.email,
          pa.project_id,
          p.project_name,
          p.client_name,
          tc.compliance_status,
          tc.reminder_count
        FROM project_assignments pa
        INNER JOIN employees e ON pa.employee_id = e.id
        INNER JOIN projects p ON pa.project_id = p.id
        LEFT JOIN timesheet_compliance tc ON e.id = tc.employee_id 
          AND pa.project_id = tc.project_id 
          AND tc.compliance_date = ?
        WHERE pa.status = 'active'
          AND p.status = 'active'
          AND (tc.compliance_status IN ('missing', 'update_only') OR tc.id IS NULL)
      `, [today]);

      console.log(`📊 Sending reminders to ${pendingEmployees.length} employees`);

      for (const employee of pendingEmployees) {
        await this.sendEndOfDayNotification(employee);
      }

    } catch (error) {
      console.error('❌ Error sending end-of-day reminders:', error);
    }
  }

  /**
   * Send individual reminder to employee
   */
  async sendReminder(employee) {
    try {
      const now = new Date();
      const currentHour = now.getHours();

      // Only send reminders during work hours (9 AM to 8 PM)
      if (currentHour < 9 || currentHour > 20) {
        return;
      }

      // Check if shift end time is approaching (within 2 hours)
      if (employee.end_time) {
        const [hours, minutes] = employee.end_time.split(':');
        const shiftEndHour = parseInt(hours);
        const timeUntilEnd = shiftEndHour - currentHour;

        if (timeUntilEnd !== 2) {
          return; // Only send reminder 2 hours before shift end
        }
      }

      // Check if reminder was sent recently (within last 4 hours)
      if (employee.last_reminder_at) {
        const lastReminder = new Date(employee.last_reminder_at);
        const hoursSinceLastReminder = (now - lastReminder) / (1000 * 60 * 60);
        if (hoursSinceLastReminder < 4) {
          return; // Don't spam reminders
        }
      }

      const message = this.buildReminderMessage(employee);

      // Queue notification
      await db.query(`
        INSERT INTO timesheet_notifications (
          employee_id, project_id, notification_type, notification_channel,
          subject, message, scheduled_at
        ) VALUES (?, ?, 'reminder', 'email', ?, ?, NOW())
      `, [
        employee.employee_id,
        employee.project_id,
        'Timesheet Submission Reminder',
        message
      ]);

      // Update compliance record
      await db.query(`
        INSERT INTO timesheet_compliance (
          employee_id, project_id, compliance_date, compliance_status,
          reminder_sent, reminder_count, last_reminder_at
        ) VALUES (?, ?, CURDATE(), 'missing', 1, 1, NOW())
        ON DUPLICATE KEY UPDATE
          reminder_sent = 1,
          reminder_count = reminder_count + 1,
          last_reminder_at = NOW()
      `, [employee.employee_id, employee.project_id]);

      console.log(`✉️ Reminder queued for ${employee.employee_code} - ${employee.project_name}`);

    } catch (error) {
      console.error(`❌ Error sending reminder to ${employee.employee_code}:`, error);
    }
  }

  /**
   * Send end of day notification
   */
  async sendEndOfDayNotification(employee) {
    try {
      const message = this.buildEndOfDayMessage(employee);

      await db.query(`
        INSERT INTO timesheet_notifications (
          employee_id, project_id, notification_type, notification_channel,
          subject, message, scheduled_at
        ) VALUES (?, ?, 'reminder', 'email', ?, ?, NOW())
      `, [
        employee.employee_id,
        employee.project_id,
        'Daily Timesheet Reminder',
        message
      ]);

      console.log(`✉️ End-of-day reminder queued for ${employee.employee_code}`);

    } catch (error) {
      console.error(`❌ Error sending end-of-day reminder:`, error);
    }
  }

  /**
   * Build reminder message
   */
  buildReminderMessage(employee) {
    const status = employee.compliance_status;
    let message = `Dear ${employee.first_name} ${employee.last_name},\n\n`;

    if (status === 'update_only') {
      message += `You have submitted your work update for ${employee.project_name}, but your client timesheet is still pending.\n\n`;
      message += `Please upload your original client timesheet as soon as possible.\n\n`;
    } else {
      message += `This is a reminder to submit your daily work update and client timesheet for ${employee.project_name}.\n\n`;
      message += `Your shift ends in approximately 2 hours. Please complete your submission before the end of your shift.\n\n`;
    }

    message += `Project: ${employee.project_name}\n`;
    message += `Client: ${employee.client_name}\n`;
    message += `Date: ${new Date().toLocaleDateString()}\n\n`;
    message += `Please log in to the HRMS portal to submit your update.\n\n`;
    message += `Best regards,\nHRMS Team`;

    return message;
  }

  /**
   * Build end of day message
   */
  buildEndOfDayMessage(employee) {
    const status = employee.compliance_status;
    let message = `Dear ${employee.first_name} ${employee.last_name},\n\n`;

    message += `As of the end of today, you have not yet submitted your work update`;
    
    if (status === 'update_only') {
      message += ` and client timesheet`;
    }
    
    message += ` for ${employee.project_name}.\n\n`;
    message += `Please submit your update at your earliest convenience to avoid any delays in payroll processing.\n\n`;
    message += `Project: ${employee.project_name}\n`;
    message += `Client: ${employee.client_name}\n`;
    message += `Date: ${new Date().toLocaleDateString()}\n\n`;
    
    if ((employee.reminder_count || 0) > 2) {
      message += `⚠️ This is your ${employee.reminder_count + 1}th reminder. Repeated non-compliance may result in escalation.\n\n`;
    }

    message += `Please log in to the HRMS portal to submit your update.\n\n`;
    message += `Best regards,\nHRMS Team`;

    return message;
  }

  /**
   * Process notification queue and send emails
   */
  async processNotificationQueue() {
    try {
      const [notifications] = await db.query(`
        SELECT 
          tn.*,
          e.email AS employee_email,
          e.first_name,
          e.last_name
        FROM timesheet_notifications tn
        INNER JOIN employees e ON tn.employee_id = e.id
        WHERE tn.status = 'pending'
          AND tn.scheduled_at <= NOW()
        LIMIT 50
      `);

      for (const notification of notifications) {
        try {
          // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
          // For now, just mark as sent
          await db.query(`
            UPDATE timesheet_notifications
            SET status = 'sent', sent_at = NOW()
            WHERE id = ?
          `, [notification.id]);

          console.log(`✉️ Notification sent to ${notification.employee_email}`);

        } catch (error) {
          await db.query(`
            UPDATE timesheet_notifications
            SET status = 'failed', error_message = ?
            WHERE id = ?
          `, [error.message, notification.id]);

          console.error(`❌ Failed to send notification ${notification.id}:`, error);
        }
      }

    } catch (error) {
      console.error('❌ Error processing notification queue:', error);
    }
  }

  /**
   * Get notification statistics
   */
  async getStatistics() {
    try {
      const [stats] = await db.query(`
        SELECT 
          COUNT(*) AS total_notifications,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) AS sent,
          SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failed
        FROM timesheet_notifications
        WHERE DATE(created_at) = CURDATE()
      `);

      return stats[0];
    } catch (error) {
      console.error('❌ Error fetching notification statistics:', error);
      return null;
    }
  }
}

// Create singleton instance
const notificationService = new TimesheetNotificationService();

module.exports = notificationService;
