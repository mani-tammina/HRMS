import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface MasterDataItem {
  id: number;
  name: string;
  code?: string;
  description?: string;
  is_active?: boolean;
  status?: 'active' | 'inactive';
}

export interface Location extends MasterDataItem {
  code: string;
  city: string;
  state: string;
  country: string;
}

export interface Department extends MasterDataItem {
  code: string;
}

export interface Designation extends MasterDataItem {
  code: string;
  level: string;
}

export interface ShiftPolicy extends MasterDataItem {
  start_time: string;
  end_time: string;
  grace_period_minutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Generic GET for any master data
  getMasterData(type: string): Observable<MasterDataItem[]> {
    console.log(`Fetching master data for type: ${type}`);
    return this.http.get<MasterDataItem[]>(
      `${this.apiUrl}/${type}`
    );
  }

  // Generic POST for creating master data
  createMasterData(type: string, data: Partial<MasterDataItem>): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/${type}`,
      data
    );
  }

  // Generic PUT for updating master data
  updateMasterData(type: string, id: number, data: Partial<MasterDataItem>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${type}/${id}`,
      data
    );
  }

  // Generic DELETE for master data
  deleteMasterData(type: string, id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${type}/${id}`
    );
  }

  // Specific master data getters (for convenience)
  getLocations(): Observable<Location[]> {
    return this.getMasterData('locations') as Observable<Location[]>;
  }

  getDepartments(): Observable<Department[]> {
    return this.getMasterData('departments') as Observable<Department[]>;
  }

  getDesignations(): Observable<Designation[]> {
    return this.getMasterData('designations') as Observable<Designation[]>;
  }

  getBusinessUnits(): Observable<MasterDataItem[]> {
    return this.getMasterData('business-units');
  }

  getLegalEntities(): Observable<MasterDataItem[]> {
    return this.getMasterData('legal-entities');
  }

  getCostCenters(): Observable<MasterDataItem[]> {
    return this.getMasterData('cost-centers');
  }

  getSubDepartments(): Observable<MasterDataItem[]> {
    return this.getMasterData('sub-departments');
  }

  getBands(): Observable<MasterDataItem[]> {
    return this.getMasterData('bands');
  }

  getPayGrades(): Observable<MasterDataItem[]> {
    return this.getMasterData('pay-grades');
  }

  getLeavePlans(): Observable<MasterDataItem[]> {
    return this.getMasterData('leave-plans');
  }

  getShiftPolicies(): Observable<ShiftPolicy[]> {
    return this.getMasterData('shift-policies') as Observable<ShiftPolicy[]>;
  }

  getWeeklyOffPolicies(): Observable<MasterDataItem[]> {
    return this.getMasterData('weekly-off-policies');
  }

  getAttendancePolicies(): Observable<MasterDataItem[]> {
    return this.getMasterData('attendance-policies');
  }

  getAttendanceCaptureSchemes(): Observable<MasterDataItem[]> {
    return this.getMasterData('attendance-capture-schemes');
  }

  getHolidayLists(): Observable<MasterDataItem[]> {
    return this.getMasterData('holiday-lists');
  }

  getExpensePolicies(): Observable<MasterDataItem[]> {
    return this.getMasterData('expense-policies');
  }
}
