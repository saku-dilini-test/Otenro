import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './app/page-body/checkout/checkout.component.html',
  styleUrls: ['./app/page-body/checkout/checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slides = SLIDES;

}

const SLIDES = [
  { 
  	src:'http://orig12.deviantart.net/c024/f/2010/205/0/e/confession_of_a_shopaholic_by_cornerart.jpg', title:'Checkout'
  }]