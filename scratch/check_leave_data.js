const { db } = require('../config/database');

async function checkLeaveData() {
    const c = await db();
    const today = new Date().toISOString().split('T')[0];
    console.log('Today:', today);

    // Check for emp 566 (logged-in user 2)
    const [emp] = await c.query("SELECT id, FirstName, LastName, reporting_manager_id, DepartmentId FROM employees WHERE id = 566");
    console.log('Current employee:', emp[0]);

    // Get team member IDs (co-team under same manager)
    const [coTeam] = await c.query(
        "SELECT id, FirstName, LastName FROM employees WHERE reporting_manager_id = ? AND EmploymentStatus = 'Working'",
        [emp[0].reporting_manager_id]
    );
    const teamIds = coTeam.map(r => r.id);
    console.log(`\nTeam members (${teamIds.length}):`, coTeam.map(e => `${e.FirstName} ${e.LastName} (${e.id})`));

    // Check approved leaves today for team members
    const [leaves] = await c.query(`
        SELECT l.employee_id, e.FirstName, e.LastName, l.status, l.start_date, l.end_date, l.leave_type, lt.type_name
        FROM leaves l
        INNER JOIN employees e ON l.employee_id = e.id
        LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
        WHERE l.start_date <= ? AND l.end_date >= ?
          AND e.id IN (?)
    `, [today, today, teamIds]);

    console.log(`\nAll leaves covering today for team (${leaves.length}):`);
    leaves.forEach(l => {
        console.log(`  - ${l.FirstName} ${l.LastName} (${l.employee_id}): status=${l.status}, type=${l.leave_type || l.type_name}, ${l.start_date} to ${l.end_date}`);
    });

    // Filter to only approved + non-WFH/Remote
    const onLeave = leaves.filter(l => l.status === 'approved' && (!l.leave_type || !['WFH', 'Remote'].includes(l.leave_type)));
    console.log(`\nApproved on-leave (excluding WFH/Remote): ${onLeave.length}`);
    onLeave.forEach(l => {
        console.log(`  - ${l.FirstName} ${l.LastName}: ${l.type_name || l.leave_type}`);
    });

    await c.end();
}

checkLeaveData().catch(console.error);
