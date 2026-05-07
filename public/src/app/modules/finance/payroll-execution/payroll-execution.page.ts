import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PayrollApiService, PayrollRun, V2RunSummary } from '../../../core/services/payroll-api.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-payroll-execution',
  templateUrl: './payroll-execution.page.html',
  styleUrls: ['./payroll-execution.page.scss'],
  standalone: false
})
export class PayrollExecutionPage implements OnInit {
  activeTab: 'run' | 'history' | 'defaults' | 'adjustments' = 'run';

  // ── Run Payroll ──
  runForm!: FormGroup;
  isRunning = false;
  lastRunResult: any = null;

  // ── Payroll Runs History ──
  payrollRuns: PayrollRun[] = [];
  v2Runs: V2RunSummary[] = [];
  isLoadingRuns = false;

  // ── Payroll Defaults ──
  defaultsForm!: FormGroup;
  defaultsId: number | null = null;
  isLoadingDefaults = false;
  isSavingDefaults = false;

  // ── Adjustments ──
  adjustmentForm!: FormGroup;
  isSavingAdjustment = false;
  adjustmentTypes = ['BONUS', 'DEDUCTION', 'ARREAR', 'ADVANCE_RECOVERY', 'REIMBURSEMENT'];

  // ── LOP Summary ──
  lopSummary: any[] = [];
  lopMonth = '';
  isLoadingLOP = false;

  // ── Reconciliation ──
  reconciliation: any = null;
  reconcileMonth = '';
  isLoadingRecon = false;

  // ── Stepped Workflow ──
  currentStep: 'setup' | 'validate' | 'preview' | 'execute' | 'payout' | 'finalize' = 'setup';
  validationResult: any = null;
  previewData: any = null;
  activeRunId: number | null = null;
  isValidating = false;
  isPreviewing = false;
  isInitiatingPayout = false;
  isNotifying = false;

  currentMonthStr: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private payrollApi: PayrollApiService,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.currentMonthStr = this.payrollApi.getCurrentYearMonth();
  }

  ngOnInit() {
    this.initForms();
    this.loadPayrollDefaults();
    this.loadPayrollRuns();
  }

  // ─────────────────────────────────────────────
  // Forms
  // ─────────────────────────────────────────────

  initForms() {
    const now = new Date();
    this.runForm = this.fb.group({
      payroll_month: [this.currentMonthStr, Validators.required],
      notes: [''],
      use_v2: [true]
    });

    this.defaultsForm = this.fb.group({
      pf_percent: [12, [Validators.required, Validators.min(0), Validators.max(100)]],
      esi_percent: [0.75, [Validators.required, Validators.min(0), Validators.max(100)]],
      professional_tax: [200, [Validators.required, Validators.min(0)]],
      variable_pay_percent: [10, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.adjustmentForm = this.fb.group({
      employee_id: [null, [Validators.required, Validators.min(1)]],
      payroll_month: [this.currentMonthStr, Validators.required],
      adjustment_type: ['BONUS', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      reason: ['', Validators.required]
    });

    this.lopMonth = this.currentMonthStr;
    this.reconcileMonth = this.currentMonthStr;
  }

  // ─────────────────────────────────────────────
  // Tab Navigation
  // ─────────────────────────────────────────────

  setTab(tab: 'run' | 'history' | 'defaults' | 'adjustments') {
    this.activeTab = tab;
    if (tab === 'history') this.loadPayrollRuns();
    if (tab === 'defaults') this.loadPayrollDefaults();
  }

  // ─────────────────────────────────────────────
  // Payroll Defaults
  // ─────────────────────────────────────────────

  loadPayrollDefaults() {
    this.isLoadingDefaults = true;
    this.payrollApi.getPayrollDefaults().subscribe({
      next: (res: any) => {
        this.defaultsId = res.id || null;
        this.defaultsForm.patchValue({
          pf_percent: parseFloat(res.pf_percent) || 12,
          esi_percent: parseFloat(res.esi_percent) || 0.75,
          professional_tax: parseFloat(res.professional_tax) || 200,
          variable_pay_percent: parseFloat(res.variable_pay_percent) || 10
        });
        this.isLoadingDefaults = false;
      },
      error: () => { this.isLoadingDefaults = false; }
    });
  }

  saveDefaults() {
    if (this.defaultsForm.invalid) return;
    this.isSavingDefaults = true;
    const payload = this.defaultsForm.value;

    const request = this.defaultsId
      ? this.payrollApi.updatePayrollDefaults(this.defaultsId, payload)
      : this.payrollApi.createPayrollDefaults(payload);

    request.subscribe({
      next: (res: any) => {
        if (res?.id) this.defaultsId = res.id;
        this.toaster.showSuccess('Payroll defaults saved successfully');
        this.isSavingDefaults = false;
      },
      error: () => {
        this.toaster.showError('Failed to save payroll defaults');
        this.isSavingDefaults = false;
      }
    });
  }

  // ─────────────────────────────────────────────
  // Run Payroll
  // ─────────────────────────────────────────────

  async onRunPayroll() {
    if (this.runForm.invalid) return;
    const { payroll_month, notes, use_v2 } = this.runForm.value;

    const alert = await this.alertCtrl.create({
      header: 'Confirm Payroll Run',
      message: `Are you sure you want to run payroll for <strong>${payroll_month}</strong>? This will process all employee salaries.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Run Payroll', handler: () => this.executePayrollRun(payroll_month, notes, use_v2) }
      ]
    });
    await alert.present();
  }

  async executePayrollRun(payrollMonth: string, notes: string, useV2: boolean) {
    const loading = await this.loadingCtrl.create({ message: 'Running payroll...' });
    await loading.present();
    this.isRunning = true;
    this.lastRunResult = null;

    const [year, month] = payrollMonth.split('-').map(Number);

    if (useV2) {
      this.currentStep = 'validate';
      this.validaPayrollStep(payrollMonth);
    } else {
      this.payrollApi.generatePayroll({ month, year }).subscribe({
        next: (res) => {
          this.lastRunResult = { ...res, type: 'legacy' };
          loading.dismiss();
          this.isRunning = false;
          this.toaster.showSuccess(`Payroll generated. Run ID: ${res.run_id}, ${res.processed} employees processed.`);
          this.loadPayrollRuns();
        },
        error: () => {
          loading.dismiss();
          this.isRunning = false;
          this.toaster.showError('Failed to run payroll');
        }
      });
    }
  }

  // ─────────────────────────────────────────────
  // V2 Stepped Workflow Implementation
  // ─────────────────────────────────────────────

  async validaPayrollStep(month: string) {
    this.isValidating = true;
    this.payrollApi.validatePayroll(month).subscribe({
      next: (res: any) => {
        this.validationResult = res;
        this.isValidating = false;
        if (res.runId) this.activeRunId = res.runId;
        if (res.valid) {
          this.currentStep = 'preview';
          this.previewPayrollStep(month);
        } else {
          this.toaster.showError('Validation failed. Please fix errors before proceeding.');
        }
      },
      error: () => {
        this.isValidating = false;
        this.currentStep = 'setup';
        this.toaster.showError('Validation API failed');
      }
    });
  }

  async previewPayrollStep(month: string) {
    this.isPreviewing = true;
    const [year, m] = month.split('-').map(Number);
    this.payrollApi.previewPayroll({ year, month: m }).subscribe({
      next: (res: any) => {
        this.previewData = res;
        if (res.validation?.runId) this.activeRunId = res.validation.runId;
        this.isPreviewing = false;
      },
      error: () => {
        this.isPreviewing = false;
        this.toaster.showError('Preview failed');
      }
    });
  }

  async executeV2Run() {
    const { payroll_month } = this.runForm.value;
    const [year, month] = payroll_month.split('-').map(Number);
    
    this.isRunning = true;
    this.payrollApi.runV2Payroll({ year, month }).subscribe({
      next: (res) => {
        this.activeRunId = res.data?.runId ?? null;
        this.lastRunResult = res;
        this.isRunning = false;
        this.currentStep = 'payout';
        this.toaster.showSuccess('Payroll executed successfully. Ready for Payout.');
      },
      error: () => {
        this.isRunning = false;
        this.toaster.showError('Execution failed');
      }
    });
  }

  async initiatePayout() {
    if (!this.activeRunId) return;
    this.isInitiatingPayout = true;
    this.payrollApi.initiatePayouts({
      run_id: this.activeRunId,
      payout_date: new Date().toISOString().split('T')[0],
      payment_mode: 'BANK_TRANSFER'
    }).subscribe({
      next: () => {
        this.isInitiatingPayout = false;
        this.currentStep = 'finalize';
        this.toaster.showSuccess('Payout initiated successfully');
      },
      error: () => {
        this.isInitiatingPayout = false;
        this.toaster.showError('Payout initiation failed');
      }
    });
  }

  async finalizeRun() {
    if (!this.activeRunId) return;
    this.isNotifying = true;
    this.payrollApi.notifyEmployees(this.activeRunId).subscribe({
      next: () => {
        this.isNotifying = false;
        this.resetWorkflow();
        this.toaster.showSuccess('Employees notified and payslips released.');
        this.loadPayrollRuns();
      },
      error: () => {
        this.isNotifying = false;
        this.toaster.showError('Finalization failed');
      }
    });
  }

  resetWorkflow() {
    this.currentStep = 'setup';
    this.validationResult = null;
    this.previewData = null;
    this.activeRunId = null;
    this.lastRunResult = null;
  }

  private tryAdvancedRun(payrollMonth: string, notes: string, loading: any) {
    this.payrollApi.calculateAndRunPayroll({ payroll_month: payrollMonth, notes }).subscribe({
      next: (res) => {
        this.lastRunResult = { ...res, type: 'advanced' };
        loading.dismiss();
        this.isRunning = false;
        this.toaster.showSuccess(`Payroll calculated. ${res.processed_employees} employees processed.`);
        this.loadPayrollRuns();
      },
      error: () => {
        loading.dismiss();
        this.isRunning = false;
        this.toaster.showError('Failed to run payroll');
      }
    });
  }

  // ─────────────────────────────────────────────
  // Payroll Runs History
  // ─────────────────────────────────────────────

  loadPayrollRuns() {
    this.isLoadingRuns = true;
    this.payrollApi.getPayrollRuns().subscribe({
      next: (runs) => {
        this.payrollRuns = Array.isArray(runs) ? runs : [];
        this.isLoadingRuns = false;
      },
      error: () => { this.isLoadingRuns = false; }
    });
  }

  async lockRun(runId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Lock Payroll Run',
      message: 'Locking this run prevents any further changes. Continue?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Lock', handler: () => {
            this.payrollApi.lockPayrollRun(runId).subscribe({
              next: () => { this.toaster.showSuccess('Payroll run locked'); this.loadPayrollRuns(); },
              error: () => this.toaster.showError('Failed to lock run')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  viewRunDetails(runId: number) {
    this.payrollApi.getPayrollRunDetails(runId).subscribe({
      next: async (res) => {
        const alert = await this.alertCtrl.create({
          header: `Run #${runId} Details`,
          message: `<pre style="text-align:left;font-size:12px">${JSON.stringify(res, null, 2)}</pre>`,
          buttons: ['Close']
        });
        await alert.present();
      },
      error: () => this.toaster.showError('Could not load run details')
    });
  }

  // ─────────────────────────────────────────────
  // LOP Summary
  // ─────────────────────────────────────────────

  loadLOPSummary() {
    if (!this.lopMonth) return;
    this.isLoadingLOP = true;
    this.payrollApi.getLOPSummary(this.lopMonth).subscribe({
      next: (res: any) => {
        this.lopSummary = res.lop_records || [];
        this.isLoadingLOP = false;
      },
      error: () => { this.isLoadingLOP = false; this.toaster.showError('Could not load LOP summary'); }
    });
  }

  // ─────────────────────────────────────────────
  // Reconciliation
  // ─────────────────────────────────────────────

  loadReconciliation() {
    if (!this.reconcileMonth) return;
    this.isLoadingRecon = true;
    this.payrollApi.getReconciliationReport(this.reconcileMonth).subscribe({
      next: (res: any) => {
        this.reconciliation = res;
        this.isLoadingRecon = false;
      },
      error: () => { this.isLoadingRecon = false; this.toaster.showError('Could not load reconciliation data'); }
    });
  }

  // ─────────────────────────────────────────────
  // Adjustments
  // ─────────────────────────────────────────────

  saveAdjustment() {
    if (this.adjustmentForm.invalid) return;
    this.isSavingAdjustment = true;
    const payload = { ...this.adjustmentForm.value, employee_id: Number(this.adjustmentForm.value.employee_id) };
    this.payrollApi.createPayrollAdjustment(payload).subscribe({
      next: (res) => {
        this.toaster.showSuccess(`Adjustment created (ID: ${res.adjustment_id})`);
        this.adjustmentForm.patchValue({ amount: 0, reason: '', employee_id: null });
        this.isSavingAdjustment = false;
      },
      error: () => { this.toaster.showError('Failed to save adjustment'); this.isSavingAdjustment = false; }
    });
  }

  // ─────────────────────────────────────────────
  // Utilities
  // ─────────────────────────────────────────────

  formatCurrency(val: number): string {
    return '₹' + (val || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getStatusColor(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'completed') return 'success';
    if (s === 'processing') return 'warning';
    if (s === 'failed') return 'danger';
    return 'medium';
  }

  goBack() { this.router.navigate(['/finance/admin']); }
}
