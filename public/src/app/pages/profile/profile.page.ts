import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonList, IonItem, IonLabel, IonIcon,
  IonButton, IonAvatar, IonBadge, AlertController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@core/services/auth.service';
import { addIcons } from 'ionicons';
import { 
  personOutline, mailOutline, callOutline, businessOutline, 
  briefcaseOutline, calendarOutline, logOutOutline, settingsOutline,
  notificationsOutline
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
    IonButton, IonAvatar, IonBadge
  ]
})
export class ProfilePage {
  user: User | null = null;

  menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', action: 'edit-profile' },
    { icon: 'settings-outline', label: 'Settings', action: 'settings' },
    { icon: 'notifications-outline', label: 'Notifications', action: 'notifications' },
    { icon: 'log-out-outline', label: 'Logout', action: 'logout', color: 'danger' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ 
      personOutline, mailOutline, callOutline, businessOutline, 
      briefcaseOutline, calendarOutline, logOutOutline, settingsOutline,
      notificationsOutline
    });
    this.user = this.authService.getCurrentUser();
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
}
