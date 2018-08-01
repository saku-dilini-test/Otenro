import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/appdata-info/appdata-info.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-policies',
  templateUrl: './app/page-body/policies/policies.component.html',
  styleUrls: ['./app/page-body/policies/policies.component.css']
})
export class PoliciesComponent implements OnInit {

  private privacyPolicy;
  private returnPolicy;
  private terms;
  constructor( private appdataService: AppDataService, private title: TitleService) {
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

  }
}
