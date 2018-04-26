import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

@Injectable()
export class CategoriesService {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  constructor(private http: Http) { }
		// '/templates/getArticleCategoryByAppId?appId='
		// '/templates/getSpecificChild?appId='
  getCategories() {
    return this.http.get(SERVER_URL+'/templates/getArticleCategoryByAppId?appId=' + this.appId)
                    .map(res => res.text() ? res.json() : null);
  }

  sendDeviceToken(deviceId){
    return this.http.get(SERVER_URL+'/templates/postDeviceId?deviceId=' +deviceId +"&appId="+this.appId)
      .map(res => res.text() ? res.json() : null);

  }



}




