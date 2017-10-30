import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './app/page-body/policies/policies.component.html',
  styleUrls: ['./app/page-body/policies/policies.component.css']
})
export class PoliciesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  slides = SLIDES;

}

const SLIDES = [
  { src:'http://www.artleathercanada.com/images/1.jpg', title:'Privacy Policy' }]