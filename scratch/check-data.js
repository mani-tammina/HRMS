require('dotenv').config();
const { db } = require("../config/database");

async function check() {
    let connection;
    try {
        connection = await db();
        
        console.log("--- managers employee records ---");
        const [empRows] = await connection.query(`
            SELECT id, EmployeeNumber, FirstName, LastName, WorkEmail, weekly_off_policy_id, shift_policy_id
            FROM employees 
            WHERE WorkEmail IN ('kvsastry@tammina.com', 'chandrasekhar.mula@tammina.com')
        `);
        console.log(JSON.stringify(empRows, null, 2));

    } catch (err) {
        console.error("Error:", err);
    } finally {
        if (connection) {
            await connection.end();
        }
        process.exit(0);
    }
}

check();
