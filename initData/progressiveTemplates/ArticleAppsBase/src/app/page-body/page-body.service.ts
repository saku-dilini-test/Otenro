import { Injectable, OnInit } from '@angular/core';
import * as madeEasy from '../../assets/madeEasy.json';
import { SERVER_URL } from '../../assets/constantsService';
import { MessageService } from '../services/message.service';

declare let $: any;

@Injectable()
export class PagebodyServiceModule {
  public UNAUTHORISED_ACCESS_MSG = 'You are not authorized to access the contents.';
  public ALREADY_UNSUBSCRIBED_MSG = 'You got already unsubscribed from this service.';
  public USER_AGENT_TEXT_MOBILE = 'from mobile app';
  private SERVER_URL_ = SERVER_URL;

  public appId = (<any>madeEasy).appId;
  public userId = (<any>madeEasy).userId;
  STATUS_SUBSCRIBED = 'SUBSCRIBED';
  STATUS_UNSUBSCRIBED = 'UNSUBSCRIBED';
  data: object;
  isFromMobile = false;
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
  renewalIntervals = [];
  uuid;
  subUserArticleData = {id:null,name:null,image:null};
  defaultNumberOfTries = 12;
  numberOfTries;
  initialImageCount:number = 0;
  isImagesLoaded:boolean = false;

  constructor(private messageService: MessageService) {
    this.parentobj.cartSize = this.cart.cartSize;
    this.parentobj.userLog = this.isUserLoggedIn.check;
  }

  getLocalStorageItem(item: string) {
    return localStorage.getItem(item);
  }

  setLocalStorageItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getLocalStorageUUID() {
    return this.getLocalStorageItem('UUID');
  }

  getLocalStorageMSISDN() {
    return this.getLocalStorageItem(this.appId + 'msisdn');
  }

  getLocalStorageToken() {
    return this.getLocalStorageItem('token');
  }

  setLocalStorageToken(token) {
    return localStorage.setItem('token', token);
  }

  // this model is in the Header componenet, so you can only use this in pages which has the header componenet
  showPopupMessage(message) {
    this.displayMessage = message;
    $(() => {
        $('#appStatusModel').modal('show');
    });
  }

  /**
   * Use to get the Server URL from constantservice
   */
  getServerURL() {
    return this.SERVER_URL_;
  }

  /**
   * Here passing -2 will course to close the spinner and will show the screen without checking whethe the images have loaded or not
   */
  hideImageLoadingSpinner() {
    this.messageService.sendMessage({loadImageCount: -2});
  }  
}
