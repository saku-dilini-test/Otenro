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
  url: string = 'http://192.168.8.112/meServer/temp/5b036f2b898c60f612e9cf42/progressiveTemplates/5b039820c0e48edc1b353fd6/src/';

  constructor(public navCtrl: NavController,
              sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}

window.addEventListener('message', receiveMessage, false);

function receiveMessage(evt) {
  try {
    eval('(' + decodeURI(evt.data) + ')();');
  } catch(e) {
    console.log("Error executing function on parent: " + JSON.stringify(e,null,2));
    console.log("Function: " + decodeURI(evt.data));
  }
}
