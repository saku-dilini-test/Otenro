import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import 'rxjs/add/operator/map';
import { CountryDataService } from '../country-data/country-data.service'

@Injectable()
export class CurrencyService extends CountryDataService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http) { super(null);}

    getCurrencies() {
        return this.http.get(SERVER_URL + '/templates/getCurrency?appId=' + this.appId)
            .map(res => res.text() ? res.json() : res);
    }

    getOrders(appIdParam){
        console.log(appIdParam);
        return this.http.get(SERVER_URL + '/templates/getOrdersOfUser?appId=' + this.appId + '&userId=' + appIdParam)
        .map(res => res.text() ? res.json() : res);
    }
}
