import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './app/page-body/cart/cart.component.html',
  styleUrls: ['./app/page-body/cart/cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  slides = SLIDES;

  // Routing Method
  navigate(val:string){
    this.router.navigate([val])
  }

}

const SLIDES = [
  { 
  	src:'http://cdn.shopify.com/s/files/1/1462/1226/t/2/assets/slide_2_1024x1024.jpg?4259875999617597102', title:'Shopping Cart'
  }]