import { Component, OnInit } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSegment, IonSegmentButton,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
  IonChip, IonSearchbar, IonDatetime, IonModal,
  ToastController, AlertController, LoadingController,
  IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  checkmarkCircleOutline, alertCircleOutline, closeCircleOutline,
  eyeOutline, searchOutline, filterOutline, calendarOutline,
  statsChartOutline, peopleOutline, briefcaseOutline
} from 'ionicons/icons';
import { AdminTimesheetService } from '@core/services/admin-timesheet.service';

interface DashboardData {
  project_id: number;
  project_name: string;
  client_name: string;
  compliance_date: string;
  total_employees: number;
  compliant_count: number;
  update_only_count: number;
  missing_count: number;
  traffic_light_status: 'green' | 'yellow' | 'red';
}

interface Statistics {
  total_projects: number;
  total_employees_tracked: number;
  total_compliant: number;
  total_update_only: number;
  total_missing: number;
}

@Component({
  selector: 'app-admin-compliance-dashboard',
  templateUrl: './admin-compliance-dashboard.page.html',
  styleUrls: ['./admin-compliance-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSegment, IonSegmentButton,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
    IonChip, IonSearchbar, IonDatetime, IonModal,
    IonRefresher, IonRefresherContent
  ]
})
export class AdminComplianceDashboardPage implements OnInit {
  dashboardData: DashboardData[] = [];
  filteredData: DashboardData[] = [];
  statistics: Statistics = {
    total_projects: 0,
    total_employees_tracked: 0,
    total_compliant: 0,
    total_update_only: 0,
    total_missing: 0
  };

  // Filters
  selectedDate: string = new Date().toISOString();
  selectedStatus: string = 'all';
  searchText: string = '';
  showFilters: boolean = false;

  // Segment
  viewMode: string = 'summary';

  isLoading: boolean = false;

  constructor(
    private adminTimesheetService: AdminTimesheetService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ 
      checkmarkCircleOutline, alertCircleOutline, closeCircleOutline,
      eyeOutline, searchOutline, filterOutline, calendarOutline,
      statsChartOutline, peopleOutline, briefcaseOutline
    });
  }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.isLoading = true;
    const date = new Date(this.selectedDate).toISOString().split('T')[0];
    
    this.adminTimesheetService.getComplianceDashboard(date, date).subscribe({
      next: (response) => {
        this.dashboardData = response.dashboard;
        this.statistics = response.statistics;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.showToast('Failed to load compliance dashboard', 'danger');
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    this.filteredData = this.dashboardData.filter(item => {
      // Status filter
      if (this.selectedStatus !== 'all' && item.traffic_light_status !== this.selectedStatus) {
        return false;
      }

      // Search filter
      if (this.searchText) {
        const search = this.searchText.toLowerCase();
        return item.project_name.toLowerCase().includes(search) ||
               item.client_name.toLowerCase().includes(search);
      }

      return true;
    });
  }

  handleRefresh(event: any) {
    this.loadDashboard();
    setTimeout(() => event.target.complete(), 1000);
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.loadDashboard();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.detail.value;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchText = event.detail.value;
    this.applyFilters();
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
      'yellow': 'alert-circle-outline',
      'red': 'close-circle-outline'
    };
    return icons[status] || 'help-circle-outline';
  }

  getCompliancePercentage(item: DashboardData): number {
    if (item.total_employees === 0) return 0;
    return Math.round((item.compliant_count / item.total_employees) * 100);
  }

  viewProjectDetails(projectId: number) {
    // Navigate to detailed view
    console.log('View project details:', projectId);
  }

  async viewNonCompliantEmployees() {
    const date = new Date(this.selectedDate).toISOString().split('T')[0];
    
    const loading = await this.loadingController.create({
      message: 'Loading non-compliant employees...'
    });
    await loading.present();

    this.adminTimesheetService.getNonCompliantEmployees(date).subscribe({
      next: (response) => {
        loading.dismiss();
        // Show modal or navigate to details page
        console.log('Non-compliant employees:', response.nonCompliantEmployees);
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error loading non-compliant employees:', error);
        this.showToast('Failed to load non-compliant employees', 'danger');
      }
    });
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

  getTotalCompliance(): number {
    const total = this.statistics.total_employees_tracked;
    if (total === 0) return 0;
    return Math.round((this.statistics.total_compliant / total) * 100);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
