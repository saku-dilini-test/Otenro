import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../services/appdata-info/appdata-info.service';
import { SubscribedDataService } from '../services/subscribed-data/subscribed-data.service'
import * as data from './../madeEasy.json';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { takeWhile } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import { PagebodyServiceModule } from '../page-body/page-body.service'
import {SMSService} from "../services/cordova-plugin-services/sms.service";

var footerCmp;

@Component({
  selector: 'app-footer',
  templateUrl: './app/footer/footer.component.html',
  styleUrls: ['./app/footer/footer.component.css']
})

export class FooterComponent implements OnInit{

  private subscriptionStatus;
  private appId = <any>(data).appId;
  private userId = <any>(data).userId;
  private alive = true;
  private isSubscribing = false;
  private isUnsubscribing = false;
  private isFromCMSAppView: boolean = false;

  constructor(private subscription:SubscribedDataService,
              private router: Router,
              private sms: SMSService,
              private dataService:PagebodyServiceModule) {
    footerCmp = this;
  }

  ngOnInit(){
    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView")=='1';

    $('#myAccountModelfooter').on('hide.bs.modal', ()=>{
      this.alive = false;
      console.log("model footer close " + this.alive);
      this.isUnsubscribing = false;
    });
  }

  ngDoCheck(){
    if(!this.isFromCMSAppView) {
      this.subscriptionStatus = this.dataService.subscriptionStatus;
    }
  }

  openFooterMyAccount(){
    let data = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn") };
    this.subscription.getSubscribedData(data).subscribe(data => {
      if(data.isError){
        this.dataService.displayMessage = data.displayMessage;
        $(() => {
          $('#appStatusModel').modal('show');
        });
      } else {
        $(() => {
          $('#myAccountModelfooter').modal('show');
        });
      }
    });
  }

  navigate(val: string) {
    this.router.navigate([val])
  }
  close(){
    this.isUnsubscribing = false;
  }
  onUnsubscribe(){
    this.alive = true;

    //Send Un-Registration SMS
    footerCmp.sms.sendUnRegistrationSMS(footerCmp.smsSuccessUnRegistrationCallback, footerCmp.smsErrorUnRegistrationCallback);

    var uuid = localStorage.getItem("UUID");

    let data = {appId:this.appId,uuId:uuid}
    this.isUnsubscribing = true;

    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.subscription.getSubscribedData(data).subscribe(data =>{
          console.log(data);
          this.subscriptionStatus = data.isSubscribed;
          this.dataService.subscriptionStatus = data.isSubscribed;
          if(this.subscriptionStatus == false){
            this.isUnsubscribing = false;
            localStorage.removeItem(this.appId+"msisdn")
             this.alive = false;
              //close the model
              $( () => {
                $('#myAccountModelfooter').modal('toggle');
             });
             //close the nav bar
             document.getElementById("mySidenav").style.width = "0";
          }
        });
      });
  }


  smsSuccessUnRegistrationCallback(results: any) {
    console.log("smsSuccessUnRegistrationCallback in Footer Component: " + results);
  }

  smsErrorUnRegistrationCallback(error: any) {
    console.log("smsErrorUnRegistrationCallback in Footer Component: " + error);
  }
}
