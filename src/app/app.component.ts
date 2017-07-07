import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants, SupportedLanguages } from '../utils/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'app';

  protected mobileSidebarVisiblity: boolean;

  constructor(private translateService: TranslateService) {

    this.translateService.setDefaultLang(AppConstants.getLanguageCode(SupportedLanguages.ENGLISH));
    this.translateService.use(AppConstants.getLanguageCode(SupportedLanguages.ENGLISH));
    this.mobileSidebarVisiblity = false;
  }

  public toggleMobileSidebarVisiblity(value) {
    this.mobileSidebarVisiblity = value;
  }


}
