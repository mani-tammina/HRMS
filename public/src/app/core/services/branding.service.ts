import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CompanyBranding {
  id?: number;
  company_name: string;
  legal_name?: string;
  tagline?: string;
  website?: string;
  email?: string;
  phone?: string;
  tax_id?: string;
  registration_number?: string;
  logo_url?: string;
  favicon_url?: string;
  primary_color?: string;
  secondary_color?: string;
  about_us?: string;
  mission?: string;
  vision?: string;
  core_values?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LocationItem {
  id?: number;
  name: string;
  country?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  phone_number?: string;
  email?: string;
  timezone?: string;
  is_headquarters?: number | boolean;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandingService {
  private baseUrl = `${environment.apiURL}/api/company-branding`;
  public readonly defaultLogo = 'assets/tt_blue_logo.png';

  private brandingSubject = new BehaviorSubject<CompanyBranding | null>(null);
  public branding$ = this.brandingSubject.asObservable();

  public logoUrl$: Observable<string> = this.branding$.pipe(
    map((branding) => this.getFullImageUrl(branding?.logo_url, this.defaultLogo))
  );

  public companyName$: Observable<string> = this.branding$.pipe(
    map((branding) => branding?.company_name || 'Tech Tammina')
  );

  constructor(private http: HttpClient) {
    this.loadBranding();
  }

  /* ===================== BRANDING ===================== */
  loadBranding(): void {
    this.http
      .get<CompanyBranding>(this.baseUrl)
      .pipe(
        catchError((err) => {
          console.warn('Could not load company branding:', err);
          return of(null);
        })
      )
      .subscribe((branding) => {
        if (branding) {
          this.brandingSubject.next(branding);
        }
      });
  }

  getBranding(): Observable<CompanyBranding> {
    return this.http.get<CompanyBranding>(this.baseUrl).pipe(
      tap((branding) => {
        if (branding) {
          this.brandingSubject.next(branding);
        }
      })
    );
  }

  get currentBranding(): CompanyBranding | null {
    return this.brandingSubject.value;
  }

  get currentLogoUrl(): string {
    return this.getFullImageUrl(this.brandingSubject.value?.logo_url, this.defaultLogo);
  }

  updateBranding(payload: Partial<CompanyBranding>): Observable<any> {
    return this.http.put(`${this.baseUrl}`, payload).pipe(
      tap((res) => {
        const current = this.brandingSubject.value || ({} as CompanyBranding);
        const updated = { ...current, ...payload };
        this.brandingSubject.next(updated);
      })
    );
  }

  uploadLogo(file: File): Observable<{ success: boolean; logo_url: string; message: string }> {
    const formData = new FormData();
    formData.append('logo', file);
    return this.http
      .post<{ success: boolean; logo_url: string; message: string }>(
        `${this.baseUrl}/logo`,
        formData
      )
      .pipe(
        tap((res) => {
          if (res && res.logo_url) {
            const current = this.brandingSubject.value || ({ company_name: 'Tech Tammina' } as CompanyBranding);
            this.brandingSubject.next({ ...current, logo_url: res.logo_url });
          }
        })
      );
  }

  getFullImageUrl(path: string | undefined | null, fallback: string = this.defaultLogo): string {
    if (!path) return fallback;
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    if (path.startsWith('/uploads')) {
      return `${environment.apiURL}${path}`;
    }
    if (path.startsWith('uploads/')) {
      return `${environment.apiURL}/${path}`;
    }
    return path;
  }

  /* ===================== LOCATIONS ===================== */
  getLocations(): Observable<LocationItem[]> {
    return this.http.get<LocationItem[]>(`${environment.apiURL}/api/locations`);
  }

  createLocation(payload: LocationItem): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/locations`, payload);
  }

  updateLocation(id: number, payload: LocationItem): Observable<any> {
    return this.http.put(`${environment.apiURL}/api/locations/${id}`, payload);
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/api/locations/${id}`);
  }
}
