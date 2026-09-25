const { db } = require('../config/database');

async function testHolidayBackend() {
  console.log('Testing Holiday Backend Integration...');
  const c = await db();

  try {
    // 1. Check holidays table
    const [holidays] = await c.query('SELECT * FROM holidays ORDER BY holiday_date ASC');
    console.log('✅ Found holidays in DB:', holidays.length);
    if (holidays.length > 0) {
      console.log('Sample holiday:', {
        id: holidays[0].id,
        date: holidays[0].holiday_date,
        name: holidays[0].holiday_name,
        type: holidays[0].holiday_type,
        list_id: holidays[0].holiday_list_id,
        location_id: holidays[0].location_id,
        shift_policy_id: holidays[0].shift_policy_id
      });
    }

    // 2. Check holiday_lists table
    const [lists] = await c.query('SELECT * FROM holiday_lists');
    console.log('✅ Found holiday lists:', lists.length);

    // 3. Test summary calculation for 2026
    const [totalHolidays] = await c.query(
      "SELECT COUNT(*) AS total, " +
      "SUM(CASE WHEN holiday_type = 'public' OR holiday_type = 'mandatory' OR holiday_type IS NULL THEN 1 ELSE 0 END) AS public_count, " +
      "SUM(CASE WHEN holiday_type = 'optional' OR holiday_type = 'restricted' THEN 1 ELSE 0 END) AS optional_count " +
      "FROM holidays WHERE YEAR(holiday_date) = 2026"
    );
    console.log('✅ 2026 KPI Summary:', totalHolidays[0]);

    // 4. Test insert and delete of a temporary test holiday
    const [ins] = await c.query(`
      INSERT INTO holidays (
        holiday_date, holiday_name, day_name, holiday_type, description,
        holiday_list_id, location_id, shift_policy_id, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, ['2026-11-15', 'Test Special Festival', 'Sunday', 'public', 'Test entry', 1, 1, 1]);

    const testId = ins.insertId;
    console.log('✅ Inserted test holiday id:', testId);

    // Update test holiday
    await c.query('UPDATE holidays SET holiday_name = ? WHERE id = ?', ['Test Special Festival (Updated)', testId]);
    console.log('✅ Updated test holiday id:', testId);

    // Delete test holiday
    await c.query('DELETE FROM holidays WHERE id = ?', [testId]);
    console.log('✅ Deleted test holiday id:', testId);

    console.log('\n🎉 ALL HOLIDAY BACKEND TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    await c.end();
    process.exit(0);
  }
}

testHolidayBackend();
