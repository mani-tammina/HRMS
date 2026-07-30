import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step5-regularization',
  templateUrl: './step5-regularization.component.html',
  styleUrls: ['./step5-regularization.component.scss'],
  standalone: false
})
export class Step5RegularizationComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  approvalLevels = [
    { value: 'manager', label: 'Reporting Manager' },
    { value: 'hr', label: 'HR Department' },
    { value: 'manager_then_hr', label: 'Manager → HR (2-Level)' }
  ];

  ngOnInit() {}

  get regularizationEnabled(): boolean {
    return !!this.formGroup.get('regularization_enabled')?.value;
  }

  get autoApproveEnabled(): boolean {
    return !!this.formGroup.get('auto_approve_enabled')?.value;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
