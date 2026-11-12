import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Subject, forkJoin, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PayrollApiService } from '../../../../../core/services/payroll-api.service';
import { EmployeeDocumentsService, EmployeeDocument } from '../../../../../core/services/employee-documents.service';
import { formatDateDDMMMYYYY } from '../job/job.component';

@Component({
  selector: 'app-finance-tab',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class FinanceTabComponent implements OnChanges, OnDestroy {
  @Input() currentEmployee: any | null = null;
  @Input() isOwnProfile: boolean = true;

  private destroy$ = new Subject<void>();

  activeSubTab: 'summary' | 'pay' | 'tax' = 'summary';
  isLoading = false;

  bankAccount: any = null;
  payslips: any[] = [];
  latestPayslip: any = null;
  taxProfile: any = null;
  identityDocuments: EmployeeDocument[] = [];

  constructor(
    private payrollApi: PayrollApiService,
    private docService: EmployeeDocumentsService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentEmployee']?.currentValue?.id) {
      this.loadFinanceDetails(Number(this.currentEmployee.id));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectSubTab(tab: 'summary' | 'pay' | 'tax'): void {
    this.activeSubTab = tab;
  }

  private loadFinanceDetails(employeeId: number): void {
    this.isLoading = true;

    forkJoin({
      bank: this.payrollApi.getEmployeeBankAccount(employeeId).pipe(catchError(() => of(null))),
      payslips: this.payrollApi.getEmployeePayslips(employeeId).pipe(catchError(() => of(null))),
      taxProfile: this.payrollApi.getEmployeeTaxProfile(employeeId).pipe(catchError(() => of(null))),
      documents: this.docService.getEmployeeDocuments(employeeId).pipe(catchError(() => of(null))),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ bank, payslips, taxProfile, documents }) => {
          this.bankAccount = bank?.data || bank?.bankAccount || bank || null;

          const rawPayslips = payslips?.data || payslips?.payslips || (Array.isArray(payslips) ? payslips : []);
          this.payslips = Array.isArray(rawPayslips) ? rawPayslips : [];
          this.latestPayslip = this.payslips.length > 0 ? this.payslips[0] : null;

          this.taxProfile = taxProfile?.data || taxProfile || null;

          const groupedIdentity = documents?.grouped?.['Identity'];
          if (Array.isArray(groupedIdentity)) {
            this.identityDocuments = groupedIdentity;
          } else if (Array.isArray(documents?.documents)) {
            this.identityDocuments = documents.documents.filter(
              (d: EmployeeDocument) => (d.document_category || '').toLowerCase() === 'identity'
            );
          } else {
            this.identityDocuments = [];
          }

          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  private valOrNA(value: any): string {
    if (value === null || value === undefined) return 'N/A';
    const str = String(value).trim();
    return str.length > 0 && str !== '-' && str !== '—' ? str : 'N/A';
  }

  private formatDateOrNA(value: any): string {
    if (!value) return 'N/A';
    const formatted = formatDateDDMMMYYYY(value);
    return formatted && formatted !== '-' ? formatted : 'N/A';
  }

  // ── Payroll Summary ──
  get lastProcessedCycle(): string {
    if (!this.latestPayslip) return 'N/A';
    const label =
      this.latestPayslip.cycle_label ||
      this.latestPayslip.month_label ||
      this.latestPayslip.payroll_month ||
      this.latestPayslip.month;
    return this.valOrNA(label);
  }

  get workingDays(): string {
    if (!this.latestPayslip) return 'N/A';
    const days =
      this.latestPayslip.working_days ??
      this.latestPayslip.total_days ??
      this.latestPayslip.payable_days;
    return days !== null && days !== undefined ? String(days) : 'N/A';
  }

  get lossOfPayDays(): string {
    if (!this.latestPayslip) return 'N/A';
    const lop = this.latestPayslip.lop_days ?? this.latestPayslip.loss_of_pay;
    return lop !== null && lop !== undefined ? String(lop) : 'N/A';
  }

  get hasPayslip(): boolean {
    return this.payslips.length > 0;
  }

  openPayslipsPage(): void {
    if (this.isOwnProfile) {
      this.router.navigate(['/MyPay']);
    }
  }

  openMyTaxPage(): void {
    if (this.isOwnProfile) {
      this.router.navigate(['/MyTax']);
    }
  }

  // ── Payment Information ──
  get bankName(): string {
    return this.valOrNA(
      this.bankAccount?.bank_name ??
      this.bankAccount?.Bank ??
      this.currentEmployee?.bank_name ??
      this.currentEmployee?.BankName
    );
  }

  get accountNumber(): string {
    return this.valOrNA(
      this.bankAccount?.account_number ??
      this.bankAccount?.BankAccountNo ??
      this.currentEmployee?.AccountNumber ??
      this.currentEmployee?.account_number
    );
  }

  get ifscCode(): string {
    return this.valOrNA(
      this.bankAccount?.ifsc_code ??
      this.bankAccount?.IFSCCode ??
      this.currentEmployee?.ifsc_code ??
      this.currentEmployee?.IFSCCode
    );
  }

  get accountHolderName(): string {
    const explicit =
      this.bankAccount?.account_holder_name ??
      this.bankAccount?.name_on_account ??
      this.bankAccount?.Name ??
      this.currentEmployee?.account_holder_name ??
      this.currentEmployee?.name_on_account;
    if (explicit) return this.valOrNA(explicit);
    if (this.bankName !== 'N/A' || this.accountNumber !== 'N/A') {
      return this.valOrNA(this.currentEmployee?.FullName);
    }
    return 'N/A';
  }

  get bankBranch(): string {
    return this.valOrNA(
      this.bankAccount?.branch_name ??
      this.bankAccount?.branch ??
      this.currentEmployee?.bank_branch ??
      this.currentEmployee?.branch_name
    );
  }

  get paymentMode(): string {
    const explicit =
      this.bankAccount?.payment_mode ??
      this.bankAccount?.PaymentMode ??
      this.currentEmployee?.payment_mode;
    if (explicit) return this.valOrNA(explicit);
    return this.bankName !== 'N/A' || this.accountNumber !== 'N/A' ? 'Bank Transfer' : 'N/A';
  }

  // ── Statutory Information ──
  get pfNumber(): string {
    return this.valOrNA(this.currentEmployee?.pf_number ?? this.currentEmployee?.PFNumber);
  }

  get uanNumber(): string {
    return this.valOrNA(this.currentEmployee?.uan_number ?? this.currentEmployee?.UANNumber);
  }

  get pfStatus(): string {
    const explicit = this.currentEmployee?.pf_status;
    if (explicit) return this.valOrNA(explicit);
    return this.pfNumber !== 'N/A' || this.uanNumber !== 'N/A' ? 'Enabled' : 'N/A';
  }

  get pfJoinDate(): string {
    return this.formatDateOrNA(this.currentEmployee?.pf_join_date ?? this.currentEmployee?.PFJoinDate);
  }

  get pfAccountName(): string {
    const explicit = this.currentEmployee?.pf_account_name ?? this.currentEmployee?.pf_name;
    if (explicit) return this.valOrNA(explicit);
    if (this.pfNumber !== 'N/A' || this.uanNumber !== 'N/A') {
      return this.valOrNA(this.currentEmployee?.FullName);
    }
    return 'N/A';
  }

  get esiNumber(): string {
    return this.valOrNA(this.currentEmployee?.esi_number ?? this.currentEmployee?.ESINumber);
  }

  get esiStatus(): string {
    const explicit = this.currentEmployee?.esi_status;
    if (explicit) return this.valOrNA(explicit);
    return this.esiNumber !== 'N/A' ? 'Eligible' : 'N/A';
  }

  get ptState(): string {
    return this.valOrNA(this.currentEmployee?.pt_state ?? this.currentEmployee?.state ?? this.currentEmployee?.State);
  }

  get ptRegisteredLocation(): string {
    return this.valOrNA(
      this.currentEmployee?.pt_location ??
      this.currentEmployee?.registered_location ??
      this.currentEmployee?.location_name
    );
  }

  // ── Identity Information ──
  get panNumber(): string {
    return this.valOrNA(
      this.currentEmployee?.PANNumber ??
      this.currentEmployee?.pan_number ??
      this.taxProfile?.pan_number
    );
  }

  get hasPanDetails(): boolean {
    return this.panNumber !== 'N/A';
  }

  get panName(): string {
    const explicit = this.currentEmployee?.pan_name;
    if (explicit) return this.valOrNA(explicit);
    return this.hasPanDetails ? this.valOrNA(this.currentEmployee?.FullName) : 'N/A';
  }

  get panDob(): string {
    return this.hasPanDetails ? this.formatDateOrNA(this.currentEmployee?.DateOfBirth) : 'N/A';
  }

  get fathersName(): string {
    return this.valOrNA(this.currentEmployee?.father_name ?? this.currentEmployee?.fathers_name ?? this.currentEmployee?.FatherName);
  }

  get aadhaarNumber(): string {
    return this.valOrNA(this.currentEmployee?.AadhaarNumber ?? this.currentEmployee?.aadhaar_number);
  }

  get hasAadhaarDetails(): boolean {
    return this.aadhaarNumber !== 'N/A';
  }

  get enrolmentNumber(): string {
    return this.valOrNA(this.currentEmployee?.aadhaar_enrolment_number ?? this.currentEmployee?.enrolment_number);
  }

  get aadhaarDob(): string {
    return this.hasAadhaarDetails ? this.formatDateOrNA(this.currentEmployee?.DateOfBirth) : 'N/A';
  }

  get aadhaarName(): string {
    const explicit = this.currentEmployee?.aadhaar_name;
    if (explicit) return this.valOrNA(explicit);
    return this.hasAadhaarDetails ? this.valOrNA(this.currentEmployee?.FullName) : 'N/A';
  }

  get aadhaarGender(): string {
    return this.hasAadhaarDetails ? this.valOrNA(this.currentEmployee?.Gender) : 'N/A';
  }

  get formattedAddress(): string {
    if (!this.hasAadhaarDetails) return 'N/A';
    const parts = [
      this.currentEmployee?.permanent_address_line1 || this.currentEmployee?.current_address_line1,
      this.currentEmployee?.permanent_address_line2 || this.currentEmployee?.current_address_line2,
      this.currentEmployee?.permanent_city || this.currentEmployee?.current_city,
      this.currentEmployee?.permanent_state || this.currentEmployee?.current_state,
      this.currentEmployee?.permanent_pincode || this.currentEmployee?.current_pincode,
    ]
      .map((p) => (p ? String(p).trim() : ''))
      .filter((p) => p.length > 0 && p !== '-');
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  }

  getDocumentCountLabel(keywords: string[]): string | null {
    const matches = this.identityDocuments.filter((doc) => {
      const text = `${doc.document_name || ''} ${doc.document_type_name || ''} ${doc.document_type_code || ''}`.toLowerCase();
      return keywords.some((kw) => text.includes(kw));
    });
    if (matches.length === 0) return null;
    return matches.length === 1 ? '1 Copy' : `${matches.length} Copies`;
  }

  get panDocCountLabel(): string | null {
    return this.getDocumentCountLabel(['pan']);
  }

  get aadhaarDocCountLabel(): string | null {
    return this.getDocumentCountLabel(['aadhaar', 'aadhar']);
  }
}

