import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { LocalStorage } from '../../utils/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from '../../utils/app.constants';

@Component({
  selector: 'app-mobile-sidebar-nav',
  templateUrl: './mobile-sidebar-nav.component.html',
  styleUrls: ['./mobile-sidebar-nav.component.scss'],
})
export class MobileSidebarNavComponent {

  @Output('menuClickEvent')
  menuClickEvent = new EventEmitter();

  protected languageChangeText: string;
  private currentLanguage: string;

  protected readonly twitter_url = AppConstants.TWITTER_URL;
  protected readonly facebook_url = AppConstants.FACEBOOK_URL;

  constructor(private translationService: TranslateService,
              private localStorage: LocalStorage) {
    this.menuClickEvent = new EventEmitter();
    this.currentLanguage = this.translationService.currentLang;
    this.languageChangeText = this.getLanguageText();
  }

  @HostListener('click', ['$event.target'])
  onClick(event) {
    this.menuClickEvent.emit(event);
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

  openInNewTab(url) {
    window.open(url, '_blank');
  }

}
