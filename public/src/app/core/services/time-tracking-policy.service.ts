import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TimeTrackingPolicy {
  id: number;
  name: string;
  description?: string;
  site_ids?: number[];
  sites?: any[];
  status: 'active' | 'inactive';
  effective_date: string;
  biometric_settings?: any;
  remote_punch_settings?: any;
  wfh_settings?: any;
  regularization_settings?: any;
  created_at?: string;
  updated_at?: string;
  employee_count?: number;
}

export interface TimeTrackingPolicyPayload {
  name: string;
  description?: string;
  site_ids?: number[];
  status: 'active' | 'inactive';
  effective_date: string;
  biometric_settings?: any;
  remote_punch_settings?: any;
  wfh_settings?: any;
  regularization_settings?: any;
}

@Injectable({ providedIn: 'root' })
export class TimeTrackingPolicyService {
  private baseUrl = `${environment.apiURL}/api`;

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<TimeTrackingPolicy[]> {
    return this.http.get<TimeTrackingPolicy[]>(`${this.baseUrl}/time-tracking-policies`);
  }

  getPolicyById(id: number): Observable<TimeTrackingPolicy> {
    return this.http.get<TimeTrackingPolicy>(`${this.baseUrl}/time-tracking-policies/${id}`);
  }

  getPolicyEmployees(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/time-tracking-policies/${id}/employees`);
  }

  createPolicy(payload: TimeTrackingPolicyPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/time-tracking-policies`, payload);
  }

  updatePolicy(id: number, payload: TimeTrackingPolicyPayload): Observable<any> {
    return this.http.put(`${this.baseUrl}/time-tracking-policies/${id}`, payload);
  }

  deletePolicy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/time-tracking-policies/${id}`);
  }
}
