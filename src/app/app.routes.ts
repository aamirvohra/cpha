/**
 * Created by avohra on 6/15/2017.
 */

import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo : '/about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
