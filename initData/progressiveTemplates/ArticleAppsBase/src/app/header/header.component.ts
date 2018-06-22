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
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { takeWhile } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';

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
  private alive = true;
  private isSubscribing = false;
  private isUnsubscribing = false;

  constructor(private subscription:SubscribedDataService,
              private router: Router,
              private dataService: PagebodyServiceModule,
              private titleServ: TitleService,
              private location: Location,
              private sms: SMSService,
              private device: CordovaPluginDeviceService,
              private appDataService: AppDataService,
              private spinner:Ng4LoadingSpinnerService) {
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
    $('#registerModel').on('hide.bs.modal', ()=>{
      this.alive = false;
      console.log("model close " + this.alive);
      this.isSubscribing = false;
    });

    $('#myAccountModel').on('hide.bs.modal', ()=>{
      this.alive = false;
      console.log("model close " + this.alive);
      this.isUnsubscribing = false;
    });

    this.isSubscribing = false;
    this.isUnsubscribing = false;

    if(!localStorage.getItem(this.appId+"uuid")){
      localStorage.setItem(this.appId+"uuid",JSON.stringify('e66cd871ef25517a'));
      this.dataService.uuid = "e66cd871ef25517a"
    }else{
      this.dataService.uuid = JSON.parse(localStorage.getItem(this.appId+"uuid"));
    }

    var msisdn = localStorage.getItem(this.appId+"msisdn");
     let data = {appId:this.appId,msisdn:msisdn}
    this.subscription.getSubscribedData(data).subscribe(data =>{
      console.log(data);
      this.subscriptionStatus = data.isSubscribed;
    });


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

  close(){
    this.isUnsubscribing = false;
    this.isSubscribing = false;
  }
  onSubscribe(){
    this.alive = true;
    let data = {appId:this.appId,uuId:this.dataService.uuid}
    this.getSubscription(data);
    // this.getDeviceUUID();
  }
  getSubscription(data){

    this.isSubscribing = true;

    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.subscription.getSubscribedData(data).subscribe(data =>{
          console.log(data);
          this.subscriptionStatus = data.isSubscribed;
          if(this.subscriptionStatus == true){
            this.isSubscribing = false;
            localStorage.setItem(this.appId+"msisdn",data.msisdn)
             this.alive = false;
              //close the model
              $(function () {
                $('#registerModel').modal('toggle');
             });
             //close the nav bar
             document.getElementById("mySidenav").style.width = "0";
          }
        });
      });

  }

  onUnsubscribe(){
    this.alive = true;
    let data = {appId:this.appId,uuId:this.dataService.uuid}
    this.isUnsubscribing = true;

    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.subscription.getSubscribedData(data).subscribe(data =>{
          console.log(data);
          this.subscriptionStatus = data.isSubscribed;
          if(this.subscriptionStatus == false){
            this.isUnsubscribing = false;
            localStorage.removeItem(this.appId+"msisdn")
             this.alive = false;
              //close the model
              $(function () {
                $('#myAccountModel').modal('toggle');
             });
             //close the nav bar
             document.getElementById("mySidenav").style.width = "0";
          }
        });
      });
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
