import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EmployeeDocumentsService, EmployeeDocument } from 'src/app/core/services/employee-documents.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-document-tab',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DocumentTabComponent implements OnInit, OnChanges {
  @Input() currentEmployee: any;

  isLoading = false;
  activeCategory = 'All';
  categories = ['All', 'Identity', 'Payroll', 'Employment', 'Other'];

  groupedDocuments: Record<string, EmployeeDocument[]> = {
    Identity: [],
    Payroll: [],
    Employment: [],
    Other: []
  };

  allDocuments: EmployeeDocument[] = [];

  // Preview Modal state
  showPreviewModal = false;
  previewTitle = '';
  previewUrl: SafeResourceUrl | null = null;
  isPreviewImage = false;

  constructor(
    private docService: EmployeeDocumentsService,
    private toaster: ToasterService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.currentEmployee && this.currentEmployee.id) {
      this.loadEmployeeDocuments();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentEmployee'] && this.currentEmployee && this.currentEmployee.id) {
      this.loadEmployeeDocuments();
    }
  }

  loadEmployeeDocuments() {
    if (!this.currentEmployee || !this.currentEmployee.id) return;
    this.isLoading = true;

    this.docService.getEmployeeDocuments(this.currentEmployee.id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          this.groupedDocuments = res.grouped || {
            Identity: [],
            Payroll: [],
            Employment: [],
            Other: []
          };
          this.allDocuments = res.documents || [];
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching documents:', err);
        this.toaster.showError('Failed to load employee documents');
      }
    });
  }

  selectCategory(cat: string) {
    this.activeCategory = cat;
  }

  getCategoryCount(cat: string): number {
    if (!this.groupedDocuments || !cat) return 0;
    return this.groupedDocuments[cat] ? this.groupedDocuments[cat].length : 0;
  }

  getFilteredDocuments(): EmployeeDocument[] {
    if (this.activeCategory === 'All') {
      return this.allDocuments;
    }
    return this.groupedDocuments[this.activeCategory] || [];
  }

  formatFileSize(bytes: number): string {
    if (!bytes || isNaN(bytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  createdObjectUrl: string | null = null;

  previewDocument(doc: EmployeeDocument) {
    this.previewTitle = doc.document_name || doc.original_file_name;
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

  getCategoryIcon(cat?: string): string {
    switch (cat) {
      case 'Identity': return 'card-outline';
      case 'Payroll': return 'cash-outline';
      case 'Employment': return 'briefcase-outline';
      default: return 'folder-open-outline';
    }
  }

  getFileIcon(mimeType?: string): string {
    if (!mimeType) return 'document-text-outline';
    if (mimeType.includes('pdf')) return 'document-attach-outline';
    if (mimeType.includes('image')) return 'image-outline';
    return 'document-text-outline';
  }
}
