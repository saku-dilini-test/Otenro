import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class DataServiceProvider {
  public wasOnlineBefore = false;

  constructor(public http: Http){

  }

  makeRequest(url){
    return this.http.get(url,{});
  }
}
