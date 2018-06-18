import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { TitleService } from '../../services/title.service';
import {CordovaPluginFirebaseService} from "../../services/cordova-plugin-services/cordova-plugin-firebase.service";
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

  constructor(private route: Router,
              private dataService: PagebodyServiceModule,
              private router: Router,
              private categoryService: CategoriesService,
              private device: CordovaPluginDeviceService,
              private title: TitleService,
              private  push: CordovaPluginFirebaseService) {

    this.title.changeTitle(data.name);
    homePageCmp = this;
  }

  ngOnInit() {
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
  navigateShop(val: string, id, name) {
    this.dataService.catId = id;
    this.router.navigate(['/' + val, id, name]);
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


}
