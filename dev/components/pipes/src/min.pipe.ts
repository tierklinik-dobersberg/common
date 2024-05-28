
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'min',
  pure: true,
  standalone: true,
})
export class MinPipe implements PipeTransform {
  transform(val: number, ...min: number[]): number {
    const array = [val, ...(min || [])];

    return array.reduce((min, current) => {
        if (current < min) {
            return current
        }

        return min
    }, Infinity);
  }
}