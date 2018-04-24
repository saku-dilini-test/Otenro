import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
