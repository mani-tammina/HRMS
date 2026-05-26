import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tsFilter', standalone: false })
export class TsFilterPipe implements PipeTransform {
  transform(timesheets: any[], status: string): number {
    if (!timesheets || !status) return 0;
    return timesheets.filter(t => (t.status || '').toLowerCase() === status.toLowerCase()).length;
  }
}
