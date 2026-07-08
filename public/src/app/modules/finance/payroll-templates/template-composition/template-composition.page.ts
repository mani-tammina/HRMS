import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PayrollService } from '../../../../core/services/payroll-service.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-template-composition',
  templateUrl: './template-composition.page.html',
  styleUrls: ['./template-composition.page.scss'],
  standalone: false
})
export class TemplateCompositionPage implements OnInit {
  templateId: number | null = null;
  templateInfo: any = null;
  compositionData: any[] = [];
  loading: boolean = false;
  totalEarnings: number = 0;
  totalDeductions: number = 0;
  sampleCTC: number = 800000;

  isModalOpen = false;
  isEditMode = false;
  selectedCompositionId: number | null = null;
  compositionForm!: FormGroup;
  availableComponents: any[] = [];
  employees: any[] = [];
  filteredEmployees: any[] = [];
  employeeSearchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private payrollService: PayrollService,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toaster: ToasterService
  ) { }

  trackById(index: number, item: any) {
    return item.composition_id || item.component_id || index;
  }

  ngOnInit() {
    this.initForm();
    this.fetchEmployees();
    this.fetchAvailableComponents();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.templateId = +id;
        this.fetchTemplateDetails();
        this.fetchComposition();
      }
    });
  }

  initForm() {
    this.compositionForm = this.fb.group({
      component_id: [null, Validators.required],
      formula_or_value: ['', Validators.required],
      created_by: [Number(localStorage.getItem('employee_id')) || 1, Validators.required]
    });
  }

  fetchEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        const data = Array.isArray(res) ? res : (res.data || []);
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: () => {
        this.employees = [];
        this.filteredEmployees = [];
        this.toaster.showError('Could not load employees');
      }
    });
  }

  filterEmployees(event: any) {
    const term = event.target.value.toLowerCase();
    this.employeeSearchTerm = term;
    if (!term) {
      this.filteredEmployees = this.employees;
      return;
    }
    this.filteredEmployees = this.employees.filter(emp =>
      emp.FullName?.toLowerCase().includes(term) ||
      emp.EmployeeNumber?.toLowerCase().includes(term)
    );
  }

  selectEmployee(emp: any) {
    this.compositionForm.patchValue({ created_by: emp.id });
    this.employeeSearchTerm = emp.FullName;
    this.filteredEmployees = []; // Hide list after selection
  }

  fetchAvailableComponents() {
    this.payrollService.getPayrollComponents().subscribe({
      next: (res: any) => {
        this.availableComponents = Array.isArray(res) ? res : (res.data || []);
      },
      error: () => this.toaster.showError('Could not load components')
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedCompositionId = null;
    this.isModalOpen = true;
    this.employeeSearchTerm = '';
    this.filteredEmployees = this.employees;
    this.compositionForm.reset({
      component_id: null,
      formula_or_value: '',
      created_by: Number(localStorage.getItem('employee_id')) || 1
    });
  }

  editComposition(comp: any) {
    this.isEditMode = true;
    this.selectedCompositionId = comp.composition_id;
    this.isModalOpen = true;

    // Set search term for employee
    const employeesList = Array.isArray(this.employees) ? this.employees : [];
    const creator = employeesList.find(e => Number(e.id) === Number(comp.created_by));
    this.employeeSearchTerm = creator ? (creator.FullName || creator.name) : `User #${comp.created_by}`;
    this.filteredEmployees = [];

    this.compositionForm.patchValue({
      component_id: comp.master_component_id || comp.component_id,
      formula_or_value: comp.formula_or_value,
      created_by: comp.created_by
    });
  }

  deleteComposition(compositionId: number) {
    if (!this.templateId) return;
    if (confirm('Are you sure you want to remove this component from the template?')) {
      this.payrollService.deleteTemplateComposition(this.templateId, compositionId).subscribe({
        next: () => {
          this.toaster.showSuccess('Component removed from template');
          this.fetchComposition();
        },
        error: (err) => {
          console.error('Error deleting composition:', err);
          this.toaster.showError('Failed to remove component');
        }
      });
    }
  }

  saveComposition() {
    if (this.compositionForm.invalid || !this.templateId) return;

    const payload = {
      formula_or_value: this.compositionForm.value.formula_or_value.toString(),
      master_component_id: Number(this.compositionForm.value.component_id),
      created_by: Number(this.compositionForm.value.created_by)
    };

    if (this.isEditMode && this.selectedCompositionId) {
      this.payrollService.updateTemplateComposition(this.templateId, this.selectedCompositionId, payload).subscribe({
        next: () => {
          this.toaster.showSuccess('Composition updated');
          this.isModalOpen = false;
          this.fetchComposition();
        },
        error: (err) => {
          console.error('Error updating component in template:', err);
          this.toaster.showError('Failed to update composition');
        }
      });
    } else {
      this.payrollService.addComponentToTemplate(this.templateId, payload).subscribe({
        next: () => {
          this.toaster.showSuccess('Component added to template');
          this.isModalOpen = false;
          this.fetchComposition();
        },
        error: (err) => {
          console.error('Error adding component to template:', err);
          this.toaster.showError('Failed to add component');
        }
      });
    }
  }

  fetchTemplateDetails() {
    if (!this.templateId) return;
    this.payrollService.getTemplateById(this.templateId).subscribe({
      next: (res: any) => {
        this.templateInfo = res.data || res;
      },
      error: (err) => console.error('Error fetching template details:', err)
    });
  }

  fetchComposition() {
    if (!this.templateId) return;
    this.loading = true;

    this.payrollService.getTemplateComposition(this.templateId).subscribe({
      next: (res: any) => {
        const rawComposition = Array.isArray(res) ? res : (res.data || []);
        console.log('Raw Composition Data:', rawComposition);

        if (rawComposition.length === 0) {
          this.compositionData = [];
          this.totalEarnings = 0;
          this.totalDeductions = 0;
          this.loading = false;
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
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Error fetching component details:', err);
            this.compositionData = rawComposition;
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching composition:', err);
        this.loading = false;
      }
    });
  }

  calculateTotals() {
    // 1. First Pass: Calculate all fixed and percentage components
    const calculatedAmts: { [code: string]: number } = { 'CTC': this.sampleCTC };
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
      
      const balance = Math.max(0, this.sampleCTC - sumOfEarnings - sumOfEmployerPortions);
      // Update the component in the list so the UI reflects the balanced amount
      specialAllowanceComp.formula_or_value = balance.toString();
    }

    this.totalEarnings = this.compositionData
      .filter(c => (c.component_type)?.toUpperCase() === 'EARNING')
      .reduce((sum, c) => sum + this.getCalculatedAmount(c), 0);

    this.totalDeductions = this.compositionData
      .filter(c => (c.component_type)?.toUpperCase() === 'DEDUCTION')
      .reduce((sum, c) => sum + this.getCalculatedAmount(c), 0);
  }

  /** Resolve formula_or_value to an actual rupee amount based on sampleCTC or base comp */
  getCalculatedAmount(comp: any, visited: string[] = []): number {
    const code = comp.component_code;
    if (code && visited.includes(code)) return 0; // Prevent circular dependencies
    const newVisited = code ? [...visited, code] : visited;

    const rawInput = String(comp.formula_or_value || comp.value || '0').trim();
    const calcType = (comp.calculation_type || '').toUpperCase();
    const isPct = calcType === 'PERCENTAGE' || rawInput.includes('%');

    if (isPct) {
      // Strip non-numeric chars for percentage lookup
      const pct = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
      if (isNaN(pct)) return 0;

      // Ensure percentage_of_code is considered
      let pctOf = (comp.percentage_of_code || '').toUpperCase();
      
      // Fallback if pctOf is not set but formula uses a code (e.g. "40% of BASIC")
      if ((!pctOf || pctOf === '-') && rawInput.toUpperCase().includes('OF ')) {
        const parts = rawInput.toUpperCase().split('OF ');
        pctOf = parts[parts.length - 1].trim();
      }

      // If pctOf is GROSS, treat as CTC
      if (pctOf === 'GROSS') pctOf = 'CTC';

      // If it's a percentage of itself (common error for Basic), fallback to CTC
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

      return (pct / 100) * this.sampleCTC;
    }

    // FIXED or unknown — return raw numeric value
    const fixed = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
    return isNaN(fixed) ? 0 : fixed;
  }

  getCalculationLabel(comp: any): string {
    const raw = String(comp.formula_or_value || comp.value || '0').trim();
    const isPct = comp.calculation_type === 'PERCENTAGE' || raw.includes('%');
    if (isPct) {
      const pct = parseFloat(raw.replace(/[^0-9.]/g, ''));
      let pctOf = (comp.percentage_of_code || '').toUpperCase();
      if ((!pctOf || pctOf === '-') && raw.toUpperCase().includes('OF ')) {
        const parts = raw.toUpperCase().split('OF ');
        pctOf = parts[parts.length - 1].trim();
      }

      const code = (comp.component_code || '').toUpperCase();
      if (pctOf === 'GROSS' || pctOf === code) pctOf = 'CTC';

      return `${isNaN(pct) ? 0 : pct}% of ${pctOf && pctOf !== 'CTC' && pctOf !== '-' ? pctOf : 'Gross'}`;
    }
    return 'Fixed Amount';
  }

  onSampleCTCChange(event: any) {
    const val = parseFloat(event.target.value);
    if (!isNaN(val) && val > 0) {
      this.sampleCTC = val;
      this.calculateTotals();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.selectedCompositionId = null;
    this.employeeSearchTerm = '';
    this.filteredEmployees = [];
  }
}
