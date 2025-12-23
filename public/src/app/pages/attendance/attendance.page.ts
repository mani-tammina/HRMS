import { Component, OnInit } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge,
  ToastController, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AttendanceService, Attendance } from '@core/services/attendance.service';
import { addIcons } from 'ionicons';
import { logInOutline, logOutOutline, timeOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge,
    IonRefresher, IonRefresherContent
  ]
})
export class AttendancePage implements OnInit {
  todayAttendance: Attendance | null = null;
  recentAttendance: Attendance[] = [];
  isLoading = false;

  constructor(
    private attendanceService: AttendanceService,
    private toastController: ToastController
  ) {
    addIcons({ logInOutline, logOutOutline, timeOutline, calendarOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.attendanceService.getTodayAttendance().subscribe({
      next: (attendance) => this.todayAttendance = attendance
    });

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    this.attendanceService.getAttendance(startDate, endDate).subscribe({
      next: (attendance) => this.recentAttendance = attendance
    });
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  async checkIn() {
    this.isLoading = true;
    this.attendanceService.checkIn().subscribe({
      next: async (attendance) => {
        this.todayAttendance = attendance;
        this.isLoading = false;
        await this.showToast('Checked in successfully!', 'success');
        this.loadData();
      },
      error: async (error) => {
        this.isLoading = false;
        await this.showToast(error.error?.message || 'Check-in failed', 'danger');
      }
    });
  }

  async checkOut() {
    this.isLoading = true;
    this.attendanceService.checkOut().subscribe({
      next: async (attendance) => {
        this.todayAttendance = attendance;
        this.isLoading = false;
        await this.showToast('Checked out successfully!', 'success');
        this.loadData();
      },
      error: async (error) => {
        this.isLoading = false;
        await this.showToast(error.error?.message || 'Check-out failed', 'danger');
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'present': 'success',
      'late': 'warning',
      'absent': 'danger',
      'half-day': 'medium'
    };
    return colors[status] || 'medium';
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
