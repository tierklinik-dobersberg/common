import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Injectable, InjectionToken, Provider, Signal, WritableSignal, computed, inject, isDevMode, signal } from '@angular/core';
import { map } from 'rxjs/operators';

import { Breakpoints as ThemeBreakpoints } from '@tierklinik-dobersberg/tailwind/breakpoints';

export type BreakpointDefinitions = typeof ThemeBreakpoints;

function convertBreakpoints(bp: BreakpointDefinitions): Record<string, string> {
  let res: { [key: string]: string } = {};

  Object.keys(bp)
    .forEach((key: any) => {
      const value: string | {
        raw: string
      } = (bp as any)[key];

      if (typeof value === 'object') {
        res[key] = value.raw
      } else {
        res[key] = `(min-width: ${value})`
      }
    })

  return res;
}

function inverseBreakpoints(bp: Record<string, string>): Record<string, string> {
  let res: Record<string, string> = {};

  Object.keys(bp)
    .forEach((key: string) => {
      res[bp[key]] = key
    })

  return res;
}

export const TKD_BREAKPOINTS = new InjectionToken<BreakpointDefinitions>('TKD_BREAKPOINTS');

export function injectBreakpoints(optional?: boolean): BreakpointDefinitions {
  return inject(TKD_BREAKPOINTS);
}

export function provideBreakpoints(bp: BreakpointDefinitions): Provider {
  return {
    provide: TKD_BREAKPOINTS,
    useValue: bp,
  }
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _breakpoints = convertBreakpoints(injectBreakpoints(true) || ThemeBreakpoints);
  private _inverse = inverseBreakpoints(this._breakpoints);

  readonly sm = signal<boolean>(false);
  readonly md = signal<boolean>(false);
  readonly lg = signal<boolean>(false);
  readonly xl = signal<boolean>(false);
  readonly xxl = signal<boolean>(false);
  readonly print = signal<boolean>(false);

  readonly drawerWidth = computed(() => {
    if (this.sm()) {
      return `100vw`;
    }

    if (this.lg()) {
      return `25vw`;
    }

    return `50vw`;
  })

  /** Automatically adds an update listener to trigger a change detection cycle.
   *  Must be executed from an injection context.
   */
  withAutoUpdate(cdr?: ChangeDetectorRef): this {
    return this
  }

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {

    const breakpoints = this.breakpointObserver.observe(Object.values(this._breakpoints))
      .pipe(map(breakpointState => {
        return breakpointState.breakpoints;
      }));

    breakpoints.subscribe(states => {
      Object.keys(states)
        .forEach(bp => {

          let key = this._inverse[bp];
          if (key === "2xl") {
            key = "xxl";
          }

          const signal: WritableSignal<boolean> | undefined = (this as any)[key];

          if (signal) {
            signal.set(states[bp]);
          } else {
            console.error(`failed to update layout signal for key ${bp}`);
          }
        })
    });
  }
}
