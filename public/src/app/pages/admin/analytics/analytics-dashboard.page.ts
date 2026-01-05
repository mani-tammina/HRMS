import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonGrid, IonRow, IonCol, IonIcon, IonSegment, IonSegmentButton, IonLabel,
  IonSelect, IonSelectOption, IonRefresher, IonRefresherContent, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  statsChartOutline, peopleOutline, calendarOutline, timeOutline,
  trendingUpOutline, trendingDownOutline, briefcaseOutline
} from 'ionicons/icons';
import { DashboardService, AdminDashboard, AttendanceAnalytics, LeaveAnalytics, TimesheetAnalytics } from '@core/services/dashboard.service';
import { AuthService, User } from '@core/services/auth.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { StatCardComponent } from '@shared/components/stat-card/stat-card.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.page.html',
  styleUrls: ['./analytics-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonGrid, IonRow, IonCol, IonIcon, IonSegment, IonSegmentButton, IonLabel,
    IonSelect, IonSelectOption, IonRefresher, IonRefresherContent, IonBadge,
    StatCardComponent, LoadingComponent
  ]
})
export class AnalyticsDashboardPage implements OnInit {
  user: User | null = null;
  selectedView: 'overview' | 'attendance' | 'leaves' | 'timesheets' = 'overview';
  selectedPeriod: 'week' | 'month' | 'quarter' = 'month';
  
  adminDashboard: AdminDashboard | null = null;
  attendanceAnalytics: AttendanceAnalytics | null = null;
  leaveAnalytics: LeaveAnalytics | null = null;
  timesheetAnalytics: TimesheetAnalytics | null = null;
  
  isLoading = false;
  dateRange = { start_date: '', end_date: '' };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {
    addIcons({
      statsChartOutline, peopleOutline, calendarOutline, timeOutline,
      trendingUpOutline, trendingDownOutline, briefcaseOutline
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
    
    this.setDateRange();
    this.loadData();
  }

  setDateRange() {
    const today = new Date();
    let startDate = new Date();

    switch (this.selectedPeriod) {
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(today.getMonth() - 3);
        break;
    }

    this.dateRange = {
      start_date: startDate.toISOString().split('T')[0],
      end_date: today.toISOString().split('T')[0]
    };
  }

  loadData() {
    if (this.selectedView === 'overview') {
      this.loadOverview();
    } else if (this.selectedView === 'attendance') {
      this.loadAttendanceAnalytics();
    } else if (this.selectedView === 'leaves') {
      this.loadLeaveAnalytics();
    } else if (this.selectedView === 'timesheets') {
      this.loadTimesheetAnalytics();
    }
  }

  loadOverview() {
    this.isLoading = true;
    this.dashboardService.getAdminDashboard().subscribe({
      next: (response) => {
        this.adminDashboard = response.dashboard;
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load dashboard');
        this.isLoading = false;
      }
    });
  }

  loadAttendanceAnalytics() {
    this.isLoading = true;
    this.dashboardService.getAttendanceAnalytics(this.dateRange.start_date, this.dateRange.end_date).subscribe({
      next: (response) => {
        this.attendanceAnalytics = response.analytics;
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load attendance analytics');
        this.isLoading = false;
      }
    });
  }

  loadLeaveAnalytics() {
    this.isLoading = true;
    this.dashboardService.getLeaveAnalytics(this.dateRange.start_date, this.dateRange.end_date).subscribe({
      next: (response) => {
        this.leaveAnalytics = response.analytics;
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load leave analytics');
        this.isLoading = false;
      }
    });
  }

  loadTimesheetAnalytics() {
    this.isLoading = true;
    this.dashboardService.getTimesheetAnalytics(this.dateRange.start_date, this.dateRange.end_date).subscribe({
      next: (response) => {
        this.timesheetAnalytics = response.analytics;
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load timesheet analytics');
        this.isLoading = false;
      }
    });
  }

  onViewChange(event: any) {
    this.selectedView = event.detail.value;
    this.loadData();
  }

  onPeriodChange(event: any) {
    this.selectedPeriod = event.detail.value;
    this.setDateRange();
    this.loadData();
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  getTrendDirection(value: number): 'up' | 'down' | 'neutral' {
    if (value > 0) return 'up';
    if (value < 0) return 'down';
    return 'neutral';
  }
}
