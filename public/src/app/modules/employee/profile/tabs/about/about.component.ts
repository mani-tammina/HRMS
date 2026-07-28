import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReportingTeamComponent } from '../reporting-team/reporting-team.component';

import { RouteGuardService } from '../../../../../core/services/route-guard.service';

@Component({
  selector: 'app-about-tab',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ReportingTeamComponent
  ]
})
export class AboutTabComponent implements OnChanges {
  @Input() currentEmployee: any | null = null;
  @Input() isOwnProfile: boolean = true;

  constructor(private routeGuardService: RouteGuardService) {}

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
      console.log('✅ AboutTabComponent received employee:', this.currentEmployee);
      if (this.currentEmployee?.DateOfBirth) {
        // Normalize DOB to plain YYYY-MM-DD string.
        // Backend sends plain strings; but if still an ISO timestamp, extract the date part.
        const dob = this.currentEmployee.DateOfBirth;
        const dateStr = typeof dob === 'string' && dob.includes('T') ? dob.split('T')[0] : String(dob);
        // Parse as local-time date to avoid UTC midnight→IST offset shift.
        const [year, month, day] = dateStr.split('-').map(Number);
        if (year && month && day) {
          this.currentEmployee.DateOfBirth = dateStr;
        }
      }
    }
  }
}
