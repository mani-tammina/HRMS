import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { RouteGuardService } from '../../../core/services/route-guard.service';
import { EmployeeLeavesService } from '../../../core/services/employee-leaves.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  emailChecked = false;
  showPassword = false;
  showCreatePassword = false;
  otpVerified = false;
  loading = false;
  isAdmin = false;
  isEmpId = false;
  empId: number | null = null;
  rolePreviewData: any = null;
  showForgotPassword = false;
  forgotPasswordForm!: FormGroup;
  forgotPasswordSuccess = false;
  showPasswordText = false;
  rememberMe = false;
  usernameFocused = false;
  passwordFocused = false;
  createPwFocused = false;
  forgotPasswordOtpSent = false;
  forgotPasswordOtpVerified = false;

  // Live password strength checks
  showPwStrength = false;
  pwChecks = {
    minLength: false,
    hasUpper: false,
    hasSpecial: false,
    hasNumber: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private employeeLeavesService: EmployeeLeavesService,
    private router: Router,
    private routeGuardService: RouteGuardService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: [''],
      otp: ['']
    });

    this.loginForm.get('email')?.valueChanges.subscribe(() => {
      if (this.emailChecked) {
        this.resetState();
      }
    });

    // Live password strength for Create Password
    this.loginForm.get('password')?.valueChanges.subscribe(val => {
      this.updatePwChecks(val || '');
    });

    this.forgotPasswordForm = this.fb.group({
      employee_id: ['', Validators.required],
      otp: [''],
      password: ['']
    });

    // Live password strength for Reset Password
    this.forgotPasswordForm.get('password')?.valueChanges.subscribe(val => {
      this.updatePwChecks(val || '');
    });
  }

  public resetState() {
    this.emailChecked = false;
    this.showPassword = false;
    this.showCreatePassword = false;
    this.otpVerified = false;
    this.isAdmin = false;
    this.isEmpId = false;
    this.empId = null;
    this.rolePreviewData = null;
    this.loginForm.get('password')?.clearValidators();
    this.loginForm.get('password')?.setErrors(null);
    this.loginForm.get('password')?.setValue('');
    this.loginForm.get('password')?.updateValueAndValidity();
    this.loginForm.get('otp')?.clearValidators();
    this.loginForm.get('otp')?.setErrors(null);
    this.loginForm.get('otp')?.setValue('');
    this.loginForm.get('otp')?.updateValueAndValidity();
  }

  ionViewWillEnter(): void {
    this.resetState();
    this.loginForm.get('email')?.setValue('');
  }

  private isAdminLogin(value: string): boolean {
    return value.toLowerCase().trim() === 'admin';
  }

  async onNext() {
    let emailValue = this.loginForm.get('email')?.value;
    if (!emailValue) return;

    emailValue = emailValue.trim().toLowerCase();
    this.loginForm.get('email')?.setValue(emailValue);
    
    this.isAdmin = this.isAdminLogin(emailValue);

    if (this.isAdmin) {
      this.setupPasswordStep();
      return;
    }

    this.isEmpId = /^\d+$/.test(emailValue);

    const loader = await this.loadingController.create({ message: 'Verifying...' });
    await loader.present();

    this.authService.checkEmployee(emailValue).subscribe({
      next: (res) => {
        loader.dismiss();
        if (!res.found) {
          this.presentToast('Employee not found', 'warning');
          return;
        }

        this.empId = res.employee?.id || (this.isEmpId ? parseInt(emailValue) : null);
        this.fetchRolePreview(emailValue);

        if (res.hasUserAccount) {
          this.emailChecked = true;
          this.showPassword = true;
          this.loginForm.get('password')?.setValidators(Validators.required);
          this.loginForm.get('password')?.updateValueAndValidity();
        } else {
          this.sendCreatePasswordOtp(emailValue);
        }
      },
      error: (err) => {
        loader.dismiss();
        const msg = err.error?.message || err.message || `Failed to verify employee (${err.status || 'no connection'})`;
        this.presentToast(msg, 'danger');
      }
    });
  }

  async sendCreatePasswordOtp(email: string) {
    const loader = await this.loadingController.create({ message: 'Sending OTP to email...' });
    await loader.present();
    
    this.authService.sendOtp(email).subscribe({
      next: (res) => {
        loader.dismiss();
        if (res?.warning) {
          this.presentToast(res.message, 'warning');
        } else {
          this.presentToast('OTP sent to your email address', 'success');
        }
        this.emailChecked = true;
        this.showCreatePassword = true;
        this.otpVerified = false;
        this.loginForm.get('otp')?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
        this.loginForm.get('otp')?.updateValueAndValidity();
        this.loginForm.get('password')?.clearValidators();
        this.loginForm.get('password')?.setValue('');
        this.loginForm.get('password')?.updateValueAndValidity();
      },
      error: (err) => {
        loader.dismiss();
        const msg = err.error?.message || err.error?.error || 'Failed to send OTP. Please try again.';
        this.presentToast(msg, 'danger');
      }
    });
  }

  async verifyOtp() {
    const email = this.loginForm.get('email')?.value?.trim().toLowerCase();
    const otp = this.loginForm.get('otp')?.value?.trim();
    if (!email || !otp || otp.length !== 6) {
      this.presentToast('Please enter a valid 6-digit OTP', 'warning');
      return;
    }

    const loader = await this.loadingController.create({ message: 'Verifying OTP...' });
    await loader.present();

    this.authService.verifyOtp(email, otp).subscribe({
      next: (res) => {
        loader.dismiss();
        this.presentToast('OTP verified successfully! Please set your new password.', 'success');
        this.otpVerified = true;

        // Now that OTP is verified, make password required with strong validators
        this.loginForm.get('password')?.setValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/)
        ]);
        this.loginForm.get('password')?.updateValueAndValidity();
      },
      error: (err) => {
        loader.dismiss();
        const msg = err.error?.error || 'Invalid or expired OTP. Please try again.';
        this.presentToast(msg, 'danger');
      }
    });
  }

  resendOtp() {
    const emailValue = this.loginForm.get('email')?.value;
    if (emailValue) {
      this.sendCreatePasswordOtp(emailValue.trim().toLowerCase());
    }
  }

  private setupPasswordStep() {
    this.emailChecked = true;
    this.showPassword = true;
    this.loginForm.get('password')?.setValidators(Validators.required);
    this.loginForm.get('password')?.updateValueAndValidity();
  }

  private fetchRolePreview(email: string) {
    this.authService.previewRole(email).subscribe({
      next: (roleRes) => {
        this.rolePreviewData = roleRes;
        if (roleRes.hasTeam || roleRes.reportingMembers?.length > 0) {
          sessionStorage.setItem('hasTeam', 'true');
        }
      },
      error: (err) => console.warn('Failed to fetch role preview:', err)
    });
  }

  async onSubmit() {
    if (!this.emailChecked) {
      this.onNext();
      return;
    }

    if (this.showCreatePassword && !this.otpVerified) {
      this.presentToast('Please verify your OTP first', 'warning');
      return;
    }

    if (this.loginForm.invalid) {
      this.presentToast('Please fill all fields', 'warning');
      return;
    }

    // Validate password strength only for the Create Password step
    if (this.showCreatePassword && this.otpVerified) {
      const pwValid = this.validatePassword(this.loginForm.get('password')?.value);
      if (!pwValid) return;
    }

    const { email, password, otp } = this.loginForm.value;
    const loader = await this.loadingController.create({ message: 'Signing in...' });
    await loader.present();

    if (this.isAdmin) {
      this.authService.login({ username: email, password }).subscribe({
        next: () => {
          loader.dismiss();
          this.navigateBasedOnRole();
        },
        error: (err) => {
          loader.dismiss();
          const msg = err.error?.message || err.message || `Login failed (${err.status || 'no connection'})`;
          this.presentToast(msg, 'danger');
        }
      });
      return;
    }

    const isCreate = this.showCreatePassword;
    let authSource$: Observable<any>;
    
    if (isCreate) {
      const createCall$ = this.empId 
        ? this.authService.autoCreateUser(this.empId, password, otp)
        : this.authService.createUser(email, password, otp);

      authSource$ = createCall$.pipe(
        switchMap(res => {
          if (res?.token) return of(res);
          return this.authService.login({ username: email, password });
        }),
        catchError(err => {
          console.warn('Fallback to login:', err);
          return this.authService.login({ username: email, password });
        })
      );
    } else {
      authSource$ = this.authService.login({ username: email, password });
    }

    authSource$.pipe(
      switchMap(() => this.employeeService.getMyProfile(true).pipe(catchError(() => of(null))))
    ).subscribe({
      next: () => {
        loader.dismiss();
        if (isCreate) {
          // Auto-initialize leave balance on first login after password creation
          const currentYear = new Date().getFullYear();
          this.employeeLeavesService.initializeBalance(currentYear).subscribe({
            next: () => {
              console.log('Leave balances initialized successfully');
              this.presentToast('Leave balances initialized successfully!', 'success');
            },
            error: (err) => {
              // Silently ignore — employee may not have a leave plan assigned yet
              console.warn('Leave balance initialization skipped:', err?.error?.error || err?.message);
            }
          });
        }
        this.navigateBasedOnRole();
      },
      error: (err) => {
        loader.dismiss();
        const msg = err.error?.message || 'Authentication failed. Please check credentials.';
        this.presentToast(msg, 'danger');
      }
    });
  }

  async sendForgotPasswordOtp() {
    const email = this.forgotPasswordForm.get('employee_id')?.value?.trim().toLowerCase();
    if (!email) {
      this.presentToast('Please enter your employee email address', 'warning');
      return;
    }

    const loader = await this.loadingController.create({ message: 'Sending OTP...' });
    await loader.present();

    this.authService.sendOtp(email, true).subscribe({
      next: (res) => {
        loader.dismiss();
        if (res?.warning) {
          this.presentToast(res.message, 'warning');
        } else {
          this.presentToast('OTP sent to your email address', 'success');
        }
        this.forgotPasswordOtpSent = true;
        this.forgotPasswordForm.get('otp')?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
        this.forgotPasswordForm.get('otp')?.updateValueAndValidity();
        this.forgotPasswordForm.get('password')?.clearValidators();
        this.forgotPasswordForm.get('password')?.updateValueAndValidity();
      },
      error: (err) => {
        loader.dismiss();
        // If the backend rejects with "User account already exists" during a password reset,
        // it means the user has an account (which is required for reset). Treat as success
        // and proceed to OTP entry — the OTP was likely still sent.
        const backendMessage: string = err.error?.message || err.error?.error || '';
        const isAccountExistsError = backendMessage.toLowerCase().includes('already exists');

        if (isAccountExistsError) {
          this.presentToast('OTP sent to your email address', 'success');
          this.forgotPasswordOtpSent = true;
          this.forgotPasswordForm.get('otp')?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
          this.forgotPasswordForm.get('otp')?.updateValueAndValidity();
          this.forgotPasswordForm.get('password')?.clearValidators();
          this.forgotPasswordForm.get('password')?.updateValueAndValidity();
        } else {
          const msg = backendMessage || 'Failed to send OTP. Please try again.';
          this.presentToast(msg, 'danger');
        }
      }
    });
  }

  async verifyForgotPasswordOtp() {
    const email = this.forgotPasswordForm.get('employee_id')?.value?.trim().toLowerCase();
    const otp = this.forgotPasswordForm.get('otp')?.value?.trim();
    if (!email || !otp || otp.length !== 6) {
      this.presentToast('Please enter a valid 6-digit OTP', 'warning');
      return;
    }

    const loader = await this.loadingController.create({ message: 'Verifying OTP...' });
    await loader.present();

    this.authService.verifyOtp(email, otp).subscribe({
      next: (res) => {
        loader.dismiss();
        this.presentToast('OTP verified successfully! Please enter your new password.', 'success');
        this.forgotPasswordOtpVerified = true;
        this.forgotPasswordForm.get('password')?.setValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/)
        ]);
        this.forgotPasswordForm.get('password')?.updateValueAndValidity();
      },
      error: (err) => {
        loader.dismiss();
        const msg = err.error?.error || 'Invalid or expired OTP. Please try again.';
        this.presentToast(msg, 'danger');
      }
    });
  }

  resendForgotPasswordOtp() {
    this.sendForgotPasswordOtp();
  }

  async onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    // Validate password strength before resetting
    const pwValid = this.validatePassword(this.forgotPasswordForm.get('password')?.value);
    if (!pwValid) return;

    const loader = await this.loadingController.create({ message: 'Resetting password...' });
    await loader.present();
    
    const { employee_id, password, otp } = this.forgotPasswordForm.value;
    this.authService.createPassword(employee_id, password, '', otp).subscribe({
      next: (res) => {
        this.forgotPasswordSuccess = true;
        this.showForgotPassword = false;
        this.presentToast('Password reset successful! Logging you in...', 'success');
        // Use the WorkEmail returned from API as the login username (not the raw employee_id)
        const loginUsername = res?.username || employee_id;
        this.authService.login({ username: loginUsername, password }).subscribe({
          next: () => {
            loader.dismiss();
            this.navigateBasedOnRole();
          },
          error: () => {
            loader.dismiss();
            this.presentToast('Password reset successfully! Please log in with your new password.', 'success');
            this.showForgotPassword = false;
          }
        });
      },
      error: (err) => {
        loader.dismiss();
        const msg = err.error?.error || 'Failed to reset password.';
        this.presentToast(msg, 'danger');
      }
    });
  }

  private navigateBasedOnRole() {
    const role = this.routeGuardService.userRole?.toLowerCase();
    const destination = role === 'admin' ? '/administration' : '/Home';
    this.router.navigate([destination], { replaceUrl: true });
  }

  /** Updates the live pw check flags. */
  updatePwChecks(pw: string) {
    this.pwChecks.minLength = pw.length >= 8;
    this.pwChecks.hasUpper  = /[A-Z]/.test(pw);
    this.pwChecks.hasSpecial = /[^A-Za-z0-9]/.test(pw);
    this.pwChecks.hasNumber  = /[0-9]/.test(pw);
  }

  /**
   * Validates password strength.
   * Rules: min 8 chars, at least one uppercase, one special char, one number.
   * If any rule fails, shows ONE toast listing ALL failed rules.
   * Returns true if all rules pass, false otherwise.
   */
  validatePassword(password: string): boolean {
    const failures: string[] = [];
    if (!password || password.length < 8)    failures.push('Min 8 characters');
    if (!/[A-Z]/.test(password))             failures.push('1 uppercase letter');
    if (!/[0-9]/.test(password))             failures.push('1 number');
    if (!/[^A-Za-z0-9]/.test(password))      failures.push('1 special character');
    if (failures.length > 0) {
      this.presentToast('Password must have: ' + failures.join(' · '), 'warning');
      return false;
    }
    return true;
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message, duration: 3000, color: color as any, position: 'top'
    });
    await toast.present();
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
    if (this.showForgotPassword) {
      this.forgotPasswordForm.reset();
      this.forgotPasswordOtpSent = false;
      this.forgotPasswordOtpVerified = false;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.emailChecked) {
      this.onNext();
    }
  }
}
