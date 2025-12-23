import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Project {
  assignment_id: number;
  employee_id: number;
  project_id: number;
  project_code: string;
  project_name: string;
  client_name: string;
  role_in_project: string;
  allocation_percentage: number;
  assignment_start_date: string;
  assignment_end_date: string | null;
  shift_id: number;
  shift_type: string;
  shift_name: string;
  start_time: string;
  end_time: string;
  timezone: string;
  assignment_status: string;
}

export interface WorkUpdate {
  id: number;
  employee_id: number;
  project_id: number;
  project_name: string;
  client_name: string;
  update_date: string;
  shift_start_time: string;
  shift_end_time: string;
  hours_worked: number;
  work_description: string;
  tasks_completed: string;
  challenges_faced: string;
  status: string;
  submission_timestamp: string | null;
  shift_name: string;
  shift_type: string;
  timesheet_id?: number;
  file_name: string | null;
  is_verified: boolean;
  verification_status: string | null;
  verification_notes: string | null;
}

export interface ComplianceStatus {
  compliance_date: string;
  project_id: number;
  project_name: string;
  client_name: string;
  has_work_update: boolean;
  has_client_timesheet: boolean;
  compliance_status: string;
  reminder_count: number;
  shift_name: string;
  shift_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkUpdatesService {
  private apiUrl = `${environment.apiUrl}/work-updates`;

  constructor(private http: HttpClient) {}

  getMyProjects(): Observable<{ success: boolean; projects: Project[]; message?: string }> {
    return this.http.get<{ success: boolean; projects: Project[]; message?: string }>(
      `${this.apiUrl}/my-projects`
    );
  }

  getMyUpdates(startDate?: string, endDate?: string, projectId?: number, status?: string): 
    Observable<{ success: boolean; updates: WorkUpdate[] }> {
    let params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (projectId) params.projectId = projectId.toString();
    if (status) params.status = status;

    return this.http.get<{ success: boolean; updates: WorkUpdate[] }>(
      `${this.apiUrl}/my-updates`,
      { params }
    );
  }

  submitWorkUpdate(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, formData);
  }

  deleteWorkUpdate(updateId: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${updateId}`
    );
  }

  getComplianceStatus(startDate?: string, endDate?: string): 
    Observable<{ success: boolean; compliance: ComplianceStatus[] }> {
    let params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return this.http.get<{ success: boolean; compliance: ComplianceStatus[] }>(
      `${this.apiUrl}/compliance-status`,
      { params }
    );
  }

  downloadTimesheet(timesheetId: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/download-timesheet/${timesheetId}`,
      { responseType: 'blob' }
    );
  }
}
