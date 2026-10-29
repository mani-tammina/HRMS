const { db } = require('../config/database');

async function testTeamStatus() {
    const c = await db();
    const today = new Date().toISOString().split('T')[0];
    console.log('Today date:', today);

    // Let's test for a sample employee (e.g. Bhavishath, id: 53)
    const [empRows] = await c.query("SELECT id, FirstName, LastName, reporting_manager_id, DepartmentId FROM employees WHERE id = 53");
    const currentEmp = empRows[0];
    console.log('Current emp:', currentEmp);

    let teamMemberIds = [];
    const [reportees] = await c.query(
        "SELECT id, FirstName, LastName FROM employees WHERE reporting_manager_id = ? AND EmploymentStatus = 'Working'",
        [currentEmp.id]
    );

    if (reportees && reportees.length > 0) {
        teamMemberIds = reportees.map(r => r.id);
        console.log('Direct reportees count:', reportees.length);
    } else if (currentEmp.reporting_manager_id) {
        const [coTeam] = await c.query(
            "SELECT id, FirstName, LastName FROM employees WHERE reporting_manager_id = ? AND id != ? AND EmploymentStatus = 'Working'",
            [currentEmp.reporting_manager_id, currentEmp.id]
        );
        if (coTeam && coTeam.length > 0) {
            teamMemberIds = coTeam.map(r => r.id);
            console.log('Co-team count:', coTeam.length, coTeam.map(e => e.FirstName));
        }
    }

    if (teamMemberIds.length === 0 && currentEmp.DepartmentId) {
        const [deptTeam] = await c.query(
            "SELECT id, FirstName, LastName FROM employees WHERE DepartmentId = ? AND id != ? AND EmploymentStatus = 'Working'",
            [currentEmp.DepartmentId, currentEmp.id]
        );
        if (deptTeam && deptTeam.length > 0) {
            teamMemberIds = deptTeam.map(r => r.id);
            console.log('Dept team count:', deptTeam.length);
        }
    }

    console.log('Final team member IDs:', teamMemberIds);

    const [onLeave] = await c.query(`
        SELECT DISTINCT
            e.id as employee_id, e.FirstName, e.LastName, d.name as department_name, lt.type_name as leave_type
        FROM leaves l
        INNER JOIN employees e ON l.employee_id = e.id
        LEFT JOIN departments d ON e.DepartmentId = d.id
        LEFT JOIN designations des ON e.DesignationId = des.id
        LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
        WHERE l.status = 'approved'
          AND l.start_date <= ?
          AND l.end_date >= ?
          AND e.EmploymentStatus = 'Working'
          AND e.id IN (?)
    `, [today, today, teamMemberIds]);

    console.log('Team on leave today:', onLeave);

    const [wfhToday] = await c.query(`
        SELECT DISTINCT e.id as employee_id, e.FirstName, e.LastName
        FROM employees e
        WHERE e.EmploymentStatus = 'Working'
          AND e.id IN (?)
          AND (
            EXISTS (
              SELECT 1 FROM attendance a
              WHERE a.employee_id = e.id AND a.attendance_date = ? AND a.work_mode = 'WFH'
            )
            OR EXISTS (
              SELECT 1 FROM leaves l
              WHERE l.employee_id = e.id AND l.status = 'approved'
                AND l.leave_type = 'WFH' AND l.start_date <= ? AND l.end_date >= ?
            )
          )
    `, [teamMemberIds, today, today, today]);

    console.log('Team WFH today:', wfhToday);

    const [remoteToday] = await c.query(`
        SELECT DISTINCT e.id as employee_id, e.FirstName, e.LastName
        FROM employees e
        WHERE e.EmploymentStatus = 'Working'
          AND e.id IN (?)
          AND (
            EXISTS (
              SELECT 1 FROM attendance a
              WHERE a.employee_id = e.id AND a.attendance_date = ? AND a.work_mode = 'Remote'
            )
            OR EXISTS (
              SELECT 1 FROM leaves l
              WHERE l.employee_id = e.id AND l.status = 'approved'
                AND l.leave_type = 'Remote' AND l.start_date <= ? AND l.end_date >= ?
            )
          )
    `, [teamMemberIds, today, today, today]);

    console.log('Team Remote today:', remoteToday);

    await c.end();
}

testTeamStatus().catch(console.error);
