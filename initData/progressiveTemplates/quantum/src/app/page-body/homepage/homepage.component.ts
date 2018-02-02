import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { CategoriesService } from '../../services/categories/categories.service'
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { forEach } from '@angular/router/src/utils/collection';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './app/page-body/homepage/homepage.component.html',
  styleUrls: ['./app/page-body/homepage/homepage.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }

})
export class HomepageComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private categoryId;
  private categoryName;
  private imageUrl: any;
  private randomProducts: any;
  private results: {};
  private randomIndex;
  private imageUrlProd;
  private testArr = [];
  constructor(private productService: ProductsService, private dataService: PagebodyServiceModule, private router: Router, private categoryService: CategoriesService) { }

  ngOnInit() {

    this.imageUrlProd = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';


    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

    this.categoryService.getCategories().subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      console.log(data);
      data.forEach(element => {
        this.dataService.searchArray.push({ 'name': element.name, 'id': element.id });
      });

    },
      error => {
        console.log('Error retrieving categories');
      });


    let min; let max;

    this.productService.getAllProducts().subscribe(data => {
      this.randomProducts = data;
      console.log("data : " + JSON.stringify(this.randomProducts[0]))
      min = 0
      max = Object.keys(this.randomProducts).length;
      console.log("max : " + max)


      // console.log("this.randomIndex : " + this.randomIndex)
      // [Math.floor(Math.random()*letters.length)]
      var test ;

      while(test){

      }
      for (let i = 0; i < 2; i++) {
        this.randomIndex = Math.floor(Math.random() * max);
        console.log(this.randomIndex)
        this.testArr.push(this.randomProducts[this.randomIndex])

      }

      console.log(this.testArr);
    }, err => {
      console.log('Error retrieving all products');
    })




    console.log()

  }

  // Routing Method
  navigateShop(val: string, id, name) {
    console.log(val);
    this.dataService.catId = id;
    this.router.navigate(['/' + val, id, name]);
  }



  //   slides = SLIDES;
  //   images: Array<string> = ['sports', 'abstract', 'people', 'transport', 'city', 'technics', 'nightlife', 'animals'];

  //   owlOptions = {
  //     loop: true,
  //     margin: 10,
  //     responsiveClass: true,
  //     responsive: {
  //       0: {
  //         items: 2
  //       },
  //       600: {
  //         items: 4
  //       },
  //       1000: {
  //         items: 6,
  //         loop: true
  //       }
  //     }
  //   }


  //   state: string = 'small';

  //   animateMe() {
  //     this.state = (this.state === 'small' ? 'large' : 'small');
  //   }



  // }

  // const SLIDES = [
  //   { src: './assets/images/slider/1.jpg', title: 'Final Sale' },
  //   { src: './assets/images/slider/2.jpg', title: 'Final Sale' },
  //   { src: './assets/images/slider/3.jpg', title: 'Final Sale' },
  // ];
}
