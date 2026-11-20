const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const jwt = require("jsonwebtoken");

const { authMiddleware } = require("../middleware/auth");
const { findEmployeeByUserId } = require("../utils/helpers");
const { timesheetDescription } = require("../utils/timesheet-description");

const bcrypt = require("bcryptjs");
require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// utilities
const AI_DATA_POLICY = {
  SAFE: [
    "time_type",
    "worker_type",
    "EmploymentStatus",
    "notice_period",
    "DepartmentId",
    "SubDepartmentId",
    "DesignationId",
    "SecondaryDesignationId",
    "BusinessUnitId",
    "BandId",
    "PayGradeId",
    "CostCenterId",
    "leave_plan_id",
    "shift_policy_id",
    "weekly_off_policy_id",
    "attendance_policy_id",
    "attendance_capture_scheme_id",
    "holiday_list_id",
    "expense_policy_id",
    "basic_pct",
    "hra_pct",
    "medical_allowance",
    "transport_allowance",
    "special_allowance",
    "working_days",
    "exit_status",
    "termination_type",
  ],

  RESTRICTED: [
    "EmployeeNumber",
    "attendance_number",
    "id",
    "FirstName",
    "MiddleName",
    "LastName",
    "FullName",
    "WorkEmail",
    "PersonalEmail",
    "mobile_number",
    "residence_number",
    "PhoneNumber",
    "DateJoined",
    "LocationId",
    "LegalEntityId",
    "reporting_manager_id",
    "dotted_line_manager_id",
    "lpa",
    "paid_basic_monthly",
    "loss_of_days",
    "exit_date",
    "termination_reason",
    "resignation_note",
    "comments",
    "created_at",
    "updated_at",
    "profile_image",
  ],
};
const ALLOWED_EMPLOYEE_ATTRIBUTES = Object.freeze([
  ...AI_DATA_POLICY.SAFE,
  ...AI_DATA_POLICY.RESTRICTED,
]);
const EMPLOYEE_COLUMNS = ALLOWED_EMPLOYEE_ATTRIBUTES.map(
  (attribute) => `\`${attribute}\``,
).join(", ");
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function filterEmployeeAttributes(employee) {
  if (!employee) return null;

  const result = {};
  for (const attribute of ALLOWED_EMPLOYEE_ATTRIBUTES) {
    if (Object.prototype.hasOwnProperty.call(employee, attribute)) {
      result[attribute] = employee[attribute];
    }
  }
  return result;
}

async function closeConnection(c) {
  if (c) await c.end();
}
// AI auth
async function createAiCredsIfNotExist() {
  let c;
  try {
    const { ai_uname, ai_password } = process.env;
    if (!ai_uname || !ai_password) {
      throw new Error("AI credentials missing from environment variables");
    }
    c = await db();
    const [users] = await c.query(
      "SELECT password_hash, role FROM users WHERE username = ? LIMIT 1",
      [ai_uname],
    );
    if (
      users.length &&
      users[0].role === "ai" &&
      (await bcrypt.compare(ai_password, users[0].password_hash))
    ) {
      console.info("AI Credentials Exist");
      return;
    }
    if (users.length && users[0].role !== "ai") {
      throw new Error("AI username is already used by a non-AI account");
    }
    const passwordHash = await bcrypt.hash(ai_password, 10);
    await c.beginTransaction();
    try {
      await c.query("DELETE FROM users WHERE role = ?", ["ai"]);
      await c.query(
        `INSERT INTO users
          (username, password_hash, role, full_name)
         VALUES (?, ?, ?, ?)`,
        [ai_uname, passwordHash, "ai", "Update Me Ai"],
      );
      await c.commit();
      console.info("AI Credentials Created");
    } catch (err) {
      await c.rollback();
      throw err;
    }
  } catch (err) {
    console.error("AI Credentials Initialization Failed:", err);
    throw err;
  } finally {
    await closeConnection(c);
  }
}
//services
function checkAccess(req) {
  return req?.user?.role === "ai";
}
async function checkIfUserIsCapable(token, empId, connection) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.id ||
      !decoded.role ||
      (decoded.type && decoded.type !== "access")
    ) {
      throw new Error("Unauthorized");
    }

    // JWT ids identify users; reporting_manager_id identifies an employee.
    const [rows] = await connection.query(
      `SELECT employee.id
       FROM employees employee
       INNER JOIN employees manager ON manager.id = employee.reporting_manager_id
       INNER JOIN users initiator
         ON manager.WorkEmail = initiator.username
         OR manager.EmployeeNumber = initiator.username
       WHERE employee.id = ? AND initiator.id = ?
       LIMIT 1`,
      [empId, decoded.id],
    );

    return rows.length > 0;
  } catch (e) {
    if (
      e.message === "Unauthorized" ||
      e.name === "JsonWebTokenError" ||
      e.name === "TokenExpiredError" ||
      e.name === "NotBeforeError"
    ) {
      throw new Error("Unauthorized");
    }

    throw new Error("Unfortunate Error");
  }
}
function normalizeEmployeeId(empId) {
  if (empId === undefined || empId === null) {
    throw new Error("Employee ID is required");
  }

  let resolvedEmpId = empId;
  if (typeof resolvedEmpId === "object" && resolvedEmpId !== null) {
    resolvedEmpId =
      resolvedEmpId.empId ?? resolvedEmpId.employee_id ?? resolvedEmpId.id;
  }

  const numericEmpId = Number(resolvedEmpId);
  if (
    !["string", "number"].includes(typeof resolvedEmpId) ||
    (typeof resolvedEmpId === "string" &&
      !/^\d+$/.test(resolvedEmpId.trim())) ||
    !Number.isSafeInteger(numericEmpId) ||
    numericEmpId <= 0
  ) {
    throw new Error("Invalid employee ID: must be a positive integer");
  }
  return numericEmpId;
}

function normalizeDate(value, fieldName) {
  const input = typeof value === "string" ? value.trim() : value;
  const errorMessage = `Invalid ${fieldName} format. Expected valid date format (YYYY-MM-DD)`;
  if (
    typeof input !== "string" &&
    typeof input !== "number" &&
    !(input instanceof Date)
  ) {
    throw new Error(errorMessage);
  }

  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) throw new Error(errorMessage);

  const formatted = parsed.toISOString().split("T")[0];
  if (
    typeof input === "string" &&
    DATE_PATTERN.test(input) &&
    input !== formatted
  ) {
    throw new Error(errorMessage);
  }
  return formatted;
}

function normalizeTimesheetPayload(payload = {}) {
  const safePayload = payload && typeof payload === "object" ? payload : {};

  const rawStartDate = safePayload.startDate || safePayload.start_date;
  const rawEndDate = safePayload.endDate || safePayload.end_date;

  if (
    !rawStartDate ||
    !rawEndDate ||
    (typeof rawStartDate === "string" && !rawStartDate.trim()) ||
    (typeof rawEndDate === "string" && !rawEndDate.trim())
  ) {
    throw new Error("Start Date and End Date are required");
  }

  const startDate = normalizeDate(rawStartDate, "start_date");
  const endDate = normalizeDate(rawEndDate, "end_date");
  if (startDate > endDate) {
    throw new Error("Invalid date range: start_date cannot be after end_date");
  }

  const rawToken = safePayload.jwt || safePayload.token;
  const token =
    typeof rawToken === "string"
      ? rawToken
          .trim()
          .replace(/^Bearer\s+/i, "")
          .trim()
      : "";
  if (!token) throw new Error("JWT Token of the Initiator is required");

  return { startDate, endDate, jwt: token };
}

async function getUserTimeSheet(empId, payload = {}) {
  const numericEmpId = normalizeEmployeeId(empId);
  const { startDate, endDate, jwt: token } = normalizeTimesheetPayload(payload);
  let c;
  try {
    c = await db();
    if (!(await checkIfUserIsCapable(token, numericEmpId, c))) {
      throw new Error(
        "You are not authorized to access this Employee's timesheet.",
      );
    }

    const query = `
      SELECT 
        t.id,
        t.employee_id,
        t.project_id,
        p.project_name,
        p.client_name,
        DATE_FORMAT(t.date, '%Y-%m-%d') as date,
        t.timesheet_type,
        t.hours_breakdown,
        t.total_hours,
        t.work_description,
        t.notes,
        t.status,
        t.submission_date,
        t.rejection_reason,
        t.created_at,
        t.updated_at
      FROM timesheets t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.employee_id = ?
        AND t.date BETWEEN ? AND ?
      ORDER BY t.date DESC, t.id DESC
    `;
    const [rows] = await c.query(query, [numericEmpId, startDate, endDate]);

    return (rows || []).map((row) => {
      if (typeof row.hours_breakdown === "string") {
        try {
          row.hours_breakdown = JSON.parse(row.hours_breakdown);
        } catch (_) {}
      }
      row.work_description = timesheetDescription(row);
      return row;
    });
  } finally {
    await closeConnection(c);
  }
}
async function getEmployeeDetails(id) {
  return filterEmployeeAttributes(await findEmployeeByUserId(id));
}
function extractSearchName(req) {
  if (req.body?.name) return req.body.name;
  if (req.body?.employeeName) return req.body.employeeName;
  if (req.query?.name) return req.query.name;
  if (req.query?.employeeName) return req.query.employeeName;

  if (req.body && typeof req.body === "object") {
    for (const key of Object.keys(req.body)) {
      const trimmed = key.trim();
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed.name) return parsed.name;
          if (parsed.employeeName) return parsed.employeeName;
        } catch (_) {}
      }
    }
  }

  if (typeof req.body === "string" && req.body.trim()) {
    try {
      const parsed = JSON.parse(req.body);
      if (parsed.name) return parsed.name;
      if (parsed.employeeName) return parsed.employeeName;
    } catch (_) {
      return req.body.trim();
    }
  }

  return "";
}
async function fetchEmployeeIdsByName(
  name,
  existingConnection = null,
  limit = null,
) {
  const searchName = normalizeSearchName(name);
  if (!searchName) return [];

  let c = existingConnection;
  let shouldClose = false;

  try {
    if (!c) {
      c = await db();
      shouldClose = true;
    }

    const trimmed = searchName;
    const likePattern = `%${trimmed}%`;
    const prefixPattern = `${trimmed}%`;

    const query = `SELECT id FROM employees
       WHERE LOWER(FullName) LIKE LOWER(?)
          OR LOWER(FirstName) LIKE LOWER(?)
          OR LOWER(LastName) LIKE LOWER(?)
          OR LOWER(MiddleName) LIKE LOWER(?)
          OR LOWER(CONCAT_WS(' ', FirstName, MiddleName, LastName)) LIKE LOWER(?)
          OR LOWER(CONCAT_WS(' ', FirstName, LastName)) LIKE LOWER(?)
          OR LOWER(EmployeeNumber) LIKE LOWER(?)
          OR LOWER(WorkEmail) LIKE LOWER(?)
       ORDER BY
         CASE
           WHEN LOWER(TRIM(FullName)) = LOWER(?) THEN 1
           WHEN LOWER(TRIM(CONCAT_WS(' ', FirstName, LastName))) = LOWER(?) THEN 2
           WHEN LOWER(TRIM(FirstName)) = LOWER(?) THEN 3
           WHEN LOWER(TRIM(LastName)) = LOWER(?) THEN 4
           WHEN LOWER(FullName) LIKE LOWER(?) THEN 5
           WHEN LOWER(FirstName) LIKE LOWER(?) THEN 6
           WHEN LOWER(LastName) LIKE LOWER(?) THEN 7
           ELSE 8
         END,
         CASE WHEN EmploymentStatus IN ('Working', 'Active') THEN 0 ELSE 1 END,
         id ASC`;
    const params = [
      ...Array(8).fill(likePattern),
      ...Array(4).fill(trimmed),
      ...Array(3).fill(prefixPattern),
    ];
    const limited = Number.isSafeInteger(limit) && limit > 0;
    if (limited) params.push(limit);
    const [rows] = await c.query(limited ? `${query} LIMIT ?` : query, params);

    return (rows || []).map((r) => r.id);
  } catch (err) {
    console.error("Error fetching employee ids from name:", err);
    throw err;
  } finally {
    if (shouldClose && c) {
      await closeConnection(c);
    }
  }
}

function normalizeSearchName(name) {
  if (name && typeof name === "object") {
    name = name.name || name.fullName || name.FullName || name.employeeName;
  }
  return typeof name === "string" ? name.trim().replace(/\s+/g, " ") : "";
}
// routes
router.post("/employees-details", authMiddleware, async (req, res) => {
  try {
    if (!checkAccess(req)) return res.json("bye");
    return res.json(await getEmployeeDetails(2));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});
router.all(
  ["/employee-id", "/employee-ids"],
  authMiddleware,
  async (req, res) => {
    try {
      if (!checkAccess(req)) {
        return res.json("bye");
      }
      const name = extractSearchName(req);
      const ids = await fetchEmployeeIdsByName(name);
      return res.json(ids);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
);
router.all("/get-timesheets", authMiddleware, async (req, res) => {
  try {
    if (!checkAccess(req)) {
      return res.status(403).json("Unauthenticated");
    }
    const empId =
      req.query?.empId ||
      req.query?.employee_id ||
      req.query?.id ||
      req.body?.empId ||
      req.body?.employee_id ||
      req.body?.id;
    const payload = {
      ...(req.query || {}),
      ...(req.body || {}),
    };
    const timesheets = await getUserTimeSheet(empId, payload);
    return res.json(timesheets);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.post("/agent", authMiddleware, async (req, res) => {
  const AGENT_URL = process.env.AGENT_URL;
  if (!AGENT_URL)
    return res.status(404).json({
      success: false,
      message: "There is an issue please contact system admin.",
    });
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token && req.query && (req.query.token || req.query.t)) {
      token = req.query.token || req.query.t;
    }

    if (!token || token.trim() === "") {
      return res.status(401).json({ error: "Missing token" });
    }

    const rawPrompt =
      typeof req.body?.prompt === "string" && req.body.prompt.trim()
        ? req.body.prompt.trim()
        : "Run my workflow and summarize the result";
    const promptPrefix = `Current User's JWT: ${token} . And prompt is : `;
    const MAX_UPSTREAM_PROMPT_CHARS = 15800;
    const maxBodyPromptChars = Math.max(
      1000,
      MAX_UPSTREAM_PROMPT_CHARS - promptPrefix.length,
    );
    const boundedPrompt =
      rawPrompt.length > maxBodyPromptChars
        ? rawPrompt.slice(0, maxBodyPromptChars)
        : rawPrompt;

    const response = await fetch(AGENT_URL, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.AGENT_EMAIL}:${process.env.AGENT_PASSWORD}`,
          ).toString("base64"),
        "X-Server-Secret": process.env.AGENT_SERVER_SECRET,
        Accept: "text/event-stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${promptPrefix}${boundedPrompt}`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({
        success: false,
        error,
      });
    }

    // Forward SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    res.flushHeaders();

    // Forward streaming response
    for await (const chunk of response.body) {
      if (res.destroyed) break;
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error("Agent API Error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    } else {
      res.end();
    }
  }
});
/* ========================================================================= */
/* GraphQL Endpoint & Executor                                               */
/* ========================================================================= */

// GraphQL Schema Definition for AI Agent integration
function getAvailableGraphQLQueries() {
  return {
    queryType: "Query",
    description:
      "Comprehensive registry of available GraphQL queries configured as tools for AI agent integration. Use these queries to retrieve detailed employee profiles, lookup database identifiers, inspect organizational rosters, monitor timesheet activity, and examine the complete schema specification to construct precise data requests.",
    instructions:
      "When using these queries as tools, select the query that best matches your target intent. For employee name searches, start by resolving the name using 'employeeId' or 'employeeIds', then fetch complete profile attributes with 'employeeDetails'. To access attendance or billing logs, invoke 'timesheets' with a valid 'empId' and optional date bounds. Always specify exact subfields in the GraphQL query selection to retrieve only necessary data.",
    queries: [
      {
        name: "employeeIds",
        description:
          "Resolves an employee's full or partial name to a list of matching internal employee database IDs. Use this query tool when a user mentions a person by name and you need to identify all matching candidate IDs before querying detailed profiles, payroll, or timesheet information.",
        instruction:
          "Use this query tool as the initial discovery step when a user mentions an employee by name. Pass the employee's name or search query in the 'name' argument. Because multiple employees may share the same first or last name, this query returns an array of matching numeric IDs. If multiple IDs are returned, either inspect each candidate using 'employeeDetails' or ask the user for clarification with additional context such as email or department.",
        arguments: ["name"],
        returnType: "[ID!]!",
      },
      {
        name: "employeeId",
        description:
          "Fetches the first matching employee database ID for a specified full or partial name. Use this query tool when you need a single numeric identifier to pass into subsequent queries such as employeeDetails or timesheets, assuming the provided employee name is sufficiently specific or unique in the organization.",
        instruction:
          "Use this query tool when the user provides an employee name and you need their unique numeric ID to call subsequent queries such as 'employeeDetails' or 'timesheets'. Pass the person's name into the 'name' argument. The resolver searches the database and returns the first matching ID or null if not found. For ambiguous or common names where multiple matches might exist, prefer using 'employeeIds' or 'employees' instead to avoid selecting the wrong employee.",
        arguments: ["name"],
        returnType: "ID",
      },
      {
        name: "employee",
        description:
          "Fetches comprehensive employee profile details by either unique database primary key ID or employee name. Use this versatile query tool to retrieve complete profile data including contact information, department, designation, salary, employment status, and reporting manager in a single unified GraphQL query execution for any staff member.",
        instruction:
          "Use this flexible query tool when you need full profile details for an employee and have either their numeric ID or their name. Pass 'id' if known, or pass 'name' to search by name. When querying, specify the subfields needed by the user prompt, such as 'first_name', 'last_name', 'email', 'designation', 'department_name', 'role', or 'salary'. If neither argument is provided, the query returns null. Prefer passing 'id' when already resolved from prior steps for maximum accuracy.",
        arguments: ["id", "name"],
        returnType: "Employee",
      },
      {
        name: "employeeDetails",
        description:
          "Retrieves the full employee record for a specific employee identified strictly by their numeric primary key ID. Use this specialized tool when you have already obtained the employee ID and need comprehensive information regarding personal attributes, employment history, department assignments, emergency contacts, banking records, and compensation packages.",
        instruction:
          "Use this query tool to fetch complete employee records when you already possess the employee's unique numeric primary key ID. Pass the mandatory 'id' argument as a string or integer. Select the relevant subfields in your GraphQL selection, including 'first_name', 'last_name', 'email', 'phone_number', 'designation', 'department_name', 'status', 'joining_date', and 'salary'. If the ID does not exist in the database, this query returns null. Do not use this tool with names; use 'employeeId' or 'employeeIds' first.",
        arguments: ["id"],
        returnType: "Employee",
      },
      {
        name: "employees",
        description:
          "Searches and retrieves multiple employee records matching a given name substring, supporting optional result limit pagination. Use this query tool to display employee directory lists, search staff across departments, browse organizational records, or present candidate choices to users when resolving ambiguous names across the entire company.",
        instruction:
          "Use this query tool to search for multiple employees by full or partial name and retrieve their detailed profile records in a single query. Pass the search string into the 'name' argument and optionally pass a positive integer in 'limit' (defaults to 20). In the selection set, specify desired subfields like 'id', 'first_name', 'last_name', 'email', 'department_name', and 'designation'. This tool is ideal for directory lookups, team rosters, or clarifying ambiguous search terms with the user.",
        arguments: ["name", "limit"],
        returnType: "[Employee]",
      },
      {
        name: "timesheets",
        description:
          "Fetches timesheet records and logged work hours for a specific employee, with optional filtering by date range and submission status. Use this query tool to inspect hours worked, project allocations, manager approval states, notes, and client assignments for billing, payroll calculation, or attendance compliance auditing.",
        instruction:
          "Use this query tool to inspect an employee's timesheets, working hours, project allocations, and submission approval status. Pass the required 'empId' representing the employee's ID. You can filter results by supplying 'startDate' and 'endDate' in 'YYYY-MM-DD' format, or filter by 'status' (such as 'submitted', 'approved', or 'rejected'). The user session must be authenticated; provide 'jwt' in arguments if not present in the authorization header. Request subfields such as 'date', 'total_hours', 'project_name', 'status', and 'work_description'.",
        arguments: ["empId", "jwt", "startDate", "endDate"],
        returnType: "[Timesheet]",
        requiresJWT: true,
      },
      {
        name: "schema",
        description:
          "Retrieves the raw GraphQL Schema Definition Language (SDL) string defining all available types, fields, relationships, and queries. Use this query tool when you need to inspect the full data schema, understand available object properties, verify supported arguments, or validate type definitions before dynamically constructing valid GraphQL queries in the agent workflow.",
        instruction:
          "Use this introspection tool when you need to inspect the complete GraphQL Schema Definition Language (SDL) string for the application. It takes no arguments and returns the raw SDL defining all object types (including Employee and Timesheet), scalar fields, and query signatures. Call this tool when you are uncertain about available field names, data types, or relationships, and use the returned schema definition to construct valid, error-free GraphQL queries with precise field selections.",
        arguments: [],
        returnType: "String",
      },
    ],
  };
}

const GRAPHQL_SCHEMA_SDL = `
  type Employee {
    id: ID!
    first_name: String
    last_name: String
    email: String
    role: String
    designation: String
    department_name: String
    phone_number: String
    reporting_manager_id: Int
    employee_id: String
    status: String
    joining_date: String
    date_of_birth: String
    gender: String
    marital_status: String
    current_address: String
    permanent_address: String
    emergency_contact_name: String
    emergency_contact_number: String
    blood_group: String
    bank_account_number: String
    bank_name: String
    ifsc_code: String
    pan_number: String
    aadhaar_number: String
    uan_number: String
    pf_number: String
    esi_number: String
    employment_type: String
    probation_period: Int
    notice_period: Int
    confirmation_date: String
    salary: Float
    variable_pay: Float
    loss_of_days: Int
    exit_date: String
    termination_reason: String
    resignation_note: String
    comments: String
    profile_image: String
  }

  type Timesheet {
    id: ID!
    employee_id: Int!
    project_id: Int
    project_name: String
    client_name: String
    date: String
    week_start_date: String
    week_end_date: String
    timesheet_type: String
    total_hours: Float
    work_description: String
    notes: String
    status: String
    submission_date: String
    rejection_reason: String
    rejected_by: Int
    rejected_at: String
    approved_by: Int
    approved_at: String
    verified_by: Int
    verified_at: String
  }

  type Query {
    schema: String
    employeeIds(name: String): [Int!]!
    employeeId(name: String): Int
    employee(id: ID, name: String): Employee
    employees(name: String, limit: Int): [Employee!]!
    employeeDetails(id: ID!): Employee
    timesheets(empId: ID!, jwt: String, startDate: String, endDate: String, start_date: String, end_date: String, status: String): [Timesheet!]!
  }
`;

// Attempt to load official graphql package if available in the environment
let graphqlLib = null;
let compiledSchema = null;
try {
  graphqlLib = require("graphql");
  if (graphqlLib && graphqlLib.buildSchema) {
    compiledSchema = graphqlLib.buildSchema(GRAPHQL_SCHEMA_SDL);
  }
} catch (_) {
  graphqlLib = null;
}

/**
 * Built-in lightweight GraphQL selection parser (no external dependencies required)
 */
function parseGraphQLSelection(queryStr) {
  const clean = String(queryStr || "")
    .replace(/#[^\r\n]*/g, "")
    .trim();
  const startIdx = clean.indexOf("{");
  const endIdx = clean.lastIndexOf("}");
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error("Syntax Error: Expected GraphQL query body inside { }");
  }

  const inner = clean.slice(startIdx + 1, endIdx).trim();
  return parseFields(inner);
}

function parseFields(str) {
  const fields = [];
  let i = 0;
  const len = str.length;

  function skipWhitespace() {
    while (i < len && /[\s,]/.test(str[i])) i++;
  }

  while (i < len) {
    skipWhitespace();
    if (i >= len) break;

    let nameMatch = "";
    while (i < len && /[a-zA-Z0-9_]/.test(str[i])) {
      nameMatch += str[i++];
    }

    if (!nameMatch) {
      i++;
      continue;
    }

    skipWhitespace();

    let alias = null;
    let fieldName = nameMatch;
    if (i < len && str[i] === ":") {
      i++;
      skipWhitespace();
      let realName = "";
      while (i < len && /[a-zA-Z0-9_]/.test(str[i])) {
        realName += str[i++];
      }
      alias = fieldName;
      fieldName = realName;
      skipWhitespace();
    }

    let args = {};
    if (i < len && str[i] === "(") {
      i++;
      let argDepth = 1;
      let argStr = "";
      while (i < len && argDepth > 0) {
        if (str[i] === "(") argDepth++;
        else if (str[i] === ")") {
          argDepth--;
          if (argDepth === 0) {
            i++;
            break;
          }
        }
        argStr += str[i++];
      }
      args = parseArguments(argStr);
      skipWhitespace();
    }

    let subFields = null;
    if (i < len && str[i] === "{") {
      i++;
      let subDepth = 1;
      let subStr = "";
      while (i < len && subDepth > 0) {
        if (str[i] === "{") subDepth++;
        else if (str[i] === "}") {
          subDepth--;
          if (subDepth === 0) {
            i++;
            break;
          }
        }
        subStr += str[i++];
      }
      subFields = parseFields(subStr);
    }

    fields.push({
      name: fieldName,
      alias: alias || fieldName,
      args,
      subFields,
    });
  }

  return fields;
}

function parseArguments(argStr) {
  const args = {};
  const regex =
    /([a-zA-Z0-9_]+)\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\$?[a-zA-Z0-9_.-]+|\[[^\]]*\]|\{[^}]*\})/g;
  let match;
  while ((match = regex.exec(argStr)) !== null) {
    const key = match[1];
    const rawVal = match[2].trim();
    if (
      (rawVal.startsWith('"') && rawVal.endsWith('"')) ||
      (rawVal.startsWith("'") && rawVal.endsWith("'"))
    ) {
      args[key] = rawVal.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
    } else if (rawVal === "true") {
      args[key] = true;
    } else if (rawVal === "false") {
      args[key] = false;
    } else if (rawVal === "null") {
      args[key] = null;
    } else if (!isNaN(Number(rawVal))) {
      args[key] = Number(rawVal);
    } else {
      args[key] = rawVal;
    }
  }
  return args;
}

function filterSubfields(item, subFields, typeName = "Employee") {
  if (!item || typeof item !== "object") return item;
  if (!subFields || subFields.length === 0) return item;
  if (Array.isArray(item)) {
    return item.map((entry) => filterSubfields(entry, subFields, typeName));
  }
  const result = {};
  for (const sf of subFields) {
    if (sf.name === "__typename") {
      result[sf.alias || "__typename"] = typeName;
      continue;
    }
    const val = item[sf.name] !== undefined ? item[sf.name] : null;
    result[sf.alias || sf.name] = sf.subFields
      ? filterSubfields(val, sf.subFields, typeName)
      : val;
  }
  return result;
}

/**
 * Retrieve employee record directly by employee table primary key id.
 */
async function getEmployeeRecordById(empId) {
  if (!empId) return null;
  const records = await getEmployeeRecordsByIds([empId]);
  return records[0] || null;
}

async function getEmployeeRecordsByIds(empIds, existingConnection = null) {
  if (!empIds.length) return [];
  const ids = empIds.map(normalizeEmployeeId);
  let c = existingConnection;
  try {
    if (!c) c = await db();
    const recordsById = new Map();
    // Bound SQL parameter counts without changing the caller's result limit.
    for (let offset = 0; offset < ids.length; offset += 500) {
      const batch = ids.slice(offset, offset + 500);
      const placeholders = batch.map(() => "?").join(", ");
      const [rows] = await c.query(
        `SELECT ${EMPLOYEE_COLUMNS} FROM employees WHERE id IN (${placeholders})`,
        batch,
      );
      for (const row of rows || []) {
        recordsById.set(Number(row.id), filterEmployeeAttributes(row));
      }
    }
    return ids.map((id) => recordsById.get(id)).filter(Boolean);
  } finally {
    if (!existingConnection) await closeConnection(c);
  }
}

async function getEmployeesByName({ name, limit }) {
  const searchName = normalizeSearchName(name);
  if (!searchName) return [];
  const max = limit == null ? null : Number(limit);
  if (max !== null && (!Number.isSafeInteger(max) || max <= 0)) {
    throw new Error("Limit must be a positive integer");
  }

  let c;
  try {
    c = await db();
    const ids = await fetchEmployeeIdsByName(searchName, c, max);
    return await getEmployeeRecordsByIds(ids, c);
  } finally {
    await closeConnection(c);
  }
}

const GRAPHQL_ROOT_RESOLVERS = {
  schema: () => GRAPHQL_SCHEMA_SDL,
  employeeIds: ({ name }) => fetchEmployeeIdsByName(name || ""),
  employeeId: async ({ name }) => {
    const ids = await fetchEmployeeIdsByName(name || "", null, 1);
    return ids[0] ?? null;
  },
  employeeDetails: ({ id }) => getEmployeeRecordById(id),
  employee: async ({ id, name }) => {
    if (id) return getEmployeeRecordById(id);
    if (!name) return null;
    const ids = await fetchEmployeeIdsByName(name, null, 1);
    return ids.length ? getEmployeeRecordById(ids[0]) : null;
  },
  employees: getEmployeesByName,
  timesheets: (args) =>
    getUserTimeSheet(args.empId || args.employee_id || args.id, args),
};

/**
 * Built-in GraphQL execution engine fallback
 */
async function executeBuiltinGraphQL(queryStr, variables = {}) {
  const fields = parseGraphQLSelection(queryStr);
  const data = {};
  const errors = [];

  for (const field of fields) {
    try {
      const resolvedArgs = {};
      for (const [k, v] of Object.entries(field.args || {})) {
        if (typeof v === "string" && v.startsWith("$")) {
          const varName = v.slice(1);
          resolvedArgs[k] =
            variables[varName] !== undefined ? variables[varName] : null;
        } else {
          resolvedArgs[k] = v;
        }
      }

      if (field.name === "__schema" || field.name === "__type") {
        data[field.alias] = {
          queryType: { name: "Query" },
          types: [
            { name: "Query", kind: "OBJECT" },
            { name: "Employee", kind: "OBJECT" },
            { name: "Timesheet", kind: "OBJECT" },
          ],
        };
        continue;
      }
      if (field.name === "schema" || field.name === "_schema") {
        data[field.alias] = GRAPHQL_SCHEMA_SDL;
        continue;
      }
      if (field.name === "__typename") {
        data[field.alias] = "Query";
        continue;
      }

      if (
        !Object.prototype.hasOwnProperty.call(
          GRAPHQL_ROOT_RESOLVERS,
          field.name,
        )
      ) {
        throw new Error(`Cannot query field "${field.name}" on type "Query".`);
      }

      if (field.name === "employees") {
        // Preserve the lightweight executor's existing default page size.
        resolvedArgs.limit = Number(resolvedArgs.limit) || 20;
      } else if (field.name === "timesheets") {
        resolvedArgs.jwt =
          resolvedArgs.jwt ||
          resolvedArgs.token ||
          variables.jwt ||
          variables.token;
        resolvedArgs.startDate =
          resolvedArgs.startDate ||
          resolvedArgs.start_date ||
          variables.startDate ||
          variables.start_date;
        resolvedArgs.endDate =
          resolvedArgs.endDate ||
          resolvedArgs.end_date ||
          variables.endDate ||
          variables.end_date;
      }

      const value = await GRAPHQL_ROOT_RESOLVERS[field.name](resolvedArgs);
      const typeName = field.name === "timesheets" ? "Timesheet" : "Employee";
      data[field.alias] = filterSubfields(value, field.subFields, typeName);
    } catch (fieldErr) {
      errors.push({
        message: fieldErr.message,
        path: [field.alias || field.name],
      });
      data[field.alias] = null;
    }
  }

  const result = { data };
  if (errors.length > 0) {
    result.errors = errors;
  }
  return result;
}

/**
 * Universal GraphQL query executor supporting both official graphql package and built-in fallback.
 */
async function executeGraphQL({ query, variables = {}, operationName = null }) {
  if (!query || typeof query !== "string" || !query.trim()) {
    return { errors: [{ message: "A query must be provided." }] };
  }

  try {
    if (graphqlLib && compiledSchema) {
      return await graphqlLib.graphql({
        schema: compiledSchema,
        source: query,
        rootValue: GRAPHQL_ROOT_RESOLVERS,
        variableValues: variables,
        operationName,
      });
    }
    return await executeBuiltinGraphQL(query, variables);
  } catch (err) {
    return { errors: [{ message: err.message }] };
  }
}

/**
 * Extract GraphQL params from request (JSON body, urlencoded, query params, or raw text)
 */
function extractGraphQLRequest(req) {
  let query = "";
  let variables = {};
  let operationName = null;

  if (req.body && typeof req.body === "object") {
    if (req.body.query) {
      query = req.body.query;
      variables = req.body.variables || {};
      operationName = req.body.operationName || null;
    } else {
      for (const key of Object.keys(req.body)) {
        const trimmed = key.trim();
        if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
          try {
            const parsed = JSON.parse(trimmed);
            if (parsed.query) {
              query = parsed.query;
              variables = parsed.variables || {};
              operationName = parsed.operationName || null;
              break;
            }
          } catch (_) {}
        }
      }
    }
  }

  if (!query && typeof req.body === "string" && req.body.trim()) {
    try {
      const parsed = JSON.parse(req.body);
      if (parsed.query) {
        query = parsed.query;
        variables = parsed.variables || {};
        operationName = parsed.operationName || null;
      }
    } catch (_) {
      query = req.body.trim();
    }
  }

  if (!query && req.query) {
    if (req.query.query) query = req.query.query;
    if (req.query.operationName) operationName = req.query.operationName;
    if (req.query.variables) {
      if (typeof req.query.variables === "string") {
        try {
          variables = JSON.parse(req.query.variables);
        } catch (_) {}
      } else if (typeof req.query.variables === "object") {
        variables = req.query.variables;
      }
    }
  }

  if (typeof variables === "string") {
    try {
      variables = JSON.parse(variables);
    } catch (_) {
      variables = {};
    }
  }

  return { query, variables: variables || {}, operationName };
}

// Separate GraphQL endpoint supporting POST and GET
router.all("/graphql", authMiddleware, async (req, res) => {
  try {
    if (!checkAccess(req)) {
      return res.json("bye");
    }
    const { query, variables, operationName } = extractGraphQLRequest(req);
    if (!query) {
      return res.status(200).json({
        data: {
          __schema: getAvailableGraphQLQueries(),
        },
      });
    }
    const result = await executeGraphQL({ query, variables, operationName });
    const statusCode = result.errors && !result.data ? 400 : 200;
    return res.status(statusCode).json(result);
  } catch (err) {
    return res.status(500).json({ errors: [{ message: err.message }] });
  }
});

module.exports = {
  router,
  createAiCredsIfNotExist,
  checkAccess,
  executeGraphQL,
  fetchEmployeeIdsByName,
  fetchEmployeeIdByName: fetchEmployeeIdsByName,
  getEmployeeIdByName: fetchEmployeeIdsByName,
  getEmployeeDetails,
  getUserTimeSheet,
  GRAPHQL_SCHEMA_SDL,
  getAvailableGraphQLQueries,
};
