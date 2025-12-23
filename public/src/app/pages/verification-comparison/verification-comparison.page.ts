import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonTextarea,
  IonGrid, IonRow, IonCol, IonChip, IonSpinner,
  ToastController, AlertController, LoadingController, IonModal
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  checkmarkCircleOutline, closeCircleOutline, warningOutline,
  documentTextOutline, cloudDownloadOutline, timeOutline,
  calendarOutline, personOutline, briefcaseOutline
} from 'ionicons/icons';
import { AdminTimesheetService } from '@core/services/admin-timesheet.service';

@Component({
  selector: 'app-verification-comparison',
  templateUrl: './verification-comparison.page.html',
  styleUrls: ['./verification-comparison.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonTextarea,
    IonGrid, IonRow, IonCol, IonChip, IonSpinner, IonModal
  ]
})
export class VerificationComparisonPage implements OnInit {
  workUpdateId!: number;
  comparisonData: any = null;
  isLoading = true;
  showVerificationModal = false;

  verificationForm = {
    verificationStatus: 'approved' as 'approved' | 'flagged' | 'rejected',
    verificationNotes: '',
    hoursDiscrepancy: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminTimesheetService: AdminTimesheetService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ 
      checkmarkCircleOutline, closeCircleOutline, warningOutline,
      documentTextOutline, cloudDownloadOutline, timeOutline,
      calendarOutline, personOutline, briefcaseOutline
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.workUpdateId = +params['id'];
      this.loadComparisonData();
    });
  }

  loadComparisonData() {
    this.isLoading = true;
    this.adminTimesheetService.getComparisonData(this.workUpdateId).subscribe({
      next: (response) => {
        this.comparisonData = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading comparison data:', error);
        this.showToast('Failed to load comparison data', 'danger');
        this.isLoading = false;
      }
    });
  }

  openVerificationModal(status: 'approved' | 'flagged' | 'rejected') {
    this.verificationForm.verificationStatus = status;
    this.showVerificationModal = true;
  }

  async submitVerification() {
    const loading = await this.loadingController.create({
      message: 'Submitting verification...'
    });
    await loading.present();

    const data = {
      workUpdateId: this.workUpdateId,
      verificationStatus: this.verificationForm.verificationStatus,
      verificationNotes: this.verificationForm.verificationNotes,
      hoursDiscrepancy: this.verificationForm.hoursDiscrepancy,
      clientTimesheetId: this.comparisonData.clientTimesheet?.id
    };

    this.adminTimesheetService.verifyWorkUpdate(data).subscribe({
      next: (response) => {
        loading.dismiss();
        this.showToast(response.message, 'success');
        this.showVerificationModal = false;
        this.router.navigate(['/admin/timesheet/verification-queue']);
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error submitting verification:', error);
        this.showToast('Failed to submit verification', 'danger');
      }
    });
  }

  downloadTimesheet() {
    if (!this.comparisonData.clientTimesheet) {
      this.showToast('No timesheet available', 'warning');
      return;
    }

    this.adminTimesheetService.downloadTimesheet(this.comparisonData.clientTimesheet.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.comparisonData.clientTimesheet.file_name || 'timesheet.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading timesheet:', error);
        this.showToast('Failed to download timesheet', 'danger');
      }
    });
  }

  calculateDiscrepancy() {
    // Auto-calculate hours discrepancy if needed
    // This can be enhanced based on client timesheet parsing
    this.verificationForm.hoursDiscrepancy = 0;
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

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatTime(datetime: string): string {
    return new Date(datetime).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
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
}
