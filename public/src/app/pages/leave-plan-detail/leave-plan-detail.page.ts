import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem,
  IonLabel, IonBadge, IonButton, IonIcon, IonInput, IonTextarea, IonToggle,
  IonSelect, IonSelectOption, AlertController, ToastController, IonSpinner
} from '@ionic/angular/standalone';
import { LeavePlanService, LeavePlan, LeaveType, LeaveAllocation } from '@core/services/leave-plan.service';
import { addIcons } from 'ionicons';
import { saveOutline, addOutline, trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-leave-plan-detail',
  templateUrl: './leave-plan-detail.page.html',
  styleUrls: ['./leave-plan-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem,
    IonLabel, IonBadge, IonButton, IonIcon, IonInput, IonTextarea, IonToggle,
    IonSelect, IonSelectOption, IonSpinner
  ]
})
export class LeavePlanDetailPage implements OnInit {
  planId: number | null = null;
  plan: LeavePlan = {
    id: 0,
    name: '',
    description: '',
    leave_year_start_month: 1,
    leave_year_start_day: 1,
    is_active: 1,
    allocations: []
  };
  leaveTypes: LeaveType[] = [];
  isLoading = false;
  isSaving = false;
  isEditing = false;

  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leavePlanService: LeavePlanService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ saveOutline, addOutline, trashOutline, createOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.planId = parseInt(id);
      this.loadPlan();
    }
    this.loadLeaveTypes();
  }

  loadPlan() {
    if (!this.planId) return;
    
    this.isLoading = true;
    this.leavePlanService.getLeavePlan(this.planId).subscribe({
      next: (plan) => {
        this.plan = plan;
        if (!this.plan.allocations) {
          this.plan.allocations = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading plan:', error);
        this.showToast('Error loading plan details', 'danger');
        this.isLoading = false;
      }
    });
  }

  loadLeaveTypes() {
    this.leavePlanService.getLeaveTypes().subscribe({
      next: (types) => {
        this.leaveTypes = types;
      },
      error: (error) => {
        console.error('Error loading leave types:', error);
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  addAllocation() {
    if (!this.plan.allocations) {
      this.plan.allocations = [];
    }
    this.plan.allocations.push({
      leave_type_id: 0,
      days_allocated: 0,
      prorate_on_joining: true
    });
  }

  removeAllocation(index: number) {
    this.plan.allocations?.splice(index, 1);
  }

  async savePlan() {
    if (!this.plan.name) {
      this.showToast('Plan name is required', 'warning');
      return;
    }

    this.isSaving = true;
    
    const planData = {
      name: this.plan.name,
      description: this.plan.description,
      leave_year_start_month: this.plan.leave_year_start_month,
      leave_year_start_day: this.plan.leave_year_start_day,
      is_active: this.plan.is_active ? 1 : 0,
      allocations: this.plan.allocations
    };

    if (this.planId) {
      this.leavePlanService.updateLeavePlan(this.planId, planData).subscribe({
        next: () => {
          this.showToast('Leave plan updated successfully', 'success');
          this.isEditing = false;
          this.loadPlan();
          this.isSaving = false;
        },
        error: (error) => {
          console.error('Error updating plan:', error);
          this.showToast('Error updating plan', 'danger');
          this.isSaving = false;
        }
      });
    }
  }

  getLeaveTypeName(typeId: number): string {
    const type = this.leaveTypes.find(t => t.id === typeId);
    return type ? type.type_name : 'Unknown';
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

  goToLeaveTypes() {
    this.router.navigate(['/admin/leave-types']);
  }
}
