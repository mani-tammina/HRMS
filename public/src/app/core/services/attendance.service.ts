import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  workHours?: number;
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
    return this.http.get<Attendance[]>(`${this.apiUrl}/me`, { params });
  }

  checkIn(workMode?: string, location?: string, notes?: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkin`, {
      work_mode: workMode || 'Office',
      location: location,
      notes: notes
    });
  }

  checkOut(notes?: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkout`, {
      notes: notes
    });
  }

  getTodayAttendance(): Observable<Attendance | null> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<Attendance[]>(`${this.apiUrl}/me`, {
      params: { startDate: today, endDate: today }
    }).pipe(
      map((records: Attendance[]) => records.length > 0 ? records[0] : null)
    );
  }

  getMonthlyReport(month: string, year: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/report/monthly`, {
      params: { month, year }
    });
  }
}
