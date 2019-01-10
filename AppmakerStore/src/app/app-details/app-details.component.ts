import { Component, OnInit, Input, Inject } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { AppmakerStoreService } from '../providers/appmaker-store.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {

  @Input()app: any;
  appIcon: any;
  featuredImage: any;
  constructor(private appmakerStoreService: AppmakerStoreService) { }

  ngOnInit() {
    if (this.app) {
      this.appIcon = ENV.CMS_API + "templates/viewWebImages?userId=" + this.app.userId
      + "&appId=" + this.app.appId + "&" + new Date().getTime() + "&images=publish/0.png";

      this.featuredImage = ENV.CMS_API + "templates/viewWebImages?userId=" + this.app.userId
      + "&appId=" + this.app.appId + "&" + new Date().getTime() + "&images=publish/1.png";
    }
  }

  apkDownloadHandler(app: any) {

    if (app.publishStatus === 'APPROVED' && app.playstoreLink) {
      window.open(app.playstoreLink);
    }
    else if (app.apkStatus === 'SUCCESS') {
      
      const body = {
        appId: app.appId,
        userId: app.userId,
        appName: app.appName
      }

      this.appmakerStoreService.downloadApk(body).subscribe(res => {

        saveAs(res)
      });
    } 
    else {
      console.log("app is not available yet!");
    }
  }

}
