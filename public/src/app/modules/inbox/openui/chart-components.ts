import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectIsStreaming } from '@openuidev/angular-lang';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

const CHART_PALETTE = [
  '#3f51b5',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#6366f1',
];

function colorAt(index: number, custom?: string): string {
  if (typeof custom === 'string' && custom.trim()) {
    return custom.trim();
  }
  return CHART_PALETTE[index % CHART_PALETTE.length];
}

function withAlpha(color: string, alpha: number): string {
  const hex = color.trim();
  if (/^#([0-9a-f]{6})$/i.test(hex)) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (/^#([0-9a-f]{3})$/i.test(hex)) {
    const r = parseInt(hex[1] + hex[1], 16);
    const g = parseInt(hex[2] + hex[2], 16);
    const b = parseInt(hex[3] + hex[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
}

export interface ChartSeries {
  name?: string;
  values?: number[];
  color?: string;
}

export interface BarChartProps {
  title?: string;
  labels?: string[];
  series?: ChartSeries[];
  subtitle?: string;
  horizontal?: boolean;
  stacked?: boolean;
  yAxisLabel?: string;
}

export interface LineChartProps {
  title?: string;
  labels?: string[];
  series?: ChartSeries[];
  subtitle?: string;
  smooth?: boolean;
  filled?: boolean;
  yAxisLabel?: string;
}

export interface PieSlice {
  label?: string;
  value?: number;
  color?: string;
}

export interface PieChartProps {
  title?: string;
  slices?: PieSlice[];
  subtitle?: string;
  donut?: boolean;
}

const SHARED_CHART_STYLES = `
  .oui-chart-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 13px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .oui-chart-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }
  .oui-chart-title {
    font-size: 0.83rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.3;
  }
  .oui-chart-subtitle {
    font-size: 0.7rem;
    color: #64748b;
    margin-top: 2px;
  }
  .oui-chart-badge {
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    background: #eef2ff;
    color: #3f51b5;
    padding: 2px 7px;
    border-radius: 999px;
    flex-shrink: 0;
  }
  .oui-chart-canvas-wrap {
    position: relative;
    width: 100%;
    min-height: 210px;
  }
  .oui-chart-canvas-wrap--scroll {
    max-height: 440px;
    overflow-y: auto;
  }
  .oui-chart-empty {
    font-size: 0.74rem;
    color: #64748b;
    padding: 20px 8px;
    text-align: center;
    background: #f8fafc;
    border-radius: 8px;
  }
`;

@Component({
  selector: 'hrms-openui-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-chart-card">
      <div class="oui-chart-header">
        <div>
          <div class="oui-chart-title">{{ props?.title || 'Bar Chart' }}</div>
          <div class="oui-chart-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
        </div>
        <span class="oui-chart-badge">{{ isStreaming() ? 'Live' : 'Bar' }}</span>
      </div>

      <div
        class="oui-chart-canvas-wrap"
        [class.oui-chart-canvas-wrap--scroll]="isHorizontal && canvasHeight > 420"
        *ngIf="hasData; else emptyState"
      >
        <div [style.height.px]="canvasHeight" style="position: relative; width: 100%;">
          <canvas #chartCanvas></canvas>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="oui-chart-empty">
          {{ isStreaming() ? 'Loading chart data...' : 'No chart data available.' }}
        </div>
      </ng-template>
    </div>
  `,
  styles: [SHARED_CHART_STYLES],
})
export class OpenUiBarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() props: BarChartProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  @ViewChild('chartCanvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

  readonly isStreaming = injectIsStreaming();
  private chart: Chart | null = null;
  private viewReady = false;
  private lastSignature = '';

  get isHorizontal(): boolean {
    return Boolean(this.props?.horizontal);
  }

  get hasData(): boolean {
    const labels = this.props?.labels;
    const series = this.props?.series;
    return Array.isArray(labels) && labels.length > 0 && Array.isArray(series) && series.length > 0;
  }

  get canvasHeight(): number {
    const count = this.props?.labels?.length || 0;
    if (this.isHorizontal) {
      return Math.min(720, Math.max(220, count * 24 + 56));
    }
    return count > 14 ? 260 : 230;
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.viewReady) {
      queueMicrotask(() => this.renderChart());
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private renderChart(): void {
    if (!this.hasData) {
      this.destroyChart();
      this.lastSignature = '';
      return;
    }

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const labels = (this.props?.labels || []).map((l) => String(l ?? ''));
    const series = (this.props?.series || []).filter(
      (s) => s && Array.isArray(s.values) && s.values.length > 0
    );
    if (series.length === 0) {
      this.destroyChart();
      return;
    }

    const sig = JSON.stringify({
      labels,
      series,
      horizontal: this.isHorizontal,
      stacked: Boolean(this.props?.stacked),
      yAxisLabel: this.props?.yAxisLabel || '',
    });
    if (sig === this.lastSignature && this.chart) {
      return;
    }
    this.lastSignature = sig;

    this.destroyChart();

    const datasets = series.map((s, idx) => {
      const color = colorAt(idx, s.color);
      return {
        label: s.name || `Series ${idx + 1}`,
        data: (s.values || []).map((v) => (typeof v === 'number' && Number.isFinite(v) ? v : Number(v) || 0)),
        backgroundColor: withAlpha(color, 0.86),
        hoverBackgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 5,
        maxBarThickness: labels.length > 20 ? 18 : 34,
      };
    });

    const stacked = Boolean(this.props?.stacked);
    const horizontal = this.isHorizontal;
    const valueAxisTitle = this.props?.yAxisLabel || '';

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: this.isStreaming() ? false : { duration: 300 },
        indexAxis: horizontal ? 'y' : 'x',
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: datasets.length > 1,
            position: 'top',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 11, weight: 600 },
              color: '#334155',
            },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            padding: 9,
            cornerRadius: 8,
            displayColors: true,
          },
        },
        scales: {
          x: {
            stacked,
            beginAtZero: horizontal,
            grid: {
              display: horizontal,
              color: 'rgba(148, 163, 184, 0.2)',
            },
            ticks: {
              color: '#475569',
              font: { size: 10 },
              autoSkip: !horizontal,
              maxRotation: horizontal ? 0 : 45,
              minRotation: 0,
            },
            title:
              horizontal && valueAxisTitle
                ? { display: true, text: valueAxisTitle, color: '#64748b', font: { size: 11, weight: 600 } }
                : undefined,
          },
          y: {
            stacked,
            beginAtZero: !horizontal,
            grid: {
              display: !horizontal,
              color: 'rgba(148, 163, 184, 0.2)',
            },
            ticks: {
              color: '#475569',
              font: { size: 10 },
              autoSkip: false,
            },
            title:
              !horizontal && valueAxisTitle
                ? { display: true, text: valueAxisTitle, color: '#64748b', font: { size: 11, weight: 600 } }
                : undefined,
          },
        },
      },
    };

    this.chart = new Chart(canvas, config);
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

@Component({
  selector: 'hrms-openui-line-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-chart-card">
      <div class="oui-chart-header">
        <div>
          <div class="oui-chart-title">{{ props?.title || 'Line Chart' }}</div>
          <div class="oui-chart-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
        </div>
        <span class="oui-chart-badge">{{ isStreaming() ? 'Live' : 'Trend' }}</span>
      </div>

      <div class="oui-chart-canvas-wrap" *ngIf="hasData; else emptyState">
        <div style="height: 235px; position: relative; width: 100%;">
          <canvas #chartCanvas></canvas>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="oui-chart-empty">
          {{ isStreaming() ? 'Loading trend data...' : 'No trend data available.' }}
        </div>
      </ng-template>
    </div>
  `,
  styles: [SHARED_CHART_STYLES],
})
export class OpenUiLineChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() props: LineChartProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  @ViewChild('chartCanvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

  readonly isStreaming = injectIsStreaming();
  private chart: Chart | null = null;
  private viewReady = false;
  private lastSignature = '';

  get hasData(): boolean {
    const labels = this.props?.labels;
    const series = this.props?.series;
    return Array.isArray(labels) && labels.length > 0 && Array.isArray(series) && series.length > 0;
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.viewReady) {
      queueMicrotask(() => this.renderChart());
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private renderChart(): void {
    if (!this.hasData) {
      this.destroyChart();
      this.lastSignature = '';
      return;
    }

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const labels = (this.props?.labels || []).map((l) => String(l ?? ''));
    const series = (this.props?.series || []).filter(
      (s) => s && Array.isArray(s.values) && s.values.length > 0
    );
    if (series.length === 0) {
      this.destroyChart();
      return;
    }

    const sig = JSON.stringify({
      labels,
      series,
      smooth: this.props?.smooth !== false,
      filled: Boolean(this.props?.filled),
      yAxisLabel: this.props?.yAxisLabel || '',
    });
    if (sig === this.lastSignature && this.chart) {
      return;
    }
    this.lastSignature = sig;

    this.destroyChart();

    const smooth = this.props?.smooth !== false;
    const filled = Boolean(this.props?.filled);

    const datasets = series.map((s, idx) => {
      const color = colorAt(idx, s.color);
      return {
        label: s.name || `Series ${idx + 1}`,
        data: (s.values || []).map((v) => (typeof v === 'number' && Number.isFinite(v) ? v : Number(v) || 0)),
        borderColor: color,
        backgroundColor: withAlpha(color, filled ? 0.16 : 0.08),
        fill: filled,
        tension: smooth ? 0.35 : 0,
        borderWidth: 2.2,
        pointRadius: labels.length > 20 ? 2 : 3.5,
        pointHoverRadius: 5,
        pointBackgroundColor: color,
      };
    });

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: this.isStreaming() ? false : { duration: 300 },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: datasets.length > 1,
            position: 'top',
            labels: {
              boxWidth: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 11, weight: 600 },
              color: '#334155',
            },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            padding: 9,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#475569', font: { size: 10 }, autoSkip: true, maxRotation: 45 },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(148, 163, 184, 0.2)' },
            ticks: { color: '#475569', font: { size: 10 } },
            title: this.props?.yAxisLabel
              ? { display: true, text: this.props.yAxisLabel, color: '#64748b', font: { size: 11, weight: 600 } }
              : undefined,
          },
        },
      },
    };

    this.chart = new Chart(canvas, config);
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

@Component({
  selector: 'hrms-openui-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oui-chart-card">
      <div class="oui-chart-header">
        <div>
          <div class="oui-chart-title">{{ props?.title || 'Distribution' }}</div>
          <div class="oui-chart-subtitle" *ngIf="props?.subtitle">{{ props?.subtitle }}</div>
        </div>
        <span class="oui-chart-badge">{{ props?.donut ? 'Donut' : 'Pie' }}</span>
      </div>

      <div class="oui-chart-canvas-wrap" *ngIf="hasData; else emptyState">
        <div style="height: 235px; position: relative; width: 100%;">
          <canvas #chartCanvas></canvas>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="oui-chart-empty">
          {{ isStreaming() ? 'Loading chart...' : 'No slices available.' }}
        </div>
      </ng-template>
    </div>
  `,
  styles: [SHARED_CHART_STYLES],
})
export class OpenUiPieChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() props: PieChartProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  @ViewChild('chartCanvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

  readonly isStreaming = injectIsStreaming();
  private chart: Chart | null = null;
  private viewReady = false;
  private lastSignature = '';

  get hasData(): boolean {
    return Array.isArray(this.props?.slices) && this.props!.slices.length > 0;
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.viewReady) {
      queueMicrotask(() => this.renderChart());
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private renderChart(): void {
    if (!this.hasData) {
      this.destroyChart();
      this.lastSignature = '';
      return;
    }

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const slices = (this.props?.slices || []).filter((s) => s && typeof s.label === 'string');
    if (slices.length === 0) {
      this.destroyChart();
      return;
    }

    const sig = JSON.stringify({ slices, donut: Boolean(this.props?.donut) });
    if (sig === this.lastSignature && this.chart) {
      return;
    }
    this.lastSignature = sig;

    this.destroyChart();

    const labels = slices.map((s) => s.label || 'Other');
    const values = slices.map((s) => (typeof s.value === 'number' && Number.isFinite(s.value) ? s.value : Number(s.value) || 0));
    const colors = slices.map((s, i) => colorAt(i, s.color));
    const total = values.reduce((acc, v) => acc + v, 0);

    const config: ChartConfiguration<'pie' | 'doughnut'> = {
      type: this.props?.donut ? 'doughnut' : 'pie',
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors.map((c) => withAlpha(c, 0.88)),
            hoverBackgroundColor: colors,
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: this.isStreaming() ? false : { duration: 300 },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 11, weight: 600 },
              color: '#334155',
            },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            padding: 9,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => {
                const raw = typeof ctx.parsed === 'number' ? ctx.parsed : 0;
                const pct = total > 0 ? ((raw / total) * 100).toFixed(1) : '0.0';
                return ` ${ctx.label}: ${raw} (${pct}%)`;
              },
            },
          },
        },
      },
    };

    this.chart = new Chart(canvas, config);
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
