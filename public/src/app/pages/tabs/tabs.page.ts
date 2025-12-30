import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, calendarOutline, documentTextOutline, personOutline, timeOutline, peopleOutline, checkmarkDoneOutline, cashOutline } from 'ionicons/icons';
import { AuthService, User } from '@core/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage implements OnInit {
  user: User | null = null;
  isManager = false;
  isHR = false;
  isHROrAdmin = false;

  constructor(private authService: AuthService) {
    addIcons({ homeOutline, calendarOutline, documentTextOutline, timeOutline, personOutline, peopleOutline, checkmarkDoneOutline, cashOutline });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isManager = user?.role === 'manager' || user?.role === 'admin' || user?.role === 'hr';
      this.isHR = user?.role === 'hr';
      this.isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';
    });
  }
}
