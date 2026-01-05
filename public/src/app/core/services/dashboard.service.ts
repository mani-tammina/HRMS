import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface AdminDashboard {
  total_employees: number;
  active_employees: number;
  on_leave_today: number;
  present_today: number;
  attendance_rate: number;
  pending_leaves: number;
  pending_timesheets: number;
  active_projects: number;
  total_departments: number;
  avg_work_hours: number;
  recent_joinings: number;
  upcoming_birthdays: number;
}

export interface ManagerDashboard {
  team_size: number;
  present_today: number;
  on_leave_today: number;
  pending_approvals: number;
  pending_leave_requests: number;
  pending_timesheet_approvals: number;
  team_attendance_rate: number;
  team_members: Array<{
    employee_id: number;
    employee_name: string;
    today_status: string;
    punch_in_time?: string;
  }>;
}

export interface EmployeeDashboard {
  attendance_summary: {
    present_days: number;
    absent_days: number;
    late_days: number;
    attendance_percentage: number;
  };
  leave_summary: {
    total_allocated: number;
    used: number;
    pending: number;
    available: number;
  };
  timesheet_summary: {
    submitted: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  current_projects: Array<{
    project_id: number;
    project_name: string;
    client_name: string;
    role: string;
  }>;
  upcoming_holidays: number;
}

export interface AttendanceAnalytics {
  date_range: {
    start_date: string;
    end_date: string;
  };
  overall_stats: {
    total_working_days: number;
    avg_attendance_rate: number;
    total_present: number;
    total_absent: number;
    total_late: number;
  };
  daily_trends: Array<{
    date: string;
    present_count: number;
    absent_count: number;
    late_count: number;
    attendance_rate: number;
  }>;
  department_wise: Array<{
    department: string;
    attendance_rate: number;
    present_count: number;
    absent_count: number;
  }>;
  work_mode_distribution: Array<{
    work_mode: string;
    count: number;
    percentage: number;
  }>;
}

export interface LeaveAnalytics {
  date_range: {
    start_date: string;
    end_date: string;
  };
  overall_stats: {
    total_leaves: number;
    approved_leaves: number;
    pending_leaves: number;
    rejected_leaves: number;
  };
  leave_type_distribution: Array<{
    leave_type: string;
    count: number;
    percentage: number;
  }>;
  department_wise: Array<{
    department: string;
    total_leaves: number;
    avg_leaves_per_employee: number;
  }>;
  monthly_trends: Array<{
    month: string;
    leave_count: number;
  }>;
}

export interface TimesheetAnalytics {
  date_range: {
    start_date: string;
    end_date: string;
  };
  overall_stats: {
    total_submissions: number;
    avg_hours_per_day: number;
    total_hours: number;
    compliance_rate: number;
  };
  status_distribution: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  project_wise_hours: Array<{
    project_name: string;
    total_hours: number;
    employee_count: number;
  }>;
  daily_trends: Array<{
    date: string;
    submission_count: number;
    total_hours: number;
    compliance_rate: number;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  // Get Admin Dashboard
  getAdminDashboard(): Observable<{ success: boolean; dashboard: AdminDashboard }> {
    return this.http.get<{ success: boolean; dashboard: AdminDashboard }>(
      `${this.apiUrl}/admin`
    );
  }

  // Get Manager Dashboard
  getManagerDashboard(): Observable<{ success: boolean; dashboard: ManagerDashboard }> {
    return this.http.get<{ success: boolean; dashboard: ManagerDashboard }>(
      `${this.apiUrl}/manager`
    );
  }

  // Get Employee Dashboard
  getEmployeeDashboard(): Observable<{ success: boolean; dashboard: EmployeeDashboard }> {
    return this.http.get<{ success: boolean; dashboard: EmployeeDashboard }>(
      `${this.apiUrl}/employee`
    );
  }

  // Get Attendance Analytics
  getAttendanceAnalytics(startDate: string, endDate: string, departmentId?: number): 
    Observable<{ success: boolean; analytics: AttendanceAnalytics }> {
    let params: any = { start_date: startDate, end_date: endDate };
    if (departmentId) params.department_id = departmentId.toString();

    return this.http.get<{ success: boolean; analytics: AttendanceAnalytics }>(
      `${this.apiUrl}/analytics/attendance`,
      { params }
    );
  }

  // Get Leave Analytics
  getLeaveAnalytics(startDate: string, endDate: string, departmentId?: number): 
    Observable<{ success: boolean; analytics: LeaveAnalytics }> {
    let params: any = { start_date: startDate, end_date: endDate };
    if (departmentId) params.department_id = departmentId.toString();

    return this.http.get<{ success: boolean; analytics: LeaveAnalytics }>(
      `${this.apiUrl}/analytics/leaves`,
      { params }
    );
  }

  // Get Timesheet Analytics
  getTimesheetAnalytics(startDate: string, endDate: string, projectId?: number): 
    Observable<{ success: boolean; analytics: TimesheetAnalytics }> {
    let params: any = { start_date: startDate, end_date: endDate };
    if (projectId) params.project_id = projectId.toString();

    return this.http.get<{ success: boolean; analytics: TimesheetAnalytics }>(
      `${this.apiUrl}/analytics/timesheets`,
      { params }
    );
  }

  // Get Payroll Analytics
  getPayrollAnalytics(month: number, year: number): 
    Observable<{ success: boolean; analytics: any }> {
    const params = { month: month.toString(), year: year.toString() };

    return this.http.get<{ success: boolean; analytics: any }>(
      `${this.apiUrl}/analytics/payroll`,
      { params }
    );
  }
}
