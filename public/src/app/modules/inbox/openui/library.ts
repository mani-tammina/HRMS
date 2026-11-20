import { createLibrary, defineComponent, tagSchemaId } from '@openuidev/angular-lang';
import { buildInboxOpenUiLibrary, promptOptions } from './schema.mjs';
import {
  OpenUiActionButtonsComponent,
  OpenUiCalloutComponent,
  OpenUiGridComponent,
  OpenUiGuideStepsComponent,
  OpenUiKeyValueListComponent,
  OpenUiProgressListComponent,
  OpenUiRequestCardComponent,
  OpenUiResponseComponent,
  OpenUiSectionComponent,
  OpenUiSummaryCardComponent,
  OpenUiTabItemComponent,
  OpenUiTabsComponent,
  OpenUiTextBlockComponent,
} from './components';
import {
  OpenUiBarChartComponent,
  OpenUiLineChartComponent,
  OpenUiPieChartComponent,
} from './chart-components';
import { OpenUiDataTableComponent } from './data-table.component';

export const inboxOpenUiLibrary = buildInboxOpenUiLibrary({
  createLibrary,
  defineComponent,
  tagSchemaId,
  components: {
    Response: OpenUiResponseComponent,
    Section: OpenUiSectionComponent,
    Grid: OpenUiGridComponent,
    Tabs: OpenUiTabsComponent,
    TabItem: OpenUiTabItemComponent,
    TextBlock: OpenUiTextBlockComponent,
    Callout: OpenUiCalloutComponent,
    SummaryCard: OpenUiSummaryCardComponent,
    RequestCard: OpenUiRequestCardComponent,
    KeyValueList: OpenUiKeyValueListComponent,
    ProgressList: OpenUiProgressListComponent,
    DataTable: OpenUiDataTableComponent,
    BarChart: OpenUiBarChartComponent,
    LineChart: OpenUiLineChartComponent,
    PieChart: OpenUiPieChartComponent,
    GuideSteps: OpenUiGuideStepsComponent,
    ActionButtons: OpenUiActionButtonsComponent,
  },
});

let cachedSystemPrompt: string | null = null;

export function getInboxOpenUiSystemPrompt(): string {
  if (!cachedSystemPrompt) {
    cachedSystemPrompt = inboxOpenUiLibrary.prompt({
      ...promptOptions,
      additionalRules: [
        ...promptOptions.additionalRules,
        'Return ONLY raw valid OpenUI Lang statements starting with `root = Response([...])`. Do not wrap in markdown code fences or add text outside OpenUI statements.',
      ],
    });
  }
  return cachedSystemPrompt;
}
