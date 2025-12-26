import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonList, IonItem, IonLabel, IonIcon,
  IonButton, IonAvatar, IonBadge, AlertController, IonSpinner,
  IonInput, ToastController, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { 
  personOutline, mailOutline, callOutline, businessOutline, 
  briefcaseOutline, calendarOutline, logOutOutline, settingsOutline,
  notificationsOutline, cardOutline, locationOutline, shieldOutline,
  waterOutline, heartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonIcon,
    IonButton, IonAvatar, IonBadge, IonSpinner, IonInput,
    IonButtons, IonBackButton
  ]
})
export class ProfilePage implements OnInit, OnDestroy {
  user: User | null = null;
  employeeData: any = null;
  isLoading = true;
  isEditMode = false;
  profileForm!: FormGroup;
  private userSubscription?: Subscription;

  menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', action: 'edit-profile' },
    { icon: 'settings-outline', label: 'Settings', action: 'settings' },
    { icon: 'notifications-outline', label: 'Notifications', action: 'notifications' },
    { icon: 'log-out-outline', label: 'Logout', action: 'logout', color: 'danger' }
  ];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    addIcons({ 
      personOutline, mailOutline, callOutline, businessOutline, 
      briefcaseOutline, calendarOutline, logOutOutline, settingsOutline,
      notificationsOutline, cardOutline, locationOutline, shieldOutline,
      waterOutline, heartOutline
    });
  }

  ngOnInit() {
    // Subscribe to user changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadEmployeeProfile();
      }
    });
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      PersonalEmail: ['', [Validators.email]],
      DateOfBirth: [''],
      Gender: [''],
      BloodGroup: [''],
      MaritalStatus: [''],
      current_address_line1: [''],
      current_address_line2: [''],
      current_city: [''],
      current_state: [''],
      current_zip: [''],
      current_country: [''],
      father_name: [''],
      mother_name: [''],
      spouse_name: ['']
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadEmployeeProfile() {
    this.isLoading = true;
    this.http.get<any>(`${environment.apiUrl}/employees/profile/me`).subscribe({
      next: (data) => {
        this.employeeData = data;
        this.populateForm(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      }
    });
  }

  populateForm(data: any) {
    if (data) {
      this.profileForm.patchValue({
        PersonalEmail: data.PersonalEmail || '',
        DateOfBirth: data.DateOfBirth ? data.DateOfBirth.split('T')[0] : '',
        Gender: data.Gender || '',
        BloodGroup: data.BloodGroup || '',
        MaritalStatus: data.MaritalStatus || '',
        current_address_line1: data.current_address_line1 || '',
        current_address_line2: data.current_address_line2 || '',
        current_city: data.current_city || '',
        current_state: data.current_state || '',
        current_zip: data.current_zip || '',
        current_country: data.current_country || '',
        father_name: data.father_name || '',
        mother_name: data.mother_name || '',
        spouse_name: data.spouse_name || ''
      });
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      // Reset form when canceling
      this.populateForm(this.employeeData);
    }
  }

  async saveProfile() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      
      // Clean the data - remove null/undefined values and convert empty strings to null
      const formValue = this.profileForm.value;
      const updateData: any = {};
      
      Object.keys(formValue).forEach(key => {
        const value = formValue[key];
        if (value !== null && value !== undefined && value !== '') {
          updateData[key] = value;
        }
      });
      
      console.log('Sending update data:', updateData);
      
      this.http.put(`${environment.apiUrl}/employees/profile/me`, updateData).subscribe({
        next: async (response) => {
          await this.showToast('Profile updated successfully!', 'success');
          this.isEditMode = false;
          this.loadEmployeeProfile();
        },
        error: async (error) => {
          console.error('Error updating profile:', error);
          const errorMessage = error.error?.error || error.error?.message || 'Failed to update profile';
          await this.showToast(errorMessage, 'danger');
          this.isLoading = false;
        }
      });
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  async handleMenuClick(action: string) {
    if (action === 'logout') {
      await this.confirmLogout();
    } else if (action === 'notifications') {
      this.router.navigate(['/notifications']);
    } else if (action === 'edit-profile') {
      this.toggleEditMode();
    } else {
      // Handle other menu items
      console.log('Action:', action);
    }
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/avatar-placeholder.png';
  }
}
