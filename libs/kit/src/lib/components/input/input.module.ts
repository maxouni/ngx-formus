import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { ErrorMessageModule } from '../../pipes';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, ErrorMessageModule],
  exports: [InputComponent],
})
export class FormusInputModule {}
