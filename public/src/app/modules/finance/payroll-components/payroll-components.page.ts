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
    this.selectedComponentId = comp.id;
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

    if (payload.calculation_type === 'FIXED') {
      delete payload.percentage_of_code;
    }

    if (this.isEditMode && this.selectedComponentId) {
      this.payrollService.updatePayrollComponent(this.selectedComponentId, payload).subscribe({
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

  getTotal() {
    return this.components.reduce((sum, c) => sum + Number(c.value), 0);
  }

  goBack() {
    this.router.navigate(['/finance/admin']);
  }
}
