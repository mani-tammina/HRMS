import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { APP_CONSTANTS } from '@core/constants/app.constants';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  joinDate: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(employees => employees.map(emp => this.transformEmployee(emp)))
    );
  }

  private transformEmployee(emp: any): Employee {
    return {
      id: emp.id?.toString() || '',
      name: `${emp.FirstName || ''} ${emp.LastName || ''}`.trim() || 'N/A',
      email: emp.WorkEmail || emp.PersonalEmail || 'N/A',
      phone: emp.ContactNumber || emp.MobileNumber,
      department: emp.Department || 'N/A',
      position: emp.Designation || 'N/A',
      joinDate: emp.DateOfJoining || emp.created_at,
      avatar: emp.ProfilePicture || APP_CONSTANTS.DEFAULT_AVATAR,
      status: emp.EmployeeStatus === 'Active' ? 'active' : 'inactive'
    };
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  getEmployeeDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/details`);
  }

  createEmployee(employee: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTeamMembers(managerId: string): Observable<Employee[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reporting/${managerId}`).pipe(
      map(employees => employees.map(emp => this.transformEmployee(emp)))
    );
  }

  getMyProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/me`);
  }
}
