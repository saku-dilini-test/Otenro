import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';



@Component({
  selector: 'app-homepage',
  templateUrl: './app/page-body/homepage/homepage.component.html',
  styleUrls: ['./app/page-body/homepage/homepage.component.css'],
  animations:[
    trigger('myAnimation',[
        state('small', style({
          transform: 'scale(1)',
        })),
        state('large', style({
          transform: 'scale(1.2)',
        })),
        transition('small <=> large', animate('300ms ease-in')),
    ]),
  ]


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


  state: string ='small';

  animateMe(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }



}

const SLIDES = [
  { src:'./assets/images/slider/1.jpg', title:'Final Sale' },
  { src:'./assets/images/slider/2.jpg',title:'Final Sale' },
  { src:'./assets/images/slider/3.jpg', title:'Final Sale' },
];
