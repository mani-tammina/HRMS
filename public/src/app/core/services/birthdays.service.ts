import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface BirthdayEmployee {
  id: number;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  department: string;
  designation: string;
  profile_picture: string | null;
}

export interface BirthdayWish {
  id: number;
  employee_id: number;
  wished_by: number;
  wished_by_name: string;
  wish_message: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class BirthdaysService {
  private apiUrl = `${environment.apiUrl}/birthdays`;

  constructor(private http: HttpClient) {}

  // Get Today's Birthdays
  getTodaysBirthdays(): Observable<{ success: boolean; birthdays: BirthdayEmployee[] }> {
    return this.http.get<{ success: boolean; birthdays: BirthdayEmployee[] }>(
      `${this.apiUrl}/today`
    );
  }

  // Get Upcoming Birthdays (Next 7 days)
  getUpcomingBirthdays(days?: number): Observable<{ success: boolean; birthdays: BirthdayEmployee[] }> {
    let params: any = {};
    if (days) params.days = days.toString();

    return this.http.get<{ success: boolean; birthdays: BirthdayEmployee[] }>(
      `${this.apiUrl}/upcoming`,
      { params }
    );
  }

  // Send Birthday Wish
  sendBirthdayWish(employeeId: number, message: string): 
    Observable<{ success: boolean; message: string; wish?: BirthdayWish }> {
    return this.http.post<{ success: boolean; message: string; wish?: BirthdayWish }>(
      `${this.apiUrl}/wish`,
      { employee_id: employeeId, wish_message: message }
    );
  }

  // Get Birthday Wishes for an Employee
  getBirthdayWishes(employeeId: number): Observable<{ success: boolean; wishes: BirthdayWish[] }> {
    return this.http.get<{ success: boolean; wishes: BirthdayWish[] }>(
      `${this.apiUrl}/${employeeId}/wishes`
    );
  }
}
