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
import { AccordionModule, PaginationModule, TypeaheadModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { QueryListComponent } from './query/list/query-list.component';
import { MobileSidebarNavComponent } from './mobile-sidebar-nav/mobile-sidebar-nav.component';
import { SafeHtml } from '../pipes/safe-html.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JsonTranslationLoader } from '../translation-loader';
import { LocalStorage } from '../utils/local-storage';
import { ApiGateway } from '../services/api.gateway';
import { ResultNotFoundComponent } from './result-not-found/result-not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PoliciesAndPermissionsComponent } from './policies-and-permissions/policies-and-permissions.component';
import { FaqComponent } from './faq/faq.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

export function FSLoaderFactory() {
  return new JsonTranslationLoader();
}

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
    SafeHtml,
    ResultNotFoundComponent,
    AboutUsComponent,
    ContactComponent,
    PrivacyComponent,
    PoliciesAndPermissionsComponent,
    FaqComponent,
    DisclaimerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    APP_ROUTES,
    HttpModule,
    JsonpModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: FSLoaderFactory,
      }
    })
  ],
  providers: [
    DrugLookupService,
    SearchHelper,
    LocalStorage,
    ApiGateway,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
