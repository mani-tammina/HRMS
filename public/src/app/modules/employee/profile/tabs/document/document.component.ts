import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EmployeeDocumentService, EmployeeDocument } from 'src/app/core/services/employee-document.service';

@Component({
  selector: 'app-document-tab',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class DocumentTabComponent implements OnInit, OnChanges {
  @Input() currentEmployee: any;

  isLoading: boolean = false;
  documents: EmployeeDocument[] = [];
  
  // Active state
  selectedFolder: string = 'Payroll';
  selectedFinancialYear: string = '';
  searchTerm: string = '';

  // Dynamic financial years list
  financialYears: string[] = ['2026-2027', '2025-2026', '2024-2025', '2023-2024'];

  constructor(private docService: EmployeeDocumentService) {}

  ngOnInit() {
    this.loadDocuments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentEmployee'] && changes['currentEmployee'].currentValue) {
      this.loadDocuments();
    }
  }

  loadDocuments() {
    this.isLoading = true;

    if (this.currentEmployee && this.currentEmployee.id) {
      this.docService.getEmployeeDocuments(this.currentEmployee.id).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res && res.success && res.data) {
            this.documents = res.data.documents || [];
            this.extractFinancialYears();
          }
        },
        error: () => {
          this.isLoading = false;
          this.fetchMyDocsFallback();
        }
      });
    } else {
      this.fetchMyDocsFallback();
    }
  }

  fetchMyDocsFallback() {
    this.docService.getMyDocuments().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success && res.data) {
          this.documents = res.data.documents || [];
          this.extractFinancialYears();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load documents', err);
      }
    });
  }

  /** Extract unique financial years from uploaded Form 16 documents */
  extractFinancialYears() {
    const yearsSet = new Set<string>(['2026-2027', '2025-2026', '2024-2025', '2023-2024']);
    this.documents.forEach(d => {
      if (d.financial_year) {
        yearsSet.add(d.financial_year);
      }
    });
    this.financialYears = Array.from(yearsSet).sort().reverse();
  }

  selectFolder(folder: string) {
    this.selectedFolder = folder;
  }

  applyYearFilter() {
    // Triggers change detection for currentFolderDocs
  }

  onSearchChange() {
    // Triggers change detection for currentFolderDocs
  }

  /** Get count of documents per folder */
  getDocsCount(folder: string): number {
    if (!this.documents) return 0;
    return this.documents.filter(d => this.matchesFolder(d, folder)).length;
  }

  /** Check if a document belongs to a specific folder */
  private matchesFolder(doc: EmployeeDocument, folder: string): boolean {
    const cat = (doc.category || '').toLowerCase();
    const code = (doc.document_type_code || '').toLowerCase();

    switch (folder) {
      case 'Payroll':
        return cat === 'payroll' || code === 'form16';
      case 'Identity':
        return cat === 'identity' || ['pan_card', 'aadhaar', 'voter_id', 'passport', 'driving_license', 'bank_passbook'].includes(code);
      case 'Degrees':
        return cat === 'degrees' || cat === 'education' || code === 'education_cert';
      case 'Employment':
        return cat === 'employment' || ['offer_letter', 'appointment_letter'].includes(code);
      default:
        return cat === 'other' || (!['payroll', 'identity', 'degrees', 'education', 'employment'].includes(cat) && code !== 'form16');
    }
  }

  /** Get filtered documents for the current folder, year filter, and search term */
  get currentFolderDocs(): EmployeeDocument[] {
    if (!this.documents) return [];

    return this.documents.filter(doc => {
      // 1. Folder check
      const matchesFolder = this.matchesFolder(doc, this.selectedFolder);
      if (!matchesFolder) return false;

      // 2. Financial Year filter (for Form 16 / Payroll folder)
      if (this.selectedFolder === 'Payroll' && this.selectedFinancialYear) {
        if (doc.financial_year !== this.selectedFinancialYear) {
          return false;
        }
      }

      // 3. Search Term filter
      if (this.searchTerm && this.searchTerm.trim() !== '') {
        const query = this.searchTerm.toLowerCase().trim();
        const docName = (doc.document_name || '').toLowerCase();
        const fileName = (doc.original_file_name || '').toLowerCase();
        const typeName = (doc.document_type_name || '').toLowerCase();
        const fy = (doc.financial_year || '').toLowerCase();

        return docName.includes(query) || fileName.includes(query) || typeName.includes(query) || fy.includes(query);
      }

      return true;
    });
  }

  getFolderTitle(): string {
    switch (this.selectedFolder) {
      case 'Payroll': return 'Form 16 & Payroll Documents';
      case 'Identity': return 'Identity & Proof Documents';
      case 'Degrees': return 'Degrees & Certificates';
      case 'Employment': return 'Employment Documents';
      default: return 'Other Documents';
    }
  }

  getFolderDescription(): string {
    switch (this.selectedFolder) {
      case 'Payroll': return 'This section contains annual Form 16 tax deduction certificates and financial statements.';
      case 'Identity': return 'This section contains identity proof documents on record such as PAN Card, Aadhaar, Passport, etc.';
      case 'Degrees': return 'This section contains details about all educational degrees, marksheets, and certificates.';
      case 'Employment': return 'This section contains employment contract letters, offer letters, and appointment letters.';
      default: return 'This section contains miscellaneous employee records and general attachments.';
    }
  }

  getCategoryClass(category?: string): string {
    return category || this.selectedFolder;
  }

  getDocIcon(doc: EmployeeDocument): string {
    const code = (doc.document_type_code || '').toUpperCase();
    if (code === 'FORM16') return 'cash-outline';
    if (['PAN_CARD', 'AADHAAR', 'VOTER_ID', 'PASSPORT', 'DRIVING_LICENSE'].includes(code)) return 'id-card-outline';
    if (code === 'EDUCATION_CERT') return 'school-outline';
    if (['OFFER_LETTER', 'APPOINTMENT_LETTER'].includes(code)) return 'briefcase-outline';
    return 'document-text-outline';
  }

  formatBytes(bytes: number, decimals = 1): string {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  downloadFile(doc: EmployeeDocument) {
    this.docService.downloadDocumentBlob(doc.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.original_file_name || `${doc.document_name}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        const url = this.docService.getDownloadUrl(doc.id);
        window.open(url, '_blank');
      }
    });
  }

  previewFile(doc: EmployeeDocument) {
    this.docService.previewDocumentBlob(doc.id).subscribe({
      next: (blob: Blob) => {
        const fileBlob = new Blob([blob], { type: doc.mime_type || 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(fileBlob);
        window.open(blobUrl, '_blank');
      },
      error: () => {
        const url = this.docService.getPreviewUrl(doc.id);
        window.open(url, '_blank');
      }
    });
  }
}
