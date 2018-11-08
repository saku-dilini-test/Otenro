import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SERVER_URL } from '../../../assets/constantsService';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  privacyPolicy;
  private returnPolicy;
  terms;
  defaultTerms;
  constructor(private http: HttpClient, private appdataService: AppDataService, private title: TitleService) {
    this.title.changeTitle("Policies");
    this.title.setLocation('policies');
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
