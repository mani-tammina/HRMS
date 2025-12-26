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
    console.log('Loading attendance data...');
    this.attendanceService.getTodayAttendance().subscribe({
      next: (attendance) => {
        console.log('Today attendance loaded:', attendance);
        this.todayAttendance = attendance;
      },
      error: (error) => {
        console.error('Error loading today attendance:', error);
      }
    });

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    console.log('Loading recent attendance from', startDate, 'to', endDate);
    this.attendanceService.getAttendance(startDate, endDate).subscribe({
      next: (attendance) => {
        console.log('Recent attendance loaded:', attendance);
        this.recentAttendance = attendance;
      },
      error: (error) => {
        console.error('Error loading recent attendance:', error);
      }
    });
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  async checkIn() {
    this.isLoading = true;
    console.log('Checking in...');
    this.attendanceService.checkIn().subscribe({
      next: async (response) => {
        console.log('Check-in response:', response);
        this.isLoading = false;
        await this.showToast(response.message || 'Checked in successfully!', 'success');
        this.loadData();
      },
      error: async (error) => {
        console.error('Check-in error:', error);
        this.isLoading = false;
        await this.showToast(error.error?.error || 'Check-in failed', 'danger');
      }
    });
  }

  async checkOut() {
    this.isLoading = true;
    console.log('Checking out...');
    this.attendanceService.checkOut().subscribe({
      next: async (response) => {
        console.log('Check-out response:', response);
        this.isLoading = false;
        await this.showToast(response.message || 'Checked out successfully!', 'success');
        this.loadData();
      },
      error: async (error) => {
        console.error('Check-out error:', error);
        this.isLoading = false;
        await this.showToast(error.error?.error || 'Check-out failed', 'danger');
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
