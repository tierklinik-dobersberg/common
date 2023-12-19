import { Duration } from '@bufbuild/protobuf';
import { Pipe, PipeTransform } from "@angular/core";
import { Daytime } from "@tierklinik-dobersberg/apis";
import { padLeft } from "./utils";

@Pipe({
  name: 'daytime',
  pure: true,
  standalone: true,
})
export class DaytimePipe implements PipeTransform {
  transform(value?: Daytime | string, duration?: Duration) {
    if (!value) {
      return ''
    }

    if (typeof value === 'string') {
      const parts = value.split(":")
      if (parts.length != 2) {
        return '';
      }

      const hour = BigInt(+parts[0]);
      const minute = BigInt(+parts[1]);

      value = new Daytime({
        hour,
        minute,
      })
    }

    if (duration !== undefined) {
      let seconds = Number(value.hour)*60*60 + Number(value.minute)*60 + Number(duration.seconds)
      while (seconds > (24*60*60-1)) {
        seconds -= (24 * 60 * 60);
      }

      const hour = Math.floor(seconds / 60 / 60)
      const minutes = Math.floor( (seconds - (hour * 60 * 60)) / 60 );

      value = new Daytime({
        hour: BigInt(hour),
        minute: BigInt(minutes),
      })
    }

    return padLeft(`${value.hour}`, 2, '0') + ':' + padLeft(`${value.minute}`, 2, '0')
  }
}
