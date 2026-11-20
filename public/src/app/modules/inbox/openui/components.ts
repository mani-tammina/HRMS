import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ElementNode,
  RenderNode,
  injectIsStreaming,
  injectOpenUiContext,
  injectTriggerAction,
} from '@openuidev/angular-lang';

export interface TextBlockProps {
  content?: string;
  tone?: 'default' | 'info' | 'success' | 'warning';
}

export interface CalloutProps {
  title?: string;
  content?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
}

export interface SummaryMetric {
  label?: string;
  value?: string;
  tone?: 'default' | 'primary' | 'warning' | 'success' | 'danger';
}

export interface SummaryCardProps {
  title?: string;
  subtitle?: string;
  metrics?: SummaryMetric[];
  summary?: string;
}

export interface RequestCardProps {
  employeeName?: string;
  requestType?: string;
  status?: string;
  submittedDate?: string;
  dateRange?: string;
  description?: string;
  actionHint?: string;
}

export interface KeyValueItem {
  label?: string;
  value?: string;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export interface KeyValueListProps {
  title?: string;
  items?: KeyValueItem[];
  subtitle?: string;
}

export interface ProgressItem {
  label?: string;
  value?: number;
  max?: number;
  displayValue?: string;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export interface ProgressListProps {
  title?: string;
  items?: ProgressItem[];
  subtitle?: string;
}

export interface GuideStepItem {
  title?: string;
  detail?: string;
}

export interface GuideStepsProps {
  title?: string;
  subtitle?: string;
  steps?: GuideStepItem[];
  tip?: string;
}

export interface ActionButtonParams {
  startDate?: string;
  endDate?: string;
  employeeId?: number;
  url?: string;
}

export interface ActionButtonItem {
  label?: string;
  prompt?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  actionType?: 'prompt' | 'export_timesheet' | 'export_attendance' | 'export_leaves' | 'open_url';
  params?: ActionButtonParams;
}

export interface ActionButtonsProps {
  buttons?: ActionButtonItem[];
}

export interface SectionProps {
  title?: string;
  children?: unknown[];
  subtitle?: string;
}

export interface GridProps {
  children?: unknown[];
  columns?: number;
}

export interface TabItemProps {
  label?: string;
  children?: unknown[];
}

export interface TabsProps {
  items?: ElementNode[];
}

@Component({
  selector: 'hrms-openui-response',
  standalone: true,
  imports: [RenderNode],
  template: `
    <div class="oui-response-stack">
      <openui-render-node
        [value]="props?.children"
        [library]="context.library"
        [context]="context"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .oui-response-stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }
    `,
  ],
})
export class OpenUiResponseComponent {
  @Input() props: { children?: unknown[] } | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  readonly context = injectOpenUiContext();
}

@Component({
  selector: 'hrms-openui-section',
  standalone: true,
  imports: [CommonModule, RenderNode],
  template: `
    <div class="oui-section-card">
      <div class="oui-section-header" *ngIf="props?.title || props?.subtitle">
        <div class="oui-section-title" *ngIf="props?.title">{{ props?.title }}</div>
        <div class="oui-section-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
      </div>
      <div class="oui-section-body">
        <openui-render-node
          [value]="props?.children"
          [library]="context.library"
          [context]="context"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .oui-section-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 11px 12px;
        display: flex;
        flex-direction: column;
        gap: 9px;
      }
      .oui-section-title {
        font-size: 0.83rem;
        font-weight: 700;
        color: #0f172a;
      }
      .oui-section-subtitle {
        font-size: 0.7rem;
        color: #64748b;
        margin-top: 2px;
      }
      .oui-section-body {
        display: flex;
        flex-direction: column;
        gap: 9px;
      }
    `,
  ],
})
export class OpenUiSectionComponent {
  @Input() props: SectionProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  readonly context = injectOpenUiContext();
}

@Component({
  selector: 'hrms-openui-grid',
  standalone: true,
  imports: [CommonModule, RenderNode],
  template: `
    <div
      class="oui-grid"
      [class.oui-grid--two]="effectiveColumns >= 2"
      *ngIf="childItems.length"
    >
      <div class="oui-grid-cell" *ngFor="let child of childItems">
        <openui-render-node
          [value]="child"
          [library]="context.library"
          [context]="context"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .oui-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 10px;
        width: 100%;
      }
      .oui-grid--two {
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      }
      .oui-grid-cell {
        min-width: 0;
      }
    `,
  ],
})
export class OpenUiGridComponent {
  @Input() props: GridProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  readonly context = injectOpenUiContext();

  get childItems(): unknown[] {
    return Array.isArray(this.props?.children) ? this.props!.children : [];
  }

  get effectiveColumns(): number {
    const raw = this.props?.columns;
    return typeof raw === 'number' && raw >= 2 ? 2 : raw === 1 ? 1 : 2;
  }
}

@Component({
  selector: 'hrms-openui-tab-item',
  standalone: true,
  imports: [RenderNode],
  template: `
    <div class="oui-tab-panel-stack">
      <openui-render-node
        [value]="props?.children"
        [library]="context.library"
        [context]="context"
      />
    </div>
  `,
  styles: [
    `
      .oui-tab-panel-stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }
    `,
  ],
})
export class OpenUiTabItemComponent {
  @Input() props: TabItemProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  readonly context = injectOpenUiContext();
}

@Component({
  selector: 'hrms-openui-tabs',
  standalone: true,
  imports: [CommonModule, RenderNode],
  template: `
    <div class="oui-tabs-container" *ngIf="tabItems.length > 0">
      <div class="oui-tabs-bar" role="tablist">
        <button
          type="button"
          role="tab"
          class="oui-tab-btn"
          *ngFor="let tab of tabItems; let i = index"
          [class.is-active]="i === safeActiveIndex"
          [attr.aria-selected]="i === safeActiveIndex"
          (click)="selectTab(i)"
        >
          {{ getTabLabel(tab, i) }}
        </button>
      </div>
      <div class="oui-tabs-content" role="tabpanel" *ngIf="activeTabItem as current">
        <openui-render-node
          [value]="current"
          [library]="context.library"
          [context]="context"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .oui-tabs-container {
        display: flex;
        flex-direction: column;
        gap: 9px;
        width: 100%;
      }
      .oui-tabs-bar {
        display: flex;
        align-items: center;
        gap: 4px;
        background: #f1f5f9;
        padding: 4px;
        border-radius: 10px;
        overflow-x: auto;
        border: 1px solid #e2e8f0;
      }
      .oui-tab-btn {
        border: none;
        background: transparent;
        color: #475569;
        font-size: 0.74rem;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 7px;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.14s ease;
      }
      .oui-tab-btn:hover:not(.is-active) {
        color: #1e293b;
        background: rgba(255, 255, 255, 0.55);
      }
      .oui-tab-btn.is-active {
        background: #ffffff;
        color: #3f51b5;
        font-weight: 700;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
      }
      .oui-tabs-content {
        width: 100%;
      }
    `,
  ],
})
export class OpenUiTabsComponent {
  @Input() props: TabsProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  readonly context = injectOpenUiContext();
  activeIndex = 0;

  get tabItems(): ElementNode[] {
    const raw = this.props?.items;
    if (!Array.isArray(raw)) return [];
    return raw.filter((item): item is ElementNode => Boolean(item && typeof item === 'object'));
  }

  get safeActiveIndex(): number {
    const len = this.tabItems.length;
    if (len === 0) return 0;
    return Math.min(Math.max(0, this.activeIndex), len - 1);
  }

  get activeTabItem(): ElementNode | null {
    return this.tabItems[this.safeActiveIndex] || null;
  }

  selectTab(index: number): void {
    this.activeIndex = index;
  }

  getTabLabel(tab: ElementNode, index: number): string {
    const label = tab?.props?.['label'];
    return typeof label === 'string' && label.trim() ? label : `Tab ${index + 1}`;
  }
}

@Component({
  selector: 'hrms-openui-text-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="oui-text-block"
      [ngClass]="'oui-text-block--' + (props?.tone || 'default')"
      *ngIf="props?.content"
    >
      {{ props?.content }}
    </div>
  `,
  styles: [
    `
      .oui-text-block {
        font-size: 0.81rem;
        line-height: 1.5;
        color: #1e293b;
        white-space: pre-line;
      }
      .oui-text-block--info {
        background: #eef2ff;
        border: 1px solid #c7d2fe;
        color: #312e81;
        padding: 8px 10px;
        border-radius: 10px;
      }
      .oui-text-block--success {
        background: #ecfdf5;
        border: 1px solid #a7f3d0;
        color: #065f46;
        padding: 8px 10px;
        border-radius: 10px;
      }
      .oui-text-block--warning {
        background: #fffbeb;
        border: 1px solid #fde68a;
        color: #92400e;
        padding: 8px 10px;
        border-radius: 10px;
      }
    `,
  ],
})
export class OpenUiTextBlockComponent {
  @Input() props: TextBlockProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;
}

@Component({
  selector: 'hrms-openui-callout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-callout" [ngClass]="'oui-callout--' + (props?.tone || 'info')">
      <div class="oui-callout-icon" aria-hidden="true">{{ toneIcon }}</div>
      <div class="oui-callout-body">
        <div class="oui-callout-title" *ngIf="props?.title">{{ props?.title }}</div>
        <div class="oui-callout-content" *ngIf="props?.content">{{ props?.content }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .oui-callout {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        padding: 9px 11px;
        border-radius: 10px;
        border: 1px solid #c7d2fe;
        background: #eef2ff;
        color: #312e81;
      }
      .oui-callout--success {
        background: #ecfdf5;
        border-color: #a7f3d0;
        color: #065f46;
      }
      .oui-callout--warning {
        background: #fffbeb;
        border-color: #fde68a;
        color: #92400e;
      }
      .oui-callout--danger {
        background: #fef2f2;
        border-color: #fecaca;
        color: #991b1b;
      }
      .oui-callout-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(15, 23, 42, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 800;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .oui-callout-body {
        min-width: 0;
      }
      .oui-callout-title {
        font-size: 0.78rem;
        font-weight: 700;
        line-height: 1.3;
      }
      .oui-callout-content {
        font-size: 0.74rem;
        line-height: 1.42;
        margin-top: 2px;
        white-space: pre-line;
      }
    `,
  ],
})
export class OpenUiCalloutComponent {
  @Input() props: CalloutProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  get toneIcon(): string {
    switch (this.props?.tone) {
      case 'success':
        return '✓';
      case 'warning':
        return '!';
      case 'danger':
        return '✕';
      default:
        return 'i';
    }
  }
}

@Component({
  selector: 'hrms-openui-summary-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-card oui-summary-card">
      <div class="oui-card-header">
        <div>
          <div class="oui-card-title">{{ props?.title || 'Inbox Summary' }}</div>
          <div class="oui-card-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
        </div>
        <span class="oui-live-badge" *ngIf="isStreaming()">Live</span>
      </div>

      <div class="oui-metrics-grid" *ngIf="props?.metrics?.length">
        <div
          class="oui-metric-tile"
          *ngFor="let item of props?.metrics"
          [ngClass]="'oui-metric-tile--' + (item.tone || 'default')"
        >
          <span class="oui-metric-value">{{ item.value ?? '0' }}</span>
          <span class="oui-metric-label">{{ item.label }}</span>
        </div>
      </div>

      <div class="oui-card-footer-note" *ngIf="props?.summary">
        {{ props?.summary }}
      </div>
    </div>
  `,
  styles: [
    `
      .oui-summary-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 11px 12px;
        display: flex;
        flex-direction: column;
        gap: 9px;
      }
      .oui-card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      .oui-card-title {
        font-size: 0.82rem;
        font-weight: 700;
        color: #0f172a;
        line-height: 1.3;
      }
      .oui-card-subtitle {
        font-size: 0.7rem;
        color: #64748b;
        margin-top: 1px;
      }
      .oui-live-badge {
        font-size: 0.62rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        background: #e0e7ff;
        color: #3f51b5;
        padding: 2px 6px;
        border-radius: 999px;
      }
      .oui-metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 7px;
      }
      .oui-metric-tile {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 9px;
        padding: 7px 9px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .oui-metric-value {
        font-size: 0.96rem;
        font-weight: 800;
        color: #1e293b;
        line-height: 1.15;
      }
      .oui-metric-label {
        font-size: 0.68rem;
        font-weight: 600;
        color: #64748b;
      }
      .oui-metric-tile--primary {
        background: #eef2ff;
        border-color: #c7d2fe;
      }
      .oui-metric-tile--primary .oui-metric-value {
        color: #3f51b5;
      }
      .oui-metric-tile--warning {
        background: #fffbeb;
        border-color: #fde68a;
      }
      .oui-metric-tile--warning .oui-metric-value {
        color: #b45309;
      }
      .oui-metric-tile--success {
        background: #ecfdf5;
        border-color: #a7f3d0;
      }
      .oui-metric-tile--success .oui-metric-value {
        color: #047857;
      }
      .oui-metric-tile--danger {
        background: #fef2f2;
        border-color: #fecaca;
      }
      .oui-metric-tile--danger .oui-metric-value {
        color: #b91c1c;
      }
      .oui-card-footer-note {
        font-size: 0.73rem;
        line-height: 1.4;
        color: #475569;
        border-top: 1px dashed #cbd5e1;
        padding-top: 7px;
      }
    `,
  ],
})
export class OpenUiSummaryCardComponent {
  @Input() props: SummaryCardProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  readonly isStreaming = injectIsStreaming();
}

@Component({
  selector: 'hrms-openui-request-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-request-card">
      <div class="oui-req-top">
        <div class="oui-req-employee">
          <div class="oui-req-avatar">{{ initials }}</div>
          <div>
            <div class="oui-req-name">{{ props?.employeeName || 'Employee' }}</div>
            <div class="oui-req-type">{{ props?.requestType || 'Request' }}</div>
          </div>
        </div>
        <span class="oui-status-pill" [ngClass]="statusClass">
          {{ props?.status || 'Pending' }}
        </span>
      </div>

      <div class="oui-req-meta" *ngIf="props?.submittedDate || props?.dateRange">
        <div class="oui-req-meta-row" *ngIf="props?.dateRange">
          <span class="oui-meta-key">Period:</span>
          <span class="oui-meta-val">{{ props?.dateRange }}</span>
        </div>
        <div class="oui-req-meta-row" *ngIf="props?.submittedDate">
          <span class="oui-meta-key">Submitted:</span>
          <span class="oui-meta-val">{{ props?.submittedDate }}</span>
        </div>
      </div>

      <div class="oui-req-desc" *ngIf="props?.description">
        {{ props?.description }}
      </div>

      <div class="oui-req-hint" *ngIf="props?.actionHint">
        {{ props?.actionHint }}
      </div>
    </div>
  `,
  styles: [
    `
      .oui-request-card {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-left: 3.5px solid #3f51b5;
        border-radius: 11px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .oui-req-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .oui-req-employee {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }
      .oui-req-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #e0e7ff;
        color: #3f51b5;
        font-size: 0.68rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .oui-req-name {
        font-size: 0.81rem;
        font-weight: 700;
        color: #0f172a;
        line-height: 1.25;
      }
      .oui-req-type {
        font-size: 0.7rem;
        color: #4f46e5;
        font-weight: 600;
      }
      .oui-status-pill {
        font-size: 0.66rem;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .oui-status--pending {
        background: #fef3c7;
        color: #92400e;
      }
      .oui-status--approved {
        background: #d1fae5;
        color: #065f46;
      }
      .oui-status--rejected {
        background: #fee2e2;
        color: #991b1b;
      }
      .oui-req-meta {
        display: flex;
        flex-direction: column;
        gap: 3px;
        background: #f8fafc;
        border-radius: 8px;
        padding: 6px 8px;
        font-size: 0.72rem;
      }
      .oui-req-meta-row {
        display: flex;
        gap: 6px;
      }
      .oui-meta-key {
        font-weight: 600;
        color: #64748b;
      }
      .oui-meta-val {
        color: #1e293b;
        font-weight: 500;
      }
      .oui-req-desc {
        font-size: 0.76rem;
        color: #334155;
        line-height: 1.42;
      }
      .oui-req-hint {
        font-size: 0.71rem;
        color: #3730a3;
        background: #eef2ff;
        border-radius: 8px;
        padding: 6px 8px;
        line-height: 1.38;
      }
    `,
  ],
})
export class OpenUiRequestCardComponent {
  @Input() props: RequestCardProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  get initials(): string {
    const name = this.props?.employeeName?.trim();
    if (!name) return 'EE';
    const parts = name.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  get statusClass(): string {
    const s = (this.props?.status || 'pending').toLowerCase();
    if (s.includes('approv') || s.includes('verif')) return 'oui-status--approved';
    if (s.includes('reject')) return 'oui-status--rejected';
    return 'oui-status--pending';
  }
}

@Component({
  selector: 'hrms-openui-key-value-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-kv-card">
      <div class="oui-kv-header">
        <div class="oui-kv-title">{{ props?.title || 'Details' }}</div>
        <div class="oui-kv-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
      </div>

      <div class="oui-kv-grid" *ngIf="props?.items?.length">
        <div class="oui-kv-row" *ngFor="let item of props?.items">
          <span class="oui-kv-label">{{ item.label }}</span>
          <span class="oui-kv-value" [ngClass]="'oui-kv-value--' + (item.tone || 'default')">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .oui-kv-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 11px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .oui-kv-title {
        font-size: 0.82rem;
        font-weight: 700;
        color: #0f172a;
      }
      .oui-kv-subtitle {
        font-size: 0.7rem;
        color: #64748b;
        margin-top: 1px;
      }
      .oui-kv-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 7px;
      }
      .oui-kv-row {
        background: #f8fafc;
        border: 1px solid #f1f5f9;
        border-radius: 8px;
        padding: 6px 9px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .oui-kv-label {
        font-size: 0.66rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }
      .oui-kv-value {
        font-size: 0.77rem;
        font-weight: 600;
        color: #0f172a;
        word-break: break-word;
      }
      .oui-kv-value--primary {
        color: #3f51b5;
      }
      .oui-kv-value--success {
        color: #047857;
      }
      .oui-kv-value--warning {
        color: #b45309;
      }
      .oui-kv-value--danger {
        color: #b91c1c;
      }
    `,
  ],
})
export class OpenUiKeyValueListComponent {
  @Input() props: KeyValueListProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;
}

@Component({
  selector: 'hrms-openui-progress-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-progress-card">
      <div class="oui-progress-header">
        <div class="oui-progress-title">{{ props?.title || 'Breakdown' }}</div>
        <div class="oui-progress-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
      </div>

      <div class="oui-progress-items" *ngIf="items.length">
        <div class="oui-progress-row" *ngFor="let item of items">
          <div class="oui-progress-top">
            <span class="oui-progress-label">{{ item.label }}</span>
            <span class="oui-progress-val">{{ item.displayValue || formatValue(item) }}</span>
          </div>
          <div class="oui-progress-track">
            <div
              class="oui-progress-fill"
              [ngClass]="'oui-progress-fill--' + (item.tone || 'primary')"
              [style.width.%]="percentFor(item)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .oui-progress-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 11px 12px;
        display: flex;
        flex-direction: column;
        gap: 9px;
      }
      .oui-progress-title {
        font-size: 0.82rem;
        font-weight: 700;
        color: #0f172a;
      }
      .oui-progress-subtitle {
        font-size: 0.7rem;
        color: #64748b;
        margin-top: 1px;
      }
      .oui-progress-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .oui-progress-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .oui-progress-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.74rem;
      }
      .oui-progress-label {
        font-weight: 600;
        color: #1e293b;
      }
      .oui-progress-val {
        font-weight: 700;
        color: #475569;
        font-variant-numeric: tabular-nums;
      }
      .oui-progress-track {
        width: 100%;
        height: 8px;
        border-radius: 999px;
        background: #e2e8f0;
        overflow: hidden;
      }
      .oui-progress-fill {
        height: 100%;
        border-radius: 999px;
        transition: width 0.25s ease;
        background: #3f51b5;
      }
      .oui-progress-fill--default {
        background: #64748b;
      }
      .oui-progress-fill--primary {
        background: #3f51b5;
      }
      .oui-progress-fill--success {
        background: #10b981;
      }
      .oui-progress-fill--warning {
        background: #f59e0b;
      }
      .oui-progress-fill--danger {
        background: #ef4444;
      }
    `,
  ],
})
export class OpenUiProgressListComponent {
  @Input() props: ProgressListProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  get items(): ProgressItem[] {
    return Array.isArray(this.props?.items) ? this.props!.items : [];
  }

  private get inferredMax(): number {
    const vals = this.items.map((i) => Number(i.value) || 0);
    return Math.max(1, ...vals);
  }

  percentFor(item: ProgressItem): number {
    const val = Math.max(0, Number(item.value) || 0);
    const max = typeof item.max === 'number' && item.max > 0 ? item.max : this.inferredMax;
    return Math.min(100, Math.max(0, (val / max) * 100));
  }

  formatValue(item: ProgressItem): string {
    const val = Number(item.value) || 0;
    if (typeof item.max === 'number' && item.max > 0) {
      return `${val} / ${item.max}`;
    }
    return String(val);
  }
}

@Component({
  selector: 'hrms-openui-guide-steps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-guide-card">
      <div class="oui-guide-header">
        <div class="oui-guide-title">{{ props?.title || 'Workflow Guide' }}</div>
        <div class="oui-guide-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
      </div>

      <ol class="oui-steps-list" *ngIf="props?.steps?.length">
        <li class="oui-step-item" *ngFor="let step of props?.steps; let i = index">
          <span class="oui-step-num">{{ i + 1 }}</span>
          <div class="oui-step-content">
            <div class="oui-step-title">{{ step.title }}</div>
            <div class="oui-step-detail">{{ step.detail }}</div>
          </div>
        </li>
      </ol>

      <div class="oui-guide-tip" *ngIf="props?.tip">
        <strong>Tip:</strong> {{ props?.tip }}
      </div>
    </div>
  `,
  styles: [
    `
      .oui-guide-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .oui-guide-title {
        font-size: 0.82rem;
        font-weight: 700;
        color: #0f172a;
      }
      .oui-guide-subtitle {
        font-size: 0.7rem;
        color: #64748b;
        margin-top: 1px;
      }
      .oui-steps-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .oui-step-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
      }
      .oui-step-num {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: #3f51b5;
        color: #ffffff;
        font-size: 0.66rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .oui-step-content {
        min-width: 0;
      }
      .oui-step-title {
        font-size: 0.76rem;
        font-weight: 700;
        color: #1e293b;
        line-height: 1.3;
      }
      .oui-step-detail {
        font-size: 0.72rem;
        color: #475569;
        line-height: 1.38;
        margin-top: 1px;
      }
      .oui-guide-tip {
        font-size: 0.71rem;
        color: #3730a3;
        background: #eef2ff;
        border-radius: 8px;
        padding: 6px 8px;
        line-height: 1.38;
      }
    `,
  ],
})
export class OpenUiGuideStepsComponent {
  @Input() props: GuideStepsProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;
}

@Component({
  selector: 'hrms-openui-action-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-actions-row" *ngIf="props?.buttons?.length">
      <button
        type="button"
        class="oui-action-btn"
        *ngFor="let btn of props?.buttons"
        [ngClass]="'oui-action-btn--' + (btn.variant || 'outline')"
        [disabled]="isStreaming()"
        (click)="onClickAction(btn)"
      >
        <span class="oui-action-icon" *ngIf="isExportAction(btn)" aria-hidden="true">↓</span>
        <span>{{ btn.label }}</span>
      </button>
    </div>
  `,
  styles: [
    `
      .oui-actions-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 2px;
      }
      .oui-action-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        border-radius: 999px;
        padding: 5px 11px;
        font-size: 0.72rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #334155;
      }
      .oui-action-icon {
        font-size: 0.75rem;
        font-weight: 800;
        line-height: 1;
      }
      .oui-action-btn:hover:not(:disabled) {
        transform: translateY(-1px);
      }
      .oui-action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .oui-action-btn--primary {
        background: #3f51b5;
        border-color: #3f51b5;
        color: #ffffff;
      }
      .oui-action-btn--primary:hover:not(:disabled) {
        background: #303f9f;
      }
      .oui-action-btn--secondary {
        background: #eef2ff;
        border-color: #c7d2fe;
        color: #3f51b5;
      }
      .oui-action-btn--secondary:hover:not(:disabled) {
        background: #e0e7ff;
      }
      .oui-action-btn--outline:hover:not(:disabled) {
        background: #f1f5f9;
        border-color: #94a3b8;
      }
    `,
  ],
})
export class OpenUiActionButtonsComponent {
  @Input() props: ActionButtonsProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  private readonly triggerAction = injectTriggerAction();
  readonly isStreaming = injectIsStreaming();

  isExportAction(btn: ActionButtonItem): boolean {
    return (
      btn.actionType === 'export_timesheet' ||
      btn.actionType === 'export_attendance' ||
      btn.actionType === 'export_leaves'
    );
  }

  onClickAction(btn: ActionButtonItem): void {
    if (this.isStreaming()) {
      return;
    }

    const label = (btn.label || btn.prompt || '').trim();
    if (btn.actionType && btn.actionType !== 'prompt') {
      void this.triggerAction(label || btn.actionType, undefined, {
        type: btn.actionType,
        params: (btn.params || {}) as Record<string, unknown>,
      });
      return;
    }

    const message = (btn.prompt || btn.label || '').trim();
    if (!message) {
      return;
    }
    void this.triggerAction(message);
  }
}
