import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants, SupportedLanguages } from '../utils/app.constants';
import { LocalStorage } from '../utils/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {
  title = 'app';

  public displaySurvey: boolean;

  public mobileSidebarVisiblity: boolean;

  constructor(private translateService: TranslateService,
              private localStorage: LocalStorage) {

    if (!LocalStorage.getPreferredLang()) {
      this.translateService.setDefaultLang(AppConstants.getLanguageCode(SupportedLanguages.ENGLISH));
      localStorage.setPreferredLang(this.translateService.getDefaultLang());
    }

    if (! this.localStorage.getServeyUserType()) {
      this.displaySurvey = true;
    }

    this.translateService.use(this.localStorage.preferredLang.getValue());


    this.mobileSidebarVisiblity = false;
  }

  ngOnInit() {
    this.translateService.onLangChange.subscribe(
      () => {
        location.reload();
      }
    );
  }


  public toggleMobileSidebarVisiblity(value) {
    this.mobileSidebarVisiblity = value;
  }

  mobileMenuClickEvent() {
    this.mobileSidebarVisiblity = false;
  }


  routerOutletClick() {
    if (this.mobileSidebarVisiblity) {
      this.mobileSidebarVisiblity = false;
    }
  }
}
