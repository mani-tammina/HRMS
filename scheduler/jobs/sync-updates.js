const http = require("http");
const https = require("https");
const { db } = require("../../config/database");
const axios = require("axios");

let runtimeAiUrl = null;

async function aiApiUrl() {
  const maxRetries = 10;
  const retryDelay = 2000;

  const config = {
    method: "get",
    url: "https://br-shy-river-b47f4p0n-relay.compute.c-6.us-east-2.aws.neon.tech/",
    timeout: 10000,
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.request(config);

      if (response.data.target_health_status === 200 && response.data.url) {
        runtimeAiUrl = response.data.url.replace(/\/+$/, "");
        return runtimeAiUrl;
      }

      console.log(`AI service not ready. Attempt ${attempt}/${maxRetries}`);
    } catch (error) {
      console.error(`AI health check failed: ${error.message}`);
    }

    if (attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  throw new Error("AI service did not become healthy after maximum retries");
}

async function getAiUrl(forceRefresh = false) {
  if (forceRefresh || !runtimeAiUrl) {
    return await aiApiUrl();
  }

  return runtimeAiUrl;
}

function postJSON(url, headers, bodyObj) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(bodyObj);
    const parsedUrl = new URL(url);
    const transport = parsedUrl.protocol === "https:" ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
      path: `${parsedUrl.pathname}${parsedUrl.search}`,
      method: "POST",
      headers: {
        ...headers,
        "Content-Length": Buffer.byteLength(bodyStr),
      },
      timeout: 30000,
    };

    const req = transport.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        };

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(response);
        } else {
          const error = new Error(`HTTP ${res.statusCode}: ${data}`);
          error.statusCode = res.statusCode;
          reject(error);
        }
      });
    });

    req.on("timeout", () => {
      req.destroy(new Error("AI API request timed out"));
    });

    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

async function postWithRefresh(path, headers, payload) {
  let url = await getAiUrl();

  try {
    return await postJSON(`${url}${path}`, headers, payload);
  } catch (error) {
    console.error(`AI API request failed. Refreshing URL: ${error.message}`);

    runtimeAiUrl = null;
    url = await getAiUrl(true);

    return await postJSON(`${url}${path}`, headers, payload);
  }
}

function cleanRows(rows) {
  return rows.map(
    ({
      week_start_date,
      week_end_date,
      rejection_reason,
      rejected_by,
      rejected_at,
      approved_by,
      approved_at,
      ...rest
    }) => rest,
  );
}

async function syncUpdates() {
  try {
    const [countRows] = await db.query(
      "SELECT COUNT(*) as count FROM timesheets WHERE status = 'verified'",
    );

    const total = Number(countRows[0].count);
    const limit = 100;

    for (let offset = 0; offset < total; offset += limit) {
      const [rows] = await db.query(
        "SELECT * FROM timesheets WHERE status = 'verified' ORDER BY id LIMIT ? OFFSET ?",
        [limit, offset],
      );

      const cleanedRows = cleanRows(rows);

      const payload = {
        body: {
          ruby: cleanedRows,
        },
        metadata: {
          tableName: "timesheets",
          totalRecords: total,
          offset,
          limit,
          batchSize: cleanedRows.length,
          syncedAt: new Date().toISOString(),
        },
      };

      const response = await postWithRefresh(
        "/api/v2/add-updates",
        {
          "Content-Type": "application/json",
        },
        payload,
      );

      console.log("Response:", response);
    }
  } catch (err) {
    console.error("Sync updates failed:", err);
  }
}

async function getPendingUpdates() {
  try {
    const [countRows] = await db.query(
      "SELECT COUNT(*) as count FROM timesheets WHERE status = 'submitted'",
    );

    const total = Number(countRows[0].count);
    const limit = 100;
    const responses = [];

    for (let offset = 0; offset < total; offset += limit) {
      const [rows] = await db.query(
        "SELECT * FROM timesheets WHERE status = 'submitted' ORDER BY id LIMIT ? OFFSET ?",
        [limit, offset],
      );

      const cleanedRows = cleanRows(rows);

      const payload = {
        body: {
          ruby: cleanedRows,
        },
        metadata: {
          tableName: "pending_timesheets",
          totalRecords: total,
          offset,
          limit,
          batchSize: cleanedRows.length,
          syncedAt: new Date().toISOString(),
        },
      };

      const response = await postWithRefresh(
        "/api/v2/add-updates",
        {
          "Content-Type": "application/json",
        },
        payload,
      );

      console.log("Response:", response);
      responses.push(response);
    }

    return responses;
  } catch (err) {
    console.error("Get pending updates failed:", err);
    return [];
  }
}

module.exports = {
  syncUpdates,
  getPendingUpdates,
};
