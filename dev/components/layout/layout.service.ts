import { BreakpointObserver } from '@angular/cdk/layout';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { ChangeDetectorRef, Injectable, InjectionToken, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface BreakpointState {
  [key: string]: boolean;
}

export const Breakpoints = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  breakpoints: Observable<{ [key: string]: boolean }>;

  private onUpdate = new BehaviorSubject<void>(undefined);
  private state: BreakpointState = {};

  get change(): Observable<void> {
    return this.onUpdate.asObservable();
  }

  get sm() {
    return this.state[Breakpoints.sm]
  }

  get md() {
    return this.state[Breakpoints.md]
  }

  get lg() {
    return this.state[Breakpoints.lg]
  }

  get xl() {
    return this.state[Breakpoints.xl]
  }

  get xxl() {
    return this.state[Breakpoints['2xl']]
  }

  get drawerWidth(): Observable<string> {
    return this.change
      .pipe(map(() => {
        return this.sm
          ? '100vw'
          : this.lg
            ? '25vw'
            : '50vw';
      }));
  }

  /** Automatically adds an update listener to trigger a change detection cycle.
   *  Must be executed from an injection context.
   */
  withAutoUpdate(cdr?: ChangeDetectorRef): this {
    cdr = cdr || inject(ChangeDetectorRef);

    this.change
      .pipe(takeUntilDestroyed())
      .subscribe(() => cdr!.markForCheck())

    return this
  }

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {

    this.breakpoints = this.breakpointObserver.observe(Object.values(Breakpoints))
      .pipe(map(breakpointState => {
        return breakpointState.breakpoints;
      }));

    this.breakpoints.subscribe(states => {
      this.state = states;

      this.onUpdate.next();
    });
  }
} 
