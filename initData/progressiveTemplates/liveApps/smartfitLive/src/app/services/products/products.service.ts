import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service'

@Injectable()
export class ProductsService {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  constructor(private http: Http, private dataService: PagebodyServiceModule) { }

  getProducts() {
    return this.http.get(SERVER_URL + '/templates/getProductsByCatId?appId=' + this.appId + '&childId=' + this.dataService.catId)
      .map(res => res.text() ? res.json() : null);
  }

  getAllProducts() {
    return this.http.get(SERVER_URL + '/templates/getProductsByAppId?appId=' + this.appId)
      .map(res => res.text() ? res.json() : null);
  }

  getCategoryData(id:any){
    return this.http.get(SERVER_URL+'/templates/getCategoryByProdId?id='+id)
      .map(res => res.text() ? res.json() : null);
  }
  getBlogs() {
    return this.http.get(SERVER_URL+'/templates/getBlogData?appId=' + this.appId)
                    .map(res => res.text() ? res.json() : null);
  }
  isBlogsAvailable() {
    return this.http.get(SERVER_URL+'/templates/isBlogAvailable?appId=' + this.appId)
                    .map(res => res ? res.text() : null);
  }
  getBlogsById(id) {
    return this.http.get(SERVER_URL+'/templates/getBlogDataById?id=' + id)
                    .map(res => res.text() ? res.json() : null);
  }
  getSalesAndPromoData(id:any){
    return this.http.get(SERVER_URL+'/edit/getListOfSalesAndPromotions?appId='+id)
      .map(res => res.text() ? res.json() : null);
  }
  checkProduct(id,sku,name,qty) {
    return this.http.get(SERVER_URL + '/templates/checkProduct?id=' + id + '&sku=' + sku + '&name=' + name + '&qty=' + qty)
      .map(res => res.text() ? res.json() : null);
  }
}
