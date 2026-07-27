import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WorkFromHomeService {
  private env = environment;
  private readonly API_URL = `${this.env.apiURL}/api/leaves`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllWFHRequests(employeeId?: number): Observable<any> {
    let params = {};
    if (employeeId) {
      params = { params: { employeeId: employeeId.toString() }, headers: this.getHeaders() };
    } else {
      params = { headers: this.getHeaders() };
    }
    return this.http.get<any>(`${this.API_URL}/wfh-requests`, params);
  }

  wfh(payload: { start_date?: string; end_date?: string; date?: string; total_days?: number; work_mode: 'WFH' | 'WFO' | 'Remote'; reason: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/wfh-request`, payload, { headers: this.getHeaders() });
  }

  remote(payload: { date: string; reason: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/wfh-request`, { ...payload, work_mode: 'Remote' }, { headers: this.getHeaders() });
  }

  getPendingWFHRequests(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/wfh-requests/pending`, { headers: this.getHeaders() });
  }

  approveWFHRequest(id: number, remarks = 'Approved'): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/approve/${id}`, { remarks });
  }

  rejectWFHRequest(id: number, remarks = 'Rejected'): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/reject/${id}`, { remarks });
  }
}
