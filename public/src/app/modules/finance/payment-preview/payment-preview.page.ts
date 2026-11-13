import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PayrollApiService } from '../../../core/services/payroll-api.service';
import { ToasterService } from '../../../core/services/toaster.service';

export interface BankSummaryItem {
  name: string;
  amount: number;
  employees: number;
}

export interface EmployeePayoutItem {
  id: number;
  employee_number: string;
  full_name: string;
  department: string;
  designation: string;
  payment_mode: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  net_payable: number;
  payment_status: string;
}

export interface PaymentBatchesData {
  month: string;
  monthLabel: string;
  runId: number | null;
  isPaid: boolean;
  status: string;
  totals: {
    salariesToBePaid: number;
    bankTransfer: number;
    cashPayment: number;
    chequePayment: number;
    totalEmployees: number;
    batchedEmployeesCount: number;
    nonBatchedEmployeesCount: number;
  };
  corporateBank: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  batchDetails: {
    title: string;
    subtitle: string;
    totalAmount: number;
    employeesCount: number;
    status: string;
  };
  bankSummary: BankSummaryItem[];
  batchedEmployees: EmployeePayoutItem[];
  nonBatchedEmployees: EmployeePayoutItem[];
}

@Component({
  selector: 'app-payment-preview',
  templateUrl: './payment-preview.page.html',
  styleUrls: ['./payment-preview.page.scss'],
  standalone: false
})
export class PaymentPreviewPage implements OnInit {
  selectedMonth = '2026-08';
  isLoading = false;
  isMarkingPaid = false;
  isDownloading = false;

  // Active view states
  activeBatchId: 'bank-transfer' | 'non-batched' = 'bank-transfer';
  activeSubTab: 'summary' | 'employees' = 'summary';

  // Search & Filter in employees tab
  searchTerm = '';
  selectedBankFilter = 'ALL';

  // API response data
  batchData: PaymentBatchesData | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollApi: PayrollApiService,
    private toaster: ToasterService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['month']) {
        this.selectedMonth = params['month'];
      } else {
        const now = new Date();
        this.selectedMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      }
      this.loadPaymentBatches();
    });
  }

  loadPaymentBatches(): void {
    this.isLoading = true;
    this.payrollApi.getPaymentBatches(this.selectedMonth).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success && res.data) {
          this.batchData = res.data;
        } else {
          this.toaster.showError('Unable to load payment batches');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching payment batches:', err);
        this.toaster.showError(err?.error?.error || 'Failed to load payment preview');
      }
    });
  }

  selectBatch(batchId: 'bank-transfer' | 'non-batched'): void {
    this.activeBatchId = batchId;
    this.searchTerm = '';
    this.selectedBankFilter = 'ALL';
    if (batchId === 'non-batched') {
      this.activeSubTab = 'employees';
    } else {
      this.activeSubTab = 'summary';
    }
  }

  selectSubTab(tab: 'summary' | 'employees'): void {
    this.activeSubTab = tab;
  }

  closePage(): void {
    this.router.navigate(['/finance/dashboard'], {
      queryParams: { month: this.selectedMonth }
    });
  }

  formatINR(val: number | null | undefined): string {
    if (val === null || val === undefined || isNaN(val)) return '0';
    return Number(val).toLocaleString('en-IN');
  }

  async markAsPaid(): Promise<void> {
    if (!this.batchData) return;
    if (this.batchData.isPaid || this.batchData.status === 'PAID') {
      this.toaster.showInfo('This batch has already been marked as paid.');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirm Payment',
      message: `Are you sure you want to mark the payment batch for ${this.batchData.monthLabel} as PAID? This will update the payroll payout status for ${this.batchData.batchDetails?.employeesCount || 0} employees.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Mark as Paid',
          handler: () => {
            this.executeMarkPaid();
          }
        }
      ]
    });
    await alert.present();
  }

  private executeMarkPaid(): void {
    this.isMarkingPaid = true;
    this.payrollApi.markPaymentBatchPaid({
      month: this.selectedMonth,
      runId: this.batchData?.runId || undefined
    }).subscribe({
      next: (res) => {
        this.isMarkingPaid = false;
        if (res && res.success) {
          this.toaster.showSuccess('Payment batch marked as PAID successfully.');
          if (this.batchData) {
            this.batchData.isPaid = true;
            this.batchData.status = 'PAID';
            if (this.batchData.batchDetails) {
              this.batchData.batchDetails.status = 'PAID';
            }
            if (this.batchData.batchedEmployees) {
              this.batchData.batchedEmployees.forEach(e => e.payment_status = 'PAID');
            }
          }
        } else {
          this.toaster.showError(res?.error || 'Failed to mark batch as paid.');
        }
      },
      error: (err) => {
        this.isMarkingPaid = false;
        console.error('Error marking batch paid:', err);
        this.toaster.showError(err?.error?.error || 'Failed to mark as paid');
      }
    });
  }

  downloadTransferStatement(format: 'excel' | 'text' | 'pdf' = 'excel', bank?: string): void {
    this.isDownloading = true;
    const formatLabel = format === 'excel' ? 'Excel' : format === 'text' ? 'Text' : 'PDF';
    this.toaster.showInfo(`Preparing ${bank ? bank + ' ' : ''}Transfer Statement (${formatLabel})...`);

    this.payrollApi.exportTransferStatement(this.selectedMonth, format, bank).subscribe({
      next: (blob: Blob) => {
        this.isDownloading = false;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const bankSuffix = bank ? `_${bank.replace(/\s+/g, '_')}` : '';
        const ext = format === 'text' ? 'txt' : format === 'pdf' ? 'pdf' : 'xlsx';
        link.download = `Transfer_Statement_${this.selectedMonth}${bankSuffix}.${ext}`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess(`Transfer statement downloaded successfully.`);
      },
      error: (err) => {
        this.isDownloading = false;
        console.error('Error downloading statement:', err);
        this.toaster.showError('Failed to download transfer statement');
      }
    });
  }

  getFilteredEmployees(): EmployeePayoutItem[] {
    const list = this.activeBatchId === 'bank-transfer'
      ? (this.batchData?.batchedEmployees || [])
      : (this.batchData?.nonBatchedEmployees || []);

    return list.filter(emp => {
      const matchSearch = !this.searchTerm ||
        emp.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.employee_number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (emp.bank_name && emp.bank_name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (emp.account_number && emp.account_number.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchBank = this.selectedBankFilter === 'ALL' || emp.bank_name === this.selectedBankFilter;

      return matchSearch && matchBank;
    });
  }

  getUniqueBanks(): string[] {
    if (!this.batchData?.batchedEmployees) return [];
    const banks = new Set<string>();
    this.batchData.batchedEmployees.forEach(e => {
      if (e.bank_name) banks.add(e.bank_name);
    });
    return Array.from(banks).sort();
  }
}

