import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private iframeSrc: any;
  sanitizer: DomSanitizer;
  url: string = 'PointerAppLink';//This will be replaceed by the app url while building the apk in EditController.buildSourceProg

  constructor(public navCtrl: NavController,
              sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url + "?" + new Date().getTime());
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


