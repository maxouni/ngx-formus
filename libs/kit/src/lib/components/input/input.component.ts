import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  forwardRef,
  Injector,
  Input,
  ViewChild
} from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { NgxFormInputType, NgxFormInputValue, NgxRequiredType } from "../../interfaces";
import { distinctUntilChanged, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'ngx-formus-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  /**
   * Аттрибут ID
   */
  @Input() identifier: string =
    'c__' + Math.random().toString().replace('.', '');
  /**
   * Обязательный
   */
  @Input() required: NgxRequiredType | undefined;
  /**
   * Паттерн для валидации по регулярному выражению
   */
  @Input() pattern: string | RegExp | undefined;
  /**
   * Лейбл
   */
  @Input() label: string | undefined;
  /**
   * Текст ошибки
   */
  @Input() error: string | undefined;
  /**
   * Тип поля text | number | password | search
   */
  @Input() type: NgxFormInputType = 'text';
  /**
   * Значение плейсхолдера
   */
  @Input() placeholder: string | undefined;
  /**
   * Показать значок "глаз" для пароля
   */
  @Input() enableEye: boolean | undefined;
  /**
   * Показать значок "лупы" для поиска
   */
  @Input() enableLoop: boolean | undefined;
  /**
   * Расположение иконок
   */
  @Input() iconRtl: 'left' | 'right' = 'right';
  /**
   * Описание
   */
  @Input() description: string | undefined;
  /**
   * Название контрола формы
   */
  @Input() formControlName: string | undefined;
  /**
   * Дополниетльный класс поля
   */
  @Input() className: string | undefined;
  /**
   * Максимальная длина поля
   */
  @Input() maxLength: number | undefined;
  /**
   * Флаг "Не показывать ошибки валидации"
   */
  @Input() disableErrorMessage: boolean | undefined;
  /**
   * Контрол формы
   */
  public control: FormControl | null = null;
  /**
   * Флаг изменения контрола
   */
  public blured: boolean | undefined;

  private readonly destroy$: Subject<unknown> = new Subject<unknown>();

  @ViewChild('input', { static: true }) inputRef: ElementRef | undefined;

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef,
  ) // @Optional()
  // @Inject(NgxmPasswordEyeDirective)
  // readonly ngxmPasswordEye: NgxmPasswordEyeDirective | null,
  {}

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get<any>(NgControl as any, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
      this.control.statusChanges
        .pipe(
          distinctUntilChanged((a, b) => a === b),
          takeUntil(this.destroy$),
        )
        .subscribe((status) => {
          if (status === 'DISABLED') {
            this.control?.disable();
          } else {
            this.control?.enable();
          }
          this.cd.markForCheck();
        });
    } else {
      console.warn('Input is not defined');
    }
  }

  private prepareValue(value: NgxFormInputValue): string {
    if (this.type === 'text' && this.maxLength) {
      return value.substring(0, this.maxLength);
    } else {
      return value;
    }
  }

  private changeHandler(ev: Event | KeyboardEvent): void {
    const target = ev.target as HTMLInputElement;
    this.change(this.prepareValue(target.value));
  }

  patchValue(value: NgxFormInputValue): void {
    if (this.inputRef) {
      this.inputRef.nativeElement.value = this.prepareValue(value);
    }
    setTimeout(() => {
      this.cd.markForCheck();
    }, 100);
  }

  onChange(ev: Event) {
    this.changeHandler(ev);
  }

  onBlur() {
    this.blured = true;
  }

  onKeyUp(ev: KeyboardEvent) {
    this.changeHandler(ev);
  }

  change(value: NgxFormInputValue) {
    this.cd.markForCheck();
    this.propagateChange(value);
  }

  propagateChange = (_: string) => {};

  touchedChange = (_: string) => {};

  writeValue(value: NgxFormInputValue): void {
    this.patchValue(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedChange = fn;
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
