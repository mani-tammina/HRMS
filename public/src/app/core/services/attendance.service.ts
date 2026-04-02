import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AttendanceApiService } from './attendance-api.service';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private env = environment;

  private monthlyReportSource = new BehaviorSubject<any[]>([]);
  monthlyReport$ = this.monthlyReportSource.asObservable();

  constructor(private http: HttpClient) {}

  loadMonthlyReportOnAppStart(attendanceApi: AttendanceApiService, year: number, month: number): void {
    const lastDay = new Date(year, month, 0).getDate();
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;

    attendanceApi.getMonthlyReport({ startDate, endDate, month, year }).subscribe({
      next: res => {
        const report = res?.attendance || [];
        this.monthlyReportSource.next(report);
      },
      error: err => {
        console.error('Monthly report failed', err);
        this.monthlyReportSource.next([]);
      }
    });
  }

  setMonthlyReport(report: any[]): void {
    this.monthlyReportSource.next(report);
  }

  getMonthlyReports(): any[] {
    return this.monthlyReportSource.getValue();
  }
}
