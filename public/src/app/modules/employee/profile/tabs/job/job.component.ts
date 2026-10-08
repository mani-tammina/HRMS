import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

export function formatDateDDMMMYYYY(val: any): string {
  if (!val) return '-';
  const str = String(val).trim();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ymd = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (ymd) {
    const mIdx = parseInt(ymd[2], 10) - 1;
    return `${ymd[3].padStart(2, '0')} ${months[mIdx] || ymd[2]} ${ymd[1]}`;
  }
  const dmy = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    const mIdx = parseInt(dmy[2], 10) - 1;
    return `${dmy[1].padStart(2, '0')} ${months[mIdx] || dmy[2]} ${dmy[3]}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(d);
  }
  return str || '-';
}

@Component({
  selector: 'app-job-tab',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JobTabComponent implements OnChanges {
  @Input() currentEmployee: any | null = null;

  constructor() { }

  get formattedDOJ(): string {
    return formatDateDDMMMYYYY(this.currentEmployee?.DateJoined);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentEmployee']?.currentValue) {
      console.log('✅ JobTabComponent received employee:', this.currentEmployee);
    }
  }
}
