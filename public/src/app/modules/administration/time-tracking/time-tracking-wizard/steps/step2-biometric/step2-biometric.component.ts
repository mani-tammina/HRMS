import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../../../../../core/services/admin.service';

export interface IpNetwork {
  id: number;
  name: string;
  ip_address: string;
  selected?: boolean;
}

@Component({
  selector: 'app-step2-biometric',
  templateUrl: './step2-biometric.component.html',
  styleUrls: ['./step2-biometric.component.scss'],
  standalone: false
})
export class Step2BiometricComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() allLocations: any[] = [];

  showAddIpModal = false;
  newIpName = '';
  newIpAddress = '';
  selectedLocationId: any = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchLocationsFromApi();
  }

  fetchLocationsFromApi() {
    this.adminService.getLocations().subscribe({
      next: (locations: any[]) => {
        if (locations && locations.length > 0) {
          this.allLocations = locations;
          const existing = this.formGroup.get('ip_networks')?.value;
          if (!existing || existing.length === 0) {
            const mappedIps: IpNetwork[] = locations.map((loc: any, idx: number) => ({
              id: loc.id || (idx + 1),
              name: loc.name || loc.location_name || `Location ${idx + 1}`,
              ip_address: loc.ip_address || loc.ip_range || `103.40.48.${140 + idx} - 103.40.48.${140 + idx} (+1 More)`,
              selected: false
            }));
            this.formGroup.get('ip_networks')?.setValue(mappedIps);
          }
        }
      },
      error: (err: any) => {
        console.warn('Could not fetch locations from API:', err);
      }
    });
  }

  get ipNetworks(): IpNetwork[] {
    return this.formGroup.get('ip_networks')?.value || [];
  }

  get biometricEnabled(): boolean {
    return !!this.formGroup.get('biometric_enabled')?.value;
  }

  get webClockinEnabled(): boolean {
    return !!this.formGroup.get('web_clockin_enabled')?.value;
  }

  get allowFallback(): boolean {
    return this.formGroup.get('allow_web_clockin_fallback')?.value === 'yes';
  }

  get ipRestrictionEnabled(): boolean {
    return !!this.formGroup.get('ip_restriction_enabled')?.value;
  }

  get hasSelectedIps(): boolean {
    return this.ipNetworks.some(item => item.selected);
  }

  get isAllSelected(): boolean {
    const list = this.ipNetworks;
    return list.length > 0 && list.every(item => item.selected);
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    const list = this.ipNetworks.map(item => ({ ...item, selected: checked }));
    this.formGroup.get('ip_networks')?.setValue(list);
  }

  toggleRow(id: number, event: any) {
    const checked = event.target.checked;
    const list = this.ipNetworks.map(item => item.id === id ? { ...item, selected: checked } : item);
    this.formGroup.get('ip_networks')?.setValue(list);
  }

  removeSingleIp(id: number) {
    const updated = this.ipNetworks.filter(item => item.id !== id);
    this.formGroup.get('ip_networks')?.setValue(updated);
  }

  removeSelectedIps() {
    const updated = this.ipNetworks.filter(item => !item.selected);
    this.formGroup.get('ip_networks')?.setValue(updated);
  }

  onLocationSelectChange(event: any) {
    const selectedId = event.target.value;
    const found = this.allLocations.find(l => String(l.id) === String(selectedId));
    if (found) {
      this.newIpName = found.name || found.location_name;
      if (found.ip_address || found.ip_range) {
        this.newIpAddress = found.ip_address || found.ip_range;
      }
    }
  }

  openAddIpModal() {
    this.newIpName = '';
    this.newIpAddress = '';
    this.selectedLocationId = '';
    this.showAddIpModal = true;
  }

  closeAddIpModal() {
    this.showAddIpModal = false;
  }

  addIpNetwork() {
    if (!this.newIpName.trim() || !this.newIpAddress.trim()) return;
    const newItem: IpNetwork = {
      id: Date.now(),
      name: this.newIpName.trim(),
      ip_address: this.newIpAddress.trim(),
      selected: false
    };
    const updated = [...this.ipNetworks, newItem];
    this.formGroup.get('ip_networks')?.setValue(updated);
    this.closeAddIpModal();
  }

  setFallbackOption(val: string) {
    this.formGroup.get('allow_web_clockin_fallback')?.setValue(val);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}


