import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
Chart.register(...registerables);

import { AttendanceService } from '../../../core/services/attendance.service';
import { AttendanceApiService } from '../../../core/services/attendance-api.service';
import { AdminService } from '../../../core/services/admin.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { LeaverequestService } from '../../../core/services/leaverequest.service';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

import { ClockButtonComponent } from '../../../shared/components/clock-button/clock-button.component';
import { AttendanceLogComponent } from '../../../shared/components/attendance-log/attendance-log.component';
import { CalendarComponent } from '../../../shared/components/calendar/calendar.component';
import { AttendanceRequestComponent } from '../../../shared/components/attendance-request/attendance-request.component';
import { RemoteClockinModalComponent } from './components/remote-clockin-modal.component';
import { WorkFromHomeComponent } from './components/work-from-home.component';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ClockButtonComponent,
    AttendanceLogComponent,
    CalendarComponent,
    AttendanceRequestComponent,
    TimeFormatPipe
  ],
})
export class MePage implements OnInit, AfterViewInit {
  @ViewChild(ClockButtonComponent) clockButton?: ClockButtonComponent;
  @ViewChild('attendanceChart') attendanceChartCanvas?: ElementRef;

  attendanceRefresh = 0;
  private chart: any;

  // Stats for current date
  lateMinutes: number = 0;
  totalBreakMinutes: number = 0;
  effectiveMinutes: number = 0;
  grossMinutes: number = 0;

  // Shift
  shift_id: any;
  allShiftPolicies: any[] = [];
  shift_policy: any;

  // Weekend
  weekend_id: any;
  allWeekendPolicies: any[] = [];
  serverWeekOff: string[] = [];

  // UI
  shiftDuration = '9h 0m';
  breakMinutes = 60;
  effectiveHours = '00:00';
  grossHours = '00:00';
  status = 'NOT In Yet';
  activeTab = 'log';
  progressValue = 0.85;

  days: Date[] = [];
  today: Date = new Date();
  currentMonthName: string = '';

  monthlySummary: any = {
    total_days: 0, present_days: 0, absent_days: 0, half_days: 0, lop_days: 0,
    avg_work_hours: 0, total_effective_hours: 0, total_gross_hours: 0
  };

  lastAttendance: any[] = [];
  lastLeaves: any[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private attendanceApi: AttendanceApiService,
    private adminService: AdminService,
    private employeeService: EmployeeService,
    private toastCtrl: ToastController,
    private leaveService: LeaverequestService,
    private modalCtrl: ModalController,
  ) {
    this.generateDays();
  }

  ngOnInit() {
    this.loadShiftPolicies();
    this.loadWeekendPolicies();
    this.loadEmployeeProfile();
    this.loadTodayAttendance();
    this.loadMonthlySummary();
  }

  ionViewWillEnter() {
    this.loadTodayAttendance();
    this.loadMonthlySummary();
  }

  // ================= DATA LOADERS =================

  loadShiftPolicies() {
    this.adminService.getShiftPolicies().subscribe(res => {
      this.allShiftPolicies = res || [];
      this.matchEmployeeShift();
    });
  }

  loadWeekendPolicies() {
    this.adminService.getWeeklyOffPolicies().subscribe(res => {
      this.allWeekendPolicies = res || [];
      this.matchEmployeeWeekend();
    });
  }

  loadEmployeeProfile() {
    this.employeeService.getMyProfile().subscribe(profile => {
      if (!profile) return;
      this.shift_id = profile.shift_policy_id || profile.ShiftPolicyId;
      this.weekend_id = profile.weekly_off_policy_id || profile.WeeklyOffPolicyId;
      this.matchEmployeeShift();
      this.matchEmployeeWeekend();
    });
  }

  loadTodayAttendance() {
    this.attendanceApi.getTodayAttendance(true).subscribe({
      next: (res: any) => {
        this.status = res?.attendance?.status || 'NOT In Yet';
        const punches = res?.punches || [];
        const pipe = new TimeFormatPipe();

        if (res?.attendance) {
          let gross = parseFloat(res.attendance.gross_hours || 0);
          let effective = parseFloat(res.attendance.total_work_hours || 0);

          if (res.last_punch_type === 'in' && punches.length > 0) {
            const lastPunch = punches[punches.length - 1];
            const startTime = new Date(lastPunch.punch_time).getTime();
            const now = new Date().getTime();
            const diffHours = (now - startTime) / (1000 * 60 * 60);
            effective += diffHours;
            const firstPunch = punches[0];
            gross = (now - new Date(firstPunch.punch_time).getTime()) / (1000 * 60 * 60);
          }

          this.grossHours = pipe.transform(gross);
          this.effectiveHours = pipe.transform(effective);

          this.grossMinutes = Math.round(gross * 60);
          this.effectiveMinutes = Math.round(effective * 60);

          // Calculate late login if shift is available
          if (this.shift_policy && punches.length > 0) {
            const firstPunch = new Date(punches[0].punch_time);
            const shiftStartStr = this.shift_policy.start_time; // HH:mm
            const [h, m] = shiftStartStr.split(':').map(Number);
            const shiftStartDate = new Date(firstPunch);
            shiftStartDate.setHours(h, m, 0, 0);

            if (firstPunch > shiftStartDate) {
              this.lateMinutes = Math.max(0, Math.round((firstPunch.getTime() - shiftStartDate.getTime()) / 60000));
            } else {
              this.lateMinutes = 0;
            }
          }

          this.createTimelineData(punches);
        } else {
          this.grossHours = '00:00';
          this.effectiveHours = '00:00';
          this.lateMinutes = 0;
          this.totalBreakMinutes = 0;
          this.createTimelineData([]);
        }
      },
      error: () => {
        this.status = 'NOT In Yet';
        this.grossHours = '00:00';
        this.effectiveHours = '00:00';
        this.lateMinutes = 0;
        this.totalBreakMinutes = 0;
        this.createTimelineData([]);
      },
    });
  }

  createTimelineData(punches: any[]) {
    if (!punches || punches.length === 0) {
      if (this.chart) this.chart.destroy();
      return;
    }

    const labels: string[] = [];
    const inData: number[] = [];
    const outData: number[] = [];

    let totalBreaks = 0;

    for (let i = 0; i < punches.length; i++) {
      const p = punches[i];
      const time = new Date(p.punch_time).getTime();

      if (p.punch_type === 'in') {
        const nextPunch = punches[i + 1];
        const endTime = nextPunch ? new Date(nextPunch.punch_time).getTime() : Date.now();
        const durationMin = (endTime - time) / 60000;
        inData.push(Math.round(durationMin));
        labels.push(`In: ${new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      } else if (p.punch_type === 'out') {
        const nextPunch = punches[i + 1];
        if (nextPunch) {
          const nextInTime = new Date(nextPunch.punch_time).getTime();
          const breakMin = (nextInTime - time) / 60000;
          totalBreaks += breakMin;
          outData.push(Math.round(breakMin));
        }
      }
    }

    this.totalBreakMinutes = Math.round(totalBreaks);
    this.updateChart(Math.round(inData.reduce((a, b) => a + b, 0)), this.totalBreakMinutes);
  }

  ngAfterViewInit() {
    // Chart will be initialized when data arrives
  }

  updateChart(effective: number, totalBreak: number) {
    if (!this.attendanceChartCanvas) return;

    const ctx = this.attendanceChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    const late = this.lateMinutes || 0;
    const hasData = (effective + totalBreak + late) > 0;

    // Custom helper for formatting durations in tooltips
    const formatDuration = (min: number) => {
      if (min < 60) return `${min}m`;
      const h = Math.floor(min / 60);
      const m = Math.round(min % 60);
      return `${h}h ${m}m`;
    };

    const data = {
      labels: ['Late', 'Effective', 'Break'],
      datasets: [
        {
          data: hasData ? [late, effective, totalBreak] : [0, 0, 1],
          backgroundColor: hasData
            ? ['#f59e0b', '#06b6d4', '#ec4899'] // Amber, Cyan, Pink
            : ['#f1f5f9'],
          hoverBackgroundColor: hasData
            ? ['#d97706', '#0891b2', '#db2777']
            : ['#e2e8f0'],
          borderWidth: 2,
          borderColor: '#ffffff',
          cutout: '75%',
          borderRadius: 10
        }
      ]
    };

    const centerTextPlugin = {
      id: 'centerText',
      afterDraw: (chart: any) => {
        const { ctx, chartArea: { top, width, height } } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Value
        ctx.font = 'bold 24px "Outfit", "Inter", sans-serif';
        ctx.fillStyle = '#1e293b'; // Dark slate
        ctx.fillText(this.grossHours || '00:00', width / 2, (height / 2) + top - 5);

        // Label
        ctx.font = '700 10px "Outfit", "Inter", sans-serif';
        ctx.fillStyle = '#64748b'; // Slate muted
        ctx.fillText('GROSS HRS', width / 2, (height / 2) + top + 18);
        ctx.restore();
      }
    };

    const config: any = {
      type: 'doughnut',
      data: data,
      plugins: [centerTextPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              padding: 12,
              color: '#475569',
              font: { size: 10, weight: '700' }
            }
          },
          tooltip: {
            enabled: hasData,
            backgroundColor: '#ffffff',
            titleColor: '#1e293b',
            bodyColor: '#475569',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 12,
            boxPadding: 4,
            cornerRadius: 10,
            callbacks: {
              label: (item: any) => ` ${item.label}: ${formatDuration(item.raw)}`
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  loadMonthlySummary() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;

    this.currentMonthName = d.toLocaleString('default', { month: 'long' });

    this.attendanceApi.getMonthlyReport({ startDate, endDate, month, year }).subscribe({
      next: (res: any) => {
        if (res?.summary) {
          this.monthlySummary = res.summary;
          this.lastAttendance = res?.attendance || [];
        }
      },
      error: (err) => console.error('Error loading monthly summary:', err)
    });
  }



  // ================= MATCHERS =================

  matchEmployeeShift() {
    if (!this.shift_id || !this.allShiftPolicies.length) return;
    this.shift_policy = this.allShiftPolicies.find((p: any) => p.id === this.shift_id);
  }

  matchEmployeeWeekend() {
    if (!this.weekend_id || !this.allWeekendPolicies.length) return;
    const policy = this.allWeekendPolicies.find((p: any) => p.id === this.weekend_id);
    if (!policy) return;
    const weekMap = [
      { key: 'sunday_off', label: 'sunday' }, { key: 'monday_off', label: 'monday' },
      { key: 'tuesday_off', label: 'tuesday' }, { key: 'wednesday_off', label: 'wednesday' },
      { key: 'thursday_off', label: 'thursday' }, { key: 'friday_off', label: 'friday' },
      { key: 'saturday_off', label: 'saturday' },
    ];
    this.serverWeekOff = weekMap.filter(day => policy[day.key] === 1).map(day => day.label);

  }

  trackByDate(index: number, day: Date): string { return day.toDateString(); }

  // ================= WFH CLOCK-IN =================

  wfhClockIn() {
    this.attendanceApi.checkTodayWFH().subscribe({
      next: (res: any) => {
        if (!res?.has_wfh) { this.showToast('WFH not approved for today', 'warning'); return; }
        this.attendanceApi.apiPunchIn({ work_mode: 'WFH', location: 'Home', notes: 'WFH Clock-In' }).subscribe({
          next: () => {
            this.showToast('WFH Clock-In successful', 'success');
            this.loadTodayAttendance();
            if (this.clockButton) { this.clockButton.workMode = 'WFH'; this.clockButton.isClockedIn = true; }
            this.attendanceRefresh = Date.now();
          },
          error: err => this.showToast(err?.error?.message || 'WFH Clock-In failed', 'danger'),
        });
      },
      error: () => this.showToast('WFH check failed', 'danger'),
    });
  }

  // ================= MODALS =================

  async openRemoteClockinModal() {
    const modal = await this.modalCtrl.create({
      component: RemoteClockinModalComponent,
      cssClass: 'side-custom-popup team-popup',
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((res) => {
      if (res.data?.success) {
        this.loadTodayAttendance();
        this.attendanceRefresh = Date.now();
      }
    });

    return await modal.present();
  }

  async openWFHModal() {
    const modal = await this.modalCtrl.create({
      component: WorkFromHomeComponent,
      cssClass: 'side-custom-popup team-popup',
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'success') {
        this.attendanceRefresh = Date.now();
      }
    });

    return await modal.present();
  }

  // ================= HELPERS =================

  generateDays() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const start = new Date(today.setDate(diff));
    this.days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      this.days.push(d);
    }
  }

  isToday(day: Date) { return day.toDateString() === this.today.toDateString(); }

  isWeekOffDay(day: Date): boolean {
    const weekday = day.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const weekOffs = this.serverWeekOff?.length > 0 ? this.serverWeekOff : ['saturday', 'sunday'];
    return weekOffs.includes(weekday);
  }

  onClockStatusChanged(record: any) {
    this.attendanceRefresh = Date.now();
    this.loadTodayAttendance();
    this.loadMonthlySummary();
  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'log') this.attendanceRefresh = Date.now();
  }

  async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({ message, duration: 2500, position: 'top', color });
    await toast.present();
  }
}
