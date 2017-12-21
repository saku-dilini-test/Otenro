import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../app/constantsService';
import * as data from '../../app/madeEasy.json';

import 'rxjs/add/operator/map';


@Injectable()
export class HomepageService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;
    
  constructor(private http: Http) {}

  getCategories() {    
    return this.http.get(SERVER_URL+'/templates/getSpecificChild?appId=' + this.appId)
                    .map(res => res.json());
  }
  
}