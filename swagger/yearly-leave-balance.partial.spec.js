/**
 * SWAGGER PARTIAL: YEARLY LEAVE BALANCES MODULE
 * Auto-merged into main Swagger specifications by swagger.spec.js
 */

module.exports = {
  paths: {
    "/api/yearly-leave-balances/my-balance": {
      get: {
        summary: "👤 Get Current Employee's Yearly Leave Balance",
        description: "Fetch yearly leave balance records for the currently authenticated employee.",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "year_period",
            in: "query",
            description: "Filter by period (e.g., '01-Apr-2026 - 31-Mar-2027')",
            required: false,
            schema: { type: "string", example: "01-Apr-2026 - 31-Mar-2027" }
          },
          {
            name: "policy_name",
            in: "query",
            description: "Filter by leave policy name",
            required: false,
            schema: { type: "string", example: "Dayshift Leave Policy" }
          }
        ],
        responses: {
          200: {
            description: "Employee yearly leave balance data fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    employee_number: { type: "string", example: "STSS-102" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/YearlyLeaveBalance" }
                    },
                    all_records: {
                      type: "array",
                      items: { $ref: "#/components/schemas/YearlyLeaveBalance" }
                    }
                  }
                }
              }
            }
          },
          404: {
            description: "Employee profile or employee number not found"
          },
          500: {
            description: "Server error"
          }
        }
      }
    },
    "/api/yearly-leave-balances/export/excel": {
      get: {
        summary: "📊 Export Yearly Leave Balances to Excel",
        description: "Generate and download an Excel spreadsheet (.xlsx) of all yearly leave balances with optional filters.",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "search", in: "query", description: "Search keyword", required: false, schema: { type: "string" } },
          { name: "department", in: "query", description: "Department filter", required: false, schema: { type: "string" } },
          { name: "location", in: "query", description: "Location filter", required: false, schema: { type: "string" } }
        ],
        responses: {
          200: {
            description: "Excel file download",
            content: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
                schema: { type: "string", format: "binary" }
              }
            }
          }
        }
      }
    },
    "/api/yearly-leave-balances": {
      get: {
        summary: "📋 Get All Yearly Leave Balances (Filtered & Paginated)",
        description: "Retrieve yearly leave balance records across all employees with optional search, department, location, policy filtering, and pagination.",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "search",
            in: "query",
            description: "Search term for employee number, name, department, location, or manager",
            required: false,
            schema: { type: "string" }
          },
          {
            name: "employee_number",
            in: "query",
            description: "Exact employee number filter",
            required: false,
            schema: { type: "string", example: "STSS-102" }
          },
          {
            name: "department",
            in: "query",
            description: "Filter by department",
            required: false,
            schema: { type: "string" }
          },
          {
            name: "location",
            in: "query",
            description: "Filter by work location",
            required: false,
            schema: { type: "string" }
          },
          {
            name: "policy_name",
            in: "query",
            description: "Filter by policy name",
            required: false,
            schema: { type: "string" }
          },
          {
            name: "year_period",
            in: "query",
            description: "Filter by financial/calendar year period",
            required: false,
            schema: { type: "string" }
          },
          {
            name: "page",
            in: "query",
            description: "Page number (default: 1)",
            required: false,
            schema: { type: "integer", default: 1 }
          },
          {
            name: "limit",
            in: "query",
            description: "Items per page (default: 50)",
            required: false,
            schema: { type: "integer", default: 50 }
          }
        ],
        responses: {
          200: {
            description: "List of yearly leave balance records",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/YearlyLeaveBalance" }
                    },
                    pagination: {
                      type: "object",
                      properties: {
                        total: { type: "integer", example: 72 },
                        page: { type: "integer", example: 1 },
                        limit: { type: "integer", example: 50 },
                        totalPages: { type: "integer", example: 2 }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "➕ Create Yearly Leave Balance Record Manually",
        description: "Manually insert a new yearly leave balance record (HR & Admin access).",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["employee_number", "employee_name"],
                properties: {
                  employee_number: { type: "string", example: "STSS-102" },
                  employee_name: { type: "string", example: "Muralidhar Chintada" },
                  job_title: { type: "string", example: "Software Engineer" },
                  business_unit: { type: "string", example: "Engineering" },
                  department: { type: "string", example: "Development" },
                  sub_department: { type: "string", example: "Frontend" },
                  location: { type: "string", example: "Visakhapatnam" },
                  cost_center: { type: "string", example: "CC-01" },
                  reporting_manager: { type: "string", example: "John Doe" },
                  policy_name: { type: "string", example: "Dayshift Leave Policy" },
                  year_period: { type: "string", example: "01-Apr-2026 - 31-Mar-2027" },
                  sick_leave_accrued: { type: "number", example: 6 },
                  sick_leave_consumed: { type: "number", example: 0 },
                  sick_leave_balance: { type: "string", example: "6" },
                  sick_leave_annual_quota: { type: "string", example: "6" },
                  casual_leave_accrued: { type: "number", example: 12 },
                  casual_leave_consumed: { type: "number", example: 1 },
                  casual_leave_balance: { type: "string", example: "11" },
                  casual_leave_annual_quota: { type: "string", example: "12" },
                  comp_offs_accrued: { type: "number", example: 0 },
                  comp_offs_consumed: { type: "number", example: 0 },
                  comp_offs_balance: { type: "string", example: "0" },
                  comp_offs_annual_quota: { type: "string", example: "0" },
                  marriage_leaves_accrued: { type: "number", example: 0 },
                  marriage_leaves_consumed: { type: "number", example: 0 },
                  marriage_leaves_balance: { type: "string", example: "2" },
                  marriage_leaves_annual_quota: { type: "string", example: "2" },
                  unpaid_leave_accrued: { type: "number", example: 0 },
                  unpaid_leave_consumed: { type: "number", example: 0 },
                  unpaid_leave_balance: { type: "string", example: "No Limit" },
                  unpaid_leave_annual_quota: { type: "string", example: "No Limit" },
                  bereavement_leave_accrued: { type: "number", example: 0 },
                  bereavement_leave_consumed: { type: "number", example: 0 },
                  bereavement_leave_balance: { type: "string", example: "2" },
                  bereavement_leave_annual_quota: { type: "string", example: "2" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Record created successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Yearly leave balance record created successfully",
                  id: 73
                }
              }
            }
          },
          400: { description: "Missing required fields" }
        }
      }
    },
    "/api/yearly-leave-balances/{id}": {
      get: {
        summary: "🔍 Get Yearly Leave Balance by ID",
        description: "Retrieve details of a specific leave balance record by its primary key ID.",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Record ID",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Leave balance record details",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/YearlyLeaveBalance" }
                  }
                }
              }
            }
          },
          404: { description: "Record not found" }
        }
      },
      put: {
        summary: "✏️ Update Yearly Leave Balance Record",
        description: "Update an existing yearly leave balance record by ID (HR & Admin access).",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Record ID",
            schema: { type: "integer", example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  employee_name: { type: "string" },
                  job_title: { type: "string" },
                  department: { type: "string" },
                  location: { type: "string" },
                  policy_name: { type: "string" },
                  year_period: { type: "string" },
                  sick_leave_accrued: { type: "number" },
                  sick_leave_consumed: { type: "number" },
                  sick_leave_balance: { type: "string" },
                  sick_leave_annual_quota: { type: "string" },
                  casual_leave_accrued: { type: "number" },
                  casual_leave_consumed: { type: "number" },
                  casual_leave_balance: { type: "string" },
                  casual_leave_annual_quota: { type: "string" },
                  comp_offs_accrued: { type: "number" },
                  comp_offs_consumed: { type: "number" },
                  comp_offs_balance: { type: "string" },
                  comp_offs_annual_quota: { type: "string" },
                  marriage_leaves_accrued: { type: "number" },
                  marriage_leaves_consumed: { type: "number" },
                  marriage_leaves_balance: { type: "string" },
                  marriage_leaves_annual_quota: { type: "string" },
                  unpaid_leave_accrued: { type: "number" },
                  unpaid_leave_consumed: { type: "number" },
                  unpaid_leave_balance: { type: "string" },
                  unpaid_leave_annual_quota: { type: "string" },
                  bereavement_leave_accrued: { type: "number" },
                  bereavement_leave_consumed: { type: "number" },
                  bereavement_leave_balance: { type: "string" },
                  bereavement_leave_annual_quota: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Record updated successfully",
            content: {
              "application/json": {
                example: { success: true, message: "Record updated successfully" }
              }
            }
          },
          404: { description: "Record not found" }
        }
      },
      delete: {
        summary: "🗑️ Delete Yearly Leave Balance Record",
        description: "Remove a yearly leave balance record from the system by ID (HR & Admin access).",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Record ID",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Record deleted successfully",
            content: {
              "application/json": {
                example: { success: true, message: "Record deleted successfully" }
              }
            }
          },
          404: { description: "Record not found" }
        }
      }
    },
    "/api/yearly-leave-balances/import": {
      post: {
        summary: "📤 Bulk Import/Upsert Yearly Leave Balances from Excel",
        description: "Upload an Excel file (.xlsx, .xls) containing YTD Leave Balance Report data to bulk insert or update records for all employees.",
        tags: ["📅 Yearly Leave Balances"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                    description: "Excel (.xlsx, .xls) file containing YTD leave balances"
                  }
                },
                required: ["file"]
              }
            }
          }
        },
        responses: {
          200: {
            description: "Excel file processed and balances imported/updated",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Excel import processed successfully. Inserted: 5, Updated: 67",
                  policy_name: "Dayshift Leave Policy",
                  year_period: "01-Apr-2026 - 31-Mar-2027"
                }
              }
            }
          },
          400: { description: "Invalid file or structure" },
          500: { description: "Server processing error" }
        }
      }
    }
  },
  components: {
    schemas: {
      YearlyLeaveBalance: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          employee_id: { type: "integer", nullable: true, example: 12 },
          employee_number: { type: "string", example: "STSS-102" },
          employee_name: { type: "string", example: "Muralidhar Chintada" },
          job_title: { type: "string", nullable: true, example: "Software Engineer" },
          business_unit: { type: "string", nullable: true, example: "Engineering" },
          department: { type: "string", nullable: true, example: "Development" },
          sub_department: { type: "string", nullable: true, example: "Frontend" },
          location: { type: "string", nullable: true, example: "Visakhapatnam" },
          cost_center: { type: "string", nullable: true, example: "CC-01" },
          reporting_manager: { type: "string", nullable: true, example: "Manager Name" },
          policy_name: { type: "string", example: "Dayshift Leave Policy" },
          year_period: { type: "string", example: "01-Apr-2026 - 31-Mar-2027" },
          sick_leave_accrued: { type: "number", example: 6 },
          sick_leave_consumed: { type: "number", example: 0 },
          sick_leave_balance: { type: "string", example: "6" },
          sick_leave_annual_quota: { type: "string", example: "6" },
          sick_leave_unit: { type: "string", example: "Days" },
          casual_leave_accrued: { type: "number", example: 12 },
          casual_leave_consumed: { type: "number", example: 1 },
          casual_leave_balance: { type: "string", example: "11" },
          casual_leave_annual_quota: { type: "string", example: "12" },
          casual_leave_unit: { type: "string", example: "Days" },
          comp_offs_accrued: { type: "number", example: 0 },
          comp_offs_consumed: { type: "number", example: 0 },
          comp_offs_balance: { type: "string", example: "0" },
          comp_offs_annual_quota: { type: "string", example: "0" },
          comp_offs_unit: { type: "string", example: "Days" },
          marriage_leaves_accrued: { type: "number", example: 0 },
          marriage_leaves_consumed: { type: "number", example: 0 },
          marriage_leaves_balance: { type: "string", example: "2" },
          marriage_leaves_annual_quota: { type: "string", example: "2" },
          marriage_leaves_unit: { type: "string", example: "Days" },
          unpaid_leave_accrued: { type: "number", example: 0 },
          unpaid_leave_consumed: { type: "number", example: 0 },
          unpaid_leave_balance: { type: "string", example: "No Limit" },
          unpaid_leave_annual_quota: { type: "string", example: "No Limit" },
          unpaid_leave_unit: { type: "string", example: "Days" },
          bereavement_leave_accrued: { type: "number", example: 0 },
          bereavement_leave_consumed: { type: "number", example: 0 },
          bereavement_leave_balance: { type: "string", example: "2" },
          bereavement_leave_annual_quota: { type: "string", example: "2" },
          bereavement_leave_unit: { type: "string", example: "Days" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" }
        }
      }
    }
  }
};
