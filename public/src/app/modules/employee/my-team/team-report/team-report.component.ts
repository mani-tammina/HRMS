import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AttendanceApiService } from '../../../../core/services/attendance-api.service';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.scss'],
  standalone: false
})
export class TeamReportComponent implements OnInit {
  @Input() employeeId?: number;

  teamMembers: any[] = [];
  selectedEmployeeId?: number;
  reportData: any = null;
  summary: any = null;
  isLoading = false;

  startDate: string = '';
  endDate: string = '';
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();

  constructor(
    private modalCtrl: ModalController,
    private attendanceService: AttendanceApiService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.setDefaultDates();
    this.loadTeamMembers();
    if (this.employeeId) {
      this.selectedEmployeeId = this.employeeId;
      this.fetchReport();
    }
  }

  setDefaultDates() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.startDate = this.formatDate(firstDay);
    this.endDate = this.formatDate(lastDay);
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month, day].join('-');

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

  onDateChange() {
    this.updateDateRange();
    this.fetchReport();
  }

  updateDateRange() {
    const firstDay = new Date(this.year, this.month - 1, 1);
    const lastDay = new Date(this.year, this.month, 0);
    this.startDate = this.formatDate(firstDay);
    this.endDate = this.formatDate(lastDay);
  }

  fetchReport() {
    if (!this.selectedEmployeeId) return;

    this.isLoading = true;
    const params = {
      startDate: this.startDate,
      endDate: this.endDate,
      month: this.month,
      year: this.year
    };

    // The other service had getEmployeeReport, but I'll use a safer check or align with the other edit
    const serviceMethod = (this.attendanceService as any).getEmployeeReport ? 'getEmployeeReport' : 'getEmployeeAttendanceReport';

    (this.attendanceService as any)[serviceMethod](this.selectedEmployeeId, params).subscribe({
      next: (res: any) => {
        this.reportData = res.attendance || [];
        this.summary = res.summary || null;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch report', err);
        this.isLoading = false;
      }
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getStatusClass(status: string): string {
    status = status?.toLowerCase() || '';
    if (status === 'present') return 'status-present';
    if (status === 'absent') return 'status-absent';
    if (status === 'on-leave' || status === 'on_leave') return 'status-leave';
    if (status === 'half-day') return 'status-half';
    return '';
  }

  async openAttendanceDetails(row: any) {
    if (row.status?.toLowerCase() === 'absent') return;
    // For now we just show a toast or we can implement a punch detail modal
    console.log('Viewing details for', row.attendance_date);
  }

  downloadAttendanceReport() {
    if (!this.reportData || this.reportData.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Status,First In,Last Out,Hours,Mode\n";

    this.reportData.forEach((row: any) => {
      const date = new Date(row.attendance_date).toLocaleDateString();
      const status = row.status || '---';
      const firstIn = row.first_check_in ? new Date(row.first_check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---';
      const lastOut = row.last_punch_time ? new Date(row.last_punch_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---';
      const hours = row.gross_hours || '0.00';
      const mode = row.work_mode || 'OFFICE';
      
      csvContent += `${date},${status},${firstIn},${lastOut},${hours},${mode}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const emp = this.teamMembers.find(m => m.id === this.selectedEmployeeId);
    const name = emp ? `${emp.FirstName}_${emp.LastName}` : 'AttendanceReport';
    link.setAttribute("download", `${name}_Attendance_${this.month}_${this.year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
