import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { SeparationService } from '../../../../../core/services/separation.service';

@Component({
  selector: 'app-notice-period-leaves-settings',
  templateUrl: './notice-period-leaves-settings.component.html',
  styleUrls: ['./notice-period-leaves-settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class NoticePeriodLeavesSettingsComponent implements OnInit {
  leavePlans: any[] = [];
  initialState: string = '[]';

  constructor(
    private separationService: SeparationService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.separationService.getNoticePeriodLeavesSettings().subscribe({
      next: (data) => {
        if (data) {
          this.leavePlans = data;
          this.initialState = JSON.stringify(data);
        }
      },
      error: (err) => {
        console.error('Error loading notice period leave settings:', err);
        this.presentToast('Failed to load notice period leave configurations.', 'danger');
      }
    });
  }

  onCancel() {
    this.leavePlans = JSON.parse(this.initialState);
    this.presentToast('Changes discarded.', 'medium');
  }

  async onSave() {
    const loading = await this.loadingController.create({
      message: 'Saving leave policy settings...',
      spinner: 'crescent'
    });
    await loading.present();

    const payload: any[] = [];
    this.leavePlans.forEach(plan => {
      plan.leaves.forEach((leave: any) => {
        payload.push({
          leave_plan_id: plan.id,
          leave_type_id: leave.leave_type_id,
          is_allowed: leave.is_allowed ? 1 : 0
        });
      });
    });

    this.separationService.updateNoticePeriodLeavesSettings(payload).subscribe({
      next: () => {
        loading.dismiss();
        this.initialState = JSON.stringify(this.leavePlans);
        this.presentToast('Leave policies updated successfully.', 'success');
      },
      error: (err) => {
        loading.dismiss();
        console.error('Error saving leave policy settings:', err);
        this.presentToast(err.error?.error || 'Failed to update leave policies.', 'danger');
      }
    });
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'medium') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
