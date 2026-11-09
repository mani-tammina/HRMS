import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BiometricDevice, BiometricService, CompanyLocation } from '../../services/biometric.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-biometric-devices',
  templateUrl: './biometric-devices.component.html',
  styleUrls: ['./biometric-devices.component.scss'],
  standalone: false
})
export class BiometricDevicesComponent implements OnInit {
  @Output() viewDeviceLogs = new EventEmitter<string>();

  devices: BiometricDevice[] = [];
  loading = false;
  searchQuery = '';
  savingDevice = false;

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
    this.loadDevices();
    this.loadLocations();
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
}
