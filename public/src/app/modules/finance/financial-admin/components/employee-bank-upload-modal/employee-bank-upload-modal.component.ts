import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { FinanceAdminService } from '../../../../../core/services/finance-admin.service';
import { ToasterService } from '../../../../../core/services/toaster.service';

@Component({
  selector: 'app-employee-bank-upload-modal',
  templateUrl: './employee-bank-upload-modal.component.html',
  styleUrls: ['./employee-bank-upload-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EmployeeBankUploadModalComponent implements OnInit {
  isLoading = false;
  isUploading = false;
  isDownloadingTemplate = false;
  searchQuery = '';
  selectedFileName = '';

  activeTab: 'all' | 'available' | 'missing' = 'all';
  selectedPaymentMode = 'ALL';

  records: any[] = [];
  stats = {
    total: 0,
    available: 0,
    missing: 0,
  };

  uploadResult: {
    processed: number;
    inserted: number;
    updated: number;
    skipped: number;
    errors: string[];
  } | null = null;

  constructor(
    private modalCtrl: ModalController,
    private financeService: FinanceAdminService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.isLoading = true;
    this.financeService.getEmployeeBankDetails(this.searchQuery).subscribe({
      next: (res) => {
        this.records = Array.isArray(res?.data) ? res.data : [];
        if (res?.stats) {
          this.stats = res.stats;
        } else {
          this.recalculateStats();
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toaster.showError(err?.error?.message || 'Failed to load bank details');
      },
    });
  }

  recalculateStats(): void {
    this.stats.total = this.records.length;
    this.stats.available = this.records.filter((r) => this.isBankAvailable(r)).length;
    this.stats.missing = this.records.filter((r) => !this.isBankAvailable(r)).length;
  }

  isBankAvailable(row: any): boolean {
    if (row.bank_status === 'AVAILABLE') return true;
    if (row.bank_status === 'MISSING') return false;
    const b = (row.Bank || '').trim();
    const acc = (row.BankAccountNo || '').trim();
    return Boolean(b && b !== 'No Bank Details' && b !== 'N/A' && acc && acc !== 'N/A');
  }

  setTab(tab: 'all' | 'available' | 'missing'): void {
    this.activeTab = tab;
  }

  getUniquePaymentModes(): string[] {
    const modes = new Set<string>();
    this.records.forEach((r) => {
      const mode = (r.PaymentMode || 'Not Set').trim();
      if (mode) modes.add(mode);
    });
    return Array.from(modes).sort();
  }

  getFilteredRecords(): any[] {
    return this.records.filter((row) => {
      // 1. Tab filter
      const available = this.isBankAvailable(row);
      if (this.activeTab === 'available' && !available) {
        return false;
      }
      if (this.activeTab === 'missing' && available) {
        return false;
      }

      // 2. Payment mode filter
      if (this.selectedPaymentMode !== 'ALL') {
        const mode = (row.PaymentMode || 'Not Set').trim().toLowerCase();
        if (mode !== this.selectedPaymentMode.trim().toLowerCase()) {
          return false;
        }
      }

      // 3. Search query filter
      if (this.searchQuery && this.searchQuery.trim()) {
        const q = this.searchQuery.trim().toLowerCase();
        const empno = (row.Empno || '').toLowerCase();
        const name = (row.Name || '').toLowerCase();
        const dept = (row.Department || '').toLowerCase();
        const bank = (row.Bank || '').toLowerCase();
        const ifsc = (row.IFSCCode || '').toLowerCase();
        const acc = (row.BankAccountNo || '').toLowerCase();
        const mode = (row.PaymentMode || '').toLowerCase();

        return (
          empno.includes(q) ||
          name.includes(q) ||
          dept.includes(q) ||
          bank.includes(q) ||
          ifsc.includes(q) ||
          acc.includes(q) ||
          mode.includes(q)
        );
      }

      return true;
    });
  }

  onSearchChange(): void {
    this.loadRecords();
  }

  downloadTemplate(): void {
    this.isDownloadingTemplate = true;
    this.financeService.downloadBankDetailsTemplate().subscribe({
      next: (blob: Blob) => {
        this.isDownloadingTemplate = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Employee_BankDetails_Template.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.isDownloadingTemplate = false;
        this.toaster.showError('Failed to download Excel template');
      },
    });
  }

  onFileSelected(event: any): void {
    const file: File | undefined = event?.target?.files?.[0];
    if (!file) return;

    this.selectedFileName = file.name;
    this.isUploading = true;
    this.uploadResult = null;

    this.financeService.uploadEmployeeBankDetails(file).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res?.success) {
          this.uploadResult = {
            processed: res.processed ?? 0,
            inserted: res.inserted ?? 0,
            updated: res.updated ?? 0,
            skipped: res.skipped ?? 0,
            errors: Array.isArray(res.errors) ? res.errors : [],
          };
          this.toaster.showSuccess(
            `Uploaded: ${this.uploadResult.inserted} inserted, ${this.uploadResult.updated} updated` +
              (this.uploadResult.skipped > 0 ? `, ${this.uploadResult.skipped} skipped` : '')
          );
          this.loadRecords();
        } else {
          this.toaster.showError(res?.message || 'Upload failed');
        }
      },
      error: (err) => {
        this.isUploading = false;
        this.toaster.showError(err?.error?.message || 'Failed to upload Excel file');
      },
    });

    event.target.value = '';
  }

  dismiss(): void {
    this.modalCtrl.dismiss({ count: this.stats.available || this.records.length });
  }
}
