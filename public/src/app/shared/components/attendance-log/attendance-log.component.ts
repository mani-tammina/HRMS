import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Subject, forkJoin, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { takeUntil, catchError } from 'rxjs/operators';

import { AttendanceApiService } from '../../../core/services/attendance-api.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { LeaverequestService, MyLeave } from '../../../core/services/leaverequest.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { AdminService } from '../../../core/services/admin.service';
import { AlertController, ToastController } from '@ionic/angular';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { FormsModule } from '@angular/forms';

interface WeeklyOffPolicy {
  id: number;
  sunday_off?: number;
  monday_off?: number;
  tuesday_off?: number;
  wednesday_off?: number;
  thursday_off?: number;
  friday_off?: number;
  saturday_off?: number;
}

@Component({
  selector: 'app-attendance-log',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './attendance-log.component.html',
  styleUrls: ['./attendance-log.component.scss'],
})
export class AttendanceLogComponent implements OnInit, OnDestroy, OnChanges {
  @Input() refreshTrigger: any;
  @Input() employeeId: number | null = null;
  @Input() isHRView: boolean = false;
  @Output() periodChanged = new EventEmitter<{
    period: string;
    startDate: string;
    endDate: string;
    month: number;
    year: number;
  }>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      this.reloadAttendance();
    }
  }

  monthButtons: string[] = [];
  showSlider = false;
  selectedLog: any = null;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  currentMonthreport: any[] = [];
  startDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`;
  endDate = this.formatDateOnly(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
  selectedPeriod: string = '30DAYS';

  shiftPolicy: any = null;
  todayPunches: any[] = [];

  private destroy$ = new Subject<void>();
  private reloadInProgress = false;
  leaveDaysMap: Map<string, string> = new Map();
  employeeProfile: any = null;
  weeklyOffPolicy: WeeklyOffPolicy | null = null;
  missingLogConfigs: any[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private attendanceApi: AttendanceApiService,
    private leaveService: LeaverequestService,
    private employeeService: EmployeeService,
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    this.initializeMonthButtons();
  }

  private initializeMonthButtons(): void {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const now = new Date();
    const currentMonthIndex = now.getMonth();
    this.monthButtons = [];
    for (let i = 1; i <= 6; i++) {
      let mIdx = currentMonthIndex - i;
      if (mIdx < 0) mIdx += 12;
      this.monthButtons.push(months[mIdx]);
    }
  }

  private resetState(): void {
    this.currentMonthreport = [];
    this.todayPunches = [];
    this.selectedLog = null;
    this.showSlider = false;
    if (!this.startDate || !this.endDate) {
      const now = new Date();
      this.currentMonth = now.getMonth() + 1;
      this.currentYear = now.getFullYear();
      this.startDate = `${this.currentYear}-${String(this.currentMonth).padStart(2, '0')}-01`;
      this.endDate = this.formatDateOnly(new Date(this.currentYear, this.currentMonth, 0));
    }
  }

  ngOnInit(): void { this.reloadAttendance(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  private getAllDatesBetween(start: string, end: string): string[] {
    const dates: string[] = [];
    const [sy, sm, sd] = start.split('-').map(Number);
    const startDate = new Date(sy, sm - 1, sd);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [ey, em, ed] = end.split('-').map(Number);
    const endDate = new Date(ey, em - 1, ed);
    const finalEndDate = endDate > today ? today : endDate;
    for (let d = new Date(startDate); d <= finalEndDate; d.setDate(d.getDate() + 1)) {
      dates.push(this.formatDateOnly(new Date(d)));
    }
    return dates;
  }

  private formatDateOnly(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private reloadAttendance(): void {
    if (this.reloadInProgress) return;
    this.reloadInProgress = true;
    this.resetState();

    const profile$ = this.employeeId
      ? this.employeeService.getEmployeeById(this.employeeId).pipe(catchError(() => of(null)))
      : this.employeeService.getMyProfile().pipe(catchError(() => of(null)));

    const shiftPolicies$ = this.adminService.getShiftPolicies().pipe(catchError(() => of([])));
    const weekOffPolicies$ = this.adminService.getWeeklyOffPolicies().pipe(catchError(() => of([])));

    const leaves$ = this.employeeId
      ? this.leaveService.getEmployeeLeaves(this.employeeId, this.currentYear).pipe(catchError(() => of([])))
      : this.leaveService.getMyLeaves(this.currentYear).pipe(catchError(() => of([])));

    const todayPunches$ = this.employeeId
      ? this.attendanceApi.getAttendanceDetailsByDate(this.formatDateOnly(new Date()), this.employeeId).pipe(catchError(() => of({ punches: [] })))
      : this.attendanceApi.getTodayAttendance().pipe(catchError(() => of({ punches: [] })));

    const missingLogTimes$ = this.adminService.getMissingLogTimes().pipe(catchError(() => of([])));

    forkJoin({ profile: profile$, shiftPolicies: shiftPolicies$, weekOffPolicies: weekOffPolicies$, leaves: leaves$, today: todayPunches$, missingLogs: missingLogTimes$ })
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.employeeProfile = res.profile;
          const woId = res.profile?.weekly_off_policy_id || res.profile?.WeeklyOffPolicyId;
          const sId = res.profile?.shift_policy_id || res.profile?.ShiftPolicyId;

          const weekOffPolicies = Array.isArray(res.weekOffPolicies) ? res.weekOffPolicies : (res.weekOffPolicies?.data || []);
          this.weeklyOffPolicy = (weekOffPolicies || []).find((p: any) => p.id === woId) || null;

          const shiftPolicies = Array.isArray(res.shiftPolicies) ? res.shiftPolicies : (res.shiftPolicies?.data || []);
          this.shiftPolicy = (shiftPolicies || []).find((p: any) => p.id === sId) || null;

          this.todayPunches = res.today?.punches || [];
          this.missingLogConfigs = res.missingLogs || [];
          const leaves = Array.isArray(res.leaves) ? res.leaves : (res.leaves.data || res.leaves.leaves || []);
          this.processLeavesIntoMap(leaves);
          this.loadMonthlyReport();
          this.reloadInProgress = false;
        },
        error: () => { this.loadMonthlyReport(); this.reloadInProgress = false; }
      });
  }

  private leaveDetailsMap: Map<string, { leaveType: string; isHalfDay: boolean; halfDaySession: string; typeCode: string; halfCode: string }> = new Map();

  private processLeavesIntoMap(leaves: MyLeave[]) {
    this.leaveDaysMap = new Map();
    this.leaveDetailsMap = new Map();
    const approvedLeaves = leaves.filter(l => (l.status || '').toUpperCase() === 'APPROVED');
    approvedLeaves.forEach(leave => {
      let rawType = (leave as any).type_code || (leave as any).type_name || leave.leave_type || 'Leave';
      let code = String(rawType).trim().toUpperCase();
      if (code.includes('SICK') || code === 'SL') code = 'SL';
      else if (code.includes('CASUAL') || code === 'CL') code = 'CL';
      else if (code.includes('MATERNITY') || code === 'ML') code = 'ML';
      else if (code.includes('MARRIAGE') || code === 'MRL') code = 'MRL';
      else if (code.includes('PRIVILEGE') || code === 'PL') code = 'PL';
      else if (code.includes('EARNED') || code === 'EL') code = 'EL';
      else if (code.includes('UNPAID') || code.includes('LOSS OF PAY') || code === 'LOP' || code === 'UL') code = 'LOP';
      else if (code.length > 5) {
        const words = code.split(/[\s_]+/);
        if (words.length > 1) {
          code = words.map(w => w[0]).join('');
        } else {
          code = code.substring(0, 4);
        }
      }

      const leaveType = (leave as any).type_name || leave.leave_type || code;
      const isHalfDay = !!(leave.is_half_day || (leave as any).is_half_day);
      const halfDaySession = leave.half_day_session || (leave as any).half_day_session || '';

      const fromRaw = leave.start_date || leave.from_date;
      const toRaw = leave.end_date || leave.to_date || fromRaw;
      if (!fromRaw) return;
      const from = new Date(fromRaw);
      const to = new Date(toRaw || fromRaw);
      let d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
      const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
      while (d <= end) {
        const dStr = this.formatDateOnly(d);
        let halfCode = code;
        if (isHalfDay) {
          const sess = String(halfDaySession).toLowerCase();
          if (sess.includes('first') || sess.includes('1st')) {
            halfCode = `${code}:P`;
          } else {
            halfCode = `P:${code}`;
          }
        }
        this.leaveDaysMap.set(dStr, leaveType);
        this.leaveDetailsMap.set(dStr, { leaveType, isHalfDay, halfDaySession, typeCode: code, halfCode });
        d.setDate(d.getDate() + 1);
      }
    });
  }

  getHalfDayNotation(log: any): string {
    if (!log) return 'HD';
    if (log.halfCode) return log.halfCode;
    const dateStr = this.formatDateOnly(log.attendance_date);
    const leaveDetail = this.leaveDetailsMap.get(dateStr);
    if (leaveDetail && leaveDetail.halfCode) {
      return leaveDetail.halfCode;
    }
    if (log.notes && (log.notes.includes(':P') || log.notes.includes('P:'))) {
      return log.notes.trim();
    }
    const notesStr = String(log.notes || '').trim();
    const notesLower = notesStr.toLowerCase();
    let leaveCode = 'CL';
    if (notesLower.includes('loss of pay') || notesLower.includes('lop') || notesLower.includes('ul') || notesLower.includes('unpaid')) {
      leaveCode = 'LOP';
    } else if (notesLower.includes('sick') || notesLower.includes('sl')) {
      leaveCode = 'SL';
    } else if (notesLower.includes('casual') || notesLower.includes('cl')) {
      leaveCode = 'CL';
    } else if (notesLower.includes('maternity') || notesLower.includes('ml')) {
      leaveCode = 'ML';
    } else if (notesLower.includes('marriage') || notesLower.includes('mrl')) {
      leaveCode = 'MRL';
    } else if (notesLower.includes('earned') || notesLower.includes('el')) {
      leaveCode = 'EL';
    } else if (notesLower.includes('privilege') || notesLower.includes('pl')) {
      leaveCode = 'PL';
    } else if (notesStr) {
      const cleanName = notesStr.replace(/^(first|second|1st|2nd)\s+half\s+/i, '').trim();
      if (cleanName) {
        const words = cleanName.split(/\s+/);
        if (words.length > 1) {
          leaveCode = words.map(w => w[0].toUpperCase()).join('');
        } else {
          leaveCode = cleanName.substring(0, 4).toUpperCase();
        }
      }
    }

    if (notesLower.includes('second') || notesLower.includes('2nd')) {
      return `P:${leaveCode}`;
    }
    return `${leaveCode}:P`;
  }

  getLeaveBadgeText(log: any): string {
    if (!log) return 'LEAVE';
    if (log.leaveCode) return log.leaveCode;
    const dateStr = this.formatDateOnly(log.attendance_date);
    const leaveDetail = this.leaveDetailsMap.get(dateStr);
    if (leaveDetail && leaveDetail.typeCode) {
      return leaveDetail.typeCode;
    }
    const notesStr = String(log.notes || log.leaveType || '').trim();
    const notesLower = notesStr.toLowerCase();
    if (notesLower.includes('sick') || notesLower.includes('sl')) return 'SL';
    if (notesLower.includes('casual') || notesLower.includes('cl')) return 'CL';
    if (notesLower.includes('maternity') || notesLower.includes('ml')) return 'ML';
    if (notesLower.includes('marriage') || notesLower.includes('mrl')) return 'MRL';
    if (notesLower.includes('privilege') || notesLower.includes('pl')) return 'PL';
    if (notesLower.includes('earned') || notesLower.includes('el')) return 'EL';
    if (notesLower.includes('loss of pay') || notesLower.includes('lop') || notesLower.includes('ul')) return 'LOP';

    if (notesStr) {
      const words = notesStr.split(/\s+/);
      if (words.length > 1) {
        return words.map(w => w[0].toUpperCase()).join('');
      }
      return notesStr.substring(0, 4).toUpperCase();
    }
    return 'LEAVE';
  }

  loadMonthlyReport(): void {
    const request = this.employeeId
      ? this.attendanceApi.getEmployeeReport(this.employeeId, {
        startDate: this.startDate,
        endDate: this.endDate,
        month: this.currentMonth,
        year: this.currentYear,
      })
      : this.attendanceApi.getMonthlyReport({
        startDate: this.startDate,
        endDate: this.endDate,
        month: this.currentMonth,
        year: this.currentYear,
      });

    request.subscribe({
      next: res => {
        const apiAttendance = res?.attendance || [];
        const attendanceMap = new Map<string, any>();
        apiAttendance.forEach((item: any) => {
          attendanceMap.set(this.formatDateOnly(item.attendance_date), item);
        });
        const allDates = this.getAllDatesBetween(this.startDate, this.endDate);

        const weekOffDays: number[] = [];
        if (this.weeklyOffPolicy) {
          if (Number(this.weeklyOffPolicy.sunday_off) === 1) weekOffDays.push(0);
          if (Number(this.weeklyOffPolicy.monday_off) === 1) weekOffDays.push(1);
          if (Number(this.weeklyOffPolicy.tuesday_off) === 1) weekOffDays.push(2);
          if (Number(this.weeklyOffPolicy.wednesday_off) === 1) weekOffDays.push(3);
          if (Number(this.weeklyOffPolicy.thursday_off) === 1) weekOffDays.push(4);
          if (Number(this.weeklyOffPolicy.friday_off) === 1) weekOffDays.push(5);
          if (Number(this.weeklyOffPolicy.saturday_off) === 1) weekOffDays.push(6);
        }

        this.currentMonthreport = allDates.map(date => {
          const existing = attendanceMap.get(date);
          const day = new Date(date).getDay();
          const leaveType = this.leaveDaysMap.get(date);
          const leaveDetail = this.leaveDetailsMap.get(date);
          const isWeekOff = weekOffDays.includes(day);

          if (leaveDetail && leaveDetail.isHalfDay) {
            return {
              ...(existing || {}),
              attendance_date: date,
              status: 'half-day',
              leaveType: leaveDetail.leaveType,
              halfCode: leaveDetail.halfCode,
              noLogs: !existing
            };
          }

          if (leaveType) return { ...(existing || {}), attendance_date: date, status: 'on-leave', leaveType, noLogs: !existing };
          if (isWeekOff) return { ...(existing || {}), attendance_date: date, status: 'weekend', leaveType: 'Full day week off', noLogs: !existing };
          if (existing) {
            let updatedExisting = { ...existing, noLogs: false };
            if (existing.status === 'on-leave') {
              updatedExisting.noLogs = true;
              updatedExisting.leaveType = existing.notes || 'Leave';
            }
            const isToday = this.islogToday(date);
            if (isToday && this.todayPunches && this.todayPunches.length > 0) {
              const metrics = this.calculateMetricsFromPunches(this.todayPunches, true);
              updatedExisting.total_work_hours = metrics.totalWorkHours;
              updatedExisting.gross_hours = metrics.grossHours;
              const sortedPunches = this.todayPunches.slice().sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());
              const firstInPunch = sortedPunches.find(p => (p.punch_type || '').toLowerCase() === 'in') || sortedPunches[0];
              if (firstInPunch) {
                updatedExisting.first_check_in = firstInPunch.punch_time;
              }
            }
            return updatedExisting;
          }

          let defaultStatus = 'absent';
          const now = new Date();
          const logD = new Date(date);

          // Get shift start time for this day (fallback to 09:00:00)
          const shiftStartStr = this.shiftPolicy?.start_time || '09:00:00';
          const [sh, sm, ss] = shiftStartStr.split(':').map(Number);
          const shiftStart = new Date(logD);
          shiftStart.setHours(sh, sm, ss || 0, 0);

          // Penalty kicks in based on missing log configuration for user's leave plan
          const userLeavePlanId = this.employeeProfile?.leave_plan_id || this.employeeProfile?.LeavePlanId;
          const config = this.missingLogConfigs.find(c => c.leave_plan_id === userLeavePlanId);
          const thresholdHours = config ? config.threshold_hours : 24; // Default to 24 (previously 48 in code, but user said 24)

          const penaltyThreshold = new Date(shiftStart);
          penaltyThreshold.setHours(penaltyThreshold.getHours() + thresholdHours);

          if (now > penaltyThreshold) {
            defaultStatus = 'penalty';
          } else {
            // If it's today, handle 'not-in-yet' or present from today punches
            const isToday = now.getFullYear() === logD.getFullYear() && now.getMonth() === logD.getMonth() && now.getDate() === logD.getDate();
            if (isToday) {
              if (this.todayPunches && this.todayPunches.length > 0) {
                const metrics = this.calculateMetricsFromPunches(this.todayPunches, true);
                const sortedPunches = this.todayPunches.slice().sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());
                const firstInPunch = sortedPunches.find(p => (p.punch_type || '').toLowerCase() === 'in') || sortedPunches[0];
                return {
                  attendance_date: date,
                  first_check_in: firstInPunch ? firstInPunch.punch_time : null,
                  total_work_hours: metrics.totalWorkHours,
                  gross_hours: metrics.grossHours,
                  status: 'present',
                  records: [],
                  noLogs: false
                };
              }
              defaultStatus = 'not-in-yet';
            }
          }
          return { attendance_date: date, total_work_hours: null, gross_hours: null, status: defaultStatus, records: [], noLogs: true };
        });

        this.currentMonthreport.reverse();
        this.attendanceService.setMonthlyReport(this.currentMonthreport);
      },
      error: () => { this.currentMonthreport = []; }
    });
  }

  filterByPeriod(period: string): void {
    this.selectedPeriod = period;
    const now = new Date();
    if (period === '30DAYS') {
      this.currentMonth = now.getMonth() + 1;
      this.currentYear = now.getFullYear();
      this.startDate = `${this.currentYear}-${String(this.currentMonth).padStart(2, '0')}-01`;
      this.endDate = this.formatDateOnly(new Date(this.currentYear, this.currentMonth, 0));
    } else {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const monthIndex = months.indexOf(period);
      if (monthIndex !== -1) {
        let year = now.getFullYear();
        if (monthIndex > now.getMonth()) year -= 1;
        this.startDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`;
        this.endDate = this.formatDateOnly(new Date(year, monthIndex + 1, 0));
        this.currentMonth = monthIndex + 1;
        this.currentYear = year;
      }
    }
    this.loadMonthlyReport();
    this.periodChanged.emit({
      period: this.selectedPeriod,
      startDate: this.startDate,
      endDate: this.endDate,
      month: this.currentMonth,
      year: this.currentYear
    });
  }

  getSelectedPeriodLabel(): string {
    if (this.selectedPeriod === '30DAYS') {
      const months: { [key: number]: string } = {
        1: 'January', 2: 'February', 3: 'March', 4: 'April',
        5: 'May', 6: 'June', 7: 'July', 8: 'August',
        9: 'September', 10: 'October', 11: 'November', 12: 'December'
      };
      return `${months[this.currentMonth] || 'Last 30 Days'} ${this.currentYear}`;
    }
    const months: { [key: string]: string } = {
      JAN: 'January', FEB: 'February', MAR: 'March', APR: 'April',
      MAY: 'May', JUN: 'June', JUL: 'July', AUG: 'August',
      SEP: 'September', OCT: 'October', NOV: 'November', DEC: 'December'
    };
    return `${months[this.selectedPeriod] || this.selectedPeriod} ${this.currentYear}`;
  }

  openLogDetails(log: any): void {
    const today = new Date().toDateString();
    const logDate = new Date(log.attendance_date).toDateString();
    if (today === logDate && this.todayPunches.length) {
      this.selectedLog = {
        ...log,
        prepared: false
      };
      this.processSelectedLog(this.todayPunches);
    } else {
      this.selectedLog = { ...log, prepared: false };
      this.loadLogDetails(log);
    }
    this.showSlider = true;
  }

  closeSlider(): void { this.showSlider = false; this.selectedLog = null; }

  private loadLogDetails(log: any): void {
    if (!log?.attendance_date) return;
    const formattedDate = this.formatDateOnly(log.attendance_date);
    this.attendanceApi.getAttendanceDetailsByDate(formattedDate, this.employeeId || undefined).subscribe({
      next: (res) => {
        this.selectedLog = {
          ...log,
          prepared: false
        };
        this.processSelectedLog(res?.punches || []);
      },
      error: () => {
        this.selectedLog = { ...log, prepared: true, timeline: [], total_work_hours: '0.00', gross_hours: '0.00' };
      }
    });
  }

  private processSelectedLog(punches: any[]): void {
    if (!this.selectedLog) return;

    const rawPunches = Array.isArray(punches)
      ? punches.slice().sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime())
      : [];

    const isToday = this.islogToday(this.selectedLog.attendance_date);
    const groupsMap = new Map<string, { locationName: string; icon: string; sessions: any[] }>();

    const getCleanLocationName = (p: any): string => {
      if (!p) return 'Web Clock In';
      const loc = (p.location || '').trim();
      const mode = (p.work_mode || '').trim();
      const source = (p.source || '').trim();
      const lowerLoc = loc.toLowerCase();
      const lowerNotes = (p.notes || '').toLowerCase();

      if (source === 'biometric' || mode === 'Biometric' || lowerNotes.includes('biometric')) {
        if (loc && !lowerLoc.includes('reader') && !lowerLoc.includes('device ()') && !lowerLoc.startsWith('biometric device') && !lowerLoc.includes('office') && !lowerLoc.includes('mumbai')) {
          return loc;
        }
        if (p.device_info) {
          const dev = String(p.device_info).trim();
          if (dev === '1') return '4th Floor SVS Towers';
          if (dev === '2') return '3rd Floor SVS Towers';
          if (dev === '3') return '4th Floor SVS Towers';
          return `${dev}${dev.endsWith('Floor') ? '' : ''} SVS Towers`;
        }
        return '4th Floor SVS Towers';
      }

      if (mode === 'Remote' || lowerLoc.includes('remote') || lowerNotes.includes('remote')) {
        return 'Remote Clock In';
      }

      if (mode === 'WFH' || lowerLoc.includes('home') || lowerNotes.includes('wfh')) {
        return 'Work From Home';
      }

      if (mode === 'Office' || lowerLoc.includes('office') || lowerLoc.includes('mumbai') || lowerNotes.includes('office')) {
        return 'Web Clock In';
      }

      if (mode) {
        return `${mode} Clock In`;
      }

      return 'Web Clock In';
    };

    const getFormattedTime = (dateVal: any): string => {
      if (!dateVal) return '';
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) {
        if (typeof dateVal === 'string' && dateVal.includes(':')) {
          const parts = dateVal.split(' ');
          const t = parts.length > 1 ? parts[1] : parts[0];
          return t.split('.')[0];
        }
        return String(dateVal);
      }
      const hours = d.getHours();
      const mins = String(d.getMinutes()).padStart(2, '0');
      const secs = String(d.getSeconds()).padStart(2, '0');
      return `${hours}:${mins}:${secs}`;
    };

    const getGroupIcon = (name: string): string => {
      const lower = name.toLowerCase();
      if (lower.includes('floor') || lower.includes('svs') || lower.includes('biometric')) return 'finger-print-outline';
      if (lower.includes('remote')) return 'cloud-outline';
      if (lower.includes('home') || lower.includes('wfh')) return 'home-outline';
      return 'desktop-outline';
    };

    // Partition punches by distinct location/source group
    const locationPunchesMap = new Map<string, any[]>();
    for (const p of rawPunches) {
      const locName = getCleanLocationName(p);
      if (!locationPunchesMap.has(locName)) {
        locationPunchesMap.set(locName, []);
      }
      locationPunchesMap.get(locName)!.push(p);
    }

    let hasAnyValidOut = false;
    const workIntervals: { start: number; end: number }[] = [];
    let earliestInMs: number | null = null;
    let latestOutMs: number | null = null;

    // Process each location/source stream independently so biometric and web punches do not interfere visually
    locationPunchesMap.forEach((streamPunches, locName) => {
      const icon = getGroupIcon(locName);
      const sessions: any[] = [];
      let currentInPunch: any = null;

      for (let i = 0; i < streamPunches.length; i++) {
        const p = streamPunches[i];
        const pTimeMs = new Date(p.punch_time).getTime();
        const isAutoOut = (p.notes || '').includes('OUT Missing') || (p.notes || '').includes('Auto Clock-Out');
        const punchType = (p.punch_type || '').toLowerCase();

        if (punchType === 'in') {
          if (earliestInMs === null || pTimeMs < earliestInMs) {
            earliestInMs = pTimeMs;
          }
          if (currentInPunch) {
            sessions.push({
              inTime: getFormattedTime(currentInPunch.punch_time),
              outTime: 'MISSING',
              isMissingOut: true,
              isAutoOut: true,
              notes: currentInPunch.notes
            });
          }
          currentInPunch = p;
        } else if (punchType === 'out') {
          if (currentInPunch) {
            if (isAutoOut) {
              sessions.push({
                inTime: getFormattedTime(currentInPunch.punch_time),
                outTime: 'MISSING',
                isMissingOut: true,
                isAutoOut: true,
                notes: p.notes
              });
            } else {
              sessions.push({
                inTime: getFormattedTime(currentInPunch.punch_time),
                outTime: getFormattedTime(p.punch_time),
                isMissingOut: false,
                isAutoOut: false,
                notes: p.notes
              });

              const inTimeMs = new Date(currentInPunch.punch_time).getTime();
              if (pTimeMs > inTimeMs) {
                workIntervals.push({ start: inTimeMs, end: pTimeMs });
                hasAnyValidOut = true;
                if (latestOutMs === null || pTimeMs > latestOutMs) {
                  latestOutMs = pTimeMs;
                }
              }
            }
            currentInPunch = null;
          } else {
            sessions.push({
              inTime: 'MISSING',
              outTime: isAutoOut ? 'MISSING' : getFormattedTime(p.punch_time),
              isMissingOut: false,
              isAutoOut: isAutoOut,
              notes: p.notes
            });
          }
        }
      }

      if (currentInPunch) {
        sessions.push({
          inTime: getFormattedTime(currentInPunch.punch_time),
          outTime: isToday ? 'IN PROGRESS' : 'MISSING',
          isMissingOut: !isToday,
          isAutoOut: false,
          notes: currentInPunch.notes
        });
      }

      groupsMap.set(locName, {
        locationName: locName,
        icon,
        sessions
      });
    });

    const metrics = this.calculateMetricsFromPunches(rawPunches, isToday);
    if (metrics.hasAnyValidOut || isToday) {
      this.selectedLog.total_work_hours = metrics.totalWorkHours;
      this.selectedLog.gross_hours = metrics.grossHours;
    }

    this.selectedLog.locationGroups = Array.from(groupsMap.values());
    this.selectedLog.prepared = true;
  }

  calculateMetricsFromPunches(rawPunches: any[], isToday: boolean): {
    totalWorkHours: string;
    grossHours: string;
    totalWorkMinutes: number;
    grossMinutes: number;
    hasAnyValidOut: boolean;
  } {
    if (!rawPunches || !rawPunches.length) {
      return { totalWorkHours: '0.00', grossHours: '0.00', totalWorkMinutes: 0, grossMinutes: 0, hasAnyValidOut: false };
    }

    const punches = rawPunches.slice().sort((a, b) => new Date(a.punch_time).getTime() - new Date(b.punch_time).getTime());
    const locationPunchesMap = new Map<string, any[]>();
    for (const p of punches) {
      const loc = (p.location || p.source || p.work_mode || 'default').trim();
      if (!locationPunchesMap.has(loc)) {
        locationPunchesMap.set(loc, []);
      }
      locationPunchesMap.get(loc)!.push(p);
    }

    const workIntervals: { start: number; end: number }[] = [];
    let earliestInMs: number | null = null;
    let latestOutMs: number | null = null;
    let hasAnyValidOut = false;

    locationPunchesMap.forEach(streamPunches => {
      let currentInPunch: any = null;
      for (let i = 0; i < streamPunches.length; i++) {
        const p = streamPunches[i];
        const pTimeMs = new Date(p.punch_time).getTime();
        const isAutoOut = (p.notes || '').includes('OUT Missing') || (p.notes || '').includes('Auto Clock-Out');
        const punchType = (p.punch_type || '').toLowerCase();

        if (punchType === 'in') {
          if (earliestInMs === null || pTimeMs < earliestInMs) {
            earliestInMs = pTimeMs;
          }
          currentInPunch = p;
        } else if (punchType === 'out') {
          if (currentInPunch && !isAutoOut) {
            const inTimeMs = new Date(currentInPunch.punch_time).getTime();
            if (pTimeMs > inTimeMs) {
              workIntervals.push({ start: inTimeMs, end: pTimeMs });
              hasAnyValidOut = true;
              if (latestOutMs === null || pTimeMs > latestOutMs) {
                latestOutMs = pTimeMs;
              }
            }
          }
          currentInPunch = null;
        }
      }
    });

    workIntervals.sort((a, b) => a.start - b.start);
    const mergedIntervals: { start: number; end: number }[] = [];
    for (const interval of workIntervals) {
      if (!mergedIntervals.length || mergedIntervals[mergedIntervals.length - 1].end < interval.start) {
        mergedIntervals.push({ ...interval });
      } else {
        mergedIntervals[mergedIntervals.length - 1].end = Math.max(
          mergedIntervals[mergedIntervals.length - 1].end,
          interval.end
        );
      }
    }

    const totalWorkMs = mergedIntervals.reduce((acc, curr) => acc + (curr.end - curr.start), 0);
    const totalWorkMinutes = totalWorkMs / (1000 * 60);

    let grossMinutes = 0;
    if (earliestInMs !== null) {
      const endMs = latestOutMs !== null ? latestOutMs : (isToday ? Date.now() : earliestInMs);
      if (endMs > earliestInMs) {
        grossMinutes = (endMs - earliestInMs) / (1000 * 60);
      }
    }

    return {
      totalWorkHours: (totalWorkMinutes / 60).toFixed(2),
      grossHours: (grossMinutes / 60).toFixed(2),
      totalWorkMinutes,
      grossMinutes,
      hasAnyValidOut
    };
  }

  getOfficeRecords(records: any[]): any[] {
    return records.filter(r => {
      const loc = r.location?.toLowerCase() || '';
      return r.work_mode === 'Office' || loc.includes('office') || loc.includes('mumbai');
    });
  }

  getWFHRecords(records: any[]): any[] {
    return records.filter(r => r.work_mode === 'WFH' || r.location?.toLowerCase().includes('home'));
  }

  getRemoteRecords(records: any[]): any[] {
    return records.filter(r => r.work_mode === 'Remote').map(r => ({ ...r, pendingApproval: r.approved !== true }));
  }

  getArrivalStatus(log: any): string {
    if (!log?.status) return 'Unknown';
    
    // Check if regularized via notes
    if (log.notes && log.notes.includes('[REGULARIZED')) {
      return 'regularlise';
    }

    if (log.notes && (log.notes.includes('Half') || log.notes.includes('Leave') || log.notes.includes('Loss of Pay'))) {
      return log.notes;
    }

    const statusMap: { [key: string]: string } = {
      present: 'On Time', absent: 'Absent', 'half-day': 'Half Day',
      late: 'Late Arrival', 'on-leave': 'On Leave', 'not-in-yet': 'NOT-IN-YET',
      penalty: 'Penalty'
    };
    if (log.status === 'present' && log.first_check_in && this.shiftPolicy?.start_time) {
      try {
        const checkIn = new Date(log.first_check_in);
        const [shiftH, shiftM, shiftS] = this.shiftPolicy.start_time.split(':').map(Number);
        const grace = new Date(checkIn);
        grace.setHours(shiftH, shiftM + 15, shiftS || 0, 0);
        if (checkIn > grace) return 'Late Arrival';
      } catch { }
    }
    return statusMap[log.status] || 'Unknown';
  }

  formatHours(hDecimal: any, logDate?: string): string {
    if (hDecimal === null || hDecimal === undefined || hDecimal === '-') return '-';
    const totalHours = parseFloat(hDecimal);
    if (isNaN(totalHours)) return '-';
    const h = Math.floor(totalHours);
    const m = Math.round((totalHours - h) * 60);
    const suffix = logDate && this.islogToday(logDate) ? ' +' : '';
    return `${h}h ${m}m${suffix}`;
  }

  /**
   * Returns an array of segments for the attendance visual bar.
   * Each segment: { type: 'work' | 'break', widthPct: number }
   *
   * Strategy (monthly report does NOT include individual punches):
   *   - Use first_check_in → last_check_out as the total window (gross span).
   *   - Effective work = total_work_hours (blue).
   *   - Break = gross_hours - total_work_hours (gray gap in middle).
   *   - Reference window = max(gross span, 8 h) so bars stay proportional.
   *   - Segment order: [work block][break block][work block] split evenly.
   *     If no break, just one solid work block.
   *   - If no punch data, fall back to a single proportional work bar.
   */
  getAttendanceSegments(log: any): { type: 'work' | 'break'; widthPct: number }[] {
    const workH  = parseFloat(log?.total_work_hours);
    const grossH = parseFloat(log?.gross_hours);

    // Nothing to show
    if (!log?.first_check_in || isNaN(workH) || workH <= 0) {
      return [];
    }

    // Reference window in hours (cap at 12 h to prevent tiny-looking bars)
    const refH = Math.max(isNaN(grossH) ? workH : grossH, 8);

    const workPct  = Math.min((workH  / refH) * 100, 100);
    const grossPct = isNaN(grossH) ? workPct : Math.min((grossH / refH) * 100, 100);
    const breakPct = Math.max(grossPct - workPct, 0);

    if (breakPct < 0.5) {
      // No meaningful break – single work bar
      return [{ type: 'work', widthPct: workPct }];
    }

    // Split work on both sides of the break (equal halves)
    const halfWorkPct = workPct / 2;
    return [
      { type: 'work',  widthPct: halfWorkPct },
      { type: 'break', widthPct: breakPct    },
      { type: 'work',  widthPct: halfWorkPct },
    ];
  }

  /** Returns break hours = gross - effective */
  getBreakHours(log: any): string {
    const gross = parseFloat(log?.gross_hours);
    const work  = parseFloat(log?.total_work_hours);
    if (isNaN(gross) || isNaN(work) || gross <= work) return '';
    const breakH = gross - work;
    const h = Math.floor(breakH);
    const m = Math.round((breakH - h) * 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  islogToday(date: string): boolean {
    if (!date) return false;
    const today = new Date().toISOString().split('T')[0];
    const logDate = new Date(date).toISOString().split('T')[0];
    return today === logDate;
  }

  getLateDuration(log: any): string {
    if (!log || (log.status !== 'present' && log.status !== 'late') || !log.first_check_in || !this.shiftPolicy?.start_time) return '';
    
    // Check if regularized via notes
    if (log.notes && log.notes.includes('[REGULARIZED')) {
      return '';
    }

    try {
      const checkIn = new Date(log.first_check_in);
      const [shiftH, shiftM, shiftS] = this.shiftPolicy.start_time.split(':').map(Number);
      const shiftStart = new Date(checkIn);
      shiftStart.setHours(shiftH, shiftM, shiftS || 0, 0);
      const diffMs = checkIn.getTime() - shiftStart.getTime();
      if (diffMs > 15 * 60 * 1000) {
        const s = Math.floor(diffMs / 1000);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        const hStr = h > 0 ? `${h}:` : '';
        return `${hStr}${String(m).padStart(h > 0 ? 2 : 1, '0')}:${String(sec).padStart(2, '0')} late`;
      }
    } catch { }
    return '';
  }

  // ================= REGULARIZATION =================

  async openRegularizeModal(log: any) {
    const alert = await this.alertCtrl.create({
      header: 'Regularize Attendance',
      subHeader: `Date: ${log.attendance_date}`,
      cssClass: 'regularization-alert',
      inputs: [
        { name: 'first_in', type: 'time', value: '09:15', placeholder: 'Punch In' },
        { name: 'last_out', type: 'time', value: '18:20', placeholder: 'Punch Out' },
        { name: 'reason', type: 'textarea', placeholder: 'Reason for regularization' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Regularize',
          handler: (data) => {
            this.regularizePenalty(log, data);
          }
        }
      ]
    });
    await alert.present();
  }

  regularizePenalty(log: any, data: any) {
    const payload = {
      employee_id: this.employeeId || this.employeeProfile?.id,
      attendance_date: log.attendance_date,
      status: 'present',
      first_check_in: data.first_in,
      last_check_out: data.last_out,
      work_mode: 'Office',
      location: this.employeeProfile?.location_name || 'Mumbai Office',
      reason: data.reason || 'Regularized'
    };

    this.attendanceApi.backdateRegularization(payload).subscribe({
      next: async (res: any) => {
        const toast = await this.toastCtrl.create({
          message: 'Attendance regularized successfully',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present();
        this.loadMonthlyReport();
        if (this.selectedLog && this.selectedLog.attendance_date === log.attendance_date) {
          this.closeSlider();
        }
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: err?.error?.error || 'Failed to regularize attendance',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        toast.present();
      }
    });
  }
}
