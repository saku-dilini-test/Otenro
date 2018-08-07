import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { ShippingService } from '../shipping/shipping.service';

@Injectable()
export class TaxService extends ShippingService{

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  constructor(public http: Http) { super(null);}

  getTaxInfo() {
    return this.http.get(SERVER_URL + '/edit/getTaxInfo?appId=' + this.appId)
      .map(res => res.text() ? res.json() : res);
  }
}
