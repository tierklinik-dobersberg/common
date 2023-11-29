import { Pipe, PipeTransform } from "@angular/core"

export enum Workday {
  So,
  Mo,
  Di,
  Mi,
  Do,
  Fr,
  Sa,
}

@Pipe({
  name: 'workday',
  pure: true,
  standalone: true,
})
export class WorkDayPipe implements PipeTransform {

  transform(value?: number[], ...args: any[]) {
    if (!value) {
      return ''
    }

    return value
      .map(day => Workday[day])
      .join(', ')
  }
}
