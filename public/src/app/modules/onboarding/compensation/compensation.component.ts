import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CreateOfferHeaderComponent } from '../create-offer-header/create-offer-header.component';
import { OnboardingMainheaderComponent } from '../onboarding-mainheader/onboarding-mainheader.component';
import { CoreModule } from 'src/app/core/core.module';
import { PayrollService } from 'src/app/core/services/payroll-service.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CoreModule,
    OnboardingMainheaderComponent,
    CreateOfferHeaderComponent, FormsModule]
})
export class CompensationComponent implements OnInit {
  candidate: any = {};
  id: string | null = null;

  // Compensation Template and Calculator Properties
  templates: any[] = [];
  selectedTemplateId: number | null = null;
  annualSalary: number = 600000;
  eligiblePF: boolean = true;
  eligibleESI: boolean = true;
  selectedPayGroup: string = 'default';
  selectedRemunerationType: string = 'annual';
  compositionData: any[] = [];
  totalEarnings: number = 0;
  totalDeductions: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private payrollService: PayrollService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // Get candidate object from router state
    const nav = this.router.getCurrentNavigation();
    this.candidate = nav?.extras.state?.['candidate'] || null;

    if (this.candidate && this.candidate.id) {
      this.initForm();
      this.fetchTemplates();
    } else if (this.id) {
      this.candidateService.getCandidateById(Number(this.id)).subscribe({
        next: (data: any) => {
          this.candidate = data.candidate || data;
          this.initForm();
          this.fetchTemplates();
        },
        error: (err: any) => console.error('Failed to load candidate by ID:', err)
      });
    } else {
      this.candidate = {};
      this.initForm();
      this.fetchTemplates();
    }
  }

  initForm() {
    if (!this.candidate) this.candidate = {};

    // Load initial values from candidate
    if (this.candidate.offered_ctc) {
      this.annualSalary = Number(this.candidate.offered_ctc);
    }
    if (this.candidate.eligible_pf !== undefined) {
      this.eligiblePF = this.candidate.eligible_pf === 1 || this.candidate.eligible_pf === true;
    }
    if (this.candidate.eligible_esi !== undefined) {
      this.eligibleESI = this.candidate.eligible_esi === 1 || this.candidate.eligible_esi === true;
    }
    if (this.candidate.pay_group) {
      this.selectedPayGroup = this.candidate.pay_group;
    }
    if (this.candidate.remuneration_type) {
      this.selectedRemunerationType = this.candidate.remuneration_type;
    }
    if (this.candidate.payroll_template_id) {
      this.selectedTemplateId = Number(this.candidate.payroll_template_id);
    }

  }

  saveCompensation() {
    if (!this.annualSalary || this.annualSalary <= 0) {
      alert('Please enter a valid Annual Salary before continuing.');
      return;
    }

    // Stamp all compensation fields onto the candidate object
    this.candidate.offered_ctc = this.annualSalary;
    this.candidate.eligible_pf = this.eligiblePF ? 1 : 0;
    this.candidate.eligible_esi = this.eligibleESI ? 1 : 0;
    this.candidate.pay_group = this.selectedPayGroup;
    this.candidate.remuneration_type = this.selectedRemunerationType;
    this.candidate.payroll_template_id = this.selectedTemplateId;
    this.candidate.salary_breakup = JSON.stringify(
      this.compositionData.map(c => ({
        component_id: c.component_id || c.master_component_id,
        component_name: c.component_name,
        component_code: c.component_code,
        component_type: c.component_type,
        formula_or_value: c.formula_or_value,
        calculated_amount: this.getCalculatedAmount(c)
      }))
    );

    // Persist to server then navigate forward
    this.candidateService.updateCandidate(this.candidate.id, this.candidate).subscribe({
      next: () => {
        console.log('Compensation saved for candidate:', this.candidate.id);
        this.router.navigate(
          ['/onboarding/OfferDetailsComponent',
            this.candidate.id,
            encodeURIComponent(this.candidate.personalDetails?.FirstName || '')],
          { state: { candidate: this.candidate } }
        );
      },
      error: (err: any) => {
        console.error('Error saving compensation:', err);
        alert('Failed to save compensation. Please try again.');
      }
    });
  }


  fetchTemplates() {
    this.payrollService.getPayrollTempletes().subscribe({
      next: (res: any) => {
        this.templates = Array.isArray(res) ? res : (res.data || []);
        if (this.templates.length > 0) {
          // If candidate already has template ID, use it. Otherwise, use the first template.
          if (this.selectedTemplateId) {
            const exists = this.templates.some(t => Number(t.template_id || t.id) === this.selectedTemplateId);
            if (exists) {
              this.loadTemplateComposition(this.selectedTemplateId);
              return;
            }
          }
          const firstTemplateId = this.templates[0].template_id || this.templates[0].id;
          this.selectedTemplateId = Number(firstTemplateId);
          this.loadTemplateComposition(this.selectedTemplateId);
        }
      },
      error: (err) => console.error('Failed to load payroll templates:', err)
    });
  }

  loadTemplateComposition(templateId: number) {
    this.payrollService.getTemplateComposition(templateId).subscribe({
      next: (res: any) => {
        const rawComposition = Array.isArray(res) ? res : (res.data || []);
        if (rawComposition.length === 0) {
          this.compositionData = [];
          this.calculateTotals();
          return;
        }

        const componentRequests = rawComposition.map((item: any) => {
          const id = item.master_component_id || item.component_id;
          return this.payrollService.getComponentById(id).pipe(
            catchError(() => of(null))
          );
        });

        forkJoin<any[]>(componentRequests).subscribe({
          next: (componentResults: any[]) => {
            this.compositionData = rawComposition.map((item: any, index: number) => {
              const component = componentResults[index];
              const compData = Array.isArray(component) ? component[0] : (component?.data || component);
              return {
                ...item,
                component_name: compData?.name || compData?.component_name || `Component #${item.component_id}`,
                component_code: compData?.code || compData?.component_code || '-',
                component_type: compData?.type || compData?.component_type || '-',
                calculation_type: compData?.calculation_type || '-',
                percentage_of_code: compData?.percentage_of_code || compData?.base_code || null,
                value: item.formula_or_value || compData?.value || 0,
                is_taxable: compData?.taxable ?? compData?.is_taxable ?? false,
                is_prorated: compData?.prorated ?? compData?.is_prorated ?? false,
                sequence: compData?.sequence || 0,
                notes: compData?.notes || ''
              };
            });

            this.calculateTotals();
          },
          error: (err: any) => {
            console.error('Error fetching component details for composition:', err);
            this.compositionData = rawComposition;
            this.calculateTotals();
          }
        });
      },
      error: (err) => console.error('Failed to load composition:', err)
    });
  }

  calculateTotals() {
    if (!this.compositionData || this.compositionData.length === 0) {
      this.totalEarnings = 0;
      this.totalDeductions = 0;
      return;
    }

    // 1. First Pass: Calculate all fixed and percentage components
    const calculatedAmts: { [code: string]: number } = { 'CTC': this.annualSalary };
    this.compositionData.forEach(c => {
      calculatedAmts[c.component_code] = this.getCalculatedAmount(c);
    });

    // 2. Second Pass: Resolve Special Allowance as balancing figure if it exists
    const isSA = (code: string, name: string) => {
      const c = (code || '').toUpperCase();
      const n = (name || '').toUpperCase();
      return c === 'SPECIAL_ALLOWANCE' || c === 'SA' || n.includes('SPECIAL ALLOWANCE');
    };
    
    const specialAllowanceComp = this.compositionData.find(c => isSA(c.component_code, c.component_name));
    if (specialAllowanceComp) {
      let sumOfEarnings = 0;
      let sumOfEmployerPortions = 0;

      this.compositionData.forEach(c => {
        if (c !== specialAllowanceComp) {
          const codeUpper = (c.component_code || '').toUpperCase();
          const nameUpper = (c.component_name || '').toUpperCase();
          const isER = codeUpper.includes('EMPLOYER') || nameUpper.includes('EMPLOYER') || codeUpper.includes('_ER') || nameUpper.includes('_ER');

          if (c.component_type?.toUpperCase() === 'EARNING') {
            sumOfEarnings += calculatedAmts[c.component_code] || 0;
          } else if (isER || codeUpper.includes('PF_') || nameUpper.includes('PF_') || codeUpper.includes('ESI_') || nameUpper.includes('ESI_')) {
            sumOfEmployerPortions += calculatedAmts[c.component_code] || 0;
          }
        }
      });
      
      const balance = Math.max(0, this.annualSalary - sumOfEarnings - sumOfEmployerPortions);
      // Update the component in the list so the UI reflects the balanced amount
      specialAllowanceComp.formula_or_value = balance.toString();
      calculatedAmts[specialAllowanceComp.component_code] = balance;
    }

    this.totalEarnings = this.compositionData
      .filter(c => (c.component_type)?.toUpperCase() === 'EARNING')
      .reduce((sum, c) => sum + this.getCalculatedAmount(c), 0);

    this.totalDeductions = this.compositionData
      .filter(c => (c.component_type)?.toUpperCase() === 'DEDUCTION')
      .reduce((sum, c) => sum + this.getCalculatedAmount(c), 0);
  }

  getCalculatedAmount(comp: any, visited: string[] = []): number {
    const code = comp.component_code;
    if (code && visited.includes(code)) return 0; // Prevent circular dependencies
    const newVisited = code ? [...visited, code] : visited;

    // Filter by PF/ESI eligibility
    if (!this.eligiblePF && this.isPFComponent(comp)) {
      return 0;
    }
    if (!this.eligibleESI && this.isESIComponent(comp)) {
      return 0;
    }

    const rawInput = String(comp.formula_or_value || comp.value || '0').trim();
    const calcType = (comp.calculation_type || '').toUpperCase();
    const isPct = calcType === 'PERCENTAGE' || rawInput.includes('%');

    if (isPct) {
      const pct = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
      if (isNaN(pct)) return 0;

      let pctOf = (comp.percentage_of_code || '').toUpperCase();
      
      if ((!pctOf || pctOf === '-') && rawInput.toUpperCase().includes('OF ')) {
        const parts = rawInput.toUpperCase().split('OF ');
        pctOf = parts[parts.length - 1].trim();
      }

      if (pctOf === 'GROSS') pctOf = 'CTC';
      if (pctOf === code?.toUpperCase()) pctOf = 'CTC';

      if (pctOf && pctOf !== 'CTC' && pctOf !== '-') {
        const baseComp = this.compositionData.find(c => {
          const cCode = (c.component_code || '').toUpperCase();
          const cName = (c.component_name || '').toUpperCase();
          const target = pctOf.toUpperCase();
          return cCode === target || 
                 cName === target ||
                 cCode === target.replace(/\s/g, '_') ||
                 target === cCode.replace(/\s/g, '_');
        });
        if (baseComp) {
          return (pct / 100) * this.getCalculatedAmount(baseComp, newVisited);
        }
      }

      return (pct / 100) * this.annualSalary;
    }

    const fixed = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
    return isNaN(fixed) ? 0 : fixed;
  }

  isPFComponent(comp: any): boolean {
    const code = (comp.component_code || '').toUpperCase();
    const name = (comp.component_name || '').toUpperCase();
    return code.includes('PF') || name.includes('PF') || name.includes('PROVIDENT');
  }

  isESIComponent(comp: any): boolean {
    const code = (comp.component_code || '').toUpperCase();
    const name = (comp.component_name || '').toUpperCase();
    return code.includes('ESI');
  }

  isEmployerContribution(comp: any): boolean {
    const codeUpper = (comp.component_code || '').toUpperCase();
    const nameUpper = (comp.component_name || '').toUpperCase();
    return codeUpper.includes('EMPLOYER') || nameUpper.includes('EMPLOYER') || codeUpper.includes('_ER') || nameUpper.includes('_ER');
  }

  getEarnings(): any[] {
    return this.compositionData.filter(c => c.component_type?.toUpperCase() === 'EARNING');
  }

  getEmployerContributions(): any[] {
    return this.compositionData.filter(c => this.isEmployerContribution(c));
  }

  getDeductions(): any[] {
    return this.compositionData.filter(c => c.component_type?.toUpperCase() === 'DEDUCTION');
  }

  onTemplateChange(event: any) {
    const tempId = event.detail.value;
    if (tempId) {
      this.selectedTemplateId = Number(tempId);
      this.loadTemplateComposition(this.selectedTemplateId);
    }
  }

  onAnnualSalaryChange(event: any) {
    const val = parseFloat(event.target.value);
    if (!isNaN(val) && val > 0) {
      this.annualSalary = val;
      this.calculateTotals();
    }
  }

  onPFChange(event: any) {
    this.eligiblePF = event.detail.checked;
    this.calculateTotals();
  }

  onESIChange(event: any) {
    this.eligibleESI = event.detail.checked;
    this.calculateTotals();
  }
}
