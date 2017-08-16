import { Injectable } from '@angular/core';
import { APIURLRepo } from '../config/api-url.repo';
import data from '../test.json';
import { Observable } from 'rxjs/Observable';
import htmlData from '../test.html';
import multiDrugInfo from '../test3_fr.html';
import suggestionData from '../suggestion-search-response.json';
import { DrugInfoHtmlParser } from '../parser/drug-info-html-parser';
import { ApiGateway } from './api.gateway';
import { Request, RequestMethod, Headers, URLSearchParams } from '@angular/http';
import { DrugLookup, sort } from '../models/drug-lookup';

@Injectable()
export class DrugLookupService {

  constructor(private apiGateway: ApiGateway) {
  }

  public autoComplete(drugVal: string) {
    const lookupQuery = new DrugLookup();
    lookupQuery.query = drugVal;

    const queryParams: URLSearchParams = DrugLookup.getLookupQueryParams(lookupQuery);

    const request = new Request({
      url: APIURLRepo.AUTOCOMPLETE_LOOK_UP_URL,
      method: RequestMethod.Get,
      params: queryParams,
    });

    return this.apiGateway.request(request)
      .map(
        data => {
          for (const obj of data) {
            obj.item = obj.item.replace('<b>', '');
            obj.item = obj.item.replace('</b>', '');

            if (obj.manufacturers) {
              obj.item = obj.item + ' (' + obj.manufacturers + ')';
            }


            if (obj.suggestionType === 1) {
              obj.suggestion = 'Document'
            } else {
              obj.suggestion = 'Suggestions'
            }
          }

          return data;
        }
      );
  }

  public detailedInfo(docLocatorPath: string) {
    const req = new Request({
      method: RequestMethod.Get,
      url: APIURLRepo.API_DOCUMENTS_URL + '/' + docLocatorPath
    });

    return this.apiGateway.request(req).map(
      data => {
        if (data.headers['Status-Code'] !== '404') {
          const parser = new DrugInfoHtmlParser(data.payload);
          return parser.parse();
      }
    });

    // return Observable.create(
    //   obs => {
    //     const parser = new DrugInfoHtmlParser(multiDrugInfo);
    //     // const parser = new DrugInfoHtmlParser(htmlData);
    //     return obs.next(parser.parse())
    //   }
    // )
  }

  public getListInfo(query: string, sortBy: sort, pageNumber?: number) {
    const lookupQuery = new DrugLookup();
    lookupQuery.query = query;
    lookupQuery.sortBy = sortBy;
    lookupQuery.page = pageNumber ? pageNumber.toString() : null;
    lookupQuery.start = pageNumber ? ( (pageNumber - 1) * 25).toString() : null;

    const request = new Request({
      url: APIURLRepo.LOOK_UP_URL,
      method: RequestMethod.Get,
      params: DrugLookup.getLookupQueryParams(lookupQuery),
    });

    return this.apiGateway.request(request);
  }

}
