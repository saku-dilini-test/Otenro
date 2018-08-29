import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import { IonicPage, NavParams, Platform,MenuController } from 'ionic-angular';

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
              sanitizer: DomSanitizer,public platform: Platform,public navParams: NavParams,public menu: MenuController) {
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


