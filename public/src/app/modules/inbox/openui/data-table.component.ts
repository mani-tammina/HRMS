import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { injectIsStreaming } from '@openuidev/angular-lang';
import * as XLSX from 'xlsx';

export type DataTableCell = string | number | boolean | null | undefined;

export interface DataTableProps {
  title?: string;
  columns?: string[];
  rows?: DataTableCell[][];
  subtitle?: string;
  pageSize?: number;
  exportFileName?: string;
}

@Component({
  selector: 'hrms-openui-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oui-table-card">
      <div class="oui-table-header">
        <div class="oui-table-heading">
          <div class="oui-table-title">{{ props?.title || 'Records' }}</div>
          <div class="oui-table-subtitle" *ngIf="props?.subtitle || allRows.length">
            <span *ngIf="props?.subtitle">{{ props?.subtitle }}</span>
            <span *ngIf="props?.subtitle && allRows.length"> · </span>
            <span *ngIf="allRows.length">{{ filteredRows.length }} of {{ allRows.length }} rows</span>
          </div>
        </div>

        <div class="oui-table-tools" *ngIf="allRows.length > 0 && !isStreaming()">
          <button
            type="button"
            class="oui-export-btn"
            title="Download as CSV"
            (click)="downloadCsv()"
          >
            CSV
          </button>
          <button
            type="button"
            class="oui-export-btn oui-export-btn--primary"
            title="Download as Excel (.xlsx)"
            (click)="downloadExcel()"
          >
            Excel
          </button>
        </div>
      </div>

      <div class="oui-table-search-row" *ngIf="allRows.length > 5">
        <input
          type="text"
          class="oui-table-search"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange()"
          placeholder="Filter rows..."
          aria-label="Filter table rows"
        />
        <button
          *ngIf="searchTerm"
          type="button"
          class="oui-table-clear"
          (click)="clearSearch()"
          aria-label="Clear filter"
        >
          ×
        </button>
      </div>

      <div class="oui-table-scroll" *ngIf="columns.length > 0">
        <table class="oui-table">
          <thead>
            <tr>
              <th
                *ngFor="let col of columns; let ci = index"
                [class.is-numeric]="isNumericColumn(ci)"
                [class.is-sortable]="!isStreaming()"
                (click)="toggleSort(ci)"
              >
                <span class="oui-th-inner">
                  <span>{{ col }}</span>
                  <span class="oui-sort-indicator" *ngIf="sortColumn === ci">
                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of visibleRows; let ri = index">
              <td
                *ngFor="let col of columns; let ci = index"
                [class.is-numeric]="isNumericColumn(ci)"
              >
                <ng-container *ngIf="getStatusTone(row[ci], col) as tone; else plainCell">
                  <span class="oui-cell-pill" [ngClass]="'oui-cell-pill--' + tone">
                    {{ formatCell(row[ci]) }}
                  </span>
                </ng-container>
                <ng-template #plainCell>
                  {{ formatCell(row[ci]) }}
                </ng-template>
              </td>
            </tr>
            <tr *ngIf="visibleRows.length === 0">
              <td [attr.colspan]="columns.length" class="oui-table-empty">
                {{ isStreaming() ? 'Loading rows...' : 'No matching records found.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="oui-table-footer" *ngIf="filteredRows.length > effectivePageSize">
        <div class="oui-table-pager" *ngIf="!showAll">
          <button
            type="button"
            class="oui-page-btn"
            [disabled]="currentPage <= 1"
            (click)="setPage(currentPage - 1)"
          >
            Prev
          </button>
          <span class="oui-page-info">
            Page {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            type="button"
            class="oui-page-btn"
            [disabled]="currentPage >= totalPages"
            (click)="setPage(currentPage + 1)"
          >
            Next
          </button>
        </div>
        <button type="button" class="oui-toggle-all-btn" (click)="toggleShowAll()">
          {{ showAll ? 'Show paged (' + effectivePageSize + ')' : 'Show all (' + filteredRows.length + ')' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .oui-table-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 11px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .oui-table-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
      }
      .oui-table-heading {
        min-width: 0;
      }
      .oui-table-title {
        font-size: 0.83rem;
        font-weight: 700;
        color: #0f172a;
        line-height: 1.3;
      }
      .oui-table-subtitle {
        font-size: 0.7rem;
        color: #64748b;
        margin-top: 2px;
      }
      .oui-table-tools {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
      }
      .oui-export-btn {
        border: 1px solid #cbd5e1;
        background: #f8fafc;
        color: #334155;
        font-size: 0.67rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 7px;
        cursor: pointer;
        transition: all 0.14s ease;
      }
      .oui-export-btn:hover {
        background: #e2e8f0;
        color: #0f172a;
      }
      .oui-export-btn--primary {
        background: #eef2ff;
        border-color: #c7d2fe;
        color: #3f51b5;
      }
      .oui-export-btn--primary:hover {
        background: #3f51b5;
        border-color: #3f51b5;
        color: #ffffff;
      }
      .oui-table-search-row {
        position: relative;
        display: flex;
        align-items: center;
      }
      .oui-table-search {
        width: 100%;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 5px 26px 5px 9px;
        font-size: 0.74rem;
        color: #1e293b;
        background: #f8fafc;
        outline: none;
      }
      .oui-table-search:focus {
        background: #ffffff;
        border-color: #3f51b5;
      }
      .oui-table-clear {
        position: absolute;
        right: 6px;
        border: none;
        background: transparent;
        color: #64748b;
        font-size: 0.95rem;
        cursor: pointer;
        line-height: 1;
        padding: 2px 4px;
      }
      .oui-table-scroll {
        width: 100%;
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 9px;
      }
      .oui-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.73rem;
        text-align: left;
      }
      .oui-table thead th {
        background: #f1f5f9;
        color: #334155;
        font-weight: 700;
        font-size: 0.69rem;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        padding: 7px 9px;
        border-bottom: 1px solid #e2e8f0;
        white-space: nowrap;
        user-select: none;
      }
      .oui-table thead th.is-sortable {
        cursor: pointer;
      }
      .oui-table thead th.is-sortable:hover {
        background: #e2e8f0;
      }
      .oui-th-inner {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .oui-sort-indicator {
        font-size: 0.58rem;
        color: #3f51b5;
      }
      .oui-table tbody td {
        padding: 6px 9px;
        border-bottom: 1px solid #f1f5f9;
        color: #1e293b;
        vertical-align: top;
        line-height: 1.38;
      }
      .oui-table tbody tr:last-child td {
        border-bottom: none;
      }
      .oui-table tbody tr:nth-child(even) {
        background: #f8fafc;
      }
      .oui-table tbody tr:hover {
        background: #eef2ff;
      }
      .oui-table th.is-numeric,
      .oui-table td.is-numeric {
        text-align: right;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .oui-table-empty {
        text-align: center;
        color: #64748b;
        padding: 16px 8px !important;
      }
      .oui-cell-pill {
        display: inline-block;
        padding: 1px 7px;
        border-radius: 999px;
        font-size: 0.66rem;
        font-weight: 700;
        text-transform: capitalize;
        white-space: nowrap;
      }
      .oui-cell-pill--success {
        background: #d1fae5;
        color: #065f46;
      }
      .oui-cell-pill--warning {
        background: #fef3c7;
        color: #92400e;
      }
      .oui-cell-pill--danger {
        background: #fee2e2;
        color: #991b1b;
      }
      .oui-cell-pill--info {
        background: #e0e7ff;
        color: #3730a3;
      }
      .oui-table-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
        padding-top: 2px;
      }
      .oui-table-pager {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .oui-page-btn,
      .oui-toggle-all-btn {
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #334155;
        font-size: 0.69rem;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 7px;
        cursor: pointer;
      }
      .oui-page-btn:hover:not(:disabled),
      .oui-toggle-all-btn:hover {
        background: #f1f5f9;
        border-color: #94a3b8;
      }
      .oui-page-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .oui-page-info {
        font-size: 0.69rem;
        color: #64748b;
        font-weight: 600;
      }
    `,
  ],
})
export class OpenUiDataTableComponent implements OnChanges {
  @Input() props: DataTableProps | null = null;
  @Input() renderNode: ((value: unknown) => unknown) | null = null;
  @Input() statementId: string | undefined;

  readonly isStreaming = injectIsStreaming();

  searchTerm = '';
  sortColumn: number | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  showAll = false;

  get columns(): string[] {
    return Array.isArray(this.props?.columns) ? this.props!.columns : [];
  }

  get allRows(): DataTableCell[][] {
    return Array.isArray(this.props?.rows)
      ? this.props!.rows.filter((r) => Array.isArray(r))
      : [];
  }

  get effectivePageSize(): number {
    const raw = this.props?.pageSize;
    return typeof raw === 'number' && Number.isFinite(raw) && raw >= 3 ? Math.floor(raw) : 10;
  }

  get filteredRows(): DataTableCell[][] {
    const query = this.searchTerm.trim().toLowerCase();
    let rows = this.allRows;

    if (query) {
      rows = rows.filter((row) =>
        row.some((cell) => this.formatCell(cell).toLowerCase().includes(query))
      );
    }

    if (this.sortColumn !== null) {
      const idx = this.sortColumn;
      const dir = this.sortDirection === 'asc' ? 1 : -1;
      rows = [...rows].sort((a, b) => this.compareCells(a[idx], b[idx]) * dir);
    }

    return rows;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRows.length / this.effectivePageSize));
  }

  get visibleRows(): DataTableCell[][] {
    const rows = this.filteredRows;
    if (this.showAll || rows.length <= this.effectivePageSize) {
      return rows;
    }
    const safePage = Math.min(Math.max(1, this.currentPage), this.totalPages);
    const start = (safePage - 1) * this.effectivePageSize;
    return rows.slice(start, start + this.effectivePageSize);
  }

  ngOnChanges(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
  }

  toggleSort(colIndex: number): void {
    if (this.isStreaming()) return;
    if (this.sortColumn === colIndex) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else {
        this.sortColumn = null;
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = colIndex;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  setPage(page: number): void {
    this.currentPage = Math.min(Math.max(1, page), this.totalPages);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.currentPage = 1;
  }

  isNumericColumn(colIndex: number): boolean {
    const sample = this.allRows.slice(0, 12).map((r) => r[colIndex]).filter((v) => v !== null && v !== undefined && v !== '');
    if (sample.length === 0) return false;
    return sample.every((v) => typeof v === 'number' || /^-?\d+(?:\.\d+)?$/.test(String(v).trim()));
  }

  formatCell(value: DataTableCell): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }

  getStatusTone(value: DataTableCell, colHeader: string): 'success' | 'warning' | 'danger' | 'info' | null {
    if (typeof value !== 'string') return null;
    const header = (colHeader || '').toLowerCase();
    const val = value.trim().toLowerCase();
    if (!header.includes('status') && !header.includes('state') && !header.includes('approval')) {
      return null;
    }
    if (['verified', 'approved', 'completed', 'active', 'present'].includes(val)) return 'success';
    if (['pending', 'submitted', 'in progress', 'draft'].includes(val)) return 'warning';
    if (['rejected', 'cancelled', 'failed', 'absent'].includes(val)) return 'danger';
    if (val) return 'info';
    return null;
  }

  downloadCsv(): void {
    const headers = this.columns;
    const rows = this.filteredRows;
    const escapeCsv = (val: DataTableCell): string => {
      const str = val === null || val === undefined ? '' : String(val);
      return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const lines = [
      headers.map(escapeCsv).join(','),
      ...rows.map((row) => headers.map((_, idx) => escapeCsv(row[idx])).join(',')),
    ];
    const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    this.triggerDownload(blob, `${this.safeBaseFileName()}.csv`);
  }

  downloadExcel(): void {
    const headers = this.columns;
    const aoa = [
      headers,
      ...this.filteredRows.map((row) => headers.map((_, idx) => row[idx] ?? '')),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(aoa);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    this.triggerDownload(blob, `${this.safeBaseFileName()}.xlsx`);
  }

  private safeBaseFileName(): string {
    const raw = (this.props?.exportFileName || this.props?.title || 'hrms-report')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return raw || 'hrms-report';
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private compareCells(a: DataTableCell, b: DataTableCell): number {
    const aNum = typeof a === 'number' ? a : Number(a);
    const bNum = typeof b === 'number' ? b : Number(b);
    if (
      a !== null &&
      a !== undefined &&
      a !== '' &&
      b !== null &&
      b !== undefined &&
      b !== '' &&
      !Number.isNaN(aNum) &&
      !Number.isNaN(bNum)
    ) {
      return aNum - bNum;
    }
    return this.formatCell(a).localeCompare(this.formatCell(b), undefined, { numeric: true, sensitivity: 'base' });
  }
}
