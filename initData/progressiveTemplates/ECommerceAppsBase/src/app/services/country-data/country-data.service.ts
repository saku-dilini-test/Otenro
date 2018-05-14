import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../../app/constantsService';
import * as data from '../../madeEasy.json';
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
}
