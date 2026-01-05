import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
  IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton,
  IonSearchbar, IonSelect, IonSelectOption, AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  statsChartOutline, peopleOutline, checkmarkCircleOutline, alertCircleOutline,
  sendOutline, refreshOutline, calendarOutline, timeOutline
} from 'ionicons/icons';
import { ComplianceService } from '@core/services/compliance.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-team-compliance',
  templateUrl: './team-compliance.page.html',
  styleUrls: ['./team-compliance.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
    IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton,
    IonSearchbar, IonSelect, IonSelectOption,
    LoadingComponent
  ]
})
export class TeamCompliancePage implements OnInit {
  isLoading = true;
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedSegment: 'today' | 'week' | 'month' = 'today';
  
  // Today's data
  nonCompliantEmployees: any[] = [];
  todayStats = {
    total: 0,
    submitted: 0,
    pending: 0,
    compliance_rate: 0
  };

  // History data
  teamHistory: any[] = [];
  searchTerm = '';

  constructor(
    private complianceService: ComplianceService,
    private errorHandler: ErrorHandlerService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      statsChartOutline, peopleOutline, checkmarkCircleOutline, alertCircleOutline,
      sendOutline, refreshOutline, calendarOutline, timeOutline
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.selectedSegment === 'today') {
      this.loadTodayCompliance();
    } else {
      this.loadTeamHistory();
    }
  }

  loadTodayCompliance() {
    this.isLoading = true;
    this.complianceService.getNonCompliantEmployees(this.selectedDate).subscribe({
      next: (response) => {
        this.nonCompliantEmployees = response.employees || [];
        
        // Calculate stats
        const total = response.employees?.length || 0;
        const submitted = 0; // This would come from a different endpoint
        const pending = total;
        
        this.todayStats = {
          total,
          submitted,
          pending,
          compliance_rate: total > 0 ? ((submitted / total) * 100) : 100
        };
        
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load team compliance');
        this.isLoading = false;
      }
    });
  }

  loadTeamHistory() {
    this.isLoading = true;
    
    // Calculate date range based on selected segment
    const endDate = new Date();
    const startDate = new Date();
    
    if (this.selectedSegment === 'week') {
      startDate.setDate(endDate.getDate() - 7);
    } else if (this.selectedSegment === 'month') {
      startDate.setMonth(endDate.getMonth() - 1);
    }

    // For now, load non-compliant for today as example
    // In production, you'd have a dedicated endpoint for team history
    this.loadTodayCompliance();
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  onSegmentChange() {
    this.loadData();
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    if (this.selectedSegment === 'today') {
      this.loadTodayCompliance();
    }
  }

  async sendReminder(employee: any) {
    const alert = await this.alertController.create({
      header: 'Send Reminder',
      message: `Send timesheet reminder to ${employee.name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send',
          handler: () => this.confirmSendReminder(employee)
        }
      ]
    });
    await alert.present();
  }

  async confirmSendReminder(employee: any) {
    try {
      const response = await this.complianceService.sendReminders(
        this.selectedDate,
        [employee.id]
      ).toPromise();
      
      const toast = await this.toastController.create({
        message: `Reminder sent to ${employee.name}`,
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      // Reload data to update reminder count
      this.loadTodayCompliance();
    } catch (error: any) {
      await this.errorHandler.handleError(error, 'Failed to send reminder');
    }
  }

  async sendBulkReminders() {
    if (this.nonCompliantEmployees.length === 0) return;

    const alert = await this.alertController.create({
      header: 'Send Bulk Reminders',
      message: `Send reminders to all ${this.nonCompliantEmployees.length} non-compliant team members?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send All',
          handler: () => this.confirmBulkReminders()
        }
      ]
    });
    await alert.present();
  }

  async confirmBulkReminders() {
    try {
      const employeeIds = this.nonCompliantEmployees.map(e => e.id);
      const response = await this.complianceService.sendReminders(
        this.selectedDate,
        employeeIds
      ).toPromise();
      
      const toast = await this.toastController.create({
        message: response.message || 'Reminders sent successfully',
        duration: 3000,
        color: 'success'
      });
      await toast.present();

      this.loadTodayCompliance();
    } catch (error: any) {
      await this.errorHandler.handleError(error, 'Failed to send reminders');
    }
  }

  get filteredEmployees() {
    if (!this.searchTerm) {
      return this.nonCompliantEmployees;
    }

    const term = this.searchTerm.toLowerCase();
    return this.nonCompliantEmployees.filter(emp =>
      emp.name?.toLowerCase().includes(term) ||
      emp.EmployeeNumber?.toLowerCase().includes(term) ||
      emp.department?.toLowerCase().includes(term)
    );
  }

  getComplianceRateColor(rate: number): string {
    if (rate >= 95) return 'success';
    if (rate >= 80) return 'warning';
    return 'danger';
  }

  getReminderBadgeColor(count: number): string {
    if (count === 0) return 'medium';
    if (count <= 2) return 'warning';
    return 'danger';
  }
}
