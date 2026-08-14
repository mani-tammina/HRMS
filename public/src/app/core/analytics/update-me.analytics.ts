import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateMeAnalyticsService {
  private aiBaseUrl = `http://${window.location.hostname || '127.0.0.1'}:7860/api/v2`;

  constructor(private http: HttpClient) {}

  getSummary(payload: any): Observable<any> {
    return this.http.post<any>(`${this.aiBaseUrl}/get-summary`, payload);
  }

  getPendingTimesheetsAnalytics(payload: {
    tableName?: string;
    employee_id: (number | string)[];
    date: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.aiBaseUrl}/get-pending-timesheets`, {
      tableName: payload.tableName || 'pending_timesheets',
      employee_id: payload.employee_id,
      date: payload.date
    });
  }
}
