import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../madeEasy.json';
import { AppDataService } from '../services/appdata-info/appdata-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app/footer/footer.component.html',
  styleUrls: ['./app/footer/footer.component.css']
})
export class FooterComponent{

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  webInfo: any;

  constructor(private router: Router, private appDataService: AppDataService) {
    this.appDataService.getContactUsInfo().subscribe((data: any) => {
      this.webInfo = data;
    }),((err) => {
      console.log("Error when fetching ContactUsInfo: " + JSON.stringify(err));
    });
  }

  navigate(val: string) {
    this.router.navigate([val])
  }

  getTwitterUrl(): string{
    return this.isTwitterUrlExists()? this.webInfo.twitter: '';
  }

  isTwitterUrlExists(): boolean{
    return this.webInfo && this.webInfo.twitter && this.webInfo.twitter.length > 0;
  }

  getFacebookUrl(): string{
    return this.isFacebookUrlExists()? this.webInfo.facebook: '';
  }

  isFacebookUrlExists(): boolean{
    return this.webInfo && this.webInfo.facebook && this.webInfo.facebook.length > 0;
  }

  getInstagramrUrl(): string{
    return this.isInstagramUrlExists()? this.webInfo.instagram: '';
  }

  isInstagramUrlExists(): boolean{
    return this.webInfo && this.webInfo.instagram && this.webInfo.instagram.length > 0;
  }

  getPinterestrUrl(): string{
    return this.isPinterestUrlExists()? this.webInfo.pinterest: '';
  }

  isPinterestUrlExists(): boolean{
    return this.webInfo && this.webInfo.pinterest && this.webInfo.pinterest.length > 0;
  }

  getLinkedInUrl(): string{
    return this.isLinkedInUrlExists()? this.webInfo.linkedin: '';
  }

  isLinkedInUrlExists(): boolean{
    return this.webInfo && this.webInfo.linkedin && this.webInfo.linkedin.length > 0;
  }

  isShowFollowUs(): boolean{
    return this.isTwitterUrlExists() || this.isFacebookUrlExists() || this.isInstagramUrlExists() || this.isPinterestUrlExists() || this.isLinkedInUrlExists();
  }
}
