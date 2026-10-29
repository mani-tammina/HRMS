import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Holiday {
  id?: number;
  holiday_date: string;
  holiday_name: string;
  day_name?: string;
  holiday_type?: 'public' | 'optional' | 'restricted' | 'floating' | string;
  description?: string;
  holiday_list_id?: number | null;
  location_id?: number | null;
  shift_policy_id?: number | null;
  applicable_locations?: string | number[] | null;
  applicable_shifts?: string | number[] | null;
  is_active?: boolean | number;
  holiday_list_name?: string;
  location_name?: string;
  shift_policy_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HolidayListMaster {
  id?: number;
  name: string;
  description?: string;
  location_id?: number | null;
  location_name?: string;
  shift_policy_id?: number | null;
  holiday_count?: number;
  is_active?: boolean | number;
  created_at?: string;
  updated_at?: string;
}

export interface HolidaySummary {
  year: number;
  total: number;
  public_count: number;
  optional_count: number;
  upcoming_count: number;
  locations_count: number;
  shifts_count: number;
}

export interface HolidayMeta {
  locations: Array<{ id: number; name: string; country?: string }>;
  shiftPolicies: Array<{ id: number; name: string; description?: string; status?: string }>;
  projectShifts: Array<{ id: number; shift_name: string; shift_type?: string }>;
  holidayLists: HolidayListMaster[];
}

export interface BulkUploadResponse {
  success: boolean;
  totalRows: number;
  inserted: number;
  updated: number;
  skipped: number;
  errors?: string[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private apiUrl = `${environment.apiURL || ''}/api/holidays`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch all holidays matching active filters
   */
  getHolidays(filters?: {
    year?: number | string;
    location_id?: number | string;
    location_ids?: number[] | string;
    shift_policy_id?: number | string;
    shift_policy_ids?: number[] | string;
    holiday_list_id?: number | string;
    holiday_list_ids?: number[] | string;
    holiday_type?: string;
    is_active?: boolean | string;
    search?: string;
  }): Observable<Holiday[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.year) params = params.set('year', String(filters.year));
      if (filters.location_ids) {
        const val = Array.isArray(filters.location_ids) ? filters.location_ids.join(',') : String(filters.location_ids);
        if (val) params = params.set('location_ids', val);
      } else if (filters.location_id) {
        params = params.set('location_id', String(filters.location_id));
      }
      if (filters.shift_policy_ids) {
        const val = Array.isArray(filters.shift_policy_ids) ? filters.shift_policy_ids.join(',') : String(filters.shift_policy_ids);
        if (val) params = params.set('shift_policy_ids', val);
      } else if (filters.shift_policy_id) {
        params = params.set('shift_policy_id', String(filters.shift_policy_id));
      }
      if (filters.holiday_list_ids) {
        const val = Array.isArray(filters.holiday_list_ids) ? filters.holiday_list_ids.join(',') : String(filters.holiday_list_ids);
        if (val) params = params.set('holiday_list_ids', val);
      } else if (filters.holiday_list_id) {
        params = params.set('holiday_list_id', String(filters.holiday_list_id));
      }
      if (filters.holiday_type) params = params.set('holiday_type', filters.holiday_type);
      if (filters.is_active !== undefined && filters.is_active !== '') params = params.set('is_active', String(filters.is_active));
      if (filters.search) params = params.set('search', filters.search);
    }
    return this.http.get<Holiday[]>(this.apiUrl, { params });
  }

  /**
   * Get KPI Summary counts
   */
  getSummary(year?: number | string): Observable<HolidaySummary> {
    let params = new HttpParams();
    if (year) params = params.set('year', String(year));
    return this.http.get<HolidaySummary>(`${this.apiUrl}/summary`, { params });
  }

  /**
   * Get metadata for dropdowns (locations, shift policies, holiday lists)
   */
  getMeta(): Observable<HolidayMeta> {
    return this.http.get<HolidayMeta>(`${this.apiUrl}/meta`);
  }

  /**
   * Get Holiday Lists groups
   */
  getHolidayLists(): Observable<HolidayListMaster[]> {
    return this.http.get<HolidayListMaster[]>(`${this.apiUrl}/holiday-lists`);
  }

  /**
   * Create Holiday List group
   */
  createHolidayList(data: Partial<HolidayListMaster>): Observable<any> {
    return this.http.post(`${this.apiUrl}/holiday-lists`, data);
  }

  /**
   * Update Holiday List group
   */
  updateHolidayList(id: number, data: Partial<HolidayListMaster>): Observable<any> {
    return this.http.put(`${this.apiUrl}/holiday-lists/${id}`, data);
  }

  /**
   * Delete Holiday List group
   */
  deleteHolidayList(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/holiday-lists/${id}`);
  }

  /**
   * Create Single Holiday
   */
  createHoliday(data: Partial<Holiday>): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  /**
   * Update Single Holiday
   */
  updateHoliday(id: number, data: Partial<Holiday>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete Single Holiday
   */
  deleteHoliday(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Bulk Delete Holidays
   */
  bulkDeleteHolidays(ids: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk-delete`, { ids });
  }

  /**
   * Bulk Assign Holidays to Locations and Shift Policies
   */
  bulkAssignHolidays(data: {
    holiday_ids: number[];
    location_ids?: number[];
    shift_policy_ids?: number[];
    holiday_list_id?: number | null;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk-assign`, data);
  }

  /**
   * Upload Holidays in bulk with optional target location, shift policy, and holiday list
   */
  uploadHolidays(formData: FormData): Observable<BulkUploadResponse> {
    return this.http.post<BulkUploadResponse>(`${this.apiUrl}/upload`, formData);
  }

  /**
   * Download Excel Template
   */
  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/template`, { responseType: 'blob' });
  }

  /**
   * Export Filtered Holidays to Excel
   */
  exportHolidays(filters?: any): Observable<Blob> {
    let params = new HttpParams();
    if (filters) {
      if (filters.year) params = params.set('year', String(filters.year));
      if (filters.location_id) params = params.set('location_id', String(filters.location_id));
      if (filters.shift_policy_id) params = params.set('shift_policy_id', String(filters.shift_policy_id));
      if (filters.holiday_list_id) params = params.set('holiday_list_id', String(filters.holiday_list_id));
      if (filters.holiday_type) params = params.set('holiday_type', filters.holiday_type);
    }
    return this.http.get(`${this.apiUrl}/export`, { params, responseType: 'blob' });
  }

  /**
   * Get upcoming holidays for current user based on location
   */
  getUpcomingHolidays(): Observable<{ location_id?: number | null; location_name?: string; holidays: Holiday[] }> {
    return this.http.get<{ location_id?: number | null; location_name?: string; holidays: Holiday[] }>(`${this.apiUrl}/upcoming`);
  }
}
