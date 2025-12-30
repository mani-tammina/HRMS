import { Component, OnInit } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge,
  ToastController, IonRefresher, IonRefresherContent,
  IonModal, IonButtons, IonRadioGroup, IonRadio, IonText
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AttendanceService, Attendance } from '@core/services/attendance.service';
import { environment } from '@env/environment';
import { addIcons } from 'ionicons';
import { logInOutline, logOutOutline, timeOutline, calendarOutline, businessOutline, homeOutline, globeOutline, close } from 'ionicons/icons';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge,
    IonRefresher, IonRefresherContent, IonModal, IonButtons,
    IonRadioGroup, IonRadio, IonText
  ]
})
export class AttendancePage implements OnInit {
  todayAttendance: any = null;
  todayStatus: any = null;
  recentAttendance: any[] = [];
  isLoading = false;
  canPunchIn = true;
  canPunchOut = false;
  selectedWorkMode: 'Office' | 'WFH' | 'Remote' | 'Hybrid' = 'Office';
  showWorkModeModal = false;

  constructor(
    private attendanceService: AttendanceService,
    private toastController: ToastController,
    private http: HttpClient
  ) {
    addIcons({ logInOutline, logOutOutline, timeOutline, calendarOutline, businessOutline, homeOutline, globeOutline, close });
  }

  ngOnInit() {
    this.loadData();
    this.checkWFHStatus();
  }

  ionViewWillEnter() {
    this.loadData();
    this.checkWFHStatus();
  }

  checkWFHStatus() {
    this.http.get<any>(`${environment.apiUrl}/leaves/wfh-check-today`).subscribe({
      next: (response) => {
        if (response.has_wfh) {
          this.selectedWorkMode = response.work_mode;
          console.log('Approved WFH/Remote found for today, defaulting to:', response.work_mode);
        } else {
          this.selectedWorkMode = 'Office';
        }
      },
      error: (error) => {
        console.error('Error checking WFH status:', error);
        this.selectedWorkMode = 'Office';
      }
    });
  }

  loadData() {
    console.log('AttendancePage: Loading attendance data...');
    
    // Get today's status
    this.attendanceService.getTodayStatus().subscribe({
      next: (response) => {
        console.log('AttendancePage: Today status:', response);
        this.todayStatus = response;
        this.todayAttendance = response.attendance;
        this.canPunchIn = response.can_punch_in !== false;
        this.canPunchOut = response.can_punch_out === true;
      },
      error: (error) => {
        console.error('AttendancePage: Error loading today status:', error);
        this.showToast('Failed to load today\'s attendance', 'danger');
      }
    });

    // Get recent attendance
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    console.log('AttendancePage: Loading recent attendance from', startDate, 'to', endDate);
    this.attendanceService.getAttendance(startDate, endDate).subscribe({
      next: (attendance) => {
        console.log('AttendancePage: Recent attendance loaded:', attendance);
        this.recentAttendance = attendance;
      },
      error: (error) => {
        console.error('AttendancePage: Error loading recent attendance:', error);
        this.showToast('Failed to load attendance history', 'danger');
      }
    });
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  async punchIn() {
    this.isLoading = true;
    console.log('AttendancePage: Punching in with work mode:', this.selectedWorkMode);
    this.attendanceService.punchIn(this.selectedWorkMode).subscribe({
      next: async (response) => {
        console.log('AttendancePage: Punch-in response:', response);
        this.isLoading = false;
        this.showWorkModeModal = false;
        await this.showToast(response.message || 'Punched in successfully!', 'success');
        this.loadData();
      },
      error: async (error) => {
        console.error('AttendancePage: Punch-in error:', error);
        this.isLoading = false;
        await this.showToast(error.error?.error || error.error?.message || 'Punch-in failed', 'danger');
      }
    });
  }

  openWorkModeModal() {
    // Check WFH status before opening modal
    this.http.get<any>(`${environment.apiUrl}/leaves/wfh-check-today`).subscribe({
      next: (response) => {
        if (response.has_wfh) {
          this.selectedWorkMode = response.work_mode;
        }
        this.showWorkModeModal = true;
      },
      error: (error) => {
        console.error('Error checking WFH status:', error);
        this.showWorkModeModal = true;
      }
    });
  }

  closeWorkModeModal() {
    this.showWorkModeModal = false;
    this.selectedWorkMode = 'Office'; // Reset to default
  }

  confirmPunchIn() {
    this.punchIn();
  }

  async punchOut() {
    this.isLoading = true;
    console.log('AttendancePage: Punching out...');
    this.attendanceService.punchOut().subscribe({
      next: async (response) => {
        console.log('AttendancePage: Punch-out response:', response);
        this.isLoading = false;
        await this.showToast(response.message || 'Punched out successfully!', 'success');
        this.loadData();
      },
      error: async (error) => {
        console.error('AttendancePage: Punch-out error:', error);
        this.isLoading = false;
        await this.showToast(error.error?.error || error.error?.message || 'Punch-out failed', 'danger');
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
