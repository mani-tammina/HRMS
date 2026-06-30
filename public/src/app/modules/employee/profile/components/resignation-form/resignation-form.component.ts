import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController, LoadingController } from '@ionic/angular';
import { SeparationService } from '../../../../../core/services/separation.service';
import { AdminService } from '../../../../../core/services/admin.service';

@Component({
  selector: 'app-resignation-form',
  templateUrl: './resignation-form.component.html',
  styleUrls: ['./resignation-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResignationFormComponent implements OnInit {
  @Input() currentEmployee: any;

  resignationForm!: FormGroup;
  noticePeriodDays = 30;
  calculatedLastWorkingDate: Date = new Date();
  minPreferredDate: string = '';
  resSettings: any = null;
  weekOffDays: number[] = [0, 6];

  reasons: string[] = [
    'Career Growth',
    'Better Opportunity',
    'Higher Studies',
    'Relocation',
    'Personal Reasons',
    'Health Reasons',
    'Work Environment',
    'Compensation',
    'Family Commitments',
    'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private separationService: SeparationService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.initForm();
    this.setupMinDate();
    this.loadNoticePeriod();
    this.loadReasons();
    this.loadResSettings();
    this.loadWeeklyOffPolicy();
  }

  loadReasons() {
    this.separationService.getActiveResignationReasons().subscribe({
      next: (reasonsList) => {
        if (reasonsList && reasonsList.length > 0) {
          this.reasons = reasonsList.map(r => r.reason);
        }
      },
      error: (err) => {
        console.error('Error fetching resignation reasons:', err);
      }
    });
  }

  loadResSettings() {
    this.separationService.getResignationSettings().subscribe({
      next: (settings) => {
        this.resSettings = settings;
      },
      error: (err) => {
        console.error('Error fetching resignation settings:', err);
      }
    });
  }

  initForm() {
    this.resignationForm = this.fb.group({
      discussed_with_manager: ['No', Validators.required],
      discussion_summary: [''],
      reason: ['', Validators.required],
      early_relieving_request: ['No', Validators.required],
      preferred_last_working_date: [''],
      reason_for_early_relieving: [''],
      additional_comments: ['']
    });

    // Handle discussion summary validation dynamically
    this.resignationForm.get('discussed_with_manager')?.valueChanges.subscribe(value => {
      const summaryCtrl = this.resignationForm.get('discussion_summary');
      if (value === 'Yes') {
        summaryCtrl?.setValidators([Validators.required]);
      } else {
        summaryCtrl?.clearValidators();
        summaryCtrl?.setValue('');
      }
      summaryCtrl?.updateValueAndValidity();
    });

    // Handle early relieving fields validation dynamically
    this.resignationForm.get('early_relieving_request')?.valueChanges.subscribe(value => {
      const prefDateCtrl = this.resignationForm.get('preferred_last_working_date');
      const prefReasonCtrl = this.resignationForm.get('reason_for_early_relieving');
      
      if (value === 'Yes') {
        prefDateCtrl?.setValidators([Validators.required]);
        prefReasonCtrl?.setValidators([Validators.required]);
      } else {
        prefDateCtrl?.clearValidators();
        prefDateCtrl?.setValue('');
        prefReasonCtrl?.clearValidators();
        prefReasonCtrl?.setValue('');
      }
      prefDateCtrl?.updateValueAndValidity();
      prefReasonCtrl?.updateValueAndValidity();
    });

    // Handle weekend validation check
    this.resignationForm.get('preferred_last_working_date')?.valueChanges.subscribe(value => {
      if (value && (this.resSettings?.notallowholiday_weekend ?? true)) {
        const dateObj = new Date(value);
        const day = dateObj.getDay(); // 0 is Sunday, 6 is Saturday
        if (this.weekOffDays.includes(day)) {
          this.presentToast('We can\'t select last working day on weekends', 'danger');
          setTimeout(() => {
            this.resignationForm.get('preferred_last_working_date')?.setValue(null, { emitEvent: false });
          });
        }
      }
    });
  }

  loadWeeklyOffPolicy() {
    this.adminService.getWeeklyOffPolicies().subscribe(policies => {
      const myPolicyId = this.currentEmployee?.weekly_off_policy_id;
      if (myPolicyId && policies && policies.length > 0) {
        const policy = policies.find((p: any) => p.id === myPolicyId);
        if (policy) {
          this.weekOffDays = [];
          if (Number(policy.sunday_off) === 1) this.weekOffDays.push(0);
          if (Number(policy.monday_off) === 1) this.weekOffDays.push(1);
          if (Number(policy.tuesday_off) === 1) this.weekOffDays.push(2);
          if (Number(policy.wednesday_off) === 1) this.weekOffDays.push(3);
          if (Number(policy.thursday_off) === 1) this.weekOffDays.push(4);
          if (Number(policy.friday_off) === 1) this.weekOffDays.push(5);
          if (Number(policy.saturday_off) === 1) this.weekOffDays.push(6);
        }
      }
    });
  }

  setupMinDate() {
    const today = new Date();
    // Min preferred LWD is tomorrow
    today.setDate(today.getDate() + 1);
    this.minPreferredDate = today.toISOString().split('T')[0];
  }

  loadNoticePeriod() {
    if (this.currentEmployee?.DepartmentId) {
      this.separationService.getNoticePeriods().subscribe({
        next: (configs) => {
          const config = configs.find(c => c.department_id === this.currentEmployee.DepartmentId);
          if (config) {
            this.noticePeriodDays = config.notice_period_days;
          }
          this.calculateLastWorkingDate();
        },
        error: (err) => {
          console.error('Error fetching notice periods:', err);
          this.calculateLastWorkingDate();
        }
      });
    } else {
      this.calculateLastWorkingDate();
    }
  }

  calculateLastWorkingDate() {
    const lwd = new Date();
    lwd.setDate(lwd.getDate() + this.noticePeriodDays);
    this.calculatedLastWorkingDate = lwd;
  }

  async onSubmit() {
    if (this.resignationForm.invalid) {
      this.presentToast('Please check all required fields.', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Submitting resignation request...',
      spinner: 'crescent'
    });
    await loading.present();

    const formData = {
      discussed_with_manager: this.resignationForm.value.discussed_with_manager,
      discussion_summary: this.resignationForm.value.discussion_summary,
      reason: this.resignationForm.value.reason,
      early_relieving_request: this.resignationForm.value.early_relieving_request,
      preferred_last_working_date: this.resignationForm.value.preferred_last_working_date,
      additional_comments: this.resignationForm.value.additional_comments
    };

    this.separationService.applyResignation(formData).subscribe({
      next: (res) => {
        loading.dismiss();
        this.presentToast('Resignation submitted successfully.', 'success');
        this.modalController.dismiss({ submitted: true });
      },
      error: (err) => {
        loading.dismiss();
        this.presentToast(err.error?.error || 'Failed to submit resignation request.', 'danger');
      }
    });
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
