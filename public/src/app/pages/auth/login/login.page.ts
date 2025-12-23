import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonItem, IonLabel, IonInput, IonButton, IonText,
  IonSpinner, IonIcon, ToastController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonItem, IonLabel, IonInput, IonButton, IonText,
    IonSpinner, IonIcon
  ]
})
export class LoginPage {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: async () => {
        this.isLoading = false;
        await this.showToast('Login successful!', 'success');
        this.router.navigate(['/tabs/home']);
      },
      error: async (error) => {
        this.isLoading = false;
        await this.showToast(error.error?.message || 'Login failed. Please try again.', 'danger');
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
