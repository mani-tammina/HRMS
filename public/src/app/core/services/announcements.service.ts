import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'policy' | 'event';
  priority: 'low' | 'medium' | 'high';
  published_by: number;
  published_by_name?: string;
  published_at: string;
  expires_at: string | null;
  is_active: boolean;
  target_audience: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private apiUrl = `${environment.apiUrl}/announcements`;

  constructor(private http: HttpClient) {}

  // Get All Active Announcements
  getAnnouncements(type?: string, limit?: number): Observable<{ success: boolean; announcements: Announcement[] }> {
    let params: any = {};
    if (type) params.type = type;
    if (limit) params.limit = limit.toString();

    return this.http.get<{ success: boolean; announcements: Announcement[] }>(
      this.apiUrl,
      { params }
    );
  }

  // Get Announcement by ID
  getAnnouncement(id: number): Observable<{ success: boolean; announcement: Announcement }> {
    return this.http.get<{ success: boolean; announcement: Announcement }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Admin: Create Announcement
  createAnnouncement(announcement: {
    title: string;
    content: string;
    type: string;
    priority: string;
    target_audience?: string;
    expires_at?: string;
  }): Observable<{ success: boolean; message: string; announcement?: Announcement }> {
    return this.http.post<{ success: boolean; message: string; announcement?: Announcement }>(
      this.apiUrl,
      announcement
    );
  }

  // Admin: Update Announcement
  updateAnnouncement(id: number, announcement: Partial<Announcement>): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`,
      announcement
    );
  }

  // Admin: Delete Announcement
  deleteAnnouncement(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Admin: Deactivate Announcement
  deactivateAnnouncement(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}/deactivate`,
      {}
    );
  }
}
