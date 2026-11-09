import { Component, OnInit } from '@angular/core';
import { BiometricDevice, BiometricMapping, BiometricService, UnmappedUser } from '../../services/biometric.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-biometric-mappings',
  templateUrl: './biometric-mappings.component.html',
  styleUrls: ['./biometric-mappings.component.scss'],
  standalone: false
})
export class BiometricMappingsComponent implements OnInit {
  activeTab: 'mapped' | 'unmapped' = 'mapped';

  mappings: BiometricMapping[] = [];
  devices: BiometricDevice[] = [];
  unmappedUsers: UnmappedUser[] = [];
  allEmployees: any[] = [];
  filteredEmployeesList: any[] = [];

  loading = false;
  loadingUnmapped = false;
  autoMatching = false;
  savingMapping = false;

  searchQuery = '';
  unmappedSearchQuery = '';

  // Add / Edit Modal state
  showMappingModal = false;
  modalMode: 'add' | 'edit' = 'add';
  mappingForm = {
    id: 0,
    employeeId: null as number | null,
    biometricUserId: '',
    deviceId: '' as string,
    active: 1
  };
  employeeSearchTerm = '';

  constructor(
    private biometricService: BiometricService,
    private employeeService: EmployeeService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadMappings();
    this.loadUnmapped();
    this.loadEmployeesList();
    this.loadDevices();
  }

  loadDevices(): void {
    this.biometricService.getDevices().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.devices = res.data;
        }
      },
      error: (err) => console.warn('Could not load devices for mappings:', err)
    });
  }

  loadMappings(): void {
    this.loading = true;
    this.biometricService.getMappings().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          this.mappings = res.data;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching biometric mappings:', err);
        this.toaster.showError('Failed to load biometric mappings.');
      }
    });
  }

  loadUnmapped(): void {
    this.loadingUnmapped = true;
    this.biometricService.getUnmappedUsers().subscribe({
      next: (res) => {
        this.loadingUnmapped = false;
        if (res.success && res.data) {
          this.unmappedUsers = res.data;
        }
      },
      error: (err) => {
        this.loadingUnmapped = false;
        console.error('Error fetching unmapped biometric users:', err);
      }
    });
  }

  loadEmployeesList(): void {
    this.employeeService.getAllEmployees(1, 1500).subscribe({
      next: (res) => {
        if (res && res.employees) {
          this.allEmployees = res.employees;
        } else if (Array.isArray(res)) {
          this.allEmployees = res;
        }
        this.filterEmployees();
      },
      error: (err) => {
        console.warn('Could not preload employees list:', err);
      }
    });
  }

  filterEmployees(): void {
    if (!this.employeeSearchTerm.trim()) {
      this.filteredEmployeesList = this.allEmployees.slice(0, 30);
      return;
    }
    const q = this.employeeSearchTerm.toLowerCase().trim();
    this.filteredEmployeesList = this.allEmployees.filter(e =>
      `${e.FirstName || ''} ${e.LastName || ''}`.toLowerCase().includes(q) ||
      (e.EmployeeNumber && e.EmployeeNumber.toLowerCase().includes(q))
    ).slice(0, 30);
  }

  get filteredMappings(): BiometricMapping[] {
    if (!this.searchQuery.trim()) return this.mappings;
    const q = this.searchQuery.toLowerCase().trim();
    return this.mappings.filter(m =>
      `${m.FirstName || ''} ${m.LastName || ''}`.toLowerCase().includes(q) ||
      (m.EmployeeNumber && m.EmployeeNumber.toLowerCase().includes(q)) ||
      m.biometric_user_id.toLowerCase().includes(q)
    );
  }

  get filteredUnmappedUsers(): UnmappedUser[] {
    if (!this.unmappedSearchQuery.trim()) return this.unmappedUsers;
    const q = this.unmappedSearchQuery.toLowerCase().trim();
    return this.unmappedUsers.filter(u =>
      u.biometric_user_id.toLowerCase().includes(q) ||
      (u.device_ids && u.device_ids.toLowerCase().includes(q))
    );
  }

  openAddMappingModal(prefillBiometricId?: string, deviceId?: string): void {
    this.modalMode = 'add';
    this.mappingForm = {
      id: 0,
      employeeId: null,
      biometricUserId: prefillBiometricId || '',
      deviceId: deviceId || '',
      active: 1
    };
    this.employeeSearchTerm = '';
    this.filterEmployees();
    this.showMappingModal = true;
  }

  openEditMappingModal(mapping: BiometricMapping): void {
    this.modalMode = 'edit';
    this.mappingForm = {
      id: mapping.id,
      employeeId: mapping.employee_id,
      biometricUserId: mapping.biometric_user_id,
      deviceId: mapping.device_id || '',
      active: mapping.active
    };
    const emp = this.allEmployees.find(e => e.id === mapping.employee_id);
    this.employeeSearchTerm = emp ? `${emp.FirstName} ${emp.LastName} (${emp.EmployeeNumber})` : '';
    this.filterEmployees();
    this.showMappingModal = true;
  }

  closeModal(): void {
    this.showMappingModal = false;
  }

  selectEmployee(emp: any): void {
    this.mappingForm.employeeId = emp.id;
    this.employeeSearchTerm = `${emp.FirstName} ${emp.LastName} (${emp.EmployeeNumber})`;
  }

  saveMapping(): void {
    if (!this.mappingForm.employeeId) {
      this.toaster.showError('Please select an employee.');
      return;
    }
    if (!this.mappingForm.biometricUserId.trim()) {
      this.toaster.showError('Please enter a biometric user ID.');
      return;
    }

    this.savingMapping = true;
    this.biometricService.saveMapping({
      employeeId: this.mappingForm.employeeId,
      biometricUserId: this.mappingForm.biometricUserId.trim(),
      deviceId: this.mappingForm.deviceId || null,
      active: this.mappingForm.active
    }).subscribe({
      next: (res) => {
        this.savingMapping = false;
        this.toaster.showSuccess('Biometric mapping saved successfully.');
        this.closeModal();
        this.loadMappings();
        this.loadUnmapped();
      },
      error: (err) => {
        this.savingMapping = false;
        console.error('Error saving mapping:', err);
        this.toaster.showError(err.error?.message || 'Failed to save biometric mapping.');
      }
    });
  }

  deleteMapping(mapping: BiometricMapping): void {
    if (!confirm(`Are you sure you want to remove mapping for ${mapping.FirstName} ${mapping.LastName} (${mapping.biometric_user_id})?`)) {
      return;
    }

    this.biometricService.deleteMapping(mapping.id).subscribe({
      next: () => {
        this.toaster.showSuccess('Biometric mapping removed.');
        this.loadMappings();
        this.loadUnmapped();
      },
      error: (err) => {
        console.error('Error deleting mapping:', err);
        this.toaster.showError('Failed to remove biometric mapping.');
      }
    });
  }

  autoMatchAll(): void {
    this.autoMatching = true;
    this.biometricService.autoMapEmployees().subscribe({
      next: (res) => {
        this.autoMatching = false;
        this.toaster.showSuccess(res.message || `Matched ${res.matchedCount} employees!`);
        this.loadMappings();
        this.loadUnmapped();
      },
      error: (err) => {
        this.autoMatching = false;
        console.error('Error auto-mapping:', err);
        this.toaster.showError('Auto-matching failed.');
      }
    });
  }
}

