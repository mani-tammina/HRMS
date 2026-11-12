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

  records: any[] = [];
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
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toaster.showError(err?.error?.message || 'Failed to load bank details');
      },
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
    this.modalCtrl.dismiss({ count: this.records.length });
  }
}

