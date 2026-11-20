import { z } from "zod/v4";

export const TextBlockSchema = z.object({
  content: z.string(),
  tone: z.enum(["default", "info", "success", "warning"]).optional(),
});

export const CalloutSchema = z.object({
  title: z.string(),
  content: z.string(),
  tone: z.enum(["info", "success", "warning", "danger"]).optional(),
});

export const SummaryMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  tone: z.enum(["default", "primary", "warning", "success", "danger"]).optional(),
});

export const SummaryCardSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  metrics: z.array(SummaryMetricSchema),
  summary: z.string().optional(),
});

export const RequestCardSchema = z.object({
  employeeName: z.string(),
  requestType: z.string(),
  status: z.string(),
  submittedDate: z.string().optional(),
  dateRange: z.string().optional(),
  description: z.string().optional(),
  actionHint: z.string().optional(),
});

export const KeyValueItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  tone: z.enum(["default", "primary", "success", "warning", "danger"]).optional(),
});

export const KeyValueListSchema = z.object({
  title: z.string(),
  items: z.array(KeyValueItemSchema),
  subtitle: z.string().optional(),
});

export const ProgressItemSchema = z.object({
  label: z.string(),
  value: z.number(),
  max: z.number().optional(),
  displayValue: z.string().optional(),
  tone: z.enum(["default", "primary", "success", "warning", "danger"]).optional(),
});

export const ProgressListSchema = z.object({
  title: z.string(),
  items: z.array(ProgressItemSchema),
  subtitle: z.string().optional(),
});

export const DataTableCellSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

export const DataTableSchema = z.object({
  title: z.string(),
  columns: z.array(z.string()),
  rows: z.array(z.array(DataTableCellSchema)),
  subtitle: z.string().optional(),
  pageSize: z.number().optional(),
  exportFileName: z.string().optional(),
});

export const ChartSeriesSchema = z.object({
  name: z.string(),
  values: z.array(z.number()),
  color: z.string().optional(),
});

export const BarChartSchema = z.object({
  title: z.string(),
  labels: z.array(z.string()),
  series: z.array(ChartSeriesSchema),
  subtitle: z.string().optional(),
  horizontal: z.boolean().optional(),
  stacked: z.boolean().optional(),
  yAxisLabel: z.string().optional(),
});

export const LineChartSchema = z.object({
  title: z.string(),
  labels: z.array(z.string()),
  series: z.array(ChartSeriesSchema),
  subtitle: z.string().optional(),
  smooth: z.boolean().optional(),
  filled: z.boolean().optional(),
  yAxisLabel: z.string().optional(),
});

export const PieSliceSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string().optional(),
});

export const PieChartSchema = z.object({
  title: z.string(),
  slices: z.array(PieSliceSchema),
  subtitle: z.string().optional(),
  donut: z.boolean().optional(),
});

export const GuideStepItemSchema = z.object({
  title: z.string(),
  detail: z.string(),
});

export const GuideStepsSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  steps: z.array(GuideStepItemSchema),
  tip: z.string().optional(),
});

export const ActionParamsSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  employeeId: z.number().optional(),
  url: z.string().optional(),
});

export const ActionButtonItemSchema = z.object({
  label: z.string(),
  prompt: z.string(),
  variant: z.enum(["primary", "secondary", "outline"]).optional(),
  actionType: z
    .enum(["prompt", "export_timesheet", "export_attendance", "export_leaves", "open_url"])
    .optional(),
  params: ActionParamsSchema.optional(),
});

export const ActionButtonsSchema = z.object({
  buttons: z.array(ActionButtonItemSchema),
});

export const definitions = {
  TextBlock: {
    description: "Concise prose message or explanation (no tables or ASCII charts).",
    props: TextBlockSchema,
  },
  Callout: {
    description: "Highlighted alert banner with title and body.",
    props: CalloutSchema,
  },
  SummaryCard: {
    description: "KPI metrics card with labeled string values and optional note.",
    props: SummaryCardSchema,
  },
  RequestCard: {
    description: "Inbox request detail card (employee, type, status, dates, notes, hint).",
    props: RequestCardSchema,
  },
  KeyValueList: {
    description: "Structured 2-column metadata grid (employee profile, record details).",
    props: KeyValueListSchema,
  },
  ProgressList: {
    description: "Horizontal progress/share bars for breakdowns, balances, or quotas.",
    props: ProgressListSchema,
  },
  DataTable: {
    description:
      "Searchable, sortable, paginated table with built-in CSV/Excel export.",
    props: DataTableSchema,
  },
  BarChart: {
    description: "Interactive bar chart (vertical/horizontal, grouped/stacked).",
    props: BarChartSchema,
  },
  LineChart: {
    description: "Interactive line/area trend chart over dates or periods.",
    props: LineChartSchema,
  },
  PieChart: {
    description: "Interactive pie or donut chart for proportional splits.",
    props: PieChartSchema,
  },
  GuideSteps: {
    description: "Numbered step-by-step workflow guide.",
    props: GuideStepsSchema,
  },
  ActionButtons: {
    description:
      "Follow-up buttons or direct downloads via actionType + params.",
    props: ActionButtonsSchema,
  },
};

export const componentGroups = [
  {
    name: "Layout",
    components: ["Response", "Section", "Grid", "Tabs", "TabItem"],
    notes: [
      "Block = any component in Charts, Data, or Content groups. Use Tabs+TabItem for multi-view reports (e.g. Chart + Table) and Grid(children, 2) for side-by-side cards.",
    ],
  },
  {
    name: "Charts",
    components: ["BarChart", "LineChart", "PieChart", "ProgressList"],
    notes: [
      "Always use these for charts, comparisons, trends, or breakdowns — never draw ASCII charts in TextBlock.",
    ],
  },
  {
    name: "Data",
    components: ["DataTable", "SummaryCard", "RequestCard", "KeyValueList"],
    notes: [
      "Always use DataTable for multi-row records (timesheets, attendance, leaves, employees) — never pipe-separated text.",
    ],
  },
  {
    name: "Content & Actions",
    components: ["TextBlock", "Callout", "GuideSteps", "ActionButtons"],
    notes: [
      'For real Excel downloads use ActionButtons with actionType: "export_timesheet" and params: { startDate, endDate, employeeId }.',
    ],
  },
];

export function buildInboxOpenUiLibrary({
  createLibrary,
  defineComponent,
  tagSchemaId,
  components = {},
}) {
  const leafDefs = Object.entries(definitions).map(([name, definition]) =>
    defineComponent({
      name,
      ...definition,
      component: components[name] ?? null,
    })
  );

  const leafUnion = z.union(leafDefs.map((comp) => comp.ref));
  if (typeof tagSchemaId === "function") {
    tagSchemaId(leafUnion, "Block");
  }

  const Section = defineComponent({
    name: "Section",
    description: "Titled card section grouping related blocks.",
    props: z.object({
      title: z.string(),
      children: z.array(leafUnion),
      subtitle: z.string().optional(),
    }),
    component: components.Section ?? null,
  });

  const Grid = defineComponent({
    name: "Grid",
    description: "Responsive 1- or 2-column layout grid.",
    props: z.object({
      children: z.array(leafUnion),
      columns: z.number().optional(),
    }),
    component: components.Grid ?? null,
  });

  const TabItem = defineComponent({
    name: "TabItem",
    description: "Single tab panel inside Tabs.",
    props: z.object({
      label: z.string(),
      children: z.array(z.union([leafUnion, Section.ref, Grid.ref])),
    }),
    component: components.TabItem ?? null,
  });

  const Tabs = defineComponent({
    name: "Tabs",
    description: "Interactive tabbed container.",
    props: z.object({
      items: z.array(TabItem.ref),
    }),
    component: components.Tabs ?? null,
  });

  const Response = defineComponent({
    name: "Response",
    description: "Root container for every assistant message.",
    props: z.object({
      children: z.array(z.union([leafUnion, Section.ref, Grid.ref, Tabs.ref])),
    }),
    component: components.Response ?? null,
  });

  return createLibrary({
    root: "Response",
    components: [Response, Section, Grid, Tabs, TabItem, ...leafDefs],
    componentGroups,
  });
}

export const promptOptions = {
  preamble:
    "You are the HRMS Inbox Support Assistant. Always respond using valid OpenUI Lang starting with `root = Response([...])`. Use the richest matching UI components (BarChart, LineChart, PieChart, ProgressList, DataTable, Tabs, Grid, Section, SummaryCard, RequestCard, KeyValueList, Callout, GuideSteps, ActionButtons).",
  additionalRules: [
    "Keep SummaryCard metric values as strings (\"248.00\") and chart values as numbers (8).",
    "Combine SummaryCard + Tabs (Chart tab & DataTable tab) + ActionButtons for rich multi-part reports.",
    "Include an ActionButtons block at the end when helpful follow-ups or downloads apply.",
  ],
  examples: [
    `root = Response([summary, tabs, actions])
summary = SummaryCard("Jan 2026 Timesheet", "Emp 267 · 2026-01-01 to 2026-01-31", [{ label: "Records", value: "31", tone: "primary" }, { label: "Hours", value: "248.00", tone: "success" }])
tabs = Tabs([t1, t2])
t1 = TabItem("Hours Chart", [chart])
t2 = TabItem("Records", [tbl])
chart = BarChart("Daily Hours", ["Jan 01", "Jan 02"], [{ name: "Hours", values: [8, 8], color: "#3f51b5" }], "2026-01", false, false, "Hours")
tbl = DataTable("Timesheet Entries", ["Date", "Hours", "Status", "Work Description"], [["2026-01-01", 8, "verified", "Docs | Research"], ["2026-01-02", 8, "verified", "Dev | Testing"]], "31 records", 10, "timesheet-267-2026-01")
actions = ActionButtons([{ label: "Download Excel", prompt: "Download Excel", variant: "primary", actionType: "export_timesheet", params: { startDate: "2026-01-01", endDate: "2026-01-31", employeeId: 267 } }, { label: "Activity pie chart", prompt: "Show a pie chart of work activities", variant: "secondary" }])`,
  ],
};
