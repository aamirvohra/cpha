/**
 * Created by avohra on 7/14/2017.
 */

import { Injectable } from '@angular/core';
import { Http, Request } from '@angular/http';

@Injectable()
export class ApiGateway {

  constructor(private http: Http) {}

  public request(request: Request) {
    return this.http.request(request)
      .map(
        data => {
          return data.json();
        }
      )
  }

}
