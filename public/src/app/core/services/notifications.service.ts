import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Notification {
  id: number;
  employee_id: number;
  type: 'leave' | 'attendance' | 'payroll' | 'announcement' | 'birthday' | 'task' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  is_read: boolean;
  action_url: string | null;
  metadata: any;
  created_at: string;
  read_at: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  // Get My Notifications
  getMyNotifications(unreadOnly?: boolean, limit?: number): 
    Observable<{ success: boolean; notifications: Notification[] }> {
    let params: any = {};
    if (unreadOnly) params.unread = 'true';
    if (limit) params.limit = limit.toString();

    return this.http.get<{ success: boolean; notifications: Notification[] }>(
      `${this.apiUrl}/my`,
      { params }
    );
  }

  // Get Unread Count
  getUnreadCount(): Observable<{ success: boolean; count: number }> {
    return this.http.get<{ success: boolean; count: number }>(
      `${this.apiUrl}/unread-count`
    );
  }

  // Mark as Read
  markAsRead(notificationId: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${notificationId}/read`,
      {}
    );
  }

  // Mark All as Read
  markAllAsRead(): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/mark-all-read`,
      {}
    );
  }

  // Delete Notification
  deleteNotification(notificationId: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${notificationId}`
    );
  }

  // Admin: Send Notification to Employee(s)
  sendNotification(data: {
    employee_ids?: number[];
    type: string;
    title: string;
    message: string;
    priority?: string;
    action_url?: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/send`,
      data
    );
  }

  // Admin: Send Broadcast Notification
  sendBroadcast(data: {
    type: string;
    title: string;
    message: string;
    priority?: string;
    department_id?: number;
    location_id?: number;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/broadcast`,
      data
    );
  }
}
