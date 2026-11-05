import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {
  AttendancePolicyService,
  AttendancePolicy,
  AttendancePolicyEmployee
} from '../../../../core/services/attendance-policy.service';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-attendance-time-tracking-policy',
  templateUrl: './attendance-time-tracking-policy.component.html',
  styleUrls: ['./attendance-time-tracking-policy.component.scss'],
  standalone: false
})
export class AttendanceTimeTrackingPolicyComponent implements OnInit {
  @Input() isEmbedded: boolean = false;
  @Input() activeTopTab: string = 'attendance-time-tracking-policy';
  @Output() tabChange = new EventEmitter<string>();

  policies: AttendancePolicy[] = [];
  loading = false;
  selectedPolicy: AttendancePolicy | null = null;
  selectedPolicyEmployees: AttendancePolicyEmployee[] = [];
  loadingEmployees = false;

  searchTerm = '';
  employeeSearchTerm = '';
  activeDetailTab: 'summary' | 'employees' = 'summary';

  // Create / Edit Modal State
  showModal = false;
  isEdit = false;
  editingPolicyId: number | null = null;
  modalSubmitting = false;
  policyForm: { name: string; description: string } = {
    name: '',
    description: ''
  };
  formError = '';

  // Assign Employees Modal State
  showAssignModal = false;
  allEmployees: any[] = [];
  loadingAllEmployees = false;
  assignSearchTerm = '';
  selectedEmployeeIds: Set<number> = new Set();
  assigningSubmitting = false;

  constructor(
    private router: Router,
    private policyService: AttendancePolicyService,
    private employeeService: EmployeeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadPolicies();
  }

  ionViewWillEnter() {
    this.loadPolicies();
  }

  onTabClick(tab: string) {
    this.activeTopTab = tab;
    this.tabChange.emit(tab);
    if (!this.isEmbedded && tab === 'time-tracking-policy') {
      this.router.navigate(['/administration/time-tracking']);
    }
  }

  loadPolicies() {
    this.loading = true;
    this.policyService.getPolicies().subscribe({
      next: (res) => {
        this.policies = res || [];
        this.loading = false;
        if (this.policies.length > 0) {
          if (this.selectedPolicy) {
            const found = this.policies.find((p) => p.id === this.selectedPolicy!.id);
            this.selectedPolicy = found || this.policies[0];
          } else {
            this.selectedPolicy = this.policies[0];
          }
          if (this.selectedPolicy) {
            this.loadEmployeesForPolicy(this.selectedPolicy.id);
          }
        } else {
          this.selectedPolicy = null;
          this.selectedPolicyEmployees = [];
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to load attendance policies:', err);
        this.showToast('Failed to load attendance policies', 'danger');
      }
    });
  }

  selectPolicy(policy: AttendancePolicy) {
    this.selectedPolicy = policy;
    this.activeDetailTab = 'summary';
    this.employeeSearchTerm = '';
    this.loadEmployeesForPolicy(policy.id);
  }

  loadEmployeesForPolicy(id: number) {
    this.loadingEmployees = true;
    this.selectedPolicyEmployees = [];
    this.policyService.getPolicyEmployees(id).subscribe({
      next: (res) => {
        this.selectedPolicyEmployees = res || [];
        this.loadingEmployees = false;
      },
      error: (err) => {
        this.loadingEmployees = false;
        console.error('Failed to load employees for attendance policy:', err);
      }
    });
  }

  get filteredPolicies(): AttendancePolicy[] {
    if (!this.searchTerm.trim()) return this.policies;
    const term = this.searchTerm.toLowerCase();
    return this.policies.filter((p) =>
      p.name?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
    );
  }

  get filteredEmployees(): AttendancePolicyEmployee[] {
    if (!this.employeeSearchTerm.trim()) return this.selectedPolicyEmployees;
    const term = this.employeeSearchTerm.toLowerCase();
    return this.selectedPolicyEmployees.filter((e) =>
      e.first_name?.toLowerCase().includes(term) ||
      e.last_name?.toLowerCase().includes(term) ||
      e.full_name?.toLowerCase().includes(term) ||
      (e.emp_no || e.EmployeeNumber || '').toLowerCase().includes(term) ||
      e.work_email?.toLowerCase().includes(term) ||
      e.department_name?.toLowerCase().includes(term) ||
      e.designation_name?.toLowerCase().includes(term) ||
      e.location_name?.toLowerCase().includes(term)
    );
  }

  // ─── CRUD: Create ───────────────────────────────────────────────────────────
  openCreateModal() {
    this.isEdit = false;
    this.editingPolicyId = null;
    this.policyForm = { name: '', description: '' };
    this.formError = '';
    this.showModal = true;
  }

  // ─── CRUD: Update ───────────────────────────────────────────────────────────
  openEditModal(policy: AttendancePolicy) {
    this.isEdit = true;
    this.editingPolicyId = policy.id;
    this.policyForm = {
      name: policy.name,
      description: policy.description || ''
    };
    this.formError = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalSubmitting = false;
    this.formError = '';
  }

  savePolicy() {
    const trimmedName = this.policyForm.name.trim();
    if (!trimmedName) {
      this.formError = 'Policy name is required';
      return;
    }

    this.modalSubmitting = true;
    this.formError = '';

    const payload = {
      name: trimmedName,
      description: this.policyForm.description.trim() || undefined
    };

    if (this.isEdit && this.editingPolicyId) {
      this.policyService.updatePolicy(this.editingPolicyId, payload).subscribe({
        next: () => {
          this.modalSubmitting = false;
          this.showModal = false;
          this.showToast('Attendance policy updated successfully', 'success');
          this.loadPolicies();
        },
        error: (err) => {
          this.modalSubmitting = false;
          this.formError = err?.error?.error || 'Failed to update attendance policy';
        }
      });
    } else {
      this.policyService.createPolicy(payload).subscribe({
        next: (created) => {
          this.modalSubmitting = false;
          this.showModal = false;
          this.showToast('Attendance policy created successfully', 'success');
          this.selectedPolicy = created;
          this.loadPolicies();
        },
        error: (err) => {
          this.modalSubmitting = false;
          this.formError = err?.error?.error || 'Failed to create attendance policy';
        }
      });
    }
  }

  // ─── CRUD: Delete ───────────────────────────────────────────────────────────
  async confirmDelete(policy: AttendancePolicy) {
    const empCount = policy.employee_count || 0;

    if (empCount > 0) {
      const alert = await this.alertCtrl.create({
        header: 'Delete Policy',
        subHeader: `Warning: ${empCount} Employee(s) Assigned`,
        message: `Policy "${policy.name}" is currently assigned to ${empCount} employee(s). Would you like to unassign these employees and delete this policy?`,
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Unassign & Delete',
            role: 'destructive',
            handler: () => {
              this.executeDelete(policy.id, true);
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Delete Attendance Policy',
        message: `Are you sure you want to delete "${policy.name}"? This action cannot be undone.`,
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.executeDelete(policy.id, false);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  private executeDelete(id: number, unassign: boolean) {
    this.policyService.deletePolicy(id, unassign).subscribe({
      next: () => {
        this.showToast('Attendance policy deleted successfully', 'success');
        if (this.selectedPolicy?.id === id) {
          this.selectedPolicy = null;
        }
        this.loadPolicies();
      },
      error: (err) => {
        const msg = err?.error?.error || 'Failed to delete attendance policy';
        this.showToast(msg, 'danger');
      }
    });
  }

  // ─── Employee Assignment ────────────────────────────────────────────────────
  openAssignEmployeesModal() {
    if (!this.selectedPolicy) return;
    this.showAssignModal = true;
    this.assignSearchTerm = '';
    this.selectedEmployeeIds.clear();
    this.loadAllEmployees();
  }

  closeAssignModal() {
    this.showAssignModal = false;
    this.selectedEmployeeIds.clear();
  }

  loadAllEmployees() {
    this.loadingAllEmployees = true;
    this.employeeService.getAllEmployees(1, 2000, '').subscribe({
      next: (res) => {
        const list = res?.data || res?.employees || res || [];
        const arr = Array.isArray(list) ? list : [];
        arr.sort((a: any, b: any) => {
          const nameA = (a.FullName || a.full_name || `${a.FirstName || a.first_name || ''} ${a.LastName || a.last_name || ''}`).trim().toLowerCase();
          const nameB = (b.FullName || b.full_name || `${b.FirstName || b.first_name || ''} ${b.LastName || b.last_name || ''}`).trim().toLowerCase();
          return nameA.localeCompare(nameB);
        });
        this.allEmployees = arr;
        this.loadingAllEmployees = false;
      },
      error: (err) => {
        this.loadingAllEmployees = false;
        console.error('Failed to load employees for assignment:', err);
      }
    });
  }

  get filteredAssignableEmployees(): any[] {
    const assignedIds = new Set(this.selectedPolicyEmployees.map(e => e.id));
    let list = this.allEmployees.filter(e => !assignedIds.has(e.id));
    if (!this.assignSearchTerm.trim()) return list;
    const term = this.assignSearchTerm.toLowerCase().trim();
    return list.filter(e => {
      const fn = (e.FirstName || e.first_name || '').toLowerCase();
      const ln = (e.LastName || e.last_name || '').toLowerCase();
      const full = (e.FullName || e.full_name || `${fn} ${ln}`).toLowerCase();
      const code = (e.EmployeeNumber || e.emp_no || '').toLowerCase();
      const email = (e.WorkEmail || e.work_email || '').toLowerCase();
      const dept = (e.department_name || e.Department || '').toLowerCase();
      const desig = (e.designation_name || e.Designation || '').toLowerCase();
      return (
        full.includes(term) ||
        fn.includes(term) ||
        ln.includes(term) ||
        code.includes(term) ||
        email.includes(term) ||
        dept.includes(term) ||
        desig.includes(term)
      );
    });
  }

  toggleEmployeeSelection(id: number) {
    if (this.selectedEmployeeIds.has(id)) {
      this.selectedEmployeeIds.delete(id);
    } else {
      this.selectedEmployeeIds.add(id);
    }
  }

  isEmployeeSelected(id: number): boolean {
    return this.selectedEmployeeIds.has(id);
  }

  saveEmployeeAssignments() {
    if (!this.selectedPolicy || this.selectedEmployeeIds.size === 0) return;
    this.assigningSubmitting = true;
    const empIds = Array.from(this.selectedEmployeeIds);
    this.policyService.assignEmployees(this.selectedPolicy.id, empIds).subscribe({
      next: () => {
        this.assigningSubmitting = false;
        this.showAssignModal = false;
        this.showToast(`${empIds.length} employee(s) assigned to ${this.selectedPolicy!.name}`, 'success');
        this.loadPolicies();
      },
      error: (err) => {
        this.assigningSubmitting = false;
        this.showToast(err?.error?.error || 'Failed to assign employees', 'danger');
      }
    });
  }

  async unassignEmployee(emp: AttendancePolicyEmployee) {
    if (!this.selectedPolicy) return;
    const name = emp.full_name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'this employee';
    const alert = await this.alertCtrl.create({
      header: 'Remove Employee',
      message: `Are you sure you want to remove ${name} from "${this.selectedPolicy.name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.policyService.unassignEmployee(this.selectedPolicy!.id, emp.id).subscribe({
              next: () => {
                this.showToast(`${name} unassigned successfully`, 'success');
                this.loadEmployeesForPolicy(this.selectedPolicy!.id);
                if (this.selectedPolicy && this.selectedPolicy.employee_count) {
                  this.selectedPolicy.employee_count--;
                }
              },
              error: () => this.showToast('Failed to unassign employee', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // ─── Helpers ────────────────────────────────────────────────────────────────
  formatDate(dateStr?: string): string {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  }

  goBack() {
    this.router.navigate(['/administration']);
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' | 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'top'
    });
    await toast.present();
  }
}

