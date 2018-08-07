import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service'

@Injectable()
export class ShippingService {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  constructor(public http: Http) { }

  getShippingInfo() {
    return this.http.get(SERVER_URL + "/edit/getShippingInfo?appId=" + this.appId)
      .map(res => res.text() ? res.json() : res);
  }

  getShippingPickupInfo() {
    return this.http.get(SERVER_URL + "/edit/getShippingPickupInfo?appId=" + this.appId)
      .map(res => res.text() ? res.json() : res);
  }

  getSmartfitShippingRules(){
    return this.http.get(SERVER_URL + "/get/getShippingRules")
    .map(res => res.text() ? res.json() : res);
  }
}
