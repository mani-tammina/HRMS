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
import { addOutline, documentTextOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline, sunnyOutline, medicalOutline, homeOutline, closeCircleOutline as closeCircle } from 'ionicons/icons';

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
  leaveBalances: any[] = [];

  constructor(
    private leaveService: LeaveService,
    private router: Router
  ) {
    addIcons({ addOutline, documentTextOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline, sunnyOutline, medicalOutline, homeOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.leaveService.getLeaves().subscribe({
      next: (leaves) => this.leaves = leaves
    });

    this.leaveService.getLeaveBalance().subscribe({
      next: (balance: any) => {
        this.leaveBalance = balance;
        // Store detailed leave balances for display
        if (balance.balances && Array.isArray(balance.balances)) {
          this.leaveBalances = balance.balances;
        } else if (balance.leave_balances && Array.isArray(balance.leave_balances)) {
          this.leaveBalances = balance.leave_balances;
        } else if (Array.isArray(balance)) {
          this.leaveBalances = balance;
        }
      }
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

  getLeaveIcon(typeCode: string): string {
    const iconMap: { [key: string]: string } = {
      'AL': 'sunny-outline',
      'PL': 'sunny-outline',
      'SL': 'medical-outline',
      'ML': 'medical-outline',
      'CL': 'home-outline',
      'LWP': 'close-circle-outline',
      'UL': 'close-circle-outline'
    };
    return iconMap[typeCode] || 'calendar-outline';
  }
}
