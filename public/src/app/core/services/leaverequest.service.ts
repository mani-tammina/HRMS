import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface MyLeave {
  id: number;
  leave_type: string;
  from_date: string;
  to_date: string;
  days: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applied_on: string;
  type_name?: string;
  type_code?: string;
  start_date?: string;
  end_date?: string;
  is_half_day?: boolean | number;
  half_day_session?: string;
}

@Injectable({ providedIn: 'root' })
export class LeaverequestService {
  private env = environment;
  private readonly API_URL = `${this.env.apiURL}/api/leaves`;

  private myLeavesSubject = new BehaviorSubject<MyLeave[]>([]);
  myLeaves$ = this.myLeavesSubject.asObservable();

  constructor(private http: HttpClient) { }

  applyLeave(payload: {
    leave_type_id: number;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    is_half_day?: boolean;
    half_day_session?: string | null;
  }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/apply`, payload).pipe(
      tap((res) => {
        const newLeave: MyLeave = {
          id: Date.now(),
          leave_type: res.leave_type ?? 'Leave',
          from_date: payload.start_date,
          to_date: payload.end_date,
          days: payload.total_days,
          status: 'PENDING',
          applied_on: new Date().toISOString()
        };
        this.myLeavesSubject.next([newLeave, ...this.myLeavesSubject.value]);
      })
    );
  }

  getMyLeaves(leaveYear: number): Observable<MyLeave[]> {
    const params = new HttpParams().set('leave_year', leaveYear.toString());
    return this.http.get<MyLeave[]>(`${this.API_URL}/my-leaves`, { params }).pipe(
      tap((leaves) => this.myLeavesSubject.next(leaves))
    );
  }

  getEmployeeLeaves(employeeId: number, leaveYear: number): Observable<MyLeave[]> {
    const params = new HttpParams().set('leave_year', leaveYear.toString());
    return this.http.get<MyLeave[]>(`${this.API_URL}/employee/${employeeId}`, { params });
  }

  getCurrentLeaves(): MyLeave[] { return this.myLeavesSubject.value; }

  private leaveRequestsSource = new BehaviorSubject<any[]>([]);
  leaveRequests$ = this.leaveRequestsSource.asObservable();

  setLeaveRequests(requests: any[]) { this.leaveRequestsSource.next(requests); }
  getLeaveRequests(): any[] { return this.leaveRequestsSource.value; }

  approveLeave(leaveId: number, remarks: string): Observable<any> {
    return this.http.put(`${this.API_URL}/approve/${leaveId}`, { remarks });
  }

  rejectLeave(leaveId: number, rejection_reason: string): Observable<any> {
    return this.http.put(`${this.API_URL}/reject/${leaveId}`, { rejection_reason });
  }

  cancelLeave(leaveId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/cancel/${leaveId}`, {});
  }


  getPendingLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/pending`).pipe(
      tap((requests) => this.leaveRequestsSource.next(requests))
    );
  }

  getTeamLeaveReport(startDate: string, endDate: string): Observable<any[]> {
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(`${this.API_URL}/team-report`, { params });
  }

  applyCompOff(payload: {
    date_worked: string;
    total_days: number;
    reason: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/comp-off/request`, payload);
  }

  getMyCompOffRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/comp-off/my-requests`);
  }

  getPendingCompOffRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/comp-off/pending`);
  }

  approveCompOff(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/comp-off/approve/${id}`, {});
  }

  rejectCompOff(id: number, rejection_reason: string): Observable<any> {
    return this.http.put(`${this.API_URL}/comp-off/reject/${id}`, { rejection_reason });
  }

  cancelCompOff(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/comp-off/cancel/${id}`, {});
  }
}
