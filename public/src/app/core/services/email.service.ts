import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  sendEmail(candidate: any): Observable<any> {
    console.log('Mock email sent for candidate:', candidate);
    return of({ success: true });
  }
}
