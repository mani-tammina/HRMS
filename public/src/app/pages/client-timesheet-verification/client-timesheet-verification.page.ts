import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonTextarea, IonNote,
  ToastController, LoadingController, AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, checkmarkCircleOutline, closeCircleOutline,
  downloadOutline, calendarOutline, timeOutline, personOutline
} from 'ionicons/icons';
import { AdminTimesheetService } from '@core/services/admin-timesheet.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-client-timesheet-verification',
  templateUrl: './client-timesheet-verification.page.html',
  styleUrls: ['./client-timesheet-verification.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonTextarea, IonNote
  ]
})
export class ClientTimesheetVerificationPage implements OnInit {
  clientTimesheetId: number = 0;
  clientTimesheet: any = null;
  projectTimesheets: any[] = [];
  workUpdates: any[] = [];
  summary: any = null;
  verificationNotes: string = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminTimesheetService: AdminTimesheetService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    addIcons({
      documentTextOutline, checkmarkCircleOutline, closeCircleOutline,
      downloadOutline, calendarOutline, timeOutline, personOutline
    });
  }

  ngOnInit() {
    this.clientTimesheetId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails();
  }

  loadDetails() {
    this.isLoading = true;
    this.adminTimesheetService.getClientTimesheetDetails(this.clientTimesheetId).subscribe({
      next: (response) => {
        this.clientTimesheet = response.clientTimesheet;
        this.projectTimesheets = response.projectTimesheets;
        this.workUpdates = response.workUpdates;
        this.summary = response.summary;
        this.verificationNotes = this.clientTimesheet.verification_notes || '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading details:', error);
        this.showToast('Failed to load timesheet details', 'danger');
        this.isLoading = false;
      }
    });
  }

  getFileUrl() {
    return `${environment.apiUrl.replace('/api', '')}/${this.clientTimesheet.file_path.replace(/\\/g, '/')}`;
  }

  downloadFile() {
    window.open(this.getFileUrl(), '_blank');
  }

  async verify() {
    const alert = await this.alertController.create({
      header: 'Verify Client Timesheet',
      message: 'Confirm that this client timesheet has been reviewed and verified?',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Add verification notes (optional)',
          value: this.verificationNotes
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Verify',
          handler: (data) => this.executeVerification(true, data.notes)
        }
      ]
    });
    await alert.present();
  }

  async reject() {
    const alert = await this.alertController.create({
      header: 'Reject Client Timesheet',
      message: 'Please provide a reason for rejection:',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Reason for rejection (required)',
          value: this.verificationNotes,
          attributes: {
            required: true
          }
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          cssClass: 'danger',
          handler: (data) => {
            if (!data.notes || !data.notes.trim()) {
              this.showToast('Please provide a reason for rejection', 'warning');
              return false;
            }
            return this.executeVerification(false, data.notes);
          }
        }
      ]
    });
    await alert.present();
  }

  async executeVerification(isVerified: boolean, notes?: string) {
    const loading = await this.loadingController.create({
      message: isVerified ? 'Verifying...' : 'Rejecting...'
    });
    await loading.present();

    this.adminTimesheetService.verifyClientTimesheet({
      clientTimesheetId: this.clientTimesheetId,
      isVerified,
      notes
    }).subscribe({
      next: (response) => {
        loading.dismiss();
        this.showToast(response.message, 'success');
        this.router.navigate(['/verification-queue']);
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error verifying timesheet:', error);
        this.showToast('Failed to update verification status', 'danger');
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

  goBack() {
    this.router.navigate(['/verification-queue']);
  }
}
