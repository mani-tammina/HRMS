import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeparationService } from '../../../../core/services/separation.service';
import { RouteGuardService } from '../../../../core/services/route-guard.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-separation-details',
  templateUrl: './separation-details.page.html',
  styleUrls: ['./separation-details.page.scss'],
  standalone: false
})
export class SeparationDetailsPage implements OnInit {
  resignationId!: number;
  resignation: any = null;
  clearanceTasks: any[] = [];
  settlement: any = null;
  
  // Segment tab
  selectedTab = 'details';

  // Current logged in user info
  currentUserRole: string | null = null;
  currentUserEmployeeId: number | null = null;

  // Workflow actions state
  managerRemarks = '';
  hrRemarks = '';
  hrNoticeDays: number | null = null;
  hrLastWorkingDate = '';

  // F&F Form
  settlementForm = {
    pending_salary: 0,
    leave_encashment: 0,
    bonus: 0,
    recoveries: 0,
    deductions: 0,
    remarks: ''
  };

  // Payment status
  paymentRef = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private separationService: SeparationService,
    private routeGuardService: RouteGuardService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.resignationId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.currentUserRole = this.routeGuardService.userRole;
    this.currentUserEmployeeId = this.routeGuardService.employeeID ? parseInt(this.routeGuardService.employeeID) : null;

    if (this.resignationId) {
      this.loadAllData();
    }
  }

  loadAllData() {
    this.loadResignationDetails();
    this.loadClearanceTasks();
    this.loadSettlement();
  }

  loadResignationDetails() {
    this.separationService.getResignationDetails(this.resignationId).subscribe({
      next: (data) => {
        this.resignation = data;
        
        // Initialize HR overrides
        this.hrNoticeDays = data.hr_notice_period_days || data.notice_period_days;
        this.hrLastWorkingDate = data.hr_last_working_date || data.calculated_last_working_date;
      },
      error: (err) => {
        console.error('Error loading resignation details:', err);
        this.presentToast('Failed to load resignation details.', 'danger');
      }
    });
  }

  loadClearanceTasks() {
    this.separationService.getClearanceTasks(this.resignationId).subscribe({
      next: (data) => {
        this.clearanceTasks = data;
      },
      error: (err) => {
        console.error('Error loading clearance tasks:', err);
      }
    });
  }

  loadSettlement() {
    this.separationService.getFFSettlement(this.resignationId).subscribe({
      next: (data) => {
        this.settlement = data;
        if (data) {
          this.settlementForm = {
            pending_salary: data.pending_salary,
            leave_encashment: data.leave_encashment,
            bonus: data.bonus,
            recoveries: data.recoveries,
            deductions: data.deductions,
            remarks: data.remarks || ''
          };
        }
      },
      error: (err) => {
        console.error('Error loading settlement details:', err);
      }
    });
  }

  // Workflow Approvals
  async submitManagerAction(action: 'Approve' | 'Reject' | 'Send Back') {
    const loading = await this.loadingController.create({
      message: 'Processing action...',
      spinner: 'crescent'
    });
    await loading.present();

    const payload = {
      action,
      remarks: this.managerRemarks
    };

    this.separationService.actionResignation(this.resignationId, payload).subscribe({
      next: () => {
        loading.dismiss();
        this.presentToast(`Resignation successfully updated: ${action}`, 'success');
        this.managerRemarks = '';
        this.loadAllData();
      },
      error: (err) => {
        loading.dismiss();
        this.presentToast(err.error?.error || 'Action failed.', 'danger');
      }
    });
  }

  async submitHRAction(action: 'Approve' | 'Reject') {
    const loading = await this.loadingController.create({
      message: 'Processing action...',
      spinner: 'crescent'
    });
    await loading.present();

    const payload = {
      action,
      remarks: this.hrRemarks,
      hr_notice_period_days: this.hrNoticeDays,
      hr_last_working_date: this.hrLastWorkingDate
    };

    this.separationService.actionResignation(this.resignationId, payload).subscribe({
      next: () => {
        loading.dismiss();
        this.presentToast(`Resignation successfully updated: ${action}`, 'success');
        this.hrRemarks = '';
        this.loadAllData();
      },
      error: (err) => {
        loading.dismiss();
        this.presentToast(err.error?.error || 'Action failed.', 'danger');
      }
    });
  }

  // Exit Clearance Tasks Sign Off
  async toggleTaskStatus(task: any) {
    const currentStatus = task.status;
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    
    // Alert prompt for remarks
    const alert = await this.alertController.create({
      header: 'Clearance Sign-Off',
      message: `Set task "${task.task_name}" status to ${newStatus}?`,
      inputs: [
        {
          name: 'remarks',
          type: 'text',
          placeholder: 'Enter remarks (optional)',
          value: task.remarks || ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (data) => {
            this.updateClearanceTask(task.id, newStatus, data.remarks);
          }
        }
      ]
    });

    await alert.present();
  }

  updateClearanceTask(taskId: number, status: string, remarks: string) {
    const payload = { status, remarks };
    
    this.separationService.updateClearanceTask(this.resignationId, taskId, payload).subscribe({
      next: () => {
        this.presentToast('Clearance task updated.', 'success');
        this.loadClearanceTasks();
        this.loadSettlement(); // Settlement may now be accessible
      },
      error: (err) => {
        this.presentToast(err.error?.error || 'Failed to update clearance task.', 'danger');
      }
    });
  }

  // F&F Calculations
  getCalculatedNetPayable(): number {
    const form = this.settlementForm;
    return (Number(form.pending_salary) + Number(form.leave_encashment) + Number(form.bonus)) - 
           (Number(form.recoveries) + Number(form.deductions));
  }

  async saveSettlement() {
    const loading = await this.loadingController.create({
      message: 'Saving Full & Final calculations...',
      spinner: 'crescent'
    });
    await loading.present();

    this.separationService.processFFSettlement(this.resignationId, this.settlementForm).subscribe({
      next: () => {
        loading.dismiss();
        this.presentToast('Settlement processed successfully.', 'success');
        this.loadSettlement();
        this.loadResignationDetails(); // Reload to update current_workflow_step
      },
      error: (err) => {
        loading.dismiss();
        this.presentToast(err.error?.error || 'Failed to save settlement.', 'danger');
      }
    });
  }

  async paySettlement() {
    if (!this.paymentRef.trim()) {
      this.presentToast('Please provide a payment reference number.', 'danger');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Complete Relieving Formalities',
      message: 'Confirming payment will finalize this exit. The employee status will be set to Relieved. Do you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes, Complete Exit',
          handler: () => {
            this.executePayment();
          }
        }
      ]
    });

    await alert.present();
  }

  executePayment() {
    const payload = {
      status: 'Paid',
      payment_reference: this.paymentRef
    };

    this.separationService.updateSettlementStatus(this.resignationId, payload).subscribe({
      next: () => {
        this.presentToast('Full & Final Settlement Paid. Exit completed.', 'success');
        this.paymentRef = '';
        this.loadAllData();
      },
      error: (err) => {
        this.presentToast(err.error?.error || 'Payment signoff failed.', 'danger');
      }
    });
  }

  // Utilities
  allClearanceCompleted(): boolean {
    if (this.clearanceTasks.length === 0) return false;
    return this.clearanceTasks.every(t => t.status === 'Completed');
  }

  getTasksByDept(dept: string): any[] {
    return this.clearanceTasks.filter(t => t.department === dept);
  }

  getDeptClearanceStatus(dept: string): string {
    const tasks = this.getTasksByDept(dept);
    if (tasks.length === 0) return 'Pending';
    return tasks.every(t => t.status === 'Completed') ? 'Completed' : 'Pending';
  }

  isAuthorizedForAction(): boolean {
    if (!this.resignation) return false;
    
    // Check if Manager Review is active
    if (this.resignation.current_workflow_step === 'Manager Review') {
      return this.currentUserRole === 'admin' || 
             this.currentUserRole === 'hr' || 
             this.currentUserEmployeeId === this.resignation.reporting_manager_id;
    }

    // Check if HR Approval is active
    if (this.resignation.current_workflow_step === 'HR Approval') {
      return this.currentUserRole === 'admin' || this.currentUserRole === 'hr';
    }

    return false;
  }

  getCompletedClearanceCount(): number {
    return this.clearanceTasks ? this.clearanceTasks.filter(t => t.status === 'Completed').length : 0;
  }

  getGrossAdditions(): number {
    const form = this.settlementForm;
    return Number(form.pending_salary || 0) + Number(form.leave_encashment || 0) + Number(form.bonus || 0);
  }

  getGrossDeductions(): number {
    const form = this.settlementForm;
    return Number(form.recoveries || 0) + Number(form.deductions || 0);
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
