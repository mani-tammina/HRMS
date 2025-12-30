import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, switchMap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department?: string;
  position?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUser();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    // Clear old data first
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);

    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((response: any) => {
          // Store token immediately
          this.setToken(response.token);
        }),
        switchMap((response: any) => {
          // Fetch employee profile data
          return this.http.get<any>(`${environment.apiUrl}/employees/profile/me`).pipe(
            tap((employeeData: any) => {
              // Create user object with employee data
              const user: User = {
                id: response.user.id.toString(),
                email: employeeData?.WorkEmail || response.user.username,
                name: employeeData?.FullName || `${employeeData?.FirstName || ''} ${employeeData?.LastName || ''}`.trim() || response.user.username,
                role: response.user.role || 'employee',
                department: employeeData?.department_name,
                position: employeeData?.designation_name,
                avatar: employeeData?.ProfilePicture || 'assets/avatar-placeholder.png'
              };
              this.setUser(user);
            }),
            catchError(() => {
              // If employee fetch fails, use basic user info
              const user: User = {
                id: response.user.id.toString(),
                email: response.user.username,
                name: response.user.username,
                role: response.user.role || 'employee',
                avatar: 'assets/avatar-placeholder.png'
              };
              this.setUser(user);
              return of(response);
            }),
            switchMap(() => of(response))
          );
        })
      );
  }

  register(userData: any): Observable<AuthResponse> {
    // Note: Registration endpoint not implemented in backend yet
    // For now, contact admin to create account
    throw new Error('Registration not available. Please contact administrator.');
  }

  logout(): void {
    // Call server logout API
    this.http.post(`${environment.apiUrl}/auth/logout`, {}).subscribe({
      next: () => {
        console.log('Logout API called successfully');
      },
      error: (error) => {
        console.error('Logout API error:', error);
        // Continue with logout even if API fails
      },
      complete: () => {
        // Clear ALL session data
        this.clearAllSessionData();
        
        // Navigate to login page
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Clear all session-related data from storage and memory
   */
  private clearAllSessionData(): void {
    // Clear localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear any other potential cached data
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('hrms_') || 
        key.includes('cache') || 
        key.includes('session')
      )) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Clear sessionStorage completely
    sessionStorage.clear();
    
    // Reset user state in BehaviorSubject
    this.currentUserSubject.next(null);
    
    console.log('All session data cleared successfully');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  loadUser(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
