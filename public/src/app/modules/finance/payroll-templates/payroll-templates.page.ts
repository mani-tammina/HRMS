import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayrollService } from '../../../core/services/payroll-service.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-payroll-templates',
  templateUrl: './payroll-templates.page.html',
  styleUrls: ['./payroll-templates.page.scss'],
  standalone: false
})
export class PayrollTemplatesPage implements OnInit {
  templates: any[] = [];
  isModalOpen = false;
  isEditMode = false;
  selectedTemplateId: number | null = null;
  templateForm!: FormGroup;

  constructor(
    private payrollService: PayrollService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.initForm();
    this.fetchTemplates();
  }

  initForm() {
    this.templateForm = this.fb.group({
      template_name: ['', Validators.required],
      description: [''],
      is_active: [true],
    });
  }

  fetchTemplates() {
    this.payrollService.getPayrollTempletes().subscribe({
      next: (res: any) => {
        this.templates = Array.isArray(res) ? res : (res.data || []);
      },
      error: (err) => {
        console.error('Failed to fetch templates', err);
        this.toaster.showError('Could not load payroll templates');
      }
    });
  }

  viewComposition(templateId: number) {
    // Navigating to the template composition view
    this.router.navigate(['/finance/templates/composition', templateId]);
  }

  goBack() {
    this.router.navigate(['/finance/admin']);
  }

  openCreateModal() {
    this.isEditMode = false;
    this.selectedTemplateId = null;
    this.templateForm.reset({
      template_name: '',
      description: '',
      is_active: true
    });
    this.isModalOpen = true;
  }

  editTemplate(temp: any) {
    this.isEditMode = true;
    this.selectedTemplateId = temp.template_id || temp.id;
    this.templateForm.patchValue({
      template_name: temp.template_name || temp.name,
      description: temp.description,
      is_active: !!temp.is_active
    });
    this.isModalOpen = true;
  }

  saveTemplate() {
    if (this.templateForm.invalid) return;

    const formValue = this.templateForm.value;
    const payload = {
      template_name: formValue.template_name,
      description: formValue.description,
      created_by: Number(localStorage.getItem('employee_id')) || 1
    };

    if (this.isEditMode && this.selectedTemplateId) {
      this.payrollService.updateTemplate(this.selectedTemplateId, payload).subscribe({
        next: () => {
          this.toaster.showSuccess('Template updated successfully');
          this.isModalOpen = false;
          this.fetchTemplates();
        },
        error: (err) => {
          console.error('Update failed', err);
          this.toaster.showError('Failed to update template');
        }
      });
    } else {
      this.payrollService.createTemplate(payload).subscribe({
        next: () => {
          this.toaster.showSuccess('Template created successfully');
          this.isModalOpen = false;
          this.fetchTemplates();
        },
        error: (err) => {
          console.error('Creation failed', err);
          this.toaster.showError('Failed to create template');
        }
      });
    }
  }

  deleteTemplate(id: number) {
    if (confirm('Are you sure you want to delete this template?')) {
      this.payrollService.deleteTemplate(id).subscribe({
        next: () => {
          this.toaster.showSuccess('Template deleted successfully');
          this.fetchTemplates();
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toaster.showError('Could not delete template');
        }
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.selectedTemplateId = null;
  }
}
