import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PayrollApiService } from '../../../../../core/services/payroll-api.service';

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
  
  taxSlabs: any[] = [];
  taxBreakdown: any[] = [];
  rebate87A: number = 0;
  grossIncomeTax: number = 0;

  constructor(private payrollApi: PayrollApiService) {}

  ngOnInit() {
    if (!this.financialYear) {
      this.financialYear = this.payrollApi.getCurrentFinancialYear();
    }
    this.loadTaxData();
  }

  loadTaxData() {
    this.isLoadingTax = true;
    this.payrollApi.getTaxComputation(this.financialYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.taxComputation = res;
        
        // Exclude Cess (4%) from calculation and total liability as requested
        if (this.taxComputation && this.taxComputation.cess) {
          this.taxComputation.total_tax_liability = (this.taxComputation.total_tax_liability || 0) - (this.taxComputation.cess || 0);
          this.taxComputation.cess = 0;
        }

        // Deduct employer PF from taxable income explicitly on the frontend
        if (this.employerPf > 0 && this.taxComputation && this.taxComputation.taxable_income) {
          this.taxComputation.taxable_income = Math.max(0, this.taxComputation.taxable_income - this.employerPf);
        }

        this.isLoadingTax = false;
        this.loadSlabsAndCalculate();
      },
      error: () => { this.isLoadingTax = false; }
    });

    this.payrollApi.getMyTaxSummary(this.financialYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.taxSummary = res;
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
        { min_income: 800000, max_income: 1200000, rate: 10, cess_rate: 4  },
        { min_income: 1200000, max_income: 1600000, rate: 15, cess_rate: 4  },
        { min_income: 1600000, max_income: 2000000, rate: 20, cess_rate: 4  },
        { min_income: 2000000, max_income: 2400000, rate: 25, cess_rate: 4  },
        { min_income: 2400000, max_income: 999999999, rate: 30, cess_rate: 4  }
      ];
    } else {
      return [
        { min_income: 0, max_income: 250000, rate: 0, cess_rate: 4  },
        { min_income: 250000, max_income: 500000, rate: 5, cess_rate: 4  },
        { min_income: 500000, max_income: 1000000, rate: 20, cess_rate: 4  },
        { min_income: 1000000, max_income: 999999999, rate: 30, cess_rate: 4  }
      ];
    }
  }

  calculateBreakdown() {
    const taxableIncome = this.taxComputation.taxable_income || 0;
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
