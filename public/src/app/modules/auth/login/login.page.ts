import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { RouteGuardService } from '../../../core/services/route-guard.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
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

    this.forgotPasswordForm = this.fb.group({
      employee_id: ['', Validators.required],
      password: ['', Validators.required]
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
      error: () => {
        loader.dismiss();
        this.presentToast('Failed to verify employee', 'danger');
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
        const msg = err.error?.error || 'Failed to send OTP. Please try again.';
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
        
        // Now that OTP is verified, make password required
        this.loginForm.get('password')?.setValidators(Validators.required);
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

    const { email, password, otp } = this.loginForm.value;
    const loader = await this.loadingController.create({ message: 'Signing in...' });
    await loader.present();

    if (this.isAdmin) {
      this.authService.login({ username: email, password }).subscribe({
        next: () => {
          loader.dismiss();
          this.navigateBasedOnRole();
        },
        error: () => {
          loader.dismiss();
          this.presentToast('Invalid admin credentials', 'danger');
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
        this.navigateBasedOnRole();
      },
      error: (err) => {
        loader.dismiss();
        const msg = err.error?.message || 'Authentication failed. Please check credentials.';
        this.presentToast(msg, 'danger');
      }
    });
  }

  async onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) return;
    const loader = await this.loadingController.create({ message: 'Resetting password...' });
    await loader.present();
    
    const { employee_id, password } = this.forgotPasswordForm.value;
    this.authService.createPassword(employee_id, password, '').subscribe({
      next: () => {
        this.forgotPasswordSuccess = true;
        this.showForgotPassword = false;
        this.presentToast('Password reset successful! Logging you in...', 'success');
        this.authService.login({ username: employee_id, password }).subscribe({
          next: () => {
            loader.dismiss();
            this.navigateBasedOnRole();
          },
          error: () => {
            loader.dismiss();
            this.presentToast('Password reset, but auto-login failed.', 'warning');
            this.showForgotPassword = false;
          }
        });
      },
      error: () => {
        loader.dismiss();
        this.presentToast('Failed to reset password.', 'danger');
      }
    });
  }

  private navigateBasedOnRole() {
    const role = this.routeGuardService.userRole?.toLowerCase();
    const destination = role === 'admin' ? '/administration' : '/Home';
    this.router.navigate([destination], { replaceUrl: true });
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
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.emailChecked) {
      this.onNext();
    }
  }
}
