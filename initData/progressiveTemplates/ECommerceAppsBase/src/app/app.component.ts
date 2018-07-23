import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from './constantsService';
import * as data from './madeEasy.json';
import { PushNotificationService } from './services/push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private pushSubData;

  constructor(private pushService: PushNotificationService) {

    this.pushSubData = localStorage.getItem('sub');
    // console.log('pushSubData : ' + this.pushSubData)

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