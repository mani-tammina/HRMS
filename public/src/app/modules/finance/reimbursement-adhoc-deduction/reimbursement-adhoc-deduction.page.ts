import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../../../core/services/toaster.service';

export interface AdhocDeductionRow {
  id: number;
  employee_id: number;
  employee_code: string;
  employee_name: string;
  department: string;
  designation: string;
  deduction_type: string;
  amount: number;
  amount_formatted: string;
  comment: string;
  selected?: boolean;
}

export interface SummaryCounts {
  totalClaims: number;
  totalExpenses: number;
  totalAdhocPayments: number;
  totalAdhocDeductions: number;
  countClaims: number;
  countExpenses: number;
  countAdhocPayments: number;
  countAdhocDeductions: number;
}

@Component({
  selector: 'app-reimbursement-adhoc-deduction',
  templateUrl: './reimbursement-adhoc-deduction.page.html',
  styleUrls: ['./reimbursement-adhoc-deduction.page.scss'],
  standalone: false
})
export class ReimbursementAdhocDeductionPage implements OnInit {
  selectedMonth: string = '2026-11';
  monthLabel: string = 'NOV-2026';

  // 1: SALARY COMPONENT CLAIM, 2: EXPENSES, 3: ADHOC PAYMENTS, 4: ADHOC DEDUCTIONS
  currentStep: number = 4;

  isLoading: boolean = false;
  searchTerm: string = '';

  // Data sets for each step
  claimRecords: any[] = [];
  expenseRecords: any[] = [];
  adhocPaymentRecords: any[] = [];
  adhocDeductionRecords: AdhocDeductionRow[] = [];

  // Working employees list for dropdown
  workingEmployees: any[] = [];

  summaryData: SummaryCounts = {
    totalClaims: 0,
    totalExpenses: 0,
    totalAdhocPayments: 0,
    totalAdhocDeductions: 0,
    countClaims: 0,
    countExpenses: 0,
    countAdhocPayments: 0,
    countAdhocDeductions: 0
  };

  // Checkbox selection for bulk delete
  selectAll: boolean = false;
  selectedCount: number = 0;

  // Add Employee Modal
  showAddModal: boolean = false;
  modalEmpId: number | null = null;
  modalDeductionType: string = 'Advance Recovery';
  modalAmount: number | null = null;
  modalComment: string = '';
  isSaving: boolean = false;

  // Edit Modal
  showEditModal: boolean = false;
  editingId: number | null = null;
  editingEmpName: string = '';
  editingEmpCode: string = '';
  editDeductionType: string = 'Advance Recovery';
  editAmount: number | null = null;
  editComment: string = '';

  // Import Modal
  showImportModal: boolean = false;
  importFile: File | null = null;
  importFileName: string = '';
  isUploading: boolean = false;

  // Pre-configured deduction types
  deductionTypes: string[] = [
    'Advance Recovery',
    'Asset Damage',
    'Notice Period Shortfall',
    'Fine / Penalty',
    'Loan Recovery',
    'Telephone / Internet Excess',
    'Other'
  ];

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
        this.formatMonthLabel(this.selectedMonth);
      }
      if (params['step']) {
        const s = Number(params['step']);
        if (s >= 1 && s <= 4) this.currentStep = s;
      }
      this.loadData();
    });
  }

  formatMonthLabel(rawMonth: string) {
    const parts = (rawMonth || '2026-11').split('-');
    const year = parts[0];
    const mNum = parseInt(parts[1], 10) || 11;
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.monthLabel = `${months[mNum - 1]}-${year}`;
  }

  loadData() {
    this.isLoading = true;
    const url = `${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction?month=${this.selectedMonth}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          this.workingEmployees = res.employees || [];
          this.claimRecords = res.claimRecords || [];
          this.expenseRecords = res.expenseRecords || [];
          this.adhocPaymentRecords = res.adhocPaymentRecords || [];
          this.adhocDeductionRecords = (res.adhocDeductionRecords || []).map((r: any) => ({
            ...r,
            selected: false
          }));
          if (res.summaryData) {
            this.summaryData = res.summaryData;
          }
          this.updateSelectionCounts();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load reimbursement & adhoc deductions:', err);
        this.toaster.showError('Failed to load data for ' + this.monthLabel);
      }
    });
  }

  setStep(stepNumber: number) {
    if (stepNumber >= 1 && stepNumber <= 4) {
      this.currentStep = stepNumber;
      this.searchTerm = '';
      this.selectAll = false;
      this.updateSelectionCounts();
    }
  }

  // Filtered lists based on search
  get filteredDeductions(): AdhocDeductionRow[] {
    const term = (this.searchTerm || '').trim().toLowerCase();
    if (!term) return this.adhocDeductionRecords;
    return this.adhocDeductionRecords.filter(r =>
      (r.employee_name && r.employee_name.toLowerCase().includes(term)) ||
      (r.employee_code && r.employee_code.toLowerCase().includes(term)) ||
      (r.deduction_type && r.deduction_type.toLowerCase().includes(term)) ||
      (r.comment && r.comment.toLowerCase().includes(term))
    );
  }

  get filteredClaims(): any[] {
    const term = (this.searchTerm || '').trim().toLowerCase();
    if (!term) return this.claimRecords;
    return this.claimRecords.filter(r =>
      (r.employee_name && r.employee_name.toLowerCase().includes(term)) ||
      (r.employee_code && r.employee_code.toLowerCase().includes(term)) ||
      (r.claim_type && r.claim_type.toLowerCase().includes(term))
    );
  }

  get filteredExpenses(): any[] {
    const term = (this.searchTerm || '').trim().toLowerCase();
    if (!term) return this.expenseRecords;
    return this.expenseRecords.filter(r =>
      (r.employee_name && r.employee_name.toLowerCase().includes(term)) ||
      (r.employee_code && r.employee_code.toLowerCase().includes(term)) ||
      (r.expense_category && r.expense_category.toLowerCase().includes(term))
    );
  }

  get filteredPayments(): any[] {
    const term = (this.searchTerm || '').trim().toLowerCase();
    if (!term) return this.adhocPaymentRecords;
    return this.adhocPaymentRecords.filter(r =>
      (r.employee_name && r.employee_name.toLowerCase().includes(term)) ||
      (r.employee_code && r.employee_code.toLowerCase().includes(term)) ||
      (r.payment_type && r.payment_type.toLowerCase().includes(term))
    );
  }

  // Checkbox Selection
  toggleSelectAll() {
    this.filteredDeductions.forEach(r => r.selected = this.selectAll);
    this.updateSelectionCounts();
  }

  onRowSelectChange() {
    const allSelected = this.filteredDeductions.length > 0 && this.filteredDeductions.every(r => r.selected);
    this.selectAll = allSelected;
    this.updateSelectionCounts();
  }

  updateSelectionCounts() {
    this.selectedCount = this.adhocDeductionRecords.filter(r => r.selected).length;
  }

  // ─── ADD EMPLOYEE DEDUCTION MODAL ───
  openAddEmployeeModal() {
    this.modalEmpId = this.workingEmployees.length > 0 ? this.workingEmployees[0].id : null;
    this.modalDeductionType = 'Advance Recovery';
    this.modalAmount = null;
    this.modalComment = '';
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  saveAddDeduction() {
    if (!this.modalEmpId) {
      this.toaster.showError('Please select an employee');
      return;
    }
    const amt = Number(this.modalAmount) || 0;
    if (amt <= 0) {
      this.toaster.showError('Please enter a valid deduction amount');
      return;
    }

    this.isSaving = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/deduction`, {
      employee_id: this.modalEmpId,
      month: this.selectedMonth,
      deduction_type: this.modalDeductionType,
      amount: amt,
      comment: this.modalComment
    }).subscribe({
      next: (res) => {
        this.isSaving = false;
        this.showAddModal = false;
        this.toaster.showSuccess('Adhoc deduction added successfully');
        this.loadData();
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error adding deduction:', err);
        this.toaster.showError(err.error?.error || 'Failed to add deduction');
      }
    });
  }

  // ─── EDIT MODAL ───
  openEditModal(row: AdhocDeductionRow) {
    this.editingId = row.id;
    this.editingEmpName = row.employee_name;
    this.editingEmpCode = row.employee_code;
    this.editDeductionType = row.deduction_type || 'Advance Recovery';
    this.editAmount = row.amount;
    this.editComment = row.comment || '';
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingId = null;
  }

  saveEditDeduction() {
    if (!this.editingId) return;
    const amt = Number(this.editAmount) || 0;
    if (amt <= 0) {
      this.toaster.showError('Please enter a valid amount');
      return;
    }

    this.isSaving = true;
    this.http.put<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/deduction/${this.editingId}`, {
      deduction_type: this.editDeductionType,
      amount: amt,
      comment: this.editComment
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditModal = false;
        this.toaster.showSuccess('Adhoc deduction updated successfully');
        this.loadData();
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error updating deduction:', err);
        this.toaster.showError(err.error?.error || 'Failed to update deduction');
      }
    });
  }

  // ─── DELETE ACTIONS ───
  async confirmDeleteSingle(row: AdhocDeductionRow) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Deduction',
      message: `Are you sure you want to delete the <strong>${row.deduction_type}</strong> of <strong>INR ${row.amount.toLocaleString('en-IN')}</strong> for <strong>${row.employee_name}</strong>?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteSingle(row.id)
        }
      ]
    });
    await alert.present();
  }

  deleteSingle(id: number) {
    this.isLoading = true;
    this.http.delete<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/deduction/${id}`).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.showSuccess('Deduction deleted successfully');
        this.loadData();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error deleting deduction:', err);
        this.toaster.showError('Failed to delete deduction');
      }
    });
  }

  async confirmDeleteSelected() {
    const selectedIds = this.adhocDeductionRecords.filter(r => r.selected).map(r => r.id);
    if (selectedIds.length === 0) return;

    const alert = await this.alertCtrl.create({
      header: 'Delete Selected',
      message: `Are you sure you want to delete <strong>${selectedIds.length}</strong> selected deduction record(s)?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete All Selected',
          role: 'destructive',
          handler: () => this.deleteBulk(selectedIds)
        }
      ]
    });
    await alert.present();
  }

  deleteBulk(ids: number[]) {
    this.isLoading = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/bulk-delete`, { ids }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toaster.showSuccess(res.message || 'Records deleted successfully');
        this.selectAll = false;
        this.loadData();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error bulk deleting:', err);
        this.toaster.showError('Failed to delete selected records');
      }
    });
  }

  // ─── IMPORT PREVIOUS MONTH ───
  async importPreviousMonth() {
    const alert = await this.alertCtrl.create({
      header: 'Import Previous Month Data',
      message: `Do you want to import ad-hoc deductions from the previous month into <strong>${this.monthLabel}</strong>?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Import Data',
          handler: () => this.executeImportPreviousMonth()
        }
      ]
    });
    await alert.present();
  }

  executeImportPreviousMonth() {
    this.isLoading = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/import-previous-month`, {
      current_month: this.selectedMonth,
      step: this.currentStep
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.importedCount > 0) {
          this.toaster.showSuccess(res.message || `Imported ${res.importedCount} records successfully`);
        } else {
          this.toaster.showWarning(res.message || 'No records found in previous month to import');
        }
        this.loadData();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error importing previous month data:', err);
        this.toaster.showError('Failed to import previous month data');
      }
    });
  }

  // ─── IMPORT MODAL (CSV/EXCEL) ───
  openImportModal() {
    this.showImportModal = true;
    this.importFile = null;
    this.importFileName = '';
  }

  closeImportModal() {
    this.showImportModal = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.importFile = file;
      this.importFileName = file.name;
    }
  }

  downloadSampleTemplate() {
    const csvContent = 'data:text/csv;charset=utf-8,Employee Number,Deduction Type,Amount,Comment\nSTSS-001,Advance Recovery,5000,Salary advance recovery\nSTSS-002,Asset Damage,1200,Hardware replacement\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Adhoc_Deductions_Template_${this.selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  uploadImportFile() {
    if (!this.importFile) {
      this.toaster.showError('Please choose a file to import');
      return;
    }
    this.isUploading = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const text = e.target.result as string;
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length <= 1) {
          this.toaster.showError('The uploaded file is empty or missing data rows');
          this.isUploading = false;
          return;
        }

        const empMap = new Map<string, any>();
        this.workingEmployees.forEach(emp => {
          if (emp.employee_code) empMap.set(emp.employee_code.trim().toUpperCase(), emp);
        });

        const recordsToSave: any[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
          const empCode = cols[0]?.toUpperCase();
          const dedType = cols[1] || 'Advance Recovery';
          const amt = Number(cols[2]) || 0;
          const comment = cols[3] || 'Imported via CSV';

          const matchedEmp = empMap.get(empCode);
          if (matchedEmp && amt > 0) {
            recordsToSave.push({
              employee_id: matchedEmp.id,
              deduction_type: dedType,
              amount: amt,
              comment: comment
            });
          }
        }

        if (recordsToSave.length === 0) {
          this.toaster.showError('No valid matching employee records found in file');
          this.isUploading = false;
          return;
        }

        // Save imported records
        this.http.post<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/save-step`, {
          month: this.selectedMonth,
          step: 4,
          records: recordsToSave
        }).subscribe({
          next: () => {
            this.isUploading = false;
            this.showImportModal = false;
            this.toaster.showSuccess(`Imported and saved ${recordsToSave.length} deductions successfully`);
            this.loadData();
          },
          error: (err) => {
            this.isUploading = false;
            console.error('Import save error:', err);
            this.toaster.showError('Failed to save imported deductions');
          }
        });
      } catch (parseErr: any) {
        this.isUploading = false;
        this.toaster.showError('Failed to parse file: ' + parseErr.message);
      }
    };
    reader.readAsText(this.importFile);
  }

  // ─── WORKFLOW NAVIGATION ───
  handleBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.closeWorkflow();
    }
  }

  saveAndClose() {
    this.isLoading = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/save-step`, {
      month: this.selectedMonth,
      step: this.currentStep,
      records: this.adhocDeductionRecords
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.showSuccess('Step adjustments saved');
        this.closeWorkflow();
      },
      error: () => {
        this.isLoading = false;
        this.closeWorkflow();
      }
    });
  }

  markAsComplete() {
    this.isLoading = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/reimbursement-adhoc-deduction/mark-complete`, {
      month: this.selectedMonth
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.showSuccess('Reimbursement, Adhoc Payment & Deductions marked as completed');
        this.closeWorkflow();
      },
      error: () => {
        this.isLoading = false;
        this.closeWorkflow();
      }
    });
  }

  closeWorkflow() {
    this.router.navigate(['/finance/run-payroll'], {
      queryParams: { month: this.selectedMonth }
    });
  }

  openHelp() {
    window.open('mailto:support@tams.com?subject=Need%20Help%20with%20Reimbursement%20and%20Deductions', '_blank');
  }
}
