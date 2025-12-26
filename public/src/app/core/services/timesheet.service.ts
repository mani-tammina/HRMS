import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Timesheet {
  id: number;
  employee_id: number;
  timesheet_date: string;
  work_mode: string;
  shift_start_time: string;
  shift_end_time: string;
  actual_hours_worked: number;
  regular_hours: number;
  overtime_hours: number;
  tasks_completed: string;
  challenges_faced: string;
  status: string;
  submission_timestamp: string | null;
}

export interface ProjectTimesheet {
  id: number;
  employee_id: number;
  project_id: number;
  project_name: string;
  timesheet_date: string;
  hours_worked: number;
  task_description: string;
  status: string;
}

export interface TimesheetStats {
  total_timesheets: number;
  approved: number;
  pending: number;
  rejected: number;
  compliance_rate: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = `${environment.apiUrl}/timesheets`;

  constructor(private http: HttpClient) {}

  // Check Project Assignment Status
  checkAssignment(): Observable<{ success: boolean; hasAssignment: boolean; projectDetails?: any }> {
    return this.http.get<{ success: boolean; hasAssignment: boolean; projectDetails?: any }>(
      `${this.apiUrl}/check-assignment`
    );
  }

  // Submit Regular Timesheet (Non-Project)
  submitRegularTimesheet(data: {
    timesheet_date: string;
    work_mode: string;
    shift_start_time: string;
    shift_end_time: string;
    actual_hours_worked: number;
    tasks_completed: string;
    challenges_faced?: string;
  }): Observable<{ success: boolean; message: string; timesheet?: Timesheet }> {
    return this.http.post<{ success: boolean; message: string; timesheet?: Timesheet }>(
      `${this.apiUrl}/regular`,
      data
    );
  }

  // Submit Project-Based Timesheet
  submitProjectTimesheet(data: {
    project_id: number;
    timesheet_date: string;
    hours_worked: number;
    task_description: string;
  }): Observable<{ success: boolean; message: string; timesheet?: ProjectTimesheet }> {
    return this.http.post<{ success: boolean; message: string; timesheet?: ProjectTimesheet }>(
      `${this.apiUrl}/project`,
      data
    );
  }

  // Get My Timesheets
  getMyTimesheets(startDate?: string, endDate?: string, status?: string): Observable<{ success: boolean; timesheets: Timesheet[] }> {
    let params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (status) params.status = status;

    return this.http.get<{ success: boolean; timesheets: Timesheet[] }>(
      `${this.apiUrl}/my`,
      { params }
    );
  }

  // Get My Timesheet Statistics
  getMyStats(): Observable<{ success: boolean; statistics: TimesheetStats }> {
    return this.http.get<{ success: boolean; statistics: TimesheetStats }>(
      `${this.apiUrl}/my-stats`
    );
  }

  // Upload Client Timesheet (For validation)
  uploadClientTimesheet(formData: FormData): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/upload-client-timesheet`,
      formData
    );
  }

  // Admin: Get All Timesheets for Validation
  getAllTimesheetsForValidation(startDate?: string, endDate?: string, employeeId?: number): 
    Observable<{ success: boolean; timesheets: any[] }> {
    let params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (employeeId) params.employeeId = employeeId.toString();

    return this.http.get<{ success: boolean; timesheets: any[] }>(
      `${this.apiUrl}/admin/validate`,
      { params }
    );
  }

  // Admin: Validate Timesheet
  validateTimesheet(timesheetId: number, status: string, notes?: string): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/admin/validate/${timesheetId}`,
      { status, notes }
    );
  }

  // Admin: Get Timesheet Statistics
  getAdminStats(startDate?: string, endDate?: string): Observable<{ success: boolean; statistics: any }> {
    let params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return this.http.get<{ success: boolean; statistics: any }>(
      `${this.apiUrl}/admin/stats`,
      { params }
    );
  }
}
