import { Component, OnInit } from '@angular/core';
import { FinanceAdminService } from '../../../core/services/finance-admin.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-financial-admin',
  templateUrl: './financial-admin.page.html',
  styleUrls: ['./financial-admin.page.scss'],
  standalone: false
})
export class FinancialAdminPage implements OnInit {
  isLoading = false;

  constructor(
    private financeService: FinanceAdminService,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async onRestoreDefaults() {
    const alert = await this.alertCtrl.create({
      header: 'Restore Defaults',
      message: 'Are you sure you want to restore the payroll setup to its default settings? This operation cannot be easily undone.',
      cssClass: 'glass-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Restore',
          handler: () => this.executeRestore()
        }
      ]
    });
    await alert.present();
  }

  async onClearSetup() {
    const alert = await this.alertCtrl.create({
      header: 'Clear Setup',
      message: 'Warning: You are about to clear all payroll master setup data. This will reset everything. Are you absolutely certain?',
      cssClass: 'glass-alert danger-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear All',
          handler: () => this.executeClear()
        }
      ]
    });
    await alert.present();
  }

  private async executeRestore() {
    const loading = await this.loadingCtrl.create({
      message: 'Restoring defaults...',
      cssClass: 'glass-loading'
    });
    await loading.present();

    this.financeService.restoreDefaults().subscribe({
      next: (res) => {
        loading.dismiss();
        this.toaster.showSuccess('Payroll master setup restored successfully');
      },
      error: (err) => {
        loading.dismiss();
        console.error('Restore failed', err);
        this.toaster.showError('Failed to restore defaults');
      }
    });
  }

  private async executeClear() {
    const loading = await this.loadingCtrl.create({
      message: 'Cleaning up setup...',
      cssClass: 'glass-loading'
    });
    await loading.present();

    this.financeService.clearSetup().subscribe({
      next: (res) => {
        loading.dismiss();
        this.toaster.showSuccess('Payroll setup cleared successfully');
      },
      error: (err) => {
        loading.dismiss();
        console.error('Clear failed', err);
        this.toaster.showError('Failed to clear setup');
      }
    });
  }
}
