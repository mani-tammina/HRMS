import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonButton, IonIcon, ToastController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LeaveService } from '@core/services/leave.service';
import { addIcons } from 'ionicons';
import { calendarOutline, documentTextOutline } from 'ionicons/icons';

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
    IonSelect, IonSelectOption, IonButton, IonIcon
  ]
})
export class LeaveRequestPage {
  leaveForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ calendarOutline, documentTextOutline });
    
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.leaveForm.invalid) {
      await this.showToast('Please fill all required fields', 'warning');
      return;
    }

    this.isLoading = true;
    const formValue = this.leaveForm.value;
    
    // Calculate days
    const start = new Date(formValue.startDate);
    const end = new Date(formValue.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const leaveData = {
      ...formValue,
      days
    };

    this.leaveService.requestLeave(leaveData).subscribe({
      next: async () => {
        this.isLoading = false;
        await this.showToast('Leave request submitted successfully!', 'success');
        this.router.navigate(['/tabs/leaves']);
      },
      error: async (error) => {
        this.isLoading = false;
        await this.showToast(error.error?.message || 'Failed to submit leave request', 'danger');
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
