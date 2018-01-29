import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import {fadeInAnimation}  from '../../animations/fade-in.animation';


@Component({
  selector: 'app-homepage',
  templateUrl: './app/page-body/homepage/homepage.component.html',
  styleUrls: ['./app/page-body/homepage/homepage.component.css'],
  animations:[fadeInAnimation ],
  host:{ '[@fadeInAnimation]' : ''}

})
export class HomepageComponent implements OnInit {

  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public categoryId;
  public categoryName;
  imageUrl:any;

  results:{};

  constructor(private router: Router,private http: HttpClient) {}

  ngOnInit() {
    this.imageUrl = SERVER_URL + "/templates/viewImages?userId="
      +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+"&img=secondNavi";
    this.http.get('http://localhost:1337/templates/getSpecificChild?appId=' + this.appId).subscribe(data => {
        // Read the result field from the JSON response.

        this.results = data;
        console.log(data);
        console.log(" cat id  : " + JSON.stringify((this.results[0].id)));
        this.categoryId = this.results[0].id;
        this.categoryName = this.results[0].name;
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
    this.router.navigate([val,this.categoryId,this.categoryName])
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
