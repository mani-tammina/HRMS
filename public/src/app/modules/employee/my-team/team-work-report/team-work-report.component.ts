import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { catchError } from 'rxjs';
import { TimesheetService } from '../../../../core/services/timesheet.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { TimesheetPreviewComponent } from '../../../attendance/work-track/timesheet-preview.component';

@Component({
  selector: 'app-team-work-report',
  templateUrl: './team-work-report.component.html',
  styleUrls: ['./team-work-report.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TeamWorkReportComponent implements OnInit {
  @Input() employeeId?: number;

  teamMembers: any[] = [];
  selectedEmployeeId?: number;
  reportData: any[] = [];
  summary: any = null;
  isLoading = false;

  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();

  isManager = false;
  userRole: string | null = null;

  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  years: number[] = [];

  constructor(
    private modalCtrl: ModalController,
    private timesheetService: TimesheetService,
    private employeeService: EmployeeService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 5; i--) {
        this.years.push(i);
    }
  }

  ngOnInit() {
    this.updateRole();
    this.loadTeamMembers();
    if (this.employeeId) {
      this.selectedEmployeeId = this.employeeId;
      this.fetchReport();
    } else if (!this.isManager) {
      this.fetchReport();
    }
  }

  updateRole() {
    this.userRole = (localStorage.getItem('role') || '').toLowerCase();
    this.isManager = (this.userRole === 'manager' || this.userRole === 'hr');
  }

  loadTeamMembers() {
    this.employeeService.getMyTeamList().subscribe({
      next: (res: any) => {
        this.teamMembers = res.team || res || [];
        if (!this.selectedEmployeeId && this.teamMembers.length > 0) {
          this.selectedEmployeeId = this.teamMembers[0].id;
          this.fetchReport();
        }
      },
      error: (err) => console.error('Failed to load team members', err)
    });
  }

  onEmployeeChange(event: any) {
    this.selectedEmployeeId = event.detail.value;
    this.fetchReport();
  }

  onFilterChange() {
    this.fetchReport();
  }

  fetchReport() {
    this.isLoading = true;
    const params: any = {
      month: this.month,
      year: this.year
    };

    let fetchObservable;

    if (this.selectedEmployeeId) {
        // Fetch specific member (Manager only)
        fetchObservable = this.timesheetService.getTeamMemberTimesheets(this.selectedEmployeeId, params);
    } else {
        // Fetch self (Manager or Employee)
        // Trying project timesheets first, but we could also forkJoin or check.
        // For unified view, let's just use what was in work-track.page.ts but simplified.
        fetchObservable = this.timesheetService.getMyProjectTimesheets(params).pipe(
          catchError(() => this.timesheetService.getMyRegularTimesheets(params))
        );
    }

    fetchObservable.subscribe({
      next: (res: any) => {
        // Project timesheets return { data: [...] } or just [...]
        this.reportData = res?.data || res || [];
        this.calculateSummary();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch report', err);
        this.isLoading = false;
      }
    });
  }

  calculateSummary() {
    if (!this.reportData || this.reportData.length === 0) {
      this.summary = null;
      return;
    }

    const totalHours = this.reportData.reduce((sum, log) => sum + Number(log.total_hours || 0), 0);
    const uniqueDays = new Set(this.reportData.map(log => log.date?.split('T')[0])).size;
    const verified = this.reportData.filter(log => ['verified', 'approved'].includes(log.status?.toLowerCase())).length;
    const pending = this.reportData.filter(log => ['submitted', 'pending'].includes(log.status?.toLowerCase())).length;

    this.summary = {
      total_hours: totalHours.toFixed(2),
      days_logged: uniqueDays,
      verified_logs: verified,
      pending_logs: pending,
      avg_hours: uniqueDays > 0 ? (totalHours / uniqueDays).toFixed(2) : '0.00'
    };
  }

  downloadReport() {
    if (!this.reportData || this.reportData.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Project,Status,Total Hours,Work Description\n";

    this.reportData.forEach(log => {
      const date = new Date(log.date).toLocaleDateString();
      const project = log.project_name || 'Regular';
      const status = log.status || 'Submitted';
      const hours = log.total_hours;
      const desc = (log.work_description || log.notes || '').replace(/,/g, ' ');
      csvContent += `${date},${project},${status},${hours},${desc}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const emp = this.teamMembers.find(m => m.id === this.selectedEmployeeId);
    const name = emp ? `${emp.FirstName}_${emp.LastName}` : 'WorkReport';
    link.setAttribute("download", `${name}_${this.month}_${this.year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async openPreview(row: any) {
    if (typeof row.hours_breakdown === 'string') {
      try { row.hours_breakdown = JSON.parse(row.hours_breakdown); } catch (e) {}
    }
    const modal = await this.modalCtrl.create({
      component: TimesheetPreviewComponent,
      cssClass: 'side-custom-popup view-work-log',
      componentProps: { data: row },
    });
    await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getStatusColor(status: string): string {
    if (!status) return 'medium';
    status = status.toLowerCase();
    if (status === 'verified' || status === 'approved') return 'success';
    if (status === 'submitted' || status === 'pending') return 'primary';
    if (status === 'rejected') return 'danger';
    return 'medium';
  }

  parseBreakdown(breakdown: any): any[] {
    if (typeof breakdown === 'string') {
      try { return JSON.parse(breakdown); } catch (e) { return []; }
    }
    return Array.isArray(breakdown) ? breakdown : [];
  }
}
