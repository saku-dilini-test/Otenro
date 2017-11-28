import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-terms',
  templateUrl: './app/page-body/terms/terms.component.html',
  styleUrls: ['./app/page-body/terms/terms.component.css']
})
export class TermsComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private terms;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get( SERVER_URL + '/templates/getTermsAndConditions?appId='+this.appId).subscribe((data)=> {
      console.log("TermAndCondistion data " + data);
      this.terms = data.termsAndCondition;
  }),((err)=> {
      alert('warning,Unable to get terms & condition info');
  });

this.terms = "This is terms and condition of this application ";
  }



  slides = SLIDES;

}

const SLIDES = [
  { src:'https://images.alphacoders.com/308/thumb-1920-308361.jpg', title:'Terms and Conditions' }]
