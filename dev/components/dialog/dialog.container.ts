import { AnimationEvent } from '@angular/animations';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkPortalOutlet, ComponentPortal, PortalModule, TemplatePortal } from "@angular/cdk/portal";
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, EmbeddedViewRef, HostBinding, HostListener, Input, ViewChild, booleanAttribute, inject } from "@angular/core";
import { Subject } from "rxjs";
import { dialogAnimation } from "./animation";

export type TkdDialogState = 'opening' | 'open' | 'closing' | 'closed';

@Component({
    standalone: true,
    selector: 'tkd-dialog-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="container" cdkDrag cdkDragRootElement=".cdk-overlay-pane" [cdkDragDisabled]="!dragable" [ngClass]="classes" [ngStyle]="styles">
            <div *ngIf="dragable" cdkDragHandle id="drag-handle" [ngClass]="dragHandleClass"></div>
            <ng-container cdkPortalOutlet></ng-container>
        </div>
  `,
    imports: [
        PortalModule,
        DragDropModule,
        NgIf,
        NgClass,
        NgStyle
    ],
    animations: [
        dialogAnimation
    ]
})
export class TkdDialogContainerComponent {
    readonly stateChange = new Subject<TkdDialogState>();

    readonly cdr = inject(ChangeDetectorRef);

    // Whether or not the dialog container should be dragable.
    @Input({ transform: booleanAttribute })
    set dragable(v: boolean) {
        this._dragable = v;
        this.cdr.markForCheck();
    }
    get dragable() { return this._dragable };
    private _dragable = false;

    // Additional classes for the dialog container.
    @Input()
    classes: string | string[] | Set<string> = '';

    // Additional classes for the dialog container.
    @Input()
    dragHandleClass: string | string[] | Set<string> = 'drag-handle';

    // Additional styles for the dialog container.
    @Input()
    styles: {
        [klass: string]: any
    } = {};

    // Dialog container animation handling
    @HostBinding('@dialogContainer')
    state: 'enter' | 'exit' = 'enter';

    // The portal outlet used to attach the child portal
    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet!: CdkPortalOutlet;

    // The CdkDrag reference of the dialog container.
    @ViewChild(CdkDrag, { static: true })
    drag!: CdkDrag;

    // Attaches a component portal to the dialog container and returns the
    // {@link @angular/core#ComponentRef}
    attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;

    // Attaches a template portal to the dialog container and returns the
    // {@link @angular/core#EmbeddedViewRef}
    attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;

    attach(portal: ComponentPortal<any> | TemplatePortal<any>): any {
        return this.portalOutlet.attach(portal);
    }

    @HostListener('@dialogContainer.start', ['$event'])
    onAnimationStart({ toState }: AnimationEvent) {
        if (toState === 'enter') {
            this.stateChange.next('opening');
        } else if (toState === 'exit') {
            this.stateChange.next('closing');
        }
    }

    @HostListener('@dialogContainer.done', ['$event'])
    onAnimationEnd({ toState }: AnimationEvent) {
        if (toState === 'enter') {
            this.stateChange.next('open');
        } else if (toState === 'exit') {
            this.stateChange.next('closed');
        }
    }

    /** Starts the exit animation */
    _startExit() {
        this.state = 'exit';
        this.cdr.markForCheck();
    }
}