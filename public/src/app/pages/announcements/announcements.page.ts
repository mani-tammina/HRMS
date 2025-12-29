import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
  IonRefresher, IonRefresherContent, IonChip,
  LoadingController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { megaphoneOutline, alertCircleOutline, informationCircleOutline, calendarOutline } from 'ionicons/icons';
import { AnnouncementsService, Announcement } from '@core/services/announcements.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon,
    IonRefresher, IonRefresherContent, IonChip
  ]
})
export class AnnouncementsPage implements OnInit {
  announcements: Announcement[] = [];
  isLoading = false;

  constructor(
    private announcementsService: AnnouncementsService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({ megaphoneOutline, alertCircleOutline, informationCircleOutline, calendarOutline });
  }

  ngOnInit() {
    this.loadAnnouncements();
  }

  ionViewWillEnter() {
    this.loadAnnouncements();
  }

  async loadAnnouncements(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    this.announcementsService.getAnnouncements().subscribe({
      next: (response) => {
        this.announcements = response.announcements;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error: Error) => {
        console.error('Error loading announcements:', error);
        this.showToast('Failed to load announcements', 'danger');
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  getTypeColor(type: string): string {
    switch (type?.toLowerCase()) {
      case 'urgent': return 'danger';
      case 'policy': return 'warning';
      case 'event': return 'success';
      default: return 'primary';
    }
  }

  getTypeIcon(type: string): string {
    switch (type?.toLowerCase()) {
      case 'urgent': return 'alert-circle-outline';
      case 'event': return 'calendar-outline';
      default: return 'information-circle-outline';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'medium';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
