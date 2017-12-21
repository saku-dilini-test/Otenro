import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from '../../services/appdatainfo.service'

@Component({
  selector: 'app-terms',
  // templateUrl: './terms.component.html',
  templateUrl: './app/page-body/terms/terms.component.html',
  // styleUrls: ['./terms.component.css']
  styleUrls: ['./app/page-body/terms/terms.component.css']
})
export class TermsComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private terms;
  constructor(private appDataService: AppDataService,private http: HttpClient) { }

  ngOnInit() {
    this.appDataService.getTerms().subscribe((data)=> {
        this.terms = data.termsAndCondition;
    }),((err)=> {
        console.log(err);
    });

  }



  slides = SLIDES;

}

const SLIDES = [
  { src:'https://images.alphacoders.com/308/thumb-1920-308361.jpg', title:'Terms and Conditions' }]
