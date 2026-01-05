import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
  IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton,
  IonSearchbar, IonSelect, IonSelectOption, IonCheckbox, AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  statsChartOutline, peopleOutline, checkmarkCircleOutline, alertCircleOutline,
  sendOutline, closeOutline, timeOutline, trendingUpOutline, trendingDownOutline,
  refreshOutline, downloadOutline, lockClosedOutline, lockOpenOutline
} from 'ionicons/icons';
import { ComplianceService, ComplianceDashboard } from '@core/services/compliance.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-compliance-dashboard',
  templateUrl: './compliance-dashboard.page.html',
  styleUrls: ['./compliance-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
    IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton,
    IonSearchbar, IonSelect, IonSelectOption, IonCheckbox,
    LoadingComponent
  ]
})
export class ComplianceDashboardPage implements OnInit {
  dashboard: ComplianceDashboard | null = null;
  isLoading = true;
  selectedSegment: 'overview' | 'non-compliant' | 'trends' = 'overview';
  searchTerm = '';
  selectedEmployees: number[] = [];

  constructor(
    private complianceService: ComplianceService,
    private errorHandler: ErrorHandlerService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      statsChartOutline, peopleOutline, checkmarkCircleOutline, alertCircleOutline,
      sendOutline, closeOutline, timeOutline, trendingUpOutline, trendingDownOutline,
      refreshOutline, downloadOutline, lockClosedOutline, lockOpenOutline
    });
  }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.isLoading = true;
    this.complianceService.getAdminDashboard().subscribe({
      next: (response) => {
        this.dashboard = response.dashboard;
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load dashboard');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadDashboard();
    setTimeout(() => event.target.complete(), 1000);
  }

  async sendReminders(employeeIds?: number[]) {
    const alert = await this.alertController.create({
      header: 'Send Reminders',
      message: employeeIds ? 
        `Send reminders to ${employeeIds.length} selected employees?` :
        'Send reminders to all non-compliant employees?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send',
          handler: () => this.confirmSendReminders(employeeIds)
        }
      ]
    });
    await alert.present();
  }

  async confirmSendReminders(employeeIds?: number[]) {
    try {
      const response = await this.complianceService.sendReminders(undefined, employeeIds).toPromise();
      
      const toast = await this.toastController.create({
        message: response.message || 'Reminders sent successfully',
        duration: 3000,
        color: 'success'
      });
      await toast.present();

      this.selectedEmployees = [];
      this.loadDashboard();
    } catch (error: any) {
      await this.errorHandler.handleError(error, 'Failed to send reminders');
    }
  }

  toggleEmployeeSelection(employeeId: number) {
    const index = this.selectedEmployees.indexOf(employeeId);
    if (index > -1) {
      this.selectedEmployees.splice(index, 1);
    } else {
      this.selectedEmployees.push(employeeId);
    }
  }

  isEmployeeSelected(employeeId: number): boolean {
    return this.selectedEmployees.includes(employeeId);
  }

  selectAll() {
    if (this.dashboard?.today.non_compliant_employees) {
      this.selectedEmployees = this.dashboard.today.non_compliant_employees.map(e => e.id);
    }
  }

  deselectAll() {
    this.selectedEmployees = [];
  }

  get filteredNonCompliant() {
    if (!this.dashboard?.today.non_compliant_employees) return [];
    
    if (!this.searchTerm) {
      return this.dashboard.today.non_compliant_employees;
    }

    const term = this.searchTerm.toLowerCase();
    return this.dashboard.today.non_compliant_employees.filter(emp =>
      emp.name.toLowerCase().includes(term) ||
      emp.EmployeeNumber.toLowerCase().includes(term) ||
      emp.department?.toLowerCase().includes(term)
    );
  }

  getComplianceRateColor(rate: number): string {
    if (rate >= 95) return 'success';
    if (rate >= 80) return 'warning';
    return 'danger';
  }

  getTrendIcon(trends: any[]): string {
    if (trends.length < 2) return 'timeOutline';
    const latest = trends[0].rate;
    const previous = trends[1].rate;
    return latest > previous ? 'trendingUpOutline' : 'trendingDownOutline';
  }

  getTrendColor(trends: any[]): string {
    if (trends.length < 2) return 'medium';
    const latest = trends[0].rate;
    const previous = trends[1].rate;
    return latest > previous ? 'success' : 'danger';
  }

  async closeMonth() {
    const alert = await this.alertController.create({
      header: 'Close Month',
      message: 'Are you sure you want to close the current month? This will lock all timesheets.',
      inputs: [
        {
          name: 'month',
          type: 'number',
          placeholder: 'Month (1-12)',
          value: new Date().getMonth() + 1
        },
        {
          name: 'year',
          type: 'number',
          placeholder: 'Year',
          value: new Date().getFullYear()
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Close Month',
          handler: (data) => this.confirmCloseMonth(data.month, data.year)
        }
      ]
    });
    await alert.present();
  }

  async confirmCloseMonth(month: number, year: number) {
    try {
      const response = await this.complianceService.closeMonth(month, year).toPromise();
      
      const toast = await this.toastController.create({
        message: response.message || 'Month closed successfully',
        duration: 3000,
        color: 'success'
      });
      await toast.present();

      this.loadDashboard();
    } catch (error: any) {
      await this.errorHandler.handleError(error, 'Failed to close month');
    }
  }

  exportReport() {
    // TODO: Implement export functionality
    console.log('Export report');
  }
}
