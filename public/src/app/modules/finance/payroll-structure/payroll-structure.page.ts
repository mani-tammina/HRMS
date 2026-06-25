import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayrollService } from '../../../core/services/payroll-service.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-payroll-structure',
  templateUrl: './payroll-structure.page.html',
  styleUrls: ['./payroll-structure.page.scss'],
  standalone: false
})
export class PayrollStructurePage implements OnInit {
  structures: any[] = [];
  loading = true;
  activeCount = 0;
  inactiveCount = 0;

  isModalOpen = false;
  structureForm!: FormGroup;
  employees: any[] = [];
  filteredEmployees: any[] = [];
  availableComponents: any[] = [];
  selectedComponents: any[] = [];
  employeeSearchTerm: string = '';
  isEditMode = false;
  selectedStructureId: number | null = null;
  env: string = 'http://localhost:4203'; // Matches the backend base
  isSearching = false;

  private employeeSearch$ = new Subject<string>();

  constructor(
    private payrollService: PayrollService,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.initForm();
    this.fetchStructures();
    this.fetchComponents();
    this.setupEmployeeSearch();
  }

  setupEmployeeSearch() {
    this.employeeSearch$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term || term.length < 2) {
          this.isSearching = false;
          return [];
        }
        this.isSearching = true;
        return this.employeeService.searchEmployees(term, 1, 1000);
      })
    ).subscribe({
      next: (res: any) => {
        this.filteredEmployees = Array.isArray(res) ? res : (res.data || []);
        this.isSearching = false;
      },
      error: (err: any) => {
        console.error('Search error:', err);
        this.filteredEmployees = [];
        this.isSearching = false;
      }
    });
  }

  onSearchFocus() {
    if (this.employeeSearchTerm.length >= 2 && this.filteredEmployees.length === 0) {
      this.employeeSearch$.next(this.employeeSearchTerm);
    }
  }

  handleImageError(event: any) {
    event.target.src = '../../../assets/Profile_Picture.png';
  }

  initForm() {
    this.structureForm = this.fb.group({
      employee_id: [null, Validators.required],
      structure_name: ['', Validators.required],
      ctc_amount: [0, [Validators.required, Validators.min(0)]],
      effective_from: [new Date().toISOString().split('T')[0], Validators.required],
      effective_to: [null],
      is_active: [true],
      notes: [''],
    });
  }

  fetchStructures() {
    this.loading = true;
    this.payrollService.getPayrollstructures().subscribe({
      next: (res: any) => {
        this.structures = Array.isArray(res) ? res : (res.data || []);
        this.activeCount = this.structures.filter(s => !!s.is_active).length;
        this.inactiveCount = this.structures.filter(s => !s.is_active).length;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load structures:', err);
        this.toaster.showError('Could not load structures');
        this.loading = false;
      }
    });
  }

  fetchEmployees() {
    // We'll primarily use the search API now, but we can load a few initially if needed.
    // Setting filteredEmployees to empty initially to wait for search.
    this.filteredEmployees = [];
  }

  filterEmployees(event: any) {
    const term = event.target.value;
    this.employeeSearchTerm = term;
    this.employeeSearch$.next(term);
  }

  selectEmployee(emp: any) {
    this.structureForm.patchValue({ employee_id: emp.id });
    this.employeeSearchTerm = emp.FullName;
    this.filteredEmployees = [];
  }

  fetchComponents() {
    this.payrollService.getPayrollComponents().subscribe({
      next: (res: any) => {
        this.availableComponents = Array.isArray(res) ? res : (res.data || []);
      },
      error: () => this.toaster.showError('Could not load available components')
    });
  }

  addComponent(comp: any) {
    if (!this.selectedComponents.find(c => c.id === comp.id)) {
      this.selectedComponents.push(comp);
      this.toaster.showSuccess(`${comp.name} added to structure`);
    } else {
      this.toaster.showWarning('Component already added');
    }
  }

  removeComponent(index: number) {
    this.selectedComponents.splice(index, 1);
  }

  openCreateModal() {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.selectedStructureId = null;
    this.selectedComponents = [];
    this.employeeSearchTerm = '';
    this.filteredEmployees = this.employees;
    this.structureForm.reset({
      employee_id: null,
      structure_name: '',
      ctc_amount: 0,
      effective_from: new Date().toISOString().split('T')[0],
      effective_to: null,
      is_active: true,
      notes: '',
    });
  }

  editStructure(struct: any) {
    if (!struct) return;
    this.isModalOpen = true;
    this.isEditMode = true;
    this.selectedStructureId = struct.id || struct.structure_id;

    const emp = this.employees.find(e => e.id === Number(struct.employee_id));
    this.employeeSearchTerm = emp ? emp.FullName : (struct.FullName || '');

    this.structureForm.patchValue({
      employee_id: struct.employee_id,
      structure_name: struct.structure_name,
      ctc_amount: struct.ctc_amount,
      effective_from: this.formatDate(struct.effective_from),
      effective_to: this.formatDate(struct.effective_to),
      is_active: !!struct.is_active,
      notes: struct.notes,
    });
    this.selectedComponents = struct.components || [];

    // Fetch full details
    this.payrollService.getPayrollStructureById(this.selectedStructureId!).subscribe({
      next: (res: any) => {
        const fullData = res.data || res;
        const mainInfo = fullData.structure || fullData;
        const comps = fullData.components || [];

        if (mainInfo) {
          this.structureForm.patchValue({
            employee_id: mainInfo.employee_id,
            structure_name: mainInfo.structure_name,
            ctc_amount: mainInfo.ctc_amount,
            effective_from: this.formatDate(mainInfo.effective_from),
            effective_to: this.formatDate(mainInfo.effective_to),
            is_active: !!mainInfo.is_active,
            notes: mainInfo.notes,
          });
          this.selectedComponents = comps;
        }
      },
      error: (err: any) => {
        console.error('Error fetching full structure details:', err);
      }
    });
  }

  private formatDate(date: any): string {
    if (!date) return '';
    if (typeof date === 'string' && date.includes('T')) return date.split('T')[0];
    return date;
  }

  deleteStructure(id: number) {
    if (confirm('Are you sure you want to delete this payroll structure?')) {
      this.payrollService.deletePayrollStructure(id).subscribe({
        next: () => {
          this.toaster.showSuccess('Structure deleted successfully');
          this.fetchStructures();
        },
        error: (err: any) => {
          console.error('Error deleting structure:', err);
          this.toaster.showError('Failed to delete structure');
        }
      });
    }
  }

  saveStructure() {
    if (this.structureForm.invalid) return;

    const formValue = this.structureForm.value;
    const payload = {
      ...formValue,
      employee_id: Number(formValue.employee_id),
      ctc_amount: Number(formValue.ctc_amount),
      created_by: Number(localStorage.getItem('employee_id')) || 1,
      components: this.selectedComponents.map(c => ({
        code: c.code || c.component_code,
        name: c.name || c.component_name,
        component_type: c.component_type,
        calculation_type: c.calculation_type,
        value: Number(c.value),
        percentage_of_code: c.percentage_of_code,
        taxable: !!(c.taxable ?? c.is_taxable),
        prorated: !!(c.prorated ?? c.is_prorated),
        sequence: Number(c.sequence),
        notes: c.notes
      }))
    };

    const request = this.isEditMode && this.selectedStructureId
      ? this.payrollService.updatePayrollStructure(this.selectedStructureId, payload)
      : this.payrollService.createPayrollStructure(payload);

    request.subscribe({
      next: () => {
        this.toaster.showSuccess(`Structure ${this.isEditMode ? 'updated' : 'created'} successfully`);
        this.isModalOpen = false;
        this.fetchStructures();
      },
      error: (err: any) => {
        console.error('Error saving structure:', err);
        this.toaster.showError('Failed to save structure');
      }
    });
  }

  formatCurrency(amount: string | number): string {
    const num = Number(amount);
    if (isNaN(num)) return '-';
    return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getStatusLabel(isActive: any): string {
    return !!isActive ? 'Active' : 'Inactive';
  }

  viewDetails(structureId: number) {
    this.router.navigate(['/finance/structure/composition', structureId]);
  }

  goBack() {
    this.router.navigate(['/finance/admin']);
  }

  trackById(index: number, item: any) {
    return item.id || index;
  }
}
