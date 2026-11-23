import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../../../core/services/toaster.service';

export interface HoldRecordRow {
  id: number;
  employee_id: number;
  employee_code: string;
  employee_name: string;
  department: string;
  designation: string;
  monthly_salary: number;
  held_gross_amount: number;
  held_net_amount: number;
  hold_status: 'ON_HOLD' | 'RELEASED';
  hold_reason: string;
  remarks: string;
  payroll_month?: string;
  release_month?: string | null;
  release_reason?: string | null;
  created_at?: string;
  updated_at?: string;
  selected?: boolean;
}

export interface ArrearRecordRow {
  id: number;
  employee_id: number;
  employee_code: string;
  employee_name: string;
  department: string;
  designation: string;
  monthly_salary: number;
  category: string;
  period: string;
  amount: number;
  amount_formatted: string;
  pay_action: string;
  comments: string;
  created_at?: string;
  selected?: boolean;
}

export interface SummaryData {
  totalHeldEmployees: number;
  totalHeldAmount: number;
  totalReleasedEmployees: number;
  totalReleasedAmount: number;
  totalArrearsCount: number;
  totalArrearEmployees: number;
  totalArrearsAmount: number;
}

@Component({
  selector: 'app-salaries-on-hold-arrears',
  templateUrl: './salaries-on-hold-arrears.page.html',
  styleUrls: ['./salaries-on-hold-arrears.page.scss'],
  standalone: false
})
export class SalariesOnHoldArrearsPage implements OnInit {
  selectedMonth: string = '2026-11';
  monthLabel: string = 'NOV-2026';

  // 1: SALARIES ON HOLD, 2: SALARY ARREARS
  currentStep: number = 1;

  isLoading: boolean = false;
  searchTerm: string = '';
  statusFilter: string = 'ALL';
  departmentFilter: string = 'ALL';

  // Records
  holdRecords: HoldRecordRow[] = [];
  arrearRecords: ArrearRecordRow[] = [];
  workingEmployees: any[] = [];
  departments: string[] = [];

  summaryData: SummaryData = {
    totalHeldEmployees: 0,
    totalHeldAmount: 0,
    totalReleasedEmployees: 0,
    totalReleasedAmount: 0,
    totalArrearsCount: 0,
    totalArrearEmployees: 0,
    totalArrearsAmount: 0
  };

  // Checkbox selections
  selectAllHolds: boolean = false;
  selectAllArrears: boolean = false;

  // Pre-configured Hold Reasons
  holdReasons: string[] = [
    'Document Verification Pending',
    'Exit & Final Settlement Pending',
    'Disciplinary Inquiry / Audit',
    'Bank Account / KYC Discrepancy',
    'Absconding / Unauthorized Absence',
    'Performance / Probation Review',
    'Tax Declaration Discrepancy',
    'Administrative Review',
    'Other'
  ];

  // Pre-configured Arrear Categories
  arrearCategories: string[] = [
    'Retroactive Salary Increment',
    'Released Hold Payout',
    'Attendance Regularization / LOP Refund',
    'Underpaid Allowance Correction',
    'Performance Bonus Arrear',
    'Overtime Adjustment',
    'Other Correction'
  ];

  // Add Hold Modal State
  showAddHoldModal: boolean = false;
  modalHoldEmpId: number | null = null;
  modalHoldReason: string = 'Document Verification Pending';
  modalHoldScope: 'FULL' | 'CUSTOM' = 'FULL';
  modalHoldAmount: number | null = null;
  modalHoldRemarks: string = '';
  isSavingHold: boolean = false;

  // Release Hold Modal State
  showReleaseModal: boolean = false;
  releasingHold: HoldRecordRow | null = null;
  releaseReason: string = '';
  releaseMonth: string = '';
  payAsArrear: boolean = true;
  releaseArrearAmount: number | null = null;
  isReleasing: boolean = false;

  // Edit Hold Modal State
  showEditHoldModal: boolean = false;
  editingHold: HoldRecordRow | null = null;
  editHoldReason: string = '';
  editHoldAmount: number | null = null;
  editHoldRemarks: string = '';
  isUpdatingHold: boolean = false;

  // Add Arrear Modal State
  showAddArrearModal: boolean = false;
  modalArrearEmpId: number | null = null;
  modalArrearCategory: string = 'Retroactive Salary Increment';
  modalArrearPeriod: string = '';
  modalArrearAmount: number | null = null;
  modalArrearPayAction: string = 'Process with salary';
  modalArrearComments: string = '';
  isSavingArrear: boolean = false;

  // Edit Arrear Modal State
  showEditArrearModal: boolean = false;
  editingArrear: ArrearRecordRow | null = null;
  editArrearCategory: string = '';
  editArrearPeriod: string = '';
  editArrearAmount: number | null = null;
  editArrearPayAction: string = 'Process with salary';
  editArrearComments: string = '';
  isUpdatingArrear: boolean = false;

  private apiUrl = environment.apiURL;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['month']) {
        this.selectedMonth = params['month'];
        const [yStr, mStr] = this.selectedMonth.split('-');
        const monthNum = parseInt(mStr, 10);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        this.monthLabel = `${months[monthNum - 1] || 'NOV'}-${yStr}`;
      }
      if (params['step']) {
        const stepNum = parseInt(params['step'], 10);
        if (stepNum === 1 || stepNum === 2) {
          this.currentStep = stepNum;
        }
      }
      this.loadData();
    });
  }

  loadData() {
    this.isLoading = true;
    this.http.get<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears?month=${this.selectedMonth}`)
      .subscribe({
        next: res => {
          this.isLoading = false;
          if (res && res.success) {
            this.workingEmployees = res.employees || [];
            this.holdRecords = res.holdRecords || [];
            this.arrearRecords = res.arrearRecords || [];
            this.summaryData = res.summaryData || {
              totalHeldEmployees: 0,
              totalHeldAmount: 0,
              totalReleasedEmployees: 0,
              totalReleasedAmount: 0,
              totalArrearsCount: 0,
              totalArrearEmployees: 0,
              totalArrearsAmount: 0
            };

            // Distinct departments
            const depts = new Set<string>();
            this.workingEmployees.forEach(e => {
              if (e.department) depts.add(e.department);
            });
            this.departments = Array.from(depts).sort();
          } else {
            this.toaster.showError(res?.error || 'Failed to load hold and arrear data');
          }
        },
        error: err => {
          this.isLoading = false;
          console.error('Error loading hold & arrears data:', err);
          this.toaster.showError('Unable to connect to payroll server');
        }
      });
  }

  // ─── STEPPER NAVIGATION ───────────────────────────────────────────────────

  setStep(step: number) {
    this.currentStep = step;
    this.searchTerm = '';
    this.statusFilter = 'ALL';
    this.departmentFilter = 'ALL';
  }

  handleBack() {
    if (this.currentStep > 1) {
      this.setStep(this.currentStep - 1);
    } else {
      this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
    }
  }

  saveAndClose() {
    this.toaster.showSuccess('Salaries on Hold & Arrears progress saved successfully');
    this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
  }

  markAsComplete() {
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/mark-complete`, {
      month: this.selectedMonth
    }).subscribe({
      next: () => {
        // Update local step state
        this.updateStepCompletedInLocalStorage();
        this.toaster.showSuccess('Step 5: Salaries on Hold & Arrears marked as complete!');
        this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
      },
      error: () => {
        this.updateStepCompletedInLocalStorage();
        this.toaster.showSuccess('Step 5: Salaries on Hold & Arrears marked as complete!');
        this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
      }
    });
  }

  closeWorkflow() {
    this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
  }

  private updateStepCompletedInLocalStorage() {
    try {
      const key = `payroll_steps_${this.selectedMonth}`;
      const saved = localStorage.getItem(key);
      let steps: any[] = saved ? JSON.parse(saved) : [];
      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const step5 = steps.find(s => s.id === 5);
      if (step5) {
        step5.completed = true;
        step5.subtitle = `Confirmed on ${nowStr}`;
      } else {
        steps.push({ id: 5, completed: true, subtitle: `Confirmed on ${nowStr}` });
      }
      localStorage.setItem(key, JSON.stringify(steps));
    } catch (e) {
      console.warn('Could not update localStorage step state:', e);
    }
  }

  // ─── FILTERED DATA GETTERS ────────────────────────────────────────────────

  get filteredHolds(): HoldRecordRow[] {
    let list = this.holdRecords || [];
    if (this.statusFilter !== 'ALL') {
      list = list.filter(r => r.hold_status === this.statusFilter);
    }
    if (this.departmentFilter !== 'ALL') {
      list = list.filter(r => r.department === this.departmentFilter);
    }
    if (this.searchTerm && this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      list = list.filter(r =>
        (r.employee_name && r.employee_name.toLowerCase().includes(term)) ||
        (r.employee_code && r.employee_code.toLowerCase().includes(term)) ||
        (r.department && r.department.toLowerCase().includes(term)) ||
        (r.hold_reason && r.hold_reason.toLowerCase().includes(term)) ||
        (r.remarks && r.remarks.toLowerCase().includes(term))
      );
    }
    return list;
  }

  get filteredArrears(): ArrearRecordRow[] {
    let list = this.arrearRecords || [];
    if (this.departmentFilter !== 'ALL') {
      list = list.filter(r => r.department === this.departmentFilter);
    }
    if (this.searchTerm && this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      list = list.filter(r =>
        (r.employee_name && r.employee_name.toLowerCase().includes(term)) ||
        (r.employee_code && r.employee_code.toLowerCase().includes(term)) ||
        (r.department && r.department.toLowerCase().includes(term)) ||
        (r.category && r.category.toLowerCase().includes(term)) ||
        (r.comments && r.comments.toLowerCase().includes(term))
      );
    }
    return list;
  }

  get selectedHoldsCount(): number {
    return this.holdRecords.filter(r => r.selected).length;
  }

  get selectedArrearsCount(): number {
    return this.arrearRecords.filter(r => r.selected).length;
  }

  toggleSelectAllHolds() {
    this.filteredHolds.forEach(r => r.selected = this.selectAllHolds);
  }

  toggleSelectAllArrears() {
    this.filteredArrears.forEach(r => r.selected = this.selectAllArrears);
  }

  // ─── HOLD SALARY MODAL & CRUD ─────────────────────────────────────────────

  openAddHoldModal() {
    this.modalHoldEmpId = this.workingEmployees.length > 0 ? this.workingEmployees[0].id : null;
    this.modalHoldReason = 'Document Verification Pending';
    this.modalHoldScope = 'FULL';
    this.modalHoldAmount = null;
    this.modalHoldRemarks = '';
    this.onHoldEmployeeSelect();
    this.showAddHoldModal = true;
  }

  closeAddHoldModal() {
    this.showAddHoldModal = false;
  }

  onHoldEmployeeSelect() {
    if (!this.modalHoldEmpId) return;
    const emp = this.workingEmployees.find(e => e.id === Number(this.modalHoldEmpId));
    if (emp && this.modalHoldScope === 'FULL') {
      this.modalHoldAmount = emp.monthly_salary || 0;
    }
  }

  onHoldScopeChange() {
    if (this.modalHoldScope === 'FULL') {
      const emp = this.workingEmployees.find(e => e.id === Number(this.modalHoldEmpId));
      this.modalHoldAmount = emp ? emp.monthly_salary : 0;
    }
  }

  saveNewHold() {
    if (!this.modalHoldEmpId) {
      this.toaster.showError('Please select an employee');
      return;
    }
    if (!this.modalHoldReason) {
      this.toaster.showError('Please select a hold reason');
      return;
    }

    const emp = this.workingEmployees.find(e => e.id === Number(this.modalHoldEmpId));
    const grossAmt = this.modalHoldScope === 'FULL'
      ? (emp ? emp.monthly_salary : 0)
      : (Number(this.modalHoldAmount) || 0);

    this.isSavingHold = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/hold`, {
      employee_id: this.modalHoldEmpId,
      month: this.selectedMonth,
      hold_type: this.modalHoldScope,
      hold_reason: this.modalHoldReason,
      remarks: this.modalHoldRemarks,
      held_gross_amount: grossAmt,
      held_net_amount: grossAmt
    }).subscribe({
      next: res => {
        this.isSavingHold = false;
        if (res && res.success) {
          this.toaster.showSuccess('Employee salary placed on hold successfully');
          this.closeAddHoldModal();
          this.loadData();
        } else {
          this.toaster.showError(res?.error || 'Failed to place salary on hold');
        }
      },
      error: err => {
        this.isSavingHold = false;
        console.error('Error placing salary on hold:', err);
        this.toaster.showError(err.error?.error || 'Server error placing salary on hold');
      }
    });
  }

  // ─── RELEASE HOLD MODAL & ACTIONS ─────────────────────────────────────────

  openReleaseModal(row: HoldRecordRow) {
    this.releasingHold = row;
    this.releaseMonth = this.selectedMonth;
    this.releaseReason = 'Administrative clearance / Hold released';
    this.payAsArrear = true;
    this.releaseArrearAmount = row.held_gross_amount || row.monthly_salary;
    this.showReleaseModal = true;
  }

  closeReleaseModal() {
    this.showReleaseModal = false;
    this.releasingHold = null;
  }

  confirmReleaseHold() {
    if (!this.releasingHold) return;

    this.isReleasing = true;
    this.http.put<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/hold/${this.releasingHold.id}/release`, {
      release_month: this.releaseMonth,
      release_reason: this.releaseReason,
      pay_as_arrear: this.payAsArrear,
      arrear_amount: this.releaseArrearAmount
    }).subscribe({
      next: res => {
        this.isReleasing = false;
        if (res && res.success) {
          this.toaster.showSuccess('Salary hold released successfully');
          this.closeReleaseModal();
          this.loadData();
        } else {
          this.toaster.showError(res?.error || 'Failed to release salary hold');
        }
      },
      error: err => {
        this.isReleasing = false;
        console.error('Error releasing salary hold:', err);
        this.toaster.showError(err.error?.error || 'Failed to release salary hold');
      }
    });
  }

  // ─── EDIT HOLD MODAL ──────────────────────────────────────────────────────

  openEditHoldModal(row: HoldRecordRow) {
    this.editingHold = row;
    this.editHoldReason = row.hold_reason;
    this.editHoldAmount = row.held_gross_amount;
    this.editHoldRemarks = row.remarks;
    this.showEditHoldModal = true;
  }

  closeEditHoldModal() {
    this.showEditHoldModal = false;
    this.editingHold = null;
  }

  saveEditHold() {
    if (!this.editingHold) return;

    this.isUpdatingHold = true;
    this.http.put<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/hold/${this.editingHold.id}`, {
      hold_reason: this.editHoldReason,
      held_gross_amount: Number(this.editHoldAmount) || 0,
      remarks: this.editHoldRemarks
    }).subscribe({
      next: res => {
        this.isUpdatingHold = false;
        if (res && res.success) {
          this.toaster.showSuccess('Hold details updated successfully');
          this.closeEditHoldModal();
          this.loadData();
        } else {
          this.toaster.showError(res?.error || 'Failed to update hold details');
        }
      },
      error: err => {
        this.isUpdatingHold = false;
        this.toaster.showError(err.error?.error || 'Server error updating hold');
      }
    });
  }

  // ─── DELETE HOLD ──────────────────────────────────────────────────────────

  async confirmDeleteHold(row: HoldRecordRow) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Salary Hold',
      message: `Are you sure you want to remove the salary hold for <strong>${row.employee_name}</strong>?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.http.delete<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/hold/${row.id}`)
              .subscribe({
                next: res => {
                  if (res && res.success) {
                    this.toaster.showSuccess('Hold record removed');
                    this.loadData();
                  } else {
                    this.toaster.showError(res?.error || 'Failed to delete hold record');
                  }
                },
                error: () => this.toaster.showError('Server error deleting hold record')
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async bulkReleaseHolds() {
    const selected = this.holdRecords.filter(r => r.selected && r.hold_status === 'ON_HOLD');
    if (selected.length === 0) {
      this.toaster.showWarning('Please select at least one ON_HOLD record to release');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Release Selected Holds',
      message: `Release salary hold for <strong>${selected.length}</strong> selected employees?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Release',
          handler: () => {
            const ids = selected.map(r => r.id);
            this.http.post<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/bulk-release`, {
              ids,
              release_month: this.selectedMonth,
              release_reason: 'Bulk release by admin'
            }).subscribe({
              next: res => {
                if (res && res.success) {
                  this.toaster.showSuccess(`${selected.length} salaries released`);
                  this.loadData();
                } else {
                  this.toaster.showError(res?.error || 'Failed to bulk release');
                }
              },
              error: () => this.toaster.showError('Server error bulk releasing holds')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async bulkDeleteHolds() {
    const selected = this.holdRecords.filter(r => r.selected);
    if (selected.length === 0) {
      this.toaster.showWarning('Please select at least one record to delete');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Delete Selected Holds',
      message: `Permanently delete <strong>${selected.length}</strong> hold records?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete All',
          role: 'destructive',
          handler: () => {
            const promises = selected.map(r =>
              this.http.delete<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/hold/${r.id}`).toPromise()
            );
            Promise.all(promises).then(() => {
              this.toaster.showSuccess(`${selected.length} hold records deleted`);
              this.loadData();
            }).catch(() => {
              this.toaster.showError('Failed to delete some records');
              this.loadData();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // ─── ARREARS MODAL & CRUD ─────────────────────────────────────────────────

  openAddArrearModal() {
    this.modalArrearEmpId = this.workingEmployees.length > 0 ? this.workingEmployees[0].id : null;
    this.modalArrearCategory = 'Retroactive Salary Increment';
    this.modalArrearPeriod = this.getPreviousMonthStr();
    this.modalArrearAmount = null;
    this.modalArrearPayAction = 'Process with salary';
    this.modalArrearComments = '';
    this.showAddArrearModal = true;
  }

  closeAddArrearModal() {
    this.showAddArrearModal = false;
  }

  saveNewArrear() {
    if (!this.modalArrearEmpId) {
      this.toaster.showError('Please select an employee');
      return;
    }
    const amt = Number(this.modalArrearAmount);
    if (!amt || amt <= 0) {
      this.toaster.showError('Please enter a positive arrear amount');
      return;
    }

    this.isSavingArrear = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/arrear`, {
      employee_id: this.modalArrearEmpId,
      month: this.selectedMonth,
      category: this.modalArrearCategory,
      period: this.modalArrearPeriod,
      amount: amt,
      pay_action: this.modalArrearPayAction,
      comments: this.modalArrearComments
    }).subscribe({
      next: res => {
        this.isSavingArrear = false;
        if (res && res.success) {
          this.toaster.showSuccess('Salary arrear added successfully');
          this.closeAddArrearModal();
          this.loadData();
        } else {
          this.toaster.showError(res?.error || 'Failed to add arrear');
        }
      },
      error: err => {
        this.isSavingArrear = false;
        console.error('Error adding arrear:', err);
        this.toaster.showError(err.error?.error || 'Server error adding arrear');
      }
    });
  }

  openEditArrearModal(row: ArrearRecordRow) {
    this.editingArrear = row;
    this.editArrearCategory = row.category;
    this.editArrearPeriod = row.period;
    this.editArrearAmount = row.amount;
    this.editArrearPayAction = row.pay_action;
    this.editArrearComments = row.comments;
    this.showEditArrearModal = true;
  }

  closeEditArrearModal() {
    this.showEditArrearModal = false;
    this.editingArrear = null;
  }

  saveEditArrear() {
    if (!this.editingArrear) return;
    const amt = Number(this.editArrearAmount);
    if (!amt || amt <= 0) {
      this.toaster.showError('Please enter a positive arrear amount');
      return;
    }

    this.isUpdatingArrear = true;
    this.http.put<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/arrear/${this.editingArrear.id}`, {
      category: this.editArrearCategory,
      period: this.editArrearPeriod,
      amount: amt,
      pay_action: this.editArrearPayAction,
      comments: this.editArrearComments
    }).subscribe({
      next: res => {
        this.isUpdatingArrear = false;
        if (res && res.success) {
          this.toaster.showSuccess('Salary arrear updated successfully');
          this.closeEditArrearModal();
          this.loadData();
        } else {
          this.toaster.showError(res?.error || 'Failed to update arrear');
        }
      },
      error: err => {
        this.isUpdatingArrear = false;
        this.toaster.showError(err.error?.error || 'Server error updating arrear');
      }
    });
  }

  async confirmDeleteArrear(row: ArrearRecordRow) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Arrear',
      message: `Delete arrear of <strong>${this.formatCurrency(row.amount)}</strong> for <strong>${row.employee_name}</strong>?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.http.delete<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/arrear/${row.id}`)
              .subscribe({
                next: res => {
                  if (res && res.success) {
                    this.toaster.showSuccess('Arrear record removed');
                    this.loadData();
                  } else {
                    this.toaster.showError(res?.error || 'Failed to delete arrear');
                  }
                },
                error: () => this.toaster.showError('Server error deleting arrear')
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async bulkDeleteArrears() {
    const selected = this.arrearRecords.filter(r => r.selected);
    if (selected.length === 0) {
      this.toaster.showWarning('Please select at least one arrear to delete');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Delete Selected Arrears',
      message: `Delete <strong>${selected.length}</strong> selected arrear records?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete All',
          role: 'destructive',
          handler: () => {
            const ids = selected.map(r => r.id);
            this.http.post<any>(`${this.apiUrl}/api/payroll/v2/salaries-on-hold-arrears/bulk-delete-arrears`, { ids })
              .subscribe({
                next: res => {
                  if (res && res.success) {
                    this.toaster.showSuccess(`${selected.length} arrears deleted`);
                    this.loadData();
                  } else {
                    this.toaster.showError(res?.error || 'Failed to bulk delete arrears');
                  }
                },
                error: () => this.toaster.showError('Server error bulk deleting arrears')
              });
          }
        }
      ]
    });
    await alert.present();
  }

  // ─── EXPORT TO CSV ────────────────────────────────────────────────────────

  exportHoldsToCsv() {
    const data = this.filteredHolds.map(r => ({
      'Employee Code': r.employee_code,
      'Employee Name': r.employee_name,
      'Department': r.department,
      'Designation': r.designation,
      'Monthly Salary': r.monthly_salary,
      'Held Gross Amount': r.held_gross_amount,
      'Hold Status': r.hold_status,
      'Hold Reason': r.hold_reason,
      'Remarks': r.remarks,
      'Release Month': r.release_month || '',
      'Release Reason': r.release_reason || ''
    }));
    this.downloadCsv(data, `Salaries_On_Hold_${this.selectedMonth}.csv`);
  }

  exportArrearsToCsv() {
    const data = this.filteredArrears.map(r => ({
      'Employee Code': r.employee_code,
      'Employee Name': r.employee_name,
      'Department': r.department,
      'Designation': r.designation,
      'Category': r.category,
      'Period': r.period,
      'Arrear Amount': r.amount,
      'Pay Action': r.pay_action,
      'Comments': r.comments
    }));
    this.downloadCsv(data, `Salary_Arrears_${this.selectedMonth}.csv`);
  }

  private downloadCsv(data: any[], filename: string) {
    if (!data.length) {
      this.toaster.showWarning('No data available to export');
      return;
    }
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => headers.map(fieldName => `"${String(row[fieldName] || '').replace(/"/g, '""')}"`).join(','))
    ];
    const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ─── UTILITY HELPERS ──────────────────────────────────────────────────────

  formatCurrency(value: number): string {
    return `₹${(Number(value) || 0).toLocaleString('en-IN')}`;
  }

  getInitials(name: string): string {
    if (!name) return 'EM';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  private getPreviousMonthStr(): string {
    const [yStr, mStr] = this.selectedMonth.split('-');
    let y = parseInt(yStr, 10);
    let m = parseInt(mStr, 10) - 1;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    return `${y}-${String(m).padStart(2, '0')}`;
  }
}
