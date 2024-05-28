import { Pipe, PipeTransform } from "@angular/core";
import { DateInput, coerceDate } from '@tierklinik-dobersberg/angular/utils/date';

@Pipe({
  name: 'toDate',
  pure: true,
  standalone: true,
})
export class ToDatePipe implements PipeTransform {
  transform(value: DateInput): Date {
    return coerceDate(value);
  }
}
