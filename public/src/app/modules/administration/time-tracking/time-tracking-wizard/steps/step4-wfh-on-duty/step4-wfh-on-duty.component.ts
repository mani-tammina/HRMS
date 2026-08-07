import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../../../../core/services/employee.service';

export interface WfhApprovalMember {
  type: 'role' | 'employee';
  value: string;
  label: string;
  avatar?: string;
}

export interface WfhApprovalLevel {
  level: number;
  members: WfhApprovalMember[];
}

@Component({
  selector: 'app-step4-wfh-on-duty',
  templateUrl: './step4-wfh-on-duty.component.html',
  styleUrls: ['./step4-wfh-on-duty.component.scss'],
  standalone: false
})
export class Step4WfhOnDutyComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  periods = ['Week', 'Month', 'Year'];
  monthsOptions = [1, 2, 3, 4, 5, 6];
  endingDaysOptions = ['1st', '5th', '10th', '15th', '20th', '25th', 'Last day', 'End'];
  daysRestrictionOptions = ['Holidays & Weekly Offs', 'Weekly Offs', 'Holidays'];
  allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  showDropdownForLevelIndex: number | null = null;
  searchQuery = '';
  searchResults: any[] = [];
  loadingSearch = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    // Ensure default approval chain exists if none is configured
    const chain = this.formGroup.get('wfh_approval_chain')?.value;
    if (!chain || chain.length === 0) {
      this.formGroup.get('wfh_approval_chain')?.setValue([
        {
          level: 1,
          members: [
            { type: 'role', value: 'RM', label: 'Reporting Manager' }
          ]
        }
      ]);
    }
  }

  get wfhEnabled(): boolean {
    return !!this.formGroup.get('wfh_enabled')?.value;
  }

  get halfdayAllowed(): boolean {
    return !!this.formGroup.get('wfh_halfday_allowed')?.value;
  }

  get hourlyAllowed(): boolean {
    return !!this.formGroup.get('wfh_hourly_allowed')?.value;
  }

  get attachmentRequired(): boolean {
    return !!this.formGroup.get('wfh_attachment_required')?.value;
  }

  get clockinAllowed(): boolean {
    return !!this.formGroup.get('wfh_clockin_allowed')?.value;
  }

  get limitDaysEnabled(): boolean {
    return !!this.formGroup.get('wfh_limit_days_enabled')?.value;
  }

  get limitTimesEnabled(): boolean {
    return !!this.formGroup.get('wfh_limit_times_enabled')?.value;
  }

  get pastDatedLimitMonthsEnabled(): boolean {
    return !!this.formGroup.get('wfh_past_dated_limit_months_enabled')?.value;
  }

  get pastDatedLimitDaysEnabled(): boolean {
    return !!this.formGroup.get('wfh_past_dated_limit_days_enabled')?.value;
  }

  get restrictOnDaysEnabled(): boolean {
    return !!this.formGroup.get('wfh_restrict_on_days_enabled')?.value;
  }

  get priorNoticeEnabled(): boolean {
    return !!this.formGroup.get('wfh_prior_notice_enabled')?.value;
  }

  get noSoonerEnabled(): boolean {
    return !!this.formGroup.get('wfh_no_sooner_enabled')?.value;
  }

  get allowedDaysEnabled(): boolean {
    return !!this.formGroup.get('wfh_allowed_days_enabled')?.value;
  }

  get requiresApprovalExceedEnabled(): boolean {
    return !!this.formGroup.get('wfh_requires_approval_exceed_enabled')?.value;
  }

  get approvalChain(): WfhApprovalLevel[] {
    return this.formGroup.get('wfh_approval_chain')?.value || [];
  }

  isDaySelected(day: string): boolean {
    const list = this.formGroup.get('wfh_allowed_days')?.value || [];
    return list.includes(day);
  }

  toggleDaySelection(day: string) {
    const list = [...(this.formGroup.get('wfh_allowed_days')?.value || [])];
    const idx = list.indexOf(day);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(day);
    }
    this.formGroup.get('wfh_allowed_days')?.setValue(list);
  }

  setPeriodOption(field: string, val: string) {
    this.formGroup.get(field)?.setValue(val);
  }

  // Approval Chain controls
  addLevel() {
    const chain = [...this.approvalChain];
    const nextLevel = chain.length + 1;
    chain.push({
      level: nextLevel,
      members: [
        { type: 'role', value: 'RM', label: 'Reporting Manager' }
      ]
    });
    this.formGroup.get('wfh_approval_chain')?.setValue(chain);
  }

  removeLevel(levelIndex: number) {
    const chain = [...this.approvalChain];
    chain.splice(levelIndex, 1);
    // Re-index levels
    const updated = chain.map((lvl, index) => ({
      ...lvl,
      level: index + 1
    }));
    this.formGroup.get('wfh_approval_chain')?.setValue(updated);
  }

  removeMember(levelIndex: number, memberIndex: number) {
    const chain = [...this.approvalChain];
    if (chain[levelIndex] && chain[levelIndex].members) {
      chain[levelIndex].members.splice(memberIndex, 1);
      this.formGroup.get('wfh_approval_chain')?.setValue(chain);
    }
  }

  addRoleToChain(levelIndex: number, roleValue: string, roleLabel: string) {
    const chain = [...this.approvalChain];
    if (chain[levelIndex]) {
      const exists = chain[levelIndex].members.some(m => m.type === 'role' && m.value === roleValue);
      if (!exists) {
        chain[levelIndex].members.push({
          type: 'role',
          value: roleValue,
          label: roleLabel
        });
        this.formGroup.get('wfh_approval_chain')?.setValue(chain);
      }
    }
  }

  searchEmployees(event: any) {
    const term = event.target.value;
    this.searchQuery = term;
    if (!term || term.trim().length < 2) {
      this.searchResults = [];
      return;
    }

    this.loadingSearch = true;
    this.employeeService.searchEmployees(term, 1, 10).subscribe({
      next: (res: any) => {
        this.loadingSearch = false;
        this.searchResults = res?.data?.records || res?.records || res || [];
      },
      error: () => {
        this.loadingSearch = false;
        this.searchResults = [];
      }
    });
  }

  selectEmployee(levelIndex: number, emp: any) {
    const chain = [...this.approvalChain];
    if (chain[levelIndex]) {
      const empIdStr = String(emp.id);
      const exists = chain[levelIndex].members.some(m => m.type === 'employee' && m.value === empIdStr);
      if (!exists) {
        chain[levelIndex].members.push({
          type: 'employee',
          value: empIdStr,
          label: emp.full_name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim(),
          avatar: emp.profile_image || ''
        });
        this.formGroup.get('wfh_approval_chain')?.setValue(chain);
      }
    }
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdownForLevelIndex = null;
  }
}


