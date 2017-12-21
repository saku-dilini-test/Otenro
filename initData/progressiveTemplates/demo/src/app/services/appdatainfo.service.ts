import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../app/constantsService';
import * as data from '../../app/madeEasy.json';
import 'rxjs/add/operator/map';


@Injectable()
export class AppDataService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http) { }

    getTerms() {
        return this.http.get(SERVER_URL + '/templates/getTermsAndConditions?appId='+this.appId)
            .map(res => res.json());
    }

    getPolicies() {
        return this.http.get(SERVER_URL + "/templates/getPolicies?appId="+this.appId)
            .map(res => res.json());
    }

    getContactUs() {
        return this.http.get(SERVER_URL + '/templates/getContactUs?appId='+this.appId)
            .map(res => res.json());
    }

    getAboutUs() {
        return this.http.get(SERVER_URL + "/templates/getAboutUs?appId="+this.appId)
            .map(res => res.json());
    }
}
