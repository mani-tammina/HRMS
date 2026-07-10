import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse, HttpClient, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { RouteGuardService } from '../services/route-guard.service';
import { environment } from 'src/environments/environment';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take, Observable } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const routeGuardService = inject(RouteGuardService);
  const http = inject(HttpClient);
  const env = environment;

  // Skip refresh requests to prevent infinite loops
  if (req.url.includes('/api/auth/refresh-expired')) {
    return next(req);
  }

  const token =
    localStorage.getItem('access_token') ||
    localStorage.getItem('token') ||
    localStorage.getItem('accessToken');

  let authReq = req;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token && token.trim() !== '') {
    headers['Authorization'] = `Bearer ${token}`;
  }
  authReq = req.clone({ setHeaders: headers });

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        const currentToken = localStorage.getItem('access_token') || localStorage.getItem('token');
        if (currentToken) {
          return handle401Error(authReq, next, routeGuardService, http, env);
        }
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  routeGuardService: RouteGuardService,
  http: HttpClient,
  env: any
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken =
      localStorage.getItem('refresh_token') ||
      localStorage.getItem('refreshToken');

    if (!refreshToken) {
      isRefreshing = false;
      routeGuardService.logout();
      return throwError(() => new Error('Missing refresh token'));
    }

    return http.post<any>(`http://${env.apiURL}/api/auth/refresh-expired`, {
      refreshToken
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      switchMap((res) => {
        isRefreshing = false;
        
        if (res && res.token) {
          // Store new token
          const nextRefreshToken = res.refreshToken || refreshToken;
          routeGuardService.storeTokens(
            res.token,
            nextRefreshToken,
            routeGuardService.employeeID,
            routeGuardService.userRole || 'employee'
          );
          localStorage.setItem('token', res.token);
          localStorage.setItem('refresh_token', nextRefreshToken);
          
          refreshTokenSubject.next(res.token);
          
          // Retry the original failed request with the new token
          return next(request.clone({
            setHeaders: {
              Authorization: `Bearer ${res.token}`
            }
          }));
        } else {
          // Refresh failed
          routeGuardService.logout();
          return throwError(() => new Error('Token refresh failed'));
        }
      }),
      catchError((err) => {
        isRefreshing = false;
        routeGuardService.logout();
        return throwError(() => err);
      })
    );
  } else {
    // If refreshing is already in progress, wait for the new token
    return refreshTokenSubject.pipe(
      filter((t): t is string => t !== null),
      take(1),
      switchMap((token) => {
        return next(request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }));
      })
    );
  }
}

