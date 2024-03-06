import { Pipe, type PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { DateTime } from 'luxon';

@Pipe({
  name: 'formatDateTime',
  standalone: true,
})
export class DatePipe implements PipeTransform {

  transform(value: Timestamp): string {
    return DateTime.fromJSDate(value.toDate()).toLocaleString(DateTime.DATETIME_SHORT);
  }

}
