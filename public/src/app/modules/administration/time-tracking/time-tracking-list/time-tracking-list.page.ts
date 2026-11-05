import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {
  TimeTrackingPolicyService,
  TimeTrackingPolicy
} from '../../../../core/services/time-tracking-policy.service';
import {
  AttendancePolicyService,
  AttendancePolicy,
  AttendancePolicyEmployee
} from '../../../../core/services/attendance-policy.service';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-time-tracking-list',
  templateUrl: './time-tracking-list.page.html',
  styleUrls: ['./time-tracking-list.page.scss'],
  standalone: false
})
export class TimeTrackingListPage implements OnInit {
  // Navigation
  activeTopTab = 'time-tracking-policy';

  // Time Tracking Policy / Capture Scheme State
  policies: TimeTrackingPolicy[] = [];
  loading = false;
  selectedPolicy: TimeTrackingPolicy | null = null;
  selectedPolicyEmployees: any[] = [];
  searchTerm = '';
  activeDetailTab: 'summary' | 'employees' = 'summary';

  // Attendance Time Tracking Policy (hrms_db_new.attendance_policies) State
  attendancePolicies: AttendancePolicy[] = [];
  loadingAttendance = false;
  selectedAttendancePolicy: AttendancePolicy | null = null;
  selectedAttendanceEmployees: AttendancePolicyEmployee[] = [];
  loadingAttendanceEmployees = false;
  attendanceSearchTerm = '';
  attendanceEmpSearchTerm = '';
  activeAttendanceDetailTab: 'summary' | 'employees' = 'summary';

  // Attendance Policy Create/Edit Modal State
  showAttendanceModal = false;
  isEditAttendance = false;
  editingAttendancePolicyId: number | null = null;
  attendanceModalSubmitting = false;
  attendanceForm = { name: '', description: '' };
  attendanceFormError = '';

  // Assign Employees Modal State
  showAssignModal = false;
  allAssignableEmployees: any[] = [];
  loadingAllEmployees = false;
  assignSearchTerm = '';
  selectedEmployeeIds: Set<number> = new Set();
  assigningSubmitting = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private policyService: TimeTrackingPolicyService,
    private attendancePolicyService: AttendancePolicyService,
    private employeeService: EmployeeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['tab'] && params['tab'] !== 'time-tracking-allocation') {
        this.activeTopTab = params['tab'];
      }
    });

    if (this.activeTopTab === 'attendance-time-tracking-policy') {
      this.loadAttendancePolicies();
    } else {
      this.loadPolicies();
    }
  }

  ionViewWillEnter() {
    if (this.activeTopTab === 'attendance-time-tracking-policy') {
      this.loadAttendancePolicies();
    } else {
      this.loadPolicies();
    }
  }

  switchTopTab(tab: string) {
    this.activeTopTab = tab;
    if (tab === 'attendance-time-tracking-policy') {
      if (this.attendancePolicies.length === 0) {
        this.loadAttendancePolicies();
      }
    } else if (tab === 'time-tracking-policy') {
      if (this.policies.length === 0) {
        this.loadPolicies();
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ATTENDANCE TIME TRACKING POLICIES (hrms_db_new.attendance_policies)
  // ═══════════════════════════════════════════════════════════════════════════

  loadAttendancePolicies() {
    this.loadingAttendance = true;
    this.attendancePolicyService.getPolicies().subscribe({
      next: (res) => {
        this.attendancePolicies = res || [];
        this.loadingAttendance = false;
        if (this.attendancePolicies.length > 0) {
          if (this.selectedAttendancePolicy) {
            const found = this.attendancePolicies.find(p => p.id === this.selectedAttendancePolicy!.id);
            this.selectedAttendancePolicy = found || this.attendancePolicies[0];
          } else {
            this.selectedAttendancePolicy = this.attendancePolicies[0];
          }
          if (this.selectedAttendancePolicy) {
            this.loadEmployeesForAttendancePolicy(this.selectedAttendancePolicy.id);
          }
        } else {
          this.selectedAttendancePolicy = null;
          this.selectedAttendanceEmployees = [];
        }
      },
      error: (err) => {
        this.loadingAttendance = false;
        console.error('Failed to load attendance policies:', err);
        this.showToast('Failed to load attendance policies', 'danger');
      }
    });
  }

  selectAttendancePolicy(policy: AttendancePolicy) {
    this.selectedAttendancePolicy = policy;
    this.activeAttendanceDetailTab = 'summary';
    this.attendanceEmpSearchTerm = '';
    this.loadEmployeesForAttendancePolicy(policy.id);
  }

  loadEmployeesForAttendancePolicy(id: number) {
    this.loadingAttendanceEmployees = true;
    this.selectedAttendanceEmployees = [];
    this.attendancePolicyService.getPolicyEmployees(id).subscribe({
      next: (res) => {
        this.selectedAttendanceEmployees = res || [];
        this.loadingAttendanceEmployees = false;
      },
      error: (err) => {
        this.loadingAttendanceEmployees = false;
        console.error('Failed to load employees for attendance policy:', err);
      }
    });
  }

  get filteredAttendancePolicies(): AttendancePolicy[] {
    if (!this.attendanceSearchTerm.trim()) return this.attendancePolicies;
    const term = this.attendanceSearchTerm.toLowerCase();
    return this.attendancePolicies.filter(p =>
      p.name?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
    );
  }

  get filteredAttendanceEmployees(): AttendancePolicyEmployee[] {
    if (!this.attendanceEmpSearchTerm.trim()) return this.selectedAttendanceEmployees;
    const term = this.attendanceEmpSearchTerm.toLowerCase();
    return this.selectedAttendanceEmployees.filter(e =>
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

  // CRUD: Open Create Attendance Policy Modal
  openCreateAttendancePolicyModal() {
    this.isEditAttendance = false;
    this.editingAttendancePolicyId = null;
    this.attendanceForm = { name: '', description: '' };
    this.attendanceFormError = '';
    this.showAttendanceModal = true;
  }

  // CRUD: Open Edit Attendance Policy Modal
  openEditAttendancePolicyModal(policy: AttendancePolicy) {
    this.isEditAttendance = true;
    this.editingAttendancePolicyId = policy.id;
    this.attendanceForm = {
      name: policy.name,
      description: policy.description || ''
    };
    this.attendanceFormError = '';
    this.showAttendanceModal = true;
  }

  closeAttendanceModal() {
    this.showAttendanceModal = false;
    this.attendanceModalSubmitting = false;
    this.attendanceFormError = '';
  }

  // CRUD: Save Attendance Policy (Create or Update)
  saveAttendancePolicy() {
    const trimmed = this.attendanceForm.name.trim();
    if (!trimmed) {
      this.attendanceFormError = 'Policy name is required';
      return;
    }

    this.attendanceModalSubmitting = true;
    this.attendanceFormError = '';

    const payload = {
      name: trimmed,
      description: this.attendanceForm.description.trim() || undefined
    };

    if (this.isEditAttendance && this.editingAttendancePolicyId) {
      this.attendancePolicyService.updatePolicy(this.editingAttendancePolicyId, payload).subscribe({
        next: () => {
          this.attendanceModalSubmitting = false;
          this.showAttendanceModal = false;
          this.showToast('Attendance policy updated successfully', 'success');
          this.loadAttendancePolicies();
        },
        error: (err) => {
          this.attendanceModalSubmitting = false;
          this.attendanceFormError = err?.error?.error || 'Failed to update policy';
        }
      });
    } else {
      this.attendancePolicyService.createPolicy(payload).subscribe({
        next: (created) => {
          this.attendanceModalSubmitting = false;
          this.showAttendanceModal = false;
          this.showToast('Attendance policy created successfully', 'success');
          this.selectedAttendancePolicy = created;
          this.loadAttendancePolicies();
        },
        error: (err) => {
          this.attendanceModalSubmitting = false;
          this.attendanceFormError = err?.error?.error || 'Failed to create policy';
        }
      });
    }
  }

  // CRUD: Delete Attendance Policy
  async confirmDeleteAttendancePolicy(policy: AttendancePolicy) {
    const count = policy.employee_count || 0;
    if (count > 0) {
      const alert = await this.alertCtrl.create({
        header: 'Delete Policy',
        subHeader: `Warning: ${count} Employee(s) Assigned`,
        message: `Policy "${policy.name}" is assigned to ${count} employee(s). Would you like to unassign these employees and delete this policy?`,
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Unassign & Delete',
            role: 'destructive',
            handler: () => {
              this.executeDeleteAttendancePolicy(policy.id, true);
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
              this.executeDeleteAttendancePolicy(policy.id, false);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  private executeDeleteAttendancePolicy(id: number, unassign: boolean) {
    this.attendancePolicyService.deletePolicy(id, unassign).subscribe({
      next: () => {
        this.showToast('Attendance policy deleted successfully', 'success');
        if (this.selectedAttendancePolicy?.id === id) {
          this.selectedAttendancePolicy = null;
        }
        this.loadAttendancePolicies();
      },
      error: (err) => {
        const msg = err?.error?.error || 'Failed to delete attendance policy';
        this.showToast(msg, 'danger');
      }
    });
  }

  // Attendance Policy: Assign Employees
  openAssignEmployeesModal() {
    if (!this.selectedAttendancePolicy) return;
    this.showAssignModal = true;
    this.assignSearchTerm = '';
    this.selectedEmployeeIds.clear();
    this.loadAllAssignableEmployees();
  }

  closeAssignModal() {
    this.showAssignModal = false;
    this.selectedEmployeeIds.clear();
  }

  loadAllAssignableEmployees() {
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
        this.allAssignableEmployees = arr;
        this.loadingAllEmployees = false;
      },
      error: (err) => {
        this.loadingAllEmployees = false;
        console.error('Failed to load employees for assignment:', err);
      }
    });
  }

  get filteredAssignableEmployees(): any[] {
    const assignedIds = new Set(this.selectedAttendanceEmployees.map(e => e.id));
    let list = this.allAssignableEmployees.filter(e => !assignedIds.has(e.id));
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
    if (!this.selectedAttendancePolicy || this.selectedEmployeeIds.size === 0) return;
    this.assigningSubmitting = true;
    const empIds = Array.from(this.selectedEmployeeIds);
    this.attendancePolicyService.assignEmployees(this.selectedAttendancePolicy.id, empIds).subscribe({
      next: () => {
        this.assigningSubmitting = false;
        this.showAssignModal = false;
        this.showToast(`${empIds.length} employee(s) assigned successfully`, 'success');
        this.loadAttendancePolicies();
      },
      error: (err) => {
        this.assigningSubmitting = false;
        this.showToast(err?.error?.error || 'Failed to assign employees', 'danger');
      }
    });
  }

  async unassignEmployee(emp: AttendancePolicyEmployee) {
    if (!this.selectedAttendancePolicy) return;
    const name = emp.full_name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'this employee';
    const alert = await this.alertCtrl.create({
      header: 'Remove Employee',
      message: `Are you sure you want to remove ${name} from "${this.selectedAttendancePolicy.name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.attendancePolicyService.unassignEmployee(this.selectedAttendancePolicy!.id, emp.id).subscribe({
              next: () => {
                this.showToast(`${name} unassigned successfully`, 'success');
                this.loadEmployeesForAttendancePolicy(this.selectedAttendancePolicy!.id);
                if (this.selectedAttendancePolicy && this.selectedAttendancePolicy.employee_count) {
                  this.selectedAttendancePolicy.employee_count--;
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

  // ═══════════════════════════════════════════════════════════════════════════
  // TIME TRACKING POLICIES / CAPTURE SCHEMES
  // ═══════════════════════════════════════════════════════════════════════════

  loadPolicies() {
    this.loading = true;
    this.policyService.getPolicies().subscribe({
      next: (res) => {
        this.policies = res || [];
        this.loading = false;
        if (this.policies.length > 0) {
          if (this.selectedPolicy) {
            const found = this.policies.find(p => p.id === this.selectedPolicy!.id);
            this.selectedPolicy = found || this.policies[0];
          } else {
            this.selectedPolicy = this.policies[0];
          }
          if (this.selectedPolicy) {
            this.loadEmployeesForPolicy(this.selectedPolicy.id);
          }
        } else {
          this.selectedPolicy = null;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  selectPolicy(policy: TimeTrackingPolicy) {
    this.selectedPolicy = policy;
    this.activeDetailTab = 'summary';
    this.loadEmployeesForPolicy(policy.id);
  }

  loadEmployeesForPolicy(id: number) {
    this.selectedPolicyEmployees = [];
    this.policyService.getPolicyEmployees(id).subscribe({
      next: (res) => {
        this.selectedPolicyEmployees = res || [];
      },
      error: (err) => {
        console.error('Failed to load employees for policy:', err);
      }
    });
  }

  get filteredPolicies(): TimeTrackingPolicy[] {
    if (!this.searchTerm) return this.policies;
    return this.policies.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createPolicy() {
    this.router.navigate(['/administration/time-tracking/create']);
  }

  editPolicy(policy: TimeTrackingPolicy) {
    this.router.navigate(['/administration/time-tracking/edit', policy.id]);
  }

  async deletePolicy(policy: TimeTrackingPolicy) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Policy',
      message: `Are you sure you want to delete "${policy.name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.policyService.deletePolicy(policy.id).subscribe({
              next: () => {
                this.showToast('Policy deleted successfully', 'success');
                if (this.selectedPolicy?.id === policy.id) {
                  this.selectedPolicy = null;
                }
                this.loadPolicies();
              },
              error: () => this.showToast('Failed to delete policy', 'danger')
            });
          }
        }
      ]
    });
    alert.present();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: color as any,
      position: 'top'
    });
    toast.present();
  }

  goBack() {
    this.router.navigate(['/administration']);
  }

  get activeCount(): number {
    return this.policies.filter(p => p.status === 'active').length;
  }

  getSiteNames(policy: TimeTrackingPolicy): string {
    if (policy.sites && policy.sites.length > 0) {
      return policy.sites.map((s: any) => s.name).join(', ');
    }
    return '—';
  }

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

  getEmployeeCount(policy: TimeTrackingPolicy): number {
    return policy.employee_count || 0;
  }
}
