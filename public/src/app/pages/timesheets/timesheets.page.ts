import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
  IonSegment, IonSegmentButton, IonFab, IonFabButton,
  IonSelect, IonSelectOption, IonDatetime, IonModal, IonTextarea, IonInput, IonNote,
  LoadingController, ToastController, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, timeOutline, checkmarkOutline, closeOutline, calendarOutline, briefcaseOutline, cloudUploadOutline, documentTextOutline, checkmarkDoneOutline } from 'ionicons/icons';
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
    IonSelect, IonSelectOption, IonDatetime, IonModal, IonTextarea, IonInput, IonNote
  ]
})
export class TimesheetsPage implements OnInit {
  timesheets: Timesheet[] = [];
  hasProjectAssignment = false;
  projectAssignments: any[] = [];
  isLoading = false;
  selectedStatus = 'all';
  showSubmitModal = false;
  showUploadModal = false;
  selectedFile: File | null = null;
  
  newTimesheet = {
    timesheet_date: new Date().toISOString().split('T')[0],
    project_id: null as number | null,
    work_mode: 'Office',
    shift_start_time: '09:00',
    shift_end_time: '18:00',
    actual_hours_worked: 8,
    tasks_completed: '',
    challenges_faced: ''
  };

  clientTimesheetUpload = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    project_id: null as number | null
  };

  constructor(
    private timesheetService: TimesheetService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ addOutline, timeOutline, checkmarkOutline, closeOutline, calendarOutline, briefcaseOutline, cloudUploadOutline, documentTextOutline, checkmarkDoneOutline });
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
        this.projectAssignments = response.assignments || [];
        
        // Pre-select first project if available
        if (this.projectAssignments.length > 0) {
          this.newTimesheet.project_id = this.projectAssignments[0].project_id;
        }
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

    try {
      // Load both regular and project timesheets in parallel
      const [regularTimesheets, projectTimesheets] = await Promise.all([
        this.timesheetService.getMyRegularTimesheets(startDate, endDate).toPromise(),
        this.timesheetService.getMyProjectTimesheets(startDate, endDate).toPromise()
      ]);

      console.log('Regular timesheets loaded:', regularTimesheets?.length || 0);
      console.log('Project timesheets loaded:', projectTimesheets?.length || 0);

      // Combine both types of timesheets
      let allTimesheets = [
        ...(regularTimesheets || []).map((t: any) => ({ ...t, timesheet_source: 'regular' })),
        ...(projectTimesheets || []).map((t: any) => ({ ...t, timesheet_source: 'project' }))
      ];

      // Filter by status if needed
      if (this.selectedStatus !== 'all') {
        allTimesheets = allTimesheets.filter((t: any) => t.status === this.selectedStatus);
      }

      // Sort by date (newest first)
      this.timesheets = allTimesheets.sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      this.isLoading = false;
      if (event) event.target.complete();
    } catch (error: any) {
      console.error('Error loading timesheets:', error);
      this.showToast(error.error?.error || error.error?.message || 'Failed to load timesheets', 'danger');
      this.isLoading = false;
      if (event) event.target.complete();
    }
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

    // Validate project selection if employee has project assignment
    if (this.hasProjectAssignment && !this.newTimesheet.project_id) {
      this.showToast('Please select a project', 'warning');
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

    console.log('Submitting timesheet data:', { hasProject: this.hasProjectAssignment, projectId: this.newTimesheet.project_id });

    // Submit based on project assignment status
    if (this.hasProjectAssignment && this.newTimesheet.project_id) {
      // Submit project timesheet
      const projectData = {
        date: this.newTimesheet.timesheet_date,
        project_id: this.newTimesheet.project_id,
        total_hours: hours || this.newTimesheet.actual_hours_worked,
        hours_breakdown: {
          work_mode: this.newTimesheet.work_mode,
          shift_start: this.newTimesheet.shift_start_time,
          shift_end: this.newTimesheet.shift_end_time,
          regular_hours: this.newTimesheet.actual_hours_worked,
          tasks: this.newTimesheet.tasks_completed
        },
        work_description: this.newTimesheet.tasks_completed,
        notes: this.newTimesheet.challenges_faced
      };

      this.timesheetService.submitProjectTimesheet(projectData).subscribe({
        next: (response) => {
          console.log('Project timesheet submitted:', response);
          loading.dismiss();
          this.showToast(response.message || 'Project timesheet submitted successfully', 'success');
          this.closeSubmitModal();
          this.resetForm();
          this.loadTimesheets();
        },
        error: (error: any) => {
          loading.dismiss();
          console.error('Error submitting project timesheet:', error);
          const errorMsg = error.error?.error || error.error?.message || error.message || 'Failed to submit timesheet';
          this.showToast(errorMsg, 'danger');
        }
      });
    } else {
      // Submit regular timesheet
      const regularData = {
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

      this.timesheetService.submitRegularTimesheet(regularData).subscribe({
        next: (response) => {
          console.log('Regular timesheet submitted:', response);
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
  }

  resetForm() {
    this.newTimesheet = {
      timesheet_date: new Date().toISOString().split('T')[0],
      project_id: this.projectAssignments.length > 0 ? this.projectAssignments[0].project_id : null,
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

  openUploadModal() {
    if (!this.hasProjectAssignment) {
      this.showToast('Client timesheet upload is only for project-assigned employees', 'warning');
      return;
    }
    this.clientTimesheetUpload.project_id = this.projectAssignments.length > 0 ? this.projectAssignments[0].project_id : null;
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg', 'image/jpg', 'image/png'];
      
      if (!allowedTypes.includes(file.type)) {
        this.showToast('Please upload Excel, PDF, or Image files only', 'danger');
        event.target.value = '';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.showToast('File size must be less than 5MB', 'danger');
        event.target.value = '';
        return;
      }

      this.selectedFile = file;
    }
  }

  async uploadClientTimesheet() {
    if (!this.selectedFile) {
      this.showToast('Please select a file to upload', 'warning');
      return;
    }

    if (!this.clientTimesheetUpload.project_id) {
      this.showToast('Please select a project', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Uploading client timesheet...'
    });
    await loading.present();

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('month', this.clientTimesheetUpload.month.toString());
    formData.append('year', this.clientTimesheetUpload.year.toString());
    formData.append('project_id', this.clientTimesheetUpload.project_id.toString());

    this.timesheetService.uploadClientTimesheet(formData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        this.showToast(response.message || 'Client timesheet uploaded successfully', 'success');
        this.closeUploadModal();
        this.loadTimesheets();
      },
      error: async (error: any) => {
        await loading.dismiss();
        console.error('Error uploading client timesheet:', error);
        const errorMsg = error.error?.error || error.error?.message || 'Failed to upload client timesheet';
        this.showToast(errorMsg, 'danger');
      }
    });
  }

  getMonthName(month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  }

  getClientTimesheetStatusColor(status: string): string {
    switch (status) {
      case 'validated': return 'success';
      case 'pending_validation': return 'warning';
      case 'rejected': return 'danger';
      default: return 'medium';
    }
  }

  getClientTimesheetStatusLabel(status: string): string {
    switch (status) {
      case 'validated': return 'Validated';
      case 'pending_validation': return 'Pending Validation';
      case 'rejected': return 'Rejected';
      default: return 'Not Uploaded';
    }
  }
}
