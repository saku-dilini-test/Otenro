import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../madeEasy.json';
import { AppDataService } from '../services/appdata-info/appdata-info.service';
import { SubscribedDataService } from '../services/subscribed-data/subscribed-data.service'

@Component({
  selector: 'app-footer',
  templateUrl: './app/footer/footer.component.html',
  styleUrls: ['./app/footer/footer.component.css']
})
export class FooterComponent{

  private subscriptionStatus;

  constructor(private subscription:SubscribedDataService,private router: Router) {
    this.subscription.getSubscribedData().subscribe(data =>{
      console.log(data);
      this.subscriptionStatus = data.isSubscribed;
  })
  }

  navigate(val: string) {
    this.router.navigate([val])
  }
}
