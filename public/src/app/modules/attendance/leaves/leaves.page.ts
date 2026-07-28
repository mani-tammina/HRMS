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
  IsOpenCompOffPopup = false;
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

  availableYears: number[] = [];
  planStartMonth: number = 4;

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
    this.initYears();
    this.updateRole();
    this.loadLeaveBalance();
    this.getAllLeaves();
    this.loadCurrentMonthLOP();
    this.setCurrentMonthFirstDate();
    if (this.isManager) {
      this.loadTeamAttendanceSummary();
    }
  }

  initYears() {
    const todayYear = new Date().getFullYear();
    this.availableYears = [todayYear, todayYear - 1, todayYear - 2];
  }

  getCycleLabelForYear(year: number, startMonth: number = 4): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const sMonth = Number(startMonth) || 4;
    if (sMonth === 1) {
      return `Jan ${year} - Dec ${year}`;
    }
    const startName = monthNames[sMonth - 1] || 'Apr';
    const endMonthIdx = (sMonth - 2 + 12) % 12;
    const endName = monthNames[endMonthIdx] || 'Mar';
    const endYear = sMonth > 1 ? year + 1 : year;
    return `${startName} ${year} - ${endName} ${endYear}`;
  }

  onYearChange(year: number) {
    if (this.currentYear === year) return;
    this.currentYear = year;
    this.loadLeaveBalance();
    this.getAllLeaves();
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
        if (balances.length > 0 && balances[0].plan_start_month) {
          this.planStartMonth = balances[0].plan_start_month;
        }

        this.leaveCards = balances.map((item: any) => {
          const code = (item.type_code || '').toUpperCase();
          const isLOP = code === 'LOP';
          const isCasual = code === 'CL' || (item.type_name || '').toLowerCase().includes('casual');
          const allocated = Number(item.allocated_days) || 0;
          const used = Number(item.used_days) || 0;
          const available = (Number(item.available_days) || 0) - (Number(item.pending_days) || 0);

          let accruedSoFar = (item.accrued_so_far !== undefined && item.accrued_so_far !== null)
            ? Number(item.accrued_so_far)
            : this.calculateAccruedSoFar(allocated, item.plan_start_month || 1);

          return {
            title: item.type_name,
            code: code,
            allocated_days: isLOP ? '0' : allocated,
            used,
            available: isLOP ? '0' : available,
            isLOP: isLOP,
            isCasual: isCasual,
            accrued_so_far: accruedSoFar,
            usedPercent: isLOP ? 0 : (allocated > 0 ? Math.round((used / allocated) * 100) : 0),
            bg_color: item.bg_color,
            icon_path: item.icon_path,
          };
        });
      },
      error: err => console.error(err),
    });
  }

  calculateAccruedSoFar(allocatedDays: number, planStartMonth: number = 1): number {
    if (!allocatedDays || allocatedDays <= 0) return 0;
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1 to 12
    let monthsElapsed = 0;
    if (currentMonth >= planStartMonth) {
      monthsElapsed = currentMonth - planStartMonth + 1;
    } else {
      monthsElapsed = 12 - planStartMonth + currentMonth + 1;
    }
    monthsElapsed = Math.max(1, Math.min(12, monthsElapsed));

    const base = Math.floor(allocatedDays / 12);
    const remainder = allocatedDays - (base * 12);
    let sum = 0;
    for (let i = 0; i < monthsElapsed; i++) {
      sum += base + (i < remainder ? 1 : 0);
    }
    return sum;
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
        const mappedLeaves = res.map((item: any) => ({
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
          half_day_session: item.half_day_session,
          isCompOffGrant: false
        }));

        this.leaveRequestService.getMyCompOffRequests().subscribe({
          next: (compOffs: any[]) => {
            const mappedCompOffs = compOffs.map((item: any) => ({
              id: item.id,
              leave_type: 'Comp Off Grant',
              type_code: 'COMP_OFF_GRANT',
              from_date: item.date_worked,
              to_date: item.date_worked,
              days: Number(item.total_days),
              status: item.status.toUpperCase(),
              applied_on: item.created_at,
              reason: item.reason,
              is_half_day: Number(item.total_days) === 0.5,
              half_day_session: Number(item.total_days) === 0.5 ? 'Half Day' : null,
              isCompOffGrant: true,
              approver_name: item.approver_name,
              rejection_reason: item.rejection_reason
            }));

            this.leaveRequestsDetails = [...mappedLeaves, ...mappedCompOffs];
            this.updateHistoryAndPendingLeaves();
          },
          error: err => {
            console.error('Error fetching comp off details:', err);
            this.leaveRequestsDetails = mappedLeaves;
            this.updateHistoryAndPendingLeaves();
          }
        });
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

  openCompOffModal() { this.IsOpenCompOffPopup = true; }

  closeCompOffPopup() { this.IsOpenCompOffPopup = false; }

  openPopup(leave: any) { this.selectedLeave = leave; this.isPopupOpen = true; }

  closePopup() { this.isPopupOpen = false; this.selectedLeave = null; }

  cancellingLeave = false;
  async cancelLeaveRequest(leave: any) {
    if (!leave || !leave.id || leave.id === -1 || leave.id === 'lop-current') {
      this.presentToast('This type of entry cannot be cancelled', 'warning');
      return;
    }

    if (leave.status === 'CANCELLED') {
      this.presentToast('Leave request is already cancelled', 'warning');
      return;
    }

    if (leave.status === 'REJECTED') {
      this.presentToast('Cannot cancel a rejected leave request', 'warning');
      return;
    }

    this.cancellingLeave = true;
    const request$ = leave.isCompOffGrant
      ? this.leaveRequestService.cancelCompOff(leave.id)
      : this.leaveRequestService.cancelLeave(leave.id);

    request$.subscribe({
      next: (res) => {
        const successMsg = leave.isCompOffGrant
          ? 'Comp Off request cancelled successfully'
          : 'Leave request cancelled successfully';
        this.presentToast(successMsg, 'success');
        this.closePopup();
        this.getAllLeaves();
        this.loadLeaveBalance();
        this.cancellingLeave = false;
      },
      error: (err) => {
        console.error('Cancel request error:', err);
        const fallbackMsg = leave.isCompOffGrant
          ? 'Failed to cancel Comp Off request'
          : 'Failed to cancel leave request';
        const msg = err.error?.error || fallbackMsg;
        this.presentToast(msg, 'danger');
        this.cancellingLeave = false;
      }
    });
  }


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

  onCompOffSubmitted() {
    this.getAllLeaves();
    this.loadLeaveBalance();
    this.closeCompOffPopup();
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
