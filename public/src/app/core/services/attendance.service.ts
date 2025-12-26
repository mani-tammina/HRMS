import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Attendance {
  id: number;
  employee_id: number;
  attendance_date: string;
  punch_date?: string;
  check_in: string;
  check_out?: string;
  first_check_in?: string;
  last_check_out?: string;
  last_punch_type?: 'in' | 'out';
  punch_in_time?: string;
  punch_out_time?: string;
  work_mode?: string;
  location?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
  total_hours?: number;
  gross_hours?: number;
  total_work_hours?: number;
  total_break_hours?: number;
  notes?: string;
  ip_address?: string;
  device_info?: string;
  source?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  getAttendance(startDate?: string, endDate?: string): Observable<any[]> {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    console.log('AttendanceService: Fetching attendance with params:', params);
    return this.http.get<any[]>(`${this.apiUrl}/me`, { params });
  }

  punchIn(workMode?: string, location?: string, notes?: string): Observable<any> {
    console.log('AttendanceService: Punching in with work mode:', workMode);
    return this.http.post<any>(`${this.apiUrl}/punch-in`, {
      work_mode: workMode || 'Office',
      location: location,
      notes: notes
    });
  }

  punchOut(notes?: string): Observable<any> {
    console.log('AttendanceService: Punching out');
    return this.http.post<any>(`${this.apiUrl}/punch-out`, {
      notes: notes
    });
  }

  getTodayStatus(): Observable<any> {
    console.log('AttendanceService: Fetching today status');
    return this.http.get<any>(`${this.apiUrl}/today`);
  }

  getTodayAttendance(): Observable<any> {
    console.log('AttendanceService: Fetching today attendance');
    return this.http.get<any>(`${this.apiUrl}/today`).pipe(
      map((response: any) => {
        console.log('AttendanceService: Today attendance response:', response);
        if (response.has_attendance) {
          return response.attendance;
        }
        return null;
      })
    );
  }

  getMonthlyReport(month: string, year: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/report/monthly`, {
      params: { month, year }
    });
  }
}
