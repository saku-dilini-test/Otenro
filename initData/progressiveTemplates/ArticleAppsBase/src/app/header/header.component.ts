import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import * as data from './../madeEasy.json';
import { TitleService } from "../services/title.service";
import {SMSService} from "../services/cordova-plugin-services/sms.service";
import {CordovaPluginDeviceService} from "../services/cordova-plugin-services/cordova-plugin-device.service";
import {Location} from '@angular/common';
import { SubscribedDataService } from '../services/subscribed-data/subscribed-data.service'
import {AppDataService} from "../services/appdata-info/appdata-info.service";

var headerCmp;

@Component({
  selector: 'app-header',
  templateUrl: './app/header/header.component.html',
  styleUrls: ['./app/header/header.component.css'],
})

export class HeaderComponent implements OnInit{
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private cartNo: number;
  public title:string;
  public hideBackOnHome:boolean;
  private subscriptionStatus;
  private deviceUUID;
  private appPublishDetails;

  constructor(private subscription:SubscribedDataService,
              private router: Router,
              private dataService: PagebodyServiceModule,
              private titleServ: TitleService,
              private location: Location,
              private sms: SMSService,
              private device: CordovaPluginDeviceService,
              private appDataService: AppDataService) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Your Horoscope';

      router.events.subscribe((val) => {
        // see also
        if(val.url == '/'){
          this.hideBackOnHome = false;
        }else{
          this.hideBackOnHome = true;

        }
    });

    headerCmp = this;

  }

  ngOnInit() {

    this.subscription.getSubscribedData().subscribe(data =>{
      console.log(data);
      this.subscriptionStatus = data.isSubscribed;
    })


    this.appDataService.getPublishDetails().subscribe(data =>{
      console.log(data);
      this.appPublishDetails = data;
    })

    this.titleServ.currentTitle.subscribe(message => this.title = message);

    $(".navbar-2").on('show.bs.collapse', function(){
      $('.mobileTitle').removeClass('visible-xs');
      $('.mobileTitle').addClass('hidden');
    });

    $(".navbar-2").on('hide.bs.collapse', function(){
      $('.mobileTitle').addClass('visible-xs');
      $('.mobileTitle').removeClass('hidden');
    });
  }


  navigate(route: string, name: string) {
    this.title = data.name;
    this.router.navigate([route]);
     document.getElementById("mySidenav").style.width = "0";
  }

  goBack() {
    this.location.back();
  }

  manualToggle() {

    this.titleServ.changeTitle("Shopping Cart");
    $('.navbar-2').removeClass('in');
    $('.mobileTitle').addClass('visible-xs');
    $('.mobileTitle').removeClass('hidden');
  }

  openNav() {
      document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }

  onSubscribe(){
    this.getDeviceUUID();
  }

  deviceUUIDCallback(uuid: any){
    console.log("UUID: " + uuid);

    headerCmp.deviceUUID = uuid;
    headerCmp.sendSMS();
  }

  getDeviceUUID(){
    this.device.getUUID(this.deviceUUIDCallback);
  }

  smsSuccessCallback(results: any){
    console.log("pushSMSSuccessCallback: " + results);
    $('#myAccountModel').modal('hide');
  }

  smsErrorCallback(error: any){
    console.log("pushSMSErrorCallback=>" + error);
  }

  sendSMS(){
    var options = {
      replaceLineBreaks: false,
      android: {
        // intent: 'INTENT'
      }
    };

    var smsBody = headerCmp.appPublishDetails.keyword + " Reg";

    console.log("appPublishDetails=>" + headerCmp.appPublishDetails.toString() + " uuid: " + headerCmp.deviceUUID);
    this.sms.send(headerCmp.appPublishDetails.port,smsBody,options,this.smsSuccessCallback,this.smsErrorCallback);
  }
}
