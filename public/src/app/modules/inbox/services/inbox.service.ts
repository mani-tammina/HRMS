import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InboxNotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  private env = environment;
  private readonly BASE_URL = `http://${this.env.apiURL}/api/inbox`;

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
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    viewAll?: boolean;
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
    if (params.sortField) {
      httpParams = httpParams.set('sortField', params.sortField);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }
    if (params.viewAll) {
      httpParams = httpParams.set('viewAll', 'true');
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
    return this.http.put(`${this.BASE_URL}/read-all`, {}, { headers: this.getHeaders() });
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/read/${id}`, {}, { headers: this.getHeaders() });
  }

  archiveNotification(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/archive/${id}`, {}, { headers: this.getHeaders() });
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, { headers: this.getHeaders() });
  }

  actionAttendanceRegularization(payload: {
    notification_id: number;
    action: 'Approve' | 'Reject';
    remarks?: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/attendance/action`, payload, { headers: this.getHeaders() });
  }
}
