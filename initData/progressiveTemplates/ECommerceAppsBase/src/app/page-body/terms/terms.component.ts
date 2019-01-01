import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  terms;
  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {
    this.title.changeTitle("Terms & Conditions");

    window.scrollTo(0, 0);
  }

  ngOnInit() {

    this.appdataService.getTerms().subscribe((data) => {
      this.terms = data.termsAndCondition;
    }), ((err) => {
      console.log(err);
    });

  }

}

