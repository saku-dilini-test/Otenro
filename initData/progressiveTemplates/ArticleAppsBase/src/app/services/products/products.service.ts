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

  getProducts() {
    // '/templates/getProductsByCatId?appId=' + this.appId + '&childId=' + this.dataService.catId
    // '/templates/getArticles?appId=' + $rootScope.appId + "&categoryId=" + firstCat.id
    return this.http.get(this.dataService.getServerURL() + '/templates/getArticles?appId=' + this.appId + '&categoryId=' + this.dataService.catId)
      .map(res => res.text() ? res.json() : null);
  }

  getAllProducts() {
    return this.http.get(this.dataService.getServerURL() + '/templates/getProductsByAppId?appId=' + this.appId)
      .map(res => res.text() ? res.json() : null);
  }

  getCategoryData(id:any){
    return this.http.get(this.dataService.getServerURL()+'/templates/getCategoryByProdId?id='+id)
      .map(res => res.text() ? res.json() : null);
  }


  createArticleViewDataInfo(articleName) {
    return this.http.get(this.dataService.getServerURL() + '/templates/createArticleViewDataInfo?appId=' + this.appId+"&articleName="+articleName)
      .map(res => res.text() ? res.json() : null);
  }
}
