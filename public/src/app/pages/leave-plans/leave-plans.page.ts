import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem,
  IonLabel, IonBadge, IonButton, IonIcon, IonRefresher, IonRefresherContent,
  IonSpinner, AlertController, ToastController
} from '@ionic/angular/standalone';
import { LeavePlanService, LeavePlan } from '@core/services/leave-plan.service';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, peopleOutline, calendarOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-leave-plans',
  templateUrl: './leave-plans.page.html',
  styleUrls: ['./leave-plans.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem,
    IonLabel, IonBadge, IonButton, IonIcon, IonRefresher, IonRefresherContent,
    IonSpinner
  ]
})
export class LeavePlansPage implements OnInit {
  plans: LeavePlan[] = [];
  isLoading = false;

  constructor(
    private leavePlanService: LeavePlanService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ addOutline, createOutline, peopleOutline, calendarOutline, refreshOutline });
  }

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    this.isLoading = true;
    this.leavePlanService.getLeavePlans().subscribe({
      next: (plans) => {
        this.plans = plans;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading leave plans:', error);
        this.showToast('Error loading leave plans', 'danger');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadPlans();
    setTimeout(() => event.target.complete(), 1000);
  }

  viewPlan(plan: LeavePlan) {
    this.router.navigate(['/admin/leave-plans', plan.id]);
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
