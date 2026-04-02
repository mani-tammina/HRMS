import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PayrollService } from '../../../../core/services/payroll-service.service';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-structure-composition',
  templateUrl: './structure-composition.page.html',
  styleUrls: ['./structure-composition.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class StructureCompositionPage implements OnInit {
  structureId: number | null = null;
  structureInfo: any = null;
  compositionData: any[] = [];
  loading: boolean = false;
  totalEarnings: number = 0;
  totalDeductions: number = 0;
  viewMode: 'annual' | 'monthly' = 'annual';

  isModalOpen = false;
  isEditMode = false;
  selectedComponentId: number | null = null;
  compositionForm!: FormGroup;
  availableComponents: any[] = [];
  employees: any;
  filteredEmployees: any[] = [];
  employeeSearchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private payrollService: PayrollService,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.initForm();
    this.fetchEmployees();
    this.fetchAvailableComponents();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.structureId = +id;
        this.fetchStructureDetails();
      }
    });
  }

  initForm() {
    this.compositionForm = this.fb.group({
      component_id: [null], // Only required for Add mode
      formula_or_value: ['', Validators.required],

      // Full Component Fields (for Edit mode)
      code: ['', Validators.required],
      name: ['', Validators.required],
      component_type: ['EARNING', Validators.required],
      calculation_type: ['FIXED', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      percentage_of_code: ['BASIC'],
      taxable: [true],
      prorated: [false],
      sequence: [10, Validators.required],
      notes: [''],
      created_by: [Number(localStorage.getItem('employee_id')) || 1, Validators.required]
    });
  }

  fetchEmployees() {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.employees = res;
      this.filteredEmployees = res;
    });
  }

  filterEmployees(event: any) {
    const term = event.target.value.toLowerCase();
    this.employeeSearchTerm = term;
    if (!term) {
      this.filteredEmployees = this.employees;
      return;
    }
    this.filteredEmployees = Array.isArray(this.employees) ? this.employees.filter((emp: any) =>
      emp.FullName?.toLowerCase().includes(term) ||
      emp.EmployeeNumber?.toLowerCase().includes(term)
    ) : [];
  }

  selectEmployee(emp: any) {
    this.compositionForm.patchValue({ created_by: emp.id });
    this.employeeSearchTerm = emp.FullName || (emp.FirstName + ' ' + emp.LastName);
    this.filteredEmployees = [];
  }

  fetchAvailableComponents() {
    this.payrollService.getPayrollComponents().subscribe((res: any) => {
      const allComps = Array.isArray(res) ? res : (res.data || []);
      const uniqueComps: any[] = [];
      const codes = new Set();
      allComps.forEach((c: any) => {
        if (!codes.has(c.code)) {
          codes.add(c.code);
          uniqueComps.push(c);
        }
      });
      this.availableComponents = uniqueComps;
    });
  }

  fetchStructureDetails() {
    if (!this.structureId) return;
    this.loading = true;
    this.payrollService.getPayrollStructureById(this.structureId).subscribe({
      next: (res: any) => {
        const fullData = res.data || res;
        this.structureInfo = fullData.structure || fullData;
        this.compositionData = JSON.parse(JSON.stringify(fullData.components || fullData.salary_components || []));
        this.calculateTotals();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching structure details:', err);
        this.loading = false;
      }
    });
  }

  calculateTotals() {
    const ctc = Number(this.structureInfo?.ctc_amount) || 0;
    const calculatedAmts: { [code: string]: number } = { 'CTC': ctc };

    this.compositionData.forEach(c => {
      if (c.calculation_type === 'FIXED') {
        calculatedAmts[c.code] = Number(c.value) || 0;
      } else if (c.calculation_type === 'PERCENTAGE' && (c.percentage_of_code === 'CTC' || !c.percentage_of_code)) {
        calculatedAmts[c.code] = (ctc * (Number(c.value) || 0)) / 100;
      }
    });

    this.compositionData.forEach(c => {
      if (c.calculation_type === 'PERCENTAGE' && c.percentage_of_code && c.percentage_of_code !== 'CTC') {
        const baseAmt = calculatedAmts[c.percentage_of_code] || 0;
        calculatedAmts[c.code] = (baseAmt * (Number(c.value) || 0)) / 100;
      }
    });

    this.compositionData.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const name = (c.name || '').toUpperCase();
      const isESIEmployer = code.includes('ESI') && (code.includes('EMPLOYER') || name.includes('EMPLOYER'));
      if (isESIEmployer) {
        let pfm = 0;
        Object.keys(calculatedAmts).forEach(k => {
          if (k.toUpperCase().includes('PF') && k.toUpperCase().includes('EMPLOYER')) pfm = calculatedAmts[k];
        });
        calculatedAmts[c.code] = (ctc - pfm) * (3.25 / 103.25);
      }
    });

    this.compositionData.forEach(c => {
      const code = (c.code || '').toUpperCase();
      const isESIEmployee = code.includes('ESI') && !code.includes('EMPLOYER');
      if (isESIEmployee) {
        let pfm = 0;
        let esier = 0;
        Object.keys(calculatedAmts).forEach(k => {
          if (k.toUpperCase().includes('PF') && k.toUpperCase().includes('EMPLOYER')) pfm = calculatedAmts[k];
          if (k.toUpperCase().includes('ESI') && k.toUpperCase().includes('EMPLOYER')) esier = calculatedAmts[k];
        });
        calculatedAmts[c.code] = (ctc - pfm - esier) * (0.75 / 100);
      }
    });

    const specialAllowanceComp = this.compositionData.find(c => c.code?.toUpperCase() === 'SPECIAL_ALLOWANCE');
    let sumOfOthers = 0;
    this.compositionData.forEach(c => {
      if (c !== specialAllowanceComp) sumOfOthers += calculatedAmts[c.code] || 0;
    });
    if (specialAllowanceComp) {
      calculatedAmts[specialAllowanceComp.code] = Math.max(0, ctc - sumOfOthers);
    }

    this.totalEarnings = 0;
    this.totalDeductions = 0;
    this.compositionData.forEach(c => {
      const annualAmt = calculatedAmts[c.code] || 0;
      c.annual_amount = Math.round(annualAmt);
      c.monthly_amount = Math.round(annualAmt / 12);
      c.calculated_amount = this.viewMode === 'annual' ? c.annual_amount : c.monthly_amount;
      if ((c.component_type)?.toUpperCase() === 'EARNING') this.totalEarnings += c.calculated_amount;
      else this.totalDeductions += c.calculated_amount;
    });
  }

  toggleView(mode: 'annual' | 'monthly') {
    this.viewMode = mode;
    this.calculateTotals();
  }

  updateEmployeeCTC() {
    if (!this.structureInfo?.employee_id || !this.structureInfo?.ctc_amount) return;
    if (confirm(`Update CTC to ${this.structureInfo.ctc_amount}?`)) {
      this.employeeService.updateEmployeeProfile(this.structureInfo.employee_id, { lpa: Number(this.structureInfo.ctc_amount) }).subscribe(() => {
        this.toaster.showSuccess('CTC updated successfully');
      });
    }
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedComponentId = null;
    this.isModalOpen = true;
    this.employeeSearchTerm = '';
    this.filteredEmployees = this.employees;

    // Clear validators of fields not in Add mode
    this.compositionForm.get('component_id')?.setValidators([Validators.required]);
    this.compositionForm.get('code')?.clearValidators();
    this.compositionForm.get('name')?.clearValidators();
    this.compositionForm.updateValueAndValidity();

    this.compositionForm.reset({
      component_id: null,
      formula_or_value: '',
      component_type: 'EARNING',
      calculation_type: 'FIXED',
      percentage_of_code: 'BASIC',
      taxable: true,
      prorated: false,
      sequence: 10,
      value: 0,
      created_by: Number(localStorage.getItem('employee_id')) || 1
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editComponent(comp: any) {
    this.isEditMode = true;
    this.selectedComponentId = comp.id;
    this.isModalOpen = true;

    // Set validators of fields in Edit mode
    this.compositionForm.get('component_id')?.clearValidators(); // Not needed in edit as we are editing the component record directly
    this.compositionForm.get('code')?.setValidators([Validators.required]);
    this.compositionForm.get('name')?.setValidators([Validators.required]);
    this.compositionForm.updateValueAndValidity();

    const creatorId = Number(comp.created_by || localStorage.getItem('employee_id'));
    const creator = Array.isArray(this.employees) ? this.employees.find((e: any) => Number(e.id) === creatorId) : null;
    this.employeeSearchTerm = creator ? creator.FullName : 'Unknown';

    // Format formula_or_value from direct value for edit display
    const fov = comp.calculation_type === 'PERCENTAGE' ? (comp.value + '%') : comp.value.toString();

    this.compositionForm.patchValue({
      formula_or_value: fov,
      code: comp.code,
      name: comp.name,
      component_type: comp.component_type,
      calculation_type: comp.calculation_type,
      value: comp.value,
      percentage_of_code: comp.percentage_of_code || 'BASIC',
      taxable: comp.taxable === 1 || comp.taxable === true,
      prorated: comp.prorated === 1 || comp.prorated === true,
      sequence: comp.sequence || 10,
      notes: comp.notes || '',
      created_by: creatorId
    });
  }

  saveComponent() {
    if (this.compositionForm.invalid || !this.structureId) {
      console.warn('Form invalid', this.compositionForm.errors);
      return;
    }

    const formValue = this.compositionForm.value;

    // Parse "formula_or_value" if it was changed
    let fValue = (formValue.formula_or_value || '').toString();
    const calculationType = fValue.includes('%') ? 'PERCENTAGE' : formValue.calculation_type;
    const numericValue = fValue.includes('%') ? parseFloat(fValue.replace('%', '').trim()) : Number(formValue.value);

    let payload: any;

    if (this.isEditMode) {
      payload = {
        structure_id: this.structureId,
        code: formValue.code,
        name: formValue.name,
        component_type: formValue.component_type,
        calculation_type: calculationType,
        value: numericValue,
        percentage_of_code: calculationType === 'PERCENTAGE' ? formValue.percentage_of_code : null,
        taxable: formValue.taxable ? 1 : 0,
        prorated: formValue.prorated ? 1 : 0,
        sequence: Number(formValue.sequence),
        notes: formValue.notes,
        created_by: Number(formValue.created_by)
      };

      this.payrollService.updateStructureComposition(this.structureId, this.selectedComponentId!, payload).subscribe({
        next: () => {
          this.toaster.showSuccess('Component updated successfully');
          this.isModalOpen = false;
          this.fetchStructureDetails();
        },
        error: (err) => {
          console.error('Update failed', err);
          this.toaster.showError('Could not update component');
        }
      });
    } else {
      const masterComp = this.availableComponents.find(c => Number(c.id) === Number(formValue.component_id));
      if (!masterComp) {
        this.toaster.showWarning('Select a valid master component');
        return;
      }

      payload = {
        structure_id: this.structureId,
        code: masterComp.code,
        name: masterComp.name,
        component_type: masterComp.component_type,
        calculation_type: calculationType,
        value: numericValue,
        percentage_of_code: calculationType === 'PERCENTAGE',
        taxable: masterComp.taxable !== undefined ? (masterComp.taxable ? 1 : 0) : 1,
        prorated: masterComp.prorated ? 1 : 0,
        sequence: masterComp.sequence,
        notes: masterComp.notes || '',
        created_by: Number(formValue.created_by)
      };

      this.payrollService.addComponentToStructure(this.structureId, payload).subscribe({
        next: () => {
          this.toaster.showSuccess('Component added to structure');
          this.isModalOpen = false;
          this.fetchStructureDetails();
        },
        error: (err) => {
          console.error('Add failed', err);
          this.toaster.showError('Could not add component');
        }
      });
    }
  }

  deleteComponent(componentId: number) {
    if (!this.structureId || !confirm('Are you sure you want to remove this component from the structure?')) return;
    this.payrollService.deleteStructureComposition(this.structureId, componentId).subscribe({
      next: () => {
        this.toaster.showSuccess('Component removed');
        this.fetchStructureDetails();
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.toaster.showError('Could not remove component');
      }
    });
  }

  goBack() { window.history.back(); }
}
