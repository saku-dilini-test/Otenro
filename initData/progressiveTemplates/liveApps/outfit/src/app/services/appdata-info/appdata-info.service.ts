import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";


@Injectable()
export class AppDataService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http) { }

    getTerms() {
        return this.http.get(SERVER_URL + '/templates/getTermsAndConditions?appId='+this.appId)
            .map(res => res.text() ? res.json() : res);
    }

    getPolicies() {
        return this.http.get(SERVER_URL + "/templates/getPolicies?appId="+this.appId)
            .map(res => res.text() ? res.json() : res);
    }

    getContactUs() {
        return this.http.get(SERVER_URL + '/templates/getContactUs?appId='+this.appId)
            .map(res => res.text() ? res.json() : res);
    }

    getAboutUs() {
        return this.http.get(SERVER_URL + "/templates/getAboutUs?appId="+this.appId)
            .map(res => res.text() ? res.json() : res);
    }

    /**
     * Api call to get application header details
     **/
    getAppHeaderdata() {
        return this.http.get(SERVER_URL + "/edit/commerce/getAppHeaderData?appId=" + this.appId)
            .map(res => res.json());
    }
     getApplicationData() {
        return this.http.get(SERVER_URL + "/edit/getApplicationData?appId=" + this.appId)
            .map(res => res.json());
    }
}
