import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../app/constantsService';
import * as data from '../../app/madeEasy.json';
import 'rxjs/add/operator/map';
import { ShippingInfoService } from './shippinginfo.service'
@Injectable()
export class TaxService extends ShippingInfoService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http) { super(null);}

    getTaxInfo() {
        return this.http.get(SERVER_URL + '/edit/getTaxInfo?appId=' + this.appId)
            .map(res => res.json());
    }
}