import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    const role = this.auth.userRole?.toLowerCase() || '';
    this.showViewAll = ['admin', 'hr', 'manager'].includes(role);
    this.loadNotifications();
  }

  toggleInlineFilters() {
    this.showFilters = !this.showFilters;
  }

  applyDropdownFilters() {
    if (this.filterRequestType) {
      if (this.filterRequestType === 'Leave Request') this.selectedTab = 'Leave';
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
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      viewAll: this.viewAll
    }).subscribe({
      next: (res) => {
        if (res.success) {
          if (this.page === 1) {
            this.notifications = res.data;
            if (this.notifications.length > 0 && !this.selectedNotification) {
              this.selectedNotification = this.notifications[0];
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
}
