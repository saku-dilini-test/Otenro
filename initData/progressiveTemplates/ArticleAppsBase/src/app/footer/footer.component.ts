import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../services/appdata-info/appdata-info.service';
import { SubscribedDataService } from '../services/subscribed-data/subscribed-data.service'
import * as data from './../madeEasy.json';

@Component({
  selector: 'app-footer',
  templateUrl: './app/footer/footer.component.html',
  styleUrls: ['./app/footer/footer.component.css']
})

export class FooterComponent{

  private subscriptionStatus;
  private appId = <any>(data).appId;
  private userId = <any>(data).userId;

  constructor(private subscription:SubscribedDataService,private router: Router) {

    var msisdn = localStorage.getItem(this.appId+"msisdn");
    let parseData = {appId:this.appId,msisdn:msisdn}

    this.subscription.getSubscribedData(parseData).subscribe(data =>{
      console.log(data);
      this.subscriptionStatus = data.isSubscribed;
  })
  }

  navigate(val: string) {
    this.router.navigate([val])
  }
}
