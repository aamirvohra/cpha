import { Injectable } from '@angular/core';
import { APIURLRepo } from '../config/api-url.repo';
import data from '../test.json';
import { Observable } from 'rxjs/Observable';
import htmlData from '../test.html';
import suggestionData from '../suggestion-search-response.json';
import { DrugInfoHtmlParser } from '../parser/drug-info-html-parser';
import { ApiGateway } from './api.gateway';
import { Request } from '@angular/http';

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


  public autoComplete() {
    // return this.http.request(APIURLRepo.AUTOCOMPLETE_LOOK_UP_URL +
    //   '?_dc=1497726277808&publications=IFP&query=Adv&cursorPosition=3&page=1&start=0&limit=25');

    const urlParams = new URLSearchParams();
    urlParams.set('query', '');
    urlParams.set('_dc', '');
    urlParams.set('publications', '');
    urlParams.set('cursorPosition', '');
    urlParams.set('page', '');
    urlParams.set('start', '');
    urlParams.set('limit', '');

    // const request = new Request({
    //   params: urlParams
    // });
    // request.params = urlParams;

    const request = new Request({
      url: APIURLRepo.AUTOCOMPLETE_LOOK_UP_URL,
      params: urlParams
    });

    // return this.apiGateway.request(request)
    return this.fakeData()
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

  public detailedInfo() {
    return Observable.create(
      observer => {
        // observer.next(htmlData);
        const parser = new DrugInfoHtmlParser(htmlData);
        observer.next(parser.parse());
      }
    )
  }

  public getListInfo() {
    return Observable.create(
      observer => {
        observer.next(suggestionData);
      }
    );
  }

}
