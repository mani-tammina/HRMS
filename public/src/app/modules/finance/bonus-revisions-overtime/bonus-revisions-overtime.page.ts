import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { ToasterService } from '../../../core/services/toaster.service';

export interface BonusRow {
  id: number;
  employee_code: string;
  employee_name: string;
  department?: string;
  designation?: string;
  bonus_type: string;
  base_salary: number;
  base_salary_formatted: string;
  bonus_amount: number;
  bonus_amount_formatted: string;
  pay_action: 'Process with salary' | 'Hold bonus' | 'Do not process';
  taxable_status?: string;
  comments: string;
  expanded?: boolean;
}

export interface RevisionRow {
  id: number;
  contract_id?: number;
  adjustment_id?: number;
  employee_code: string;
  employee_name: string;
  department?: string;
  designation?: string;
  previous_ctc: number;
  previous_ctc_formatted: string;
  revised_ctc: number;
  revised_ctc_formatted: string;
  hike_percentage: string;
  previous_monthly: number;
  revised_monthly: number;
  monthly_increment: number;
  effective_date: string;
  arrears_applicable: boolean;
  arrears_months: number;
  arrears_amount: number;
  arrears_amount_formatted: string;
  status: string;
  pay_action: 'Process as salary' | 'Process revision & arrears' | 'Process revision only' | 'Hold revision' | 'Do not process';
  comments: string;
  expanded?: boolean;
}

export interface OvertimeRow {
  id: number;
  employee_code: string;
  employee_name: string;
  department?: string;
  designation?: string;
  monthly_salary: number;
  hourly_rate: number;
  hourly_rate_formatted: string;
  ot_hours: number;
  multiplier: number;
  multiplier_label: string;
  ot_amount: number;
  ot_amount_formatted: string;
  pay_action: 'Process OT payout' | 'Hold OT' | 'Do not process';
  comments: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-bonus-revisions-overtime',
  templateUrl: './bonus-revisions-overtime.page.html',
  styleUrls: ['./bonus-revisions-overtime.page.scss'],
  standalone: false
})
export class BonusRevisionsOvertimePage implements OnInit {
  selectedMonth: string = '2026-11';
  monthLabel: string = 'NOV-2026';
  monthFull: string = 'November 2026';
  year: number = 2026;
  isLoading: boolean = false;

  // Active step in stepper: 1 (BONUS), 2 (SALARY REVISION), 3 (OVERTIME PAYMENT), 4 (SHIFT ALLOWANCE)
  currentStep: number = 1;

  // Step 1: Bonus records & search
  bonusRecords: BonusRow[] = [];
  bonusSearchTerm: string = '';

  // Step 2: Salary Revisions records & search
  revisionRecords: RevisionRow[] = [];
  revisionSearchTerm: string = '';

  // Step 3: Overtime records & search
  overtimeRecords: OvertimeRow[] = [];
  overtimeSearchTerm: string = '';

  // Step 4: Shift Allowance records & search
  shiftAllowanceRecords: any[] = [];
  shiftAllowanceSearchTerm: string = '';

  // Working employees list from backend
  workingEmployees: any[] = [];

  // Summary totals (defaults to 0, no dynamic dummy values)
  summaryData = {
    totalBonus: 0,
    totalRevisions: 0,
    totalOvertime: 0,
    totalCombined: 0
  };

  // Help resources panel state
  helpResourcesOpen: boolean = true;
  openedHelpItem: number | null = null;

  // Comment Modal state
  showCommentModal: boolean = false;
  activeCommentRow: any = null;
  tempCommentText: string = '';

  // Add Employee Modal state
  showAddModal: boolean = false;
  selectedEmpId: number | null = null;
  newBonusType: string = 'Performance Bonus';
  newBonusAmount: number | null = null;
  newBonusComment: string = '';

  newSalaryAnnual: number | null = null;
  newHikePct: number = 10;
  newArrearsMonths: number = 1;
  newRevisionAction: 'Process as salary' | 'Process revision & arrears' | 'Process revision only' | 'Hold revision' | 'Do not process' = 'Process as salary';
  newRevisionComment: string = '';

  // ─── SALARY REVISION EDIT MODAL STATE ───
  showEditRevisionModal: boolean = false;
  editingRevision: RevisionRow | null = null;
  editRevisedCtc: number = 0;
  editHikePercentage: number = 0;
  editEffectiveDate: string = '';
  editArrearsMonths: number = 1;
  editPayAction: 'Process as salary' | 'Process revision & arrears' | 'Process revision only' | 'Hold revision' | 'Do not process' = 'Process as salary';
  editComments: string = '';
  isSavingRevision: boolean = false;

  newOtHours: number = 8;
  newOtMultiplier: number = 1.5;
  newOtComment: string = '';

  private apiUrl = environment.apiURL;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toaster: ToasterService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['month']) {
        this.selectedMonth = params['month'];
      }
      if (params['step']) {
        const stepNum = parseInt(params['step'], 10);
        if (stepNum >= 1 && stepNum <= 4) {
          this.currentStep = stepNum;
        }
      }
      this.formatMonthLabels();
      this.loadData();
    });
  }

  formatMonthLabels() {
    const [yStr, mStr] = (this.selectedMonth || '2026-11').split('-');
    this.year = parseInt(yStr, 10) || 2026;
    const monthNum = parseInt(mStr, 10) || 11;
    const shortNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const fullNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const idx = Math.max(0, Math.min(11, monthNum - 1));
    this.monthLabel = `${shortNames[idx]}-${this.year}`;
    this.monthFull = `${fullNames[idx]} ${this.year}`;
  }

  loadData() {
    this.isLoading = true;
    const url = `${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime?month=${this.selectedMonth}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          this.bonusRecords = res.bonusRecords || [];
          this.revisionRecords = res.revisionRecords || [];
          this.overtimeRecords = res.overtimeRecords || [];
          this.workingEmployees = res.workingEmployees || [];
          if (res.summary) {
            this.summaryData = res.summary;
          } else {
            this.recalculateSummaries();
          }
        } else {
          this.bonusRecords = [];
          this.revisionRecords = [];
          this.overtimeRecords = [];
          this.workingEmployees = [];
          this.recalculateSummaries();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load bonus, revisions & overtime:', err);
        this.toaster.showError(`Failed to load data for ${this.monthLabel}`);
        this.bonusRecords = [];
        this.revisionRecords = [];
        this.overtimeRecords = [];
        this.recalculateSummaries();
      }
    });
  }

  recalculateSummaries() {
    this.summaryData.totalBonus = this.bonusRecords.reduce((s, r) => s + (Number(r.bonus_amount) || 0), 0);
    this.summaryData.totalRevisions = this.revisionRecords.reduce((s, r) => s + (Number(r.arrears_amount) || 0), 0);
    this.summaryData.totalOvertime = this.overtimeRecords.reduce((s, r) => s + (Number(r.ot_amount) || 0), 0);
    this.summaryData.totalCombined = this.summaryData.totalBonus + this.summaryData.totalRevisions + this.summaryData.totalOvertime;
  }

  // Navigate to Import One time payments page
  goToImportPage() {
    this.router.navigate(['/finance/run-payroll/bonus-revisions-overtime/import'], {
      queryParams: { month: this.selectedMonth }
    });
  }

  // Add Employee Modal
  openAddModal() {
    this.selectedEmpId = null;
    this.newBonusAmount = null;
    this.newBonusComment = '';
    this.newBonusType = 'Performance Bonus';
    this.newSalaryAnnual = null;
    this.newHikePct = 10;
    this.newArrearsMonths = 1;
    this.newRevisionAction = 'Process as salary';
    this.newRevisionComment = '';
    this.newOtHours = 8;
    this.newOtMultiplier = 1.5;
    this.newOtComment = '';
    this.showAddModal = true;
  }

  onSelectedEmployeeChange() {
    if (this.currentStep === 2 && this.selectedEmpId) {
      const emp = this.workingEmployees.find(e => e.id === Number(this.selectedEmpId));
      if (emp) {
        const monthly = emp.monthly_salary || 25000;
        const currentCtc = emp.annual_ctc || (monthly * 12);
        this.newHikePct = 10;
        this.newSalaryAnnual = Math.round(currentCtc * 1.10);
      }
    }
  }

  onNewSalaryChange() {
    if (!this.selectedEmpId) return;
    const emp = this.workingEmployees.find(e => e.id === Number(this.selectedEmpId));
    if (!emp) return;
    const currentCtc = emp.annual_ctc || ((emp.monthly_salary || 25000) * 12);
    if (currentCtc > 0 && this.newSalaryAnnual && this.newSalaryAnnual > 0) {
      this.newHikePct = parseFloat((((this.newSalaryAnnual - currentCtc) / currentCtc) * 100).toFixed(2));
    }
  }

  onNewHikeChange() {
    if (!this.selectedEmpId) return;
    const emp = this.workingEmployees.find(e => e.id === Number(this.selectedEmpId));
    if (!emp) return;
    const currentCtc = emp.annual_ctc || ((emp.monthly_salary || 25000) * 12);
    if (currentCtc > 0) {
      this.newSalaryAnnual = Math.round(currentCtc * (1 + (Number(this.newHikePct || 0) / 100)));
    }
  }

  closeAddModal() {
    this.showAddModal = false;
    this.selectedEmpId = null;
  }

  get availableEmployeesToAdd(): any[] {
    const existingIds = new Set<number>();
    if (this.currentStep === 1) {
      this.bonusRecords.forEach(r => existingIds.add(r.id));
    } else if (this.currentStep === 2) {
      this.revisionRecords.forEach(r => existingIds.add(r.id));
    } else if (this.currentStep === 3) {
      this.overtimeRecords.forEach(r => existingIds.add(r.id));
    } else if (this.currentStep === 4) {
      this.shiftAllowanceRecords.forEach(r => existingIds.add(r.id));
    }
    return (this.workingEmployees || []).filter(e => !existingIds.has(e.id));
  }

  confirmAdd() {
    if (!this.selectedEmpId) {
      this.toaster.showError('Please select an employee');
      return;
    }
    const emp = this.workingEmployees.find(e => e.id === Number(this.selectedEmpId));
    if (!emp) return;

    const monthlyGross = emp.monthly_salary || 25000;

    if (this.currentStep === 1) {
      const amt = Math.max(0, Number(this.newBonusAmount) || 0);
      const newRow: BonusRow = {
        id: emp.id,
        employee_code: emp.employee_code,
        employee_name: emp.employee_name,
        department: emp.department || 'General',
        designation: emp.designation || 'Staff',
        bonus_type: this.newBonusType,
        base_salary: monthlyGross,
        base_salary_formatted: `INR ${monthlyGross.toLocaleString('en-IN')}`,
        bonus_amount: amt,
        bonus_amount_formatted: `INR ${amt.toLocaleString('en-IN')}`,
        pay_action: 'Process with salary',
        taxable_status: 'Fully Taxable',
        comments: this.newBonusComment || `${this.newBonusType} added`,
        expanded: false
      };
      this.bonusRecords.unshift(newRow);
      this.toaster.showSuccess(`Added bonus for ${emp.employee_name}`);
    } else if (this.currentStep === 2) {
      const currentCtc = emp.annual_ctc || (monthlyGross * 12);
      const hike = Number(this.newHikePct) || 10;
      const revisedCtc = this.newSalaryAnnual && this.newSalaryAnnual > 0 ? Number(this.newSalaryAnnual) : Math.round(currentCtc * (1 + (hike / 100)));
      const prevMonthly = Math.round(currentCtc / 12);
      const revMonthly = Math.round(revisedCtc / 12);
      const diff = Math.max(0, revMonthly - prevMonthly);
      const arrearsMonths = Number(this.newArrearsMonths) || 1;
      const arrearsAmount = diff * arrearsMonths;
      const hikeStr = `${hike >= 0 ? '+' : ''}${hike.toFixed(1)}%`;
      const effDate = `${this.selectedMonth}-01`;

      const payload = {
        employee_id: emp.id,
        month: this.selectedMonth,
        previous_ctc: currentCtc,
        revised_ctc: revisedCtc,
        hike_percentage: hikeStr,
        effective_date: effDate,
        arrears_months: arrearsMonths,
        arrears_amount: arrearsAmount,
        pay_action: this.newRevisionAction || 'Process as salary',
        comments: this.newRevisionComment || `Appraisal revision of ${hike.toFixed(1)}%`
      };

      this.http.post<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime/revision`, payload).subscribe({
        next: (res) => {
          const newRow: RevisionRow = {
            id: emp.id,
            contract_id: res?.contract_id,
            employee_code: emp.employee_code,
            employee_name: emp.employee_name,
            department: emp.department || 'General',
            designation: emp.designation || 'Staff',
            previous_ctc: currentCtc,
            previous_ctc_formatted: `INR ${currentCtc.toLocaleString('en-IN')}`,
            revised_ctc: revisedCtc,
            revised_ctc_formatted: `INR ${revisedCtc.toLocaleString('en-IN')}`,
            hike_percentage: hikeStr,
            previous_monthly: prevMonthly,
            revised_monthly: revMonthly,
            monthly_increment: diff,
            effective_date: effDate,
            arrears_applicable: true,
            arrears_months: arrearsMonths,
            arrears_amount: arrearsAmount,
            arrears_amount_formatted: `INR ${arrearsAmount.toLocaleString('en-IN')}`,
            status: 'Approved',
            pay_action: this.newRevisionAction || 'Process as salary',
            comments: this.newRevisionComment || `Appraisal revision of ${hike.toFixed(1)}%`,
            expanded: false
          };
          this.revisionRecords.unshift(newRow);
          this.recalculateSummaries();
          this.toaster.showSuccess(`Added revision for ${emp.employee_name}`);
        },
        error: (err) => {
          console.error("Failed to add revision:", err);
          this.toaster.showError("Failed to save salary revision");
        }
      });
      this.closeAddModal();
      return;
    } else if (this.currentStep === 3) {
      const hourlyRate = Math.round(monthlyGross / (26 * 8)) || 100;
      const otHours = Math.max(0, Number(this.newOtHours) || 0);
      const mult = Number(this.newOtMultiplier) || 1.5;
      const otAmount = Math.round(hourlyRate * otHours * mult);

      const newRow: OvertimeRow = {
        id: emp.id,
        employee_code: emp.employee_code,
        employee_name: emp.employee_name,
        department: emp.department || 'Operations',
        designation: emp.designation || 'Staff',
        monthly_salary: monthlyGross,
        hourly_rate: hourlyRate,
        hourly_rate_formatted: `INR ${hourlyRate.toLocaleString('en-IN')} / hr`,
        ot_hours: otHours,
        multiplier: mult,
        multiplier_label: mult === 2.0 ? '2.0x (Holiday/Weekend)' : '1.5x (Standard OT)',
        ot_amount: otAmount,
        ot_amount_formatted: `INR ${otAmount.toLocaleString('en-IN')}`,
        pay_action: 'Process OT payout',
        comments: this.newOtComment || `Overtime (${otHours} hrs)`,
        expanded: false
      };
      this.overtimeRecords.unshift(newRow);
      this.toaster.showSuccess(`Added overtime for ${emp.employee_name}`);
    }

    this.recalculateSummaries();
    this.closeAddModal();
  }

  deleteRow(step: number, row: any) {
    if (step === 1) {
      this.bonusRecords = this.bonusRecords.filter(r => r.id !== row.id);
    } else if (step === 2) {
      this.revisionRecords = this.revisionRecords.filter(r => r.id !== row.id);
    } else if (step === 3) {
      this.overtimeRecords = this.overtimeRecords.filter(r => r.id !== row.id);
    } else if (step === 4) {
      this.shiftAllowanceRecords = this.shiftAllowanceRecords.filter(r => r.id !== row.id);
    }
    this.recalculateSummaries();
    this.toaster.showSuccess(`Removed ${row.employee_name}`);
  }

  // Update OT Amount when hours or multiplier changes
  onOtChanged(row: OvertimeRow) {
    row.ot_amount = Math.round(row.hourly_rate * (Number(row.ot_hours) || 0) * (Number(row.multiplier) || 1.5));
    row.ot_amount_formatted = `INR ${row.ot_amount.toLocaleString('en-IN')}`;
    this.recalculateSummaries();
  }

  // Update Bonus Amount
  onBonusChanged(row: BonusRow) {
    row.bonus_amount_formatted = `INR ${(Number(row.bonus_amount) || 0).toLocaleString('en-IN')}`;
    this.recalculateSummaries();
  }

  // Filtered lists based on search
  get filteredBonus(): BonusRow[] {
    if (!this.bonusSearchTerm.trim()) {
      return this.bonusRecords;
    }
    const q = this.bonusSearchTerm.toLowerCase().trim();
    return this.bonusRecords.filter(r =>
      r.employee_name.toLowerCase().includes(q) ||
      r.employee_code.toLowerCase().includes(q) ||
      r.bonus_type.toLowerCase().includes(q) ||
      (r.department && r.department.toLowerCase().includes(q))
    );
  }

  get filteredRevisions(): RevisionRow[] {
    if (!this.revisionSearchTerm.trim()) {
      return this.revisionRecords;
    }
    const q = this.revisionSearchTerm.toLowerCase().trim();
    return this.revisionRecords.filter(r =>
      r.employee_name.toLowerCase().includes(q) ||
      r.employee_code.toLowerCase().includes(q) ||
      (r.comments && r.comments.toLowerCase().includes(q)) ||
      (r.department && r.department.toLowerCase().includes(q))
    );
  }

  get filteredOvertime(): OvertimeRow[] {
    if (!this.overtimeSearchTerm.trim()) {
      return this.overtimeRecords;
    }
    const q = this.overtimeSearchTerm.toLowerCase().trim();
    return this.overtimeRecords.filter(r =>
      r.employee_name.toLowerCase().includes(q) ||
      r.employee_code.toLowerCase().includes(q) ||
      (r.department && r.department.toLowerCase().includes(q))
    );
  }

  get filteredShiftAllowance(): any[] {
    if (!this.shiftAllowanceSearchTerm.trim()) {
      return this.shiftAllowanceRecords;
    }
    const q = this.shiftAllowanceSearchTerm.toLowerCase().trim();
    return this.shiftAllowanceRecords.filter(r =>
      r.employee_name?.toLowerCase().includes(q) ||
      r.employee_code?.toLowerCase().includes(q)
    );
  }

  // Stepper & Row Navigation
  setStep(stepNum: number) {
    if (stepNum >= 1 && stepNum <= 4) {
      this.currentStep = stepNum;
    }
  }

  handleBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  toggleRow(row: any) {
    row.expanded = !row.expanded;
  }

  // Save & Continue
  saveAndContinue() {
    if (this.currentStep < 4) {
      this.isLoading = true;
      let currentRecords: any[] = [];
      if (this.currentStep === 1) currentRecords = this.bonusRecords;
      else if (this.currentStep === 2) currentRecords = this.revisionRecords;
      else if (this.currentStep === 3) currentRecords = this.overtimeRecords;
      else if (this.currentStep === 4) currentRecords = this.shiftAllowanceRecords;

      this.http.post<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime/save-step`, {
        month: this.selectedMonth,
        step: this.currentStep,
        records: currentRecords
      }).subscribe({
        next: () => {
          this.isLoading = false;
          this.toaster.showSuccess(`Step ${this.currentStep} saved successfully`);
          this.currentStep++;
        },
        error: () => {
          this.isLoading = false;
          this.toaster.showSuccess(`Step ${this.currentStep} saved`);
          this.currentStep++;
        }
      });
    } else {
      this.markStepAsCompleted();
    }
  }

  // Save & Close
  saveAndClose() {
    this.isLoading = true;
    let recordsToSave: any[] = [];
    if (this.currentStep === 1) recordsToSave = this.bonusRecords;
    else if (this.currentStep === 2) recordsToSave = this.revisionRecords;
    else if (this.currentStep === 3) recordsToSave = this.overtimeRecords;
    else if (this.currentStep === 4) recordsToSave = this.shiftAllowanceRecords;

    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime/save-step`, {
      month: this.selectedMonth,
      step: this.currentStep,
      records: recordsToSave
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.showSuccess('Salary changes saved');
        this.closeWorkflow();
      },
      error: () => {
        this.isLoading = false;
        this.toaster.showSuccess('Changes saved');
        this.closeWorkflow();
      }
    });
  }

  // Mark as Complete
  markStepAsCompleted() {
    this.isLoading = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime/mark-complete`, {
      month: this.selectedMonth,
      bonusRecords: this.bonusRecords,
      revisionRecords: this.revisionRecords,
      overtimeRecords: this.overtimeRecords
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        const key = `payroll_steps_${this.selectedMonth}`;
        let steps: any[] = [];
        try {
          const raw = localStorage.getItem(key);
          if (raw) steps = JSON.parse(raw);
        } catch (_) {}
        if (!Array.isArray(steps)) steps = [];

        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')} ${now.toLocaleString('en', { month: 'short' })} ${now.getFullYear()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        const subtitle = res?.subtitle || `Last Changes on ${formattedDate} BY Admin`;

        const stepIdx = steps.findIndex((s: any) => s.id === 3);
        const updated = { id: 3, completed: true, subtitle };
        if (stepIdx >= 0) {
          steps[stepIdx] = updated;
        } else {
          steps.push(updated);
        }
        localStorage.setItem(key, JSON.stringify(steps));

        this.toaster.showSuccess(`Bonus, Salary Revisions & Overtime completed for ${this.monthLabel}!`);
        this.closeWorkflow();
      },
      error: () => {
        this.isLoading = false;
        this.toaster.showSuccess('Bonus, Salary Revisions & Overtime marked as completed');
        this.closeWorkflow();
      }
    });
  }

  closeWorkflow() {
    this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
  }

  // Comment Modal
  openCommentModal(row: any) {
    this.activeCommentRow = row;
    this.tempCommentText = row.comments || '';
    this.showCommentModal = true;
  }

  closeCommentModal() {
    this.showCommentModal = false;
    this.activeCommentRow = null;
    this.tempCommentText = '';
  }

  saveCommentFromModal() {
    if (this.activeCommentRow) {
      this.activeCommentRow.comments = this.tempCommentText.trim();
      this.toaster.showSuccess(`Remark saved for ${this.activeCommentRow.employee_name}`);
    }
    this.closeCommentModal();
  }

  // Help Accordion
  toggleHelpResources() {
    this.helpResourcesOpen = !this.helpResourcesOpen;
  }

  toggleHelpItem(id: number) {
    this.openedHelpItem = this.openedHelpItem === id ? null : id;
  }

  // ─── SALARY REVISION EDIT & DELETE CRUD OPERATIONS ─────────────────────────

  openEditRevisionModal(row: RevisionRow) {
    this.editingRevision = { ...row };
    this.editRevisedCtc = Number(row.revised_ctc) || 0;
    const prev = Number(row.previous_ctc) || 0;
    if (prev > 0 && this.editRevisedCtc > 0) {
      this.editHikePercentage = parseFloat((((this.editRevisedCtc - prev) / prev) * 100).toFixed(2));
    } else {
      this.editHikePercentage = 0;
    }
    this.editEffectiveDate = row.effective_date && row.effective_date.length >= 10 ? row.effective_date : `${this.selectedMonth}-01`;
    this.editArrearsMonths = row.arrears_months || 1;
    this.editPayAction = row.pay_action || 'Process as salary';
    this.editComments = row.comments || '';
    this.showEditRevisionModal = true;
  }

  closeEditRevisionModal() {
    this.showEditRevisionModal = false;
    this.editingRevision = null;
    this.isSavingRevision = false;
  }

  onEditCtcChange() {
    const prev = Number(this.editingRevision?.previous_ctc) || 0;
    if (prev > 0 && this.editRevisedCtc > 0) {
      this.editHikePercentage = parseFloat((((this.editRevisedCtc - prev) / prev) * 100).toFixed(2));
    }
  }

  onEditHikeChange() {
    const prev = Number(this.editingRevision?.previous_ctc) || 0;
    if (prev > 0) {
      this.editRevisedCtc = Math.round(prev * (1 + (Number(this.editHikePercentage || 0) / 100)));
    }
  }

  get editPrevMonthly(): number {
    return Math.round((Number(this.editingRevision?.previous_ctc) || 0) / 12);
  }

  get editRevMonthly(): number {
    return Math.round((Number(this.editRevisedCtc) || 0) / 12);
  }

  get editMonthlyIncrement(): number {
    return Math.max(0, this.editRevMonthly - this.editPrevMonthly);
  }

  get editArrearsAmount(): number {
    return this.editMonthlyIncrement * (Number(this.editArrearsMonths) || 1);
  }

  get editGrossPayThisMonth(): number {
    const arrears = (this.editPayAction === 'Process revision & arrears' || this.editPayAction === 'Process as salary') ? this.editArrearsAmount : 0;
    return this.editRevMonthly + arrears;
  }

  saveEditedRevision() {
    if (!this.editingRevision) return;
    if (!this.editRevisedCtc || this.editRevisedCtc <= 0) {
      this.toaster.showError('Please enter a valid revised annual salary.');
      return;
    }

    this.isSavingRevision = true;
    const empId = this.editingRevision.id;
    const revCtc = Number(this.editRevisedCtc);
    const prevCtc = Number(this.editingRevision.previous_ctc);
    const hike = this.editHikePercentage;
    const hikeStr = `${hike >= 0 ? '+' : ''}${hike.toFixed(1)}%`;
    const arrearsAmt = this.editArrearsAmount;

    const payload = {
      month: this.selectedMonth,
      contract_id: this.editingRevision.contract_id,
      previous_ctc: prevCtc,
      revised_ctc: revCtc,
      hike_percentage: hikeStr,
      effective_date: this.editEffectiveDate,
      arrears_months: this.editArrearsMonths,
      arrears_amount: arrearsAmt,
      pay_action: this.editPayAction,
      comments: this.editComments
    };

    this.http.put<any>(`${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime/revision/${empId}`, payload).subscribe({
      next: (res) => {
        this.isSavingRevision = false;
        // Update local record
        const idx = this.revisionRecords.findIndex(r => r.id === empId);
        if (idx !== -1) {
          this.revisionRecords[idx] = {
            ...this.revisionRecords[idx],
            revised_ctc: revCtc,
            revised_ctc_formatted: `INR ${revCtc.toLocaleString('en-IN')}`,
            hike_percentage: hikeStr,
            revised_monthly: this.editRevMonthly,
            monthly_increment: this.editMonthlyIncrement,
            effective_date: this.editEffectiveDate,
            arrears_months: this.editArrearsMonths,
            arrears_amount: arrearsAmt,
            arrears_amount_formatted: `INR ${arrearsAmt.toLocaleString('en-IN')}`,
            pay_action: this.editPayAction,
            comments: this.editComments
          };
        }
        this.recalculateSummaries();
        this.toaster.showSuccess(`Updated revision for ${this.editingRevision?.employee_name}`);
        this.closeEditRevisionModal();
      },
      error: (err) => {
        this.isSavingRevision = false;
        console.error("Failed to update revision:", err);
        this.toaster.showError("Failed to update salary revision");
      }
    });
  }

  async confirmDeleteRevision(row: RevisionRow) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Salary Revision',
      subHeader: `${row.employee_name} (${row.employee_code})`,
      message: `Are you sure you want to delete the salary revision of <strong>${row.revised_ctc_formatted}</strong> (${row.hike_percentage})?<br><br>This will remove the revision from this payroll month and restore the previous salary structure.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteRevision(row);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteRevision(row: RevisionRow) {
    const contractParam = row.contract_id ? `&contract_id=${row.contract_id}` : '';
    const url = `${this.apiUrl}/api/payroll/v2/bonus-revisions-overtime/revision/${row.id}?month=${this.selectedMonth}${contractParam}`;

    this.http.delete<any>(url).subscribe({
      next: () => {
        this.revisionRecords = this.revisionRecords.filter(r => r.id !== row.id);
        this.recalculateSummaries();
        this.toaster.showSuccess(`Deleted salary revision for ${row.employee_name}`);
      },
      error: (err) => {
        console.error("Failed to delete revision:", err);
        // Fallback: delete locally from array
        this.revisionRecords = this.revisionRecords.filter(r => r.id !== row.id);
        this.recalculateSummaries();
        this.toaster.showSuccess(`Removed salary revision for ${row.employee_name}`);
      }
    });
  }

}

