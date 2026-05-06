import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';
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
  { key: 'run',     label: 'Run'     },
  { key: 'summary', label: 'Summary' },
  { key: 'preview', label: 'Preview' },
  { key: 'validate', label: 'Validate'},
  { key: 'lock',    label: 'Lock'    },
  { key: 'paid',    label: 'Paid'    },
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
  /** The run chosen by user from the list */
  selectedRun: V2RunSummary | null = null;
  /** Alias so lock/paid steps keep working unchanged */
  get runStatus(): V2RunSummary | null { return this.selectedRun; }
  previewData: PayrollPreviewResponse | null = null;
  validationResult: PayrollValidationResult | null = null;
  lockResult: any = null;
  paidResult: any = null;
  
  // ─── Pagination & Infinite Scroll ─────────────────────────
  previewPage = 1;
  previewLimit = 20;
  canLoadMorePreview = true;
  fullDetailedPreview: any[] = [];


  // ─── Loading flags ────────────────────────────────────────
  isRunning        = false;
  isLoadingSummary = false;
  isPreviewing     = false;
  isValidating     = false;
  isLocking        = false;
  isMarkingPaid    = false;

  constructor(
    private fb: FormBuilder,
    private payrollApi: PayrollApiService,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    public router: Router
  ) {
    this.selectedMonth = this.payrollApi.getCurrentYearMonth();
    this.previewMonth  = this.payrollApi.getCurrentYearMonth();
    this.processForm = this.fb.group({ month: [this.selectedMonth, Validators.required] });
    this.previewForm = this.fb.group({ month: [this.previewMonth, Validators.required] });
  }

  ngOnInit() {}

  // ─── Navigation ───────────────────────────────────────────
  goBack() {
    const idx = this.stepIndex;
    if (idx === 0) {
      this.router.navigate(['/finance/admin']);
    } else {
      this.currentStep = STEPS[idx - 1].key;
    }
  }

  goToStep(key: StepKey) {
    this.currentStep = key;
    // Always refresh summary when navigating to it
    if (key === 'summary') {
      this.loadSummary();
    }
  }

  resetWorkflow() {
    this.runResult = null;
    this.runList = [];
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

  navigateToExecution() {
    this.router.navigate(['/finance/execution']);
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 1 — RUN:  POST /api/payroll/v2/run
  // ═══════════════════════════════════════════════════════════

  async confirmRun() {
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
    this.isRunning  = true;
    this.runResult  = null;

    const [year, month] = this.selectedMonth.split('-').map(Number);

    this.payrollApi.runV2Payroll({ year, month }).subscribe({
      next: (res) => {
        this.runResult = res;
        this.isRunning = false;
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
        this.isLoadingSummary = false;
        if (this.runList.length === 0) {
          this.toaster.showError('No runs found for ' + this.selectedMonth);
        }
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
    this.previewData  = null;
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
        
        this.isPreviewing = false;
        
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
    this.isValidating     = true;
    this.validationResult = null;

    this.payrollApi.validatePayroll(this.selectedMonth).subscribe({
      next: (res) => {
        this.validationResult = res;
        this.isValidating = false;
        if (res.data?.valid) {
          this.toaster.showSuccess('Validation passed — ready to lock.');
        } else {
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
    this.paidResult    = null;

    this.payrollApi.markAsPaid(this.runStatus!.run_id).subscribe({
      next: (res) => {
        this.paidResult    = res;
        this.isMarkingPaid = false;
        if (this.runStatus) this.runStatus.status = 'PAID';
        this.toaster.showSuccess(`Run #${this.runStatus!.run_id} marked as PAID!`);
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
    if (s === 'paid')    return '#10b981';
    if (s === 'locked')  return '#8b5cf6';
    if (s.includes('complete') || s.includes('success')) return '#10b981';
    if (s.includes('run') || s.includes('process'))      return '#f59e0b';
    if (s.includes('fail') || s.includes('error'))       return '#ef4444';
    return '#6366f1';
  }

  getPreviewComponentHeaders(): string[] {
    const preview = this.fullDetailedPreview;
    if (!preview || preview.length === 0) return [];
    return preview[0].components?.map((c: any) => c.name) || [];
  }

  getComponentAmount(emp: any, name: string): number {
    const comp = emp.components?.find((c: any) => c.name === name);
    return comp ? comp.amount : 0;
  }

  exportToExcel() {
    if (this.fullDetailedPreview.length === 0) {
      this.toaster.showError('No preview data available to export');
      return;
    }

    const data = this.fullDetailedPreview.map((emp: any) => {
      const row: any = {
        'Employee ID': emp.employee_number,
        'Employee Name': emp.full_name,
        'Designation': emp.designation,
        'Department': emp.department,
        'Template': emp.template_name,
        'Annual CTC': emp.annual_ctc,
        'Monthly Gross': emp.monthly_gross,
        'Calendar Days': emp.calendar_days,
        'LOP Days': emp.lop_days,
        'Paid Days': emp.paid_days,
      };

      // Add dynamic components
      const headers = this.getPreviewComponentHeaders();
      headers.forEach(head => {
        row[head] = this.getComponentAmount(emp, head);
      });

      row['Total Earnings'] = emp.total_earnings;
      row['Total Deductions'] = emp.total_deductions;
      row['Net Pay'] = emp.total_net;
      row['Total Net Payout'] = emp.total_net_payout;

      return row;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payroll Preview');

    // Generate filename
    const filename = `Payroll_Preview_${this.previewMonth || 'Report'}.xlsx`;
    XLSX.writeFile(wb, filename);
    this.toaster.showSuccess('Exported successfully');
  }

  trackByEmpId(index: number, item: any) {
    return item.employee_id;
  }
}
