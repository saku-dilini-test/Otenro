import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CarouselComponent } from '../../addons/carousel/carousel.component';
import { MarketingOption1LeftComponent } from '../../addons/marketing-option1-left/marketing-option1-left.component';
import { MarketingOption1RightComponent } from '../../addons/marketing-option1-right/marketing-option1-right.component';



@Component({
  selector: 'app-homepage',
  templateUrl: './app/page-body/homepage/homepage.component.html',
  styleUrls: ['./app/page-body/homepage/homepage.component.css'],

})
export class HomepageComponent implements OnInit {

constructor(private router: Router) { }

  ngOnInit() {
  }

  // Routing Method
  navigate(val:string){
    this.router.navigate([val])
  }

  slides = SLIDES;
  images: Array<string> = ['sports', 'abstract', 'people', 'transport', 'city', 'technics', 'nightlife', 'animals'];

  owlOptions = {
      loop:true,
      margin:10,
      responsiveClass:true,
      responsive:{
        0:{
            items:2
        },
        600:{
            items:4
        },
        1000:{
            items:6,
            loop:true
        }
    }
  }
}


const SLIDES = [
  { src:'./assets/images/slider/1.jpg', title:'Final Sale' },
  { src:'./assets/images/slider/2.jpg',title:'Final Sale' },
  { src:'./assets/images/slider/3.jpg', title:'Final Sale' },
];
