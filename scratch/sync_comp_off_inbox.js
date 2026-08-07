const { db } = require("../config/database");
const { createInboxNotification } = require("../utils/inbox-helper");

async function syncCompOffInbox() {
    let c = null;
    try {
        c = await db();
        const [pendingRequests] = await c.query(
            `SELECT cor.*, e.reporting_manager_id, e.FullName
             FROM comp_off_requests cor
             JOIN employees e ON cor.employee_id = e.id
             WHERE cor.id NOT IN (
                 SELECT request_id FROM inbox_notifications WHERE request_type = 'Comp Off Request'
             )`
        );

        console.log(`Found ${pendingRequests.length} comp off requests to sync into inbox_notifications.`);

        for (const req of pendingRequests) {
            await createInboxNotification(
                c,
                req.employee_id,
                req.reporting_manager_id,
                "Comp Off Request",
                req.id,
                `Comp Off Request - ${req.FullName || 'Employee'}`,
                `Requested ${req.total_days} day(s) Comp Off for date worked: ${req.date_worked}. Reason: ${req.reason || 'N/A'}`,
                "Medium",
                { date_worked: req.date_worked, total_days: req.total_days, reason: req.reason }
            );

            // Update status if it's already approved/rejected
            if (req.status && req.status.toLowerCase() !== 'pending') {
                const statusName = req.status.charAt(0).toUpperCase() + req.status.slice(1).toLowerCase();
                await c.query(
                    `UPDATE inbox_notifications SET status = ? WHERE request_type = 'Comp Off Request' AND request_id = ?`,
                    [statusName, req.id]
                );
            }
        }
        console.log("Successfully synced comp off requests to inbox!");
    } catch (err) {
        console.error("Sync error:", err);
    } finally {
        if (c) await c.end();
    }
}

syncCompOffInbox();
