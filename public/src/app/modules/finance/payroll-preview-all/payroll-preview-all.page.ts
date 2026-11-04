import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { PayrollApiService, PayrollPreviewResponse } from '../../../core/services/payroll-api.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-payroll-preview-all',
  templateUrl: './payroll-preview-all.page.html',
  styleUrls: ['./payroll-preview-all.page.scss'],
  standalone: false
})
export class PayrollPreviewAllPage implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  previewMonth: string = '';
  isPreviewing: boolean = false;
  previewData: PayrollPreviewResponse | null = null;
  fullDetailedPreview: any[] = [];
  
  previewPage = 1;
  previewLimit = 100; // Increased limit for virtual scroll
  canLoadMorePreview = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollApi: PayrollApiService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.previewMonth = params['month'] || this.payrollApi.getCurrentYearMonth();
      this.startPreview();
    });
  }

  goBack() {
    this.router.navigate(['/finance/process']);
  }

  startPreview() {
    const [year, month] = this.previewMonth.split('-').map(Number);
    this.isPreviewing = true;
    this.previewData  = null;
    this.fullDetailedPreview = [];
    this.previewPage = 1;
    this.canLoadMorePreview = true;

    this.loadPreviewData(year, month);
  }

  loadPreviewData(year: number, month: number, event?: any) {
    this.payrollApi.previewPayroll({ 
      year, 
      month, 
      page: this.previewPage, 
      limit: this.previewLimit 
    }).subscribe({
      next: (res) => {
        this.previewData = res;
        const newItems = res.data?.detailedPreview || [];
        this.fullDetailedPreview = [...this.fullDetailedPreview, ...newItems];
        
        this.isPreviewing = false;
        
        // Check if we can load more
        const pagination = (res as any).data?.pagination;
        if (pagination) {
          this.canLoadMorePreview = pagination.currentPage < pagination.pages;
        } else {
          this.canLoadMorePreview = false;
        }

        if (event) {
          event.target.complete();
        }
      },
      error: (err) => {
        this.isPreviewing = false;
        this.toaster.showError('Preview failed.');
        console.error(err);
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  loadMorePreview(event?: any) {
    if (!this.canLoadMorePreview || this.isPreviewing) {
      if (event && event.target) event.target.complete();
      return;
    }
    
    this.previewPage++;
    const [year, month] = this.previewMonth.split('-').map(Number);
    this.loadPreviewData(year, month, event);
  }

  // Handle virtual scroll index change to trigger load more
  onScrollIndexChange(index: any) {
    if (!this.viewport || !this.canLoadMorePreview || this.isPreviewing) return;

    const total = this.fullDetailedPreview.length;
    const end = this.viewport.getRenderedRange().end;

    // If we are within 10 items of the end, load more
    if (end > total - 10) {
      this.loadMorePreview();
    }
  }

  formatCurrency(val: any): string {
    const num = Number(val) || 0;
    return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getPreviewComponentHeaders(): string[] {
    const preview = this.fullDetailedPreview;
    if (!preview || preview.length === 0) return [];
    return (preview[0].components?.map((c: any) => c.name) || [])
      .filter((name: string) => !/pf|provident|esi/i.test(name));
  }

  getComponentAmount(emp: any, name: string): number {
    const comp = emp.components?.find((c: any) =>
      c.name?.toLowerCase() === name.toLowerCase() ||
      c.code?.toLowerCase() === name.toLowerCase()
    );
    return comp ? Number(comp.amount) || 0 : 0;
  }

  getEmployeePf(emp: any): number {
    if (emp.pf_employee !== undefined && emp.pf_employee !== null && emp.pf_employee !== 0) {
      return Number(emp.pf_employee);
    }
    const fromComp = this.getComponentAmount(emp, 'PF Employee Contribution') ||
                     this.getComponentAmount(emp, 'PF Employee') ||
                     this.getComponentAmount(emp, 'PF_DEDUCT') ||
                     this.getComponentAmount(emp, 'PF');
    if (fromComp) return Number(fromComp);
    return 0;
  }

  getEmployerPf(emp: any): number {
    if (emp.pf_employer !== undefined && emp.pf_employer !== null && emp.pf_employer !== 0) {
      return Number(emp.pf_employer);
    }
    const fromComp = this.getComponentAmount(emp, 'PF Employer Contribution') ||
                     this.getComponentAmount(emp, 'PF Employer') ||
                     this.getComponentAmount(emp, 'PF_ER') ||
                     this.getComponentAmount(emp, 'PF_DEDUCT_EMPLOYER');
    if (fromComp) return Number(fromComp);
    return this.getEmployeePf(emp);
  }

  getEmployeeEsi(emp: any): number {
    if (emp.esi_employee !== undefined && emp.esi_employee !== null && emp.esi_employee !== 0) {
      return Number(emp.esi_employee);
    }
    const fromComp = this.getComponentAmount(emp, 'ESI Employee Contribution') ||
                     this.getComponentAmount(emp, 'ESI Employee') ||
                     this.getComponentAmount(emp, 'ESI_EE') ||
                     this.getComponentAmount(emp, 'ESI');
    if (fromComp) return Number(fromComp);
    return 0;
  }

  getEmployerEsi(emp: any): number {
    if (emp.esi_employer !== undefined && emp.esi_employer !== null && emp.esi_employer !== 0) {
      return Number(emp.esi_employer);
    }
    const fromComp = this.getComponentAmount(emp, 'ESI Employer Contribution') ||
                     this.getComponentAmount(emp, 'ESI Employer') ||
                     this.getComponentAmount(emp, 'ESI_ER');
    if (fromComp) return Number(fromComp);
    const ee = this.getEmployeeEsi(emp);
    if (ee > 0) return Math.round(ee * (3.25 / 0.75));
    return 0;
  }

  trackByEmpId(index: number, item: any) {
    return item.employee_id;
  }
}
