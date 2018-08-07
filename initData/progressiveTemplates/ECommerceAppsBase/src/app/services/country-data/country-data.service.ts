import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import 'rxjs/add/operator/map';


@Injectable()
export class CountryDataService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http) { }

    getCountryData() {
        return this.http.get(SERVER_URL + "/edit/getAllCountry")
            .map(res => res.text() ? res.json() : res);
    }
    getProvinces(){
        return this.http.get(SERVER_URL + "/get/provinces")
            .map(res => res.text() ? res.json() : res);
    }
}
