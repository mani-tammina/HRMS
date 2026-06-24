import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController, AlertController } from '@ionic/angular';
import { SeparationService } from '../../../../../core/services/separation.service';

@Component({
  selector: 'app-resignation-tracking',
  templateUrl: './resignation-tracking.component.html',
  styleUrls: ['./resignation-tracking.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ResignationTrackingComponent implements OnInit {
  @Input() resignation: any;
  clearanceTasks: any[] = [];
  settlementDetails: any = null;
  resSettings: any = null;

  // Notice period progress
  daysServed = 0;
  remainingDays = 0;
  progressPercentage = 0;

  constructor(
    private modalController: ModalController,
    private separationService: SeparationService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadSettings();
    if (this.resignation) {
      this.calculateNoticePeriodProgress();
      this.loadClearanceTasks();
      this.loadSettlementDetails();
    }
  }

  loadSettings() {
    this.separationService.getResignationSettings().subscribe({
      next: (settings) => {
        this.resSettings = settings;
      },
      error: (err) => {
        console.error('Error fetching resignation settings:', err);
      }
    });
  }

  calculateNoticePeriodProgress() {
    if (!this.resignation.hr_action_at && !this.resignation.created_at) return;

    const startDate = new Date(this.resignation.hr_action_at || this.resignation.created_at);
    const today = new Date();
    const totalDays = this.resignation.hr_notice_period_days || this.resignation.notice_period_days || 30;

    // Days served
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    this.daysServed = Math.min(diffDays, totalDays);
    this.remainingDays = Math.max(0, totalDays - this.daysServed);
    this.progressPercentage = Math.round((this.daysServed / totalDays) * 100);
  }

  loadClearanceTasks() {
    this.separationService.getClearanceTasks(this.resignation.id).subscribe({
      next: (tasks) => {
        this.clearanceTasks = tasks;
      },
      error: (err) => {
        console.error('Error loading clearance tasks:', err);
      }
    });
  }

  loadSettlementDetails() {
    this.separationService.getFFSettlement(this.resignation.id).subscribe({
      next: (details) => {
        this.settlementDetails = details;
      },
      error: (err) => {
        console.error('Error loading settlement:', err);
      }
    });
  }

  // Get tasks grouped by department
  getTasksByDepartment(dept: string): any[] {
    return this.clearanceTasks.filter(t => t.department === dept);
  }

  getDepartmentStatus(dept: string): 'Pending' | 'Completed' {
    const deptTasks = this.getTasksByDepartment(dept);
    if (deptTasks.length === 0) return 'Pending';
    return deptTasks.every(t => t.status === 'Completed') ? 'Completed' : 'Pending';
  }

  // Timeline Step Checks
  isStepCompleted(step: number): boolean {
    const status = this.resignation.status;
    
    switch (step) {
      case 1: // Submitted
        return ['Submitted', 'Manager Review', 'HR Review', 'Approved', 'Exit Clearance', 'Relieved'].includes(status);
      case 2: // Manager Approved
        return ['HR Review', 'Approved', 'Exit Clearance', 'Relieved'].includes(status) && this.resignation.manager_action === 'Approve';
      case 3: // HR Approved
        return ['Approved', 'Exit Clearance', 'Relieved'].includes(status) && this.resignation.hr_action === 'Approve';
      case 4: // Notice Period running
        return ['Exit Clearance', 'Relieved'].includes(status);
      case 5: // Clearance Completed
        return this.clearanceTasks.length > 0 && this.clearanceTasks.every(t => t.status === 'Completed');
      case 6: // Settlement Paid
        return this.settlementDetails && this.settlementDetails.status === 'Paid';
      case 7: // Exit completed (Relieved)
        return status === 'Relieved';
      default:
        return false;
    }
  }

  async cancelResignation() {
    const alert = await this.alertController.create({
      header: 'Cancel Resignation',
      message: 'Are you sure you want to cancel your resignation request? This will restore your active employment status.',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Cancel It',
          handler: () => {
            this.separationService.cancelResignation().subscribe({
              next: () => {
                this.presentToast('Resignation request cancelled successfully.', 'success');
                this.modalController.dismiss({ cancelled: true });
              },
              error: (err) => {
                this.presentToast(err.error?.error || 'Failed to cancel resignation.', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
