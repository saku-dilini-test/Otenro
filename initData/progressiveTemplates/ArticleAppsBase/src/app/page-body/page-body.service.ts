import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class PagebodyServiceModule {

  data: object;
  displayMessage: string;
  pushMessage: string;
  userData: any;
  subscriptionStatus: any;
  appStatus: any;
  cart = { cartItems: [], cartSize: 0, totalPrice: 0, totalQuantity: 0 };
  isUserLoggedIn = { check: false };
  parseWeight;
  position2;
  parentobj = { userLog: false, cartSize: 0, totalPrice: 0 };
  parseQty;
  parseIndex;
  parseEnable;
  finalDetails;
  deliverItems; deliverItemsDelivery;
  currency; paypalCurrency;
  payPalDetails: any;
  paypalKey;
  env;
  catId;
  sign;
  searchArray = [];
  uuid;
  subUserArticleData = {id:null,name:null,image:null};
  defaultNumberOfTries = 12;
  numberOfTries;
  constructor() {

    this.parentobj.cartSize = this.cart.cartSize;
    this.parentobj.userLog = this.isUserLoggedIn.check;

  };

}
