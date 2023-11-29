import { PipeTransform, Pipe } from "@angular/core"
import { Role } from "@tkd/apis"

@Pipe({
  name: 'roleList',
  pure: true,
  standalone: true,
})
export class RoleListPipe implements PipeTransform {

  transform(value: string[] | undefined, roles: Role[]) {
    if (!value) {
      return ''
    }

    return value
      .map(id => roles.find(role => role.id === id))
      .filter(role => !!role)
      .map(role => role!.name)
      .join(', ')
  }
}
