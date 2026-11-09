import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface BiometricSyncState {
  source_system: string;
  last_source_log_id: string;
  last_sync_at: string | null;
  last_status: string;
  last_error: string | null;
  last_synced_records_count?: number;
  total_synced_records?: number;
}

export interface BiometricStatusResponse {
  syncState?: BiometricSyncState;
  stats: {
    rawPunchesTotal: number;
    mappedPunchesTotal: number;
    dailySummariesTotal: number;
  };
}

export interface BiometricDevice {
  id: number | string;
  deviceId: string;
  name: string;
  location: string;
  type: string;
  ipAddress: string;
  serialNumber?: string | null;
  configStatus?: string;
  totalPunches: number;
  uniqueUsers: number;
  lastPunchTime: string;
  firstPunchTime: string;
  status: 'online' | 'idle' | 'offline';
  isOnline: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BiometricMapping {
  id: number;
  employee_id: number;
  biometric_user_id: string;
  device_id: string | null;
  active: number;
  FirstName: string;
  LastName: string;
  EmployeeNumber: string;
  WorkEmail: string;
}

export interface BiometricRawLog {
  id: number;
  source_log_id?: string;
  biometric_user_id: string;
  punch_time: string;
  device_id: string;
  direction: string;
  status?: string;
  employee_id?: number | null;
  created_at?: string;
}

export interface BiometricDailyRecord {
  id: number;
  employee_id: number;
  attendance_date: string;
  first_punch_in: string | null;
  last_punch_out: string | null;
  total_punches: number;
  gross_hours: number | string;
  status: 'present' | 'half_day' | 'absent';
  punches_detail?: any[];
  FirstName: string;
  LastName: string;
  EmployeeNumber: string;
  WorkEmail: string;
  Department?: string;
}

export interface UnmappedUser {
  biometric_user_id: string;
  device_ids: string;
  last_seen: string;
  punch_count: number;
}

export interface CompanyLocation {
  id: number;
  name: string;
  country?: string | null;
  city?: string | null;
  state?: string | null;
  address_line1?: string | null;
  is_headquarters?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BiometricService {
  private baseUrl = `${environment.apiURL}/api/biometric-attendance`;

  constructor(private http: HttpClient) {}

  /**
   * Get sync status and aggregate punch statistics
   */
  getStatus(): Observable<{ success: boolean; data: BiometricStatusResponse }> {
    return this.http.get<{ success: boolean; data: BiometricStatusResponse }>(`${this.baseUrl}/status`);
  }

  /**
   * Trigger manual sync now from external biometric database
   */
  syncNow(payload: {
    batchSize?: number;
    forceFromLogId?: number | null;
    syncAll?: boolean;
    maxBatches?: number;
  } = {}): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sync-now`, payload);
  }

  /**
   * Get list of biometric devices with summary metrics
   */
  getDevices(): Observable<{ success: boolean; data: BiometricDevice[] }> {
    return this.http.get<{ success: boolean; data: BiometricDevice[] }>(`${this.baseUrl}/devices`);
  }

  /**
   * Add a new biometric device or upsert configuration
   */
  addDevice(payload: {
    deviceId: string;
    name: string;
    location?: string;
    deviceType?: string;
    ipAddress?: string;
    serialNumber?: string;
    status?: string;
  }): Observable<{ success: boolean; message: string; data?: any }> {
    return this.http.post<{ success: boolean; message: string; data?: any }>(`${this.baseUrl}/devices`, payload);
  }

  /**
   * Update an existing biometric device
   */
  updateDevice(id: number | string, payload: {
    deviceId?: string;
    name: string;
    location?: string;
    deviceType?: string;
    ipAddress?: string;
    serialNumber?: string;
    status?: string;
  }): Observable<{ success: boolean; message: string; data?: any }> {
    return this.http.put<{ success: boolean; message: string; data?: any }>(`${this.baseUrl}/devices/${id}`, payload);
  }

  /**
   * Delete a biometric device
   */
  deleteDevice(id: number | string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/devices/${id}`);
  }

  /**
   * Get raw machine logs with filtering and pagination
   */
  getRawLogs(params: {
    page?: number;
    limit?: number;
    userId?: string;
    date?: string;
    deviceId?: string;
  } = {}): Observable<{ success: boolean; data: { page: number; limit: number; total: number; logs: BiometricRawLog[] } }> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params.userId) httpParams = httpParams.set('userId', params.userId.trim());
    if (params.date) httpParams = httpParams.set('date', params.date);
    if (params.deviceId) httpParams = httpParams.set('deviceId', params.deviceId);

    return this.http.get<{ success: boolean; data: { page: number; limit: number; total: number; logs: BiometricRawLog[] } }>(
      `${this.baseUrl}/raw-logs`,
      { params: httpParams }
    );
  }

  /**
   * Get employee to biometric user mappings
   */
  getMappings(): Observable<{ success: boolean; data: BiometricMapping[] }> {
    return this.http.get<{ success: boolean; data: BiometricMapping[] }>(`${this.baseUrl}/mappings`);
  }

  /**
   * Save (create or update) employee to biometric user mapping
   */
  saveMapping(payload: {
    employeeId: number;
    biometricUserId: string;
    deviceId?: string | null;
    active?: number;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/mappings`, payload);
  }

  /**
   * Delete employee to biometric user mapping
   */
  deleteMapping(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/mappings/${id}`);
  }

  /**
   * Get unmapped user IDs detected in machine punches
   */
  getUnmappedUsers(): Observable<{ success: boolean; data: UnmappedUser[] }> {
    return this.http.get<{ success: boolean; data: UnmappedUser[] }>(`${this.baseUrl}/unmapped-users`);
  }

  /**
   * Auto-match unmapped biometric IDs to employees by EmployeeNumber or ID
   */
  autoMapEmployees(): Observable<{ success: boolean; message: string; matchedCount: number }> {
    return this.http.post<{ success: boolean; message: string; matchedCount: number }>(
      `${this.baseUrl}/mappings/auto-map`,
      {}
    );
  }

  /**
   * Get daily biometric attendance records
   */
  getDailyRecords(params: {
    page?: number;
    limit?: number;
    date?: string;
    employeeId?: number;
    status?: string;
    search?: string;
  } = {}): Observable<{
    success: boolean;
    data: { page: number; limit: number; total: number; records: BiometricDailyRecord[] };
  }> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params.date) httpParams = httpParams.set('date', params.date);
    if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.search) httpParams = httpParams.set('search', params.search.trim());

    return this.http.get<{
      success: boolean;
      data: { page: number; limit: number; total: number; records: BiometricDailyRecord[] };
    }>(`${this.baseUrl}/daily-records`, { params: httpParams });
  }

  /**
   * Get dynamic company locations from Master Data API (/api/locations)
   */
  getLocations(): Observable<CompanyLocation[]> {
    return this.http.get<CompanyLocation[]>(`${environment.apiURL}/api/locations`);
  }
}
