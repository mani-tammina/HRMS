import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Announcement {
  id: number;
  title: string;
  message: string;
  priority?: 'normal' | 'high' | 'urgent';
  created_by: number;
  created_at: string;
}

interface AnnouncementResponse {
  id: number;
  title: string;
  body: string;
  created_by: number;
  created_at: string;
  starts_at?: string;
  ends_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = `${environment.apiUrl}/announcements`;

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<AnnouncementResponse[]>(this.apiUrl).pipe(
      map(announcements => announcements.map(a => ({
        id: a.id,
        title: a.title,
        message: a.body,
        priority: 'normal' as const,
        created_by: a.created_by,
        created_at: a.created_at
      })))
    );
  }

  createAnnouncement(announcement: Partial<Announcement>): Observable<{ id: number; success: boolean }> {
    // Transform message to body for backend
    const payload = {
      title: announcement.title,
      message: announcement.message
    };
    return this.http.post<{ id: number; success: boolean }>(this.apiUrl, payload);
  }

  updateAnnouncement(id: number, announcement: Partial<Announcement>): Observable<{ success: boolean }> {
    // Transform message to body for backend
    const payload = {
      title: announcement.title,
      body: announcement.message
    };
    return this.http.put<{ success: boolean }>(`${this.apiUrl}/${id}`, payload);
  }

  deleteAnnouncement(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }
}
