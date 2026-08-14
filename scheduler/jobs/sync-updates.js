const http = require('http');
const { db } = require('../../config/database');

function postJSON(url, headers, bodyObj) {
    return new Promise((resolve, reject) => {
        const bodyStr = JSON.stringify(bodyObj);
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || 80,
            path: parsedUrl.pathname,
            method: 'POST',
            headers: {
                ...headers,
                'Content-Length': Buffer.byteLength(bodyStr)
            }
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        req.write(bodyStr);
        req.end();
    });
}

async function syncUpdates() {
    try {
        const [countRows] = await db.query("SELECT COUNT(*) as count FROM timesheets where status = 'verified'");
        const total = countRows[0].count;
        const limit = 100;
        for (let offset = 0; offset < total; offset += limit) {
            const [rows] = await db.query("SELECT * FROM timesheets where status = 'verified' ORDER BY id LIMIT ? OFFSET ?", [limit, offset]);
            const cleanedRows = rows.map(({ 
                week_start_date, week_end_date, 
                rejection_reason, rejected_by, rejected_at, 
                approved_by, approved_at, 
                ...rest 
            }) => rest);
            const payload = {
                body: {
                    ruby: cleanedRows
                },
                metadata: {
                    tableName: "timesheets",
                    totalRecords: total,
                    offset: offset,
                    limit: limit,
                    batchSize: cleanedRows.length,
                    syncedAt: new Date().toISOString()
                }
            };
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await postJSON('http://127.0.0.1:7860/api/v2/add-updates', headers, payload);
            console.log("Response: ", response);
        }
    } catch (err) {
        console.error(err);
    }
}

async function getPendingUpdates() {
    try {
        const [countRows] = await db.query("SELECT COUNT(*) as count FROM timesheets where status = 'submitted'");
        const total = countRows[0].count;
        const limit = 100;
        const responses = [];
        for (let offset = 0; offset < total; offset += limit) {
            const [rows] = await db.query("SELECT * FROM timesheets where status = 'submitted' ORDER BY id LIMIT ? OFFSET ?", [limit, offset]);
            const cleanedRows = rows.map(({ 
                week_start_date, week_end_date, 
                rejection_reason, rejected_by, rejected_at, 
                approved_by, approved_at, 
                ...rest 
            }) => rest);
            const payload = {
                body: {
                    ruby: cleanedRows
                },
                metadata: {
                    tableName: "pending_timesheets",
                    totalRecords: total,
                    offset: offset,
                    limit: limit,
                    batchSize: cleanedRows.length,
                    syncedAt: new Date().toISOString()
                }
            };
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await postJSON('http://127.0.0.1:7860/api/v2/add-updates', headers, payload);
            console.log("Response: ", response);
            responses.push(response);
        }
        return responses;
    } catch (err) {
        console.error(err);
        return [];
    }
}

module.exports = {
    syncUpdates,
    getPendingUpdates
};

