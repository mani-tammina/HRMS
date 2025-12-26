import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface LeavePlan {
  id: number;
  name: string;
  description?: string;
  leave_year_start_month: number;
  leave_year_start_day: number;
  is_active: number;
  created_at?: string;
  leave_types_count?: number;
  employees_count?: number;
  allocations?: LeaveAllocation[];
}

export interface LeaveAllocation {
  id?: number;
  leave_plan_id?: number;
  leave_type_id: number;
  days_allocated: number;
  prorate_on_joining: boolean;
  type_name?: string;
  type_code?: string;
  is_paid?: number;
  can_carry_forward?: number;
  max_carry_forward_days?: number;
}

export interface LeaveType {
  id: number;
  type_name: string;
  type_code: string;
  description?: string;
  is_paid: number;
  requires_approval: number;
  can_carry_forward: number;
  max_carry_forward_days: number;
  is_active: number;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeavePlanService {
  private apiUrl = `${environment.apiUrl}/leave-enhanced`;

  constructor(private http: HttpClient) {}

  // Leave Plans
  getLeavePlans(): Observable<LeavePlan[]> {
    return this.http.get<LeavePlan[]>(`${this.apiUrl}/plans`);
  }

  getLeavePlan(id: number): Observable<LeavePlan> {
    return this.http.get<LeavePlan>(`${this.apiUrl}/plans/${id}`);
  }

  createLeavePlan(plan: Partial<LeavePlan>): Observable<any> {
    return this.http.post(`${this.apiUrl}/plans`, plan);
  }

  updateLeavePlan(id: number, plan: Partial<LeavePlan>): Observable<any> {
    return this.http.put(`${this.apiUrl}/plans/${id}`, plan);
  }

  // Leave Types
  getLeaveTypes(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(`${this.apiUrl}/types`);
  }

  createLeaveType(type: Partial<LeaveType>): Observable<any> {
    return this.http.post(`${this.apiUrl}/types`, type);
  }

  updateLeaveType(id: number, type: Partial<LeaveType>): Observable<any> {
    return this.http.put(`${this.apiUrl}/types/${id}`, type);
  }
}
