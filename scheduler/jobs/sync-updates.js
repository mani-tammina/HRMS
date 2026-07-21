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
    console.log("Sync started");
    try {
        const [countRows] = await db.query("SELECT COUNT(*) as count FROM timesheets where status = 'verified'");
        const total = countRows[0].count;
        const limit = 100;
        for (let offset = 0; offset < total; offset += limit) {
            const [rows] = await db.query("SELECT * FROM timesheets where status = 'verified' ORDER BY id LIMIT ? OFFSET ?", [limit, offset]);
            const payload = {
                body: {
                    ruby: rows
                },
                metadata: {
                    tableName: "timesheets",
                    totalRecords: total,
                    offset: offset,
                    limit: limit,
                    batchSize: rows.length,
                    syncedAt: new Date().toISOString()
                }
            };
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await postJSON('http://127.0.0.1:7860/api/v2/add-updates', headers, payload);
            console.log(`Sent batch offset ${offset}, status: ${response.statusCode}`);
            console.log(JSON.parse(response.body))
        }
        console.log("Sync completed");
    } catch (err) {
        console.error(err);
    }
}

module.exports = syncUpdates;

