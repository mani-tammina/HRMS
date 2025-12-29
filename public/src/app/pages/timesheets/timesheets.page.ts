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

  ionViewWillEnter() {
    this.checkAssignment();
    this.loadTimesheets();
  }

  checkAssignment() {
    console.log('Checking project assignment status...');
    this.timesheetService.checkAssignment().subscribe({
      next: (response) => {
        console.log('Assignment status:', response);
        this.hasProjectAssignment = response.has_project;
      },
      error: (error: any) => {
        console.error('Error checking assignment:', error);
      }
    });
  }

  async loadTimesheets(event?: any) {
    console.log('Loading timesheets...');
    if (!event) {
      this.isLoading = true;
    }

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Load regular timesheets
    this.timesheetService.getMyRegularTimesheets(startDate, endDate).subscribe({
      next: (timesheets) => {
        console.log('Timesheets loaded:', timesheets);
        // Filter by status if needed
        if (this.selectedStatus !== 'all') {
          this.timesheets = timesheets.filter((t: any) => t.status === this.selectedStatus);
        } else {
          this.timesheets = timesheets;
        }
        
        this.timesheets = this.timesheets.sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error: any) => {
        console.error('Error loading timesheets:', error);
        this.showToast(error.error?.error || error.error?.message || 'Failed to load timesheets', 'danger');
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

    // Calculate total hours
    const startTime = new Date(`2000-01-01 ${this.newTimesheet.shift_start_time}`);
    const endTime = new Date(`2000-01-01 ${this.newTimesheet.shift_end_time}`);
    const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    const data = {
      date: this.newTimesheet.timesheet_date,
      total_hours: hours || this.newTimesheet.actual_hours_worked,
      hours_breakdown: {
        work_mode: this.newTimesheet.work_mode,
        shift_start: this.newTimesheet.shift_start_time,
        shift_end: this.newTimesheet.shift_end_time,
        regular_hours: this.newTimesheet.actual_hours_worked,
        tasks: this.newTimesheet.tasks_completed
      },
      notes: this.newTimesheet.challenges_faced
    };

    console.log('Submitting timesheet data:', data);

    this.timesheetService.submitRegularTimesheet(data).subscribe({
      next: (response) => {
        console.log('Timesheet submitted:', response);
        loading.dismiss();
        this.showToast(response.message || 'Timesheet submitted successfully', 'success');
        this.closeSubmitModal();
        this.resetForm();
        this.loadTimesheets();
      },
      error: (error: any) => {
        loading.dismiss();
        console.error('Error submitting timesheet:', error);
        const errorMsg = error.error?.error || error.error?.message || error.message || 'Failed to submit timesheet';
        this.showToast(errorMsg, 'danger');
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
