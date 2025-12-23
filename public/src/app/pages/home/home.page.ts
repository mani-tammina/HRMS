import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonGrid, IonRow, IonCol, IonIcon, IonBadge, IonRefresher, IonRefresherContent,
  IonAvatar
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@core/services/auth.service';
import { AttendanceService } from '@core/services/attendance.service';
import { LeaveService } from '@core/services/leave.service';
import { addIcons } from 'ionicons';
import { 
  notificationsOutline, calendarOutline, timeOutline, 
  documentTextOutline, peopleOutline, trendingUpOutline,
  checkmarkCircleOutline, closeCircleOutline, hourglassOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonGrid, IonRow, IonCol, IonIcon, IonBadge, IonRefresher, IonRefresherContent,
    IonAvatar
  ]
})
export class HomePage implements OnInit {
  user: User | null = null;
  todayAttendance: any = null;
  currentTime: string = '';
  stats = {
    workHours: '0h 0m',
    leavesUsed: 0,
    leavesPending: 0,
    attendanceRate: 0
  };

  announcements = [
    { title: 'Happy Thanksgiving Day holiday - 27th & 28th Nov Company will remain closed on these dates', time: '26 Dec 2025 • 12:30 PM' },
    { title: 'Happy Thanksgiving Day holiday - 27th & 28th Nov Company will remain closed on these dates', time: '26 Dec 2025 • 12:30 PM' },
    { title: 'Happy Thanksgiving Day holiday - 27th & 28th Nov Company will remain closed on these dates', time: '26 Dec 2025 • 12:30 PM' }
  ];

  celebrations = [
    { name: 'Jenny Wilson', type: 'Birthday', date: '26 Dec', avatar: 'assets/avatar-placeholder.png' },
    { name: 'Darrell Steward', type: 'Birthday', date: '26 Dec', avatar: 'assets/avatar-placeholder.png' },
    { name: 'Shivani Pandey', type: 'Work Anniversary', date: '26 Dec', avatar: 'assets/avatar-placeholder.png' }
  ];

  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private router: Router
  ) {
    addIcons({ 
      notificationsOutline, calendarOutline, timeOutline, 
      documentTextOutline, peopleOutline, trendingUpOutline,
      checkmarkCircleOutline, closeCircleOutline, hourglassOutline
    });
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.updateTime();
    this.loadData();
    
    // Update time every minute
    setInterval(() => this.updateTime(), 60000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  loadData() {
    this.attendanceService.getTodayAttendance().subscribe({
      next: (attendance) => {
        this.todayAttendance = attendance;
        if (attendance?.workHours) {
          const hours = Math.floor(attendance.workHours);
          const minutes = Math.round((attendance.workHours - hours) * 60);
          this.stats.workHours = `${hours}h ${minutes}m`;
        }
      }
    });

    this.leaveService.getLeaveBalance().subscribe({
      next: (balance) => {
        this.stats.leavesUsed = balance.used || 0;
        this.stats.attendanceRate = balance.attendanceRate || 0;
      }
    });

    this.leaveService.getLeaves().subscribe({
      next: (leaves) => {
        this.stats.leavesPending = leaves.filter(l => l.status === 'pending').length;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  navigateTo(action: string) {
    this.router.navigate([`/${action}`]);
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }
}
