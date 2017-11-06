import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

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

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public categoryId;

  imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+'&img=secondNavi';
  results:{};

constructor(private router: Router,private http: HttpClient) { 
  console.log(this.imageUrl)}



  ngOnInit() {
    this.http.get('http://localhost:1337/templates/getSpecificChild?appId=' + this.appId).subscribe(data => {
      // Read the result field from the JSON response.
      
      this.results = data;
      console.log("this.results  : " + JSON.stringify(this.results));
      console.log(" cat id  : " + JSON.stringify((this.results[0].id)));      
   this.categoryId = this.results[0].id;
    },
    error => {
      this.showErrorPage();
   });
  }

  // Routing Method
  navigate(val:string){
    this.router.navigate([val])
  }
  navigateShop(val:string){
    this.router.navigate([val,this.categoryId])
  }

  getData(){
  
  }
  showErrorPage(){
    alert('Somthing went Wrong!');
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
