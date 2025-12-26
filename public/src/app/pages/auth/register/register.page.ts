import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonItem, IonLabel, IonInput, IonButton, IonText,
  IonSpinner, IonIcon, ToastController, LoadingController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, checkmarkCircleOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonItem, IonLabel, IonInput, IonButton, IonText,
    IonSpinner, IonIcon
  ]
})
export class RegisterPage {
  registerForm: FormGroup;
  isLoading = false;
  employeeChecked = false;
  employeeData: any = null;
  currentStep: 'check' | 'create' = 'check';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({ mailOutline, lockClosedOutline, checkmarkCircleOutline, personOutline });
    
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  async checkEmployee() {
    const email = this.registerForm.get('email')?.value;
    if (!email) {
      await this.showToast('Please enter your work email', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Checking employee record...'
    });
    await loading.present();

    this.http.get<any>(`${environment.apiUrl}/auth/employee/check?email=${email}`).subscribe({
      next: async (response) => {
        loading.dismiss();
        if (response.found) {
          if (response.hasUserAccount) {
            await this.showToast('User account already exists. Please login instead.', 'warning');
            this.router.navigate(['/login']);
          } else {
            this.employeeChecked = true;
            this.employeeData = response.employee;
            this.currentStep = 'create';
            await this.showToast('Employee found! Please set your password.', 'success');
          }
        } else {
          await this.showToast('Employee not found with this email. Please contact HR.', 'danger');
        }
      },
      error: async (error) => {
        loading.dismiss();
        await this.showToast(error.error?.message || 'Failed to check employee record', 'danger');
      }
    });
  }

  async createUser() {
    if (this.registerForm.invalid) {
      await this.showToast('Please fill all required fields correctly', 'warning');
      return;
    }

    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    const loading = await this.loadingController.create({
      message: 'Creating user account...'
    });
    await loading.present();

    this.http.post<any>(`${environment.apiUrl}/auth/user/create`, {
      email,
      password,
      role: 'employee'
    }).subscribe({
      next: async (response) => {
        loading.dismiss();
        await this.showToast('Account created successfully! You can now login.', 'success');
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        loading.dismiss();
        await this.showToast(error.error?.error || 'Failed to create user account', 'danger');
      }
    });
  }

  resetForm() {
    this.currentStep = 'check';
    this.employeeChecked = false;
    this.employeeData = null;
    this.registerForm.reset();
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
