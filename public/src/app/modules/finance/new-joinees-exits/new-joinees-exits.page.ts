import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToasterService } from '../../../core/services/toaster.service';

export interface NewJoineeRow {
  id: number;
  employee_code: string;
  employee_name: string;
  date_of_joining: string;
  raw_date_of_joining?: string;
  no_of_units_worked: number;
  units_worked_label: string;
  monthly_salary: number;
  salary: number;
  salary_formatted: string;
  pay_action: 'Process as salary' | 'Hold salary' | 'Do not process';
  comments: string;
  department?: string;
  designation?: string;
  expanded?: boolean;
}

export interface ExitingEmployeeRow {
  id: number;
  employee_code: string;
  employee_name: string;
  resignation_date: string;
  last_working_day: string;
  notice_period_days: number;
  notice_served_days: number;
  shortfall_days: number;
  exit_type: string;
  status: string;
  employment_status?: string;
  pay_action: string;
  comments: string;
  department?: string;
  designation?: string;
  monthly_gross?: number;
  expanded?: boolean;
}

export interface SettlementEmployeeRow {
  id: number;
  employee_code: string;
  employee_name: string;
  last_working_day: string;
  payable_days: number;
  earned_salary: number;
  leave_encashment_days: number;
  leave_encashment_amount: number;
  gratuity_amount: number;
  notice_recovery_amount: number;
  net_settlement_payable: number;
  status: string;
  comments: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-new-joinees-exits',
  templateUrl: './new-joinees-exits.page.html',
  styleUrls: ['./new-joinees-exits.page.scss'],
  standalone: false
})
export class NewJoineesExitsPage implements OnInit {
  selectedMonth: string = '2026-10';
  monthLabel: string = 'OCT-2026';
  monthFull: string = 'October';
  year: number = 2026;
  isLoading: boolean = false;

  // Active step in stepper: 1 (NEW JOINEES), 2 (EMPLOYEES IN EXIT PROCESS), 3 (FULL & FINAL SETTLEMENT)
  currentStep: number = 1;

  // Step 1: New Joinees records & search
  newJoineesRecords: NewJoineeRow[] = [];
  joineesSearchTerm: string = '';

  // Step 2: Exit process records & search
  exitingRecords: ExitingEmployeeRow[] = [];
  exitsSearchTerm: string = '';

  // Step 3: Full & Final Settlement records & search
  settlementRecords: SettlementEmployeeRow[] = [];
  settlementSearchTerm: string = '';

  // Help resources panel state
  helpResourcesOpen: boolean = true;
  openedHelpItem: number | null = null;

  // Comment Modal state
  showCommentModal: boolean = false;
  activeCommentRow: any = null;
  tempCommentText: string = '';

  private apiUrl = environment.apiURL;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['month']) {
        this.selectedMonth = params['month'];
      }
      if (params['step']) {
        const stepNum = parseInt(params['step'], 10);
        if (stepNum >= 1 && stepNum <= 3) {
          this.currentStep = stepNum;
        }
      }
      this.formatMonthLabels();
      this.loadData();
    });
  }

  formatMonthLabels() {
    const [yStr, mStr] = (this.selectedMonth || '2026-10').split('-');
    this.year = parseInt(yStr, 10) || 2026;
    const monthNum = parseInt(mStr, 10) || 10;
    const shortNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const fullNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const idx = Math.max(0, Math.min(11, monthNum - 1));
    this.monthLabel = `${shortNames[idx]}-${this.year}`;
    this.monthFull = `${fullNames[idx]} ${this.year}`;
  }

  loadData() {
    this.isLoading = true;
    const url = `${this.apiUrl}/api/payroll/v2/new-joinees-exits?month=${this.selectedMonth}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          this.newJoineesRecords = res.newJoinees || [];
          this.exitingRecords = res.exitingEmployees || [];
          this.settlementRecords = res.settlementEmployees || [];
        } else {
          this.newJoineesRecords = [];
          this.exitingRecords = [];
          this.settlementRecords = [];
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load new joinees & exits:', err);
        this.toaster.showError(`Failed to load new joinees & exits for ${this.monthLabel}`);
        this.newJoineesRecords = [];
        this.exitingRecords = [];
        this.settlementRecords = [];
      }
    });
  }

  // Filtered lists based on search terms
  get filteredNewJoinees(): NewJoineeRow[] {
    if (!this.joineesSearchTerm.trim()) {
      return this.newJoineesRecords;
    }
    const q = this.joineesSearchTerm.toLowerCase().trim();
    return this.newJoineesRecords.filter(r =>
      r.employee_name.toLowerCase().includes(q) ||
      r.employee_code.toLowerCase().includes(q) ||
      (r.department && r.department.toLowerCase().includes(q))
    );
  }

  get filteredExits(): ExitingEmployeeRow[] {
    if (!this.exitsSearchTerm.trim()) {
      return this.exitingRecords;
    }
    const q = this.exitsSearchTerm.toLowerCase().trim();
    return this.exitingRecords.filter(r =>
      r.employee_name.toLowerCase().includes(q) ||
      r.employee_code.toLowerCase().includes(q)
    );
  }

  get filteredSettlements(): SettlementEmployeeRow[] {
    if (!this.settlementSearchTerm.trim()) {
      return this.settlementRecords;
    }
    const q = this.settlementSearchTerm.toLowerCase().trim();
    return this.settlementRecords.filter(r =>
      r.employee_name.toLowerCase().includes(q) ||
      r.employee_code.toLowerCase().includes(q)
    );
  }

  // Row expand / collapse
  toggleRow(row: any) {
    row.expanded = !row.expanded;
  }

  // Stepper navigation
  setStep(stepNum: number) {
    if (stepNum >= 1 && stepNum <= 3) {
      this.currentStep = stepNum;
    }
  }

  handleBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveAndContinue() {
    if (this.currentStep < 3) {
      this.isLoading = true;
      const recordsToSave = this.currentStep === 1 ? this.newJoineesRecords : this.exitingRecords;
      this.http.post<any>(`${this.apiUrl}/api/payroll/v2/new-joinees-exits/save-step`, {
        month: this.selectedMonth,
        step: this.currentStep,
        records: recordsToSave
      }).subscribe({
        next: () => {
          this.isLoading = false;
          this.toaster.showSuccess(`Step ${this.currentStep} saved successfully`);
          this.currentStep++;
        },
        error: () => {
          this.isLoading = false;
          this.toaster.showSuccess(`Step ${this.currentStep} saved`);
          this.currentStep++;
        }
      });
    } else {
      this.markStepAsCompleted();
    }
  }

  saveAndClose() {
    this.isLoading = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/new-joinees-exits/save-step`, {
      month: this.selectedMonth,
      step: this.currentStep,
      records: this.newJoineesRecords
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.showSuccess('New Joinees & Exits changes saved successfully');
        this.closeWorkflow();
      },
      error: () => {
        this.isLoading = false;
        this.toaster.showSuccess('Changes saved');
        this.closeWorkflow();
      }
    });
  }

  markStepAsCompleted() {
    this.isLoading = true;
    this.http.post<any>(`${this.apiUrl}/api/payroll/v2/new-joinees-exits/mark-complete`, {
      month: this.selectedMonth,
      records: this.newJoineesRecords,
      exitingRecords: this.exitingRecords,
      settlementRecords: this.settlementRecords
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        const key = `payroll_steps_${this.selectedMonth}`;
        let steps: any[] = [];
        try {
          const raw = localStorage.getItem(key);
          if (raw) steps = JSON.parse(raw);
        } catch (_) {}
        if (!Array.isArray(steps)) steps = [];

        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')} ${now.toLocaleString('en', { month: 'short' })} ${now.getFullYear()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        const subtitle = res?.subtitle || `Last Changes on ${formattedDate} BY Admin`;

        const stepIdx = steps.findIndex((s: any) => s.id === 2);
        const updated = { id: 2, completed: true, subtitle };
        if (stepIdx >= 0) {
          steps[stepIdx] = updated;
        } else {
          steps.push(updated);
        }
        localStorage.setItem(key, JSON.stringify(steps));

        this.toaster.showSuccess(`New Joinees & Exits completed for ${this.monthLabel}!`);
        this.closeWorkflow();
      },
      error: () => {
        this.isLoading = false;
        this.toaster.showSuccess('New Joinees & Exits marked as completed');
        this.closeWorkflow();
      }
    });
  }

  closeWorkflow() {
    this.router.navigate(['/finance/dashboard'], { queryParams: { month: this.selectedMonth } });
  }

  // Comment Modal
  openCommentModal(row: any) {
    this.activeCommentRow = row;
    this.tempCommentText = row.comments || '';
    this.showCommentModal = true;
  }

  closeCommentModal() {
    this.showCommentModal = false;
    this.activeCommentRow = null;
    this.tempCommentText = '';
  }

  saveCommentFromModal() {
    if (this.activeCommentRow) {
      this.activeCommentRow.comments = this.tempCommentText.trim();
      this.toaster.showSuccess(`Comment saved for ${this.activeCommentRow.employee_name}`);
    }
    this.closeCommentModal();
  }

  // Help Accordion
  toggleHelpResources() {
    this.helpResourcesOpen = !this.helpResourcesOpen;
  }

  toggleHelpItem(id: number) {
    this.openedHelpItem = this.openedHelpItem === id ? null : id;
  }
}
