/**
 * Created by avohra on 7/6/2017.
 */

export enum SupportedLanguages {
  ENGLISH,
  FRENCH
}

export class AppConstants {
  static readonly ENGLISH_CODE = 'en';
  static readonly FRENCH_CODE = 'fr';


  static getLanguageCode(language: SupportedLanguages) {
    let languageCode: string;
    switch (language) {
      case language['ENGLISH']:
        languageCode = AppConstants.ENGLISH_CODE;
        break;
      case language['FRENCH']:
        languageCode = AppConstants.ENGLISH_CODE;
        break;
      default:
        languageCode = AppConstants.ENGLISH_CODE;
    }

    return languageCode;
  }
}
