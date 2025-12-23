import { Component, OnInit } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
  IonSegment, IonSegmentButton, IonChip, IonGrid, IonRow, IonCol,
  ToastController, AlertController, LoadingController,
  IonRefresher, IonRefresherContent, IonSearchbar
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  alertCircleOutline, checkmarkCircleOutline, warningOutline, 
  timeOutline, calendarOutline, peopleOutline, documentTextOutline,
  filterOutline, refreshOutline, lockClosedOutline
} from 'ionicons/icons';
import { AdminTimesheetService, DashboardData, NonCompliantEmployee } from '@core/services/admin-timesheet.service';

@Component({
  selector: 'app-admin-timesheet-dashboard',
  templateUrl: './admin-timesheet-dashboard.page.html',
  styleUrls: ['./admin-timesheet-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
    IonSegment, IonSegmentButton, IonChip, IonGrid, IonRow, IonCol,
    IonRefresher, IonRefresherContent, IonSearchbar
  ]
})
export class AdminTimesheetDashboardPage implements OnInit {
  dashboardData: DashboardData[] = [];
  nonCompliantEmployees: NonCompliantEmployee[] = [];
  statistics: any = null;
  selectedView: 'dashboard' | 'non-compliant' | 'payroll' = 'dashboard';
  selectedDate: string = new Date().toISOString().split('T')[0];
  filterStatus: string = 'all';
  searchTerm: string = '';
  isLoading = false;
  payrollStatus: any = null;

  constructor(
    private adminTimesheetService: AdminTimesheetService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ 
      alertCircleOutline, checkmarkCircleOutline, warningOutline,
      timeOutline, calendarOutline, peopleOutline, documentTextOutline,
      filterOutline, refreshOutline, lockClosedOutline
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadDashboard();
    this.loadNonCompliantEmployees();
    this.loadPayrollStatus();
  }

  loadDashboard() {
    const endDate = this.selectedDate;
    const startDate = new Date(new Date(this.selectedDate).getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    this.adminTimesheetService.getDashboard(startDate, endDate).subscribe({
      next: (response) => {
        this.dashboardData = response.dashboard;
        this.statistics = response.statistics;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.showToast('Failed to load dashboard data', 'danger');
      }
    });
  }

  loadNonCompliantEmployees() {
    this.adminTimesheetService.getNonCompliantEmployees(this.selectedDate).subscribe({
      next: (response) => {
        this.nonCompliantEmployees = response.nonCompliantEmployees;
      },
      error: (error) => {
        console.error('Error loading non-compliant employees:', error);
      }
    });
  }

  loadPayrollStatus() {
    this.adminTimesheetService.getPayrollStatus().subscribe({
      next: (response) => {
        this.payrollStatus = response;
      },
      error: (error) => {
        console.error('Error loading payroll status:', error);
      }
    });
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  onViewChange(event: any) {
    this.selectedView = event.detail.value;
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value.split('T')[0];
    this.loadData();
  }

  getTrafficLightColor(status: string): string {
    const colors: { [key: string]: string } = {
      'green': 'success',
      'yellow': 'warning',
      'red': 'danger'
    };
    return colors[status] || 'medium';
  }

  getTrafficLightIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'green': 'checkmark-circle-outline',
      'yellow': 'warning-outline',
      'red': 'alert-circle-outline'
    };
    return icons[status] || 'alert-circle-outline';
  }

  getComplianceStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'compliant': 'success',
      'update_only': 'warning',
      'missing': 'danger',
      'partial': 'warning'
    };
    return colors[status] || 'medium';
  }

  getComplianceStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'compliant': 'Compliant',
      'update_only': 'Update Only',
      'missing': 'Missing',
      'partial': 'Partial'
    };
    return labels[status] || status;
  }

  get filteredDashboard(): DashboardData[] {
    if (this.filterStatus === 'all') {
      return this.dashboardData;
    }
    return this.dashboardData.filter(d => d.traffic_light_status === this.filterStatus);
  }

  get filteredNonCompliant(): NonCompliantEmployee[] {
    let filtered = this.nonCompliantEmployees;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(e => 
        e.first_name.toLowerCase().includes(term) ||
        e.last_name.toLowerCase().includes(term) ||
        e.employee_code.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term) ||
        e.project_name.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  viewProjectDetails(projectId: number, date: string) {
    this.router.navigate(['/admin/timesheet/project-details', projectId], {
      queryParams: { date }
    });
  }

  viewEmployeeDetails(employeeId: number) {
    this.router.navigate(['/admin/timesheet/employee-details', employeeId]);
  }

  navigateToVerificationQueue() {
    this.router.navigate(['/admin/timesheet/verification-queue']);
  }

  async sendReminder(employee: NonCompliantEmployee) {
    const alert = await this.alertController.create({
      header: 'Send Reminder',
      message: `Send reminder to ${employee.first_name} ${employee.last_name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send',
          handler: () => {
            // TODO: Implement send reminder API
            this.showToast('Reminder sent successfully', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

  async lockPayrollPeriod() {
    if (this.payrollStatus?.pendingVerifications?.total_pending > 0) {
      const alert = await this.alertController.create({
        header: 'Cannot Lock Payroll',
        message: `There are ${this.payrollStatus.pendingVerifications.total_pending} pending verifications. Please resolve all pending items before locking the payroll period.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const currentPeriod = new Date().toISOString().slice(0, 7); // YYYY-MM format

    const confirmAlert = await this.alertController.create({
      header: 'Lock Payroll Period',
      message: `Are you sure you want to lock payroll period ${currentPeriod}? This action cannot be undone.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Lock Period',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Locking payroll period...'
            });
            await loading.present();

            this.adminTimesheetService.lockPayrollPeriod(currentPeriod).subscribe({
              next: (response) => {
                loading.dismiss();
                this.showToast(response.message, 'success');
                this.loadPayrollStatus();
              },
              error: (error) => {
                loading.dismiss();
                console.error('Error locking payroll period:', error);
                this.showToast('Failed to lock payroll period', 'danger');
              }
            });
          }
        }
      ]
    });
    await confirmAlert.present();
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
