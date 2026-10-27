import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InboxNotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  private env = environment;
  private readonly BASE_URL = `${this.env.apiURL}/api/inbox`;

  public refreshCount$ = new Subject<void>();

  notifyCountChanged() {
    this.refreshCount$.next();
  }

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getNotifications(params: {
    page: number;
    limit: number;
    search?: string;
    tab?: string;
    month?: string;
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    viewAll?: boolean;
    skipStats?: boolean;
  }): Observable<{ success: boolean; data: InboxNotification[]; total: number; unreadCount: number; stats?: any }> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('limit', params.limit.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.tab) {
      httpParams = httpParams.set('tab', params.tab);
    }
    if (params.month) {
      httpParams = httpParams.set('month', params.month);
    }
    if (params.sortField) {
      httpParams = httpParams.set('sortField', params.sortField);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }
    if (params.viewAll !== undefined) {
      httpParams = httpParams.set('viewAll', params.viewAll ? 'true' : 'false');
    }
    if (params.skipStats !== undefined) {
      httpParams = httpParams.set('skipStats', params.skipStats ? 'true' : 'false');
    }

    return this.http.get<{ success: boolean; data: InboxNotification[]; total: number; unreadCount: number; stats?: any }>(
      `${this.BASE_URL}`,
      { headers: this.getHeaders(), params: httpParams }
    );
  }

  getNotificationById(id: number): Observable<{ success: boolean; data: InboxNotification }> {
    return this.http.get<{ success: boolean; data: InboxNotification }>(
      `${this.BASE_URL}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.BASE_URL}/read-all`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/read/${id}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  archiveNotification(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/archive/${id}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  actionAttendanceRegularization(payload: {
    notification_id: number;
    action: 'Approve' | 'Reject';
    remarks?: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/attendance/action`, payload, { headers: this.getHeaders() }).pipe(
      tap(() => this.notifyCountChanged())
    );
  }

  uploadMonthlyAttendance(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.env.apiURL}/api/upload/monthly-attendance`, formData, { headers });
  }

  exportMonthlyAttendance(params: { startDate: string; endDate: string; month?: number; year?: number }): Observable<Blob> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    let httpParams = new HttpParams()
      .set('startDate', params.startDate)
      .set('endDate', params.endDate);
    if (params.month !== undefined && params.month !== null) {
      httpParams = httpParams.set('month', params.month.toString());
    }
    if (params.year !== undefined && params.year !== null) {
      httpParams = httpParams.set('year', params.year.toString());
    }
    return this.http.get(`${this.env.apiURL}/api/upload/monthly-attendance/export`, {
      headers,
      params: httpParams,
      responseType: 'blob'
    });
  }

  uploadYearlyLeaveBalances(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.env.apiURL}/api/yearly-leave-balances/import`, formData, { headers });
  }

  exportYearlyLeaveBalances(): Observable<Blob> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.env.apiURL}/api/yearly-leave-balances/export/excel`, {
      headers,
      responseType: 'blob'
    });
  }

  exportTimesheets(params: { startDate: string; endDate: string; employeeId?: number }): Observable<Blob> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    let httpParams = new HttpParams()
      .set('startDate', params.startDate)
      .set('endDate', params.endDate);
    if (params.employeeId) {
      httpParams = httpParams.set('employeeId', params.employeeId.toString());
    }
    return this.http.get(`${this.BASE_URL}/timesheets/export`, {
      headers,
      params: httpParams,
      responseType: 'blob'
    });
  }
}
