import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonButton, IonIcon, IonFab, IonFabButton,
  IonSelect, IonSelectOption, IonInput, IonTextarea, IonToggle,
  IonModal, IonSearchbar, IonBadge,
  LoadingController, ToastController, AlertController, ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, searchOutline } from 'ionicons/icons';
import { MasterDataService, MasterDataItem } from '@core/services/master-data.service';

interface MasterDataType {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.page.html',
  styleUrls: ['./master-data.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonFab, IonFabButton,
    IonSelect, IonSelectOption, IonInput, IonTextarea, IonToggle,
    IonModal, IonSearchbar, IonBadge
  ]
})
export class MasterDataPage implements OnInit {
  selectedType: string = '';
  masterData: MasterDataItem[] = [];
  filteredData: MasterDataItem[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentItem: any = {};

  masterDataTypes: MasterDataType[] = [
    { id: 'locations', name: 'Locations', icon: 'location' },
    { id: 'departments', name: 'Departments', icon: 'business' },
    { id: 'designations', name: 'Designations', icon: 'briefcase' },
    { id: 'business-units', name: 'Business Units', icon: 'git-network' },
    { id: 'legal-entities', name: 'Legal Entities', icon: 'document-text' },
    { id: 'cost-centers', name: 'Cost Centers', icon: 'cash' },
    { id: 'sub-departments', name: 'Sub Departments', icon: 'git-branch' },
    { id: 'bands', name: 'Bands', icon: 'ribbon' },
    { id: 'pay-grades', name: 'Pay Grades', icon: 'trending-up' },
    { id: 'leave-plans', name: 'Leave Plans', icon: 'calendar' },
    { id: 'shift-policies', name: 'Shift Policies', icon: 'time' },
    { id: 'weekly-off-policies', name: 'Weekly Off Policies', icon: 'calendar-clear' },
    { id: 'attendance-policies', name: 'Attendance Policies', icon: 'checkmark-done' },
    { id: 'attendance-capture-schemes', name: 'Attendance Capture Schemes', icon: 'finger-print' },
    { id: 'holiday-lists', name: 'Holiday Lists', icon: 'sunny' },
    { id: 'expense-policies', name: 'Expense Policies', icon: 'wallet' }
  ];

  constructor(
    private masterDataService: MasterDataService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    addIcons({
      addOutline,
      createOutline,
      trashOutline,
      searchOutline
    });
  }

  ngOnInit() {}

  onTypeChange() {
    if (this.selectedType) {
      this.loadMasterData();
    }
  }

  async loadMasterData() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading data...'
    });
    await loading.present();

    this.masterDataService.getMasterData(this.selectedType).subscribe({
      next: (data: MasterDataItem[]) => {
        this.masterData = data || [];
        this.filteredData = this.masterData;
        this.isLoading = false;
        loading.dismiss();
      },
      error: (error: Error) => {
        this.isLoading = false;
        loading.dismiss();
        this.showToast('Failed to load data', 'danger');
      }
    });
  }

  searchData() {
    if (!this.searchTerm) {
      this.filteredData = this.masterData;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.masterData.filter(item => 
      item.name?.toLowerCase().includes(term) ||
      item.code?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
    );
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentItem = { is_active: true };
    this.showModal = true;
  }

  openEditModal(item: MasterDataItem) {
    this.isEditMode = true;
    this.currentItem = { ...item };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentItem = {};
  }

  async saveItem() {
    if (!this.currentItem.name || this.currentItem.name.trim() === '') {
      this.showToast('Name is required', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: this.isEditMode ? 'Updating...' : 'Creating...'
    });
    await loading.present();

    if (this.isEditMode) {
      // Update existing item
      this.masterDataService.updateMasterData(this.selectedType, this.currentItem.id, this.currentItem).subscribe({
        next: () => {
          loading.dismiss();
          this.showToast('Updated successfully', 'success');
          this.closeModal();
          this.loadMasterData();
        },
        error: (error: Error) => {
          loading.dismiss();
          this.showToast('Failed to update', 'danger');
        }
      });
    } else {
      // Create new item
      this.masterDataService.createMasterData(this.selectedType, this.currentItem).subscribe({
        next: () => {
          loading.dismiss();
          this.showToast('Created successfully', 'success');
          this.closeModal();
          this.loadMasterData();
        },
        error: (error: Error) => {
          loading.dismiss();
          this.showToast('Failed to create', 'danger');
        }
      });
    }
  }

  async deleteItem(item: MasterDataItem) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.confirmDelete(item.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete(id: number) {
    const loading = await this.loadingController.create({
      message: 'Deleting...'
    });
    await loading.present();

    this.masterDataService.deleteMasterData(this.selectedType, id).subscribe({
      next: () => {
        loading.dismiss();
        this.showToast('Deleted successfully', 'success');
        this.loadMasterData();
      },
      error: (error: Error) => {
        loading.dismiss();
        this.showToast('Failed to delete', 'danger');
      }
    });
  }

  getSelectedTypeName(): string {
    const type = this.masterDataTypes.find(t => t.id === this.selectedType);
    return type ? type.name : '';
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
