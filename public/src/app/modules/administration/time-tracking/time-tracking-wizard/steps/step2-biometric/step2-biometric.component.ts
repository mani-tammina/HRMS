import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step2-biometric',
  templateUrl: './step2-biometric.component.html',
  styleUrls: ['./step2-biometric.component.scss'],
  standalone: false
})
export class Step2BiometricComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  ngOnInit() {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getControl(name: string) {
    return this.formGroup.get(name);
  }
}
