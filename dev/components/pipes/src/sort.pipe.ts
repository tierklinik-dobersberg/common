import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'sort',
  pure: true,
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform<T>(events: T[], sortFn?: ((a: T, b: T) => number)): T[] {
    let copy = [...events];

    if (sortFn !== undefined) {
        return copy.sort(sortFn);
    }

    return copy.sort();
  }
}