import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { EmployeeDocumentService, EmployeeDocument, DocumentType } from 'src/app/core/services/employee-document.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-documents',
  templateUrl: './employee-documents.page.html',
  styleUrls: ['./employee-documents.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class EmployeeDocumentsPage implements OnInit {
  documents: EmployeeDocument[] = [];
  documentTypes: DocumentType[] = [];
  employeesList: any[] = [];
  isLoading: boolean = false;

  // Filters
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedDocTypeId: string = '';
  selectedFinancialYear: string = '';

  // Metrics
  totalDocsCount: number = 0;
  form16Count: number = 0;

  // Modal Flags
  showBulkModal: boolean = false;
  showSingleUploadModal: boolean = false;
  showSummaryModal: boolean = false;

  // Bulk Upload Form State
  bulkFinancialYear: string = '2024-2025';
  bulkFiles: File[] = [];
  isProcessingBulk: boolean = false;
  bulkSummaryReport: any = null;

  // Single Upload Form State
  singleEmployeeId: number | null = null;
  singleDocTypeId: number | null = null;
  singleFinancialYear: string = '';
  singleDocName: string = '';
  singleRemarks: string = '';
  singleFile: File | null = null;
  isUploadingSingle: boolean = false;

  financialYears: string[] = ['2025-2026', '2024-2025', '2023-2024', '2022-2023'];

  constructor(
    private docService: EmployeeDocumentService,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadDocumentTypes();
    this.loadEmployeesList();
    this.loadDocuments();
  }

  loadDocumentTypes() {
    this.docService.getDocumentTypes().subscribe({
      next: (res) => {
        if (res && res.success) {
          this.documentTypes = res.data;
        }
      }
    });
  }

  loadEmployeesList() {
    this.http.get<any>(`${environment.apiURL}/api/employees`).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.employeesList = res.data || [];
        } else if (Array.isArray(res)) {
          this.employeesList = res;
        }
      },
      error: () => {}
    });
  }

  loadDocuments() {
    this.isLoading = true;
    this.docService.getAllDocuments({
      search: this.searchTerm,
      category: this.selectedCategory,
      document_type_id: this.selectedDocTypeId ? parseInt(this.selectedDocTypeId, 10) : undefined,
      financial_year: this.selectedFinancialYear
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          this.documents = res.data || [];
          this.totalDocsCount = this.documents.length;
          this.form16Count = this.documents.filter(d => d.document_type_code === 'FORM16').length;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.showToast('Failed to load document records', 'danger');
      }
    });
  }

  applyFilters() {
    this.loadDocuments();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedDocTypeId = '';
    this.selectedFinancialYear = '';
    this.loadDocuments();
  }

  // --- BULK FORM 16 HANDLERS ---
  openBulkUploadModal() {
    this.bulkFiles = [];
    this.bulkFinancialYear = '2024-2025';
    this.showBulkModal = true;
  }

  closeBulkUploadModal() {
    this.showBulkModal = false;
  }

  onBulkFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.bulkFiles = Array.from(event.target.files);
    }
  }

  async processBulkForm16() {
    if (this.bulkFiles.length === 0) {
      this.showToast('Please select at least one Form 16 PDF or ZIP file', 'warning');
      return;
    }

    this.isProcessingBulk = true;
    const formData = new FormData();
    formData.append('financial_year', this.bulkFinancialYear);

    for (let i = 0; i < this.bulkFiles.length; i++) {
      formData.append('files', this.bulkFiles[i]);
    }

    const loader = await this.loadingCtrl.create({
      message: 'Parsing PDFs & Matching Employee PAN numbers...',
      backdropDismiss: false
    });
    await loader.present();

    this.docService.bulkForm16Upload(formData).subscribe({
      next: (res) => {
        loader.dismiss();
        this.isProcessingBulk = false;
        this.showBulkModal = false;
        if (res && res.success) {
          this.bulkSummaryReport = res.summary;
          this.showSummaryModal = true;
          this.loadDocuments();
          this.showToast('Bulk Form 16 upload processed successfully!', 'success');
        } else {
          this.showToast(res.message || 'Bulk upload failed', 'danger');
        }
      },
      error: (err) => {
        loader.dismiss();
        this.isProcessingBulk = false;
        this.showToast('Server error during bulk processing', 'danger');
      }
    });
  }

  closeSummaryModal() {
    this.showSummaryModal = false;
  }

  // --- SINGLE UPLOAD HANDLERS ---
  openSingleUploadModal() {
    this.singleEmployeeId = null;
    this.singleDocTypeId = null;
    this.singleFinancialYear = '';
    this.singleDocName = '';
    this.singleRemarks = '';
    this.singleFile = null;
    this.showSingleUploadModal = true;
  }

  closeSingleUploadModal() {
    this.showSingleUploadModal = false;
  }

  onSingleFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.singleFile = event.target.files[0];
      if (!this.singleDocName) {
        this.singleDocName = this.singleFile ? this.singleFile.name : '';
      }
    }
  }

  uploadSingleDocument() {
    if (!this.singleEmployeeId || !this.singleDocTypeId || !this.singleFile) {
      this.showToast('Please fill all required fields and choose a file', 'warning');
      return;
    }

    this.isUploadingSingle = true;
    const formData = new FormData();
    formData.append('employee_id', this.singleEmployeeId.toString());
    formData.append('document_type_id', this.singleDocTypeId.toString());
    formData.append('document_name', this.singleDocName || this.singleFile.name);
    if (this.singleFinancialYear) formData.append('financial_year', this.singleFinancialYear);
    if (this.singleRemarks) formData.append('remarks', this.singleRemarks);
    formData.append('file', this.singleFile);

    this.docService.uploadSingleDocument(formData).subscribe({
      next: (res) => {
        this.isUploadingSingle = false;
        this.showSingleUploadModal = false;
        if (res && res.success) {
          this.showToast('Document uploaded successfully', 'success');
          this.loadDocuments();
        } else {
          this.showToast(res.message || 'Upload failed', 'danger');
        }
      },
      error: () => {
        this.isUploadingSingle = false;
        this.showToast('Error uploading file', 'danger');
      }
    });
  }

  // --- FILE ACTIONS ---
  downloadDoc(doc: EmployeeDocument) {
    window.open(this.docService.getDownloadUrl(doc.id), '_blank');
  }

  previewDoc(doc: EmployeeDocument) {
    window.open(this.docService.getPreviewUrl(doc.id), '_blank');
  }

  async confirmDelete(doc: EmployeeDocument) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deactivation',
      message: `Are you sure you want to deactivate document "${doc.document_name}" for ${doc.FirstName || ''} ${doc.LastName || ''}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Deactivate',
          role: 'destructive',
          handler: () => {
            this.docService.deleteDocument(doc.id).subscribe({
              next: (res) => {
                if (res && res.success) {
                  this.showToast('Document deactivated', 'success');
                  this.loadDocuments();
                }
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  formatBytes(bytes: number, decimals = 1): string {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  async showToast(msg: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}
