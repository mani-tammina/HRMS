import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PayrollApiService } from '../../../../../core/services/payroll-api.service';
import { PayrollService } from '../../../../../core/services/payroll.service';
import { EmployeeService } from '../../../../../core/services/employee.service';

@Component({
  selector: 'app-taxation',
  templateUrl: './taxation.component.html',
  styleUrls: ['./taxation.component.scss'],
  standalone: false
})
export class TaxationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() financialYear: string = '';
  @Input() professionalTax: number = 0;
  @Input() employerPf: number = 0;

  taxComputation: any;
  taxSummary: any;
  isLoadingTax = false;
  currentContractCtc: number = 0;
  employerPfAnnual: number = 0;

  taxSlabs: any[] = [];
  taxBreakdown: any[] = [];
  rebate87A: number = 0;
  grossIncomeTax: number = 0;
  totalCess: number = 0;
  totalSurcharge: number = 0;
  netTaxPayable: number = 0;
  taxPaidTillNow: number = 0;
  remainingTax: number = 0;
  monthlyTaxValue: number = 0;

  standardDeductionsList: any[] = [];
  standardDeductionAmount: number = 0;

  // Monthly Breakdown Data
  fiscalMonths: any[] = [];
  breakupRows: any[] = [];
  totalRow: any = { name: 'Total Earnings', values: [], total: 0 };
  employerShareTotal: number = 0;
  isLoadingBreakup = false;

  constructor(
    private payrollApi: PayrollApiService,
    private payrollService: PayrollService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    if (!this.financialYear) {
      this.financialYear = this.payrollApi.getCurrentFinancialYear();
    }
    this.generateFiscalMonths();
    this.loadTaxData();
    this.loadMonthlyBreakup();
  }

  generateFiscalMonths() {
    const [startYear] = this.financialYear.split('-').map(Number);
    const months = [
      { name: 'APR', year: startYear },
      { name: 'MAY', year: startYear },
      { name: 'JUN', year: startYear },
      { name: 'JUL', year: startYear },
      { name: 'AUG', year: startYear },
      { name: 'SEP', year: startYear },
      { name: 'OCT', year: startYear },
      { name: 'NOV', year: startYear },
      { name: 'DEC', year: startYear },
      { name: 'JAN', year: startYear + 1 },
      { name: 'FEB', year: startYear + 1 },
      { name: 'MAR', year: startYear + 1 }
    ];

    const currentMonth = new Date().getMonth(); // 0-11
    const currentYear = new Date().getFullYear();

    this.fiscalMonths = months.map(m => {
      const monthIdx = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].indexOf(m.name);
      let status = 'PROJECTED'; // YELLOW

      // Check if it's past or current month
      if (m.year < currentYear || (m.year === currentYear && monthIdx < currentMonth)) {
        status = 'IMPORTED'; // GREY
      }

      return {
        ...m,
        label: `${m.name} ${String(m.year).slice(2)}`,
        status: status
      };
    });
  }

  loadMonthlyBreakup() {
    this.isLoadingBreakup = true;
    this.employeeService.getMyProfile().pipe(takeUntil(this.destroy$)).subscribe({
      next: (emp) => {
        if (!emp?.id) {
          this.isLoadingBreakup = false;
          return;
        }

        this.payrollService.listContracts({ employee_id: emp.id }).pipe(takeUntil(this.destroy$)).subscribe({
          next: (contracts: any[]) => {
            const activeContract = Array.isArray(contracts)
              ? contracts.find((c: any) => (c.status || '').toLowerCase() === 'active')
              : null;
            const latestContract = Array.isArray(contracts) && contracts.length > 0 ? contracts[0] : null;
            const selectedContract = activeContract || latestContract;
            if (selectedContract) {
              this.currentContractCtc = Number(selectedContract.annual_ctc || 0);
              if (this.taxComputation) {
                this.taxComputation.contract_ctc = this.currentContractCtc;
                this.taxComputation.gross_annual_income = Number(this.taxComputation.contract_ctc || this.taxComputation.gross_annual_income || 0);
              }
              this.payrollService.getTemplateComposition(selectedContract.template_id).pipe(takeUntil(this.destroy$)).subscribe({
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
                      this.calculateMonthlyGrid(selectedContract.annual_ctc, components);
                      this.isLoadingBreakup = false;
                    },
                    error: () => { this.isLoadingBreakup = false; }
                  });
                },
                error: () => { this.isLoadingBreakup = false; }
              });
            } else {
              this.isLoadingBreakup = false;
            }
          },
          error: () => { this.isLoadingBreakup = false; }
        });
      },
      error: () => { this.isLoadingBreakup = false; }
    });
  }

  private calculateMonthlyGrid(ctcAmount: number, components: any[]) {
    const ctc = Number(ctcAmount) || 0;
    const calculatedAmts: any = { 'CTC': ctc };
    const sortedComps = [...components].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

    const getValue = (c: any, visited: string[] = []): number => {
      const code = (c.code || '').toUpperCase();
      if (code && visited.includes(code)) return 0;
      const newVisited = code ? [...visited, code] : visited;

      if (c.calculation_type === 'FIXED') return Number(c.value) || 0;

      const rawInput = String(c.value || '0').trim();
      const isPct = c.calculation_type === 'PERCENTAGE' || rawInput.includes('%');

      if (isPct) {
        const pct = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
        if (isNaN(pct)) return 0;
        let pctOf = (c.percentage_of_code || c.base_code || c.base_component || '').toUpperCase();
        if ((!pctOf || pctOf === '-') && rawInput.toUpperCase().includes('OF ')) {
          const parts = rawInput.toUpperCase().split('OF ');
          pctOf = parts[parts.length - 1].trim();
        }
        if (pctOf === 'GROSS' || pctOf === code) pctOf = 'CTC';
        if (pctOf && pctOf !== 'CTC' && pctOf !== '-') {
          const baseComp = components.find(bc => (bc.code || '').toUpperCase() === pctOf || (bc.name || '').toUpperCase() === pctOf);
          if (baseComp) return (pct / 100) * getValue(baseComp, newVisited);
        }
        return (pct / 100) * ctc;
      }
      return Number(c.value) || 0;
    };

    sortedComps.forEach(c => { calculatedAmts[c.code] = getValue(c); });

    // Special Allowance Allocation logic (simplified from payslips.page.ts)
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
          const isER = codeUpper.includes('EMPLOYER') || nameUpper.includes('EMPLOYER') || codeUpper.includes('EMPLOYEER') || nameUpper.includes('EMPLOYEER') || codeUpper.includes('_ER');
          if (c.component_type?.toUpperCase() === 'EARNING' && !isER) sumOfEarnings += calculatedAmts[c.code] || 0;
          else if (isER || codeUpper.includes('PF_') || codeUpper.includes('ESI_')) sumOfEmployerPortions += calculatedAmts[c.code] || 0;
        }
      });
      calculatedAmts[specialAllowanceComp.code] = Math.max(0, ctc - sumOfEarnings - sumOfEmployerPortions);
    }

    // Build Rows
    this.breakupRows = [];
    this.totalRow = { name: 'Total Earnings', values: [], total: 0 };
    this.employerShareTotal = 0;

    sortedComps.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      const isER = code.includes('EMPLOYER') || name.includes('EMPLOYER') || code.includes('EMPLOYEER') || name.includes('EMPLOYEER') || code.includes('_ER');

      const isEarning = c.component_type?.toUpperCase() === 'EARNING';
      const isEmployerPF = isER && (code.includes('PF') || name.includes('PF') || name.includes('Provident'));

      if ((isEarning && !isER) || isEmployerPF) {
        const annualVal = Math.round(calculatedAmts[c.code] || 0);
        if (annualVal === 0 && !isEmployerPF) return; // Skip zero earnings, but keep PF placeholder if it's there

        const monthlyVal = Math.round(annualVal / 12);
        const row = {
          name: c.name,
          values: new Array(12).fill(monthlyVal),
          total: annualVal,
          isER: isER
        };

        this.breakupRows.push(row);

        if (isEmployerPF) {
          this.employerShareTotal += annualVal;
        }
      }
    });

    // Remove duplicates by name
    const uniqueMap = new Map();
    this.breakupRows.forEach(r => uniqueMap.set(r.name, r));
    this.breakupRows = Array.from(uniqueMap.values());

    // Calculate Column Totals
    let grandTotal = 0;
    for (let i = 0; i < 12; i++) {
      let colSum = 0;
      this.breakupRows.forEach(r => colSum += r.values[i]);
      this.totalRow.values.push(colSum);
      grandTotal += colSum;
    }
    this.totalRow.total = grandTotal;
    this.employerPfAnnual = this.employerShareTotal;
    if (!this.employerPf && this.employerPfAnnual > 0) {
      this.employerPf = this.employerPfAnnual;
    }
  }

  getEmployerPfValue(): number {
    return Math.max(0, Number(this.employerPf || this.employerPfAnnual || 0));
  }

  loadTaxData() {
    this.isLoadingTax = true;
    this.payrollApi.getTaxComputation(this.financialYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.taxComputation = res;
        if (this.taxComputation) {
          if (this.currentContractCtc > 0) {
            this.taxComputation.contract_ctc = this.currentContractCtc;
          }
          this.taxComputation.gross_annual_income = Number(this.taxComputation.contract_ctc || this.taxComputation.gross_annual_income || 0);
        }

        // Exclude Cess (4%) from calculation and total liability as requested
        if (this.taxComputation && this.taxComputation.cess) {
          this.taxComputation.total_tax_liability = (this.taxComputation.total_tax_liability || 0) - (this.taxComputation.cess || 0);
          this.taxComputation.cess = 0;
        }

        // Deduct items from taxable income explicitly on the frontend based on regime rules
        if (this.taxComputation && this.taxComputation.taxable_income) {
          // Employer PF is generally subtracted
          if (this.employerPf > 0) {
            this.taxComputation.taxable_income -= this.employerPf;
          }

          // Professional Tax is ONLY subtracted in OLD regime
          if (this.taxComputation.regime_type === 'OLD' && this.professionalTax > 0) {
            this.taxComputation.taxable_income -= this.professionalTax;
          }

          this.taxComputation.taxable_income = Math.max(0, this.taxComputation.taxable_income);
        }

        this.isLoadingTax = false;
        this.loadSlabsAndCalculate();
        this.updateStandardDeduction();
      },
      error: () => { this.isLoadingTax = false; }
    });

    this.payrollApi.getStandardDeductions(this.financialYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.standardDeductionsList = res.deductions || [];
        this.updateStandardDeduction();
      },
      error: () => { }
    });

    this.payrollApi.getMyTaxSummary(this.financialYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.taxSummary = res;
        this.taxPaidTillNow = res.tds_paid_ytd || 0;
        this.calculateBreakdown(); // Recalculate to update remaining tax
      },
      error: () => { }
    });
  }

  loadSlabsAndCalculate() {
    if (!this.taxComputation) return;

    this.payrollApi.getTaxSlabs(this.financialYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        const allSlabs = Array.isArray(res) ? res : (res.slabs || []);
        let filteredSlabs = allSlabs.filter((s: any) => s.regime_type === this.taxComputation.regime_type);

        // Deduplicate slabs in case the API returned duplicates
        const uniqueSlabsMap = new Map<string, any>();
        filteredSlabs.forEach((s: any) => {
          const key = `${s.min_income}-${s.max_income}`;
          uniqueSlabsMap.set(key, s);
        });
        filteredSlabs = Array.from(uniqueSlabsMap.values());

        this.taxSlabs = filteredSlabs;

        if (this.taxSlabs.length === 0) {
          this.taxSlabs = this.getFallbackSlabs(this.taxComputation.regime_type);
        }

        this.calculateBreakdown();
      },
      error: () => {
        this.taxSlabs = this.getFallbackSlabs(this.taxComputation.regime_type);
        this.calculateBreakdown();
      }
    });
  }

  getFallbackSlabs(regime: string) {
    if (regime === 'NEW') {
      return [
        { min_income: 0, max_income: 400000, rate: 0, cess_rate: 4 },
        { min_income: 400000, max_income: 800000, rate: 5, cess_rate: 4 },
        { min_income: 800000, max_income: 1200000, rate: 10, cess_rate: 4 },
        { min_income: 1200000, max_income: 1600000, rate: 15, cess_rate: 4 },
        { min_income: 1600000, max_income: 2000000, rate: 20, cess_rate: 4 },
        { min_income: 2000000, max_income: 2400000, rate: 25, cess_rate: 4 },
        { min_income: 2400000, max_income: 999999999, rate: 30, cess_rate: 4 }
      ];
    } else {
      return [
        { min_income: 0, max_income: 250000, rate: 0, cess_rate: 4 },
        { min_income: 250000, max_income: 500000, rate: 5, cess_rate: 4 },
        { min_income: 500000, max_income: 1000000, rate: 20, cess_rate: 4 },
        { min_income: 1000000, max_income: 999999999, rate: 30, cess_rate: 4 }
      ];
    }
  }

  calculateBreakdown() {
    // The user explicitly requested to base the tax calculation on the Taxable Income from All Heads for the Net Taxable Income
    const taxableIncome = this.getTaxableIncomeFromAllHeads();
    this.taxBreakdown = [];
    let totalTax = 0;

    this.taxSlabs.sort((a: any, b: any) => a.min_income - b.min_income).forEach(slab => {
      const min = Number(slab.min_income);
      const max = Number(slab.max_income);
      const rate = Number(slab.rate);
      const cess = Number(slab.cess_rate || 0);

      let taxableInSlab = 0;
      if (taxableIncome > min) {
        taxableInSlab = Math.min(taxableIncome, max) - min;
      }

      const taxAmount = (taxableInSlab * rate) / 100;
      totalTax += taxAmount;

      this.taxBreakdown.push({
        label: rate === 0 ? `0% Tax on income up to ${max}` : `${rate}% Tax on income between ${min + 1} and ${max > 10000000 ? 'above' : max}`,
        taxAmount: taxAmount,
        min,
        max,
        rate,
        cess
      });
    });

    const rebateLimit = this.taxComputation.regime_type === 'NEW' ? 1200000 : 500000;
    if (taxableIncome <= rebateLimit) {
      this.rebate87A = totalTax;
    } else {
      this.rebate87A = 0;
    }

    this.grossIncomeTax = Math.max(0, totalTax - this.rebate87A);

    // Calculate Surcharge & Cess
    this.totalSurcharge = this.taxComputation?.surcharge || 0;
    this.totalCess = Math.round((this.grossIncomeTax + this.totalSurcharge) * 0.04);
    this.netTaxPayable = Math.round(this.grossIncomeTax + this.totalSurcharge + this.totalCess);

    // Calculate Remaining Tax
    this.remainingTax = Math.max(0, this.netTaxPayable - this.taxPaidTillNow);
    this.monthlyTaxValue = Math.round(this.remainingTax / 12);

    // Sync with the top summary card
    if (this.taxComputation) {
      this.taxComputation.gross_income_tax_final = this.grossIncomeTax;
      this.taxComputation.total_surcharge_cess = this.totalSurcharge + this.totalCess;
      this.taxComputation.net_tax_payable = this.netTaxPayable;
      this.taxComputation.tax_paid_till_now = this.taxPaidTillNow;
      this.taxComputation.remaining_tax = this.remainingTax;

      // PROJECTED TAX (FY) should be the final net payable
      this.taxComputation.total_tax_liability = this.netTaxPayable;
      this.taxComputation.monthly_tds = Math.round(this.remainingTax / 12);
    }
  }

  getGrossEarnings(): number {
    if (!this.taxComputation) return 0;
    const grossIncome = Number(this.currentContractCtc || this.taxComputation.contract_ctc || this.taxComputation.gross_annual_income || 0);
    return Math.max(0, grossIncome - this.getEmployerPfValue());
  }

  updateStandardDeduction() {
    if (this.taxComputation && this.standardDeductionsList.length > 0) {
      const regime = this.taxComputation.regime_type || 'NEW';
      const match = this.standardDeductionsList.find((d: any) => d.regime_type === regime);
      if (match) {
        this.standardDeductionAmount = Number(match.amount);
        this.taxComputation.standard_deduction = this.standardDeductionAmount;
      }
    }
  }

  getTaxableIncomeFromAllHeads(): number {
    if (!this.taxComputation) return 0;
    let val = this.getGrossEarnings();
    const stdDeduction = this.taxComputation.standard_deduction || this.standardDeductionAmount || 0;
    if (stdDeduction > 0) {
      val -= stdDeduction;
    }
    if (this.taxComputation.regime_type === 'OLD' && this.professionalTax > 0) {
      val -= this.professionalTax;
    }
    return Math.max(0, val);
  }

  formatCurrency(val: number): string {
    return (val || 0).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
  }

  getProgressBarColor(pct: number): string {
    if (pct > 80) return '#ef4444';
    if (pct > 50) return '#f59e0b';
    return '#10b981';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
