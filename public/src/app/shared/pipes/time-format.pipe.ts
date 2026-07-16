import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeFormat', standalone: true })
export class TimeFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined || value === '') return '00:00';
    
    if (typeof value === 'string' && value.includes(':')) {
      const parts = value.split(':');
      if (parts.length >= 2) {
        return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
      }
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    const hours = Math.floor(numericValue);
    const minutes = Math.round((numericValue - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
