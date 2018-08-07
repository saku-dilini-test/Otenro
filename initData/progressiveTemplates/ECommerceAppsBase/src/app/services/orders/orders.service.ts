import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import 'rxjs/add/operator/map';
import { CountryDataService } from '../country-data/country-data.service';
import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class OrdersService {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'appliation/json',
                                   'Accept': 'q=0.8;appliation/json;q=0.9' });
      this.options = new RequestOptions({ headers: this.headers });
  }

  createService(url: string, param: any): Observable<any> {
  let body = JSON.stringify(param);
  return this.http
      .post(url, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  orderService(url: string, param: any): Observable<any> {
      let body = JSON.stringify(param);
      return this.http
          .post(url, body, this.options)
          .map(res => res)
          .catch(this.handleError);
      }

  private extractData(res: Response) {
      let body = res.json();
      return body || {};
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

  getIPGinfo(){
    return this.http.get(SERVER_URL + '/edit/getIPGInfo?appId=' + this.appId)
    .map(res => res.text() ? res.json() : res);
  }

}
