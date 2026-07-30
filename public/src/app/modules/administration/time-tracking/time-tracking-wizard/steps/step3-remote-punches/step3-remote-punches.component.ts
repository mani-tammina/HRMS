import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step3-remote-punches',
  templateUrl: './step3-remote-punches.component.html',
  styleUrls: ['./step3-remote-punches.component.scss'],
  standalone: false
})
export class Step3RemotePunchesComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  ngOnInit() {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  get mobilePunchEnabled(): boolean {
    return !!this.formGroup.get('mobile_punch_enabled')?.value;
  }

  get gpsRequired(): boolean {
    return !!this.formGroup.get('gps_required')?.value;
  }

  get ipWhitelistEnabled(): boolean {
    return !!this.formGroup.get('ip_whitelist_enabled')?.value;
  }
}
