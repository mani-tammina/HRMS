import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step4-wfh-on-duty',
  templateUrl: './step4-wfh-on-duty.component.html',
  styleUrls: ['./step4-wfh-on-duty.component.scss'],
  standalone: false
})
export class Step4WfhOnDutyComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  punchMethods = [
    { value: 'web', label: 'Web Portal' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'both', label: 'Both (Web & Mobile)' }
  ];

  ngOnInit() {}

  get wfhEnabled(): boolean {
    return !!this.formGroup.get('wfh_enabled')?.value;
  }

  get onDutyEnabled(): boolean {
    return !!this.formGroup.get('on_duty_enabled')?.value;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
