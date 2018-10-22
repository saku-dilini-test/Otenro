import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from './constantsService';
import * as data from './madeEasy.json';
import { PushNotificationService } from './services/push-notification.service';
import { AppDataService } from './services/appdata-info/appdata-info.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private pushSubData;
  template: any;

  constructor(private pushService: PushNotificationService, private appdataService: AppDataService, private titleService: Title) {

    this.pushSubData = localStorage.getItem('sub');
    // console.log('pushSubData : ' + this.pushSubData)

  this.appdataService.getAboutUs()
      .subscribe((data: any) => {
         this.titleService.setTitle(data.appName);
   }, (err) => {
        console.log(err);
   });
  }

  store_SubscribeData(){

    this.pushService.storePush_Subs(this.pushSubData).subscribe( res =>{
      console.log(res);
    },error => {
      console.error("Error saving push subscribe data");
      // return Observable.throw(error);
    }
  );

  }
}
