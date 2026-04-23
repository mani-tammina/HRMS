import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PayrollApiService, PayrollValidationResult, PayrollPreviewResponse } from '../../../core/services/payroll-api.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-payroll-process',
  templateUrl: './payroll-process.page.html',
  styleUrls: ['./payroll-process.page.scss'],
  standalone: false
})
export class PayrollProcessPage implements OnInit {
  // Stepper State
  currentStep: 'selection' | 'validate' | 'preview' | 'run' | 'status' = 'selection';
  
  // Selection Form
  processForm: FormGroup;
  selectedMonth: string;
  
  // API Data
  validationResult: PayrollValidationResult | null = null;
  previewData: PayrollPreviewResponse | null = null;
  runStatus: any = null;
  
  // Loading States
  isValidating = false;
  isPreviewing = false;
  isRunning = false;
  isCheckingStatus = false;

  constructor(
    private fb: FormBuilder,
    private payrollApi: PayrollApiService,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public router: Router
  ) {
    this.selectedMonth = this.payrollApi.getCurrentYearMonth();
    this.processForm = this.fb.group({
      month: [this.selectedMonth, Validators.required]
    });
  }

  ngOnInit() {}

  // ────────────────────────────────────────────────────────────────────────
  // Step Navigation
  // ────────────────────────────────────────────────────────────────────────

  goBack() {
    if (this.currentStep === 'selection') {
      this.router.navigate(['/finance/admin']);
    } else if (this.currentStep === 'validate') {
      this.currentStep = 'selection';
    } else if (this.currentStep === 'preview') {
      this.currentStep = 'validate';
    } else if (this.currentStep === 'status') {
      this.currentStep = 'selection';
      this.resetStates();
    }
  }

  resetStates() {
    this.validationResult = null;
    this.previewData = null;
    this.runStatus = null;
  }

  // ────────────────────────────────────────────────────────────────────────
  // Step 1: Validation
  // ────────────────────────────────────────────────────────────────────────

  async startValidation() {
    if (this.processForm.invalid) return;
    this.selectedMonth = this.processForm.value.month;
    
    this.currentStep = 'validate';
    this.isValidating = true;
    this.validationResult = null;

    this.payrollApi.validatePayroll(this.selectedMonth).subscribe({
      next: (res) => {
        this.validationResult = res;
        this.isValidating = false;
        if (res.can_proceed) {
          this.toaster.showSuccess('Validation successful. Proceeding to preview.');
          setTimeout(() => this.startPreview(), 800);
        } else {
          this.toaster.showError('Validation failed. Please resolve critical errors.');
        }
      },
      error: (err) => {
        this.isValidating = false;
        this.toaster.showError('Validation API encountered an error.');
        console.error(err);
      }
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Step 2: Preview
  // ────────────────────────────────────────────────────────────────────────

  async startPreview() {
    this.currentStep = 'preview';
    this.isPreviewing = true;
    this.previewData = null;
    
    const [year, month] = this.selectedMonth.split('-').map(Number);

    this.payrollApi.previewPayroll({ year, month }).subscribe({
      next: (res) => {
        this.previewData = res;
        this.isPreviewing = false;
      },
      error: (err) => {
        this.isPreviewing = false;
        this.toaster.showError('Could not generate payroll preview.');
        console.error(err);
      }
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Step 3: Run Payroll
  // ────────────────────────────────────────────────────────────────────────

  async confirmRun() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Generation',
      message: `You are about to generate payroll for ${this.selectedMonth}. This will create payslip records for all eligible employees.`,
      cssClass: 'glass-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { 
          text: 'Proceed', 
          handler: () => this.executeRun()
        }
      ]
    });
    await alert.present();
  }

  async executeRun() {
    this.currentStep = 'run';
    this.isRunning = true;
    
    const [year, month] = this.selectedMonth.split('-').map(Number);

    this.payrollApi.runV2Payroll({ year, month }).subscribe({
      next: (res) => {
        this.isRunning = false;
        this.toaster.showSuccess('Payroll run initiated successfully.');
        this.currentStep = 'status';
        this.checkRunStatus();
      },
      error: (err) => {
        this.isRunning = false;
        this.toaster.showError('Payroll generation failed.');
        console.error(err);
      }
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Step 4: Status Check
  // ────────────────────────────────────────────────────────────────────────

  async checkRunStatus() {
    this.isCheckingStatus = true;
    this.payrollApi.getV2RunSummary(this.selectedMonth).subscribe({
      next: (res) => {
        // We take the most recent run for this month
        if (res && res.length > 0) {
          this.runStatus = res[0];
        }
        this.isCheckingStatus = false;
      },
      error: (err) => {
        this.isCheckingStatus = false;
        console.error(err);
      }
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────────────

  formatCurrency(val: any) {
    const num = Number(val) || 0;
    return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getStatusColor(status: string): string {
    const s = (status || '').toLowerCase();
    if (s.includes('complete') || s.includes('success')) return '#10b981';
    if (s.includes('process') || s.includes('run')) return '#f59e0b';
    if (s.includes('fail') || s.includes('error')) return '#ef4444';
    return '#6366f1';
  }

  navigateToExecution() {
    this.router.navigate(['/finance/execution']);
  }
}
