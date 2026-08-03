import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../../../../core/services/employee.service';

export interface RegularizationApprovalMember {
  type: 'role' | 'employee';
  value: string;
  label: string;
  avatar?: string;
}

export interface RegularizationApprovalLevel {
  level: number;
  members: RegularizationApprovalMember[];
}

@Component({
  selector: 'app-step5-regularization',
  templateUrl: './step5-regularization.component.html',
  styleUrls: ['./step5-regularization.component.scss'],
  standalone: false
})
export class Step5RegularizationComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  adjustLogsOptions = ['All Attendance Logs', 'Only Punch Timings'];
  partialBasisOptions = ['Cumulative (total) minutes in a period', 'Per instance basis'];
  periods = ['Week', 'Month', 'Year'];
  endingDaysOptions = ['1st', '5th', '10th', '15th', '20th', '25th', 'Last day', 'End'];

  showDropdownForLevelIndex: number | null = null;
  searchQuery = '';
  searchResults: any[] = [];
  loadingSearch = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    // Ensure default approval chain exists if none is configured
    const chain = this.formGroup.get('partial_days_approval_chain')?.value;
    if (!chain || chain.length === 0) {
      this.formGroup.get('partial_days_approval_chain')?.setValue([
        {
          level: 1,
          members: [
            { type: 'role', value: 'RM', label: 'Reporting Manager' }
          ]
        }
      ]);
    }
  }

  get allowAdjustLogs(): string {
    return this.formGroup.get('allow_adjust_logs')?.value || 'no';
  }

  get allowRegulariseLogs(): string {
    return this.formGroup.get('allow_regularise_logs')?.value || 'no';
  }

  get allowPartialDays(): string {
    return this.formGroup.get('allow_partial_days')?.value || 'no';
  }

  get lateArrivalEnabled(): boolean {
    return !!this.formGroup.get('late_arrival_enabled')?.value;
  }

  get earlyLeavingEnabled(): boolean {
    return !!this.formGroup.get('early_leaving_enabled')?.value;
  }

  get anytimeLeaveEnabled(): boolean {
    return !!this.formGroup.get('anytime_leave_enabled')?.value;
  }

  get commentRequired(): boolean {
    return !!this.formGroup.get('partial_days_comment_required')?.value;
  }

  get howSoonDays(): number {
    return this.formGroup.get('partial_days_how_soon_days')?.value || 0;
  }

  get pastDatedAllowed(): string {
    return this.formGroup.get('partial_days_past_dated_allowed')?.value || 'yes';
  }

  get pastDatedLimitDaysEnabled(): boolean {
    return !!this.formGroup.get('partial_days_past_dated_limit_days_enabled')?.value;
  }

  get restrictAfterEnabled(): boolean {
    return !!this.formGroup.get('partial_days_restrict_after_enabled')?.value;
  }

  get requiresApprovalExceedEnabled(): boolean {
    return !!this.formGroup.get('partial_days_requires_approval_exceed_enabled')?.value;
  }

  get approvalChain(): RegularizationApprovalLevel[] {
    return this.formGroup.get('partial_days_approval_chain')?.value || [];
  }

  setAllowAdjustLogs(val: string) {
    this.formGroup.get('allow_adjust_logs')?.setValue(val);
  }

  setAllowRegulariseLogs(val: string) {
    this.formGroup.get('allow_regularise_logs')?.setValue(val);
  }

  setAllowPartialDays(val: string) {
    this.formGroup.get('allow_partial_days')?.setValue(val);
  }

  setPastDatedAllowed(val: string) {
    this.formGroup.get('partial_days_past_dated_allowed')?.setValue(val);
  }

  // Approval Chain Controls
  addLevel() {
    const chain = [...this.approvalChain];
    const nextLevel = chain.length + 1;
    chain.push({
      level: nextLevel,
      members: [
        { type: 'role', value: 'RM', label: 'Reporting Manager' }
      ]
    });
    this.formGroup.get('partial_days_approval_chain')?.setValue(chain);
  }

  removeLevel(levelIndex: number) {
    const chain = [...this.approvalChain];
    chain.splice(levelIndex, 1);
    const updated = chain.map((lvl, index) => ({
      ...lvl,
      level: index + 1
    }));
    this.formGroup.get('partial_days_approval_chain')?.setValue(updated);
  }

  removeMember(levelIndex: number, memberIndex: number) {
    const chain = [...this.approvalChain];
    if (chain[levelIndex] && chain[levelIndex].members) {
      chain[levelIndex].members.splice(memberIndex, 1);
      this.formGroup.get('partial_days_approval_chain')?.setValue(chain);
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
        this.formGroup.get('partial_days_approval_chain')?.setValue(chain);
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
        this.formGroup.get('partial_days_approval_chain')?.setValue(chain);
      }
    }
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdownForLevelIndex = null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}


