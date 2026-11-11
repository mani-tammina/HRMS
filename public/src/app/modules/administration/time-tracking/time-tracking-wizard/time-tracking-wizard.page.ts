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
      biometric_enabled:           [true],
      allow_web_clockin_fallback:  ['yes'],
      web_clockin_enabled:         [true],
      web_clockin_comment_required:[false],
      ip_restriction_enabled:      [true],
      ip_networks:                 [[]],
      selfie_required:             [false],
      device_whitelist_mode:       [false],
      clockin_grace_minutes:       [15],
      max_clockin_attempts:        [3],
      clockout_reminder_enabled:   [false],
      clockout_reminder_minutes:   [30]
    });

    // Step 3: Remote Punches
    this.step3Form = this.fb.group({
      remote_clockin_mobile_enabled:    [false],
      remote_clockin_web_enabled:       [true],
      remote_clockin_comment_required:  ['yes'],
      remote_clockin_approval_required: ['yes'],
      remote_clockin_approval_chain:    [[
        {
          level: 1,
          members: [
            { type: 'role', value: 'RM', label: 'Reporting Manager' }
          ]
        }
      ]]
    });

    // Step 4: WFH / On Duty
    this.step4Form = this.fb.group({
      wfh_enabled:                          [true],
      wfh_halfday_allowed:                  [true],
      wfh_hourly_allowed:                   [false],
      wfh_attachment_required:              [false],
      wfh_clockin_allowed:                  [true],
      wfh_limit_days_enabled:               [false],
      wfh_limit_days_value:                 [1],
      wfh_limit_days_period:                ['Week'],
      wfh_limit_times_enabled:              [false],
      wfh_limit_times_value:                [1],
      wfh_limit_times_period:               ['Week'],
      wfh_past_dated_limit_months_enabled:  [false],
      wfh_past_dated_limit_months_value:    [''],
      wfh_past_dated_limit_months_day:      [''],
      wfh_past_dated_limit_days_enabled:    [false],
      wfh_past_dated_limit_days_value:      [1],
      wfh_restrict_on_days_enabled:         [false],
      wfh_restrict_on_days_type:            ['Holidays & Weekly Offs'],
      wfh_prior_notice_enabled:             [false],
      wfh_prior_notice_days:                [1],
      wfh_prior_notice_working_days:        [0],
      wfh_no_sooner_enabled:                [false],
      wfh_no_sooner_days:                   [1],
      wfh_allowed_days_enabled:             [false],
      wfh_allowed_days:                     [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']],
      wfh_requires_approval_exceed_enabled: [true],
      wfh_requires_approval_exceed_value:   [0],
      wfh_requires_approval_exceed_period:  ['Week'],
      wfh_approval_chain:                   [[
        {
          level: 1,
          members: [
            { type: 'role', value: 'RM', label: 'Reporting Manager' }
          ]
        }
      ]],
      wfh_auto_approve_unregistered:        [false],
      wfh_pause_email_notifications:        [false]
    });

    // Step 5: Regularization
    this.step5Form = this.fb.group({
      allow_adjust_logs:            ['no'],
      adjust_logs_type:             ['All Attendance Logs'],
      allow_regularise_logs:        ['no'],
      allow_partial_days:           ['yes'],
      partial_days_basis:           ['Cumulative (total) minutes in a period'],
      partial_days_allowed_minutes: [90],
      partial_days_allowed_period:  ['Month'],
      late_arrival_enabled:         [true],
      late_arrival_max_minutes:     [90],
      early_leaving_enabled:        [true],
      early_leaving_max_minutes:    [90],
      anytime_leave_enabled:        [true],
      anytime_leave_max_minutes:    [90],
      partial_days_comment_required:                 [false],
      partial_days_how_soon_days:                    [2],
      partial_days_past_dated_allowed:               ['yes'],
      partial_days_past_dated_limit_days_enabled:    [true],
      partial_days_past_dated_limit_days_value:      [5],
      partial_days_restrict_after_enabled:           [false],
      partial_days_restrict_after_day:               [''],
      partial_days_requires_approval_exceed_enabled: [true],
      partial_days_requires_approval_exceed_value:   [0],
      partial_days_requires_approval_exceed_period:  ['Week'],
      partial_days_approval_chain:                   [[
        {
          level: 1,
          members: [
            { type: 'role', value: 'RM', label: 'Reporting Manager' }
          ]
        }
      ]]
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
