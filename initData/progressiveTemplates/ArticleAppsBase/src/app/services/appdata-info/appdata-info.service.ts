import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
import {PagebodyServiceModule} from "../../page-body/page-body.service";


@Injectable()
export class AppDataService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(public http: Http,
                private dataService: PagebodyServiceModule) { }

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

    getPublishDetails() {
      return this.http.get(SERVER_URL + "/edit/getPublishDetails?appId="+this.appId)
        .map(res => res.text() ? res.json() : res);
    }

    getRenewalIntervals() {
      return this.http.get(SERVER_URL + "/edit/getRenewals")
        .map(res => res.text() ? res.json() : res);
    }

    getRenewalIntervalObjByIntervalCode(code: string){
      const renewalIntervals = this.dataService.renewalIntervals;
      if(renewalIntervals.length>0){
        return renewalIntervals.filter(intObj => intObj.code === code);
      }
      return [];
    }

    getRenewalIntervalNumberOfDaysByIntervalCode(code: string){
      const renewalintObj = this.getRenewalIntervalObjByIntervalCode(code);
      if(renewalintObj.length>0){
        return renewalintObj[0].noOfDays;
      }
      return '';
    }
}
