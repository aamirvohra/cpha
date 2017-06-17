/**
 * Created by avohra on 6/17/2017.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchHelper {

  public _searchEvent: BehaviorSubject<any>;

  constructor() {
    this._searchEvent = new BehaviorSubject(null);
  }

  broadcastSearchEvent(item) {
    this._searchEvent.next(item);
  }

}
