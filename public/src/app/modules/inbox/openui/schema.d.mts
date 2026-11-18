import { z } from "zod/v4";
import type { ComponentGroup, DefinedComponent, Library, LibraryDefinition } from "@openuidev/lang-core";

export declare const TextBlockSchema: z.ZodObject<{
  content: z.ZodString;
  tone: z.ZodOptional<z.ZodEnum<{ default: "default"; info: "info"; success: "success"; warning: "warning" }>>;
}>;

export declare const CalloutSchema: z.ZodObject<{
  title: z.ZodString;
  content: z.ZodString;
  tone: z.ZodOptional<z.ZodEnum<{ info: "info"; success: "success"; warning: "warning"; danger: "danger" }>>;
}>;

export declare const SummaryMetricSchema: z.ZodObject<{
  label: z.ZodString;
  value: z.ZodString;
  tone: z.ZodOptional<
    z.ZodEnum<{
      default: "default";
      primary: "primary";
      warning: "warning";
      success: "success";
      danger: "danger";
    }>
  >;
}>;

export declare const SummaryCardSchema: z.ZodObject<{
  title: z.ZodString;
  subtitle: z.ZodOptional<z.ZodString>;
  metrics: z.ZodArray<typeof SummaryMetricSchema>;
  summary: z.ZodOptional<z.ZodString>;
}>;

export declare const RequestCardSchema: z.ZodObject<{
  employeeName: z.ZodString;
  requestType: z.ZodString;
  status: z.ZodString;
  submittedDate: z.ZodOptional<z.ZodString>;
  dateRange: z.ZodOptional<z.ZodString>;
  description: z.ZodOptional<z.ZodString>;
  actionHint: z.ZodOptional<z.ZodString>;
}>;

export declare const KeyValueItemSchema: z.ZodObject<{
  label: z.ZodString;
  value: z.ZodString;
  tone: z.ZodOptional<
    z.ZodEnum<{ default: "default"; primary: "primary"; success: "success"; warning: "warning"; danger: "danger" }>
  >;
}>;

export declare const KeyValueListSchema: z.ZodObject<{
  title: z.ZodString;
  items: z.ZodArray<typeof KeyValueItemSchema>;
  subtitle: z.ZodOptional<z.ZodString>;
}>;

export declare const ProgressItemSchema: z.ZodObject<{
  label: z.ZodString;
  value: z.ZodNumber;
  max: z.ZodOptional<z.ZodNumber>;
  displayValue: z.ZodOptional<z.ZodString>;
  tone: z.ZodOptional<
    z.ZodEnum<{ default: "default"; primary: "primary"; success: "success"; warning: "warning"; danger: "danger" }>
  >;
}>;

export declare const ProgressListSchema: z.ZodObject<{
  title: z.ZodString;
  items: z.ZodArray<typeof ProgressItemSchema>;
  subtitle: z.ZodOptional<z.ZodString>;
}>;

export declare const DataTableCellSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;

export declare const DataTableSchema: z.ZodObject<{
  title: z.ZodString;
  columns: z.ZodArray<z.ZodString>;
  rows: z.ZodArray<z.ZodArray<typeof DataTableCellSchema>>;
  subtitle: z.ZodOptional<z.ZodString>;
  pageSize: z.ZodOptional<z.ZodNumber>;
  exportFileName: z.ZodOptional<z.ZodString>;
}>;

export declare const ChartSeriesSchema: z.ZodObject<{
  name: z.ZodString;
  values: z.ZodArray<z.ZodNumber>;
  color: z.ZodOptional<z.ZodString>;
}>;

export declare const BarChartSchema: z.ZodObject<{
  title: z.ZodString;
  labels: z.ZodArray<z.ZodString>;
  series: z.ZodArray<typeof ChartSeriesSchema>;
  subtitle: z.ZodOptional<z.ZodString>;
  horizontal: z.ZodOptional<z.ZodBoolean>;
  stacked: z.ZodOptional<z.ZodBoolean>;
  yAxisLabel: z.ZodOptional<z.ZodString>;
}>;

export declare const LineChartSchema: z.ZodObject<{
  title: z.ZodString;
  labels: z.ZodArray<z.ZodString>;
  series: z.ZodArray<typeof ChartSeriesSchema>;
  subtitle: z.ZodOptional<z.ZodString>;
  smooth: z.ZodOptional<z.ZodBoolean>;
  filled: z.ZodOptional<z.ZodBoolean>;
  yAxisLabel: z.ZodOptional<z.ZodString>;
}>;

export declare const PieSliceSchema: z.ZodObject<{
  label: z.ZodString;
  value: z.ZodNumber;
  color: z.ZodOptional<z.ZodString>;
}>;

export declare const PieChartSchema: z.ZodObject<{
  title: z.ZodString;
  slices: z.ZodArray<typeof PieSliceSchema>;
  subtitle: z.ZodOptional<z.ZodString>;
  donut: z.ZodOptional<z.ZodBoolean>;
}>;

export declare const GuideStepItemSchema: z.ZodObject<{
  title: z.ZodString;
  detail: z.ZodString;
}>;

export declare const GuideStepsSchema: z.ZodObject<{
  title: z.ZodString;
  subtitle: z.ZodOptional<z.ZodString>;
  steps: z.ZodArray<typeof GuideStepItemSchema>;
  tip: z.ZodOptional<z.ZodString>;
}>;

export declare const ActionParamsSchema: z.ZodObject<{
  startDate: z.ZodOptional<z.ZodString>;
  endDate: z.ZodOptional<z.ZodString>;
  employeeId: z.ZodOptional<z.ZodNumber>;
  url: z.ZodOptional<z.ZodString>;
}>;

export declare const ActionButtonItemSchema: z.ZodObject<{
  label: z.ZodString;
  prompt: z.ZodString;
  variant: z.ZodOptional<z.ZodEnum<{ primary: "primary"; secondary: "secondary"; outline: "outline" }>>;
  actionType: z.ZodOptional<
    z.ZodEnum<{
      prompt: "prompt";
      export_timesheet: "export_timesheet";
      export_attendance: "export_attendance";
      export_leaves: "export_leaves";
      open_url: "open_url";
    }>
  >;
  params: z.ZodOptional<typeof ActionParamsSchema>;
}>;

export declare const ActionButtonsSchema: z.ZodObject<{
  buttons: z.ZodArray<typeof ActionButtonItemSchema>;
}>;

export declare const definitions: {
  TextBlock: { description: string; props: typeof TextBlockSchema };
  Callout: { description: string; props: typeof CalloutSchema };
  SummaryCard: { description: string; props: typeof SummaryCardSchema };
  RequestCard: { description: string; props: typeof RequestCardSchema };
  KeyValueList: { description: string; props: typeof KeyValueListSchema };
  ProgressList: { description: string; props: typeof ProgressListSchema };
  DataTable: { description: string; props: typeof DataTableSchema };
  BarChart: { description: string; props: typeof BarChartSchema };
  LineChart: { description: string; props: typeof LineChartSchema };
  PieChart: { description: string; props: typeof PieChartSchema };
  GuideSteps: { description: string; props: typeof GuideStepsSchema };
  ActionButtons: { description: string; props: typeof ActionButtonsSchema };
};

export declare const componentGroups: ComponentGroup[];

export declare function buildInboxOpenUiLibrary<C>(options: {
  createLibrary: (input: LibraryDefinition<C>) => Library<C>;
  defineComponent: <T extends z.ZodObject<any>>(config: {
    name: string;
    props: T;
    description: string;
    component: C;
  }) => DefinedComponent<T, C>;
  tagSchemaId?: (schema: object, id: string) => void;
  components?: Record<string, C>;
}): Library<C>;

export declare const promptOptions: {
  preamble: string;
  additionalRules: string[];
  examples: string[];
};
