/**
 * Created by avohra on 7/6/2017.
 */

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import * as enTranslation from './assets/i18n/en.json';
import * as frTranslation from './assets/i18n/fr.json';


export class JsonTranslationLoader implements TranslateLoader {

  constructor(private prefix: string = '/assets/i18n/',
              private suffix: string = '.json') {}

  public getTranslation(lang: string): Observable<any> {
    if (lang === 'fr') {
      return Observable.of(frTranslation);
    }

    return Observable.of(enTranslation);
  }

}
