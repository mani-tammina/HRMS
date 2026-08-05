import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface DocumentType {
  id: number;
  code: string;
  name: string;
  category: 'Identity' | 'Payroll' | 'Employment' | 'Other';
  is_system: number;
}

export interface EmployeeDocument {
  id: number;
  employee_id: number;
  EmployeeNumber?: string;
  FirstName?: string;
  LastName?: string;
  PANNumber?: string;
  document_type_id: number;
  document_type_code: string;
  document_type_name: string;
  category: 'Identity' | 'Payroll' | 'Employment' | 'Other';
  financial_year?: string;
  document_name: string;
  original_file_name: string;
  file_size: number;
  mime_type: string;
  version: number;
  uploaded_at: string;
  remarks?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentService {
  private apiUrl = `${environment.apiURL}/api/employee-documents`;

  constructor(private http: HttpClient) {}

  /** Get standard document types master */
  getDocumentTypes(): Observable<{ success: boolean; data: DocumentType[] }> {
    return this.http.get<{ success: boolean; data: DocumentType[] }>(`${this.apiUrl}/types`);
  }

  /** Add custom document type */
  addDocumentType(name: string, category: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/types`, { name, category });
  }

  /** Get logged-in employee's own documents and PAN number */
  getMyDocuments(): Observable<{ success: boolean; data: { pan_number: string; employee_id: number; documents: EmployeeDocument[] } }> {
    return this.http.get<any>(`${this.apiUrl}/my-documents`);
  }

  /** Get documents for a specific employee (HR View) */
  getEmployeeDocuments(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employee/${employeeId}`);
  }

  /** Get all document records (HR Dashboard) */
  getAllDocuments(filters?: { search?: string; document_type_id?: number; financial_year?: string; category?: string }): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.document_type_id) params = params.set('document_type_id', filters.document_type_id.toString());
      if (filters.financial_year) params = params.set('financial_year', filters.financial_year);
      if (filters.category) params = params.set('category', filters.category);
    }
    return this.http.get<any>(`${this.apiUrl}/all`, { params });
  }

  /** Single Document Upload */
  uploadSingleDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  /** Bulk Form 16 Upload (ZIP or multiple PDFs) */
  bulkForm16Upload(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bulk-form16`, formData);
  }

  /** Download document as Blob with auth headers */
  downloadDocumentBlob(docId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${docId}`, { responseType: 'blob' });
  }

  /** Preview document as Blob with auth headers */
  previewDocumentBlob(docId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/preview/${docId}`, { responseType: 'blob' });
  }

  /** Helper to get stored auth token */
  private getToken(): string {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || localStorage.getItem('auth_token') || '';
  }

  /** Download URL helper (includes query token for direct window navigation) */
  getDownloadUrl(docId: number): string {
    const token = this.getToken();
    return token ? `${this.apiUrl}/download/${docId}?token=${encodeURIComponent(token)}` : `${this.apiUrl}/download/${docId}`;
  }

  /** Preview URL helper (includes query token for direct window navigation) */
  getPreviewUrl(docId: number): string {
    const token = this.getToken();
    return token ? `${this.apiUrl}/preview/${docId}?token=${encodeURIComponent(token)}` : `${this.apiUrl}/preview/${docId}`;
  }

  /** Soft Delete Document */
  deleteDocument(docId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${docId}`);
  }
}
