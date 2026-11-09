import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BiometricDevice, BiometricRawLog, BiometricService } from '../../services/biometric.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-biometric-raw-logs',
  templateUrl: './biometric-raw-logs.component.html',
  styleUrls: ['./biometric-raw-logs.component.scss'],
  standalone: false
})
export class BiometricRawLogsComponent implements OnInit, OnChanges {
  @Input() initialDeviceId?: string;

  logs: BiometricRawLog[] = [];
  devices: BiometricDevice[] = [];
  loading = false;

  // Filters
  selectedDeviceId: string = '';
  userIdFilter: string = '';
  dateFilter: string = '';

  // Pagination
  currentPage = 1;
  pageSize = 25;
  totalLogs = 0;

  constructor(
    private biometricService: BiometricService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    if (this.initialDeviceId) {
      this.selectedDeviceId = this.initialDeviceId;
    }
    this.loadLogs();
    this.loadDevices();
  }

  loadDevices(): void {
    this.biometricService.getDevices().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.devices = res.data;
        }
      },
      error: (err) => console.warn('Could not load devices for logs:', err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialDeviceId'] && changes['initialDeviceId'].currentValue) {
      this.selectedDeviceId = changes['initialDeviceId'].currentValue;
      this.currentPage = 1;
      this.loadLogs();
    }
  }

  loadLogs(): void {
    this.loading = true;
    this.biometricService.getRawLogs({
      page: this.currentPage,
      limit: this.pageSize,
      userId: this.userIdFilter,
      date: this.dateFilter,
      deviceId: this.selectedDeviceId
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          this.logs = res.data.logs || [];
          this.totalLogs = res.data.total || 0;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading raw biometric logs:', err);
        this.toaster.showError('Failed to load raw machine punch logs.');
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadLogs();
  }

  clearFilters(): void {
    this.selectedDeviceId = '';
    this.userIdFilter = '';
    this.dateFilter = '';
    this.currentPage = 1;
    this.loadLogs();
  }

  get totalPages(): number {
    return Math.ceil(this.totalLogs / this.pageSize) || 1;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLogs();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLogs();
    }
  }

  exportToCsv(): void {
    if (!this.logs || this.logs.length === 0) {
      this.toaster.showError('No records to export.');
      return;
    }

    const headers = ['Raw ID', 'Device ID', 'Biometric User ID', 'Punch Time', 'Direction', 'Status'];
    const rows = this.logs.map(log => [
      log.id,
      log.device_id,
      `"${log.biometric_user_id}"`,
      `"${log.punch_time}"`,
      log.direction || 'auto',
      log.status || 'processed'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `biometric_raw_punches_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

