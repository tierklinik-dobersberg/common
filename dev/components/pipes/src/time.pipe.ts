import { Pipe, PipeTransform } from "@angular/core";
import { DurationInput, formatTime } from "@tierklinik-dobersberg/angular/utils/date";

@Pipe({
  name: 'time',
  standalone: true,
  pure: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: DurationInput) {
    return formatTime(value);
  }
}
