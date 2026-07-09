import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InboxNotification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class NotificationCardComponent {
  @Input() notification!: InboxNotification;
  
  @Output() approve = new EventEmitter<InboxNotification>();
  @Output() reject = new EventEmitter<InboxNotification>();
  @Output() markRead = new EventEmitter<InboxNotification>();

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
        return 'primary';
      case 'Attendance Regularization':
        return 'warning';
      case 'Timesheet Request':
        return 'success';
      case 'Resignation Request':
        return 'danger';
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
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    
    return date.toLocaleDateString();
  }

  onApprove(event: Event) {
    event.stopPropagation();
    this.approve.emit(this.notification);
  }

  onReject(event: Event) {
    event.stopPropagation();
    this.reject.emit(this.notification);
  }

  onMarkRead(event: Event) {
    event.stopPropagation();
    this.markRead.emit(this.notification);
  }
}
