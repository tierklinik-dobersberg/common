import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewChild, booleanAttribute, inject, numberAttribute } from "@angular/core";
import { NgIconsModule, provideIcons } from "@ng-icons/core";
import { TkdDropdown } from "@tierklinik-dobersberg/angular/dropdown";
import { heroCheckMini } from '@ng-icons/heroicons/mini';
import { TkdSelect } from "./select";
import { NgClass, NgIf, NgTemplateOutlet } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Highlightable, ListKeyManagerOption } from "@angular/cdk/a11y";

@Component({
    selector: 'tkd-option',
    standalone: true,
    template: `
        <ng-icon *ngIf="selected" name="heroCheckMini"></ng-icon>
        <span [ngClass]="{
            'ml-3 pl-[1em]': !selected
        }" [innerHTML]="label"></span> 

        <div class="hidden" #content>
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TkdDropdown,
        NgIconsModule,
        NgTemplateOutlet,
        NgClass,
        NgIf
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
export class TkdSelectOption<T = any> implements AfterViewInit, ListKeyManagerOption, Highlightable {
    private readonly selectComponent = inject(TkdSelect)
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly sanitizer = inject(DomSanitizer);

    @ViewChild('content', { read: ElementRef, static: true})
    contentElement!: ElementRef<HTMLDivElement>;

    @ViewChild(TkdDropdown, { static: true })
    dropdown!: TkdDropdown;

    @HostBinding('[attr.tabindex]')
    @Input({transform: numberAttribute})
    tabindex = -1;

    @HostBinding('class')
    classes = '';

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

    @Input()
    label!: string | SafeHtml;

    getLabel() {
        if (typeof this.label === 'string') {
            return this.label;
        }

        return this.contentElement.nativeElement.innerText;
    }

    @HostListener('click', ['$event'])
    handleItemClick(event: MouseEvent) {
        this.selectComponent.itemClicked(this, event);
    }

    setActiveStyles(): void {
        this.classes = 'bg-subtle';
        this.cdr.markForCheck();
    }

    setInactiveStyles(): void {
        this.classes = '';
        this.cdr.markForCheck();
    }

    ngAfterViewInit(): void {
        if (!this.label) {
            this.label = this.sanitizer.bypassSecurityTrustHtml(this.contentElement.nativeElement.innerHTML)
            this.cdr.detectChanges();
        }
    }
}



