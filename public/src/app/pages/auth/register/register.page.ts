import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonItem, IonLabel, IonInput, IonButton, IonText, IonSelect, IonSelectOption,
  IonSpinner, IonIcon, ToastController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline, callOutline, businessOutline, briefcaseOutline } from 'ionicons/icons';

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
    IonItem, IonLabel, IonInput, IonButton, IonText, IonSelect, IonSelectOption,
    IonSpinner, IonIcon
  ]
})
export class RegisterPage {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ personOutline, mailOutline, lockClosedOutline, callOutline, businessOutline, briefcaseOutline });
    
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: async () => {
        this.isLoading = false;
        await this.showToast('Registration successful!', 'success');
        this.router.navigate(['/tabs/home']);
      },
      error: async (error) => {
        this.isLoading = false;
        await this.showToast(error.error?.message || 'Registration failed. Please try again.', 'danger');
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
