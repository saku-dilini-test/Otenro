import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../app/constantsService';
import * as data from '../../app/madeEasy.json';
import 'rxjs/add/operator/map';
import { PagebodyServiceModule } from '../page-body/page-body.service'
@Injectable()
export class ShopService {

    public appId = (<any>data).appId;
    public userId = (<any>data).userId;
    result: any;

    constructor(private http: Http, private dataService: PagebodyServiceModule) { }

    getProducts() {
        return this.http.get(SERVER_URL + '/templates/getProductsByCatId?appId=' + this.appId + '&childId=' + this.dataService.catId)
            .map(res => res.json());
    }
}