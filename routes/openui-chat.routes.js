const express = require("express");
const fs = require("fs");
const path = require("path");
const { auth } = require("../middleware/auth");

const router = express.Router();

const GENERATED_PROMPT_PATH = path.join(
  __dirname,
  "..",
  "open-ui-server",
  "generated",
  "openui-system-prompt.txt"
);

let cachedSystemPrompt = null;

async function getOpenUiSystemPrompt() {
  if (cachedSystemPrompt) {
    return cachedSystemPrompt;
  }
  try {
    if (fs.existsSync(GENERATED_PROMPT_PATH)) {
      cachedSystemPrompt = fs.readFileSync(GENERATED_PROMPT_PATH, "utf8");
      return cachedSystemPrompt;
    }
  } catch (err) {
    console.warn("Could not read pre-generated OpenUI prompt file, generating dynamically:", err.message);
  }

  const mod = await import("../open-ui-server/openui-library.mjs");
  cachedSystemPrompt = mod.systemPrompt;
  try {
    await mod.writeGeneratedPrompt(GENERATED_PROMPT_PATH);
  } catch (writeErr) {
    console.warn("Could not persist generated OpenUI prompt:", writeErr.message);
  }
  return cachedSystemPrompt;
}

function escapeOpenUiString(value) {
  return JSON.stringify(String(value ?? ""));
}

function buildFallbackOpenUiLang(message, context = {}) {
  const input = String(message || "").trim();
  const text = input.toLowerCase();
  const isEmployee = Boolean(context.isEmployee);
  const isHR = Boolean(context.isHR);
  const rejectedCount = Number(context.rejectedCount || 0);
  const userName = String(context.userName || "").trim();
  const firstName = userName ? userName.split(/\s+/)[0] : "";
  const stats = context.stats && typeof context.stats === "object" ? context.stats : {};
  const selected =
    context.selectedNotification && typeof context.selectedNotification === "object"
      ? context.selectedNotification
      : null;

  const defaultActions = isEmployee
    ? `[
  { label: "My request status", prompt: "My request status", variant: "primary" },
  { label: "How to resubmit?", prompt: "How to resubmit?", variant: "secondary" },
  { label: "Selected request details", prompt: "Selected request details", variant: "outline" }
]`
    : `[
  { label: "Pending summary", prompt: "Pending summary", variant: "primary" },
  { label: "Selected request details", prompt: "Selected request details", variant: "secondary" },
  { label: "How to approve/reject?", prompt: "How to approve/reject?", variant: "outline" },
  { label: "Export reports", prompt: "Export reports", variant: "outline" }
]`;

  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|namaste)\b/.test(text)) {
    const greeting = firstName
      ? `Hello ${firstName}! How can I help you with your HRMS Inbox today?`
      : "Hello! How can I help you with your HRMS Inbox today?";
    const subtext = isEmployee
      ? "Ask about your rejected requests, timesheet resubmissions, or the currently selected item."
      : "Ask for a live pending tasks summary, selected request details, approval steps, or report exports.";
    return [
      "root = Response([intro, actions])",
      `intro = TextBlock(${escapeOpenUiString(`${greeting}\n${subtext}`)}, "info")`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  if (text.includes("thank")) {
    return [
      "root = Response([msg, actions])",
      `msg = TextBlock(${escapeOpenUiString("You're welcome! Let me know if you need help with anything else in your HRMS Inbox.")}, "success")`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  if (
    text.includes("selected") ||
    text.includes("current") ||
    text.includes("this request") ||
    text.includes("details")
  ) {
    if (!selected) {
      return [
        "root = Response([notice, actions])",
        `notice = TextBlock(${escapeOpenUiString("No request is currently selected. Click any request card in the Inbox list to inspect its details, then ask me again anytime!")}, "warning")`,
        `actions = ActionButtons(${defaultActions})`,
      ].join("\n");
    }

    const emp = selected.employee_name || "Employee";
    const reqType = selected._displayType || selected.request_type || "Request";
    const status = selected.status || "Pending";
    const submitted = selected.created_at
      ? new Date(selected.created_at).toLocaleDateString()
      : "N/A";
    const meta = selected._parsedMeta || {};
    const dateRange =
      meta.start_date && meta.end_date
        ? `${String(meta.start_date).split("T")[0]} to ${String(meta.end_date).split("T")[0]}`
        : meta.date
        ? String(meta.date).split("T")[0]
        : "";
    const desc = selected.description || "No additional notes provided.";
    const actionHint =
      status === "Pending" && !isEmployee
        ? "You can approve or reject this request using the action bar at the bottom of the detail pane."
        : isEmployee && status.toLowerCase().includes("reject")
        ? "Open the card details to review the rejection reason or resubmit if applicable."
        : "Viewing active Inbox request metadata.";

    return [
      "root = Response([card, actions])",
      `card = RequestCard(${escapeOpenUiString(emp)}, ${escapeOpenUiString(reqType)}, ${escapeOpenUiString(status)}, ${escapeOpenUiString(submitted)}, ${escapeOpenUiString(dateRange)}, ${escapeOpenUiString(desc)}, ${escapeOpenUiString(actionHint)})`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  if (
    text.includes("pending") ||
    text.includes("summary") ||
    text.includes("count") ||
    text.includes("status") ||
    text.includes("tasks")
  ) {
    if (isEmployee) {
      const metricsJson = JSON.stringify([
        {
          label: "Rejected Requests",
          value: String(rejectedCount),
          tone: rejectedCount > 0 ? "danger" : "success",
        },
        {
          label: "Active Tab",
          value: selected ? String(selected.status || "Viewing") : "Inbox",
          tone: "primary",
        },
      ]);
      return [
        "root = Response([summary, actions])",
        `summary = SummaryCard("Your Inbox Summary", "Employee Self-Service", ${metricsJson}, "Switch between Rejected Requests and Archive using the top tabs or left sidebar.")`,
        `actions = ActionButtons(${defaultActions})`,
      ].join("\n");
    }

    const metricsJson = JSON.stringify([
      { label: "Total Pending", value: String(stats.pending || 0), tone: "primary" },
      { label: "Leave Requests", value: String(stats.leaveCount || 0), tone: "warning" },
      { label: "Work From Home", value: String(stats.wfhCount || 0), tone: "default" },
      { label: "Remote Login", value: String(stats.remoteCount || 0), tone: "default" },
      { label: "Attendance Reg.", value: String(stats.attendanceCount || 0), tone: "warning" },
      { label: "Comp Off", value: String(stats.compOffCount || 0), tone: "default" },
      { label: "Timesheets", value: String(stats.timesheetCount || 0), tone: "primary" },
      { label: "Exit Requests", value: String(stats.resignationCount || 0), tone: "danger" },
    ]);

    const chartLabels = JSON.stringify([
      "Leave",
      "WFH",
      "Remote",
      "Attendance",
      "Comp Off",
      "Timesheets",
      "Exit",
    ]);
    const chartSeries = JSON.stringify([
      {
        name: "Pending",
        values: [
          Number(stats.leaveCount || 0),
          Number(stats.wfhCount || 0),
          Number(stats.remoteCount || 0),
          Number(stats.attendanceCount || 0),
          Number(stats.compOffCount || 0),
          Number(stats.timesheetCount || 0),
          Number(stats.resignationCount || 0),
        ],
        color: "#3f51b5",
      },
    ]);

    return [
      "root = Response([summary, chart, actions])",
      `summary = SummaryCard("Current Pending Tasks Overview", "Live Inbox Queue Breakdown", ${metricsJson}, "Select a category on the left sidebar to review and action pending items.")`,
      `chart = BarChart("Pending Requests by Category", ${chartLabels}, ${chartSeries}, "Live counts", false, false, "Requests")`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  if (text.includes("approve") || text.includes("reject") || text.includes("action")) {
    if (isEmployee) {
      return [
        "root = Response([guide, actions])",
        `guide = GuideSteps("How Approvals & Rejections Work", "Employee View", ${JSON.stringify([
          {
            title: "Manager / HR Review",
            detail: "Approvals and rejections are processed by your Reporting Manager or HR.",
          },
          {
            title: "Check Rejection Remarks",
            detail: "Select a rejected request to inspect the rejection reason highlighted in the detail card.",
          },
          {
            title: "Resubmit if Needed",
            detail: "For rejected timesheets, use the Resubmit Report button to edit and re-submit.",
          },
        ])}, "Use the Archive tab to view previously approved or historical requests.")`,
        `actions = ActionButtons(${defaultActions})`,
      ].join("\n");
    }

    return [
      "root = Response([guide, actions])",
      `guide = GuideSteps("Approve or Reject Pending Requests", "4-Step Manager & HR Workflow", ${JSON.stringify([
        {
          title: "Pick a Category & Request",
          detail: "Select a request category in the left sidebar and click a card in the middle list.",
        },
        {
          title: "Verify Dates & Overlap",
          detail: "Check the date banner, teammate leave overlap, and attached metadata.",
        },
        {
          title: "Add Optional Remarks",
          detail: "Enter comments in the bottom input box (up to 1024 characters).",
        },
        {
          title: "Click Approve or Reject",
          detail: "Rejecting without text in the input box will prompt you for a mandatory rejection reason.",
        },
      ])}, "Processed items automatically move to Approved, Rejected, or Archived.")`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  if (text.includes("resubmit")) {
    return [
      "root = Response([guide, actions])",
      `guide = GuideSteps("Resubmit a Rejected Timesheet", "Employee Workflow", ${JSON.stringify([
        {
          title: "Open Rejected Requests",
          detail: "Navigate to the Rejected Requests tab in your Inbox.",
        },
        {
          title: "Select the Rejected Item",
          detail: "Click the rejected timesheet card to review your manager's feedback.",
        },
        {
          title: "Click Resubmit Report",
          detail: "Click Resubmit Report on the Timesheet Work Log card to open Work Track in edit mode.",
        },
      ])}, "Update your logged entries and submit again for manager review.")`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  if (
    text.includes("export") ||
    text.includes("download") ||
    text.includes("report") ||
    text.includes("upload") ||
    text.includes("excel")
  ) {
    if (isEmployee) {
      return [
        "root = Response([msg, actions])",
        `msg = TextBlock(${escapeOpenUiString('When viewing a Timesheet Request in your Inbox, click "Download" inside the Timesheet Work Log card to save a copy of that work report as an Excel file.')}, "info")`,
        `actions = ActionButtons(${defaultActions})`,
      ].join("\n");
    }

    const steps = [
      {
        title: "Download Timesheets",
        detail: "Export team timesheets for a single date or custom date range from the Inbox header.",
      },
      {
        title: "Reports Menu",
        detail: "Export Attendance reports (date range) or Export Leaves (HR access).",
      },
    ];
    if (isHR) {
      steps.push({
        title: "HR Excel/CSV Uploads",
        detail: 'Use "Upload Attendance" or "Upload Leave Balance" in the header to bulk-import sheets.',
      });
    }

    return [
      "root = Response([guide, actions])",
      `guide = GuideSteps("Inbox Reports & Excel Exports", "Header Toolbar Actions", ${JSON.stringify(steps)}, "Exports generate formatted Excel spreadsheets ready for payroll and audit.")`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  if (text.includes("filter") || text.includes("search") || text.includes("month") || text.includes("archive")) {
    return [
      "root = Response([guide, actions])",
      `guide = GuideSteps("Search, Filter & Archive", "Finding Requests Quickly", ${JSON.stringify([
        {
          title: "Search Bar",
          detail: 'Type an employee name or keyword in "Search requests..." above the list.',
        },
        {
          title: "Month Dropdown",
          detail: "Filter requests by submission month using the middle column header selector.",
        },
        {
          title: "Archive Tab",
          detail: "Switch to ARCHIVE at the top to inspect historical processed requests.",
        },
      ])}, "Filters apply immediately to the active category list.")`,
      `actions = ActionButtons(${defaultActions})`,
    ].join("\n");
  }

  return [
    "root = Response([intro, actions])",
    `intro = TextBlock(${escapeOpenUiString(`I've noted your question: "${input}". Choose one of the quick actions below or ask about pending counts, the selected request, approval steps, or report exports.`)}, "default")`,
    `actions = ActionButtons(${defaultActions})`,
  ].join("\n");
}

function streamStringInChunks(res, content, chunkSize = 48, delayMs = 18) {
  return new Promise((resolve) => {
    let offset = 0;
    const timer = setInterval(() => {
      if (res.writableEnded) {
        clearInterval(timer);
        resolve();
        return;
      }
      if (offset >= content.length) {
        clearInterval(timer);
        res.end();
        resolve();
        return;
      }
      const slice = content.slice(offset, offset + chunkSize);
      offset += chunkSize;
      res.write(slice);
    }, delayMs);
  });
}

// GET /api/inbox/chat/prompt - Inspect generated OpenUI system prompt
router.get("/prompt", auth, async (_req, res) => {
  try {
    const prompt = await getOpenUiSystemPrompt();
    res.json({ success: true, prompt });
  } catch (error) {
    console.error("Failed to load OpenUI system prompt:", error);
    res.status(500).json({ success: false, error: "Failed to load OpenUI system prompt" });
  }
});

// POST /api/inbox/chat - Stream OpenUI Lang generative UI response
router.post("/", auth, async (req, res) => {
  const { message, history = [], context = {} } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");

  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const systemPrompt = await getOpenUiSystemPrompt();
      const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
      const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

      const contextSummary = JSON.stringify({
        userName: context.userName || req.user?.name || "",
        role: req.user?.role || "",
        isEmployee: Boolean(context.isEmployee),
        isHR: Boolean(context.isHR),
        isManager: Boolean(context.isManager),
        rejectedCount: context.rejectedCount || 0,
        stats: context.stats || null,
        selectedNotification: context.selectedNotification
          ? {
              employee_name: context.selectedNotification.employee_name,
              request_type:
                context.selectedNotification._displayType ||
                context.selectedNotification.request_type,
              status: context.selectedNotification.status,
              created_at: context.selectedNotification.created_at,
              description: context.selectedNotification.description,
            }
          : null,
      });

      const chatHistory = Array.isArray(history)
        ? history
            .slice(-6)
            .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
            .map((m) => ({ role: m.role, content: m.content }))
        : [];

      const upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          stream: true,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: `${systemPrompt}\n\nCurrent HRMS Inbox Live Context:\n${contextSummary}`,
            },
            ...chatHistory,
            { role: "user", content: message.trim() },
          ],
        }),
      });

      if (upstream.ok && upstream.body) {
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              const delta = parsed?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta.length > 0) {
                res.write(delta);
              }
            } catch {
              // Ignore partial SSE JSON lines
            }
          }
        }

        if (!res.writableEnded) {
          res.end();
        }
        return;
      }
    } catch (llmError) {
      console.warn("LLM provider unavailable, falling back to local OpenUI generator:", llmError.message);
    }
  }

  const openUiLang = buildFallbackOpenUiLang(message, context);
  await streamStringInChunks(res, openUiLang, 54, 16);
});

module.exports = router;

