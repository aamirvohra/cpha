/**
 * Created by avohra on 6/15/2017.
 */

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QueryComponent } from './query/query.component';
import { QueryDetailComponent } from './query/detail/query-detail.component';
import { QueryListComponent } from './query/list/query-list.component';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'query',
    children: [
      {
        path: '',
        component: QueryComponent,
      },
      {
        path: 'list',
        component: QueryListComponent,
      },
      {
        path: 'detail',
        component: QueryDetailComponent,
      },
    ]

  },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
