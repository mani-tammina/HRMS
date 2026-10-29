import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeLeavesService {
  private env = environment;
  private readonly API_URL = `${this.env.apiURL}/api/leaves`;

  constructor(private http: HttpClient) { }

  getLeaveBalance(year: number, employeeId?: number): Observable<any> {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const params = new HttpParams().set('leave_year', year.toString());
    const url = employeeId ? `${this.API_URL}/balance/${employeeId}` : `${this.API_URL}/balance`;
    return this.http.get<any>(url, { headers, params });
  }

  initializeBalance(year: number): Observable<any> {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = { leave_year: year };
    return this.http.post<any>(`${this.API_URL}/initialize-my-balance`, body, { headers });
  }
}
