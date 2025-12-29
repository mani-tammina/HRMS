import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface BirthdayEmployee {
  id: number;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  WorkEmail: string;
  ProfilePicture?: string;
}

export interface BirthdayWish {
  id: number;
  sender_id: number;
  employee_id: number;
  message: string;
  created_at: string;
  sender_name?: string;
  FirstName?: string;
  LastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  private apiUrl = `${environment.apiUrl}/birthdays`;

  constructor(private http: HttpClient) {}

  getBirthdays(period: 'today' | 'week' | 'month' | 'upcoming' = 'today'): Observable<BirthdayEmployee[]> {
    return this.http.get<BirthdayEmployee[]>(`${this.apiUrl}?period=${period}`);
  }

  sendWish(employeeId: number, message: string): Observable<{ id: number; success: boolean }> {
    return this.http.post<{ id: number; success: boolean }>(`${this.apiUrl}/wishes`, {
      birthday_employee_id: employeeId,
      message
    });
  }

  getWishesForEmployee(employeeId: number): Observable<BirthdayWish[]> {
    return this.http.get<BirthdayWish[]>(`${this.apiUrl}/wishes/${employeeId}`);
  }

  getMyWishes(): Observable<BirthdayWish[]> {
    return this.http.get<BirthdayWish[]>(`${this.apiUrl}/wishes/my/received`);
  }
}
