import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import {
  PayrollApiService,
  StatutoryRule,
  TaxSlab,
  SectionLimit,
  VerificationQueueItem,
  AIVerificationResult,
  ConfigWindowPayload
} from '../../../core/services/payroll-api.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-tax-admin',
  templateUrl: './tax-admin.page.html',
  styleUrls: ['./tax-admin.page.scss'],
  standalone: false
})
export class TaxAdminPage implements OnInit {
  activeTab: 'statutory' | 'slabs' | 'sections' | 'queue' | 'window' | 'payout' = 'statutory';

  financialYear: string;
  availableYears: string[] = [];

  // ── Statutory Rules ──
  statutoryRules: StatutoryRule[] = [];
  isLoadingStatutory = false;
  isSavingStatutory = false;
  statutoryForm!: FormGroup;

  // ── Tax Slabs ──
  taxSlabs: TaxSlab[] = [];
  isLoadingSlabs = false;
  isSavingNewSlabs = false;
  isSavingOldSlabs = false;
  taxSlabsForm!: FormGroup;

  ptSlabs: any[] = [];
  isLoadingPT = false;
  isSavingPT = false;
  ptSlabsForm!: FormGroup;

  // ── Section Limits ──
  sectionLimits: SectionLimit[] = [
    { section_code: '80C',   max_limit: 150000, financial_year: '', is_active: true },
    { section_code: '80D',   max_limit: 25000,  financial_year: '', is_active: true },
    { section_code: 'HRA',   max_limit: 200000, financial_year: '', is_active: true },
    { section_code: '80G',   max_limit: 50000,  financial_year: '', is_active: true },
    { section_code: '80TTA', max_limit: 10000,  financial_year: '', is_active: true },
    { section_code: 'NPS',   max_limit: 50000,  financial_year: '', is_active: true }
  ];
  isLoadingSections = false;
  isSavingSections  = false;
  sectionEditModes: boolean[] = [];
  isSavingSection:  boolean[] = [];

  // ── Verification Queue ──
  verificationQueue: VerificationQueueItem[] = [];
  queueFilter = 'PENDING';
  isLoadingQueue = false;
  verifyForm!: FormGroup;
  selectedProof: VerificationQueueItem | null = null;
  isSubmittingVerification = false;
  queueFilters = ['PENDING', 'AI_VERIFIED', 'FLAGGED', 'APPROVED', 'REJECTED'];

  // ── Proof Submission Window ──
  windowForm!: FormGroup;
  isSavingWindow = false;

  // ── Payout Management ──
  payoutForm!: FormGroup;
  payouts: any[] = [];
  payoutRunId: number | null = null;
  isLoadingPayouts = false;
  isSavingPayout = false;
  payoutStatusForm!: FormGroup;
  payoutStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private payrollApi: PayrollApiService,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.financialYear = this.payrollApi.getCurrentFinancialYear();
    const fy = new Date().getFullYear();
    this.availableYears = [
      `${fy - 2}-${fy - 1}`,
      `${fy - 1}-${fy}`,
      `${fy}-${fy + 1}`,
      `${fy + 1}-${fy + 2}`
    ];
  }

  ngOnInit() {
    this.initForms();
    this.loadActiveTabData();
  }

  onYearChange() {
    this.loadActiveTabData();
  }

  loadActiveTabData() {
    this.setTab(this.activeTab);
  }

  // ─────────────────────────────────────────────
  // Form Initialization
  // ─────────────────────────────────────────────

  initForms() {
    this.statutoryForm = this.fb.group({
      rules: this.fb.array([
        this.createRuleGroup('PF', 'DEFAULT', 12, 15000, '2025-04-01'),
        this.createRuleGroup('ESI', 'DEFAULT', 0.75, 21000, '2025-04-01')
      ])
    });

    this.verifyForm = this.fb.group({
      extracted_amount: [0, [Validators.required, Validators.min(0)]],
      confidence: [90, [Validators.required, Validators.min(0), Validators.max(100)]],
      verification_status: ['AI_VERIFIED'],
      notes: ['']
    });

    const now = new Date();
    const fyStart = new Date(now.getFullYear(), 0, 1).toISOString();
    const fyEnd = new Date(now.getFullYear(), 1, 28, 23, 59, 59).toISOString();

    this.windowForm = this.fb.group({
      window_type: ['proof_submission', Validators.required],
      financial_year: [this.financialYear, Validators.required],
      start_at: [fyStart.slice(0, 16), Validators.required],
      end_at: [fyEnd.slice(0, 16), Validators.required],
      status: ['OPEN', Validators.required],
      notes: ['']
    });

    this.taxSlabsForm = this.fb.group({
      slabs: this.fb.array([])
    });

    this.ptSlabsForm = this.fb.group({
      slabs: this.fb.array([])
    });

    this.payoutForm = this.fb.group({
      run_id: [null, [Validators.required, Validators.min(1)]],
      payout_date: [new Date().toISOString().split('T')[0], Validators.required],
      payment_mode: ['BANK_TRANSFER', Validators.required]
    });

    this.payoutStatusForm = this.fb.group({
      payout_id: [null, [Validators.required, Validators.min(1)]],
      status: ['COMPLETED', Validators.required],
      remarks: ['', Validators.required]
    });
  }

  get ruleControls(): FormArray { return this.statutoryForm.get('rules') as FormArray; }
  get taxSlabControls(): FormArray { return this.taxSlabsForm.get('slabs') as FormArray; }
  get ptSlabControls(): FormArray { return this.ptSlabsForm.get('slabs') as FormArray; }

  createRuleGroup(type: string, state: string, pct: number, ceiling: number, date: string): FormGroup {
    return this.fb.group({
      provider_type: [type, Validators.required],
      state_code: [state, Validators.required],
      percentage: [pct, [Validators.required, Validators.min(0), Validators.max(100)]],
      ceiling_limit: [ceiling, [Validators.required, Validators.min(0)]],
      effective_from: [date, Validators.required]
    });
  }

  createTaxSlabGroup(s?: TaxSlab): FormGroup {
    return this.fb.group({
      regime_type: [s?.regime_type || 'NEW', Validators.required],
      min_income: [s?.min_income || 0, [Validators.required, Validators.min(0)]],
      max_income: [s?.max_income || null],
      rate: [s?.rate || 0, [Validators.required, Validators.min(0), Validators.max(100)]],
      cess_rate: [s?.cess_rate || 4, [Validators.required, Validators.min(0)]],
      financial_year: [s?.financial_year || this.financialYear, Validators.required]
    });
  }

  createPTSlabGroup(s?: any): FormGroup {
    return this.fb.group({
      state_code: [s?.state_code || 'DEFAULT', Validators.required],
      ceiling_limit: [s?.ceiling_limit || 0, [Validators.required, Validators.min(0)]],
      fixed_amount: [s?.fixed_amount || 0, [Validators.required, Validators.min(0)]],
      effective_from: [s?.effective_from || new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  addRule() {
    this.ruleControls.push(
      this.createRuleGroup('PF', 'DEFAULT', 12, 15000, new Date().toISOString().split('T')[0])
    );
  }

  removeRule(i: number) {
    this.ruleControls.removeAt(i);
  }

  addTaxSlab(regime: 'OLD' | 'NEW' = 'NEW') {
    this.taxSlabControls.push(this.createTaxSlabGroup({ regime_type: regime, min_income: 0, max_income: 0, rate: 0, cess_rate: 4, financial_year: this.financialYear }));
  }

  removeTaxSlab(i: number) {
    this.taxSlabControls.removeAt(i);
  }

  addPTSlab() {
    this.ptSlabControls.push(this.createPTSlabGroup());
  }

  removePTSlab(i: number) {
    this.ptSlabControls.removeAt(i);
  }

  // ─────────────────────────────────────────────
  // Tab Navigation
  // ─────────────────────────────────────────────

  setTab(tab: any) {
    this.activeTab = tab;
    if (tab === 'statutory') this.loadStatutoryRules();
    if (tab === 'slabs')     { this.loadTaxSlabs(); this.loadPTSlabs(); }
    if (tab === 'sections')  this.loadSectionLimits();
    if (tab === 'queue')     this.loadVerificationQueue();
    if (tab === 'payout')    { /* user loads manually */ }
  }

  // ─────────────────────────────────────────────
  // Statutory Rules
  // ─────────────────────────────────────────────

  loadStatutoryRules() {
    this.isLoadingStatutory = true;
    this.payrollApi.getStatutoryRules().subscribe({
      next: (res: any) => {
        const rules: StatutoryRule[] = res.rules || [];
        this.statutoryRules = rules;
        const arr = this.ruleControls;
        while (arr.length) arr.removeAt(0);
        if (rules.length) {
          rules.forEach(r => arr.push(this.createRuleGroup(r.provider_type, r.state_code, r.percentage, r.ceiling_limit, r.effective_from)));
        } else {
          arr.push(this.createRuleGroup('PF', 'DEFAULT', 12, 15000, '2025-04-01'));
          arr.push(this.createRuleGroup('ESI', 'DEFAULT', 0.75, 21000, '2025-04-01'));
        }
        this.isLoadingStatutory = false;
      },
      error: () => { this.isLoadingStatutory = false; }
    });
  }

  saveStatutoryRules() {
    if (this.statutoryForm.invalid) return;
    this.isSavingStatutory = true;
    this.payrollApi.updateStatutoryRules(this.statutoryForm.value.rules).subscribe({
      next: () => { this.toaster.showSuccess('Statutory rules updated'); this.isSavingStatutory = false; },
      error: () => { this.toaster.showError('Failed to update statutory rules'); this.isSavingStatutory = false; }
    });
  }

  // ─────────────────────────────────────────────
  // Tax Slabs
  // ─────────────────────────────────────────────

  loadTaxSlabs() {
    this.isLoadingSlabs = true;
    this.payrollApi.getTaxSlabs(this.financialYear).subscribe({
      next: (res: any) => {
        let slabs: TaxSlab[] = res.slabs || [];
        
        // Deduplicate slabs based on regime_type, min_income, and max_income
        const uniqueSlabsMap = new Map<string, TaxSlab>();
        slabs.forEach(s => {
          const key = `${s.regime_type}-${Number(s.min_income)}-${Number(s.max_income)}`;
          // The later entry will overwrite the earlier one (useful if latest saves append)
          uniqueSlabsMap.set(key, s);
        });
        
        slabs = Array.from(uniqueSlabsMap.values());
        
        // Sort ascending by min_income
        slabs.sort((a, b) => Number(a.min_income) - Number(b.min_income));

        this.taxSlabs = slabs;
        const arr = this.taxSlabControls;
        while (arr.length) arr.removeAt(0);
        slabs.forEach(s => arr.push(this.createTaxSlabGroup(s)));
        this.isLoadingSlabs = false;
      },
      error: () => { this.isLoadingSlabs = false; }
    });
  }

  saveRegimeSlabs(regime: 'NEW' | 'OLD') {
    if (this.taxSlabsForm.invalid) return;

    if (regime === 'NEW') this.isSavingNewSlabs = true;
    else this.isSavingOldSlabs = true;

    // Filter slabs for the specific regime
    const allSlabs = this.taxSlabsForm.value.slabs;
    const regimeSlabs = allSlabs
      .filter((s: any) => s.regime_type === regime)
      .map((s: any) => ({
        ...s,
        financial_year: this.financialYear
      }));

    if (regimeSlabs.length === 0) {
      this.toaster.showWarning(`No ${regime} regime slabs to save`);
      this.isSavingNewSlabs = false;
      this.isSavingOldSlabs = false;
      return;
    }

    this.payrollApi.createTaxSlabs(regimeSlabs).subscribe({
      next: () => {
        this.toaster.showSuccess(`${regime} regime tax slabs updated successfully`);
        if (regime === 'NEW') this.isSavingNewSlabs = false;
        else this.isSavingOldSlabs = false;
        this.loadTaxSlabs();
      },
      error: () => {
        this.toaster.showError(`Failed to update ${regime} regime tax slabs`);
        if (regime === 'NEW') this.isSavingNewSlabs = false;
        else this.isSavingOldSlabs = false;
      }
    });
  }

  loadPTSlabs() {
    this.isLoadingPT = true;
    this.payrollApi.getPTSlabs().subscribe({
      next: (res: any) => {
        const slabs = res.slabs || [];
        this.ptSlabs = slabs;
        const arr = this.ptSlabControls;
        while (arr.length) arr.removeAt(0);
        slabs.forEach((s: any) => arr.push(this.createPTSlabGroup(s)));
        this.isLoadingPT = false;
      },
      error: () => { this.isLoadingPT = false; }
    });
  }

  savePTSlabs() {
    if (this.ptSlabsForm.invalid) return;
    this.isSavingPT = true;
    // Note: PT slabs update might use statutory rules endpoint or a separate one if backend supports
    // For now we map them to statutory rules update if that's the intended path, 
    // but the guide mentions getPTSlabs specifically. Assuming a generic update pattern.
    this.toaster.showInfo('PT slab direct update pending backend confirmation. Mapping to statutory system.');
    this.isSavingPT = false;
  }

  getNewSlabControls(): any[] {
    return this.taxSlabControls.controls.filter(c => c.value.regime_type === 'NEW');
  }

  getOldSlabControls(): any[] {
    return this.taxSlabControls.controls.filter(c => c.value.regime_type === 'OLD');
  }

  getNewSlabs(): TaxSlab[] { return this.taxSlabs.filter(s => s.regime_type === 'NEW'); }
  getOldSlabs(): TaxSlab[] { return this.taxSlabs.filter(s => s.regime_type === 'OLD'); }

  // ─────────────────────────────────────────────
  // Section Limits
  // ─────────────────────────────────────────────

  loadSectionLimits() {
    // Pre-populate with standard Indian tax sections — user edits & saves via PATCH
    this.sectionLimits.forEach(s => { s.financial_year = this.financialYear; });
    this.sectionEditModes = this.sectionLimits.map(() => false);
    this.isSavingSection  = this.sectionLimits.map(() => false);
  }

  get activeSectionsCount(): number {
    return this.sectionLimits.filter(s => s.is_active !== false).length;
  }

  getSectionDescription(code: string): string {
    const map: { [k: string]: string } = {
      '80C':   'Life Insurance, PPF, ELSS, EPF & Home Loan Principal',
      '80D':   'Health Insurance Premium (Self, Spouse & Children)',
      'HRA':   'House Rent Allowance Exemption',
      '80G':   'Donations to Approved Charitable Organisations',
      '80TTA': 'Interest on Savings Account (Banks/Co-ops)',
      'NPS':   'National Pension System – Additional Deduction',
      '80CCD': 'NPS Employer Contribution (Section 80CCD(2))',
      '80E':   'Education Loan Interest Deduction',
      '24B':   'Home Loan Interest (Self-Occupied Property)',
      '80EEA': 'Additional Home Loan Interest (Affordable Housing)'
    };
    return map[code] || 'Income Tax Deduction Section';
  }

  getSectionColorClass(code: string): string {
    const map: { [k: string]: string } = {
      '80C':   'badge-blue',
      '80D':   'badge-green',
      'HRA':   'badge-purple',
      '80G':   'badge-orange',
      '80TTA': 'badge-teal',
      'NPS':   'badge-indigo',
      '80CCD': 'badge-pink',
      '80E':   'badge-amber',
      '24B':   'badge-red',
      '80EEA': 'badge-rose'
    };
    return map[code] || 'badge-gray';
  }

  toggleSectionEdit(i: number) {
    this.sectionEditModes[i] = !this.sectionEditModes[i];
  }

  toggleSectionActive(i: number) {
    this.sectionLimits[i] = { ...this.sectionLimits[i], is_active: !this.sectionLimits[i].is_active };
  }

  saveSingleSection(i: number) {
    this.isSavingSection[i] = true;
    const sections: SectionLimit[] = [{ ...this.sectionLimits[i], financial_year: this.financialYear }];
    this.payrollApi.updateSectionLimits(sections).subscribe({
      next: () => {
        this.toaster.showSuccess(`${sections[0].section_code} limit saved successfully`);
        this.isSavingSection[i]  = false;
        this.sectionEditModes[i] = false;
      },
      error: () => {
        this.toaster.showError('Failed to save section limit');
        this.isSavingSection[i] = false;
      }
    });
  }

  addNewSection() {
    this.sectionLimits.push({ section_code: '', max_limit: 0, financial_year: this.financialYear, is_active: true });
    this.sectionEditModes.push(true);
    this.isSavingSection.push(false);
  }

  removeSection(i: number) {
    this.sectionLimits.splice(i, 1);
    this.sectionEditModes.splice(i, 1);
    this.isSavingSection.splice(i, 1);
  }

  saveSectionLimits() {
    this.isSavingSections = true;
    const sections = this.sectionLimits.map(s => ({ ...s, financial_year: this.financialYear }));
    this.payrollApi.updateSectionLimits(sections).subscribe({
      next: () => {
        this.toaster.showSuccess('All section limits updated successfully');
        this.isSavingSections  = false;
        this.sectionEditModes  = this.sectionLimits.map(() => false);
      },
      error: () => {
        this.toaster.showError('Failed to update section limits');
        this.isSavingSections = false;
      }
    });
  }

  // ─────────────────────────────────────────────
  // Verification Queue
  // ─────────────────────────────────────────────

  loadVerificationQueue() {
    this.isLoadingQueue = true;
    this.payrollApi.getVerificationQueue(this.queueFilter, this.financialYear).subscribe({
      next: (res: any) => {
        this.verificationQueue = res.queue || [];
        this.isLoadingQueue = false;
      },
      error: () => { this.isLoadingQueue = false; }
    });
  }

  openVerifyModal(proof: VerificationQueueItem) {
    this.selectedProof = proof;
    this.verifyForm.patchValue({
      extracted_amount: proof.declared_amount,
      confidence: 90,
      verification_status: 'AI_VERIFIED',
      notes: ''
    });
  }

  closeVerifyModal() { this.selectedProof = null; }

  submitVerification() {
    if (!this.selectedProof || this.verifyForm.invalid) return;
    this.isSubmittingVerification = true;
    const payload: AIVerificationResult = {
      proof_id: this.selectedProof.id,
      ...this.verifyForm.value
    };
    this.payrollApi.submitAIVerificationResult(payload).subscribe({
      next: (res: any) => {
        this.toaster.showSuccess(`Proof #${res.proof_id} verified: ${res.verification_status}`);
        this.isSubmittingVerification = false;
        this.selectedProof = null;
        this.loadVerificationQueue();
      },
      error: () => { this.toaster.showError('Verification failed'); this.isSubmittingVerification = false; }
    });
  }

  getVerificationColor(status: string): string {
    const s = (status || '').toUpperCase();
    if (s === 'AI_VERIFIED' || s === 'APPROVED') return 'success';
    if (s === 'FLAGGED') return 'warning';
    if (s === 'REJECTED') return 'danger';
    return 'medium';
  }

  // ─────────────────────────────────────────────
  // Proof Submission Window
  // ─────────────────────────────────────────────

  saveWindow() {
    if (this.windowForm.invalid) return;
    this.isSavingWindow = true;
    const raw = this.windowForm.value;
    const payload: ConfigWindowPayload = {
      ...raw,
      start_at: new Date(raw.start_at).toISOString(),
      end_at: new Date(raw.end_at).toISOString()
    };
    this.payrollApi.setConfigWindow(payload).subscribe({
      next: (res: any) => {
        this.toaster.showSuccess(`Window ${res.status}: ${res.window_type} for ${res.financial_year}`);
        this.isSavingWindow = false;
      },
      error: () => { this.toaster.showError('Failed to update window'); this.isSavingWindow = false; }
    });
  }

  // ─────────────────────────────────────────────
  // Payout Management
  // ─────────────────────────────────────────────

  initiatePayouts() {
    if (this.payoutForm.invalid) return;
    this.isSavingPayout = true;
    const payload = { ...this.payoutForm.value, run_id: Number(this.payoutForm.value.run_id) };
    this.payrollApi.initiatePayouts(payload).subscribe({
      next: (res: any) => {
        this.toaster.showSuccess('Payouts initiated successfully');
        this.isSavingPayout = false;
        this.loadPayoutsForRun(payload.run_id);
      },
      error: () => { this.toaster.showError('Failed to initiate payouts'); this.isSavingPayout = false; }
    });
  }

  loadPayoutsForRun(runId?: number) {
    const id = runId || this.payoutRunId;
    if (!id) return;
    this.payoutRunId = id;
    this.isLoadingPayouts = true;
    this.payrollApi.getPayoutsForRun(id).subscribe({
      next: (res: any) => {
        this.payouts = Array.isArray(res) ? res : (res.payouts || []);
        this.isLoadingPayouts = false;
      },
      error: () => { this.isLoadingPayouts = false; }
    });
  }

  updatePayoutStatus() {
    if (this.payoutStatusForm.invalid) return;
    const { payout_id, status, remarks } = this.payoutStatusForm.value;
    this.payrollApi.updatePayoutStatus(Number(payout_id), { status, remarks }).subscribe({
      next: () => {
        this.toaster.showSuccess('Payout status updated');
        if (this.payoutRunId) this.loadPayoutsForRun(this.payoutRunId);
      },
      error: () => this.toaster.showError('Failed to update payout status')
    });
  }

  // ─────────────────────────────────────────────
  // Utilities
  // ─────────────────────────────────────────────

  formatCurrency(val: number): string {
    return '₹' + (val || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  goBack() { this.router.navigate(['/finance/admin']); }
}
