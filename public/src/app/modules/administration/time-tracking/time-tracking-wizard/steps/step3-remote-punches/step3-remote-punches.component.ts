import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../../../../core/services/employee.service';

export interface ApprovalMember {
  type: 'role' | 'employee';
  value: string;
  label: string;
  avatar?: string;
}

export interface ApprovalLevel {
  level: number;
  members: ApprovalMember[];
}

@Component({
  selector: 'app-step3-remote-punches',
  templateUrl: './step3-remote-punches.component.html',
  styleUrls: ['./step3-remote-punches.component.scss'],
  standalone: false
})
export class Step3RemotePunchesComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  searchQuery = '';
  searchResults: any[] = [];
  showDropdown = false;
  loadingSearch = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    // Ensure default approval chain exists if none is configured
    const chain = this.formGroup.get('remote_clockin_approval_chain')?.value;
    if (!chain || chain.length === 0) {
      this.formGroup.get('remote_clockin_approval_chain')?.setValue([
        {
          level: 1,
          members: [
            { type: 'role', value: 'RM', label: 'Reporting Manager' }
          ]
        }
      ]);
    }
  }

  get mobileEnabled(): boolean {
    return !!this.formGroup.get('remote_clockin_mobile_enabled')?.value;
  }

  get webEnabled(): boolean {
    return !!this.formGroup.get('remote_clockin_web_enabled')?.value;
  }

  get commentRequired(): string {
    return this.formGroup.get('remote_clockin_comment_required')?.value || 'no';
  }

  get approvalRequired(): string {
    return this.formGroup.get('remote_clockin_approval_required')?.value || 'no';
  }

  get approvalChain(): ApprovalLevel[] {
    return this.formGroup.get('remote_clockin_approval_chain')?.value || [];
  }

  setCommentRequired(value: string) {
    this.formGroup.get('remote_clockin_comment_required')?.setValue(value);
  }

  setApprovalRequired(value: string) {
    this.formGroup.get('remote_clockin_approval_required')?.setValue(value);
  }

  removeMember(levelIndex: number, memberIndex: number) {
    const chain = [...this.approvalChain];
    if (chain[levelIndex] && chain[levelIndex].members) {
      chain[levelIndex].members.splice(memberIndex, 1);
      this.formGroup.get('remote_clockin_approval_chain')?.setValue(chain);
    }
  }

  addRoleToChain(levelIndex: number, roleValue: string, roleLabel: string) {
    const chain = [...this.approvalChain];
    if (chain[levelIndex]) {
      // Check if already exists
      const exists = chain[levelIndex].members.some(m => m.type === 'role' && m.value === roleValue);
      if (!exists) {
        chain[levelIndex].members.push({
          type: 'role',
          value: roleValue,
          label: roleLabel
        });
        this.formGroup.get('remote_clockin_approval_chain')?.setValue(chain);
      }
    }
  }

  searchEmployees(event: any) {
    const term = event.target.value;
    this.searchQuery = term;
    if (!term || term.trim().length < 2) {
      this.searchResults = [];
      this.showDropdown = false;
      return;
    }

    this.loadingSearch = true;
    this.employeeService.searchEmployees(term, 1, 10).subscribe({
      next: (res: any) => {
        this.loadingSearch = false;
        // Parse list from paginated object or array
        this.searchResults = res?.data?.records || res?.records || res || [];
        this.showDropdown = this.searchResults.length > 0;
      },
      error: () => {
        this.loadingSearch = false;
        this.searchResults = [];
        this.showDropdown = false;
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
        this.formGroup.get('remote_clockin_approval_chain')?.setValue(chain);
      }
    }
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdown = false;
  }
}

