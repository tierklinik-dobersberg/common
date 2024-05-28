import { Pipe, PipeTransform } from "@angular/core";
import { coerceDate, DateInput } from "@tierklinik-dobersberg/angular/utils/date";


@Pipe({
  name: 'isSameDay',
  pure: true,
  standalone: true,
})
export class IsSameDayPipe implements PipeTransform {
   static transform(date: DateInput, compare: DateInput) {
      return coerceDate(date).toDateString() === coerceDate(compare).toDateString();
   }

  transform(date: DateInput, compare: DateInput) {
    return IsSameDayPipe.transform(date, compare)
  }
}