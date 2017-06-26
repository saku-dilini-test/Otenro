import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './app/page-body/terms/terms.component.html',
  styleUrls: ['./app/page-body/terms/terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



  slides = SLIDES;

}

const SLIDES = [
  { src:'https://images.alphacoders.com/308/thumb-1920-308361.jpg', title:'Terms and Conditions' }]