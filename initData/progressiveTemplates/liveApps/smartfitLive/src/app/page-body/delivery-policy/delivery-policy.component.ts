import { Component, OnInit } from '@angular/core';
// import { SERVER_URL } from '../../constantsService';
// import * as data from '../../madeEasy.json';
// import { HttpClient } from '@angular/common/http';
// import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-delivery-policy',
  templateUrl: './delivery-policy.component.html',
  styleUrls: ['./delivery-policy.component.css']
})
export class DeliveryPolicyComponent implements OnInit {

  // private appId = (<any>data).appId;
  // private userId = (<any>data).userId;
  // privacyPolicy;
  // returnPolicy;
  constructor( private title: TitleService) {
    this.title.changeTitle("Delivery Policy");
  }

  ngOnInit() {

    // this.appdataService.getPolicies()
    //   .subscribe((data) => {
    //     this.privacyPolicy = data.privacyPolicy;
    //     this.returnPolicy = data.returnPolicy;
    //   }, (err) => {
    //     console.log(err);
    //   });
  }
}
