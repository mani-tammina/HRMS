import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonGrid, IonRow, IonCol, IonIcon, IonBadge, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  peopleOutline, cloudUploadOutline, settingsOutline, documentTextOutline,
  calendarOutline, megaphoneOutline, helpCircleOutline, briefcaseOutline,
  cashOutline, timeOutline, statsChartOutline, personAddOutline, shieldOutline,
  clipboardOutline, homeOutline
} from 'ionicons/icons';
import { AuthService, User } from '@core/services/auth.service';

interface AdminCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  badge?: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonGrid, IonRow, IonCol, IonIcon, IonBadge, IonButton
  ]
})
export class AdminDashboardPage implements OnInit {
  user: User | null = null;
  
  adminCards: AdminCard[] = [
    {
      title: 'Bulk Upload',
      description: 'Upload employees, holidays, payroll data',
      icon: 'cloud-upload-outline',
      route: '/admin/bulk-upload',
      color: 'primary'
    },
    {
      title: 'Master Data',
      description: 'Manage departments, designations, locations',
      icon: 'settings-outline',
      route: '/admin/master-data',
      color: 'secondary'
    },
    {
      title: 'User Management',
      description: 'Manage users and roles (HR, Manager, Employee)',
      icon: 'shield-outline',
      route: '/admin/users',
      color: 'warning'
    },
    {
      title: 'Employee Management',
      description: 'View and manage all employees',
      icon: 'people-outline',
      route: '/employees',
      color: 'tertiary'
    },
    {
      title: 'Payroll Management',
      description: 'Generate and manage payroll',
      icon: 'cash-outline',
      route: '/admin/payroll',
      color: 'success'
    },
    {
      title: 'Timesheet Verification',
      description: 'Verify and approve timesheets',
      icon: 'time-outline',
      route: '/admin/timesheet/dashboard',
      color: 'warning'
    },
    {
      title: 'Reports',
      description: 'View analytics and reports',
      icon: 'stats-chart-outline',
      route: '/reports',
      color: 'danger'
    },
    {
      title: 'Holiday Management',
      description: 'Add and manage company holidays',
      icon: 'calendar-outline',
      route: '/admin/holidays',
      color: 'primary'
    },
    {
      title: 'Announcements',
      description: 'Create and manage announcements',
      icon: 'megaphone-outline',
      route: '/admin/announcements',
      color: 'secondary'
    },
    {
      title: 'Support Tickets',
      description: 'Manage support requests',
      icon: 'help-circle-outline',
      route: '/support',
      color: 'tertiary'
    },
    {
      title: 'Candidates',
      description: 'Manage recruitment pipeline',
      icon: 'person-add-outline',
      route: '/candidates',
      color: 'success'
    },
    {
      title: 'Pre-Onboarding',
      description: 'Manage candidate onboarding',
      icon: 'briefcase-outline',
      route: '/admin/preonboarding',
      color: 'warning'
    },
    {
      title: 'Leave Plans',
      description: 'Manage leave plans and allocations',
      icon: 'clipboard-outline',
      route: '/admin/leave-plans',
      color: 'primary'
    },
    {
      title: 'Leave Management',
      description: 'Approve and manage leaves',
      icon: 'document-text-outline',
      route: '/admin/leaves',
      color: 'danger'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      peopleOutline,
      cloudUploadOutline,
      settingsOutline,
      documentTextOutline,
      calendarOutline,
      shieldOutline,
      megaphoneOutline,
      helpCircleOutline,
      briefcaseOutline,
      cashOutline,
      timeOutline,
      statsChartOutline,
      personAddOutline,
      clipboardOutline,
      homeOutline
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  goToHome() {
    this.router.navigate(['/tabs/home']);
  }
}
