import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonRefresher, IonRefresherContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonIcon,
  IonList, IonItem, IonLabel, IonDatetime, ToastController
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { addIcons } from 'ionicons';
import { 
  peopleOutline, briefcaseOutline, businessOutline, locationOutline, 
  mailOutline, callOutline, analyticsOutline, checkmarkCircleOutline, 
  closeCircleOutline, hourglassOutline, fingerPrintOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonRefresher, IonRefresherContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonIcon,
    IonList, IonItem, IonLabel, IonDatetime
  ]
})
export class TeamPage implements OnInit {
  teamMembers: any[] = [];
  teamInfo: any = null;
  isLoading = false;
  isLoadingAttendance = false;
  selectedDate: string = new Date().toISOString().split('T')[0];
  maxDate: string = new Date().toISOString();
  userRole: string = '';
  isManagerOrHR: boolean = false;
  teamAttendance: any = {
    team_members: [],
    attendance: [],
    date: new Date().toISOString().split('T')[0],
    summary: { total_team: 0, present: 0, absent: 0, on_leave: 0 }
  };

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {
    addIcons({ 
      peopleOutline, briefcaseOutline, businessOutline, locationOutline, 
      mailOutline, callOutline, analyticsOutline, checkmarkCircleOutline, 
      closeCircleOutline, hourglassOutline, fingerPrintOutline 
    });
  }

  ngOnInit() {
    this.loadUserRole();
    this.loadTeamMembers();
    this.loadTeamAttendance();
  }

  loadUserRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role || '';
    this.isManagerOrHR = ['manager', 'hr', 'admin'].includes(this.userRole);
    console.log('User role:', this.userRole, 'isManagerOrHR:', this.isManagerOrHR);
  }

  loadTeamMembers() {
    this.isLoading = true;
    console.log('Loading team members from:', `${environment.apiUrl}/employees/my-team/list`);
    this.http.get<any>(`${environment.apiUrl}/employees/my-team/list`).subscribe({
      next: (response) => {
        console.log('Team members loaded successfully:', response);
        this.teamMembers = response.team || [];
        this.teamInfo = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading team members:', error);
        this.showToast(error.error?.error || error.message || 'Error loading team members', 'danger');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadTeamMembers();
    this.loadTeamAttendance();
    setTimeout(() => event.target.complete(), 1000);
  }

  viewMemberDetails(member: any) {
    console.log('View member details:', member);
    this.showToast(`Viewing ${member.FirstName} ${member.LastName}`, 'primary');
  }

  loadTeamAttendance() {
    this.isLoadingAttendance = true;
    console.log(`Fetching team attendance for date: ${this.selectedDate}`);
    
    this.http.get<any>(`${environment.apiUrl}/attendance/report/team?date=${this.selectedDate}`).subscribe({
      next: (data) => {
        this.teamAttendance = data || {
          team_members: [],
          attendance: [],
          date: this.selectedDate,
          summary: { total_team: 0, present: 0, absent: 0, on_leave: 0 }
        };
        this.isLoadingAttendance = false;
        console.log('Team attendance loaded:', this.teamAttendance);
      },
      error: (error) => {
        this.isLoadingAttendance = false;
        console.error('Error loading team attendance:', error);
        this.showToast(`Error loading team attendance: ${error.error?.error || error.message}`, 'danger');
      }
    });
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value.split('T')[0];
    this.loadTeamAttendance();
  }

  getAttendanceStatusColor(status: string): string {
    const colors: any = {
      'present': 'success',
      'absent': 'danger',
      'on-leave': 'warning',
      'holiday': 'medium',
      'week-off': 'medium'
    };
    return colors[status] || 'medium';
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
