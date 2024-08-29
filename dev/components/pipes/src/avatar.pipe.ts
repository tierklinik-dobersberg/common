import { Pipe, PipeTransform, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CONNECT_CONFIG, type ConnectConfig } from "@tierklinik-dobersberg/angular/connect";
import { Profile } from "@tierklinik-dobersberg/apis/idm/v1";

@Pipe({
  standalone: true,
  name: 'avatar'
})
export class UserAvatarPipe implements PipeTransform {
  private readonly accountService = (inject(CONNECT_CONFIG) as ConnectConfig).accountService;
  private readonly sanatizer = inject(DomSanitizer);

  transform(value: Profile | string) {
    const id = typeof value === 'object' ? value.user!.id : value;

    return this.sanatizer.bypassSecurityTrustResourceUrl(`${this.accountService}/avatar/${id}`);
  }
}
