import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from '../../utils/app.constants';
import { LocalStorage } from '../../utils/local-storage';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  protected languageChangeText: string;
  private currentLanguage: string;

  constructor(private translationService: TranslateService,
              private localStorage: LocalStorage) {
    this.currentLanguage = this.translationService.currentLang;
    this.languageChangeText = this.getLanguageText();
  }

  changeLang() {
    this.translationService.use(this.currentLanguage === AppConstants.ENGLISH_CODE
      ? AppConstants.FRENCH_CODE : AppConstants.ENGLISH_CODE);

    this.currentLanguage = this.translationService.currentLang;
    this.languageChangeText = this.getLanguageText();

    this.localStorage.setPreferredLang(this.currentLanguage);
  }

  getLanguageText() {
    return this.currentLanguage === AppConstants.ENGLISH_CODE ? 'Français' : 'English';
  }

}
