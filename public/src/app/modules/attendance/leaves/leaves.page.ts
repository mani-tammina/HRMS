import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { EmployeeLeavesService } from '../../../core/services/employee-leaves.service';
import { LeaverequestService } from '../../../core/services/leaverequest.service';
import { RouteGuardService } from '../../../core/services/route-guard.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { AttendanceApiService } from '../../../core/services/attendance-api.service';
import { ManagerTimesheetApprovalsComponent } from '../../../shared/components/manager-timesheet-approvals/manager-timesheet-approvals.component';
import { ManagerLeaveApprovalsComponent } from '../../../shared/components/manager-leave-approvals/manager-leave-approvals.component';
import { ManagerWfhApprovalsComponent } from '../../../shared/components/manager-wfh-approvals/manager-wfh-approvals.component';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
  standalone: false,
})
export class LeavesPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  currentYear = new Date().getFullYear();

  /** UI STATE */
  IsOpenleavePopup = false;
  isPopupOpen = false;
  selectedLeave: any = null;
  currentMonthFirstDateText = '';

  /** DATA */
  leaveCards: any[] = [];
  leaveRequestsDetails: any[] = [];
  teamAttendanceSummary: any = null;
  attendanceLopDays: number = 0; // LOP days from attendance API (absences + LOP-code leaves)
  pendingLeaves: any[] = [];
  historyLeaves: any[] = [];
  combinedLopDays: number = 0;

  /** MANAGER / ROLE */
  isManager = false;
  userRole: string | null = null;
  initializingLeaves = false;
  needsInitialization = false;

  env = '';

  constructor(
    private employeeLeaves: EmployeeLeavesService,
    private leaveRequestService: LeaverequestService,
    private routeGuardService: RouteGuardService,
    private employeeService: EmployeeService,
    private attendanceApi: AttendanceApiService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `http://${environment.apiURL}`;
    this.updateRole();
    this.loadLeaveBalance();
    this.getAllLeaves();
    this.loadCurrentMonthLOP();
    this.setCurrentMonthFirstDate();
    if (this.isManager) {
      this.loadTeamAttendanceSummary();
    }
  }

  /* ===================== ROLE ===================== */
  private updateRole() {
    this.userRole = this.routeGuardService.userRole?.toLowerCase() || null;
    this.isManager = this.userRole === 'manager' || this.userRole === 'hr';
  }

  /* ===================== LEAVE BALANCE ===================== */
  loadLeaveBalance() {
    this.employeeLeaves.getLeaveBalance(this.currentYear).subscribe({
      next: (res: any) => {
        const balances = res.balances || [];
        this.needsInitialization = res.needs_initialization || false;

        this.leaveCards = balances.map((item: any) => {
          const code = (item.type_code || '').toUpperCase();
          const isLOP = code === 'LOP';
          const allocated = Number(item.allocated_days) || 0;
          const used = Number(item.used_days) || 0;
          const available = (Number(item.available_days) || 0) - (Number(item.pending_days) || 0);

          return {
            title: item.type_name,
            code: code,
            allocated_days: isLOP ? '0' : allocated,
            used,
            available: isLOP ? '0' : available,
            isLOP: isLOP,
            usedPercent: isLOP ? 0 : (allocated > 0 ? Math.round((used / allocated) * 100) : 0),
            bg_color: item.bg_color,
            icon_path: item.icon_path,
          };
        });
      },
      error: err => console.error(err),
    });
  }

  /* ===================== TEAM ATTENDANCE ===================== */
  loadTeamAttendanceSummary() {
    this.employeeService.getTeamAttendanceReport().subscribe({
      next: (res: any) => {
        this.teamAttendanceSummary = res;
      },
      error: (err) => console.error('Error fetching team attendance summary:', err)
    });
  }

  /* ===================== ALL LEAVES ===================== */
  getAllLeaves() {
    this.leaveRequestService.getMyLeaves(this.currentYear).subscribe({
      next: (res: any[]) => {
        this.leaveRequestsDetails = res.map((item: any) => ({
          id: item.id,
          leave_type: item.type_name,
          type_code: (item.type_code || '').toUpperCase(),
          from_date: item.start_date,
          to_date: item.end_date,
          days: Number(item.total_days),
          status: item.status.toUpperCase(),
          applied_on: item.applied_at,
          reason: item.reason,
          is_half_day: item.is_half_day,
          half_day_session: item.half_day_session
        }));
        this.updateHistoryAndPendingLeaves();
      },
      error: err => console.error('Error fetching leave details:', err),
    });
  }

  /* ===================== CURRENT MONTH LOP ===================== */
  loadCurrentMonthLOP() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    this.attendanceApi.getMonthlyReport({ startDate, endDate, month, year }).subscribe({
      next: (res: any) => {
        // summary.lop_days = absences × 0.5 + type_code='LOP' leave days
        this.attendanceLopDays = Number(res?.summary?.lop_days ?? res?.lop_days ?? 0);
        this.updateHistoryAndPendingLeaves();
      },
      error: (err) => console.error('Error fetching LOP data:', err),
    });
  }

  /* ===================== MODALS ===================== */
  openLeaveModal() { this.IsOpenleavePopup = true; }

  closeleavePopup() { this.IsOpenleavePopup = false; }

  openPopup(leave: any) { this.selectedLeave = leave; this.isPopupOpen = true; }

  closePopup() { this.isPopupOpen = false; this.selectedLeave = null; }

  async initializeLeaves() {
    this.initializingLeaves = true;
    const employeeId = Number(this.routeGuardService.employeeID);

    if (!employeeId) {
      this.presentToast('User ID not found', 'danger');
      this.initializingLeaves = false;
      return;
    }

    // 1. Get profile to find the leave_plan_id
    this.employeeService.getMyProfile().subscribe({
      next: (profile: any) => {
        const leavePlanId = profile.leave_plan_id || 1; // Default to 1 if not set

        // 2. Call initialization API
        this.employeeLeaves.initializeBalance(this.currentYear).subscribe({
          next: () => {
            this.presentToast('Leave balances initialized successfully', 'success');
            this.loadLeaveBalance(); // Refresh the numbers
            this.initializingLeaves = false;
          },
          error: (err) => {
            console.error('Initialization error:', err);
            this.presentToast('Initialization failed', 'danger');
            this.initializingLeaves = false;
          }
        });
      },
      error: (err) => {
        console.error('Profile fetch error:', err);
        this.presentToast('Could not find leave plan info', 'danger');
        this.initializingLeaves = false;
      }
    });

  }

  onLeaveSubmitted() {
    this.getAllLeaves();
    this.loadLeaveBalance();
    this.closeleavePopup();
  }

  /* ===================== MANAGER NAVIGATION ===================== */

  async navigateToTimesheetApprovals() {
    const modal = await this.modalCtrl.create({
      component: ManagerTimesheetApprovalsComponent,
      cssClass: 'side-custom-popup timesheet-popup',
      backdropDismiss: false,
    });
    await modal.present();
  }

  async navigateToLeaveApprovals() {
    const modal = await this.modalCtrl.create({
      component: ManagerLeaveApprovalsComponent,
      cssClass: 'side-custom-popup team-popup',
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

  navigateToMyTeam() {
    this.router.navigate(['/MyTeam']);
  }

  navigateToTeamReports() {
    this.router.navigate(['/attendance/reports/team']);
  }

  /* ===================== HELPERS ===================== */
  setCurrentMonthFirstDate() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.currentMonthFirstDateText = firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getLeaveTypeClass(leaveType: string): string {
    const type = leaveType?.toLowerCase() || '';
    if (type.includes('sick')) return 'sick';
    if (type.includes('casual')) return 'casual';
    if (type.includes('marriage')) return 'marriage';
    if (type.includes('comp') || type.includes('comp off')) return 'comp-offs';
    if (type.includes('unpaid')) return 'unpaid';
    return 'default';
  }

  updateHistoryAndPendingLeaves() {
    const today = new Date();
    const cm = today.getMonth();
    const cy = today.getFullYear();

    // 1. Filter pending leaves
    this.pendingLeaves = this.leaveRequestsDetails.filter(l => l.status === 'PENDING');

    // 2. Sum current-month approved 'Loss of Pay' named leaves
    const namedLopDays = this.leaveRequestsDetails
      .filter(l => {
        if (l.status !== 'APPROVED') return false;
        const isLop = l.leave_type?.toLowerCase().includes('loss of pay') || l.type_code === 'LOP';
        if (!isLop) return false;
        const d = new Date(l.from_date);
        return d.getMonth() === cm && d.getFullYear() === cy;
      })
      .reduce((sum, l) => sum + l.days, 0);

    this.combinedLopDays = this.attendanceLopDays + namedLopDays;

    // 3. Build a single combined LOP row
    const startDate = `${cy}-${String(cm + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(cy, cm + 1, 0).getDate();
    const endDate = `${cy}-${String(cm + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    const combinedLopEntry = this.combinedLopDays > 0 ? {
      id: 'lop-current',
      leave_type: 'Loss of Pay',
      from_date: startDate,
      to_date: endDate,
      days: this.combinedLopDays,
      status: null,
      is_lop: true,
    } : null;

    // 4. Regular processed leaves — exclude LOP-related ones
    const processed = this.leaveRequestsDetails.filter(l =>
      (l.status === 'APPROVED' || l.status === 'REJECTED') &&
      !(l.leave_type?.toLowerCase().includes('loss of pay') || l.type_code === 'LOP')
    );

    this.historyLeaves = combinedLopEntry ? [combinedLopEntry, ...processed] : processed;
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color, position: 'top' });
    toast.present();
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
