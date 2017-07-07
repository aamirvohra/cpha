import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants, SupportedLanguages } from '../utils/app.constants';
import { LocalStorage } from '../utils/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'app';

  protected mobileSidebarVisiblity: boolean;

  constructor(private translateService: TranslateService,
              private localStorage: LocalStorage) {
    this.translateService.setDefaultLang(AppConstants.getLanguageCode(SupportedLanguages.ENGLISH));

    this.translateService.use(this.localStorage.preferredLang.getValue());
    this.mobileSidebarVisiblity = false;
  }

  public toggleMobileSidebarVisiblity(value) {
    this.mobileSidebarVisiblity = value;
  }


}
