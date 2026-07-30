import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  TimeTrackingPolicyService,
  TimeTrackingPolicyPayload
} from '../../../../core/services/time-tracking-policy.service';
import { AdminService } from '../../../../core/services/admin.service';

export interface WizardStep {
  index: number;
  label: string;
  description: string;
}

@Component({
  selector: 'app-time-tracking-wizard',
  templateUrl: './time-tracking-wizard.page.html',
  styleUrls: ['./time-tracking-wizard.page.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class TimeTrackingWizardPage implements OnInit {

  // ─── Wizard State ─────────────────────────────────────────────────
  currentStep = 1;
  totalSteps = 5;
  isEditMode = false;
  editingPolicyId: number | null = null;
  loading = false;
  loadingData = false;

  steps: WizardStep[] = [
    { index: 1, label: 'Basic Information',        description: 'Policy name, sites, and effective date' },
    { index: 2, label: 'Biometric & Web Clock-In', description: 'Clock-in methods and device settings' },
    { index: 3, label: 'Remote Punches',           description: 'GPS and selfie punch configuration' },
    { index: 4, label: 'WFH / On Duty',            description: 'Work from home and on-duty rules' },
    { index: 5, label: 'Regularization',           description: 'Attendance regularization settings' }
  ];

  // ─── Step 1 — Basic Information ───────────────────────────────────
  step1Form!: FormGroup;
  allLocations: any[] = [];
  selectedSiteIds: number[] = [];

  // ─── Step 2 — Biometric & Web Clock-In ───────────────────────────
  step2Form!: FormGroup;

  // ─── Step 3 — Remote Punches ──────────────────────────────────────
  step3Form!: FormGroup;

  // ─── Step 4 — WFH / On Duty ──────────────────────────────────────
  step4Form!: FormGroup;

  // ─── Step 5 — Regularization ──────────────────────────────────────
  step5Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private policyService: TimeTrackingPolicyService,
    private adminService: AdminService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.initAllForms();
    this.loadLocations();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editingPolicyId = +id;
      this.loadExistingPolicy(+id);
    }
  }

  // ─── Form Initialization ──────────────────────────────────────────
  private initAllForms() {
    // Step 1: Basic Information
    this.step1Form = this.fb.group({
      name:           ['', [Validators.required, Validators.minLength(3)]],
      description:    [''],
      status:         ['active', Validators.required],
      effective_date: ['', Validators.required]
    });

    // Step 2: Biometric & Web Clock-In
    this.step2Form = this.fb.group({
      biometric_enabled:          [false],
      web_clockin_enabled:        [true],
      selfie_required:            [false],
      device_whitelist_mode:      [false],
      clockin_grace_minutes:      [15],
      max_clockin_attempts:       [3],
      clockout_reminder_enabled:  [false],
      clockout_reminder_minutes:  [30]
    });

    // Step 3: Remote Punches
    this.step3Form = this.fb.group({
      mobile_punch_enabled:   [false],
      gps_required:           [false],
      gps_radius_meters:      [200],
      gps_accuracy_tolerance: [50],
      mobile_selfie_required: [false],
      field_force_enabled:    [false],
      ip_whitelist_enabled:   [false],
      allowed_ips:            ['']
    });

    // Step 4: WFH / On Duty
    this.step4Form = this.fb.group({
      wfh_enabled:                 [false],
      wfh_approval_required:       [true],
      max_wfh_days_per_month:      [8],
      wfh_punch_method:            ['web'],
      max_consecutive_wfh_days:    [3],
      wfh_advance_notice_days:     [1],
      on_duty_enabled:             [false],
      on_duty_approval_required:   [true],
      on_duty_max_radius_km:       [0],
      on_duty_advance_notice_days: [1]
    });

    // Step 5: Regularization
    this.step5Form = this.fb.group({
      regularization_enabled:           [true],
      employee_self_regularization:     [true],
      regularization_window_days:       [7, Validators.required],
      max_regularizations_per_month:    [5],
      regularization_approval_level:    ['manager', Validators.required],
      auto_approve_enabled:             [false],
      auto_approve_threshold_minutes:   [15],
      auto_approve_per_month_limit:     [2]
    });
  }

  // ─── Data Loading ──────────────────────────────────────────────────
  loadLocations() {
    this.adminService.getLocations().subscribe({
      next: (res) => this.allLocations = res || [],
      error: () => this.allLocations = []
    });
  }

  loadExistingPolicy(id: number) {
    this.loadingData = true;
    this.policyService.getPolicyById(id).subscribe({
      next: (policy: any) => {
        // Step 1
        this.step1Form.patchValue({
          name:           policy.name,
          description:    policy.description || '',
          status:         policy.status,
          effective_date: policy.effective_date
        });
        this.selectedSiteIds = policy.site_ids || [];

        // Steps 2–5 (patch if server returns them)
        if (policy.biometric_settings)   this.step2Form.patchValue(policy.biometric_settings);
        if (policy.remote_punch_settings) this.step3Form.patchValue(policy.remote_punch_settings);
        if (policy.wfh_settings)          this.step4Form.patchValue(policy.wfh_settings);
        if (policy.regularization_settings) this.step5Form.patchValue(policy.regularization_settings);

        this.loadingData = false;
      },
      error: () => {
        this.loadingData = false;
        this.showToast('Failed to load policy details', 'danger');
        this.goBack();
      }
    });
  }

  // ─── Wizard Navigation ────────────────────────────────────────────
  get currentStepForm(): FormGroup {
    const map: Record<number, FormGroup> = {
      1: this.step1Form,
      2: this.step2Form,
      3: this.step3Form,
      4: this.step4Form,
      5: this.step5Form
    };
    return map[this.currentStep];
  }

  get isFirstStep(): boolean { return this.currentStep === 1; }
  get isLastStep(): boolean  { return this.currentStep === this.totalSteps; }

  get progressPercent(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  isStepCompleted(stepIndex: number): boolean { return stepIndex < this.currentStep; }
  isStepActive(stepIndex: number): boolean    { return stepIndex === this.currentStep; }
  canGoToStep(stepIndex: number): boolean     { return stepIndex <= this.currentStep; }

  goToStep(stepIndex: number) {
    if (this.canGoToStep(stepIndex)) {
      this.currentStep = stepIndex;
    }
  }

  nextStep() {
    const form = this.currentStepForm;
    if (form && form.invalid) {
      form.markAllAsTouched();
      this.showToast('Please fill in all required fields before proceeding', 'warning');
      return;
    }
    if (!this.isLastStep) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (!this.isFirstStep) this.currentStep--;
  }

  // ─── Submit ───────────────────────────────────────────────────────
  submit() {
    if (this.step1Form.invalid) {
      this.currentStep = 1;
      this.step1Form.markAllAsTouched();
      this.showToast('Please complete Step 1 (Basic Information)', 'warning');
      return;
    }

    const payload: TimeTrackingPolicyPayload = {
      name:           this.step1Form.value.name,
      description:    this.step1Form.value.description,
      site_ids:       this.selectedSiteIds,
      status:         this.step1Form.value.status,
      effective_date: this.step1Form.value.effective_date,
      // Step 2
      biometric_settings: this.step2Form.value,
      // Step 3
      remote_punch_settings: this.step3Form.value,
      // Step 4
      wfh_settings: this.step4Form.value,
      // Step 5
      regularization_settings: this.step5Form.value
    } as any;

    this.loading = true;
    const action = this.isEditMode
      ? this.policyService.updatePolicy(this.editingPolicyId!, payload)
      : this.policyService.createPolicy(payload);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.showToast(
          this.isEditMode ? 'Policy updated successfully' : 'Policy created successfully',
          'success'
        );
        this.router.navigate(['/administration/time-tracking']);
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to save policy. Please try again.', 'danger');
      }
    });
  }

  cancel() { this.router.navigate(['/administration/time-tracking']); }
  goBack()  { this.router.navigate(['/administration/time-tracking']); }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2500, color: color as any, position: 'top'
    });
    toast.present();
  }
}
