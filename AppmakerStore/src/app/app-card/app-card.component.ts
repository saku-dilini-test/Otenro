import { Component, OnInit, Input } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { AppmakerStoreService } from '../providers/appmaker-store.service';
import { saveAs } from 'file-saver'
declare const $: any;

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {

  @Input() app: any;
  appIcon: any;
  constructor(private appmakerStoreService: AppmakerStoreService) {}

  ngOnInit() {
    if (this.app) {
      this.appIcon = ENV.CMS_API + "templates/viewWebImages?userId=" + this.app.userId
      + "&appId=" + this.app.appId + "&" + new Date().getTime() + "&images=publish/0.png";
    }
  }

  onClickAppDetailsHandler(app: any) {

    $('#' + app.appId).modal('show');
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
