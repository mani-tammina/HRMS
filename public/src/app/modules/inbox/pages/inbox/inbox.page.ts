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
import { environment } from 'src/environments/environment';
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
  
  searchQuery = '';
  selectedTab = 'All';
  selectedTypeFilter = 'All';
  sortField = 'created_at';
  sortOrder: 'ASC' | 'DESC' = 'DESC';
  showViewAll = false;
  viewAll = false;
  loading = false;
  showReportsDropdown = false;
  showFilters = false;

  filterRequestType = '';
  filterStatus = '';
  filterPriority = '';

  selectedMonth: string = '';
  monthOptions: { label: string; value: string }[] = [];
  isEmployee = false;
  isHR = false;
  isManager = false;
  isManagerOrHR = false;
  rejectedCount = 0;

  isModalOpen = false;
  selectedNotification: InboxNotification | null = null;
  rejectReasonText = '';

  private hasInitialized = false;

  stats: any = {
    totalRequests: 0,
    unread: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    leaveCount: 0,
    compOffCount: 0,
    attendanceCount: 0,
    timesheetCount: 0,
    resignationCount: 0,
    wfhCount: 0,
    remoteCount: 0
  };

  tabs = ['All', 'Leave', 'WFH', 'Remote', 'Attendance', 'CompOff', 'Timesheet', 'Resignation', 'Approved', 'Rejected', 'Archived'];

  constructor(
    private inboxService: InboxService,
    private leaveRequestService: LeaverequestService,
    private timesheetService: TimesheetService,
    private separationService: SeparationService,
    private toaster: ToasterService,
    private auth: RouteGuardService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.initRoleAccess();
    if (this.isEmployee) {
      this.selectedTab = 'Rejected';
    }
    this.generateMonthOptions();
    this.loadNotifications();
    this.hasInitialized = true;
  }

  ionViewWillEnter() {
    this.initRoleAccess();
    if (this.hasInitialized) {
      // Reload on re-entering view
      this.loadNotifications(null, true);
    }
  }

  private initRoleAccess() {
    const role = this.auth.userRole?.toLowerCase() || '';
    this.isEmployee = role === 'employee';
    this.isHR = ['admin', 'hr'].includes(role);
    this.isManager = role === 'manager';
    this.isManagerOrHR = ['admin', 'hr', 'manager'].includes(role);
    this.showViewAll = this.isManagerOrHR;
    if (this.isHR) {
      this.viewAll = true;
    }
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
      return 'MY REQUESTS';
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

  toggleInlineFilters() {
    this.showFilters = !this.showFilters;
  }

  applyDropdownFilters() {
    if (this.filterRequestType) {
      if (this.filterRequestType === 'Leave Request') this.selectedTab = 'Leave';
      else if (this.filterRequestType === 'Work From Home' || this.filterRequestType === 'WFH') this.selectedTab = 'WFH';
      else if (this.filterRequestType === 'Remote Login' || this.filterRequestType === 'Remote') this.selectedTab = 'Remote';
      else if (this.filterRequestType === 'Comp Off Request' || this.filterRequestType === 'Comp Off') this.selectedTab = 'CompOff';
      else if (this.filterRequestType === 'Attendance Regularization') this.selectedTab = 'Attendance';
      else if (this.filterRequestType === 'Timesheet Request') this.selectedTab = 'Timesheet';
      else if (this.filterRequestType === 'Resignation Request') this.selectedTab = 'Resignation';
      this.selectedTypeFilter = this.selectedTab;
    } else if (this.filterStatus) {
      if (this.filterStatus === 'Approved') this.selectedTab = 'Approved';
      else if (this.filterStatus === 'Rejected') this.selectedTab = 'Rejected';
      else if (this.filterStatus === 'Pending') this.selectedTab = 'All';
    }
    
    this.loadNotifications(null, true);
  }

  clearFilters() {
    this.searchQuery = '';
    this.filterRequestType = '';
    this.filterStatus = '';
    this.filterPriority = '';
    this.selectedTypeFilter = 'All';
    this.selectedTab = 'All';
    this.sortField = 'created_at';
    this.sortOrder = 'DESC';
    this.loadNotifications(null, true);
  }

  onFilterSearch(event: any) {
    this.searchQuery = event.target.value || '';
    this.loadNotifications(null, true);
  }

  trackByNotificationId(index: number, item: InboxNotification): number {
    return item.notification_id;
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
      return {};
    }
  }

  isWfh(notification: InboxNotification | null): boolean {
    if (!notification) return false;
    const type = (notification.request_type || '').toLowerCase();
    const title = (notification.title || '').toLowerCase();
    const desc = (notification.description || '').toLowerCase();
    return type === 'work from home' || type === 'wfh' || title.includes('wfh') || title.includes('work from home') || desc.includes('requested wfh') || desc.includes('work from home');
  }

  isRemote(notification: InboxNotification | null): boolean {
    if (!notification) return false;
    if (this.isWfh(notification)) return false;
    const type = (notification.request_type || '').toLowerCase();
    const title = (notification.title || '').toLowerCase();
    const desc = (notification.description || '').toLowerCase();
    return type === 'remote login' || type === 'remote' || title.includes('remote') || desc.includes('requested remote') || desc.includes('remote');
  }

  isWfhRemoteRequest(notification: InboxNotification): boolean {
    return this.isWfh(notification) || this.isRemote(notification);
  }

  getDisplayRequestType(notification: InboxNotification): string {
    if (!notification) return '';
    if (this.isWfh(notification)) return 'Work From Home';
    if (this.isRemote(notification)) return 'Remote Login';
    if (notification.request_type === 'Comp Off Request' || notification.request_type === 'Comp Off') return 'Comp Off';
    return notification.request_type;
  }

  getTabEmptyTitle(): string {
    switch (this.selectedTab) {
      case 'WFH': return 'Work From Home';
      case 'Remote': return 'Remote Login';
      case 'Leave': return 'Leave';
      case 'CompOff': return 'Comp Off';
      case 'Attendance': return 'Attendance Regularization';
      case 'Timesheet': return 'Timesheet';
      case 'Resignation': return 'Exit';
      case 'All': return 'pending';
      default: return this.selectedTab;
    }
  }

  getCardBorderClass(n: any): string {
    if (this.isWfh(n)) return 'border-wfh';
    if (this.isRemote(n)) return 'border-remote';
    const type = typeof n === 'string' ? n : n?.request_type;
    switch (type) {
      case 'Leave Request': return 'border-leave';
      case 'Work From Home': return 'border-wfh';
      case 'Remote Login': return 'border-remote';
      case 'Comp Off Request':
      case 'Comp Off': return 'border-compoff';
      case 'Attendance Regularization': return 'border-attendance';
      case 'Timesheet Request': return 'border-timesheet';
      case 'Resignation Request': return 'border-resignation';
      default: return '';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'primary';
      case 'low':
      default: return 'medium';
    }
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'verified': return 'success';
      case 'rejected': return 'danger';
      case 'cancelled': return 'medium';
      case 'pending':
      default: return 'warning';
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
    const meta = n._parsedMeta || this.getParsedMetadata(n.metadata);
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
    const meta = n._parsedMeta || this.getParsedMetadata(n.metadata);
    return meta.rejected_by || n.manager_name || 'Your Manager';
  }

  getFallbackLeaveDates(notification: InboxNotification): { start: string, end: string } {
    const meta = notification._parsedMeta || this.getParsedMetadata(notification.metadata);
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
    const meta = notification._parsedMeta || this.getParsedMetadata(notification.metadata);
    if (meta.date_worked) return meta.date_worked;
    
    const desc = notification.description || '';
    const dateRegex = /(\d{4}-\d{2}-\d{2})/;
    const match = desc.match(dateRegex);
    return match ? match[0] : '';
  }

  getFallbackAttendanceDate(notification: InboxNotification): string {
    const meta = notification._parsedMeta || this.getParsedMetadata(notification.metadata);
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

  getCardShortSummary(notification: InboxNotification, parsedMeta?: any): string {
    const meta = parsedMeta || notification._parsedMeta || this.getParsedMetadata(notification.metadata);
    if (this.isWfh(notification)) {
      const dates = this.getFallbackLeaveDates(notification);
      const days = meta.total_days || this.getCalculatedDays(notification);
      return `Requested ${days} day(s) Work From Home from ${this.formatDate(dates.start)}...`;
    }
    if (this.isRemote(notification)) {
      const dates = this.getFallbackLeaveDates(notification);
      const days = meta.total_days || this.getCalculatedDays(notification);
      return `Requested ${days} day(s) Remote Login from ${this.formatDate(dates.start)}...`;
    }
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
      return `Attendance regularization on ${this.formatDate(date)}...`;
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

  getDateParts(dateStr: string): { month: string; day: string; weekday: string } {
    if (!dateStr) return { month: 'AUG', day: '10', weekday: 'MON' };
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { month: 'AUG', day: '10', weekday: 'MON' };
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[d.getMonth()] || 'AUG';
    const day = d.getDate().toString().padStart(2, '0');
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekday = weekdays[d.getDay()] || 'MON';
    return { month, day, weekday };
  }

  getRelativeLeaveStatus(notification: InboxNotification | null): string {
    if (!notification) return 'Leave starting soon';
    if (notification.request_type === 'Timesheet Request') {
      const meta = notification._parsedMeta || this.getParsedMetadata(notification.metadata);
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
    if (!notification) return 'Request Details';
    if (notification.request_type === 'Timesheet Request') {
      const meta = notification._parsedMeta || this.getParsedMetadata(notification.metadata);
      if (meta.week_range) {
        return `Weekly Timesheet: ${meta.week_range}`;
      }
      if (meta.week_start && meta.week_end) {
        return `Weekly Timesheet: ${this.formatDate(meta.week_start)} – ${this.formatDate(meta.week_end)}`;
      }
      return `Timesheet Submission`;
    }
    if (notification.request_type === 'Resignation Request') {
      return `Exit / Resignation Request`;
    }
    if (notification.request_type === 'Attendance Regularization' && !this.isWfhRemoteRequest(notification)) {
      return `Attendance Regularization`;
    }
    const meta = notification._parsedMeta || this.getParsedMetadata(notification.metadata);
    const days = meta.total_days || this.getCalculatedDays(notification) || 1;
    if (this.isWfh(notification)) {
      return `${days} day${days > 1 ? 's' : ''} of Work From Home`;
    }
    if (this.isRemote(notification)) {
      return `${days} day${days > 1 ? 's' : ''} of Remote Login`;
    }
    if (notification.request_type === 'Comp Off Request' || notification.request_type === 'Comp Off') {
      return `${days} day${days > 1 ? 's' : ''} of Compensatory Off`;
    }
    const typeName = notification.leave_type_name || 'Leaves';
    return `${days} day${days > 1 ? 's' : ''} of ${typeName}`;
  }

  selectNotification(notification: InboxNotification) {
    this.selectedNotification = notification;
    if (window.innerWidth <= 768) {
      this.isModalOpen = true;
    }
  }

  async showCardActions(notification: InboxNotification) {
    const alert = await this.alertCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Archive Request',
          handler: () => {
            this.inboxService.archiveNotification(notification.notification_id).subscribe({
              next: () => {
                this.toaster.showSuccess('Request archived');
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
                this.toaster.showSuccess('Request deleted');
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

  private memoizeNotification(n: InboxNotification): InboxNotification {
    n._parsedMeta = this.getParsedMetadata(n.metadata);
    n._displayType = this.getDisplayRequestType(n);
    n._shortSummary = this.getCardShortSummary(n, n._parsedMeta);
    n._timeAgo = this.getTimeAgo(n.created_at);
    n._cardBorderClass = this.getCardBorderClass(n);
    n._statusBadgeClass = this.getStatusBadgeClass(n.status);
    n._initials = this.getInitials(n.employee_name);
    n._avatarUrl = this.getProfileImage(n);
    return n;
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
      viewAll: this.viewAll,
      skipStats: this.page > 1
    }).subscribe({
      next: (res) => {
        if (res.success) {
          const processed = (res.data || []).map(item => this.memoizeNotification(item));
          if (this.page === 1) {
            this.notifications = processed;
            if (this.notifications.length > 0) {
              this.selectedNotification = this.notifications[0];
            } else {
              this.selectedNotification = null;
            }
          } else {
            this.notifications = [...this.notifications, ...processed];
          }
          this.total = res.total;
          if (res.stats) {
            this.stats = res.stats;
            this.rejectedCount = res.stats.rejected || 0;
          }
        }
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: (err: any) => {
        console.error('Failed to load requests', err);
        this.loading = false;
        this.toaster.showError('Failed to load inbox requests');
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    if (['All', 'Leave', 'WFH', 'Remote', 'Attendance', 'CompOff', 'Timesheet', 'Resignation'].includes(tab)) {
      this.selectedTypeFilter = tab;
    } else {
      this.selectedTypeFilter = 'All';
    }
    this.selectedNotification = null;
    this.loadNotifications(null, true);
  }

  onTypeFilterChange() {
    this.selectedTab = this.selectedTypeFilter;
    this.selectedNotification = null;
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

  MathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  async approveRequest(notification: InboxNotification) {
    const loading = await this.loadingCtrl.create({
      message: 'Approving request...',
    });
    await loading.present();

    let obs$;
    const isWfhRemote = this.isWfhRemoteRequest(notification);

    if (isWfhRemote || notification.request_type === 'Work From Home' || notification.request_type === 'Remote Login') {
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

    if (isWfhRemote || notification.request_type === 'Work From Home' || notification.request_type === 'Remote Login') {
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
        const modal = await this.modalCtrl.create({
          component: TimesheetPreviewComponent,
          cssClass: 'side-custom-popup view-work-log',
          componentProps: { data: res },
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
    const meta = n._parsedMeta || this.getParsedMetadata(n.metadata);
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
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const defaultStart = `${y}-${m}-01`;
    const defaultEnd = today.toISOString().split('T')[0];

    const alert = await this.alertCtrl.create({
      header: 'Export Attendance',
      subHeader: this.isHR ? 'Download attendance report for all employees' : 'Download attendance report for your reporting team',
      inputs: [
        {
          name: 'startDate',
          type: 'date',
          label: 'From Date',
          value: defaultStart
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'To Date',
          value: defaultEnd
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Export',
          handler: (data) => {
            if (!data.startDate || !data.endDate) {
              this.toaster.showError('Both From Date and To Date are required');
              return false;
            }
            if (new Date(data.startDate) > new Date(data.endDate)) {
              this.toaster.showError('From Date cannot be later than To Date');
              return false;
            }
            this.executeExport(data.startDate, data.endDate);
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  private async executeExport(startDate: string, endDate: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Generating attendance report...',
    });
    await loading.present();

    this.inboxService.exportMonthlyAttendance({ startDate, endDate }).subscribe({
      next: (blob: Blob) => {
        loading.dismiss();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Attendance_Report_${startDate}_to_${endDate}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess('Attendance exported successfully');
      },
      error: (err: any) => {
        loading.dismiss();
        console.error('Attendance export failed', err);
        this.toaster.showError('Failed to export attendance report');
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

  async triggerExportTimesheets() {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const defaultStart = `${y}-${m}-01`;
    const defaultEnd = today.toISOString().split('T')[0];

    const alert = await this.alertCtrl.create({
      header: 'Download Timesheets',
      subHeader: this.isHR ? 'Download timesheets for all employees' : 'Download timesheets for your reporting team',
      inputs: [
        {
          name: 'startDate',
          type: 'date',
          label: 'From Date',
          value: defaultStart
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'To Date',
          value: defaultEnd
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Download',
          handler: (data) => {
            if (!data.startDate || !data.endDate) {
              this.toaster.showError('Both From Date and To Date are required');
              return false;
            }
            if (new Date(data.startDate) > new Date(data.endDate)) {
              this.toaster.showError('From Date cannot be later than To Date');
              return false;
            }
            this.executeExportTimesheets(data.startDate, data.endDate);
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  private async executeExportTimesheets(startDate: string, endDate: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Generating timesheets report...',
    });
    await loading.present();

    this.inboxService.exportTimesheets({ startDate, endDate }).subscribe({
      next: (blob: Blob) => {
        loading.dismiss();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Employee_Timesheets_${startDate}_to_${endDate}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess('Timesheets downloaded successfully');
      },
      error: (err: any) => {
        loading.dismiss();
        console.error('Timesheets export failed', err);
        this.toaster.showError('Failed to download employee timesheets');
      }
    });
  }
}
