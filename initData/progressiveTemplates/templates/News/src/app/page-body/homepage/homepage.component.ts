import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { TitleService } from '../../services/title.service';
import {CordovaPluginFirebaseService} from "../../services/cordova-plugin-services/cordova-plugin-firebase.service";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { takeWhile } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import { SubscribedDataService } from '../../services/subscribed-data/subscribed-data.service'
import {CordovaPluginDeviceService} from "../../services/cordova-plugin-services/cordova-plugin-device.service";
import {SMSService} from "../../services/cordova-plugin-services/sms.service";
import { AppDataService } from "../../services/appdata-info/appdata-info.service";

var homePageCmp;

@Component({
    selector: 'app-homepage',
    templateUrl: './app/page-body/homepage/homepage.component.html',
    styleUrls: ['./app/page-body/homepage/homepage.component.css'],

})
export class HomepageComponent implements OnInit {

    private appId = (<any>data).appId;
    private userId = (<any>data).userId;
    private categoryId;
    private categoryName;
    private imageUrl: any;
    private products: any;
    private results: {};
    private randomIndex;
    private imageUrlProd;
    private randomedArr = [];
    private sliderData: any;
    private imageUrlSlider;
    private catName;
    private isSliderDataAvailable: boolean = false;
    private isRandomProducts;
    private uuid;
    private subscriptionStatus;
    private deviceUUID;
    private localStorageUUIDString = "UUID";
    private appPublishDetails;
    private alive = true;
    private isSubscribing = false;
    private isFromCMSAppView: boolean = false;

  constructor(private route: Router,
              private dataService: PagebodyServiceModule,
              private router: Router,
              private categoryService: CategoriesService,
              private device: CordovaPluginDeviceService,
              private title: TitleService,
              private sms: SMSService,
              private push: CordovaPluginFirebaseService,
              private subscription:SubscribedDataService,
              private appDataService: AppDataService,) {

        this.title.changeTitle(data.name);
        homePageCmp = this;
    }

    ngOnInit() {

    this.appDataService.getPublishDetails().subscribe(data => {
      this.appPublishDetails = data;
    });

    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView")=='1';

    $('#registerModelhome').on('hide.bs.modal', ()=>{
          console.log('close');

          this.alive = false;
          this.isSubscribing = false;
        });

        this.isSubscribing = false;

        if (!this.isFromCMSAppView) {
          this.getDeviceUUID();
        }

        this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
            + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

        this.categoryService.getCategories().subscribe(data => {
                if (data.length > 0) {
                    // Read the result field from the JSON response.
                    this.results = data;
                    this.dataService.searchArray = [];
                    data.forEach(element => {
                        this.dataService.searchArray.push({ 'name': element.name, 'id': element.id });
                    });
                } else {
                    this.results = null;
                }


            },
            error => {
                console.log('Error retrieving categories');
            });

    }


  // Routing Method
  navigateShop(val: string, id, name,image) {

    this.subscription.getAppStatus({ appId: this.appId }).subscribe(data => {
        this.appStatus = data.isActive;
        this.dataService.appStatus = this.appStatus;
        if (this.appStatus == false || this.appStatus == "false") {
          $(() => {
            $('#appStatusModel').modal('show');
          });
        } else {
          this.isSubscribing = false;

          if (this.isFromCMSAppView) {
            this.dataService.catId = id;
            this.router.navigate(['/' + val, id, name,image]);
          } else {
            let data = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn") }
            this.subscription.getSubscribedData(data).subscribe(data => {
              this.subscriptionStatus = data.isSubscribed;
              if (this.subscriptionStatus) {
                this.isSubscribing = false;
                localStorage.setItem(this.appId + "msisdn", data.msisdn);

                this.dataService.catId = id;
                this.router.navigate(['/' + val, id, name,image]);
              } else {
                this.dataService.subUserArticleData.id = id;
                this.dataService.subUserArticleData.name = name;
                this.isSubscribing = false;
                $('#registerModelhome').modal('show')
              }
            });

          }
        }
      });

  }

  pushSuccessCallback(token: any){
    console.log("Push Token: " + token);

    var data = 'deviceId=' + token + '&uuid=' + homePageCmp.uuid;

    console.log(">>>>>>>>>" + data + "<<<<<<<<<<<");

    try {
          homePageCmp.categoryService.sendDeviceToken(data).subscribe(data => {
            console.log("Device token persisted successfully");
        },
        error => {
          console.log('Error while sending the device token to be persist.Error: ' + error);
        });
    }catch(err){
      console.log("Exception in pushSuccessCallback: " + err);
    }
  }

  pushErrorCallback(error: any){
    console.log("pushErrorCallback=>" + error);
  }

  generatePushToken(){
    console.log("Call generatePushToken in homepage");
    homePageCmp.push.getToken(homePageCmp.pushSuccessCallback, homePageCmp.pushErrorCallback);
  }

  deviceUUIDCallback(uuid: any){
    var uuidLocalStorage = localStorage.getItem(homePageCmp.localStorageUUIDString);
    if(!uuidLocalStorage && uuid) {
      localStorage.setItem(homePageCmp.localStorageUUIDString,uuid);
    }

    homePageCmp.uuid = uuid;
    homePageCmp.generatePushToken();
  }

  getDeviceUUID(){
    var uuidLocalStorage = localStorage.getItem(this.localStorageUUIDString);
    if(uuidLocalStorage) {
      this.deviceUUIDCallback(uuidLocalStorage);
    }else {
      this.device.getUUID(homePageCmp.deviceUUIDCallback);
    }
  }

  onCancel(){
    this.isSubscribing = false;
    this.alive = false;
  }

  onSubscribe(){
    //Send Registration SMS
    this.sms.sendRegistrationSMS(this.smsSuccessRegistrationCallback, this.smsErrorRegistrationCallback);

    var uuid = localStorage.getItem("UUID");

    let data = {appId:this.appId,uuId: uuid}
    console.log(this.subscriptionStatus);
    this.alive = true;
    this.isSubscribing = true;

    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.subscription.getSubscribedData(data).subscribe(data =>{
          console.log(data);
          this.subscriptionStatus = data.isSubscribed;
          this.dataService.subscriptionStatus = data.isSubscribed;
          if(this.subscriptionStatus == true){
            this.isSubscribing = false;
            localStorage.setItem(this.appId+"msisdn",data.msisdn)
             this.alive = false;
              //close the model
              $(()=> {
                $('#registerModelhome').modal('hide');
                this.router.navigate(['/' + "shop", this.dataService.subUserArticleData.id, this.subscriptionStatus.name]);
             });
             //close the nav bar
            //  document.getElementById("mySidenav").style.width = "0";
          }
        });
      });
    }

  smsSuccessRegistrationCallback(results: any) {
    console.log("smsSuccessRegistrationCallback in homepage Component: " + results);
  }

  smsErrorRegistrationCallback(error: any) {
    console.log("smsErrorRegistrationCallback in homepage Component: " + error);
  }
}
