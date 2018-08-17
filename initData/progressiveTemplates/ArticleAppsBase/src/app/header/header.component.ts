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
  private cartNo: number;
  public title: string;
  public hideBackOnHome: boolean;
  subscriptionStatus;
  private appPublishDetails;
  private alive = true;
  isSubscribing = false;
  isUnsubscribing = false;
  private isFromCMSAppView: boolean = false;
  displayMessage;
  logoUrl;

  constructor(private subscription: SubscribedDataService,
    private router: Router,
    private dataService: PagebodyServiceModule,
    private titleServ: TitleService,
    private location: Location,
    private sms: SMSService,
    private device: CordovaPluginDeviceService,
    private appDataService: AppDataService,
    private spinner: Ng4LoadingSpinnerService) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Your Horoscope';

    router.events.subscribe((val) => {
      // see also
      if (val['url'] == '/') {
        this.hideBackOnHome = false;
      } else {
        this.hideBackOnHome = true;

      }
    });

    headerCmp = this;

  }

  ngOnInit() {
    this.logoUrl = SERVER_URL + "/templates/viewWebImages?userId="
          + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images='

    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView") == '1';

    $('#registerModel').on('hide.bs.modal', () => {
      this.alive = false;
      console.log("model close " + this.alive);
      this.isSubscribing = false;
    });

    $('#myAccountModel').on('hide.bs.modal', () => {
      this.alive = false;
      console.log("model close " + this.alive);
      this.isUnsubscribing = false;
    });

    this.isSubscribing = false;
    this.isUnsubscribing = false;

    var msisdn = localStorage.getItem(this.appId + "msisdn");
    let data = { appId: this.appId, msisdn: msisdn }
    this.subscription.getSubscribedData(data).subscribe(data => {
      console.log(data);
      this.subscriptionStatus = data.isSubscribed;
      this.dataService.subscriptionStatus = data.isSubscribed;
    });


    this.appDataService.getPublishDetails().subscribe(data => {
      console.log(data);
      this.appPublishDetails = data;
      //Set the keyword and port to localstorage
      localStorage.setItem(this.sms.LOCALSTORAGE_KEYWORD_STRING,data.keyword);
      localStorage.setItem(this.sms.LOCALSTORAGE_PORT_STRING,data.port);
    })

    this.titleServ.currentTitle.subscribe(message => this.title = message);

    $(".navbar-2").on('show.bs.collapse', function () {
      $('.mobileTitle').removeClass('visible-xs');
      $('.mobileTitle').addClass('hidden');
    });

    $(".navbar-2").on('hide.bs.collapse', function () {
      $('.mobileTitle').addClass('visible-xs');
      $('.mobileTitle').removeClass('hidden');
    });
  }

  ngDoCheck() {
    this.subscriptionStatus = this.dataService.subscriptionStatus;
    this.displayMessage = this.dataService.displayMessage;
  }

  navigate(route: string, name: string) {
    this.title = name;
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

  close() {
    this.isUnsubscribing = false;
    this.isSubscribing = false;
  }

  openRegisterModel() {
    let data = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn") }
    this.subscription.getSubscribedData(data).subscribe(data => {
      if(data.isError){
        this.dataService.displayMessage = data.displayMessage;
        $(() => {
          $('#appStatusModel').modal('show');
        });
      } else {
        $(() => {
          $('#registerModel').modal('show');
        });
      }
    });
  }

  openMyAccountModel(){
    let data = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn") }
    this.subscription.getSubscribedData(data).subscribe(data => {
      if(data.isError){
        this.dataService.displayMessage = data.displayMessage;
        $(() => {
          $('#appStatusModel').modal('show');
        });
      } else {
        $(() => {
          $('#myAccountModel').modal('show');
        });
      }
    });
  }

  onSubscribe() {
    if (!this.isFromCMSAppView) {
      this.alive = true;

      //Send Registration SMS
      headerCmp.sms.sendRegistrationSMS(headerCmp.smsSuccessRegistrationCallback, headerCmp.smsErrorRegistrationCallback);

      var uuid = localStorage.getItem("UUID");

      let data = { appId: this.appId, uuId: uuid };
      this.getSubscription(data);
    }
  }

  getSubscription(data) {

    this.isSubscribing = true;

    //This will periodically check whether the User had subscribed to the Service successfully
    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.subscription.getSubscribedData(data).subscribe(data => {
          console.log(data);
          this.subscriptionStatus = data.isSubscribed;
          this.dataService.subscriptionStatus = data.isSubscribed;
          if (this.subscriptionStatus == true) {
            this.isSubscribing = false;
            localStorage.setItem(this.appId + "msisdn", data.msisdn)
            this.alive = false;
            //close the model
            $(() => {
              $('#registerModel').modal('toggle');
            });
            //close the nav bar
            document.getElementById("mySidenav").style.width = "0";
          }
        });
      });

  }

  onUnsubscribe() {
    if (!this.isFromCMSAppView) {
      this.alive = true;

      //Send Un-Registration SMS
      headerCmp.sms.sendUnRegistrationSMS(headerCmp.smsSuccessUnRegistrationCallback, headerCmp.smsErrorUnRegistrationCallback);

      var uuid = localStorage.getItem("UUID");

      let data = { appId: this.appId, uuId: uuid }
      this.isUnsubscribing = true;

      IntervalObservable.create(5000)
        .takeWhile(() => this.alive) // only fires when component is alive
        .subscribe(() => {
          this.subscription.getSubscribedData(data).subscribe(data => {
            console.log(data);
            this.subscriptionStatus = data.isSubscribed;
            this.dataService.subscriptionStatus = data.isSubscribed;
            if (this.subscriptionStatus == false) {
              this.isUnsubscribing = false;
              localStorage.removeItem(this.appId + "msisdn")
              this.alive = false;
              //close the model
              $(() => {
                $('#myAccountModel').modal('toggle');
              });
              //close the nav bar
              document.getElementById("mySidenav").style.width = "0";
            }
          });
        });
    }
  }

  smsSuccessRegistrationCallback(results: any) {
    console.log("smsSuccessRegistrationCallback in Header Component: " + results);
    $('#myAccountModel').modal('hide');
  }

  smsErrorRegistrationCallback(error: any) {
    console.log("smsErrorRegistrationCallback in Header Component: " + error);
  }

  smsSuccessUnRegistrationCallback(results: any) {
    console.log("smsSuccessUnRegistrationCallback in Header Component: " + results);
  }

  smsErrorUnRegistrationCallback(error: any) {
    console.log("smsErrorUnRegistrationCallback in Header Component: " + error);
  }
}
