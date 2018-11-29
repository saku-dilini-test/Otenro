import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";
import * as data from '../../../assets/madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { APIHandlerService } from '../auth/api.handler.service';

@Injectable()
export class ProductsService {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  constructor(private http: Http,
              private apiHandlerService: APIHandlerService,
              private dataService: PagebodyServiceModule) { }

  getProducts(): Observable<any> {
    const url = this.dataService.getServerURL() + '/templates/getArticles?appId=' + this.appId + '&categoryId=' + this.dataService.catId;
    return this.apiHandlerService.sendAPICall(url);
  }

  getAllProducts(): Observable<any> {
    const url = this.dataService.getServerURL() + '/templates/getProductsByAppId?appId=' + this.appId;
    return this.apiHandlerService.sendAPICall(url);
  }

  getCategoryData(id: any) {
    return this.http.get(this.dataService.getServerURL() + '/templates/getCategoryByProdId?id=' + id)
      .map(res => res.text() ? res.json() : null);
  }

  createArticleViewDataInfo(articleName): Observable<any> {
    const url = this.dataService.getServerURL() + '/templates/createArticleViewDataInfo?appId=' + this.appId + '&articleName=' + articleName;
    return this.apiHandlerService.sendAPICall(url);
  }
}
