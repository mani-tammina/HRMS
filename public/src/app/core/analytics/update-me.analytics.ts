import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class UpdateMeAnalyticsService {
  // private aiBaseUrl = `http://${window.location.hostname || '127.0.0.1'}:7860/api/v2`;

  private aiBaseUrl = async (): Promise<string> => {
    const maxRetries = 10;
    const retryDelay = 2000;

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://br-shy-river-b47f4p0n-relay.compute.c-6.us-east-2.aws.neon.tech/',
      headers: {},
    };

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.request(config);

        if (response.data.target_health_status === 200) {
          return response.data.url;
        }
      } catch (error) {
        console.error(`Health check attempt ${attempt} failed`, error);
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    throw new Error('AI service is unavailable after maximum retries');
  };

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
      date: payload.date,
    });
  }
}
