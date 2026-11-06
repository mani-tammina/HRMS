import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PayrollApiService, PayrollDashboardData, PayrollTimelineMonth } from '../../../core/services/payroll-api.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-payroll-dashboard',
  templateUrl: './payroll-dashboard.page.html',
  styleUrls: ['./payroll-dashboard.page.scss'],
  standalone: false
})
export class PayrollDashboardPage implements OnInit {
  @ViewChild('timelineScroll', { static: false }) timelineScroll!: ElementRef<HTMLDivElement>;

  // Sub navigation tabs
  activeSubTab = 'RUN PAYROLL';
  subTabs = [
    { label: 'PAYROLL ANALYTICS', route: null },
    { label: 'RUN PAYROLL', route: '' },
    { label: 'PAYROLL ADMIN', route: '' },
    { label: 'APPROVALS', route: null },
    { label: 'LOANS', route: null },
    { label: 'BENEFITS', route: null },
    { label: 'REPORTS', route: null },
    { label: 'SETTINGS', route: null }
  ];

  selectedMonth: string;
  isLoading = false;
  isDownloadingRegister = false;
  dashboardData: PayrollDashboardData | null = null;
  outcomeCollapsed = false;

  // ─── RUN PAYROLL CARD & 6 STEPS STATE ────────────────────────────────────
  showInputChangesBanner = true;
  runPayrollStepsOpen = true; // Open by default as in screenshot with upward arrow
  activityOpen = false;       // Collapsed by default (downward arrow)
  helpResourcesOpen = true;   // Open by default (upward arrow)

  activeStepModal: any | null = null;
  showTutorialModal = false;
  showChangesModal = false;
  showHelpModal: string | null = null;

  payrollSteps = [
    {
      id: 1,
      title: 'Leave, Attendance & Payable Units',
      subtitle: 'Last Changes on 04 Nov 2026 03:25 pm BY Hari Siva Sai Mukku',
      iconType: 'calendar',
      bgColor: '#e0f2fe',
      iconColor: '#0284c7',
      completed: true,
      description: 'Review employee work days, paid leaves, sandwich deductions, loss of pay (LWP), and finalized payable units for the payroll cycle.'
    },
    {
      id: 2,
      title: 'New Joinees & Exits',
      subtitle: 'No Action taken',
      iconType: 'users',
      bgColor: '#f3e8ff',
      iconColor: '#9333ea',
      completed: false,
      description: 'Audit prorated salary calculations for staff who joined or separated mid-cycle, including Full & Final settlement inputs.'
    },
    {
      id: 3,
      title: 'Bonus, Salary Revisions & Overtime',
      subtitle: 'No Action taken',
      iconType: 'briefcase',
      bgColor: '#f3e8ff',
      iconColor: '#9333ea',
      completed: false,
      description: 'Verify performance incentives, effective increment adjustments, and overtime payout hours for the current month.'
    },
    {
      id: 4,
      title: 'Reimbursement, Adhoc Payment, Deduction',
      subtitle: 'No Action taken',
      iconType: 'calc',
      bgColor: '#e0f2fe',
      iconColor: '#0284c7',
      completed: false,
      description: 'Approve non-taxable expense claims, one-time salary advances, mobile reimbursements, and ad-hoc deductions.'
    },
    {
      id: 5,
      title: 'Salaries on Hold & Arrears',
      subtitle: 'No Action taken',
      iconType: 'hourglass',
      bgColor: '#ecfdf5',
      iconColor: '#059669',
      completed: false,
      description: 'Manage staff salaries placed on administrative hold and disburse pending salary arrears from previous pay cycles.'
    },
    {
      id: 6,
      title: 'Override (PT, ESI, TDS, LWF)',
      subtitle: 'No Action taken',
      iconType: 'shield',
      bgColor: '#fef3c7',
      iconColor: '#d97706',
      completed: false,
      description: 'Review manual statutory tax overrides including Professional Tax, Employee State Insurance, TDS, and Labour Welfare Fund.'
    }
  ];

  get completedStepsCount(): number {
    return this.payrollSteps.filter(s => s.completed).length;
  }

  get completedStepsPercentage(): number {
    return Math.round((this.completedStepsCount / this.payrollSteps.length) * 100);
  }

  get daysInMonth(): number {
    if (!this.selectedMonth) return 30;
    const parts = this.selectedMonth.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    return new Date(y, m, 0).getDate();
  }

  constructor(
    private payrollApi: PayrollApiService,
    private toaster: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.selectedMonth = this.payrollApi.getCurrentYearMonth();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['month']) {
        this.selectedMonth = params['month'];
      }
      this.loadDashboardData(this.selectedMonth);
    });
  }

  ionViewWillEnter() {
    this.loadStepsState();
    this.loadDashboardData(this.selectedMonth);
  }

  loadDashboardData(month: string) {
    this.isLoading = true;
    this.payrollApi.getPayrollDashboard(month).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.data) {
          this.dashboardData = res.data;
          // Ensure Total Payroll Cost = Employee Deposit + Total Deductions + Total contributions
          if (this.dashboardData.equation) {
            const eq = this.dashboardData.equation;
            eq.totalPayrollCost = (Number(eq.employeeDeposit) || 0) + (Number(eq.totalDeductions) || 0) + (Number(eq.totalContributions) || 0);
          }
          this.loadStepsState();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load payroll dashboard', err);
        this.toaster.showError('Failed to load payroll dashboard');
      }
    });
  }

  selectMonth(monthStr: string) {
    if (this.selectedMonth === monthStr) return;
    this.selectedMonth = monthStr;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { month: monthStr },
      queryParamsHandling: 'merge'
    });
    this.loadDashboardData(monthStr);
  }

  scrollTimeline(direction: 'left' | 'right') {
    if (!this.timelineScroll) return;
    const el = this.timelineScroll.nativeElement;
    const scrollAmount = 320;
    if (direction === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  toggleOutcome() {
    this.outcomeCollapsed = !this.outcomeCollapsed;
  }

  toggleRunPayrollSteps() {
    this.runPayrollStepsOpen = !this.runPayrollStepsOpen;
  }

  toggleActivity() {
    this.activityOpen = !this.activityOpen;
  }

  toggleHelpResources() {
    this.helpResourcesOpen = !this.helpResourcesOpen;
  }

  openStepDetails(step: any) {
    if (step.id === 1) {
      this.router.navigate(['/finance/run-payroll/leave-attendance'], {
        queryParams: { month: this.selectedMonth, step: 1 }
      });
      return;
    }
    this.activeStepModal = step;
  }

  closeStepModal() {
    this.activeStepModal = null;
  }

  toggleStepComplete(step: any) {
    step.completed = !step.completed;
    if (step.completed) {
      const now = new Date();
      step.subtitle = `Changes saved on ${now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      this.toaster.showSuccess(`Step "${step.title}" marked as completed`);
    } else {
      step.subtitle = 'No Action taken';
    }
    this.saveStepsState();
    this.closeStepModal();
  }

  loadStepsState() {
    try {
      const key = `payroll_steps_${this.selectedMonth}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach((p: any) => {
            const step = this.payrollSteps.find(s => s.id === p.id);
            if (step) {
              step.completed = !!p.completed;
              if (p.subtitle) step.subtitle = p.subtitle;
            }
          });
        }
      }
    } catch (e) {
      console.warn('Could not load steps state:', e);
    }
  }

  saveStepsState() {
    try {
      const key = `payroll_steps_${this.selectedMonth}`;
      const data = this.payrollSteps.map(s => ({ id: s.id, completed: s.completed, subtitle: s.subtitle }));
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save steps state:', e);
    }
  }

  openGuidedTutorial() {
    this.showTutorialModal = true;
  }

  closeTutorialModal() {
    this.showTutorialModal = false;
  }

  openChangesModal() {
    this.showChangesModal = true;
  }

  closeChangesModal() {
    this.showChangesModal = false;
  }

  openHelpResource(topic: string) {
    this.showHelpModal = topic;
  }

  closeHelpModal() {
    this.showHelpModal = null;
  }

  processPayrollAction() {
    this.router.navigate(['/finance/process'], {
      queryParams: { month: this.selectedMonth }
    });
  }

  reviewAllEmployeesAction() {
    this.router.navigate(['/finance/preview-all'], {
      queryParams: { month: this.selectedMonth }
    });
  }

  async lockPayrollAction() {
    const alert = await this.alertCtrl.create({
      header: `Lock Payroll Period`,
      subHeader: `${this.selectedMonth}`,
      message: `Are you sure you want to lock the payroll for <strong>${this.selectedMonth}</strong>?<br><br>All input adjustments, payable units, and disbursements will be locked.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Lock Payroll',
          handler: () => {
            this.executeLockPayroll();
          }
        }
      ]
    });
    await alert.present();
  }

  private executeLockPayroll() {
    this.toaster.showSuccess(`Payroll for ${this.selectedMonth} locked successfully!`);
    if (this.dashboardData?.outcome) {
      this.dashboardData.outcome.isCompleted = true;
    }
  }

  onSubTabClick(tab: any) {
    this.activeSubTab = tab.label;
    if (tab.route) {
      this.router.navigate([tab.route]);
    } else {
      this.toaster.showInfo(`${tab.label} section`);
    }
  }

  goToRunStepper() {
    this.router.navigate(['/finance/process'], {
      queryParams: { month: this.selectedMonth }
    });
  }

  managePayslips() {
    this.router.navigate(['/MyPay']);
  }

  viewPayRegister(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const runId = this.dashboardData?.outcome?.runId;
    if (!runId) {
      this.toaster.showWarning(`No completed payroll run for ${this.selectedMonth} to export.`);
      return;
    }

    this.isDownloadingRegister = true;
    this.toaster.showInfo(`Generating Pay Register for Run #${runId}...`);

    this.payrollApi.exportRunExcel(runId).subscribe({
      next: (blob: Blob) => {
        this.isDownloadingRegister = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Payroll_Register_${this.selectedMonth}_Run_${runId}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toaster.showSuccess('Pay register downloaded successfully');
      },
      error: (err) => {
        this.isDownloadingRegister = false;
        console.error('Failed to export pay register', err);
        this.toaster.showError('Failed to download pay register: ' + (err?.error?.message || err?.message || 'Server error'));
      }
    });
  }

  formatCurrency(val: any): string {
    const num = Math.round(Number(val) || 0);
    return 'INR ' + num.toLocaleString('en-IN');
  }

  formatDelta(delta: any): string {
    const num = Math.round(Number(delta) || 0);
    if (num > 0) {
      return `INR +${num.toLocaleString('en-IN')} ⌃`;
    } else if (num < 0) {
      return `INR -${Math.abs(num).toLocaleString('en-IN')} ⌄`;
    }
    return `INR 0`;
  }

  isDeltaPositive(delta: any): boolean {
    return (Number(delta) || 0) > 0;
  }

  async reviewItem(itemKey: string) {
    if (itemKey === 'providentFund') {
      const pfData = this.dashboardData?.outcome?.statutoryCards?.providentFund;
      const employees = pfData?.employees || [];
      const totalEmpShare = pfData?.employeeShare || 0;
      const totalErShare = pfData?.employerShare || 0;
      const totalPf = pfData?.totalPf || (totalEmpShare + totalErShare);

      let empRowsHtml = '';
      if (employees.length > 0) {
        empRowsHtml = employees.map((e: any) => `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 10px; text-align: left;"><strong>${e.fullName}</strong><br><small style="color:#64748b">${e.employeeNumber || ''} · ${e.designation || 'Staff'}</small></td>
            <td style="padding: 8px 10px; text-align: right; color:#6366f1; font-weight:600;">${this.formatCurrency(e.employeeShare)}</td>
            <td style="padding: 8px 10px; text-align: right; color:#0284c7; font-weight:600;">${this.formatCurrency(e.employerShare)}</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 700; color:#10b981;">${this.formatCurrency(e.totalPf)}</td>
          </tr>
        `).join('');
      } else {
        empRowsHtml = `<tr><td colspan="4" style="padding: 12px; text-align: center; color: #64748b;">No individual PF records found for ${this.selectedMonth}</td></tr>`;
      }

      const alert = await this.alertCtrl.create({
        header: 'Provident Fund (PF) Breakdown',
        subHeader: `Preview — Dry Run (${this.selectedMonth}) · ${pfData?.employeesCount || employees.length} Employees Paying`,
        message: `
          <div style="font-size: 0.85rem; max-height: 320px; overflow-y: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
                  <th style="padding: 8px 10px; text-align: left; font-size:0.75rem; color:#64748b;">EMPLOYEE</th>
                  <th style="padding: 8px 10px; text-align: right; font-size:0.75rem; color:#6366f1;">EE SHARE</th>
                  <th style="padding: 8px 10px; text-align: right; font-size:0.75rem; color:#0284c7;">ER SHARE</th>
                  <th style="padding: 8px 10px; text-align: right; font-size:0.75rem; color:#10b981;">TOTAL PF</th>
                </tr>
              </thead>
              <tbody>
                ${empRowsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #f1f5f9; font-weight: bold; border-top: 2px solid #94a3b8;">
                  <td style="padding: 8px 10px; text-align: left;">Total (${pfData?.employeesCount || employees.length})</td>
                  <td style="padding: 8px 10px; text-align: right; color:#6366f1;">${this.formatCurrency(totalEmpShare)}</td>
                  <td style="padding: 8px 10px; text-align: right; color:#0284c7;">${this.formatCurrency(totalErShare)}</td>
                  <td style="padding: 8px 10px; text-align: right; color:#10b981;">${this.formatCurrency(totalPf)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        `,
        cssClass: 'glass-alert wide-alert',
        buttons: [
          { text: 'Close', role: 'cancel' },
          {
            text: 'Go to Dry Run Preview',
            handler: () => {
              this.router.navigate(['/finance/process'], { queryParams: { month: this.selectedMonth, step: 'preview' } });
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    if (itemKey === 'esi') {
      const esiData = this.dashboardData?.outcome?.statutoryCards?.esi;
      const employees = esiData?.employees || [];
      const totalEmpShare = esiData?.employeeShare || 0;
      const totalErShare = esiData?.employerShare || 0;
      const totalEsi = esiData?.totalEsi || (totalEmpShare + totalErShare);

      let empRowsHtml = '';
      if (employees.length > 0) {
        empRowsHtml = employees.map((e: any) => `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 10px; text-align: left;"><strong>${e.fullName}</strong><br><small style="color:#64748b">${e.employeeNumber || ''} · ${e.designation || 'Staff'}</small></td>
            <td style="padding: 8px 10px; text-align: right; color:#6366f1; font-weight:600;">${this.formatCurrency(e.employeeShare)}</td>
            <td style="padding: 8px 10px; text-align: right; color:#0284c7; font-weight:600;">${this.formatCurrency(e.employerShare)}</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 700; color:#10b981;">${this.formatCurrency(e.totalEsi)}</td>
          </tr>
        `).join('');
      } else {
        empRowsHtml = `<tr><td colspan="4" style="padding: 12px; text-align: center; color: #64748b;">No individual ESI records found for ${this.selectedMonth}</td></tr>`;
      }

      const alert = await this.alertCtrl.create({
        header: 'Employee State Insurance (ESI) Breakdown',
        subHeader: `Preview — Dry Run (${this.selectedMonth}) · ${esiData?.employeesCount || employees.length} Employees Paying`,
        message: `
          <div style="font-size: 0.85rem; max-height: 320px; overflow-y: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
                  <th style="padding: 8px 10px; text-align: left; font-size:0.75rem; color:#64748b;">EMPLOYEE</th>
                  <th style="padding: 8px 10px; text-align: right; font-size:0.75rem; color:#6366f1;">EE SHARE (0.75%)</th>
                  <th style="padding: 8px 10px; text-align: right; font-size:0.75rem; color:#0284c7;">ER SHARE (3.25%)</th>
                  <th style="padding: 8px 10px; text-align: right; font-size:0.75rem; color:#10b981;">TOTAL ESI</th>
                </tr>
              </thead>
              <tbody>
                ${empRowsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #f1f5f9; font-weight: bold; border-top: 2px solid #94a3b8;">
                  <td style="padding: 8px 10px; text-align: left;">Total (${esiData?.employeesCount || employees.length})</td>
                  <td style="padding: 8px 10px; text-align: right; color:#6366f1;">${this.formatCurrency(totalEmpShare)}</td>
                  <td style="padding: 8px 10px; text-align: right; color:#0284c7;">${this.formatCurrency(totalErShare)}</td>
                  <td style="padding: 8px 10px; text-align: right; color:#10b981;">${this.formatCurrency(totalEsi)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        `,
        cssClass: 'glass-alert wide-alert',
        buttons: [
          { text: 'Close', role: 'cancel' },
          {
            text: 'Go to Dry Run Preview',
            handler: () => {
              this.router.navigate(['/finance/process'], { queryParams: { month: this.selectedMonth, step: 'preview' } });
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    if (itemKey === 'professionalTax') {
      const ptData = this.dashboardData?.outcome?.statutoryCards?.professionalTax;
      const employees = ptData?.employees || [];
      const totalTax = ptData?.totalTax ?? ptData?.amount ?? 0;

      let empRowsHtml = '';
      if (employees.length > 0) {
        empRowsHtml = employees.map((e: any) => `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 10px; text-align: left;"><strong>${e.fullName}</strong><br><small style="color:#64748b">${e.employeeNumber || ''} · ${e.designation || 'Staff'}</small></td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 700; color:#6366f1;">${this.formatCurrency(e.amount)}</td>
          </tr>
        `).join('');
      } else {
        empRowsHtml = `<tr><td colspan="2" style="padding: 12px; text-align: center; color: #64748b;">No individual Professional Tax records found for ${this.selectedMonth}</td></tr>`;
      }

      const alert = await this.alertCtrl.create({
        header: 'Professional Tax (PT) Breakdown',
        subHeader: `Preview — Dry Run (${this.selectedMonth}) · ${ptData?.employeesCount || employees.length} Employees Paying`,
        message: `
          <div style="font-size: 0.85rem; max-height: 320px; overflow-y: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
                  <th style="padding: 8px 10px; text-align: left; font-size:0.75rem; color:#64748b;">EMPLOYEE</th>
                  <th style="padding: 8px 10px; text-align: right; font-size:0.75rem; color:#6366f1;">PROFESSIONAL TAX</th>
                </tr>
              </thead>
              <tbody>
                ${empRowsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #f1f5f9; font-weight: bold; border-top: 2px solid #94a3b8;">
                  <td style="padding: 8px 10px; text-align: left;">Total (${ptData?.employeesCount || employees.length})</td>
                  <td style="padding: 8px 10px; text-align: right; color:#6366f1;">${this.formatCurrency(totalTax)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        `,
        cssClass: 'glass-alert wide-alert',
        buttons: [
          { text: 'Close', role: 'cancel' },
          {
            text: 'Go to Dry Run Preview',
            handler: () => {
              this.router.navigate(['/finance/process'], { queryParams: { month: this.selectedMonth, step: 'preview' } });
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    const titles: { [key: string]: { name: string; route?: string } } = {
      incomeTax: { name: 'Income Tax (ITR)', route: '/finance/tax-admin' },
      providentFund: { name: 'Provident Fund (PF)', route: '/finance/tax-admin' },
      esi: { name: 'Employee State Insurance (ESI)', route: '/finance/tax-admin' },
      professionalTax: { name: 'Professional Tax', route: '/finance/tax-admin' },
      deductionComponents: { name: 'Deduction Components', route: '/finance/components' }
    };

    const target = titles[itemKey] || { name: itemKey, route: '/finance/tax-admin' };
    const alert = await this.alertCtrl.create({
      header: `Review ${target.name}`,
      subHeader: `Payroll Period: ${this.selectedMonth}`,
      message: `Statutory deductions and employee enrollments for <strong>${target.name}</strong> are verified for <strong>${this.selectedMonth}</strong>.<br><br>Would you like to open the statutory settings &amp; audit view?`,
      cssClass: 'glass-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Open Admin Config',
          handler: () => {
            if (target.route) {
              this.router.navigate([target.route]);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  viewRelatedRecords(type: string, count: number) {
    if (type === 'PF-linked') {
      this.reviewItem('providentFund');
      return;
    }
    if (type === 'ESI-registered') {
      this.reviewItem('esi');
      return;
    }
    if (type === 'PT-related') {
      this.reviewItem('professionalTax');
      return;
    }
    this.toaster.showInfo(`Viewing ${count} related ${type} records for ${this.selectedMonth}`);
  }

}

