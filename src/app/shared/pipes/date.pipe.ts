import { Pipe, type PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'formatDateTime',
  standalone: true,
})
export class DatePipe implements PipeTransform {

  transform(value: string): string {
    const dateTime = DateTime.fromISO(value);
    return dateTime.toLocaleString(DateTime.DATETIME_FULL); 
  }

}
