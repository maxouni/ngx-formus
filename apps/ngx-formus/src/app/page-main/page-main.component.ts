import { Component } from '@angular/core';
import {
  ErrorMessageService,
  NGX_FORM_PATTERN,
  NgxFormInputType,
  NgxFormPattern,
} from '@ngx-formus/kit';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-formus-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class PageMainComponent {
  paramsType: NgxFormInputType = 'text';
  paramsRequired = 'false';
  paramsShowEye = 'false';
  paramsShowLoop = 'false';

  get paramsDisabled(): 'false' | 'true' {
    return 'false';
  }

  set paramsDisabled(flag: 'false' | 'true') {
    if (flag === 'true') {
      this.testControl?.disable();
    } else {
      this.testControl?.enable();
    }
  }

  paramsLabel = 'Test input control';
  paramsPattern: keyof NgxFormPattern = 'email';
  paramsError = 'Error text';
  paramsDescription = 'Test input control description';

  readonly form: FormGroup = this.fb.group(
    {
      testControl: this.fb.control(null, []),
    },
    {}
  );

  get testControl(): AbstractControl | null {
    return this.form.get('testControl');
  }

  patterns: NgxFormPattern = NGX_FORM_PATTERN;

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private ngxInputService: ErrorMessageService
  ) {
    translate.setDefaultLang('en');
    translate.use('en').subscribe(() => {
      ngxInputService.errorTranslations = {
        errorRequiredMsg: this.translate.instant('error.required'),
      };
    });
  }
}
