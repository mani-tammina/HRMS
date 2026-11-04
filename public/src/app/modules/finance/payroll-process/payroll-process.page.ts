import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  PayrollApiService,
  PayrollValidationResult,
  PayrollPreviewResponse,
  V2RunResponse,
  V2RunSummary
} from '../../../core/services/payroll-api.service';
import { ToasterService } from '../../../core/services/toaster.service';

// Step definitions — 6-step flow: Run → Summary → Preview → Validate → Lock → Paid
type StepKey = 'run' | 'summary' | 'preview' | 'validate' | 'lock' | 'paid';

const STEPS: Array<{ key: StepKey; label: string }> = [
  { key: 'run', label: 'Run' },
  { key: 'summary', label: 'Summary' },
  { key: 'preview', label: 'Preview' },
  { key: 'validate', label: 'Validate' },
  { key: 'lock', label: 'Lock' },
  { key: 'paid', label: 'Paid' },
];

@Component({
  selector: 'app-payroll-process',
  templateUrl: './payroll-process.page.html',
  styleUrls: ['./payroll-process.page.scss'],
  standalone: false
})
export class PayrollProcessPage implements OnInit {

  // Expose steps array to template
  steps = STEPS;

  // ─── Stepper ──────────────────────────────────────────────
  currentStep: StepKey = 'run';

  get stepIndex(): number {
    return STEPS.findIndex(s => s.key === this.currentStep);
  }

  // ─── Forms ────────────────────────────────────────────────
  processForm: FormGroup;   // for Run step
  previewForm: FormGroup;   // for Preview step (can use different month)
  selectedMonth: string;
  previewMonth: string;

  // ─── API Results ──────────────────────────────────────────
  runResult: V2RunResponse | null = null;
  /** Full list from GET /api/payroll/v2/run?month= */
  runList: V2RunSummary[] = [];
  /** Latest run for the selected month */
  latestRun: V2RunSummary | null = null;
  /** Array containing only the latest run for compatibility */
  lastestrun: V2RunSummary[] = [];
  /** The run chosen by user from the list */
  selectedRun: V2RunSummary | null = null;
  /** Alias so lock/paid steps keep working unchanged */
  get runStatus(): V2RunSummary | null { return this.selectedRun; }
  get lockNetPayout(): number {
    if (this.previewData?.data?.estimate?.totalNet !== undefined && this.previewData?.data?.estimate?.totalNet !== null) {
      return this.previewData.data.estimate.totalNet;
    }
    return this.runStatus?.total_net || 0;
  }
  previewData: PayrollPreviewResponse | null = null;
  validationResult: PayrollValidationResult | null = null;
  lockResult: any = null;
  paidResult: any = null;

  get isMonthLocked(): boolean {
    const status = (this.latestRun?.status || '').toUpperCase();
    return status === 'LOCKED' || status === 'PAID';
  }

  get isMonthPaid(): boolean {
    const status = (this.latestRun?.status || '').toUpperCase();
    return status === 'PAID';
  }

  // ─── Pagination & Infinite Scroll ─────────────────────────
  previewPage = 1;
  previewLimit = 20;
  canLoadMorePreview = true;
  fullDetailedPreview: any[] = [];


  // ─── Loading flags ────────────────────────────────────────
  isRunning = false;
  isLoadingSummary = false;
  isPreviewing = false;
  isValidating = false;
  isLocking = false;
  isMarkingPaid = false;
  isCancelling = false;
  isExporting = false;

  constructor(
    private fb: FormBuilder,
    private payrollApi: PayrollApiService,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    public router: Router
  ) {
    this.selectedMonth = this.payrollApi.getCurrentYearMonth();
    this.previewMonth = this.payrollApi.getCurrentYearMonth();
    this.processForm = this.fb.group({ month: [this.selectedMonth, Validators.required] });
    this.previewForm = this.fb.group({ month: [this.previewMonth, Validators.required] });
  }

  ngOnInit() {
    this.checkMonthStatusAndNavigate(this.selectedMonth);

    this.processForm.get('month')?.valueChanges.subscribe((val) => {
      if (val) {
        const month = val.substring(0, 7);
        if (month !== this.selectedMonth) {
          this.onMonthSelected(month);
        }
      }
    });
  }

  ionViewWillEnter() {
    this.checkMonthStatusAndNavigate(this.selectedMonth);
  }

  // ─── Stage Persistence & Month Tracking ───────────────────
  private getStorageKey(month: string): string {
    return `payroll_stage_${month}`;
  }

  saveMonthStage(month: string, stage: StepKey) {
    if (!month || stage === 'run') return;
    try {
      localStorage.setItem(this.getStorageKey(month), stage);
    } catch (e) {
      console.warn('Could not save payroll stage to localStorage', e);
    }
  }

  getSavedStage(month: string): StepKey | null {
    if (!month) return null;
    try {
      return (localStorage.getItem(this.getStorageKey(month)) as StepKey) || null;
    } catch (e) {
      return null;
    }
  }

  getTargetStep(month?: string): StepKey {
    const m = month || this.selectedMonth;
    const runStatus = (this.latestRun?.status || '').toUpperCase();
    const savedStage = this.getSavedStage(m);

    // 1. If user previously progressed to a specific stage for this month, navigate directly to that stage!
    if (savedStage && ['summary', 'preview', 'validate', 'lock', 'paid'].includes(savedStage)) {
      return savedStage;
    }

    // 2. If status is explicitly PAID in backend, go to paid
    if (runStatus === 'PAID') return 'paid';

    // 3. If status is explicitly LOCKED in backend, go to lock
    if (runStatus === 'LOCKED') return 'lock';

    // 4. If status is REVIEWED in backend, go to validate
    if (runStatus === 'REVIEWED') return 'validate';

    // 5. If a run exists (status is COMPLETED or run exists), default to preview stage
    if (this.latestRun || this.runResult) {
      return 'preview';
    }

    return 'run';
  }

  canNavigateToStep(step: StepKey): boolean {
    if (step === this.currentStep) return true;
    if (step === 'run') return true;
    if (this.latestRun || this.runResult) return true;
    return false;
  }

  onStepClick(step: StepKey) {
    if (this.canNavigateToStep(step)) {
      this.goToStep(step);
    }
  }

  resumeMonthStage() {
    const target = this.getTargetStep(this.selectedMonth);
    this.goToStep(target);
  }

  // ─── Cancel Payroll of the Month ──────────────────────────
  async confirmCancelPayroll() {
    const alert = await this.alertCtrl.create({
      header: 'Cancel Payroll',
      subHeader: `Month: ${this.selectedMonth}`,
      message: `Are you sure you want to cancel and delete the payroll for <strong>${this.selectedMonth}</strong>? All generated run records and payslips will be deleted, and you will start from the beginning.`,
      cssClass: 'glass-alert danger-alert',
      buttons: [
        { text: 'Keep Payroll', role: 'cancel' },
        {
          text: 'Yes, Delete & Restart',
          role: 'destructive',
          handler: () => this.executeCancelPayroll()
        }
      ]
    });
    await alert.present();
  }

  executeCancelPayroll() {
    const runId = this.latestRun?.run_id || this.runResult?.data?.runId || null;
    this.isCancelling = true;

    this.payrollApi.cancelPayrollRun(runId, this.selectedMonth).subscribe({
      next: (res) => {
        this.isCancelling = false;
        try {
          localStorage.removeItem(this.getStorageKey(this.selectedMonth));
        } catch (e) {}

        this.runResult = null;
        this.runList = [];
        this.latestRun = null;
        this.lastestrun = [];
        this.selectedRun = null;
        this.previewData = null;
        this.fullDetailedPreview = [];
        this.validationResult = null;
        this.lockResult = null;
        this.paidResult = null;
        this.currentStep = 'run';

        this.toaster.showSuccess(`Payroll for ${this.selectedMonth} has been cancelled and deleted. You can start again.`);
      },
      error: (err) => {
        this.isCancelling = false;
        this.toaster.showError('Failed to cancel payroll: ' + (err?.error?.error || err?.message || 'Server error'));
        console.error(err);
      }
    });
  }

  onMonthPickerChange(event: any) {
    const val = event?.detail?.value;
    if (val) {
      const month = val.substring(0, 7);
      this.onMonthSelected(month);
    }
  }

  onHeaderMonthChange(event: any) {
    const val = event?.detail?.value;
    if (val) {
      const month = val.substring(0, 7);
      this.onMonthSelected(month);
    }
  }

  onMonthSelected(month: string) {
    if (!month) return;
    this.selectedMonth = month;
    this.previewMonth = month;
    this.processForm.patchValue({ month }, { emitEvent: false });
    this.previewForm.patchValue({ month }, { emitEvent: false });
    this.previewData = null;
    this.validationResult = null;
    this.lockResult = null;
    this.paidResult = null;
    this.checkMonthStatusAndNavigate(month);
  }

  checkMonthStatusAndNavigate(month: string) {
    this.isLoadingSummary = true;
    this.payrollApi.getV2RunSummary(month).subscribe({
      next: (runs) => {
        this.runList = runs || [];
        this.isLoadingSummary = false;

        if (this.runList.length > 0) {
          const sorted = [...this.runList].sort((a, b) => (Number(b.run_id) || 0) - (Number(a.run_id) || 0));
          this.latestRun = sorted[0];
          this.lastestrun = [this.latestRun];
          this.selectedRun = this.latestRun;

          const target = this.getTargetStep(month);
          this.goToStep(target);
          this.toaster.showSuccess(`Existing payroll found for ${month} — navigated to ${target.toUpperCase()} stage.`);
        } else {
          this.latestRun = null;
          this.lastestrun = [];
          this.selectedRun = null;
          this.runResult = null;
          this.currentStep = 'run';
        }
      },
      error: (err) => {
        this.isLoadingSummary = false;
        console.error('Failed to load runs for month:', month, err);
      }
    });
  }

  // ─── Navigation ───────────────────────────────────────────
  goBack() {
    const idx = this.stepIndex;
    if (idx === 0) {
      this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
    } else {
      const prevStep = STEPS[idx - 1].key;
      this.goToStep(prevStep);
    }
  }

  goToStep(key: StepKey) {
    this.currentStep = key;
    this.saveMonthStage(this.selectedMonth, key);

    // Refresh summary when navigating to summary
    if (key === 'summary') {
      this.loadSummary();
    } else if (key === 'preview') {
      this.previewMonth = this.selectedMonth;
      this.previewForm.patchValue({ month: this.selectedMonth }, { emitEvent: false });
      if (!this.previewData && !this.isPreviewing) {
        this.startPreview();
      }
    } else if (key === 'validate') {
      if (!this.validationResult && !this.isValidating) {
        this.startValidation();
      }
      if (!this.previewData && !this.isPreviewing) {
        this.startPreview();
      }
    } else if (key === 'lock' || key === 'paid') {
      if (!this.previewData && !this.isPreviewing) {
        this.startPreview();
      }
    }
  }

  resetWorkflow() {
    this.runResult = null;
    this.runList = [];
    this.latestRun = null;
    this.lastestrun = [];
    this.selectedRun = null;
    this.previewData = null;
    this.validationResult = null;
    this.lockResult = null;
    this.paidResult = null;
    this.currentStep = 'run';
  }

  resetRun() {
    this.runResult = null;
  }

  goToPayrollDashboard() {
    this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
  }

navigateToExecution() {
    this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 1 — RUN:  POST /api/payroll/v2/run
  // ═══════════════════════════════════════════════════════════

  async confirmRun() {
    if (this.isMonthLocked) {
      this.toaster.showError(`Payroll for ${this.selectedMonth} is locked. You cannot re-run it.`);
      return;
    }
    const raw: string = this.processForm.value.month;
    this.selectedMonth = raw.substring(0, 7);

    const alert = await this.alertCtrl.create({
      header: 'Confirm Payroll Run',
      message: `Generate payroll for <strong>${this.selectedMonth}</strong>? This creates payslip records for all eligible employees.`,
      cssClass: 'glass-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Run Now', handler: () => this.executeRun() }
      ]
    });
    await alert.present();
  }

  executeRun() {
    this.isRunning = true;
    this.runResult = null;

    const [year, month] = this.selectedMonth.split('-').map(Number);

    this.payrollApi.runV2Payroll({ year, month }).subscribe({
      next: (res) => {
        this.runResult = res;
        this.isRunning = false;
        this.saveMonthStage(this.selectedMonth, 'summary');
        this.toaster.showSuccess(`Payroll run #${res.data?.runId} created.`);
      },
      error: (err) => {
        this.isRunning = false;
        this.toaster.showError('Payroll run failed. ' + (err?.error?.message || ''));
        console.error(err);
      }
    });
  }

  downloadExcel(overrideRunId?: number) {
    const runId = overrideRunId || this.runResult?.data?.runId;
    if (!runId) {
      this.toaster.showError('No Run ID found to download.');
      return;
    }

    this.payrollApi.exportRunExcel(runId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Payroll_Run_${runId}_Details.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        this.toaster.showSuccess('Report downloaded successfully.');
      },
      error: (err) => {
        this.toaster.showError('Failed to download report.');
        console.error(err);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 2 — SUMMARY: GET /api/payroll/v2/run?month=YYYY-MM
  //   Returns list of all runs → user selects one
  // ═══════════════════════════════════════════════════════════

  loadSummary() {
    this.isLoadingSummary = true;
    this.payrollApi.getV2RunSummary(this.selectedMonth).subscribe({
      next: (res) => {
        this.runList = res || [];
        if (this.runList.length > 0) {
          // Sort descending by run_id (or started_at) to guarantee the latest run is first
          const sorted = [...this.runList].sort((a, b) => (Number(b.run_id) || 0) - (Number(a.run_id) || 0));
          this.latestRun = sorted[0];
          this.lastestrun = [this.latestRun];
          // Auto-select the latest run so download, preview, lock and mark-as-paid are active
          this.selectedRun = this.latestRun;
        } else {
          this.latestRun = null;
          this.lastestrun = [];
          this.selectedRun = null;
          this.toaster.showError('No runs found for ' + this.selectedMonth);
        }
        this.isLoadingSummary = false;
      },
      error: (err) => {
        this.isLoadingSummary = false;
        this.toaster.showError('Failed to load runs.');
        console.error(err);
      }
    });
  }

  /** Called when user clicks a run card in the list */
  selectRun(run: V2RunSummary) {
    this.selectedRun = run;
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 3 — PREVIEW:  POST /api/payroll/v2/runs/preview
  // ═══════════════════════════════════════════════════════════

  startPreview() {
    const raw: string = this.previewForm.value.month;
    this.previewMonth = raw.substring(0, 7);
    const [year, month] = this.previewMonth.split('-').map(Number);

    this.isPreviewing = true;
    this.previewData = null;
    this.fullDetailedPreview = [];
    this.previewPage = 1;
    this.canLoadMorePreview = true;

    this.loadPreviewData(year, month);
  }

  loadPreviewData(year: number, month: number, event?: any) {
    this.payrollApi.previewPayroll({
      year,
      month,
      page: this.previewPage,
      limit: this.previewLimit
    }).subscribe({
      next: (res) => {
        this.previewData = res;
        const newItems = res.data?.detailedPreview || [];
        this.fullDetailedPreview = [...this.fullDetailedPreview, ...newItems];

        if (res.data?.estimate?.totalNet !== undefined) {
          if (this.selectedRun) this.selectedRun.total_net = res.data.estimate.totalNet;
          if (this.latestRun) this.latestRun.total_net = res.data.estimate.totalNet;
        }

        this.isPreviewing = false;
        if (this.currentStep === 'preview') {
          this.saveMonthStage(this.selectedMonth, 'preview');
        }

        // Check if we can load more
        const pagination = (res as any).data?.pagination;
        if (pagination) {
          this.canLoadMorePreview = pagination.currentPage < pagination.pages;
        } else {
          this.canLoadMorePreview = false;
        }

        if (event) {
          event.target.complete();
        }
      },
      error: (err) => {
        this.isPreviewing = false;
        this.toaster.showError('Preview failed.');
        console.error(err);
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  loadMorePreview(event: any) {
    if (!this.canLoadMorePreview) {
      event.target.complete();
      return;
    }
    this.previewPage++;
    const [year, month] = this.previewMonth.split('-').map(Number);
    this.loadPreviewData(year, month, event);
  }

  viewAllPreview() {
    this.router.navigate(['/finance/preview-all'], {
      queryParams: { month: this.previewMonth }
    });
  }



  // ═══════════════════════════════════════════════════════════
  // STEP 4 — VALIDATE:  GET /api/payroll/v2/runs/validate
  // ═══════════════════════════════════════════════════════════

  startValidation() {
    this.isValidating = true;
    this.validationResult = null;

    this.payrollApi.validatePayroll(this.selectedMonth).subscribe({
      next: (res) => {
        this.validationResult = res;
        this.isValidating = false;
        if (res.data?.valid) {
          this.saveMonthStage(this.selectedMonth, 'lock');
          this.toaster.showSuccess('Validation passed — ready to lock.');
        } else {
          this.saveMonthStage(this.selectedMonth, 'validate');
          this.toaster.showError('Validation failed. Resolve errors first.');
        }
      },
      error: (err) => {
        this.isValidating = false;
        this.toaster.showError('Validation API error.');
        console.error(err);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 5 — LOCK:  POST /api/payroll/v2/runs/:runId/lock
  // ═══════════════════════════════════════════════════════════

  executeLock() {
    if (!this.runStatus?.run_id) {
      this.toaster.showError('Run ID missing — cannot lock.');
      return;
    }
    this.isLocking = true;
    this.lockResult = null;

    this.payrollApi.lockPayrollRun(this.runStatus.run_id).subscribe({
      next: (res) => {
        this.lockResult = res;
        this.isLocking = false;
        if (this.runStatus) this.runStatus.status = 'LOCKED';
        if (this.latestRun) this.latestRun.status = 'LOCKED';
        this.saveMonthStage(this.selectedMonth, 'lock');
        this.toaster.showSuccess(`Run #${this.runStatus!.run_id} locked.`);
      },
      error: (err) => {
        this.isLocking = false;
        this.toaster.showError('Lock failed. ' + (err?.error?.message || ''));
        console.error(err);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 6 — PAID:  POST /api/payroll/v2/runs/:runId/paid
  // ═══════════════════════════════════════════════════════════

  async executeMarkAsPaid() {
    if (!this.runStatus?.run_id) {
      this.toaster.showError('Run ID missing — cannot mark as paid.');
      return;
    }
    const alert = await this.alertCtrl.create({
      header: 'Confirm Payment',
      message: `Mark Run <strong>#${this.runStatus.run_id}</strong> as PAID? This confirms salaries have been disbursed.`,
      cssClass: 'glass-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Confirm', handler: () => this.doMarkAsPaid() }
      ]
    });
    await alert.present();
  }

  private doMarkAsPaid() {
    this.isMarkingPaid = true;
    this.paidResult = null;

    this.payrollApi.markAsPaid(this.runStatus!.run_id).subscribe({
      next: (res) => {
        this.paidResult = res;
        this.isMarkingPaid = false;
        if (this.runStatus) this.runStatus.status = 'PAID';
        if (this.latestRun) this.latestRun.status = 'PAID';
        this.saveMonthStage(this.selectedMonth, 'paid');
        this.toaster.showSuccess(`Run #${this.runStatus!.run_id} marked as PAID!`);
        this.goToPayrollDashboard();
      },
      error: (err) => {
        this.isMarkingPaid = false;
        this.toaster.showError('Mark as paid failed. ' + (err?.error?.message || ''));
        console.error(err);
      }
    });
  }

  // ─── Helpers ──────────────────────────────────────────────
  formatCurrency(val: any): string {
    const num = Number(val) || 0;
    return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getStatusColor(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'paid') return '#10b981';
    if (s === 'locked') return '#8b5cf6';
    if (s.includes('complete') || s.includes('success')) return '#10b981';
    if (s.includes('run') || s.includes('process')) return '#f59e0b';
    if (s.includes('fail') || s.includes('error')) return '#ef4444';
    return '#6366f1';
  }

  getPreviewComponentHeaders(): string[] {
    const preview = this.fullDetailedPreview;
    if (!preview || preview.length === 0) return [];
    return (preview[0].components?.map((c: any) => c.name) || [])
      .filter((name: string) => !/pf|provident|esi/i.test(name));
  }

  getComponentAmount(emp: any, name: string): number {
    const comp = emp.components?.find((c: any) =>
      c.name?.toLowerCase() === name.toLowerCase() ||
      c.code?.toLowerCase() === name.toLowerCase()
    );
    return comp ? Number(comp.amount) || 0 : 0;
  }

  getEmployeePf(emp: any): number {
    if (emp.pf_employee !== undefined && emp.pf_employee !== null && emp.pf_employee !== 0) {
      return Number(emp.pf_employee);
    }
    const fromComp = this.getComponentAmount(emp, 'PF Employee Contribution') ||
                     this.getComponentAmount(emp, 'PF Employee') ||
                     this.getComponentAmount(emp, 'PF_DEDUCT') ||
                     this.getComponentAmount(emp, 'PF');
    if (fromComp) return Number(fromComp);
    return 0;
  }

  getEmployerPf(emp: any): number {
    if (emp.pf_employer !== undefined && emp.pf_employer !== null && emp.pf_employer !== 0) {
      return Number(emp.pf_employer);
    }
    const fromComp = this.getComponentAmount(emp, 'PF Employer Contribution') ||
                     this.getComponentAmount(emp, 'PF Employer') ||
                     this.getComponentAmount(emp, 'PF_ER') ||
                     this.getComponentAmount(emp, 'PF_DEDUCT_EMPLOYER');
    if (fromComp) return Number(fromComp);
    // Statutory standard: Employer PF matches Employee PF
    return this.getEmployeePf(emp);
  }

  getEmployeeEsi(emp: any): number {
    if (emp.esi_employee !== undefined && emp.esi_employee !== null && emp.esi_employee !== 0) {
      return Number(emp.esi_employee);
    }
    const fromComp = this.getComponentAmount(emp, 'ESI Employee Contribution') ||
                     this.getComponentAmount(emp, 'ESI Employee') ||
                     this.getComponentAmount(emp, 'ESI_EE') ||
                     this.getComponentAmount(emp, 'ESI');
    if (fromComp) return Number(fromComp);
    return 0;
  }

  getEmployerEsi(emp: any): number {
    if (emp.esi_employer !== undefined && emp.esi_employer !== null && emp.esi_employer !== 0) {
      return Number(emp.esi_employer);
    }
    const fromComp = this.getComponentAmount(emp, 'ESI Employer Contribution') ||
                     this.getComponentAmount(emp, 'ESI Employer') ||
                     this.getComponentAmount(emp, 'ESI_ER');
    if (fromComp) return Number(fromComp);
    const ee = this.getEmployeeEsi(emp);
    if (ee > 0) return Math.round(ee * (3.25 / 0.75));
    return 0;
  }

  exportToExcel() {
    const rawMonth: string = this.previewMonth || this.previewForm.value.month || this.selectedMonth;
    if (!rawMonth) {
      this.toaster.showError('No preview month selected.');
      return;
    }

    const [year, month] = rawMonth.split('-').map(Number);
    if (!year || !month) {
      this.toaster.showError('Invalid month format.');
      return;
    }

    this.isExporting = true;
    this.toaster.showInfo('Fetching all employee details for export...');

    // Request preview records, plus employee master details & locations to enrich any missing data (PAN, DOB, etc.)
    forkJoin({
      preview: this.payrollApi.previewPayroll({
        year,
        month,
        page: 1,
        limit: 10000,
        all: true
      } as any).pipe(
        catchError((err) => {
          console.warn('previewPayroll with all: true failed, falling back', err);
          return of({ data: { detailedPreview: this.fullDetailedPreview } });
        })
      ),
      employeeDirectory: this.payrollApi.getAllEmployees(2000).pipe(
        catchError((err) => {
          console.warn('Failed to load employee directory for enrichment', err);
          return of({ data: [] });
        })
      ),
      locations: this.payrollApi.getLocations().pipe(
        catchError((err) => {
          console.warn('Failed to load locations', err);
          return of([]);
        })
      )
    }).subscribe({
      next: ({ preview, employeeDirectory, locations }) => {
        this.isExporting = false;
        const allEmployees = preview?.data?.detailedPreview;
        const listToExport = (allEmployees && allEmployees.length > 0) ? allEmployees : this.fullDetailedPreview;

        if (!listToExport || listToExport.length === 0) {
          this.toaster.showError('No preview data available to export');
          return;
        }

        // Build Employee Directory Map
        const empDir = Array.isArray(employeeDirectory) ? employeeDirectory : (employeeDirectory?.data || []);
        const empMap = new Map<string, any>();
        empDir.forEach((e: any) => {
          if (e.EmployeeNumber) empMap.set(String(e.EmployeeNumber).trim().toUpperCase(), e);
          if (e.id) empMap.set(String(e.id), e);
        });

        // Build Locations Map
        const locList = Array.isArray(locations) ? locations : (locations?.data || []);
        const locMap = new Map<string | number, string>();
        locList.forEach((l: any) => {
          if (l.id) {
            locMap.set(l.id, l.name);
            locMap.set(String(l.id), l.name);
          }
        });

        this.generateExcelFile(listToExport, year, month, empMap, locMap);
      },
      error: (err) => {
        this.isExporting = false;
        if (this.fullDetailedPreview.length > 0) {
          this.generateExcelFile(this.fullDetailedPreview, year, month, new Map(), new Map());
        } else {
          this.toaster.showError('Failed to prepare payroll export.');
          console.error(err);
        }
      }
    });
  }

  private generateExcelFile(
    employees: any[],
    year: number,
    month: number,
    empMap: Map<string, any>,
    locMap: Map<string | number, string>
  ) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const payrollMonthStr = `${monthNames[month - 1]} - ${year}`;

    const getComp = (emp: any, ...aliases: string[]): number => {
      if (!emp.components || !Array.isArray(emp.components)) return 0;
      for (const alias of aliases) {
        const found = emp.components.find((c: any) =>
          (c.name && c.name.toLowerCase() === alias.toLowerCase()) ||
          (c.code && c.code.toLowerCase() === alias.toLowerCase())
        );
        if (found) return Number(found.amount) || 0;
      }
      return 0;
    };

    const data = employees.map((emp: any) => {
      const basic = getComp(emp, 'Basic Salary', 'BASIC');
      const hra = getComp(emp, 'House Rent Allowance', 'HRA');
      const medical = getComp(emp, 'Medical Allowance', 'MEDICAL');
      const transport = getComp(emp, 'Transport Allowance', 'Conveyance Allowance', 'TRANSPORT ALLOWANCE', 'CONVEYANCE');
      const special = getComp(emp, 'Special Allowance', 'SPECIAL');

      const grossA = Number(emp.total_earnings || 0);
      const pfEmployee = this.getEmployeePf(emp);
      const pfEmployer = this.getEmployerPf(emp);
      const esiEmployee = this.getEmployeeEsi(emp);
      const esiEmployer = this.getEmployerEsi(emp);
      const totalContributionsB = pfEmployee + esiEmployee;
      const total = grossA + pfEmployer + esiEmployer;

      const profTax = Number(emp.professional_tax !== undefined ? emp.professional_tax : getComp(emp, 'Professional Tax', 'PROF_TAX', 'PT'));
      const totalDeductionsC = Math.max(0, Number(emp.total_deductions || 0) - totalContributionsB);
      const netPayABC = grossA - totalContributionsB - totalDeductionsC;

      const cashAdvanceD = 0;
      const settlementE = 0;
      const reimbursementF = 0;
      const totalNetPay = netPayABC + cashAdvanceD + settlementE + reimbursementF;

      const calDays = emp.calendar_days || 30;
      const paidDays = emp.paid_days !== undefined ? emp.paid_days : calDays;
      const workingDays = calDays;
      const lopDays = emp.lop_days || 0;

      // Lookup employee directory data for demographic details (fallback for empty fields)
      const empNumKey = String(emp.employee_number || '').trim().toUpperCase();
      const empIdKey = String(emp.employee_id || '');
      const empInfo = empMap.get(empNumKey) || empMap.get(empIdKey) || {};

      const panNumber = emp.pan_number || empInfo.PANNumber || empInfo.pan_number || empInfo.pan || '';
      const employmentStatus = emp.employment_status || empInfo.EmploymentStatus || empInfo.employment_status || 'Working';
      const dateOfJoining = emp.date_of_joining || empInfo.DateJoined || empInfo.date_of_joining || empInfo.joining_date || '';
      const gender = emp.gender || empInfo.Gender || empInfo.gender || '';
      const dateOfBirth = emp.date_of_birth || empInfo.DateOfBirth || empInfo.date_of_birth || empInfo.dob || '';
      const locId = empInfo.LocationId || emp.location_id;
      const location = emp.location || (locId ? locMap.get(locId) : '') || empInfo.location_name || empInfo.Location || '';

      return {
        'Employee Number': emp.employee_number || '',
        'Employee Name': emp.full_name || '',
        'Job Title': emp.designation || '',
        'PAN Number': panNumber,
        'Employment Status': employmentStatus,
        'Date Of Joining': dateOfJoining ? String(dateOfJoining).substring(0, 10) : '',
        'Gender': gender,
        'Date Of Birth': dateOfBirth ? String(dateOfBirth).substring(0, 10) : '',
        'Location': location,
        'Department': emp.department || '',
        'Payroll Month': payrollMonthStr,
        'Payroll Type': 'Regular',
        'Status': 'ExecutedAsSalary',
        'Status Description': 'ExecutedAsSalary',
        'Actual Payable days': calDays,
        'Working days': workingDays,
        'Loss of Pay Days': lopDays,
        'Days Payable': paidDays,
        'Payable Units': `${paidDays}/${calDays} Days`,
        'Remuneration Amount': `${Number(emp.monthly_gross || 0).toFixed(2)} / MONTH`,
        'Basic': basic,
        'HRA': hra,
        'Medical Allowance': medical,
        'Transport Allowance': transport,
        'Special Allowance': special,
        'Gross(A)': grossA,
        'PF - Employer': pfEmployer,
        'ESI Employer': esiEmployer,
        'Total': total,
        'PF Employee': pfEmployee,
        'ESI Employee': esiEmployee,
        'Total Contributions(B)': totalContributionsB,
        'Professional Tax': profTax,
        'Total Deductions(C)': totalDeductionsC,
        'Net Pay(A-B-C)': netPayABC,
        'Cash Advance(D)': cashAdvanceD,
        'Settlement Aganist Advance(E)': settlementE,
        'Total Reimbursements(F)': reimbursementF,
        'Total Net Pay(A-B-C+D+E+F)': totalNetPay
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payroll Preview');

    // Auto fit column widths
    const colWidths = Object.keys(data[0] || {}).map(key => ({
      wch: Math.max(key.length, 12)
    }));
    ws['!cols'] = colWidths;

    const filename = `Payroll_Preview_${this.previewMonth || payrollMonthStr.replace(/\s+/g, '_')}.xlsx`;
    XLSX.writeFile(wb, filename);
    this.toaster.showSuccess(`Exported ${data.length} employees successfully`);
  }

  trackByEmpId(index: number, item: any) {
    return item.employee_id;
  }
}
