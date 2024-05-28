import { Pipe, PipeTransform } from '@angular/core';

export type ListInput<T> = ArrayLike<T> | T[] | Set<T> | Iterable<T>;

export function coerceArray<T>(input: ListInput<T> | undefined | null): T[] {
  if (input === undefined || input === null) {
    return []
  }

  if (input instanceof Set) {
    return Array.from(input.values())
  }

  if (Array.isArray(input)) {
    return input;
  }

  return Array.from(input);
}

@Pipe({
  name: 'inList',
  pure: true,
  standalone: true,
})
export class TkdInListPipe implements PipeTransform {

  transform<E, K extends keyof E, V extends E[K]>(value: V, list: ListInput<E> | undefined | null, propertyOrPredicate: K | ((v: E, idx: number) => boolean)): boolean;
  transform<E>(value: E, list: ListInput<E> | undefined | null): boolean;

  transform(value: any, list: ListInput<any> | undefined | null, property?: string | ((v: any, idx: number) => boolean)): boolean {
    const coerced = coerceArray(list);

    if (property !== undefined) {
      if (typeof property === 'function') {
        return coerced.find(property) !== undefined;
      }

      return coerced.find(el => el[property] === value) !== undefined;
    }

    return coerced.find(v => v === value) !== undefined
  }

}

// @deprecated -- use TkdInListPipe
// remove with 1.0.0
export const InListPipe = TkdInListPipe;