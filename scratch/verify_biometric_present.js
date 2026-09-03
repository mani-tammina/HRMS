const { db } = require('../config/database');

async function test() {
  const c = await db();
  const today = '2026-09-03';
  console.log('Verifying for date:', today);

  // 1. Test employee with biometric punches (e.g., employee 539 or 896 or 25)
  const [emp25] = await c.query(
    `SELECT e.id, e.FirstName, e.LastName,
            COALESCE(
              (SELECT CASE 
                        WHEN combined.punch_type = 'in' THEN 'In'
                        WHEN combined.punch_type = 'out' THEN 'Out'
                        ELSE 'In'
                      END
               FROM (
                 SELECT punch_type, punch_time
                 FROM attendance_punches
                 WHERE employee_id = e.id AND punch_date = ?
                 UNION ALL
                 SELECT CASE WHEN direction = 'out' THEN 'out' ELSE 'in' END as punch_type, punch_time
                 FROM biometric_punches
                 WHERE employee_id = e.id AND punch_date = ?
               ) combined
               ORDER BY combined.punch_time DESC
               LIMIT 1),
              (SELECT 'On Leave'
               FROM leaves lv
               WHERE lv.employee_id = e.id AND lv.status = 'approved' AND ? BETWEEN lv.start_date AND lv.end_date
               LIMIT 1),
              'Not In Yet'
            ) AS attendance_status,
            COALESCE(
              (SELECT att.work_mode 
               FROM attendance att 
               WHERE att.employee_id = e.id AND att.attendance_date = ? 
               LIMIT 1),
              (SELECT 'Biometric'
               FROM biometric_punches bp
               WHERE bp.employee_id = e.id AND bp.punch_date = ?
               LIMIT 1),
              'N/A'
            ) AS work_mode
     FROM employees e
     WHERE e.id IN (20, 25, 211, 539, 896)`,
    [today, today, today, today, today]
  );

  console.log('\n--- Employee Status Results for Biometric Users ---');
  console.table(emp25);

  // 2. Test bulk-status query logic
  const employee_ids = [20, 25, 211, 539, 896];
  const placeholders = employee_ids.map(() => "?").join(",");
  const [latestPunches] = await c.query(
    `SELECT p.employee_id, p.punch_type, p.punch_time, p.work_mode, p.location, p.notes
     FROM (
         SELECT employee_id, punch_type, punch_time, 'Office' as work_mode, location, notes
         FROM attendance_punches
         WHERE employee_id IN (${placeholders}) AND punch_date = ?
         UNION ALL
         SELECT employee_id, 
                CASE WHEN direction = 'out' THEN 'out' ELSE 'in' END as punch_type, 
                punch_time, 
                'Biometric' as work_mode, 
                CONCAT('Biometric Device (', COALESCE(device_id, 'Reader'), ')') as location, 
                'Biometric Punch' as notes
         FROM biometric_punches
         WHERE employee_id IN (${placeholders}) AND punch_date = ?
     ) p
     INNER JOIN (
         SELECT employee_id, MAX(ptime) as max_time
         FROM (
             SELECT employee_id, punch_time as ptime FROM attendance_punches WHERE employee_id IN (${placeholders}) AND punch_date = ?
             UNION ALL
             SELECT employee_id, punch_time as ptime FROM biometric_punches WHERE employee_id IN (${placeholders}) AND punch_date = ?
         ) combined
         GROUP BY employee_id
     ) latest ON p.employee_id = latest.employee_id AND p.punch_time = latest.max_time`,
    [...employee_ids, today, ...employee_ids, today, ...employee_ids, today, ...employee_ids, today]
  );

  console.log('\n--- Bulk Status Latest Punches ---');
  console.table(latestPunches);

  c.end();
  console.log('\n✅ Verification script completed successfully!');
}

test().catch(console.error);
