import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { EmployeeService } from '../../../core/services/employee.service';
import { PayrollService } from '../../../core/services/payroll.service';
import { PayrollApiService } from '../../../core/services/payroll-api.service';
import { AttendanceApiService } from '../../../core/services/attendance-api.service';

declare var html2pdf: any;

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.page.html',
  styleUrls: ['./payslips.page.scss'],
  standalone: false,
})
export class PayslipsPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  currentTab: string = 'payslips';
  currentEmployee: any;
  loading = true;

  actualPayableDays: number = 0;
  totalWorkingDays: number = 0;
  lopDays: number = 0;
  daysPayable: number = 0;
  payableDays: number = 0; // Keeping for compatibility if used elsewhere
  activeContract: any;
  salaryTemplates: any[] = [];
  selectedTemplateId: any;

  // Month selection
  availableMonths: any[] = [];
  selectedMonthStr: string = '';
  selectedYear: number = new Date().getFullYear();
  availableYears: number[] = [];
  isPayslipGenerated: boolean = false;

  // Taxation data
  financialYear: string;
  professionalTaxAmount: number = 0;
  employerPfAmount: number = 0;

  // Salary data
  monthlySalary: number | null = null;
  earnings: any[] = [];
  contributions: any[] = [];
  taxes: any[] = [];

  totalEarnings: number = 0;
  totalActualEarnings: number = 0;
  totalContributions: number = 0;
  totalActualContributions: number = 0;
  totalTaxes: number = 0;
  totalActualTaxes: number = 0;
  totalDeductions: number = 0;
  totalActualDeductions: number = 0;
  netSalary: number = 0;
  netSalaryInWords: string = '';

  ones: string[] = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  tens: string[] = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  // Contracts & Modal
  employeeContracts: any[] = [];
  isBreakupModalOpen = false;
  selectedContractDetails: any = null;
  selectedContractBreakup: any = null;
  isLoadingBreakup = false;

  constructor(
    private employeeService: EmployeeService,
    private payrollService: PayrollService,
    private payrollApi: PayrollApiService,
    private attendanceApi: AttendanceApiService,
    private loadingController: LoadingController
  ) {
    this.financialYear = this.payrollApi.getCurrentFinancialYear();
  }

  ngOnInit() {
    this.loadData();
  }

  setTab(event: any) {
    const tab = event.detail.value;
    if (!tab) return;
    this.currentTab = tab;
  }

  async loadData() {
    this.loading = true;
    const loader = await this.loadingController.create({ message: 'Fetching details...' });
    await loader.present();

    this.employeeService.getMyProfile().pipe(takeUntil(this.destroy$)).subscribe({
      next: (emp) => {
        this.currentEmployee = emp;
        if (!emp?.id) {
          loader.dismiss();
          this.loading = false;
          return;
        }

        // 1. Generate Month List dynamically
        this.availableYears = [2026, 2025, 2024]; // Standard years, could be dynamic too
        this.generateMonthList();

        // Select the most recent month (current month)
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        this.selectedMonthStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
        this.fetchPayslipData(emp.id, this.selectedMonthStr);

        // 2. Fetch all contracts for the 'My Salary' tab
        this.payrollService.listContracts({ employee_id: emp.id }).pipe(takeUntil(this.destroy$)).subscribe({
          next: (contracts: any[]) => {
            this.employeeContracts = Array.isArray(contracts) ? contracts : [];
            loader.dismiss();
            this.loading = false;
          },
          error: () => { loader.dismiss(); this.loading = false; }
        });
      },
      error: () => { loader.dismiss(); this.loading = false; }
    });
  }

  generateMonthList() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const months = [];
    const limit = (this.selectedYear === currentYear) ? currentMonth : 12;

    for (let i = limit; i >= 1; i--) {
      months.push({
        month: i,
        year: this.selectedYear
      });
    }
    this.availableMonths = months;
  }

  onYearChange() {
    this.generateMonthList();
    // Auto-select the first month of the new year list
    if (this.availableMonths.length > 0) {
      this.selectMonth(this.availableMonths[0]);
    }
  }

  fetchPayslipData(employeeId: number, monthStr: string) {
    this.loading = true;

    // Fetch Attendance Summary for Payslip
    const [year, month] = monthStr.split('-').map(Number);
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;

    this.actualPayableDays = lastDay;

    this.attendanceApi.getMonthlyReport({ startDate, endDate, month, year }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        console.log(res.summary)
        if (res?.summary) {
          // Total Working Days = present_days + leave_days + weekend_days (since these are payable)
          const present = res.summary.present_days || 0;
          const leaves = res.summary.leave_days || 0;
          const weekends = res.summary.weekend_days || 0;

          this.totalWorkingDays = present + leaves + weekends;
          this.lopDays = res.summary.lop_days || 0;

          // Formula: Total Working Days - Loss of Pay Days
          this.daysPayable = Math.max(0, this.totalWorkingDays - this.lopDays);
          this.payableDays = this.daysPayable; // Sync with existing property
        }
      },
      error: () => {
        this.totalWorkingDays = 0;
        this.lopDays = 0;
        this.daysPayable = 0;
      }
    });

    this.payrollApi.getEmployeeRunStatus(employeeId, monthStr).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          const data = res.data;

          // Only show payslip if runStatus is COMPLETED
          if (data.run && data.run.runStatus === 'COMPLETED') {
            this.isPayslipGenerated = true;
            this.activeContract = data.contract;
            this.mapComponentsToUI(data.contract, data.templateComponents || [], data.monthlyGross || 0);
          } else {
            this.isPayslipGenerated = false;
          }
        } else {
          this.isPayslipGenerated = false;
        }
        this.loading = false;
      },
      error: () => {
        this.isPayslipGenerated = false;
        this.loading = false;
      }
    });
  }

  selectMonth(month: any) {
    const monthStr = `${month.year}-${String(month.month).padStart(2, '0')}`;
    this.selectedMonthStr = monthStr;
    if (this.currentEmployee?.id) {
      this.fetchPayslipData(this.currentEmployee.id, monthStr);
    }
  }

  getMonthName(monthNum: number): string {
    const date = new Date();
    date.setMonth(monthNum - 1);
    return date.toLocaleString('default', { month: 'long' });
  }

  downloadPayslip() {
    const element = document.querySelector('.payslip-card');
    if (!element) return;

    const opt = {
      margin: [10, 10],
      filename: `Payslip_${this.selectedMonthStr}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }

  private mapComponentsToUI(contract: any, components: any[], monthlyGross: number) {
    this.monthlySalary = monthlyGross;

    this.earnings = [];
    this.contributions = [];
    this.taxes = [];
    this.totalEarnings = 0;
    this.totalActualEarnings = 0;
    this.totalContributions = 0;
    this.totalActualContributions = 0;
    this.totalTaxes = 0;
    this.totalActualTaxes = 0;

    // 1. First find total Employer amount and PT amount if they exist
    let totalEmployerPaid = 0;
    let totalEmployerActual = 0;
    let ptPaid = 0;
    let ptActual = 0;

    components.forEach(c => {
      const code = (c.component_code || '').toUpperCase();
      const name = (c.component_name || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || code.includes('EMPLOYEER') || code.includes('_ER') || name.includes('EMPLOYER');

      if (isER) {
        totalEmployerPaid += Number(c.value || 0);
        totalEmployerActual += Number(c.full_value || 0);
        if (code.includes('PF') || name.includes('PF')) {
          this.employerPfAmount = Number(c.full_value || 0) * 12;
        }
      }
      if (code.includes('PROF_TAX') || code === 'PT' || name.includes('PROFESSIONAL TAX')) {
        ptPaid = Number(c.value || 0);
        ptActual = Number(c.full_value || 0);
      }
    });

    // 2. Map components to UI, adding total Employer and PT to Special Allowance
    components.forEach(c => {
      const code = (c.component_code || '').toUpperCase();
      const name = c.component_name;
      const type = (c.component_type || '').toUpperCase();
      let paidAmt = Math.round(Number(c.value || 0));
      let actualAmt = Math.round(Number(c.full_value || 0));
      const isER = code.includes('EMPLOYER') || code.includes('EMPLOYEER') || code.includes('_ER') || (name || '').toUpperCase().includes('EMPLOYER');

      // Add total Employer and PT to Special Allowance if this is the Special Allowance component
      const isSpecial = code === 'SPECIAL' || (name || '').toUpperCase().includes('SPECIAL ALLOWANCE');
      // NOTE: Removed manual addition of employer/pt here as per user request to match backend API exactly.
      
      const compObj = { name, actual: actualAmt, paid: paidAmt, isER };

      if (isER) return;

      if (type === 'EARNING') {
        this.earnings.push(compObj);
        this.totalEarnings += paidAmt;
        this.totalActualEarnings += actualAmt;
      } else if (type === 'DEDUCTION') {
        if (code.includes('TAX') || code.includes('TDS') || (name || '').toUpperCase().includes('TAX')) {
          this.taxes.push(compObj);
          this.totalTaxes += paidAmt;
          this.totalActualTaxes += actualAmt;
          if (code.includes('PROF_TAX') || code.includes('PT')) this.professionalTaxAmount = actualAmt * 12;
        } else {
          this.contributions.push(compObj);
          this.totalContributions += paidAmt;
          this.totalActualContributions += actualAmt;
        }
      }
    });

    this.totalEarnings = Math.round(this.totalEarnings);
    this.totalActualEarnings = Math.round(this.totalActualEarnings);
    this.totalContributions = Math.round(this.totalContributions);
    this.totalActualContributions = Math.round(this.totalActualContributions);
    this.totalTaxes = Math.round(this.totalTaxes);
    this.totalActualTaxes = Math.round(this.totalActualTaxes);
    
    this.totalDeductions = this.totalContributions + this.totalTaxes;
    this.totalActualDeductions = this.totalActualContributions + this.totalActualTaxes;
    
    this.netSalary = Math.round(this.totalEarnings - this.totalDeductions);
    this.netSalaryInWords = this.toWords(this.netSalary);
  }

  // calculateSalary logic is now replaced by mapComponentsToUI which uses backend pre-calculated values

  async openBreakupModal(contract: any) {
    this.selectedContractDetails = contract;
    this.isBreakupModalOpen = true;
    this.isLoadingBreakup = true;
    this.selectedContractBreakup = null;

    this.payrollService.getPayrollComponents().pipe(takeUntil(this.destroy$)).subscribe({
      next: (masterCompsRes: any) => {
        const masterComps = Array.isArray(masterCompsRes) ? masterCompsRes : (masterCompsRes.data || []);
        this.payrollService.getTemplateComposition(contract.template_id).pipe(takeUntil(this.destroy$)).subscribe({
          next: (comps: any[]) => {
            const components = (comps || []).map((c: any) => {
              const masterComp = masterComps.find((mc: any) => mc.component_id === (c.master_component_id || c.component_id));
              return {
                component_code: c.component_code || masterComp?.code || masterComp?.component_code,
                component_name: c.component_name || masterComp?.name || masterComp?.component_name,
                formula_or_value: c.formula_or_value,
                calculation_type: c.calculation_type || masterComp?.calculation_type,
                percentage_of_code: c.percentage_of_code || masterComp?.percentage_of_code || masterComp?.base_code || null,
                component_type: c.component_type || masterComp?.type || masterComp?.component_type,
                sequence: c.sequence || masterComp?.sequence
              };
            });
            this.selectedContractBreakup = this.calculateBreakupForModal(contract.annual_ctc, components);
            this.isLoadingBreakup = false;
          },
          error: () => { this.isLoadingBreakup = false; }
        });
      },
      error: () => { this.isLoadingBreakup = false; }
    });
  }

  closeBreakupModal() {
    this.isBreakupModalOpen = false;
    this.selectedContractDetails = null;
    this.selectedContractBreakup = null;
  }

  private calculateBreakupForModal(ctcAmount: number, components: any[]) {
    const ctc = Number(ctcAmount) || 0;
    const targetMonthly = Math.round(ctc / 12);
    const calculatedAmts: any = { 'CTC': ctc };
    const sortedComps = [...components].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

    const getValue = (c: any, visited: string[] = []): number => {
      const code = (c.component_code || c.code || '').toUpperCase();
      if (code && visited.includes(code)) return 0;
      const newVisited = code ? [...visited, code] : visited;
      const rawVal = c.formula_or_value || c.value || '0';
      const calcType = c.calculation_type || 'FIXED';

      if (calcType === 'FIXED') return Number(rawVal) || 0;
      if (calcType === 'PERCENTAGE') {
        const pct = parseFloat(String(rawVal).replace(/[^0-9.]/g, ''));
        if (isNaN(pct)) return 0;
        let pctOfCode = (c.percentage_of_code || '').toUpperCase();
        if (!pctOfCode || pctOfCode === 'CTC' || pctOfCode === 'GROSS' || pctOfCode === '-') return (pct / 100) * ctc;
        const baseComp = components.find(bc => (bc.component_code || bc.code || '').toUpperCase() === pctOfCode);
        if (baseComp) return (pct / 100) * getValue(baseComp, newVisited);
        return (pct / 100) * ctc;
      }
      return Number(rawVal) || 0;
    };

    sortedComps.forEach(c => { calculatedAmts[(c.component_code || c.code)] = getValue(c); });

    const isSA = (code: string, name: string) => {
      const c = code.toUpperCase();
      const n = (name || '').toUpperCase();
      return c === 'SPECIAL_ALLOWANCE' || c === 'SA' || c === 'SPECIAL' || n.includes('SPECIAL ALLOWANCE');
    };
    const saComp = sortedComps.find(c => isSA(c.component_code || c.code || '', c.component_name || c.name || ''));

    if (saComp) {
      let sumOfOthers = 0;
      sortedComps.forEach(c => {
        if (c !== saComp) {
          const code = (c.component_code || c.code || '').toUpperCase();
          const type = (c.component_type || c.type || '').toUpperCase();
          const isER = code.includes('EMPLOYER') || code.includes('EMPLOYEER') || code.includes('_ER');
          // Important: We round each monthly component before balancing to match backend
          if (type === 'EARNING' || isER) sumOfOthers += Math.round((calculatedAmts[c.component_code || c.code] || 0) / 12);
        }
      });
      calculatedAmts[saComp.component_code || saComp.code] = Math.max(0, targetMonthly - sumOfOthers) * 12; // Store as "annual" so division by 12 works below
    }

    const brk = { earnings: [] as any[], contributions: [] as any[], taxes: [] as any[], totalEarnings: 0, totalContributions: 0, totalTaxes: 0, totalDeductions: 0, netSalary: 0 };

    // Find total Employer Contribution and PT for merging into SA in UI
    let totalEmployerMonthly = 0;
    let ptMonthly = 0;
    sortedComps.forEach(c => {
      const code = (c.component_code || c.code || '').toUpperCase();
      const name = (c.component_name || c.name || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || code.includes('EMPLOYEER') || code.includes('_ER') || name.includes('EMPLOYER');

      if (isER) totalEmployerMonthly += Math.round((calculatedAmts[c.component_code || c.code] || 0) / 12);
      if (code.includes('PROF_TAX') || code === 'PT' || name.includes('PROFESSIONAL TAX')) ptMonthly = Math.round((calculatedAmts[c.component_code || c.code] || 0) / 12);
    });

    sortedComps.forEach(c => {
      const code = (c.component_code || c.code || '').toUpperCase();
      const name = c.component_name || c.name;
      const type = (c.component_type || c.type || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || code.includes('EMPLOYEER') || code.includes('_ER') || (name || '').toUpperCase().includes('EMPLOYER');

      const annualAmt = calculatedAmts[c.component_code || c.code] || 0;
      let monthlyAmt = Math.round(annualAmt / 12);

      // Merge total Employer contribution and PT into Special Allowance if this is SA
      if (isSA(code, name)) {
        monthlyAmt += totalEmployerMonthly + ptMonthly;
      }

      const compObj = { name, actual: monthlyAmt, paid: monthlyAmt, isER };

      // Do NOT push Employer Contributions to the Breakup Modal UI arrays
      if (isER) return;

      if (type === 'EARNING') {
        brk.earnings.push(compObj);
        brk.totalEarnings += monthlyAmt;
      } else if (type === 'DEDUCTION') {
        if (code.includes('TAX') || code.includes('TDS') || name.toUpperCase().includes('TAX')) {
          brk.taxes.push(compObj);
          brk.totalTaxes += monthlyAmt;
        } else {
          brk.contributions.push(compObj);
          brk.totalContributions += monthlyAmt;
        }
      }
    });

    brk.totalDeductions = brk.totalContributions + brk.totalTaxes;
    brk.netSalary = Math.round(brk.totalEarnings - brk.totalDeductions);
    return brk;
  }

  convertLessThanThousand(num: number): string {
    let str: string = "";
    if (num >= 100) {
      str += this.ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      str += this.tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      str += this.ones[num] + " ";
    }
    return str.trim();
  }

  convert(num: number): string {
    let result: string = "";
    if (num >= 10000000) {
      result += this.convert(Math.floor(num / 10000000)) + " Crore ";
      num %= 10000000;
    }
    if (num >= 100000) {
      result += this.convert(Math.floor(num / 100000)) + " Lakh ";
      num %= 100000;
    }
    if (num >= 1000) {
      result += this.convert(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }
    if (num > 0) {
      result += this.convertLessThanThousand(num);
    }
    return result.trim();
  }

  toWords(amount: number): string {
    if (amount === 0) return "Zero Rupees Only";
    const rupees: number = Math.floor(amount);
    const paise: number = Math.round((amount - rupees) * 100);
    let words: string = this.convert(rupees) + " Rupees";
    if (paise > 0) {
      words += " and " + this.convert(paise) + " Paise";
    }
    return words + " Only";
  }

  formatCurrency(val: number): string {
    return (val || 0).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
