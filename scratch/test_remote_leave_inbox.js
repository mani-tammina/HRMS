const { db } = require('../config/database');
const { createInboxNotification } = require('../utils/inbox-helper');

(async () => {
  const c = await db();
  try {
    const empId = 182;
    const mgrId = 585;

    // 1. Check if employee 182 exists with manager 585
    const [emp] = await c.query('SELECT id, FullName, reporting_manager_id FROM employees WHERE id = ?', [empId]);
    console.log('Employee:', emp[0]);

    // 2. Insert a test Remote Request into leaves
    const remoteDate = '2026-10-23';
    const [remoteResult] = await c.query(
      `INSERT INTO leaves (employee_id, leave_type, start_date, end_date, total_days, reason, status, applied_at)
       VALUES (?, 'Remote', ?, ?, 1.00, 'Working remotely from home', 'pending', NOW())`,
      [empId, remoteDate, remoteDate]
    );
    console.log('Inserted Remote leave ID:', remoteResult.insertId);

    // 3. Create Inbox Notification for Remote
    const remoteNotifId = await createInboxNotification(
      c,
      empId,
      mgrId,
      'Remote Login',
      remoteResult.insertId,
      'Remote Request - ' + emp[0].FullName,
      'Requested Remote from ' + remoteDate + ' to ' + remoteDate + '. Reason: Working remotely from home',
      'Medium',
      { start_date: remoteDate, end_date: remoteDate, total_days: 1, reason: 'Working remotely from home', work_mode: 'Remote' }
    );
    console.log('Created Remote Inbox Notification ID:', remoteNotifId);

    // 4. Insert a test Leave Request into leaves
    const leaveDate = '2026-10-24';
    const [leaveResult] = await c.query(
      `INSERT INTO leaves (employee_id, leave_type_id, leave_type, start_date, end_date, total_days, reason, status, applied_at)
       VALUES (?, 2, 'Casual Leave', ?, ?, 1.00, 'Personal work', 'pending', NOW())`,
      [empId, leaveDate, leaveDate]
    );
    console.log('Inserted Casual leave ID:', leaveResult.insertId);

    // 5. Create Inbox Notification for Leave
    const leaveNotifId = await createInboxNotification(
      c,
      empId,
      mgrId,
      'Leave Request',
      leaveResult.insertId,
      'Leave Request - ' + emp[0].FullName,
      'Applied for Leave from ' + leaveDate + ' to ' + leaveDate + '. Reason: Personal work',
      'Medium',
      { start_date: leaveDate, end_date: leaveDate, total_days: 1, reason: 'Personal work' }
    );
    console.log('Created Leave Inbox Notification ID:', leaveNotifId);

    // 6. Query Inbox for Manager 585
    const [mgrNotifs] = await c.query(
      `SELECT n.notification_id, n.request_type, n.request_id, n.title, n.status, n.created_at, e.FullName as employee_name
       FROM inbox_notifications n
       JOIN employees e ON n.employee_id = e.id
       WHERE n.manager_id = ? AND n.status = 'Pending' AND n.is_archived = 0
       ORDER BY n.created_at DESC`,
      [mgrId]
    );
    console.log('=== PENDING INBOX NOTIFICATIONS FOR MANAGER 585 ===');
    console.table(mgrNotifs);

    // 7. Test Tab filtering for Manager 585:
    // Tab: Leave
    const [leaveTab] = await c.query(
      `SELECT notification_id, request_type, title, status FROM inbox_notifications 
       WHERE manager_id = ? AND is_archived = 0 AND status = 'Pending'
       AND request_type IN ('Leave Request', 'Comp Off Request') 
       AND (title NOT LIKE '%WFH%' AND title NOT LIKE '%Work From Home%' AND title NOT LIKE '%Remote%')`,
      [mgrId]
    );
    console.log('Leave Tab count:', leaveTab.length);
    console.table(leaveTab);

    // Tab: Remote
    const [remoteTab] = await c.query(
      `SELECT notification_id, request_type, title, status FROM inbox_notifications 
       WHERE manager_id = ? AND is_archived = 0 AND status = 'Pending'
       AND (request_type = 'Remote Login' OR title LIKE '%Remote%')`,
      [mgrId]
    );
    console.log('Remote Tab count:', remoteTab.length);
    console.table(remoteTab);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await c.end();
  }
})();
