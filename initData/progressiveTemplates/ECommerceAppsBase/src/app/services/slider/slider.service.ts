import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service'

@Injectable()
export class SliderService {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  constructor(public http: Http) { }

  retrieveSliderData() {
    return this.http.get(SERVER_URL + '/templates/getSliderData?appId=' + this.appId)
      .map(res => res.text() ? res.json() : res);
  }

}
