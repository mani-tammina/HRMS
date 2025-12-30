import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem,
  IonLabel, IonBadge, IonButton, IonIcon, IonRefresher, IonRefresherContent,
  IonButtons, IonBackButton, IonDatetime, ToastController, AlertController
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { addIcons } from 'ionicons';
import { 
  checkmarkCircleOutline, closeCircleOutline, timeOutline, 
  calendarOutline, documentTextOutline, peopleOutline,
  briefcaseOutline, businessOutline, locationOutline, mailOutline, callOutline,
  analyticsOutline, hourglassOutline, fingerPrintOutline, checkmarkCircle,
  closeCircle, calendar, sunny, bed, helpCircle, bugOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-manager-approvals',
  templateUrl: './manager-approvals.page.html',
  styleUrls: ['./manager-approvals.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem,
    IonLabel, IonBadge, IonButton, IonIcon, IonRefresher, IonRefresherContent,
    IonButtons, IonBackButton, IonDatetime
  ]
})
export class ManagerApprovalsPage implements OnInit {
  selectedSegment: 'leaves' | 'timesheets' | 'team' | 'attendance' = 'leaves';
  pendingLeaves: any[] = [];
  pendingTimesheets: any[] = [];
  teamMembers: any[] = [];
  teamInfo: any = null;
  teamAttendance: any = {
    team_members: [],
    attendance: [],
    date: new Date().toISOString().split('T')[0],
    summary: { total_team: 0, present: 0, absent: 0, on_leave: 0 }
  };
  selectedDate: string = new Date().toISOString().split('T')[0];
  maxDate: string = new Date().toISOString();
  isLoading = false;
  isLoadingAttendance = false;
  showDebugInfo = false;

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ 
      checkmarkCircleOutline, closeCircleOutline, timeOutline, 
      calendarOutline, documentTextOutline, peopleOutline,
      briefcaseOutline, businessOutline, locationOutline, mailOutline, callOutline,
      analyticsOutline, hourglassOutline, fingerPrintOutline, checkmarkCircle,
      closeCircle, calendar, sunny, bed, helpCircle, bugOutline
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  loadData() {
    this.loadPendingLeaves();
    this.loadPendingTimesheets();
    this.loadTeamMembers();
    this.loadTeamAttendance();
  }

  loadPendingLeaves() {
    this.http.get<any[]>(`${environment.apiUrl}/leaves/pending`).subscribe({
      next: (leaves) => {
        this.pendingLeaves = leaves;
        console.log('Pending leaves:', leaves);
      },
      error: (error) => {
        console.error('Error loading pending leaves:', error);
        this.showToast('Error loading pending leaves', 'danger');
      }
    });
  }

  loadPendingTimesheets() {
    this.http.get<any[]>(`${environment.apiUrl}/timesheets/manager/pending-timesheets`).subscribe({
      next: (timesheets) => {
        this.pendingTimesheets = timesheets;
        console.log('Pending timesheets:', timesheets);
      },
      error: (error) => {
        console.error('Error loading pending timesheets:', error);
        this.showToast('Error loading pending timesheets', 'danger');
      }
    });
  }

  loadTeamMembers() {
    console.log('Loading team members from:', `${environment.apiUrl}/employees/my-team/list`);
    this.http.get<any>(`${environment.apiUrl}/employees/my-team/list`).subscribe({
      next: (response) => {
        console.log('Team members loaded successfully:', response);
        this.teamMembers = response.team || [];
        this.teamInfo = response;
      },
      error: (error) => {
        console.error('Error loading team members:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        this.showToast(error.error?.error || error.message || 'Error loading team members', 'danger');
      }
    });
  }

  viewMemberDetails(member: any) {
    // Navigate to employee detail page or show modal with details
    console.log('View member details:', member);
    this.showToast(`Viewing ${member.FirstName} ${member.LastName}`, 'primary');
  }

  async approveLeave(leave: any) {
    const alert = await this.alertController.create({
      header: 'Approve Leave',
      message: `Approve leave request for ${leave.FirstName} ${leave.LastName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Approve',
          handler: () => {
            this.isLoading = true;
            this.http.put(`${environment.apiUrl}/leaves/approve/${leave.id}`, {}).subscribe({
              next: () => {
                this.isLoading = false;
                this.showToast('Leave approved successfully', 'success');
                this.loadPendingLeaves();
              },
              error: (error) => {
                this.isLoading = false;
                this.showToast(error.error?.error || 'Error approving leave', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async rejectLeave(leave: any) {
    const alert = await this.alertController.create({
      header: 'Reject Leave',
      message: `Reject leave request for ${leave.FirstName} ${leave.LastName}?`,
      inputs: [
        {
          name: 'rejection_reason',
          type: 'textarea',
          placeholder: 'Rejection reason (optional)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reject',
          handler: (data) => {
            this.isLoading = true;
            this.http.put(`${environment.apiUrl}/leaves/reject/${leave.id}`, {
              rejection_reason: data.rejection_reason
            }).subscribe({
              next: () => {
                this.isLoading = false;
                this.showToast('Leave rejected', 'success');
                this.loadPendingLeaves();
              },
              error: (error) => {
                this.isLoading = false;
                this.showToast(error.error?.error || 'Error rejecting leave', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async approveTimesheet(timesheet: any) {
    const alert = await this.alertController.create({
      header: 'Approve Timesheet',
      message: `Approve timesheet for ${timesheet.FirstName} ${timesheet.LastName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Approve',
          handler: () => {
            this.isLoading = true;
            console.log('Approving timesheet:', timesheet);
            this.http.put(`${environment.apiUrl}/timesheets/manager/approve/${timesheet.id}`, {}).subscribe({
              next: (response) => {
                console.log('Approval response:', response);
                this.isLoading = false;
                this.showToast('Timesheet verified successfully', 'success');
                this.loadPendingTimesheets();
              },
              error: (error) => {
                console.error('Approval error:', error);
                this.isLoading = false;
                const errorMsg = error.error?.error || error.error?.message || error.message || 'Error approving timesheet';
                this.showToast(errorMsg, 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async rejectTimesheet(timesheet: any) {
    const alert = await this.alertController.create({
      header: 'Reject Timesheet',
      message: `Reject timesheet for ${timesheet.FirstName} ${timesheet.LastName}?`,
      inputs: [
        {
          name: 'rejection_reason',
          type: 'textarea',
          placeholder: 'Rejection reason (required)',
          attributes: {
            required: true
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reject',
          handler: (data) => {
            if (!data.rejection_reason?.trim()) {
              this.showToast('Rejection reason is required', 'warning');
              return false;
            }
            this.isLoading = true;
            console.log('Rejecting timesheet:', timesheet);
            this.http.put(`${environment.apiUrl}/timesheets/manager/reject/${timesheet.id}`, {
              rejection_reason: data.rejection_reason
            }).subscribe({
              next: (response) => {
                console.log('Rejection response:', response);
                this.isLoading = false;
                this.showToast('Timesheet rejected', 'success');
                this.loadPendingTimesheets();
              },
              error: (error) => {
                console.error('Rejection error:', error);
                this.isLoading = false;
                const errorMsg = error.error?.error || error.error?.message || error.message || 'Error rejecting timesheet';
                this.showToast(errorMsg, 'danger');
              }
            });
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
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
        console.log('Summary:', this.teamAttendance.summary);
        console.log('Attendance records:', this.teamAttendance.attendance?.length || 0);
      },
      error: (error) => {
        this.isLoadingAttendance = false;
        console.error('Error loading team attendance:', error);
        console.error('Error details:', error.error);
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

  getAttendanceStatusIcon(status: string): string {
    const icons: any = {
      'present': 'checkmark-circle',
      'absent': 'close-circle',
      'on-leave': 'calendar',
      'holiday': 'sunny',
      'week-off': 'bed'
    };
    return icons[status] || 'help-circle';
  }

  toggleDebugInfo() {
    this.showDebugInfo = !this.showDebugInfo;
  }

  getDebugData() {
    return {
      selectedDate: this.selectedDate,
      isLoadingAttendance: this.isLoadingAttendance,
      teamAttendance: this.teamAttendance,
      hasSummary: !!this.teamAttendance?.summary,
      hasAttendance: !!this.teamAttendance?.attendance,
      attendanceCount: this.teamAttendance?.attendance?.length || 0
    };
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
}
