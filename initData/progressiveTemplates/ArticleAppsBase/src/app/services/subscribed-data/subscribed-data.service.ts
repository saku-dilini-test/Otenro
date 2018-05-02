import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { SERVER_URL } from '../../constantsService';

@Injectable()
export class SubscribedDataService {

  constructor(private http: Http) { }

  getSubscribedData(){
    return this.http.get(SERVER_URL + '/templates/getSubscribedData')
      .map(res => res.text() ? res.json() : null);
  }
}
