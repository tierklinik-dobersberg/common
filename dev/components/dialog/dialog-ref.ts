import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentRef, EmbeddedViewRef } from "@angular/core";
import { TkdDialogContainerComponent, TkdDialogState } from "./dialog.container";
import { Observable, PartialObserver, Subject, filter, take } from "rxjs";

export class TkdDialogRef<Data, ReturnType, C extends ComponentRef<unknown> | EmbeddedViewRef<unknown>> {
    readonly closed = new Subject<ReturnType | null>();

    private value: ReturnType | null = null;

    get stateChange(): Observable<TkdDialogState> {
        return this.container.stateChange;
    }

    get overlay(): OverlayRef {
        return this.overlayRef;
    }

    get contentRef(): C {
        return this._contentRef;
    }

    private _contentRef!: C;

    /** @private - Only for use by TkdDialogService */
    setContentRef(ref: C) {
        this._contentRef = ref;
    }


    constructor(
        private overlayRef: OverlayRef,
        private container: TkdDialogContainerComponent,
        public readonly data: Data,
    ) {
        this.container.stateChange
            .pipe(
                filter(state => state === 'closed'),
                take(1)
            )
            .subscribe(() => {
                this.overlayRef.detach();
                this.overlayRef.dispose();
                this.closed.next(this.value);
                this.closed.complete();
            });
    }

    /** onAction only emits if close() is called with action. */
    onAction(action: ReturnType, observer: PartialObserver<ReturnType> | ((value: ReturnType) => void)): this {
        (this.closed.pipe(filter(val => val === action)) as Observable<ReturnType>)
            .subscribe(observer as any); // typescript does not select the correct type overload here.
        return this;
    }

    /** Close the dialog with the specified result, if any */
    close(result?: ReturnType) {
        this.value = result ?? null;
        this.container._startExit();
    }
}