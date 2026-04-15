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

  taxComputation: any;
  taxSummary: any;
  isLoadingTax = false;

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
        this.isLoadingTax = false;
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
