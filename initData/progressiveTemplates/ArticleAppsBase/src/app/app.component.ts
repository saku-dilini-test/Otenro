import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../assets/madeEasy.json';
import { URLSearchParams, } from '@angular/http';
import { PagebodyServiceModule } from './page-body/page-body.service';
import { MessageService } from './services/message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  isImagesLoaded:boolean =  this.dataService.isImagesLoaded ;
  constructor(public router: Router, private dataService: PagebodyServiceModule, private messageService: MessageService) {

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

      this.messageService.getMessage().subscribe(value =>{
        if(this.dataService.initialImageCount <= value.loadImageCount || value.loadImageCount === -2) {
          this.dataService.isImagesLoaded = true;
          this.isImagesLoaded = this.dataService.isImagesLoaded;
        }else if(value.loadImageCount){
            this.isImagesLoaded = false;
        }
      },
        error => console.log(error),
      );

  }
}

