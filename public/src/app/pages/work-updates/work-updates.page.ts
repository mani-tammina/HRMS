import { Component, OnInit } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
  IonInput, IonTextarea, IonDatetime, IonModal, IonChip,
  ToastController, AlertController, LoadingController,
  IonRefresher, IonRefresherContent, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  addOutline, documentTextOutline, cloudUploadOutline, timeOutline, 
  checkmarkCircleOutline, alertCircleOutline, closeCircleOutline, 
  calendarOutline, briefcaseOutline 
} from 'ionicons/icons';
import { WorkUpdatesService } from '@core/services/work-updates.service';

interface Project {
  assignment_id: number;
  project_id: number;
  project_code: string;
  project_name: string;
  client_name: string;
  shift_id: number;
  shift_name: string;
  shift_type: string;
  start_time: string;
  end_time: string;
  timezone: string;
}

interface WorkUpdate {
  id: number;
  project_name: string;
  client_name: string;
  update_date: string;
  hours_worked: number;
  work_description: string;
  status: string;
  timesheet_id?: number;
  file_name?: string;
  is_verified: boolean;
  verification_status?: string;
}

@Component({
  selector: 'app-work-updates',
  templateUrl: './work-updates.page.html',
  styleUrls: ['./work-updates.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
    IonInput, IonTextarea, IonDatetime, IonModal, IonChip,
    IonRefresher, IonRefresherContent, IonFab, IonFabButton
  ]
})
export class WorkUpdatesPage implements OnInit {
  projects: Project[] = [];
  workUpdates: WorkUpdate[] = [];
  selectedProject: Project | null = null;
  isLoading = false;
  showSubmitModal = false;
  maxDate = new Date().toISOString();
  currentDate = new Date().toISOString();

  // Form data
  updateForm = {
    projectId: null as number | null,
    shiftId: null as number | null,
    updateDate: new Date().toISOString(),
    shiftStartTime: '',
    shiftEndTime: '',
    hoursWorked: 0,
    workDescription: '',
    tasksCompleted: '',
    challengesFaced: '',
    clientTimesheet: null as File | null
  };

  constructor(
    private workUpdatesService: WorkUpdatesService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ 
      addOutline, documentTextOutline, cloudUploadOutline, timeOutline,
      checkmarkCircleOutline, alertCircleOutline, closeCircleOutline,
      calendarOutline, briefcaseOutline
    });
  }

  ngOnInit() {
    this.loadProjects();
    this.loadWorkUpdates();
  }

  loadProjects() {
    this.workUpdatesService.getMyProjects().subscribe({
      next: (response: { success: boolean; projects: Project[]; message?: string }) => {
        this.projects = response.projects;
        if (this.projects.length === 0) {
          this.showToast('You are not assigned to any active projects', 'warning');
        }
      },
      error: (error: Error) => {
        console.error('Error loading projects:', error);
        this.showToast('Failed to load projects', 'danger');
      }
    });
  }

  loadWorkUpdates() {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    this.workUpdatesService.getMyUpdates(startDate, endDate).subscribe({
      next: (response: { success: boolean; updates: any[] }) => {
        this.workUpdates = response.updates;
      },
      error: (error: Error) => {
        console.error('Error loading work updates:', error);
      }
    });
  }

  handleRefresh(event: any) {
    this.loadProjects();
    this.loadWorkUpdates();
    setTimeout(() => event.target.complete(), 1000);
  }

  onProjectChange(event: any) {
    const projectId = event.detail.value;
    this.selectedProject = this.projects.find(p => p.project_id === projectId) || null;
    
    if (this.selectedProject) {
      this.updateForm.projectId = this.selectedProject.project_id;
      this.updateForm.shiftId = this.selectedProject.shift_id;
      
      // Set default shift times
      const today = new Date().toISOString().split('T')[0];
      this.updateForm.shiftStartTime = `${today}T${this.selectedProject.start_time}`;
      this.updateForm.shiftEndTime = `${today}T${this.selectedProject.end_time}`;
      
      this.calculateHoursWorked();
    }
  }

  calculateHoursWorked() {
    if (this.updateForm.shiftStartTime && this.updateForm.shiftEndTime) {
      const start = new Date(this.updateForm.shiftStartTime);
      const end = new Date(this.updateForm.shiftEndTime);
      const diffMs = end.getTime() - start.getTime();
      this.updateForm.hoursWorked = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 
                           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                           'image/png', 'image/jpeg', 'text/csv'];
      
      if (!allowedTypes.includes(file.type)) {
        this.showToast('Only PDF, Excel, CSV, or image files are allowed', 'danger');
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.showToast('File size must be less than 10MB', 'danger');
        return;
      }

      this.updateForm.clientTimesheet = file;
    }
  }

  async submitUpdate(isDraft: boolean = false) {
    // Validate form
    if (!this.updateForm.projectId) {
      this.showToast('Please select a project', 'warning');
      return;
    }

    if (!this.updateForm.workDescription.trim()) {
      this.showToast('Please provide work description', 'warning');
      return;
    }

    console.log('submitUpdate called, isDraft:', isDraft);
    console.log('updateForm:', this.updateForm);

    if (!isDraft && !this.updateForm.clientTimesheet) {
      console.log('No client timesheet attached for submission');
      const alert = await this.alertController.create({
        header: 'Missing Timesheet',
        message: 'Client timesheet is required for submission. Do you want to save as draft?',
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          { 
            text: 'Save as Draft', 
            handler: () => this.submitUpdate(true)
          }
        ]
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: isDraft ? 'Saving draft...' : 'Submitting work update...'
    });
    await loading.present();

    const formData = new FormData();
    formData.append('projectId', this.updateForm.projectId.toString());
    if (this.updateForm.shiftId) {
      formData.append('shiftId', this.updateForm.shiftId.toString());
    }
    formData.append('updateDate', new Date(this.updateForm.updateDate).toISOString().split('T')[0]);
    formData.append('shiftStartTime', this.updateForm.shiftStartTime);
    formData.append('shiftEndTime', this.updateForm.shiftEndTime);
    formData.append('hoursWorked', this.updateForm.hoursWorked.toString());
    formData.append('workDescription', this.updateForm.workDescription);
    formData.append('tasksCompleted', this.updateForm.tasksCompleted);
    formData.append('challengesFaced', this.updateForm.challengesFaced);
    formData.append('submitNow', (!isDraft).toString());
    
    if (this.updateForm.clientTimesheet) {
      console.log('Client timesheet attached:', this.updateForm.clientTimesheet.name);
      formData.append('clientTimesheet', this.updateForm.clientTimesheet);
    }

    console.log('Calling API: POST /api/work-updates/submit');
    this.workUpdatesService.submitWorkUpdate(formData).subscribe({
      next: (response: { success: boolean; message: string }) => {
        console.log('API response:', response);
        loading.dismiss();
        this.showToast(
          isDraft ? 'Work update saved as draft' : 'Work update submitted successfully',
          'success'
        );
        this.resetForm();
        this.showSubmitModal = false;
        this.loadWorkUpdates();
      },
      error: (error: Error) => {
        loading.dismiss();
        console.error('Error submitting work update:', error);
        this.showToast('Failed to submit work update', 'danger');
      }
    });
  }

  async deleteUpdate(updateId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this draft?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.workUpdatesService.deleteWorkUpdate(updateId).subscribe({
              next: () => {
                this.showToast('Draft deleted successfully', 'success');
                this.loadWorkUpdates();
              },
              error: (error: Error) => {
                console.error('Error deleting update:', error);
                this.showToast('Failed to delete draft', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  downloadTimesheet(timesheetId: number) {
    this.workUpdatesService.downloadTimesheet(timesheetId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'timesheet.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error: Error) => {
        console.error('Error downloading timesheet:', error);
        this.showToast('Failed to download timesheet', 'danger');
      }
    });
  }

  resetForm() {
    this.updateForm = {
      projectId: null,
      shiftId: null,
      updateDate: new Date().toISOString(),
      shiftStartTime: '',
      shiftEndTime: '',
      hoursWorked: 0,
      workDescription: '',
      tasksCompleted: '',
      challengesFaced: '',
      clientTimesheet: null
    };
    this.selectedProject = null;
  }

  openSubmitModal() {
    if (this.projects.length === 0) {
      this.showToast('No active projects assigned', 'warning');
      return;
    }
    this.showSubmitModal = true;
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'draft': 'medium',
      'submitted': 'primary',
      'approved': 'success',
      'flagged': 'warning',
      'rejected': 'danger'
    };
    return colors[status] || 'medium';
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
