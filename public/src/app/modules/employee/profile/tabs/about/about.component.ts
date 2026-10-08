import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReportingTeamComponent } from '../reporting-team/reporting-team.component';

import { RouteGuardService } from '../../../../../core/services/route-guard.service';

export function formatDateDDMMYYYY(val: any): string {
  if (!val) return '-';
  const str = String(val).trim();
  const ymd = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (ymd) {
    return `${ymd[3].padStart(2, '0')}-${ymd[2].padStart(2, '0')}-${ymd[1]}`;
  }
  const dmy = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    return `${dmy[1].padStart(2, '0')}-${dmy[2].padStart(2, '0')}-${dmy[3]}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const parts = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(d);
    return parts.replace(/\//g, '-');
  }
  return str || '-';
}

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

  get formattedDOB(): string {
    return formatDateDDMMYYYY(this.currentEmployee?.DateOfBirth);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentEmployee']?.currentValue) {
      console.log('✅ AboutTabComponent received employee:', this.currentEmployee);
    }
  }
}
