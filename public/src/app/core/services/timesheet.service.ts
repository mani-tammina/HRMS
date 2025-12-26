import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Timesheet {
  id: number;
  employee_id: number;
  date: string;
  timesheet_type?: string;
  hours_breakdown?: {
    work_mode?: string;
    shift_start?: string;
    shift_end?: string;
    regular_hours?: number;
    overtime_hours?: number;
    tasks?: string;
  };
  total_hours: number;
  notes?: string;
  status: string;
  submission_date?: string;
  verified_by?: number;
  verified_at?: string;
  // Legacy fields for backward compatibility
  timesheet_date?: string;
  work_mode?: string;
  shift_start_time?: string;
  shift_end_time?: string;
  actual_hours_worked?: number;
  regular_hours?: number;
  overtime_hours?: number;
  tasks_completed?: string;
  challenges_faced?: string;
  submission_timestamp?: string | null;
}

export interface ProjectTimesheet {
  id: number;
  employee_id: number;
  project_id: number;
  project_name?: string;
  client_name?: string;
  date: string;
  timesheet_type: string;
  total_hours: number;
  hours_breakdown?: any;
  work_description?: string;
  notes?: string;
  status: string;
  submission_date?: string;
  verified_by?: number;
  verified_at?: string;
  client_timesheet_file?: string;
}

export interface AssignmentStatus {
  has_project: boolean;
  assignments: any[];
  timesheet_type: 'project_based' | 'regular';
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
  checkAssignment(): Observable<AssignmentStatus> {
    console.log('TimesheetService: Checking assignment status');
    return this.http.get<AssignmentStatus>(
      `${this.apiUrl}/assignment-status`
    );
  }

  // Submit Regular Timesheet (Non-Project)
  submitRegularTimesheet(data: {
    date: string;
    hours_breakdown?: any;
    total_hours: number;
    notes?: string;
  }): Observable<{ success: boolean; message: string; timesheet_id?: number }> {
    console.log('TimesheetService: Submitting regular timesheet', data);
    return this.http.post<{ success: boolean; message: string; timesheet_id?: number }>(
      `${this.apiUrl}/regular/submit`,
      data
    );
  }

  // Submit Project-Based Timesheet
  submitProjectTimesheet(data: {
    date: string;
    project_id: number;
    hours_breakdown?: any;
    total_hours: number;
    work_description?: string;
    notes?: string;
  }): Observable<{ success: boolean; message: string; timesheet_id?: number }> {
    console.log('TimesheetService: Submitting project timesheet', data);
    return this.http.post<{ success: boolean; message: string; timesheet_id?: number }>(
      `${this.apiUrl}/project/submit`,
      data
    );
  }

  // Get My Regular Timesheets
  getMyRegularTimesheets(startDate?: string, endDate?: string, month?: number, year?: number): Observable<any[]> {
    let params: any = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    if (month) params.month = month.toString();
    if (year) params.year = year.toString();

    console.log('TimesheetService: Fetching regular timesheets', params);
    return this.http.get<any[]>(
      `${this.apiUrl}/regular/my-timesheets`,
      { params }
    );
  }

  // Get My Project Timesheets
  getMyProjectTimesheets(startDate?: string, endDate?: string, month?: number, year?: number, projectId?: number): Observable<any[]> {
    let params: any = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    if (month) params.month = month.toString();
    if (year) params.year = year.toString();
    if (projectId) params.project_id = projectId.toString();

    console.log('TimesheetService: Fetching project timesheets', params);
    return this.http.get<any[]>(
      `${this.apiUrl}/project/my-timesheets`,
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
