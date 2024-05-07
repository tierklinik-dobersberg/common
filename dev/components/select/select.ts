import { NgIf, NgTemplateOutlet } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, HostBinding, HostListener, Input, OnInit, QueryList, ViewChild, booleanAttribute, inject, numberAttribute } from "@angular/core";
import { TkdDropdown, TkdDropdownDirective } from "@tierklinik-dobersberg/angular/dropdown";
import { TkdSelectOption } from "./option";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ActiveDescendantKeyManager, ListKeyManager } from '@angular/cdk/a11y';

@Component({
    standalone: true,
    selector: 'tkd-select',
    templateUrl: './select.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TkdDropdown,
        TkdDropdownDirective,
        NgTemplateOutlet,
        NgIf,
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: TkdSelect, multi: true }
    ],
    styles: [
        `
        :host {
            display: block;
        }
        `
    ],
})
export class TkdSelect implements AfterViewInit, ControlValueAccessor {
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly host = inject(ElementRef);

    private keyManager!: ActiveDescendantKeyManager<TkdSelectOption>;

    private _onBlur = () =>  {}
    private _onChange = (v: any) => {};

    @ViewChild(TkdDropdown, { static: true })
    dropdown!: TkdDropdown;

    @ViewChild(TkdDropdownDirective, { static: true })
    trigger!: TkdDropdownDirective;

    @ContentChildren(TkdSelectOption)
    options!: QueryList<TkdSelectOption>;

    @Input({transform: booleanAttribute})
    disabled = false;

    @Input()
    placeholder = 'Please select'

    /** The currently selected option */
    selectedItem: TkdSelectOption | null = null;

    @Input({transform: numberAttribute})
    tabindex = 0;

    @HostListener('keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            if (this.dropdown?.isOpen && this.keyManager.activeItem && this.selectedItem !== this.keyManager.activeItem) {
                this.itemClicked(this.keyManager.activeItem!);
            }

            return;
        };

        this.keyManager?.onKeydown(event);
    }

    @HostListener('blur')
    handleBlur() {
        this._onBlur();
    }

    ngAfterViewInit(): void {
       this.keyManager = new ActiveDescendantKeyManager(this.options)
        .withHomeAndEnd()
        .withTypeAhead()
        .withWrap()
        .withVerticalOrientation()
    }

    itemClicked(item?: TkdSelectOption, event?: MouseEvent) {
        this.options
            .forEach(opt => {
                opt.selected = opt === item;
            });

        this.setSelected(item);
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onBlur = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        
    }

    writeValue(obj: any): void {
        const option = this.options?.find(opt => opt.value === obj);
        if (!!option) {
            this.itemClicked(option)
        } else {
            this.setSelected(undefined);
        }
    }

    private setSelected(opt?: TkdSelectOption) {
        const index = Array.from(this.options).findIndex(o => o === opt);
        if (index >= 0) {
            this.keyManager.setActiveItem(index);
        }

        this.selectedItem = opt || null;
        this._onChange(this.selectedItem?.value || null);

        this.dropdown?.close();

        this.cdr.markForCheck();
    }

    width = () => {
        return (this.host.nativeElement as HTMLElement).getBoundingClientRect()?.width || 'fit-content';
    }
}

