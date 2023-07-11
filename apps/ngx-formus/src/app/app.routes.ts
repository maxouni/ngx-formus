import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./page-main/page-main.module').then((m) => m.PageMainModule),
  },
];
