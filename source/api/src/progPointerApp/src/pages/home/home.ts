import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import { IonicPage, NavParams, Platform,MenuController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { NoNetworkPage } from "../no-network/no-network";
import { AlertController } from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import { WebpageNotAvailablePage } from '../webpage-not-available/webpage-not-available';
let networkAlert = null;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private iframeSrc: any;
  public backButtonAction: any;

  sanitizer: DomSanitizer;
  url: string = 'PointerAppLink';//This will be replaceed by the app url while building the apk in EditController.buildSourceProg

  constructor(public navCtrl: NavController,
              sanitizer: DomSanitizer,
              public platform: Platform,
              private dataService: DataServiceProvider,
              public navParams: NavParams,
              public menu: MenuController,
              public alertCtrl: AlertController,
              private network: Network) {
    this.sanitizer = sanitizer;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url + "?" + new Date().getTime());

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need

      platform.registerBackButtonAction(() => {
        if(this.menu.isOpen()){
          console.log("in if");
           this.menu.close()
        }
        else if(this.navCtrl.canGoBack()){
          console.log("in else if");
          this.navCtrl.pop();
        }else{
          //don't do anything
        }
      });
    });

    this.dataService.makeRequest(this.url + "?" + new Date().getTime()).subscribe(response => {
      this.dataService.wasOnlineBefore = (response.status && response.status===200);
    }, err => {
      // If web page not available
      // Show the WebPageNotAvailabele page
      this.navCtrl.setRoot(WebpageNotAvailablePage);
    });

    // watch network for a disconnect
    this.network.onDisconnect().subscribe(() => {
      if(this.dataService.wasOnlineBefore) {
        if(!networkAlert) {
          networkAlert = this.alertCtrl.create({
            title: 'No Internet connection',
            subTitle: 'Please check your connection.',
            enableBackdropDismiss: false
          });
          networkAlert.present();
        }
      }else{
        this.navCtrl.setRoot(NoNetworkPage);
      }
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      if(this.dataService.wasOnlineBefore) {
        if(networkAlert) {
          networkAlert.dismiss();
          networkAlert = null;
        }
      }else{
        this.navCtrl.setRoot(HomePage);
      }
    });

  }
}

window.addEventListener('message', receiveMessage, false);

function receiveMessage(evt) {
  try {
    console.log('------------');
    console.log( decodeURI(evt.data));
    console.log('------------');
    eval('(' + decodeURI(evt.data) + ')();');
  } catch(e) {
    console.log("Error executing function on parent: " + JSON.stringify(e,null,2));
    console.log("Function: " + decodeURI(evt.data));
  }
}


