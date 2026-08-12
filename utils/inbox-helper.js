/**
 * INBOX NOTIFICATION HELPERS
 * Automatically manages creating and updating notification records in inbox_notifications.
 */

/**
 * Creates or updates an inbox notification for a manager.
 * If a notification for the same request already exists, it resets it to 'Pending', marks it as unread, and updates its details.
 * 
 * @param {Object} connection - MySQL Connection object
 * @param {number} employeeId - ID of employee who submitted request
 * @param {number} managerId - ID of employee who is the manager/approver
 * @param {string} requestType - Type of request (Leave Request, Attendance Regularization, Timesheet Request, Resignation Request)
 * @param {number} requestId - ID of the request record (leaves, timesheets, resignations, etc.)
 * @param {string} title - Title of the notification
 * @param {string} description - Brief description of the request
 * @param {string} priority - Priority level ('Low', 'Medium', 'High', 'Urgent')
 */
async function createInboxNotification(connection, employeeId, managerId, requestType, requestId, title, description, priority = 'Medium', metadata = null) {
    try {
        let finalManagerId = managerId;
        
        // If managerId is not provided, look it up in the employees table
        if (!finalManagerId && employeeId) {
            const [rows] = await connection.query(
                "SELECT reporting_manager_id FROM employees WHERE id = ?",
                [employeeId]
            );
            if (rows.length > 0) {
                finalManagerId = rows[0].reporting_manager_id;
            }
        }

        if (!finalManagerId) {
            console.log(`[Inbox Notification] No reporting manager found for employee ID ${employeeId}. Notification skipped.`);
            return null;
        }

        const metadataStr = metadata ? JSON.stringify(metadata) : null;

        // Check if an existing notification exists for this request
        const [existing] = await connection.query(
            "SELECT notification_id FROM inbox_notifications WHERE request_type = ? AND request_id = ?",
            [requestType, requestId]
        );

        if (existing.length > 0) {
            // Update existing notification to Pending and Unread
            const notifId = existing[0].notification_id;
            await connection.query(
                `UPDATE inbox_notifications 
                 SET title = ?, description = ?, status = 'Pending', is_read = 0, is_archived = 0, priority = ?, metadata = ?, updated_at = NOW() 
                 WHERE notification_id = ?`,
                [title, description, priority, metadataStr, notifId]
            );
            console.log(`[Inbox Notification] Reset existing notification ID ${notifId} to Pending`);
            return notifId;
        } else {
            // Insert new notification
            const [result] = await connection.query(
                `INSERT INTO inbox_notifications 
                 (employee_id, manager_id, request_type, request_id, title, description, priority, status, is_read, is_archived, metadata, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', 0, 0, ?, NOW())`,
                [employeeId, finalManagerId, requestType, requestId, title, description, priority, metadataStr]
            );
            console.log(`[Inbox Notification] Created new notification ID ${result.insertId} for manager ${finalManagerId}`);
            return result.insertId;
        }
    } catch (err) {
        console.error("[Inbox Notification] Error creating/updating notification:", err.message);
        return null;
    }
}

/**
 * Updates the status of a notification (Approved, Rejected, Cancelled).
 * Also marks it as read and stores rejection reason in metadata if provided.
 * 
 * @param {Object} connection - MySQL Connection object
 * @param {string} requestType - Type of request
 * @param {number} requestId - ID of the request
 * @param {string} status - New status ('Approved', 'Rejected', 'Cancelled', 'Pending')
 * @param {number} actionTakenBy - ID of the employee who took action (manager/HR)
 * @param {string} rejectionReason - Optional reason for rejection
 */
async function updateNotificationStatus(connection, requestType, requestId, status, actionTakenBy, rejectionReason = null) {
    try {
        let metaObj = {};
        const [existing] = await connection.query(
            "SELECT metadata FROM inbox_notifications WHERE request_type = ? AND request_id = ?",
            [requestType, requestId]
        );

        if (existing.length > 0 && existing[0].metadata) {
            try {
                metaObj = typeof existing[0].metadata === 'string' ? JSON.parse(existing[0].metadata) : existing[0].metadata;
            } catch (e) {
                metaObj = {};
            }
        }

        if (status === 'Rejected' && rejectionReason) {
            metaObj.rejection_reason = rejectionReason;
            metaObj.reason = rejectionReason;
            metaObj.rejected_on = new Date().toISOString();
            if (actionTakenBy) {
                const [mgr] = await connection.query("SELECT FullName FROM employees WHERE id = ?", [actionTakenBy]);
                if (mgr.length > 0) {
                    metaObj.rejected_by = mgr[0].FullName;
                }
            }
        }

        const metadataStr = Object.keys(metaObj).length > 0 ? JSON.stringify(metaObj) : null;

        const [result] = await connection.query(
            `UPDATE inbox_notifications 
             SET status = ?, is_read = 1, action_taken_by = ?, action_taken_on = NOW(), metadata = COALESCE(?, metadata), updated_at = NOW() 
             WHERE request_type = ? AND request_id = ?`,
            [status, actionTakenBy || null, metadataStr, requestType, requestId]
        );
        console.log(`[Inbox Notification] Updated status of ${requestType} ID ${requestId} to ${status}. Affected rows: ${result.affectedRows}`);
    } catch (err) {
        console.error(`[Inbox Notification] Error updating status of ${requestType} ID ${requestId}:`, err.message);
    }
}

module.exports = {
    createInboxNotification,
    updateNotificationStatus
};
