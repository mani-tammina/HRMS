import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Leave {
  id: string;
  employeeId: string;
  leaveType: 'sick' | 'casual' | 'annual' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface LeaveBalance {
  id: number;
  employee_id: number;
  leave_type_id: number;
  leave_year: number;
  allocated_days: number;
  used_days: number;
  pending_days: number;
  available_days: number;
  carried_forward_days: number;
  type_name: string;
  type_code: string;
  is_paid: number;
  can_carry_forward: number;
  max_carry_forward_days: number;
}

export interface LeaveTypeOption {
  id: number;
  type_name: string;
  type_code: string;
  is_paid: number;
  available_days?: number;
  allocated_days?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = `${environment.apiUrl}/leave`;

  constructor(private http: HttpClient) {}

  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/my`);
  }

  getLeave(id: string): Observable<Leave> {
    return this.http.get<Leave[]>(`${this.apiUrl}/my`).pipe(
      map((leaves: Leave[]) => leaves.find(l => l.id === id) || {} as Leave)
    );
  }

  requestLeave(leave: any): Observable<any> {
    console.log('LeaveService: Requesting leave', leave);
    return this.http.post<any>(`${this.apiUrl}/apply`, leave);
  }

  approveLeave(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectLeave(id: string, reason?: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reject/${id}`, { reason });
  }

  getLeaveBalance(): Observable<any> {
    return this.http.get<Leave[]>(`${this.apiUrl}/my`).pipe(
      map((leaves: Leave[]) => {
        const approved = leaves.filter(l => l.status === 'approved');
        const used = approved.reduce((sum, l) => sum + (l.days || 0), 0);
        const pending = leaves.filter(l => l.status === 'pending').length;
        return {
          used: used,
          pending: pending,
          total: 20,
          available: 20 - used,
          attendanceRate: 95
        };
      })
    );
  }

  // Get employee leave balance with details
  getEmployeeLeaveBalance(year?: number): Observable<LeaveBalance[]> {
    const params: any = {};
    if (year) params.year = year.toString();
    console.log('LeaveService: Fetching leave balance', params);
    return this.http.get<LeaveBalance[]>(`${this.apiUrl}/balance`, { params });
  }

  // Initialize leave balance for employee
  initializeLeaveBalance(): Observable<any> {
    console.log('LeaveService: Initializing leave balance');
    // Call employee's own balance initialization (if endpoint exists)
    // Otherwise, this will need HR to initialize via admin panel
    return this.http.post<any>(`${this.apiUrl}/initialize-my-balance`, {});
  }

  // Get available leave types for employee (from their plan)
  getAvailableLeaveTypes(): Observable<LeaveTypeOption[]> {
    console.log('LeaveService: Fetching available leave types');
    return this.http.get<LeaveBalance[]>(`${this.apiUrl}/balance`).pipe(
      map((balances: LeaveBalance[]) => {
        return balances.map(b => ({
          id: b.leave_type_id,
          type_name: b.type_name,
          type_code: b.type_code,
          is_paid: b.is_paid,
          available_days: b.available_days,
          allocated_days: b.allocated_days
        }));
      })
    );
  }
}
