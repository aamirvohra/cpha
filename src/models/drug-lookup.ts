/**
 * Created by avohra on 7/19/2017.
 */


import { URLSearchParams } from '@angular/http';
import { LocalStorage } from '../utils/local-storage';

export type sort = 'RELEVANCE' | 'ALPHABETICAL'

export interface DrugLookupInterface {
  query: string;
  page: string;
  start: string;
  limit: string;
  sortBy: sort;
  locale: string;
}

export class DrugLookup implements DrugLookupInterface {
  query: string;
  page: string;
  start: string;
  limit: string;
  sortBy: sort;
  locale: string;


  static getLookupQueryParams(queryObj: DrugLookup): URLSearchParams {
    const urlParams = new URLSearchParams();

    urlParams.set('query', queryObj.query);
    urlParams.set('cursorPosition', queryObj.query.length.toString());
    urlParams.set('page', queryObj.page ? queryObj.page : '1' );
    urlParams.set('start', queryObj.start ? queryObj.start : '0');
    urlParams.set('limit', queryObj.limit ? queryObj.limit : '25');
    urlParams.set('sortBy', queryObj.sortBy ? queryObj.sortBy : 'RELEVANCE');
    urlParams.set('locale', LocalStorage.getPreferredLang());

    return urlParams;
  }



}
