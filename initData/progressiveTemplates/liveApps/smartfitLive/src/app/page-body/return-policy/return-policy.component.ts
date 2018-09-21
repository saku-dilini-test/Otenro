import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-return-policy',
  templateUrl: './return-policy.component.html',
  styleUrls: ['./return-policy.component.css']
})
export class ReturnPolicyComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  privacyPolicy;
  returnPolicy;
  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {
    this.title.changeTitle("Return Policy");
  }

  ngOnInit() {

    this.appdataService.getPolicies()
      .subscribe((data) => {
        this.privacyPolicy = data.privacyPolicy;
        this.returnPolicy = data.returnPolicy;
      }, (err) => {
        console.log(err);
      });
  }
}
