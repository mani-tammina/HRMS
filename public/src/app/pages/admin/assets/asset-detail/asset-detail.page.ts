import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel,
  IonList, IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonBadge,
  IonModal, AlertController, LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  saveOutline, closeOutline, trashOutline, createOutline, cubeOutline,
  checkmarkCircleOutline, alertCircleOutline, calendarOutline, locationOutline,
  personOutline, documentTextOutline
} from 'ionicons/icons';
import { AssetsService, Asset } from '@core/services/assets.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.page.html',
  styleUrls: ['./asset-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel,
    IonList, IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonBadge,
    IonModal
  ]
})
export class AssetDetailPage implements OnInit {
  assetId: number | null = null;
  asset: Asset | null = null;
  showEditModal = false;
  isLoading = false;
  maxDate = new Date().toISOString();

  assetForm: any = {
    asset_tag: '',
    asset_name: '',
    asset_type: 'Laptop',
    description: '',
    serial_number: '',
    manufacturer: '',
    model: '',
    purchase_date: '',
    purchase_cost: '',
    warranty_expiry: '',
    location: '',
    status: 'available',
    condition: 'new'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetsService: AssetsService,
    private errorHandler: ErrorHandlerService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({
      saveOutline, closeOutline, trashOutline, createOutline, cubeOutline,
      checkmarkCircleOutline, alertCircleOutline, calendarOutline, locationOutline,
      personOutline, documentTextOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.assetId = null;
      setTimeout(() => {
        this.showEditModal = true;
      }, 100);
    } else if (id) {
      this.assetId = parseInt(id, 10);
      this.loadAsset();
    }
  }

  loadAsset() {
    if (!this.assetId) return;
    
    this.isLoading = true;
    this.assetsService.getAssetById(this.assetId).subscribe({
      next: (response) => {
        this.asset = response.asset;
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load asset');
        this.isLoading = false;
      }
    });
  }

  openEditModal() {
    if (this.asset) {
      this.assetForm = { ...this.asset };
    } else {
      this.resetForm();
    }
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    if (!this.assetId) {
      this.router.navigate(['/admin/assets']);
    }
  }

  async saveAsset() {
    if (!this.assetForm.asset_tag || !this.assetForm.asset_name) {
      await this.errorHandler.handleError(null, 'Asset tag and name are required');
      return;
    }

    const loading = await this.loadingController.create({
      message: this.assetId ? 'Updating asset...' : 'Creating asset...'
    });
    await loading.present();

    const operation = this.assetId
      ? this.assetsService.updateAsset(this.assetId, this.assetForm)
      : this.assetsService.createAsset(this.assetForm);

    operation.subscribe({
      next: async (response: any) => {
        await loading.dismiss();
        await this.errorHandler.handleSuccess(response.message);
        this.showEditModal = false;
        
        if (!this.assetId && response.asset) {
          setTimeout(() => {
            this.router.navigate(['/admin/assets', response.asset.id]);
          }, 100);
        } else {
          this.loadAsset();
        }
      },
      error: async (error) => {
        await loading.dismiss();
        await this.errorHandler.handleError(error, 'Failed to save asset');
      }
    });
  }

  async deleteAsset() {
    if (!this.assetId) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this asset?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Deleting asset...'
            });
            await loading.present();

            this.assetsService.deleteAsset(this.assetId!).subscribe({
              next: async (response) => {
                await loading.dismiss();
                await this.errorHandler.handleSuccess(response.message);
                this.router.navigate(['/admin/assets']);
              },
              error: async (error) => {
                await loading.dismiss();
                await this.errorHandler.handleError(error, 'Failed to delete asset');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  resetForm() {
    this.assetForm = {
      asset_tag: '',
      asset_name: '',
      asset_type: 'Laptop',
      description: '',
      serial_number: '',
      manufacturer: '',
      model: '',
      purchase_date: '',
      purchase_cost: '',
      warranty_expiry: '',
      location: '',
      status: 'available',
      condition: 'new'
    };
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'available': 'success',
      'allocated': 'primary',
      'under_maintenance': 'warning',
      'retired': 'medium'
    };
    return colors[status] || 'medium';
  }

  getConditionColor(condition: string): string {
    const colors: { [key: string]: string } = {
      'new': 'success',
      'good': 'primary',
      'fair': 'warning',
      'poor': 'danger',
      'damaged': 'danger'
    };
    return colors[condition] || 'medium';
  }

  formatDate(date: string | null): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
