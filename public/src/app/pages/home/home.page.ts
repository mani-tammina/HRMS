import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonGrid, IonRow, IonCol, IonIcon, IonBadge, IonRefresher, IonRefresherContent,
  IonAvatar, IonMenuButton, ToastController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@core/services/auth.service';
import { AttendanceService } from '@core/services/attendance.service';
import { LeaveService } from '@core/services/leave.service';
import { EmployeeService, Employee } from '@core/services/employee.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { 
  notificationsOutline, calendarOutline, timeOutline, 
  documentTextOutline, peopleOutline, trendingUpOutline,
  checkmarkCircleOutline, closeCircleOutline, hourglassOutline,
  settingsOutline, cloudUploadOutline, shieldOutline
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
    IonAvatar, IonMenuButton
  ]
})
export class HomePage implements OnInit, OnDestroy {
  user: User | null = null;
  isAdmin: boolean = false;
  todayAttendance: any = null;
  todayStatus: any = null;
  currentTime: string = '';
  private userSubscription?: Subscription;
  isLoading = false;
  canPunchIn = true;
  canPunchOut = false;
  currentEmployee: any = null;
  teamMembers: Employee[] = [];
  leaveBalances: any[] = [];
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
    private employeeService: EmployeeService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ 
      notificationsOutline, calendarOutline, timeOutline, 
      documentTextOutline, peopleOutline, trendingUpOutline,
      settingsOutline, cloudUploadOutline, shieldOutline
    });
  }

  ngOnInit() {
    // Subscribe to user changes to update role dynamically
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isAdmin = user?.role === 'admin' || user?.role === 'hr';
      console.log('Home: User role updated:', user?.role, 'isAdmin:', this.isAdmin);
    });
    
    this.updateTime();
    this.loadData();
    
    // Update time every minute
    setInterval(() => this.updateTime(), 60000);
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
    console.log('Loading dashboard data...');
    
    // Load current employee profile
    this.employeeService.getMyProfile().subscribe({
      next: (profile) => {
        console.log('Current employee profile:', profile);
        this.currentEmployee = profile;
        
        // If user is a manager, load team members
        if (this.user?.role === 'manager' || this.isAdmin) {
          this.loadTeamMembers(profile.id);
        }
      },
      error: (error) => console.error('Error loading profile:', error)
    });

    // Load attendance
    this.attendanceService.getTodayStatus().subscribe({
      next: (response) => {
        console.log('Today status data:', response);
        this.todayStatus = response;
        this.canPunchIn = response.can_punch_in !== false;
        this.canPunchOut = response.can_punch_out === true;
        
        if (response.has_attendance) {
          this.todayAttendance = response.attendance;
          const totalHours = response.attendance.gross_hours || response.attendance.total_work_hours || 0;
          const hours = Math.floor(totalHours);
          const minutes = Math.round((totalHours - hours) * 60);
          this.stats.workHours = `${hours}h ${minutes}m`;
        } else {
          this.todayAttendance = null;
          this.stats.workHours = '0h 0m';
        }
      },
      error: (error) => console.error('Error loading attendance:', error)
    });

    // Load leave balance with details
    this.leaveService.getLeaveBalance().subscribe({
      next: (balance: any) => {
        console.log('Leave balance data:', balance);
        this.stats.leavesUsed = balance.used || 0;
        this.stats.attendanceRate = balance.attendanceRate || 0;
        
        // Store detailed leave balances for display
        if (balance.balances && Array.isArray(balance.balances)) {
          this.leaveBalances = balance.balances;
        } else if (balance.leave_balances && Array.isArray(balance.leave_balances)) {
          this.leaveBalances = balance.leave_balances;
        }
      },
      error: (error) => console.error('Error loading leave balance:', error)
    });

    // Load pending leaves count
    this.leaveService.getLeaves().subscribe({
      next: (leaves) => {
        this.stats.leavesPending = leaves.filter(l => l.status === 'pending').length;
      },
      error: (error) => console.error('Error loading leaves:', error)
    });
  }

  loadTeamMembers(managerId: string) {
    this.employeeService.getTeamMembers(managerId).subscribe({
      next: (members) => {
        console.log('Team members:', members);
        this.teamMembers = members.slice(0, 5); // Show only first 5
      },
      error: (error) => console.error('Error loading team members:', error)
    });
  }

  formatTime(dateString: string): string {
    if (!dateString) return '--:--';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  get formattedCheckIn(): string {
    return this.formatTime(this.todayAttendance?.check_in || this.todayAttendance?.first_check_in);
  }

  get formattedCheckOut(): string {
    return this.formatTime(this.todayAttendance?.check_out || this.todayAttendance?.last_check_out);
  }

  get canCheckOut(): boolean {
    return this.todayAttendance && !this.todayAttendance.check_out && !this.todayAttendance.last_check_out;
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

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/avatar-placeholder.png';
  }

  async punchIn() {
    this.isLoading = true;
    this.canPunchIn = false; // Immediately disable to prevent double-click
    console.log('HomePage: Punching in...');
    this.attendanceService.punchIn('Office').subscribe({
      next: async (response) => {
        console.log('HomePage: Punch-in response:', response);
        await this.showToast(response.message || 'Punched in successfully!', 'success');
        // Reload data to get updated status
        this.loadData();
        this.isLoading = false;
      },
      error: async (error) => {
        console.error('HomePage: Punch-in error:', error);
        this.canPunchIn = true; // Re-enable on error
        this.isLoading = false;
        await this.showToast(error.error?.error || error.error?.message || 'Punch-in failed', 'danger');
      }
    });
  }

  async punchOut() {
    this.isLoading = true;
    this.canPunchOut = false; // Immediately disable to prevent double-click
    console.log('HomePage: Punching out...');
    this.attendanceService.punchOut().subscribe({
      next: async (response) => {
        console.log('HomePage: Punch-out response:', response);
        await this.showToast(response.message || 'Punched out successfully!', 'success');
        // Reload data to get updated status
        this.loadData();
        this.isLoading = false;
      },
      error: async (error) => {
        console.error('HomePage: Punch-out error:', error);
        this.canPunchOut = true; // Re-enable on error
        this.isLoading = false;
        await this.showToast(error.error?.error || error.error?.message || 'Punch-out failed', 'danger');
      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  getLeaveIcon(typeCode: string): string {
    const iconMap: { [key: string]: string } = {
      'AL': 'sunny-outline',
      'PL': 'sunny-outline',
      'SL': 'medical-outline',
      'ML': 'medical-outline',
      'CL': 'home-outline',
      'LWP': 'close-circle-outline',
      'UL': 'close-circle-outline'
    };
    return iconMap[typeCode] || 'calendar-outline';
  }
}
