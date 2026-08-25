const { db } = require('../config/database');

async function testFinalEndpoint() {
    const c = await db();
    const today = new Date().toISOString().split('T')[0];
    console.log('Today:', today);

    // Let's simulate employee 566
    const [empRows] = await c.query("SELECT * FROM employees WHERE id = 566");
    const currentEmp = empRows[0];
    console.log('Simulating for logged in employee 566:', currentEmp.FirstName, currentEmp.LastName);

    let teamMemberIds = [currentEmp.id];
    const [reportees] = await c.query(
        "SELECT id FROM employees WHERE reporting_manager_id = ? AND EmploymentStatus = 'Working'",
        [currentEmp.id]
    );

    if (reportees && reportees.length > 0) {
        teamMemberIds = [...teamMemberIds, ...reportees.map(r => r.id)];
    } else if (currentEmp.reporting_manager_id) {
        const [coTeam] = await c.query(
            "SELECT id FROM employees WHERE reporting_manager_id = ? AND EmploymentStatus = 'Working'",
            [currentEmp.reporting_manager_id]
        );
        if (coTeam && coTeam.length > 0) {
            teamMemberIds = [...new Set([...teamMemberIds, ...coTeam.map(r => r.id)])];
        }
    }

    if (teamMemberIds.length <= 1 && currentEmp.DepartmentId) {
        const [deptTeam] = await c.query(
            "SELECT id FROM employees WHERE DepartmentId = ? AND EmploymentStatus = 'Working'",
            [currentEmp.DepartmentId]
        );
        if (deptTeam && deptTeam.length > 0) {
            teamMemberIds = [...new Set([...teamMemberIds, ...deptTeam.map(r => r.id)])];
        }
    }

    console.log('Resolved team member IDs:', teamMemberIds);

    const [onLeave] = await c.query(`
        SELECT DISTINCT
            e.id as employee_id,
            e.FirstName,
            e.LastName,
            e.profile_image,
            d.name as department_name,
            des.name as designation_name,
            lt.type_name as leave_type
        FROM leaves l
        INNER JOIN employees e ON l.employee_id = e.id
        LEFT JOIN departments d ON e.DepartmentId = d.id
        LEFT JOIN designations des ON e.DesignationId = des.id
        LEFT JOIN leave_types lt ON l.leave_type_id = lt.id
        WHERE l.status = 'approved'
          AND DATE(l.start_date) <= ?
          AND DATE(l.end_date) >= ?
          AND e.EmploymentStatus = 'Working'
          AND e.id IN (?)
          AND (l.leave_type IS NULL OR l.leave_type NOT IN ('WFH', 'Remote', 'wfh', 'remote'))
        ORDER BY e.FirstName, e.LastName
    `, [today, today, teamMemberIds]);

    const [wfhToday] = await c.query(`
        SELECT DISTINCT e.id as employee_id, e.FirstName, e.LastName,
               e.profile_image, d.name as department_name, des.name as designation_name
        FROM employees e
        LEFT JOIN departments d ON e.DepartmentId = d.id
        LEFT JOIN designations des ON e.DesignationId = des.id
        WHERE e.EmploymentStatus = 'Working'
          AND e.id IN (?)
          AND (
            EXISTS (
              SELECT 1 FROM attendance a
              WHERE a.employee_id = e.id 
                AND (DATE(a.attendance_date) = ? OR DATE(a.punch_date) = ? OR a.attendance_date LIKE CONCAT(?, '%'))
                AND (LOWER(a.work_mode) = 'wfh' OR a.work_mode LIKE '%WFH%' OR a.location LIKE '%WFH%')
            )
            OR EXISTS (
              SELECT 1 FROM leaves l
              WHERE l.employee_id = e.id 
                AND l.status IN ('approved', 'pending')
                AND (LOWER(l.leave_type) = 'wfh' OR l.leave_type LIKE '%WFH%')
                AND DATE(l.start_date) <= ? AND DATE(l.end_date) >= ?
            )
          )
        ORDER BY e.FirstName, e.LastName
    `, [teamMemberIds, today, today, today, today, today]);

    const [remoteToday] = await c.query(`
        SELECT DISTINCT e.id as employee_id, e.FirstName, e.LastName,
               e.profile_image, d.name as department_name, des.name as designation_name
        FROM employees e
        LEFT JOIN departments d ON e.DepartmentId = d.id
        LEFT JOIN designations des ON e.DesignationId = des.id
        WHERE e.EmploymentStatus = 'Working'
          AND e.id IN (?)
          AND (
            EXISTS (
              SELECT 1 FROM attendance a
              WHERE a.employee_id = e.id 
                AND (DATE(a.attendance_date) = ? OR DATE(a.punch_date) = ? OR a.attendance_date LIKE CONCAT(?, '%'))
                AND (LOWER(a.work_mode) = 'remote' OR a.work_mode LIKE '%Remote%' OR a.location LIKE '%Remote%')
            )
            OR EXISTS (
              SELECT 1 FROM leaves l
              WHERE l.employee_id = e.id 
                AND l.status IN ('approved', 'pending')
                AND (LOWER(l.leave_type) = 'remote' OR l.leave_type LIKE '%Remote%')
                AND DATE(l.start_date) <= ? AND DATE(l.end_date) >= ?
            )
          )
        ORDER BY e.FirstName, e.LastName
    `, [teamMemberIds, today, today, today, today, today]);

    console.log('Result payload:');
    console.log('ON LEAVE:', onLeave.length, onLeave.map(e => e.FirstName));
    console.log('WFH:', wfhToday.length, wfhToday.map(e => e.FirstName));
    console.log('REMOTE:', remoteToday.length, remoteToday.map(e => e.FirstName));

    await c.end();
}

testFinalEndpoint().catch(console.error);
