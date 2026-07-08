import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonicModule, ToastController, IonPopover } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaverequestService } from '../../../core/services/leaverequest.service';

@Component({
  selector: 'app-comp-off-request',
  standalone: true,
  templateUrl: './comp-off-request.component.html',
  styleUrls: ['./comp-off-request.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CompOffRequestComponent implements OnInit {
  @Output() compOffSubmitted = new EventEmitter<void>();

  compOffForm!: FormGroup;
  selectedDate = '';
  wordsCount = 0;
  maxDate = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private leaveRequestService: LeaverequestService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.compOffForm = this.fb.group({
      date_worked: ['', Validators.required],
      total_days: ['1.0', Validators.required],
      reason: ['', Validators.required]
    });
  }

  onDateChange(event: any, popover: IonPopover) {
    const val = event.detail.value;
    this.compOffForm.patchValue({ date_worked: val });
    this.selectedDate = val;
    popover.dismiss();
  }

  validateWordLimit(event: any) {
    const text = event.target.value || '';
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    this.wordsCount = words.length;
    if (words.length > 100) {
      this.compOffForm.patchValue({
        reason: words.slice(0, 100).join(' ')
      });
      this.wordsCount = 100;
    }
  }

  submitRequest() {
    if (this.compOffForm.invalid) {
      this.presentToast('Please fill all required fields', 'warning');
      return;
    }

    const val = this.compOffForm.value;
    const payload = {
      date_worked: val.date_worked,
      total_days: parseFloat(val.total_days),
      reason: val.reason
    };

    this.leaveRequestService.applyCompOff(payload).subscribe({
      next: () => {
        this.compOffForm.reset({ total_days: '1.0' });
        this.selectedDate = '';
        this.wordsCount = 0;
        this.presentToast('Comp Off request submitted successfully', 'success');
        this.compOffSubmitted.emit();
      },
      error: (err) => {
        this.presentToast(err?.error?.error || 'Failed to submit Comp Off request', 'danger');
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
