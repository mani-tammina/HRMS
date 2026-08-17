import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { InboxNotification } from '../../models/notification.model';
import { InboxService } from '../../services/inbox.service';
import { LeaverequestService } from 'src/app/core/services/leaverequest.service';
import { TimesheetService } from 'src/app/core/services/timesheet.service';
import { SeparationService } from 'src/app/core/services/separation.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { RouteGuardService } from 'src/app/core/services/route-guard.service';
import { TimesheetPreviewComponent } from 'src/app/modules/attendance/work-track/timesheet-preview.component';
import { UpdateMeAnalyticsService } from 'src/app/core/analytics/update-me.analytics';
import { environment } from 'src/environments/environment';

import { NotificationCardComponent } from '../../components/notification-card/notification-card.component';
import { NotificationFilterComponent } from '../../components/notification-filter/notification-filter.component';
import { NotificationEmptyComponent } from '../../components/notification-empty/notification-empty.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NotificationEmptyComponent
  ]
})
export class InboxPage implements OnInit {
  notifications: InboxNotification[] = [];
  page = 1;
  limit = 10;
  total = 0;
  unreadCount = 0;
  
  searchQuery = '';
  selectedTab = 'All';
  sortField = 'created_at';
  sortOrder: 'ASC' | 'DESC' = 'DESC';
  showViewAll = false;
  viewAll = false;
  loading = false;
  showReportsDropdown = false;

  filterRequestType = '';
  filterStatus = '';
  filterPriority = '';

  selectedMonth: string = '';
  monthOptions: { label: string; value: string }[] = [];
  isEmployee = false;
  rejectedCount = 0;

  isModalOpen = false;
  selectedNotification: InboxNotification | null = null;

  stats: any = {
    totalRequests: 0,
    unread: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    leaveCount: 0,
    attendanceCount: 0,
    timesheetCount: 0,
    resignationCount: 0,
    wfhCount: 0,
    remoteCount: 0
  };

  tabs = ['All', 'Unread', 'Leave', 'WFH', 'Remote', 'Attendance', 'Timesheet', 'Resignation', 'Approved', 'Rejected', 'Archived'];
  rejectReasonText = '';

  getDateParts(dateStr: string): { month: string; day: string; weekday: string } {
    if (!dateStr) return { month: 'AUG', day: '10', weekday: 'MON' };
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { month: 'AUG', day: '10', weekday: 'MON' };
    const months = ['AUG', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[d.getMonth() + 1] || 'AUG';
    const day = d.getDate().toString().padStart(2, '0');
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekday = weekdays[d.getDay()] || 'MON';
    return { month, day, weekday };
  }

  getRelativeLeaveStatus(notification: InboxNotification | null): string {
    if (!notification) return 'Leave starting soon';
    if (notification.request_type === 'Timesheet Request') {
      const meta = this.getParsedMetadata(notification.metadata);
      const hours = meta.total_hours || 8;
      if (notification.status === 'Rejected') {
        return `${hours} Hours Logged - Timesheet Rejected`;
      }
      return `${hours} Hours Logged - Timesheet submitted for review`;
    }
    const dates = this.getFallbackLeaveDates(notification);
    if (!dates.start) return 'Leave starting soon';
    const start = new Date(dates.start);
    const now = new Date();
    const diffDays = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `Leave starting ${diffDays} day${diffDays > 1 ? 's' : ''} from now`;
    if (diffDays === 0) return 'Leave starting today';
    return `Leave started ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
  }

  getLeaveTypeTitle(notification: InboxNotification | null): string {
    if (!notification) return '1 day of Leave';
    if (notification.request_type === 'Timesheet Request') {
      const meta = this.getParsedMetadata(notification.metadata);
      if (meta.week_range) {
        return `Weekly Timesheet: ${meta.week_range}`;
      }
      if (meta.week_start && meta.week_end) {
        return `Weekly Timesheet: ${this.formatDate(meta.week_start)} – ${this.formatDate(meta.week_end)}`;
      }
      return `Timesheet Submission`;
    }
    const meta = this.getParsedMetadata(notification.metadata);
    const days = meta.total_days || this.getCalculatedDays(notification) || 1;
    const title = (notification.title || '').toLowerCase();
    const desc = (notification.description || '').toLowerCase();
    if (title.includes('wfh') || title.includes('work from home') || desc.includes('requested wfh') || desc.includes('wfh')) {
      return `${days} day${days > 1 ? 's' : ''} of WFH`;
    }
    if (title.includes('remote') || desc.includes('requested remote') || desc.includes('remote')) {
      return `${days} day${days > 1 ? 's' : ''} of Remote`;
    }
    const typeName = notification.leave_type_name || (notification.request_type === 'Comp Off Request' || notification.request_type === 'Comp Off' ? 'Comp Offs' : 'Leaves');
    return `${days} day${days > 1 ? 's' : ''} of ${typeName}`;
  }

  constructor(
    private inboxService: InboxService,
    private leaveRequestService: LeaverequestService,
    private timesheetService: TimesheetService,
    private separationService: SeparationService,
    private analyticsService: UpdateMeAnalyticsService,
    private toaster: ToasterService,
    private auth: RouteGuardService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  showFilters = false;

  toggleReportsDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showReportsDropdown = !this.showReportsDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.showReportsDropdown) {
      const target = event.target as HTMLElement;
      if (!target.closest('.reports-dropdown-wrapper')) {
        this.showReportsDropdown = false;
      }
    }
  }

  ngOnInit() {
    const role = this.auth.userRole?.toLowerCase() || '';
    this.isEmployee = role === 'employee';
    this.showViewAll = ['admin', 'hr', 'manager'].includes(role);
    if (this.isEmployee) {
      this.selectedTab = 'Rejected';
      this.loadRejectedCount();
    }
    this.generateMonthOptions();
    this.loadNotifications();
  }

  ionViewWillEnter() {
    if (this.isEmployee) {
      this.loadRejectedCount();
    }
    this.loadNotifications();
  }

  loadRejectedCount() {
    this.inboxService.getNotifications({ page: 1, limit: 1, tab: 'Rejected' }).subscribe({
      next: (res) => {
        if (res.success) {
          this.rejectedCount = res.total || 0;
        }
      },
      error: () => { this.rejectedCount = 0; }
    });
  }

  generateMonthOptions() {
    const options = [];
    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      const val = `${year}-${monthNum}`;
      const lbl = `${monthNames[d.getMonth()]} ${year}`;
      options.push({ label: lbl, value: val });
    }
    this.monthOptions = options;
  }

  onMonthChange() {
    this.selectedNotification = null;
    this.loadNotifications(null, true);
  }

  getSidebarHeaderTitle(): string {
    if (this.isEmployee) {
      return 'MY NOTIFICATIONS';
    }
    if (this.selectedMonth && this.selectedMonth !== '') {
      const match = this.monthOptions.find((m: any) => m.value === this.selectedMonth);
      if (match) {
        return `${match.label.toUpperCase()} REQUESTS`;
      }
      return `${this.selectedMonth} REQUESTS`;
    }
    return 'PENDING TASKS';
  }

  toggleInlineFilters() {
    this.showFilters = !this.showFilters;
  }

  applyDropdownFilters() {
    if (this.filterRequestType) {
      if (this.filterRequestType === 'Leave Request') this.selectedTab = 'Leave';
      else if (this.filterRequestType === 'Comp Off Request' || this.filterRequestType === 'Comp Off') this.selectedTab = 'Comp Off';
      else if (this.filterRequestType === 'Attendance Regularization') this.selectedTab = 'Attendance';
      else if (this.filterRequestType === 'Timesheet Request') this.selectedTab = 'Timesheet';
      else if (this.filterRequestType === 'Resignation Request') this.selectedTab = 'Resignation';
    } else if (this.filterStatus) {
      if (this.filterStatus === 'Approved') this.selectedTab = 'Approved';
      else if (this.filterStatus === 'Rejected') this.selectedTab = 'Rejected';
      else if (this.filterStatus === 'Pending') this.selectedTab = 'All';
    }
    
    // Custom filter for priority can be done client-side or we can just run search/sort
    this.loadNotifications(null, true);
  }

  clearFilters() {
    this.searchQuery = '';
    this.filterRequestType = '';
    this.filterStatus = '';
    this.filterPriority = '';
    this.selectedTab = 'All';
    this.sortField = 'created_at';
    this.sortOrder = 'DESC';
    this.loadNotifications(null, true);
  }

  onFilterSearch(event: any) {
    this.searchQuery = event.target.value || '';
    this.loadNotifications(null, true);
  }

  getInitials(name?: string): string {
    if (!name) return 'EE';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  getProfileImage(n: any): string {
    if (!n || n.imageFailed) return '';
    const img = n.employee_profile_image || n.profile_image || n.profile_picture;
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return img;
    }
    const cleanImg = img.startsWith('/') ? img : `/${img}`;
    return `${environment.apiURL}${cleanImg}`;
  }

  onProfileImageError(n: any) {
    if (n) {
      n.imageFailed = true;
    }
  }

  getStatusBadgeClass(status?: string): string {
    if (!status) return 'status-pending';
    const s = status.toLowerCase();
    if (s === 'approved' || s === 'verified') return 'status-approved';
    if (s === 'rejected') return 'status-rejected';
    if (s === 'cancelled') return 'status-cancelled';
    return 'status-pending';
  }

  getParsedMetadata(metadataStr: any): any {
    if (!metadataStr) return {};
    if (typeof metadataStr === 'object') return metadataStr;
    try {
      return JSON.parse(metadataStr);
    } catch (e) {
      console.warn('Failed to parse metadata JSON:', e);
      return {};
    }
  }

  getCardBorderClass(requestType: string): string {
    switch (requestType) {
      case 'Leave Request':
        return 'border-leave';
      case 'Comp Off Request':
      case 'Comp Off':
        return 'border-compoff';
      case 'Attendance Regularization':
        return 'border-attendance';
      case 'Timesheet Request':
        return 'border-timesheet';
      case 'Resignation Request':
        return 'border-resignation';
      default:
        return '';
    }
  }

  getIconPath(requestType: string): string {
    switch (requestType) {
      case 'Leave Request':
        return 'assets/icons/menu/leave.svg';
      case 'Comp Off Request':
      case 'Comp Off':
        return 'assets/icons/menu/leave.svg';
      case 'Attendance Regularization':
        return 'assets/icons/menu/attendance.svg';
      case 'Timesheet Request':
        return 'assets/icons/menu/worktrack.svg';
      case 'Resignation Request':
        return 'assets/icons/menu/logout.svg';
      default:
        return 'assets/icons/menu/inbox-outline.svg';
    }
  }

  getIconName(requestType: string): string {
    switch (requestType) {
      case 'Leave Request':
        return 'calendar-outline';
      case 'Comp Off Request':
      case 'Comp Off':
        return 'calendar-outline';
      case 'Attendance Regularization':
        return 'time-outline';
      case 'Timesheet Request':
        return 'document-text-outline';
      case 'Resignation Request':
        return 'exit-outline';
      default:
        return 'notifications-outline';
    }
  }

  getIconColor(requestType: string): string {
    switch (requestType) {
      case 'Leave Request':
        return 'leave';
      case 'Comp Off Request':
      case 'Comp Off':
        return 'compoff';
      case 'Attendance Regularization':
        return 'attendance';
      case 'Timesheet Request':
        return 'timesheet';
      case 'Resignation Request':
        return 'resignation';
      default:
        return 'medium';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'primary';
      case 'low':
      default:
        return 'medium';
    }
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'verified':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'cancelled':
        return 'medium';
      case 'pending':
      default:
        return 'warning';
    }
  }

  getTimeAgo(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    
    return date.toLocaleDateString();
  }

  getRejectionReason(n: InboxNotification): string {
    if (!n) return '';
    const meta = this.getParsedMetadata(n.metadata);
    const reason = meta.rejection_reason || 
                   meta.reason || 
                   meta.remarks || 
                   meta.rejectionReason || 
                   meta.validation_remarks ||
                   (n as any).validation_remarks ||
                   (n as any).rejection_reason ||
                   (n as any).leave_rejection_reason ||
                   '';
    return reason ? String(reason).trim() : '';
  }

  getRejectedBy(n: InboxNotification): string {
    if (!n) return '';
    const meta = this.getParsedMetadata(n.metadata);
    return meta.rejected_by || n.manager_name || 'Your Manager';
  }

  getFallbackLeaveDates(notification: InboxNotification): { start: string, end: string } {
    const meta = this.getParsedMetadata(notification.metadata);
    if (notification.request_type === 'Timesheet Request') {
      if (meta.week_start && meta.week_end) {
        return { start: meta.week_start, end: meta.week_end };
      }
    }
    if (meta.start_date && meta.end_date) {
      return { start: meta.start_date, end: meta.end_date };
    }
    if (meta.date) {
      return { start: meta.date, end: meta.date };
    }
    
    const desc = notification.description || '';
    // Match date formats like "2026-07-23" or similar ISO date patterns
    const dateRegex = /(\d{4}-\d{2}-\d{2})/g;
    const matches = desc.match(dateRegex);
    if (matches && matches.length >= 2) {
      return { start: matches[0], end: matches[1] };
    }
    if (matches && matches.length === 1) {
      return { start: matches[0], end: matches[0] };
    }
    const created = notification.created_at ? notification.created_at.substring(0, 10) : '';
    return { start: created, end: created };
  }

  getFallbackCompOffDate(notification: InboxNotification): string {
    const meta = this.getParsedMetadata(notification.metadata);
    if (meta.date_worked) return meta.date_worked;
    
    const desc = notification.description || '';
    const dateRegex = /(\d{4}-\d{2}-\d{2})/;
    const match = desc.match(dateRegex);
    return match ? match[0] : '';
  }

  getFallbackAttendanceDate(notification: InboxNotification): string {
    const meta = this.getParsedMetadata(notification.metadata);
    if (meta.date) return meta.date;
    
    const desc = notification.description || '';
    const dateRegex = /(\d{4}-\d{2}-\d{2})/;
    const match = desc.match(dateRegex);
    return match ? match[0] : '';
  }

  getCalculatedDays(notification: InboxNotification): number {
    const dates = this.getFallbackLeaveDates(notification);
    if (dates.start && dates.end) {
      const s = new Date(dates.start);
      const e = new Date(dates.end);
      const diff = Math.abs(e.getTime() - s.getTime());
      return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  }

  getFallbackReason(notification: InboxNotification): string {
    const desc = notification.description || '';
    const idx = desc.indexOf('Reason:');
    if (idx !== -1) {
      return desc.substring(idx + 7).trim();
    }
    return 'N/A';
  }

  getCardShortSummary(notification: InboxNotification): string {
    const meta = this.getParsedMetadata(notification.metadata);
    if (notification.request_type === 'Leave Request') {
      const dates = this.getFallbackLeaveDates(notification);
      const days = meta.total_days || this.getCalculatedDays(notification);
      return `Applied for ${days} days leave from ${this.formatDate(dates.start)}...`;
    }
    if (notification.request_type === 'Comp Off Request' || notification.request_type === 'Comp Off') {
      const dateWorked = this.getFallbackCompOffDate(notification);
      const days = meta.total_days || 1;
      return `Requested ${days} day(s) Comp Off for date worked: ${this.formatDate(dateWorked)}...`;
    }
    if (notification.request_type === 'Attendance Regularization') {
      const date = this.getFallbackAttendanceDate(notification);
      return `Missed punch (Check-in) on ${this.formatDate(date)}...`;
    }
    if (notification.request_type === 'Timesheet Request') {
      const range = meta.week_range || 'this week';
      return `Weekly timesheet for ${range}...`;
    }
    if (notification.request_type === 'Resignation Request') {
      const lwd = meta.calculated_last_working_date || 'N/A';
      return `Submitted resignation request on ${this.formatDate(lwd)}...`;
    }
    return notification.description || '';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  selectNotification(notification: InboxNotification) {
    if (notification.is_read === 0) {
      this.inboxService.markAsRead(notification.notification_id).subscribe({
        next: () => {
          notification.is_read = 1;
          this.unreadCount = Math.max(0, this.unreadCount - 1);
          if (this.stats && this.stats.unread > 0) {
            this.stats.unread--;
          }
        }
      });
    }
    this.selectedNotification = notification;
    this.fetchAiAnalyticsForSingleNotification(notification);
    if (window.innerWidth <= 768) {
      this.isModalOpen = true;
    }
  }

  async showCardActions(notification: InboxNotification) {
    const alert = await this.alertCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: notification.is_read === 0 ? 'Mark as Read' : 'Mark as Unread',
          handler: () => {
            this.inboxService.markAsRead(notification.notification_id).subscribe({
              next: () => {
                notification.is_read = notification.is_read === 0 ? 1 : 0;
                this.loadNotifications(null, true);
              }
            });
          }
        },
        {
          text: 'Archive Request',
          handler: () => {
            this.inboxService.archiveNotification(notification.notification_id).subscribe({
              next: () => {
                this.toaster.showSuccess('Notification archived');
                this.loadNotifications(null, true);
              }
            });
          }
        },
        {
          text: 'Delete Request',
          role: 'destructive',
          handler: () => {
            this.inboxService.deleteNotification(notification.notification_id).subscribe({
              next: () => {
                this.toaster.showSuccess('Notification deleted');
                this.loadNotifications(null, true);
              }
            });
          }
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await alert.present();
  }

  loadNotifications(event?: any, forceRefresh = false) {
    if (forceRefresh) {
      this.page = 1;
      this.notifications = [];
    }

    this.loading = true;

    this.inboxService.getNotifications({
      page: this.page,
      limit: this.limit,
      search: this.searchQuery,
      tab: this.selectedTab,
      month: this.selectedMonth,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      viewAll: this.viewAll
    }).subscribe({
      next: (res) => {
        if (res.success) {
          if (this.page === 1) {
            this.notifications = res.data;
            if (this.notifications.length > 0) {
              this.selectedNotification = this.notifications[0];
              this.fetchAiAnalyticsForSingleNotification(this.selectedNotification);
            } else {
              this.selectedNotification = null;
            }
          } else {
            this.notifications = [...this.notifications, ...res.data];
          }
          this.fetchAiAnalyticsForNotifications(this.notifications);
          this.total = res.total;
          this.unreadCount = res.unreadCount;
          if (res.stats) {
            this.stats = res.stats;
          }
        }
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: (err: any) => {
        console.error('Failed to load notifications', err);
        this.loading = false;
        this.toaster.showError('Failed to load inbox notifications');
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.selectedNotification = null;
    this.loadNotifications(null, true);
  }

  onFilterChanged(filters: { search: string; sortField: string; sortOrder: 'ASC' | 'DESC'; viewAll: boolean }) {
    this.searchQuery = filters.search;
    this.sortField = filters.sortField;
    this.sortOrder = filters.sortOrder;
    this.viewAll = filters.viewAll;
    this.loadNotifications(null, true);
  }

  refresh(event: any) {
    this.loadNotifications(event, true);
  }

  loadMore(event: any) {
    if (this.notifications.length >= this.total) {
      event.target.complete();
      return;
    }
    this.page++;
    this.loadNotifications(event);
  }

  isWfhRemoteRequest(notification: InboxNotification): boolean {
    if (!notification) return false;
    const title = (notification.title || '').toLowerCase();
    const desc = (notification.description || '').toLowerCase();
    const isWfh = title.includes('wfh') || title.includes('work from home') || desc.includes('requested wfh') || desc.includes('wfh');
    const isRemote = title.includes('remote') || desc.includes('requested remote') || desc.includes('remote');
    return isWfh || isRemote;
  }

  async approveRequest(notification: InboxNotification) {
    const loading = await this.loadingCtrl.create({
      message: 'Approving request...',
    });
    await loading.present();

    let obs$;
    const isWfhRemote = this.isWfhRemoteRequest(notification);

    if (isWfhRemote) {
      // WFH/Remote request is structurally a Leave record in DB, call approveLeave
      obs$ = this.leaveRequestService.approveLeave(notification.request_id, 'Approved via Inbox');
    } else if (notification.request_type === 'Leave Request') {
      obs$ = this.leaveRequestService.approveLeave(notification.request_id, 'Approved via Inbox');
    } else if (notification.request_type === 'Comp Off Request' || notification.request_type === 'Comp Off') {
      obs$ = this.leaveRequestService.approveCompOff(notification.request_id);
    } else if (notification.request_type === 'Timesheet Request') {
      obs$ = this.timesheetService.approveTimesheet(notification.request_id);
    } else if (notification.request_type === 'Resignation Request') {
      obs$ = this.separationService.actionResignation(notification.request_id, {
        action: 'Approve',
        remarks: 'Approved via Inbox'
      });
    } else if (notification.request_type === 'Attendance Regularization') {
      obs$ = this.inboxService.actionAttendanceRegularization({
        notification_id: notification.notification_id,
        action: 'Approve',
        remarks: 'Approved via Inbox'
      });
    }

    if (obs$) {
      obs$.subscribe({
        next: () => {
          loading.dismiss();
          this.toaster.showSuccess('Request approved successfully');
          this.loadNotifications(null, true);
        },
        error: (err: any) => {
          loading.dismiss();
          console.error('Approval failed', err);
          this.toaster.showError(err.error?.error || 'Failed to approve request');
        }
      });
    } else {
      loading.dismiss();
      this.toaster.showError('Unknown request type');
    }
  }

  async rejectRequest(notification: InboxNotification) {
    if (this.rejectReasonText && this.rejectReasonText.trim() !== '') {
      const reason = this.rejectReasonText.trim();
      this.rejectReasonText = '';
      this.executeRejection(notification, reason);
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: 'Please provide a reason for rejection:',
      inputs: [
        {
          name: 'reason',
          type: 'textarea',
          placeholder: 'Rejection reason...',
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          handler: (data) => {
            if (!data.reason || data.reason.trim() === '') {
              this.toaster.showWarning('Rejection reason is required');
              return false;
            }
            this.executeRejection(notification, data.reason);
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  private async executeRejection(notification: InboxNotification, reason: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Rejecting request...',
    });
    await loading.present();

    let obs$;
    const isWfhRemote = this.isWfhRemoteRequest(notification);

    if (isWfhRemote) {
      // WFH/Remote request is structurally a Leave record in DB, call rejectLeave
      obs$ = this.leaveRequestService.rejectLeave(notification.request_id, reason);
    } else if (notification.request_type === 'Leave Request') {
      obs$ = this.leaveRequestService.rejectLeave(notification.request_id, reason);
    } else if (notification.request_type === 'Comp Off Request' || notification.request_type === 'Comp Off') {
      obs$ = this.leaveRequestService.rejectCompOff(notification.request_id, reason);
    } else if (notification.request_type === 'Timesheet Request') {
      obs$ = this.timesheetService.rejectTimesheet(notification.request_id, reason);
    } else if (notification.request_type === 'Resignation Request') {
      obs$ = this.separationService.actionResignation(notification.request_id, {
        action: 'Reject',
        remarks: reason
      });
    } else if (notification.request_type === 'Attendance Regularization') {
      obs$ = this.inboxService.actionAttendanceRegularization({
        notification_id: notification.notification_id,
        action: 'Reject',
        remarks: reason
      });
    }

    if (obs$) {
      obs$.subscribe({
        next: () => {
          loading.dismiss();
          this.toaster.showSuccess('Request rejected successfully');
          this.loadNotifications(null, true);
        },
        error: (err: any) => {
          loading.dismiss();
          console.error('Rejection failed', err);
          this.toaster.showError(err.error?.error || 'Failed to reject request');
        }
      });
    } else {
      loading.dismiss();
    }
  }

  /* ================= AI ANALYTICS FOR TIMESHEETS ================= */

  fetchAiAnalyticsForNotifications(notifications: InboxNotification[]) {
    const timesheetNotifs = notifications.filter(n => n.request_type === 'Timesheet Request');
    if (!timesheetNotifs.length) return;

    const dateGroups: { [dateStr: string]: Set<number | string> } = {};
    timesheetNotifs.forEach(n => {
      const meta = this.getParsedMetadata(n.metadata);
      const d = meta.week_range || meta.date || (n.created_at ? n.created_at.split('T')[0] : '');
      if (d && n.employee_id) {
        if (!dateGroups[d]) dateGroups[d] = new Set();
        dateGroups[d].add(Number(n.employee_id));
      }
    });

    Object.keys(dateGroups).forEach(dateStr => {
      const empIds = Array.from(dateGroups[dateStr]);
      this.analyticsService.getPendingTimesheetsAnalytics({
        tableName: 'pending_timesheets',
        employee_id: empIds,
        date: dateStr
      }).subscribe({
        next: (res: any) => {
          if (res?.success && res?.data) {
            Object.entries(res.data).forEach(([empId, data]: [string, any]) => {
              timesheetNotifs.forEach(n => {
                const meta = this.getParsedMetadata(n.metadata);
                const tDate = meta.week_range || meta.date || (n.created_at ? n.created_at.split('T')[0] : '');
                if (String(n.employee_id) === String(empId) && tDate === dateStr) {
                  (n as any).ai_analytics_loaded = true;
                  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    (n as any).ai_flag = data.flag === true;
                    (n as any).ai_summary = data.ai_summary || ((n as any).ai_flag ? 'Anomalies detected in timesheet.' : 'Timesheet verified clean.');
                    (n as any).ai_analytics = data;
                  } else {
                    (n as any).ai_flag = false;
                    (n as any).ai_summary = 'No anomalies detected in timesheet.';
                  }
                }
              });
            });
          }
        },
        error: (err) => {
          console.warn('Error fetching AI analytics in inbox:', err);
        }
      });
    });
  }

  fetchAiAnalyticsForSingleNotification(n: InboxNotification) {
    if (!n || n.request_type !== 'Timesheet Request' || (n as any).ai_analytics_loaded) return;

    (n as any).ai_analytics_loading = true;

    const meta = this.getParsedMetadata(n.metadata);
    const metaDate = meta.week_range || meta.date || meta.week_start;

    if (metaDate && n.employee_id) {
      const dateStr = typeof metaDate === 'string' ? metaDate.split('T')[0] : new Date(metaDate).toISOString().split('T')[0];
      this.callAiAnalyticsEndpoint(n, n.employee_id, dateStr);
    } else if (n.request_id) {
      this.timesheetService.getTimesheetDetails(n.request_id).subscribe({
        next: (ts: any) => {
          if (!ts) {
            (n as any).ai_analytics_loaded = true;
            (n as any).ai_flag = false;
            return;
          }
          (n as any).timesheet_details = ts;
          const dateStr = typeof ts.date === 'string' ? ts.date.split('T')[0] : new Date(ts.date).toISOString().split('T')[0];
          const empId = ts.employee_id || n.employee_id;
          this.callAiAnalyticsEndpoint(n, empId, dateStr);
        },
        error: () => {
          (n as any).ai_analytics_loaded = true;
          (n as any).ai_flag = false;
        }
      });
    }
  }

  private callAiAnalyticsEndpoint(n: InboxNotification, empId: number | string, dateStr: string) {
    this.analyticsService.getPendingTimesheetsAnalytics({
      tableName: 'pending_timesheets',
      employee_id: [Number(empId)],
      date: dateStr
    }).subscribe({
      next: (res: any) => {
        (n as any).ai_analytics_loading = false;
        (n as any).ai_analytics_loaded = true;
        if (res?.success && res?.data && res.data[String(empId)]) {
          const data = res.data[String(empId)];
          if (data && typeof data === 'object' && Object.keys(data).length > 0) {
            (n as any).ai_flag = data.flag === true;
            (n as any).ai_summary = data.ai_summary || ((n as any).ai_flag ? 'Anomalies detected in timesheet.' : 'Timesheet verified clean.');
            (n as any).ai_analytics = data;
          } else {
            (n as any).ai_flag = false;
            (n as any).ai_summary = 'No anomalies detected in timesheet.';
          }
        } else {
          (n as any).ai_flag = false;
          (n as any).ai_summary = 'No anomalies detected in timesheet.';
        }
      },
      error: () => {
        (n as any).ai_analytics_loading = false;
        (n as any).ai_analytics_loaded = true;
        (n as any).ai_flag = false;
        (n as any).ai_summary = 'No anomalies detected in timesheet.';
      }
    });
  }

  async openAiSummary(notification: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const isFlagged = notification.ai_flag === true;
    const summaryText = notification.ai_summary || (isFlagged ? 'Anomalies detected in this timesheet.' : 'No anomalies detected. Timesheet looks clean!');
    const headerTitle = isFlagged ? 'AI Flagged Anomaly' : 'AI Verified Clean';

    const alert = await this.alertCtrl.create({
      header: headerTitle,
      subHeader: `${notification.employee_name || 'Employee'} • Timesheet Request`,
      message: summaryText,
      cssClass: isFlagged ? 'ai-alert-flagged' : 'ai-alert-clean',
      buttons: [
        {
          text: 'View Details',
          handler: () => {
            this.openTimesheetPreview(notification);
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async openTimesheetPreview(notification: InboxNotification) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading work logs...',
    });
    await loading.present();

    this.timesheetService.getTimesheetDetails(notification.request_id).subscribe({
      next: async (res: any) => {
        loading.dismiss();
        if (typeof res.hours_breakdown === 'string') {
          try {
            res.hours_breakdown = JSON.parse(res.hours_breakdown);
          } catch (e) {
            res.hours_breakdown = [];
          }
        }
        const modalData = {
          ...res,
          FirstName: res.FirstName || (notification.employee_name ? notification.employee_name.split(' ')[0] : ''),
          LastName: res.LastName || (notification.employee_name ? notification.employee_name.split(' ').slice(1).join(' ') : ''),
          ai_flag: (notification as any).ai_flag,
          ai_summary: (notification as any).ai_summary
        };
        const modal = await this.modalCtrl.create({
          component: TimesheetPreviewComponent,
          cssClass: 'side-custom-popup view-work-log',
          componentProps: { data: modalData },
        });
        await modal.present();
      },
      error: (err: any) => {
        loading.dismiss();
        console.error('Failed to load timesheet details', err);
        this.toaster.showError('Failed to load timesheet details');
      }
    });
  }

  navigateToResubmitWorkTrack(n: InboxNotification) {
    if (!n) return;
    const meta = this.getParsedMetadata(n.metadata);
    const date = meta.date || meta.week_start || (n as any).date || (n.created_at ? n.created_at.substring(0, 10) : '');
    const id = n.request_id;
    this.router.navigate(['/workTrack'], {
      queryParams: {
        date: date,
        id: id,
        action: 'edit'
      }
    });
  }

  MathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  markAsRead(notification: InboxNotification) {
    this.inboxService.markAsRead(notification.notification_id).subscribe({
      next: () => {
        notification.is_read = 1;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.toaster.showSuccess('Notification marked as read');
        if (this.selectedTab === 'Unread') {
          this.loadNotifications(null, true);
        }
      },
      error: (err: any) => {
        console.error('Failed to mark read', err);
        this.toaster.showError('Failed to mark notification as read');
      }
    });
  }

  markAllAsRead() {
    this.inboxService.markAllAsRead().subscribe({
      next: () => {
        this.toaster.showSuccess('All notifications marked as read');
        this.loadNotifications(null, true);
      },
      error: (err: any) => {
        console.error('Failed to mark all as read', err);
        this.toaster.showError('Failed to mark all notifications as read');
      }
    });
  }

  triggerUpload() {
    const fileInput = document.getElementById('attendanceFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const loading = await this.loadingCtrl.create({
      message: 'Uploading and processing monthly attendance...',
    });
    await loading.present();

    const formData = new FormData();
    formData.append('file', file);

    this.inboxService.uploadMonthlyAttendance(formData).subscribe({
      next: (res: any) => {
        loading.dismiss();
        if (res.success) {
          this.toaster.showSuccess(res.message || 'Monthly attendance uploaded successfully');
          this.loadNotifications(null, true);
        } else {
          this.toaster.showError(res.message || 'Failed to upload attendance');
        }
        event.target.value = '';
      },
      error: (err: any) => {
        loading.dismiss();
        console.error('Attendance upload failed', err);
        const errMsg = err.error?.message || err.error?.error || 'Failed to upload monthly attendance';
        this.toaster.showError(errMsg);
        event.target.value = '';
      }
    });
  }

  async triggerExport() {
    const alert = await this.alertCtrl.create({
      header: 'Export Attendance',
      message: 'Enter the target year and month to export:',
      inputs: [
        {
          name: 'year',
          type: 'number',
          placeholder: 'Year (e.g. 2026)',
          value: new Date().getFullYear().toString()
        },
        {
          name: 'month',
          type: 'number',
          placeholder: 'Month (1-12, e.g. 6)',
          value: (new Date().getMonth() + 1).toString()
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Export',
          handler: (data) => {
            if (!data.year || !data.month) {
              this.toaster.showError('Both year and month are required');
              return false;
            }
            const y = parseInt(data.year, 10);
            const m = parseInt(data.month, 10);
            if (isNaN(y) || isNaN(m) || m < 1 || m > 12) {
              this.toaster.showError('Please enter a valid year and month');
              return false;
            }
            this.executeExport(y, m);
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  private async executeExport(year: number, month: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Generating attendance report...',
    });
    await loading.present();

    const monthStr = month.toString().padStart(2, '0');
    const startDate = `${year}-${monthStr}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${monthStr}-${String(lastDay).padStart(2, '0')}`;

    this.inboxService.exportMonthlyAttendance({ startDate, endDate, month, year }).subscribe({
      next: (blob: Blob) => {
        loading.dismiss();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Monthly_Attendance_${year}_${monthStr}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess('Attendance exported successfully');
      },
      error: (err: any) => {
        loading.dismiss();
        console.error('Attendance export failed', err);
        this.toaster.showError('Failed to export monthly attendance');
      }
    });
  }

  triggerUploadLeaveBalance() {
    const fileInput = document.getElementById('leaveBalanceFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  async onLeaveBalanceFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const loading = await this.loadingCtrl.create({
      message: 'Uploading and processing yearly leave balances...',
    });
    await loading.present();

    const formData = new FormData();
    formData.append('file', file);

    this.inboxService.uploadYearlyLeaveBalances(formData).subscribe({
      next: (res: any) => {
        loading.dismiss();
        if (res.success) {
          this.toaster.showSuccess(res.message || 'Yearly leave balances imported successfully');
          this.loadNotifications(null, true);
        } else {
          this.toaster.showError(res.message || 'Failed to import leave balances');
        }
        event.target.value = '';
      },
      error: (err: any) => {
        loading.dismiss();
        console.error('Leave balance upload failed', err);
        const errMsg = err.error?.message || err.error?.error || 'Failed to upload yearly leave balances';
        this.toaster.showError(errMsg);
        event.target.value = '';
      }
    });
  }

  async exportLeaves() {
    const loading = await this.loadingCtrl.create({
      message: 'Generating yearly leave balances report...',
    });
    await loading.present();

    this.inboxService.exportYearlyLeaveBalances().subscribe({
      next: (blob: Blob) => {
        loading.dismiss();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Yearly_Leave_Balances_${Date.now()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess('Leave balances report exported successfully');
      },
      error: (err: any) => {
        loading.dismiss();
        console.error('Leave balances export failed', err);
        this.toaster.showError('Failed to export yearly leave balances report');
      }
    });
  }
}
