import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface DocumentType {
  id: number;
  code: string;
  name: string;
  category: 'Identity' | 'Payroll' | 'Employment' | 'Other';
  description?: string;
  is_required: number;
  is_active: number;
}

export interface EmployeeDocument {
  id: number;
  employee_id: number;
  document_type_id: number;
  financial_year?: string;
  document_name: string;
  original_file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  version: number;
  uploaded_by: number;
  uploaded_at: string;
  is_active: number;
  remarks?: string;
  employee_name?: string;
  employee_number?: string;
  document_type_code?: string;
  document_type_name?: string;
  document_category?: string;
  uploaded_by_name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentsService {
  private env = environment;
  private baseUrl = `${this.env.apiURL}/api`;

  constructor(private http: HttpClient) {}

  /**
   * Get all active master document types
   */
  getDocumentTypes(): Observable<{ success: boolean; data: DocumentType[] }> {
    return this.http.get<{ success: boolean; data: DocumentType[] }>(`${this.baseUrl}/document-types`);
  }

  /**
   * Create a new document type (HR/Admin only)
   */
  createDocumentType(payload: {
    code: string;
    name: string;
    category?: string;
    description?: string;
    is_required?: boolean;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/document-types`, payload);
  }

  /**
   * Filter and list all employee documents across the organization (HR/Admin view)
   */
  getAllEmployeeDocuments(filters?: {
    employee_id?: number | string;
    document_type_id?: number | string;
    category?: string;
    financial_year?: string;
    search?: string;
  }): Observable<{ success: boolean; count: number; data: EmployeeDocument[] }> {
    let params = new HttpParams();
    if (filters) {
      if (filters.employee_id) params = params.set('employee_id', String(filters.employee_id));
      if (filters.document_type_id) params = params.set('document_type_id', String(filters.document_type_id));
      if (filters.category) params = params.set('category', filters.category);
      if (filters.financial_year) params = params.set('financial_year', filters.financial_year);
      if (filters.search) params = params.set('search', filters.search);
    }
    return this.http.get<{ success: boolean; count: number; data: EmployeeDocument[] }>(
      `${this.baseUrl}/employee-documents`,
      { params }
    );
  }

  /**
   * Get documents for a specific employee (Grouped by category)
   */
  getEmployeeDocuments(employeeId: number): Observable<{
    success: boolean;
    employee_id: number;
    total_documents: number;
    grouped: {
      Identity: EmployeeDocument[];
      Payroll: EmployeeDocument[];
      Employment: EmployeeDocument[];
      Other: EmployeeDocument[];
    };
    documents: EmployeeDocument[];
  }> {
    return this.http.get<any>(`${this.baseUrl}/employee-documents/${employeeId}`);
  }

  /**
   * Upload an individual employee document
   */
  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee-documents/upload`, formData);
  }

  /**
   * Bulk upload Form 16 ZIP archive
   */
  bulkUploadForm16(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee-documents/bulk-form16`, formData);
  }

  /**
   * Update/Replace document
   */
  updateDocument(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/employee-documents/${id}`, formData);
  }

  /**
   * Soft delete document
   */
  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employee-documents/${id}`);
  }

  private getAuthToken(): string {
    return localStorage.getItem('token') || localStorage.getItem('access_token') || '';
  }

  /**
   * Get Download API URL for a document
   */
  getDownloadUrl(id: number): string {
    const token = this.getAuthToken();
    return `${this.baseUrl}/employee-documents/download/${id}?token=${encodeURIComponent(token)}`;
  }

  /**
   * Get Preview API URL for a document
   */
  getPreviewUrl(id: number): string {
    const token = this.getAuthToken();
    return `${this.baseUrl}/employee-documents/preview/${id}?token=${encodeURIComponent(token)}`;
  }

  /**
   * Fetch Document Preview as Blob via HttpClient
   */
  previewDocumentBlob(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/employee-documents/preview/${id}`, {
      responseType: 'blob'
    });
  }

  /**
   * Fetch Document for Download as Blob via HttpClient
   */
  downloadDocumentBlob(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/employee-documents/download/${id}`, {
      responseType: 'blob'
    });
  }
}
