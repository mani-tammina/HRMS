import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { BiometricDevice, BiometricService, CompanyLocation, DeviceLivePingStatus } from '../../services/biometric.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-biometric-devices',
  templateUrl: './biometric-devices.component.html',
  styleUrls: ['./biometric-devices.component.scss'],
  standalone: false
})
export class BiometricDevicesComponent implements OnInit, OnDestroy {
  @Output() viewDeviceLogs = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  private pingSubscription: Subscription | null = null;
  liveStatusMap: Record<string, DeviceLivePingStatus> = {};
  lastPingTimestamp: string | null = null;

  // Configurable User Ping Rate
  pingIntervalSec: number = 30;
  isPingingNow = false;
  readonly pingIntervalOptions = [
    { label: '5s (Fast Debug)', value: 5 },
    { label: '10s', value: 10 },
    { label: '15s', value: 15 },
    { label: '30s (Recommended)', value: 30 },
    { label: '60s (1 min)', value: 60 },
    { label: '120s (2 min)', value: 120 },
    { label: 'Paused (Manual)', value: 0 }
  ];

  devices: BiometricDevice[] = [];
  loading = false;
  searchQuery = '';
  savingDevice = false;
  syncingDeviceId: string | number | null = null;
  syncingAll = false;

  // Dynamic Locations from Master Data API (/api/locations)
  locationsList: CompanyLocation[] = [];
  loadingLocations = false;
  customLocationMode = false;

  // Add / Edit Modal State
  showDeviceModal = false;
  modalMode: 'add' | 'edit' = 'add';
  deviceForm = {
    id: null as number | null,
    deviceId: '',
    name: '',
    location: '',
    deviceType: 'Biometric / Fingerprint & Face',
    ipAddress: '',
    serialNumber: '',
    status: 'active'
  };

  deviceTypesList = [
    'Biometric / Fingerprint & Face',
    'Biometric / Fingerprint',
    'Biometric / Face Recognition',
    'RFID Card & Fingerprint Scanner',
    'Iris & Facial Recognition Terminal',
    'Optical Fingerprint Reader'
  ];

  constructor(
    private biometricService: BiometricService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('biometric_ping_interval_sec');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        this.pingIntervalSec = parsed;
      }
    }

    this.loadDevices();
    this.loadLocations();
    this.startLivePingPolling();
    this.setupVisibilityListener();
  }

  ngOnDestroy(): void {
    this.stopLivePingPolling();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPingIntervalChange(): void {
    localStorage.setItem('biometric_ping_interval_sec', String(this.pingIntervalSec));
    if (this.pingIntervalSec > 0) {
      // Sync desired interval with backend daemon and restart timer
      this.biometricService.getDevicesLivePing({ interval: this.pingIntervalSec }).subscribe({
        next: (res) => {
          if (res?.success && res.data) {
            this.liveStatusMap = res.data;
            this.lastPingTimestamp = res.timestamp;
            this.applyLivePingStatus();
          }
        }
      });
      this.startLivePingPolling();
      this.toaster.showSuccess(`Live ping rate set to every ${this.pingIntervalSec}s.`);
    } else {
      this.stopLivePingPolling();
      this.toaster.showInfo('Live auto-ping paused. Click "Ping Now" anytime for manual checks.');
    }
  }

  pingNow(): void {
    this.isPingingNow = true;
    this.biometricService.getDevicesLivePing({ force: true }).subscribe({
      next: (res) => {
        this.isPingingNow = false;
        if (res?.success && res.data) {
          this.liveStatusMap = res.data;
          this.lastPingTimestamp = res.timestamp;
          this.applyLivePingStatus();
          this.toaster.showSuccess('Device status updated via instant ping.');
        }
      },
      error: (err) => {
        this.isPingingNow = false;
        console.error('Error during manual ping:', err);
        this.toaster.showError('Failed to ping devices.');
      }
    });
  }

  stopLivePingPolling(): void {
    if (this.pingSubscription) {
      this.pingSubscription.unsubscribe();
      this.pingSubscription = null;
    }
  }

  startLivePingPolling(): void {
    this.stopLivePingPolling();
    if (this.pingIntervalSec <= 0) return;

    // Poll live reachability every user-configured seconds with non-overlapping switchMap
    this.pingSubscription = timer(500, this.pingIntervalSec * 1000)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => typeof document === 'undefined' || !document.hidden),
        switchMap(() => this.biometricService.getDevicesLivePing())
      )
      .subscribe({
        next: (res) => {
          if (res?.success && res.data) {
            this.liveStatusMap = res.data;
            this.lastPingTimestamp = res.timestamp;
            this.applyLivePingStatus();
          }
        },
        error: (err) => {
          console.warn('[BiometricLivePing] Polling error:', err);
        }
      });
  }

  private setupVisibilityListener(): void {
    // When admin returns to the tab after it was hidden, immediately trigger fresh ping
    if (typeof document !== 'undefined') {
      const handleVisibility = () => {
        if (!document.hidden && this.pingIntervalSec > 0) {
          this.biometricService.getDevicesLivePing().pipe(takeUntil(this.destroy$)).subscribe({
            next: (res) => {
              if (res?.success && res.data) {
                this.liveStatusMap = res.data;
                this.lastPingTimestamp = res.timestamp;
                this.applyLivePingStatus();
              }
            }
          });
        }
      };
      document.addEventListener('visibilitychange', handleVisibility);
      this.destroy$.subscribe(() => {
        document.removeEventListener('visibilitychange', handleVisibility);
      });
    }
  }

  applyLivePingStatus(): void {
    if (!this.devices || this.devices.length === 0) return;
    for (const dev of this.devices) {
      const ping = this.liveStatusMap[String(dev.deviceId)];
      if (ping) {
        if (dev.configStatus !== 'inactive') {
          dev.status = ping.online ? 'online' : 'offline';
          dev.isOnline = ping.online;
        }
        dev.latency = ping.latency;
      }
    }
  }

  loadLocations(): void {
    this.loadingLocations = true;
    this.biometricService.getLocations().subscribe({
      next: (res: any) => {
        this.loadingLocations = false;
        this.locationsList = Array.isArray(res) ? res : (res?.data || []);
      },
      error: (err) => {
        this.loadingLocations = false;
        console.warn('Failed to load locations from /api/locations:', err);
      }
    });
  }

  isLocationInList(locName: string): boolean {
    if (!locName) return true;
    return this.locationsList.some(l => (l.name || '').trim().toLowerCase() === locName.trim().toLowerCase());
  }

  loadDevices(): void {
    this.loading = true;
    this.biometricService.getDevices().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          this.devices = res.data;
          this.applyLivePingStatus();
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching devices:', err);
        this.toaster.showError('Failed to fetch biometric devices.');
      }
    });
  }

  get filteredDevices(): BiometricDevice[] {
    if (!this.searchQuery.trim()) return this.devices;
    const q = this.searchQuery.toLowerCase().trim();
    return this.devices.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.deviceId.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.ipAddress.toLowerCase().includes(q)
    );
  }

  get totalPunchesAll(): number {
    return this.devices.reduce((acc, d) => acc + (d.totalPunches || 0), 0);
  }

  get onlineDevicesCount(): number {
    return this.devices.filter(d => d.status === 'online').length;
  }

  inspectLogs(deviceId: string): void {
    this.viewDeviceLogs.emit(deviceId);
  }

  openAddDeviceModal(): void {
    this.modalMode = 'add';
    this.customLocationMode = false;
    this.deviceForm = {
      id: null,
      deviceId: '',
      name: '',
      location: this.locationsList.length > 0 ? this.locationsList[0].name : '',
      deviceType: 'Biometric / Fingerprint & Face',
      ipAddress: '',
      serialNumber: '',
      status: 'active'
    };
    this.showDeviceModal = true;
  }

  openEditDeviceModal(device: BiometricDevice): void {
    this.modalMode = 'edit';
    const loc = device.location || '';
    this.customLocationMode = !!(loc && !this.isLocationInList(loc));
    this.deviceForm = {
      id: typeof device.id === 'number' ? device.id : parseInt(String(device.id), 10) || null,
      deviceId: device.deviceId,
      name: device.name,
      location: loc,
      deviceType: device.type || 'Biometric / Fingerprint & Face',
      ipAddress: device.ipAddress || '',
      serialNumber: device.serialNumber || '',
      status: device.configStatus || 'active'
    };
    this.showDeviceModal = true;
  }

  closeDeviceModal(): void {
    this.showDeviceModal = false;
  }

  saveDevice(): void {
    if (!this.deviceForm.deviceId.trim()) {
      this.toaster.showError('Please enter a Device ID.');
      return;
    }
    if (!this.deviceForm.name.trim()) {
      this.toaster.showError('Please enter a Device Name.');
      return;
    }

    this.savingDevice = true;

    if (this.modalMode === 'edit' && this.deviceForm.id) {
      this.biometricService.updateDevice(this.deviceForm.id, {
        deviceId: this.deviceForm.deviceId.trim(),
        name: this.deviceForm.name.trim(),
        location: this.deviceForm.location.trim(),
        deviceType: this.deviceForm.deviceType,
        ipAddress: this.deviceForm.ipAddress.trim(),
        serialNumber: this.deviceForm.serialNumber.trim(),
        status: this.deviceForm.status
      }).subscribe({
        next: (res) => {
          this.savingDevice = false;
          this.toaster.showSuccess(res.message || 'Device updated successfully.');
          this.closeDeviceModal();
          this.loadDevices();
        },
        error: (err) => {
          this.savingDevice = false;
          console.error('Error updating device:', err);
          this.toaster.showError(err.error?.message || 'Failed to update device.');
        }
      });
    } else {
      this.biometricService.addDevice({
        deviceId: this.deviceForm.deviceId.trim(),
        name: this.deviceForm.name.trim(),
        location: this.deviceForm.location.trim(),
        deviceType: this.deviceForm.deviceType,
        ipAddress: this.deviceForm.ipAddress.trim(),
        serialNumber: this.deviceForm.serialNumber.trim(),
        status: this.deviceForm.status
      }).subscribe({
        next: (res) => {
          this.savingDevice = false;
          this.toaster.showSuccess(res.message || 'Device added successfully.');
          this.closeDeviceModal();
          this.loadDevices();
        },
        error: (err) => {
          this.savingDevice = false;
          console.error('Error adding device:', err);
          this.toaster.showError(err.error?.message || 'Failed to add device.');
        }
      });
    }
  }

  deleteDevice(device: BiometricDevice): void {
    if (!confirm(`Are you sure you want to remove ${device.name} (Device #${device.deviceId})?`)) {
      return;
    }

    this.biometricService.deleteDevice(device.id).subscribe({
      next: (res) => {
        this.toaster.showSuccess(res.message || 'Device removed successfully.');
        this.loadDevices();
      },
      error: (err) => {
        console.error('Error deleting device:', err);
        this.toaster.showError(err.error?.message || 'Failed to delete device.');
      }
    });
  }

  syncDevice(device: BiometricDevice): void {
    this.syncingDeviceId = device.id;
    this.biometricService.syncDevice(device.id).subscribe({
      next: (res) => {
        this.syncingDeviceId = null;
        if (res.success) {
          this.toaster.showSuccess(res.message || `Device "${device.name}" synced successfully.`);
          this.loadDevices();
        } else {
          this.toaster.showError(res.message || `Could not sync device "${device.name}".`);
        }
      },
      error: (err) => {
        this.syncingDeviceId = null;
        console.error('Error syncing device:', err);
        const errMsg = err?.error?.message || `Failed to connect to device "${device.name}". Please check IP & network.`;
        this.toaster.showError(errMsg);
      }
    });
  }

  syncAllDevices(): void {
    this.syncingAll = true;
    this.biometricService.syncNow().subscribe({
      next: (res) => {
        this.syncingAll = false;
        if (res.success) {
          this.toaster.showSuccess(res.message || 'Direct sync completed for all configured devices.');
          this.loadDevices();
        } else {
          this.toaster.showError(res.message || 'Device sync finished with issues.');
        }
      },
      error: (err) => {
        this.syncingAll = false;
        console.error('Error in direct sync:', err);
        this.toaster.showError('Failed to trigger device synchronization.');
      }
    });
  }
}
