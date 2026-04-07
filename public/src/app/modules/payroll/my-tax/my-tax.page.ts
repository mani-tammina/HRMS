import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PayrollApiService, TaxSummaryResponse, TaxComputation } from '../../../core/services/payroll-api.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ToasterService } from '../../../core/services/toaster.service';

/** Section codes and their display names */
const SECTION_META: { code: string; label: string; maxHint: number }[] = [
  { code: '80C',   label: '80C — Life Insurance / PPF / ELSS',     maxHint: 150000 },
  { code: '80D',   label: '80D — Health Insurance',                 maxHint: 25000  },
  { code: 'HRA',   label: 'HRA — House Rent Allowance',             maxHint: 200000 },
  { code: '80G',   label: '80G — Charitable Donations',             maxHint: 50000  },
  { code: '80TTA', label: '80TTA — Savings Account Interest',       maxHint: 10000  },
  { code: 'NPS',   label: 'NPS — National Pension Scheme',          maxHint: 50000  },
];

@Component({
  selector: 'app-my-tax',
  templateUrl: './my-tax.page.html',
  styleUrls: ['./my-tax.page.scss'],
  standalone: false
})
export class MyTaxPage implements OnInit {
  activeTab: 'summary' | 'computation' | 'declarations' | 'proof' | 'history' = 'summary';

  /** Reference to Math for use in template */
  Math = Math;

  employeeId: number | null = null;
  financialYear: string;
  availableYears: string[] = [];

  // ── Tax Summary ──
  taxSummary: TaxSummaryResponse | null = null;
  isLoadingSummary = false;

  // ── Tax Computation ──
  taxComputation: TaxComputation | null = null;
  isLoadingComputation = false;

  // ── Regime Selection ──
  selectedRegime: 'OLD' | 'NEW' = 'NEW';
  isSavingRegime = false;

  // ── Declarations ──
  sectionMeta = SECTION_META;
  declarations: { [code: string]: number } = {};
  existingDeclaredAt: string = '';
  existingRegime: string = '';
  isLoadingDeclarations = false;
  isSavingDeclarations = false;

  // ── Proof Upload ──
  proofForm!: FormGroup;
  selectedFile: File | null = null;
  isUploadingProof = false;
  uploadResult: any = null;

  // ── Payroll History ──
  payrollHistory: any[] = [];
  isLoadingHistory = false;

  // ── Payslips ──
  payslips: any[] = [];
  isLoadingPayslips = false;
  selectedPayslipMonth: string;
  isDownloadingPDF = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private payrollApi: PayrollApiService,
    private employeeService: EmployeeService,
    private toaster: ToasterService,
    private loadingCtrl: LoadingController
  ) {
    this.financialYear = this.payrollApi.getCurrentFinancialYear();
    this.selectedPayslipMonth = this.payrollApi.getCurrentYearMonth();
    const fy = new Date().getFullYear();
    this.availableYears = [`${fy-2}-${fy-1}`, `${fy-1}-${fy}`, `${fy}-${fy+1}`];
  }

  ngOnInit() {
    this.initForms();
    this.loadEmployeeAndData();
  }

  // ─────────────────────────────────────────────
  // Init
  // ─────────────────────────────────────────────

  initForms() {
    SECTION_META.forEach(s => (this.declarations[s.code] = 0));

    this.proofForm = this.fb.group({
      section_code: ['80C', Validators.required],
      declared_amount: [0, [Validators.required, Validators.min(1)]],
      financial_year: [this.financialYear]
    });
  }

  loadEmployeeAndData() {
    this.employeeService.getMyProfile().subscribe({
      next: (emp: any) => {
        this.employeeId = emp?.id || null;
        if (this.employeeId) {
          this.loadTaxSummary();
          this.loadDeclarations();
          this.loadPayslips();
        }
      },
      error: () => {}
    });
  }

  // ─────────────────────────────────────────────
  // Tab Navigation
  // ─────────────────────────────────────────────

  setTab(tab: any) {
    this.activeTab = tab;
    if (tab === 'summary' && !this.taxSummary) this.loadTaxSummary();
    if (tab === 'computation') this.loadTaxComputation();
    if (tab === 'declarations' && Object.values(this.declarations).every(v => v === 0)) this.loadDeclarations();
    if (tab === 'history') this.loadPayrollHistory();
  }

  // ─────────────────────────────────────────────
  // Tax Summary
  // ─────────────────────────────────────────────

  loadTaxSummary() {
    if (!this.employeeId) return;
    this.isLoadingSummary = true;
    this.payrollApi.getMyTaxSummary(this.financialYear).subscribe({
      next: (res) => {
        this.taxSummary = res;
        this.selectedRegime = (res.tax_regime as 'OLD' | 'NEW') || 'NEW';
        this.isLoadingSummary = false;
      },
      error: () => { this.isLoadingSummary = false; }
    });
  }

  // ─────────────────────────────────────────────
  // Tax Computation
  // ─────────────────────────────────────────────

  loadTaxComputation() {
    this.isLoadingComputation = true;
    this.payrollApi.getTaxComputation(this.financialYear).subscribe({
      next: (res) => {
        this.taxComputation = res;
        this.isLoadingComputation = false;
      },
      error: () => { this.isLoadingComputation = false; }
    });
  }

  // ─────────────────────────────────────────────
  // Regime Selection
  // ─────────────────────────────────────────────

  saveRegimeSelection() {
    this.isSavingRegime = true;
    this.payrollApi.selectTaxRegime(this.selectedRegime, this.financialYear).subscribe({
      next: (res) => {
        this.toaster.showSuccess(`Tax regime set to ${res.tax_regime} for FY ${res.financial_year}`);
        this.isSavingRegime = false;
        this.loadTaxSummary();
      },
      error: () => { this.toaster.showError('Failed to update tax regime'); this.isSavingRegime = false; }
    });
  }

  // ─────────────────────────────────────────────
  // Declarations
  // ─────────────────────────────────────────────

  loadDeclarations() {
    this.isLoadingDeclarations = true;
    this.payrollApi.getDeclaredInvestments(this.financialYear).subscribe({
      next: (res: any) => {
        if (res.declarations) {
          Object.keys(res.declarations).forEach(k => {
            if (this.declarations.hasOwnProperty(k)) {
              this.declarations[k] = res.declarations[k];
            }
          });
        }
        this.existingRegime = res.tax_regime || '';
        this.existingDeclaredAt = res.updated_at || '';
        this.isLoadingDeclarations = false;
      },
      error: () => { this.isLoadingDeclarations = false; }
    });
  }

  saveDeclared() {
    this.isSavingDeclarations = true;
    const payload = {
      financial_year: this.financialYear,
      tax_regime: this.selectedRegime,
      declarations: { ...this.declarations }
    };
    this.payrollApi.submitInvestmentDeclarations(payload).subscribe({
      next: () => {
        this.toaster.showSuccess('Declarations submitted successfully');
        this.isSavingDeclarations = false;
      },
      error: () => { this.toaster.showError('Failed to submit declarations'); this.isSavingDeclarations = false; }
    });
  }

  getTotalDeclared(): number {
    return Object.values(this.declarations).reduce((s, v) => s + (v || 0), 0);
  }

  // ─────────────────────────────────────────────
  // Proof Upload
  // ─────────────────────────────────────────────

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) this.selectedFile = file;
  }

  async uploadProof() {
    if (!this.selectedFile || this.proofForm.invalid) return;
    this.isUploadingProof = true;
    const loading = await this.loadingCtrl.create({ message: 'Uploading proof...' });
    await loading.present();

    const fd = new FormData();
    fd.append('document', this.selectedFile);
    fd.append('section_code', this.proofForm.value.section_code);
    fd.append('declared_amount', String(this.proofForm.value.declared_amount));
    fd.append('financial_year', this.proofForm.value.financial_year || this.financialYear);

    this.payrollApi.uploadInvestmentProof(fd).subscribe({
      next: (res: any) => {
        this.uploadResult = res;
        this.selectedFile = null;
        loading.dismiss();
        this.isUploadingProof = false;
        this.toaster.showSuccess(`Proof submitted (ID: ${res.proof_id}) — Status: ${res.status}`);
      },
      error: () => {
        loading.dismiss();
        this.isUploadingProof = false;
        this.toaster.showError('Failed to upload proof document');
      }
    });
  }

  // ─────────────────────────────────────────────
  // Payroll History
  // ─────────────────────────────────────────────

  loadPayrollHistory() {
    this.isLoadingHistory = true;
    this.payrollApi.getPayrollHistory().subscribe({
      next: (res: any) => {
        this.payrollHistory = res.history || [];
        this.isLoadingHistory = false;
      },
      error: () => { this.isLoadingHistory = false; }
    });
  }

  // ─────────────────────────────────────────────
  // Payslips
  // ─────────────────────────────────────────────

  loadPayslips() {
    if (!this.employeeId) return;
    this.isLoadingPayslips = true;
    this.payrollApi.getEmployeePayslips(this.employeeId).subscribe({
      next: (res: any) => {
        this.payslips = Array.isArray(res) ? res : (res.payslips || []);
        this.isLoadingPayslips = false;
      },
      error: () => { this.isLoadingPayslips = false; }
    });
  }

  async downloadPayslipPDF() {
    if (!this.employeeId || !this.selectedPayslipMonth) return;
    this.isDownloadingPDF = true;
    const loading = await this.loadingCtrl.create({ message: 'Generating PDF...' });
    await loading.present();

    this.payrollApi.downloadPayslipPDF(this.employeeId, this.selectedPayslipMonth).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payslip_${this.selectedPayslipMonth}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        loading.dismiss();
        this.isDownloadingPDF = false;
        this.toaster.showSuccess('Payslip downloaded!');
      },
      error: () => {
        loading.dismiss();
        this.isDownloadingPDF = false;
        this.toaster.showError('Could not download payslip PDF');
      }
    });
  }

  // ─────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────

  formatCurrency(val: number): string {
    return '₹' + (val || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getStatusColor(status: string): string {
    const s = (status || '').toUpperCase();
    if (s === 'PAID' || s === 'COMPLETED') return 'success';
    if (s === 'PENDING') return 'warning';
    if (s === 'FAILED') return 'danger';
    return 'medium';
  }

  getMonthName(m: number): string {
    return new Date(2025, m - 1, 1).toLocaleString('default', { month: 'long' });
  }

  getProofStatusColor(status: string): string {
    const s = (status || '').toUpperCase();
    if (s === 'AI_VERIFIED' || s === 'APPROVED') return 'success';
    if (s === 'FLAGGED') return 'warning';
    if (s === 'REJECTED') return 'danger';
    return 'medium';
  }

  goBack() { this.router.navigate(['/MyPay']); }
}
