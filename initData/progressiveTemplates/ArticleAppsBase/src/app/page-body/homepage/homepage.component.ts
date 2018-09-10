import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { TitleService } from '../../services/title.service';
import { CordovaPluginFirebaseService } from "../../services/cordova-plugin-services/cordova-plugin-firebase.service";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { takeWhile } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import { SubscribedDataService } from '../../services/subscribed-data/subscribed-data.service'
import {CordovaPluginDeviceService} from "../../services/cordova-plugin-services/cordova-plugin-device.service";
import {SMSService} from "../../services/cordova-plugin-services/sms.service";
import { AppDataService } from "../../services/appdata-info/appdata-info.service";
import {ProductsService} from "../../services/products/products.service";
declare let $:any;
var homePageCmp;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

})
export class HomepageComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private imageUrl: any;
  results: {};
  private uuid;
  private subscriptionStatus;
  private localStorageUUIDString = "UUID";
  private appPublishDetails;
  private alive = true;
  isSubscribing = false;
  private isFromCMSAppView: boolean = false;
  constructor(private route: Router,
              private dataService: PagebodyServiceModule,
              private router: Router,
              private categoryService: CategoriesService,
              private device: CordovaPluginDeviceService,
              private title: TitleService,
              private sms: SMSService,
              private push: CordovaPluginFirebaseService,
              private subscription: SubscribedDataService,
              private productService: ProductsService,
              private appDataService: AppDataService) {

    this.title.changeTitle((<any>data).name);
    homePageCmp = this;
  }

  ngOnInit() {
    this.appDataService.getPublishDetails().subscribe(data => {
      this.appPublishDetails = data;
    });

    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView") == '1';

    $('#registerModelhome').on('hide.bs.modal', () => {
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

  loadArticle(catId,articleId){
    if(catId && articleId) {
      console.log("loadArticle for catId: " + catId + " articleId: " + articleId);

      this.dataService.catId = catId;
      this.productService.getProducts().subscribe(articles => {
          console.log("<<<<<<<<Articles>>>>>>>>>");
          console.log(articles);
          var article = null;
          for (let i = 0; i < articles.length; i++) {
            console.log("articles[i].id=>" + articles[i].id)
            if (articles[i].id === articleId) {
              article = articles[i];
            }
          }

          if (article) {
            this.dataService.data = article;
            this.route.navigate(['product', article.title]);
          } else {
            console.log("Article not found for the catId: " + catId + " articleId: " + articleId);
          }
        },
        error => {
          console.log('Error shop service');
        });
    }
  }

  // Routing Method
  navigateShop(val: string, id, name,image) {
    this.isSubscribing = false;
    if (this.isFromCMSAppView) {
      this.dataService.catId = id;
      this.router.navigate(['/' + val, id, name,image]);
    } else {
      let data = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn") }
      this.subscription.getSubscribedData(data).subscribe(data => {
        if(data.isError){
          this.dataService.displayMessage = data.displayMessage;
          $(() => {
            $('#appStatusModel').modal('show');
          });
        } else {
          this.subscriptionStatus = data.isSubscribed;
          if (this.subscriptionStatus) {
            this.isSubscribing = false;
            localStorage.setItem(this.appId + "msisdn", data.msisdn);

            this.dataService.catId = id;
            this.router.navigate(['/' + val, id, name,image]);
          } else {
            this.dataService.subUserArticleData.id = id;
            this.dataService.subUserArticleData.name = name;
            this.dataService.subUserArticleData.image = image;
            this.isSubscribing = false;
            $('#registerModelhome').modal('show')
          }
        }
      });

    }
  }

  pushSuccessCallback(token: any) {
    console.log("Push Token: " + token);
    var data = 'deviceId=' + token + '&uuid=' + homePageCmp.uuid;
    try {
          homePageCmp.categoryService.sendDeviceToken(data).subscribe(data => {
            console.log("Device token persisted successfully");
            homePageCmp.callOnNotificationOpen();
        },
        error => {
          console.log('Error while sending the device token to be persist.Error: ' + error);
          homePageCmp.callOnNotificationOpen();
        });
    }catch(err){
      console.log("Exception in pushSuccessCallback: " + err);
    }
  }

  pushErrorCallback(error: any) {
    console.log("pushErrorCallback=>" + error);
  }

  generatePushToken(){
    console.log("Call generatePushToken in homepage");
    homePageCmp.push.getToken(homePageCmp.pushSuccessCallback, homePageCmp.pushErrorCallback);
  }

  onNotificationOpenSuccessCallback(notification: any) {
    console.log("inside onNotificationOpenSuccessCallback notification: " + JSON.stringify(notification));
    if(notification.tap && notification.categoryId && notification.articleId && localStorage.getItem(homePageCmp.appId + "msisdn")) {
      homePageCmp.loadArticle(notification.categoryId, notification.articleId);
    }else if(!notification.tap && notification.body){
      homePageCmp.dataService.pushMessage = notification.body;
      $(() => {
        $('#appStatusModel').modal('hide');
        $('#appPushNotificationModel').modal('show');
      });
    }
  }

  onNotificationOpenErrorCallback(error: any) {
    console.log("onNotificationOpenErrorCallback=>" + error);
  }

  callOnNotificationOpen(){
    console.log("Call callOnNotificationOpen in homepage");
    homePageCmp.push.onNotificationOpen(homePageCmp.onNotificationOpenSuccessCallback, homePageCmp.onNotificationOpenErrorCallback);
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
    if(!homePageCmp.sms.isServiceConfigured()){
      alert("Service not yet configured, please contact support.");
      return;
    }

    //Send Registration SMS
    homePageCmp.sms.sendRegistrationSMS(homePageCmp.smsSuccessRegistrationCallback, homePageCmp.smsErrorRegistrationCallback);
    var uuid = localStorage.getItem("UUID");
    let data = {appId:this.appId,uuId: uuid}
    this.alive = true;
    this.isSubscribing = true;
    this.dataService.numberOfTries = 1;

    IntervalObservable.create(5000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        console.log('# of tries: ' + this.dataService.numberOfTries);
        if(this.dataService.numberOfTries==this.dataService.defaultNumberOfTries) {
          this.alive = false;
          this.timeoutSubscriptionPopup();
          return;
        }
        console.log('Try Sub: ' + this.dataService.numberOfTries);
        this.dataService.numberOfTries++;

        this.subscription.getSubscribedData(data).subscribe(data => {
          this.subscriptionStatus = data.isSubscribed;
          this.dataService.subscriptionStatus = data.isSubscribed;
          if (data.isError) {
            this.alive = false;
            this.dataService.displayMessage = data.displayMessage;
            $(() => {
              $('#registerModelhome').modal('hide');
              $('#appStatusModel').modal('show');
            });
          } else if (this.subscriptionStatus) {
            this.isSubscribing = false;
            localStorage.setItem(this.appId + "msisdn", data.msisdn)
            this.alive = false;
            this.dataService.catId = this.dataService.subUserArticleData.id;
            this.router.navigate(['/shop',
                                  this.dataService.subUserArticleData.id,
                                  this.dataService.subUserArticleData.name,
                                  this.dataService.subUserArticleData.image]);

            $(() => {
              $('#registerModelhome').modal('hide');
            });
          }
        });
      });
  }

  smsSuccessRegistrationCallback(results: any) {
    console.log("smsSuccessRegistrationCallback in homepage Component: " + results);
  }

  smsErrorRegistrationCallback(error: any) {
    console.log("smsErrorRegistrationCallback in homepage Component: " + error);
    homePageCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to subscribe to the service';
    $(() => {
      $('#registerModelhome').modal('hide');
      $('#appStatusModel').modal('show');
    });
  }

  timeoutSubscriptionPopup(){
    this.dataService.displayMessage = 'The subscription process timed out. We are unable to subscribe you to the service at this time.';
    $(() => {
      $('#registerModelhome').modal('hide');
      $('#appStatusModel').modal('show');
    });
  }
}
