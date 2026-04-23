import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { EmployeeService } from '../../../core/services/employee.service';
import { PayrollService } from '../../../core/services/payroll.service';
import { PayrollApiService } from '../../../core/services/payroll-api.service';

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

  payableDays: number = 31;
  lopDays: number = 0;
  activeContract: any;
  salaryTemplates: any[] = [];
  selectedTemplateId: any;

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
  totalContributions: number = 0;
  totalTaxes: number = 0;
  totalDeductions: number = 0;
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
    const loader = await this.loadingController.create({ message: 'Fetching salary details...' });
    await loader.present();

    this.employeeService.getMyProfile().pipe(takeUntil(this.destroy$)).subscribe({
      next: (emp) => {
        this.currentEmployee = emp;
        if (!emp?.id) {
          loader.dismiss();
          this.loading = false;
          return;
        }

        this.payrollService.listContracts({ employee_id: emp.id }).pipe(takeUntil(this.destroy$)).subscribe({
          next: (contracts: any[]) => {
            this.employeeContracts = Array.isArray(contracts) ? contracts : [];
            this.activeContract = this.employeeContracts.find(c => c.status === 'Active') || this.employeeContracts[0];

            if (this.activeContract) {
              this.payrollService.getTemplateComposition(this.activeContract.template_id).pipe(takeUntil(this.destroy$)).subscribe({
                next: (comps: any[]) => {
                  this.calculateSalary({ ctc_amount: this.activeContract.annual_ctc }, comps);
                  loader.dismiss();
                  this.loading = false;
                },
                error: () => { loader.dismiss(); this.loading = false; }
              });
            } else {
              this.payrollService.getPayrollstructures().pipe(takeUntil(this.destroy$)).subscribe({
                next: (res: any) => {
                  const allStructures = Array.isArray(res) ? res : (res.data || []);
                  const activeStructure = allStructures.find((s: any) => s.employee_id === emp.id && s.is_active);
                  if (activeStructure) {
                    this.payrollService.getPayrollStructureById(activeStructure.id).pipe(takeUntil(this.destroy$)).subscribe({
                      next: (details: any) => {
                        const structure = details.structure || details;
                        const components = details.components || details.salary_components || [];
                        this.calculateSalary(structure, components);
                        loader.dismiss();
                        this.loading = false;
                      },
                      error: () => { loader.dismiss(); this.loading = false; }
                    });
                  } else {
                    loader.dismiss();
                    this.loading = false;
                  }
                },
                error: () => { loader.dismiss(); this.loading = false; }
              });
            }
          },
          error: () => { loader.dismiss(); this.loading = false; }
        });
      },
      error: () => { loader.dismiss(); this.loading = false; }
    });
  }

  private calculateSalary(structure: any, components: any[]) {
    const ctc = Number(structure.ctc_amount) || 0;
    this.monthlySalary = ctc / 12;

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

    sortedComps.forEach(c => {
      calculatedAmts[(c.component_code || c.code)] = getValue(c);
    });

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
          if (type === 'EARNING' || isER) sumOfOthers += calculatedAmts[c.component_code || c.code] || 0;
        }
      });
      calculatedAmts[saComp.component_code || saComp.code] = Math.max(0, ctc - sumOfOthers);
    }

    this.earnings = [];
    this.contributions = [];
    this.taxes = [];
    this.totalEarnings = 0;
    this.totalContributions = 0;
    this.totalTaxes = 0;

    sortedComps.forEach(c => {
      const code = (c.component_code || c.code || '').toUpperCase();
      const name = c.component_name || c.name;
      const type = (c.component_type || c.type || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || code.includes('EMPLOYEER') || code.includes('_ER');

      const annualAmt = calculatedAmts[c.component_code || c.code] || 0;
      const monthlyAmt = Math.round(annualAmt / 12);
      const compObj = { name, actual: monthlyAmt, paid: monthlyAmt, isER };

      if (type === 'EARNING' && !isER) {
        this.earnings.push(compObj);
        this.totalEarnings += monthlyAmt;
      } else if (type === 'DEDUCTION' || isER) {
        if (code.includes('TAX') || code.includes('TDS') || name.toUpperCase().includes('TAX')) {
          this.taxes.push(compObj);
          this.totalTaxes += monthlyAmt;
          if (code.includes('PROF_TAX') || code.includes('PT')) this.professionalTaxAmount = annualAmt;
        } else {
          this.contributions.push(compObj);
          this.totalContributions += monthlyAmt;
          if (isER && code.includes('PF')) this.employerPfAmount = annualAmt;
        }
      }
    });

    this.totalDeductions = this.totalContributions + this.totalTaxes;
    let employeeContributions = this.totalContributions;
    this.contributions.forEach(c => { if (c.isER) employeeContributions -= c.paid; });
    this.netSalary = this.totalEarnings - employeeContributions - this.totalTaxes;
    this.netSalaryInWords = this.toWords(this.netSalary);
  }

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
          if (type === 'EARNING' || isER) sumOfOthers += calculatedAmts[c.component_code || c.code] || 0;
        }
      });
      calculatedAmts[saComp.component_code || saComp.code] = Math.max(0, ctc - sumOfOthers);
    }

    const brk = { earnings: [] as any[], contributions: [] as any[], taxes: [] as any[], totalEarnings: 0, totalContributions: 0, totalTaxes: 0, totalDeductions: 0, netSalary: 0 };

    sortedComps.forEach(c => {
      const code = (c.component_code || c.code || '').toUpperCase();
      const name = c.component_name || c.name;
      const type = (c.component_type || c.type || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || code.includes('EMPLOYEER') || code.includes('_ER');

      const annualAmt = calculatedAmts[c.component_code || c.code] || 0;
      const monthlyAmt = Math.round(annualAmt / 12);
      const compObj = { name, actual: monthlyAmt, paid: monthlyAmt, isER };

      if (type === 'EARNING' && !isER) {
        brk.earnings.push(compObj);
        brk.totalEarnings += monthlyAmt;
      } else if (type === 'DEDUCTION' || isER) {
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
    let employeeContributions = brk.totalContributions;
    brk.contributions.forEach(c => { if (c.isER) employeeContributions -= c.paid; });
    brk.netSalary = brk.totalEarnings - employeeContributions - brk.totalTaxes;
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
