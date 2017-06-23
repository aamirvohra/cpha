import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { APIURLRepo } from '../config/api-url.repo';
import data from '../test.json';
import { Observable } from 'rxjs/Observable';
import htmlData from '../test.html';
import suggestionData from '../suggestion-search-response.json';

@Injectable()
export class DrugLookupService {

  constructor(private http: Http) {
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
  }

  public autoComplete() {
    // return this.http.request(APIURLRepo.AUTOCOMPLETE_LOOK_UP_URL +
    //   '?_dc=1497726277808&publications=IFP&query=Adv&cursorPosition=3&page=1&start=0&limit=25');

    return Observable.create(
      observer => {
        observer.next(data);
      }
    );
  }

  public detailedInfo() {
    return Observable.create(
      observer => {
        observer.next(htmlData);
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
