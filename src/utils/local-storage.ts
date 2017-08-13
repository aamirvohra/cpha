/**
 * Created by avohra on 7/6/2017.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LocalStorage {

  private static readonly PREFERRED_LANG: string = 'pref_lang';

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
}
