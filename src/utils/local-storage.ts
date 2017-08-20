/**
 * Created by avohra on 7/6/2017.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LocalStorage {

  private static readonly PREFERRED_LANG: string = 'pref_lang';
  private static readonly SURVEY_USER_TYPE: string = 'survey_user_type';

  public preferredLang: BehaviorSubject<string>;

  public static getPreferredLang() {
    return localStorage.getItem(LocalStorage.PREFERRED_LANG);
  }

  constructor() {
    this.preferredLang = new BehaviorSubject(localStorage.getItem(LocalStorage.PREFERRED_LANG));
  }

  setPreferredLang(lang: string) {
    localStorage.setItem(LocalStorage.PREFERRED_LANG, lang);

    this.preferredLang.next(lang);
  }

  setSurveyUserType(userType: string) {
    localStorage.setItem(LocalStorage.SURVEY_USER_TYPE, userType)
  }

  getServeyUserType(): string {
    return localStorage.getItem(LocalStorage.SURVEY_USER_TYPE);
  }
}
