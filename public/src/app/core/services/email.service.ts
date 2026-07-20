import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiBase = `${environment.apiURL}`;

  constructor(private http: HttpClient) { }

  /**
   * Send offer email to a candidate.
   * @param to         Recipient email address
   * @param subject    Email subject line
   * @param html       Full HTML body of the email
   */
  sendOfferEmail(to: string, subject: string, html: string): Observable<any> {
    return this.http.post<any>(`${this.apiBase}/send-email`, { to, subject, html });
  }

  /**
   * Legacy mock – kept for backward compatibility, proxies to real endpoint.
   */
  sendEmail(candidate: any): Observable<any> {
    const email = candidate?.email || candidate?.personalDetails?.email || '';
    const name = candidate?.first_name || candidate?.personalDetails?.FirstName || 'Candidate';
    const html = `<p>Hello ${name},</p><p>Your offer has been sent.</p>`;
    return this.sendOfferEmail(email, 'Your Offer Letter – Sree Tammina Software Solutions', html);
  }
}
