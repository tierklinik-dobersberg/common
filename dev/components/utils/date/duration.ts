import { Duration as ProtoDuration } from '@bufbuild/protobuf';
import { padLeft } from '@tierklinik-dobersberg/angular/utils/strings';

export const nanosecond = 1;
export const microsecond = 1000 * nanosecond;
export const millisecond = 1000 * microsecond;
export const second = 1000 * millisecond;
export const minute = 60 * second;
export const hour = 60 * minute;
export const day = 24 * hour;

export type DurationLayout = 'default-hours' | 'default' | 'hh:mm' | 'hh:mm:ss';

export class Duration {
  constructor(ns: number) {
    this._nanoseconds = ns;
  }

  toProto(): ProtoDuration {
    return new ProtoDuration({
      seconds: BigInt(this.seconds),
    })
  }

  get nanoseconds() {
    return this._nanoseconds;
  }

  get microseconds() {
    return Math.floor(this._nanoseconds / microsecond);
  }

  get milliseconds() {
    return Math.floor(this._nanoseconds / millisecond);
  }

  get seconds() {
    return Math.floor(this._nanoseconds / second);
  }

  get minutes() {
    return Math.floor(this._nanoseconds / minute);
  }

  get hours() {
    return Math.floor(this._nanoseconds / hour);
  }

  static nanosecond = new Duration(nanosecond);
  static microsecond = new Duration(microsecond);
  static millisecond = new Duration(millisecond);
  static second = new Duration(second);
  static minute = new Duration(minute);
  static hour = new Duration(hour);
  private _nanoseconds: number;

  static nanoseconds(s: number): Duration {
    return new Duration(s * nanosecond);
  }
  static microseconds(s: number): Duration {
    return new Duration(s * microsecond);
  }
  static milliseconds(s: number): Duration {
    return new Duration(s * millisecond);
  }
  static seconds(s: number): Duration {
    return new Duration(s * second);
  }
  static minutes(s: number): Duration {
    return new Duration(s * minute);
  }
  static hours(s: number): Duration {
    return new Duration(s * hour);
  }

  addTo(d: Date): Date {
    return new Date(d.getTime() + this.milliseconds);
  }

  format(layout: DurationLayout = 'default'): string {
    if (layout === 'default' || layout === 'default-hours') {
      return this.toString(layout === 'default-hours');
    }

    const sign = this._nanoseconds < 0 ? '-' : '';
    let ns = Math.abs(this._nanoseconds);
    const hours = Math.floor(ns / hour);
    ns -= hours * hour;
    const minutes = Math.floor(ns / minute);
    ns -= minutes * minute;
    const seconds = Math.floor(ns / second);
    ns -= seconds * second;

    let str = padLeft(hours.toString(), 2, '0') + ':' + padLeft(minutes.toString(), 2, '0');
    if (layout === 'hh:mm:ss') {
      str += ':' + padLeft(seconds.toString(), 2, '0');
    }
    return sign+str;
  }

  toString(skipDays = false): string {
    const sign = this._nanoseconds < 0 ? '-' : '';
    let ns = Math.abs(this._nanoseconds);
    let str = '';

    if (this._nanoseconds === 0) {
      return '0h';
    }

    if (!skipDays) {
      const days = Math.floor(ns / day)
      if (days > 0) {
        str += days.toString() + 'd ';
        ns -= days * day;
      }
    }

    const hours = Math.floor(ns / hour);
    if (hours > 0) {
      str += hours.toString() + 'h ';
      ns -= hours * hour;
    }

    const minutes = Math.floor(ns / minute);
    if (minutes > 0) {
      str += minutes.toString() + 'm ';
      ns -= minutes * minute;
    }

    const seconds = Math.floor(ns / second);
    if (seconds > 0) {
      str += seconds.toString() + 's ';
      ns -= seconds * second;
    }

    const milliseconds = Math.floor(ns / millisecond);
    if (milliseconds > 0) {
      str += milliseconds.toString() + 'ms ';
      ns -= milliseconds * millisecond;
    }

    const microseconds = Math.floor(ns / microsecond);
    if (microseconds > 0) {
      str += microseconds.toString() + 'µs ';
      ns -= microseconds * microsecond;
    }

    if (ns > 0) {
      str += ns.toString() + 'ns';
      ns -= ns * nanosecond;
    }

    if (str.endsWith("")) {
      str = str.substring(0, str.length - 1)
    }

    return sign + str;
  }

  static parseString(v: string, throwError = false): Duration {
    let time = 0;

    let numberValue = '';
    let suffix = '';
    let state = 'number'
    let parseFactor = 1;

    const parse = () => {
      let factor = 0;
      switch (suffix) {
        case 'd':
          factor = day
          break;
        case 'h':
          factor = hour
          break;
        case 'm':
          factor = minute
          break;
        case 's':
          factor = second
          break;
        case 'ms':
          factor = millisecond
          break;
        case 'µs':
          factor = microsecond
          break;
        case 'ns':
          factor = nanosecond
          break;
        default:
          throw new Error(`invalid time factor: ${suffix}`)
      }

      time += ((+numberValue) * factor)
    }

    try {
      for (let i = 0; i < v.length; i++) {
        const c = v.charAt(i)

        if (c === ' ') {
          continue
        }

        if (c === '-' && numberValue === '') {
          parseFactor = -1

          continue
        }

        if (state === 'number') {
          if (!isNaN(+c)) {
            numberValue += c

            continue
          }

          state = 'suffix'
          suffix += c

          continue
        }

        if (state === 'suffix') {
          if (isNaN(+c)) {
            suffix += c
            continue
          }

          parse()

          numberValue = c
          suffix = ''
          state = 'number'
        }
      }

      if (numberValue !== '') {
        parse()
      }

      return new Duration(parseFactor * time)
    } catch (err) {
      if (throwError) {
        throw err;
      }

      return new Duration(0)
    }
  }

  isLessThan(d: Duration) {
    return this.nanoseconds < d.nanoseconds;
  }

  isGreatherThan(d: Duration) {
    return this.nanoseconds > d.nanoseconds;
  }

  isEqual(d: Duration) {
    return this.nanoseconds === d.nanoseconds;
  }

  valueOf(): number {
    return this._nanoseconds;
  }
}

