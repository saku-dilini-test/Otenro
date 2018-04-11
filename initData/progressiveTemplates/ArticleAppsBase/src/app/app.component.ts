import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from './constantsService';
import * as data from './madeEasy.json';
@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;

  constructor() {

  }

 

}

