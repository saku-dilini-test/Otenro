import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './app/page-body/shop/shop.component.html',
  styleUrls: ['./app/page-body/shop/shop.component.css'],
})

export class ShopComponent implements OnInit {
	  public someRange: number[] = [3, 7];

  constructor() { 
	}

	  ngOnInit() {
	}


  onChange(value: any) {
    console.log('Value changed to', value);
  }

  slides = SLIDES;

}

const SLIDES = [
  { src:'https://aos-articlesofstylel.netdna-ssl.com/wp-content/uploads/2014/01/Ebay.jpg', title:"Men's Wear"}]