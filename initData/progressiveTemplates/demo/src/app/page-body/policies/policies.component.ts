import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(SERVER_URL + "/templates/getPolicies?appId="+this.appId)
    .subscribe((data)=> {
        this.privacyPolicy = data.privacyPolicy;
        this.returnPolicy = data.returnPolicy;
    },(err)=> {
        alert(
            'Policies Data loading error!,Please check your connection!'
        );
    });
  }


  slides = SLIDES;

}

const SLIDES = [
  { src:'http://www.artleathercanada.com/images/1.jpg', title:'Privacy Policy' }]
