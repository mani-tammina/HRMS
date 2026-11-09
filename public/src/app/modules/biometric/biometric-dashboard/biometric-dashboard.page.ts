import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BiometricDevice, BiometricService, BiometricStatusResponse } from '../services/biometric.service';
import { ToasterService } from '../../../core/services/toaster.service';

export type BiometricTab = 'overview' | 'devices' | 'mappings' | 'raw-logs' | 'daily-records';

@Component({
  selector: 'app-biometric-dashboard',
  templateUrl: './biometric-dashboard.page.html',
  styleUrls: ['./biometric-dashboard.page.scss'],
  standalone: false
})
export class BiometricDashboardPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  activeTab: BiometricTab = 'overview';
  loading = false;

  statusData: BiometricStatusResponse | null = null;
  devices: BiometricDevice[] = [];
  unmappedCount = 0;

  selectedDeviceIdForLogs: string = '';

  constructor(
    private biometricService: BiometricService,
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Detect tab from route url
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const path = this.route.snapshot.url[0]?.path;
      if (path && ['devices', 'mappings', 'raw-logs', 'daily-records'].includes(path)) {
        this.activeTab = path as BiometricTab;
      } else {
        this.activeTab = 'overview';
      }
    });

    this.refreshAll();
  }

  setTab(tab: BiometricTab): void {
    this.activeTab = tab;
    if (tab === 'overview') {
      this.router.navigate(['/biometric']);
    } else {
      this.router.navigate(['/biometric', tab]);
    }
  }

  refreshAll(): void {
    this.loadStatus();
    this.loadDevices();
    this.loadUnmappedCount();
  }

  loadStatus(): void {
    this.loading = true;
    this.biometricService.getStatus().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          this.statusData = res.data;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching biometric status:', err);
      }
    });
  }

  loadDevices(): void {
    this.biometricService.getDevices().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.devices = res.data;
        }
      },
      error: (err) => console.warn('Could not load devices:', err)
    });
  }

  loadUnmappedCount(): void {
    this.biometricService.getUnmappedUsers().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.unmappedCount = res.data.length;
        }
      },
      error: (err) => console.warn('Could not check unmapped count:', err)
    });
  }

  onViewDeviceLogs(deviceId: string): void {
    this.selectedDeviceIdForLogs = deviceId;
    this.setTab('raw-logs');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
