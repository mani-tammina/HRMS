import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
  IonCheckbox, IonSearchbar, IonChip,
  ToastController, AlertController, LoadingController,
  IonRefresher, IonRefresherContent, ViewWillEnter
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  checkmarkCircleOutline, closeCircleOutline, warningOutline,
  eyeOutline, filterOutline, checkmarkDoneOutline
} from 'ionicons/icons';
import { AdminTimesheetService, VerificationQueueItem } from '@core/services/admin-timesheet.service';

@Component({
  selector: 'app-verification-queue',
  templateUrl: './verification-queue.page.html',
  styleUrls: ['./verification-queue.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
    IonCheckbox, IonSearchbar, IonChip,
    IonRefresher, IonRefresherContent
  ]
})
export class VerificationQueuePage implements OnInit, ViewWillEnter {
  queueItems: VerificationQueueItem[] = [];
  selectedItems: Set<number> = new Set();
  filterStatus: string = 'pending';
  searchTerm: string = '';
  isLoading = false;

  constructor(
    private router: Router,
    private adminTimesheetService: AdminTimesheetService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ 
      checkmarkCircleOutline, closeCircleOutline, warningOutline,
      eyeOutline, filterOutline, checkmarkDoneOutline
    });
  }

  ngOnInit() {
    console.log('VerificationQueuePage ngOnInit called');
    this.loadQueue();
  }

  ionViewWillEnter() {
    console.log('VerificationQueuePage ionViewWillEnter called');
    this.loadQueue();
  }

  loadQueue() {
    console.log('loadQueue called with filterStatus:', this.filterStatus);
    this.isLoading = true;
    this.adminTimesheetService.getVerificationQueue(this.filterStatus).subscribe({
      next: (response) => {
        console.log('Verification queue loaded:', response);
        this.queueItems = response.verificationQueue;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading verification queue:', error);
        this.showToast('Failed to load verification queue', 'danger');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadQueue();
    setTimeout(() => event.target.complete(), 1000);
  }

  onFilterChange(event: any) {
    this.filterStatus = event.detail.value;
    this.loadQueue();
  }

  toggleSelection(clientTimesheetId: number) {
    if (this.selectedItems.has(clientTimesheetId)) {
      this.selectedItems.delete(clientTimesheetId);
    } else {
      this.selectedItems.add(clientTimesheetId);
    }
  }

  toggleSelectAll() {
    if (this.selectedItems.size === this.filteredQueue.length) {
      this.selectedItems.clear();
    } else {
      this.filteredQueue.forEach(item => this.selectedItems.add(item.client_timesheet_id));
    }
  }

  get filteredQueue(): VerificationQueueItem[] {
    if (!this.searchTerm) {
      return this.queueItems;
    }

    const term = this.searchTerm.toLowerCase();
    return this.queueItems.filter(item =>
      item.first_name.toLowerCase().includes(term) ||
      item.last_name.toLowerCase().includes(term) ||
      item.employee_code.toLowerCase().includes(term) ||
      item.project_name.toLowerCase().includes(term) ||
      item.client_name.toLowerCase().includes(term) ||
      item.file_name.toLowerCase().includes(term)
    );
  }

  viewDetails(clientTimesheetId: number) {
    this.router.navigate(['/admin/timesheet/client-timesheet', clientTimesheetId]);
  }

  async bulkApprove() {
    if (this.selectedItems.size === 0) {
      this.showToast('Please select items to approve', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Bulk Approve',
      message: `Approve ${this.selectedItems.size} selected client timesheet(s)?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Approve',
          handler: () => this.executeBulkAction(true)
        }
      ]
    });
    await alert.present();
  }

  async bulkReject() {
    if (this.selectedItems.size === 0) {
      this.showToast('Please select items to reject', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Bulk Reject',
      message: `Reject ${this.selectedItems.size} selected client timesheet(s)?`,
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Add notes for rejection...',
          attributes: {
            required: true
          }
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          handler: (data) => {
            if (!data.notes) {
              this.showToast('Please provide notes for rejection', 'warning');
              return false;
            }
            return this.executeBulkAction(false, data.notes);
          }
        }
      ]
    });
    await alert.present();
  }

  async executeBulkAction(isVerified: boolean, notes?: string) {
    const loading = await this.loadingController.create({
      message: 'Processing bulk action...'
    });
    await loading.present();

    const promises = Array.from(this.selectedItems).map(clientTimesheetId =>
      this.adminTimesheetService.verifyClientTimesheet({
        clientTimesheetId,
        isVerified,
        notes
      }).toPromise()
    );

    try {
      await Promise.all(promises);
      loading.dismiss();
      this.showToast(`${this.selectedItems.size} items ${isVerified ? 'verified' : 'rejected'} successfully`, 'success');
      this.selectedItems.clear();
      this.loadQueue();
    } catch (error) {
      loading.dismiss();
      console.error('Error in bulk action:', error);
      this.showToast('Failed to complete bulk action', 'danger');
    }
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
