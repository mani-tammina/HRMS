import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AttendancePolicy {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  employee_count?: number;
}

export interface AttendancePolicyPayload {
  name: string;
  description?: string;
}

export interface AttendancePolicyEmployee {
  id: number;
  emp_no?: string;
  EmployeeNumber?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  work_email?: string;
  profile_image?: string;
  department_name?: string;
  designation_name?: string;
  location_name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendancePolicyService {
  private baseUrl = `${environment.apiURL}/api/attendance-policies`;

  constructor(private http: HttpClient) {}

  /**
   * Get all attendance policies with employee counts
   */
  getPolicies(): Observable<AttendancePolicy[]> {
    return this.http.get<AttendancePolicy[]>(this.baseUrl);
  }

  /**
   * Get a single attendance policy by ID
   */
  getPolicyById(id: number): Observable<AttendancePolicy> {
    return this.http.get<AttendancePolicy>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get all employees assigned to a specific attendance policy
   */
  getPolicyEmployees(id: number): Observable<AttendancePolicyEmployee[]> {
    return this.http.get<AttendancePolicyEmployee[]>(`${this.baseUrl}/${id}/employees`);
  }

  /**
   * Create a new attendance policy
   */
  createPolicy(payload: AttendancePolicyPayload): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  /**
   * Update an existing attendance policy
   */
  updatePolicy(id: number, payload: AttendancePolicyPayload): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * Delete an attendance policy
   * @param id Policy ID
   * @param unassign If true, unassigns any linked employees before deleting
   */
  deletePolicy(id: number, unassign: boolean = false): Observable<any> {
    let params = new HttpParams();
    if (unassign) {
      params = params.set('unassign', 'true');
    }
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { params });
  }

  /**
   * Assign employees to a policy
   */
  assignEmployees(policyId: number, employeeIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${policyId}/assign-employees`, {
      employee_ids: employeeIds
    });
  }

  /**
   * Unassign an individual employee from a policy
   */
  unassignEmployee(policyId: number, employeeId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${policyId}/unassign-employee/${employeeId}`, {});
  }
}

