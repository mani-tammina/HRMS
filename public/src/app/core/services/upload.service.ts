import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface UploadResult {
  success: boolean;
  message: string;
  totalRecords?: number;
  successCount?: number;
  errorCount?: number;
  errors?: Array<{
    row: number;
    error: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  // Upload Employees
  uploadEmployees(file: File): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResult>(
      `${this.apiUrl}/employees`,
      formData
    );
  }

  // Upload Holidays
  uploadHolidays(file: File): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResult>(
      `${this.apiUrl}/holidays`,
      formData
    );
  }

  // Upload Payroll Data
  uploadPayrollData(file: File): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResult>(
      `${this.apiUrl}/payroll`,
      formData
    );
  }

  // Download Sample Templates
  downloadTemplate(type: 'employees' | 'holidays' | 'payroll'): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/template/${type}`,
      { responseType: 'blob' }
    );
  }

  // Validate File Before Upload
  validateFile(file: File, type: string): Observable<{ valid: boolean; errors?: string[] }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.http.post<{ valid: boolean; errors?: string[] }>(
      `${this.apiUrl}/validate`,
      formData
    );
  }
}
