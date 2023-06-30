import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxFormErrorMsgModel } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private errorTranslations$: BehaviorSubject<NgxFormErrorMsgModel> =
    new BehaviorSubject<NgxFormErrorMsgModel>({});

  set errorTranslations(translations: NgxFormErrorMsgModel) {
    this.errorTranslations$.next({
      ...this.errorTranslations$.value,
      ...translations,
    });
  }

  getErrorTranslations(): Observable<NgxFormErrorMsgModel> {
    return this.errorTranslations$.asObservable();
  }
}
