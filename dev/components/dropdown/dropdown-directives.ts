import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { DestroyRef, Directive, HostBinding, Input, OnInit, Renderer2, inject, numberAttribute } from "@angular/core";
import { TkdDropdown } from "./dropdown";
import { coerceArray } from "@angular/cdk/coercion";

export type TkdDropdownOpenMode = 'click' | 'hover' | 'enter';

@Directive({
    standalone: true,
    selector: '[tkdDropdown]',
    exportAs: "tkdDropdown"
})
export class TkdDropdownDirective extends CdkOverlayOrigin implements OnInit {
    @Input('tkdOpenMode')
    openMode: TkdDropdownOpenMode | TkdDropdownOpenMode[] = ['click', 'enter']

    @Input('tkdDropdown')
    dropdownInstance!: TkdDropdown;

    @HostBinding('[attr.tabindex]')
    @Input({transform: numberAttribute})
    tabindex = 0;

    private readonly renderer = inject(Renderer2);
    private readonly destroyRef = inject(DestroyRef);

    ngOnInit(): void {

        const mode = coerceArray(this.openMode);

        mode.forEach(mode => {
            let cleanup = () => {};

            switch (mode) {
                case 'click':
                    cleanup = this.renderer.listen(this.elementRef.nativeElement, 'click', () => 
                        this.dropdownInstance.toggle(this)
                    );
                    break;

                case 'enter':
                    cleanup = this.renderer.listen(this.elementRef.nativeElement, 'keydown', (event: KeyboardEvent) => {
                        if (event.key !== 'Enter') {
                            return
                        }

                        if (!this.dropdownInstance.isOpen) {
                            this.dropdownInstance.open(this);
                        }
                    })
                    break;

                case 'hover':
                    cleanup = this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => {
                        this.dropdownInstance.open(this);
                    })
                    break;
            }

            this.destroyRef.onDestroy(cleanup);
        })

    }
}
