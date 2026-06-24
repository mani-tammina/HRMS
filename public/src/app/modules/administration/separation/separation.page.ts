import { Component, OnInit } from '@angular/core';
import { SeparationService } from '../../../core/services/separation.service';
import { AdminService } from '../../../core/services/admin.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-separation',
  templateUrl: './separation.page.html',
  styleUrls: ['./separation.page.scss'],
  standalone: false
})
export class SeparationPage implements OnInit {
  selectedSegment = 'requests';
  resignationRequests: any[] = [];
  noticePeriods: any[] = [];
  departments: any[] = [];
  
  // Resignation Reasons State
  reasons: any[] = [];
  showReasonForm = false;
  editingReasonId: number | null = null;
  reasonForm = {
    reason: '',
    description: '',
    is_active: 1
  };

  // Tracking State
  trackingResignation: any = null;

  // Filter States
  filters = {
    employee: '',
    department: '',
    status: '',
    startDate: '',
    endDate: ''
  };

  // Notice Period Form State
  showConfigForm = false;
  editingConfigId: number | null = null;
  configForm = {
    department_id: '',
    notice_period_days: 30,
    is_active: 1
  };

  constructor(
    private separationService: SeparationService,
    private adminService: AdminService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadRequests();
    this.loadNoticePeriods();
    this.loadDepartments();
    this.loadReasons();
  }

  loadRequests() {
    this.separationService.getResignationRequests(this.filters).subscribe({
      next: (data) => {
        this.resignationRequests = data;
      },
      error: (err) => {
        console.error('Error fetching resignation requests:', err);
        this.presentToast('Failed to load resignation requests.', 'danger');
      }
    });
  }

  loadNoticePeriods() {
    this.separationService.getNoticePeriods().subscribe({
      next: (data) => {
        this.noticePeriods = data;
      },
      error: (err) => {
        console.error('Error fetching notice periods:', err);
      }
    });
  }

  loadDepartments() {
    this.adminService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      }
    });
  }

  applyFilters() {
    this.loadRequests();
  }

  clearFilters() {
    this.filters = {
      employee: '',
      department: '',
      status: '',
      startDate: '',
      endDate: ''
    };
    this.loadRequests();
  }

  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
  }

  // Notice Period Config Handlers
  openAddConfig() {
    this.editingConfigId = null;
    this.configForm = {
      department_id: '',
      notice_period_days: 30,
      is_active: 1
    };
    this.showConfigForm = true;
  }

  editConfig(config: any) {
    this.editingConfigId = config.id;
    this.configForm = {
      department_id: config.department_id.toString(),
      notice_period_days: config.notice_period_days,
      is_active: config.is_active
    };
    this.showConfigForm = true;
  }

  cancelConfigEdit() {
    this.showConfigForm = false;
    this.editingConfigId = null;
  }

  async saveConfig() {
    if (!this.configForm.department_id || this.configForm.notice_period_days === undefined) {
      this.presentToast('Please fill all required fields.', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Saving configuration...',
      spinner: 'crescent'
    });
    await loading.present();

    const payload = {
      department_id: parseInt(this.configForm.department_id),
      notice_period_days: this.configForm.notice_period_days,
      is_active: this.configForm.is_active
    };

    this.separationService.saveNoticePeriod(payload).subscribe({
      next: () => {
        loading.dismiss();
        this.presentToast('Configuration saved successfully.', 'success');
        this.showConfigForm = false;
        this.loadNoticePeriods();
      },
      error: (err) => {
        loading.dismiss();
        this.presentToast(err.error?.error || 'Failed to save configuration.', 'danger');
      }
    });
  }

  async deleteConfig(configId: number) {
    const alert = await this.alertController.create({
      header: 'Delete Notice Period Rule',
      message: 'Are you sure you want to delete this notice period policy? It will revert to the default 30 days notice period for this department.',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.separationService.deleteNoticePeriod(configId).subscribe({
              next: () => {
                this.presentToast('Notice period deleted successfully.', 'success');
                this.loadNoticePeriods();
              },
              error: (err) => {
                this.presentToast('Failed to delete notice period.', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
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

  // Get department name from ID (for display fallback)
  getDeptName(deptId: number): string {
    const dept = this.departments.find(d => d.id === deptId);
    return dept ? dept.name : 'Unknown Department';
  }

  // Resignation Reasons CRUD
  loadReasons() {
    this.separationService.getResignationReasons().subscribe({
      next: (data) => {
        this.reasons = data;
      },
      error: (err) => {
        console.error('Error fetching resignation reasons:', err);
      }
    });
  }

  openAddReason() {
    this.editingReasonId = null;
    this.reasonForm = {
      reason: '',
      description: '',
      is_active: 1
    };
    this.showReasonForm = true;
  }

  editReason(reasonObj: any) {
    this.editingReasonId = reasonObj.id;
    this.reasonForm = {
      reason: reasonObj.reason,
      description: reasonObj.description || '',
      is_active: reasonObj.is_active
    };
    this.showReasonForm = true;
  }

  cancelReasonEdit() {
    this.showReasonForm = false;
    this.editingReasonId = null;
  }

  async saveReason() {
    if (!this.reasonForm.reason || this.reasonForm.reason.trim() === '') {
      this.presentToast('Please fill all required fields.', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Saving reason...',
      spinner: 'crescent'
    });
    await loading.present();

    const payload = {
      reason: this.reasonForm.reason,
      description: this.reasonForm.description,
      is_active: this.reasonForm.is_active
    };

    if (this.editingReasonId) {
      this.separationService.updateResignationReason(this.editingReasonId, payload).subscribe({
        next: () => {
          loading.dismiss();
          this.presentToast('Reason updated successfully.', 'success');
          this.showReasonForm = false;
          this.loadReasons();
        },
        error: (err) => {
          loading.dismiss();
          this.presentToast(err.error?.error || 'Failed to update reason.', 'danger');
        }
      });
    } else {
      this.separationService.createResignationReason(payload).subscribe({
        next: () => {
          loading.dismiss();
          this.presentToast('Reason created successfully.', 'success');
          this.showReasonForm = false;
          this.loadReasons();
        },
        error: (err) => {
          loading.dismiss();
          this.presentToast(err.error?.error || 'Failed to create reason.', 'danger');
        }
      });
    }
  }

  async deleteReason(reasonId: number) {
    const alert = await this.alertController.create({
      header: 'Delete Resignation Reason',
      message: 'Are you sure you want to delete this resignation reason? If in use, it will be deactivated.',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.separationService.deleteResignationReason(reasonId).subscribe({
              next: (res) => {
                this.presentToast(res.message || 'Resignation reason deleted successfully.', 'success');
                this.loadReasons();
              },
              error: (err) => {
                this.presentToast('Failed to delete resignation reason.', 'danger');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Tracking overlay handlers
  trackResignation(req: any) {
    this.trackingResignation = req;
  }

  closeTracking() {
    this.trackingResignation = null;
  }
}
