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
  contractData: any;
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

  // Contracts & Modal
  employeeContracts: any[] = [];
  isBreakupModalOpen = false;
  selectedContractDetails: any = null;
  selectedContractBreakup: any = null;
  isLoadingBreakup = false;

  tens: string[] = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

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
        if (emp?.lpa) {
          this.monthlySalary = Number(emp.lpa) / 12;
        }

        if (!emp?.id) {
          loader.dismiss();
          this.loading = false;
          return;
        }

        this.payrollService.listContracts({ employee_id: emp.id }).pipe(takeUntil(this.destroy$)).subscribe({
          next: (contracts: any[]) => {
            this.employeeContracts = Array.isArray(contracts) ? contracts : [];

            this.payrollService.getPayrollstructures().pipe(takeUntil(this.destroy$)).subscribe({
              next: (res: any) => {
                const allStructures = Array.isArray(res) ? res : (res.data || []);
                const activeStructure = allStructures.find((s: any) => s.employee_id === emp.id && s.is_active);

                if (activeStructure) {
                  // Load structure details
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
                  // Standard Fallback: Use Template from Employee Contract to Show Mapping
                  this.payrollService.listContracts({ employee_id: emp.id }).pipe(takeUntil(this.destroy$)).subscribe({
                    next: (contracts: any[]) => {
                      const latestContract = Array.isArray(contracts) && contracts.length > 0 ? contracts[0] : null;
                      if (latestContract) {
                        this.payrollService.getTemplateComposition(latestContract.template_id).pipe(takeUntil(this.destroy$)).subscribe({
                          next: (comps: any[]) => {
                            this.payrollService.getPayrollComponents().pipe(takeUntil(this.destroy$)).subscribe({
                              next: (masterCompsRes: any) => {
                                const masterComps = Array.isArray(masterCompsRes) ? masterCompsRes : (masterCompsRes.data || []);
                                const components = (comps || []).map(c => {
                                  const masterComp = masterComps.find((mc: any) => mc.component_id === (c.master_component_id || c.component_id));
                                  return {
                                    code: c.component_code || masterComp?.code || masterComp?.component_code,
                                    name: c.component_name || masterComp?.name || masterComp?.component_name,
                                    value: c.formula_or_value,
                                    calculation_type: c.calculation_type || masterComp?.calculation_type,
                                    percentage_of_code: c.percentage_of_code || masterComp?.percentage_of_code || masterComp?.base_code || null,
                                    component_type: c.component_type || masterComp?.type || masterComp?.component_type,
                                    sequence: c.sequence || masterComp?.sequence
                                  };
                                });
                                this.calculateSalary({ ctc_amount: latestContract.annual_ctc }, components);
                                loader.dismiss();
                                this.loading = false;
                              },
                              error: () => { loader.dismiss(); this.loading = false; }
                            });
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
      const code = (c.code || '').toUpperCase();
      if (code && visited.includes(code)) return 0;
      const newVisited = code ? [...visited, code] : visited;

      if (c.calculation_type === 'FIXED') {
        return Number(c.value) || 0;
      }

      const rawInput = String(c.value || '0').trim();
      const isPct = c.calculation_type === 'PERCENTAGE' || rawInput.includes('%');

      if (isPct) {
        const pct = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
        if (isNaN(pct)) return 0;

        let pctOf = (c.percentage_of_code || c.base_code || c.base_component || '').toUpperCase();

        // Fallback for formula-based lookup
        if ((!pctOf || pctOf === '-') && rawInput.toUpperCase().includes('OF ')) {
          const parts = rawInput.toUpperCase().split('OF ');
          pctOf = parts[parts.length - 1].trim();
        }

        // Support GROSS alias and self-referencing fallback
        if (pctOf === 'GROSS' || pctOf === code) pctOf = 'CTC';

        if (pctOf && pctOf !== 'CTC' && pctOf !== '-') {
          const baseComp = components.find(bc => {
            const bcCode = (bc.code || '').toUpperCase();
            const bcName = (bc.name || '').toUpperCase();
            return bcCode === pctOf ||
              bcName === pctOf ||
              bcCode === pctOf.replace(/\s/g, '_') ||
              pctOf === bcCode.replace(/\s/g, '_');
          });
          if (baseComp) {
            return (pct / 100) * getValue(baseComp, newVisited);
          }
        }
        return (pct / 100) * ctc;
      }

      return Number(c.value) || 0;
    };

    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      let val = getValue(c);

      // Enforce Rule: Basic = 40% of Gross (CTC)
      // Use inclusive matching for names like 'Basic Salary'
      if (name.includes('BASIC') || code.includes('BASIC')) {
        // If value is 0 or a very low placeholder (like 1, 2, 3), apply the 40% rule
        if (!val || val <= 100) val = ctc * 0.40;
      }

      calculatedAmts[c.code] = val;
    });

    // Pass 2.5: Enforce Rule: HRA = 40% of Basic
    // Must be done after Basic is calculated
    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      const isHRA = code === 'HRA' || code.includes('HOUSE_RENT') || name.includes('HOUSE RENT') || name === 'HRA';
      
      if (isHRA) {
        let basicVal = 0;
        // Find Basic amount - support inclusive matching
        Object.keys(calculatedAmts).forEach(k => {
          const comp = components.find(bc => bc.code === k);
          const cName = (comp?.name || '').toUpperCase();
          if (k.toUpperCase().includes('BASIC') || cName.includes('BASIC')) {
            basicVal = calculatedAmts[k];
          }
        });

        if (basicVal > 0 && (!calculatedAmts[c.code] || calculatedAmts[c.code] <= 100)) {
          calculatedAmts[c.code] = basicVal * 0.40;
        }
      }
    });

    // Pass 3: Calculate ESI Employee first
    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const isESIEmployee = code.includes('ESI') && !code.includes('EMPLOYER');
      if (isESIEmployee) {
        let pfm = 0;
        Object.keys(calculatedAmts).forEach(k => {
          if (k.toUpperCase().includes('PF') && k.toUpperCase().includes('EMPLOYER')) pfm = calculatedAmts[k];
        });
        calculatedAmts[c.code] = (ctc - pfm) * (3.25 / 103.25);
      }
    });

    // Pass 4: Calculate ESI Employer second
    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      const isESIEmployer = code.includes('ESI') && (code.includes('EMPLOYER') || name.includes('EMPLOYER'));
      if (isESIEmployer) {
        let pfm = 0;
        let employeeEsi = 0;
        Object.keys(calculatedAmts).forEach(k => {
          if (k.toUpperCase().includes('PF') && k.toUpperCase().includes('EMPLOYER')) pfm = calculatedAmts[k];
          if (k.toUpperCase().includes('ESI') && !k.toUpperCase().includes('EMPLOYER')) employeeEsi = calculatedAmts[k];
        });
        calculatedAmts[c.code] = (ctc - pfm - employeeEsi) * (0.75 / 100);
      }
    });

    // Pass 5: Special Allowance Allocation
    const isSA = (code: string, name: string) => {
      const c = (code || '').toUpperCase();
      const n = (name || '').toUpperCase();
      return c === 'SPECIAL_ALLOWANCE' || c === 'SA' || n.includes('SPECIAL ALLOWANCE');
    };
    const specialAllowanceComp = sortedComps.find(c => isSA(c.code, c.name));

    if (specialAllowanceComp) {
      let sumOfEarnings = 0;
      let sumOfEmployerPortions = 0;

      sortedComps.forEach(c => {
        if (c !== specialAllowanceComp) {
          const codeUpper = (c.code || '').toUpperCase();
          const nameUpper = (c.name || '').toUpperCase();
          const isER = codeUpper.includes('EMPLOYER') || nameUpper.includes('EMPLOYER') || codeUpper.includes('EMPLOYEER') || nameUpper.includes('EMPLOYEER') || codeUpper.includes('_ER') || nameUpper.includes('_ER');
          // const isPT = codeUpper.includes('PROFESSIONAL_TAX') || codeUpper === 'PT' || nameUpper.includes('PROFESSIONAL TAX');

          if (c.component_type?.toUpperCase() === 'EARNING') {
            sumOfEarnings += calculatedAmts[c.code] || 0;
          } else if (isER || codeUpper.includes('PF_Employeer') || nameUpper.includes('PF_Employeer') || codeUpper.includes('ESI_Employeer') || nameUpper.includes('ESI_Employeer')) {
            // Employer components and PT are subtracted from CTC to get balancing allowance
            sumOfEmployerPortions += calculatedAmts[c.code] || 0;
          }
        }
      });
      calculatedAmts[specialAllowanceComp.code] = Math.max(0, ctc - sumOfEarnings - sumOfEmployerPortions);
    }

    this.earnings = [];
    this.contributions = [];
    this.taxes = [];
    this.totalEarnings = 0;
    this.totalContributions = 0;
    this.totalTaxes = 0;

    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || name.includes('EMPLOYER') || code.includes('EMPLOYEER') || name.includes('EMPLOYEER') || code.includes('_ER') || name.includes('_ER');

      const monthlyAmt = Math.round((calculatedAmts[c.code] || 0) / 12);
      const compObj = { name: c.name, actual: monthlyAmt, paid: monthlyAmt, isER };

      if (isER && (code.includes('PF') || name.includes('PF'))) {
        this.employerPfAmount = monthlyAmt * 12;
      }

      if (c.component_type?.toUpperCase() === 'EARNING' && !isER) {
        this.earnings.push(compObj);
        this.totalEarnings += monthlyAmt;
      } else if (code.includes('PF') || code.includes('ESI') || isER) {
        if (!isER) {
          this.contributions.push(compObj);
          this.totalContributions += monthlyAmt;
        }
      } else {
        this.taxes.push(compObj);
        this.totalTaxes += monthlyAmt;
        
        // Identify Professional Tax for the Taxation Tab
        const isPT = code.includes('PT') || code.includes('PROFESSIONAL_TAX') || name.includes('PROFESSIONAL TAX');
        if (isPT) {
          this.professionalTaxAmount = monthlyAmt * 12;
        }
      }
    });

    this.totalDeductions = this.totalContributions + this.totalTaxes;
    this.netSalary = this.totalEarnings - this.totalDeductions;
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
                code: c.component_code || masterComp?.code || masterComp?.component_code,
                name: c.component_name || masterComp?.name || masterComp?.component_name,
                value: c.formula_or_value,
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
      const code = (c.code || '').toUpperCase();
      if (code && visited.includes(code)) return 0;
      const newVisited = code ? [...visited, code] : visited;

      if (c.calculation_type === 'FIXED') {
        return Number(c.value) || 0;
      }

      const rawInput = String(c.value || '0').trim();
      const isPct = c.calculation_type === 'PERCENTAGE' || rawInput.includes('%');

      if (isPct) {
        const pct = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
        if (isNaN(pct)) return 0;

        let pctOf = (c.percentage_of_code || c.base_code || c.base_component || '').toUpperCase();

        // Fallback for formula-based lookup
        if ((!pctOf || pctOf === '-') && rawInput.toUpperCase().includes('OF ')) {
          const parts = rawInput.toUpperCase().split('OF ');
          pctOf = parts[parts.length - 1].trim();
        }

        // Support GROSS alias and self-referencing fallback
        if (pctOf === 'GROSS' || pctOf === code) pctOf = 'CTC';

        if (pctOf && pctOf !== 'CTC' && pctOf !== '-') {
          const baseComp = components.find(bc => {
            const bcCode = (bc.code || '').toUpperCase();
            const bcName = (bc.name || '').toUpperCase();
            return bcCode === pctOf ||
              bcName === pctOf ||
              bcCode === pctOf.replace(/\s/g, '_') ||
              pctOf === bcCode.replace(/\s/g, '_');
          });
          if (baseComp) {
            return (pct / 100) * getValue(baseComp, newVisited);
          }
        }
        return (pct / 100) * ctc;
      }

      return Number(c.value) || 0;
    };

    sortedComps.forEach(c => { calculatedAmts[c.code] = getValue(c); });

    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      let val = getValue(c);

      // Enforce Rule: Basic = 40% of Gross (CTC)
      if (name.includes('BASIC') || code.includes('BASIC')) {
        if (!val || val <= 100) val = ctc * 0.40;
      }
      calculatedAmts[c.code] = val;
    });

    // Pass 2.5: HRA Rule
    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      const isHRA = code === 'HRA' || code.includes('HOUSE_RENT') || name.includes('HOUSE RENT') || name === 'HRA' || name.includes('ALLOWANCE');
      if (isHRA && (name.includes('RENT') || code.includes('HRA'))) {
        let basicVal = 0;
        Object.keys(calculatedAmts).forEach(k => { 
          const comp = components.find(bc => bc.code === k);
          const cName = (comp?.name || '').toUpperCase();
          if (k.toUpperCase().includes('BASIC') || cName.includes('BASIC')) basicVal = calculatedAmts[k]; 
        });
        if (basicVal > 0 && (!calculatedAmts[c.code] || calculatedAmts[c.code] <= 100)) {
          calculatedAmts[c.code] = basicVal * 0.40;
        }
      }
    });

    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      if (code.includes('ESI') && (code.includes('EMPLOYER') || name.includes('EMPLOYER'))) {
        let pfm = 0, employeeEsi = 0;
        Object.keys(calculatedAmts).forEach(k => {
          if (k.toUpperCase().includes('PF') && k.toUpperCase().includes('EMPLOYER')) pfm = calculatedAmts[k];
          if (k.toUpperCase().includes('ESI') && !k.toUpperCase().includes('EMPLOYER')) employeeEsi = calculatedAmts[k];
        });
        calculatedAmts[c.code] = (ctc - pfm - employeeEsi) * (0.75 / 100);
      }
    });

    const isSA = (code: string, name: string) => {
      const c = (code || '').toUpperCase(), n = (name || '').toUpperCase();
      return c === 'SPECIAL_ALLOWANCE' || c === 'SA' || n.includes('SPECIAL ALLOWANCE');
    };
    const specialAllowanceComp = sortedComps.find(c => isSA(c.code, c.name));

    if (specialAllowanceComp) {
      let sumOfEarnings = 0, sumOfEmployerPortions = 0;
      sortedComps.forEach(c => {
        if (c !== specialAllowanceComp) {
          const codeUpper = (c.code || '').toUpperCase(), nameUpper = (c.name || '').toUpperCase();
          const isER = codeUpper.includes('EMPLOYER') || nameUpper.includes('EMPLOYER') || codeUpper.includes('EMPLOYEER') || nameUpper.includes('EMPLOYEER') || codeUpper.includes('_ER') || nameUpper.includes('_ER');
          const isPT = codeUpper.includes('PROFESSIONAL_TAX') || codeUpper === 'PT' || nameUpper.includes('PROFESSIONAL TAX');

          if (c.component_type?.toUpperCase() === 'EARNING') sumOfEarnings += calculatedAmts[c.code] || 0;
          else if (isER || isPT || codeUpper.includes('PF_') || nameUpper.includes('PF_') || codeUpper.includes('ESI_') || nameUpper.includes('ESI_')) sumOfEmployerPortions += calculatedAmts[c.code] || 0;
        }
      });
      calculatedAmts[specialAllowanceComp.code] = Math.max(0, ctc - sumOfEarnings - sumOfEmployerPortions);
    }

    const brk = { earnings: [] as any[], contributions: [] as any[], taxes: [] as any[], totalEarnings: 0, totalContributions: 0, totalTaxes: 0, totalDeductions: 0, netSalary: 0 };

    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || name.includes('EMPLOYER') || code.includes('EMPLOYEER') || name.includes('EMPLOYEER') || code.includes('_ER') || name.includes('_ER');

      const monthlyAmt = Math.round((calculatedAmts[c.code] || 0) / 12);
      const compObj = { name: c.name, actual: monthlyAmt, paid: monthlyAmt, isER };

      if (c.component_type?.toUpperCase() === 'EARNING' && !isER) {
        brk.earnings.push(compObj);
        brk.totalEarnings += monthlyAmt;
      }
      else if (code.includes('PF') || code.includes('ESI') || isER) {
        brk.contributions.push(compObj);
        brk.totalContributions += monthlyAmt;
      }
      else {
        brk.taxes.push(compObj);
        brk.totalTaxes += monthlyAmt;
      }
    });

    // For the breakup modal, we calculate Net as CTC - (All Deductions including Employer portions)
    // to show how the CTC is distributed.
    brk.totalDeductions = brk.totalContributions + brk.totalTaxes;
    brk.netSalary = (ctc / 12) - brk.totalDeductions;
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



  // numberToWords(num: number): string {
  //   const a = [
  //     '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
  //     'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
  //     'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  //     'Seventeen', 'Eighteen', 'Nineteen',
  //   ];
  //   const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  //   if (num === 0) return 'Zero Rupees only';

  //   let words = '';
  //   let n = Math.floor(num);

  //   if (Math.floor(n / 1000) > 0) {
  //     words += a[Math.floor(n / 1000)] + ' Thousand ';
  //     n %= 1000;
  //   }

  //   if (Math.floor(n / 100) > 0) {
  //     words += a[Math.floor(n / 100)] + ' Hundred ';
  //     n %= 100;
  //   }

  //   if (n > 0) {
  //     if (n < 20) words += a[n];
  //     else words += b[Math.floor(n / 10)] + ' ' + (n % 10 === 0 ? '' : a[n % 10]);
  //   }

  //   return words.trim() + ' Rupees only';
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
