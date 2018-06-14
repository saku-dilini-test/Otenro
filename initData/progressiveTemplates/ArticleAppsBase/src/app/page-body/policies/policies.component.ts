import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SERVER_URL } from 'app/constantsService';

@Component({
  selector: 'app-policies',
  templateUrl: './app/page-body/policies/policies.component.html',
  styleUrls: ['./app/page-body/policies/policies.component.css']
})
export class PoliciesComponent implements OnInit {

  private privacyPolicy;
  private returnPolicy;
  private terms; defaultTerms;
  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {
    this.title.changeTitle("Policies");
  }

  ngOnInit() {

    this.appdataService.getPolicies()
      .subscribe((data) => {
        this.privacyPolicy = data.privacyPolicy;
        this.returnPolicy = data.returnPolicy;
        this.terms = data.termsAndCondition;
      }, (err) => {
        console.log(err);
      });

    this.http.get(SERVER_URL + "/templates/getDefaultTerms", { responseType: 'text' }).subscribe(res => {

      this.defaultTerms = res;

    })
  }

}
