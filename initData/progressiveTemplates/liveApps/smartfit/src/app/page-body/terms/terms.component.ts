import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-terms',
  templateUrl: './app/page-body/terms/terms.component.html',
  styleUrls: ['./app/page-body/terms/terms.component.css']
})
export class TermsComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private terms;
  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {
    this.title.changeTitle("Terms & Conditions");
  }

  ngOnInit() {

    this.appdataService.getTerms().subscribe((data) => {
      this.terms = data.termsAndCondition;
    }), ((err) => {
      console.log(err);
    });

  }

}

