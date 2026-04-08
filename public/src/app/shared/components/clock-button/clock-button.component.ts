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
  <div class="clock-btn-container">
    <div class="row-center" *ngIf="!isClockedIn && currentUrl !== '/Me'">
      <button class="uiverse-button" style="--btn-color: #4caf50; --glow-color: rgba(76, 175, 80, 0.7)" (click)="clockIn('Office')">
        <span class="text">Web Clock-In</span>
        <div class="liquid"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      </button>
    </div>

    <!-- Clock In Button for /Me page -->
    <div *ngIf="!isClockedIn && currentUrl == '/Me'">
      <button class="uiverse-button" style="--btn-color: #4caf50; --glow-color: rgba(76, 175, 80, 0.7)" (click)="clockIn('Office')">
        <span class="text">Web Clock-In</span>
        <div class="liquid"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      </button>
    </div>

    <!-- Clock Out Button - Office -->
    <div class="row-center" *ngIf="isClockedIn && workMode === 'Office' && currentUrl !== '/Me'">
      <button class="uiverse-button out" style="--btn-color: #f44336; --glow-color: rgba(244, 67, 54, 0.7)" (click)="clockOut()">
        <span class="text">Web Clock-Out</span>
        <div class="liquid"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      </button>
    </div>

    <!-- Clock Out Button - Remote -->
    <div class="row-center" *ngIf="isClockedIn && workMode === 'Remote' && currentUrl !== '/Me'">
      <button class="uiverse-button out" style="--btn-color: #ff9800; --glow-color: rgba(255, 152, 0, 0.7)" (click)="remoteClockOut()">
        <span class="text">Remote Clock-Out</span>
        <div class="liquid"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      </button>
    </div>

    <!-- Clock Out Button - WFH -->
    <div class="row-center" *ngIf="isClockedIn && workMode === 'WFH' && currentUrl !== '/Me'">
      <button class="uiverse-button out" style="--btn-color: #00bcd4; --glow-color: rgba(0, 188, 212, 0.7)" (click)="clockOut()">
        <span class="text">WFH Clock-Out</span>
        <div class="liquid"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      </button>
    </div>

    <!-- /Me page buttons -->
    <button *ngIf="isClockedIn && currentUrl == '/Me' && workMode === 'Office'" class="uiverse-button out" style="--btn-color: #f44336; --glow-color: rgba(244, 67, 54, 0.7)" (click)="clockOut()">
      <span class="text">Web Clock-Out</span>
      <div class="liquid"></div>
      <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
    </button>
    <button *ngIf="isClockedIn && currentUrl == '/Me' && workMode === 'Remote'" class="uiverse-button out" style="--btn-color: #ff9800; --glow-color: rgba(255, 152, 0, 0.7)" (click)="remoteClockOut()">
      <span class="text">Remote Clock-Out</span>
      <div class="liquid"></div>
      <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
    </button>
    <button *ngIf="isClockedIn && currentUrl == '/Me' && workMode === 'WFH'" class="uiverse-button out" style="--btn-color: #00bcd4; --glow-color: rgba(0, 188, 212, 0.7)" (click)="clockOut()">
      <span class="text">WFH Clock-Out</span>
      <div class="liquid"></div>
      <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
    </button>
  </div>
  `,
  styles: [`
    .uiverse-button {
      position: relative;
      padding: 16px 40px;
      display: inline-block;
      text-decoration: none;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      text-transform: uppercase;
      overflow: hidden;
      border-radius: 40px;
      border: 2px solid var(--btn-color);
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: all 0.3s ease, transform 0.1s ease;
      min-width: 260px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .text {
      position: relative;
      z-index: 10;
      transition: all 0.3s ease;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      pointer-events: none;
    }

    .liquid {
      position: absolute;
      top: -80px;
      left: 0;
      width: 100%;
      height: 200px;
      background: var(--btn-color);
      box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
      transition: 0.5s ease;
      z-index: 1;
    }

    .liquid::before,
    .liquid::after {
      content: "";
      position: absolute;
      width: 200%;
      height: 200%;
      top: 0;
      left: 50%;
      transform: translate(-50%, -75%);
    }

    .liquid::before {
      border-radius: 45%;
      background: rgba(3, 8, 34, 0.9);
      animation: rotate 5s linear infinite;
    }

    .liquid::after {
      border-radius: 40%;
      background: rgba(3, 8, 34, 0.4);
      animation: rotate 10s linear infinite;
    }

    .uiverse-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 20px var(--glow-color);
      animation: glow 1.5s ease-in-out infinite;
    }

    .uiverse-button:hover .text {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .uiverse-button:hover .liquid {
      top: -120px;
    }

    .uiverse-button:active {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(0.98);
    }

    .bubble {
      position: absolute;
      bottom: -20px;
      border-radius: 50%;
      opacity: 0;
      z-index: 5;
      animation: rise var(--rise-duration) ease-in infinite var(--rise-delay);
      background: rgba(255, 255, 255, 0.3);
    }

    .bubble::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at 75% 25%,
        rgba(255, 255, 255, 0.6) 5%,
        rgba(255, 255, 255, 0.2) 40%,
        rgba(255, 255, 255, 0) 60%
      );
      border-radius: 50%;
    }

    .bubble:nth-child(1) { left: 10%; width: 20px; height: 20px; --rise-duration: 4s; --rise-delay: 0s; }
    .bubble:nth-child(2) { left: 25%; width: 15px; height: 15px; --rise-duration: 3.5s; --rise-delay: 0.5s; }
    .bubble:nth-child(3) { left: 40%; width: 10px; height: 10px; --rise-duration: 3s; --rise-delay: 1s; }
    .bubble:nth-child(4) { left: 55%; width: 22px; height: 22px; --rise-duration: 4.5s; --rise-delay: 1.5s; }
    .bubble:nth-child(5) { left: 70%; width: 18px; height: 18px; --rise-duration: 3.8s; --rise-delay: 2s; }
    .bubble:nth-child(6) { left: 85%; width: 12px; height: 12px; --rise-duration: 3.2s; --rise-delay: 2.5s; }

    @keyframes rotate {
      0% { transform: translate(-50%, -75%) rotate(0deg); }
      100% { transform: translate(-50%, -75%) rotate(360deg); }
    }

    @keyframes rise {
      0% { bottom: -20px; opacity: 0; }
      5% { opacity: 0.8; }
      95% { opacity: 0.8; }
      100% { bottom: 120%; opacity: 0; }
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px var(--glow-color); }
      50% { box-shadow: 0 0 20px var(--glow-color); }
    }

    .row-center {
      display: flex;
      justify-content: center;
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
    this.attendanceApi.getTodayAttendance(true).subscribe({
      next: (res) => {
        const punches = res?.punches || [];
        if (!punches.length) {
          this.isClockedIn = false;
          this.workMode = 'Office';
          this.remoteActive = false;
          localStorage.removeItem('remoteActive');
          return;
        }
        const lastPunch = punches[punches.length - 1];
        this.isClockedIn = lastPunch.punch_type === 'in';
        this.workMode = lastPunch.work_mode || 'Office';
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
    if (this.isClockedIn) return;
    this.loading = true;
    let location = 'Mumbai Office';
    let notes = 'Morning shift';
    if (mode === 'Remote') { location = 'Remote'; notes = 'Remote Clock-In'; this.workMode = 'Remote'; this.remoteActive = true; }
    else if (mode === 'WFH') { location = 'Home'; notes = 'WFH Clock-In'; this.workMode = 'WFH'; }
    else { this.workMode = 'Office'; }

    this.isClockedIn = true;
    this.statusChanged.emit({ punch_type: 'in', work_mode: mode });

    this.attendanceApi.apiPunchIn({ work_mode: mode, location, notes }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.success) {
          this.showToast(res?.message || 'Clocked in successfully', 'success');
          this.statusChanged.emit({ punch_type: 'in', work_mode: mode });
        }
      },
      error: (err: any) => {
        this.loading = false;
        if (err?.error?.message?.includes('active punch-in')) {
          this.showToast('You already have an active punch-in. Please clock out first.', 'warning');
          this.isClockedIn = true;
        } else {
          this.showToast(err?.error?.message || 'Clock-In failed. Please try again.', 'danger');
          this.isClockedIn = false;
        }
      }
    });
  }

  clockOut(): void {
    this.loading = true;
    this.isClockedIn = false;
    this.statusChanged.emit({ punch_type: 'out', work_mode: this.workMode });
    const wasWFH = this.workMode === 'WFH';

    this.attendanceApi.apiPunchOut({ notes: wasWFH ? 'WFH Clock-Out' : 'Going for lunch' }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.success) {
          this.showToast(res?.message || 'Clocked out successfully', 'danger');
          this.statusChanged.emit({ punch_type: 'out', work_mode: this.workMode });
          if (wasWFH) this.workMode = 'Office';
        }
      },
      error: (err) => {
        this.loading = false;
        this.showToast((err as any)?.error?.message || 'Clock-Out failed. Please try again.', 'danger');
      }
    });
  }

  remoteClockOut(): void {
    this.loading = true;
    this.isClockedIn = false;
    this.remoteActive = false;
    this.workMode = 'Office';
    localStorage.removeItem('remoteActive');
    this.statusChanged.emit({ punch_type: 'out', work_mode: 'Remote' });
    this.attendanceApi.apiPunchOut({ notes: 'Remote Clock-Out' }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.success) {
          this.showToast(res?.message || 'Remote clocked out successfully', 'danger');
          this.statusChanged.emit({ punch_type: 'out', work_mode: 'Remote' });
        }
      },
      error: (err) => {
        this.loading = false;
        this.showToast((err as any)?.error?.message || 'Remote Clock-Out failed.', 'danger');
      }
    });
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'top', color });
    await toast.present();
  }
}
