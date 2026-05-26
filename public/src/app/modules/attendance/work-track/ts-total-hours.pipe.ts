import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tsTotalHours', standalone: false })
export class TsTotalHoursPipe implements PipeTransform {
  transform(timesheets: any[]): number {
    if (!timesheets) return 0;
    return timesheets.reduce((sum, t) => sum + (parseFloat(t.total_hours) || 0), 0);
  }
}
