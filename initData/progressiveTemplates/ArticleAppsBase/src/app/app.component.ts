import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params, NavigationCancel} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../assets/constantsService';
import * as data from '../assets/madeEasy.json';
import { URLSearchParams, } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  constructor(public router: Router) {

    /*
        Below code is to check whether the App is loading inside an "iFrame in CMS" or the App is loading from "ionic app in real Device"
        If the App is loading from iFrame in CMS, then the subscription screens are disabled.The reason to disable the subscriptions services in CMS is to see the templates behaviours etc...
     */
    router.events.subscribe(s => {
      if (s['url']) {
        let params = new URLSearchParams(s['url'].split('?')[1]);
          let isFromCMSAppView = params.get('isFromCMSAppView');
          if(isFromCMSAppView!=null) {
            localStorage.setItem(this.appId + "_isFromCMSAppView", isFromCMSAppView);
          }else if(!localStorage.getItem(this.appId + "_isFromCMSAppView")){
            localStorage.removeItem(this.appId + "_isFromCMSAppView");
          }
      }
    });
  }

}

