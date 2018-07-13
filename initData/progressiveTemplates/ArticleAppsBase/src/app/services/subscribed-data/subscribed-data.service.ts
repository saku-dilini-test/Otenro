import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { SERVER_URL } from '../../constantsService';

@Injectable()
export class SubscribedDataService {

  constructor(private http: Http) { }

  getSubscribedData(data){
    return this.http.post(SERVER_URL + '/ideabiz/isSubscribed',data)
      .map(res => res.text() ? res.json() : null);
  }

  getAppStatus(data){
    return this.http.post(SERVER_URL + '/templates/getAppStatus',data)
      .map(res => res.text() ? res.json() : null);
  }
}
