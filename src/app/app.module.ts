import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { DrugLookupService } from '../services/drug-lookup.service';
import { QueryComponent } from './query/query.component';
import { QueryDetailComponent } from './query/detail/query-detail.component';
import { SearchComponent } from './search/search.component';
import { SearchHelper } from '../services/search-helper';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { TypeaheadModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { QueryListComponent } from './query/list/query-list.component';
import { MobileSidebarNavComponent } from './mobile-sidebar-nav/mobile-sidebar-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TopMenuComponent,
    FooterComponent,
    QueryComponent,
    QueryDetailComponent,
    SearchComponent,
    QueryListComponent,
    MobileSidebarNavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    APP_ROUTES,
    HttpModule,
    JsonpModule,
    TypeaheadModule.forRoot(),
  ],
  providers: [
    DrugLookupService,
    SearchHelper,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
