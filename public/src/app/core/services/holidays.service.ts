import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Holiday {
  id: number;
  holiday_date: string;
  holiday_name: string;
  holiday_type: string;
  is_optional: boolean;
  location_id: number | null;
  description: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  private apiUrl = `${environment.apiUrl}/holidays`;

  constructor(private http: HttpClient) {}

  // Get All Holidays
  getAllHolidays(year?: number, location?: number): Observable<{ success: boolean; holidays: Holiday[] }> {
    let params: any = {};
    if (year) params.year = year.toString();
    if (location) params.location = location.toString();

    return this.http.get<{ success: boolean; holidays: Holiday[] }>(
      this.apiUrl,
      { params }
    );
  }

  // Get Upcoming Holidays
  getUpcomingHolidays(limit?: number): Observable<{ success: boolean; holidays: Holiday[] }> {
    let params: any = {};
    if (limit) params.limit = limit.toString();

    return this.http.get<{ success: boolean; holidays: Holiday[] }>(
      `${this.apiUrl}/upcoming`,
      { params }
    );
  }

  // Admin: Create Holiday
  createHoliday(holiday: Partial<Holiday>): Observable<{ success: boolean; message: string; holiday?: Holiday }> {
    return this.http.post<{ success: boolean; message: string; holiday?: Holiday }>(
      this.apiUrl,
      holiday
    );
  }

  // Admin: Update Holiday
  updateHoliday(id: number, holiday: Partial<Holiday>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`,
      holiday
    );
  }

  // Admin: Delete Holiday
  deleteHoliday(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`
    );
  }
}
