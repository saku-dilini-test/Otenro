import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../assets/madeEasy.json';
import { AppDataService } from '../services/appdata-info/appdata-info.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { SERVER_URL } from '../../assets/constantsService';
import { OrdersService } from '../services/orders/orders.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  public loginStatus;
  webInfo: any;
  title: any;
  imageUrl;
  dummy: any;
  ipgInfo: any = null;

  constructor(private router: Router, private appDataService: AppDataService,
    private localStorageService: LocalStorageService, private ordersService: OrdersService) {
    this.appDataService.getContactUs().subscribe((data: any) => {
      this.webInfo = data.contactInfo;
      this.dummy = new Date().getTime();
    }), ((err) => {
      console.log("Error when fetching ContactUsInfo: " + JSON.stringify(err));
    });
    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=";

    this.ordersService.getIPGinfo().subscribe(data => {
      this.ipgInfo = data;
      console.log(data);
    });
  }


  ngAfterContentChecked() {
    if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
      this.loginStatus = true;

    } else {
      this.loginStatus = false;

    }
  }

  navigate(route: string, name: string) {
    this.title = name;
    if (name == "Contact Us") {
      this.router.navigate([route]);
    } else {
      this.router.navigate([route, name]);
    }
  }

  getTwitterUrl(): string {
    return this.isTwitterUrlExists() ? this.webInfo.twitter : '';
  }

  isTwitterUrlExists(): boolean {
    return this.webInfo && this.webInfo.twitter && this.webInfo.twitter.length > 0;
  }

  getFacebookUrl(): string {
    return this.isFacebookUrlExists() ? this.webInfo.facebook : '';
  }

  isFacebookUrlExists(): boolean {
    return this.webInfo && this.webInfo.facebook && this.webInfo.facebook.length > 0;
  }

  getInstagramrUrl(): string {
    return this.isInstagramUrlExists() ? this.webInfo.instagram : '';
  }

  isInstagramUrlExists(): boolean {
    return this.webInfo && this.webInfo.instagram && this.webInfo.instagram.length > 0;
  }

  getPinterestrUrl(): string {
    return this.isPinterestUrlExists() ? this.webInfo.pinterest : '';
  }

  isPinterestUrlExists(): boolean {
    return this.webInfo && this.webInfo.pinterest && this.webInfo.pinterest.length > 0;
  }

  getLinkedInUrl(): string {
    return this.isLinkedInUrlExists() ? this.webInfo.linkedin : '';
  }

  isLinkedInUrlExists(): boolean {
    return this.webInfo && this.webInfo.linkedin && this.webInfo.linkedin.length > 0;
  }

  isShowFollowUs(): boolean {
    return this.isTwitterUrlExists() || this.isFacebookUrlExists() || this.isInstagramUrlExists() || this.isPinterestUrlExists() || this.isLinkedInUrlExists();
  }

  /**
   * added by .sanira
   * this method will check whether the app creator was enabled any payment method or not
   */
  isIpgInfoExists(): boolean {
    return (
      this.ipgInfo &&
      (this.ipgInfo.paypalEnable ||
        this.ipgInfo.cashOnDeliveryEnable ||
        this.ipgInfo.cashOnPickupEnable ||
        this.ipgInfo.payHereEnable ||
        this.ipgInfo.authorizeNetEnable ||
        this.ipgInfo.stripeEnable ) > 0
    );
  }
}
