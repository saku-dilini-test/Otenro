import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './app/page-body/product/product.component.html',
  styleUrls: ['./app/page-body/product/product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slides = SLIDES;
}


const SLIDES = [
  { src:'./assets/images/slider/1.jpg', title:'Final Sale' },
];
