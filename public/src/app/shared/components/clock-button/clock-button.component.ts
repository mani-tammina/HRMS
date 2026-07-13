import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AttendanceApiService } from '../../../core/services/attendance-api.service';

@Component({
  selector: 'app-clock-button',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
  <div class="attendance-btn-container" [class.mini-layout]="currentUrl === '/Me'">
    <!-- Clock In Button -->
    <div *ngIf="!isClockedIn" class="row-center">
      <!-- WFH Clock In -->
      <button *ngIf="workMode === 'WFH'" class="modern-clock-btn wfh" (click)="clockIn('WFH')" [disabled]="loading">
        <div class="inner-pulse cyan"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading" name="crescent" class="btn-spinner"></ion-spinner>
          <span class="text">{{ loading ? 'Please wait' : 'WFH In' }}</span>
        </div>
      </button>

      <!-- Standard Clock In -->
      <button *ngIf="workMode !== 'WFH'" class="modern-clock-btn in" (click)="clockIn('Office')" [disabled]="loading">
        <div class="inner-pulse"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading" name="crescent" class="btn-spinner"></ion-spinner>
          <span class="text">Clock In</span>
        </div>
      </button>
    </div>

    <!-- Clock Out Button Group -->
    <div *ngIf="isClockedIn" class="row-center">
      <!-- Office Out -->
      <button *ngIf="workMode === 'Office'" class="modern-clock-btn out" (click)="clockOut()" [disabled]="loading">
        <div class="inner-pulse red"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading" name="crescent" class="btn-spinner"></ion-spinner>
          <span class="text">Clock Out</span>
        </div>
      </button>

      <!-- Remote Out -->
      <button *ngIf="workMode === 'Remote'" class="modern-clock-btn remote" (click)="remoteClockOut()" [disabled]="loading">
        <div class="inner-pulse orange"></div>
        <div class="btn-content">
          <ion-spinner *ngIf="loading" name="crescent" class="btn-spinner"></ion-spinner>
          <ion-icon name="cloud-offline-outline"></ion-icon>
          <span class="text">Remote Out</span>
        </div>
      </button>

      <!-- WFH Out -->
      <button *ngIf="workMode === 'WFH'" class="modern-clock-btn wfh" (click)="clockOut()" [disabled]="loading">
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
        .modern-clock-btn {
          height: 44px;
          padding: 0 16px;
          .btn-content {
            gap: 8px;
            ion-icon { font-size: 18px; }
            .text { font-size: 13px; font-weight: 700; }
          }
        }
      }
    }

    .modern-clock-btn {
      position: relative;
      // min-width: 188px;
      height: 38px;
      border: none;
      border-radius: 64px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 32px;
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

    .row-center {
      display: flex;
      justify-content: left;
      align-items: center;
    }
  `]


})
export class ClockButtonComponent implements OnInit, OnDestroy {
  currentUrl: any;
  @Input() record: any;
  @Output() statusChanged = new EventEmitter<any>();

  isClockedIn = false;
  workMode: string = 'Office';
  remoteActive = false;
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.loadLastPunch()
    this.attendanceApi.clockState$.pipe(takeUntil(this.destroy$)).subscribe((isClockedIn: boolean) => {
      this.isClockedIn = isClockedIn;
      this.remoteActive = localStorage.getItem('remoteActive') === 'true';
      if (this.remoteActive) this.workMode = 'Remote';
    });

    this.loadLastPunch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadLastPunch(): void {
    console.log("loadLastPunch")
    this.attendanceApi.getTodayAttendance(true).subscribe({
      next: (res) => {
        const punches = res?.punches || [];
        if (!punches.length) {
          this.isClockedIn = false;
          this.attendanceApi.checkTodayWFH().subscribe({
            next: (wfhRes) => {
              if (wfhRes?.has_wfh && wfhRes?.work_mode === 'WFH') {
                this.workMode = 'WFH';
              } else if (wfhRes?.has_wfh && wfhRes?.work_mode === 'Remote') {
                this.workMode = 'Remote';
                this.remoteActive = true;
                localStorage.setItem('remoteActive', 'true');
              } else {
                this.workMode = 'Office';
                this.remoteActive = false;
                localStorage.removeItem('remoteActive');
              }
            },
            error: () => {
              this.workMode = 'Office';
              this.remoteActive = false;
              localStorage.removeItem('remoteActive');
            }
          });
          return;
        }
        const lastPunch = punches[punches.length - 1];
        this.isClockedIn = lastPunch.punch_type === 'in';

        if (res?.attendance?.work_mode === 'WFH' || punches.some((p: any) => p.work_mode === 'WFH')) {
          this.workMode = 'WFH';
        } else {
          this.workMode = lastPunch.work_mode || 'Office';
        }

        localStorage.setItem('todayPunches', JSON.stringify(punches));
        if (this.isClockedIn && this.workMode === 'Remote') {
          this.remoteActive = true;
          localStorage.setItem('remoteActive', 'true');
        } else {
          this.remoteActive = false;
          localStorage.removeItem('remoteActive');
        }
      },
      error: () => {
        this.isClockedIn = false;
        this.workMode = 'Office';
        this.remoteActive = false;
      }
    });
  }

  clockIn(mode: 'Office' | 'Remote' | 'WFH'): void {
    if (this.isClockedIn || this.loading) return;
    this.loading = true;
    let location = 'Mumbai Office';
    let notes = 'Office Clock-In';
    if (mode === 'Remote') { location = 'Remote'; notes = 'Remote Clock-In'; this.workMode = 'Remote'; this.remoteActive = true; }
    else if (mode === 'WFH') { location = 'Home'; notes = 'WFH Clock-In'; this.workMode = 'WFH'; }
    else { this.workMode = 'Office'; }

    this.attendanceApi.apiPunchIn({ work_mode: mode, location, notes }).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.showToast(res?.message || 'Clocked in successfully', 'success');
          this.isClockedIn = true;
          this.statusChanged.emit({ punch_type: 'in', work_mode: mode });
        }
      },
      error: (err: any) => {
        if (err?.error?.message?.includes('active punch-in')) {
          this.showToast('You already have an active punch-in. Please clock out first.', 'warning');
          this.isClockedIn = true;
        } else {
          this.showToast(err?.error?.message || 'Clock-In failed. Please try again.', 'danger');
          this.isClockedIn = false;
        }
      }
    }).add(() => {
      this.loading = false;
    });
  }

  clockOut(): void {
    if (!this.isClockedIn || this.loading) return;
    this.loading = true;
    const wasWFH = this.workMode === 'WFH';

    this.attendanceApi.apiPunchOut({ notes: wasWFH ? 'WFH Clock-Out' : 'Going for lunch' }).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.showToast(res?.message || 'Clocked out successfully', 'success');
          this.isClockedIn = false;
          this.statusChanged.emit({ punch_type: 'out', work_mode: this.workMode });
        }
      },
      error: (err) => {
        this.showToast((err as any)?.error?.message || 'Clock-Out failed. Please try again.', 'danger');
      }
    }).add(() => {
      this.loading = false;
    });
  }

  remoteClockOut(): void {
    if (!this.isClockedIn || this.loading) return;
    this.loading = true;
    this.attendanceApi.apiPunchOut({ notes: 'Remote Clock-Out' }).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.showToast(res?.message || 'Remote clocked out successfully', 'success');
          this.isClockedIn = false;
          this.remoteActive = false;
          this.workMode = 'Office';
          localStorage.removeItem('remoteActive');
          this.statusChanged.emit({ punch_type: 'out', work_mode: 'Remote' });
        }
      },
      error: (err) => {
        this.showToast((err as any)?.error?.message || 'Remote Clock-Out failed.', 'danger');
      }
    }).add(() => {
      this.loading = false;
    });
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'top', color });
    await toast.present();
  }
}
