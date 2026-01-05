import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonIcon, IonBadge, IonButton, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline, alertCircleOutline, timeOutline,
  cloudUploadOutline, refreshOutline
} from 'ionicons/icons';
import { ComplianceService } from '@core/services/compliance.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-compliance-widget',
  templateUrl: './compliance-widget.component.html',
  styleUrls: ['./compliance-widget.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonIcon, IonBadge, IonButton, IonList, IonItem, IonLabel
  ]
})
export class ComplianceWidgetComponent implements OnInit, OnDestroy {
  complianceStatus: any = null;
  isLoading = true;
  refreshSubscription?: Subscription;

  constructor(
    private complianceService: ComplianceService,
    private router: Router
  ) {
    addIcons({
      checkmarkCircleOutline,
      alertCircleOutline,
      timeOutline,
      cloudUploadOutline,
      refreshOutline
    });
  }

  ngOnInit() {
    this.loadComplianceStatus();
    
    // Auto-refresh every 5 minutes
    this.refreshSubscription = interval(300000).subscribe(() => {
      this.loadComplianceStatus();
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadComplianceStatus() {
    this.complianceService.getMyComplianceStatus().subscribe({
      next: (response) => {
        this.complianceStatus = response.compliance;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading compliance status:', error);
        this.isLoading = false;
      }
    });
  }

  submitTimesheet() {
    const type = this.complianceStatus?.has_active_projects ? 'project' : 'regular';
    this.router.navigate(['/timesheets/submit'], { queryParams: { type } });
  }

  uploadClientTimesheet() {
    this.router.navigate(['/timesheets/upload-client']);
  }

  viewHistory() {
    this.router.navigate(['/timesheets/history']);
  }

  getStatusColor(): string {
    if (!this.complianceStatus) return 'medium';
    return this.complianceStatus.is_submitted ? 'success' : 'warning';
  }

  getStatusIcon(): string {
    if (!this.complianceStatus) return 'time-outline';
    return this.complianceStatus.is_submitted ? 'checkmark-circle-outline' : 'alert-circle-outline';
  }

  getStatusText(): string {
    if (!this.complianceStatus) return 'Loading...';
    return this.complianceStatus.is_submitted ? 'Submitted' : 'Pending';
  }
}
