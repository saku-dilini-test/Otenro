import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './app/page-body/order-history/order-history.component.html',
  styleUrls: ['./app/page-body/order-history/order-history.component.css']
  // templateUrl: './order-history.component.html',
  // styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  currency;
  public imageURL = SERVER_URL+"/templates/viewWebImages?userId="
  +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+"&images=thirdNavi";
  appUserId;orderHistory;sign;

  constructor(private currencyService: CurrencyService,private localStorageService: LocalStorageService) { }

  ngOnInit() {
    //get currency
    this.currencyService.getCurrencies()
    .subscribe(data=> {
      this.currency = data;
      this.sign = this.currency.sign;
      console.log(this.sign);
    },err =>{
      alert('warning, Unable to get Products Selected Category');
    });

    //get image url

    try {
      this.appUserId = this.localStorageService.get("appLocalStorageUser"+this.appId);
      // this.orderHistory = (this.localStorageService.get("history"+this.appId+this.appUserId.registeredUser));
    }
    catch(err) {
      console.log("no orderHistory");
    }

    if(this.appUserId) {
      this.currencyService.getOrders(this.appUserId.registeredUser)
        .subscribe((data) => {
          this.orderHistory = (data);
          console.log("this.orderHistory : " + JSON.stringify(this.orderHistory));
        }), ((err) => {
        alert('warning,Unable to get orders');
      });
    }

  }


  slides = SLIDES;

}

const SLIDES = [
  { src:'https://s-media-cache-ak0.pinimg.com/originals/e1/2f/95/e12f95f3faefd9a5f62d345544a564b3.jpg', title:'Order History' }]
