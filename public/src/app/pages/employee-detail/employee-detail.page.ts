import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonIcon, IonAvatar, IonBadge, IonSpinner
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '@core/services/employee.service';
import { addIcons } from 'ionicons';
import { 
  mailOutline, callOutline, businessOutline, briefcaseOutline, calendarOutline,
  locationOutline, cardOutline, personOutline, cashOutline, shieldOutline,
  clipboardOutline, timeOutline, alertCircleOutline, homeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonList, IonItem, IonLabel, IonIcon, IonAvatar, IonBadge, IonSpinner
  ]
})
export class EmployeeDetailPage implements OnInit {
  employee: any = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    addIcons({ 
      mailOutline, callOutline, businessOutline, briefcaseOutline, calendarOutline,
      locationOutline, cardOutline, personOutline, cashOutline, shieldOutline,
      clipboardOutline, timeOutline, alertCircleOutline, homeOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(id);
    }
  }

  loadEmployee(id: string) {
    this.isLoading = true;
    this.employeeService.getEmployeeDetails(id).subscribe({
      next: (response: any) => {
        this.employee = response.employee || response;
        this.isLoading = false;
        console.log('Employee details loaded:', this.employee);
      },
      error: (error) => {
        console.error('Error loading employee details:', error);
        this.isLoading = false;
      }
    });
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/avatar-placeholder.png';
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active': return 'success';
      case 'inactive': return 'medium';
      case 'on leave': return 'warning';
      case 'terminated': return 'danger';
      default: return 'medium';
    }
  }
}
