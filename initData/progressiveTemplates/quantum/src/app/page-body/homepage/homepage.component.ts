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
  private products: any;
  private results: {};
  private randomIndex;
  private imageUrlProd;
  private randomedArr = [];
  constructor(private productService: ProductsService, private dataService: PagebodyServiceModule, private router: Router, private categoryService: CategoriesService) {
    for(let i=0;i<2;i++){
      this.randomedArr.push({
        imageUrl : 'lazyload-ph.png'
      });
    }
  }



  ngOnInit() {

    this.imageUrlProd = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

    this.categoryService.getCategories().subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      data.forEach(element => {
        this.dataService.searchArray.push({ 'name': element.name, 'id': element.id });
      });

    },
      error => {
        console.log('Error retrieving categories');
      });


    let max;

    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      max = Object.keys(this.products).length;

      let lastIndex = null;
      this.randomedArr = [];
      while(true){
        this.randomIndex = Math.floor(Math.random() * max);
        if( this.randomedArr.length == 2){
          break;
        }

        if(lastIndex != null && this.randomedArr.length == 1){
          if(lastIndex != this.randomIndex){
            this.randomedArr.push(this.products[this.randomIndex]);
            break;
          }
        }else{
          this.randomedArr.push(this.products[this.randomIndex]);
          lastIndex = this.randomIndex;
        }

      }
    }, err => {
      console.log('Error retrieving all products');
    })

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
