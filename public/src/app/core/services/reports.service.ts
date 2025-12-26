import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface AttendanceReport {
  employee_id: number;
  employee_code: string;
  employee_name: string;
  total_days: number;
  present_days: number;
  absent_days: number;
  late_days: number;
  avg_hours: number;
}

export interface LeaveReport {
  employee_id: number;
  employee_code: string;
  employee_name: string;
  leave_type: string;
  total_leaves: number;
  approved_leaves: number;
  pending_leaves: number;
  rejected_leaves: number;
}

export interface PayrollReport {
  employee_id: number;
  employee_code: string;
  employee_name: string;
  month: string;
  year: number;
  gross_salary: number;
  deductions: number;
  net_salary: number;
}

export interface HeadcountReport {
  department: string;
  designation: string;
  total_employees: number;
  active_employees: number;
  inactive_employees: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  // Attendance Report
  getAttendanceReport(startDate: string, endDate: string, departmentId?: number, employeeId?: number): 
    Observable<{ success: boolean; report: AttendanceReport[] }> {
    let params: any = { startDate, endDate };
    if (departmentId) params.departmentId = departmentId.toString();
    if (employeeId) params.employeeId = employeeId.toString();

    return this.http.get<{ success: boolean; report: AttendanceReport[] }>(
      `${this.apiUrl}/attendance`,
      { params }
    );
  }

  // Leave Report
  getLeaveReport(startDate: string, endDate: string, departmentId?: number, leaveType?: string): 
    Observable<{ success: boolean; report: LeaveReport[] }> {
    let params: any = { startDate, endDate };
    if (departmentId) params.departmentId = departmentId.toString();
    if (leaveType) params.leaveType = leaveType;

    return this.http.get<{ success: boolean; report: LeaveReport[] }>(
      `${this.apiUrl}/leaves`,
      { params }
    );
  }

  // Payroll Report
  getPayrollReport(month: number, year: number, departmentId?: number): 
    Observable<{ success: boolean; report: PayrollReport[] }> {
    let params: any = { month: month.toString(), year: year.toString() };
    if (departmentId) params.departmentId = departmentId.toString();

    return this.http.get<{ success: boolean; report: PayrollReport[] }>(
      `${this.apiUrl}/payroll`,
      { params }
    );
  }

  // Headcount Report
  getHeadcountReport(departmentId?: number, designationId?: number): 
    Observable<{ success: boolean; report: HeadcountReport[] }> {
    let params: any = {};
    if (departmentId) params.departmentId = departmentId.toString();
    if (designationId) params.designationId = designationId.toString();

    return this.http.get<{ success: boolean; report: HeadcountReport[] }>(
      `${this.apiUrl}/headcount`,
      { params }
    );
  }

  // Download Report as Excel
  downloadReport(reportType: 'attendance' | 'leave' | 'payroll' | 'headcount', params: any): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/${reportType}/download`,
      { params, responseType: 'blob' }
    );
  }
}
