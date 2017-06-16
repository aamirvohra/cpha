import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
