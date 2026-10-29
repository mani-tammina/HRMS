import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeLeavesService } from '../../../../../core/services/employee-leaves.service';
import { environment } from '../../../../../../environments/environment';

export interface LeaveCardItem {
  title: string;
  code: string;
  allocated_days: number | string;
  used: number;
  available: number | string;
  isLOP: boolean;
  isCasual: boolean;
  accrued_so_far: number;
  pending_days: number;
  carry_forward_days: number;
  usedPercent: number;
  bg_color?: string;
  icon_path?: string;
  iconLoadError?: boolean;
}

@Component({
  selector: 'app-leave-balance-modal',
  templateUrl: './leave-balance-modal.component.html',
  styleUrls: ['./leave-balance-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class LeaveBalanceModalComponent implements OnInit, OnDestroy {
  @Input() currentEmployee: any;

  private destroy$ = new Subject<void>();

  env: string = '';
  currentYear: number = new Date().getFullYear();
  planStartMonth: number = 4;
  availableYears: number[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  leaveCards: LeaveCardItem[] = [];

  get employeeName(): string {
    if (!this.currentEmployee) return 'Employee';
    return this.currentEmployee.FullName || `${this.currentEmployee.FirstName || ''} ${this.currentEmployee.LastName || ''}`.trim() || 'Employee';
  }

  get profileImageUrl(): string {
    if (this.currentEmployee?.profile_image) {
      return this.env + this.currentEmployee.profile_image;
    }
    return '';
  }

  constructor(
    private modalController: ModalController,
    private employeeLeavesService: EmployeeLeavesService
  ) {}

  ngOnInit() {
    this.env = environment.apiURL.startsWith('http') ? environment.apiURL : `${environment.apiURL}`;
    this.initYears();
    this.loadLeaveBalance();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initYears() {
    const todayYear = new Date().getFullYear();
    this.availableYears = [todayYear, todayYear - 1, todayYear - 2];
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onYearChange(year: number) {
    if (this.currentYear === year) return;
    this.currentYear = year;
    this.loadLeaveBalance();
  }

  getIconUrl(iconPath?: string): string {
    if (!iconPath) return '';
    if (iconPath.startsWith('http')) return iconPath;
    const base = this.env.endsWith('/') ? this.env.slice(0, -1) : this.env;
    const path = iconPath.startsWith('/') ? iconPath : `/${iconPath}`;
    return `${base}${path}`;
  }

  loadLeaveBalance() {
    if (!this.currentEmployee?.id) {
      this.isLoading = false;
      this.errorMessage = 'Employee information is missing.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.employeeLeavesService.getLeaveBalance(this.currentYear, Number(this.currentEmployee.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          const balances: any[] = Array.isArray(res) ? res : (res?.balances || []);
          if (res?.leave_year_start_month) {
            this.planStartMonth = res.leave_year_start_month;
          } else if (balances.length > 0 && balances[0].plan_start_month) {
            this.planStartMonth = balances[0].plan_start_month;
          }

          this.leaveCards = balances.map((item: any) => {
            const code = (item.type_code || '').toUpperCase();
            const isLOP = code === 'LOP' || (item.type_name || '').toLowerCase().includes('unpaid') || (item.type_name || '').toLowerCase().includes('loss of pay');
            const isCasual = code === 'CL' || (item.type_name || '').toLowerCase().includes('casual');
            const allocated = Number(item.allocated_days) || 0;
            const used = Number(item.used_days) || 0;
            const available = (Number(item.available_days) || 0) - (Number(item.pending_days) || 0);

            let accruedSoFar = (item.accrued_so_far !== undefined && item.accrued_so_far !== null)
              ? Number(item.accrued_so_far)
              : this.calculateAccruedSoFar(allocated, this.planStartMonth);

            return {
              title: item.type_name || 'Leave',
              code: code,
              allocated_days: isLOP ? 'Unlimited' : allocated,
              used: used,
              available: isLOP ? '0' : (available > 0 ? available : 0),
              isLOP: isLOP,
              isCasual: isCasual,
              accrued_so_far: accruedSoFar,
              pending_days: Number(item.pending_days) || 0,
              carry_forward_days: Number(item.carry_forward_days) || 0,
              usedPercent: isLOP ? 0 : (allocated > 0 ? Math.min(100, Math.round((used / allocated) * 100)) : 0),
              bg_color: item.bg_color,
              icon_path: item.icon_path,
              iconLoadError: false
            };
          });
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Failed to load leave balances for employee:', err);
          this.errorMessage = 'Failed to load leave balance data. Please try again.';
        }
      });
  }

  calculateAccruedSoFar(allocatedDays: number, planStartMonth: number = 4): number {
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

  getLeaveTypeClass(title: string): string {
    const lower = (title || '').toLowerCase();
    if (lower.includes('sick')) return 'sick';
    if (lower.includes('casual')) return 'casual';
    if (lower.includes('bereavement')) return 'bereavement';
    if (lower.includes('marriage')) return 'marriage';
    if (lower.includes('comp') || lower.includes('compensatory')) return 'comp-offs';
    if (lower.includes('unpaid') || lower.includes('loss of pay') || lower.includes('lop')) return 'unpaid';
    return 'default-leave';
  }

  getLeaveIcon(title: string): string {
    const lower = (title || '').toLowerCase();
    if (lower.includes('sick')) return 'bed-outline';
    if (lower.includes('vacation') || lower.includes('earned')) return 'airplane-outline';
    if (lower.includes('casual')) return 'umbrella-outline';
    if (lower.includes('bereavement')) return 'rose-outline';
    if (lower.includes('marriage')) return 'heart-outline';
    if (lower.includes('comp') || lower.includes('compensatory')) return 'timer-outline';
    return 'calendar-outline';
  }
}
