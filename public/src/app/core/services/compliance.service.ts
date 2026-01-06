import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface ComplianceStatus {
  date: string;
  has_active_projects: boolean;
  is_submitted: boolean;
  timesheet_type: 'regular' | 'project';
  submission_details: any;
  status: string;
  pending_client_uploads: any[];
  this_month: {
    submitted_days: number;
    total_hours: number;
    avg_hours: number;
  };
}

export interface ComplianceDashboard {
  today: {
    date: string;
    total_employees: number;
    submitted_count: number;
    pending_count: number;
    non_compliant_count: number;
    compliance_rate: number;
    non_compliant_employees: any[];
  };
  this_week: {
    avg_compliance_rate: number;
    total_submitted: number;
    reminders_sent: number;
    auto_reminders: number;
  };
  this_month: {
    working_days: number;
    completed_days: number;
    avg_compliance_rate: number;
  };
  weekly_trends: any[];
  pending_validations: {
    count: number;
    items: any[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {
  private apiUrl = `${environment.apiUrl}/compliance`;

  constructor(private http: HttpClient) {}

  // Employee endpoints
  getMyComplianceStatus(): Observable<{ success: boolean; compliance: ComplianceStatus }> {
    return this.http.get<any>(`${this.apiUrl}/my-status`);
  }

  getMyComplianceHistory(startDate?: string, endDate?: string): Observable<any> {
    let params = new HttpParams();
    if (startDate) params = params.set('start_date', startDate);
    if (endDate) params = params.set('end_date', endDate);
    return this.http.get<any>(`${this.apiUrl}/my-history`, { params });
  }

  // Manager endpoints
  getManagerDashboard(): Observable<{ success: boolean; dashboard: ComplianceDashboard }> {
    return this.http.get<any>(`${this.apiUrl}/manager/dashboard`);
  }

  getManagerNonCompliantEmployees(date?: string): Observable<any> {
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    return this.http.get<any>(`${this.apiUrl}/manager/non-compliant`, { params });
  }

  getManagerTeamReport(month?: number, year?: number): Observable<any> {
    let params = new HttpParams();
    if (month) params = params.set('month', month.toString());
    if (year) params = params.set('year', year.toString());
    return this.http.get<any>(`${this.apiUrl}/manager/team-report`, { params });
  }

  sendManagerReminders(date?: string, employeeIds?: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/manager/send-reminders`, {
      date,
      employee_ids: employeeIds
    });
  }

  // Admin endpoints
  getAdminDashboard(): Observable<{ success: boolean; dashboard: ComplianceDashboard }> {
    return this.http.get<any>(`${this.apiUrl}/admin/dashboard`);
  }

  getNonCompliantEmployees(date?: string): Observable<any> {
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    return this.http.get<any>(`${this.apiUrl}/admin/non-compliant`, { params });
  }

  sendReminders(date?: string, employeeIds?: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/send-reminders`, {
      date,
      employee_ids: employeeIds
    });
  }

  // Bulk operations
  bulkApproveTimesheets(timesheetIds: number[], notes?: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/bulk-approve`, {
      timesheet_ids: timesheetIds,
      notes
    });
  }

  bulkValidateClientTimesheets(validations: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/bulk-validate-client-timesheets`, {
      validations
    });
  }

  // Month-end closure
  closeMonth(month: number, year: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/close-month`, { month, year });
  }

  reopenMonth(month: number, year: number, reason: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/reopen-month`, { month, year, reason });
  }

  getPeriodStatus(month: number, year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/period-status/${month}/${year}`);
  }

  // Reports
  getMonthlyReport(month?: number, year?: number): Observable<any> {
    let params = new HttpParams();
    if (month) params = params.set('month', month.toString());
    if (year) params = params.set('year', year.toString());
    return this.http.get<any>(`${this.apiUrl}/admin/monthly-report`, { params });
  }
}
