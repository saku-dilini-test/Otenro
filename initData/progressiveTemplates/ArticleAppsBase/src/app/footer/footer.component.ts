import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../services/appdata-info/appdata-info.service';
import { SubscribedDataService } from '../services/subscribed-data/subscribed-data.service'
import * as data from '../../assets/madeEasy.json';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { takeWhile } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import { PagebodyServiceModule } from '../page-body/page-body.service'
import {SMSService} from "../services/cordova-plugin-services/sms.service";
import {MessageService} from "../services/message.service";
declare let $:any;
var footerCmp;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit{

  subscriptionStatus;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private alive = true;
  isSubscribing = false;
  isUnsubscribing = false;
  private isFromCMSAppView: boolean = false;

  constructor(private subscription:SubscribedDataService,
              private router: Router,
              private sms: SMSService,
              private messageService: MessageService,
              private dataService: PagebodyServiceModule) {
    footerCmp = this;
  }

  ngOnInit(){
    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView")=='1';

    $('#myAccountModelfooter').on('hide.bs.modal', ()=>{
      this.alive = false;
      console.log("model footer close " + this.alive);
      this.isUnsubscribing = false;
    });

    this.messageService.getMessage().subscribe(data => {
      // console.log('messageService.getMessage Footer component=>', data);
      if (data.subscription) {
        this.dataService.subscriptionStatus = data.subscription.subscriptionStatus;
      } else {
        this.dataService.subscriptionStatus = null;
      }
      this.subscriptionStatus = this.dataService.subscriptionStatus;
    });
  }

  ngDoCheck(){
    if(!this.isFromCMSAppView) {
      this.subscriptionStatus = this.dataService.subscriptionStatus;
    }
  }

  openFooterMyAccount(){
      $(() => {
        $('#myAccountModelfooter').modal('show');
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

    this.dataService.numberOfTries = 1;

    var uuid = localStorage.getItem("UUID");

    let data = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn"),uuId: uuid };
    this.isUnsubscribing = true;

    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        if(this.dataService.numberOfTries==this.dataService.defaultNumberOfTries) {
          this.alive = false;
          this.timeoutUnubscriptionPopup();
          return;
        }
        this.dataService.numberOfTries++;

        this.subscription.getSubscribedData(data).subscribe(data =>{
          this.subscriptionStatus = data.subscriptionStatus;
          this.dataService.subscriptionStatus = data.subscriptionStatus;
          if(this.subscriptionStatus === this.dataService.STATUS_UNSUBSCRIBED){
            this.isUnsubscribing = false;
            localStorage.removeItem(this.appId+"msisdn")
             this.alive = false;
             this.router.navigate(['']);
              $( () => {
                this.unSubscribedSuccessPopup();
             });
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
    footerCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to send the sms to unsubscribe from the service';
    $(() => {
      $('#myAccountModelfooter').modal('hide');
      $('#appStatusModel').modal('show');
    });
  }

  timeoutUnubscriptionPopup(){
    this.dataService.displayMessage = 'The unsubscription process timed out, Please try again.';
    $(() => {
      $('#myAccountModelfooter').modal('toggle');
      $('#appStatusModel').modal('show');
    });
  }

  unSubscribedSuccessPopup(){
    this.dataService.displayMessage = 'You got unsubscribed from the service';
    $(() => {
      $('#myAccountModelfooter').modal('toggle');
      $('#appStatusModel').modal('show');
    });
  }
}
