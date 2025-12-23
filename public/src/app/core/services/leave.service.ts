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

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = `${environment.apiUrl}/leaves`;

  constructor(private http: HttpClient) {}

  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/my`);
  }

  getLeave(id: string): Observable<Leave> {
    return this.http.get<Leave[]>(`${this.apiUrl}/my`).pipe(
      map((leaves: Leave[]) => leaves.find(l => l.id === id) || {} as Leave)
    );
  }

  requestLeave(leave: Partial<Leave>): Observable<any> {
    const leaveRequest = {
      leave_type: leave.leaveType,
      start_date: leave.startDate,
      end_date: leave.endDate,
      reason: leave.reason
    };
    return this.http.post<any>(`${this.apiUrl}/apply`, leaveRequest);
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
}
