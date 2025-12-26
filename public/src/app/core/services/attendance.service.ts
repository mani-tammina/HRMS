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
  last_punch_type?: 'in' | 'out';
  punch_in_time?: string;
  punch_out_time?: string;
  work_mode?: string;
  location?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
  total_hours?: number;
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

  getAttendance(startDate?: string, endDate?: string): Observable<Attendance[]> {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    console.log('AttendanceService: Fetching attendance with params:', params);
    return this.http.get<Attendance[]>(`${this.apiUrl}/me`, { params });
  }

  checkIn(workMode?: string, location?: string, notes?: string): Observable<any> {
    console.log('AttendanceService: Checking in with work mode:', workMode);
    return this.http.post<any>(`${this.apiUrl}/checkin`, {
      work_mode: workMode || 'Office',
      location: location,
      notes: notes
    });
  }

  checkOut(notes?: string): Observable<any> {
    console.log('AttendanceService: Checking out');
    return this.http.post<any>(`${this.apiUrl}/checkout`, {
      notes: notes
    });
  }

  getTodayAttendance(): Observable<Attendance | null> {
    const today = new Date().toISOString().split('T')[0];
    console.log('AttendanceService: Fetching today attendance for:', today);
    return this.http.get<Attendance[]>(`${this.apiUrl}/me`, {
      params: { startDate: today, endDate: today }
    }).pipe(
      map((records: Attendance[]) => {
        console.log('AttendanceService: Today attendance response:', records);
        return records.length > 0 ? records[0] : null;
      })
    );
  }

  getMonthlyReport(month: string, year: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/report/monthly`, {
      params: { month, year }
    });
  }
}
