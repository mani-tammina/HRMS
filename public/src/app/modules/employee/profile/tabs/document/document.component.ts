import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EmployeeDocumentService, EmployeeDocument } from 'src/app/core/services/employee-document.service';

@Component({
  selector: 'app-document-tab',
  template: `
    <div class="document-tab-container">
      
      <!-- LOADING STATE -->
      <div *ngIf="isLoading" class="loading-container">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
        <p>Loading documents...</p>
      </div>

      <!-- NO DOCUMENTS PLACEHOLDER -->
      <div *ngIf="!isLoading && documents.length === 0" class="placeholder-container">
        <ion-icon name="document-attach-outline"></ion-icon>
        <h3>No Documents Found</h3>
        <p>There are currently no documents uploaded for this employee.</p>
      </div>

      <!-- UPLOADS DOCUMENT LIST (ONLY UPLOADED FILES) -->
      <div *ngIf="!isLoading && documents.length > 0" class="document-list">
        <div *ngFor="let doc of documents" class="doc-card">
          <div class="doc-icon-box">
            <ion-icon name="document-text-outline"></ion-icon>
          </div>

          <div class="doc-info">
            <div class="doc-header">
              <h4 class="doc-title">{{ doc.document_name }}</h4>
              <ion-badge *ngIf="doc.financial_year" color="primary" class="fy-badge">
                FY {{ doc.financial_year }}
              </ion-badge>
            </div>
            <p class="doc-meta">
              <span>{{ doc.original_file_name }}</span> &bull; 
              <span>{{ formatBytes(doc.file_size) }}</span> &bull;
              <span>Uploaded: {{ doc.uploaded_at | date:'mediumDate' }}</span>
            </p>
            <p *ngIf="doc.remarks" class="doc-remarks">{{ doc.remarks }}</p>
          </div>

          <div class="doc-actions">
            <button class="action-btn preview-btn" (click)="previewFile(doc)" title="Preview Document">
              <ion-icon name="eye-outline"></ion-icon>
              <span>Preview</span>
            </button>
            <button class="action-btn download-btn" (click)="downloadFile(doc)" title="Download Document">
              <ion-icon name="download-outline"></ion-icon>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .document-tab-container {
      padding: 12px 4px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 0;
      color: #64748b;

      p {
        margin-top: 12px;
        font-size: 14px;
      }
    }

    .placeholder-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      color: #64748b;

      ion-icon {
        font-size: 56px;
        margin-bottom: 12px;
        color: #cbd5e1;
      }

      h3 {
        font-size: 18px;
        font-weight: 700;
        margin: 0 0 6px 0;
        color: #1e293b;
      }

      p {
        font-size: 14px;
        margin: 0;
        max-width: 320px;
      }
    }

    .document-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .doc-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: border-color 0.15s ease;

      &:hover {
        border-color: #2563eb;
      }

      .doc-icon-box {
        width: 44px;
        height: 44px;
        border-radius: 10px;
        background: #eff6ff;
        color: #2563eb;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        ion-icon {
          font-size: 24px;
        }
      }

      .doc-info {
        flex: 1;

        .doc-header {
          display: flex;
          align-items: center;
          gap: 8px;

          .doc-title {
            margin: 0;
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
          }

          .fy-badge {
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 6px;
          }
        }

        .doc-meta {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: #64748b;
        }

        .doc-remarks {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: #2563eb;
        }
      }

      .doc-actions {
        display: flex;
        align-items: center;
        gap: 8px;

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.15s ease;

          ion-icon {
            font-size: 16px;
          }

          &.preview-btn {
            background: #f1f5f9;
            color: #334155;
            border-color: #cbd5e1;

            &:hover {
              background: #e2e8f0;
              color: #0f172a;
            }
          }

          &.download-btn {
            background: #2563eb;
            color: #ffffff;

            &:hover {
              background: #1d4ed8;
            }
          }
        }
      }
    }
  `],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DocumentTabComponent implements OnInit, OnChanges {
  @Input() currentEmployee: any;

  isLoading: boolean = false;
  documents: EmployeeDocument[] = [];

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
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load documents', err);
      }
    });
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
