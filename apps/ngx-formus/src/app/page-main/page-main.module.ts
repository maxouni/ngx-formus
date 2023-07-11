import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageMainRoutingModule } from './page-main-routing.module';
import { PageMainComponent } from './page-main.component';
import { FormusInputModule } from '@ngx-formus/kit';

@NgModule({
  declarations: [PageMainComponent],
  imports: [CommonModule, PageMainRoutingModule, FormusInputModule],
})
export class PageMainModule {}
