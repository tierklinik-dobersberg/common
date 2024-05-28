import { AfterRenderPhase, Component, DestroyRef, ElementRef, OnInit, Renderer2, afterNextRender, booleanAttribute, computed, effect, forwardRef, inject, input, model, output, signal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { hlm } from "@spartan-ng/ui-core";
import { HlmInputDirective } from "@tierklinik-dobersberg/angular/input";
import { LayoutService } from "@tierklinik-dobersberg/angular/layout";
import { ClassValue } from "clsx";
import { Datepicker } from 'tw-elements';

@Component({
  selector: 'tkd-datepicker',
  exportAs: 'tkdDatepicker',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputDirective,
  ],
  template: `
    <input type="text" [(ngModel)]="value" hlmInput [class]="_computedClass()">
  `,
  styles: [
    `:host {
      @apply block relative;
    }`
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TkdDatepickerComponent) }
  ]
})
export class TkdDatepickerComponent implements OnInit, ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private readonly element = inject(ElementRef);
  private readonly layout = inject(LayoutService).withAutoUpdate();

  private picker!: typeof Datepicker;

  /** The current value of the picker. */
  value = model('', {})

  /** Whether or not future dates should be disabled. */
  disableFuture = input(false, { transform: booleanAttribute })

  /** The title for the datepicker overlay. */
  title = input.required();

  /** Whether or not the picker is currently open */
  openChange = output<boolean>();

  /** Support for custom user classes. */
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => 
    hlm(this.userClass()),
  );

  /** Whether or not the picker is open */
  private readonly _isOpen = signal(false);

  /** Public readonly access to the isOpen signal */
  public readonly isOpen = this._isOpen.asReadonly();

  ngOnInit() {
    this.picker = new Datepicker(this.element.nativeElement, {
      disableFuture: this.disableFuture(),
      format: "yyyy-mm-dd",
      confirmDateOnSelect: true,
      startDay: 1,
      monthsFull: [
        'Jänner',
        'Feburar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
      monthsShort: [
        'Jän',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez',
      ],
      weekdaysFull: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
      ],
      weekdaysNarrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
      weekdaysShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
      title: this.title(),
    });

    this.destroyRef.onDestroy(() => this.picker.dispose())

    effect(() => {
      const disableFuture = this.disableFuture();
      const title = this.title();

      this.picker?.update({
        disableFuture,
        title,
      })
    });

    effect(() => {
      const md = this.layout.md();

      if (this._isOpen()) {
        this.picker.close();
      }

      this.picker.update({inline: md});
    })

    effect(() => {
      this._onChange()(this.value());
    })

    let cleanup = this.renderer.listen(this.element.nativeElement, 'blur', () => this._onBlur()())
    this.destroyRef.onDestroy(cleanup);

    cleanup = this.renderer.listen(this.element.nativeElement, 'open.te.datepicker', () => {
      this._isOpen.set(true);
      this.openChange.emit(true);
    })
    this.destroyRef.onDestroy(cleanup)

    cleanup = this.renderer.listen(this.element.nativeElement, 'close.te.datepicker', () => {
      this._isOpen.set(false);
      this.openChange.emit(false)
    })
    this.destroyRef.onDestroy(cleanup)
  }

  setDisabledState(isDisabled: boolean): void {
    afterNextRender(() => {
      if (isDisabled) {
        this.renderer.setAttribute(this.element.nativeElement, 'disabled', '')
      } else {
        this.renderer.removeAttribute(this.element.nativeElement, 'disabled')
      }
    }, {
      phase: AfterRenderPhase.Write
    })
  }

  private readonly _onChange = signal((_: any) => { });
  registerOnChange(fn: any): void {
    this._onChange.set(fn);
  }

  private readonly _onBlur = signal(() => { });
  registerOnTouched(fn: any): void {
    this._onBlur.set(fn);
  }

  writeValue(obj: string): void {
    this.value.set(obj);
  }

  open() {
    this.picker?.open()
  }

  close() {
    this.picker?.close();
  }
}
