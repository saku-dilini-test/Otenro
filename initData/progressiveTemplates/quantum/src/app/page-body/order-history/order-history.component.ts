import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './app/page-body/order-history/order-history.component.html',
  styleUrls: ['./app/page-body/order-history/order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  currency;imageURL;appUserId;orderHistory;sign;

  constructor(private currencyService : CurrencyService,private localStorageService: LocalStorageService) { }

  ngOnInit() {
    //get currency
    this.currencyService.getCurrencies().
    subscribe(data=> {
      this.currency = data;
      this.sign = this.currency.sign;
      console.log(this.sign);
    },err =>{
      console.log('Unable to get Products Selected Category');
    });

    //get image url
    this.imageURL = SERVER_URL
      +"/templates/viewImages?userId="
      +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+"&img=thirdNavi";

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
        console.log('Unable to get orders');
      });
    }

  }


  slides = SLIDES;

}

const SLIDES = [
  { src:'https://s-media-cache-ak0.pinimg.com/originals/e1/2f/95/e12f95f3faefd9a5f62d345544a564b3.jpg', title:'Order History' }]