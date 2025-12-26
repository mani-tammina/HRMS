import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonGrid, IonRow, IonCol, IonIcon, IonButton,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  peopleOutline, calendarOutline, cashOutline, documentTextOutline,
  barChartOutline, statsChartOutline, trendingUpOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonGrid, IonRow, IonCol, IonIcon, IonButton
  ]
})
export class ReportsPage implements OnInit {
  reports = [
    {
      id: 'attendance',
      title: 'Attendance Report',
      description: 'View detailed attendance statistics and trends',
      icon: 'calendar-outline',
      color: 'primary',
      route: '/reports/attendance'
    },
    {
      id: 'leave',
      title: 'Leave Report',
      description: 'Analyze leave patterns and balances',
      icon: 'document-text-outline',
      color: 'success',
      route: '/reports/leave'
    },
    {
      id: 'payroll',
      title: 'Payroll Report',
      description: 'Review salary and payroll statistics',
      icon: 'cash-outline',
      color: 'warning',
      route: '/reports/payroll'
    },
    {
      id: 'headcount',
      title: 'Headcount Report',
      description: 'Employee distribution by department',
      icon: 'people-outline',
      color: 'secondary',
      route: '/reports/headcount'
    },
    {
      id: 'timesheet',
      title: 'Timesheet Report',
      description: 'Project hours and timesheet analytics',
      icon: 'stats-chart-outline',
      color: 'tertiary',
      route: '/reports/timesheet'
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      description: 'Overall performance indicators',
      icon: 'trending-up-outline',
      color: 'danger',
      route: '/reports/performance'
    }
  ];

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {
    addIcons({ 
      peopleOutline, calendarOutline, cashOutline, documentTextOutline,
      barChartOutline, statsChartOutline, trendingUpOutline
    });
  }

  ngOnInit() {}

  openReport(report: any) {
    this.router.navigate([report.route]);
  }
}
