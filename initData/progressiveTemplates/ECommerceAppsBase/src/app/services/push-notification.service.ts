import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { SERVER_URL } from '../../assets/constantsService';
import * as data from '../../assets/madeEasy.json';

@Injectable()
export class PushNotificationService {

  constructor(private http: Http) { }

  storePush_Subs(pObj) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(pObj);
    return this.http.post(SERVER_URL+'', body, options ).map((res: Response) => res.json());
  }
}
