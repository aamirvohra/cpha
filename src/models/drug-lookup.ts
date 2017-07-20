/**
 * Created by avohra on 7/19/2017.
 */


import { URLSearchParams } from '@angular/http';

export interface DrugLookupInterface {
  query: string;
  page: string;
  start: string;
  limit: string;
}

export class DrugLookup implements DrugLookupInterface {
  query: string;
  page: string;
  start: string;
  limit: string;

  static getLookupQueryParams(queryObj: DrugLookup): URLSearchParams {
    const urlParams = new URLSearchParams();

    urlParams.set('query', queryObj.query);
    urlParams.set('cursorPosition', queryObj.query.length.toString());
    urlParams.set('page', queryObj.page ? queryObj.page : '1' );
    urlParams.set('start', queryObj.start ? queryObj.start : '0');
    urlParams.set('limit', queryObj.limit ? queryObj.limit : '25');

    return urlParams;
  }



}
