import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../app/constantsService';
import * as data from '../../app/madeEasy.json';
import 'rxjs/add/operator/map';

@Injectable()
export class ShippingInfoService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http) { }

    getShippingInfo() {
        return this.http.get(SERVER_URL + "/edit/getShippingInfo?appId="+this.appId)
            .map(res => res.json());
    }

    getShippingPickupInfo() {
        return this.http.get(SERVER_URL + "/edit/getShippingPickupInfo?appId=" + this.appId)
            .map(res => res.json());
    }

}