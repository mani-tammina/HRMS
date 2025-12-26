import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
  IonSegment, IonSegmentButton, IonFab, IonFabButton,
  IonSelect, IonSelectOption, IonDatetime, IonModal, IonTextarea, IonInput,
  LoadingController, ToastController, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, timeOutline, checkmarkOutline, closeOutline, calendarOutline } from 'ionicons/icons';
import { TimesheetService, Timesheet, ProjectTimesheet } from '@core/services/timesheet.service';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.page.html',
  styleUrls: ['./timesheets.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
    IonSegment, IonSegmentButton, IonFab, IonFabButton,
    IonSelect, IonSelectOption, IonDatetime, IonModal, IonTextarea, IonInput
  ]
})
export class TimesheetsPage implements OnInit {
  timesheets: Timesheet[] = [];
  hasProjectAssignment = false;
  isLoading = false;
  selectedStatus = 'all';
  showSubmitModal = false;
  
  newTimesheet = {
    timesheet_date: new Date().toISOString().split('T')[0],
    work_mode: 'Office',
    shift_start_time: '09:00',
    shift_end_time: '18:00',
    actual_hours_worked: 8,
    tasks_completed: '',
    challenges_faced: ''
  };

  constructor(
    private timesheetService: TimesheetService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ addOutline, timeOutline, checkmarkOutline, closeOutline, calendarOutline });
  }

  ngOnInit() {
    this.checkAssignment();
    this.loadTimesheets();
  }

  checkAssignment() {
    this.timesheetService.checkAssignment().subscribe({
      next: (response) => {
        this.hasProjectAssignment = response.hasAssignment;
      },
      error: (error: Error) => {
        console.error('Error checking assignment:', error);
      }
    });
  }

  async loadTimesheets(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const status = this.selectedStatus !== 'all' ? this.selectedStatus : undefined;

    this.timesheetService.getMyTimesheets(startDate, endDate, status).subscribe({
      next: (response) => {
        this.timesheets = response.timesheets.sort((a, b) => 
          new Date(b.timesheet_date).getTime() - new Date(a.timesheet_date).getTime()
        );
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error: Error) => {
        console.error('Error loading timesheets:', error);
        this.showToast('Failed to load timesheets', 'danger');
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  segmentChanged(event: any) {
    this.selectedStatus = event.detail.value;
    this.loadTimesheets();
  }

  openSubmitModal() {
    this.showSubmitModal = true;
  }

  closeSubmitModal() {
    this.showSubmitModal = false;
  }

  async submitTimesheet() {
    if (!this.newTimesheet.tasks_completed.trim()) {
      this.showToast('Please enter tasks completed', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Submitting timesheet...'
    });
    await loading.present();

    this.timesheetService.submitRegularTimesheet(this.newTimesheet).subscribe({
      next: (response) => {
        loading.dismiss();
        this.showToast('Timesheet submitted successfully', 'success');
        this.closeSubmitModal();
        this.resetForm();
        this.loadTimesheets();
      },
      error: (error: Error) => {
        loading.dismiss();
        console.error('Error submitting timesheet:', error);
        this.showToast('Failed to submit timesheet', 'danger');
      }
    });
  }

  resetForm() {
    this.newTimesheet = {
      timesheet_date: new Date().toISOString().split('T')[0],
      work_mode: 'Office',
      shift_start_time: '09:00',
      shift_end_time: '18:00',
      actual_hours_worked: 8,
      tasks_completed: '',
      challenges_faced: ''
    };
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      case 'draft': return 'medium';
      default: return 'medium';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
