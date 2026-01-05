import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonSearchbar, IonList, IonItem, IonLabel, IonAvatar, IonBadge, IonIcon,
  IonRefresher, IonRefresherContent, IonCard, IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '@core/services/employee.service';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonSearchbar, IonList, IonItem, IonLabel, IonAvatar, IonBadge, IonIcon,
    IonRefresher, IonRefresherContent, IonCard, IonCardContent
  ]
})
export class EmployeesPage implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    addIcons({ personOutline, mailOutline, callOutline });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  ionViewWillEnter() {
    // Reload employees when page becomes active
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        console.log('Employees loaded:', employees);
        this.employees = employees;
        this.filteredEmployees = employees.filter(emp => emp.EmploymentStatus === 'Working');
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  handleRefresh(event: any) {
    this.loadEmployees();
    setTimeout(() => event.target.complete(), 1000);
  }

  filterEmployees(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    if (!searchTerm) {
      this.filteredEmployees = this.employees;
      return;
    }
    this.filteredEmployees = this.employees.filter(employee => 
      (employee.name && employee.name.toLowerCase().includes(searchTerm)) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm)) ||
      (employee.phone && employee.phone.toLowerCase().includes(searchTerm))
    );
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  getActiveCount(): number {
    return this.filteredEmployees.filter(e => e.EmploymentStatus === 'Working').length;
  }

  getDepartmentCount(): number {
    return new Set(this.employees.map(e => e.department)).size;
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/avatar-placeholder.png';
  }
}
