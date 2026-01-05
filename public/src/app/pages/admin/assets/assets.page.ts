import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSearchbar,
  IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption,
  IonSegment, IonSegmentButton, ToastController, LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, cubeOutline, checkmarkCircleOutline, alertCircleOutline,
  searchOutline, statsChartOutline, personAddOutline, downloadOutline
} from 'ionicons/icons';
import { AssetsService, Asset } from '@core/services/assets.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonBadge, IonSearchbar,
    IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption,
    IonSegment, IonSegmentButton, LoadingComponent
  ]
})
export class AssetsPage implements OnInit {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  isLoading = false;
  searchTerm = '';
  filterStatus = 'all';
  filterType = 'all';
  selectedView: 'list' | 'reports' = 'list';

  constructor(
    private assetsService: AssetsService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    addIcons({
      addOutline, cubeOutline, checkmarkCircleOutline, alertCircleOutline,
      searchOutline, statsChartOutline, personAddOutline, downloadOutline
    });
  }

  ngOnInit() {
    this.loadAssets();
  }

  ionViewWillEnter() {
    this.loadAssets();
  }

  loadAssets() {
    this.isLoading = true;
    const status = this.filterStatus !== 'all' ? this.filterStatus : undefined;
    const type = this.filterType !== 'all' ? this.filterType : undefined;

    this.assetsService.getAssets(status, type).subscribe({
      next: (response) => {
        this.assets = response.assets;
        this.filterAssets();
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load assets');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadAssets();
    setTimeout(() => event.target.complete(), 1000);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value?.toLowerCase() || '';
    this.filterAssets();
  }

  onFilterChange() {
    this.loadAssets();
  }

  onViewChange(event: any) {
    this.selectedView = event.detail.value;
    if (this.selectedView === 'reports') {
      this.router.navigate(['/admin/assets/reports']);
    }
  }

  filterAssets() {
    if (!this.searchTerm) {
      this.filteredAssets = this.assets;
      return;
    }

    this.filteredAssets = this.assets.filter(asset =>
      asset.asset_name.toLowerCase().includes(this.searchTerm) ||
      asset.asset_tag.toLowerCase().includes(this.searchTerm) ||
      asset.asset_type.toLowerCase().includes(this.searchTerm)
    );
  }

  viewAsset(id: number) {
    this.router.navigate(['/admin/assets', id]);
  }

  addAsset() {
    this.router.navigate(['/admin/assets/new']);
  }

  allocateAsset() {
    this.router.navigate(['/admin/assets/allocate']);
  }

  viewReports() {
    this.router.navigate(['/admin/assets/reports']);
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
