import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from '../../../../core/services/payroll-service.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-structure-composition',
  templateUrl: './structure-composition.page.html',
  styleUrls: ['./structure-composition.page.scss'],
  standalone: false
})
export class StructureCompositionPage implements OnInit {
  structureId: number | null = null;
  structureInfo: any = null;
  compositionData: any[] = [];
  loading = true;
  viewMode: 'annual' | 'monthly' = 'annual';

  // Modal related
  isAddModalOpen = false;
  assignForm!: FormGroup;
  masterComponents: any[] = [];
  filteredEmployees: any[] = [];
  isSearching = false;
  env: string = 'http://tamminademoapps.com:9295';
  private employeeSearch$ = new Subject<string>();

  totalEarnings = 0;
  totalDeductions = 0;
  netCTC = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollService: PayrollService,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) { 
    this.initForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.structureId = +id;
        this.fetchStructureDetails();
      }
    });

    this.fetchMasterComponents();
    this.setupEmployeeSearch();
  }

  initForm() {
    this.assignForm = this.fb.group({
      component_id: ['', Validators.required],
      value: ['', Validators.required],
      created_by_employee_id: [''],
      employee_search: ['']
    });
  }

  fetchMasterComponents() {
    this.payrollService.getPayrollComponents().subscribe({
      next: (res: any) => {
        this.masterComponents = res.data || res;
      }
    });
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
        return this.employeeService.searchEmployees(term, 1, 50);
      })
    ).subscribe({
      next: (res: any) => {
        this.filteredEmployees = Array.isArray(res) ? res : (res.data || []);
        this.isSearching = false;
      },
      error: () => {
        this.isSearching = false;
        this.filteredEmployees = [];
      }
    });
  }

  onEmployeeSearch(event: any) {
    const val = event.target.value;
    this.employeeSearch$.next(val);
  }

  selectEmployee(emp: any) {
    this.assignForm.patchValue({
      created_by_employee_id: emp.id,
      employee_search: emp.FullName || (emp.FirstName + ' ' + emp.LastName)
    });
    this.filteredEmployees = [];
  }

  fetchStructureDetails() {
    if (!this.structureId) return;
    this.loading = true;

    this.payrollService.getPayrollStructureById(this.structureId).subscribe({
      next: (res: any) => {
        const fullData = res.data || res;
        this.structureInfo = fullData.structure || (fullData.id ? fullData : null);
        this.compositionData = fullData.components || [];
        this.calculateFinancials();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching structure composition:', err);
        this.toaster.showError('Could not load structure composition');
        this.loading = false;
      }
    });
  }

  calculateFinancials() {
    this.totalEarnings = this.compositionData
      .filter(c => (c.component_type || '').toLowerCase() === 'earning')
      .reduce((sum, c) => sum + (Number(c.value) || 0), 0);

    this.totalDeductions = this.compositionData
      .filter(c => (c.component_type || '').toLowerCase() === 'deduction')
      .reduce((sum, c) => sum + (Number(c.value) || 0), 0);

    const baseNet = this.totalEarnings - this.totalDeductions;
    this.netCTC = Number(this.structureInfo?.ctc_amount) || baseNet;
  }

  setViewMode(mode: 'annual' | 'monthly') {
    this.viewMode = mode;
  }

  formatCurrency(amount: string | number): string {
    let num = Number(amount);
    if (this.viewMode === 'monthly') {
      num = num / 12;
    }
    if (isNaN(num)) return '₹0';
    return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getDisplayValue(val: any): string {
    return this.formatCurrency(val);
  }

  getPercentageOfCTC(val: any): string {
    const ctc = Number(this.structureInfo?.ctc_amount) || this.totalEarnings;
    if (!ctc) return '0%';
    const pct = (Number(val) / ctc) * 100;
    return `${pct.toFixed(2)}%`;
  }

  goBack() {
    this.router.navigate(['/finance/structure']);
  }

  openAddModal() {
    this.initForm();
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  saveAllocatedComponent() {
    if (this.assignForm.invalid || !this.structureId) {
      this.toaster.showWarning('Please fill all required fields');
      return;
    }

    const payload = {
      ...this.assignForm.value
    };
    delete payload.employee_search;

    this.payrollService.addComponentToStructure(this.structureId, payload).subscribe({
      next: () => {
        this.toaster.showSuccess('Component added to structure');
        this.closeAddModal();
        this.fetchStructureDetails();
      },
      error: (err: any) => {
        console.error('Error adding component:', err);
        this.toaster.showError(err.error?.message || 'Failed to add component');
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = '../../../assets/Profile_Picture.png';
  }

  syncToProfile() {
    this.toaster.showSuccess('Syncing CTC to employee profile...');
  }

  addComponent() {
    this.openAddModal();
  }

  getStatusLabel(isActive: any): string {
    return !!isActive ? 'Active' : 'Inactive';
  }
}
