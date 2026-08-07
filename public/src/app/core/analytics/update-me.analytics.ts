import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateMeAnalyticsService {
  private aiApiUrl = `http://${window.location.hostname}:7860/api/v2/get-summary`;

  constructor(private http: HttpClient) {}

  getSummary(payload: any): Observable<any> {
    return this.http.post<any>(this.aiApiUrl, payload);
  }
}
