const { db } = require('../config/database');
async function test() {
  const [tables] = await db.query('SHOW TABLES');
  const tKey = Object.keys(tables[0])[0];
  for (const t of tables) {
    const tableName = t[tKey];
    try {
      const [cols] = await db.query('DESCRIBE `' + tableName + '`');
      const colNames = cols.map(c => '`' + c.Field + '`').join(', ');
      const [rows] = await db.query(`SELECT * FROM \`${tableName}\` WHERE CONCAT_WS(' ', ${colNames}) LIKE '%09:02:12%' LIMIT 5`);
      if (rows.length > 0) {
        console.log('Found in table:', tableName, rows);
      }
    } catch (e) {
      // ignore
    }
  }
  process.exit(0);
}
test();
