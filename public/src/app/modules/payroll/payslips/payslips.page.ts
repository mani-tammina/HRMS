import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { EmployeeService } from '../../../core/services/employee.service';
import { PayrollService } from '../../../core/services/payroll.service';

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

  constructor(
    private employeeService: EmployeeService,
    private payrollService: PayrollService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadData();
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
              loader.dismiss();
              this.loading = false;
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

    // Pass 1: Handle FIXED values and PERCENTAGE OF CTC
    sortedComps.forEach(c => {
      if (c.calculation_type === 'FIXED') {
        calculatedAmts[c.code] = Number(c.value) || 0;
      } else if (c.calculation_type === 'PERCENTAGE' && (c.percentage_of_code === 'CTC' || !c.percentage_of_code)) {
        calculatedAmts[c.code] = (ctc * (Number(c.value) || 0)) / 100;
      }
    });

    // Pass 2: Handle PERCENTAGE OF other components (like HRA based on BASIC)
    sortedComps.forEach(c => {
      if (c.calculation_type === 'PERCENTAGE' && c.percentage_of_code && c.percentage_of_code !== 'CTC') {
        const baseAmt = calculatedAmts[c.percentage_of_code] || 0;
        calculatedAmts[c.code] = (baseAmt * (Number(c.value) || 0)) / 100;
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
          const isER = codeUpper.includes('EMPLOYER') || nameUpper.includes('EMPLOYER');

          if (c.component_type?.toUpperCase() === 'EARNING') {
            sumOfEarnings += calculatedAmts[c.code] || 0;
          } else if (isER || codeUpper.includes('PF_EMPLOYER') || nameUpper.includes('PF_EMPLOYER')) {
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
      const isER = code.includes('EMPLOYER') || code.includes('ER');
      if (isER) return;

      const monthlyAmt = Math.round((calculatedAmts[c.code] || 0) / 12);
      const compObj = { name: c.name, actual: monthlyAmt, paid: monthlyAmt };

      if (c.component_type?.toUpperCase() === 'EARNING') {
        this.earnings.push(compObj);
        this.totalEarnings += monthlyAmt;
      } else if (code.includes('PF') || code.includes('ESI')) {
        this.contributions.push(compObj);
        console.log(this.contributions);
        this.totalContributions += monthlyAmt;
      } else {
        this.taxes.push(compObj);
        this.totalTaxes += monthlyAmt;
      }
    });

    this.totalDeductions = this.totalContributions + this.totalTaxes;
    this.netSalary = this.totalEarnings - this.totalDeductions;
    this.netSalaryInWords = this.toWords(this.netSalary);
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
