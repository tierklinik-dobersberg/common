import { Overlay, OverlayConfig, OverlayPositionBuilder, PositionStrategy } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType, TemplatePortal } from "@angular/cdk/portal";
import { ComponentRef, EmbeddedViewRef, Injectable, Injector, inject } from "@angular/core";
import { TkdDialogRef } from "./dialog-ref";
import { TkdDialogContainerComponent } from "./dialog.container";
import { take, takeUntil, filter } from "rxjs";

export interface TemplateDialogContext<T> {
    $implicit: T;
    dialogRef: TkdDialogRef<T, unknown, EmbeddedViewRef<any>>;
}

export interface DialogConfig<T> {
    /** Whether or not the dialog should close on outside-clicks and ESC */
    autoclose?: boolean;

    /** Whether or not the dialog has a backdrop */
    backdrop?: boolean | string;

    /** Whether or not the dialog is dragable */
    dragable?: boolean;

    /** Optional class for the drag handle. */
    dragHandleClass?: string | string[] | Set<string>;

    /** Optional position strategy. If omitted, the overlay will be centered on the scree */
    positionStrategy?: PositionStrategy;

    /**
     * Optioanl dat afor the dialog that is available via TkdDialogRef for ComponentPortals
     * or as an $implicit context for template portals.
     */
    data?: T;

    /**
     * Optional style for the dialog container.
     */
    containerStyle?: {
        [klass: string]: any;
    };

    /**
     * Optional classes for the dialog container
     */
    containerClass?: string[] | string | Set<string>;

    /**
     * Optional class string for the overlay container.
     */
    panelClass?: string[] | string;
}

export interface ComponentPortalConfig<T> extends DialogConfig<T> {
    /** An optional injector for the component portal */
    injector?: Injector;
}

@Injectable()
export class TkdDialogService {
    private readonly injector = inject(Injector);
    private readonly overlay = inject(Overlay);

    position(): OverlayPositionBuilder {
        return this.overlay.position();
    }

    create<D>(template: TemplatePortal<TemplateDialogContext<D>>, opts?: DialogConfig<D>): TkdDialogRef<D, any, EmbeddedViewRef<TemplateDialogContext<D>>>;
    create<D, T>(target: ComponentType<T>, opts?: ComponentPortalConfig<T>): TkdDialogRef<D, any, ComponentRef<T>>;

    create(target: ComponentType<any> | TemplatePortal<any>, opts: ComponentPortalConfig<any>): TkdDialogRef<any, any, EmbeddedViewRef<any> | ComponentRef<any>> {
        let position: PositionStrategy = opts?.positionStrategy || this.overlay
            .position()
            .global()
            .centerVertically()
            .centerHorizontally();

        let hasBackdrop = true;
        let backdropClass = 'dialog-screen-backdrop';
        if (opts.backdrop !== undefined) {
            if (opts.backdrop === false) {
                hasBackdrop = false;
            } else if (typeof opts.backdrop === 'string') {
                backdropClass = opts.backdrop;
            }
        }

        const cfg = new OverlayConfig({
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: position,
            hasBackdrop: hasBackdrop,
            backdropClass: backdropClass,
            panelClass: opts.panelClass,
            disposeOnNavigation: opts.autoclose,
        });

        const overlayref = this.overlay.create(cfg);

        // create our dialog container and attach it to the
        // overlay.
        const containerPortal = new ComponentPortal<TkdDialogContainerComponent>(
            TkdDialogContainerComponent,
            undefined,
            this.injector,
        )
        const containerRef = containerPortal.attach(overlayref);

        // apply additional dialog container configuration
        if (!!opts.dragable) {
            containerRef.instance.dragable = true;
        }

        if (opts.dragHandleClass) {
            containerRef.instance.dragHandleClass = opts.dragHandleClass;
        }

        containerRef.instance.classes = opts.containerClass || [];
        containerRef.instance.styles = opts.containerStyle || {};

        containerRef.instance.cdr.markForCheck();

        // create the dialog ref
        const dialogRef = new TkdDialogRef<any, any, any>(overlayref, containerRef.instance, opts.data);

        // prepare the content portal and attach it to the container
        let result: any;
        if (target instanceof TemplatePortal) {
            let r = containerRef.instance.attach(target)

            if (!!r.context && typeof r.context === 'object' && !('$implicit' in r.context)) {
                r.context = <TemplateDialogContext<any>>{
                    $implicit: opts.data,
                    dialogRef: dialogRef,
                    ...r.context,
                }
            }

            result = r
        } else {
            const contentPortal = new ComponentPortal(target, null, Injector.create({
                providers: [
                    {
                        provide: TkdDialogRef,
                        useValue: dialogRef,
                    }
                ],
                parent: opts?.injector || this.injector,
            }));

            result = containerRef.instance.attach(contentPortal);
        }

        dialogRef.setContentRef(result);

        // update the container position now that we have some content.
        overlayref.updatePosition();

        if (!!opts?.autoclose) {
            overlayref.outsidePointerEvents()
                .pipe(take(1))
                .subscribe(() => dialogRef.close());
            overlayref.keydownEvents()
                .pipe(
                    takeUntil(overlayref.detachments()),
                    filter(event => event.key === 'Escape')
                )
                .subscribe(() => {
                    dialogRef.close();
                })
        }
        return dialogRef;
    }
}