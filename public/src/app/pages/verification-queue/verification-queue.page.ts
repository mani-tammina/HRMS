import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSelect, IonSelectOption,
  IonCheckbox, IonSearchbar, IonChip,
  ToastController, AlertController, LoadingController,
  IonRefresher, IonRefresherContent
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
export class VerificationQueuePage implements OnInit {
  queueItems: VerificationQueueItem[] = [];
  selectedItems: Set<number> = new Set();
  filterStatus: string = 'submitted';
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
    this.loadQueue();
  }

  loadQueue() {
    this.isLoading = true;
    this.adminTimesheetService.getVerificationQueue(this.filterStatus).subscribe({
      next: (response) => {
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

  toggleSelection(workUpdateId: number) {
    if (this.selectedItems.has(workUpdateId)) {
      this.selectedItems.delete(workUpdateId);
    } else {
      this.selectedItems.add(workUpdateId);
    }
  }

  toggleSelectAll() {
    if (this.selectedItems.size === this.filteredQueue.length) {
      this.selectedItems.clear();
    } else {
      this.filteredQueue.forEach(item => this.selectedItems.add(item.work_update_id));
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
      item.client_name.toLowerCase().includes(term)
    );
  }

  viewComparison(workUpdateId: number) {
    this.router.navigate(['/admin/timesheet/verification-comparison', workUpdateId]);
  }

  async bulkApprove() {
    if (this.selectedItems.size === 0) {
      this.showToast('Please select items to approve', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Bulk Approve',
      message: `Approve ${this.selectedItems.size} selected work update(s)?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Approve',
          handler: () => this.executeBulkAction('approved')
        }
      ]
    });
    await alert.present();
  }

  async bulkFlag() {
    if (this.selectedItems.size === 0) {
      this.showToast('Please select items to flag', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Bulk Flag',
      message: `Flag ${this.selectedItems.size} selected work update(s)?`,
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Add notes for flagging...'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Flag',
          handler: (data) => this.executeBulkAction('flagged', data.notes)
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
      message: `Reject ${this.selectedItems.size} selected work update(s)?`,
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
            return this.executeBulkAction('rejected', data.notes);
          }
        }
      ]
    });
    await alert.present();
  }

  async executeBulkAction(status: 'approved' | 'flagged' | 'rejected', notes?: string) {
    const loading = await this.loadingController.create({
      message: 'Processing bulk action...'
    });
    await loading.present();

    const data = {
      workUpdateIds: Array.from(this.selectedItems),
      verificationStatus: status,
      verificationNotes: notes || ''
    };

    this.adminTimesheetService.bulkVerify(data).subscribe({
      next: (response) => {
        loading.dismiss();
        this.showToast(`${response.successCount} items ${status} successfully`, 'success');
        this.selectedItems.clear();
        this.loadQueue();
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error in bulk action:', error);
        this.showToast('Failed to complete bulk action', 'danger');
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
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
