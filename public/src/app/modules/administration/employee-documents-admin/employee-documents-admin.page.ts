import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmployeeDocumentsService, EmployeeDocument, DocumentType } from 'src/app/core/services/employee-documents.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-documents-admin',
  templateUrl: './employee-documents-admin.page.html',
  styleUrls: ['./employee-documents-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class EmployeeDocumentsAdminPage implements OnInit {
  isLoading = false;

  documents: EmployeeDocument[] = [];
  documentTypes: DocumentType[] = [];
  employeesList: any[] = [];

  // Filter State
  selectedEmployeeId = '';
  selectedDocumentTypeId = '';
  selectedCategory = '';
  selectedFinancialYear = '';
  searchQuery = '';

  financialYears: string[] = [];

  // KPI Stats
  kpiStats = {
    total: 0,
    identity: 0,
    payroll: 0,
    employment: 0,
    form16: 0
  };

  // Modals visibility
  showUploadModal = false;
  showBulkForm16Modal = false;
  showDocTypesModal = false;
  showSummaryModal = false;
  showReplaceModal = false;
  showPreviewModal = false;

  // Single Upload Form Model
  singleUploadModel = {
    employee_id: '',
    document_type_id: '',
    financial_year: '',
    document_name: '',
    remarks: '',
    file: null as File | null
  };
  singleUploadFileName = '';
  isSubmittingSingle = false;

  // Bulk Form 16 Model
  bulkForm16Model = {
    financial_year: '',
    zip_file: null as File | null
  };
  bulkZipFileName = '';
  isSubmittingBulk = false;
  bulkUploadProgress = 0;

  // Bulk Form 16 Summary Report
  bulkSummaryReport: {
    totalFiles: number;
    successCount: number;
    failedCount: number;
    financialYear: string;
    results: any[];
  } | null = null;
  summaryFilterStatus = 'ALL';

  // New Document Type Form Model
  newDocTypeModel = {
    code: '',
    name: '',
    category: 'Other',
    description: '',
    is_required: false
  };
  isSubmittingDocType = false;

  // Replace Document Form Model
  replaceModel = {
    id: 0,
    document_name: '',
    financial_year: '',
    remarks: '',
    file: null as File | null
  };
  replaceFileName = '';
  isSubmittingReplace = false;

  // Preview Modal State
  previewTitle = '';
  previewUrl: SafeResourceUrl | null = null;
  isPreviewImage = false;

  constructor(
    private docService: EmployeeDocumentsService,
    private toaster: ToasterService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.generateFinancialYears();
    this.loadMasterData();
    this.loadAllDocuments();
  }

  generateFinancialYears() {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let y = currentYear + 1; y >= currentYear - 5; y--) {
      years.push(`${y - 1}-${y}`);
    }
    this.financialYears = years;
    this.bulkForm16Model.financial_year = `${currentYear - 1}-${currentYear}`;
  }

  loadMasterData() {
    // Load Document Types
    this.docService.getDocumentTypes().subscribe({
      next: (res) => {
        if (res && res.success) {
          this.documentTypes = res.data || [];
        }
      },
      error: (err) => console.error('Failed to load document types:', err)
    });

    // Load Employee List
    this.http.get<any>(`${environment.apiURL}/api/employees?limit=1000`).subscribe({
      next: (res) => {
        const list = res.data || res.employees || res || [];
        this.employeesList = Array.isArray(list) ? list : [];
      },
      error: (err) => console.error('Failed to load employees list:', err)
    });
  }

  loadAllDocuments() {
    this.isLoading = true;
    const filters = {
      employee_id: this.selectedEmployeeId,
      document_type_id: this.selectedDocumentTypeId,
      category: this.selectedCategory,
      financial_year: this.selectedFinancialYear,
      search: this.searchQuery
    };

    this.docService.getAllEmployeeDocuments(filters).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          this.documents = res.data || [];
          this.computeKpiStats(this.documents);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load employee documents:', err);
        this.toaster.showError('Failed to load documents list');
      }
    });
  }

  computeKpiStats(docs: EmployeeDocument[]) {
    let identity = 0;
    let payroll = 0;
    let employment = 0;
    let form16 = 0;

    docs.forEach(d => {
      const cat = (d.document_category || '').toLowerCase();
      if (cat === 'identity') identity++;
      else if (cat === 'payroll') payroll++;
      else if (cat === 'employment') employment++;

      if (d.document_type_code === 'FORM16') form16++;
    });

    this.kpiStats = {
      total: docs.length,
      identity,
      payroll,
      employment,
      form16
    };
  }

  onFilterChange() {
    this.loadAllDocuments();
  }

  clearFilters() {
    this.selectedEmployeeId = '';
    this.selectedDocumentTypeId = '';
    this.selectedCategory = '';
    this.selectedFinancialYear = '';
    this.searchQuery = '';
    this.loadAllDocuments();
  }

  formatFileSize(bytes: number): string {
    if (!bytes || isNaN(bytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // --- SINGLE UPLOAD MODAL ---
  openUploadModal() {
    this.singleUploadModel = {
      employee_id: '',
      document_type_id: '',
      financial_year: '',
      document_name: '',
      remarks: '',
      file: null
    };
    this.singleUploadFileName = '';
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
  }

  onSingleFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.singleUploadModel.file = file;
      this.singleUploadFileName = file.name;
    }
  }

  submitSingleUpload() {
    if (!this.singleUploadModel.employee_id || !this.singleUploadModel.document_type_id || !this.singleUploadModel.file) {
      this.toaster.showError('Please fill in Employee, Document Type, and select a File');
      return;
    }

    const formData = new FormData();
    formData.append('employee_id', this.singleUploadModel.employee_id);
    formData.append('document_type_id', this.singleUploadModel.document_type_id);
    if (this.singleUploadModel.financial_year) formData.append('financial_year', this.singleUploadModel.financial_year);
    if (this.singleUploadModel.document_name) formData.append('document_name', this.singleUploadModel.document_name);
    if (this.singleUploadModel.remarks) formData.append('remarks', this.singleUploadModel.remarks);
    formData.append('file', this.singleUploadModel.file);

    this.isSubmittingSingle = true;
    this.docService.uploadDocument(formData).subscribe({
      next: (res) => {
        this.isSubmittingSingle = false;
        if (res && res.success) {
          this.toaster.showSuccess('Document uploaded successfully');
          this.closeUploadModal();
          this.loadAllDocuments();
        }
      },
      error: (err) => {
        this.isSubmittingSingle = false;
        console.error('Upload failed:', err);
        const errMsg = err.error?.error || err.error?.message || 'Failed to upload document';
        this.toaster.showError(errMsg);
      }
    });
  }

  // --- BULK FORM 16 MODAL ---
  openBulkForm16Modal() {
    this.bulkForm16Model.zip_file = null;
    this.bulkZipFileName = '';
    this.showBulkForm16Modal = true;
  }

  closeBulkForm16Modal() {
    this.showBulkForm16Modal = false;
  }

  onZipFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.zip')) {
        this.toaster.showError('Please select a valid ZIP archive file (.zip)');
        return;
      }
      this.bulkForm16Model.zip_file = file;
      this.bulkZipFileName = file.name;
    }
  }

  submitBulkForm16() {
    if (!this.bulkForm16Model.financial_year || !this.bulkForm16Model.zip_file) {
      this.toaster.showError('Please select Financial Year and upload a ZIP file');
      return;
    }

    const formData = new FormData();
    formData.append('financial_year', this.bulkForm16Model.financial_year);
    formData.append('zip_file', this.bulkForm16Model.zip_file);

    this.isSubmittingBulk = true;
    this.docService.bulkUploadForm16(formData).subscribe({
      next: (res) => {
        this.isSubmittingBulk = false;
        if (res && res.success) {
          this.toaster.showSuccess(res.message || 'Bulk Form 16 upload completed');
          this.closeBulkForm16Modal();
          this.loadAllDocuments();

          // Show Detailed Summary Report
          if (res.summary && res.results) {
            this.bulkSummaryReport = {
              totalFiles: res.summary.totalFiles,
              successCount: res.summary.successCount,
              failedCount: res.summary.failedCount,
              financialYear: res.summary.financialYear,
              results: res.results
            };
            this.summaryFilterStatus = 'ALL';
            this.showSummaryModal = true;
          }
        }
      },
      error: (err) => {
        this.isSubmittingBulk = false;
        console.error('Bulk upload error:', err);
        const errMsg = err.error?.error || 'Failed to process bulk Form 16 upload';
        this.toaster.showError(errMsg);
      }
    });
  }

  getFilteredSummaryResults() {
    if (!this.bulkSummaryReport || !this.bulkSummaryReport.results) return [];
    if (this.summaryFilterStatus === 'ALL') return this.bulkSummaryReport.results;
    return this.bulkSummaryReport.results.filter(r => r.status.toUpperCase() === this.summaryFilterStatus);
  }

  closeSummaryModal() {
    this.showSummaryModal = false;
    this.bulkSummaryReport = null;
  }

  // --- MASTER DOCUMENT TYPES MODAL ---
  openDocTypesModal() {
    this.newDocTypeModel = {
      code: '',
      name: '',
      category: 'Other',
      description: '',
      is_required: false
    };
    this.showDocTypesModal = true;
  }

  closeDocTypesModal() {
    this.showDocTypesModal = false;
  }

  submitNewDocType() {
    if (!this.newDocTypeModel.code || !this.newDocTypeModel.name) {
      this.toaster.showError('Please fill in Code and Name');
      return;
    }

    this.isSubmittingDocType = true;
    this.docService.createDocumentType(this.newDocTypeModel).subscribe({
      next: (res) => {
        this.isSubmittingDocType = false;
        if (res && res.success) {
          this.toaster.showSuccess('New document type created successfully');
          this.newDocTypeModel = { code: '', name: '', category: 'Other', description: '', is_required: false };
          this.loadMasterData();
        }
      },
      error: (err) => {
        this.isSubmittingDocType = false;
        console.error('Create doc type error:', err);
        const errMsg = err.error?.error || 'Failed to create document type';
        this.toaster.showError(errMsg);
      }
    });
  }

  // --- REPLACE DOCUMENT MODAL ---
  openReplaceModal(doc: EmployeeDocument) {
    this.replaceModel = {
      id: doc.id,
      document_name: doc.document_name,
      financial_year: doc.financial_year || '',
      remarks: doc.remarks || '',
      file: null
    };
    this.replaceFileName = '';
    this.showReplaceModal = true;
  }

  closeReplaceModal() {
    this.showReplaceModal = false;
  }

  onReplaceFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.replaceModel.file = file;
      this.replaceFileName = file.name;
    }
  }

  submitReplaceDocument() {
    const formData = new FormData();
    if (this.replaceModel.document_name) formData.append('document_name', this.replaceModel.document_name);
    if (this.replaceModel.financial_year) formData.append('financial_year', this.replaceModel.financial_year);
    if (this.replaceModel.remarks) formData.append('remarks', this.replaceModel.remarks);
    if (this.replaceModel.file) formData.append('file', this.replaceModel.file);

    this.isSubmittingReplace = true;
    this.docService.updateDocument(this.replaceModel.id, formData).subscribe({
      next: (res) => {
        this.isSubmittingReplace = false;
        if (res && res.success) {
          this.toaster.showSuccess('Document updated successfully');
          this.closeReplaceModal();
          this.loadAllDocuments();
        }
      },
      error: (err) => {
        this.isSubmittingReplace = false;
        console.error('Update error:', err);
        this.toaster.showError(err.error?.error || 'Failed to update document');
      }
    });
  }

  // --- DELETE DOCUMENT ---
  deleteDocument(doc: EmployeeDocument) {
    if (confirm(`Are you sure you want to delete "${doc.document_name}" for ${doc.employee_name}?`)) {
      this.docService.deleteDocument(doc.id).subscribe({
        next: (res) => {
          if (res && res.success) {
            this.toaster.showSuccess('Document deleted successfully');
            this.loadAllDocuments();
          }
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.toaster.showError('Failed to delete document');
        }
      });
    }
  }

  createdObjectUrl: string | null = null;

  // --- PREVIEW & DOWNLOAD ---
  previewDocument(doc: EmployeeDocument) {
    this.previewTitle = `${doc.document_name} - ${doc.employee_name}`;
    this.isPreviewImage = doc.mime_type ? doc.mime_type.startsWith('image/') : false;

    this.docService.previewDocumentBlob(doc.id).subscribe({
      next: (blob: Blob) => {
        if (this.createdObjectUrl) {
          URL.revokeObjectURL(this.createdObjectUrl);
        }
        this.createdObjectUrl = URL.createObjectURL(blob);
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.createdObjectUrl);
        this.showPreviewModal = true;
      },
      error: (err) => {
        console.warn('Blob preview failed, falling back to URL:', err);
        const rawUrl = this.docService.getPreviewUrl(doc.id);
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
        this.showPreviewModal = true;
      }
    });
  }

  closePreviewModal() {
    this.showPreviewModal = false;
    this.previewUrl = null;
    if (this.createdObjectUrl) {
      URL.revokeObjectURL(this.createdObjectUrl);
      this.createdObjectUrl = null;
    }
  }

  downloadDocument(doc: EmployeeDocument) {
    this.docService.downloadDocumentBlob(doc.id).subscribe({
      next: (blob: Blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = doc.original_file_name || doc.document_name || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      },
      error: (err) => {
        console.warn('Blob download failed, falling back to direct URL:', err);
        const downloadUrl = this.docService.getDownloadUrl(doc.id);
        window.open(downloadUrl, '_blank');
      }
    });
  }
}
