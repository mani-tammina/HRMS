import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeparationService {
  private env = environment;
  private readonly API_URL = `http://${this.env.apiURL}/api/separation`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /* ============ NOTICE PERIOD CONFIG ============ */
  getNoticePeriods(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/notice-periods`, { headers: this.getHeaders() });
  }

  getNoticePeriodById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/notice-periods/${id}`, { headers: this.getHeaders() });
  }

  saveNoticePeriod(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/notice-periods`, data, { headers: this.getHeaders() });
  }

  updateNoticePeriod(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/notice-periods/${id}`, data, { headers: this.getHeaders() });
  }

  deleteNoticePeriod(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/notice-periods/${id}`, { headers: this.getHeaders() });
  }

  /* ============ RESIGNATION REASONS ============ */
  getResignationReasons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/reasons`, { headers: this.getHeaders() });
  }

  getActiveResignationReasons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/reasons/active`, { headers: this.getHeaders() });
  }

  getResignationReasonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/reasons/${id}`, { headers: this.getHeaders() });
  }

  createResignationReason(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/reasons`, data, { headers: this.getHeaders() });
  }

  updateResignationReason(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/reasons/${id}`, data, { headers: this.getHeaders() });
  }

  deleteResignationReason(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/reasons/${id}`, { headers: this.getHeaders() });
  }

  /* ============ RESIGNATION SETTINGS ============ */
  getResignationSettings(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/settings`, { headers: this.getHeaders() });
  }

  updateResignationSettings(settings: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/settings`, settings, { headers: this.getHeaders() });
  }

  getNoticePeriodLeavesSettings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/notice-period-leaves`, { headers: this.getHeaders() });
  }

  updateNoticePeriodLeavesSettings(payload: any[]): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/notice-period-leaves`, payload, { headers: this.getHeaders() });
  }

  /* ============ EMPLOYEE RESIGNATION ============ */
  applyResignation(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/apply`, data, { headers: this.getHeaders() });
  }

  getMyResignation(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/my`, { headers: this.getHeaders() });
  }

  cancelResignation(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/cancel`, {}, { headers: this.getHeaders() });
  }

  /* ============ ADMIN / WORKFLOW ============ */
  getResignationRequests(filters: any = {}): Observable<any[]> {
    let params = new HttpParams();
    if (filters.employee) params = params.set('employee', filters.employee);
    if (filters.department) params = params.set('department', filters.department);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);

    return this.http.get<any[]>(`${this.API_URL}/requests`, { params, headers: this.getHeaders() });
  }

  getResignationDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/requests/${id}`, { headers: this.getHeaders() });
  }

  actionResignation(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/requests/${id}/action`, data, { headers: this.getHeaders() });
  }

  /* ============ CLEARANCE ============ */
  getClearanceTasks(resignationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/clearance/${resignationId}`, { headers: this.getHeaders() });
  }

  updateClearanceTask(resignationId: number, taskId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/clearance/${resignationId}/task/${taskId}`, data, { headers: this.getHeaders() });
  }

  /* ============ FULL & FINAL SETTLEMENT ============ */
  getFFSettlement(resignationId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/settlement/${resignationId}`, { headers: this.getHeaders() });
  }

  processFFSettlement(resignationId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/settlement/${resignationId}`, data, { headers: this.getHeaders() });
  }

  updateSettlementStatus(resignationId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/settlement/${resignationId}/status`, data, { headers: this.getHeaders() });
  }
}
