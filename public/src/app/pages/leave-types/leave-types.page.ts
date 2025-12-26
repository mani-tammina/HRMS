import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem,
  IonLabel, IonBadge, IonButton, IonIcon, IonRefresher, IonRefresherContent,
  IonInput, IonTextarea, IonToggle, AlertController, ToastController, IonSpinner
} from '@ionic/angular/standalone';
import { LeavePlanService, LeaveType } from '@core/services/leave-plan.service';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, checkmarkCircleOutline, closeCircleOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-leave-types',
  templateUrl: './leave-types.page.html',
  styleUrls: ['./leave-types.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem,
    IonLabel, IonBadge, IonButton, IonIcon, IonRefresher, IonRefresherContent,
    IonInput, IonTextarea, IonToggle, IonSpinner
  ]
})
export class LeaveTypesPage implements OnInit {
  leaveTypes: LeaveType[] = [];
  isLoading = false;
  showCreateForm = false;

  newType: Partial<LeaveType> = {
    type_name: '',
    type_code: '',
    description: '',
    is_paid: 1,
    requires_approval: 1,
    can_carry_forward: 0,
    max_carry_forward_days: 0
  };

  constructor(
    private leavePlanService: LeavePlanService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ addOutline, createOutline, checkmarkCircleOutline, closeCircleOutline, refreshOutline });
  }

  ngOnInit() {
    this.loadLeaveTypes();
  }

  loadLeaveTypes() {
    this.isLoading = true;
    this.leavePlanService.getLeaveTypes().subscribe({
      next: (types) => {
        this.leaveTypes = types;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading leave types:', error);
        this.showToast('Error loading leave types', 'danger');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadLeaveTypes();
    setTimeout(() => event.target.complete(), 1000);
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newType = {
      type_name: '',
      type_code: '',
      description: '',
      is_paid: 1,
      requires_approval: 1,
      can_carry_forward: 0,
      max_carry_forward_days: 0
    };
  }

  async createLeaveType() {
    if (!this.newType.type_name || !this.newType.type_code) {
      this.showToast('Name and code are required', 'warning');
      return;
    }

    const confirm = await this.confirmAction('Create Leave Type', 
      `Create "${this.newType.type_name}" leave type?`);
    
    if (confirm) {
      this.leavePlanService.createLeaveType(this.newType).subscribe({
        next: () => {
          this.showToast('Leave type created successfully', 'success');
          this.toggleCreateForm();
          this.loadLeaveTypes();
        },
        error: (error) => {
          console.error('Error creating leave type:', error);
          this.showToast('Error creating leave type', 'danger');
        }
      });
    }
  }

  async editLeaveType(type: LeaveType) {
    const alert = await this.alertController.create({
      header: 'Edit Leave Type',
      inputs: [
        {
          name: 'type_name',
          type: 'text',
          placeholder: 'Leave Type Name',
          value: type.type_name
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Description',
          value: type.description
        },
        {
          name: 'max_carry_forward_days',
          type: 'number',
          placeholder: 'Max Carry Forward Days',
          value: type.max_carry_forward_days
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data) => {
            this.updateLeaveType(type.id, data);
          }
        }
      ]
    });

    await alert.present();
  }

  updateLeaveType(id: number, data: any) {
    this.leavePlanService.updateLeaveType(id, data).subscribe({
      next: () => {
        this.showToast('Leave type updated successfully', 'success');
        this.loadLeaveTypes();
      },
      error: (error) => {
        console.error('Error updating leave type:', error);
        this.showToast('Error updating leave type', 'danger');
      }
    });
  }

  async confirmAction(header: string, message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Confirm',
            handler: () => resolve(true)
          }
        ]
      });

      await alert.present();
    });
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
