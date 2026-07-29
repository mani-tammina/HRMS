import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { EmployeeService } from '../../../../../core/services/employee.service';
import { RouteGuardService } from '../../../../../core/services/route-guard.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileTabComponent implements OnChanges {
  @Input() currentEmployee: any;
  @Input() isOwnProfile: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private toastController: ToastController,
    private routeGuardService: RouteGuardService
  ) { }

  get canViewDOB(): boolean {
    if (this.isOwnProfile) return true;
    const myId = this.routeGuardService.employeeID;
    if (myId && this.currentEmployee && Number(myId) === Number(this.currentEmployee.id)) {
      return true;
    }
    const role = (this.routeGuardService.userRole || '').toLowerCase();
    return role === 'manager' || role === 'hr' || role === 'admin';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentEmployee']?.currentValue) {
      console.log('✅ ProfileTabComponent received employee:', this.currentEmployee);
      if (this.currentEmployee?.DateOfBirth) {
        // Normalize DOB to plain YYYY-MM-DD string.
        // Backend sends plain strings; but if still an ISO timestamp, extract the date part.
        const dob = this.currentEmployee.DateOfBirth;
        const dateStr = typeof dob === 'string' && dob.includes('T') ? dob.split('T')[0] : String(dob);
        // Parse as local-time date to avoid UTC midnight→IST offset shift.
        const [year, month, day] = dateStr.split('-').map(Number);
        if (year && month && day) {
          // Store as plain YYYY-MM-DD for the date input and DatePipe
          this.currentEmployee.DateOfBirth = dateStr;
        }
      }
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
