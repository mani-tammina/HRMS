import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonBadge, IonIcon, IonFab, IonFabButton,
  IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LeaveService, Leave } from '@core/services/leave.service';
import { addIcons } from 'ionicons';
import { addOutline, documentTextOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonBadge, IonIcon, IonFab, IonFabButton,
    IonRefresher, IonRefresherContent
  ]
})
export class LeavesPage implements OnInit {
  leaves: Leave[] = [];
  leaveBalance: any = null;

  constructor(
    private leaveService: LeaveService,
    private router: Router
  ) {
    addIcons({ addOutline, documentTextOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.leaveService.getLeaves().subscribe({
      next: (leaves) => this.leaves = leaves
    });

    this.leaveService.getLeaveBalance().subscribe({
      next: (balance) => this.leaveBalance = balance
    });
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'pending': 'warning',
      'approved': 'success',
      'rejected': 'danger'
    };
    return colors[status] || 'medium';
  }

  getStatusIcon(status: string): string {
    const icons: any = {
      'pending': 'time-outline',
      'approved': 'checkmark-circle-outline',
      'rejected': 'close-circle-outline'
    };
    return icons[status] || 'time-outline';
  }

  requestLeave() {
    this.router.navigate(['/leave-request']);
  }
}
