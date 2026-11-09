import { Component, OnInit } from '@angular/core';
import { BiometricDailyRecord, BiometricService } from '../../services/biometric.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-biometric-daily-records',
  templateUrl: './biometric-daily-records.component.html',
  styleUrls: ['./biometric-daily-records.component.scss'],
  standalone: false
})
export class BiometricDailyRecordsComponent implements OnInit {
  records: BiometricDailyRecord[] = [];
  loading = false;

  // Filters
  dateFilter: string = '';
  searchQuery: string = '';
  statusFilter: string = '';

  // Pagination
  currentPage = 1;
  pageSize = 20;
  totalRecords = 0;

  // Selected record for punches detail modal
  selectedRecord: BiometricDailyRecord | null = null;
  showDetailModal = false;

  constructor(
    private biometricService: BiometricService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    // Default to today
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    this.dateFilter = `${y}-${m}-${day}`;

    this.loadRecords();
  }

  loadRecords(): void {
    this.loading = true;
    this.biometricService.getDailyRecords({
      page: this.currentPage,
      limit: this.pageSize,
      date: this.dateFilter,
      search: this.searchQuery,
      status: this.statusFilter
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          this.records = res.data.records || [];
          this.totalRecords = res.data.total || 0;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading daily biometric records:', err);
        this.toaster.showError('Failed to load biometric daily records.');
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadRecords();
  }

  clearFilters(): void {
    this.dateFilter = '';
    this.searchQuery = '';
    this.statusFilter = '';
    this.currentPage = 1;
    this.loadRecords();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize) || 1;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRecords();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRecords();
    }
  }

  openPunchesDetail(record: BiometricDailyRecord): void {
    this.selectedRecord = record;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedRecord = null;
  }

  getPunchesArray(record: BiometricDailyRecord): any[] {
    if (!record || !record.punches_detail) return [];
    if (Array.isArray(record.punches_detail)) {
      return record.punches_detail;
    }
    try {
      return JSON.parse(record.punches_detail as any);
    } catch {
      return [];
    }
  }
}

