/**
 * SWAGGER PARTIAL: SEPARATION & EXIT MANAGEMENT MODULE
 * Auto-merged into main Swagger specifications by swagger.spec.js
 */

module.exports = {
  paths: {
    "/api/separation/notice-periods": {
      get: {
        summary: "📋 Get all department notice period configurations",
        description: "Fetch list of notice period days configured for each department (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of notice period configurations",
            content: {
              "application/json": {
                example: [
                  {
                    id: 1,
                    department_id: 3,
                    notice_period_days: 60,
                    is_active: 1,
                    department_name: "Engineering"
                  }
                ]
              }
            }
          }
        }
      },
      post: {
        summary: "➕ Create or update notice period configuration",
        description: "Save notice period days configuration for a department (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["department_id", "notice_period_days"],
                properties: {
                  department_id: { type: "integer", example: 3 },
                  notice_period_days: { type: "integer", example: 60 },
                  is_active: { type: "integer", enum: [0, 1], example: 1 }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Notice period configuration saved",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Notice period configuration saved successfully"
                }
              }
            }
          }
        }
      }
    },
    "/api/separation/notice-periods/{id}": {
      get: {
        summary: "🔍 Get notice period configuration by ID",
        description: "Fetch a specific notice period configuration details by ID (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "Notice period configuration details",
            content: {
              "application/json": {
                example: {
                  id: 1,
                  department_id: 3,
                  notice_period_days: 60,
                  is_active: 1,
                  department_name: "Engineering"
                }
              }
            }
          }
        }
      },
      put: {
        summary: "✏️ Update notice period configuration by ID",
        description: "Update notice period days and active status for an existing configuration by ID (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["notice_period_days"],
                properties: {
                  notice_period_days: { type: "integer", example: 45 },
                  is_active: { type: "integer", enum: [0, 1], example: 1 }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Notice period configuration updated successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Notice period configuration updated successfully"
                }
              }
            }
          }
        }
      },
      delete: {
        summary: "🗑️ Delete notice period configuration",
        description: "Delete notice period configuration by config ID (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "Notice period configuration deleted",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Notice period configuration deleted successfully"
                }
              }
            }
          }
        }
      }
    },
    "/api/separation/apply": {
      post: {
        summary: "📝 Apply for Resignation",
        description: "Submit resignation request (Employee only). Transitions EmploymentStatus to 'Resignation Initiated'.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["discussed_with_manager", "reason"],
                properties: {
                  discussed_with_manager: { type: "string", enum: ["Yes", "No"], example: "Yes" },
                  discussion_summary: { type: "string", example: "Discussed career path with reporting manager." },
                  reason: { type: "string", example: "Career Growth" },
                  early_relieving_request: { type: "string", enum: ["Yes", "No"], example: "No" },
                  preferred_last_working_date: { type: "string", format: "date", example: "2026-08-31" },
                  additional_comments: { type: "string", example: "Thank you for the support." }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Resignation submitted successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Resignation request submitted successfully."
                }
              }
            }
          }
        }
      }
    },
    "/api/separation/my": {
      get: {
        summary: "🚪 Get logged-in employee resignation request",
        description: "Fetch details of the logged-in employee's active resignation request and timeline progress.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Active resignation details",
            content: {
              "application/json": {
                example: {
                  id: 12,
                  employee_id: 569,
                  discussed_with_manager: "Yes",
                  discussion_summary: "Wants to pursue higher studies",
                  reason: "Higher Studies",
                  early_relieving_request: "No",
                  preferred_last_working_date: null,
                  additional_comments: null,
                  notice_period_days: 60,
                  calculated_last_working_date: "2026-08-22",
                  status: "Submitted",
                  current_workflow_step: "Manager Review",
                  manager_action: "Pending",
                  hr_action: "Pending",
                  manager_first_name: "Jane",
                  manager_last_name: "Doe",
                  clearanceProgress: {
                    total: 0,
                    completed: 0
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/separation/cancel": {
      post: {
        summary: "❌ Cancel Resignation request",
        description: "Cancel active pending resignation request. Restores employee EmploymentStatus to 'Working'.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Resignation cancelled successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Resignation cancelled successfully."
                }
              }
            }
          }
        }
      }
    },
    "/api/separation/requests": {
      get: {
        summary: "🔍 Get Resignation Requests",
        description: "Get list of resignation requests for the dashboard. Managers see their reportees, HR/Admins see all.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "employee", in: "query", schema: { type: "string" }, description: "Search by employee name or code" },
          { name: "department", in: "query", schema: { type: "integer" }, description: "Filter by department ID" },
          { name: "status", in: "query", schema: { type: "string" }, description: "Filter by resignation status" }
        ],
        responses: {
          200: {
            description: "List of resignation requests"
          }
        }
      }
    },
    "/api/separation/requests/{id}": {
      get: {
        summary: "👁️ Get Resignation Details",
        description: "Fetch detailed information of a specific resignation request.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: {
            description: "Detailed resignation request payload"
          }
        }
      }
    },
    "/api/separation/requests/{id}/action": {
      post: {
        summary: "⚖️ Action Resignation Request",
        description: "Approve, reject, or send back a resignation request (Reporting Managers and HR/Admins).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["action"],
                properties: {
                  action: { type: "string", enum: ["Approve", "Reject", "Send Back"], example: "Approve" },
                  remarks: { type: "string", example: "Discussion completed. Approving exit workflow." },
                  hr_notice_period_days: { type: "integer", example: 30, description: "Only applicable for HR Approve action" },
                  hr_last_working_date: { type: "string", format: "date", example: "2026-07-31", description: "Only applicable for HR Approve action" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Workflow step completed successfully"
          }
        }
      }
    },
    "/api/separation/clearance/{resignationId}": {
      get: {
        summary: "✅ Get Clearance Tasks Checklist",
        description: "Retrieve departmental exit clearance checklist tasks.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "resignationId", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: {
            description: "List of clearance tasks"
          }
        }
      }
    },
    "/api/separation/clearance/{resignationId}/task/{taskId}": {
      put: {
        summary: "✏️ Update Clearance Task Status",
        description: "Mark a departmental clearance task status (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "resignationId", in: "path", required: true, schema: { type: "integer" } },
          { name: "taskId", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: { type: "string", enum: ["Pending", "In Progress", "Completed"], example: "Completed" },
                  remarks: { type: "string", example: "All IT assets handed over." }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Clearance task successfully updated"
          }
        }
      }
    },
    "/api/separation/settlement/{resignationId}": {
      get: {
        summary: "💵 Get F&F Settlement Worksheet",
        description: "Get calculations for full and final settlement (Pending Salary, Encashment, Deductions).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "resignationId", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: {
            description: "Settlement worksheet detail object"
          }
        }
      },
      post: {
        summary: "💾 Save/Process F&F Settlement",
        description: "Calculate and save F&F settlement worksheet (HR/Admin only). Clearance tasks must be completed first.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "resignationId", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pending_salary: { type: "number", example: 45000.00 },
                  leave_encashment: { type: "number", example: 12000.00 },
                  bonus: { type: "number", example: 5000.00 },
                  recoveries: { type: "number", example: 0.00 },
                  deductions: { type: "number", example: 1500.00 },
                  remarks: { type: "string", example: "Settled for 15 days pending salary and leave encashment." }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "F&F Settlement saved successfully"
          }
        }
      }
    },
    "/api/separation/settlement/{resignationId}/status": {
      put: {
        summary: "💳 Pay F&F Settlement & Relieve Employee",
        description: "Mark settlement status as Paid (HR/Admin only). Restores/marks employee and resignation status to 'Relieved'.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "resignationId", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: { type: "string", enum: ["Paid"], example: "Paid" },
                  payment_reference: { type: "string", example: "TXN-982314981" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Full and Final payment logged, employee relieved"
          }
        }
      }
    },
    "/api/separation/reasons": {
      get: {
        summary: "📋 Get all resignation reasons",
        description: "Fetch list of all resignation reasons (active and inactive).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of resignation reasons",
            content: {
              "application/json": {
                example: [
                  {
                    id: 1,
                    reason: "Career Growth",
                    description: "Opportunities for promotion or development",
                    is_active: 1
                  }
                ]
              }
            }
          }
        }
      },
      post: {
        summary: "➕ Create a new resignation reason",
        description: "Create a new resignation reason (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["reason"],
                properties: {
                  reason: { type: "string", example: "Better Work Hours" },
                  description: { type: "string", example: "Seeking more balanced or flexible work hours." },
                  is_active: { type: "integer", enum: [0, 1], example: 1 }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Resignation reason created successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  id: 11,
                  message: "Resignation reason created successfully"
                }
              }
            }
          }
        }
      }
    },
    "/api/separation/reasons/active": {
      get: {
        summary: "📋 Get active resignation reasons",
        description: "Fetch list of active resignation reasons to populate resignation form dropdowns.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of active resignation reasons",
            content: {
              "application/json": {
                example: [
                  {
                    id: 1,
                    reason: "Career Growth",
                    description: null,
                    is_active: 1
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/api/separation/reasons/{id}": {
      get: {
        summary: "🔍 Get resignation reason by ID",
        description: "Fetch a specific resignation reason's details by ID.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "Resignation reason details"
          }
        }
      },
      put: {
        summary: "✏️ Update resignation reason details by ID",
        description: "Edit resignation reason details and active status configuration by ID (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["reason"],
                properties: {
                  reason: { type: "string", example: "Career Growth & Development" },
                  description: { type: "string", example: "Looking for career growth and professional development." },
                  is_active: { type: "integer", enum: [0, 1], example: 1 }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Resignation reason updated successfully"
          }
        }
      },
      delete: {
        summary: "🗑️ Delete resignation reason by ID",
        description: "Delete resignation reason by ID (HR/Admin only). If it is in use, it will be deactivated instead.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "Resignation reason deleted or deactivated"
          }
        }
      }
    },
    "/api/separation/settings": {
      get: {
        summary: "⚙️ Get all resignation settings",
        description: "Fetch general configurations for the resignation module.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Resignation settings key-value map",
            content: {
              "application/json": {
                example: {
                  allow_employee_resign: true,
                  allow_employee_withdraw: true,
                  allow_early_lwd: true,
                  show_reviewer_status: true,
                  notallowholiday_weekend: true,
                }
              }
            }
          }
        }
      },
      put: {
        summary: "⚙️ Update resignation settings",
        description: "Update general configurations for the resignation module (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  allow_employee_resign: { type: "boolean", example: true },
                  allow_employee_withdraw: { type: "boolean", example: true },
                  allow_early_lwd: { type: "boolean", example: true },
                  show_reviewer_status: { type: "boolean", example: true },
                  notallowholiday_weekend: { type: "boolean", example: true },
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Resignation settings updated successfully"
          }
        }
      }
    },
    "/api/separation/notice-period-leaves": {
      get: {
        summary: "⚙️ Get notice period leave type configurations",
        description: "Fetch all active leave plans and whether their allocated leave types are allowed during notice periods.",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of leave plans with their leave types notice period configurations",
            content: {
              "application/json": {
                example: [
                  {
                    id: 1,
                    name: "Standard Plan",
                    description: "Standard Leave Plan for Fulltime",
                    leaves: [
                      {
                        leave_type_id: 1,
                        type_name: "Casual Leave",
                        type_code: "CL",
                        is_allowed: true
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      put: {
        summary: "⚙️ Update notice period leave type configurations",
        description: "Update which leave types can be applied for during notice periods per plan (HR/Admin only).",
        tags: ["🚪 Separation & Exit"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  required: ["leave_plan_id", "leave_type_id", "is_allowed"],
                  properties: {
                    leave_plan_id: { type: "integer", example: 1 },
                    leave_type_id: { type: "integer", example: 1 },
                    is_allowed: { type: "boolean", example: true }
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Notice period leave settings updated successfully"
          }
        }
      }
    }
  }
};

