import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonGrid, IonRow, IonCol, IonIcon, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cubeOutline, checkmarkCircleOutline, constructOutline, closeCircleOutline,
  trendingUpOutline
} from 'ionicons/icons';
import { AssetsService, AssetReport } from '@core/services/assets.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { StatCardComponent } from '@shared/components/stat-card/stat-card.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-asset-reports',
  templateUrl: './asset-reports.page.html',
  styleUrls: ['./asset-reports.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonGrid, IonRow, IonCol, IonIcon, IonRefresher, IonRefresherContent,
    StatCardComponent, LoadingComponent
  ]
})
export class AssetReportsPage implements OnInit {
  report: AssetReport | null = null;
  isLoading = false;

  constructor(
    private assetsService: AssetsService,
    private errorHandler: ErrorHandlerService
  ) {
    addIcons({
      cubeOutline, checkmarkCircleOutline, constructOutline, closeCircleOutline,
      trendingUpOutline
    });
  }

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.assetsService.getAssetReports().subscribe({
      next: (response) => {
        this.report = response.report;
        this.isLoading = false;
      },
      error: async (error) => {
        await this.errorHandler.handleError(error, 'Failed to load asset reports');
        this.isLoading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadReport();
    setTimeout(() => event.target.complete(), 1000);
  }

  getUtilizationRate(): number {
    if (!this.report) return 0;
    const total = this.report.total_assets;
    if (total === 0) return 0;
    return Math.round((this.report.allocated_assets / total) * 100);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
}
