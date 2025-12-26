import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonList, IonItem, IonLabel, IonIcon,
  IonButton, IonAvatar, IonBadge, AlertController, IonSpinner
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
  notificationsOutline, cardOutline, locationOutline, shieldOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonIcon,
    IonButton, IonAvatar, IonBadge, IonSpinner
  ]
})
export class ProfilePage implements OnInit, OnDestroy {
  user: User | null = null;
  employeeData: any = null;
  isLoading = true;
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
    private alertController: AlertController
  ) {
    addIcons({ 
      personOutline, mailOutline, callOutline, businessOutline, 
      briefcaseOutline, calendarOutline, logOutOutline, settingsOutline,
      notificationsOutline, cardOutline, locationOutline, shieldOutline
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
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      }
    });
  }

  async handleMenuClick(action: string) {
    if (action === 'logout') {
      await this.confirmLogout();
    } else if (action === 'notifications') {
      this.router.navigate(['/notifications']);
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
