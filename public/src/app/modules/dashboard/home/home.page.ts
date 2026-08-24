import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeLeavesService } from '../../../core/services/employee-leaves.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { AttendanceApiService } from '../../../core/services/attendance-api.service';
import { AdminService } from '../../../core/services/admin.service';
import { LeaverequestService } from '../../../core/services/leaverequest.service';
import { LeavePlanService } from '../../../core/services/leave-plans.service';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private clockInterval: any;

  // Birthday wishes UI state
  activeWishEmployeeId: number | null = null;
  wishMessages: { [employeeId: number]: string } = {};
  birthdayWishes: { [employeeId: number]: any[] } = {};

  // Viewing wishes state
  isViewingWishes = false;
  wishesToView: any[] = [];
  viewingMilestoneName = '';

  // Announcements Carousel
  currentAnnounceIndex = 0;
  private announceTimer: any;

  /* ================= UI DATA ================= */
  greeting: string = '';
  todayDate: string = '';
  currentTime: string = '';
  currentYear = new Date().getFullYear();
  monthlyAttendanceReport: any[] = [];
  attendanceRate = 0;
  leaveCycleLabel: string = 'Jan - Dec';

  /* ================= EMPLOYEE ================= */
  currentEmployee: any = null;

  /* ================= IMAGES ================= */
  env: string = '';
  leaveCards: any[] = [];
  userDesignation: string | null = null;
  leaveCodeIdMap: any = {};
  todayAttendance: any = null;
  weeklyGrossHours: string = '0h 0m';
  todayEffectivePercentage: number = 0;
  weeklyAttendanceRate: number = 0;
  avgStartTime: string = '--:--';

  /* ================= LOP INTEGRATION ================= */
  attendanceLopDays = 0;
  namedLopDays = 0;

  get combinedLopDays(): number {
    return this.attendanceLopDays + this.namedLopDays;
  }

  /* ================= BIRTHDAYS ================= */
  todayBirthdays: any[] = [];
  upcomingBirthdays: any[] = [];
  todayAnniversaries: any[] = [];
  upcomingAnniversaries: any[] = [];
  activeCelebrationTab: 'birthdays' | 'anniversaries' = 'birthdays';

  /* ================= ANNOUNCEMENTS ================= */
  announcements: any[] = [];

  /* ================= TEAM STATUS TODAY ================= */
  onLeaveToday: any[] = [];
  wfhToday: any[] = [];
  remoteToday: any[] = [];
  activeWorkplaceTab: 'leave' | 'wfh' | 'remote' = 'leave';

  /* ================= DASHBOARD ================= */
  days: { date: string; status: 'Complete' | 'Remaining' }[] = [];
  hasPunchedToday: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private attendanceService: AttendanceService,
    private attendanceApi: AttendanceApiService,
    private employeeLeaves: EmployeeLeavesService,
    private leaveRequestService: LeaverequestService,
    private leavePlanService: LeavePlanService,
    private adminService: AdminService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.setupEnvironment();
    this.setupGreetingAndDate();
    this.setupClock();
    this.loadLeaveBalance();
    this.loadCurrentMonthLOP();
    this.loadCurrentMonthLeaves();
    this.loadAnnouncements();
    this.refreshAttendanceState();
    this.loadTeamStatusToday();

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    this.attendanceService.loadMonthlyReportOnAppStart(this.attendanceApi, year, month);

    this.attendanceService.monthlyReport$.pipe(takeUntil(this.destroy$)).subscribe(report => {
      this.monthlyAttendanceReport = report;

      const todayStr = new Date().toISOString().split('T')[0];
      this.todayAttendance = report.find(r => {
        const d = r.attendance_date || r.date;
        return d && d.startsWith(todayStr);
      }) || null;

      if (report.length) {
        const presentDays = report.filter(r => r.status === 'present').length;
        this.attendanceRate = Math.round((presentDays / report.length) * 100);
      }

      // Weekly stats
      const now = new Date();
      const dayOfWeek = now.getDay();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - dayOfWeek);

      const weekRecords = report.filter(r => {
        const d = new Date(r.attendance_date || r.date);
        return d >= weekStart && d <= now;
      });

      let weekTotalMinutes = 0;
      weekRecords.forEach(r => {
        weekTotalMinutes += (parseFloat(r.gross_hours || '0') || 0) * 60;
      });
      const h = Math.floor(weekTotalMinutes / 60);
      const m = Math.round(weekTotalMinutes % 60);
      this.weeklyGrossHours = `${h}h ${m}m`;

      if (weekRecords.length) {
        const presentWeek = weekRecords.filter(r => r.status === 'present' || r.status === 'on-time').length;
        this.weeklyAttendanceRate = Math.round((presentWeek / weekRecords.length) * 100);
      }

      if (this.todayAttendance) {
        const eff = parseFloat(this.todayAttendance.effective_hours) || 0;
        this.todayEffectivePercentage = Math.round((eff / 8) * 100);
      }

      // Calculate average start time
      const validCheckIns = report.filter(r => r.first_check_in);
      if (validCheckIns.length > 0) {
        let totalMinutes = 0;
        let count = 0;
        validCheckIns.forEach(r => {
          const timeStr = r.first_check_in.toString().trim();
          let hours = -1;
          let minutes = -1;

          if (timeStr.includes('-') && (timeStr.includes('T') || timeStr.includes(' '))) {
            const date = new Date(timeStr);
            if (!isNaN(date.getTime())) {
              hours = date.getHours();
              minutes = date.getMinutes();
            }
          } else if (timeStr.includes(':')) {
            const parts = timeStr.split(':');
            hours = parseInt(parts[0], 10);
            minutes = parseInt(parts[1], 10);
          }

          if (hours >= 0 && minutes >= 0 && !isNaN(hours) && !isNaN(minutes)) {
            totalMinutes += hours * 60 + minutes;
            count++;
          }
        });

        if (count > 0) {
          const avgMinutes = Math.round(totalMinutes / count);
          let avgHours = Math.floor(avgMinutes / 60);
          const avgMins = avgMinutes % 60;
          const ampm = avgHours >= 12 ? 'PM' : 'AM';
          avgHours = avgHours % 12;
          avgHours = avgHours ? avgHours : 12;
          const hrStr = avgHours < 10 ? '0' + avgHours : avgHours.toString();
          const minStr = avgMins < 10 ? '0' + avgMins : avgMins.toString();
          this.avgStartTime = `${hrStr}:${minStr} ${ampm}`;
        } else {
          this.avgStartTime = '--:--';
        }
      } else {
        this.avgStartTime = '--:--';
      }

      this.cdr.detectChanges();
    });

    this.attendanceApi.punchRefresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const y = new Date().getFullYear();
      const m = new Date().getMonth() + 1;
      this.attendanceService.loadMonthlyReportOnAppStart(this.attendanceApi, y, m);
      this.refreshAttendanceState();
    });

    this.attendanceApi.clockState$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.detectChanges();
    });

    this.loadBirthdays();

    const showLoginSuccess = localStorage.getItem('showLoginSuccess');
    if (showLoginSuccess === 'true') {
      localStorage.removeItem('showLoginSuccess');
      this.showLoginSuccessAlert();
    }

    this.employeeService.currentEmployee$.pipe(takeUntil(this.destroy$)).subscribe(emp => {
      if (emp) {
        this.currentEmployee = emp;
        this.userDesignation = emp.designation_name || emp.designation || null;
        this.cdr.detectChanges();
      }
    });
  }

  ionViewWillEnter() {
    this.loadEmployeeProfile();
    this.loadBirthdays();
    this.loadLeaveBalance();
    this.loadCurrentMonthLOP();
    this.loadCurrentMonthLeaves();
    this.loadTeamStatusToday();
  }

  setWorkplaceTab(tab: 'leave' | 'wfh' | 'remote') {
    this.activeWorkplaceTab = tab;
    this.cdr.detectChanges();
  }

  loadTeamStatusToday() {
    const colors = ['#ff9800', '#2196f3', '#4caf50', '#f44336', '#9c27b0', '#009688', '#3f51b5', '#e91e63'];
    this.dashboardService.getTeamStatusToday().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.onLeaveToday = (res.on_leave || []).map((emp: any) => ({
          ...emp,
          initials: ((emp.FirstName || '').charAt(0) + (emp.LastName || '').charAt(0)).toUpperCase(),
          avatarColor: colors[(emp.employee_id || emp.id || 0) % colors.length],
          fullImageUrl: emp.profile_image ? `${this.env}${emp.profile_image}` : null
        }));
        this.wfhToday = (res.wfh || []).map((emp: any) => ({
          ...emp,
          initials: ((emp.FirstName || '').charAt(0) + (emp.LastName || '').charAt(0)).toUpperCase(),
          avatarColor: colors[(emp.employee_id || emp.id || 0) % colors.length],
          fullImageUrl: emp.profile_image ? `${this.env}${emp.profile_image}` : null
        }));
        this.remoteToday = (res.remote || []).map((emp: any) => ({
          ...emp,
          initials: ((emp.FirstName || '').charAt(0) + (emp.LastName || '').charAt(0)).toUpperCase(),
          avatarColor: colors[(emp.employee_id || emp.id || 0) % colors.length],
          fullImageUrl: emp.profile_image ? `${this.env}${emp.profile_image}` : null
        }));

        // Auto-select tab with active employees
        if (this.onLeaveToday.length > 0) {
          this.activeWorkplaceTab = 'leave';
        } else if (this.wfhToday.length > 0) {
          this.activeWorkplaceTab = 'wfh';
        } else if (this.remoteToday.length > 0) {
          this.activeWorkplaceTab = 'remote';
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.onLeaveToday = [];
        this.wfhToday = [];
        this.remoteToday = [];
      }
    });
  }

  loadBirthdays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const colors = ['#ff9800', '#2196f3', '#4caf50', '#f44336', '#9c27b0', '#e91e63'];

    // 1. Fetch upcoming birthdays
    this.employeeService.getBirthdays('upcoming').pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any[]) => {
        const todayBdays: any[] = [];
        const upcomingBdays: any[] = [];

        data.forEach(emp => {
          const dob = emp.DateOfBirth ? new Date(emp.DateOfBirth) : null;
          const initials = ((emp.FirstName || '').charAt(0) + (emp.LastName || '').charAt(0)).toUpperCase();
          const avatarColor = colors[emp.id % colors.length];

          if (dob) {
            const bday = new Date(dob);
            bday.setFullYear(today.getFullYear());
            if (bday < today) {
              bday.setFullYear(today.getFullYear() + 1);
            }

            const item = {
              ...emp,
              uid: `${emp.id}_Birthday`,
              eventType: 'Birthday',
              eventDate: bday,
              originalDate: dob,
              isToday: bday.toDateString() === today.toDateString(),
              initials,
              avatarColor,
              fullImageUrl: emp.profile_image ? `${this.env}${emp.profile_image}` : null
            };

            if (item.isToday) {
              todayBdays.push(item);
            } else {
              upcomingBdays.push(item);
            }
          }
        });

        this.todayBirthdays = todayBdays;
        this.upcomingBirthdays = upcomingBdays.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
        this.cdr.detectChanges();
      },
      error: () => {
        this.todayBirthdays = [];
        this.upcomingBirthdays = [];
        this.cdr.detectChanges();
      }
    });

    // 2. Fetch upcoming work anniversaries
    this.employeeService.getAnniversaries('upcoming').pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any[]) => {
        const todayAnnivs: any[] = [];
        const upcomingAnnivs: any[] = [];

        data.forEach(emp => {
          const doj = emp.DateJoined ? new Date(emp.DateJoined) : null;
          const initials = ((emp.FirstName || '').charAt(0) + (emp.LastName || '').charAt(0)).toUpperCase();
          const avatarColor = colors[emp.id % colors.length];

          if (doj) {
            const anniv = new Date(doj);
            anniv.setFullYear(today.getFullYear());
            if (anniv < today) {
              anniv.setFullYear(today.getFullYear() + 1);
            }

            const years = today.getFullYear() - doj.getFullYear();
            if (years > 0) {
              const item = {
                ...emp,
                uid: `${emp.id}_Anniversary`,
                eventType: 'Anniversary',
                eventDate: anniv,
                originalDate: doj,
                years,
                isToday: anniv.toDateString() === today.toDateString(),
                initials,
                avatarColor,
                fullImageUrl: emp.profile_image ? `${this.env}${emp.profile_image}` : null
              };

              if (item.isToday) {
                todayAnnivs.push(item);
              } else {
                upcomingAnnivs.push(item);
              }
            }
          }
        });

        this.todayAnniversaries = todayAnnivs;
        this.upcomingAnniversaries = upcomingAnnivs.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
        this.cdr.detectChanges();
      },
      error: () => {
        this.todayAnniversaries = [];
        this.upcomingAnniversaries = [];
        this.cdr.detectChanges();
      }
    });
  }

  getEventDateLabel(eventDate: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (eventDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (eventDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      const day = eventDate.getDate();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[eventDate.getMonth()];
      return `${day} ${month}`;
    }
  }

  showWishInput(employeeId: number) {
    this.activeWishEmployeeId = employeeId;
    if (!this.wishMessages[employeeId]) this.wishMessages[employeeId] = '';
  }

  hideWishInput() { this.activeWishEmployeeId = null; }

  sendWish(employeeId: number) {
    const message = this.wishMessages[employeeId]?.trim();
    if (!message) return;
    this.employeeService.sendBirthdayWish(employeeId, message).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        if (!this.birthdayWishes[employeeId]) this.birthdayWishes[employeeId] = [];
        this.birthdayWishes[employeeId].push({ message, sender_name: 'Me' });
        this.wishMessages[employeeId] = '';
        this.hideWishInput();
      },
      error: () => alert('Failed to send wish')
    });
  }

  viewWishes(milestone: any) {
    this.viewingMilestoneName = `${milestone.FirstName} ${milestone.LastName}`;
    this.employeeService.getBirthdayWishes(milestone.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any[]) => {
        this.wishesToView = res;
        this.isViewingWishes = true;
        this.cdr.detectChanges();
      }
    });
  }

  closeWishesModal() {
    this.isViewingWishes = false;
    this.wishesToView = [];
    this.viewingMilestoneName = '';
  }

  private setupEnvironment() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
  }

  private loadEmployeeProfile() {
    this.currentEmployee = null;
    this.employeeService.getMyProfile().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.currentEmployee = res;
        this.userDesignation = res.designation_name || res.designation || null;
        this.cdr.detectChanges();
      },
      error: () => { this.currentEmployee = null; }
    });
  }

  get profileImageUrl(): string {
    if (!this.currentEmployee?.profile_image) return '../../assets/user.png';
    return `${this.env}${this.currentEmployee.profile_image}`;
  }

  private setupGreetingAndDate() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Good Morning';
    else if (hour < 17) this.greeting = 'Good Afternoon';
    else this.greeting = 'Good Evening';

    const d = new Date();
    this.todayDate = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' });
  }

  private setupClock() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    this.clockInterval = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString('en-US', { hour12: true });
    }, 1000);
  }

  async showLoginSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Information',
      message: 'Login Successful',
      backdropDismiss: false,
      buttons: [{ text: 'OK' }]
    });
    await alert.present();
  }

  attendance() { this.router.navigate(['/Me']); }
  wfhRequest() { this.router.navigate(['/Me'], { queryParams: { action: 'wfh' } }); }
  remoteRequest() { this.router.navigate(['/Me'], { queryParams: { action: 'remote' } }); }
  leaves() { this.router.navigate(['/leaves']); }
  myteam() { this.router.navigate(['/MyTeam']); }
  viewAllAnnouncements() { this.router.navigate(['/administration/org-setup']); }

  async showWorkInProgressToast(featureName?: string) {
    const msg = featureName ? `${featureName} - Work in progress` : 'Work in progress';
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: 'warning',
      icon: 'alert-circle',
      cssClass: 'wip-custom-toast'
    });
    await toast.present();
  }

  getMonthCycleLabel(startMonthNumber: number = 1): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startIdx = (Number(startMonthNumber) - 1 + 12) % 12;
    const endIdx = (startIdx + 11) % 12;
    return `${months[startIdx]} - ${months[endIdx]}`;
  }

  loadLeaveBalance() {
    // Fetch leave plans to get configured start month of active leave plan
    this.leavePlanService.getLeavePlans().pipe(takeUntil(this.destroy$)).subscribe({
      next: (plans: any[]) => {
        if (plans && plans.length > 0) {
          const activePlan = plans.find((p: any) => p.is_active || p.is_active === 1) || plans[0];
          if (activePlan && activePlan.leave_year_start_month) {
            this.leaveCycleLabel = this.getMonthCycleLabel(activePlan.leave_year_start_month);
          }
        }
      },
      error: () => { }
    });

    this.employeeLeaves.getLeaveBalance(this.currentYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        const startMonth = res.leave_year_start_month || res.start_month || res.leave_plan?.leave_year_start_month || res.plan?.leave_year_start_month;
        if (startMonth) {
          this.leaveCycleLabel = this.getMonthCycleLabel(startMonth);
        }
        const balances = res.balances || [];
        this.leaveCodeIdMap = {};
        balances.forEach((item: any) => { this.leaveCodeIdMap[item.type_code] = item.leave_type_id || item.id; });
        this.leaveCards = balances.map((item: any) => {
          const allocated = Number(item.allocated_days) || 0;
          const used = Number(item.used_days) || 0;
          const code = (item.type_code || '').toUpperCase();
          const isLOP = code === 'LOP';
          return {
            title: item.type_name,
            code: code,
            allocated_days: isLOP ? 0 : allocated,
            used: isLOP ? this.combinedLopDays : used,
            available: isLOP ? 0 : (Number(item.available_days) - (Number(item.pending_days) || 0)),
            usedPercent: isLOP ? 0 : (allocated > 0 ? Math.round((used / allocated) * 100) : 0),
            icon: this.getLeaveIcon(item.type_code),
            isLOP: isLOP,
            bg_color: item.bg_color,
            icon_path: item.icon_path
          };
        });
      },
      error: err => console.error(err)
    });
  }

  loadCurrentMonthLOP() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    this.attendanceApi.getMonthlyReport({ startDate, endDate, month, year }).subscribe({
      next: (res: any) => {
        this.attendanceLopDays = Number(res?.summary?.lop_days ?? res?.lop_days ?? 0);
        this.recalculateLopCard();
      },
      error: (err) => console.error('Error fetching LOP data:', err),
    });
  }

  loadCurrentMonthLeaves() {
    const today = new Date();
    const cm = today.getMonth();
    const cy = today.getFullYear();

    this.leaveRequestService.getMyLeaves(this.currentYear).subscribe({
      next: (res: any[]) => {
        this.namedLopDays = res
          .filter(l => {
            if (l.status.toUpperCase() !== 'APPROVED') return false;
            const isLop = l.type_name?.toLowerCase().includes('loss of pay') || (l.type_code || '').toUpperCase() === 'LOP';
            if (!isLop) return false;
            const d = new Date(l.start_date || l.from_date);
            return d.getMonth() === cm && d.getFullYear() === cy;
          })
          .reduce((sum, l) => sum + Number(l.total_days || l.days || 0), 0);
        this.recalculateLopCard();
      },
      error: (err) => console.error('Error fetching leaves for LOP:', err),
    });
  }

  recalculateLopCard() {
    this.leaveCards = this.leaveCards.map(card => {
      if (card.isLOP) {
        return {
          ...card,
          used: this.combinedLopDays,
          available: 0,
          usedPercent: 0
        };
      }
      return card;
    });
    this.cdr.detectChanges();
  }

  getLeaveIcon(code: string): string {
    const map: any = { CL: 'CL.svg', SL: 'SL.svg', ML: 'ML.svg', CO: 'CO.svg', PL: 'CL.svg', UL: 'UL.svg' };
    return `assets/leave-icons/${map[code] || 'CL.svg'}`;
  }

  isCEO(): boolean {
    return this.currentEmployee?.designation_name?.toLowerCase() === 'ceo';
  }

  trackById(index: number, item: any) {
    return item.uid || item.id || item.employee_id || index;
  }

  loadAnnouncements() {
    this.adminService.getAnnouncements().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any[]) => {
        this.announcements = data;
        this.startAnnounceCarousel();
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }

  startAnnounceCarousel() {
    if (this.announceTimer) clearInterval(this.announceTimer);
    if (this.announcements.length > 1) {
      this.announceTimer = setInterval(() => { this.nextAnnounce(); }, 5000);
    }
  }

  nextAnnounce() {
    this.currentAnnounceIndex = (this.currentAnnounceIndex + 1) % this.announcements.length;
    this.cdr.detectChanges();
  }

  prevAnnounce() {
    this.currentAnnounceIndex = (this.currentAnnounceIndex - 1 + this.announcements.length) % this.announcements.length;
    this.cdr.detectChanges();
  }

  private refreshAttendanceState() {
    this.attendanceApi.getTodayAttendance(true).pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res)
      const punches = res?.punches || [];
      this.hasPunchedToday = punches.length > 0;

      if (this.hasPunchedToday) {
        // Build the overview data object

        this.todayAttendance = {
          ...this.todayAttendance,
          first_check_in: res.first_check_in || (punches.length > 0 ? punches[0].punch_time : null),
          last_check_out: res.last_check_out || (punches.length > 0 && punches[punches.length - 1].punch_type === 'out' ? punches[punches.length - 1].punch_time : null),
          gross_hours: this.formatMinutesToHours(res.gross_hours),
          work_mode: res.work_mode || (punches.length > 0 ? punches[0].work_mode : null),
          effective_hours: this.formatMinutesToHours(res.total_work_hours)
        };

        const eff = parseFloat(res.effective_hours) || 0;
        this.todayEffectivePercentage = Math.round((eff / (8 * 60)) * 100);
      }

      this.cdr.detectChanges();
    });
  }

  private formatMinutesToHours(val: any): string {
    if (!val) return '0h 0m';
    // Ensure we handle strings like "120" or numeric values correctly
    const totalMinutes = typeof val === 'number' ? val : parseInt(val.toString().replace(/[^0-9]/g, '')) || 0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  formatGrossHours(val: any): string {
    if (val === null || val === undefined || val === '') return '0h 0m';
    const str = val.toString().trim();
    // Already formatted as "Xh Ym" or "Xh Y m"
    if (str.includes('h')) {
      const hPart = parseFloat(str.split('h')[0].trim()) || 0;
      const mPart = parseFloat((str.split('h')[1] || '').replace(/[^0-9.]/g, '')) || 0;
      return `${hPart}h ${mPart}m`;
    }
    // Numeric decimal hours (e.g. 7.5 from monthly report)
    const num = parseFloat(str);
    if (!isNaN(num)) {
      const hours = Math.floor(num);
      const minutes = Math.round((num - hours) * 60);
      return `${hours}h ${minutes}m`;
    }
    return '0h 0m';
  }

  setAnnounce(index: number) {
    this.currentAnnounceIndex = index;
    this.startAnnounceCarousel();
    this.cdr.detectChanges();
  }

  private parseHours(val: any): number {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'number') return val;
    const str = val.toString().trim();
    if (!str) return 0;

    // Check if it's formatted as "Xh Ym" or "Xh Y m"
    if (str.includes('h')) {
      const hPart = str.split('h')[0].trim();
      const mPart = str.split('h')[1]?.replace(/[^0-9]/g, '').trim() || '0';
      const h = parseFloat(hPart) || 0;
      const m = parseFloat(mPart) || 0;
      return h + (m / 60);
    }

    // Fallback: parse as direct float
    const parsed = parseFloat(str);
    return isNaN(parsed) ? 0 : parsed;
  }

  getAttendanceSegments(log: any): { type: 'work' | 'break'; widthPct: number }[] {
    if (!log) return [];

    const workVal = log.total_work_hours !== undefined ? log.total_work_hours : log.effective_hours;
    const workH = this.parseHours(workVal);
    const grossH = this.parseHours(log.gross_hours);

    // Nothing to show
    if (!log.first_check_in || workH <= 0) {
      return [];
    }

    // Reference window in hours (cap at 12 h to prevent tiny-looking bars)
    const refH = Math.max(grossH <= 0 ? workH : grossH, 8);

    const workPct = Math.min((workH / refH) * 100, 100);
    const grossPct = grossH <= 0 ? workPct : Math.min((grossH / refH) * 100, 100);
    const breakPct = Math.max(grossPct - workPct, 0);

    if (breakPct < 0.5) {
      // No meaningful break – single work bar
      return [{ type: 'work', widthPct: workPct }];
    }

    // Split work on both sides of the break (equal halves)
    const halfWorkPct = workPct / 2;
    return [
      { type: 'work', widthPct: halfWorkPct },
      { type: 'break', widthPct: breakPct },
      { type: 'work', widthPct: halfWorkPct },
    ];
  }

  getBreakHours(log: any): string {
    if (!log) return '';
    const gross = this.parseHours(log.gross_hours);
    const workVal = log.total_work_hours !== undefined ? log.total_work_hours : log.effective_hours;
    const work = this.parseHours(workVal);
    if (gross <= 0 || work <= 0 || gross <= work) return '';
    const breakH = gross - work;
    const h = Math.floor(breakH);
    const m = Math.round((breakH - h) * 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  getStatusLabel(): string {
    const isClockedIn = this.attendanceApi.getClockState();
    if (isClockedIn) return 'In';
    return this.hasPunchedToday ? 'Out' : 'Not In Yet';
  }

  getStatusClass(): string {
    const label = this.getStatusLabel();
    if (label === 'In') return 'status-in';
    if (label === 'Out') return 'status-out';
    return 'status-pending';
  }

  formatClockTime(timeVal: any): string {
    if (!timeVal) return '--:--';
    const timeStr = timeVal.toString().trim();
    // If it's a full date string or ISO string, parse it using Date
    if (timeStr.includes('-') && (timeStr.includes('T') || timeStr.includes(' '))) {
      const date = new Date(timeStr);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      }
    }
    // If it's a time-only string e.g. "09:15:00" or "13:30" or "09:15"
    if (timeStr.includes(':')) {
      if (timeStr.toLowerCase().includes('am') || timeStr.toLowerCase().includes('pm')) {
        return timeStr;
      }
      const parts = timeStr.split(':');
      let hours = parseInt(parts[0], 10);
      let minutes = parseInt(parts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minStr = minutes < 10 ? '0' + minutes : minutes.toString();
        const hrStr = hours < 10 ? '0' + hours : hours.toString();
        return `${hrStr}:${minStr} ${ampm}`;
      }
    }
    return timeStr;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.announceTimer) clearInterval(this.announceTimer);
  }
}
