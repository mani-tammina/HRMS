import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// ─────────────────────────────────────────────
// TypeScript Interfaces / Models
// ─────────────────────────────────────────────

export interface PayrollDefaults {
  id?: number;
  pf_percent: number;
  esi_percent: number;
  professional_tax: number;
  variable_pay_percent: number;
}

export interface SalaryStructurePayload {
  basic: number;
  hra: number;
  conveyance: number;
  special_allowance: number;
  pf: number;
  esi: number;
  professional_tax: number;
  other_deductions: number;
}

export interface SalaryStructureComponent {
  component_name: string;
  component_value: string;
}

export interface SalaryStructureResponse {
  success: boolean;
  salaryStructure: SalaryStructureComponent[];
}

export interface GeneratePayrollPayload {
  month: number;
  year: number;
}

export interface PayrollRunResponse {
  success: boolean;
  run_id: number;
  processed: number;
}

export interface PayrollRun {
  id: number;
  month: number;
  year: number;
  status: string;
  slip_count?: number | null;
  total_payout: number;
}

export interface V2RunPayload {
  year: number;
  month: number;
}

export interface V2RunResponse {
  success: boolean;
  run_id: number;
  processed_employees: number;
  total_gross: number;
  total_net: number;
}

export interface V2RunSummary {
  run_id: number;
  status: string;
  started_at: string;
  completed_at: string;
  employee_count: number;
  total_gross: number;
  total_net: number;
}

export interface BankAccountPayload {
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_type: string;
}

export interface PayoutInitiatePayload {
  run_id: number;
  payout_date: string;
  payment_mode: string;
}

export interface PayoutStatusPayload {
  status: string;
  remarks: string;
}

export interface EarningsBreakup {
  component_code: string;
  component_name: string;
  amount: number;
}

export interface TaxSummaryItem {
  year: number;
  deduction_code: string;
  total: number;
}

export interface StatutoryRule {
  provider_type: 'PF' | 'ESI' | 'PT';
  state_code: string;
  percentage: number;
  ceiling_limit: number;
  effective_from: string;
}

export interface StatutoryRuleResponse {
  success: boolean;
  rules: StatutoryRule[];
}

export interface TaxSlab {
  regime_type: 'NEW' | 'OLD';
  min_income: number;
  max_income: number;
  rate: number;
  cess_rate: number;
  surcharge_rate?: number;
  financial_year: string;
}

export interface TaxSlabResponse {
  success: boolean;
  slabs: TaxSlab[];
  financial_year: string;
}

export interface StandardDeduction {
  id?: number;
  regime_type: 'OLD' | 'NEW';
  amount: number;
  financial_year: string;
  is_active?: boolean;
}

export interface SectionLimit {
  section_code: string;
  max_limit: number;
  financial_year: string;
  is_active?: boolean;
}

export interface PayrollValidationResult {
  success: boolean;
  can_proceed: boolean;
  errors: string[];
  warnings: string[];
  missing_bank_accounts: number;
  missing_tax_regimes: number;
  pending_attendance: number;
}

export interface PayrollPreviewResponse {
  success: boolean;
  total_employees: number;
  gross_sum: number;
  tax_sum: number;
  net_sum: number;
  preview_data: any[];
}

export interface LOPRecord {
  employee_id: number;
  FullName: string;
  EmployeeNumber: string;
  lop_days: number;
  unpaid_days: number;
}

export interface LOPSummaryResponse {
  success: boolean;
  month: string;
  lop_records: LOPRecord[];
}

export interface ReconciliationReport {
  success: boolean;
  payroll_month: string;
  summary: {
    total_calculated: number;
    total_adjustments: number;
    total_final: number;
    employee_count: number;
  };
  details: any[];
}

export interface PayrollAdjustment {
  employee_id: number;
  payroll_month: string;
  adjustment_type: 'BONUS' | 'DEDUCTION' | 'ARREAR' | 'ADVANCE_RECOVERY' | 'REIMBURSEMENT';
  amount: number;
  reason: string;
}

export interface TaxComputation {
  success: boolean;
  employee_id: number;
  financial_year: string;
  regime_type: string;
  gross_annual_income: number;
  total_deductions: number;
  taxable_income: number;
  income_tax: number;
  cess: number;
  surcharge: number;
  total_tax_liability: number;
  monthly_tds: number;
}

export interface TaxDeclaration {
  financial_year: string;
  tax_regime: 'OLD' | 'NEW';
  declarations: { [section: string]: number };
}

export interface TaxSummaryResponse {
  success: boolean;
  employee_id: number;
  financial_year: string;
  tax_regime: string;
  pan: string;
  is_tds_exempt: boolean;
  declared_investments: { [section: string]: number };
  tds_paid_ytd: number;
  proofs: any[];
}

export interface VerificationQueueItem {
  id: number;
  employee_id: number;
  EmployeeNumber: string;
  FullName: string;
  financial_year: string;
  section_code: string;
  original_filename: string;
  declared_amount: number;
  extracted_amount: number | null;
  ai_confidence: number | null;
  verification_status: string;
}

export interface VerificationQueueResponse {
  success: boolean;
  total: number;
  queue: VerificationQueueItem[];
}

export interface AIVerificationResult {
  proof_id: number;
  extracted_amount: number;
  confidence: number;
  verification_status?: 'AI_VERIFIED' | 'FLAGGED' | 'REJECTED' | 'APPROVED';
  notes?: string;
}

export interface PendingAIProofsResponse {
  success: boolean;
  total: number;
  proofs: any[];
}

export interface TaxRegimeResponse {
  success: boolean;
  financial_year: string;
  slabs: TaxSlab[];
}

export interface Payout {
  id: number;
  run_id: number;
  employee_id: number;
  payout_date: string;
  amount: number;
  payment_mode: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  remarks?: string;
}

export interface PayoutResponse {
  success: boolean;
  run_id: number;
  payouts: Payout[];
}

export interface ProcessRunPayload {
  payroll_month: string;
  notes?: string;
}

export interface LockPeriodPayload {
  payroll_month: string;
  reason: string;
}

export interface ConfigWindowPayload {
  window_type: string;
  financial_year: string;
  start_at: string;
  end_at: string;
  status: 'OPEN' | 'CLOSED';
  notes?: string;
}

// ─────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────

@Injectable({
  providedIn: 'root'
})
export class PayrollApiService {
  private baseUrl = `http://${environment.apiURL}/api`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  private getMultipartHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ─────────────────────────────────────────────
  // Section 1 — Payroll Master Setup (Defaults)
  // ─────────────────────────────────────────────

  /** POST /api/payroll/defaults — Create payroll defaults */
  createPayrollDefaults(payload: PayrollDefaults): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/defaults`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/defaults — Get current payroll defaults */
  getPayrollDefaults(): Observable<PayrollDefaults> {
    return this.http.get<PayrollDefaults>(`${this.baseUrl}/payroll/defaults`, { headers: this.getHeaders() });
  }

  /** PUT /api/payroll/defaults/:id — Update payroll defaults */
  updatePayrollDefaults(id: number, payload: Partial<PayrollDefaults>): Observable<any> {
    return this.http.put(`${this.baseUrl}/payroll/defaults/${id}`, payload, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 2 — Employee Salary Structure (Legacy)
  // ─────────────────────────────────────────────

  /** POST /api/payroll/salary/structure/:empId — Create/update employee salary structure */
  setEmployeeSalaryStructure(empId: number, payload: SalaryStructurePayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/salary/structure/${empId}`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/salary/structure/:empId — Get employee salary structure */
  getEmployeeSalaryStructure(empId: number): Observable<SalaryStructureResponse> {
    return this.http.get<SalaryStructureResponse>(`${this.baseUrl}/payroll/salary/structure/${empId}`, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 3 — Run Payroll (Legacy)
  // ─────────────────────────────────────────────

  /** POST /api/payroll/generate — Generate payroll for a month */
  generatePayroll(payload: GeneratePayrollPayload): Observable<PayrollRunResponse> {
    return this.http.post<PayrollRunResponse>(`${this.baseUrl}/payroll/generate`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/runs — List all payroll runs */
  getPayrollRuns(): Observable<PayrollRun[]> {
    return this.http.get<PayrollRun[]>(`${this.baseUrl}/payroll/runs`, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/:run — Get payroll details for a specific run */
  getPayrollRunDetails(runId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/${runId}`, { headers: this.getHeaders() });
  }

  /** POST /api/payroll/recalculate/:empId — Recalculate payroll for one employee */
  recalculateEmployeePayroll(empId: number, payload: GeneratePayrollPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/recalculate/${empId}`, payload, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 4 — V2 Payroll Admin
  // ─────────────────────────────────────────────

  /** POST /api/payroll/v2/run — Run V2 Payroll */
  runV2Payroll(payload: V2RunPayload): Observable<V2RunResponse> {
    return this.http.post<V2RunResponse>(`${this.baseUrl}/payroll/v2/run`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/run?month=YYYY-MM — Get V2 run summary for a month */
  getV2RunSummary(month: string): Observable<V2RunSummary[]> {
    const params = new HttpParams().set('month', month);
    return this.http.get<V2RunSummary[]>(`${this.baseUrl}/payroll/v2/run`, { headers: this.getHeaders(), params });
  }

  /** GET /api/payroll/v2/run/:employeeId?month=YYYY-MM — Breakdown for one employee */
  getV2EmployeeBreakdown(employeeId: number, month: string): Observable<any> {
    const params = new HttpParams().set('month', month);
    return this.http.get(`${this.baseUrl}/payroll/v2/run/${employeeId}`, { headers: this.getHeaders(), params });
  }

  /** POST /api/payroll/v2/runs/:runId/lock — Lock a payroll run */
  lockPayrollRun(runId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/v2/runs/${runId}/lock`, {}, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/runs/validate?month=YYYY-MM — Validate payroll for a month */
  validatePayroll(month: string): Observable<PayrollValidationResult> {
    const params = new HttpParams().set('month', month);
    return this.http.get<PayrollValidationResult>(`${this.baseUrl}/payroll/v2/runs/validate`, { headers: this.getHeaders(), params });
  }

  /** POST /api/payroll/v2/runs/preview — Perform a dry run / preview */
  previewPayroll(payload: V2RunPayload): Observable<PayrollPreviewResponse> {
    return this.http.post<PayrollPreviewResponse>(`${this.baseUrl}/payroll/v2/runs/preview`, payload, { headers: this.getHeaders() });
  }

  /** POST /api/payroll/v2/runs/:runId/review — Submit payroll for review */
  reviewPayroll(runId: number, notes?: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/v2/runs/${runId}/review`, { notes }, { headers: this.getHeaders() });
  }

  /** POST /api/payroll/v2/runs/:runId/paid — Mark a payroll run as paid */
  markAsPaid(runId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/v2/runs/${runId}/paid`, {}, { headers: this.getHeaders() });
  }

  /** POST /api/payroll/v2/runs/:runId/notify — Notify employees of payslip availability */
  notifyEmployees(runId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/v2/runs/${runId}/notify`, {}, { headers: this.getHeaders() });
  }

  /** PUT /api/payroll/v2/cycles/:cycleId/lock — Lock a payroll cycle */
  lockPayrollCycle(cycleId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/payroll/v2/cycles/${cycleId}/lock`, {}, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/employees/:employeeId/run-status?month=YYYY-MM — Get run status and template info */
  getEmployeeRunStatus(employeeId: number, month: string): Observable<any> {
    const params = new HttpParams().set('month', month);
    return this.http.get(`${this.baseUrl}/payroll/v2/employees/${employeeId}/run-status`, { headers: this.getHeaders(), params });
  }

  /** GET /api/payroll/v2/employees/:employeeId/tax-profile — Get employee tax profile */
  getEmployeeTaxProfile(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/v2/employees/${employeeId}/tax-profile`, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/employees/:employeeId/bank-account — Get employee bank account */
  getEmployeeBankAccount(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/v2/employees/${employeeId}/bank-account`, { headers: this.getHeaders() });
  }

  /** PUT /api/payroll/v2/employees/:employeeId/bank-account — Update employee bank account */
  updateEmployeeBankAccount(employeeId: number, payload: BankAccountPayload): Observable<any> {
    return this.http.put(`${this.baseUrl}/payroll/v2/employees/${employeeId}/bank-account`, payload, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 5 — V2 Employee Self-Service
  // ─────────────────────────────────────────────

  /** GET /api/payroll/v2/payslips/:employeeId — List all payslips */
  getEmployeePayslips(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/v2/payslips/${employeeId}`, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/payslips/:employeeId/:year/:month — Get one payslip by year+month */
  getPayslipByYearMonth(employeeId: number, year: number, month: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/v2/payslips/${employeeId}/${year}/${month}`, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/payslips/:employeeId/:month — Get one payslip by YYYY-MM */
  getPayslipByMonth(employeeId: number, month: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/v2/payslips/${employeeId}/${month}`, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/structure/:employeeId — Get employee salary structure (V2) */
  getV2EmployeeStructure(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/v2/structure/${employeeId}`, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/attendance-impact/:employeeId — Get attendance impact on payroll */
  getAttendanceImpact(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payroll/v2/attendance-impact/${employeeId}`, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/earnings/:employeeId?month=YYYY-MM — Get earnings breakup */
  getEarningsBreakup(employeeId: number, month: string): Observable<EarningsBreakup[]> {
    const params = new HttpParams().set('month', month);
    return this.http.get<EarningsBreakup[]>(`${this.baseUrl}/payroll/v2/earnings/${employeeId}`, { headers: this.getHeaders(), params });
  }

  /** GET /api/payroll/v2/deductions/:employeeId?month=YYYY-MM — Get deductions breakup */
  getDeductionsBreakup(employeeId: number, month: string): Observable<EarningsBreakup[]> {
    const params = new HttpParams().set('month', month);
    return this.http.get<EarningsBreakup[]>(`${this.baseUrl}/payroll/v2/deductions/${employeeId}`, { headers: this.getHeaders(), params });
  }

  /** GET /api/payroll/v2/tax-summary/:employeeId?year=YYYY — Get annual tax summary */
  getAnnualTaxSummary(employeeId: number, year: number): Observable<TaxSummaryItem[]> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<TaxSummaryItem[]>(`${this.baseUrl}/payroll/v2/tax-summary/${employeeId}`, { headers: this.getHeaders(), params });
  }

  /** GET /api/payroll/v2/form16/:employeeId?year=YYYY — Form 16 metadata */
  getForm16Metadata(employeeId: number, year: number): Observable<any> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get(`${this.baseUrl}/payroll/v2/form16/${employeeId}`, { headers: this.getHeaders(), params });
  }

  // ─────────────────────────────────────────────
  // Section 6 — V2 Payout Management
  // ─────────────────────────────────────────────

  /** POST /api/payroll/v2/payouts/initiate — Initiate salary payouts */
  initiatePayouts(payload: PayoutInitiatePayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/v2/payouts/initiate`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/v2/payouts/:runId — Get payouts for a run */
  getPayoutsForRun(runId: number): Observable<PayoutResponse> {
    return this.http.get<PayoutResponse>(`${this.baseUrl}/payroll/v2/payouts/${runId}`, { headers: this.getHeaders() });
  }

  /** PUT /api/payroll/v2/payouts/:payoutId/status — Update payout status */
  updatePayoutStatus(payoutId: number, payload: PayoutStatusPayload): Observable<any> {
    return this.http.put(`${this.baseUrl}/payroll/v2/payouts/${payoutId}/status`, payload, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 8 — V1 Tax Admin
  // ─────────────────────────────────────────────

  /** GET /api/v1/admin/payroll/statutory-rules — Get active statutory rules (PF/ESI/PT) */
  getStatutoryRules(): Observable<StatutoryRuleResponse> {
    return this.http.get<StatutoryRuleResponse>(`${this.baseUrl}/v1/admin/payroll/statutory-rules`, { headers: this.getHeaders() });
  }

  /** PUT /api/v1/admin/payroll/statutory-rules — Create/update statutory rules */
  updateStatutoryRules(rules: StatutoryRule[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/admin/payroll/statutory-rules`, { rules }, { headers: this.getHeaders() });
  }

  /** GET /api/v1/admin/tax/slabs?financial_year=YYYY-YYYY — Get income tax slabs */
  getTaxSlabs(financialYear: string): Observable<TaxSlabResponse> {
    const params = new HttpParams().set('financial_year', financialYear);
    return this.http.get<TaxSlabResponse>(`${this.baseUrl}/v1/admin/tax/slabs`, { headers: this.getHeaders(), params });
  }

  /** POST /api/v1/admin/tax/slabs — Create income tax slabs */
  createTaxSlabs(slabs: TaxSlab[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/admin/tax/slabs`, { slabs }, { headers: this.getHeaders() });
  }

  /** PATCH /api/v1/admin/tax/section-limits — Update section limits (80C, 80D, etc.) */
  updateSectionLimits(sections: SectionLimit[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/v1/admin/tax/section-limits`, { sections }, { headers: this.getHeaders() });
  }

  /** POST /api/v1/admin/payroll/components — Register a salary component (V1) */
  registerSalaryComponentV1(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/admin/payroll/components`, payload, { headers: this.getHeaders() });
  }

  /** PUT /api/payroll-master/components/:id — Update a payroll component */
  updatePayrollComponent(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/payroll-master/components/${id}`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/v1/admin/payroll/lop-summary?payroll_month=YYYY-MM — Get LOP summary */
  getLOPSummary(payrollMonth: string): Observable<LOPSummaryResponse> {
    const params = new HttpParams().set('payroll_month', payrollMonth);
    return this.http.get<LOPSummaryResponse>(`${this.baseUrl}/v1/admin/payroll/lop-summary`, { headers: this.getHeaders(), params });
  }

  /** POST /api/v1/admin/payroll/process-run — Process payroll run (V1) */
  processPayrollRun(payload: ProcessRunPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/admin/payroll/process-run`, payload, { headers: this.getHeaders() });
  }

  /** POST /api/v1/admin/payroll/lock-period — Lock a payroll period */
  lockPayrollPeriod(payload: LockPeriodPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/admin/payroll/lock-period`, payload, { headers: this.getHeaders() });
  }

  /** POST /api/v1/admin/payroll/adjustments — Create payroll adjustments (V1) */
  createPayrollAdjustmentV1(payload: PayrollAdjustment): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/admin/payroll/adjustments`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/v1/admin/payroll/reconciliation?payroll_month=YYYY-MM — Get reconciliation report */
  getReconciliationReport(payrollMonth: string): Observable<ReconciliationReport> {
    const params = new HttpParams().set('payroll_month', payrollMonth);
    return this.http.get<ReconciliationReport>(`${this.baseUrl}/v1/admin/payroll/reconciliation`, { headers: this.getHeaders(), params });
  }

  // ─────────────────────────────────────────────
  // Section 9 — V1 Employee Tax Self-Service
  // ─────────────────────────────────────────────

  /** GET /api/v1/employee/tax/computation?financial_year=YYYY-YYYY — Get tax computation */
  getTaxComputation(financialYear: string): Observable<TaxComputation> {
    const params = new HttpParams().set('financial_year', financialYear);
    return this.http.get<TaxComputation>(`${this.baseUrl}/v1/employee/tax/computation`, { headers: this.getHeaders(), params });
  }

  /** POST /api/v1/employee/tax/declaration — Submit tax declaration */
  submitTaxDeclaration(payload: TaxDeclaration): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/employee/tax/declaration`, payload, { headers: this.getHeaders() });
  }

  /** POST /api/v1/employee/tax/upload-proof — Upload tax proof document (V1) */
  uploadTaxProofV1(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/employee/tax/upload-proof`, formData, { headers: this.getMultipartHeaders() });
  }

  /** GET /api/v1/employee/payroll/history — Get employee payroll history */
  getPayrollHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/employee/payroll/history`, { headers: this.getHeaders() });
  }

  /** GET /api/v1/employee/payroll/payslip/:id — Get a specific payslip by ID */
  getPayslipById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/employee/payroll/payslip/${id}`, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 10 — Tax Workflow Admin Panel
  // ─────────────────────────────────────────────

  /** GET /api/admin/tax-regimes?financial_year=YYYY-YYYY — Get income tax regimes & slabs */
  getTaxRegimes(financialYear: string): Observable<TaxRegimeResponse> {
    const params = new HttpParams().set('financial_year', financialYear);
    return this.http.get<TaxRegimeResponse>(`${this.baseUrl}/admin/tax-regimes`, { headers: this.getHeaders(), params });
  }

  /** PUT /api/admin/tax-sections — Update tax sections (80C/80D limits) */
  updateTaxSections(financialYear: string, sections: any[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/tax-sections`, { financial_year: financialYear, sections }, { headers: this.getHeaders() });
  }

  /** POST /api/admin/config/window — Open/close proof submission window */
  setConfigWindow(payload: ConfigWindowPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/config/window`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/admin/pt-slabs — Get professional tax slabs */
  getPTSlabs(): Observable<TaxSlabResponse> {
    return this.http.get<TaxSlabResponse>(`${this.baseUrl}/admin/pt-slabs`, { headers: this.getHeaders() });
  }
  
  /** GET /api/v1/admin/tax/standard-deductions — Get standard deduction amounts */
  getStandardDeductions(financialYear?: string): Observable<any> {
    let params = new HttpParams();
    if (financialYear) params = params.set('financial_year', financialYear);
    return this.http.get(`${this.baseUrl}/v1/admin/tax/standard-deductions`, { headers: this.getHeaders(), params });
  }

  /** POST /api/v1/admin/tax/standard-deductions — Create or update standard deduction */
  createStandardDeduction(deductions: StandardDeduction | StandardDeduction[]): Observable<any> {
    const payload = Array.isArray(deductions) ? { deductions } : deductions;
    return this.http.post(`${this.baseUrl}/v1/admin/tax/standard-deductions`, payload, { headers: this.getHeaders() });
  }

  /** DELETE /api/v1/admin/tax/standard-deductions/:id — Delete (disable) standard deduction */
  deleteStandardDeduction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/v1/admin/tax/standard-deductions/${id}`, { headers: this.getHeaders() });
  }

  /** GET /api/admin/verification-queue?status=PENDING — Get admin verification queue */
  getVerificationQueue(status?: string, financialYear?: string): Observable<VerificationQueueResponse> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (financialYear) params = params.set('financial_year', financialYear);
    return this.http.get<VerificationQueueResponse>(`${this.baseUrl}/admin/verification-queue`, { headers: this.getHeaders(), params });
  }

  // ─────────────────────────────────────────────
  // Section 11 — Tax Workflow Employee Portal
  // ─────────────────────────────────────────────

  /** GET /api/tax/summary?financial_year=YYYY-YYYY — Get my tax summary */
  getMyTaxSummary(financialYear: string): Observable<TaxSummaryResponse> {
    const params = new HttpParams().set('financial_year', financialYear);
    return this.http.get<TaxSummaryResponse>(`${this.baseUrl}/tax/summary`, { headers: this.getHeaders(), params });
  }

  /** POST /api/tax/regime-selection — Choose tax regime */
  selectTaxRegime(taxRegime: 'OLD' | 'NEW', financialYear: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/tax/regime-selection`, { tax_regime: taxRegime, financial_year: financialYear }, { headers: this.getHeaders() });
  }

  /** GET /api/tax/declarations?financial_year=YYYY-YYYY — Get declared investments */
  getDeclaredInvestments(financialYear: string): Observable<any> {
    const params = new HttpParams().set('financial_year', financialYear);
    return this.http.get(`${this.baseUrl}/tax/declarations`, { headers: this.getHeaders(), params });
  }

  /** POST /api/tax/declarations — Submit/update investment declarations */
  submitInvestmentDeclarations(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tax/declarations`, payload, { headers: this.getHeaders() });
  }

  /** POST /api/tax/upload-proof — Upload investment proof document */
  uploadInvestmentProof(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/tax/upload-proof`, formData, { headers: this.getMultipartHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 12 — AI Proof Verification
  // ─────────────────────────────────────────────

  /** GET /api/ai/pending-proofs?limit=50 — Get all pending AI proofs */
  getPendingAIProofs(limit: number = 50): Observable<PendingAIProofsResponse> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<PendingAIProofsResponse>(`${this.baseUrl}/ai/pending-proofs`, { headers: this.getHeaders(), params });
  }

  /** POST /api/ai/verification-result — Submit AI verification result */
  submitAIVerificationResult(payload: AIVerificationResult): Observable<any> {
    return this.http.post(`${this.baseUrl}/ai/verification-result`, payload, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Section 13 — Advanced Payroll Execution
  // ─────────────────────────────────────────────

  /** POST /api/payroll/run/calculate — Calculate & run payroll for a month */
  calculateAndRunPayroll(payload: ProcessRunPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/run/calculate`, payload, { headers: this.getHeaders() });
  }

  /** GET /api/payroll/payslip/download?employee_id=:id&payroll_month=YYYY-MM — Download payslip PDF */
  downloadPayslipPDF(employeeId: number, payrollMonth: string): Observable<Blob> {
    const params = new HttpParams()
      .set('employee_id', employeeId.toString())
      .set('payroll_month', payrollMonth);
    return this.http.get(`${this.baseUrl}/payroll/payslip/download`, {
      headers: this.getHeaders(),
      params,
      responseType: 'blob'
    });
  }

  /** POST /api/payroll/adjustments — Create payroll adjustment (ad-hoc) */
  createPayrollAdjustment(payload: PayrollAdjustment): Observable<any> {
    return this.http.post(`${this.baseUrl}/payroll/adjustments`, payload, { headers: this.getHeaders() });
  }

  // ─────────────────────────────────────────────
  // Helper: Current Financial Year
  // ─────────────────────────────────────────────

  /** Returns current financial year string e.g. "2025-2026" */
  getCurrentFinancialYear(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1; // 1-indexed
    return m >= 4 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
  }

  /** Returns current YYYY-MM string */
  getCurrentYearMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }
}
