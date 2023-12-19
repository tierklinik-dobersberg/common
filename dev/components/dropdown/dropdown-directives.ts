import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { DestroyRef, Directive, Input, OnInit, Renderer2, inject } from "@angular/core";
import { TkdDropdown } from "./dropdown";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { debounce, of, take } from "rxjs";

export type TkdDropdownOpenMode = 'click' | 'hover';

@Directive({
    standalone: true,
    selector: '[tkdDropdown]',
})
export class TkdDropdownDirective extends CdkOverlayOrigin implements OnInit {
    @Input('tkdOpenMode')
    openMode: TkdDropdownOpenMode = 'click'

    @Input('tkdDropdown')
    dropdownInstance!: TkdDropdown;

    private readonly renderer = inject(Renderer2);
    private readonly destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        let cleanup = () => {};

        if (this.openMode === 'click') {
            cleanup = this.renderer.listen(this.elementRef.nativeElement, 'click', () => 
                this.dropdownInstance.toggle(this)
            );
        } else if (this.openMode === 'hover') {
            cleanup = this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => {
                this.dropdownInstance.open(this);
            })
        }

        this.destroyRef.onDestroy(cleanup);
    }
}
