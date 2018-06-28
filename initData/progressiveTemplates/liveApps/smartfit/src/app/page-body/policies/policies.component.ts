import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-policies',
  templateUrl: './app/page-body/policies/policies.component.html',
  styleUrls: ['./app/page-body/policies/policies.component.css']
})
export class PoliciesComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private privacyPolicy;
  private returnPolicy;
  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {
    this.title.changeTitle("Policies");
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
