import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { SERVER_URL } from '../../../assets/constantsService';
import {MessageService} from "../message.service";

@Injectable()
export class SubscribedDataService {

  constructor(private http: Http,
              private messageService: MessageService) { }

  getSubscribedData(data){
    return this.http.post(SERVER_URL + '/ideabiz/isSubscribed',data)
      .map(res => {
          if(res.text()){
            this.messageService.sendMessage({subscription: res.json()});
            return res.json();
          }
          this.messageService.sendMessage({subscription: null});
          return null;
      });
  }

  getSubscriptionStatus(data){
    return this.http.post(SERVER_URL + '/ideabiz/getSubscriptionStatus',data)
      .map(res => {
        if(res.text()){
          this.messageService.sendMessage({subscription: res.json()});
          return res.json();
        }
        this.messageService.sendMessage({subscription: null});
        return null;
      });
  }

  getAppStatus(data){
    return this.http.post(SERVER_URL + '/templates/getAppStatus',data)
      .map(res => res.text() ? res.json() : null);
  }
}
