const mysql = require("mysql2/promise");

const DB = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "hrms_db_new",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let __pool = null;

function getPool() {
    if (!__pool) __pool = mysql.createPool(DB);
    return __pool;
}

async function db() {
    const pool = getPool();
    const conn = await pool.getConnection();
    // If this is a pooled connection, make c.end() behave like release()
    try {
        if (conn && typeof conn.release === 'function') {
            conn.end = async () => {
                try { conn.release(); } catch (e) { /* ignore */ }
            };
        }
    } catch (e) { }
    return conn;
}

// Export pool methods for direct query access
db.query = async (...args) => {
    const pool = getPool();
    return pool.query(...args);
};

db.getConnection = async () => {
    const pool = getPool();
    return pool.getConnection();
};

module.exports = { DB, db };
