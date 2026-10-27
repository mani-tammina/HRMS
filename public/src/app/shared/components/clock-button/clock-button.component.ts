import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Subject, takeUntil, interval, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { AttendanceApiService } from '../../../core/services/attendance-api.service';

@Component({
  selector: 'app-clock-button',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
  <div class="attendance-btn-container" [class.mini-layout]="isMePage">
    <!-- Clock In Button Group (when not clocked in) -->
    <div *ngIf="!isClockedIn" class="row-center">
      <!-- Standard Clock In (Office) -->
      <button class="modern-clock-btn in" (click)="clockIn('Office')" [disabled]="loading || initialLoading">
        <div class="inner-pulse"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="(loading && clockingInMode === 'Office') || initialLoading" name="crescent" class="btn-spinner"></ion-spinner>
          <span class="text">Clock In</span>
        </div>
      </button>

      <!-- Remote In (shown on Dashboard when remote privilege / punches exist) -->
      <button *ngIf="!isMePage && hasRemotePrivilege" class="modern-clock-btn in remote" (click)="clockIn('Remote')" [disabled]="loading || initialLoading">
        <div class="inner-pulse orange"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading && clockingInMode === 'Remote'" name="crescent" class="btn-spinner"></ion-spinner>
          <ion-icon *ngIf="!(loading && clockingInMode === 'Remote')" name="cloud-outline"></ion-icon>
          <span class="text">Remote In</span>
        </div>
      </button>

      <!-- WFH In (shown on Dashboard when WFH privilege / punches exist) -->
      <button *ngIf="!isMePage && hasWFHPrivilege" class="modern-clock-btn in wfh" (click)="clockIn('WFH')" [disabled]="loading || initialLoading">
        <div class="inner-pulse cyan"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading && clockingInMode === 'WFH'" name="crescent" class="btn-spinner"></ion-spinner>
          <ion-icon *ngIf="!(loading && clockingInMode === 'WFH')" name="home-outline"></ion-icon>
          <span class="text">WFH In</span>
        </div>
      </button>
    </div>

    <!-- Clock Out Button Group (when clocked in) -->
    <div *ngIf="isClockedIn" class="row-center">
      <!-- Office Out -->
      <button *ngIf="workMode === 'Office' || (!workMode && workMode !== 'Remote' && workMode !== 'WFH')" class="modern-clock-btn out" (click)="clockOut()" [disabled]="loading || initialLoading">
        <div class="inner-pulse red"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading" name="crescent" class="btn-spinner"></ion-spinner>
          <span class="text">Clock Out</span>
        </div>
      </button>

      <!-- Remote Out -->
      <button *ngIf="workMode === 'Remote'" class="modern-clock-btn remote" (click)="remoteClockOut()" [disabled]="loading || initialLoading">
        <div class="inner-pulse orange"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading" name="crescent" class="btn-spinner"></ion-spinner>
          <ion-icon name="cloud-offline-outline"></ion-icon>
          <span class="text">Remote Out</span>
        </div>
      </button>

      <!-- WFH Out -->
      <button *ngIf="workMode === 'WFH'" class="modern-clock-btn wfh" (click)="clockOut()" [disabled]="loading || initialLoading">
        <div class="inner-pulse cyan"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading" name="crescent" class="btn-spinner"></ion-spinner>
          <span class="text">WFH Out</span>
        </div>
      </button>
    </div>
  </div>
  `,
  styles: [`
    .attendance-btn-container {
      &.mini-layout {
        .row-center {
          justify-content: center;
        }
        .modern-clock-btn {
          height: 38px;
          padding: 0 16px;
          .btn-content {
            gap: 8px;
            ion-icon { font-size: 18px; }
            .text { font-size: 13px; font-weight: 700; }
          }
        }
      }
    }

    .row-center {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .modern-clock-btn {
      position: relative;
      height: 38px;
      border: none;
      border-radius: 64px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 22px;
      background: #f8fafc;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                  0 8px 10px -6px rgba(0, 0, 0, 0.1);

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: currentColor;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2);
        
        &::after { opacity: 0.05; }
        .inner-pulse { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      }

      &:active {
        transform: translateY(0) scale(0.98);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.75;
        transform: none;
        box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.18);
      }

      &:disabled:hover {
        transform: none;
        box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.18);
      }

      .btn-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 12px;
        color: #fff;

        .btn-spinner {
          width: 16px;
          height: 16px;
        }

        ion-icon {
          font-size: 24px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .text {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1px;
      text-transform: capitalize;

        }
      }

      // Themes
      &.in {
        background: #1E73BB;
        color: #10b981;
      }

      &.out {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: #ef4444;
      }

      &.remote {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: #f59e0b;
      }

      &.wfh {
        background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        color: #0ea5e9;
        box-shadow: 0 10px 20px -5px rgba(14, 165, 233, 0.4);
      }

      .inner-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        padding-bottom: 150%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0.1);
        transition: all 0.6s ease;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        animation: breathing 4s ease-in-out infinite;
      }
    }

    @keyframes breathing {
      0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.1; }
      50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
    }
  `]


})
export class ClockButtonComponent implements OnInit, OnDestroy {
  currentUrl: any;
  @Input() record: any;
  @Output() statusChanged = new EventEmitter<any>();

  isClockedIn = false;
  initialLoading = true;
  workMode: string = 'Office';
  todayRequestedMode: 'Office' | 'Remote' | 'WFH' = 'Office';
  remoteActive = false;
  loading = false;
  clockingInMode: 'Office' | 'Remote' | 'WFH' | null = null;
  hasDoneWFHOut = false;
  hasDoneRemoteOut = false;
  policyPermissions: any;
  private destroy$ = new Subject<void>();

  get isMePage(): boolean {
    return (this.router.url || '').toLowerCase().includes('/me');
  }

  get hasRemotePrivilege(): boolean {
    const todayDateStr = new Date().toISOString().split('T')[0];
    return this.todayRequestedMode === 'Remote' ||
      this.hasDoneRemoteOut ||
      localStorage.getItem('hasRemoteToday_' + todayDateStr) === 'true';
  }

  get hasWFHPrivilege(): boolean {
    const todayDateStr = new Date().toISOString().split('T')[0];
    return this.todayRequestedMode === 'WFH' ||
      this.hasDoneWFHOut ||
      localStorage.getItem('hasWFHToday_' + todayDateStr) === 'true';
  }

  constructor(
    private attendanceApi: AttendanceApiService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.loadLastPunch();

    this.attendanceApi.clockState$.pipe(takeUntil(this.destroy$)).subscribe((isClockedIn: boolean) => {
      this.isClockedIn = isClockedIn;
      this.remoteActive = localStorage.getItem('remoteActive') === 'true';
      if (this.isClockedIn && this.remoteActive) {
        this.workMode = 'Remote';
      } else if (!this.isClockedIn) {
        this.workMode = 'Office';
      }
    });

    this.attendanceApi.punchRefresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadLastPunch();
    });

    // Periodically re-check attendance status every 30 seconds (especially when clocked in)
    interval(30000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.isClockedIn) {
        this.loadLastPunch();
      }
    });

    // Re-check whenever the user switches back to the application tab
    if (typeof window !== 'undefined') {
      fromEvent(window, 'focus').pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.loadLastPunch();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClockInButtonClass(): string {
    if (this.todayRequestedMode === 'Remote') return 'in remote';
    if (this.todayRequestedMode === 'WFH') return 'in wfh';
    return 'in';
  }

  getPulseClass(): string {
    if (this.todayRequestedMode === 'Remote') return 'orange';
    if (this.todayRequestedMode === 'WFH') return 'cyan';
    return '';
  }

  getClockInButtonText(): string {
    if (this.todayRequestedMode === 'Remote') return 'Remote In';
    if (this.todayRequestedMode === 'WFH') return 'WFH In';
    return 'Clock In';
  }

  loadLastPunch(): void {
    const wasClockedIn = this.isClockedIn;
    this.attendanceApi.getTodayAttendance(true).subscribe({
      next: (res) => {
        this.policyPermissions = res?.policyPermissions;
        const allPunches = res?.punches || [];
        const lastOverall = allPunches.length ? allPunches[allPunches.length - 1] : null;

        const todayDateStr = new Date().toISOString().split('T')[0];
        const hasDoneWFHPunch = allPunches.some((p: any) =>
          p.punch_type === 'out' && (
            (p.work_mode || '').toLowerCase() === 'wfh' ||
            (p.notes || '').toLowerCase().includes('wfh') ||
            (p.location || '').toLowerCase() === 'home'
          )
        );
        const hasDoneRemotePunch = allPunches.some((p: any) =>
          p.punch_type === 'out' && (
            (p.work_mode || '').toLowerCase() === 'remote' ||
            (p.notes || '').toLowerCase().includes('remote') ||
            (p.location || '').toLowerCase() === 'remote'
          )
        );
        this.hasDoneWFHOut = hasDoneWFHPunch || localStorage.getItem('hasDoneWFHOut_' + todayDateStr) === 'true';
        this.hasDoneRemoteOut = hasDoneRemotePunch || localStorage.getItem('hasDoneRemoteOut_' + todayDateStr) === 'true';

        if (!allPunches.length) {
          this.initialLoading = false;
          this.isClockedIn = false;
          if (wasClockedIn) {
            this.statusChanged.emit({ isClockedIn: false });
          }
          this.workMode = 'Office';
          this.remoteActive = false;
          localStorage.removeItem('remoteActive');
          this.checkTodayWorkMode();
          return;
        }

        const lastPunch = lastOverall!;
        this.isClockedIn = lastPunch.punch_type === 'in';
        this.initialLoading = false;

        // Detect if state transitioned from Clocked-In to Clocked-Out
        if (wasClockedIn && !this.isClockedIn) {
          const isAutoOut = (lastPunch?.notes || '').includes('OUT Missing') || (lastPunch?.notes || '').includes('Auto Clock-Out');
          this.statusChanged.emit({ isClockedIn: false, autoClockedOut: isAutoOut, lastPunch });
        }

        // When clocked in via Remote, main button shows "Remote Out".
        // When not clocked in (or after Remote Out), main button shows "Clock In".
        if (this.isClockedIn) {
          const lastMode = lastPunch?.work_mode;
          const lastNotes = (lastPunch?.notes || '').toLowerCase();
          if (lastMode === 'Remote' || lastNotes.includes('remote')) {
            this.workMode = 'Remote';
            this.remoteActive = true;
          } else if (lastMode === 'WFH' || lastNotes.includes('wfh')) {
            this.workMode = 'WFH';
            this.remoteActive = false;
          } else {
            this.workMode = 'Office';
            this.remoteActive = false;
          }
        } else {
          this.workMode = 'Office';
          this.remoteActive = false;
          localStorage.removeItem('remoteActive');
        }

        const hadRemotePunch = allPunches.some((p: any) =>
          (p.work_mode || '').toLowerCase() === 'remote' ||
          (p.notes || '').toLowerCase().includes('remote') ||
          (p.location || '').toLowerCase() === 'remote'
        ) || (res?.attendance?.work_mode || '').toLowerCase() === 'remote';

        if (hadRemotePunch) {
          localStorage.setItem('hasRemoteToday_' + todayDateStr, 'true');
        }

        const hadWFHPunch = allPunches.some((p: any) =>
          (p.work_mode || '').toLowerCase() === 'wfh' ||
          (p.notes || '').toLowerCase().includes('wfh') ||
          (p.location || '').toLowerCase() === 'home'
        ) || (res?.attendance?.work_mode || '').toLowerCase() === 'wfh';

        if (hadWFHPunch) {
          localStorage.setItem('hasWFHToday_' + todayDateStr, 'true');
        }

        localStorage.setItem('todayPunches', JSON.stringify(allPunches));
        this.checkTodayWorkMode();
      },
      error: () => {
        this.initialLoading = false;
        this.isClockedIn = false;
        this.workMode = 'Office';
        this.remoteActive = false;
        this.checkTodayWorkMode();
      }
    });
  }

  private checkTodayWorkMode(): void {
    this.attendanceApi.checkTodayWFH().subscribe({
      next: (wfhRes: any) => {
        if (wfhRes?.has_remote || wfhRes?.has_pending_remote || wfhRes?.work_mode === 'Remote') {
          this.todayRequestedMode = 'Remote';
        } else if (wfhRes?.has_wfh || wfhRes?.has_pending_wfh || wfhRes?.work_mode === 'WFH') {
          this.todayRequestedMode = 'WFH';
        } else {
          this.todayRequestedMode = 'Office';
        }
      },
      error: () => {
        this.todayRequestedMode = 'Office';
      }
    });
  }

  async clockIn(mode?: 'Office' | 'Remote' | 'WFH'): Promise<void> {
    if (this.isClockedIn || this.loading) return;
    const targetMode = mode || (this.isMePage ? 'Office' : (this.todayRequestedMode || 'Office'));
    this.loading = true;
    this.clockingInMode = targetMode;
    let location = 'Mumbai Office';
    let notes = 'Office Clock-In';
    if (targetMode === 'Remote') { location = 'Remote'; notes = 'Remote Clock-In'; this.workMode = 'Remote'; this.remoteActive = true; }
    else if (targetMode === 'WFH') { location = 'Home'; notes = 'WFH Clock-In'; this.workMode = 'WFH'; }
    else { this.workMode = 'Office'; }

    if (targetMode === 'WFH') {
      this.attendanceApi.checkTodayWFH().subscribe({
        next: (wfhRes: any) => {
          const canWFH = !!(wfhRes?.has_wfh || wfhRes?.has_pending_wfh || wfhRes?.has_approved_wfh || wfhRes?.work_mode === 'WFH' || wfhRes?.pending_work_mode === 'WFH' || this.hasWFHPrivilege);
          if (!canWFH) {
            this.showToast('No WFH request found for today. Please submit a WFH request first.', 'warning');
            this.loading = false;
            this.clockingInMode = null;
            return;
          }
          this.proceedClockIn(targetMode, location, notes);
        },
        error: () => {
          this.showToast('WFH check failed.', 'danger');
          this.loading = false;
          this.clockingInMode = null;
        }
      });
      return;
    }

    this.proceedClockIn(targetMode, location, notes);
  }

  private async proceedClockIn(mode: 'Office' | 'Remote' | 'WFH', location: string, notes: string): Promise<void> {
    const requiresOfficeComment = mode === 'Office' && this.policyPermissions?.web_clockin_comment_required;

    if (requiresOfficeComment) {
      const alert = await this.alertCtrl.create({
        header: 'Comment Required',
        message: 'Please provide a comment for your web clock-in as per policy.',
        inputs: [{ name: 'comment', type: 'text', placeholder: 'Enter your comment here...' }],
        buttons: [
          { text: 'Cancel', role: 'cancel', handler: () => { this.loading = false; this.clockingInMode = null; } },
          { text: 'Clock In', handler: (data) => {
              if (!data.comment || data.comment.trim() === '') {
                this.showToast('A comment is mandatory to clock in.', 'warning');
                return false;
              }
              this.executeClockIn(mode, location, data.comment.trim());
              return true;
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.executeClockIn(mode, location, notes);
    }
  }

  private executeClockIn(mode: string, location: string, notes: string) {
    const comment = notes || (mode === 'Remote' ? 'Remote Clock-In' : (mode === 'WFH' ? 'WFH Clock-In' : 'Clock-In'));
    this.attendanceApi.apiPunchIn({ work_mode: mode, location, notes, comment } as any).subscribe({
      next: (res: any) => {
        if (res?.success) {
          if (res?.alreadyActive) {
            this.showToast(res?.message || 'You are currently clocked in', 'primary');
          } else if (mode === 'Remote') {
            this.showToast('Remote clock-in recorded (pending approval).', 'success');
          } else if (mode === 'WFH') {
            this.showToast('WFH clock-in recorded (pending approval).', 'success');
          } else {
            this.showToast(res?.message || 'Clocked in successfully', 'success');
          }
          this.isClockedIn = true;
          this.workMode = mode;
          this.statusChanged.emit({ punch_type: 'in', work_mode: mode, isClockedIn: true });
        }
      },
      error: (err: any) => {
        const errorMessage = this.getErrorMessage(err, 'Clock-In failed. Please try again.');
        if (/already being processed/i.test(errorMessage)) {
          this.showToast('Attendance request is synchronizing. Updating status...', 'warning');
          setTimeout(() => {
            this.loadLastPunch();
          }, 1500);
        } else if (/active punch-in|already punched in/i.test(errorMessage)) {
          this.showToast('You are currently clocked in. Updating status...', 'primary');
          this.isClockedIn = true;
          this.loadLastPunch();
        } else {
          this.showToast(errorMessage, 'danger');
          this.isClockedIn = false;
        }
      }
    }).add(() => {
      this.loading = false;
      this.clockingInMode = null;
    });
  }

  async clockOut(): Promise<void> {
    if (!this.isClockedIn || this.loading) return;
    this.loading = true;
    const wasWFH = this.workMode === 'WFH';
    let notes = wasWFH ? 'WFH Clock-Out' : 'Going for lunch';

    const requiresOfficeComment = this.workMode === 'Office' && this.policyPermissions?.web_clockin_comment_required;

    if (requiresOfficeComment) {
      const alert = await this.alertCtrl.create({
        header: 'Comment Required',
        message: 'Please provide a comment for your web clock-out as per policy.',
        inputs: [{ name: 'comment', type: 'text', placeholder: 'Enter your comment here...' }],
        buttons: [
          { text: 'Cancel', role: 'cancel', handler: () => { this.loading = false; } },
          { text: 'Clock Out', handler: (data) => {
              if (!data.comment || data.comment.trim() === '') {
                this.showToast('A comment is mandatory to clock out.', 'warning');
                return false;
              }
              this.executeClockOut(data.comment.trim());
              return true;
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.executeClockOut(notes);
    }
  }

  private executeClockOut(notes: string) {
    const comment = notes || 'Clock-Out';
    const wasWFH = this.workMode === 'WFH' || (notes || '').includes('WFH');
    this.attendanceApi.apiPunchOut({ notes, comment } as any).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const todayDateStr = new Date().toISOString().split('T')[0];
          if (wasWFH) {
            this.hasDoneWFHOut = true;
            localStorage.setItem('hasWFHToday_' + todayDateStr, 'true');
            localStorage.setItem('hasDoneWFHOut_' + todayDateStr, 'true');
          }
          if (res?.alreadyActive) {
            this.showToast(res?.message || 'You are already clocked out', 'primary');
          } else {
            this.showToast(res?.message || 'Clocked out successfully', 'success');
          }
          this.isClockedIn = false;
          const prevMode = this.workMode;
          this.workMode = 'Office';
          this.statusChanged.emit({ punch_type: 'out', work_mode: prevMode, isClockedIn: false, hadWFHWork: wasWFH });
        }
      },
      error: (err) => {
        const errorMessage = this.getErrorMessage(err, 'Clock-Out failed. Please try again.');
        if (/already being processed/i.test(errorMessage)) {
          this.showToast('Attendance request is synchronizing. Updating status...', 'warning');
          setTimeout(() => {
            this.loadLastPunch();
          }, 1500);
        } else if (/already punched out|no punch-in|no attendance record/i.test(errorMessage)) {
          this.showToast('You are not currently clocked in via web.', 'warning');
          this.isClockedIn = false;
        } else {
          this.showToast(errorMessage, 'danger');
        }
      }
    }).add(() => {
      this.loading = false;
    });
  }

  async remoteClockOut(): Promise<void> {
    if (!this.isClockedIn || this.loading) return;
    this.loading = true;
    this.executeRemoteClockOut('Remote Clock-Out');
  }

  private executeRemoteClockOut(notes: string) {
    const comment = notes || 'Remote Clock-Out';
    this.attendanceApi.apiPunchOut({ notes, comment } as any).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const todayDateStr = new Date().toISOString().split('T')[0];
          this.hasDoneRemoteOut = true;
          localStorage.setItem('hasRemoteToday_' + todayDateStr, 'true');
          localStorage.setItem('hasDoneRemoteOut_' + todayDateStr, 'true');
          if (res?.alreadyActive) {
            this.showToast(res?.message || 'You are already clocked out', 'primary');
          } else {
            this.showToast(res?.message || 'Remote clocked out successfully', 'success');
          }
          this.isClockedIn = false;
          this.remoteActive = false;
          this.workMode = 'Office';
          localStorage.removeItem('remoteActive');
          this.statusChanged.emit({ punch_type: 'out', work_mode: 'Remote', isClockedIn: false, hadRemoteWork: true });
        }
      },
      error: (err) => {
        const errorMessage = this.getErrorMessage(err, 'Remote Clock-Out failed.');
        if (/already being processed/i.test(errorMessage)) {
          this.showToast('Attendance request is synchronizing. Updating status...', 'warning');
          setTimeout(() => {
            this.loadLastPunch();
          }, 1500);
        } else if (/already punched out|no punch-in|no attendance record/i.test(errorMessage)) {
          this.showToast('You are not currently clocked in via web.', 'warning');
          this.isClockedIn = false;
        } else {
          this.showToast(errorMessage, 'danger');
        }
      }
    }).add(() => {
      this.loading = false;
    });
  }

  private getErrorMessage(err: any, fallback: string): string {
    return err?.error?.message || err?.error?.error || err?.message || fallback;
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' | 'primary' = 'success') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'top', color });
    await toast.present();
  }
}
