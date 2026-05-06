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
    return preview[0].components?.map((c: any) => c.name) || [];
  }

  getComponentAmount(emp: any, name: string): number {
    const comp = emp.components?.find((c: any) => c.name === name);
    return comp ? comp.amount : 0;
  }

  trackByEmpId(index: number, item: any) {
    return item.employee_id;
  }
}
