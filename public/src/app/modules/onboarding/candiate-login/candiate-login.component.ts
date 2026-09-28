import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-candiate-login',
  templateUrl: './candiate-login.component.html',
  styleUrls: ['./candiate-login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class CandiateLoginComponent implements OnInit, OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  loginForm!: FormGroup;
  candidateId: string | null = null;
  candidateData: any = null;
  isLoading = true;
  isVerifying = false;
  errorMessage: string | null = null;

  // Flow State
  currentStep: 'credentials' | 'otp' = 'credentials';

  // OTP Management
  otpDigits: string[] = ['', '', '', '', '', ''];
  otpTimer = 60;
  timerInterval: any = null;
  canResendOtp = false;
  otpError = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.candidateId = this.route.snapshot.paramMap.get('id');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.candidateId) {
      this.candidateService.getCandidateByIdPublic(Number(this.candidateId)).subscribe({
        next: (data: any) => {
          this.candidateData = data?.candidate || data;
          this.isLoading = false;

          // Pre-fill email if available for smooth candidate experience
          const registeredEmail = this.registeredEmail;
          if (registeredEmail) {
            this.loginForm.patchValue({ email: registeredEmail });
          }
        },
        error: (err: any) => {
          console.warn('Candidate info not pre-loaded, allowing direct login:', err);
          this.isLoading = false;
        }
      });
    } else {
      // Direct access mode (no route ID specified)
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  get registeredEmail(): string {
    return (this.candidateData?.email || this.candidateData?.personalDetails?.email || '').trim();
  }

  get candidateDisplayName(): string {
    if (!this.candidateData) return '';
    return this.candidateData.first_name || 
           this.candidateData.personalDetails?.FirstName || 
           this.candidateData.full_name || 
           'Candidate';
  }

  get candidateRole(): string {
    if (!this.candidateData) return '';
    return this.candidateData.position || 
           this.candidateData.jobDetailsForm?.JobTitle || 
           this.candidateData.designation_name || 
           '';
  }

  get maskedEmail(): string {
    const email = this.loginForm.get('email')?.value || this.registeredEmail;
    if (!email) return 'your registered email';
    const [user, domain] = email.split('@');
    if (!domain) return email;
    const maskedUser = user.length > 2 
      ? user.substring(0, 2) + '*'.repeat(Math.max(1, user.length - 2)) 
      : user + '***';
    return `${maskedUser}@${domain}`;
  }

  // Step 1: Submit Email & Generate/Send OTP
  onSubmitCredentials() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toaster.showWarning('Please provide your valid registered email address.');
      return;
    }

    const inputEmail = this.loginForm.value.email.trim().toLowerCase();
    const actualEmail = this.registeredEmail.toLowerCase();

    if (actualEmail && inputEmail !== actualEmail) {
      this.toaster.showError('Email verification failed. Please enter the email where you received the offer letter.');
      return;
    }

    this.isVerifying = true;

    // Call backend to dispatch email OTP
    this.candidateService.sendCandidateOtp(inputEmail, this.candidateId).subscribe({
      next: () => {
        this.isVerifying = false;
        this.otpDigits = ['', '', '', '', '', ''];
        this.otpError = false;
        this.startOtpTimer();
        this.currentStep = 'otp';
        this.toaster.showSuccess(`Verification code sent to your email: ${this.maskedEmail}`);

        setTimeout(() => {
          this.focusOtpBox(0);
        }, 150);
      },
      error: (err: any) => {
        this.isVerifying = false;
        const msg = err?.error?.message || 'Failed to dispatch verification code. Please check the email or contact HR.';
        this.toaster.showError(msg);
      }
    });
  }

  startOtpTimer() {
    this.clearTimer();
    this.otpTimer = 60;
    this.canResendOtp = false;

    this.timerInterval = setInterval(() => {
      if (this.otpTimer > 1) {
        this.otpTimer--;
      } else {
        this.otpTimer = 0;
        this.canResendOtp = true;
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resendOtp() {
    if (!this.canResendOtp) return;
    const inputEmail = this.loginForm.value.email.trim().toLowerCase();

    this.candidateService.sendCandidateOtp(inputEmail, this.candidateId).subscribe({
      next: () => {
        this.otpDigits = ['', '', '', '', '', ''];
        this.otpError = false;
        this.startOtpTimer();
        this.toaster.showSuccess(`New verification code sent to ${this.maskedEmail}`);
        this.focusOtpBox(0);
      },
      error: (err: any) => {
        const msg = err?.error?.message || 'Failed to resend verification code. Please try again.';
        this.toaster.showError(msg);
      }
    });
  }

  // Handle individual OTP digit typing
  onOtpInput(event: any, index: number) {
    const inputVal = event.target.value;
    this.otpError = false;

    // Keep only the last character if multiple typed
    if (inputVal.length > 1) {
      this.otpDigits[index] = inputVal.charAt(inputVal.length - 1);
    } else {
      this.otpDigits[index] = inputVal;
    }

    // Auto-advance to next input if digit entered
    if (this.otpDigits[index] && index < 5) {
      this.focusOtpBox(index + 1);
    }

    // Auto-submit if all 6 digits are filled
    const fullCode = this.otpDigits.join('');
    if (fullCode.length === 6 && !this.otpDigits.includes('')) {
      this.onVerifyOtp();
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otpDigits[index] && index > 0) {
        this.otpDigits[index - 1] = '';
        this.focusOtpBox(index - 1);
        event.preventDefault();
      } else {
        this.otpDigits[index] = '';
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.focusOtpBox(index - 1);
    } else if (event.key === 'ArrowRight' && index < 5) {
      this.focusOtpBox(index + 1);
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const cleanDigits = pasteData.replace(/\D/g, '').slice(0, 6);

    if (cleanDigits.length > 0) {
      for (let i = 0; i < 6; i++) {
        this.otpDigits[i] = cleanDigits[i] || '';
      }
      this.otpError = false;
      const lastIndex = Math.min(cleanDigits.length, 5);
      this.focusOtpBox(lastIndex);

      if (cleanDigits.length === 6) {
        this.onVerifyOtp();
      }
    }
  }

  focusOtpBox(index: number) {
    if (this.otpInputs && this.otpInputs.toArray()[index]) {
      this.otpInputs.toArray()[index].nativeElement.focus();
      this.otpInputs.toArray()[index].nativeElement.select();
    }
  }

  // Step 2: Verify Entered OTP
  onVerifyOtp() {
    const enteredOtp = this.otpDigits.join('').trim();
    const inputEmail = this.loginForm.value.email.trim().toLowerCase();

    if (enteredOtp.length < 6) {
      this.otpError = true;
      this.toaster.showWarning('Please enter all 6 digits of the OTP code.');
      return;
    }

    this.isVerifying = true;

    this.candidateService.verifyCandidateOtp(inputEmail, enteredOtp, this.candidateId).subscribe({
      next: (res: any) => {
        this.isVerifying = false;
        const targetId = res?.candidateId || this.candidateId || this.candidateData?.id || '1';
        sessionStorage.setItem('candidate_verified_' + targetId, 'true');
        this.toaster.showSuccess('OTP Verified successfully! Welcome to your Candidate Portal.');
        this.router.navigate(['/candidate-portal', targetId]);
      },
      error: (err: any) => {
        this.isVerifying = false;
        this.otpError = true;
        const errorMsg = err?.error?.message || 'Invalid verification code. Please enter the correct 6-digit code received in your email.';
        this.toaster.showError(errorMsg);
      }
    });
  }

  backToCredentials() {
    this.currentStep = 'credentials';
    this.clearTimer();
    this.otpDigits = ['', '', '', '', '', ''];
    this.otpError = false;
  }
}
