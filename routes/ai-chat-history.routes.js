const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { db } = require("../config/database");
const { authMiddleware } = require("../middleware/auth");
require("dotenv").config();

router.use(express.json({ limit: "2mb" }));
router.use(express.urlencoded({ extended: true, limit: "2mb" }));

const ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;
const MAX_TITLE_LENGTH = 120;
const AUTO_TITLE_PREVIEW_LENGTH = 36;
const MAX_MESSAGES_PER_REQUEST = 50;

let tablesReadyPromise = null;

/**
 * Ensure chat history tables exist in MySQL.
 * Safe to call repeatedly; memoized after first successful verification.
 */
async function ensureChatHistoryTables() {
  if (!tablesReadyPromise) {
    tablesReadyPromise = (async () => {
      await db.query(`
        CREATE TABLE IF NOT EXISTS ai_chat_sessions (
          id VARCHAR(64) PRIMARY KEY,
          user_id INT NOT NULL,
          title VARCHAR(120) NOT NULL DEFAULT 'New Chat',
          is_custom_title TINYINT(1) NOT NULL DEFAULT 0,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          CONSTRAINT fk_ai_chat_sessions_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          INDEX idx_ai_chat_sessions_user_updated (user_id, updated_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);

      await db.query(`
        CREATE TABLE IF NOT EXISTS ai_chat_messages (
          id VARCHAR(64) PRIMARY KEY,
          session_id VARCHAR(64) NOT NULL,
          user_id INT NOT NULL,
          sender ENUM('user', 'bot') NOT NULL,
          text LONGTEXT NOT NULL,
          openui_response LONGTEXT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          seq BIGINT NOT NULL AUTO_INCREMENT,
          UNIQUE KEY uq_ai_chat_messages_seq (seq),
          CONSTRAINT fk_ai_chat_messages_session
            FOREIGN KEY (session_id) REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
          CONSTRAINT fk_ai_chat_messages_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          INDEX idx_ai_chat_messages_session_user_seq (session_id, user_id, seq),
          INDEX idx_ai_chat_messages_user (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
    })().catch((err) => {
      tablesReadyPromise = null;
      throw err;
    });
  }
  return tablesReadyPromise;
}

/**
 * Strictly resolve authenticated user ID from verified JWT only.
 * Never trusts client-supplied user IDs from body, query, or params.
 */
function getAuthenticatedUserId(req) {
  const numericId = Number(req?.user?.id);
  if (!Number.isSafeInteger(numericId) || numericId <= 0) {
    return null;
  }
  return numericId;
}

function sanitizeId(raw) {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!ID_PATTERN.test(trimmed)) return null;
  return trimmed;
}

function sanitizeTitle(raw, fallback = "New Chat") {
  if (typeof raw !== "string") return fallback;
  const cleaned = raw.replace(/\s+/g, " ").trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, MAX_TITLE_LENGTH);
}

function buildAutoTitle(text) {
  const cleaned = String(text || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "New Chat";
  if (cleaned.length > AUTO_TITLE_PREVIEW_LENGTH) {
    return `${cleaned.slice(0, AUTO_TITLE_PREVIEW_LENGTH).trim()}...`;
  }
  return cleaned;
}

function isDefaultTitle(title) {
  const normalized = String(title || "").trim().toLowerCase();
  return !normalized || normalized === "new chat" || normalized === "current conversation";
}

function formatMySqlDateTimeToIso(value) {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  const str = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(str)) {
    const parsed = new Date(`${str.replace(" ", "T")}+05:30`);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }
  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function formatSessionRow(row, messages = undefined) {
  const session = {
    id: row.id,
    title: row.title,
    isCustomTitle: Boolean(row.is_custom_title),
    createdAt: formatMySqlDateTimeToIso(row.created_at),
    updatedAt: formatMySqlDateTimeToIso(row.updated_at),
  };
  if (row.message_count !== undefined) {
    session.messageCount = Number(row.message_count) || 0;
  }
  if (messages !== undefined) {
    session.messages = messages;
  }
  return session;
}

function formatMessageRow(row) {
  const message = {
    id: row.id,
    sessionId: row.session_id,
    sender: row.sender,
    text: row.text,
    timestamp: formatMySqlDateTimeToIso(row.created_at),
  };
  if (typeof row.openui_response === "string" && row.openui_response.length > 0) {
    message.openuiResponse = row.openui_response;
  }
  return message;
}

function normalizeMessageInput(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("Each message must be an object");
  }
  const sender = typeof raw.sender === "string" ? raw.sender.trim().toLowerCase() : "";
  if (sender !== "user" && sender !== "bot") {
    throw new Error("Message sender must be 'user' or 'bot'");
  }
  const text = typeof raw.text === "string" ? raw.text : "";
  const openuiRaw =
    typeof raw.openuiResponse === "string"
      ? raw.openuiResponse
      : typeof raw.openui_response === "string"
      ? raw.openui_response
      : null;
  const openuiResponse = openuiRaw && openuiRaw.length > 0 ? openuiRaw : null;

  if (!text.trim() && !openuiResponse) {
    throw new Error("Message text or openuiResponse is required");
  }

  return {
    id: crypto.randomUUID(),
    sender,
    text: text || openuiResponse || "",
    openuiResponse,
  };
}

// Guard middleware scoped strictly to /chat-history endpoints
router.use("/chat-history", authMiddleware, async (req, res, next) => {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    await ensureChatHistoryTables();
    req.chatUserId = userId;
    return next();
  } catch (err) {
    console.error("[AI Chat History] Middleware error:", err);
    return res.status(500).json({ success: false, error: "Failed to initialize chat history" });
  }
});

/* ========================================================================= */
/* SESSION CRUD (Strictly Isolated Per Authenticated User)                   */
/* ========================================================================= */

/**
 * GET /chat-history/sessions
 * List all chat sessions belonging exclusively to the authenticated user.
 */
router.get("/chat-history/sessions", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const includeMessages =
      String(req.query?.includeMessages || "").toLowerCase() === "true";
    const search =
      typeof req.query?.search === "string" ? req.query.search.trim() : "";

    let sql = `
      SELECT
        s.id,
        s.title,
        s.is_custom_title,
        s.created_at,
        s.updated_at,
        COUNT(m.id) AS message_count
      FROM ai_chat_sessions s
      LEFT JOIN ai_chat_messages m
        ON m.session_id = s.id AND m.user_id = s.user_id
      WHERE s.user_id = ?
    `;
    const params = [userId];

    if (search) {
      sql += " AND LOWER(s.title) LIKE LOWER(?)";
      params.push(`%${search}%`);
    }

    sql += `
      GROUP BY s.id, s.title, s.is_custom_title, s.created_at, s.updated_at
      ORDER BY s.updated_at DESC, s.created_at DESC, s.id DESC
    `;

    const [sessionRows] = await db.query(sql, params);

    if (!includeMessages || sessionRows.length === 0) {
      return res.json({
        success: true,
        data: sessionRows.map((row) => formatSessionRow(row)),
      });
    }

    const sessionIds = sessionRows.map((row) => row.id);
    const placeholders = sessionIds.map(() => "?").join(", ");
    const [messageRows] = await db.query(
      `SELECT id, session_id, sender, text, openui_response, created_at
       FROM ai_chat_messages
       WHERE user_id = ? AND session_id IN (${placeholders})
       ORDER BY seq ASC`,
      [userId, ...sessionIds],
    );

    const messagesBySession = new Map();
    for (const row of messageRows) {
      const list = messagesBySession.get(row.session_id) || [];
      list.push(formatMessageRow(row));
      messagesBySession.set(row.session_id, list);
    }

    return res.json({
      success: true,
      data: sessionRows.map((row) =>
        formatSessionRow(row, messagesBySession.get(row.id) || []),
      ),
    });
  } catch (err) {
    console.error("[AI Chat History] GET /sessions error:", err);
    return res.status(500).json({ success: false, error: "Failed to load chat history" });
  }
});

/**
 * POST /chat-history/sessions
 * Create a new chat session (and optional initial messages) for the authenticated user.
 */
router.post("/chat-history/sessions", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];

    if (rawMessages.length > MAX_MESSAGES_PER_REQUEST) {
      return res.status(400).json({
        success: false,
        error: `Cannot create more than ${MAX_MESSAGES_PER_REQUEST} messages in one request`,
      });
    }

    let normalizedMessages = [];
    try {
      normalizedMessages = rawMessages.map((m) => normalizeMessageInput(m));
    } catch (validationErr) {
      return res.status(400).json({ success: false, error: validationErr.message });
    }

    const isCustomTitle = Boolean(body.isCustomTitle);
    let title = sanitizeTitle(body.title, "New Chat");
    if (!isCustomTitle && isDefaultTitle(title)) {
      const firstUserMsg = normalizedMessages.find((m) => m.sender === "user");
      if (firstUserMsg) {
        title = buildAutoTitle(firstUserMsg.text);
      }
    }

    const sessionId = crypto.randomUUID();

    const createdSession = await db.transaction(async (conn) => {
      await conn.query(
        `INSERT INTO ai_chat_sessions (id, user_id, title, is_custom_title)
         VALUES (?, ?, ?, ?)`,
        [sessionId, userId, title, isCustomTitle ? 1 : 0],
      );

      for (const msg of normalizedMessages) {
        await conn.query(
          `INSERT INTO ai_chat_messages (id, session_id, user_id, sender, text, openui_response)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [msg.id, sessionId, userId, msg.sender, msg.text, msg.openuiResponse],
        );
      }

      const [sessions] = await conn.query(
        `SELECT id, title, is_custom_title, created_at, updated_at
         FROM ai_chat_sessions
         WHERE id = ? AND user_id = ?
         LIMIT 1`,
        [sessionId, userId],
      );

      const [messages] = await conn.query(
        `SELECT id, session_id, sender, text, openui_response, created_at
         FROM ai_chat_messages
         WHERE session_id = ? AND user_id = ?
         ORDER BY seq ASC`,
        [sessionId, userId],
      );

      const formattedMessages = messages.map(formatMessageRow);
      return formatSessionRow(
        { ...sessions[0], message_count: formattedMessages.length },
        formattedMessages,
      );
    });

    return res.status(201).json({ success: true, data: createdSession });
  } catch (err) {
    console.error("[AI Chat History] POST /sessions error:", err);
    return res.status(500).json({ success: false, error: "Failed to create chat session" });
  }
});

/**
 * GET /chat-history/sessions/:sessionId
 * Read a single chat session and all its messages (strictly owned by authenticated user).
 */
router.get("/chat-history/sessions/:sessionId", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const sessionId = sanitizeId(req.params.sessionId);
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Invalid session ID" });
    }

    const [sessions] = await db.query(
      `SELECT id, title, is_custom_title, created_at, updated_at
       FROM ai_chat_sessions
       WHERE id = ? AND user_id = ?
       LIMIT 1`,
      [sessionId, userId],
    );

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ success: false, error: "Chat session not found" });
    }

    const [messages] = await db.query(
      `SELECT id, session_id, sender, text, openui_response, created_at
       FROM ai_chat_messages
       WHERE session_id = ? AND user_id = ?
       ORDER BY seq ASC`,
      [sessionId, userId],
    );

    const formattedMessages = messages.map(formatMessageRow);
    return res.json({
      success: true,
      data: formatSessionRow(
        { ...sessions[0], message_count: formattedMessages.length },
        formattedMessages,
      ),
    });
  } catch (err) {
    console.error("[AI Chat History] GET /sessions/:sessionId error:", err);
    return res.status(500).json({ success: false, error: "Failed to load chat session" });
  }
});

/**
 * PUT / PATCH /chat-history/sessions/:sessionId
 * Update a chat session's title/metadata (strictly owned by authenticated user).
 */
async function handleUpdateSession(req, res) {
  try {
    const userId = req.chatUserId;
    const sessionId = sanitizeId(req.params.sessionId);
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Invalid session ID" });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    if (typeof body.title !== "string" || !body.title.trim()) {
      return res.status(400).json({ success: false, error: "Session title is required" });
    }

    const title = sanitizeTitle(body.title, "");
    const isCustomTitle =
      body.isCustomTitle === undefined ? 1 : body.isCustomTitle ? 1 : 0;

    const [result] = await db.query(
      `UPDATE ai_chat_sessions
       SET title = ?, is_custom_title = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
      [title, isCustomTitle, sessionId, userId],
    );

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Chat session not found" });
    }

    const [sessions] = await db.query(
      `SELECT
         s.id,
         s.title,
         s.is_custom_title,
         s.created_at,
         s.updated_at,
         COUNT(m.id) AS message_count
       FROM ai_chat_sessions s
       LEFT JOIN ai_chat_messages m
         ON m.session_id = s.id AND m.user_id = s.user_id
       WHERE s.id = ? AND s.user_id = ?
       GROUP BY s.id, s.title, s.is_custom_title, s.created_at, s.updated_at
       LIMIT 1`,
      [sessionId, userId],
    );

    return res.json({ success: true, data: formatSessionRow(sessions[0]) });
  } catch (err) {
    console.error("[AI Chat History] UPDATE /sessions/:sessionId error:", err);
    return res.status(500).json({ success: false, error: "Failed to update chat session" });
  }
}

router.put("/chat-history/sessions/:sessionId", handleUpdateSession);
router.patch("/chat-history/sessions/:sessionId", handleUpdateSession);

/**
 * DELETE /chat-history/sessions/:sessionId
 * Delete a single chat session and its messages (strictly owned by authenticated user).
 */
router.delete("/chat-history/sessions/:sessionId", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const sessionId = sanitizeId(req.params.sessionId);
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Invalid session ID" });
    }

    const deleted = await db.transaction(async (conn) => {
      await conn.query(
        "DELETE FROM ai_chat_messages WHERE session_id = ? AND user_id = ?",
        [sessionId, userId],
      );
      const [result] = await conn.query(
        "DELETE FROM ai_chat_sessions WHERE id = ? AND user_id = ?",
        [sessionId, userId],
      );
      return result?.affectedRows || 0;
    });

    if (deleted === 0) {
      return res.status(404).json({ success: false, error: "Chat session not found" });
    }

    return res.json({ success: true, data: { id: sessionId } });
  } catch (err) {
    console.error("[AI Chat History] DELETE /sessions/:sessionId error:", err);
    return res.status(500).json({ success: false, error: "Failed to delete chat session" });
  }
});

/**
 * DELETE /chat-history/sessions
 * Delete all chat sessions and messages belonging strictly to the authenticated user.
 */
router.delete("/chat-history/sessions", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const deletedCount = await db.transaction(async (conn) => {
      await conn.query("DELETE FROM ai_chat_messages WHERE user_id = ?", [userId]);
      const [result] = await conn.query(
        "DELETE FROM ai_chat_sessions WHERE user_id = ?",
        [userId],
      );
      return result?.affectedRows || 0;
    });

    return res.json({ success: true, data: { deletedCount } });
  } catch (err) {
    console.error("[AI Chat History] DELETE /sessions error:", err);
    return res.status(500).json({ success: false, error: "Failed to clear chat history" });
  }
});

/* ========================================================================= */
/* MESSAGE CRUD (Strictly Isolated Per Authenticated User & Session)         */
/* ========================================================================= */

/**
 * GET /chat-history/sessions/:sessionId/messages
 * Read all messages of a session owned by the authenticated user.
 */
router.get("/chat-history/sessions/:sessionId/messages", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const sessionId = sanitizeId(req.params.sessionId);
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Invalid session ID" });
    }

    const [sessions] = await db.query(
      "SELECT id FROM ai_chat_sessions WHERE id = ? AND user_id = ? LIMIT 1",
      [sessionId, userId],
    );
    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ success: false, error: "Chat session not found" });
    }

    const [messages] = await db.query(
      `SELECT id, session_id, sender, text, openui_response, created_at
       FROM ai_chat_messages
       WHERE session_id = ? AND user_id = ?
       ORDER BY seq ASC`,
      [sessionId, userId],
    );

    return res.json({ success: true, data: messages.map(formatMessageRow) });
  } catch (err) {
    console.error("[AI Chat History] GET /messages error:", err);
    return res.status(500).json({ success: false, error: "Failed to load chat messages" });
  }
});

/**
 * POST /chat-history/sessions/:sessionId/messages
 * Append one or multiple messages to a session owned by the authenticated user.
 */
router.post("/chat-history/sessions/:sessionId/messages", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const sessionId = sanitizeId(req.params.sessionId);
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Invalid session ID" });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const rawList = Array.isArray(body.messages) ? body.messages : [body];

    if (rawList.length === 0 || rawList.length > MAX_MESSAGES_PER_REQUEST) {
      return res.status(400).json({
        success: false,
        error: `Provide between 1 and ${MAX_MESSAGES_PER_REQUEST} messages`,
      });
    }

    let normalizedMessages;
    try {
      normalizedMessages = rawList.map((m) => normalizeMessageInput(m));
    } catch (validationErr) {
      return res.status(400).json({ success: false, error: validationErr.message });
    }

    const result = await db.transaction(async (conn) => {
      const [sessions] = await conn.query(
        `SELECT id, title, is_custom_title
         FROM ai_chat_sessions
         WHERE id = ? AND user_id = ?
         LIMIT 1`,
        [sessionId, userId],
      );

      if (!sessions || sessions.length === 0) {
        return null;
      }

      const session = sessions[0];
      const insertedIds = [];

      for (const msg of normalizedMessages) {
        await conn.query(
          `INSERT INTO ai_chat_messages (id, session_id, user_id, sender, text, openui_response)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [msg.id, sessionId, userId, msg.sender, msg.text, msg.openuiResponse],
        );
        insertedIds.push(msg.id);
      }

      let nextTitle = session.title;
      let nextCustomFlag = session.is_custom_title;

      if (typeof body.title === "string" && body.title.trim()) {
        nextTitle = sanitizeTitle(body.title, session.title);
        if (body.isCustomTitle !== undefined) {
          nextCustomFlag = body.isCustomTitle ? 1 : 0;
        }
      } else if (!session.is_custom_title && isDefaultTitle(session.title)) {
        const firstUserMsg = normalizedMessages.find((m) => m.sender === "user");
        if (firstUserMsg) {
          nextTitle = buildAutoTitle(firstUserMsg.text);
        }
      }

      await conn.query(
        `UPDATE ai_chat_sessions
         SET title = ?, is_custom_title = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ? AND user_id = ?`,
        [nextTitle, nextCustomFlag, sessionId, userId],
      );

      const placeholders = insertedIds.map(() => "?").join(", ");
      const [savedMessages] = await conn.query(
        `SELECT id, session_id, sender, text, openui_response, created_at
         FROM ai_chat_messages
         WHERE session_id = ? AND user_id = ? AND id IN (${placeholders})
         ORDER BY seq ASC`,
        [sessionId, userId, ...insertedIds],
      );

      const [updatedSessions] = await conn.query(
        `SELECT
           s.id,
           s.title,
           s.is_custom_title,
           s.created_at,
           s.updated_at,
           COUNT(m.id) AS message_count
         FROM ai_chat_sessions s
         LEFT JOIN ai_chat_messages m
           ON m.session_id = s.id AND m.user_id = s.user_id
         WHERE s.id = ? AND s.user_id = ?
         GROUP BY s.id, s.title, s.is_custom_title, s.created_at, s.updated_at
         LIMIT 1`,
        [sessionId, userId],
      );

      return {
        session: formatSessionRow(updatedSessions[0]),
        messages: savedMessages.map(formatMessageRow),
      };
    });

    if (!result) {
      return res.status(404).json({ success: false, error: "Chat session not found" });
    }

    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.error("[AI Chat History] POST /messages error:", err);
    return res.status(500).json({ success: false, error: "Failed to save chat message" });
  }
});

/**
 * PUT / PATCH /chat-history/sessions/:sessionId/messages/:messageId
 * Update a message strictly owned by the authenticated user within the specified session.
 */
async function handleUpdateMessage(req, res) {
  try {
    const userId = req.chatUserId;
    const sessionId = sanitizeId(req.params.sessionId);
    const messageId = sanitizeId(req.params.messageId);
    if (!sessionId || !messageId) {
      return res.status(400).json({ success: false, error: "Invalid session or message ID" });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const hasText = typeof body.text === "string";
    const hasOpenUi =
      body.openuiResponse !== undefined || body.openui_response !== undefined;

    if (!hasText && !hasOpenUi) {
      return res.status(400).json({
        success: false,
        error: "Provide text or openuiResponse to update",
      });
    }

    const updates = [];
    const params = [];

    if (hasText) {
      updates.push("text = ?");
      params.push(body.text);
    }
    if (hasOpenUi) {
      const openuiVal =
        body.openuiResponse !== undefined ? body.openuiResponse : body.openui_response;
      updates.push("openui_response = ?");
      params.push(
        typeof openuiVal === "string" && openuiVal.length > 0 ? openuiVal : null,
      );
    }

    const updated = await db.transaction(async (conn) => {
      const [result] = await conn.query(
        `UPDATE ai_chat_messages
         SET ${updates.join(", ")}
         WHERE id = ? AND session_id = ? AND user_id = ?`,
        [...params, messageId, sessionId, userId],
      );

      if (!result || result.affectedRows === 0) {
        return null;
      }

      await conn.query(
        `UPDATE ai_chat_sessions
         SET updated_at = CURRENT_TIMESTAMP
         WHERE id = ? AND user_id = ?`,
        [sessionId, userId],
      );

      const [rows] = await conn.query(
        `SELECT id, session_id, sender, text, openui_response, created_at
         FROM ai_chat_messages
         WHERE id = ? AND session_id = ? AND user_id = ?
         LIMIT 1`,
        [messageId, sessionId, userId],
      );

      return rows[0] ? formatMessageRow(rows[0]) : null;
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: "Chat message not found" });
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error("[AI Chat History] UPDATE /messages/:messageId error:", err);
    return res.status(500).json({ success: false, error: "Failed to update chat message" });
  }
}

router.put("/chat-history/sessions/:sessionId/messages/:messageId", handleUpdateMessage);
router.patch("/chat-history/sessions/:sessionId/messages/:messageId", handleUpdateMessage);

/**
 * DELETE /chat-history/sessions/:sessionId/messages/:messageId
 * Delete a single message strictly owned by the authenticated user.
 */
router.delete("/chat-history/sessions/:sessionId/messages/:messageId", async (req, res) => {
  try {
    const userId = req.chatUserId;
    const sessionId = sanitizeId(req.params.sessionId);
    const messageId = sanitizeId(req.params.messageId);
    if (!sessionId || !messageId) {
      return res.status(400).json({ success: false, error: "Invalid session or message ID" });
    }

    const deleted = await db.transaction(async (conn) => {
      const [result] = await conn.query(
        `DELETE FROM ai_chat_messages
         WHERE id = ? AND session_id = ? AND user_id = ?`,
        [messageId, sessionId, userId],
      );
      if (!result || result.affectedRows === 0) {
        return 0;
      }
      await conn.query(
        `UPDATE ai_chat_sessions
         SET updated_at = CURRENT_TIMESTAMP
         WHERE id = ? AND user_id = ?`,
        [sessionId, userId],
      );
      return result.affectedRows;
    });

    if (deleted === 0) {
      return res.status(404).json({ success: false, error: "Chat message not found" });
    }

    return res.json({ success: true, data: { id: messageId, sessionId } });
  } catch (err) {
    console.error("[AI Chat History] DELETE /messages/:messageId error:", err);
    return res.status(500).json({ success: false, error: "Failed to delete chat message" });
  }
});

module.exports = { router, ensureChatHistoryTables };
