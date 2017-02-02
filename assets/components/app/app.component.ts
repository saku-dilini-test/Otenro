import { Component, Inject } from '@angular/core';
import { AppService } from './app.service'

@Component({
  selector: 'my-app',
  template: `
  <h1>Hello and  {{title}}</h1>
  <div (click)="makeRequest()">click here</div>
  `,
  providers: [AppService]
})

export class AppComponent  { 
  title = "this is title";
  key1 = "key22";
  val1 = "val221";
  retStr: string = "";

  constructor(private myAppService: AppService) { }

  makeRequest():void{
    console.log('making a request');
    this.myAppService.makeRequest().then(ret => this.retStr = ret);
    console.log(this.retStr);
  }
}


