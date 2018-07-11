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
              private  push: CordovaPluginFirebaseService,
              private subscription:SubscribedDataService,) {

        this.title.changeTitle(data.name);
        homePageCmp = this;
    }

    ngOnInit() {

    this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView")=='1';

    $('#registerModelhome').on('hide.bs.modal', ()=>{
          console.log('close');

          this.alive = false;
          this.isSubscribing = false;
        });

        this.isSubscribing = false;
        this.generatePushToken();
        this.getDeviceUUID();

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

    this.isSubscribing = false;

    if(this.isFromCMSAppView) {
      this.dataService.catId = id;
      this.router.navigate(['/' + val, id, name,image]);
    }else{
      let data = {appId:this.appId,msisdn:localStorage.getItem(this.appId+"msisdn")}
      this.subscription.getSubscribedData(data).subscribe(data =>{
        console.log(data);
        this.subscriptionStatus = data.isSubscribed;
        this.dataService.subscriptionStatus = data.isSubscribed;
        if(this.subscriptionStatus == true){
          this.isSubscribing = false;
          localStorage.setItem(this.appId+"msisdn",data.msisdn);

          this.dataService.catId = id;
          this.router.navigate(['/' + val, id, name,image]);
        }else{
          this.dataService.subUserArticleData.id = id;
          this.dataService.subUserArticleData.name = name;
          this.isSubscribing = false;
          $('#registerModelhome').modal('show')
        }
      });

    }
  }

  pushSuccessCallback(token: any){
    console.log("Push Token: " + token);

    var data = 'deviceId=' + token + '&uuid=' + homePageCmp.uuid;

    console.log(">>>>>>>>>" + data + "<<<<<<<<<<<");

    try {
          homePageCmp.categoryService.sendDeviceToken(data).subscribe(data => {
        },
        error => {
          console.log('error in pushSuccessCallback: ' + error);
        });
    }catch(err){
      console.log("Exception in pushSuccessCallback: " + err);
    }
  }

  pushErrorCallback(error: any){
    console.log("pushErrorCallback=>" + error);
  }

  generatePushToken(){
    homePageCmp.push.getToken(homePageCmp.pushSuccessCallback, homePageCmp.pushErrorCallback);
  }

  deviceUUIDCallback(uuid: any){
    console.log("UUID: " + uuid);
    homePageCmp.uuid = uuid;

    homePageCmp.generatePushToken();
  }

  getDeviceUUID(){
    this.device.getUUID(homePageCmp.deviceUUIDCallback);
  }
onCancel(){
    this.isSubscribing = false;
    this.alive = false;
  }

  onSubscribe(){
    let data = {appId:this.appId,uuId:this.dataService.uuid}
    // this.getDeviceUUID();
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

}
