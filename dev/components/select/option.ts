import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit, TemplateRef, ViewChild, booleanAttribute, inject } from "@angular/core";
import { NgIconsModule, provideIcons } from "@ng-icons/core";
import { TkdDropdown } from "@tierklinik-dobersberg/angular/dropdown";
import { heroCheckMini } from '@ng-icons/heroicons/mini';
import { TkdSelect } from "./select";
import { NgTemplateOutlet } from "@angular/common";

@Component({
    selector: 'tkd-option',
    standalone: true,
    template: `
        <ng-template #valueTemplate>
            <span><ng-content></ng-content></span>
        </ng-template>

        <ng-icon [name]="selected ? 'heroCheckMini' : ''"></ng-icon>
        <ng-container *ngTemplateOutlet="valueTemplate"></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TkdDropdown,
        NgIconsModule,
        NgTemplateOutlet,
    ],
    providers: [
        provideIcons({heroCheckMini})
    ],
    styles: [
        `
        :host {
            @apply flex flex-row gap-3 items-center cursor-pointer hover:bg-subtle px-5 py-2 lg:px-3 lg:py-1 text-sm lg:text-[0.8rem] font-light; 
        }
        `
    ]
})
export class TkdSelectOption<T = any> {
    private readonly selectComponent = inject(TkdSelect)
    private readonly cdr = inject(ChangeDetectorRef);

    @ViewChild(TkdDropdown, { static: true })
    dropdown!: TkdDropdown;

    @ViewChild('valueTemplate', { read: TemplateRef, static: true })
    templateRef!: TemplateRef<HTMLElement>;

    @Input({transform: booleanAttribute})
    set selected(v: boolean) {
        this._selected = v;

        // call markForCheck as selected=xx will be used from withing TkdSelect
        this.cdr.markForCheck();
    }
    get selected() { return this._selected }
    private _selected = false;

    @Input()
    value!: T;

    @HostListener('click', ['$event'])
    handleItemClick(event: MouseEvent) {
        this.selectComponent.itemClicked(this, event);
    }
}



