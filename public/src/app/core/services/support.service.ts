import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface SupportTicket {
  id: number;
  employee_id: number;
  employee_name?: string;
  category: 'IT' | 'HR' | 'Payroll' | 'Leave' | 'Attendance' | 'Other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assigned_to: number | null;
  assigned_to_name?: string;
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = `${environment.apiUrl}/support`;

  constructor(private http: HttpClient) {}

  // Get All Tickets (Admin/Support)
  getAllTickets(status?: string, category?: string, priority?: string): 
    Observable<{ success: boolean; tickets: SupportTicket[] }> {
    let params: any = {};
    if (status) params.status = status;
    if (category) params.category = category;
    if (priority) params.priority = priority;

    return this.http.get<{ success: boolean; tickets: SupportTicket[] }>(
      this.apiUrl,
      { params }
    );
  }

  // Get My Tickets
  getMyTickets(status?: string): Observable<{ success: boolean; tickets: SupportTicket[] }> {
    let params: any = {};
    if (status) params.status = status;

    return this.http.get<{ success: boolean; tickets: SupportTicket[] }>(
      `${this.apiUrl}/my-tickets`,
      { params }
    );
  }

  // Get Ticket by ID
  getTicket(id: number): Observable<{ success: boolean; ticket: SupportTicket }> {
    return this.http.get<{ success: boolean; ticket: SupportTicket }>(
      `${this.apiUrl}/${id}`
    );
  }

  // Create Ticket
  createTicket(ticket: {
    category: string;
    priority: string;
    subject: string;
    description: string;
  }): Observable<{ success: boolean; message: string; ticket?: SupportTicket }> {
    return this.http.post<{ success: boolean; message: string; ticket?: SupportTicket }>(
      this.apiUrl,
      ticket
    );
  }

  // Update Ticket (Admin/Support)
  updateTicket(id: number, updates: {
    status?: string;
    assigned_to?: number;
    resolution_notes?: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`,
      updates
    );
  }

  // Close Ticket
  closeTicket(id: number, resolution_notes?: string): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}/close`,
      { resolution_notes }
    );
  }

  // Add Comment to Ticket
  addComment(id: number, comment: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}/comment`,
      { comment }
    );
  }
}
