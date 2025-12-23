import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface DashboardData {
  project_id: number;
  project_name: string;
  client_name: string;
  compliance_date: string;
  total_employees: number;
  compliant_count: number;
  update_only_count: number;
  missing_count: number;
  traffic_light_status: 'green' | 'yellow' | 'red';
}

export interface NonCompliantEmployee {
  employee_id: number;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  project_id: number;
  project_name: string;
  client_name: string;
  compliance_date: string;
  compliance_status: string;
  has_work_update: boolean;
  has_client_timesheet: boolean;
  reminder_count: number;
  last_reminder_at: string | null;
  shift_name: string;
  shift_type: string;
}

export interface VerificationQueueItem {
  work_update_id: number;
  employee_id: number;
  employee_code: string;
  first_name: string;
  last_name: string;
  project_id: number;
  project_name: string;
  client_name: string;
  update_date: string;
  hours_worked: number;
  work_description: string;
  tasks_completed: string;
  work_update_status: string;
  submission_timestamp: string;
  timesheet_id: number | null;
  file_name: string | null;
  is_verified: boolean;
  verification_status: string | null;
  verification_notes: string | null;
}

export interface ComparisonData {
  workUpdate: any;
  clientTimesheet: any;
  verificationHistory: any[];
  auditLog: any[];
}

export interface PayrollPeriodLock {
  id: number;
  payroll_period: string;
  lock_status: 'open' | 'review' | 'locked' | 'processed';
  pending_verifications: number;
  flagged_submissions: number;
  locked_by: number | null;
  locked_at: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminTimesheetService {
  private apiUrl = `${environment.apiUrl}/admin/timesheet`;

  constructor(private http: HttpClient) {}

  getDashboard(startDate?: string, endDate?: string, projectId?: number, complianceStatus?: string): 
    Observable<{ success: boolean; dashboard: DashboardData[]; statistics: any }> {
    let params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (projectId) params.projectId = projectId.toString();
    if (complianceStatus) params.complianceStatus = complianceStatus;

    return this.http.get<{ success: boolean; dashboard: DashboardData[]; statistics: any }>(
      `${this.apiUrl}/dashboard`,
      { params }
    );
  }

  getNonCompliantEmployees(date?: string, projectId?: number, complianceType?: string): 
    Observable<{ success: boolean; nonCompliantEmployees: NonCompliantEmployee[]; date: string }> {
    let params: any = {};
    if (date) params.date = date;
    if (projectId) params.projectId = projectId.toString();
    if (complianceType) params.complianceType = complianceType;

    return this.http.get<{ success: boolean; nonCompliantEmployees: NonCompliantEmployee[]; date: string }>(
      `${this.apiUrl}/non-compliant-employees`,
      { params }
    );
  }

  getVerificationQueue(status?: string, projectId?: number, startDate?: string, endDate?: string): 
    Observable<{ success: boolean; verificationQueue: VerificationQueueItem[] }> {
    let params: any = {};
    if (status) params.status = status;
    if (projectId) params.projectId = projectId.toString();
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return this.http.get<{ success: boolean; verificationQueue: VerificationQueueItem[] }>(
      `${this.apiUrl}/verification-queue`,
      { params }
    );
  }

  getComparisonData(workUpdateId: number): Observable<{ success: boolean } & ComparisonData> {
    return this.http.get<{ success: boolean } & ComparisonData>(
      `${this.apiUrl}/comparison/${workUpdateId}`
    );
  }

  verifyWorkUpdate(data: {
    workUpdateId: number;
    verificationStatus: 'approved' | 'flagged' | 'rejected';
    verificationNotes?: string;
    hoursDiscrepancy?: number;
    clientTimesheetId?: number;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/verify`,
      data
    );
  }

  bulkVerify(data: {
    workUpdateIds: number[];
    verificationStatus: 'approved' | 'flagged' | 'rejected';
    verificationNotes?: string;
  }): Observable<{ success: boolean; message: string; successCount: number; failCount: number }> {
    return this.http.post<{ success: boolean; message: string; successCount: number; failCount: number }>(
      `${this.apiUrl}/bulk-verify`,
      data
    );
  }

  getPayrollStatus(payrollPeriod?: string): 
    Observable<{ success: boolean; payrollPeriodLock: PayrollPeriodLock | null; pendingVerifications: any }> {
    let params: any = {};
    if (payrollPeriod) params.payrollPeriod = payrollPeriod;

    return this.http.get<{ success: boolean; payrollPeriodLock: PayrollPeriodLock | null; pendingVerifications: any }>(
      `${this.apiUrl}/payroll-status`,
      { params }
    );
  }

  lockPayrollPeriod(payrollPeriod: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/lock-payroll-period`,
      { payrollPeriod }
    );
  }

  downloadTimesheet(timesheetId: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/download/${timesheetId}`,
      { responseType: 'blob' }
    );
  }
}
