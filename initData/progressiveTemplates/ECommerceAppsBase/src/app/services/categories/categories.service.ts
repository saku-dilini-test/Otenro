import { Injectable } from '@angular/core';
import {Http , Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
@Injectable()
export class CategoriesService {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  result: any;

  constructor(private http: Http ,private dataService:PagebodyServiceModule) { }

  getCategories() {
    return this.http.get(SERVER_URL+'/edit/getCategoryListCommerce?appId=' + this.appId)
      .map(res => res.text() ? res.json() : null);
  }

  getNodeById(nodes,id):Observable<any> {
    // console.log(id)
    if(!id || id=='Home'){
      // this.categories = nodes;
      if( !this.dataService.products){
        this.dataService.products = [];
      }
      // this.products[0] = nodes.products;
      this.dataService.categories = nodes;
      this.dataService.products[0] =  nodes.products;
      return Observable.of(this.dataService.categories,this.dataService.products);

    }else{
      for(let i=0;i<nodes.length;i++){
        // console.log(id,nodes[i].id)
        if(id == nodes[i].id){
          // this.categories =  nodes[i].childNodes;
          if( !this.dataService.products){
            this.dataService.products = [];
          }
          this.dataService.currentCategoryImage = nodes[i].imageUrl;
          this.dataService.categories = nodes[i].childNodes;
          this.dataService.products[0] = nodes[i].products;
          return Observable.of(this.dataService.categories,this.dataService.products);
        }else{
          let value = this.iterate(nodes[i],id);

          if(value){
            return Observable.of(this.dataService.categories,this.dataService.products);
            // console.log(value)
          }

        }
      }
    }

  }

  iterate(current,id) {
    var children = current.childNodes;
    if (children){
      //handle text nodes
      for (var i = 0; i < children.length; i++) {
        // console.log(id,children[i].id)


        if(id == children[i].id){

          // this.categories= children[i].childNodes;
          if( !this.dataService.products){
            this.dataService.products = [];
          }
          // this.products[0] = children[i].products;
          this.dataService.currentCategoryImage = children[i].imageUrl;
          this.dataService.categories = children[i].childNodes;
          this.dataService.products[0] = children[i].products;
          return Observable.of(this.dataService.categories,this.dataService.products);

        }else {
          this.iterate(children[i],id);
        }

      }
    }

  }


}




