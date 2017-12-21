import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../app/constantsService';
import * as data from '../../app/madeEasy.json';
import 'rxjs/add/operator/map';
import { CountryDataService } from './countrydata.service'

@Injectable()
export class CurrencyService extends CountryDataService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http) { super(null);}

    getCurrencies() {
        return this.http.get(SERVER_URL + '/templates/getCurrency?appId=' + this.appId)
            .map(res => res.json());
    }
    
    getOrders(appIdParam){
        console.log(appIdParam);
        return this.http.get(SERVER_URL + '/templates/getOrdersOfUser?appId=' + this.appId + '&userId=' + appIdParam)
        .map(res => res.json());
    }
}