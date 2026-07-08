import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayrollService } from '../../../core/services/payroll-service.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-payroll-components',
  templateUrl: './payroll-components.page.html',
  styleUrls: ['./payroll-components.page.scss'],
  standalone: false
})
export class PayrollComponentsPage implements OnInit {
  components: any[] = [];
  componentForm!: FormGroup;
  isModalOpen = false;
  isEditMode = false;
  selectedComponentId: number | null = null;
  structures: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private payrollService: PayrollService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.componentForm = this.fb.group({
      structure_id: [1, Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      component_type: ['EARNING', Validators.required],
      calculation_type: ['FIXED', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      percentage_of_code: ['BASIC'],
      taxable: [true],
      prorated: [false],
      sequence: [10, Validators.required],
      notes: ['']
    });
    this.fetchComponents();
    this.fetchStructures();
  }

  fetchStructures() {
    this.payrollService.getPayrollstructures().subscribe({
      next: (res: any) => {
        this.structures = Array.isArray(res) ? res : (res.data || []);
        if (this.structures.length > 0) {
          this.componentForm.patchValue({ structure_id: this.structures[0].id });
        }
      },
      error: (err) => {
        console.error('Failed to fetch structures', err);
        this.toaster.showError('Could not load payroll structures');
      }
    });
  }

  fetchComponents() {
    this.payrollService.getPayrollComponents().subscribe({
      next: (res: any) => {
        this.components = Array.isArray(res) ? res : (res.data || []);
      },
      error: (err) => {
        console.error('Failed to fetch components', err);
        this.toaster.showError('Could not load payroll components');
      }
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.selectedComponentId = null;
    this.componentForm.reset({
      structure_id: this.structures.length > 0 ? this.structures[0].id : 1,
      component_type: 'EARNING',
      calculation_type: 'FIXED',
      percentage_of_code: 'BASIC',
      taxable: true,
      prorated: false,
      sequence: 10,
      value: 0
    });
    this.isModalOpen = true;
  }

  editComponent(comp: any) {
    this.isEditMode = true;
    this.selectedComponentId = comp.id || comp.component_id || null;
    this.componentForm.patchValue({
      structure_id: comp.structure_id,
      code: comp.code,
      name: comp.name,
      component_type: comp.component_type,
      calculation_type: comp.calculation_type,
      value: comp.value,
      percentage_of_code: comp.percentage_of_code,
      taxable: comp.taxable,
      prorated: comp.prorated,
      sequence: comp.sequence,
      notes: comp.notes
    });
    this.isModalOpen = true;
  }

  deleteComponent(id: number) {
    if (confirm('Are you sure you want to delete this component?')) {
      this.payrollService.deletePayrollComponent(id).subscribe({
        next: () => {
          this.toaster.showSuccess('Component deleted successfully');
          this.fetchComponents();
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toaster.showError('Could not delete component');
        }
      });
    }
  }

  saveComponent() {
    if (this.componentForm.invalid) return;
    const formValue = this.componentForm.value;
    const payload = {
      ...formValue,
      value: Number(formValue.value),
      sequence: Number(formValue.sequence),
      structure_id: Number(formValue.structure_id)
    };

    // Keep percentage_of_code even for FIXED if it's in the form, as per user's API example
    // if (payload.calculation_type === 'FIXED') {
    //   delete payload.percentage_of_code;
    // }

    if (this.isEditMode && this.selectedComponentId != null) {
      // For update, match the provided API payload structure (omit structure_id if provided IDs are in URL)
      // The user's curl request did not include structure_id in the body
      const { structure_id, ...updatePayload } = payload;

      // Safety check: ensure no NaN values are sent for numeric fields
      if (isNaN(updatePayload.value)) updatePayload.value = 0;
      if (isNaN(updatePayload.sequence)) updatePayload.sequence = 0;

      this.payrollService.updatePayrollComponent(this.selectedComponentId, updatePayload).subscribe({
        next: () => {
          this.toaster.showSuccess('Component updated successfully');
          this.closeModal();
          this.fetchComponents();
        },
        error: (err) => {
          console.error('Update failed', err);
          this.toaster.showError('Could not update component');
        }
      });
    } else {
      this.payrollService.createPayrollComponent(payload).subscribe({
        next: () => {
          this.toaster.showSuccess('Component created successfully');
          this.closeModal();
          this.fetchComponents();
        },
        error: (err) => {
          console.error('Creation failed', err);
          this.toaster.showError('Could not create component');
        }
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.selectedComponentId = null;
  }

  get totalEarningsAllocation(): string {
    const total = this.components
      .filter(c => c.component_type === 'EARNING' && c.calculation_type === 'PERCENTAGE')
      .reduce((sum, c) => sum + Number(c.value || 0), 0);
    return total.toFixed(2) + '%';
  }

  get totalDeductionsAllocation(): string {
    const total = this.components
      .filter(c => c.component_type === 'DEDUCTION' && c.calculation_type === 'PERCENTAGE')
      .reduce((sum, c) => sum + Number(c.value || 0), 0);
    return total.toFixed(2) + '%';
  }

  get taxableComponentsCount(): number {
    return this.components.filter(c => c.taxable).length;
  }

  formatValue(comp: any): string {
    const val = Number(comp.value);
    if (isNaN(val)) return '0.00';
    if (comp.calculation_type === 'PERCENTAGE') {
      return val.toFixed(2) + '%';
    }
    return val.toFixed(2);
  }

  goBack() {
    this.router.navigate(['/finance/admin']);
  }
}
