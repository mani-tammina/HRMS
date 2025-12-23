import { Component } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon, IonBadge
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  notificationsOutline, checkmarkCircleOutline, informationCircleOutline,
  warningOutline, alertCircleOutline
} from 'ionicons/icons';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon, IonBadge
  ]
})
export class NotificationsPage {
  notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Leave Approved',
      message: 'Your leave request for Jan 25-27 has been approved',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Check-in Reminder',
      message: 'Don\'t forget to check in for today',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Pending Leave Request',
      message: 'You have a pending leave request awaiting approval',
      timestamp: '2 days ago',
      read: true
    }
  ];

  constructor() {
    addIcons({ 
      notificationsOutline, checkmarkCircleOutline, informationCircleOutline,
      warningOutline, alertCircleOutline
    });
  }

  getIconName(type: string): string {
    const icons: any = {
      'info': 'information-circle-outline',
      'success': 'checkmark-circle-outline',
      'warning': 'warning-outline',
      'error': 'alert-circle-outline'
    };
    return icons[type] || 'information-circle-outline';
  }

  getColor(type: string): string {
    const colors: any = {
      'info': 'primary',
      'success': 'success',
      'warning': 'warning',
      'error': 'danger'
    };
    return colors[type] || 'medium';
  }
}
