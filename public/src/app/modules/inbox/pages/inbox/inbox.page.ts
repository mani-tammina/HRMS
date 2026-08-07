import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { InboxNotification } from '../../models/notification.model';
import { InboxService } from '../../services/inbox.service';
import { LeaverequestService } from 'src/app/core/services/leaverequest.service';
import { TimesheetService } from 'src/app/core/services/timesheet.service';
import { SeparationService } from 'src/app/core/services/separation.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { RouteGuardService } from 'src/app/core/services/route-guard.service';
import { TimesheetPreviewComponent } from 'src/app/modules/attendance/work-track/timesheet-preview.component';

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
    FormsModule
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
    resignationCount: 0
  };

  // Keka-style Inbox UI States
  headerTab: 'take_action' | 'notifications' | 'archive' = 'take_action';
  selectedFolderCategory: 'leave' | 'wfh' | 'remote' | 'attendance' | 'resignation' | 'timesheet' | 'all' = 'leave';
  actionComment: string = '';
  sortOption: string = 'NEWEST';

  // Status & Monthly Filters
  selectedStatusFilter: string = 'Pending'; // Default to Pending for PENDING TASKS
  selectedMonth: string = ''; // '' for All Months, or 'YYYY-MM'
  availableMonths: { label: string; value: string }[] = [];

  // Teammates Context State
  teammatesOnLeave: any[] = [];
  loadingTeammates: boolean = false;

  tabs = ['All', 'Unread', 'Leave', 'Attendance', 'Timesheet', 'Resignation', 'Approved', 'Rejected', 'Archived'];

  constructor(
    private inboxService: InboxService,
    private leaveRequestService: LeaverequestService,
    private timesheetService: TimesheetService,
    private separationService: SeparationService,
    private toaster: ToasterService,
    private auth: RouteGuardService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
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
    this.showViewAll = ['admin', 'hr', 'manager'].includes(role);
    this.generateMonthsList();
    this.loadNotifications();
  }

  generateMonthsList() {
    const months = [{ label: 'All Months', value: '' }];
    const now = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const lbl = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      months.push({ label: lbl, value: val });
    }
    this.availableMonths = months;
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

  getFallbackLeaveDates(notification: InboxNotification): { start: string, end: string } {
    const meta = this.getParsedMetadata(notification.metadata);
    if (meta.start_date && meta.end_date) {
      return { start: meta.start_date, end: meta.end_date };
    }
    
    const desc = notification.description || '';
    // Match date formats like "2026-07-23" or similar ISO date patterns
    const dateRegex = /(\d{4}-\d{2}-\d{2})/g;
    const matches = desc.match(dateRegex);
    if (matches && matches.length >= 2) {
      return { start: matches[0], end: matches[1] };
    }
    return { start: '', end: '' };
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
    this.loadTeammatesOnLeave(notification);
    if (window.innerWidth <= 768) {
      this.isModalOpen = true;
    }
  }

  loadTeammatesOnLeave(notification: InboxNotification) {
    if (!notification || !notification.employee_id) {
      this.teammatesOnLeave = [];
      return;
    }

    const leaveDates = this.getFallbackLeaveDates(notification);
    const startDate = leaveDates.start || this.getFallbackAttendanceDate(notification) || notification.created_at;
    const endDate = leaveDates.end || startDate;

    if (!startDate) {
      this.teammatesOnLeave = [];
      return;
    }

    this.loadingTeammates = true;
    this.inboxService.getTeammatesOnLeave({
      employee_id: notification.employee_id,
      start_date: startDate,
      end_date: endDate
    }).subscribe({
      next: (res: any) => {
        this.teammatesOnLeave = res.teammates || [];
        this.loadingTeammates = false;
      },
      error: () => {
        this.teammatesOnLeave = [];
        this.loadingTeammates = false;
      }
    });
  }

  getTimesheetBreakdown(notification?: InboxNotification | null): any[] {
    const item = notification || this.selectedNotification;
    if (!item) return [];
    
    // 1. Try ts_hours_breakdown from SQL join
    if ((item as any).ts_hours_breakdown) {
      try {
        const raw = (item as any).ts_hours_breakdown;
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }

    // 2. Try metadata
    if (item.metadata) {
      try {
        const meta = typeof item.metadata === 'string' ? JSON.parse(item.metadata) : item.metadata;
        if (meta.hours_breakdown && Array.isArray(meta.hours_breakdown) && meta.hours_breakdown.length > 0) {
          return meta.hours_breakdown;
        }
      } catch (e) {}
    }

    // Default sample breakdown if none logged
    return [
      { hour: '09:00 AM - 01:00 PM', hours: 4, task: item.description || 'Assigned project development & tasks' },
      { hour: '02:00 PM - 06:00 PM', hours: 4, task: 'Code review, testing & feature updates' }
    ];
  }

  downloadTimesheetExcel(notification?: InboxNotification | null) {
    const item = notification || this.selectedNotification;
    if (!item) return;

    const breakdown = this.getTimesheetBreakdown(item);
    
    let tableRows = '';
    breakdown.forEach((b: any, index: number) => {
      tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${b.hour || '-'}</td>
          <td>${b.task || '-'}</td>
          <td>${b.hours || '-'}</td>
        </tr>
      `;
    });

    const rawDate = (item as any).ts_date || item.created_at || new Date();
    const d = new Date(rawDate);
    const dateStr = !isNaN(d.getTime()) 
      ? `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}` 
      : 'Report';

    const empName = this.getSenderName(item) || 'Employee';
    const totalHours = (item as any).ts_total_hours || breakdown.reduce((sum: number, x: any) => sum + (parseFloat(x.hours) || 0), 0);
    const notes = (item as any).ts_notes || item.description || 'N/A';

    const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
      <meta charset="UTF-8" />
    </head>
    <body>
      <table border="1">
        <tr><td>Employee</td><td colspan="3">${empName}</td></tr>
        <tr><td>Date</td><td colspan="3">${dateStr}</td></tr>
        <tr>
          <th>S.No</th><th>Time</th><th>Task</th><th>Hours</th>
        </tr>
        ${tableRows}
        <tr><td>Note</td><td colspan="3">${notes}</td></tr>
        <tr><td>Total</td><td colspan="3">${totalHours}</td></tr>
      </table>
    </body>
    </html>
    `;

    const blob = new Blob([html], {
      type: 'application/vnd.ms-excel;charset=utf-8;'
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Timesheet_${empName.replace(/\s+/g, '_')}_${dateStr}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    this.toaster.showSuccess('Timesheet Excel downloaded successfully');
  }

  async openTimesheetWorkLogPreview(notification?: InboxNotification) {
    const item = notification || this.selectedNotification;
    if (!item) return;

    let previewData: any = null;
    if ((item as any).ts_hours_breakdown) {
      try {
        const raw = (item as any).ts_hours_breakdown;
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed) && parsed.length > 0) {
          previewData = {
            date: (item as any).ts_date || item.created_at || new Date(),
            total_hours: (item as any).ts_total_hours || 8,
            hours_breakdown: parsed,
            notes: (item as any).ts_notes || item.description || ''
          };
        }
      } catch (e) {}
    }

    if (!previewData && item.metadata) {
      try {
        const meta = typeof item.metadata === 'string' ? JSON.parse(item.metadata) : item.metadata;
        previewData = meta;
      } catch (e) {}
    }

    if (!previewData || !previewData.hours_breakdown) {
      previewData = {
        date: item.created_at || new Date(),
        total_hours: 8,
        hours_breakdown: this.getTimesheetBreakdown(item),
        notes: item.description || 'Daily work log submitted for review'
      };
    }

    const modal = await this.modalCtrl.create({
      component: TimesheetPreviewComponent,
      componentProps: { data: previewData },
      cssClass: 'side-drawer-modal'
    });
    await modal.present();
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
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      viewAll: this.viewAll
    }).subscribe({
      next: (res) => {
        if (res.success) {
          if (this.page === 1) {
            this.notifications = res.data;
            const filtered = this.filteredNotificationList;
            if (filtered.length > 0) {
              this.selectedNotification = filtered[0];
              this.loadTeammatesOnLeave(this.selectedNotification);
            } else {
              this.selectedNotification = null;
              this.teammatesOnLeave = [];
            }
          } else {
            this.notifications = [...this.notifications, ...res.data];
          }
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

  isWfhRequest(notification: InboxNotification): boolean {
    if (!notification) return false;
    const title = (notification.title || '').toLowerCase();
    const desc = (notification.description || '').toLowerCase();
    const isWfh = title.includes('wfh') || title.includes('work from home') || desc.includes('requested wfh') || desc.includes('wfh');
    return isWfh && !title.includes('remote') && !desc.includes('remote');
  }

  isRemoteRequest(notification: InboxNotification): boolean {
    if (!notification) return false;
    const title = (notification.title || '').toLowerCase();
    const desc = (notification.description || '').toLowerCase();
    return title.includes('remote') || desc.includes('requested remote') || desc.includes('remote');
  }

  isWfhRemoteRequest(notification: InboxNotification): boolean {
    return this.isWfhRequest(notification) || this.isRemoteRequest(notification);
  }

  getDisplayRequestType(notification: InboxNotification): string {
    if (!notification) return 'Leave';
    if (this.isRemoteRequest(notification)) return 'Remote Login';
    if (this.isWfhRequest(notification)) return 'Work From Home';
    return notification.request_type || 'Leave';
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
          notification.status = 'Approved';
          if (this.selectedNotification) this.selectedNotification.status = 'Approved';
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
          notification.status = 'Rejected';
          if (this.selectedNotification) this.selectedNotification.status = 'Rejected';
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

  /* ================= KEKA-STYLE INBOX HELPERS ================= */

  selectHeaderTab(tab: 'take_action' | 'notifications' | 'archive') {
    this.headerTab = tab;
    if (tab === 'archive') {
      this.selectedTab = 'Archived';
    } else if (tab === 'notifications') {
      this.selectedTab = 'Unread';
    } else {
      this.selectedTab = 'All';
    }
    this.loadNotifications(null, true);
  }

  selectFolderCategory(category: 'leave' | 'wfh' | 'remote' | 'attendance' | 'resignation' | 'timesheet' | 'all') {
    this.selectedFolderCategory = category;
    const filtered = this.filteredNotificationList;
    if (filtered.length > 0) {
      this.selectedNotification = filtered[0];
    } else {
      this.selectedNotification = null;
    }
  }

  onStatusFilterChange() {
    const filtered = this.filteredNotificationList;
    this.selectedNotification = filtered.length > 0 ? filtered[0] : null;
  }

  onMonthFilterChange() {
    if (this.selectedMonth && this.selectedMonth !== '') {
      if (this.selectedStatusFilter === 'Pending') {
        this.selectedStatusFilter = 'All';
      }
    }
    const filtered = this.filteredNotificationList;
    this.selectedNotification = filtered.length > 0 ? filtered[0] : null;
  }

  matchesMonth(notification: InboxNotification, targetMonth: string): boolean {
    if (!targetMonth || targetMonth === '') return true;

    if (notification.created_at) {
      const d = new Date(notification.created_at);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        if (`${yyyy}-${mm}` === targetMonth) return true;
      }
    }

    const leaveDates = this.getFallbackLeaveDates(notification);
    if (leaveDates.start) {
      const d = new Date(leaveDates.start);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        if (`${yyyy}-${mm}` === targetMonth) return true;
      }
    }

    const attDate = this.getFallbackAttendanceDate(notification);
    if (attDate) {
      const d = new Date(attDate);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        if (`${yyyy}-${mm}` === targetMonth) return true;
      }
    }

    return false;
  }

  getSelectedMonthLabel(): string {
    if (!this.selectedMonth || this.selectedMonth === '') {
      return 'PENDING TASKS';
    }
    const found = this.availableMonths.find(m => m.value === this.selectedMonth);
    return found ? `${found.label.toUpperCase()} REQUESTS` : 'ALL REQUESTS';
  }

  shouldShowCategory(category: string): boolean {
    const count = this.getCategoryCount(category);
    const categories = ['leave', 'wfh', 'remote', 'attendance', 'resignation', 'timesheet'];
    const hasAnyWithCount = categories.some(cat => this.getCategoryCount(cat) > 0);

    // If at least one category has count > 0, show ONLY categories with count > 0. If all are 0, show all.
    return hasAnyWithCount ? count > 0 : true;
  }

  getCategoryCount(category: string): number {
    if (!this.notifications) return 0;
    return this.notifications.filter(n => {
      if (this.selectedMonth && this.selectedMonth !== '') {
        // When a month is selected, count all requests for that month (Approved, Rejected, Pending)
        if (!this.matchesMonth(n, this.selectedMonth)) return false;
      } else {
        // Default (All Months view): PENDING TASKS counts ONLY pending requests
        const status = (n.status || '').toLowerCase();
        if (status !== 'pending') return false;
      }

      const type = (n.request_type || '').toLowerCase();
      const isWfh = this.isWfhRequest(n);
      const isRemote = this.isRemoteRequest(n);
      const isWfhOrRemote = isWfh || isRemote;

      if (category === 'wfh') {
        return isWfh;
      }
      if (category === 'remote') {
        return isRemote;
      }
      if (category === 'leave') {
        return (type.includes('leave') || type.includes('comp off')) && !isWfhOrRemote;
      }
      if (category === 'attendance') {
        return (type.includes('attendance') || type.includes('regularization')) && !isWfhOrRemote;
      }
      if (category === 'resignation') {
        return type.includes('resignation') || type.includes('exit') || type.includes('separation');
      }
      if (category === 'timesheet') {
        return type.includes('timesheet');
      }
      return true;
    }).length;
  }

  getSenderName(item?: InboxNotification | null): string {
    if (!item) return 'Employee';
    return item.sender_name || item.employee_name || 'Employee';
  }

  get filteredNotificationList(): InboxNotification[] {
    if (!this.notifications) return [];
    
    return this.notifications.filter(n => {
      const type = (n.request_type || '').toLowerCase();
      const status = (n.status || '').toLowerCase();
      const isWfh = this.isWfhRequest(n);
      const isRemote = this.isRemoteRequest(n);
      const isWfhOrRemote = isWfh || isRemote;

      // Status filter check
      if (this.selectedStatusFilter && this.selectedStatusFilter !== 'All') {
        if (status !== this.selectedStatusFilter.toLowerCase()) {
          return false;
        }
      }

      // Month filter check
      if (this.selectedMonth && this.selectedMonth !== '') {
        if (!this.matchesMonth(n, this.selectedMonth)) {
          return false;
        }
      }

      // Category check
      if (this.selectedFolderCategory === 'wfh') {
        if (!isWfh) return false;
      } else if (this.selectedFolderCategory === 'remote') {
        if (!isRemote) return false;
      } else if (this.selectedFolderCategory === 'leave') {
        if (isWfhOrRemote || (!type.includes('leave') && !type.includes('comp off'))) {
          return false;
        }
      } else if (this.selectedFolderCategory === 'attendance') {
        if (isWfhOrRemote || (!type.includes('attendance') && !type.includes('regularization'))) {
          return false;
        }
      } else if (this.selectedFolderCategory === 'resignation') {
        if (!type.includes('resignation') && !type.includes('exit') && !type.includes('separation')) {
          return false;
        }
      } else if (this.selectedFolderCategory === 'timesheet') {
        if (!type.includes('timesheet')) {
          return false;
        }
      }

      // Search query check
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        const title = (n.title || '').toLowerCase();
        const sender = (n.sender_name || n.employee_name || '').toLowerCase();
        const desc = (n.description || '').toLowerCase();
        return title.includes(query) || sender.includes(query) || desc.includes(query);
      }

      return true;
    });
  }

  getDateBox(dateStr: string): { month: string; day: string; dayOfWeek: string } {
    if (!dateStr) return { month: 'AUG', day: '10', dayOfWeek: 'MON' };
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { month: 'AUG', day: '10', dayOfWeek: 'MON' };
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return {
      month: months[d.getMonth()],
      day: d.getDate().toString().padStart(2, '0'),
      dayOfWeek: days[d.getDay()]
    };
  }

  getRelativeDaysText(startDateStr: string): string {
    if (!startDateStr) return '';
    const start = new Date(startDateStr);
    const now = new Date();
    now.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    const diffDays = Math.round((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `Leave starting ${diffDays} day(s) from now`;
    if (diffDays === 0) return 'Leave starting today';
    return `Leave started ${Math.abs(diffDays)} day(s) ago`;
  }

  async approveWithComment() {
    if (!this.selectedNotification) return;
    const notification = this.selectedNotification;
    const remark = this.actionComment?.trim() || 'Approved via Inbox';

    const loading = await this.loadingCtrl.create({ message: 'Approving request...' });
    await loading.present();

    let obs$;
    const isWfhRemote = this.isWfhRemoteRequest(notification);

    if (isWfhRemote || notification.request_type === 'Leave Request') {
      obs$ = this.leaveRequestService.approveLeave(notification.request_id, remark);
    } else if (notification.request_type === 'Comp Off Request' || notification.request_type === 'Comp Off') {
      obs$ = this.leaveRequestService.approveCompOff(notification.request_id);
    } else if (notification.request_type === 'Timesheet Request') {
      obs$ = this.timesheetService.approveTimesheet(notification.request_id);
    } else if (notification.request_type === 'Resignation Request') {
      obs$ = this.separationService.actionResignation(notification.request_id, { action: 'Approve', remarks: remark });
    } else if (notification.request_type === 'Attendance Regularization') {
      obs$ = this.inboxService.actionAttendanceRegularization({ notification_id: notification.notification_id, action: 'Approve', remarks: remark });
    }

    if (obs$) {
      obs$.subscribe({
        next: () => {
          loading.dismiss();
          this.actionComment = '';
          notification.status = 'Approved';
          if (this.selectedNotification) this.selectedNotification.status = 'Approved';
          this.toaster.showSuccess('Request approved successfully');
          this.loadNotifications(null, true);
        },
        error: (err: any) => {
          loading.dismiss();
          this.toaster.showError(err.error?.error || 'Failed to approve request');
        }
      });
    } else {
      loading.dismiss();
    }
  }

  async rejectWithComment() {
    if (!this.selectedNotification) return;
    if (!this.actionComment || this.actionComment.trim() === '') {
      this.toaster.showWarning('Please enter a rejection reason in the comment box below');
      return;
    }
    const notification = this.selectedNotification;
    const reason = this.actionComment.trim();

    this.executeRejection(notification, reason);
    this.actionComment = '';
  }
}
