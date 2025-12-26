import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonList, IonItem, IonLabel, IonIcon, IonAvatar, IonBadge
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '@core/services/employee.service';
import { addIcons } from 'ionicons';
import { 
  mailOutline, callOutline, businessOutline, briefcaseOutline, calendarOutline,
  locationOutline, cardOutline, personOutline
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
    IonList, IonItem, IonLabel, IonIcon, IonAvatar, IonBadge
  ]
})
export class EmployeeDetailPage implements OnInit {
  employee: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    addIcons({ 
      mailOutline, callOutline, businessOutline, briefcaseOutline, calendarOutline,
      locationOutline, cardOutline, personOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(id);
    }
  }

  loadEmployee(id: string) {
    this.employeeService.getEmployeeDetails(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        console.log('Employee details loaded:', employee);
      },
      error: (error) => {
        console.error('Error loading employee details:', error);
      }
    });
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/avatar-placeholder.png';
  }
}
