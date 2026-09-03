import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { AttendanceApiService } from '../../../core/services/attendance-api.service';
import { environment } from 'src/environments/environment';
import { ManagerLeaveApprovalsComponent } from './manager-leave-approvals/manager-leave-approvals.component';
import { ManagerTimesheetApprovalsComponent } from './manager-timesheet-approvals/manager-timesheet-approvals.component';
import { ManagerWfhApprovalsComponent } from './manager-wfh-approvals/manager-wfh-approvals.component';
import { TeamReportComponent } from './team-report/team-report.component';
import { TeamWorkReportComponent } from './team-work-report/team-work-report.component';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.page.html',
  styleUrls: ['./my-team.page.scss'],
  standalone: false
})
export class MyTeamPage implements OnInit, OnDestroy {
  teamMembers: any[] = [];
  filteredTeam: any[] = [];
  isLoading = false;

  attendanceStatuses: { [key: number]: any } = {};
  pollingInterval: any;

  searchTerm: string = '';
  isManager = false;
  userRole: string | null = null;
  teamAttendanceSummary: any = null;
  currentUserId: number | null = null; // ID of the logged-in employee

  // HR Search
  isHR = false;
  globalSearchQuery = '';
  originalTeam: any[] = [];
  env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}/`;

  selectedDate: string = new Date().toISOString();
  maxDate: string = new Date().toISOString();
  currentFilter: string = 'all';
  counts = {
    total: 0,
    present: 0,
    absent: 0,
    onLeave: 0,
    notPunched: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceApiService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateRole();
    this.loadTeamMembers();
  }

  /* ===================== ROLE ===================== */
  private updateRole() {
    this.userRole = (localStorage.getItem('role') || '').toLowerCase();
    this.isManager = (this.userRole === 'manager' || this.userRole === 'hr' || this.userRole === 'admin');
    this.isHR = (this.userRole === 'hr' || this.userRole === 'admin');
  }

  setFilter(status: string) {
    this.currentFilter = status;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.teamMembers];

    // Status Filter
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(m => {
        const stats = this.getRealTimeStatus(m.id);
        const status = (stats.status || '').toLowerCase();
        if (this.currentFilter === 'on_leave') return status.includes('leave') || status === 'on_leave';
        if (this.currentFilter === 'absent') return status === 'absent';
        if (this.currentFilter === 'not_punched') return status === 'not_punched' || status === 'not_checked_in' || !status;
        if (this.currentFilter === 'present') return status === 'present' || status === 'in' || status === 'wfh' || (status !== 'absent' && status !== 'not_punched' && status !== 'not_checked_in' && !status.includes('leave'));
        return true;
      });
    }

    // Search Filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(member => {
        return (
          member.FirstName?.toLowerCase().includes(term) ||
          member.LastName?.toLowerCase().includes(term) ||
          member.WorkEmail?.toLowerCase().includes(term) ||
          member.DesignationCode?.toLowerCase().includes(term)
        );
      });
    }

    this.filteredTeam = filtered;
    console.log(this.filteredTeam);
  }

  ionViewWillEnter() {
    this.startAttendancePolling();
  }

  ionViewWillLeave() {
    this.stopAttendancePolling();
  }

  ngOnDestroy() {
    this.stopAttendancePolling();
  }

  loadTeamMembers() {
    this.isLoading = true;
    const selectedDate = this.selectedDate.split('T')[0];

    this.employeeService.getTeamAttendanceReport(selectedDate).subscribe({
      next: (res: any) => {
        // Capture the logged-in user's employee id for highlighting
        if (res?.current_user_id) {
          this.currentUserId = res.current_user_id;
        }
        if (res?.team_members) {
          this.teamMembers = res.team_members;
        } else {
          if (this.teamMembers.length === 0) {
            this.fetchBaseTeamList(selectedDate);
            return;
          }
        }
        this.processAttendanceData(res);
      },
      error: (error: any) => {
        console.error('Error fetching team report:', error);
        this.fetchBaseTeamList(selectedDate);
      }
    });
  }

  fetchBaseTeamList(date: string) {
    this.employeeService.getMyTeamList().subscribe({
      next: (res: any) => {
        this.teamMembers = res?.team || (Array.isArray(res) ? res : []);
        this.employeeService.getTeamAttendanceReport(date).subscribe({
          next: (reportRes) => this.processAttendanceData(reportRes),
          error: () => this.processAttendanceData({})
        });
      },
      error: (err) => {
        console.error('Failed to load team list:', err);
        this.isLoading = false;
      }
    });
  }

  processAttendanceData(res: any) {
    const attendanceList = res.attendance || [];
    const leaveList = res.on_leave || [];
    const newStatuses: any = {};
    const isToday = this.isTodaySelected();

    this.teamMembers.forEach(m => {
      newStatuses[m.id] = {
        status: isToday ? 'not_punched' : 'absent'
      };
    });

    attendanceList.forEach((att: any) => {
      newStatuses[att.employee_id] = {
        status: 'present',
        first_in: att.first_in || att.first_check_in,
        last_out: att.last_out || att.last_check_out,
        total_hours: att.total_hours || att.total_work_hours,
        work_mode: att.work_mode
      };
    });

    leaveList.forEach((leave: any) => {
      newStatuses[leave.employee_id] = {
        status: 'on_leave',
        leave_type: leave.leave_type
      };
    });

    this.attendanceStatuses = newStatuses;
    if (this.originalTeam.length === 0) {
      this.originalTeam = [...this.teamMembers];
    }
    this.applyFilters();

    if (res.summary && !isToday) {
      this.counts = {
        total: res.summary.total_team || this.teamMembers.length,
        present: res.summary.present || 0,
        absent: res.summary.absent || 0,
        onLeave: res.summary.on_leave || 0,
        notPunched: 0
      };
    } else {
      this.calculateCounts();
    }

    this.applyFilters();
    this.isLoading = false;
  }

  calculateCounts() {
    const isToday = this.isTodaySelected();
    this.counts = {
      total: this.teamMembers.length,
      present: 0,
      absent: 0,
      onLeave: 0,
      notPunched: 0
    };

    this.teamMembers.forEach(m => {
      const stats = this.getRealTimeStatus(m.id);
      const status = (stats.status || '').toLowerCase();

      if (status.includes('leave') || status === 'on_leave') {
        this.counts.onLeave++;
      } else if (status === 'absent') {
        this.counts.absent++;
      } else if (status === 'not_punched' || status === 'not_checked_in') {
        if (!isToday) {
          this.counts.absent++;
        } else {
          this.counts.notPunched++;
        }
      } else {
        // Any attendance marked (web clock-in, remote, wfh, biometric) is counted as Present
        this.counts.present++;
      }
    });
  }

  getProfileImage(member: any): string {
    const image = member?.profile_image || member?.ProfileImage;
    if (image) {
      if (image.startsWith('http')) return image;
      const baseUrl = environment.apiURL.endsWith('/') ? environment.apiURL.slice(0, -1) : environment.apiURL;
      const imagePath = image.startsWith('/') ? image : `/${image}`;
      return `${baseUrl}${imagePath}`;
    }
    return 'assets/Profile_Picture.png';
  }

  handleRefresh(event: any) {
    this.loadTeamMembers();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  filterTeam(event: any) {
    this.searchTerm = event.target.value || '';
    this.applyFilters();
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  }

  getAvatarColor(id: number): string {
    const colors = ['#1F74BB', '#BB2C1F', '#00983D'];
    return colors[id % colors.length];
  }

  /** Returns card-accent color based on attendance status */
  getAccentColor(employeeId: number): string {
    const status = (this.getRealTimeStatus(employeeId).status || '').toLowerCase();
    if (status.includes('leave') || status === 'on_leave') {
      return 'rgb(31, 116, 187)';    // On Leave — Blue
    }
    if (status === 'absent') {
      return 'rgb(187, 44, 31)';     // Absent — Red
    }
    if (status === 'not_punched' || status === 'not_checked_in') {
      return '#1f74bb';              // Not Punched — Blue
    }
    // Any employee with attendance / punch is Present
    return 'rgb(0, 152, 61)';        // Present — Green
  }

  async navigateToLeaveApprovals() {
    const modal = await this.modalCtrl.create({
      component: ManagerLeaveApprovalsComponent,
      cssClass: 'side-custom-popup team-popup',
      backdropDismiss: false,
    });
    await modal.present();
  }

  async navigateToTimesheetApprovals() {
    const modal = await this.modalCtrl.create({
      component: ManagerTimesheetApprovalsComponent,
      cssClass: 'side-custom-popup timesheet-popup',
      backdropDismiss: false,
    });
    await modal.present();
  }

  async navigateToAttendanceApprovals() {
    const modal = await this.modalCtrl.create({
      component: ManagerWfhApprovalsComponent,
      cssClass: 'side-custom-popup team-popup',
      backdropDismiss: false,
    });
    await modal.present();
  }

  async navigateToTeamReports() {
    const modal = await this.modalCtrl.create({
      component: TeamReportComponent,
      cssClass: 'side-custom-popup team-report-popup',
      backdropDismiss: false,
    });
    await modal.present();
  }

  async navigateToTeamWorkReports() {
    const modal = await this.modalCtrl.create({
      component: TeamWorkReportComponent,
      cssClass: 'side-custom-popup team-report-popup',
      backdropDismiss: false,
    });
    await modal.present();
  }

  navigateToMyTeam() {
    this.currentFilter = 'all';
    this.resetToToday();
  }

  onDateChange(event: any) {
    if (event.detail.value) {
      this.selectedDate = event.detail.value;
      this.loadTeamMembers();
    }
  }

  resetToToday() {
    this.selectedDate = new Date().toISOString();
    this.loadTeamMembers();
  }

  isTodaySelected(): boolean {
    const today = new Date().toISOString().split('T')[0];
    const selected = this.selectedDate.split('T')[0];
    return today === selected;
  }

  startAttendancePolling() {
    this.pollingInterval = setInterval(() => {
      if (this.isTodaySelected()) {
        this.loadTeamMembers();
      }
    }, 180000);
  }

  stopAttendancePolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  getRealTimeStatus(employeeId: number): any {
    return this.attendanceStatuses[employeeId] || { status: this.isTodaySelected() ? 'not_punched' : 'absent' };
  }

  getDisplayStatusText(employeeId: number): string {
    const status = (this.getRealTimeStatus(employeeId).status || '').toLowerCase();
    if (status.includes('leave') || status === 'on_leave') return 'ON LEAVE';
    if (status === 'absent') return 'ABSENT';
    if (status === 'not_punched' || status === 'not_checked_in') return 'NOT PUNCHED';
    // Any employee with attendance / punch (biometric, web, remote, wfh) is PRESENT
    return 'PRESENT';
  }

  getDisplayStatusClass(employeeId: number): string {
    const status = (this.getRealTimeStatus(employeeId).status || '').toLowerCase();
    if (status.includes('leave') || status === 'on_leave') return 'leave-status';
    if (status === 'absent') return 'absent';
    if (status === 'not_punched' || status === 'not_checked_in') return 'not-punched-status';
    return 'present';
  }

  // ================= HR ACTIONS =================

  onGlobalSearch() {
    const query = this.globalSearchQuery.trim();
    if (query.length > 2) {
      this.isLoading = true;
      this.employeeService.searchEmployees(query, 1, 50).subscribe({
        next: (res: any) => {
          this.teamMembers = res.data || [];
          this.applyFilters();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    } else if (query.length === 0) {
      this.resetGlobalSearch();
    }
  }

  resetGlobalSearch() {
    this.globalSearchQuery = '';
    this.teamMembers = [...this.originalTeam];
    this.applyFilters();
  }

  viewEmployeeAttendance(member: any) {
    if (!this.isManager) {
      return;
    }
    const id = member.id || member.employee_id || member.EmployeeId;
    if (id) {
      this.navCtrl.navigateForward([`/Attendance/employee/${id}`]);
    }
  }

  /** Returns true if the given team member is the logged-in user */
  isCurrentUser(member: any): boolean {
    const id = member.id || member.employee_id;
    return this.currentUserId !== null && id === this.currentUserId;
  }
}
