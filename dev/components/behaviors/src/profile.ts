import { toast } from 'ngx-sonner';
import { Injectable, computed, inject, signal } from "@angular/core";
import { ConnectError } from "@connectrpc/connect";
import { injectAuthService, injectUserService } from "@tierklinik-dobersberg/angular/connect";
import { Profile, IntrospectResponse } from "@tierklinik-dobersberg/apis";
import { interval, retry, startWith, switchMap } from 'rxjs';

export function injectCurrentProfile() {
    const profileService = inject(ProfileService);

    return computed(() => profileService.current())
}

export function injectUserProfiles() {
    const profileService = inject(ProfileService);

    return computed(() => profileService.profiles());
}

@Injectable({providedIn: 'root'})
export class ProfileService {
  private readonly authService = injectAuthService();
  private readonly userService = injectUserService();

  private _profiles = signal<Profile[]>([]);
  public profiles = this._profiles.asReadonly();

  private _current = signal<Profile | null>(null)
  public current = this._current.asReadonly();

  constructor() {
    this.authService
      .introspect({
        excludeFields: true,
        readMask: {
          paths: ['profile.user.avatar']
        }
      })
      .then((response: IntrospectResponse) => this._current.set(response.profile!))
      .catch((err: any) => {
        const connectErr = ConnectError.from(err);
        toast.error('Fehler beim laden des Benutzerprofiles', {
          description: connectErr.message
        })
      })

    interval(5 * 60 * 1000)
      .pipe(
        startWith(-1),
        switchMap(() => this.userService.listUsers({
          excludeFields: true,
          fieldMask: {
            paths: ['users.user.avatar']
          }
        })),
        retry({
          delay: 1000,
        })
      )
      .subscribe(result => {
        this._profiles.set(result.users);
      })
  }
}