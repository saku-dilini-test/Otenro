import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import * as data from '../../assets/madeEasy.json';
import { TitleService } from "../services/title.service";
import { SMSService } from "../services/cordova-plugin-services/sms.service";
import { CordovaPluginDeviceService } from "../services/cordova-plugin-services/cordova-plugin-device.service";
import { Location } from '@angular/common';
import { SubscribedDataService } from '../services/subscribed-data/subscribed-data.service'
import { AppDataService } from "../services/appdata-info/appdata-info.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { takeWhile } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import { SERVER_URL } from '../../assets/constantsService';
import {MessageService} from "../services/message.service";
declare let $:any;
var headerCmp;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private templateName = (<any>data).templateName;
  private cartNo: number;
  public title: string;
  public articleSize: number = 20;
  public tempName: string;
  public hideBackOnHome = true;
  subscriptionStatus;
  pushMessage;
  logoUrl;
  private appPublishDetails;
  private alive = true;
  isSubscribing = false;
  isUnsubscribing = false;
  renewalIntervals = [];
  private isFromCMSAppView: boolean = false;
  displayMessage;

  constructor(private subscription: SubscribedDataService,
    private router: Router,
    private dataService: PagebodyServiceModule,
    private titleServ: TitleService,
    private location: Location,
    private sms: SMSService,
    private device: CordovaPluginDeviceService,
    private appDataService: AppDataService,
    private messageService: MessageService,
    private spinner: Ng4LoadingSpinnerService) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Your Horoscope';

    this.titleServ.getLocation().subscribe( (data) => {
      console.log('title service getLocation: ',data);
      this.hideBackOnHome = !data.includes('home');
    });

    headerCmp = this;
    this.titleServ.getLocation().subscribe(
      source =>
        this.tempName = source
    );

  }
  ngOnInit() {
    this.logoUrl = SERVER_URL + "/templates/viewWebImages?userId="
          + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images='

    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView") == '1';

    $('#registerModel').on('hide.bs.modal', () => {
      this.alive = false;
      this.isSubscribing = false;
    });

    $('#myAccountModel').on('hide.bs.modal', () => {
      this.alive = false;
      this.isUnsubscribing = false;
    });

    this.isSubscribing = false;
    this.isUnsubscribing = false;

    const msisdn = localStorage.getItem(this.appId + "msisdn");
    const uuid = localStorage.getItem("UUID");
    const data = { appId: this.appId, msisdn: msisdn, uuId: uuid }
    console.log("HeaderComp.oninit.getSubscribedData data: ", data);
    this.subscription.getSubscribedData(data).subscribe(results => {
      this.subscriptionStatus = results.subscriptionStatus;
      this.dataService.subscriptionStatus = results.subscriptionStatus;
    });

    this.appDataService.getPublishDetails().subscribe(data => {
      this.appPublishDetails = data;
      //Set the keyword and port to localstorage
      localStorage.setItem(this.sms.LOCALSTORAGE_KEYWORD_STRING,data.keyword);
      localStorage.setItem(this.sms.LOCALSTORAGE_PORT_STRING,data.port);
    });

    if(this.dataService.renewalIntervals.length>0) {
      this.renewalIntervals = this.dataService.renewalIntervals;
    }

    this.titleServ.currentTitle.subscribe(message => this.title = message);

    $(".navbar-2").on('show.bs.collapse', function () {
      $('.mobileTitle').removeClass('visible-xs');
      $('.mobileTitle').addClass('hidden');
    });

    $(".navbar-2").on('hide.bs.collapse', function () {
      $('.mobileTitle').addClass('visible-xs');
      $('.mobileTitle').removeClass('hidden');
    });

    this.messageService.getMessage().subscribe(data => {
      console.log('messageService.getMessage in Header Component =>', data);
      if (data.subscription) {
        this.dataService.subscriptionStatus = data.subscription.subscriptionStatus;
      } else {
        this.dataService.subscriptionStatus = null;
      }
      this.subscriptionStatus = this.dataService.subscriptionStatus;
    });
  }

  ngDoCheck() {
    this.subscriptionStatus = this.dataService.subscriptionStatus;
    this.displayMessage = this.dataService.displayMessage;
    this.pushMessage = this.dataService.pushMessage;
  }

  navigate(route: string, name: string) {
    if (name === '') {
      this.title = (<any>data).name;
    } else {
      this.title = name;
    }
    this.router.navigate([route]);
    this.closeNav();

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
    if(this.templateName == "News" || this.templateName == "Magazine" ){
      document.getElementById("mySidenav").style.height = "100%";
      document.getElementById("header").style.height = "100%";
    }
    else{
      document.getElementById("mySidenav").style.width = "100%";
      document.getElementById("header").style.height = "100%";
    }

  }

  closeNav() {
    if(this.templateName == "News" || this.templateName == "Magazine" ){
      document.getElementById("mySidenav").style.height = "0";
      document.getElementById("header").style.height = "initial";
    }
    else{
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("header").style.height = "initial";
    }

  }

  close() {
    this.isUnsubscribing = false;
    this.isSubscribing = false;
  }

  openRegisterModel() {
      $(() => {
        $('#registerModel').modal('show');
      });
  }

  openMyAccountModel(){
      $(() => {
        $('#myAccountModel').modal('show');
      });
  }

  onSubscribe() {
    if (!this.isFromCMSAppView) {
      this.alive = true;

      //Send Registration SMS
      headerCmp.sms.sendRegistrationSMS(headerCmp.smsSuccessRegistrationCallback, headerCmp.smsErrorRegistrationCallback);
      var uuid = localStorage.getItem("UUID");
      let data = { appId: this.appId, uuId: uuid };
      this.dataService.numberOfTries = 1;
      this.isSubscribing = true;

      //This will periodically check whether the User had subscribed to the Service successfully
      IntervalObservable.create(5000)
        .takeWhile(() => this.alive) // only fires when component is alive
        .subscribe(() => {
          if(this.dataService.numberOfTries==this.dataService.defaultNumberOfTries) {
            this.alive = false;
            this.timeoutSubscriptionPopup();
            return;
          }
          this.dataService.numberOfTries++;

          this.subscription.getSubscribedData(data).subscribe(data => {
            this.subscriptionStatus = data.subscriptionStatus;
            this.dataService.subscriptionStatus = data.subscriptionStatus;

            if(data.isError){
              this.alive = false;
              this.dataService.displayMessage = data.displayMessage;
              $(() => {
                $('#registerModel').modal('toggle');
                $('#appStatusModel').modal('show');
              });
              this.closeNav();

            }else if (this.subscriptionStatus === this.dataService.STATUS_SUBSCRIBED) {
              this.isSubscribing = false;
              localStorage.setItem(this.appId + "msisdn", data.msisdn)
              this.alive = false;
              //close the model
              $(() => {
                $('#registerModel').modal('toggle');
              });
              //close the nav bar
              this.closeNav();

            }
          });
        });
    }
  }

  onUnsubscribe() {
    if (!this.isFromCMSAppView) {
      this.alive = true;

      this.dataService.numberOfTries = 1;

      //Send Un-Registration SMS
      headerCmp.sms.sendUnRegistrationSMS(headerCmp.smsSuccessUnRegistrationCallback, headerCmp.smsErrorUnRegistrationCallback);

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

          this.subscription.getSubscribedData(data).subscribe(data => {
            this.subscriptionStatus = data.subscriptionStatus;
            this.dataService.subscriptionStatus = data.subscriptionStatus;

            if (this.subscriptionStatus === this.dataService.STATUS_UNSUBSCRIBED) {
              this.isUnsubscribing = false;
              localStorage.removeItem(this.appId + "msisdn")
              this.alive = false;
              this.router.navigate(['']);
              $(() => {
                this.unSubscribedSuccessPopup();
              });
              this.closeNav();

            }
          });
        });
    }
  }

  smsSuccessRegistrationCallback(results: any) {
    console.log("smsSuccessRegistrationCallback in Header Component: " + results);
  }

  smsErrorRegistrationCallback(error: any) {
    console.log("smsErrorRegistrationCallback in Header Component: " + error);
    headerCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to subscribe to the service';
    $(() => {
      $('#registerModel').modal('hide');
      $('#appStatusModel').modal('show');
    });
  }

  smsSuccessUnRegistrationCallback(results: any) {
    console.log("smsSuccessUnRegistrationCallback in Header Component: " + results);
  }

  smsErrorUnRegistrationCallback(error: any) {
    console.log("smsErrorUnRegistrationCallback in Header Component: " + error);
    headerCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to send the sms to unsubscribe from the service';
    $(() => {
      $('#myAccountModel').modal('toggle');
      $('#appStatusModel').modal('show');
    });
  }

  timeoutSubscriptionPopup(){
    this.dataService.displayMessage = 'The subscription process timed out. We are unable to subscribe you to the service at this time.';
    $(() => {
      $('#registerModel').modal('hide');
      $('#appStatusModel').modal('show');
    });
  }

  timeoutUnubscriptionPopup(){
    this.dataService.displayMessage = 'The unsubscription process timed out, Please try again.';
    $(() => {
      $('#myAccountModel').modal('toggle');
      $('#appStatusModel').modal('show');
    });
  }

  unSubscribedSuccessPopup(){
    this.dataService.displayMessage = 'You got unsubscribed from the service';
    $(() => {
      $('#myAccountModel').modal('toggle');
      $('#appStatusModel').modal('show');
    });
  }

  getRenewalIntervalNumberOfDaysByIntervalCode(code: string){
    return this.appDataService.getRenewalIntervalNumberOfDaysByIntervalCode(code);
  }
}
