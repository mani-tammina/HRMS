import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonIcon,
  IonNote,
  IonBadge,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  lockClosedOutline, 
  mailOutline, 
  checkmarkCircle,
  alertCircle,
  informationCircle
} from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface RolePreview {
  employee: {
    id: number;
    employeeNumber: string;
    fullName: string;
    email: string;
    department: string;
  };
  reportCount: number;
  suggestedRole: string;
  roleAssignmentReason: string;
  userExists: boolean;
  currentRole: string | null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonIcon,
    IonNote,
    IonBadge
  ]
})
export class RegisterPage implements OnInit {
  employeeId: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  isChecking = false;
  isRegistering = false;
  
  employeeFound = false;
  rolePreview: RolePreview | null = null;
  
  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      personOutline,
      lockClosedOutline,
      mailOutline,
      checkmarkCircle,
      alertCircle,
      informationCircle
    });
  }

  ngOnInit() {}

  // Check employee ID and preview role
  async checkEmployeeId() {
    if (!this.employeeId || this.employeeId.trim() === '') {
      await this.showToast('Please enter your Employee ID, Number, or Work Email', 'warning');
      return;
    }

    this.isChecking = true;
    this.employeeFound = false;
    this.rolePreview = null;

    try {
      const response = await this.http.get<RolePreview>(
        `${environment.apiUrl}/auth/user/preview-role/${this.employeeId}`
      ).toPromise();

      if (response) {
        this.rolePreview = response;
        this.employeeFound = true;

        if (response.userExists) {
          await this.showAlert(
            'Account Already Exists',
            `An account already exists for ${response.employee.fullName}. Please login instead.`,
            'warning'
          );
        } else {
          await this.showToast('Employee verified! You can now register.', 'success');
        }
      }
    } catch (error: any) {
      console.error('Employee check error:', error);
      
      if (error.status === 404) {
        await this.showAlert(
          'Employee Not Found',
          error.error?.message || 'No employee found with this ID, Number, or Email. Please check and try again.',
          'danger'
        );
      } else if (error.status === 400) {
        await this.showAlert(
          'Validation Error',
          error.error?.message || error.error?.error || 'Please verify your Employee information with HR.',
          'warning'
        );
      } else {
        await this.showToast('Failed to verify employee', 'danger');
      }
    } finally {
      this.isChecking = false;
    }
  }

  // Check password strength
  checkPasswordStrength() {
    const password = this.password;
    
    if (!password) {
      this.passwordStrength = 'weak';
      return;
    }

    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength++;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength++;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      this.passwordStrength = 'weak';
    } else if (strength <= 4) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
  }

  // Register user
  async register() {
    // Validations
    if (!this.employeeId || !this.password || !this.confirmPassword) {
      await this.showToast('Please fill in all fields', 'warning');
      return;
    }

    if (!this.employeeFound || !this.rolePreview) {
      await this.showToast('Please verify your Employee ID first', 'warning');
      return;
    }

    if (this.rolePreview.userExists) {
      await this.showToast('Account already exists. Please login.', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showToast('Passwords do not match', 'danger');
      return;
    }

    if (this.password.length < 8) {
      await this.showToast('Password must be at least 8 characters', 'danger');
      return;
    }

    this.isRegistering = true;

    try {
      const response = await this.http.post(
        `${environment.apiUrl}/auth/user/create-auto`,
        {
          employee_id: this.employeeId, // Send as-is (ID or Number)
          password: this.password
        }
      ).toPromise();

      await this.showSuccessAlert(response);
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.status === 409) {
        await this.showAlert('Account Exists', 'An account already exists for this employee.', 'warning');
      } else if (error.status === 404) {
        await this.showAlert('Employee Not Found', error.error?.message || 'Please verify your Employee ID or Number.', 'danger');
      } else if (error.status === 400) {
        await this.showAlert('Invalid Request', error.error?.message || error.error?.error || 'Please check your input.', 'warning');
      } else {
        await this.showToast(error.error?.error || 'Registration failed', 'danger');
      }
    } finally {
      this.isRegistering = false;
    }
  }

  // Show success alert and redirect to login
  async showSuccessAlert(response: any) {
    const message = `Welcome, ${response.employee.fullName}!\n\nYour account has been created successfully.\n\nEmail: ${response.user.username}\nRole: ${response.user.role.toUpperCase()}\n\n${response.roleAssignmentReason}`;
    
    const alert = await this.alertController.create({
      header: '✅ Registration Successful!',
      message: message,
      cssClass: 'success-alert',
      buttons: [
        {
          text: 'Go to Login',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  // Show alert
  async showAlert(header: string, message: string, type: 'success' | 'warning' | 'danger' = 'success') {
    const alert = await this.alertController.create({
      header,
      message,
      cssClass: `alert-${type}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Show toast
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });

    await toast.present();
  }

  // Navigate to login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Get role badge color
  getRoleBadgeColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'hr':
        return 'primary';
      case 'manager':
        return 'success';
      case 'employee':
        return 'medium';
      case 'admin':
        return 'danger';
      default:
        return 'medium';
    }
  }

  // Get password strength color
  getPasswordStrengthColor(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'strong':
        return 'success';
      default:
        return 'medium';
    }
  }
}
