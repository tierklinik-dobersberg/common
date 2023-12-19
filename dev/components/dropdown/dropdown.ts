import { Component, ChangeDetectionStrategy, OnInit, ViewChild, Input, TemplateRef, Output, EventEmitter, ElementRef, ChangeDetectorRef, Renderer2, DestroyRef, ViewChildren, QueryList, inject, ViewContainerRef } from "@angular/core";
import { fadeInAnimation, fadeOutAnimation } from "@tierklinik-dobersberg/angular/animations";
import { LayoutService } from '@tierklinik-dobersberg/angular/layout';
import { OverlayModule, CdkOverlayOrigin, ConnectedPosition, ScrollStrategy, ScrollStrategyOptions, Overlay, OverlayRef, PositionStrategy, OverlayConfig } from '@angular/cdk/overlay';
import { coerceBooleanProperty, coerceNumberProperty, coerceCssPixelValue } from "@angular/cdk/coercion";
import { TkdDropdownDirective } from "./dropdown-directives";
import { TemplatePortal } from "@angular/cdk/portal";
import { AnimationEvent } from '@angular/animations';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'tkd-dropdown',
  exportAs: 'tkdDropdown',
  templateUrl: './dropdown.html',
  imports: [
    OverlayModule,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, fadeOutAnimation],
})
export class TkdDropdown implements OnInit {
  private readonly overlay = inject(Overlay);
  private readonly layout = inject(LayoutService)
  private readonly viewContainerRef = inject(ViewContainerRef);
  private activatedTrigger: CdkOverlayOrigin | TkdDropdownDirective | null = null;

  overlayRef: OverlayRef | null = null;

  @ViewChild('overlayContainer', { read: TemplateRef })
  overlayContainer!: TemplateRef<HTMLElement>;

  @Input()
  mobileTitle: string = '';

  /** A list of classes to apply to the overlay element */
  @Input()
  overlayClass: string = '';

  /** Whether or not the drop-down is disabled. */
  @Input()
  set disabled(v: any) {
    this._disabled = coerceBooleanProperty(v)
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled = false;

  /** The Y-offset of the drop-down overlay */
  @Input()
  set offsetY(v: any) {
    this._offsetY = coerceNumberProperty(v);
  }
  get offsetY() { return this._offsetY }
  private _offsetY = 0;

  /** The X-offset of the drop-down overlay */
  @Input()
  set offsetX(v: any) {
    this._offsetX = coerceNumberProperty(v);
  }
  get offsetX() { return this._offsetX }
  private _offsetX = 0;

  /** Whether or not the pop-over is currently shown. Do not modify this directly */
  isOpen = false;

  /** The minimum width of the drop-down */
  @Input()
  set minWidth(val: any) {
    this._minWidth = coerceCssPixelValue(val)
  }
  get minWidth() { return this._minWidth }
  private _minWidth: string | number = 'fit-content';

  /** The maximum width of the drop-down */
  @Input()
  set maxWidth(val: any) {
    this._maxWidth = coerceCssPixelValue(val)
  }
  get maxWidth() { return this._maxWidth }
  private _maxWidth: string | number | null = 'fit-content';

  /** The minimum height of the drop-down */
  @Input()
  set minHeight(val: any) {
    this._minHeight = coerceCssPixelValue(val)
  }
  get minHeight() { return this._minHeight }
  private _minHeight: string | number | null = 'fit-content';

  /** The maximum width of the drop-down */
  @Input()
  set maxHeight(val: any) {
    this._maxHeight = coerceCssPixelValue(val)
  }
  get maxHeight() { return this._maxHeight }
  private _maxHeight: string | number | null = 'fit-content';

  /** Emits whenever the drop-down is opened */
  @Output()
  opened = new EventEmitter<void>();

  /** Emits whenever the drop-down is closed. */
  @Output()
  closed = new EventEmitter<void>();

  @Input()
  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ]

  constructor(
    public readonly elementRef: ElementRef,
    private renderer: Renderer2,
    private destroyRef: DestroyRef
  ) {
  }

  toggle(trigger: CdkOverlayOrigin | TkdDropdownDirective) {
    if (!!this.overlayRef) {
      this.close()

      return
    }

    this.open(trigger);
  }

  open(trigger: CdkOverlayOrigin | TkdDropdownDirective) {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }

    if (this.disabled) {
      return;
    }

    let position: PositionStrategy;
    let maxHeight = this.maxHeight;
    let maxWidth = this.maxWidth;
    let minWidth = this.minWidth;

    if (this.layout.md) {
      this.activatedTrigger = trigger;

      position = this.overlay
        .position()
        .flexibleConnectedTo(trigger.elementRef)
        .withPositions(this.positions)
        .withDefaultOffsetX(this.offsetX)
        .withDefaultOffsetY(this.offsetY)
        .withPush(true)
        .withFlexibleDimensions(true)
        .withGrowAfterOpen(true)
    } else {
      position = this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()

      maxHeight = '90vh';
      maxWidth = '90vw';
      minWidth = maxWidth;
    }

    const cfg: OverlayConfig = {
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        minHeight: this.minHeight,
        minWidth: minWidth,
        scrollStrategy: this.overlay.scrollStrategies.close(),
        positionStrategy: position,
        disposeOnNavigation: true,
        panelClass: this.overlayClass.split(" "),
        hasBackdrop: !this.layout.md,
    }

    this.overlayRef = this.overlay
      .create(cfg)

    this.overlayRef.outsidePointerEvents()
      .subscribe((event) => {
        this.onOutsideClick(event);
      })

    this.overlayRef.attach(new TemplatePortal(this.overlayContainer, this.viewContainerRef))

    this.overlayRef.detachments()
      .subscribe(() => {
        this.overlayRef = null;
        this.activatedTrigger = null;

        this.closed.next();
      })
  }

  fadeOutDone(event: AnimationEvent) {
    if (event.fromState !== 'void') {
      this.overlayRef?.dispose();
    }
  }

  close() {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.detach();
  }

  ngOnInit() {
    this.destroyRef
      .onDestroy(() => {
        if (!!this.overlayRef) {
          this.overlayRef.detach();
        }
      })
  }

  private onOutsideClick(event: MouseEvent) {
    if (!!this.activatedTrigger) {
      const triggerEl = this.activatedTrigger.elementRef.nativeElement;

      let node = event.target;
      while (!!node) {
        if (node === triggerEl) {
          return;
        }
        node = this.renderer.parentNode(node);
      }
    }

    this.close();
  }
}
