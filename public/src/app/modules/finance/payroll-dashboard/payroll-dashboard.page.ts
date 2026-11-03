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
    this.toaster.showInfo(`Viewing ${count} related ${type} records for ${this.selectedMonth}`);
  }

}

