import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

@Component({
  selector: 'app-order-history',
  templateUrl: './app/page-body/order-history/order-history.component.html',
  styleUrls: ['./app/page-body/order-history/order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  currency;imageURL;appUserId;orderHistory;sign;

  constructor(private http : HttpClient) { }

  ngOnInit() {
    //get currency
    this.http.get(SERVER_URL + '/templates/getCurrency?appId='+this.appId).
    subscribe(data=> {
      this.currency = data;
      this.sign = this.currency.sign;
      console.log(this.sign);
    },err =>{
      alert('warning, Unable to get Products Selected Category');
    });

    //get image url
    this.imageURL = SERVER_URL
      +"/templates/viewImages?userId="
      +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+"&img=thirdNavi";

    try {
      this.appUserId = JSON.parse(localStorage.get("appLocalStorageUser"+this.appId));
    }
    catch(err) {
      console.log("no orderHistory");
    }

    if(this.appUserId) {
      this.http.get(SERVER_URL + '/templates/getOrdersOfUser?appId=' + this.appId + '&userId=' + this.appUserId.registeredUser)
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
