import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMainComponent } from './page-main.component';

const routes: Routes = [
  {
    path: '',
    component: PageMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageMainRoutingModule {}
