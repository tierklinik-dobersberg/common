import { NgIf, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList, ViewChild, booleanAttribute, inject } from "@angular/core";
import { TkdDropdown, TkdDropdownDirective } from "@tierklinik-dobersberg/angular/dropdown";
import { TkdSelectOption } from "./option";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { isIdentifier } from "@angular/compiler";

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
    ]
})
export class TkdSelect implements OnInit, ControlValueAccessor {
    private readonly cdr = inject(ChangeDetectorRef);

    private _onBlur = () =>  {}
    private _onChange = (v: any) => {};

    @ViewChild(TkdDropdown, { static: true })
    dropdown!: TkdDropdown;

    @ContentChildren(TkdSelectOption)
    options!: QueryList<TkdSelectOption>;

    @Input({transform: booleanAttribute})
    disabled = false;

    /** The currently selected option */
    selectedItem: TkdSelectOption | null = null;

    ngOnInit(): void {
        
    }

    itemClicked(item?: TkdSelectOption, event?: MouseEvent) {
        this.options
            .forEach(opt => {
                debugger
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
        this.cdr.markForCheck();        
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
        this.selectedItem = opt || null;
        this._onChange(this.selectedItem?.value || null);

        this.dropdown?.close();

        this.cdr.markForCheck();
    }
}

