import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonButton, IonIcon, ToastController,
  IonBadge, IonSpinner, IonList, AlertController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LeaveService, LeaveBalance, LeaveTypeOption } from '@core/services/leave.service';
import { addIcons } from 'ionicons';
import { calendarOutline, documentTextOutline, informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.page.html',
  styleUrls: ['./leave-request.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea,
    IonSelect, IonSelectOption, IonButton, IonIcon, IonBadge, IonSpinner, IonList
  ]
})
export class LeaveRequestPage implements OnInit {
  leaveForm: FormGroup;
  isLoading = false;
  isLoadingBalance = true;
  leaveBalances: LeaveBalance[] = [];
  availableLeaveTypes: LeaveTypeOption[] = [];
  selectedLeaveBalance: LeaveBalance | null = null;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ calendarOutline, documentTextOutline, informationCircleOutline });
    
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Watch for leave type selection to update balance display
    this.leaveForm.get('leaveType')?.valueChanges.subscribe(typeId => {
      this.onLeaveTypeChange(typeId);
    });
  }

  ngOnInit() {
    this.loadLeaveBalance();
  }

  async loadLeaveBalance() {
    console.log('Loading leave balance...');
    this.isLoadingBalance = true;

    this.leaveService.getEmployeeLeaveBalance().subscribe({
      next: (balances) => {
        console.log('Leave balances loaded:', balances);
        this.leaveBalances = balances;
        
        if (balances.length === 0) {
          // No balance found, ask to initialize
          this.promptInitializeBalance();
        } else {
          // Extract available leave types from balance
          this.availableLeaveTypes = balances.map(b => ({
            id: b.leave_type_id,
            type_name: b.type_name,
            type_code: b.type_code,
            is_paid: b.is_paid,
            available_days: b.available_days,
            allocated_days: b.allocated_days
          }));
        }
        
        this.isLoadingBalance = false;
      },
      error: async (error) => {
        console.error('Error loading leave balance:', error);
        this.isLoadingBalance = false;
        
        // Check if it's a 404 (no balance initialized)
        if (error.status === 404 || error.error?.message?.includes('not found')) {
          await this.showToast('Leave balance not initialized', 'warning');
          this.promptInitializeBalance();
        } else {
          await this.showToast('Failed to load leave balance', 'danger');
        }
      }
    });
  }

  async promptInitializeBalance() {
    const alert = await this.alertController.create({
      header: 'Initialize Leave Balance',
      message: 'Your leave balance has not been initialized. Would you like to initialize it now based on your leave plan?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Initialize',
          handler: () => {
            this.initializeBalance();
          }
        }
      ]
    });

    await alert.present();
  }

  async initializeBalance() {
    const loading = await this.showLoading('Initializing leave balance...');

    this.leaveService.initializeLeaveBalance().subscribe({
      next: async (response) => {
        console.log('Balance initialized:', response);
        loading.dismiss();
        await this.showToast(response.message || 'Leave balance initialized successfully', 'success');
        // Reload balance
        this.loadLeaveBalance();
      },
      error: async (error) => {
        console.error('Error initializing balance:', error);
        loading.dismiss();
        await this.showToast(error.error?.error || 'Failed to initialize leave balance', 'danger');
      }
    });
  }

  onLeaveTypeChange(typeId: number) {
    if (!typeId) {
      this.selectedLeaveBalance = null;
      return;
    }

    // Find the balance for selected leave type
    this.selectedLeaveBalance = this.leaveBalances.find(b => b.leave_type_id === typeId) || null;
    console.log('Selected leave balance:', this.selectedLeaveBalance);
  }

  async showLoading(message: string) {
    const loading = await this.alertController.create({
      message,
      backdropDismiss: false
    });
    await loading.present();
    return loading;
  }

  async onSubmit() {
    if (this.leaveForm.invalid) {
      await this.showToast('Please fill all required fields', 'warning');
      return;
    }

    // Calculate days
    const formValue = this.leaveForm.value;
    const start = new Date(formValue.startDate);
    const end = new Date(formValue.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Validate against available balance
    if (this.selectedLeaveBalance) {
      if (days > this.selectedLeaveBalance.available_days) {
        await this.showToast(
          `Insufficient balance! You have ${this.selectedLeaveBalance.available_days} days available for ${this.selectedLeaveBalance.type_name}`,
          'warning'
        );
        return;
      }
    }

    this.isLoading = true;

    const leaveData = {
      leave_type_id: formValue.leaveType,
      start_date: formValue.startDate,
      end_date: formValue.endDate,
      number_of_days: days,
      reason: formValue.reason
    };

    console.log('Submitting leave request:', leaveData);

    this.leaveService.requestLeave(leaveData).subscribe({
      next: async (response) => {
        console.log('Leave request submitted:', response);
        this.isLoading = false;
        await this.showToast(response.message || 'Leave request submitted successfully!', 'success');
        this.router.navigate(['/tabs/leaves']);
      },
      error: async (error) => {
        console.error('Error submitting leave:', error);
        this.isLoading = false;
        await this.showToast(error.error?.error || 'Failed to submit leave request', 'danger');
      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
