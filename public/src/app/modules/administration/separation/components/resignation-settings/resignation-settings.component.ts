import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { SeparationService } from '../../../../../core/services/separation.service';

@Component({
  selector: 'app-resignation-settings',
  templateUrl: './resignation-settings.component.html',
  styleUrls: ['./resignation-settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ResignationSettingsComponent implements OnInit {
  // Settings Form Variables
  allowEmployeeResign = true;
  allowEmployeeWithdraw = true;
  allowEarlyLWD = true;
  showReviewerStatus = true;
  notallowholiday_weekend = true;
  
  // Initial State Backup (for Cancel button)
  initialState: any = null;

  constructor(
    private separationService: SeparationService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.separationService.getResignationSettings().subscribe({
      next: (data) => {
        if (data) {
          this.allowEmployeeResign = data.allow_employee_resign ?? true;
          this.allowEmployeeWithdraw = data.allow_employee_withdraw ?? true;
          this.allowEarlyLWD = data.allow_early_lwd ?? true;
          this.showReviewerStatus = data.show_reviewer_status ?? true;
          this.notallowholiday_weekend = data.notallowholiday_weekend ?? true;
          
          this.initialState = { ...data };
        }
      },
      error: (err) => {
        console.error('Error loading resignation settings:', err);
        this.presentToast('Failed to load resignation settings.', 'danger');
      }
    });
  }

  onCancel() {
    if (this.initialState) {
      this.allowEmployeeResign = this.initialState.allow_employee_resign;
      this.allowEmployeeWithdraw = this.initialState.allow_employee_withdraw;
      this.allowEarlyLWD = this.initialState.allow_early_lwd;
      this.showReviewerStatus = this.initialState.show_reviewer_status;
      this.presentToast('Changes discarded.', 'medium');
    }
  }

  async onSave() {
    const loading = await this.loadingController.create({
      message: 'Saving resignation settings...',
      spinner: 'crescent'
    });
    await loading.present();

    const payload = {
      allow_employee_resign: this.allowEmployeeResign,
      allow_employee_withdraw: this.allowEmployeeWithdraw,
      allow_early_lwd: this.allowEarlyLWD,
      show_reviewer_status: this.showReviewerStatus,
      notallowholiday_weekend: this.notallowholiday_weekend
    };

    this.separationService.updateResignationSettings(payload).subscribe({
      next: () => {
        loading.dismiss();
        this.initialState = { ...payload };
        this.presentToast('Settings saved successfully.', 'success');
      },
      error: (err) => {
        loading.dismiss();
        console.error('Error saving settings:', err);
        this.presentToast(err.error?.error || 'Failed to save settings.', 'danger');
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
