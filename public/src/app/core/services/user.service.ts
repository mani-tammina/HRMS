import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface User {
  id: number;
  username: string;
  role: string;
  full_name?: string;
  email?: string;
  created_at?: string;
  last_login?: string;
}

export interface UserRoleUpdate {
  userId: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Get single user
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Update user role (generic)
  updateUserRole(id: number, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/role`, { role });
  }

  // Make user HR
  makeHR(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${id}/make-hr`, {});
  }

  // Make user Manager
  makeManager(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${id}/make-manager`, {});
  }

  // Make user Admin
  makeAdmin(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${id}/make-admin`, {});
  }

  // Make user Employee
  makeEmployee(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${id}/make-employee`, {});
  }

  // Bulk update roles
  bulkUpdateRoles(updates: UserRoleUpdate[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/bulk-update-roles`, { updates });
  }
}
