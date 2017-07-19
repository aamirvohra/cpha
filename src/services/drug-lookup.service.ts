import { Injectable } from '@angular/core';
import { APIURLRepo } from '../config/api-url.repo';
import data from '../test.json';
import { Observable } from 'rxjs/Observable';
import htmlData from '../test.html';
import suggestionData from '../suggestion-search-response.json';
import { DrugInfoHtmlParser } from '../parser/drug-info-html-parser';
import { ApiGateway } from './api.gateway';
import {Request, RequestMethod, Headers} from '@angular/http';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class DrugLookupService {

  constructor(private apiGateway: ApiGateway) {
  }

  public fakeData() {
    return Observable.create(
      observer => {
        observer.next(data);
      }
    );
  }


  public autoComplete(drugVal: string) {
    // return this.http.request(APIURLRepo.AUTOCOMPLETE_LOOK_UP_URL +
    //   '?_dc=1497726277808&publications=IFP&query=Adv&cursorPosition=3&page=1&start=0&limit=25');

    const urlParams = new URLSearchParams();

    urlParams.set('_dc', '1497726277808');
    urlParams.set('publications', 'IFP');
    urlParams.set('query', drugVal);
    // urlParams.set('cursorPosition', '3');
    urlParams.set('cursorPosition', drugVal.length.toString());
    urlParams.set('page', '1');
    urlParams.set('start', '0');
    urlParams.set('limit', '25');

    // const request = new Request({
    //   params: urlParams
    // });
    // request.params = urlParams;

    // const reqHeaders = new Headers();
    // reqHeaders.append('Access-Control-Allow-Origin', '*');
    // reqHeaders.append('Access-Control-Allow-Credentials', 'true');
    // reqHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    // reqHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');



    const request = new Request({
      url: APIURLRepo.AUTOCOMPLETE_LOOK_UP_URL,
      method: RequestMethod.Get,
      params: urlParams,
      // headers: reqHeaders,
    });

    // return this.fakeData()
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
        const parser = new DrugInfoHtmlParser(data.payload);
        return parser.parse();
      });
    // return Observable.create(
    //     observer => {
    //       // observer.next(htmlData);
    //       const parser = new DrugInfoHtmlParser(htmlData);
    //       observer.next(parser.parse());
    //     }
    // )
  }

  public getListInfo(query: string) {
    // return Observable.create(
    //     observer => {
    //       observer.next(suggestionData);
    //     }
    // );

    const urlParams = new URLSearchParams();

    urlParams.set('_dc', '1497726277808');
    urlParams.set('publications', 'IFP');
    urlParams.set('query', query);

    urlParams.set('cursorPosition', query.length.toString());
    urlParams.set('page', '1');
    urlParams.set('start', '0');
    urlParams.set('limit', '25');

    const request = new Request({
      url: APIURLRepo.LOOK_UP_URL,
      method: RequestMethod.Get,
      params: urlParams,
      // headers: reqHeaders,
    });

    return this.apiGateway.request(request);
  }

}
