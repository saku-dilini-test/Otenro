import { Component, OnInit } from '@angular/core';
// import { SERVER_URL } from '../../constantsService';
// import * as data from '../../madeEasy.json';
// import { HttpClient } from '@angular/common/http';
// import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-warranty-conditions',
  templateUrl: './warranty-conditions.component.html',
  styleUrls: ['./warranty-conditions.component.css']
})
export class WarrantyConditionsComponent implements OnInit {

  // private appId = (<any>data).appId;
  // private userId = (<any>data).userId;
  // privacyPolicy;
  // returnPolicy;
  constructor(private title: TitleService) {
    this.title.changeTitle("Warranty Conditions");
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
