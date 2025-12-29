import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonMenuButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon, IonSegment, IonSegmentButton,
  IonSelect, IonSelectOption, IonDatetime, IonModal,
  LoadingController, ToastController, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, calendarOutline, checkmarkOutline, closeOutline, timeOutline } from 'ionicons/icons';
import { HolidaysService, Holiday } from '@core/services/holidays.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonMenuButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon, IonSegment, IonSegmentButton,
    IonSelect, IonSelectOption, IonDatetime, IonModal
  ]
})
export class HolidaysPage implements OnInit {
  holidays: Holiday[] = [];
  upcomingHolidays: Holiday[] = [];
  selectedYear: number = new Date().getFullYear();
  years: number[] = [];
  view: 'all' | 'upcoming' = 'all';
  isLoading = false;

  constructor(
    private holidaysService: HolidaysService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ addOutline, calendarOutline, checkmarkOutline, closeOutline, timeOutline });
    
    const currentYear = new Date().getFullYear();
    for (let i = -1; i < 2; i++) {
      this.years.push(currentYear + i);
    }
  }

  ngOnInit() {
    this.loadHolidays();
    this.loadUpcomingHolidays();
  }

  ionViewWillEnter() {
    this.loadHolidays();
    this.loadUpcomingHolidays();
  }

  segmentChanged(event: any) {
    this.view = event.detail.value;
  }

  async loadHolidays(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    this.holidaysService.getAllHolidays(this.selectedYear).subscribe({
      next: (response) => {
        this.holidays = response.holidays.sort((a, b) => 
          new Date(a.holiday_date).getTime() - new Date(b.holiday_date).getTime()
        );
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error: Error) => {
        console.error('Error loading holidays:', error);
        this.showToast('Failed to load holidays', 'danger');
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  loadUpcomingHolidays() {
    this.holidaysService.getUpcomingHolidays(10).subscribe({
      next: (response) => {
        this.upcomingHolidays = response.holidays;
      },
      error: (error: Error) => {
        console.error('Error loading upcoming holidays:', error);
      }
    });
  }

  onYearChange() {
    this.loadHolidays();
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  }

  getHolidayTypeColor(type: string): string {
    switch (type?.toLowerCase()) {
      case 'national': return 'danger';
      case 'regional': return 'warning';
      case 'company': return 'primary';
      case 'optional': return 'medium';
      default: return 'medium';
    }
  }

  isUpcoming(dateString: string): boolean {
    return new Date(dateString) > new Date();
  }

  isPast(dateString: string): boolean {
    return new Date(dateString) < new Date();
  }

  getDaysUntil(dateString: string): number {
    const date = new Date(dateString);
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getMonthGroup(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  groupHolidaysByMonth(): { month: string; holidays: Holiday[] }[] {
    const groups = new Map<string, Holiday[]>();
    
    this.holidays.forEach(holiday => {
      const month = this.getMonthGroup(holiday.holiday_date);
      if (!groups.has(month)) {
        groups.set(month, []);
      }
      groups.get(month)!.push(holiday);
    });

    return Array.from(groups.entries()).map(([month, holidays]) => ({
      month,
      holidays
    }));
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
